/**
 * 疯狂动物城性能监控系统
 * Zootopia Performance Monitor - 实时性能监测和优化
 */

(function() {
  'use strict';

  // ==================== 性能监控器 ====================
  const PerformanceMonitor = {
    metrics: {
      // 页面加载指标
      pageLoad: {
        domContentLoaded: 0,
        loadComplete: 0,
        firstPaint: 0,
        firstContentfulPaint: 0
      },
      // 运行时指标
      runtime: {
        fps: 0,
        memory: 0,
        timing: 0
      },
      // 资源指标
      resources: {
        scripts: 0,
        styles: 0,
        images: 0
      }
    },

    observers: {},
    isMonitoring: false,

    init: function() {
      if (!('performance' in window)) {
        console.warn('Performance API 不支持');
        return;
      }

      this.startMonitoring();
      this.createPerformanceWidget();
    },

    startMonitoring: function() {
      if (this.isMonitoring) return;

      this.isMonitoring = true;

      // 监控页面加载
      this.observePageLoad();

      // 监控运行时性能
      this.observeRuntime();

      // 监控资源加载
      this.observeResources();

      console.log('📊 性能监控已启动');
    },

    observePageLoad: function() {
      // DOM 内容加载
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.metrics.pageLoad.domContentLoaded = performance.now();
        });
      } else {
        this.metrics.pageLoad.domContentLoaded = performance.now();
      }

      // 页面完全加载
      window.addEventListener('load', () => {
        this.metrics.pageLoad.loadComplete = performance.now();

        // 使用 PerformanceObserver 监控 Paint 指标
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-paint') {
                this.metrics.pageLoad.firstPaint = entry.startTime;
              } else if (entry.name === 'first-contentful-paint') {
                this.metrics.pageLoad.firstContentfulPaint = entry.startTime;
              }
            }
            this.updateWidget();
          });

          observer.observe({ entryTypes: ['paint'] });
          this.observers.paint = observer;
        }

        this.updateWidget();
      });
    },

    observeRuntime: function() {
      // FPS 监控
      this.measureFPS();

      // 内存监控
      if (performance.memory) {
        setInterval(() => {
          this.metrics.runtime.memory = performance.memory.usedJSHeapSize / 1048576; // MB
          this.updateWidget();
        }, 5000);
      }
    },

    measureFPS: function() {
      let frames = 0;
      let lastTime = performance.now();

      const measure = () => {
        frames++;
        const currentTime = performance.now();

        if (currentTime >= lastTime + 1000) {
          this.metrics.runtime.fps = Math.round((frames * 1000) / (currentTime - lastTime));
          frames = 0;
          lastTime = currentTime;
          this.updateWidget();

          // 检测性能问题
          if (this.metrics.runtime.fps < 30) {
            this.warnLowFPS();
          }
        }

        if (this.isMonitoring) {
          requestAnimationFrame(measure);
        }
      };

      requestAnimationFrame(measure);
    },

    observeResources: function() {
      // 统计资源
      setTimeout(() => {
        const entries = performance.getEntriesByType('resource');

        entries.forEach(entry => {
          const url = new URL(entry.name).pathname;

          if (url.endsWith('.js')) {
            this.metrics.resources.scripts += entry.transferSize || 0;
          } else if (url.endsWith('.css')) {
            this.metrics.resources.styles += entry.transferSize || 0;
          } else if (url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
            this.metrics.resources.images += entry.transferSize || 0;
          }
        });

        this.updateWidget();
      }, 2000);
    },

    warnLowFPS: function() {
      // FPS 过低警告
      if (!document.querySelector('.zt-perf-warning')) {
        const warning = document.createElement('div');
        warning.className = 'zt-perf-warning zt-toast';
        warning.textContent = '⚠️ FPS 过低，可能影响体验';
        document.body.appendChild(warning);

        setTimeout(() => warning.remove(), 3000);
      }
    },

    createPerformanceWidget: function() {
      const widget = document.createElement('div');
      widget.className = 'zt-perf-widget';
      widget.innerHTML = `
        <div class="zt-perf-header">
          <span>📊 性能监控</span>
          <button class="zt-perf-close">×</button>
        </div>
        <div class="zt-perf-body">
          <div class="zt-perf-item">
            <span class="zt-perf-label">加载时间</span>
            <span class="zt-perf-value" id="zt-load-time">-</span>
          </div>
          <div class="zt-perf-item">
            <span class="zt-perf-label">FPS</span>
            <span class="zt-perf-value" id="zt-fps">-</span>
          </div>
          <div class="zt-perf-item">
            <span class="zt-perf-label">内存</span>
            <span class="zt-perf-value" id="zt-memory">-</span>
          </div>
          <div class="zt-perf-item">
            <span class="zt-perf-label">脚本</span>
            <span class="zt-perf-value" id="zt-scripts">-</span>
          </div>
          <div class="zt-perf-item">
            <span class="zt-perf-label">样式</span>
            <span class="zt-perf-value" id="zt-styles">-</span>
          </div>
        </div>
      `;

      widget.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: rgba(26, 26, 46, 0.95);
        color: white;
        border-radius: 16px;
        padding: 1rem;
        z-index: 998;
        font-size: 14px;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        min-width: 250px;
      `;

      // 默认隐藏，可通过快捷键显示
      widget.style.display = 'none';

      document.body.appendChild(widget);

      // 绑定事件
      const closeBtn = widget.querySelector('.zt-perf-close');
      ZootopiaCore.events.on(closeBtn, 'click', () => {
        widget.style.display = 'none';
      });

      // 快捷键: Ctrl + Shift + P
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
          e.preventDefault();
          widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
        }
      });

      this.widget = widget;
    },

    updateWidget: function() {
      if (!this.widget) return;

      // 更新加载时间
      if (this.metrics.pageLoad.loadComplete) {
        const loadTime = Math.round(this.metrics.pageLoad.loadComplete);
        const loadTimeEl = document.getElementById('zt-load-time');
        if (loadTimeEl) loadTimeEl.textContent = this.formatTime(loadTime);
      }

      // 更新 FPS
      const fpsEl = document.getElementById('zt-fps');
      if (fpsEl) {
        fpsEl.textContent = this.metrics.runtime.fps + ' FPS';
        fpsEl.style.color = this.metrics.runtime.fps < 30 ? '#EE5A24' : '#10AC84';
      }

      // 更新内存
      const memEl = document.getElementById('zt-memory');
      if (memEl) {
        memEl.textContent = this.metrics.runtime.memory.toFixed(1) + ' MB';
        memEl.style.color = this.metrics.runtime.memory > 50 ? '#EE5A24' : '#10AC84';
      }

      // 更新脚本大小
      const scriptsEl = document.getElementById('zt-scripts');
      if (scriptsEl) {
        scriptsEl.textContent = this.formatSize(this.metrics.resources.scripts);
      }

      // 更新样式大小
      const stylesEl = document.getElementById('zt-styles');
      if (stylesEl) {
        stylesEl.textContent = this.formatSize(this.metrics.resources.styles);
      }
    },

    formatTime: function(ms) {
      if (ms < 1000) return ms + 'ms';
      return (ms / 1000).toFixed(2) + 's';
    },

    formatSize: function(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    },

    getReport: function() {
      return {
        pageLoad: this.metrics.pageLoad,
        runtime: this.metrics.runtime,
        resources: this.metrics.resources,
        score: this.calculateScore()
      };
    },

    calculateScore: function() {
      let score = 100;

      // 加载时间评分
      const loadTime = this.metrics.pageLoad.loadComplete;
      if (loadTime > 3000) score -= 20;
      else if (loadTime > 2000) score -= 10;
      else if (loadTime < 1000) score += 10;

      // FPS 评分
      const fps = this.metrics.runtime.fps;
      if (fps < 30) score -= 20;
      else if (fps < 50) score -= 10;
      else if (fps > 55) score += 10;

      // 内存评分
      const memory = this.metrics.runtime.memory;
      if (memory > 100) score -= 20;
      else if (memory > 50) score -= 10;
      else if (memory < 30) score += 10;

      return Math.max(0, Math.min(100, score));
    }
  };

  // ==================== 性能优化器 ====================
  const PerformanceOptimizer = {
    // 延迟加载非关键资源
    deferLoading: function() {
      // 延迟加载图片
      const images = document.querySelectorAll('img[data-src]');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute('data-src');
              observer.unobserve(img);
            }
          });
        });

        images.forEach(img => observer.observe(img));
      }
    },

    // 预加载关键资源
    preloadCritical: function() {
      const criticalResources = [
        '/js/zootopia-core.js',
        '/js/zootopia-main.js',
        '/css/zootopia-optimized.css'
      ];

      criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = url.endsWith('.js') ? 'script' : 'style';
        document.head.appendChild(link);
      });
    },

    // 优化字体加载
    optimizeFonts: function() {
      // 使用 font-display: swap 优化字体加载
      const fonts = document.querySelectorAll('link[rel="stylesheet"][href*="fonts"]');
      fonts.forEach(font => {
        // 添加字体加载优化
        font.media = 'print';
        font.onload = function() {
          this.media = 'all';
        };
      });
    },

    // 优化脚本执行
    optimizeScripts: function() {
      // 使用 defer 延迟非关键脚本
      const nonCriticalScripts = [
        'zootopia-games-system.js',
        'zootopia-music-system.js',
        'zootopia-social-system.js'
      ];

      nonCriticalScripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          script.defer = true;
        }
      });
    }
  };

  // ==================== 关键路径优化 ====================
  const CriticalPathOptimizer = {
    // 识别关键路径
    identifyCriticalPath: function() {
      return [
        'zootopia-core.js',
        'zootopia-main.js',
        'zootopia-optimized.css'
      ];
    },

    // 预连接关键域名
    preconnectDomains: function() {
      const domains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = 'https://' + domain;
        document.head.appendChild(link);
      });
    },

    // 优化资源加载顺序
    optimizeLoadingOrder: function() {
      const critical = this.identifyCriticalPath();

      // 确保关键资源优先加载
      critical.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/' + resource;
        link.as = resource.endsWith('.js') ? 'script' : 'style';
        link.setAttribute('importance', 'high');
        document.head.appendChild(link);
      });
    }
  };

  // ==================== 性能报告生成器 ====================
  const ReportGenerator = {
    generate: function() {
      const report = PerformanceMonitor.getReport();

      return {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        metrics: report,
        recommendations: this.getRecommendations(report)
      };
    },

    getRecommendations: function(report) {
      const recommendations = [];

      // 加载时间建议
      if (report.pageLoad.loadComplete > 3000) {
        recommendations.push({
          type: 'warning',
          message: '页面加载时间过长',
          suggestion: '考虑延迟加载非关键功能'
        });
      }

      // FPS 建议
      if (report.runtime.fps < 30) {
        recommendations.push({
          type: 'error',
          message: 'FPS 过低',
          suggestion: '减少并发动画数量'
        });
      }

      // 内存建议
      if (report.runtime.memory > 100) {
        recommendations.push({
          type: 'warning',
          message: '内存使用过高',
          suggestion: '检查是否有内存泄漏'
        });
      }

      // 脚本大小建议
      if (report.resources.scripts > 500000) {
        recommendations.push({
          type: 'info',
          message: '脚本文件较大',
          suggestion: '考虑代码分割'
        });
      }

      return recommendations;
    },

    exportReport: function() {
      const report = this.generate();

      // 可以上传到服务器或保存到本地
      const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zt-perf-report-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      console.log('📊 性能报告已导出');
      return report;
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.performance = PerformanceMonitor;
  ZootopiaCore.optimizer = PerformanceOptimizer;
  ZootopiaCore.criticalPath = CriticalPathOptimizer;
  ZootopiaCore.report = ReportGenerator;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    // 生产环境不自动启动监控
    if (localStorage.getItem('zt_enable_monitoring') === 'true' ||
        window.location.search.includes('zt_debug=true')) {
      PerformanceMonitor.init();
    }

    // 执行性能优化
    PerformanceOptimizer.deferLoading();
    PerformanceOptimizer.preloadCritical();
    CriticalPathOptimizer.preconnectDomains();
    CriticalPathOptimizer.optimizeLoadingOrder();

    console.log('⚡ Zootopia 性能优化已应用');
  });

  // ==================== 全局 API ====================
  // 获取性能报告
  window.ztGetPerformanceReport = () => ReportGenerator.exportReport();

  // 显示性能监控
  window.ztShowPerformanceWidget = () => {
    if (PerformanceMonitor.widget) {
      PerformanceMonitor.widget.style.display = 'block';
    }
  };

  // 启用监控
  window.ztEnableMonitoring = () => {
    localStorage.setItem('zt_enable_monitoring', 'true');
    PerformanceMonitor.init();
  };

})();
