/**
 * 疯狂动物城博客系统 - 实用UI组件库
 * Zootopia Blog System - UI Components Library
 *
 * 版本: v3.5.0
 * 优化轮次: 第19轮
 * 最后更新: 2026-04-12
 *
 * 功能: 开箱即用的UI组件库
 */

(function() {
  'use strict';

  // UI组件配置
  const UIConfig = {
    // 通知配置
    notification: {
      duration: 3000,
      position: 'top-right',
      allowDismiss: true
    },

    // 对话框配置
    dialog: {
      overlay: true,
      closeOnOverlay: true
    },

    // 加载指示器配置
    loading: {
      minDuration: 500,
      spinnerColor: '#FF9F43'
    }
  };

  // UI组件库
  const ZootopiaUI = {
    // ==================== 通知组件 ====================
    notification: {
      // 显示通知
      show: function(message, options = {}) {
        const config = { ...UIConfig.notification, ...options };

        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `zt-notification zt-notification--${config.type || 'info'}`;
        notification.innerHTML = `
          <div class="zt-notification__icon">${this.getIcon(config.type)}</div>
          <div class="zt-notification__content">
            <div class="zt-notification__message">${message}</div>
            ${config.details ? `<div class="zt-notification__details">${config.details}</div>` : ''}
          </div>
          ${config.allowDismiss ? '<button class="zt-notification__close" onclick="this.parentElement.remove()">✕</button>' : ''}
        `;

        // 添加到页面
        document.body.appendChild(notification);

        // 自动消失
        if (config.duration > 0) {
          setTimeout(() => {
            notification.classList.add('zt-notification--hide');
            setTimeout(() => notification.remove(), 300);
          }, config.duration);
        }

        return notification;
      },

      // 快捷方法
      success: function(message, options) {
        return this.show(message, { ...options, type: 'success' });
      },

      error: function(message, options) {
        return this.show(message, { ...options, type: 'error', duration: 5000 });
      },

      warning: function(message, options) {
        return this.show(message, { ...options, type: 'warning' });
      },

      info: function(message, options) {
        return this.show(message, { ...options, type: 'info' });
      },

      // 获取图标
      getIcon: function(type) {
        const icons = {
          success: '✅',
          error: '❌',
          warning: '⚠️',
          info: 'ℹ️'
        };
        return icons[type] || 'ℹ️';
      }
    },

    // ==================== 确认对话框 ====================
    confirm: {
      show: function(message, options = {}) {
        return new Promise((resolve) => {
          const config = {
            title: '确认',
            confirmText: '确认',
            cancelText: '取消',
            ...UIConfig.dialog,
            ...options
          };

          // 创建遮罩层
          const overlay = document.createElement('div');
          overlay.className = 'zt-dialog-overlay';
          overlay.innerHTML = `
            <div class="zt-dialog">
              <div class="zt-dialog__header">
                <h3 class="zt-dialog__title">${config.title}</h3>
              </div>
              <div class="zt-dialog__body">
                <p class="zt-dialog__message">${message}</p>
              </div>
              <div class="zt-dialog__footer">
                <button class="zt-btn zt-btn--outline zt-dialog__cancel">${config.cancelText}</button>
                <button class="zt-btn zt-btn--primary zt-dialog__confirm">${config.confirmText}</button>
              </div>
            </div>
          `;

          // 添加到页面
          document.body.appendChild(overlay);

          // 绑定事件
          const confirmBtn = overlay.querySelector('.zt-dialog__confirm');
          const cancelBtn = overlay.querySelector('.zt-dialog__cancel');

          confirmBtn.onclick = () => {
            overlay.remove();
            resolve(true);
          };

          cancelBtn.onclick = () => {
            overlay.remove();
            resolve(false);
          };

          if (config.closeOnOverlay) {
            overlay.onclick = (e) => {
              if (e.target === overlay) {
                overlay.remove();
                resolve(false);
              }
            };
          }
        });
      }
    },

    // ==================== 加载指示器 ====================
    loading: {
      show: function(message = '加载中...', options = {}) {
        const config = { ...UIConfig.loading, ...options };

        // 创建加载器
        const overlay = document.createElement('div');
        overlay.id = 'zt-loading-overlay';
        overlay.className = 'zt-loading-overlay';
        overlay.innerHTML = `
          <div class="zt-loading-content">
            <div class="zt-loading-spinner" style="border-top-color: ${config.spinnerColor}"></div>
            <div class="zt-loading-message">${message}</div>
          </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        return {
          hide: () => this.hide(),
          setMessage: (msg) => this.setMessage(msg)
        };
      },

      hide: function() {
        const overlay = document.getElementById('zt-loading-overlay');
        if (overlay) {
          overlay.classList.add('zt-loading-overlay--hide');
          setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
          }, 300);
        }
      },

      setMessage: function(message) {
        const msgEl = document.querySelector('.zt-loading-message');
        if (msgEl) {
          msgEl.textContent = message;
        }
      }
    },

    // ==================== 进度条 ====================
    progressBar: {
      create: function(options = {}) {
        const config = {
          position: 'top',
          showPercent: true,
          color: '#FF9F43',
          ...options
        };

        // 创建进度条容器
        const container = document.createElement('div');
        container.className = `zt-progress-container zt-progress-container--${config.position}`;
        container.innerHTML = `
          <div class="zt-progress-bar-bg">
            <div class="zt-progress-bar-fill" style="background-color: ${config.color}"></div>
          </div>
          ${config.showPercent ? '<div class="zt-progress-text">0%</div>' : ''}
          <div class="zt-progress-message"></div>
        `;

        document.body.appendChild(container);

        return {
          update: (percent, message) => this.update(percent, message),
          complete: (message) => this.complete(message),
          hide: () => this.hide()
        };
      },

      update: function(percent, message) {
        const fill = document.querySelector('.zt-progress-bar-fill');
        const text = document.querySelector('.zt-progress-text');
        const msgEl = document.querySelector('.zt-progress-message');

        if (fill) fill.style.width = `${Math.min(100, Math.max(0, percent))}%`;
        if (text) text.textContent = `${Math.round(percent)}%`;
        if (msgEl && message) msgEl.textContent = message;
      },

      complete: function(message = '完成！') {
        this.update(100, message);

        setTimeout(() => {
          this.hide();
        }, 1000);
      },

      hide: function() {
        const container = document.querySelector('.zt-progress-container');
        if (container) {
          container.classList.add('zt-progress-container--hide');
          setTimeout(() => container.remove(), 300);
        }
      }
    },

    // ==================== 提示框 ====================
    tooltip: {
      show: function(element, content, options = {}) {
        const config = {
          position: 'top',
          trigger: 'hover',
          ...options
        };

        // 创建提示框
        const tooltip = document.createElement('div');
        tooltip.className = `zt-tooltip zt-tooltip--${config.position}`;
        tooltip.textContent = content;

        document.body.appendChild(tooltip);

        // 定位
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top, left;

        switch (config.position) {
          case 'top':
            top = rect.top - tooltipRect.height - 10;
            left = rect.left + (rect.width - tooltipRect.width) / 2;
            break;
          case 'bottom':
            top = rect.bottom + 10;
            left = rect.left + (rect.width - tooltipRect.width) / 2;
            break;
          case 'left':
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.left - tooltipRect.width - 10;
            break;
          case 'right':
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.right + 10;
            break;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;

        // 显示
        setTimeout(() => {
          tooltip.classList.add('zt-tooltip--show');
        }, 10);

        // 自动隐藏
        if (config.trigger === 'hover') {
          element.addEventListener('mouseleave', () => {
            tooltip.remove();
          }, { once: true });
        }

        return tooltip;
      }
    },

    // ==================== 模态框 ====================
    modal: {
      show: function(content, options = {}) {
        const config = {
          title: '',
          size: 'medium',
          closeOnOverlay: true,
          ...options
        };

        // 创建模态框
        const overlay = document.createElement('div');
        overlay.className = 'zt-modal-overlay';
        overlay.innerHTML = `
          <div class="zt-modal zt-modal--${config.size}">
            ${config.title ? `
              <div class="zt-modal__header">
                <h3 class="zt-modal__title">${config.title}</h3>
                <button class="zt-modal__close" onclick="this.closest('.zt-modal-overlay').remove()">✕</button>
              </div>
            ` : ''}
            <div class="zt-modal__body">
              ${content}
            </div>
          </div>
        `;

        document.body.appendChild(overlay);

        // 关闭事件
        if (config.closeOnOverlay) {
          overlay.onclick = (e) => {
            if (e.target === overlay) {
              overlay.remove();
            }
          };
        }

        return {
          close: () => overlay.remove(),
          element: overlay.querySelector('.zt-modal')
        };
      }
    }
  };

  // 导出全局对象
  window.ZootopiaUI = ZootopiaUI;

  // 导出便捷函数
  window.ztNotify = function(message, type, options) {
    return ZootopiaUI.notification[type || 'info'](message, options);
  };

  window.ztConfirm = function(message, options) {
    return ZootopiaUI.confirm.show(message, options);
  };

  window.ztLoading = {
    show: function(message, options) {
      return ZootopiaUI.loading.show(message, options);
    },
    hide: function() {
      return ZootopiaUI.loading.hide();
    }
  };

  window.ztProgressBar = {
    create: function(options) {
      return ZootopiaUI.progressBar.create(options);
    }
  };

  // 初始化完成提示
  console.log('🎨 疯狂动物城UI组件库已加载！');
  console.log('💬 使用 ztNotify(message, type) 显示通知');
  console.log('❓ 使用 ztConfirm(message) 显示确认框');
  console.log('⏳ 使用 ztLoading.show(message) 显示加载指示器');
  console.log('📊 使用 ztProgressBar.create() 创建进度条');

})();
