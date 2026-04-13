/**
 * 疯狂动物城 - 返回顶部按钮
 * Zootopia Back To Top Button
 * Version: 1.0.0
 */

(function(window) {
  'use strict';

  // ==================== 配置 ====================
  const BackToTopConfig = {
    // 按钮尺寸
    size: 48,

    // 位置
    position: {
      right: 24,
      bottom: 32
    },

    // 滚动阈值（px）
    scrollThreshold: 300,

    // 主题色
    colors: {
      primary: '#FF9F43',      // 撒哈拉金橙
      secondary: '#0ABDE3',    // 冰川蓝
      gradient: true
    },

    // 动画设置
    animation: {
      showDuration: 300,
      hideDuration: 300,
      easing: 'ease-out',
      scale: 1.0,
      hoverScale: 1.1
    },

    // 自动隐藏
    autoHide: true,
    hideDelay: 2000,

    // 滚动偏移量（用于固定导航栏）
    offsetTop: 0,

    // 图标类型: 'arrow', 'chevon', 'zootopia'
    iconType: 'arrow'
  };

  // ==================== 工具函数 ====================
  const Utils = {
    // 防抖
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 150);
      };
    },

    // 节流
    throttle: function(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit || 100);
        }
      };
    },

    // 平滑滚动到顶部
    scrollToTop: function(duration = 800) {
      const start = window.pageYOffset || document.documentElement.scrollTop;
      const startTime = performance.now();

      function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function: ease-out-cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentPosition = start * (1 - easeOut);

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        }
      }

      requestAnimationFrame(scrollStep);
    }
  };

  // ==================== 按钮渲染器 ====================
  const ButtonRenderer = {
    // 创建按钮元素
    createButton: function() {
      const button = document.createElement('button');
      button.id = 'zootopia-back-to-top';
      button.className = 'zootopia-back-to-top';
      button.setAttribute('aria-label', '返回顶部');
      button.setAttribute('type', 'button');

      // 样式
      const size = BackToTopConfig.size;
      const icon = this.getIcon();
      const gradient = BackToTopConfig.colors.gradient
        ? `linear-gradient(135deg, ${BackToTopConfig.colors.primary}, ${BackToTopConfig.colors.secondary})`
        : BackToTopConfig.colors.primary;

      button.style.cssText = `
        position: fixed;
        right: ${BackToTopConfig.position.right}px;
        bottom: ${BackToTopConfig.position.bottom}px;
        width: ${size}px;
        height: ${size}px;
        background: ${gradient};
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 9999;
        opacity: 0;
        transform: scale(0.8) translateY(20px);
        transition: all ${BackToTopConfig.animation.showDuration}ms ${BackToTopConfig.animation.easing};
        box-shadow: 0 4px 16px rgba(255, 159, 67, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      `;

      // 图标容器
      const iconContainer = document.createElement('span');
      iconContainer.className = 'zootopia-back-to-top-icon';
      iconContainer.innerHTML = icon;
      iconContainer.style.cssText = `
        color: white;
        font-size: ${size * 0.5}px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        user-select: none;
      `;

      button.appendChild(iconContainer);

      // 悬停效果
      button.addEventListener('mouseenter', function() {
        this.style.transform = `scale(${BackToTopConfig.animation.hoverScale}) translateY(0)`;
        this.style.boxShadow = '0 6px 24px rgba(255, 159, 67, 0.6)';
      });

      button.addEventListener('mouseleave', function() {
        if (this.classList.contains('visible')) {
          this.style.transform = 'scale(1.0) translateY(0)';
          this.style.boxShadow = '0 4px 16px rgba(255, 159, 67, 0.4)';
        }
      });

      // 点击事件
      button.addEventListener('click', function(e) {
        e.preventDefault();
        Utils.scrollToTop(800);
      });

      // 键盘支持
      button.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          Utils.scrollToTop(800);
        }
      });

      return button;
    },

    // 获取图标
    getIcon: function() {
      switch (BackToTopConfig.iconType) {
        case 'chevron':
          return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          `;
        case 'zootopia':
          // 使用动物城风格的图标组合
          return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          `;
        default:
          // 箭头
          return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          `;
      }
    }
  };

  // ==================== 事件管理器 ====================
  const EventManager = {
    hideTimeout: null,
    autoHideTimer: null,

    init: function(button) {
      let ticking = false;

      const onScroll = function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            this.updateVisibility(button);
            ticking = false;
          }.bind(this));
          ticking = true;
        }
      }.bind(this);

      // 监听滚动（被动监听器）
      window.addEventListener('scroll', onScroll, { passive: true });

      // 初始检查
      setTimeout(() => this.updateVisibility(button), 100);

      // 窗口大小改变
      window.addEventListener('resize', Utils.throttle(function() {
        this.updateVisibility(button);
      }.bind(this), 250));

      // 鼠标悬停时取消自动隐藏
      button.addEventListener('mouseenter', function() {
        if (this.autoHideTimer) {
          clearTimeout(this.autoHideTimer);
          this.autoHideTimer = null;
        }
      }.bind(this));

      button.addEventListener('mouseleave', function() {
        if (BackToTopConfig.autoHide && button.classList.contains('visible')) {
          this.autoHideTimer = setTimeout(() => {
            button.classList.remove('visible');
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8) translateY(20px)';
            button.style.pointerEvents = 'none';
          }, BackToTopConfig.hideDelay);
        }
      }.bind(this));
    },

    updateVisibility: function(button) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const threshold = BackToTopConfig.scrollThreshold;

      if (scrollTop > threshold) {
        if (!button.classList.contains('visible')) {
          button.classList.add('visible');
          button.style.opacity = '1';
          button.style.transform = 'scale(1.0) translateY(0)';
          button.style.pointerEvents = 'auto';
        }
      } else {
        if (BackToTopConfig.autoHide && button.classList.contains('visible')) {
          button.classList.remove('visible');
          button.style.opacity = '0';
          button.style.transform = 'scale(0.8) translateY(20px)';
          button.style.pointerEvents = 'none';
        }
      }
    }
  };

  // ==================== 返回顶部主类 ====================
  const BackToTopButton = {
    instance: null,
    initialized: false,
    button: null,

    // 初始化
    init: function() {
      if (this.initialized) return;

      // 创建按钮
      this.button = ButtonRenderer.createButton();
      document.body.appendChild(this.button);

      // 绑定事件
      EventManager.init(this.button);

      this.initialized = true;
      this.instance = this;

      console.log('🐰🦊 Back To Top Button initialized');
    },

    // 显示按钮
    show: function() {
      if (this.button) {
        this.button.classList.add('visible');
        this.button.style.opacity = '1';
        this.button.style.transform = 'scale(1.0) translateY(0)';
        this.button.style.pointerEvents = 'auto';
      }
    },

    // 隐藏按钮
    hide: function() {
      if (this.button) {
        this.button.classList.remove('visible');
        this.button.style.opacity = '0';
        this.button.style.transform = 'scale(0.8) translateY(20px)';
        this.button.style.pointerEvents = 'none';
      }
    },

    // 销毁
    destroy: function() {
      if (this.button) {
        this.button.remove();
      }
      this.initialized = false;
      this.button = null;
    },

    // 更新配置
    updateConfig: function(newConfig) {
      Object.assign(BackToTopConfig, newConfig);
      if (this.initialized) {
        this.destroy();
        this.init();
      }
    }
  };

  // ==================== 导出 API ====================
  window.BackToTop = {
    init: function(config) {
      if (config) {
        Object.assign(BackToTopConfig, config);
      }
      BackToTopButton.init();
    },

    show: function() {
      BackToTopButton.show();
    },

    hide: function() {
      BackToTopButton.hide();
    },

    destroy: function() {
      BackToTopButton.destroy();
    },

    updateConfig: function(config) {
      BackToTopButton.updateConfig(config);
    }
  };

  // ==================== 自动初始化 ====================
  if (document.readyState === 'complete') {
    setTimeout(() => {
      if (window.Zootopia && window.Zootopia.coreLoaded) {
        BackToTopButton.init();
      } else {
        document.addEventListener('zootopia:loaded', function() {
          setTimeout(() => BackToTopButton.init(), 500);
        });
      }
    }, 100);
  } else {
    window.addEventListener('load', function() {
      setTimeout(() => {
        if (window.Zootopia && window.Zootopia.coreLoaded) {
          BackToTopButton.init();
        } else {
          document.addEventListener('zootopia:loaded', function() {
            setTimeout(() => BackToTopButton.init(), 500);
          });
        }
      }, 100);
    });
  }

  console.log('🐰🦊 Back To Top Module loaded');

})(window);
