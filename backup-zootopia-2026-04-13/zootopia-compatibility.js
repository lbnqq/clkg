/**
 * 疯狂动物城兼容性测试和修复
 * Zootopia Compatibility - 浏览器兼容性检测和修复
 */

(function() {
  'use strict';

  // ==================== 浏览器检测 ====================
  const BrowserDetector = {
    browser: null,
    version: null,
    os: null,

    init: function() {
      this.detectBrowser();
      this.detectOS();
      this.applyFixes();
    },

    detectBrowser: function() {
      const ua = navigator.userAgent;

      // Chrome
      if (ua.includes('Chrome') && !ua.includes('Edg')) {
        this.browser = 'Chrome';
        this.version = ua.match(/Chrome\/(\d+)/)?.[1] || '';
      }
      // Firefox
      else if (ua.includes('Firefox')) {
        this.browser = 'Firefox';
        this.version = ua.match(/Firefox\/(\d+)/)?.[1] || '';
      }
      // Safari
      else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        this.browser = 'Safari';
        this.version = ua.match(/Version\/(\d+)/)?.[1] || '';
      }
      // Edge
      else if (ua.includes('Edg')) {
        this.browser = 'Edge';
        this.version = ua.match(/Edg\/(\d+)/)?.[1] || '';
      }
      // IE
      else if (ua.includes('MSIE') || ua.includes('Trident/')) {
        this.browser = 'IE';
        this.version = ua.match(/(?:MSIE |rv:)(\d+)/)?.[1] || '';
      }
      else {
        this.browser = 'Unknown';
        this.version = '';
      }
    },

    detectOS: function() {
      const ua = navigator.userAgent;

      if (ua.includes('Windows')) {
        this.os = 'Windows';
      } else if (ua.includes('Mac')) {
        this.os = 'macOS';
      } else if (ua.includes('Linux')) {
        this.os = 'Linux';
      } else if (ua.includes('Android')) {
        this.os = 'Android';
      } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
        this.os = 'iOS';
      } else {
        this.os = 'Unknown';
      }
    },

    isSupported: function() {
      // 不支持 IE11 及以下
      if (this.browser === 'IE' && parseInt(this.version) <= 11) {
        return false;
      }

      // 检查必需的 API
      const requiredAPIs = [
        'querySelector',
        'addEventListener',
        'classList',
        'JSON',
        'Promise',
        'fetch',
        'IntersectionObserver'
      ];

      return requiredAPIs.every(api => api in window || api in document);
    },

    applyFixes: function() {
      // iOS Safari 修复
      if (this.browser === 'Safari' && this.os === 'iOS') {
        this.fixIOSSafari();
      }

      // Firefox 修复
      if (this.browser === 'Firefox') {
        this.fixFirefox();
      }

      // 移动端修复
      if (ZootopiaCore.responsive.device.isMobile) {
        this.fixMobile();
      }
    },

    fixIOSSafari: function() {
      // 修复 iOS Safari 的 100vh 问题
      const style = document.createElement('style');
      style.textContent = `
        .zt-fixed {
          position: fixed;
          bottom: env(safe-area-inset-bottom);
        }
      `;
      document.head.appendChild(style);

      // 修复 iOS Safari 的 active 状态
      document.addEventListener('touchstart', () => {
        document.body.style.webkitUserSelect = 'text';
      }, { passive: true });
    },

    fixFirefox: function() {
      // 修复 Firefox 的滚动问题
      document.documentElement.style.scrollBehavior = 'auto';
    },

    fixMobile: function() {
      // 移动端通用修复
      document.addEventListener('touchstart', function() {}, { passive: true });

      // 防止双击缩放
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd < 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      }, { passive: false });
    }
  };

  // ==================== Polyfill 管理器 ====================
  const PolyfillManager = {
    polyfills: {},

    init: function() {
      this.checkPolyfills();
      this.loadRequiredPolyfills();
    },

    checkPolyfills: function() {
      // 检查并添加所需的 polyfills

      // IntersectionObserver polyfill
      if (!('IntersectionObserver' in window)) {
        this.loadPolyfill('intersection-observer');
      }

      // fetch polyfill
      if (!('fetch' in window)) {
        this.loadPolyfill('fetch');
      }

      // Promise polyfill
      if (!('Promise' in window)) {
        this.loadPolyfill('promise');
      }

      // Custom Elements polyfill
      if (!('customElements' in window)) {
        this.loadPolyfill('custom-elements');
      }
    },

    loadPolyfill: function(name) {
      // 这里可以添加 polyfill CDN 链接
      console.warn('需要 polyfill:', name);
    },

    loadRequiredPolyfills: function() {
      // 加载必需的 polyfills
      const polyfills = [
        // 可以添加 polyfill CDN 链接
      ];

      polyfills.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.head.appendChild(script);
      });
    }
  };

  // ==================== 功能降级处理 ====================
  const GracefulDegradation = {
    init: function() {
      this.checkFeatures();
      this.applyFallbacks();
    },

    checkFeatures: function() {
      this.features = {
        animation: this.supportsAnimation(),
        localStorage: this.supportsLocalStorage(),
        sessionStorage: this.supportsSessionStorage(),
        webWorker: this.supportsWebWorker(),
        serviceWorker: this.supportsServiceWorker()
      };
    },

    supportsAnimation: function() {
      return 'animate' in document.createElement('div');
    },

    supportsLocalStorage: function() {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },

    supportsSessionStorage: function() {
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    },

    supportsWebWorker: function() {
      return 'Worker' in window;
    },

    supportsServiceWorker: function() {
      return 'serviceWorker' in navigator;
    },

    applyFallbacks: function() {
      // 动画降级
      if (!this.features.animation) {
        document.documentElement.classList.add('zt-no-animation');
      }

      // localStorage 降级
      if (!this.features.localStorage) {
        this.storageFallback();
      }
    },

    storageFallback: function() {
      // 使用 sessionStorage 替代 localStorage
      if (this.features.sessionStorage) {
        // 数据将只在会话期间保存
        console.warn('localStorage 不可用，使用 sessionStorage 替代');
      }
    }
  };

  // ==================== 兼容性测试 ====================
  const CompatibilityTester = {
    runTests: function() {
      const results = {
        essential: [],
        important: [],
        optional: []
      };

      // 基础功能测试
      results.essential.push({
        name: 'DOM 操作',
        test: () => typeof document.querySelector === 'function',
        passed: typeof document.querySelector === 'function'
      });

      results.essential.push({
        name: '事件监听',
        test: () => typeof document.addEventListener === 'function',
        passed: typeof document.addEventListener === 'function'
      });

      results.essential.push({
        name: 'JSON 支持',
        test: () => typeof JSON === 'object',
        passed: typeof JSON === 'object'
      });

      results.important.push({
        name: 'Promise 支持',
        test: () => typeof Promise === 'function',
        passed: typeof Promise === 'function'
      });

      results.important.push({
        name: 'Fetch API',
        test: () => typeof fetch === 'function',
        passed: typeof fetch === 'function'
      });

      results.important.push({
        name: 'IntersectionObserver',
        test: () => 'IntersectionObserver' in window,
        passed: 'IntersectionObserver' in window
      });

      results.optional.push({
        name: 'Web Worker',
        test: () => 'Worker' in window,
        passed: 'Worker' in window
      });

      results.optional.push({
        name: 'Service Worker',
        test: () => 'serviceWorker' in navigator,
        passed: 'serviceWorker' in navigator
      });

      // 生成测试报告
      this.generateReport(results);
    },

    generateReport: function(results) {
      const report = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        browser: BrowserDetector.browser,
        version: BrowserDetector.version,
        os: BrowserDetector.os,
        results: results,
        summary: this.summarizeResults(results)
      };

      console.table(results.essential.map(r => ({
        功能: r.name,
        状态: r.passed ? '✅' : '❌'
      })));

      return report;
    },

    summarizeResults: function(results) {
      const essentialPassed = results.essential.filter(r => r.passed).length;
      const essentialTotal = results.essential.length;

      const importantPassed = results.important.filter(r => r.passed).length;
      const importantTotal = results.important.length;

      return {
        essential: essentialPassed + '/' + essentialTotal,
        important: importantPassed + '/' + importantTotal,
        supported: essentialPassed === essentialTotal
      };
    }
  };

  // ==================== 用户代理提示 ====================
  const UserAgentNotifier = {
    shown: false,

    showIfNeeded: function() {
      if (this.shown) return;

      const detector = BrowserDetector;

      // IE11 及以下
      if (detector.browser === 'IE' && parseInt(detector.version) <= 11) {
        this.showNotification(
          '您的浏览器版本过旧',
          '为了获得最佳体验，请升级到现代浏览器（Chrome、Firefox、Safari）',
          'error'
        );
        this.shown = true;
      }
    },

    showNotification: function(title, message, type = 'info') {
      // 使用 ZootopiaCore 的 toast 通知
      ZootopiaCore.social.showToast(message, 5000);
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.compatibility = {
    detector: BrowserDetector,
    polyfills: PolyfillManager,
    degradation: GracefulDegradation,
    tester: CompatibilityTester,
    notifier: UserAgentNotifier
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    BrowserDetector.init();
    PolyfillManager.init();
    GracefulDegradation.init();
    UserAgentNotifier.showIfNeeded();

    console.log('🌐 兼容性检查已完成');
  });

  // ==================== 全局 API ====================
  // 检查浏览器兼容性
  window.ztCheckCompatibility = () => CompatibilityTester.runTests();

  // 获取浏览器信息
  window.ztGetBrowserInfo = () => ({
    browser: BrowserDetector.browser,
    version: BrowserDetector.version,
    os: BrowserDetector.os,
    supported: BrowserDetector.isSupported()
  });

})();
