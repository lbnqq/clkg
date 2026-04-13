/**
 * 疯狂动物城统一配置管理面板
 * Zootopia Settings Panel - 可视化配置管理界面
 */

(function() {
  'use strict';

  // ==================== 配置定义 ====================
  const SettingsConfig = {
    categories: [
      {
        id: 'general',
        name: '通用设置',
        icon: '⚙️',
        items: [
          { key: 'theme', type: 'select', label: '主题', options: ['auto', 'light', 'dark'] },
          { key: 'language', type: 'select', label: '语言', options: ['zh-CN', 'en'] },
          { key: 'animations', type: 'toggle', label: '启用动画' },
          { key: 'sounds', type: 'toggle', label: '启用音效' }
        ]
      },
      {
        id: 'performance',
        name: '性能设置',
        icon: '⚡',
        items: [
          { key: 'lazyLoad', type: 'toggle', label: '懒加载图片' },
          { key: 'preload', type: 'toggle', label: '智能预加载' },
          { key: 'maxConcurrentAnimations', type: 'range', label: '最大并发动画', min: 1, max: 5 },
          { key: 'reducedMotion', type: 'toggle', label: '减少动画' }
        ]
      },
      {
        id: 'privacy',
        name: '隐私设置',
        icon: '🔒',
        items: [
          { key: 'analytics', type: 'toggle', label: '启用分析' },
          { key: 'trackVisits', type: 'toggle', label: '访问追踪' },
          { key: 'saveHistory', type: 'toggle', label: '保存历史' },
          { key: 'dataSync', type: 'toggle', label: '数据同步' }
        ]
      },
      {
        id: 'notifications',
        name: '通知设置',
        icon: '🔔',
        items: [
          { key: 'enableNotifications', type: 'toggle', label: '启用通知' },
          { key: 'notificationPosition', type: 'select', label: '通知位置', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] },
          { key: 'notificationDuration', type: 'range', label: '通知时长', min: 2000, max: 10000, step: 1000 },
          { key: 'notificationSound', type: 'toggle', label: '通知声音' }
        ]
      },
      {
        id: 'accessibility',
        name: '辅助功能',
        icon: '♿',
        items: [
          { key: 'fontSize', type: 'range', label: '字体大小', min: 12, max: 20, step: 1 },
          { key: 'highContrast', type: 'toggle', label: '高对比度' },
          { key: 'screenReader', type: 'toggle', label: '屏幕阅读器优化' },
          { key: 'focusVisible', type: 'toggle', label: '焦点可见' }
        ]
      }
    ],

    // 默认值
    defaults: {
      theme: 'auto',
      language: 'zh-CN',
      animations: true,
      sounds: false,
      lazyLoad: true,
      preload: true,
      maxConcurrentAnimations: 3,
      reducedMotion: false,
      analytics: false,
      trackVisits: true,
      saveHistory: true,
      dataSync: false,
      enableNotifications: true,
      notificationPosition: 'top-right',
      notificationDuration: 3000,
      notificationSound: false,
      fontSize: 16,
      highContrast: false,
      screenReader: false,
      focusVisible: true
    }
  };

  // ==================== 设置面板 UI ====================
  const SettingsPanel = {
    element: null,
    isOpen: false,

    init: function() {
      this.createPanel();
      this.bindEvents();
      this.loadSettings();
    },

    createPanel: function() {
      const panel = document.createElement('div');
      panel.className = 'zt-settings-panel';
      panel.innerHTML = `
        <div class="zt-settings-overlay"></div>
        <div class="zt-settings-container">
          <div class="zt-settings-header">
            <h2>⚙️ 设置</h2>
            <button class="zt-settings-close" aria-label="关闭">×</button>
          </div>
          <div class="zt-settings-content">
            <div class="zt-settings-nav"></div>
            <div class="zt-settings-main"></div>
          </div>
          <div class="zt-settings-footer">
            <button class="zt-settings-reset">恢复默认</button>
            <button class="zt-settings-save">保存设置</button>
          </div>
        </div>
      `;

      // 添加样式
      this.addStyles();

      document.body.appendChild(panel);
      this.element = panel;

      // 创建分类和设置项
      this.renderCategories();
    },

    addStyles: function() {
      if (document.querySelector('#zt-settings-styles')) return;

      const style = document.createElement('style');
      style.id = 'zt-settings-styles';
      style.textContent = `
        .zt-settings-panel {
          display: none;
          opacity: 0;
          transition: opacity 300ms ease-out;
        }

        .zt-settings-panel.zt-open {
          display: block;
          opacity: 1;
        }

        .zt-settings-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          z-index: 10000;
        }

        .zt-settings-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          background: var(--zt-surface, #1a1a2e);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          z-index: 10001;
          overflow: hidden;
        }

        .zt-settings-header {
          padding: 20px;
          border-bottom: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .zt-settings-header h2 {
          margin: 0;
          font-size: 20px;
          color: var(--zt-text, #ffffff);
        }

        .zt-settings-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: var(--zt-text, #ffffff);
          font-size: 24px;
          cursor: pointer;
          transition: all 150ms ease-out;
        }

        .zt-settings-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .zt-settings-content {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .zt-settings-nav {
          width: 200px;
          background: rgba(0, 0, 0, 0.2);
          border-right: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
          padding: 10px 0;
          overflow-y: auto;
        }

        .zt-settings-main {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .zt-settings-category {
          padding: 10px 15px;
          margin: 5px 0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 150ms ease-out;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
        }

        .zt-settings-category:hover,
        .zt-settings-category.zt-active {
          background: rgba(255, 255, 255, 0.05);
          color: var(--zt-text, #ffffff);
        }

        .zt-settings-category.zt-active {
          background: rgba(255, 159, 67, 0.2);
          color: #FF9F43;
        }

        .zt-settings-category-icon {
          font-size: 20px;
        }

        .zt-settings-category-name {
          flex: 1;
        }

        .zt-settings-section {
          display: none;
        }

        .zt-settings-section.zt-active {
          display: block;
        }

        .zt-settings-section-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .zt-setting-item {
          margin-bottom: 24px;
        }

        .zt-setting-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .zt-setting-name {
          font-weight: 500;
          color: var(--zt-text, #ffffff);
        }

        .zt-setting-description {
          font-size: 12px;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
        }

        .zt-setting-control {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* 开关控件 */
        .zt-toggle {
          position: relative;
          width: 48px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: background 200ms ease-out;
        }

        .zt-toggle::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 200ms ease-out;
        }

        .zt-toggle.zt-active {
          background: #FF9F43;
        }

        .zt-toggle.zt-active::after {
          transform: translateX(24px);
        }

        /* 选择器 */
        .zt-select {
          padding: 8px 32px 8px 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--zt-border, rgba(255, 255, 255, 0.2));
          border-radius: 8px;
          color: var(--zt-text, #ffffff);
          font-size: 14px;
          cursor: pointer;
        }

        /* 滑块 */
        .zt-range {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          outline: none;
          -webkit-appearance: none;
        }

        .zt-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: #FF9F43;
          border-radius: 50%;
          cursor: pointer;
        }

        .zt-range-value {
          min-width: 40px;
          text-align: right;
          font-size: 12px;
          color: var(--zt-primary, #FF9F43);
        }

        .zt-settings-footer {
          padding: 20px;
          border-top: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .zt-settings-btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 150ms ease-out;
        }

        .zt-settings-reset {
          background: rgba(255, 255, 255, 0.1);
          color: var(--zt-text, #ffffff);
        }

        .zt-settings-reset:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .zt-settings-save {
          background: linear-gradient(135deg, #FF9F43, #EE5A24);
          color: white;
        }

        .zt-settings-save:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .zt-settings-container {
            width: 95%;
            max-height: 90vh;
          }

          .zt-settings-content {
            flex-direction: column;
          }

          .zt-settings-nav {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
          }

          .zt-settings-main {
            padding: 15px;
          }
        }
      `;

      document.head.appendChild(style);
    },

    renderCategories: function() {
      const nav = this.element.querySelector('.zt-settings-nav');
      const main = this.element.querySelector('.zt-settings-main');

      SettingsConfig.categories.forEach((category, index) => {
        // 渲染导航
        const navItem = document.createElement('div');
        navItem.className = `zt-settings-category ${index === 0 ? 'zt-active' : ''}`;
        navItem.innerHTML = `
          <span class="zt-settings-category-icon">${category.icon}</span>
          <span class="zt-settings-category-name">${category.name}</span>
        `;
        nav.addEventListener('click', () => this.switchCategory(index));
        nav.appendChild(navItem);

        // 渲染设置项
        const section = document.createElement('div');
        section.className = `zt-settings-section ${index === 0 ? 'zt-active' : ''}`;
        section.innerHTML = `
          <div class="zt-settings-section-title">${category.name}</div>
        `;

        category.items.forEach(item => {
          const settingItem = this.createSettingItem(item);
          section.appendChild(settingItem);
        });

        main.appendChild(section);
      });
    },

    createSettingItem: function(item) {
      const container = document.createElement('div');
      container.className = 'zt-setting-item';

      let controlHTML = '';

      switch (item.type) {
        case 'toggle':
          controlHTML = `<div class="zt-toggle" data-zt-setting="${item.key}"></div>`;
          break;

        case 'select':
          controlHTML = `
            <select class="zt-select" data-zt-setting="${item.key}">
              ${item.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          `;
          break;

        case 'range':
          controlHTML = `
            <input type="range" class="zt-range" data-zt-setting="${item.key}"
              min="${item.min}" max="${item.max}" step="${item.step || 1}">
            <span class="zt-range-value"></span>
          `;
          break;
      }

      container.innerHTML = `
        <div class="zt-setting-label">
          <span class="zt-setting-name">${item.label}</span>
        </div>
        <div class="zt-setting-control">
          ${controlHTML}
        </div>
      `;

      return container;
    },

    switchCategory: function(index) {
      const categories = this.element.querySelectorAll('.zt-settings-category');
      const sections = this.element.querySelectorAll('.zt-settings-section');

      categories.forEach((cat, i) => {
        cat.classList.toggle('zt-active', i === index);
        sections[i].classList.toggle('zt-active', i === index);
      });
    },

    bindEvents: function() {
      // 关闭按钮
      this.element.querySelector('.zt-settings-close').addEventListener('click', () => {
        this.close();
      });

      // 点击遮罩关闭
      this.element.querySelector('.zt-settings-overlay').addEventListener('click', () => {
        this.close();
      });

      // 快捷键 ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          e.preventDefault();
          this.close();
        }
      });

      // 设置项变化
      this.element.addEventListener('change', (e) => {
        const target = e.target.closest('[data-zt-setting]');
        if (target) {
          this.handleSettingChange(target);
        }
      });

      // 滑块值显示
      this.element.addEventListener('input', (e) => {
        if (e.target.classList.contains('zt-range')) {
          const valueSpan = e.target.parentElement.querySelector('.zt-range-value');
          if (valueSpan) {
            valueSpan.textContent = e.target.value;
          }
        }
      });

      // 恢复默认
      this.element.querySelector('.zt-settings-reset').addEventListener('click', () => {
        this.resetToDefaults();
      });

      // 保存设置
      this.element.querySelector('.zt-settings-save').addEventListener('click', () => {
        this.saveSettings();
      });
    },

    handleSettingChange: function(element) {
      const key = element.dataset.ztSetting;
      const value = element.type === 'checkbox'
        ? element.classList.contains('zt-active')
        : element.value;

      // 即时应用某些设置
      this.applySetting(key, value);
    },

    applySetting: function(key, value) {
      switch (key) {
        case 'theme':
          if (window.ztSetTheme) {
            ztSetTheme(value);
          }
          break;

        case 'animations':
          ZootopiaCore.config.animation.enabled = value;
          break;

        case 'reducedMotion':
          if (value) {
            document.documentElement.classList.add('zt-reduced-motion');
          } else {
            document.documentElement.classList.remove('zt-reduced-motion');
          }
          break;

        case 'fontSize':
          document.documentElement.style.fontSize = value + 'px';
          break;

        case 'highContrast':
          if (value) {
            document.documentElement.classList.add('zt-high-contrast');
          } else {
            document.documentElement.classList.remove('zt-high-contrast');
          }
          break;
      }
    },

    loadSettings: function() {
      const settings = ztLoad('settings', SettingsConfig.defaults);

      Object.entries(settings).forEach(([key, value]) => {
        const element = this.element.querySelector(`[data-zt-setting="${key}"]`);
        if (!element) return;

        // 更新控件状态
        if (element.type === 'checkbox' || element.classList.contains('zt-toggle')) {
          element.classList.toggle('zt-active', value);
        } else {
          element.value = value;
        }

        // 更新显示值
        if (element.classList.contains('zt-range')) {
          const valueSpan = element.parentElement.querySelector('.zt-range-value');
          if (valueSpan) {
            valueSpan.textContent = value;
          }
        }

        // 应用设置
        this.applySetting(key, value);
      });
    },

    resetToDefaults: function() {
      if (confirm('确定要恢复默认设置吗？')) {
        Object.entries(SettingsConfig.defaults).forEach(([key, value]) => {
          this.saveSetting(key, value);
          this.applySetting(key, value);
        });

        ztNotifySuccess('设置已恢复默认');
        this.loadSettings();
      }
    },

    saveSettings: function() {
      const settings = {};

      this.element.querySelectorAll('[data-zt-setting]').forEach(element => {
        const key = element.dataset.ztSetting;
        let value;

        if (element.classList.contains('zt-toggle')) {
          value = element.classList.contains('zt-active');
        } else {
          value = element.value;
        }

        // 类型转换
        const setting = this.findSetting(key);
        if (setting) {
          if (setting.type === 'range') {
            value = parseFloat(value);
          } else if (setting.type === 'toggle') {
            value = value === true || value === 'true';
          }
        }

        settings[key] = value;
      });

      ztSave('settings', settings);
      ztNotifySuccess('设置已保存');
      this.close();
    },

    findSetting: function(key) {
      for (const category of SettingsConfig.categories) {
        const setting = category.items.find(item => item.key === key);
        if (setting) return setting;
      }
      return null;
    },

    saveSetting: function(key, value) {
      const element = this.element.querySelector(`[data-zt-setting="${key}"]`);
      if (!element) return;

      if (element.classList.contains('zt-toggle')) {
        element.classList.toggle('zt-active', value);
      } else {
        element.value = value;
      }
    },

    open: function() {
      this.isOpen = true;
      this.element.classList.add('zt-open');
    },

    close: function() {
      this.isOpen = false;
      this.element.classList.remove('zt-open');
    },

    toggle: function() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.settings = SettingsPanel;
  ZootopiaCore.settingsConfig = SettingsConfig;

  // ==================== 全局 API ====================
  window.ztOpenSettings = () => SettingsPanel.open();
  window.ztCloseSettings = () => SettingsPanel.close();
  window.ztToggleSettings = () => SettingsPanel.toggle();

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    SettingsPanel.init();
    console.log('⚙️ 配置管理面板已就绪');
  });

  // ==================== 设置按钮 ====================
  ZootopiaCore.dom.then(() => {
    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'zt-settings-trigger';
    settingsBtn.innerHTML = '⚙️';
    settingsBtn.setAttribute('aria-label', '设置');
    settingsBtn.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(26, 26, 46, 0.9);
      border: 2px solid rgba(255, 159, 67, 0.3);
      color: #FF9F43;
      font-size: 18px;
      cursor: pointer;
      z-index: 100;
      transition: all 200ms ease-out;
      backdrop-filter: blur(10px);
    `;

    settingsBtn.addEventListener('mouseenter', () => {
      settingsBtn.style.transform = 'scale(1.05)';
      settingsBtn.style.borderColor = '#FF9F43';
    });

    settingsBtn.addEventListener('mouseleave', () => {
      settingsBtn.style.transform = 'scale(1)';
      settingsBtn.style.borderColor = 'rgba(255, 159, 67, 0.3)';
    });

    settingsBtn.addEventListener('click', () => SettingsPanel.open());

    document.body.appendChild(settingsBtn);
  });

})();
