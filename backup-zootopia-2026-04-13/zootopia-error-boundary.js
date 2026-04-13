/**
 * 疯狂动物城错误边界系统
 * Zootopia Error Boundary - 错误捕获、优雅降级、用户友好提示
 */

(function() {
  'use strict';

  // ==================== 错误配置 ====================
  const ErrorConfig = {
    // 错误报告
    reporting: {
      enabled: true,
      endpoint: null, // 可配置的错误上报端点
      includeStackTrace: true,
      maxReports: 10
    },

    // 用户提示
    notifications: {
      showToUser: true,
      friendlyMessages: true,
      reportAction: 'https://github.com/your-repo/issues'
    },

    // 错误分类
    categories: {
      network: {
        name: '网络错误',
        icon: '🌐',
        color: '#0ABDE3',
        userMessage: '网络连接出现问题，请检查您的网络连接'
      },
      script: {
        name: '脚本错误',
        icon: '📜',
        color: '#EE5A24',
        userMessage: '页面运行出现问题，请刷新页面重试'
      },
      resource: {
        name: '资源错误',
        icon: '📦',
        color: '#FF9F43',
        userMessage: '资源加载失败，请刷新页面'
      },
      permission: {
        name: '权限错误',
        icon: '🔒',
        color: '#10AC84',
        userMessage: '权限不足，请检查浏览器设置'
      }
    }
  };

  // ==================== 错误记录器 ====================
  const ErrorReporter = {
    reports: [],

    init: function() {
      this.setupGlobalHandlers();
      this.loadReports();
    },

    // 设置全局错误处理器
    setupGlobalHandlers: function() {
      // JavaScript 错误
      window.addEventListener('error', (e) => {
        this.reportError({
          type: 'script',
          message: e.message,
          source: e.filename,
          line: e.lineno,
          column: e.colno,
          error: e.error
        });
      });

      // 未处理的 Promise 拒绝
      window.addEventListener('unhandledrejection', (e) => {
        this.reportError({
          type: 'script',
          message: e.reason?.message || 'Promise rejected',
          error: e.reason
        });
      });

      // 资源加载错误
      window.addEventListener('error', (e) => {
        if (e.target !== window) {
          this.reportError({
            type: 'resource',
            message: `资源加载失败: ${e.target.src || e.target.href}`,
            source: e.target.src || e.target.href,
            tag: e.target.tagName
          });
        }
      });
    },

    // 报告错误
    reportError: function(errorInfo) {
      // 生成错误报告
      const report = {
        id: this.generateReportId(),
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...errorInfo
      };

      // 保存到本地
      this.reports.push(report);
      this.saveReports();

      // 限制报告数量
      if (this.reports.length > ErrorConfig.reporting.maxReports) {
        this.reports.shift();
        this.saveReports();
      }

      // 上报到服务器（如果配置了）
      if (ErrorConfig.reporting.enabled && ErrorConfig.reporting.endpoint) {
        this.sendToServer(report);
      }

      // 显示用户提示
      if (ErrorConfig.notifications.showToUser) {
        this.showErrorNotification(report);
      }

      // 控制台输出
      console.error('❌ 错误报告:', report);

      return report.id;
    },

    // 生成报告 ID
    generateReportId: function() {
      return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 保存报告
    saveReports: function() {
      try {
        localStorage.setItem(
          'zt_error_reports',
          JSON.stringify(this.reports.slice(-100)) // 只保留最近 100 条
        );
      } catch (e) {
        console.warn('无法保存错误报告:', e);
      }
    },

    // 加载报告
    loadReports: function() {
      try {
        const data = localStorage.getItem('zt_error_reports');
        this.reports = data ? JSON.parse(data) : [];
      } catch (e) {
        this.reports = [];
      }
    },

    // 发送到服务器
    sendToServer: function(report) {
      if (!ErrorConfig.reporting.endpoint) return;

      fetch(ErrorConfig.reporting.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      }).catch(e => {
        console.warn('错误上报失败:', e);
      });
    },

    // 显示错误通知
    showErrorNotification: function(report) {
      if (!window.ztNotify) return;

      const category = this.categorizeError(report);
      const config = ErrorConfig.categories[category];

      if (config) {
        ztNotify({
          type: 'error',
          title: `${config.icon} ${config.name}`,
          message: config.userMessage,
          duration: 5000,
          onClick: () => {
            // 打开问题报告页面
            if (ErrorConfig.notifications.reportAction) {
              window.open(ErrorConfig.notifications.reportAction, '_blank');
            }
          }
        });
      }
    },

    // 分类错误
    categorizeError: function(error) {
      if (error.type === 'resource') return 'resource';
      if (error.message?.includes('network') || error.message?.includes('fetch')) return 'network';
      if (error.message?.includes('permission')) return 'permission';
      return 'script';
    },

    // 获取错误统计
    getStats: function() {
      const stats = {
        total: this.reports.length,
        byType: {},
        recent: this.reports.slice(-10)
      };

      this.reports.forEach(report => {
        stats.byType[report.type] = (stats.byType[report.type] || 0) + 1;
      });

      return stats;
    }
  };

  // ==================== 优雅降级管理器 ====================
  const GracefulDegradation = {
    // 检测功能支持并降级
    checkAndDegrade: function(feature, fallback) {
      const checks = {
        'IntersectionObserver': () => 'IntersectionObserver' in window,
        'fetch': () => 'fetch' in window,
        'Promise': () => 'Promise' in window,
        'CustomEvent': () => 'CustomEvent' in window,
        'requestAnimationFrame': () => 'requestAnimationFrame' in window,
        'classList': () => 'classList' in document.createElement('div'),
        'localStorage': () => {
          try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
          } catch (e) {
            return false;
          }
        }
      };

      const isSupported = checks[feature] ? checks[feature]() : false;

      if (!isSupported && fallback) {
        console.warn(`⚠️ ${feature} 不支持，使用降级方案`);
        fallback();
      }

      return isSupported;
    },

    // 获取 Polyfill
    getPolyfill: function(feature) {
      const polyfills = {
        'IntersectionObserver': 'https://polyfill.io/v3/polyfill.intersection-observer.min.js',
        'fetch': 'https://cdnjs.cloudflare.com/ajax/libs/fetch/3.6.2/fetch.min.js',
        'Promise': 'https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.2.8/es6-promise.min.js'
      };

      return polyfills[feature];
    },

    // 加载 Polyfill
    loadPolyfill: function(feature, callback) {
      const url = this.getPolyfill(feature);
      if (!url) return;

      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = callback;
      script.onerror = () => {
        console.warn(`Polyfill 加载失败: ${feature}`);
      };
      document.head.appendChild(script);
    }
  };

  // ==================== 错误边界组件 ====================
  const ErrorBoundary = {
    boundaries: new Map(),

    // 为元素创建错误边界
    createBoundary: function(element, options = {}) {
      const {
        onError = null,
        fallback = null,
        name = 'default'
      } = options;

      const boundaryId = this.generateId();

      const boundary = {
        element,
        onError,
        fallback,
        name,
        originalHTML: element.innerHTML
      };

      this.boundaries.set(boundaryId, boundary);

      return boundaryId;
    },

    // 移除错误边界
    removeBoundary: function(boundaryId) {
      const boundary = this.boundaries.get(boundaryId);
      if (boundary) {
        this.boundaries.delete(boundaryId);
      }
    },

    // 生成唯一 ID
    generateId: function() {
      return `boundary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 捕获组件错误
    captureError: function(boundaryId, error) {
      const boundary = this.boundaries.get(boundaryId);
      if (!boundary) return false;

      console.error(`❌ 错误边界 [${boundary.name}] 捕获错误:`, error);

      // 执行错误回调
      if (boundary.onError) {
        try {
          boundary.onError(error, boundary.element);
        } catch (e) {
          console.error('错误回调执行失败:', e);
        }
      }

      // 执行降级方案
      if (boundary.fallback) {
        try {
          boundary.fallback(boundary.element);
        } catch (e) {
          console.error('降级方案执行失败:', e);
        }
      }

      return true;
    }
  };

  // ==================== 全局错误处理 ====================
  const GlobalErrorHandler = {
    init: function() {
      this.setupSafeExecution();
      this.patchCriticalAPIs();
    },

    // 安全执行包装器
    setupSafeExecution: function() {
      // 包装 ZootopiaCore 的关键方法
      const criticalAPIs = [
        'animate',
        'animateBatch',
        'showToast',
        'playTrack',
        'startGame'
      ];

      criticalAPIs.forEach(methodName => {
        const original = ZootopiaCore?.[methodName];
        if (typeof original === 'function') {
          ZootopiaCore[`_safe_${methodName}`] = function(...args) {
            try {
              return original.apply(this, args);
            } catch (e) {
              console.error(`${methodName} 执行失败:`, e);
              ErrorReporter.reportError({
                type: 'script',
                message: e.message,
                method: methodName,
                args: args
              });
              return null;
            }
          };
        }
      });
    },

    // 修补关键 API
    patchCriticalAPIs: function() {
      // 补丁 console 方法（防止被覆盖）
      const consoleMethods = ['log', 'warn', 'error'];
      const originalConsole = {};

      consoleMethods.forEach(method => {
        originalConsole[method] = console[method];
      });

      consoleMethods.forEach(method => {
        console[method] = function(...args) {
          try {
            originalConsole[method](...args);
          } catch (e) {
            // 静默失败，避免无限循环
          }
        };
      });
    }
  };

    // ==================== 导出 API ====================
    ZootopiaCore.errorBoundary = ErrorBoundary;
    ZootopiaCore.errorReporter = ErrorReporter;
    ZootopiaCore.gracefulDegradation = GracefulDegradation;
    ZootopiaCore.errorConfig = ErrorConfig;

    // ==================== 全局 API ====================
    // 报告错误
    window.ztReportError = (errorInfo) => ErrorReporter.reportError(errorInfo);

    // 创建错误边界
    window.ztCreateErrorBoundary = (element, options) => {
      return ErrorBoundary.createBoundary(element, options);
    };

    // 移除错误边界
    window.ztRemoveErrorBoundary = (boundaryId) => => {
      ErrorBoundary.removeBoundary(boundaryId);
    };

    // 检查功能支持
    window.ztCheckFeature = (feature, fallback) => {
      return GracefulDegradation.checkAndDegrade(feature, fallback);
    };

    // 获取错误统计
    window.ztGetErrorStats = () => ErrorReporter.getStats();

    // ==================== 自动初始化 ====================
    ZootopiaCore.dom.then(() => {
      ErrorReporter.init();
      GlobalErrorHandler.init();

      console.log('🛡️ 错误边界系统已就绪');
    });

})();
