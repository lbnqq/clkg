/**
 * 疯狂动物城代码块增强系统
 * Zootopia Code Enhancement - 代码块交互增强
 */

(function() {
  'use strict';

  const CodeEnhancementConfig = {
    // 复制功能
    copy: {
      showIcon: true,
      icon: '📋',
      successText: '已复制!',
      successDuration: 2000,
      autoHide: true
    },

    // 行号
    lineNumbers: {
      show: true,
      startFrom: 1,
      style: 'outside'  // outside, inside
    },

    // 语言标签
    languageLabel: {
      show: true,
      position: 'top-left',  // top-left, top-right, bottom-left, bottom-right
      showIcon: true,
      uppercase: true
    },

    // 代码折叠
    folding: {
      enabled: true,
      maxHeight: 300,
      showMore: true
    },

    // 全屏
    fullscreen: {
      enabled: true,
      escapeToExit: true
    },

    // 搜索
    search: {
      enabled: true,
      highlightAll: true,
      caseSensitive: false
    }
  };

  const CodeBlockEnhancer = {
    init: function() {
      this.enhanceCodeBlocks();
      this.observeNewBlocks();
    },

    enhanceCodeBlocks: function() {
      const codeBlocks = document.querySelectorAll('pre code');
      codeBlocks.forEach(block => this.enhanceSingleBlock(block));
    },

    enhanceSingleBlock: function(codeElement) {
      const preElement = codeElement.parentElement;
      if (!preElement) return;

      // 创建包装器
      const wrapper = document.createElement('div');
      wrapper.className = 'zt-code-wrapper';
      preElement.parentNode.insertBefore(wrapper, preElement);
      wrapper.appendChild(preElement);

      // 检测语言
      const language = this.detectLanguage(codeElement);

      // 添加语言标签
      if (CodeEnhancementConfig.languageLabel.show) {
        this.addLanguageLabel(wrapper, language);
      }

      // 添加工具栏
      this.addToolbar(wrapper, codeElement, preElement);

      // 添加行号
      if (CodeEnhancementConfig.lineNumbers.show) {
        this.addLineNumbers(wrapper, codeElement);
      }

      // 添加复制功能
      this.addCopyButton(wrapper, codeElement);

      // 标记已增强
      wrapper.classList.add('zt-code-enhanced');
      codeElement.classList.add('zt-code-enhanced');
    },

    detectLanguage: function(codeElement) {
      // 从 class 获取语言
      const classes = codeElement.className.split(' ');
      for (const cls of classes) {
        if (cls.startsWith('language-')) {
          return cls.replace('language-', '');
        }
        if (cls.startsWith('hljs')) {
          return cls.replace('hljs ', '');
        }
      }

      // 尝试从父元素获取
      const pre = codeElement.parentElement;
      if (pre) {
        const preClasses = pre.className.split(' ');
        for (const cls of preClasses) {
          if (cls.startsWith('language-')) {
            return cls.replace('language-', '');
          }
        }
      }

      return 'code';
    },

    addLanguageLabel: function(wrapper, language) {
      const label = document.createElement('div');
      label.className = 'zt-code-language';

      const languageNames = {
        'javascript': 'JavaScript',
        'typescript': 'TypeScript',
        'python': 'Python',
        'java': 'Java',
        'cpp': 'C++',
        'c': 'C',
        'css': 'CSS',
        'html': 'HTML',
        'bash': 'Bash',
        'shell': 'Shell',
        'json': 'JSON',
        'xml': 'XML',
        'sql': 'SQL',
        'markdown': 'Markdown',
        'yaml': 'YAML'
      };

      const displayName = languageNames[language.toLowerCase()] || language;
      label.textContent = CodeEnhancementConfig.languageLabel.uppercase ?
        displayName.toUpperCase() : displayName;

      wrapper.appendChild(label);
    },

    addToolbar: function(wrapper, codeElement, preElement) {
      const toolbar = document.createElement('div');
      toolbar.className = 'zt-code-toolbar';
      toolbar.innerHTML = `
        <div class="zt-toolbar-left">
          ${CodeEnhancementConfig.folding.enabled ? `
            <button class="zt-code-fold" data-action="fold" title="折叠代码">
              <span>◀</span>
            </button>
          ` : ''}
          ${CodeEnhancementConfig.fullscreen.enabled ? `
            <button class="zt-code-fullscreen" data-action="fullscreen" title="全屏">
              <span>⛶</span>
            </button>
          ` : ''}
        </div>
        <div class="zt-toolbar-right">
          ${CodeEnhancementConfig.search.enabled ? `
            <button class="zt-code-search" data-action="search" title="搜索">
              <span>🔍</span>
            </button>
          ` : ''}
        </div>
      `;

      wrapper.appendChild(toolbar);
      this.attachToolbarEvents(toolbar, codeElement, preElement, wrapper);
    },

    attachToolbarEvents: function(toolbar, codeElement, preElement, wrapper) {
      // 折叠
      const foldBtn = toolbar.querySelector('[data-action="fold"]');
      if (foldBtn) {
        foldBtn.addEventListener('click', () => this.toggleFold(codeElement, preElement, foldBtn));
      }

      // 全屏
      const fullscreenBtn = toolbar.querySelector('[data-action="fullscreen"]');
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => this.toggleFullscreen(wrapper));
      }

      // 搜索
      const searchBtn = toolbar.querySelector('[data-action="search"]');
      if (searchBtn) {
        searchBtn.addEventListener('click', () => this.showSearch(wrapper, codeElement));
      }
    },

    addLineNumbers: function(wrapper, codeElement) {
      const lines = codeElement.textContent.split('\n');
      const lineNumbers = document.createElement('div');
      lineNumbers.className = 'zt-code-line-numbers';
      lineNumbers.setAttribute('aria-hidden', 'true');

      lineNumbers.innerHTML = lines.map((_, index) => {
        return `<span>${index + CodeEnhancementConfig.lineNumbers.startFrom}</span>`;
      }).join('');

      wrapper.insertBefore(lineNumbers, wrapper.firstChild);
    },

    addCopyButton: function(wrapper, codeElement) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'zt-code-copy';
      copyBtn.innerHTML = `<span>${CodeEnhancementConfig.copy.icon}</span>`;
      copyBtn.title = '复制代码';
      copyBtn.setAttribute('aria-label', '复制代码');

      copyBtn.addEventListener('click', () => {
        this.copyCode(codeElement, copyBtn);
      });

      const toolbar = wrapper.querySelector('.zt-toolbar-right');
      if (toolbar) {
        toolbar.insertBefore(copyBtn, toolbar.firstChild);
      }
    },

    copyCode: function(codeElement, button) {
      const code = codeElement.textContent;

      navigator.clipboard.writeText(code).then(() => {
        // 显示成功提示
        const originalHTML = button.innerHTML;

        button.innerHTML = `<span>✓</span>`;
        button.classList.add('zt-copy-success');

        if (window.ztAnnounceToScreenReader) {
          ztAnnounceToScreenReader('代码已复制到剪贴板', 'assertive');
        }

        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove('zt-copy-success');
        }, CodeEnhancementConfig.copy.successDuration);
      }).catch(err => {
        console.error('复制失败:', err);
        button.innerHTML = `<span>✗</span>`;
        setTimeout(() => {
          button.innerHTML = `<span>${CodeEnhancementConfig.copy.icon}</span>`;
        }, 2000);
      });
    },

    toggleFold: function(codeElement, preElement, button) {
      const isFolded = preElement.classList.contains('zt-code-folded');

      if (isFolded) {
        // 展开
        preElement.style.maxHeight = '';
        preElement.classList.remove('zt-code-folded');
        button.classList.remove('zt-fold-active');
      } else {
        // 折叠
        preElement.style.maxHeight = `${CodeEnhancementConfig.folding.maxHeight}px`;
        preElement.classList.add('zt-code-folded');
        button.classList.add('zt-fold-active');
      }
    },

    toggleFullscreen: function(wrapper) {
      const isFullscreen = wrapper.classList.contains('zt-code-fullscreen-active');

      if (isFullscreen) {
        // 退出全屏
        wrapper.classList.remove('zt-code-fullscreen-active');
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen();
        }
      } else {
        // 进入全屏
        wrapper.classList.add('zt-code-fullscreen-active');

        if (wrapper.requestFullscreen) {
          wrapper.requestFullscreen().catch(err => {
            console.log('全屏失败:', err);
            wrapper.classList.remove('zt-code-fullscreen-active');
          });
        }
      }

      // ESC 退出全屏
      if (CodeEnhancementConfig.fullscreen.escapeToExit) {
        const handleEscape = (e) => {
          if (e.key === 'Escape' && wrapper.classList.contains('zt-code-fullscreen-active')) {
            this.toggleFullscreen(wrapper);
          }
        };

        document.addEventListener('keydown', handleEscape, { once: true });
      }
    },

    showSearch: function(wrapper, codeElement) {
      const searchTerm = prompt('搜索代码:');
      if (!searchTerm) return;

      this.searchInCode(wrapper, codeElement, searchTerm);
    },

    searchInCode: function(wrapper, codeElement, searchTerm) {
      const code = codeElement.textContent;
      const regex = new RegExp(searchTerm, CodeEnhancementConfig.search.caseSensitive ? 'g' : 'gi');
      const matches = code.match(regex);

      if (!matches || matches.length === 0) {
        if (window.ztNotify) {
          ztNotify({
            type: 'info',
            message: '未找到匹配项',
            duration: 2000
          });
        }
        return;
      }

      // 清除旧的高亮
      this.clearHighlights(wrapper);

      // 高亮匹配项
      this.highlightMatches(wrapper, codeElement, searchTerm, CodeEnhancementConfig.search.caseSensitive);

      if (window.ztNotify) {
        ztNotify({
          type: 'success',
          message: `找到 ${matches.length} 个匹配项`,
          duration: 2000
        });
      }
    },

    highlightMatches: function(wrapper, codeElement, searchTerm, caseSensitive) {
      const code = codeElement.textContent;
      const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, caseSensitive ? 'g' : 'gi');

      // 保存原始 HTML
      if (!wrapper.dataset.originalHtml) {
        wrapper.dataset.originalHtml = codeElement.innerHTML;
      }

      const highlighted = code.replace(regex, '<mark class="zt-code-highlight">$1</mark>');
      codeElement.innerHTML = highlighted;
    },

    clearHighlights: function(wrapper) {
      const codeElement = wrapper.querySelector('code');
      if (!codeElement || !wrapper.dataset.originalHtml) return;

      codeElement.innerHTML = wrapper.dataset.originalHtml;
      delete wrapper.dataset.originalHtml;
    },

    escapeRegex: function(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    observeNewBlocks: function() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const codeBlocks = node.querySelectorAll('pre code:not(.zt-code-enhanced)');
              codeBlocks.forEach(block => this.enhanceSingleBlock(block));
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  };

  // 导出 API
  ZootopiaCore.codeEnhancer = CodeBlockEnhancer;
  ZootopiaCore.codeConfig = CodeEnhancementConfig;

  // 全局 API
  window.ztCopyCode = (blockId) => {
    const block = document.getElementById(blockId);
    if (block) {
      CodeBlockEnhancer.copyCode(block);
    }
  };

  window.ztToggleLineNumbers = (blockId) => {
    // 实现行号切换
  };

  window.ztFoldCode = (blockId) => {
    // 实现代码折叠
  };

  window.ztSearchInCode = (blockId, query) => {
    const wrapper = document.getElementById(blockId);
    if (wrapper) {
      const codeElement = wrapper.querySelector('code');
      CodeBlockEnhancer.searchInCode(wrapper, codeElement, query);
    }
  };

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    CodeBlockEnhancer.init();
  });

})();
