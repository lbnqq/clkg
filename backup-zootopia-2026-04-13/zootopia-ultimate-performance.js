/**
 * 疯狂动物城终极性能优化系统
 * Zootopia Ultimate Performance Optimization System
 *
 * 提供全方位的性能优化，包括：
 * - 代码分割优化
 * - 懒加载策略
 * - 内存泄漏检测与修复
 * - 资源预加载
 * - 缓存优化
 * - 渲染性能优化
 */

(function() {
  'use strict';

  const UltimatePerfConfig = {
    // 代码分割
    codeSplitting: {
      enabled: true,
      chunkSize: 50 * 1024, // 50KB
      lazyLoadThreshold: 0.3, // 视口阈值
      preloadStrategy: 'idle', // idle, visible, hover
      priority: 'high' // high, low, auto
    },

    // 懒加载
    lazyLoad: {
      images: true,
      videos: true,
      iframes: true,
      components: true,
      placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFMUUxRTciLz48L3N2Zz4=',
      rootMargin: '50px',
      threshold: 0.01
    },

    // 内存管理
    memory: {
      maxHeapSize: 150 * 1024 * 1024, // 150MB
      gcThreshold: 0.8, // 80% 触发清理
      autoCleanup: true,
      cleanupInterval: 30000, // 30秒
      trackReferences: true
    },

    // 资源预加载
    preload: {
      dnsPrefetch: true,
      preconnect: true,
      preload: true,
      prefetch: true,
      priorityHints: true
    },

    // 缓存优化
    cache: {
      strategy: 'network-first', // network-first, cache-first, stale-while-revalidate
      maxAge: 3600000, // 1小时
      staleWhileRevalidate: true,
      compressData: true
    },

    // 渲染优化
    rendering: {
      debounceTime: 100,
      throttleTime: 50,
      rafThrottle: true,
      virtualScroll: false,
      containerQueries: true
    },

    // 性能目标
    targets: {
      firstRender: 300, // ms
      timeToInteractive: 500, // ms
      frameRate: 60, // fps
      maxMemory: 150, // MB
      cacheHitRate: 0.9 // 90%
    }
  };

  /**
   * 代码分割管理器
   */
  const CodeSplitter = {
    chunks: new Map(),
    loadedChunks: new Set(),

    /**
     * 注册代码块
     */
    registerChunk: function(name, config) {
      const chunk = {
        name: name,
        size: config.size || 0,
        priority: config.priority || 'low',
        dependencies: config.dependencies || [],
        load: config.load,
        loaded: false
      };

      this.chunks.set(name, chunk);
      return chunk;
    },

    /**
     * 懒加载代码块
     */
    lazyLoad: async function(chunkName) {
      if (this.loadedChunks.has(chunkName)) {
        return this.chunks.get(chunkName);
      }

      const chunk = this.chunks.get(chunkName);
      if (!chunk) {
        throw new Error(`Chunk ${chunkName} not found`);
      }

      // 加载依赖
      for (const dep of chunk.dependencies) {
        await this.lazyLoad(dep);
      }

      // 加载当前块
      const start = performance.now();
      const result = await chunk.load();
      const duration = performance.now() - start;

      chunk.loaded = true;
      this.loadedChunks.add(chunkName);

      PerformanceMonitor.trackChunkLoad(chunkName, duration, chunk.size);

      return result;
    },

    /**
     * 预加载代码块
     */
    preload: async function(chunkNames) {
      const promises = chunkNames.map(name => {
        return this.lazyLoad(name).catch(err => {
          console.warn(`Failed to preload chunk: ${name}`, err);
        });
      });

      return Promise.all(promises);
    },

    /**
     * 获取未加载的代码块
     */
    getUnloadedChunks: function() {
      return Array.from(this.chunks.values()).filter(chunk => !chunk.loaded);
    }
  };

  /**
   * 高级懒加载管理器
   */
  const LazyLoader = {
    observer: null,
    elements: new Map(),

    /**
     * 初始化懒加载观察器
     */
    init: function() {
      if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        return;
      }

      this.observer = new IntersectionObserver(
        this.handleIntersect.bind(this),
        {
          rootMargin: UltimatePerfConfig.lazyLoad.rootMargin,
          threshold: UltimatePerfConfig.lazyLoad.threshold
        }
      );

      this.observeElements();
    },

    /**
     * 观察元素
     */
    observeElements: function() {
      // 图片
      if (UltimatePerfConfig.lazyLoad.images) {
        document.querySelectorAll('img[data-src]').forEach(img => {
          this.observer.observe(img);
          this.elements.set(img, 'image');
        });
      }

      // 视频
      if (UltimatePerfConfig.lazyLoad.videos) {
        document.querySelectorAll('video[data-src]').forEach(video => {
          this.observer.observe(video);
          this.elements.set(video, 'video');
        });
      }

      // iframe
      if (UltimatePerfConfig.lazyLoad.iframes) {
        document.querySelectorAll('iframe[data-src]').forEach(iframe => {
          this.observer.observe(iframe);
          this.elements.set(iframe, 'iframe');
        });
      }

      // 组件
      if (UltimatePerfConfig.lazyLoad.components) {
        document.querySelectorAll('[data-lazy-component]').forEach(el => {
          this.observer.observe(el);
          this.elements.set(el, 'component');
        });
      }
    },

    /**
     * 处理交叉观察
     */
    handleIntersect: function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const type = this.elements.get(element);

          this.loadElement(element, type);
          this.observer.unobserve(element);
          this.elements.delete(element);
        }
      });
    },

    /**
     * 加载元素
     */
    loadElement: function(element, type) {
      const start = performance.now();

      switch (type) {
        case 'image':
          this.loadImage(element);
          break;
        case 'video':
          this.loadVideo(element);
          break;
        case 'iframe':
          this.loadIframe(element);
          break;
        case 'component':
          this.loadComponent(element);
          break;
      }

      const duration = performance.now() - start;
      PerformanceMonitor.trackLazyLoad(type, duration);
    },

    /**
     * 加载图片
     */
    loadImage: function(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;

      if (src) {
        img.src = src;
      }
      if (srcset) {
        img.srcset = srcset;
      }

      img.onload = () => {
        img.classList.add('zt-lazy-loaded');
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
      };
    },

    /**
     * 加载视频
     */
    loadVideo: function(video) {
      const src = video.dataset.src;
      const poster = video.dataset.poster;

      if (src) {
        video.src = src;
      }
      if (poster) {
        video.poster = poster;
      }

      video.load();
      video.classList.add('zt-lazy-loaded');
    },

    /**
     * 加载 iframe
     */
    loadIframe: function(iframe) {
      const src = iframe.dataset.src;
      if (src) {
        iframe.src = src;
        iframe.classList.add('zt-lazy-loaded');
      }
    },

    /**
     * 加载组件
     */
    loadComponent: async function(element) {
      const componentName = element.dataset.lazyComponent;
      const chunkName = element.dataset.chunk || componentName;

      try {
        const component = await CodeSplitter.lazyLoad(chunkName);
        if (component && component.init) {
          component.init(element);
        }
        element.classList.add('zt-component-loaded');
      } catch (err) {
        console.error(`Failed to load component: ${componentName}`, err);
        element.classList.add('zt-component-error');
      }
    }
  };

  /**
   * 内存泄漏检测与修复
   */
  const MemoryLeakDetector = {
    references: new WeakMap(),
    cleanupCallbacks: new Set(),
    lastMemoryUsage: 0,
    memoryTrend: [],

    /**
     * 初始化内存监控
     */
    init: function() {
      if (!window.performance || !window.performance.memory) {
        console.warn('Memory API not available');
        return;
      }

      // 定期检查内存
      setInterval(() => {
        this.checkMemory();
      }, UltimatePerfConfig.memory.cleanupInterval);

      // 页面卸载时清理
      window.addEventListener('beforeunload', () => {
        this.cleanup();
      });
    },

    /**
     * 追踪对象引用
     */
    track: function(object, context) {
      if (!UltimatePerfConfig.memory.trackReferences) return;

      this.references.set(object, {
        context: context,
        created: Date.now(),
        accessed: Date.now()
      });
    },

    /**
     * 注册清理回调
     */
    registerCleanup: function(callback) {
      this.cleanupCallbacks.add(callback);
    },

    /**
     * 检查内存使用
     */
    checkMemory: function() {
      const memory = performance.memory;
      const usedMB = memory.usedJSHeapSize / (1024 * 1024);
      const totalMB = memory.totalJSHeapSize / (1024 * 1024);
      const limitMB = memory.jsHeapSizeLimit / (1024 * 1024);

      // 记录趋势
      this.memoryTrend.push(usedMB);
      if (this.memoryTrend.length > 10) {
        this.memoryTrend.shift();
      }

      // 检测内存泄漏
      if (this.detectLeak()) {
        console.warn('Potential memory leak detected');
        this.cleanup();
      }

      // 检查是否超过阈值
      if (usedMB > UltimatePerfConfig.memory.maxHeapSize / (1024 * 1024)) {
        console.warn(`Memory usage exceeded threshold: ${usedMB.toFixed(2)}MB`);
        this.aggressiveCleanup();
      }

      PerformanceMonitor.trackMemory(usedMB, totalMB, limitMB);
    },

    /**
     * 检测内存泄漏
     */
    detectLeak: function() {
      if (this.memoryTrend.length < 3) return false;

      // 检查趋势是否持续增长
      const recent = this.memoryTrend.slice(-3);
      const growing = recent.every((val, i) => i === 0 || val > recent[i - 1]);

      // 计算增长率
      const growth = (recent[2] - recent[0]) / recent[0];

      return growing && growth > 0.1; // 增长超过10%
    },

    /**
     * 清理内存
     */
    cleanup: function() {
      // 执行所有清理回调
      this.cleanupCallbacks.forEach(callback => {
        try {
          callback();
        } catch (err) {
          console.error('Cleanup callback error:', err);
        }
      });

      // 清理 DOM 引用
      this.cleanupDOMReferences();

      // 触发垃圾回收（如果可用）
      if (window.gc) {
        window.gc();
      }
    },

    /**
     * 激进清理
     */
    aggressiveCleanup: function() {
      console.warn('Performing aggressive memory cleanup');

      // 清理所有事件监听器
      this.cleanupEventListeners();

      // 清理定时器
      this.cleanupTimers();

      // 清理缓存
      this.cleanupCaches();

      // 执行常规清理
      this.cleanup();
    },

    /**
     * 清理 DOM 引用
     */
    cleanupDOMReferences: function() {
      // 清理不在 DOM 中的元素引用
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.parentElement === null) {
          // 元素已从 DOM 中移除，清理其引用
          if (el._zt_callbacks) {
            el._zt_callbacks.clear();
            delete el._zt_callbacks;
          }
        }
      });
    },

    /**
     * 清理事件监听器
     */
    cleanupEventListeners: function() {
      // 这个功能需要追踪所有添加的事件监听器
      // 在实际实现中，应该使用事件委托来减少监听器数量
    },

    /**
     * 清理定时器
     */
    cleanupTimers: function() {
      // 清理未使用的定时器
      // 这个功能需要追踪所有创建的定时器
    },

    /**
     * 清理缓存
     */
    cleanupCaches: function() {
      // 清理 localStorage
      if (window.localStorage) {
        const keys = Object.keys(localStorage);
        const now = Date.now();

        keys.forEach(key => {
          if (key.startsWith('zt_cache_')) {
            const item = JSON.parse(localStorage.getItem(key));
            if (item.expire && item.expire < now) {
              localStorage.removeItem(key);
            }
          }
        });
      }

      // 清理 sessionStorage
      if (window.sessionStorage) {
        sessionStorage.clear();
      }
    }
  };

  /**
   * 资源预加载管理器
   */
  const ResourcePreloader = {
    /**
     * DNS 预解析
     */
    dnsPrefetch: function(domains) {
      if (!UltimatePerfConfig.preload.dnsPrefetch) return;

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    },

    /**
     * 预连接
     */
    preconnect: function(origins) {
      if (!UltimatePerfConfig.preload.preconnect) return;

      origins.forEach(origin => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        document.head.appendChild(link);
      });
    },

    /**
     * 预加载资源
     */
    preload: function(resources) {
      if (!UltimatePerfConfig.preload.preload) return;

      resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as || 'script';

        if (resource.type) {
          link.type = resource.type;
        }

        if (UltimatePerfConfig.preload.priorityHints && resource.priority) {
          link.setAttribute('importance', resource.priority);
        }

        document.head.appendChild(link);
      });
    },

    /**
     * 预取资源
     */
    prefetch: function(resources) {
      if (!UltimatePerfConfig.preload.prefetch) return;

      resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
      });
    }
  };

  /**
   * 渲染性能优化
   */
  const RenderingOptimizer = {
    rafId: null,
    pendingUpdates: new Set(),

    /**
     * 防抖
     */
    debounce: function(fn, delay) {
      let timeoutId;
      return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    /**
     * 节流
     */
    throttle: function(fn, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    /**
     * RAF 节流
     */
    rafThrottle: function(fn) {
      if (!UltimatePerfConfig.rendering.rafThrottle) {
        return fn;
      }

      return function(...args) {
        if (RenderingOptimizer.rafId === null) {
          RenderingOptimizer.rafId = requestAnimationFrame(() => {
            fn.apply(this, args);
            RenderingOptimizer.rafId = null;
          });
        }
      };
    },

    /**
     * 批量 DOM 更新
     */
    batchUpdate: function(updates) {
      updates.forEach(update => {
        this.pendingUpdates.add(update);
      });

      if (this.rafId === null) {
        this.rafId = requestAnimationFrame(() => {
          this.flushUpdates();
          this.rafId = null;
        });
      }
    },

    /**
     * 刷新待处理的更新
     */
    flushUpdates: function() {
      const fragment = document.createDocumentFragment();

      this.pendingUpdates.forEach(update => {
        try {
          update(fragment);
        } catch (err) {
          console.error('Update error:', err);
        }
      });

      document.body.appendChild(fragment);
      this.pendingUpdates.clear();
    },

    /**
     * 虚拟滚动
     */
    virtualScroll: function(container, itemHeight, renderItem) {
      if (!UltimatePerfConfig.rendering.virtualScroll) return null;

      const viewportHeight = container.clientHeight;
      const visibleCount = Math.ceil(viewportHeight / itemHeight) + 2;
      const scrollTop = container.scrollTop;

      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
      const endIndex = startIndex + visibleCount;

      return { startIndex, endIndex };
    }
  };

  /**
   * 性能监控器
   */
  const PerformanceMonitor = {
    metrics: {
      chunkLoads: [],
      lazyLoads: [],
      memorySnapshots: [],
      renderTimes: []
    },

    /**
     * 追踪代码块加载
     */
    trackChunkLoad: function(name, duration, size) {
      this.metrics.chunkLoads.push({
        name,
        duration,
        size,
        timestamp: Date.now()
      });

      this.checkPerformance('chunkLoad', duration);
    },

    /**
     * 追踪懒加载
     */
    trackLazyLoad: function(type, duration) {
      this.metrics.lazyLoads.push({
        type,
        duration,
        timestamp: Date.now()
      });
    },

    /**
     * 追踪内存使用
     */
    trackMemory: function(used, total, limit) {
      this.metrics.memorySnapshots.push({
        used,
        total,
        limit,
        timestamp: Date.now()
      });
    },

    /**
     * 追踪渲染时间
     */
    trackRender: function(duration) {
      this.metrics.renderTimes.push({
        duration,
        timestamp: Date.now()
      });

      this.checkPerformance('render', duration);
    },

    /**
     * 检查性能指标
     */
    checkPerformance: function(type, value) {
      const target = UltimatePerfConfig.targets[type];

      if (target && value > target) {
        console.warn(`Performance warning: ${type} exceeded target`, {
          value,
          target
        });
      }
    },

    /**
     * 生成性能报告
     */
    generateReport: function() {
      const report = {
        summary: this.getSummary(),
        details: this.metrics,
        recommendations: this.getRecommendations()
      };

      return report;
    },

    /**
     * 获取性能摘要
     */
    getSummary: function() {
      const avgChunkLoad = this.average(this.metrics.chunkLoads.map(m => m.duration));
      const avgLazyLoad = this.average(this.metrics.lazyLoads.map(m => m.duration));
      const avgMemory = this.average(this.metrics.memorySnapshots.map(m => m.used));
      const avgRender = this.average(this.metrics.renderTimes.map(m => m.duration));

      return {
        averageChunkLoad: avgChunkLoad,
        averageLazyLoad: avgLazyLoad,
        averageMemory: avgMemory,
        averageRender: avgRender,
        totalChunks: this.metrics.chunkLoads.length,
        totalLazyLoads: this.metrics.lazyLoads.length
      };
    },

    /**
     * 获取优化建议
     */
    getRecommendations: function() {
      const recommendations = [];

      // 检查代码块加载时间
      const avgChunkLoad = this.average(this.metrics.chunkLoads.map(m => m.duration));
      if (avgChunkLoad > 100) {
        recommendations.push('Consider splitting large chunks into smaller pieces');
      }

      // 检查内存使用
      const avgMemory = this.average(this.metrics.memorySnapshots.map(m => m.used));
      if (avgMemory > 100) {
        recommendations.push('Consider implementing more aggressive memory cleanup');
      }

      // 检查渲染时间
      const avgRender = this.average(this.metrics.renderTimes.map(m => m.duration));
      if (avgRender > 16) { // 超过一帧 (60fps)
        recommendations.push('Consider implementing virtual scrolling for long lists');
      }

      return recommendations;
    },

    /**
     * 计算平均值
     */
    average: function(arr) {
      if (arr.length === 0) return 0;
      return arr.reduce((a, b) => a + b, 0) / arr.length;
    }
  };

  /**
   * 主初始化函数
   */
  const UltimatePerf = {
    init: function() {
      // 初始化懒加载
      LazyLoader.init();

      // 初始化内存监控
      MemoryLeakDetector.init();

      // 预加载关键资源
      this.preloadCriticalResources();

      // 设置性能监控
      this.setupPerformanceMonitoring();

      console.log('🚀 Zootopia Ultimate Performance initialized');
    },

    /**
     * 预加载关键资源
     */
    preloadCriticalResources: function() {
      // DNS 预解析
      ResourcePreloader.dnsPrefetch([
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ]);

      // 预连接
      ResourcePreloader.preconnect([
        'https://fonts.googleapis.com'
      ]);
    },

    /**
     * 设置性能监控
     */
    setupPerformanceMonitoring: function() {
      // 监控页面加载性能
      window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;

        PerformanceMonitor.trackRender(pageLoadTime);

        console.log('📊 Page Performance:', {
          pageLoad: `${pageLoadTime}ms`,
          domReady: `${domReady}ms`
        });
      });

      // 监控 FPS
      this.monitorFPS();
    },

    /**
     * 监控帧率
     */
    monitorFPS: function() {
      let lastTime = performance.now();
      let frames = 0;

      const measureFPS = () => {
        const currentTime = performance.now();
        frames++;

        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));

          if (fps < UltimatePerfConfig.targets.frameRate) {
            console.warn(`⚠️ Low FPS detected: ${fps}`);
          }

          frames = 0;
          lastTime = currentTime;
        }

        requestAnimationFrame(measureFPS);
      };

      requestAnimationFrame(measureFPS);
    }
  };

  // 导出 API
  ZootopiaCore.ultimatePerf = UltimatePerf;
  ZootopiaCore.codeSplitter = CodeSplitter;
  ZootopiaCore.lazyLoader = LazyLoader;
  ZootopiaCore.memoryDetector = MemoryLeakDetector;
  ZootopiaCore.resourcePreloader = ResourcePreloader;
  ZootopiaCore.renderingOptimizer = RenderingOptimizer;
  ZootopiaCore.perfMonitor = PerformanceMonitor;

  // 全局 API
  window.ztRegisterChunk = (name, config) => CodeSplitter.registerChunk(name, config);
  window.ztLazyLoad = (chunkName) => CodeSplitter.lazyLoad(chunkName);
  window.ztPreloadChunks = (chunkNames) => CodeSplitter.preload(chunkNames);

  window.ztTrackMemory = (object, context) => MemoryLeakDetector.track(object, context);
  window.ztRegisterCleanup = (callback) => MemoryLeakDetector.registerCleanup(callback);
  window.ztCleanupMemory = () => MemoryLeakDetector.cleanup();

  window.ztGetPerformanceReport = () => PerformanceMonitor.generateReport();
  window.ztGetPerformanceMetrics = () => PerformanceMonitor.metrics;

  window.ztDebounce = (fn, delay) => RenderingOptimizer.debounce(fn, delay);
  window.ztThrottle = (fn, limit) => RenderingOptimizer.throttle(fn, limit);
  window.ztRafThrottle = (fn) => RenderingOptimizer.rafThrottle(fn);

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    UltimatePerf.init();
  });

})();
