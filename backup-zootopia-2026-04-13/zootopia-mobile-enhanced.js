/**
 * 疯狂动物城移动端增强系统
 * Zootopia Mobile Enhanced - 专为移动设备优化的交互体验
 */

(function() {
  'use strict';

  // ==================== 移动端配置 ====================
  const MobileConfig = {
    // 底部导航配置
    bottomNav: {
      enabled: true,
      items: [
        { icon: '🏠', label: '首页', url: '/' },
        { icon: '📂', label: '分类', url: '/categories' },
        { icon: '🏷️', label: '标签', url: '/tags' },
        { icon: '📜', label: '归档', url: '/archives' }
      ]
    },

    // 手势配置
    gestures: {
      swipeBack: true,           // 滑动返回
      swipeThreshold: 100,        // 滑动阈值（px）
      swipeVelocity: 0.3          // 滑动速度
    },

    // 视觉反馈配置
    feedback: {
      haptic: true,               // 触觉反馈
      visual: true,               // 视觉反馈
      ripple: true                // 波纹效果
    },

    // 优化配置
    optimization: {
      passiveListeners: true,     // 被动事件监听器
      touchAction: 'manipulation', // 触摸操作优化
      preventZoom: true,          // 防止双击缩放
      fastClick: true             // 快速点击
    }
  };

  // ==================== 底部导航栏 ====================
  const BottomNav = {
    element: null,
    activeIndex: 0,

    init: function() {
      if (!MobileConfig.bottomNav.enabled) return;
      if (!this.shouldShow()) return;

      this.create();
      this.bindEvents();
      this.updateActive();
    },

    shouldShow: function() {
      // 只在移动设备上显示
      return window.innerWidth < 768;
    },

    create: function() {
      const nav = document.createElement('nav');
      nav.className = 'zt-bottom-nav';
      nav.setAttribute('role', 'navigation');

      const items = MobileConfig.bottomNav.items.map((item, index) => `
        <a href="${item.url}"
           class="zt-bottom-nav-item ${index === this.activeIndex ? 'zt-active' : ''}"
           data-zt-index="${index}">
          <span class="zt-bottom-nav-icon">${item.icon}</span>
          <span class="zt-bottom-nav-label">${item.label}</span>
        </a>
      `).join('');

      nav.innerHTML = items;

      // 添加样式
      this.addStyles();

      document.body.appendChild(nav);
      this.element = nav;

      // 调整底部 padding，防止内容被遮挡
      document.body.style.paddingBottom = '70px';
    },

    addStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        .zt-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
          z-index: 999;
          -webkit-tap-highlight-color: transparent;
        }

        .zt-bottom-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 0;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: all 200ms ease-out;
        }

        .zt-bottom-nav-item.zt-active {
          color: #FF9F43;
        }

        .zt-bottom-nav-item:active {
          transform: scale(0.95);
          background: rgba(255, 255, 255, 0.05);
        }

        .zt-bottom-nav-icon {
          font-size: 24px;
          line-height: 1;
          margin-bottom: 2px;
        }

        .zt-bottom-nav-label {
          font-size: 11px;
          line-height: 1;
          font-weight: 500;
        }

        /* 活动指示器 */
        .zt-bottom-nav-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 40px;
          height: 3px;
          background: #FF9F43;
          border-radius: 0 0 3px 3px;
          transition: transform 200ms ease-out;
        }

        .zt-bottom-nav-item.zt-active::after {
          transform: translateX(-50%) scaleX(1);
        }
      `;

      document.head.appendChild(style);
    },

    bindEvents: function() {
      // 点击事件
      this.element.addEventListener('click', (e) => {
        const item = e.target.closest('.zt-bottom-nav-item');
        if (item) {
          const index = parseInt(item.getAttribute('data-zt-index'));

          // 触觉反馈
          if (MobileConfig.feedback.haptic && navigator.vibrate) {
            navigator.vibrate(10);
          }

          // 更新活动状态
          this.activeIndex = index;
          this.updateActive();
        }
      });
    },

    updateActive: function() {
      if (!this.element) return;

      const items = this.element.querySelectorAll('.zt-bottom-nav-item');
      const currentPath = window.location.pathname;

      items.forEach((item, index) => {
        const url = new URL(item.href).pathname;

        if (url === currentPath ||
            (currentPath === '/' && url === '/') ||
            (url !== '/' && currentPath.startsWith(url))) {
          item.classList.add('zt-active');
          this.activeIndex = index;
        } else {
          item.classList.remove('zt-active');
        }
      });
    }
  };

  // ==================== 手势返回 ====================
  const SwipeBack = {
    startX: 0,
    startY: 0,
    isTracking: false,
    threshold: MobileConfig.gestures.swipeThreshold,
    velocity: MobileConfig.gestures.swipeVelocity,

    init: function() {
      if (!MobileConfig.gestures.swipeBack) return;
      if (window.innerWidth >= 768) return;

      this.bindEvents();
    },

    bindEvents: function() {
      // 触摸开始
      document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
        this.isTracking = true;
      }, { passive: true });

      // 触摸移动
      document.addEventListener('touchmove', (e) => {
        if (!this.isTracking) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - this.startX;
        const deltaY = touch.clientY - this.startY;

        // 只跟踪从左边缘开始的水平滑动
        if (this.startX < 20 && Math.abs(deltaX) > Math.abs(deltaY)) {
          e.preventDefault();

          // 视觉反馈
          const progress = Math.min(deltaX / window.innerWidth, 1);
          this.showFeedback(progress);
        }
      }, { passive: false });

      // 触摸结束
      document.addEventListener('touchend', (e) => {
        if (!this.isTracking) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.startX;
        const deltaTime = Date.now() - this.startTime;

        // 计算速度
        const velocity = Math.abs(deltaX) / deltaTime;

        // 判断是否触发返回
        if (deltaX > this.threshold || velocity > this.velocity) {
          this.triggerBack();
        } else {
          this.hideFeedback();
        }

        this.isTracking = false;
      });
    },

    showFeedback: function(progress) {
      let overlay = document.querySelector('.zt-swipe-back-overlay');

      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'zt-swipe-back-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          pointer-events: none;
          z-index: 9998;
          opacity: 0;
          transition: opacity 200ms ease-out;
        `;
        document.body.appendChild(overlay);
      }

      overlay.style.opacity = progress;
    },

    hideFeedback: function() {
      const overlay = document.querySelector('.zt-swipe-back-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 200);
      }
    },

    triggerBack: function() {
      // 触觉反馈
      if (MobileConfig.feedback.haptic && navigator.vibrate) {
        navigator.vibrate(15);
      }

      // 执行返回
      if (window.history.length > 1) {
        window.history.back();
      }
    }
  };

  // ==================== 触摸优化 ====================
  const TouchOptimizer = {
    init: function() {
      this.optimizeInputs();
      this.optimizeClicks();
      this.optimizeScrolling();
    },

    optimizeInputs: function() {
      if (!MobileConfig.optimization.preventZoom) return;

      // 防止输入框聚焦时缩放
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');
      inputs.forEach(input => {
        input.style.fontSize = '16px'; // iOS 需要至少 16px 才不会缩放
      });
    },

    optimizeClicks: function() {
      if (!MobileConfig.optimization.fastClick) return;

      // 移除 300ms 延迟
      document.addEventListener('touchstart', function() {}, { passive: true });

      // 优化可点击元素
      const clickableElements = document.querySelectorAll('button, a, [role="button"], .btn');
      clickableElements.forEach(el => {
        el.style.touchAction = 'manipulation';
        el.style.webkitTapHighlightColor = 'rgba(255, 159, 67, 0.3)';
      });
    },

    optimizeScrolling: function() {
      if (!MobileConfig.optimization.passiveListeners) return;

      // 优化滚动性能
      const scrollable = document.querySelectorAll('.zt-scrollable, [data-zt-scrollable]');
      scrollable.forEach(el => {
        el.style.touchAction = 'pan-y';
        el.style.webkitOverflowScrolling = 'touch';
      });
    }
  };

  // ==================== 视觉反馈 ====================
  const VisualFeedback = {
    init: function() {
      if (!MobileConfig.feedback.visual) return;

      this.enhanceActiveStates();
      this.addRippleEffect();
    },

    enhanceActiveStates: function() {
      const style = document.createElement('style');
      style.textContent = `
        /* 按下状态 */
        button:active,
        a:active,
        [role="button"]:active {
          transform: scale(0.97) !important;
          opacity: 0.8 !important;
        }

        /* 焦点状态 */
        button:focus-visible,
        a:focus-visible,
        [role="button"]:focus-visible {
          outline: 2px solid #FF9F43;
          outline-offset: 2px;
        }
      `;
      document.head.appendChild(style);
    },

    addRippleEffect: function() {
      if (!MobileConfig.feedback.ripple) return;

      document.addEventListener('click', (e) => {
        const target = e.target.closest('button, a, [role="button"], .zt-ripple');
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'zt-ripple-effect';
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 159, 67, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: zt-ripple 600ms ease-out;
          pointer-events: none;
        `;

        // 添加动画
        if (!document.querySelector('#zt-ripple-style')) {
          const style = document.createElement('style');
          style.id = 'zt-ripple-style';
          style.textContent = `
            @keyframes zt-ripple {
              to {
                transform: scale(2);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }

        // 确保目标有相对定位
        if (getComputedStyle(target).position === 'static') {
          target.style.position = 'relative';
        }

        target.style.overflow = 'hidden';
        target.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    }
  };

  // ==================== 屏幕旋转处理 ====================
  const OrientationHandler = {
    init: function() {
      window.addEventListener('orientationchange', () => {
        // 延迟处理，等待旋转完成
        setTimeout(() => {
          this.adjustLayout();
        }, 100);
      });

      window.addEventListener('resize', ZootopiaCore.utils.debounce(() => {
        this.adjustLayout();
      }, 250));
    },

    adjustLayout: function() {
      // 更新底部导航显示状态
      if (BottomNav.element) {
        if (window.innerWidth < 768) {
          BottomNav.element.style.display = 'flex';
          document.body.style.paddingBottom = '70px';
        } else {
          BottomNav.element.style.display = 'none';
          document.body.style.paddingBottom = '0';
        }
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.mobile = {
    bottomNav: BottomNav,
    swipeBack: SwipeBack,
    touchOptimizer: TouchOptimizer,
    visualFeedback: VisualFeedback,
    orientation: OrientationHandler
  };
  ZootopiaCore.mobileConfig = MobileConfig;

  // ==================== 全局 API ====================
  // 显示/隐藏底部导航
  window.ztShowBottomNav = () => {
    if (BottomNav.element) BottomNav.element.style.display = 'flex';
  };

  window.ztHideBottomNav = () => {
    if (BottomNav.element) BottomNav.element.style.display = 'none';
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    // 只在移动设备上初始化
    if (window.innerWidth < 768 || 'ontouchstart' in window) {
      BottomNav.init();
      SwipeBack.init();
      TouchOptimizer.init();
      VisualFeedback.init();
      OrientationHandler.init();

      console.log('📱 移动端增强系统已就绪');
    }
  });

  // ==================== 状态类 ====================
  // 添加移动端状态类
  if (window.innerWidth < 768) {
    document.body.classList.add('zt-mobile-device');
  }

  if ('ontouchstart' in window) {
    document.body.classList.add('zt-touch-device');
  }

})();
