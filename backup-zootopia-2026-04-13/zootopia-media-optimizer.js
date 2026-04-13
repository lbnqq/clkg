/**
 * 疯狂动物城媒体优化系统
 * Zootopia Media Optimizer
 *
 * 图片懒加载、视频优化、响应式媒体处理
 */

(function() {
  'use strict';

  const MediaOptimizerConfig = {
    // 图片懒加载
    lazyLoad: {
      enabled: true,
      threshold: 100,        // 提前加载距离（像素）
      loadDelay: 50          // 延迟加载（毫秒）
    },

    // 响应式图片
    responsiveImages: {
      enabled: true,
      sizes: [480, 768, 1024, 1920],
      formats: ['webp', 'jpg', 'png']
    },

    // 视频优化
    videoOptimization: {
      enabled: true,
      lazyLoad: true,
      preload: 'metadata'
    },

    // 图片优化建议
    optimizationHints: {
      enabled: true,
      maxFileSize: 500 * 1024,  // 500KB
      suggestWebP: true
    },

    // 性能监控
    performance: {
      enabled: true,
      trackLoadTime: true
    }
  };

  /**
   * 媒体优化管理器
   */
  const MediaOptimizer = {
    observer: null,
    processedImages: new Set(),
    processedVideos: new Set(),
    performanceMetrics: {},

    /**
     * 初始化
     */
    init: function() {
      if (MediaOptimizerConfig.lazyLoad.enabled) {
        this.initLazyLoading();
      }

      if (MediaOptimizerConfig.responsiveImages.enabled) {
        this.initResponsiveImages();
      }

      if (MediaOptimizerConfig.videoOptimization.enabled) {
        this.initVideoOptimization();
      }

      if (MediaOptimizerConfig.optimizationHints.enabled) {
        this.initOptimizationHints();
      }

      if (MediaOptimizerConfig.performance.enabled) {
        this.initPerformanceTracking();
      }
    },

    /**
     * 初始化懒加载
     */
    initLazyLoading: function() {
      // 配置 Intersection Observer
      const options = {
        rootMargin: `${MediaOptimizerConfig.lazyLoad.threshold}px`,
        threshold: 0.01
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMedia(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, options);

      // 查找需要懒加载的媒体
      this.observeImages();
      this.observeVideos();

      // 监听动态添加的内容
      this.observeDynamicContent();
    },

    /**
     * 观察图片
     */
    observeImages: function() {
      const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
      images.forEach(img => {
        if (!this.processedImages.has(img)) {
          this.observer.observe(img);
          this.processedImages.add(img);
        }
      });
    },

    /**
     * 观察视频
     */
    observeVideos: function() {
      if (!MediaOptimizerConfig.videoOptimization.lazyLoad) return;

      const videos = document.querySelectorAll('video[data-poster]');
      videos.forEach(video => {
        if (!this.processedVideos.has(video)) {
          this.observer.observe(video);
          this.processedVideos.add(video);
        }
      });
    },

    /**
     * 监听动态内容
     */
    observeDynamicContent: function() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const images = node.querySelectorAll ? node.querySelectorAll('img[data-src], img[loading="lazy"]') : [];
              images.forEach(img => {
                if (!this.processedImages.has(img)) {
                  this.observer.observe(img);
                  this.processedImages.add(img);
                }
              });
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    },

    /**
     * 加载媒体
     */
    loadMedia: function(element) {
      const delay = MediaOptimizerConfig.lazyLoad.loadDelay;

      setTimeout(() => {
        if (element.tagName === 'IMG') {
          this.loadImage(element);
        } else if (element.tagName === 'VIDEO') {
          this.loadVideo(element);
        }
      }, delay);
    },

    /**
     * 加载图片
     */
    loadImage: function(img) {
      const src = img.dataset.src || img.src;

      if (!src) return;

      // 创建新图片预加载
      const tempImg = new Image();

      tempImg.onload = () => {
        img.src = src;
        img.classList.add('zt-loaded');
        img.classList.remove('zt-loading');

        // 移除占位符
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      };

      tempImg.onerror = () => {
        img.classList.add('zt-error');
        img.classList.remove('zt-loading');
      };

      img.classList.add('zt-loading');
      tempImg.src = src;
    },

    /**
     * 加载视频
     */
    loadVideo: function(video) {
      const poster = video.dataset.poster;

      if (poster) {
        video.poster = poster;
      }

      video.preload = MediaOptimizerConfig.videoOptimization.preload;
      video.classList.add('zt-loaded');
    },

    /**
     * 初始化响应式图片
     */
    initResponsiveImages: function() {
      const images = document.querySelectorAll('img:not([srcset])');

      images.forEach(img => {
        this.addResponsiveSupport(img);
      });
    },

    /**
     * 添加响应式支持
     */
    addResponsiveSupport: function(img) {
      const src = img.src;

      if (!src || src.startsWith('data:')) return;

      // 生成不同尺寸的图片URL
      const sizes = MediaOptimizerConfig.responsiveImages.sizes;
      const srcset = sizes.map(size => {
        // 假设使用图片服务或CDN来生成不同尺寸
        // 这里只是一个示例，实际实现需要根据具体的图片服务
        return `${src}?w=${size} ${size}w`;
      }).join(', ');

      img.srcset = srcset;
      img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw');
    },

    /**
     * 初始化视频优化
     */
    initVideoOptimization: function() {
      const videos = document.querySelectorAll('video');

      videos.forEach(video => {
        // 优化预加载设置
        video.preload = MediaOptimizerConfig.videoOptimization.preload;

        // 添加加载指示器
        video.addEventListener('loadstart', () => {
          video.classList.add('zt-loading');
        });

        video.addEventListener('canplay', () => {
          video.classList.remove('zt-loading');
          video.classList.add('zt-loaded');
        });
      });
    },

    /**
     * 初始化优化建议
     */
    initOptimizationHints: function() {
      if (!window.performance || !window.performance.memory) return;

      setInterval(() => {
        this.checkImageSizes();
      }, 30000); // 每30秒检查一次
    },

    /**
     * 检查图片大小
     */
    checkImageSizes: function() {
      const images = document.querySelectorAll('img');
      const largeImages = [];

      images.forEach(img => {
        if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
          largeImages.push({
            element: img,
            width: img.naturalWidth,
            height: img.naturalHeight,
            src: img.src
          });
        }
      });

      if (largeImages.length > 0 && window.console) {
        console.group('🎨 媒体优化建议');
        console.warn(`发现 ${largeImages.length} 个过大的图片，建议压缩以提升加载速度：`);

        largeImages.forEach((item, index) => {
          console.warn(`${index + 1}. ${item.width}x${item.height}px - ${item.src}`);
        });

        console.groupEnd();
      }
    },

    /**
     * 初始化性能追踪
     */
    initPerformanceTracking: function() {
      if (!window.performance) return;

      window.addEventListener('load', () => {
        setTimeout(() => {
          this.collectPerformanceMetrics();
        }, 0);
      });
    },

    /**
     * 收集性能指标
     */
    collectPerformanceMetrics: function() {
      const perfData = window.performance.getEntriesByType('resource');

      const imageMetrics = perfData.filter(entry =>
        entry.initiatorType === 'img'
      );

      const videoMetrics = perfData.filter(entry =>
        entry.initiatorType === 'video'
      );

      this.performanceMetrics = {
        images: {
          count: imageMetrics.length,
          totalSize: imageMetrics.reduce((sum, img) => sum + (img.transferSize || 0), 0),
          averageLoadTime: imageMetrics.reduce((sum, img) => sum + img.duration, 0) / imageMetrics.length || 0
        },
        videos: {
          count: videoMetrics.length,
          totalSize: videoMetrics.reduce((sum, vid) => sum + (vid.transferSize || 0), 0),
          averageLoadTime: videoMetrics.reduce((sum, vid) => sum + vid.duration, 0) / videoMetrics.length || 0
        }
      };

      // 在控制台输出性能报告
      if (window.console && MediaOptimizerConfig.performance.trackLoadTime) {
        this.logPerformanceReport();
      }
    },

    /**
     * 输出性能报告
     */
    logPerformanceReport: function() {
      const metrics = this.performanceMetrics;

      console.group('📊 媒体加载性能报告');

      console.group('📸 图片');
      console.log(`数量: ${metrics.images.count}`);
      console.log(`总大小: ${(metrics.images.totalSize / 1024).toFixed(2)} KB`);
      console.log(`平均加载时间: ${metrics.images.averageLoadTime.toFixed(2)} ms`);
      console.groupEnd();

      if (metrics.videos.count > 0) {
        console.group('🎬 视频');
        console.log(`数量: ${metrics.videos.count}`);
        console.log(`总大小: ${(metrics.videos.totalSize / 1024).toFixed(2)} KB`);
        console.log(`平均加载时间: ${metrics.videos.averageLoadTime.toFixed(2)} ms`);
        console.groupEnd();
      }

      console.groupEnd();
    },

    /**
     * 获取性能指标
     */
    getPerformanceMetrics: function() {
      return this.performanceMetrics;
    },

    /**
     * 强制加载所有图片
     */
    loadAllImages: function() {
      const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
      images.forEach(img => {
        this.loadImage(img);
      });
    },

    /**
     * 优化页面上的所有图片
     */
    optimizeAllImages: function() {
      this.observeImages();
      this.initResponsiveImages();
    }
  };

  // 导出 API
  ZootopiaCore.mediaOptimizer = MediaOptimizer;
  ZootopiaCore.mediaOptimizerConfig = MediaOptimizerConfig;

  // 全局 API
  window.ztOptimizeMedia = () => MediaOptimizer.optimizeAllImages();
  window.ztLoadAllImages = () => MediaOptimizer.loadAllImages();
  window.ztGetMediaMetrics = () => MediaOptimizer.getPerformanceMetrics();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    MediaOptimizer.init();
    console.log('🎨 媒体优化系统已就绪');
  });

})();
