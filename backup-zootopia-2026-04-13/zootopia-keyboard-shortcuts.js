/**
 * 疯狂动物城键盘快捷键系统
 * Zootopia Keyboard Shortcuts
 *
 * 提供完整的键盘操作支持，提升操作效率
 */

(function() {
  'use strict';

  const KeyboardShortcutsConfig = {
    // 快捷键定义
    shortcuts: {
      // 导航
      'goHome': {
        keys: ['g', 'h'],
        description: '回到首页',
        action: () => { window.location.href = '/'; }
      },
      'goTop': {
        keys: ['g', 'g'],
        description: '回到顶部',
        action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }
      },
      'goBottom': {
        keys: ['Shift', 'g'],
        description: '跳到底部',
        action: () => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }
      },

      // 搜索
      'focusSearch': {
        keys: ['/'],
        description: '聚焦搜索框',
        action: () => {
          const searchInput = document.querySelector('#search-input input[type="search"]') ||
                            document.querySelector('.search-input') ||
                            document.querySelector('input[placeholder*="搜索"]');
          if (searchInput) searchInput.focus();
        }
      },

      // 阅读
      'scrollDown': {
        keys: ['j'],
        description: '向下滚动',
        action: () => { window.scrollBy({ top: 200, behavior: 'smooth' }); }
      },
      'scrollUp': {
        keys: ['k'],
        description: '向上滚动',
        action: () => { window.scrollBy({ top: -200, behavior: 'smooth' }); }
      },
      'nextSection': {
        keys: ['n'],
        description: '下一个章节',
        action: () => {
          // 需要与阅读进度系统集成
          const headings = document.querySelectorAll('h1, h2, h3, h4');
          const currentScroll = window.pageYOffset;
          for (let heading of headings) {
            if (heading.offsetTop > currentScroll + 100) {
              heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
              break;
            }
          }
        }
      },
      'prevSection': {
        keys: ['p'],
        description: '上一个章节',
        action: () => {
          const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).reverse();
          const currentScroll = window.pageYOffset;
          for (let heading of headings) {
            if (heading.offsetTop < currentScroll - 100) {
              heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
              break;
            }
          }
        }
      },

      // 功能
      'toggleReadingMode': {
        keys: ['r'],
        description: '切换阅读模式',
        action: () => {
          if (window.ztToggleReadingMode) {
            ztToggleReadingMode();
          }
        }
      },
      'toggleDarkMode': {
        keys: ['d'],
        description: '切换深色模式',
        action: () => {
          if (window.ztToggleDarkMode) {
            ztToggleDarkMode();
          }
        }
      },
      'toggleTOC': {
        keys: ['t'],
        description: '切换目录',
        action: () => {
          if (window.ztToggleTableOfContents) {
            ztToggleTableOfContents();
          }
        }
      },

      // 帮助
      'showHelp': {
        keys: ['?'],
        description: '显示快捷键帮助',
        action: () => { KeyboardHelp.show(); }
      },

      // ESC
      'closeModals': {
        keys: ['Escape'],
        description: '关闭所有弹窗',
        action: () => {
          // 关闭所有模态框
          document.querySelectorAll('.zt-modal, .zt-qrcode-modal').forEach(modal => {
            modal.classList.remove('zt-modal-visible', 'zt-qrcode-visible');
          });
        }
      }
    },

    // 设置
    enabled: true,
    preventDefault: true,
    showIndicator: true,
    indicatorDuration: 1000
  };

  /**
   * 快捷键管理器
   */
  const KeyboardShortcuts = {
    keySequence: [],
    keyTimeout: null,
    keyTimeoutDelay: 1000,

    /**
     * 初始化
     */
    init: function() {
      this.attachEvents();
      this.createHelp();
    },

    /**
     * 附加事件
     */
    attachEvents: function() {
      if (!KeyboardShortcutsConfig.enabled) return;

      document.addEventListener('keydown', (e) => {
        this.handleKeydown(e);
      });
    },

    /**
     * 处理按键
     */
    handleKeydown: function(e) {
      // 忽略在输入框中的按键
      if (this.isInputFocused(e)) {
        return;
      }

      const key = this.getKeyName(e);

      // 处理单键快捷键
      if (this.checkSingleKey(key, e)) {
        return;
      }

      // 处理多键序列
      this.handleKeySequence(key, e);
    },

    /**
     * 检查是否在输入框中
     */
    isInputFocused: function(e) {
      const tag = e.target.tagName.toLowerCase();
      const isInput = tag === 'input' || tag === 'textarea' || tag === 'select';
      const isEditable = e.target.isContentEditable;
      return isInput || isEditable;
    },

    /**
     * 获取按键名称
     */
    getKeyName: function(e) {
      // 特殊键
      if (e.key === 'Escape') return 'Escape';
      if (e.key === 'Enter') return 'Enter';
      if (e.key === 'Tab') return 'Tab';
      if (e.key === ' ') return 'Space';

      // 修饰键
      if (e.shiftKey && e.key !== 'Shift') return 'Shift';
      if (e.ctrlKey && e.key !== 'Control') return 'Control';
      if (e.altKey && e.key !== 'Alt') return 'Alt';
      if (e.metaKey && e.key !== 'Meta') return 'Meta';

      // 字母和数字
      return e.key.toLowerCase();
    },

    /**
     * 检查单键快捷键
     */
    checkSingleKey: function(key, e) {
      for (const [name, shortcut] of Object.entries(KeyboardShortcutsConfig.shortcuts)) {
        if (shortcut.keys.length === 1 && shortcut.keys[0] === key) {
          e.preventDefault();
          shortcut.action();
          this.showIndicator(shortcut.description);
          return true;
        }
      }
      return false;
    },

    /**
     * 处理按键序列
     */
    handleKeySequence: function(key, e) {
      // 添加到序列
      this.keySequence.push(key);

      // 清除之前的超时
      clearTimeout(this.keyTimeout);

      // 设置新的超时
      this.keyTimeout = setTimeout(() => {
        this.keySequence = [];
      }, KeyboardShortcutsConfig.keyTimeoutDelay);

      // 检查是否匹配
      for (const [name, shortcut] of Object.entries(KeyboardShortcutsConfig.shortcuts)) {
        if (this.matchesSequence(shortcut.keys)) {
          e.preventDefault();
          this.keySequence = [];
          shortcut.action();
          this.showIndicator(shortcut.description);
          return;
        }
      }
    },

    /**
     * 检查是否匹配按键序列
     */
    matchesSequence: function(keys) {
      if (keys.length !== this.keySequence.length) return false;

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== this.keySequence[i]) {
          return false;
        }
      }

      return true;
    },

    /**
     * 显示操作指示器
     */
    showIndicator: function(description) {
      if (!KeyboardShortcutsConfig.showIndicator) return;

      // 移除旧的指示器
      const old = document.querySelector('.zt-keyboard-indicator');
      if (old) old.remove();

      // 创建新指示器
      const indicator = document.createElement('div');
      indicator.className = 'zt-keyboard-indicator';
      indicator.textContent = description;

      document.body.appendChild(indicator);

      // 显示动画
      setTimeout(() => indicator.classList.add('zt-indicator-visible'), 10);

      // 自动隐藏
      setTimeout(() => {
        indicator.classList.remove('zt-indicator-visible');
        setTimeout(() => indicator.remove(), 300);
      }, KeyboardShortcutsConfig.indicatorDuration);
    },

    /**
     * 创建帮助
     */
    createHelp: function() {
      // 帮助已经集成到 KeyboardHelp 中
    }
  };

  /**
   * 快捷键帮助显示
   */
  const KeyboardHelp = {
    modal: null,

    /**
     * 显示帮助
     */
    show: function() {
      if (this.modal) {
        this.hide();
        return;
      }

      this.createModal();
    },

    /**
     * 创建模态框
     */
    createModal: function() {
      this.modal = document.createElement('div');
      this.modal.className = 'zt-keyboard-help-modal';
      this.modal.setAttribute('role', 'dialog');
      this.modal.setAttribute('aria-modal', 'true');
      this.modal.innerHTML = `
        <div class="zt-keyboard-help-content">
          <div class="zt-keyboard-help-header">
            <h2>⌨️ 键盘快捷键</h2>
            <button class="zt-keyboard-help-close" aria-label="关闭">×</button>
          </div>
          <div class="zt-keyboard-help-body">
            ${this.renderCategories()}
          </div>
          <div class="zt-keyboard-help-footer">
            <p>按 <kbd>?</kbd> 随时打开此帮助</p>
            <p>疯狂动物城主题 v2.7.0</p>
          </div>
        </div>
      `;

      document.body.appendChild(this.modal);

      // 关闭按钮
      this.modal.querySelector('.zt-keyboard-help-close').addEventListener('click', () => {
        this.hide();
      });

      // 点击背景关闭
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.hide();
        }
      });

      // ESC 关闭
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          this.hide();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);

      // 显示动画
      setTimeout(() => this.modal.classList.add('zt-help-visible'), 10);
    },

    /**
     * 渲染分类
     */
    renderCategories: function() {
      const categories = {
        '导航': ['goHome', 'goTop', 'goBottom', 'focusSearch'],
        '阅读': ['scrollDown', 'scrollUp', 'nextSection', 'prevSection'],
        '功能': ['toggleReadingMode', 'toggleDarkMode', 'toggleTOC'],
        '其他': ['showHelp', 'closeModals']
      };

      return Object.entries(categories).map(([category, shortcuts]) => {
        return `
          <div class="zt-keyboard-category">
            <h3 class="zt-keyboard-category-title">${category}</h3>
            <div class="zt-keyboard-shortcuts">
              ${shortcuts.map(name => this.renderShortcut(name)).join('')}
            </div>
          </div>
        `;
      }).join('');
    },

    /**
     * 渲染单个快捷键
     */
    renderShortcut: function(name) {
      const shortcut = KeyboardShortcutsConfig.shortcuts[name];
      if (!shortcut) return '';

      const keys = shortcut.keys.map(key => {
        if (key === 'Shift') return '<kbd>Shift</kbd>';
        if (key === 'Control') return '<kbd>Ctrl</kbd>';
        if (key === 'Escape') return '<kbd>Esc</kbd>';
        return `<kbd>${key.toUpperCase()}</kbd>`;
      }).join(' + ');

      return `
        <div class="zt-keyboard-shortcut">
          <div class="zt-shortcut-keys">${keys}</div>
          <div class="zt-shortcut-description">${shortcut.description}</div>
        </div>
      `;
    },

    /**
     * 隐藏帮助
     */
    hide: function() {
      if (!this.modal) return;

      this.modal.classList.remove('zt-help-visible');

      setTimeout(() => {
        if (this.modal) {
          this.modal.remove();
          this.modal = null;
        }
      }, 300);
    }
  };

  // 导出 API
  ZootopiaCore.keyboardShortcuts = KeyboardShortcuts;
  ZootopiaCore.keyboardConfig = KeyboardShortcutsConfig;
  ZootopiaCore.keyboardHelp = KeyboardHelp;

  // 全局 API
  window.ztShowKeyboardHelp = () => KeyboardHelp.show();
  window.ztRegisterShortcut = (name, shortcut) => {
    KeyboardShortcutsConfig.shortcuts[name] = shortcut;
  };

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    KeyboardShortcuts.init();
  });

})();
