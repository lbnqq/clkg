/**
 * 疯狂动物城统一加载管理器
 * Zootopia Loader Manager - 统一管理所有模块的加载状态和进度
 */

(function() {
  'use strict';

  // ==================== 加载配置 ====================
  const LoaderConfig = {
    // 加载阶段
    stages: [
      { name: 'core', label: '核心模块', weight: 30 },
      { name: 'components', label: '组件系统', weight: 20 },
      { name: 'features', label: '功能模块', weight: 30 },
      { name: 'assets', label: '资源文件', weight: 20 }
    ],

    // 模块映射
    modules: {
      core: ['zootopia-core.js', 'zootopia-main.js'],
      components: ['zootopia-components.js', 'zootopia-animations.js'],
      features: [
        'zootopia-games-system.js',
        'zootopia-social-system.js',
        'zootopia-music-system.js'
      ],
      assets: ['zootopia-performance.js', 'zootopia-compatibility.js']
    },

    // 超时设置
    timeout: 10000,

    // 显示设置
    showProgress: true,
    showPercentage: true,
    animationDuration: 300
  };

  // ==================== 加载状态管理 ====================
  const LoaderState = {
    currentStage: null,
    loadedModules: new Set(),
    totalModules: 0,
    progress: 0,
    isComplete: false,
    callbacks: {
      onProgress: [],
      onComplete: [],
      onError: [],
      onTimeout: []
    },

    reset: function() {
      this.currentStage = null;
      this.loadedModules.clear();
      this.totalModules = 0;
      this.progress = 0;
      this.isComplete = false;
    },

    updateProgress: function(percentage) {
      this.progress = Math.min(100, Math.max(0, percentage));
      this.notify('onProgress', this.progress);
    },

    addCallback: function(event, callback) {
      if (this.callbacks[event]) {
        this.callbacks[event].push(callback);
      }
    },

    notify: function(event, data) {
      if (this.callbacks[event]) {
        this.callbacks[event].forEach(cb => cb(data));
      }
    }
  };

  // ==================== 加载管理器 ====================
  const LoaderManager = {
    element: null,
    progressBar: null,
    percentageText: null,
    stageText: null,
    startTime: null,

    init: function() {
      this.createLoader();
      this.calculateTotal();
      this.bindEvents();
    },

    createLoader: function() {
      // 创建加载器容器
      const loader = document.createElement('div');
      loader.className = 'zt-loader';
      loader.innerHTML = `
        <div class="zt-loader-content">
          <div class="zt-loader-icon">
            <svg class="zt-zpd-badge" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#1a1a2e" stroke="#FF9F43" stroke-width="3"/>
              <text x="50" y="55" text-anchor="middle" fill="#FF9F43" font-size="30" font-family="Arial">ZPD</text>
            </svg>
          </div>
          <div class="zt-loader-text">
            <div class="zt-loader-title">正在加载疯狂动物城...</div>
            <div class="zt-loader-stage">准备中...</div>
          </div>
          <div class="zt-loader-progress-container">
            <div class="zt-loader-progress-bar">
              <div class="zt-loader-progress-fill"></div>
            </div>
            <div class="zt-loader-percentage">0%</div>
          </div>
        </div>
      `;

      // 添加样式
      loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity ${LoaderConfig.animationDuration}ms ease-out;
      `;

      document.body.appendChild(loader);
      this.element = loader;

      // 缓存元素引用
      this.progressBar = loader.querySelector('.zt-loader-progress-fill');
      this.percentageText = loader.querySelector('.zt-loader-percentage');
      this.stageText = loader.querySelector('.zt-loader-stage');
    },

    calculateTotal: function() {
      LoaderState.totalModules = Object.values(LoaderConfig.modules)
        .reduce((sum, arr) => sum + arr.length, 0);
    },

    bindEvents: function() {
      // 监听进度更新
      LoaderState.addCallback('onProgress', (progress) => {
        this.updateUI(progress);
      });

      // 监听完成事件
      LoaderState.addCallback('onComplete', () => {
        this.hide();
      });
    },

    updateUI: function(progress) {
      if (!this.element) return;

      // 更新进度条
      this.progressBar.style.width = `${progress}%`;

      // 更新百分比文字
      if (LoaderConfig.showPercentage) {
        this.percentageText.textContent = `${Math.round(progress)}%`;
      }

      // 更新颜色（根据进度变化）
      const hue = 30 + (progress * 0.3); // 从橙色渐变到绿色
      this.progressBar.style.background = `linear-gradient(90deg, hsl(${hue}, 80%, 50%), hsl(${hue + 20}, 80%, 60%))`;
    },

    updateStage: function(stageName) {
      const stage = LoaderConfig.stages.find(s => s.name === stageName);
      if (stage && this.stageText) {
        this.stageText.textContent = stage.label;
      }
      LoaderState.currentStage = stageName;
    },

    show: function() {
      if (this.element) {
        this.element.style.display = 'flex';
        setTimeout(() => {
          this.element.style.opacity = '1';
        }, 10);
      }
    },

    hide: function() {
      if (!this.element) return;

      this.element.style.opacity = '0';
      setTimeout(() => {
        this.element.style.display = 'none';
        LoaderState.isComplete = true;
      }, LoaderConfig.animationDuration);
    },

    // 加载单个模块
    loadModule: function(moduleName) {
      return new Promise((resolve, reject) => {
        // 检查是否已加载
        if (LoaderState.loadedModules.has(moduleName)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `/js/${moduleName}`;
        script.async = true;

        script.onload = () => {
          LoaderState.loadedModules.add(moduleName);
          this.calculateProgress();
          resolve();
        };

        script.onerror = () => {
          LoaderState.notify('onError', { module: moduleName });
          reject(new Error(`加载失败: ${moduleName}`));
        };

        document.head.appendChild(script);
      });
    },

    // 加载模块组
    loadStage: function(stageName) {
      const modules = LoaderConfig.modules[stageName];
      if (!modules) {
        return Promise.reject(new Error(`未知阶段: ${stageName}`));
      }

      this.updateStage(stageName);

      return Promise.all(modules.map(m => this.loadModule(m)));
    },

    // 加载所有模块
    loadAll: function() {
      this.startTime = performance.now();
      this.show();

      // 计算总权重
      const totalWeight = LoaderConfig.stages.reduce((sum, s) => sum + s.weight, 0);
      let currentWeight = 0;

      // 按顺序加载各阶段
      return LoaderConfig.stages.reduce((promise, stage) => {
        return promise.then(() => {
          currentWeight += stage.weight;
          const targetProgress = (currentWeight / totalWeight) * 100;

          return this.loadStage(stage.name).then(() => {
            LoaderState.updateProgress(targetProgress);
          });
        });
      }, Promise.resolve())
      .then(() => {
        const duration = performance.now() - this.startTime;
        console.log(`✅ 所有模块加载完成 (${duration.toFixed(0)}ms)`);
        LoaderState.notify('onComplete');
        return { duration, modules: LoaderState.loadedModules };
      })
      .catch((error) => {
        console.error('❌ 加载失败:', error);
        LoaderState.notify('onError', error);
        throw error;
      });
    },

    // 计算当前进度
    calculateProgress: function() {
      const loaded = LoaderState.loadedModules.size;
      const progress = (loaded / LoaderState.totalModules) * 100;
      LoaderState.updateProgress(progress);
    },

    // 检查模块是否已加载
    isLoaded: function(moduleName) {
      return LoaderState.loadedModules.has(moduleName);
    },

    // 获取加载状态
    getStatus: function() {
      return {
        progress: LoaderState.progress,
        loaded: Array.from(LoaderState.loadedModules),
        currentStage: LoaderState.currentStage,
        isComplete: LoaderState.isComplete
      };
    }
  };

  // ==================== 预加载管理 ====================
  const PreloadManager = {
    // 预加载图片
    preloadImages: function(imageUrls) {
      return Promise.all(imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => resolve(url); // 失败也继续
          img.src = url;
        });
      }));
    },

    // 预加载字体
    preloadFonts: function(fontUrls) {
      return Promise.all(fontUrls.map(url => {
        return new Promise((resolve) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.href = url;
          link.crossOrigin = 'anonymous';
          link.onload = () => resolve(url);
          link.onerror = () => resolve(url);
          document.head.appendChild(link);
        });
      }));
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.loader = LoaderManager;
  ZootopiaCore.preloader = PreloadManager;
  ZootopiaCore.loader.state = LoaderState;
  ZootopiaCore.loader.config = LoaderConfig;

  // ==================== 全局 API ====================
  // 开始加载所有模块
  window.ztLoadAll = () => LoaderManager.loadAll();

  // 获取加载状态
  window.ztGetLoaderStatus = () => LoaderManager.getStatus();

  // 检查模块是否已加载
  window.ztIsModuleLoaded = (name) => LoaderManager.isLoaded(name);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    // 初始化加载器
    LoaderManager.init();

    // 自动加载（可选）
    if (localStorage.getItem('zt_auto_load') !== 'false') {
      LoaderManager.loadAll().catch(console.error);
    }

    console.log('⏳ 加载管理器已就绪');
  });

  // ==================== 事件监听 ====================
  // 页面加载完成后隐藏加载器（保险措施）
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!LoaderState.isComplete) {
        console.warn('⚠️ 页面加载超时，强制隐藏加载器');
        LoaderManager.hide();
      }
    }, 5000);
  });

})();
