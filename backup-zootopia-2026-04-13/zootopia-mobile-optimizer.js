/**
 * 疯狂动物城移动端优化系统
 * Zootopia Mobile Optimizer
 *
 * 移动端体验优化，触摸手势，响应式增强
 */

(function() {
  'use strict';

  const MobileOptimizerConfig = {
    // 触摸反馈
    touchFeedback: {
      enabled: true,
      ripple: true,
      haptic: true
    },

    // 手势支持
    gestures: {
      enabled: true,
      swipeThreshold: 50,
      tapThreshold: 300,
      longPressThreshold: 500
    },

    // 移动端导航
    mobileNav: {
      enabled: true,
      sticky: true,
      compact: true
    },

    // 视口优化
    viewport: {
      enabled: true,
      preventZoom: false,
      fitScreen: true
    },

    // 移动端菜单
    mobileMenu: {
      enabled: true,
      slideAnimation: true
    }
  };

  /**
   * 移动端优化管理器
   */
  const MobileOptimizer = {
    isMobile: false,
    touchStartPos: null,
    longPressTimer: null,

    /**
     * 初始化
     */
    init: function() {
      this.detectMobile();
      this.setupViewport();
      this.setupTouchFeedback();
      this.setupGestures();
      this.setupMobileNav();

      if (this.isMobile) {
        this.optimizeForMobile();
      }
    },

    /**
     * 检测移动设备
     */
    detectMobile: function() {
      const userAgent = navigator.userAgent;
      const maxWidth = 768;

      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
                      window.innerWidth <= maxWidth;

      if (this.isMobile) {
        document.documentElement.classList.add('zt-mobile');
      }
    },

    /**
     * 设置视口
     */
    setupViewport: function() {
      if (!MobileOptimizerConfig.viewport.enabled) return;

      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        let content = 'width=device-width, initial-scale=1.0';

        if (MobileOptimizerConfig.viewport.preventZoom) {
          content += ', maximum-scale=1.0, user-scalable=no';
        }

        if (MobileOptimizerConfig.viewport.fitScreen) {
          content += ', viewport-fit=cover';
        }

        meta.setAttribute('content', content);
      }
    },

    /**
     * 设置触摸反馈
     */
    setupTouchFeedback: function() {
      if (!MobileOptimizerConfig.touchFeedback.enabled) return;

      // 为所有交互元素添加触摸反馈
      document.addEventListener('touchstart', (e) => {
        const target = e.target.closest('button, a, .card, .zt-clickable');
        if (target) {
          this.addTouchFeedback(target);
        }
      }, true);

      document.addEventListener('touchend', (e) => {
        const target = e.target.closest('button, a, .card, .zt-clickable');
        if (target) {
          this.removeTouchFeedback(target);
        }
      }, true);
    },

    /**
     * 添加触摸反馈
     */
    addTouchFeedback: function(element) {
      element.classList.add('zt-touch-active');

      if (MobileOptimizerConfig.touchFeedback.ripple) {
        this.createRippleEffect(element);
      }

      if (MobileOptimizerConfig.touchFeedback.haptic && navigator.vibrate) {
        navigator.vibrate(10);
      }
    },

    /**
     * 移除触摸反馈
     */
    removeTouchFeedback: function(element) {
      element.classList.remove('zt-touch-active');
    },

    /**
     * 创建波纹效果
     */
    createRippleEffect: function(element) {
      const ripple = document.createElement('span');
      ripple.className = 'zt-ripple';

      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = rect.width / 2 - size / 2;
      const y = rect.height / 2 - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      element.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    },

    /**
     * 设置手势
     */
    setupGestures: function() {
      if (!MobileOptimizerConfig.gestures.enabled) return;

      let touchStartTime = 0;
      let touchStartPos = { x: 0, y: 0 };

      document.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
        touchStartPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };

        // 长按检测
        this.longPressTimer = setTimeout(() => {
          this.handleLongPress(e.target, touchStartPos);
        }, MobileOptimizerConfig.gestures.longPressThreshold);
      }, true);

      document.addEventListener('touchmove', (e) => {
        clearTimeout(this.longPressTimer);
      }, true);

      document.addEventListener('touchend', (e) => {
        clearTimeout(this.longPressTimer);

        const touchDuration = Date.now() - touchStartTime;
        const touchEndPos = {
          x: e.changedTouches[0].clientX,
          y: e.changedTouches[0].clientY
        };

        // 检测滑动手势
        const deltaX = touchEndPos.x - touchStartPos.x;
        const deltaY = touchEndPos.y - touchStartPos.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (Math.abs(deltaX) > MobileOptimizerConfig.gestures.swipeThreshold) {
            this.handleSwipe(e.target, deltaX > 0 ? 'right' : 'left');
          }
        } else {
          if (Math.abs(deltaY) > MobileOptimizerConfig.gestures.swipeThreshold) {
            this.handleSwipe(e.target, deltaY > 0 ? 'down' : 'up');
          }
        }

        // 检测点击
        if (touchDuration < MobileOptimizerConfig.gestures.tapThreshold) {
          this.handleTap(e.target);
        }
      }, true);
    },

    /**
     * 处理滑动
     */
    handleSwipe: function(target, direction) {
      const event = new CustomEvent('swipe', {
        detail: { direction, target },
        bubbles: true
      });
      target.dispatchEvent(event);
    },

    /**
     * 处理点击
     */
    handleTap: function(target) {
      const event = new CustomEvent('tap', {
        detail: { target },
        bubbles: true
      });
      target.dispatchEvent(event);
    },

    /**
     * 处理长按
     */
    handleLongPress: function(target, position) {
      const event = new CustomEvent('longpress', {
        detail: { target, position },
        bubbles: true
      });
      target.dispatchEvent(event);
    },

    /**
     * 设置移动端导航
     */
    setupMobileNav: function() {
      if (!MobileOptimizerConfig.mobileNav.enabled) return;

      const nav = document.querySelector('nav, .navbar, .navigation');
      if (!nav) return;

      // 添加移动端导航类
      nav.classList.add('zt-mobile-nav');

      // 创建返回顶部按钮
      this.createBackToTopButton();

      // 创建底部导航栏（如果适用）
      this.createBottomNav();
    },

    /**
     * 创建返回顶部按钮
     */
    createBackToTopButton: function() {
      const button = document.createElement('button');
      button.className = 'zt-back-to-top';
      button.innerHTML = '↑';
      button.setAttribute('aria-label', '返回顶部');
      button.style.display = 'none';

      document.body.appendChild(button);

      // 监听滚动
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (window.scrollY > 300) {
            button.style.display = 'flex';
          } else {
            button.style.display = 'none';
          }
        }, 100);
      });

      // 点击返回顶部
      button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // 触摸反馈
      button.addEventListener('touchstart', () => {
        this.addTouchFeedback(button);
      });

      button.addEventListener('touchend', () => {
        this.removeTouchFeedback(button);
      });
    },

    /**
     * 创建底部导航
     */
    createBottomNav: function() {
      // 查找主要导航链接
      const mainNav = document.querySelector('nav ul, .navbar-menu');
      if (!mainNav) return;

      const links = Array.from(mainNav.querySelectorAll('a')).slice(0, 4);
      if (links.length === 0) return;

      const bottomNav = document.createElement('nav');
      bottomNav.className = 'zt-bottom-nav';

      links.forEach(link => {
        const item = document.createElement('a');
        item.href = link.href;
        item.className = 'zt-bottom-nav-item';
        item.innerHTML = `
          <span class="zt-nav-icon">${this.getNavIcon(link.textContent)}</span>
          <span class="zt-nav-label">${link.textContent}</span>
        `;

        // 添加触摸反馈
        item.addEventListener('touchstart', () => {
          this.addTouchFeedback(item);
        });

        item.addEventListener('touchend', () => {
          this.removeTouchFeedback(item);
        });

        bottomNav.appendChild(item);
      });

      document.body.appendChild(bottomNav);
    },

    /**
     * 获取导航图标
     */
    getNavIcon: function(text) {
      const icons = {
        '首页': '🏠',
        '首页': '🏠',
        '文章': '📝',
        '归档': '📚',
        '分类': '📂',
        '标签': '🏷️',
        '关于': '👤',
        '搜索': '🔍'
      };

      return icons[text.trim()] || '•';
    },

    /**
     * 移动端优化
     */
    optimizeForMobile: function() {
      // 优化图片加载
      this.optimizeImages();

      // 优化表单输入
      this.optimizeForms();

      // 优化可点击区域
      this.optimizeClickTargets();

      // 防止双击缩放
      this.preventDoubleClickZoom();
    },

    /**
     * 优化图片
     */
    optimizeImages: function() {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // 添加懒加载
        if (!img.loading) {
          img.loading = 'lazy';
        }

        // 限制最大宽度
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      });
    },

    /**
     * 优化表单
     */
    optimizeForms: function() {
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        // 防止自动缩放
        input.style.fontSize = '16px';

        // 优化输入类型
        if (input.type === 'tel' || input.name?.includes('phone')) {
          input.inputMode = 'tel';
        } else if (input.type === 'email' || input.name?.includes('email')) {
          input.inputMode = 'email';
        } else if (input.type === 'url' || input.name?.includes('url')) {
          input.inputMode = 'url';
        }
      });
    },

    /**
     * 优化点击目标
     */
    optimizeClickTargets: function() {
      const clickableElements = document.querySelectorAll('a, button');
      clickableElements.forEach(el => {
        const minSize = 44; // iOS推荐最小尺寸

        const rect = el.getBoundingClientRect();
        if (rect.width < minSize || rect.height < minSize) {
          el.style.minWidth = minSize + 'px';
          el.style.minHeight = minSize + 'px';
          el.style.display = 'inline-flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
        }
      });
    },

    /**
     * 防止双击缩放
     */
    preventDoubleClickZoom: function() {
      let lastTouchEnd = 0;

      document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    }
  };

  // 导出 API
  ZootopiaCore.mobileOptimizer = MobileOptimizer;
  ZootopiaCore.mobileOptimizerConfig = MobileOptimizerConfig;

  // 全局 API
  window.ztIsMobile = () => MobileOptimizer.isMobile;
  window.ztOptimizeMobile = () => MobileOptimizer.optimizeForMobile();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    MobileOptimizer.init();
    console.log('📱 移动端优化系统已就绪');
  });

})();
