/**
 * 疯狂动物城资源预加载系统
 * Zootopia Resource Preloader
 *
 * 智能资源预加载，优先级管理，缓存策略
 */

(function() {
  'use strict';

  const PreloaderConfig = {
    // 预加载策略
    strategy: 'aggressive',  // conservative, moderate, aggressive

    // 优先级队列
    priority: {
      critical: ['fonts', 'critical-css', 'above-fold-images'],
      high: ['hero-images', 'important-scripts'],
      normal: ['below-fold-images', 'secondary-scripts'],
      low: ['tracking-scripts', 'analytics']
    },

    // 预连接域名
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net'
    ],

    // DNS预解析
    dnsPrefetch: [
      'https://www.google-analytics.com'
    ],

    // 资源 hints
    hints: {
      preload: [],
      prefetch: []
    },

    // 缓存配置
    cache: {
      enabled: true,
      ttl: 3600000,  // 1小时
      maxSize: 100   // 最大缓存项数
    }
  };

  /**
   * 资源预加载管理器
   */
  const ResourcePreloader = {
    cache: new Map(),
    loading: new Set(),
    observers: [],

    /**
     * 初始化
     */
    init: function() {
      this.addPreconnects();
      this.addDnsPrefetches();
      this.initIntersectionObserver();
      this.preloadCriticalResources();

      if (PreloaderConfig.cache.enabled) {
        this.initCache();
      }
    },

    /**
     * 添加预连接
     */
    addPreconnects: function() {
      PreloaderConfig.preconnect.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    },

    /**
     * 添加DNS预解析
     */
    addDnsPrefetches: function() {
      PreloaderConfig.dnsPrefetch.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    },

    /**
     * 初始化Intersection Observer
     */
    initIntersectionObserver: function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const src = element.dataset.preload;

            if (src) {
              this.preloadImage(src);
              observer.unobserve(element);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      this.observers.push(observer);
    },

    /**
     * 预加载关键资源
     */
    preloadCriticalResources: function() {
      // 预加载首屏图片
      const heroImages = document.querySelectorAll('.hero img, header img');
      heroImages.forEach(img => {
        if (img.src && !this.loading.has(img.src)) {
          this.preloadImage(img.src);
        }
      });

      // 预加载关键字体
      this.preloadFonts();
    },

    /**
     * 预加载字体
     */
    preloadFonts: function() {
      const fonts = document.querySelectorAll('link[rel="stylesheet"][href*="fonts"]');
      fonts.forEach(fontLink => {
        if (fontLink.href) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.href = fontLink.href;
          link.onload = () => {
            link.onload = null;
            link.rel = 'stylesheet';
          };
          document.head.appendChild(link);
        }
      });
    },

    /**
     * 预加载图片
     */
    preloadImage: function(src) {
      if (this.loading.has(src)) return;
      if (this.cache.has(src)) return;

      this.loading.add(src);

      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          this.cache.set(src, {
            type: 'image',
            content: img,
            timestamp: Date.now()
          });
          this.loading.delete(src);
          resolve(img);
        };

        img.onerror = () => {
          this.loading.delete(src);
          reject(new Error(`Failed to load image: ${src}`));
        };

        img.src = src;
      });
    },

    /**
     * 预加载资源
     */
    preloadResource: function(url, options = {}) {
      const {
        type = 'auto',
        priority = 'normal',
        as = null
      } = options;

      if (this.cache.has(url)) {
        return Promise.resolve(this.cache.get(url));
      }

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;

      if (as) {
        link.as = as;
      } else if (type !== 'auto') {
        link.as = type;
      }

      if (priority === 'high') {
        link.setAttribute('importance', 'high');
      }

      document.head.appendChild(link);

      return new Promise((resolve, reject) => {
        link.onload = () => {
          this.cache.set(url, {
            type,
            content: url,
            timestamp: Date.now()
          });
          resolve(url);
        };

        link.onerror = () => {
          reject(new Error(`Failed to preload: ${url}`));
        };
      });
    },

    /**
     * 预取资源
     */
    prefetchResource: function(url) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    },

    /**
     * 批量预加载
     */
    preloadBatch: function(resources, options = {}) {
      const {
        concurrency = 3,
        priority = 'normal'
      } = options;

      return new Promise((resolve, reject) => {
        const results = [];
        let index = 0;
        let active = 0;

        const loadNext = () => {
          if (index >= resources.length && active === 0) {
            resolve(results);
            return;
          }

          while (active < concurrency && index < resources.length) {
            const resource = resources[index++];
            active++;

            this.preloadResource(resource, { priority })
              .then(result => {
                results.push(result);
                active--;
                loadNext();
              })
              .catch(error => {
                results.push({ error, resource });
                active--;
                loadNext();
              });
          }
        };

        loadNext();
      });
    },

    /**
     * 观察元素进行懒预加载
     */
    observe: function(element, src) {
      if (this.observers.length === 0) return;

      element.dataset.preload = src;
      this.observers[0].observe(element);
    },

    /**
     * 初始化缓存
     */
    initCache: function() {
      // 清理过期缓存
      setInterval(() => {
        this.cleanCache();
      }, 60000); // 每分钟清理一次

      // 加载持久化缓存
      this.loadPersistentCache();
    },

    /**
     * 清理缓存
     */
    cleanCache: function() {
      const now = Date.now();
      const ttl = PreloaderConfig.cache.ttl;
      const maxSize = PreloaderConfig.cache.maxSize;

      // 清理过期项
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp > ttl) {
          this.cache.delete(key);
        }
      }

      // 如果超过最大大小，清理最旧的项
      if (this.cache.size > maxSize) {
        const entries = Array.from(this.cache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp);

        const toRemove = entries.slice(0, this.cache.size - maxSize);
        toRemove.forEach(([key]) => {
          this.cache.delete(key);
        });
      }
    },

    /**
     * 加载持久化缓存
     */
    loadPersistentCache: function() {
      try {
        const cached = localStorage.getItem('zt_preloader_cache');
        if (cached) {
          const data = JSON.parse(cached);
          // 恢复缓存数据
          Object.entries(data).forEach(([key, value]) => {
            if (!this.cache.has(key)) {
              this.cache.set(key, value);
            }
          });
        }
      } catch (e) {
        console.warn('Failed to load cache:', e);
      }
    },

    /**
     * 保存持久化缓存
     */
    savePersistentCache: function() {
      try {
        const data = Object.fromEntries(this.cache);
        localStorage.setItem('zt_preloader_cache', JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to save cache:', e);
      }
    },

    /**
     * 清空缓存
     */
    clearCache: function() {
      this.cache.clear();
      localStorage.removeItem('zt_preloader_cache');
    },

    /**
     * 获取缓存统计
     */
    getCacheStats: function() {
      return {
        size: this.cache.size,
        maxSize: PreloaderConfig.cache.maxSize,
        loading: this.loading.size,
        entries: Array.from(this.cache.entries()).map(([key, value]) => ({
          url: key,
          type: value.type,
          age: Date.now() - value.timestamp
        }))
      };
    }
  };

  // 导出 API
  ZootopiaCore.resourcePreloader = ResourcePreloader;
  ZootopiaCore.preloaderConfig = PreloaderConfig;

  // 全局 API
  window.ztPreload = (url, options) => ResourcePreloader.preloadResource(url, options);
  window.ztPrefetch = (url) => ResourcePreloader.prefetchResource(url);
  window.ztPreloadBatch = (resources, options) => ResourcePreloader.preloadBatch(resources, options);
  window.ztGetCacheStats = () => ResourcePreloader.getCacheStats();
  window.ztClearCache = () => ResourcePreloader.clearCache();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    ResourcePreloader.init();
    console.log('🚀 资源预加载系统已就绪');
  });

  // 页面卸载时保存缓存
  window.addEventListener('beforeunload', () => {
    ResourcePreloader.savePersistentCache();
  });

})();
