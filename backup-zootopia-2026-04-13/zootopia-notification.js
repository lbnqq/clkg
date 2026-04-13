/**
 * 疯狂动物城统一通知系统
 * Zootopia Notification System - 统一的通知管理，支持多种类型和动画效果
 */

(function() {
  'use strict';

  // ==================== 通知配置 ====================
  const NotificationConfig = {
    // 默认设置
    defaultDuration: 3000,
    maxNotifications: 5,
    position: 'top-right', // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center

    // 通知类型
    types: {
      success: {
        icon: '✅',
        color: '#10AC84',
        gradient: 'linear-gradient(135deg, #10AC84 0%, #00D2D3 100%)'
      },
      error: {
        icon: '❌',
        color: '#EE5A24',
        gradient: 'linear-gradient(135deg, #EE5A24 0%, #FF6B6B 100%)'
      },
      warning: {
        icon: '⚠️',
        color: '#FF9F43',
        gradient: 'linear-gradient(135deg, #FF9F43 0%, #FFC048 100%)'
      },
      info: {
        icon: 'ℹ️',
        color: '#0ABDE3',
        gradient: 'linear-gradient(135deg, #0ABDE3 0%, #48DBFB 100%)'
      }
    },

    // 动画设置
    animations: {
      enter: 'slideInRight',
      exit: 'slideOutRight',
      duration: 300
    }
  };

  // ==================== 通知队列管理 ====================
  const NotificationQueue = {
    notifications: [],
    activeCount: 0,

    add: function(notification) {
      this.notifications.push(notification);
      this.process();
    },

    remove: function(id) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },

    process: function() {
      while (this.activeCount < NotificationConfig.maxNotifications && this.notifications.length > 0) {
        const notification = this.notifications.shift();
        this.show(notification);
        this.activeCount++;
      }
    },

    decrement: function() {
      this.activeCount--;
      this.process();
    }
  };

  // ==================== 通知管理器 ====================
  const NotificationManager = {
    container: null,
    counter: 0,

    init: function() {
      this.createContainer();
      this.addStyles();
    },

    createContainer: function() {
      const container = document.createElement('div');
      container.className = 'zt-notification-container';
      container.setAttribute('data-zt-position', NotificationConfig.position);
      document.body.appendChild(container);
      this.container = container;
    },

    addStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        .zt-notification-container {
          position: fixed;
          z-index: 9999;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          width: 100%;
        }

        .zt-notification-container[data-zt-position="top-right"] {
          top: 20px;
          right: 20px;
        }

        .zt-notification-container[data-zt-position="top-left"] {
          top: 20px;
          left: 20px;
        }

        .zt-notification-container[data-zt-position="bottom-right"] {
          bottom: 20px;
          right: 20px;
          flex-direction: column-reverse;
        }

        .zt-notification-container[data-zt-position="bottom-left"] {
          bottom: 20px;
          left: 20px;
          flex-direction: column-reverse;
        }

        .zt-notification-container[data-zt-position="top-center"] {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .zt-notification-container[data-zt-position="bottom-center"] {
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          flex-direction: column-reverse;
        }

        .zt-notification {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          animation: zt-notification-enter ${NotificationConfig.animations.duration}ms ease-out;
          transition: all ${NotificationConfig.animations.duration}ms ease-out;
        }

        .zt-notification.zt-notification-exit {
          animation: zt-notification-exit ${NotificationConfig.animations.duration}ms ease-in forwards;
        }

        .zt-notification-content {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 12px;
        }

        .zt-notification-icon {
          font-size: 24px;
          line-height: 1;
          flex-shrink: 0;
        }

        .zt-notification-body {
          flex: 1;
          min-width: 0;
        }

        .zt-notification-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #1a1a2e;
        }

        .zt-notification-message {
          font-size: 13px;
          color: #666;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .zt-notification-close {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border: none;
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #999;
          transition: color 150ms ease-out;
        }

        .zt-notification-close:hover {
          color: #EE5A24;
        }

        .zt-notification-progress {
          height: 3px;
          background: rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .zt-notification-progress-bar {
          height: 100%;
          background: currentColor;
          transform-origin: left;
          animation: zt-notification-progress linear forwards;
        }

        @keyframes zt-notification-enter {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes zt-notification-exit {
          from {
            opacity: 1;
            transform: translateX(0);
            max-height: 200px;
            margin-bottom: 12px;
          }
          to {
            opacity: 0;
            transform: translateX(100%);
            max-height: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
        }

        @keyframes zt-notification-progress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }

        /* 移动端适配 */
        @media (max-width: 768px) {
          .zt-notification-container {
            left: 10px !important;
            right: 10px !important;
            transform: none !important;
            max-width: none;
          }

          .zt-notification-container[data-zt-position^="top-"] {
            top: 10px;
          }

          .zt-notification-container[data-zt-position^="bottom-"] {
            bottom: 10px;
          }
        }
      `;

      document.head.appendChild(style);
    },

    // 创建通知
    create: function(options) {
      const id = `zt-notification-${++this.counter}`;

      // 默认选项
      const defaults = {
        type: 'info',
        title: '',
        message: '',
        duration: NotificationConfig.defaultDuration,
        showProgress: true,
        showClose: true,
        onClick: null,
        onClose: null
      };

      // 合并选项
      const config = { ...defaults, ...options };
      const typeConfig = NotificationConfig.types[config.type] || NotificationConfig.types.info;

      // 创建通知元素
      const notification = document.createElement('div');
      notification.className = 'zt-notification';
      notification.id = id;
      notification.style.color = typeConfig.color;

      // 构建内容
      let html = `
        <div class="zt-notification-content">
          <div class="zt-notification-icon">${typeConfig.icon}</div>
          <div class="zt-notification-body">
      `;

      if (config.title) {
        html += `<div class="zt-notification-title">${this.escapeHtml(config.title)}</div>`;
      }

      html += `<div class="zt-notification-message">${this.escapeHtml(config.message)}</div>`;

      html += `
          </div>
      `;

      if (config.showClose) {
        html += `<button class="zt-notification-close" data-zt-close="${id}">×</button>`;
      }

      html += `
        </div>
      `;

      if (config.showProgress && config.duration > 0) {
        html += `
          <div class="zt-notification-progress">
            <div class="zt-notification-progress-bar" style="animation-duration: ${config.duration}ms;"></div>
          </div>
        `;
      }

      notification.innerHTML = html;
      notification.dataset.config = JSON.stringify(config);

      // 绑定事件
      this.bindEvents(notification, config, id);

      return { element: notification, id, config };
    },

    // 绑定事件
    bindEvents: function(element, config, id) {
      // 关闭按钮
      const closeBtn = element.querySelector('[data-zt-close]');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.close(id);
        });
      }

      // 点击事件
      if (config.onClick) {
        element.style.cursor = 'pointer';
        element.addEventListener('click', () => {
          config.onClick(id);
        });
      }

      // 鼠标悬停暂停自动关闭
      if (config.duration > 0) {
        element.addEventListener('mouseenter', () => {
          const progressBar = element.querySelector('.zt-notification-progress-bar');
          if (progressBar) {
            progressBar.style.animationPlayState = 'paused';
          }
        });

        element.addEventListener('mouseleave', () => {
          const progressBar = element.querySelector('.zt-notification-progress-bar');
          if (progressBar) {
            progressBar.style.animationPlayState = 'running';
          }
        });
      }
    },

    // 转义 HTML
    escapeHtml: function(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    // 显示通知
    show: function(options) {
      const { element, id, config } = this.create(options);

      // 添加到容器
      this.container.appendChild(element);

      // 自动关闭
      if (config.duration > 0) {
        setTimeout(() => {
          this.close(id);
        }, config.duration);
      }

      return id;
    },

    // 关闭通知
    close: function(id) {
      const element = document.getElementById(id);
      if (!element) return;

      element.classList.add('zt-notification-exit');

      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        NotificationQueue.remove(id);
        NotificationQueue.decrement();

        // 触发回调
        try {
          const config = JSON.parse(element.dataset.config || '{}');
          if (config.onClose) {
            config.onClose(id);
          }
        } catch (e) {
          // 忽略解析错误
        }
      }, NotificationConfig.animations.duration);
    },

    // 清空所有通知
    clear: function() {
      const notifications = this.container.querySelectorAll('.zt-notification');
      notifications.forEach(n => {
        const id = n.id;
        this.close(id);
      });
    }
  };

  // ==================== 便捷方法 ====================
  const NotificationAPI = {
    // 成功通知
    success: function(message, options = {}) {
      return NotificationManager.show({
        type: 'success',
        title: '成功',
        message,
        ...options
      });
    },

    // 错误通知
    error: function(message, options = {}) {
      return NotificationManager.show({
        type: 'error',
        title: '错误',
        message,
        duration: 5000,
        ...options
      });
    },

    // 警告通知
    warning: function(message, options = {}) {
      return NotificationManager.show({
        type: 'warning',
        title: '警告',
        message,
        ...options
      });
    },

    // 信息通知
    info: function(message, options = {}) {
      return NotificationManager.show({
        type: 'info',
        title: '提示',
        message,
        ...options
      });
    },

    // 自定义通知
    show: function(options) {
      return NotificationManager.show(options);
    },

    // 关闭通知
    close: function(id) {
      NotificationManager.close(id);
    },

    // 清空通知
    clear: function() {
      NotificationManager.clear();
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.notifications = NotificationAPI;
  ZootopiaCore.notificationManager = NotificationManager;
  ZootopiaCore.notificationConfig = NotificationConfig;

  // ==================== 全局 API ====================
  window.ztNotify = NotificationAPI;
  window.ztNotifySuccess = NotificationAPI.success;
  window.ztNotifyError = NotificationAPI.error;
  window.ztNotifyWarning = NotificationAPI.warning;
  window.ztNotifyInfo = NotificationAPI.info;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    NotificationManager.init();
    console.log('📢 通知系统已就绪');
  });

  // ==================== 向后兼容 ====================
  // 保留旧的 showToast API
  if (ZootopiaCore.social && ZootopiaCore.social.showToast) {
    const originalShowToast = ZootopiaCore.social.showToast;
    ZootopiaCore.social.showToast = function(message, duration = 3000) {
      return NotificationAPI.info(message, { duration });
    };
  }

})();
