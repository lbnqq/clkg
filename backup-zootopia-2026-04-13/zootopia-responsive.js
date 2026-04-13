/**
 * 疯狂动物城响应式系统
 * Zootopia Responsive System - 移动端优化和触摸支持
 */

(function() {
  'use strict';

  // ==================== 设备检测 ====================
  const DeviceDetector = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    touchSupported: false,

    init: function() {
      this.touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      this.updateDevice();

      window.addEventListener('resize', ZootopiaCore.utils.debounce(() => {
        this.updateDevice();
      }, 250));
    },

    updateDevice: function() {
      const width = window.innerWidth;

      this.isMobile = width < 768;
      this.isTablet = width >= 768 && width < 1024;
      this.isDesktop = width >= 1024;

      // 更新 body 类
      document.body.classList.toggle('zt-mobile', this.isMobile);
      document.body.classList.toggle('zt-tablet', this.isTablet);
      document.body.classList.toggle('zt-desktop', this.isDesktop);
    }
  };

  // ==================== 触摸手势管理器 ====================
  const TouchManager = {
    touches: new Map(),
    swipeThreshold: 50,
    longPressDelay: 500,

    init: function() {
      if (!DeviceDetector.touchSupported) return;

      // 全局触摸事件委托
      ZootopiaCore.events.delegate(document, '[data-zt-swipe]', 'touchstart', this.handleTouchStart.bind(this), { passive: true });
      ZootopiaCore.events.delegate(document, '[data-zt-swipe]', 'touchmove', this.handleTouchMove.bind(this), { passive: true });
      ZootopiaCore.events.delegate(document, '[data-zt-swipe]', 'touchend', this.handleTouchEnd.bind(this));
    },

    handleTouchStart: function(e) {
      const touch = e.changedTouches[0];
      const element = e.currentTarget;

      this.touches.set(element, {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        longPressTimer: setTimeout(() => {
          this.triggerAction(element, 'longpress', e);
        }, this.longPressDelay)
      });
    },

    handleTouchMove: function(e) {
      const element = e.currentTarget;
      const touchData = this.touches.get(element);

      if (touchData) {
        // 取消长按
        clearTimeout(touchData.longPressTimer);
      }
    },

    handleTouchEnd: function(e) {
      const element = e.currentTarget;
      const touchData = this.touches.get(element);

      if (!touchData) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchData.startX;
      const deltaY = touch.clientY - touchData.startY;
      const deltaTime = Date.now() - touchData.startTime;

      // 取消长按
      clearTimeout(touchData.longPressTimer);

      // 检测滑动
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.swipeThreshold) {
        if (deltaX > 0) {
          this.triggerAction(element, 'swiperight', e);
        } else {
          this.triggerAction(element, 'swipeleft', e);
        }
      } else if (Math.abs(deltaY) > this.swipeThreshold) {
        if (deltaY > 0) {
          this.triggerAction(element, 'swipedown', e);
        } else {
          this.triggerAction(element, 'swipeup', e);
        }
      }

      // 检测点击
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 300) {
        this.triggerAction(element, 'tap', e);
      }

      this.touches.delete(element);
    },

    triggerAction: function(element, action, event) {
      const handler = element.getAttribute(`data-zt-${action}`);
      if (handler) {
        // 执行 JavaScript
        try {
          new Function('event', handler)(event);
        } catch (error) {
          console.error(`触摸动作处理器错误:`, error);
        }
      }

      // 触发自定义事件
      element.dispatchEvent(new CustomEvent(`zt:${action}`, {
        detail: { originalEvent: event },
        bubbles: true
      }));
    }
  };

  // ==================== 响应式组件适配器 ====================
  const ResponsiveAdapter = {
    breakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1440
    },

    // 获取当前断点
    getCurrentBreakpoint: function() {
      const width = window.innerWidth;

      if (width < this.breakpoints.mobile) return 'mobile';
      if (width < this.breakpoints.tablet) return 'tablet';
      if (width < this.breakpoints.desktop) return 'desktop';
      return 'large';
    },

    // 调整组件尺寸
    adaptComponent: function(component, options = {}) {
      const breakpoint = this.getCurrentBreakpoint();
      const defaults = {
        mobile: { scale: 0.8, padding: 10 },
        tablet: { scale: 0.9, padding: 15 },
        desktop: { scale: 1, padding: 20 },
        large: { scale: 1.1, padding: 25 }
      };

      const config = { ...defaults[breakpoint], ...options[breakpoint] };

      component.style.transform = `scale(${config.scale})`;
      component.style.padding = `${config.padding}px`;
    },

    // 响应式图片
    adaptImage: function(img, sizes = {}) {
      const breakpoint = this.getCurrentBreakpoint();
      const src = sizes[breakpoint] || sizes.desktop || img.src;

      if (src !== img.src) {
        img.src = src;
      }
    },

    // 响应式网格
    adaptGrid: function(container, options = {}) {
      const breakpoint = this.getCurrentBreakpoint();
      const defaults = {
        mobile: 1,
        tablet: 2,
        desktop: 3,
        large: 4
      };

      const columns = options[breakpoint] || defaults[breakpoint];
      container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
  };

  // ==================== 移动端优化 ====================
  const MobileOptimizer = {
    // 优化滚动
    optimizeScroll: function() {
      if (!DeviceDetector.isMobile) return;

      // 添加被动滚动监听
      document.addEventListener('touchmove', function() {}, { passive: true });

      // 优化滚动容器
      document.querySelectorAll('.zt-scrollable').forEach(el => {
        el.style.touchAction = 'pan-y';
        el.style.webkitOverflowScrolling = 'touch';
      });
    },

    // 优化点击
    optimizeClick: function() {
      if (!DeviceDetector.isMobile) return;

      // 移除 300ms 点击延迟
      document.addEventListener('touchstart', function() {}, { passive: true });

      // 优化可点击元素
      document.querySelectorAll('button, a, [role="button"]').forEach(el => {
        el.style.touchAction = 'manipulation';
      });
    },

    // 优化输入
    optimizeInput: function() {
      if (!DeviceDetector.isMobile) return;

      // 防止缩放
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
      inputs.forEach(input => {
        input.style.fontSize = '16px'; // 防止 iOS 缩放
      });
    },

    // 全部优化
    init: function() {
      this.optimizeScroll();
      this.optimizeClick();
      this.optimizeInput();
    }
  };

  // ==================== 视口管理器 ====================
  const ViewportManager = {
    currentOrientation: 'portrait',

    init: function() {
      this.updateOrientation();

      window.addEventListener('resize', ZootopiaCore.utils.debounce(() => {
        this.updateOrientation();
      }, 250));

      window.addEventListener('orientationchange', () => {
        setTimeout(() => this.updateOrientation(), 100);
      });
    },

    updateOrientation: function() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.currentOrientation = width < height ? 'portrait' : 'landscape';

      document.body.classList.toggle('zt-portrait', this.currentOrientation === 'portrait');
      document.body.classList.toggle('zt-landscape', this.currentOrientation === 'landscape');

      // 触发方向变化事件
      window.dispatchEvent(new CustomEvent('zt:orientationChange', {
        detail: { orientation: this.currentOrientation }
      }));
    }
  };

  // ==================== 安全区域适配（iOS） ====================
  const SafeAreaAdapter = {
    init: function() {
      // 检测支持
      const supported = CSS.supports('padding-bottom', 'env(safe-area-inset-bottom)');

      if (!supported) return;

      // 设置 CSS 变量
      this.setSafeAreaInsets();
    },

    setSafeAreaInsets: function() {
      const root = document.documentElement;

      // 创建临时元素测量
      const temp = document.createElement('div');
      temp.style.position = 'fixed';
      temp.style.left = '0';
      temp.style.top = '0';
      temp.style.bottom = '0';
      temp.style.right = '0';
      temp.style.padding = 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
      document.body.appendChild(temp);

      // 测量并设置 CSS 变量
      const styles = getComputedStyle(temp);
      const top = parseInt(styles.paddingTop) || 0;
      const right = parseInt(styles.paddingRight) || 0;
      const bottom = parseInt(styles.paddingBottom) || 0;
      const left = parseInt(styles.paddingLeft) || 0;

      root.style.setProperty('--zt-safe-area-top', `${top}px`);
      root.style.setProperty('--zt-safe-area-right', `${right}px`);
      root.style.setProperty('--zt-safe-area-bottom', `${bottom}px`);
      root.style.setProperty('--zt-safe-area-left', `${left}px`);

      document.body.removeChild(temp);
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.responsive = {
    device: DeviceDetector,
    touch: TouchManager,
    adapter: ResponsiveAdapter,
    mobile: MobileOptimizer,
    viewport: ViewportManager,
    safeArea: SafeAreaAdapter
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    DeviceDetector.init();
    TouchManager.init();
    MobileOptimizer.init();
    ViewportManager.init();
    SafeAreaAdapter.init();

    console.log('📱 Zootopia 响应式系统已加载');

    // 触发响应式就绪事件
    window.dispatchEvent(new CustomEvent('zt:responsiveReady'));
  });

  // ==================== 工具函数 ====================
  // 检测是否为移动设备
  window.ztIsMobile = () => DeviceDetector.isMobile;

  // 检测是否支持触摸
  window.ztIsTouch = () => DeviceDetector.touchSupported;

  // 获取当前断点
  window.ztGetBreakpoint = () => ResponsiveAdapter.getCurrentBreakpoint();

  // 获取屏幕方向
  window.ztGetOrientation = () => ViewportManager.currentOrientation;

})();
