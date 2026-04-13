/**
 * 疯狂动物城页面过渡效果
 * Zootopia Page Transitions - 优雅的页面切换动画效果
 */

(function() {
  'use strict';

  // ==================== 过渡配置 ====================
  const TransitionConfig = {
    // 默认过渡类型
    defaultType: 'fade',

    // 过渡类型定义
    types: {
      fade: {
        name: '淡入淡出',
        duration: 400,
        enterClass: 'zt-transition-fade-enter',
        leaveClass: 'zt-transition-fade-leave'
      },
      slide: {
        name: '滑动',
        duration: 500,
        enterClass: 'zt-transition-slide-enter',
        leaveClass: 'zt-transition-slide-leave'
      },
      zoom: {
        name: '缩放',
        duration: 400,
        enterClass: 'zt-transition-zoom-enter',
        leaveClass: 'zt-transition-zoom-leave'
      },
      flip: {
        name: '翻转',
        duration: 600,
        enterClass: 'zt-transition-flip-enter',
        leaveClass: 'zt-transition-flip-leave'
      },
      blur: {
        name: '模糊',
        duration: 500,
        enterClass: 'zt-transition-blur-enter',
        leaveClass: 'zt-transition-blur-leave'
      }
    },

    // 是否启用过渡
    enabled: true,

    // 是否显示进度指示器
    showProgress: true
  };

  // ==================== 过渡管理器 ====================
  const TransitionManager = {
    currentType: null,
    isTransitioning: false,
    progressElement: null,

    init: function() {
      this.addStyles();
      this.createProgressIndicator();
      this.setupEventListeners();
    },

    addStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        /* ==================== 页面过渡基础 ==================== */
        .zt-page-transition {
          transition: all var(--zt-transition-duration, 400ms) var(--zt-transition-easing, cubic-bezier(0.4, 0, 0.2, 1));
        }

        /* ==================== 淡入淡出 ==================== */
        .zt-transition-fade-enter {
          opacity: 0;
        }

        .zt-transition-fade-leave {
          opacity: 1;
        }

        .zt-transition-fade-enter-active {
          opacity: 1;
        }

        .zt-transition-fade-leave-active {
          opacity: 0;
        }

        /* ==================== 滑动 ==================== */
        .zt-transition-slide-enter {
          opacity: 0;
          transform: translateX(30px);
        }

        .zt-transition-slide-leave {
          opacity: 1;
          transform: translateX(0);
        }

        .zt-transition-slide-enter-active {
          opacity: 1;
          transform: translateX(0);
        }

        .zt-transition-slide-leave-active {
          opacity: 0;
          transform: translateX(-30px);
        }

        /* ==================== 缩放 ==================== */
        .zt-transition-zoom-enter {
          opacity: 0;
          transform: scale(0.9);
        }

        .zt-transition-zoom-leave {
          opacity: 1;
          transform: scale(1);
        }

        .zt-transition-zoom-enter-active {
          opacity: 1;
          transform: scale(1);
        }

        .zt-transition-zoom-leave-active {
          opacity: 0;
          transform: scale(1.1);
        }

        /* ==================== 翻转 ==================== */
        .zt-transition-flip-enter {
          opacity: 0;
          transform: perspective(1000px) rotateY(-90deg);
        }

        .zt-transition-flip-leave {
          opacity: 1;
          transform: perspective(1000px) rotateY(0);
        }

        .zt-transition-flip-enter-active {
          opacity: 1;
          transform: perspective(1000px) rotateY(0);
        }

        .zt-transition-flip-leave-active {
          opacity: 0;
          transform: perspective(1000px) rotateY(90deg);
        }

        /* ==================== 模糊 ==================== */
        .zt-transition-blur-enter {
          opacity: 0;
          filter: blur(10px);
        }

        .zt-transition-blur-leave {
          opacity: 1;
          filter: blur(0);
        }

        .zt-transition-blur-enter-active {
          opacity: 1;
          filter: blur(0);
        }

        .zt-transition-blur-leave-active {
          opacity: 0;
          filter: blur(10px);
        }

        /* ==================== 页面容器 ==================== */
        .zt-page-container {
          position: relative;
          width: 100%;
        }

        /* ==================== 进度指示器 ==================== */
        .zt-transition-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #FF9F43, #0ABDE3, #10AC84);
          background-size: 200% 100%;
          animation: zt-progress-shine 2s linear infinite;
          z-index: 10001;
          transform-origin: left;
          transition: transform 300ms ease-out;
        }

        @keyframes zt-progress-shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* ==================== 减少动画偏好 ==================== */
        @media (prefers-reduced-motion: reduce) {
          .zt-page-transition,
          .zt-transition-fade-enter,
          .zt-transition-fade-leave,
          .zt-transition-slide-enter,
          .zt-transition-slide-leave,
          .zt-transition-zoom-enter,
          .zt-transition-zoom-leave,
          .zt-transition-flip-enter,
          .zt-transition-flip-leave,
          .zt-transition-blur-enter,
          .zt-transition-blur-leave {
            transition: none !important;
            animation: none !important;
          }

          .zt-transition-fade-enter,
          .zt-transition-slide-enter,
          .zt-transition-zoom-enter,
          .zt-transition-flip-enter,
          .zt-transition-blur-enter {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }

        /* ==================== 移动端优化 ==================== */
        @media (max-width: 768px) {
          .zt-transition-slide-enter {
            transform: translateX(20px);
          }

          .zt-transition-slide-leave-active {
            transform: translateX(-20px);
          }
        }
      `;

      document.head.appendChild(style);
    },

    createProgressIndicator: function() {
      if (!TransitionConfig.showProgress) return;

      const progress = document.createElement('div');
      progress.className = 'zt-transition-progress';
      progress.style.transform = 'scaleX(0)';
      progress.style.display = 'none';
      document.body.appendChild(progress);
      this.progressElement = progress;
    },

    setupEventListeners: function() {
      // 监听页面导航事件
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (link && this.shouldTransition(link)) {
          this.handleLinkClick(e, link);
        }
      }, true);

      // 监听浏览器后退/前进
      window.addEventListener('popstate', () => {
        this.performTransition('fade');
      });
    },

    shouldTransition: function(link) {
      // 检查是否应该使用过渡效果
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');

      // 排除外部链接
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const currentDomain = window.location.hostname;
        const linkDomain = new URL(href).hostname;
        if (currentDomain !== linkDomain) return false;
      }

      // 排除特殊链接
      if (href.startsWith('#') ||
          href.startsWith('javascript:') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          target === '_blank') {
        return false;
      }

      return TransitionConfig.enabled;
    },

    handleLinkClick: function(e, link) {
      const href = link.getAttribute('href');

      // 获取过渡类型
      const transitionType = link.getAttribute('data-zt-transition') ||
                           TransitionConfig.defaultType;

      e.preventDefault();

      // 执行过渡
      this.performTransition(transitionType, () => {
        window.location.href = href;
      });
    },

    performTransition: function(type = 'fade', callback) {
      if (this.isTransitioning) return;

      this.isTransitioning = true;
      this.currentType = type;

      const config = TransitionConfig.types[type] || TransitionConfig.types.fade;

      // 显示进度条
      if (this.progressElement) {
        this.progressElement.style.display = 'block';
        setTimeout(() => {
          this.progressElement.style.transform = 'scaleX(1)';
        }, 10);
      }

      // 获取页面内容
      const pageContent = document.querySelector('#page, main, .page, article, [role="main"]');
      if (!pageContent) {
        this.completeTransition(callback);
        return;
      }

      // 添加过渡类
      pageContent.classList.add('zt-page-transition');
      pageContent.classList.add(config.leaveClass);

      // 强制重排
      pageContent.offsetHeight;

      // 触发离开动画
      requestAnimationFrame(() => {
        pageContent.classList.add(config.leaveClass.replace('-leave', '-leave-active'));
      });

      // 动画完成后执行回调
      setTimeout(() => {
        if (callback) callback();
        this.completeTransition();
      }, config.duration);
    },

    completeTransition: function(callback) {
      const pageContent = document.querySelector('#page, main, .page, article, [role="main"]');
      const config = TransitionConfig.types[this.currentType] || TransitionConfig.types.fade;

      if (pageContent) {
        // 移除离开类
        pageContent.classList.remove(config.leaveClass, config.leaveClass.replace('-leave', '-leave-active'));

        // 添加进入类
        pageContent.classList.add(config.enterClass);

        // 强制重排
        pageContent.offsetHeight;

        // 触发进入动画
        requestAnimationFrame(() => {
          pageContent.classList.add(config.enterClass.replace('-enter', '-enter-active'));

          // 动画完成后清理
          setTimeout(() => {
            pageContent.classList.remove(
              'zt-page-transition',
              config.enterClass,
              config.enterClass.replace('-enter', '-enter-active')
            );
          }, config.duration);
        });
      }

      // 隐藏进度条
      if (this.progressElement) {
        this.progressElement.style.transform = 'scaleX(0)';
        setTimeout(() => {
          this.progressElement.style.display = 'none';
        }, 300);
      }

      this.isTransitioning = false;

      if (callback) callback();
    },

    // 设置过渡类型
    setType: function(type) {
      if (TransitionConfig.types[type]) {
        this.currentType = type;
        TransitionConfig.defaultType = type;
      }
    },

    // 启用/禁用过渡
    setEnabled: function(enabled) {
      TransitionConfig.enabled = enabled;
    }
  };

  // ==================== 快速过渡 API ====================
  const TransitionAPI = {
    // 执行过渡到指定 URL
    to: function(url, type = 'fade') {
      TransitionManager.performTransition(type, () => {
        window.location.href = url;
      });
    },

    // 返回上一页
    back: function(type = 'slide') {
      TransitionManager.performTransition(type, () => {
        window.history.back();
      });
    },

    // 刷新页面
    reload: function(type = 'fade') {
      TransitionManager.performTransition(type, () => {
        window.location.reload();
      });
    },

    // 设置过渡类型
    setType: function(type) {
      TransitionManager.setType(type);
    },

    // 启用过渡
    enable: function() {
      TransitionManager.setEnabled(true);
    },

    // 禁用过渡
    disable: function() {
      TransitionManager.setEnabled(false);
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.transitions = TransitionAPI;
  ZootopiaCore.transitionManager = TransitionManager;
  ZootopiaCore.transitionConfig = TransitionConfig;

  // ==================== 全局 API ====================
  window.ztTransitionTo = TransitionAPI.to;
  window.ztTransitionBack = TransitionAPI.back;
  window.ztTransitionReload = TransitionAPI.reload;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    TransitionManager.init();
    console.log('✨ 页面过渡系统已就绪');
  });

  // ==================== 数据属性支持 ====================
  // 支持通过 data-zt-transition 属性设置过渡类型
  ZootopiaCore.dom.then(() => {
    // 为所有链接添加过渡支持
    const style = document.createElement('style');
    style.textContent = `
      a[data-zt-transition] {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  });

})();
