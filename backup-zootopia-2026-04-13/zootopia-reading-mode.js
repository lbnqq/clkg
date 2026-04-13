/**
 * 疯狂动物城阅读模式系统
 * Zootopia Reading Mode - 沉浸式阅读体验
 */

(function() {
  'use strict';

  const ReadingModeConfig = {
    colors: {
      light: { bg: '#ffffff', text: '#333333', link: '#FF9F43' },
      dark: { bg: '#1a1a1a', text: '#e0e0e0', link: '#FF9F43' },
      sepia: { bg: '#f4ecd8', text: '#5c4b37', link: '#c9a227' },
      night: { bg: '#0d1117', text: '#c9d1d9', link: '#58a6ff' }
    },
    fonts: {
      sizes: [14, 16, 18, 20, 22, 24],
      lineHeights: [1.4, 1.6, 1.8, 2.0]
    },
    widths: ['narrow', 'medium', 'wide', 'full']
  };

  const ReadingMode = {
    isActive: false,
    currentTheme: 'light',
    currentFontSize: 16,
    currentLineHeight: 1.6,
    currentWidth: 'medium',
    originalState: {},

    init: function() {
      this.saveOriginalState();
      this.setupToggle();
    },

    saveOriginalState: function() {
      const article = this.findArticle();
      if (!article) return;

      this.originalState = {
        html: article.innerHTML,
        className: article.className
      };
    },

    findArticle: function() {
      return document.querySelector('article') ||
             document.querySelector('.post-content') ||
             document.querySelector('[itemprop="articleBody"]');
    },

    setupToggle: function() {
      // 检查是否已存在切换按钮
      if (document.getElementById('zt-reading-mode-toggle')) return;

      const toggle = document.createElement('button');
      toggle.id = 'zt-reading-mode-toggle';
      toggle.className = 'zt-reading-mode-toggle';
      toggle.innerHTML = '📖 阅读模式';
      toggle.setAttribute('aria-label', '切换阅读模式');
      toggle.addEventListener('click', () => this.toggle());
      document.body.appendChild(toggle);
    },

    enable: function() {
      const article = this.findArticle();
      if (!article) return;

      this.isActive = true;

      // 创建阅读模式容器
      const container = document.createElement('div');
      container.className = 'zt-reading-mode-container';
      container.innerHTML = article.innerHTML;

      // 替换文章内容
      article.innerHTML = '';
      article.appendChild(container);

      // 应用样式
      article.className = 'zt-reading-mode-active';
      container.style.fontSize = `${this.currentFontSize}px`;
      container.style.lineHeight = this.currentLineHeight;
      container.style.maxWidth = this.getWidthValue();

      // 创建控制栏
      this.createControls(article);

      // 滚动到文章顶部
      article.scrollIntoView({ behavior: 'smooth' });

      // 播报状态
      if (window.ztAnnounceToScreenReader) {
        ztAnnounceToScreenReader('已进入阅读模式', 'polite');
      }
    },

    disable: function() {
      const article = this.findArticle();
      if (!article || !this.isActive) return;

      // 恢复原始状态
      article.innerHTML = this.originalState.html;
      article.className = this.originalState.className;

      // 移除控制栏
      const controls = document.querySelector('.zt-reading-mode-controls');
      if (controls) controls.remove();

      this.isActive = false;

      if (window.ztAnnounceToScreenReader) {
        ztAnnounceToScreenReader('已退出阅读模式', 'polite');
      }
    },

    toggle: function() {
      if (this.isActive) {
        this.disable();
      } else {
        this.enable();
      }
    },

    createControls: function(article) {
      const controls = document.createElement('div');
      controls.className = 'zt-reading-mode-controls';
      controls.innerHTML = `
        <div class="zt-controls-group">
          <label>主题</label>
          <div class="zt-theme-buttons">
            <button data-theme="light" title="明亮">☀️</button>
            <button data-theme="dark" title="深色">🌙</button>
            <button data-theme="sepia" title="护眼">📖</button>
            <button data-theme="night" title="夜间">🌃</button>
          </div>
        </div>
        <div class="zt-controls-group">
          <label>字号</label>
          <div class="zt-font-buttons">
            <button data-action="font-down" title="减小">A-</button>
            <span class="zt-font-current">${this.currentFontSize}</span>
            <button data-action="font-up" title="增大">A+</button>
          </div>
        </div>
        <div class="zt-controls-group">
          <label>宽度</label>
          <div class="zt-width-buttons">
            <button data-width="narrow" title="窄">◀▶</button>
            <button data-width="medium" title="中">◀▶</button>
            <button data-width="wide" title="宽">◀▶</button>
            <button data-width="full" title="全">◀▶</button>
          </div>
        </div>
        <button class="zt-controls-close" title="退出阅读模式">×</button>
      `;

      article.insertBefore(controls, article.firstChild);
      this.attachControlEvents(controls);
    },

    attachControlEvents: function(controls) {
      // 主题切换
      controls.querySelectorAll('[data-theme]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setTheme(btn.getAttribute('data-theme'));
        });
      });

      // 字号调整
      controls.querySelector('[data-action="font-up"]').addEventListener('click', () => {
        this.adjustFontSize(1);
      });

      controls.querySelector('[data-action="font-down"]').addEventListener('click', () => {
        this.adjustFontSize(-1);
      });

      // 宽度调整
      controls.querySelectorAll('[data-width]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setWidth(btn.getAttribute('data-width'));
        });
      });

      // 关闭按钮
      controls.querySelector('.zt-controls-close').addEventListener('click', () => {
        this.disable();
      });
    },

    setTheme: function(theme) {
      this.currentTheme = theme;
      const container = document.querySelector('.zt-reading-mode-container');
      const colors = ReadingModeConfig.colors[theme];

      if (container) {
        container.style.background = colors.bg;
        container.style.color = colors.text;
      }

      // 更新链接颜色
      container.querySelectorAll('a').forEach(link => {
        link.style.color = colors.link;
      });
    },

    adjustFontSize: function(delta) {
      const sizes = ReadingModeConfig.fonts;
      const currentIndex = sizes.indexOf(this.currentFontSize);
      const newIndex = Math.max(0, Math.min(sizes.length - 1, currentIndex + delta));

      if (newIndex !== currentIndex) {
        this.currentFontSize = sizes[newIndex];
        this.applyFontSize();
      }
    },

    applyFontSize: function() {
      const container = document.querySelector('.zt-reading-mode-container');
      if (container) {
        container.style.fontSize = `${this.currentFontSize}px`;
      }

      const currentDisplay = document.querySelector('.zt-font-current');
      if (currentDisplay) {
        currentDisplay.textContent = this.currentFontSize;
      }
    },

    setWidth: function(width) {
      this.currentWidth = width;
      const container = document.querySelector('.zt-reading-mode-container');
      if (container) {
        container.style.maxWidth = this.getWidthValue();
      }
    },

    getWidthValue: function() {
      const widths = {
        narrow: '680px',
        medium: '800px',
        wide: '1000px',
        full: '100%'
      };
      return widths[this.currentWidth] || widths.medium;
    }
  };

  // 导出 API
  ZootopiaCore.readingMode = ReadingMode;
  ZootopiaCore.readingModeConfig = ReadingModeConfig;

  // 全局 API
  window.ztEnableReadingMode = () => ReadingMode.enable();
  window.ztDisableReadingMode = () => ReadingMode.disable();
  window.ztToggleReadingMode = () => ReadingMode.toggle();
  window.ztIsReadingMode = () => ReadingMode.isActive;
  window.ztSetReadingTheme = (theme) => ReadingMode.setTheme(theme);
  window.ztSetReadingFont = (size) => {
    ReadingMode.currentFontSize = size;
    ReadingMode.applyFontSize();
  };

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    ReadingMode.init();
  });

})();
