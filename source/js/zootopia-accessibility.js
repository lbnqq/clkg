/**
 * 疯狂动物城可访问性增强系统
 * Zootopia Accessibility - ARIA标签、键盘导航、屏幕阅读器支持
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const A11YConfig = {
    // ARIA 配置
    aria: {
      autoInject: true,
      liveRegions: true,
      landmarks: true
    },

    // 键盘导航
    keyboard: {
      enable: true,
      visualFocus: true,
      skipLinks: true,
      trapFocus: false
    },

    // 屏幕阅读器
    screenReader: {
      announce: true,
      verbose: false,
      polite: true
    },

    // 快捷键
    shortcuts: {
      'Alt+M': 'main',
      'Alt+N': 'navigation',
      'Alt+S': 'search',
      'Alt+C': 'content',
      'Alt+F': 'footer',
      'Escape': 'close-dialog'
    },

    // 焦点管理
    focus: {
      restore: true,
      trapModals: true,
      autoFocusModals: true
    }
  };

  // ==================== ARIA 管理器 ====================
  const ARIAManager = {
    init: function() {
      if (A11YConfig.aria.autoInject) {
        this.injectARIA();
      }

      if (A11YConfig.aria.liveRegions) {
        this.createLiveRegions();
      }

      if (A11YConfig.aria.landmarks) {
        this.enhanceLandmarks();
      }
    },

    // 自动注入 ARIA 标签
    injectARIA: function() {
      // 为按钮添加 aria-label
      document.querySelectorAll('button').forEach(button => {
        if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
          const icon = button.querySelector('[class*="icon"], [class*="fa-"]');
          if (icon) {
            const label = this.getIconLabel(icon);
            if (label) {
              button.setAttribute('aria-label', label);
            }
          }
        }
      });

      // 为链接添加描述
      document.querySelectorAll('a[href]').forEach(link => {
        if (link.textContent.trim() === '' || link.textContent === '更多') {
          const href = link.getAttribute('href');
          const title = link.getAttribute('title') || this.getLinkLabel(href);
          if (title) {
            link.setAttribute('aria-label', title);
          }
        }
      });

      // 为表单元素添加标签
      document.querySelectorAll('input, select, textarea').forEach(input => {
        if (!input.hasAttribute('aria-label') && !input.hasAttribute('id')) {
          const placeholder = input.getAttribute('placeholder');
          if (placeholder) {
            input.setAttribute('aria-label', placeholder);
          }
        }
      });

      // 为模态框添加角色
      document.querySelectorAll('[class*="modal"], [class*="dialog"]').forEach(modal => {
        if (!modal.hasAttribute('role')) {
          modal.setAttribute('role', 'dialog');
          modal.setAttribute('aria-modal', 'true');
        }
      });
    },

    // 获取图标标签
    getIconLabel: function(icon) {
      const classNames = icon.className;

      const iconLabels = {
        'search': '搜索',
        'menu': '菜单',
        'close': '关闭',
        'user': '用户',
        'home': '首页',
        'settings': '设置',
        'delete': '删除',
        'edit': '编辑',
        'save': '保存',
        'cancel': '取消',
        'confirm': '确认',
        'arrow': '箭头',
        'chevron': '箭头',
        'heart': '点赞',
        'share': '分享',
        'comment': '评论'
      };

      for (const [key, label] of Object.entries(iconLabels)) {
        if (classNames.includes(key)) {
          return label;
        }
      }

      return null;
    },

    // 获取链接标签
    getLinkLabel: function(href) {
      if (href.includes('/about')) return '关于';
      if (href.includes('/archives')) return '归档';
      if (href.includes('/tags')) return '标签';
      if (href.includes('/categories')) return '分类';
      return null;
    },

    // 创建实时区域
    createLiveRegions: function() {
      // Polite 区域（非中断通知）
      if (!document.getElementById('zt-a11y-live-polite')) {
        const polite = document.createElement('div');
        polite.id = 'zt-a11y-live-polite';
        polite.setAttribute('aria-live', 'polite');
        polite.setAttribute('aria-atomic', 'true');
        polite.className = 'zt-sr-only';
        document.body.appendChild(polite);
      }

      // Assertive 区域（重要通知）
      if (!document.getElementById('zt-a11y-live-assertive')) {
        const assertive = document.createElement('div');
        assertive.id = 'zt-a11y-live-assertive';
        assertive.setAttribute('aria-live', 'assertive');
        assertive.setAttribute('aria-atomic', 'true');
        assertive.className = 'zt-sr-only';
        document.body.appendChild(assertive);
      }
    },

    // 增强地标
    enhanceLandmarks: function() {
      // 添加 main 地标
      const main = document.querySelector('main') || document.getElementById('content');
      if (main && !main.hasAttribute('role')) {
        main.setAttribute('role', 'main');
      }

      // 添加 navigation 地标
      const nav = document.querySelector('nav');
      if (nav && !nav.hasAttribute('role')) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', '主导航');
      }

      // 添加 complementary 地标
      const aside = document.querySelector('aside');
      if (aside && !aside.hasAttribute('role')) {
        aside.setAttribute('role', 'complementary');
      }

      // 添加 banner 地标
      const header = document.querySelector('header');
      if (header && !header.hasAttribute('role')) {
        header.setAttribute('role', 'banner');
      }

      // 添加 contentinfo 地标
      const footer = document.querySelector('footer');
      if (footer && !footer.hasAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
      }
    },

    // 播报消息
    announce: function(message, priority = 'polite') {
      const regionId = priority === 'assertive'
        ? 'zt-a11y-live-assertive'
        : 'zt-a11y-live-polite';

      const region = document.getElementById(regionId);
      if (region) {
        region.textContent = '';
        setTimeout(() => {
          region.textContent = message;
        }, 100);
      }
    }
  };

  // ==================== 键盘导航管理器 ====================
  const KeyboardNavManager = {
    focusableElements: null,
    currentFocus: null,

    init: function() {
      if (!A11YConfig.keyboard.enable) return;

      this.setupSkipLinks();
      this.setupVisualFocus();
      this.setupKeyboardShortcuts();
      this.setupFocusTrap();
    },

    // 设置跳转链接
    setupSkipLinks: function() {
      if (!A11YConfig.keyboard.skipLinks) return;

      const skipLinks = document.createElement('div');
      skipLinks.className = 'zt-skip-links';
      skipLinks.innerHTML = `
        <a href="#main" class="zt-skip-link">跳转到主要内容</a>
        <a href="#navigation" class="zt-skip-link">跳转到导航</a>
        <a href="#search" class="zt-skip-link">跳转到搜索</a>
      `;
      document.body.insertBefore(skipLinks, document.body.firstChild);
    },

    // 设置视觉焦点
    setupVisualFocus: function() {
      if (!A11YConfig.keyboard.visualFocus) return;

      // 监听焦点变化
      document.addEventListener('focusin', (e) => {
        this.currentFocus = e.target;
        e.target.classList.add('zt-focus-visible');
      }, true);

      document.addEventListener('focusout', (e) => {
        e.target.classList.remove('zt-focus-visible');
      }, true);

      // 移除鼠标点击后的焦点样式
      document.addEventListener('mousedown', () => {
        document.body.classList.add('zt-using-mouse');
      });

      document.addEventListener('keydown', () => {
        document.body.classList.remove('zt-using-mouse');
      });
    },

    // 设置键盘快捷键
    setupKeyboardShortcuts: function() {
      document.addEventListener('keydown', (e) => {
        // Alt + 组合键
        if (e.altKey) {
          const key = e.key.toLowerCase();
          const shortcut = `Alt+${key.charAt(0).toUpperCase() + key.slice(1)}`;

          if (A11YConfig.shortcuts[shortcut]) {
            e.preventDefault();
            this.handleShortcut(shortcut);
          }
        }

        // Escape 键
        if (e.key === 'Escape') {
          this.handleEscape();
        }
      });
    },

    // 处理快捷键
    handleShortcut: function(shortcut) {
      const target = A11YConfig.shortcuts[shortcut];

      switch (target) {
        case 'main':
          this.focusElement('main, [role="main"]');
          break;
        case 'navigation':
          this.focusElement('nav, [role="navigation"]');
          break;
        case 'search':
          this.focusElement('#search, [role="search"]');
          break;
        case 'content':
          this.focusElement('main, [role="main"]');
          break;
        case 'footer':
          this.focusElement('footer, [role="contentinfo"]');
          break;
      }

      ARIAManager.announce(`已跳转到${target}`, 'polite');
    },

    // 处理 Escape 键
    handleEscape: function() {
      // 关闭打开的模态框
      const openModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
      if (openModal) {
        const closeBtn = openModal.querySelector('[aria-label*="关闭"], [aria-label*="close"]');
        if (closeBtn) {
          closeBtn.click();
        }
      }

      // 关闭打开的菜单
      const openMenu = document.querySelector('[aria-expanded="true"]');
      if (openMenu) {
        openMenu.click();
      }
    },

    // 聚焦元素
    focusElement: function(selector) {
      const element = document.querySelector(selector);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    // 设置焦点陷阱
    setupFocusTrap: function() {
      // 为模态框设置焦点陷阱
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const role = node.getAttribute('role');
              if (role === 'dialog' || node.classList.contains('modal')) {
                this.trapFocus(node);
              }
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    },

    // 陷阱焦点
    trapFocus: function(container) {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      container.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }
  };

  // ==================== 屏幕阅读器增强 ====================
  const ScreenReaderManager = {
    init: function() {
      this.injectScreenReaderStyles();
      this.enhanceImages();
      this.enhanceLists();
    },

    // 注入屏幕阅读器样式
    injectScreenReaderStyles: function() {
      if (document.getElementById('zt-a11y-styles')) return;

      const style = document.createElement('style');
      style.id = 'zt-a11y-styles';
      style.textContent = `
        /* 仅屏幕阅读器可见 */
        .zt-sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        /* 跳转链接 */
        .zt-skip-links {
          position: fixed;
          top: -40px;
          left: 0;
          right: 0;
          z-index: 9999;
        }

        .zt-skip-link {
          position: absolute;
          left: -9999px;
          padding: 10px 15px;
          background: #000;
          color: #fff;
          text-decoration: none;
          z-index: 9999;
        }

        .zt-skip-link:focus {
          left: 10px;
          top: 10px;
        }

        /* 焦点可见性 */
        :focus-not(.zt-using-mouse) {
          outline: 2px solid #FF9F43;
          outline-offset: 2px;
        }

        .zt-focus-visible {
          outline: 2px solid #FF9F43;
          outline-offset: 2px;
        }

        /* 隐藏辅助元素 */
        [aria-hidden="true"] {
          display: none !important;
        }
      `;

      document.head.appendChild(style);
    },

    // 增强图片
    enhanceImages: function() {
      document.querySelectorAll('img').forEach(img => {
        // 为没有 alt 的图片添加空 alt
        if (!img.hasAttribute('alt')) {
          const isDecorative = img.classList.contains('decorative') ||
                              img.classList.contains('bg') ||
                              img.width < 20;

          if (isDecorative) {
            img.setAttribute('alt', '');
            img.setAttribute('role', 'presentation');
          }
        }

        // 为长描述添加 longdesc
        if (img.naturalWidth > 300 && !img.hasAttribute('longdesc')) {
          const figcaption = img.closest('figure')?.querySelector('figcaption');
          if (figcaption) {
            img.setAttribute('aria-describedby', this.getId(figcaption));
          }
        }
      });
    },

    // 增强列表
    enhanceLists: function() {
      // 为导航列表添加角色
      document.querySelectorAll('nav ul').forEach(list => {
        if (!list.hasAttribute('role')) {
          list.setAttribute('role', 'list');
        }
      });

      document.querySelectorAll('nav li').forEach(item => {
        if (!item.hasAttribute('role')) {
          item.setAttribute('role', 'listitem');
        }
      });
    },

    // 获取或生成 ID
    getId: function(element) {
      if (!element.id) {
        element.id = `zt-desc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      }
      return element.id;
    }
  };

  // ==================== 高对比度模式 ====================
  const ContrastManager = {
    init: function() {
      this.detectPreference();
      this.setupToggle();
    },

    // 检测用户偏好
    detectPreference: function() {
      const prefersContrast = window.matchMedia('(prefers-contrast: high)').matches;

      if (prefersContrast) {
        this.enableHighContrast();
      }
    },

    // 设置切换按钮
    setupToggle: function() {
      // 如果已经存在切换按钮，则跳过
      if (document.getElementById('zt-contrast-toggle')) return;

      const toggle = document.createElement('button');
      toggle.id = 'zt-contrast-toggle';
      toggle.className = 'zt-contrast-toggle';
      toggle.setAttribute('aria-label', '切换高对比度模式');
      toggle.innerHTML = '👁️';
      toggle.title = '高对比度';

      toggle.addEventListener('click', () => {
        this.toggle();
      });

      document.body.appendChild(toggle);
    },

    // 切换高对比度
    toggle: function() {
      const isEnabled = document.body.classList.contains('zt-high-contrast');

      if (isEnabled) {
        this.disableHighContrast();
      } else {
        this.enableHighContrast();
      }
    },

    // 启用高对比度
    enableHighContrast: function() {
      document.body.classList.add('zt-high-contrast');

      // 注入高对比度样式
      if (!document.getElementById('zt-high-contrast-styles')) {
        const style = document.createElement('style');
        style.id = 'zt-high-contrast-styles';
        style.textContent = `
          .zt-high-contrast {
            filter: contrast(1.2);
          }

          .zt-high-contrast * {
            background-color: #fff !important;
            color: #000 !important;
            border-color: #000 !important;
          }

          .zt-high-contrast a,
          .zt-high-contrast button {
            text-decoration: underline;
            font-weight: 700;
          }

          .zt-high-contrast img {
            filter: grayscale(1) contrast(1.5);
          }

          .zt-high-contrast [role="progressbar"] {
            border: 2px solid #000 !important;
          }
        `;
        document.head.appendChild(style);
      }

      ARIAManager.announce('已启用高对比度模式', 'assertive');
      this.savePreference(true);
    },

    // 禁用高对比度
    disableHighContrast: function() {
      document.body.classList.remove('zt-high-contrast');
      ARIAManager.announce('已关闭高对比度模式', 'assertive');
      this.savePreference(false);
    },

    // 保存偏好
    savePreference: function(enabled) {
      try {
        localStorage.setItem('zt-high-contrast', enabled);
      } catch (e) {
        console.warn('无法保存高对比度偏好');
      }
    },

    // 加载偏好
    loadPreference: function() {
      try {
        const saved = localStorage.getItem('zt-high-contrast');
        if (saved === 'true') {
          this.enableHighContrast();
        }
      } catch (e) {
        return false;
      }
    }
  };

  // ==================== 可访问性主系统 ====================
  const AccessibilitySupport = {
    initialized: false,

    init: function() {
      if (this.initialized) return;

      // 初始化各个模块
      ARIAManager.init();
      KeyboardNavManager.init();
      ScreenReaderManager.init();
      ContrastManager.init();
      ContrastManager.loadPreference();

      this.initialized = true;
      console.log('♿ 可访问性增强系统已就绪');
    },

    // 获取状态
    getStatus: function() {
      return {
        aria: {
          injected: A11YConfig.aria.autoInject,
          liveRegions: A11YConfig.aria.liveRegions,
          landmarks: A11YConfig.aria.landmarks
        },
        keyboard: {
          enabled: A11YConfig.keyboard.enable,
          shortcuts: A11YConfig.shortcuts
        },
        highContrast: document.body.classList.contains('zt-high-contrast'),
        screenReader: {
          announce: A11YConfig.screenReader.announce
        }
      };
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.a11y = AccessibilitySupport;
  ZootopiaCore.ariaManager = ARIAManager;
  ZootopiaCore.keyboardNav = KeyboardNavManager;
  ZootopiaCore.screenReader = ScreenReaderManager;
  ZootopiaCore.contrastManager = ContrastManager;
  ZootopiaCore.a11yConfig = A11YConfig;

  // ==================== 全局 API ====================
  // 启用无障碍模式
  window.ztEnableA11yMode = () => AccessibilitySupport.init();

  // 获取无障碍状态
  window.ztGetA11yStatus = () => AccessibilitySupport.getStatus();

  // 屏幕阅读器播报
  window.ztAnnounceToScreenReader = (message, priority) => {
    ARIAManager.announce(message, priority);
  };

  // 切换高对比度
  window.ztToggleHighContrast = () => ContrastManager.toggle();

  // 启用高对比度
  window.ztEnableHighContrast = () => ContrastManager.enableHighContrast();

  // 禁用高对比度
  window.ztDisableHighContrast = () => ContrastManager.disableHighContrast();

  // 跳转到元素
  window.ztJumpTo = (selector) => KeyboardNavManager.focusElement(selector);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    AccessibilitySupport.init();
  });

})();
