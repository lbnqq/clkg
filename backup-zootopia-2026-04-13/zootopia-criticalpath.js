/**
 * 疯狂动物城关键路径优化
 * Zootopia Critical Path Optimizer - 确保核心功能快速加载
 */

(function() {
  'use strict';

  // ==================== 关键资源配置 ====================
  const CriticalPathConfig = {
    // 关键资源（必须首先加载）
    criticalScripts: [
      'zootopia-core.js',
      'zootopia-main.js'
    ],

    // 关键样式
    criticalStyles: [
      'zootopia-optimized.css'
    ],

    // 延迟加载资源
    deferredScripts: [
      'zootopia-components.js',
      'zootopia-animations.js',
      'zootopia-responsive.js'
    ],

    // 按需加载资源
    lazyScripts: [
      'zootopia-games-system.js',
      'zootopia-social-system.js',
      'zootopia-music-system.js'
    ]
  };

  // ==================== 关键路径管理器 ====================
  const CriticalPathManager = {
    loadedScripts: new Set(),
    loadedStyles: new Set(),

    init: function() {
      this.optimizeScriptLoading();
      this.optimizeStyleLoading();
      this.preloadCriticalResources();
    },

    optimizeScriptLoading: function() {
      // 关键脚本同步加载
      CriticalPathConfig.criticalScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = '/js/' + src;
        script.async = false;
        script.defer = false;
        document.head.appendChild(script);

        this.loadedScripts.add(src);
      });

      // 延迟脚本延迟加载
      CriticalPathConfig.deferredScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = '/js/' + src;
        script.defer = true;
        document.head.appendChild(script);
      });

      // 按需脚本懒加载
      this.setupLazyLoading();
    },

    optimizeStyleLoading: function() {
      // 关键样式同步加载
      CriticalPathConfig.criticalStyles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        href = '/css/' + href;
        link.media = 'all';
        document.head.appendChild(link);

        this.loadedStyles.add(href);
      });
    },

    preloadCriticalResources: function() {
      // 预加载关键资源
      if ('rel' in document.createElement('link')) {
        CriticalPathConfig.criticalScripts.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = '/js/' + src;
          link.as = 'script';
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });
      }
    },

    setupLazyLoading: function() {
      // 监听用户交互后加载懒加载脚本
      const loadLazyScripts = ZootopiaCore.utils.debounce(() => {
        if (!this.lazyLoaded) {
          this.lazyLoaded = true;

          CriticalPathConfig.lazyScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = '/js/' + src;
            script.defer = true;
            document.head.appendChild(script);

            this.loadedScripts.add(src);
          });

          console.log('⏱️ 延迟脚本已加载');
        }
      }, 1000);

      // 监听交互事件
      const interactionEvents = ['scroll', 'click', 'keydown'];
      interactionEvents.forEach(event => {
        document.addEventListener(event, loadLazyScripts, { once: true });
      });
    },

    loadGameModule: function() {
      // 按需加载游戏模块
      if (!this.loadedScripts.has('zootopia-games-system.js')) {
        const script = document.createElement('script');
        script.src = '/js/zootopia-games-system.js';
        script.defer = true;
        document.head.appendChild(script);

        this.loadedScripts.add('zootopia-games-system.js');

        console.log('🎮 游戏模块已加载');
      }
    },

    loadSocialModule: function() {
      // 按需加载社交模块
      if (!this.loadedScripts.has('zootopia-social-system.js')) {
        const script = document.createElement('script');
        script.src = '/js/zootopia-social-system.js';
        script.defer = true;
        document.head.appendChild(script);

        this.loadedScripts.add('zootopia-social-system.js');

        console.log('💬 社交模块已加载');
      }
    },

    loadMusicModule: function() {
      // 按需加载音乐模块
      if (!this.loadedScripts.has('zootopia-music-system.js')) {
        const script = document.createElement('script');
        script.src = '/js/zootopia-music-system.js';
        script.defer = true;
        document.head.appendChild(script);

        this.loadedScripts.add('zootopia-music-system.js');

        console.log('🎵 音乐模块已加载');
      }
    }
  };

  // ==================== 代码分割优化器 ====================
  const CodeSplitter = {
    // 按路由分割代码
    splitByRoute: function() {
      // 根据当前页面类型动态加载功能
      const currentPath = window.location.pathname;

      if (currentPath.includes('/tags/') || currentPath.includes('/categories/')) {
        // 分类/标签页：加载搜索和过滤功能
        this.loadModule('search');
      }

      if (currentPath.includes('/archives/')) {
        // 归档页：加载时间线功能
        this.loadModule('timeline');
      }

      if (currentPath.includes('/20')) {
        // 文章页：加载阅读增强功能
        this.loadModule('reading-enhanced');
      }
    },

    loadModule: function(moduleName) {
      const moduleMap = {
        'search': 'zootopia-widgets.js',
        'timeline': 'zootopia-time-capsule.js',
        'reading-enhanced': 'zootopia-page-loader.js'
      };

      const script = moduleMap[moduleName];
      if (script && !this.loadedScripts.has(script)) {
        const scriptEl = document.createElement('script');
        scriptEl.src = '/js/' + script;
        scriptEl.defer = true;
        document.head.appendChild(scriptEl);

        this.loadedScripts.add(script);
      }
    }
  };

  // ==================== 资源优先级管理 ====================
  const PriorityManager = {
    setResourceHints: function() {
      // 设置资源加载提示
      const hints = [
        { type: 'preconnect', href: 'https://fonts.googleapis.com' },
        { type: 'preconnect', href: 'https://fonts.gstatic.com' },
        { type: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }
      ];

      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.type;
        link.href = hint.href;
        document.head.appendChild(link);
      });
    },

    setImportanceHints: function() {
      // 为关键资源设置重要性
      const criticalResources = [
        '/js/zootopia-core.js',
        '/js/zootopia-main.js',
        '/css/zootopia-optimized.css'
      ];

      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.tagName === 'SCRIPT' || node.tagName === 'LINK') {
              const src = node.src || node.href;

              criticalResources.forEach(resource => {
                if (src && src.includes(resource)) {
                  node.setAttribute('importance', 'high');
                }
              });
            }
          });
        });
      });

      observer.observe(document.head, { childList: true });
    }
  };

  // ==================== 加载状态管理 ====================
  const LoadingManager = {
    indicators: new Map(),

    init: function() {
      this.createLoadingIndicator();
    },

    createLoadingIndicator: function() {
      const indicator = document.createElement('div');
      indicator.className = 'zt-loading-indicator';
      indicator.innerHTML = `
        <div class="zt-spinner"></div>
        <div class="zt-loading-text">加载中...</div>
      `;

      indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 2rem;
        border-radius: 12px;
        z-index: 10000;
        display: none;
        text-align: center;
      `;

      document.body.appendChild(indicator);
      this.indicator = indicator;
    },

    show: function(message = '加载中...') {
      if (this.indicator) {
        const text = this.indicator.querySelector('.zt-loading-text');
        if (text) text.textContent = message;
        this.indicator.style.display = 'block';
      }
    },

    hide: function() {
      if (this.indicator) {
        this.indicator.style.display = 'none';
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.criticalPath = CriticalPathManager;
  ZootopiaCore.codeSplitter = CodeSplitter;
  ZootopiaCore.priority = PriorityManager;
  ZootopiaCore.loading = LoadingManager;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    CriticalPathManager.init();
    PriorityManager.setResourceHints();
    PriorityManager.setImportanceHints();
    LoadingManager.init();

    // 页面加载完成后执行代码分割
    window.addEventListener('load', () => {
      CodeSplitter.splitByRoute();
    });

    console.log('⚡ 关键路径优化已应用');
  });

  // ==================== 全局 API ====================
  // 按需加载模块
  window.ztLoadGames = () => CriticalPathManager.loadGameModule();
  window.ztLoadSocial = () => CriticalPathManager.loadSocialModule();
  window.ztLoadMusic = () => CriticalPathManager.loadMusicModule();

})();
