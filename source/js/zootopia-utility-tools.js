/**
 * 疯狂动物城实用工具集
 * Zootopia Utility Tools
 *
 * 提供各种实用工具功能
 */

(function() {
  'use strict';

  /**
   * 密码生成器
   */
  const PasswordGenerator = {
    generate: function(length = 16, options = {}) {
      const defaults = {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false,
        excludeSimilar: true
      };

      const config = { ...defaults, ...options };

      let chars = '';
      if (config.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (config.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (config.numbers) chars += '0123456789';
      if (config.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

      if (config.excludeSimilar) {
        chars = chars.replace(/[il1Lo0O]/g, '');
      }

      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return password;
    },

    generatePassphrase: function(wordCount = 4) {
      const words = ['疯狂', '动物', '城', '朱迪', '尼克', '闪电', '树懒', '警官', '案件', '调查'];
      let passphrase = '';

      for (let i = 0; i < wordCount; i++) {
        passphrase += words[Math.floor(Math.random() * words.length)];
        if (i < wordCount - 1) passphrase += '-';
      }

      return passphrase + Math.floor(Math.random() * 100);
    }
  };

  /**
   * 二维码生成器
   */
  const QRCodeGenerator = {
    generate: function(text, options = {}) {
      const defaults = {
        size: 200,
        margin: 10,
        color: '#000000',
        backgroundColor: '#ffffff'
      };

      const config = { ...defaults, ...options };

      // 使用公共API生成二维码
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${config.size}&data=${encodeURIComponent(text)}`;
      return apiUrl;
    },

    createQRImage: function(container, text, options = {}) {
      const img = document.createElement('img');
      img.src = this.generate(text, options);
      img.alt = 'QR Code';

      if (container) {
        container.innerHTML = '';
        container.appendChild(img);
      }

      return img;
    }
  };

  /**
   * 颜色选择器
   */
  const ColorPicker = {
    show: function(target, onColorSelect) {
      const picker = document.createElement('div');
      picker.className = 'zt-color-picker-modal';
      picker.innerHTML = `
        <div class="zt-color-picker-content">
          <div class="zt-color-picker-header">
            <h3>选择颜色</h3>
            <button class="zt-color-picker-close" aria-label="关闭">×</button>
          </div>
          <div class="zt-color-picker-body">
            <div class="zt-color-presets">
              ${this.renderColorPresets()}
            </div>
            <div class="zt-color-picker-input">
              <label>自定义颜色</label>
              <input type="color" id="zt-custom-color" value="#FF9F43">
            </div>
            <div class="zt-color-preview" style="background: #FF9F43;"></div>
          </div>
        </div>
      `;

      document.body.appendChild(picker);

      // 事件
      const closeBtn = picker.querySelector('.zt-color-picker-close');
      closeBtn.addEventListener('click', () => {
        picker.remove();
      });

      picker.addEventListener('click', (e) => {
        if (e.target === picker) {
          picker.remove();
        }
      });

      // 预设颜色点击
      picker.querySelectorAll('.zt-color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
          const color = preset.dataset.color;
          picker.querySelector('.zt-color-preview').style.background = color;

          if (onColorSelect) {
            onColorSelect(color);
          }

          picker.remove();
        });
      });

      // 自定义颜色
      const input = picker.querySelector('#zt-custom-color');
      input.addEventListener('input', () => {
        picker.querySelector('.zt-color-preview').style.background = input.value;
      });
    },

    renderColorPresets: function() {
      const presets = [
        { name: '金橙', color: '#FF9F43' },
        { name: '冰蓝', color: '#0ABDE3' },
        { name: '翠绿', color: '#10AC84' },
        { name: '勇敢橙', color: '#EE5A24' },
        { name: '智慧紫', color: '#5F27CD' },
        { name: '树懒黄', color: '#F8B739' },
        { name: '黑色', color: '#2D3436' },
        { name: '白色', color: '#FFFFFF' }
      ];

      return presets.map(preset => `
        <div class="zt-color-preset" data-color="${preset.color}" title="${preset.name}">
          <div class="zt-color-preset-swatch" style="background: ${preset.color}"></div>
          <span class="zt-color-preset-name">${preset.name}</span>
        </div>
      `).join('');
    }
  };

  /**
   * Markdown编辑器增强
   */
  const MarkdownEditor = {
    enhance: function(textarea) {
      if (!textarea) return;

      // 添加工具栏
      const toolbar = document.createElement('div');
      toolbar.className = 'zt-markdown-toolbar';
      toolbar.innerHTML = `
        <div class="zt-toolbar-group">
          <button data-action="bold" title="粗体"><b>B</b></button>
          <button data-action="italic" title="斜体"><i>I</i></button>
          <button data-action="strike" title="删除线"><s>S</s></button>
          <button data-action="code" title="代码"><>&lt;/&gt;</button>
        </div>
        <div class="zt-toolbar-group">
          <button data-action="h1" title="标题1">H1</button>
          <button data-action="h2" title="标题2">H2</button>
          <button data-action="h3" title="标题3">H3</button>
        </div>
        <div class="zt-toolbar-group">
          <button data-action="ul" title="无序列表">• 列表</button>
          <button data-action="ol" title="有序列表">1. 列表</button>
          <button data-action="quote" title="引用">></button>
          <button data-action="link" title="链接">🔗</button>
        </div>
        <div class="zt-toolbar-group">
          <button data-action="preview" title="预览">👁️</button>
          <button data-action="fullscreen" title="全屏">⛶</button>
        </div>
      `;

      textarea.parentNode.insertBefore(toolbar, textarea);

      // 附加事件
      toolbar.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.handleAction(btn.dataset.action, textarea);
        });
      });
    },

    handleAction: function(action, textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const actions = {
        bold: () => this.wrapText(textarea, '**', start, end),
        italic: () => this.wrapText(textarea, '*', start, end),
        strike: () => this.wrapText(textarea, '~~', start, end),
        code: () => this.wrapText(textarea, '`', start, end),
        h1: () => this.insertAtStart(textarea, '# '),
        h2: () => this.insertAtStart(textarea, '## '),
        h3: () => this.insertAtStart(textarea, '### '),
        ul: () => this.insertAtCursor(textarea, '- '),
        ol: () => this.insertAtCursor(textarea, '1. '),
        quote: () => this.wrapText(textarea, '> ', start, end),
        link: () => this.wrapText(textarea, '[', '](url)', start, end),
        preview: () => this.previewMarkdown(textarea),
        fullscreen: () => this.toggleFullscreen(textarea)
      };

      if (actions[action]) {
        actions[action]();
      }
    },

    wrapText: function(textarea, before, after, start, end) {
      const text = textarea.value.substring(start, end);
      const replacement = before + text + after;

      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + text.length;
      textarea.focus();

      // 触发input事件
      textarea.dispatchEvent(new Event('input'));
    },

    insertAtStart: function(textarea, text) {
      textarea.value = text + textarea.value;
      textarea.selectionStart = textarea.selectionEnd = text.length;
      textarea.focus();
    },

    insertAtCursor: function(textarea, text) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    },

    previewMarkdown: function(textarea) {
      // 创建预览窗口
      const preview = document.createElement('div');
      preview.className = 'zt-markdown-preview';
      preview.innerHTML = `
        <div class="zt-preview-header">
          <h3>Markdown 预览</h3>
          <button class="zt-preview-close" aria-label="关闭">×</button>
        </div>
        <div class="zt-preview-content">
          ${this.parseMarkdown(textarea.value)}
        </div>
      `;

      document.body.appendChild(preview);

      // 关闭事件
      preview.querySelector('.zt-preview-close').addEventListener('click', () => {
        preview.remove();
      });
    },

    parseMarkdown: function(markdown) {
      // 简单的Markdown解析
      return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/~~(.+?)~~/g, '<del>$1</del>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!$)/gm, '<p>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    },

    toggleFullscreen: function(textarea) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        textarea.requestFullscreen();
      }
    }
  };

  // 导出 API
  ZootopiaCore.passwordGenerator = PasswordGenerator;
  ZootopiaCore.qrCodeGenerator = QRCodeGenerator;
  ZootopiaCore.colorPicker = ColorPicker;
  ZootopiaCore.markdownEditor = MarkdownEditor;

  // 全局 API
  window.ztGeneratePassword = (length, options) => PasswordGenerator.generate(length, options);
  window.ztGeneratePassphrase = (wordCount) => PasswordGenerator.generatePassphrase(wordCount);
  window.ztGenerateQRCode = (text, options) => QRCodeGenerator.generate(text, options);
  window.ztShowColorPicker = (target, onColorSelect) => ColorPicker.show(target, onColorSelect);
  window.ztEnhanceMarkdownEditor = (textarea) => MarkdownEditor.enhance(textarea);

  // 自动初始化Markdown编辑器
  ZootopiaCore.dom.then(() => {
    // 查找markdown文本框
    const textarea = document.querySelector('textarea[name="markdown"]');
    if (textarea) {
      MarkdownEditor.enhance(textarea);
    }
  });

})();
