/**
 * 疯狂动物城智能预加载系统
 * Zootopia Smart Preloader - 基于用户行为的智能资源预加载
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const PreloaderConfig = {
    // 预加载策略
    strategies: {
      hover: 100,      // 悬停预加载（ms）
      viewport: 0.5,   // 视口内预加载（比例）
      idle: 2000,      // 空闲时预加载（ms）
      critical: 0      // 关键资源立即预加载
    },

    // 预加载优先级
    priorities: {
      critical: 1,    // 关键（导航、重要链接）
      high: 2,        // 高优先级（下一页可能访问）
      normal: 3,      // 普通（相关内容）
      low: 4          // 低优先级（不紧急）
    },

    // 资源类型权重
    resourceWeights: {
      navigation: 1,    // 导航链接
      next: 2,          // 下一页/上一篇
      related: 3,       // 相关文章
      tags: 4,          // 标签/分类
      search: 5         // 搜索结果
    },

    // 限制配置
    limits: {
      maxConcurrent: 3,      // 最大并发预加载数
      maxCacheSize: 20,      // 最大缓存条目数
      cacheTTL: 300000       // 缓存生存时间（5分钟）
    }
  };

  // ==================== 预加载缓存 ====================
  const PreloadCache = {
    cache: new Map(),
    timestamps: new Map(),

    set: function(url, data, priority) {
      // 检查缓存大小限制
      if (this.cache.size >= PreloaderConfig.limits.maxCacheSize) {
        this.evictLowestPriority();
      }

      this.cache.set(url, { data, priority, timestamp: Date.now() });
    },

    get: function(url) {
      const item = this.cache.get(url);
      if (!item) return null;

      // 检查是否过期
      const age = Date.now() - item.timestamp;
      if (age > PreloaderConfig.limits.cacheTTL) {
        this.cache.delete(url);
        return null;
      }

      return item.data;
    },

    has: function(url) {
      return this.cache.has(url);
    },

    // 清除最低优先级的缓存
    evictLowestPriority: function() {
      let lowestPriority = Infinity;
      let lowestUrl = null;

      for (const [url, item] of this.cache) {
        if (item.priority < lowestPriority) {
          lowestPriority = item.priority;
          lowestUrl = url;
        }
      }

      if (lowestUrl) {
        this.cache.delete(lowestUrl);
      }
    },

    clear: function() {
      this.cache.clear();
    }
  };

  // ==================== 行为追踪器 ====================
  const BehaviorTracker = {
    interactions: new Map(),
    viewportItems: new Set(),
    idleTimer: null,

    init: function() {
      this.trackHover();
      this.trackViewport();
      this.trackIdle();
    },

    // 追踪悬停行为
    trackHover: function() {
      const hoverHandler = ZootopiaCore.utils.debounce((e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;

        const href = link.getAttribute('href');

        // 排除特殊链接
        if (this.shouldSkipLink(link, href)) return;

        // 延迟预加载
        setTimeout(() => {
          if (!PreloadCache.has(href)) {
            PreloadManager.preload(href, 'hover');
          }
        }, PreloaderConfig.strategies.hover);
      }, 100);

      // 使用事件委托
      document.addEventListener('mouseover', hoverHandler, true);
    },

    // 追踪视口内容
    trackViewport: function() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const link = entry.target.closest('a[href]');
          if (!link) return;

          const href = link.getAttribute('href');

          if (entry.isIntersecting) {
            this.viewportItems.add(href);

            // 视口内的资源按低优先级预加载
            if (!PreloadCache.has(href)) {
              PreloadManager.preload(href, 'viewport');
            }
          } else {
            this.viewportItems.delete(href);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // 观察所有链接
      const observeLinks = () => {
        document.querySelectorAll('a[href]').forEach(link => {
          observer.observe(link);
        });
      };

      observeLinks();

      // 监听 DOM 变化
      const mutationObserver = new MutationObserver(() => {
        observeLinks();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    },

    // 追踪空闲时间
    trackIdle: function() {
      const resetIdleTimer = () => {
        clearTimeout(this.idleTimer);

        this.idleTimer = setTimeout(() => {
          this.onIdle();
        }, PreloaderConfig.strategies.idle);
      };

      // 用户活动时重置计时器
      const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
      activityEvents.forEach(event => {
        document.addEventListener(event, resetIdleTimer, { passive: true });
      });

      resetIdleTimer();
    },

    onIdle: function() {
      // 空闲时预加载低优先级资源
      const links = document.querySelectorAll('a[href]');
      const preloadCandidates = [];

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (this.shouldSkipLink(link, href)) return;

        const priority = this.calculatePriority(link);
        if (priority <= PreloaderConfig.priorities.normal) {
          preloadCandidates.push({ href, priority });
        }
      });

      // 按优先级排序，限制数量
      preloadCandidates
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 5)
        .forEach(candidate => {
          if (!PreloadCache.has(candidate.href)) {
            PreloadManager.preload(candidate.href, 'idle');
          }
        });
    },

    // 计算链接优先级
    calculatePriority: function(link) {
      let score = PreloaderConfig.priorities.low;

      const href = link.getAttribute('href');
      const rel = link.getAttribute('rel');
      const className = link.className;

      // 导航链接
      if (link.closest('nav, .navigation, .menu')) {
        score = PreloaderConfig.priorities.critical;
      }
      // 下一页/上一篇
      else if (href.includes('next') || href.includes('prev') ||
               className.includes('next') || className.includes('prev')) {
        score = PreloaderConfig.priorities.high;
      }
      // 相关文章
      else if (href.includes('related') || link.closest('.related-posts')) {
        score = PreloaderConfig.priorities.normal;
      }
      // 标签/分类
      else if (href.includes('/tags/') || href.includes('/categories/')) {
        score = PreloaderConfig.priorities.normal;
      }

      return score;
    },

    // 判断是否跳过链接
    shouldSkipLink: function(link, href) {
      // 排除外部链接
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const currentDomain = window.location.hostname;
        const linkDomain = new URL(href).hostname;
        if (currentDomain !== linkDomain) return true;
      }

      // 排除特殊链接
      if (href.startsWith('#') ||
          href.startsWith('javascript:') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          link.getAttribute('target') === '_blank') {
        return true;
      }

      // 排除已缓存的链接
      return PreloadCache.has(href);
    }
  };

  // ==================== 预加载管理器 ====================
  const PreloadManager = {
    loading: new Set(),
    queue: [],

    // 预加载资源
    preload: function(url, trigger = 'unknown') {
      // 检查是否已在加载
      if (this.loading.has(url)) return;
      if (PreloadCache.has(url)) return;

      // 限制并发数量
      if (this.loading.size >= PreloaderConfig.limits.maxConcurrent) {
        this.queue.push({ url, trigger });
        return;
      }

      this.loadResource(url, trigger);
    },

    // 加载资源
    loadResource: function(url, trigger) {
      this.loading.add(url);

      // 使用 fetch 预加载
      fetch(url, { method: 'HEAD' })
        .then(() => {
          // 缓存成功的资源
          const priority = this.getPriority(trigger);
          PreloadCache.set(url, { status: 'success', trigger }, priority);
        })
        .catch(() => {
          // 失败也缓存，避免重复尝试
          const priority = this.getPriority(trigger);
          PreloadCache.set(url, { status: 'failed', trigger }, priority);
        })
        .finally(() => {
          this.loading.delete(url);
          this.processQueue();
        });
    },

    // 获取触发器优先级
    getPriority: function(trigger) {
      const priorities = {
        'critical': PreloaderConfig.priorities.critical,
        'hover': PreloaderConfig.priorities.high,
        'viewport': PreloaderConfig.priorities.normal,
        'idle': PreloaderConfig.priorities.low,
        'unknown': PreloaderConfig.priorities.normal
      };

      return priorities[trigger] || PreloaderConfig.priorities.normal;
    },

    // 处理队列
    processQueue: function() {
      while (this.queue.length > 0 &&
             this.loading.size < PreloaderConfig.limits.maxConcurrent) {
        const item = this.queue.shift();
        if (item && !PreloadCache.has(item.url)) {
          this.loadResource(item.url, item.trigger);
        }
      }
    },

    // 预缓存资源（供其他系统使用）
    precache: function(urls) {
      urls.forEach(url => {
        if (!PreloadCache.has(url)) {
          this.preload(url, 'critical');
        }
      });
    },

    // 获取缓存状态
    getStats: function() {
      return {
        cache: PreloadCache.cache.size,
        loading: this.loading.size,
        queue: this.queue.length,
        maxCache: PreloaderConfig.limits.maxCacheSize,
        maxConcurrent: PreloaderConfig.limits.maxConcurrent
      };
    }
  };

  // ==================== 预测引擎 ====================
  const PredictionEngine = {
    // 基于页面内容预测下一步
    predictNext: function() {
      const predictions = [];

      // 查找"下一页"链接
      const nextLink = document.querySelector('a[href*="next"], .next-page, .pagination-next');
      if (nextLink) {
        predictions.push({
          url: nextLink.href,
          confidence: 0.9,
          reason: 'next_page'
        });
      }

      // 查找相关文章
      const relatedLinks = document.querySelectorAll('.related-posts a, [rel="related"]');
      relatedLinks.forEach(link => {
        predictions.push({
          url: link.href,
          confidence: 0.7,
          reason: 'related_post'
        });
      });

      // 查找面包屑导航中的链接
      const breadcrumbLinks = document.querySelectorAll('.breadcrumb a, nav.breadcrumbs a');
      breadcrumbLinks.forEach(link => {
        predictions.push({
          url: link.href,
          confidence: 0.5,
          reason: 'breadcrumb'
        });
      });

      return predictions
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);
    },

    // 基于用户行为预测
    predictFromBehavior: function() {
      const behavior = this.getUserBehavior();
      const predictions = [];

      // 新用户倾向于查看介绍页面
      if (behavior.isNewUser) {
        const introLinks = document.querySelectorAll('a[href*="about"], a[href*="intro"]');
        introLinks.forEach(link => {
          predictions.push({
            url: link.href,
            confidence: 0.6,
            reason: 'new_user_intro'
          });
        });
      }

      // 回访用户倾向于查看新内容
      if (behavior.isReturning) {
        const newLinks = document.querySelectorAll('a[href*="archives"], a[href*="latest"]');
        newLinks.forEach(link => {
          predictions.push({
            url: link.href,
            confidence: 0.7,
            reason: 'returning_user_new'
          });
        });
      }

      return predictions;
    },

    // 获取用户行为特征
    getUserBehavior: function() {
      const visits = ZootopiaCore.timeCapsuleEnhanced?.visits?.getStats();
      if (!visits) return {};

      return {
        isNewUser: visits.total === 1,
        isReturning: visits.total > 5,
        visitCount: visits.total,
        lastVisit: visits.lastVisit
      };
    }
  };

  // ==================== 智能预加载器 ====================
  const SmartPreloader = {
    init: function() {
      BehaviorTracker.init();
      this.setupPageTransition();
      this.setupLinkIntercept();
    },

    // 设置页面过渡预加载
    setupPageTransition: function() {
      // 监听页面过渡事件
      document.addEventListener('themechange', () => {
        this.preloadPredicted();
      });
    },

    // 设置链接拦截
    setupLinkIntercept: function() {
      // prefetch: 使用 <link rel="prefetch">
      const prefetchLinks = document.querySelectorAll('a[href]');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const link = entry.target;

          if (entry.isIntersecting && !link.hasAttribute('data-prefetched')) {
            const href = link.getAttribute('href');

            // 使用原生 prefetch
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);

            link.setAttribute('data-prefetched', 'true');
          }
        });
      }, {
        rootMargin: '100px'
      });

      prefetchLinks.forEach(link => observer.observe(link));
    },

    // 预加载预测的资源
    preloadPredicted: function() {
      const predictions = [
        ...PredictionEngine.predictNext(),
        ...PredictionEngine.predictFromBehavior()
      ];

      // 去重并限制数量
      const seen = new Set();
      const uniquePredictions = predictions
        .filter(p => !seen.has(p.url))
        .filter(p => !BehaviorTracker.shouldSkipLink(null, p.url))
        .slice(0, 3);

      uniquePredictions.forEach(prediction => {
        console.log('🎯 预测预加载:', prediction.reason, prediction.url);
        PreloadManager.preload(prediction.url, 'predicted');
      });
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.smartPreloader = SmartPreloader;
  ZootopiaCore.preloader = PreloadManager;
  ZootopiaCore.preloadCache = PreloadCache;
  ZootopiaCore.preloaderConfig = PreloaderConfig;

  // ==================== 全局 API ====================
  // 获取预加载统计
  window.ztGetPreloadStats = () => PreloadManager.getStats();

  // 预缓存指定资源
  window.ztPrecache = (urls) => PreloadManager.precache(urls);

  // 清空预加载缓存
  window.ztClearPreloadCache = () => PreloadCache.clear();

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(()() {
    SmartPreloader.init();

    console.log('⚡ 智能预加载系统已就绪');
  });

})();
