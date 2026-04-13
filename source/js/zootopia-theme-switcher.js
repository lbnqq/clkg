/**
 * 疯狂动物城主题切换系统
 * Zootopia Theme Switcher - 明暗主题切换、自动检测、自定义颜色
 */

(function() {
  'use strict';

  // ==================== 主题配置 ====================
  const ThemeConfig = {
    // 主题定义
    themes: {
      light: {
        name: '明亮',
        icon: '☀️',
        colors: {
          background: '#ffffff',
          surface: '#f8f9fa',
          text: '#1a1a2e',
          textSecondary: '#666666',
          primary: '#FF9F43',
          secondary: '#0ABDE3',
          accent: '#10AC84',
          border: 'rgba(0, 0, 0, 0.1)',
          shadow: 'rgba(0, 0, 0, 0.1)'
        }
      },
      dark: {
        name: '暗黑',
        icon: '🌙',
        colors: {
          background: '#1a1a2e',
          surface: '#16213e',
          text: '#ffffff',
          textSecondary: 'rgba(255, 255, 255, 0.6)',
          primary: '#FF9F43',
          secondary: '#0ABDE3',
          accent: '#10AC84',
          border: 'rgba(255, 255, 255, 0.1)',
          shadow: 'rgba(0, 0, 0, 0.3)'
        }
      },
      auto: {
        name: '自动',
        icon: '🌗',
        detect: () => {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
      }
    },

    // 存储配置
    storage: {
      key: 'zt_theme',
      currentKey: 'zt_current_theme'
    },

    // 过渡效果
    transition: {
      enabled: true,
      duration: 300
    }
  };

  // ==================== 主题管理器 ====================
  const ThemeManager = {
    currentTheme: null,
    systemTheme: 'light',
    toggleElement: null,

    init: function() {
      this.loadTheme();
      this.createToggle();
      this.bindEvents();
      this.applyTheme(this.currentTheme);
    },

    // 加载保存的主题
    loadTheme: function() {
      try {
        const saved = localStorage.getItem(ThemeConfig.storage.currentKey);
        this.currentTheme = saved || 'auto';
      } catch (e) {
        this.currentTheme = 'auto';
      }
    },

    // 保存主题
    saveTheme: function(theme) {
      try {
        localStorage.setItem(ThemeConfig.storage.currentKey, theme);
      } catch (e) {
        console.warn('无法保存主题设置:', e);
      }
    },

    // 获取当前应用的主题
    getAppliedTheme: function() {
      if (this.currentTheme === 'auto') {
        return ThemeConfig.themes.auto.detect();
      }
      return this.currentTheme;
    },

    // 应用主题
    applyTheme: function(themeName, transition = true) {
      const actualTheme = themeName === 'auto'
        ? ThemeConfig.themes.auto.detect()
        : themeName;

      const theme = ThemeConfig.themes[actualTheme];
      if (!theme) return;

      // 添加过渡类
      if (transition && ThemeConfig.transition.enabled) {
        document.documentElement.classList.add('zt-theme-transitioning');
      }

      // 应用 CSS 变量
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--zt-${key}`, value);
      });

      // 设置主题类
      document.documentElement.classList.remove('zt-theme-light', 'zt-theme-dark');
      document.documentElement.classList.add(`zt-theme-${actualTheme}`);

      // 设置主题属性
      document.documentElement.setAttribute('data-theme', actualTheme);

      // 更新切换按钮
      this.updateToggle();

      // 移除过渡类
      if (transition && ThemeConfig.transition.enabled) {
        setTimeout(() => {
          document.documentElement.classList.remove('zt-theme-transitioning');
        }, ThemeConfig.transition.duration);
      }

      // 保存主题
      this.saveTheme(themeName);

      // 触发主题变更事件
      this.dispatchThemeChange(actualTheme);
    },

    // 切换主题
    toggle: function() {
      const themes = ['light', 'dark', 'auto'];
      const currentIndex = themes.indexOf(this.currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const nextTheme = themes[nextIndex];

      this.currentTheme = nextTheme;
      this.applyTheme(nextTheme);
    },

    // 设置特定主题
    setTheme: function(themeName) {
      if (ThemeConfig.themes[themeName]) {
        this.currentTheme = themeName;
        this.applyTheme(themeName);
      }
    },

    // 创建切换按钮
    createToggle: function() {
      const button = document.createElement('button');
      button.className = 'zt-theme-toggle';
      button.setAttribute('aria-label', '切换主题');
      button.innerHTML = `
        <span class="zt-theme-icon"></span>
      `;

      // 添加样式
      this.addStyles();

      document.body.appendChild(button);
      this.toggleElement = button;

      // 绑定点击事件
      button.addEventListener('click', () => {
        this.toggle();
      });
    },

    addStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        /* ==================== 主题切换按钮 ==================== */
        .zt-theme-toggle {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--zt-surface, #1a1a2e);
          border: 2px solid var(--zt-primary, #FF9F43);
          color: var(--zt-primary, #FF9F43);
          cursor: pointer;
          z-index: 997;
          transition: all 200ms ease-out;
          box-shadow: 0 4px 12px var(--zt-shadow, rgba(0, 0, 0, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .zt-theme-toggle:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 6px 20px var(--zt-shadow, rgba(0, 0, 0, 0.2));
        }

        .zt-theme-toggle:active {
          transform: scale(0.95) rotate(-5deg);
        }

        .zt-theme-icon {
          font-size: 24px;
          line-height: 1;
          transition: content 300ms ease-out;
        }

        /* ==================== 主题过渡 ==================== */
        .zt-theme-transitioning,
        .zt-theme-transitioning * {
          transition: background-color ${ThemeConfig.transition.duration}ms ease-out,
                      color ${ThemeConfig.transition.duration}ms ease-out,
                      border-color ${ThemeConfig.transition.duration}ms ease-out,
                      box-shadow ${ThemeConfig.transition.duration}ms ease-out !important;
        }

        /* ==================== 亮色主题 ==================== */
        .zt-theme-light {
          color-scheme: light;
        }

        /* ==================== 暗色主题 ==================== */
        .zt-theme-dark {
          color-scheme: dark;
        }

        /* ==================== 响应式适配 ==================== */
        @media (max-width: 768px) {
          .zt-theme-toggle {
            bottom: 80px;
            right: 10px;
            width: 44px;
            height: 44px;
          }
        }

        /* ==================== 减少动画偏好 ==================== */
        @media (prefers-reduced-motion: reduce) {
          .zt-theme-toggle:hover {
            transform: scale(1.05);
          }

          .zt-theme-transitioning,
          .zt-theme-transitioning * {
            transition: none !important;
          }
        }
      `;

      document.head.appendChild(style);
    },

    // 更新切换按钮图标
    updateToggle: function() {
      if (!this.toggleElement) return;

      const iconEl = this.toggleElement.querySelector('.zt-theme-icon');
      const actualTheme = this.getAppliedTheme();
      const theme = ThemeConfig.themes[this.currentTheme];

      if (iconEl && theme) {
        iconEl.textContent = theme.icon;
      }
    },

    // 绑定事件
    bindEvents: function() {
      // 监听系统主题变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        this.systemTheme = e.matches ? 'dark' : 'light';

        // 如果当前是自动模式，重新应用主题
        if (this.currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });

      // 初始化系统主题
      this.systemTheme = mediaQuery.matches ? 'dark' : 'light';
    },

    // 触发主题变更事件
    dispatchThemeChange: function(themeName) {
      const event = new CustomEvent('themechange', {
        detail: { theme: themeName }
      });
      window.dispatchEvent(event);
    }
  };

  // ==================== 主题颜色 API ====================
  const ThemeColors = {
    // 获取当前颜色
    get: function(colorName) {
      const root = document.documentElement;
      const value = getComputedStyle(root)
        .getPropertyValue(`--zt-${colorName}`)
        .trim();
      return value || null;
    },

    // 设置颜色
    set: function(colorName, value) {
      const root = document.documentElement;
      root.style.setProperty(`--zt-${colorName}`, value);
    },

    // 重置颜色
    reset: function(colorName) {
      const root = document.documentElement;
      root.style.removeProperty(`--zt-${colorName}`);
    },

    // 获取所有颜色
    getAll: function() {
      const colors = {};
      const colorNames = [
        'background',
        'surface',
        'text',
        'textSecondary',
        'primary',
        'secondary',
        'accent',
        'border',
        'shadow'
      ];

      colorNames.forEach(name => {
        colors[name] = this.get(name);
      });

      return colors;
    }
  };

  // ==================== 自定义主题编辑器 ====================
  const ThemeEditor = {
    isOpen: false,
    element: null,

    init: function() {
      // 可以在这里添加主题编辑器的初始化代码
    },

    // 创建主题编辑器
    createEditor: function() {
      const editor = document.createElement('div');
      editor.className = 'zt-theme-editor';
      // 编辑器内容...
      return editor;
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.theme = {
    manager: ThemeManager,
    colors: ThemeColors,
    editor: ThemeEditor,
    config: ThemeConfig
  };

  // ==================== 全局 API ====================
  // 切换主题
  window.ztToggleTheme = () => ThemeManager.toggle();

  // 设置主题
  window.ztSetTheme = (theme) => ThemeManager.setTheme(theme);

  // 获取当前主题
  window.ztGetTheme = () => ThemeManager.getAppliedTheme();

  // 获取颜色
  window.ztGetColor = (name) => ThemeColors.get(name);

  // 设置颜色
  window.ztSetColor = (name, value) => ThemeColors.set(name, value);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    ThemeManager.init();
    console.log('🎨 主题切换系统已就绪');
  });

  // ==================== 预设主题 ====================
  // 预设主题颜色方案
  ZootopiaCore.themePresets = {
    // 默认
    default: {
      primary: '#FF9F43',
      secondary: '#0ABDE3',
      accent: '#10AC84'
    },

    // 撒哈拉广场
    sahara: {
      primary: '#FF9F43',
      secondary: '#FFC048',
      accent: '#EE5A24'
    },

    // 冰川镇
    tundratown: {
      primary: '#0ABDE3',
      secondary: '#48DBFB',
      accent: '#00D2D3'
    },

    // 雨林区
    rainforest: {
      primary: '#10AC84',
      secondary: '#1DD1A1',
      accent: '#00D2D3'
    },

    // 中心区
    downtown: {
      primary: '#5F27CD',
      secondary: '#341F97',
      accent: '#FF9F43'
    }
  };

  // 应用预设主题
  window.ztApplyPreset = (presetName) => {
    const preset = ZootopiaCore.themePresets[presetName];
    if (preset) {
      Object.entries(preset).forEach(([key, value]) => {
        ThemeColors.set(key, value);
      });
    }
  };

})();
