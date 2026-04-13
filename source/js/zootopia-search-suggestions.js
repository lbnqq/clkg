/**
 * 疯狂动物城智能搜索建议系统
 * Zootopia Smart Search Suggestions
 *
 * 提供实时搜索建议、自动补全、智能匹配
 */

(function() {
  'use strict';

  const SearchSuggestionsConfig = {
    // 建议显示
    maxSuggestions: 8,
    minQueryLength: 1,
    debounceTime: 150,

    // 匹配策略
    fuzzyMatch: true,
    matchThreshold: 0.6,
    highlightMatches: true,

    // 数据源
    searchIn: {
      title: true,
      content: true,
      tags: true,
      categories: true
    },

    // UI
    position: 'below', // below, above, overlay
    showIcons: true,
    showCategory: true,
    showDate: true,

    // 快捷键
    shortcuts: {
      navigateUp: 'ArrowUp',
      navigateDown: 'ArrowDown',
      select: 'Enter',
      close: 'Escape',
      focus: '/'
    }
  };

  /**
   * 搜索建议管理器
   */
  const SearchSuggestions = {
    searchInput: null,
    suggestionsBox: null,
    currentIndex: -1,
    suggestions: [],
    debounceTimer: null,

    /**
     * 初始化
     */
    init: function() {
      this.createSuggestionsBox();
      this.attachEvents();
      this.buildSearchIndex();
    },

    /**
     * 创建建议框
     */
    createSuggestionsBox: function() {
      // 查找搜索输入框
      this.searchInput = document.querySelector('#search-input input[type="search"]') ||
                        document.querySelector('.search-input') ||
                        document.querySelector('input[placeholder*="搜索"]');

      if (!this.searchInput) {
        console.warn('Search input not found');
        return;
      }

      // 创建建议框
      this.suggestionsBox = document.createElement('div');
      this.suggestionsBox.className = 'zt-search-suggestions';
      this.suggestionsBox.setAttribute('role', 'listbox');
      this.suggestionsBox.innerHTML = `
        <div class="zt-suggestions-header">
          <span class="zt-suggestions-title">搜索建议</span>
          <span class="zt-suggestions-shortcut">按 / 聚焦搜索</span>
        </div>
        <div class="zt-suggestions-list" role="list"></div>
        <div class="zt-suggestions-footer">
          <span class="zt-suggestions-hint">
            <kbd>↑</kbd><kbd>↓</kbd> 导航
            <kbd>Enter</kbd> 选择
            <kbd>Esc</kbd> 关闭
          </span>
        </div>
      `;

      // 插入到搜索框后面
      this.searchInput.parentNode.style.position = 'relative';
      this.searchInput.parentNode.appendChild(this.suggestionsBox);

      // 设置初始状态
      this.hideSuggestions();
    },

    /**
     * 构建搜索索引
     */
    buildSearchIndex: function() {
      // 从 localStorage 获取缓存的文章数据
      const cached = localStorage.getItem('zt_search_index');

      if (cached) {
        try {
          this.searchIndex = JSON.parse(cached);
          return;
        } catch (e) {
          console.warn('Failed to parse cached search index');
        }
      }

      // 构建新索引
      this.searchIndex = this.extractIndex();
      this.saveIndex();
    },

    /**
     * 提取搜索索引
     */
    extractIndex: function() {
      const index = [];

      // 从页面中提取文章信息
      document.querySelectorAll('.post-card, article.post').forEach(post => {
        const title = post.querySelector('.post-title, h1, h2')?.textContent || '';
        const excerpt = post.querySelector('.post-content, .excerpt, p')?.textContent || '';
        const url = post.querySelector('a')?.href || post.dataset.url || '';
        const date = post.querySelector('.post-date, time')?.textContent || '';
        const category = post.querySelector('.post-category')?.textContent || '';
        const tags = Array.from(post.querySelectorAll('.post-tags a')).map(a => a.textContent);

        index.push({
          title,
          excerpt: excerpt.substring(0, 200),
          url,
          date,
          category,
          tags,
          type: 'post'
        });
      });

      return index;
    },

    /**
     * 保存索引
     */
    saveIndex: function() {
      try {
        localStorage.setItem('zt_search_index', JSON.stringify(this.searchIndex));
      } catch (e) {
        console.warn('Failed to save search index:', e);
      }
    },

    /**
     * 附加事件
     */
    attachEvents: function() {
      if (!this.searchInput) return;

      // 输入事件
      this.searchInput.addEventListener('input', (e) => {
        this.handleInput(e.target.value);
      });

      // 焦点事件
      this.searchInput.addEventListener('focus', () => {
        if (this.searchInput.value.length >= SearchSuggestionsConfig.minQueryLength) {
          this.showSuggestions();
        }
      });

      // 失焦事件（延迟隐藏，允许点击建议）
      this.searchInput.addEventListener('blur', () => {
        setTimeout(() => this.hideSuggestions(), 200);
      });

      // 键盘导航
      this.searchInput.addEventListener('keydown', (e) => {
        this.handleKeydown(e);
      });

      // 全局快捷键
      document.addEventListener('keydown', (e) => {
        // 按 / 聚焦搜索框
        if (e.key === '/' && document.activeElement !== this.searchInput) {
          e.preventDefault();
          this.searchInput.focus();
        }
      });

      // 点击外部关闭
      document.addEventListener('click', (e) => {
        if (!this.searchInput.contains(e.target) && !this.suggestionsBox.contains(e.target)) {
          this.hideSuggestions();
        }
      });
    },

    /**
     * 处理输入
     */
    handleInput: function(query) {
      clearTimeout(this.debounceTimer);

      if (query.length < SearchSuggestionsConfig.minQueryLength) {
        this.hideSuggestions();
        return;
      }

      this.debounceTimer = setTimeout(() => {
        this.generateSuggestions(query);
        this.showSuggestions();
      }, SearchSuggestionsConfig.debounceTime);
    },

    /**
     * 生成建议
     */
    generateSuggestions: function(query) {
      const lowerQuery = query.toLowerCase();

      // 搜索匹配
      const matches = this.searchIndex.filter(item => {
        if (SearchSuggestionsConfig.searchIn.title && item.title.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (SearchSuggestionsConfig.searchIn.content && item.excerpt.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        if (SearchSuggestionsConfig.searchIn.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
          return true;
        }
        if (SearchSuggestionsConfig.searchIn.categories && item.category.toLowerCase().includes(lowerQuery)) {
          return true;
        }
        return false;
      });

      // 计算相关性分数
      const scored = matches.map(item => {
        const score = this.calculateScore(item, lowerQuery);
        return { ...item, score };
      });

      // 排序并限制数量
      this.suggestions = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, SearchSuggestionsConfig.maxSuggestions);

      // 渲染建议
      this.renderSuggestions(query);

      // 重置当前索引
      this.currentIndex = -1;
    },

    /**
     * 计算相关性分数
     */
    calculateScore: function(item, query) {
      let score = 0;

      // 标题匹配（权重最高）
      if (item.title.toLowerCase().includes(query)) {
        score += 10;
        if (item.title.toLowerCase().startsWith(query)) {
          score += 5;
        }
      }

      // 标签匹配
      if (item.tags.some(tag => tag.toLowerCase().includes(query))) {
        score += 5;
      }

      // 分类匹配
      if (item.category.toLowerCase().includes(query)) {
        score += 3;
      }

      // 内容匹配
      if (item.excerpt.toLowerCase().includes(query)) {
        score += 2;
      }

      return score;
    },

    /**
     * 渲染建议
     */
    renderSuggestions: function(query) {
      const list = this.suggestionsBox.querySelector('.zt-suggestions-list');
      const noResults = `<div class="zt-suggestion-empty">未找到匹配结果</div>`;

      if (this.suggestions.length === 0) {
        list.innerHTML = noResults;
        return;
      }

      list.innerHTML = this.suggestions.map((item, index) => {
        const highlightedTitle = this.highlightText(item.title, query);
        const icon = this.getTypeIcon(item.type);
        const category = SearchSuggestionsConfig.showCategory ? `<span class="zt-suggestion-category">${item.category}</span>` : '';
        const date = SearchSuggestionsConfig.showDate ? `<span class="zt-suggestion-date">${item.date}</span>` : '';

        return `
          <div class="zt-suggestion-item ${index === this.currentIndex ? 'zt-suggestion-active' : ''}"
               role="option"
               data-index="${index}"
               data-url="${item.url}">
            <div class="zt-suggestion-icon">${icon}</div>
            <div class="zt-suggestion-content">
              <div class="zt-suggestion-title">${highlightedTitle}</div>
              <div class="zt-suggestion-meta">
                ${category}${date}
              </div>
            </div>
          </div>
        `;
      }).join('');

      // 附加点击事件
      list.querySelectorAll('.zt-suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const url = item.dataset.url;
          if (url) {
            window.location.href = url;
          }
        });
      });
    },

    /**
     * 高亮文本
     */
    highlightText: function(text, query) {
      if (!SearchSuggestionsConfig.highlightMatches) {
        return text;
      }

      const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
      return text.replace(regex, '<mark class="zt-suggestion-highlight">$1</mark>');
    },

    /**
     * 获取类型图标
     */
    getTypeIcon: function(type) {
      const icons = {
        post: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>',
        page: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg>',
        category: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/></svg>'
      };

      return icons[type] || icons.post;
    },

    /**
     * 显示建议
     */
    showSuggestions: function() {
      this.suggestionsBox.style.display = 'block';
      this.suggestionsBox.classList.add('zt-suggestions-visible');
    },

    /**
     * 隐藏建议
     */
    hideSuggestions: function() {
      this.suggestionsBox.style.display = 'none';
      this.suggestionsBox.classList.remove('zt-suggestions-visible');
      this.currentIndex = -1;
    },

    /**
     * 处理键盘事件
     */
    handleKeydown: function(e) {
      const { navigateUp, navigateDown, select, close } = SearchSuggestionsConfig.shortcuts;

      switch (e.key) {
        case navigateDown:
          e.preventDefault();
          this.navigateDown();
          break;

        case navigateUp:
          e.preventDefault();
          this.navigateUp();
          break;

        case select:
          if (this.currentIndex >= 0) {
            e.preventDefault();
            this.selectSuggestion(this.currentIndex);
          }
          break;

        case close:
          this.hideSuggestions();
          break;
      }
    },

    /**
     * 向下导航
     */
    navigateDown: function() {
      if (this.suggestions.length === 0) return;

      this.currentIndex = Math.min(this.currentIndex + 1, this.suggestions.length - 1);
      this.updateActiveSuggestion();
    },

    /**
     * 向上导航
     */
    navigateUp: function() {
      if (this.suggestions.length === 0) return;

      this.currentIndex = Math.max(this.currentIndex - 1, -1);
      this.updateActiveSuggestion();
    },

    /**
     * 更新当前选中的建议
     */
    updateActiveSuggestion: function() {
      const items = this.suggestionsBox.querySelectorAll('.zt-suggestion-item');
      items.forEach((item, index) => {
        if (index === this.currentIndex) {
          item.classList.add('zt-suggestion-active');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('zt-suggestion-active');
        }
      });
    },

    /**
     * 选择建议
     */
    selectSuggestion: function(index) {
      const suggestion = this.suggestions[index];
      if (suggestion && suggestion.url) {
        window.location.href = suggestion.url;
      }
    },

    /**
     * 转义正则表达式
     */
    escapeRegex: function(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  };

  // 导出 API
  ZootopiaCore.searchSuggestions = SearchSuggestions;
  ZootopiaCore.searchConfig = SearchSuggestionsConfig;

  // 全局 API
  window.ztInitSearchSuggestions = () => SearchSuggestions.init();
  window.ztRebuildSearchIndex = () => SearchSuggestions.buildSearchIndex();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    SearchSuggestions.init();
  });

})();
