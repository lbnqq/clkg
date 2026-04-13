/**
 * 疯狂动物城博客系统 - 渐进式加载器
 * Zootopia Blog System - Progressive Loader
 *
 * 版本: v3.5.0
 * 优化轮次: 第19轮
 * 最后更新: 2026-04-12
 *
 * 功能: 按优先级分阶段加载功能，提升首屏速度
 */

(function() {
  'use strict';

  // 渐进式加载器配置
  const ProgressiveLoaderConfig = {
    // 加载阶段配置
    phases: [
      {
        name: '核心系统',
        priority: 1,
        systems: ['zootopia-core.js', 'zootopia-loader.js'],
        loadTime: 'immediate',
        description: '系统核心功能，必须立即加载'
      },
      {
        name: '基础交互',
        priority: 2,
        systems: ['zootopia-microinteractions.js', 'zootopia-theme-switcher.js'],
        loadTime: 'domReady',
        description: '基础交互动画和主题切换'
      },
      {
        name: '评论互动',
        priority: 3,
        systems: ['zootopia-comment-reactions.js'],
        loadTime: 'domReady',
        description: '评论表情反应功能'
      },
      {
        name: '用户功能',
        priority: 4,
        systems: ['zootopia-user-points.js', 'zootopia-checkin.js'],
        loadTime: '1s',
        description: '用户积分和签到系统'
      },
      {
        name: '高级功能',
        priority: 5,
        systems: [
          'zootopia-utility-tools.js',
          'zootopia-search-advanced.js',
          'zootopia-reading-history.js'
        ],
        loadTime: '2s',
        description: '实用工具和高级搜索'
      },
      {
        name: '增强功能',
        priority: 6,
        systems: [
          'zootopia-post-enhancement.js',
          'zootopia-share-enhancement.js',
          'zootopia-keyboard-shortcuts.js'
        ],
        loadTime: '3s',
        description: '文章增强和快捷键'
      },
      {
        name: '优化系统',
        priority: 7,
        systems: [
          'zootopia-resource-loader.js',
          'zootopia-media-optimizer.js',
          'zootopia-performance-monitor.js'
        ],
        loadTime: '4s',
        description: '资源预加载和性能监控'
      },
      {
        name: '移动端',
        priority: 8,
        systems: ['zootopia-mobile-optimizer.js'],
        loadTime: '5s',
        description: '移动端优化'
      },
      {
        name: 'SEO和无障碍',
        priority: 9,
        systems: ['zootopia-seo-optimizer.js', 'zootopia-accessibility.js'],
        loadTime: '6s',
        description: '搜索引擎优化和无障碍功能'
      },
      {
        name: '主题特色',
        priority: 10,
        systems: ['zootopia-theme-features.js'],
        loadTime: 'onDemand',
        description: '疯狂动物城主题特色（角色、地区、游戏）'
      }
    ],

    // 已加载的系统追踪
    loadedSystems: new Set(),

    // 加载超时时间
    loadTimeout: 30000
  };

  // 渐进式加载器
  const ProgressiveLoader = {
    // 加载单个系统
    loadSystem: function(systemName) {
      return new Promise((resolve, reject) => {
        // 检查是否已加载
        if (this.loadedSystems.has(systemName)) {
          resolve();
          return;
        }

        // 检查是否已存在
        if (document.querySelector(`script[src*="${systemName}"]`)) {
          this.loadedSystems.add(systemName);
          resolve();
          return;
        }

        // 创建script标签
        const script = document.createElement('script');
        script.src = `/js/${systemName}`;
        script.async = true;

        // 设置超时
        const timeout = setTimeout(() => {
          reject(new Error(`加载 ${systemName} 超时`));
        }, ProgressiveLoaderConfig.loadTimeout);

        // 加载完成
        script.onload = () => {
          clearTimeout(timeout);
          this.loadedSystems.add(systemName);
          console.log(`✅ 已加载: ${systemName}`);
          resolve();
        };

        // 加载失败
        script.onerror = () => {
          clearTimeout(timeout);
          console.warn(`⚠️ 加载失败: ${systemName}`);
          reject(new Error(`加载 ${systemName} 失败`));
        };

        // 添加到页面
        document.body.appendChild(script);
      });
    },

    // 加载指定阶段的系统
    loadPhase: async function(phaseIndex) {
      const phase = ProgressiveLoaderConfig.phases[phaseIndex];
      if (!phase) return;

      console.log(`🔄 加载阶段 ${phaseIndex + 1}: ${phase.name}`);

      try {
        // 并行加载该阶段的所有系统
        await Promise.all(
          phase.systems.map(system => this.loadSystem(system))
        );

        console.log(`✅ 阶段 ${phaseIndex + 1} 完成: ${phase.name}`);

        // 触发阶段加载完成事件
        this.dispatchEvent('phaseLoaded', {
          phase: phaseIndex,
          phaseName: phase.name
        });

      } catch (error) {
        console.error(`❌ 阶段 ${phaseIndex + 1} 失败:`, error);

        // 触发阶段加载失败事件
        this.dispatchEvent('phaseError', {
          phase: phaseIndex,
          phaseName: phase.name,
          error: error
        });
      }
    },

    // 按需加载特定系统
    loadOnDemand: function(systemName) {
      console.log(`🎯 按需加载: ${systemName}`);
      return this.loadSystem(systemName);
    },

    // 初始化加载器
    init: function() {
      console.log('🚀 渐进式加载器启动...');

      // 阶段0: 立即加载核心系统
      this.loadPhase(0);

      // 阶段1-2: DOM就绪后加载
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.loadPhase(1);
          this.loadPhase(2);
        });
      } else {
        this.loadPhase(1);
        this.loadPhase(2);
      }

      // 阶段3-9: 延迟加载
      for (let i = 3; i <= 9; i++) {
        setTimeout(() => {
          this.loadPhase(i);
        }, (i - 2) * 1000);
      }

      // 阶段10: 按需加载（用户交互时）
      this.setupOnDemandLoading();
    },

    // 设置按需加载
    setupOnDemandLoading: function() {
      // 监听用户交互事件
      const userInteractionEvents = ['click', 'scroll', 'keydown'];

      const loadOnInteraction = () => {
        // 只加载一次
        if (this.loadedSystems.has('zootopia-theme-features.js')) {
          return;
        }

        // 用户有交互后加载主题特色
        this.loadPhase(10);

        // 移除事件监听
        userInteractionEvents.forEach(event => {
          document.removeEventListener(event, loadOnInteraction);
        });
      };

      // 添加事件监听
      userInteractionEvents.forEach(event => {
        document.addEventListener(event, loadOnInteraction, { once: true });
      });
    },

    // 触发事件
    dispatchEvent: function(eventName, detail) {
      const event = new CustomEvent(`zootopia:${eventName}`, { detail });
      window.dispatchEvent(event);
    },

    // 获取加载进度
    getProgress: function() {
      const totalSystems = ProgressiveLoaderConfig.phases.reduce(
        (sum, phase) => sum + phase.systems.length,
        0
      );
      const loadedCount = this.loadedSystems.size;
      const percent = Math.round((loadedCount / totalSystems) * 100);

      return {
        total: totalSystems,
        loaded: loadedCount,
        percent: percent,
        remaining: totalSystems - loadedCount
      };
    },

    // 获取加载状态
    getStatus: function() {
      return {
        phases: ProgressiveLoaderConfig.phases.map((phase, index) => ({
          name: phase.name,
          priority: phase.priority,
          systems: phase.systems,
          loaded: phase.systems.some(sys => this.loadedSystems.has(sys))
        })),
        progress: this.getProgress(),
        loadedSystems: Array.from(this.loadedSystems)
      };
    }
  };

  // 导出全局对象
  window.ZootopiaProgressiveLoader = ProgressiveLoader;

  // 导出便捷函数
  window.ztLoadOnDemand = function(systemName) {
    return ProgressiveLoader.loadOnDemand(systemName);
  };

  window.ztGetLoadProgress = function() {
    return ProgressiveLoader.getProgress();
  };

  window.ztGetLoadStatus = function() {
    return ProgressiveLoader.getStatus();
  };

  // 自动初始化
  ProgressiveLoader.init();

  // 初始化完成提示
  console.log('🎉 渐进式加载器已启动！');
  console.log('📊 使用 ztGetLoadProgress() 查看加载进度');
  console.log('📋 使用 ztGetLoadStatus() 查看加载状态');

})();
