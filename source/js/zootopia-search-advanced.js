/**
 * 疯狂动物城高级搜索系统
 * Zootopia Advanced Search
 *
 * 高级搜索功能，支持多条件筛选
 */

(function() {
  'use strict';

  const AdvancedSearchConfig = {
    // 搜索字段
    fields: {
      title: { enabled: true, weight: 10 },
      content: { enabled: true, weight: 5 },
      tags: { enabled: true, weight: 8 },
      categories: { enabled: true, weight: 7 }
    },

    // 搜索选项
    fuzzy: true,
    caseSensitive: false,
    highlightResults: true,

    // 结果显示
    maxResults: 20,
    showExcerpt: true,
    excerptLength: 150
  };

  /**
   * 高级搜索管理器
   */
  const AdvancedSearch = {
    searchIndex: null,

    /**
     * 初始化
     */
    init: function() {
      this.buildSearchIndex();
      this.setupSearchInterface();
    },

    /**
     * 构建搜索索引
     */
    buildSearchIndex: function() {
      // 从 localStorage 获取缓存的索引
      const cached = localStorage.getItem('zt_advanced_search_index');

      if (cached) {
        try {
          this.searchIndex = JSON.parse(cached);
          return;
        } catch (e) {
          console.warn('Failed to parse search index');
        }
      }

      // 构建新索引
      this.searchIndex = this.crawlAndIndex();
      this.saveIndex();
    },

    /**
     * 爬取和索引
     */
    crawlAndIndex: function() {
      const index = [];

      // 索引所有文章
      document.querySelectorAll('.post-item, article.post, .post-card').forEach(post => {
        const titleEl = post.querySelector('.post-title, h1, h2, .entry-title');
        const contentEl = post.querySelector('.post-content, .entry-content, p');
        const tagsEls = post.querySelectorAll('.post-tags a, .entry-tags a');
        const categoryEl = post.querySelector('.post-category a, .entry-category a');

        const title = titleEl?.textContent || '';
        const content = contentEl?.textContent || '';
        const tags = Array.from(tagsEls).map(el => el.textContent);
        const category = categoryEl?.textContent || '';
        const url = post.querySelector('a')?.href || post.dataset.url || '';
        const date = post.querySelector('.post-date, time')?.textContent || '';

        index.push({
          id: index.length,
          title,
          content: content.substring(0, 500), // 限制内容长度
          tags,
          category,
          url,
          date
        });
      });

      return index;
    },

    /**
     * 保存索引
     */
    saveIndex: function() {
      try {
        localStorage.setItem('zt_advanced_search_index', JSON.stringify(this.searchIndex));
      } catch (e) {
        console.warn('Failed to save search index:', e);
      }
    },

    /**
     * 设置搜索界面
     */
    setupSearchInterface: function() {
      // 检查是否在搜索页面
      if (!this.isSearchPage()) return;

      this.createSearchForm();
      this.createResultsContainer();
    },

    /**
     * 检查是否是搜索页面
     */
    isSearchPage: function() {
      return window.location.pathname === '/search/' ||
             document.body.classList.contains('search-page');
    },

    /**
     * 创建搜索表单
     */
    createSearchForm: function() {
      const searchPage = document.querySelector('.search-page-content') || document.querySelector('main');

      if (!searchPage) return;

      const form = document.createElement('div');
      form.className = 'zt-advanced-search';
      form.innerHTML = `
        <div class="zt-search-header">
          <h1>🔍 高级搜索</h1>
          <p class="zt-search-subtitle">在疯狂动物城中探索精彩内容</p>
        </div>

        <div class="zt-search-form">
          <div class="zt-search-input-group">
            <input
              type="text"
              id="zt-search-query"
              class="zt-search-input"
              placeholder="输入搜索关键词..."
              autocomplete="off"
            >
            <button id="zt-search-submit" class="zt-search-submit-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 11.99 14 14z"/>
              </svg>
            </button>
          </div>

          <div class="zt-search-filters">
            <div class="zt-search-filter">
              <label class="zt-filter-label">搜索范围</label>
              <div class="zt-filter-options">
                <label class="zt-filter-option">
                  <input type="checkbox" id="zt-filter-title" checked>
                  <span>标题</span>
                </label>
                <label class="zt-filter-option">
                  <input type="checkbox" id="zt-filter-content" checked>
                  <span>内容</span>
                </label>
                <label class="zt-filter-option">
                  <input type="checkbox" id="zt-filter-tags" checked>
                  <span>标签</span>
                </label>
                <label class="zt-filter-option">
                  <input type="checkbox" id="zt-filter-categories">
                  <span>分类</span>
                </label>
              </div>
            </div>

            <div class="zt-search-filter">
              <label class="zt-filter-label">排序方式</label>
              <select id="zt-search-sort" class="zt-filter-select">
                <option value="relevance">相关性</option>
                <option value="date">日期</option>
                <option value="title">标题</option>
              </select>
            </div>
          </div>
        </div>
      `;

      searchPage.insertBefore(form, searchPage.firstChild);

      // 附加事件
      this.attachSearchEvents(form);
    },

    /**
     * 附加搜索事件
     */
    attachSearchEvents: function(form) {
      const input = form.querySelector('#zt-search-query');
      const submitBtn = form.querySelector('#zt-search-submit');

      // 输入事件
      input.addEventListener('input', () => {
        this.performSearch();
      });

      // 回车搜索
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSearch();
        }
      });

      // 提交按钮
      submitBtn.addEventListener('click', () => {
        this.performSearch();
      });

      // 筛选器变化
      form.querySelectorAll('input[type="checkbox"], select').forEach(el => {
        el.addEventListener('change', () => {
          this.performSearch();
        });
      });

      // URL 参数搜索
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        input.value = query;
        setTimeout(() => this.performSearch(), 100);
      }
    },

    /**
     * 执行搜索
     */
    performSearch: function() {
      const query = document.querySelector('#zt-search-query').value.trim();
      const resultsContainer = document.querySelector('.zt-search-results');

      if (!query) {
        if (resultsContainer) {
          resultsContainer.innerHTML = '<p class="zt-search-hint">请输入搜索关键词</p>';
        }
        return;
      }

      // 获取筛选条件
      const filters = {
        title: document.querySelector('#zt-filter-title')?.checked || false,
        content: document.querySelector('#zt-filter-content')?.checked || false,
        tags: document.querySelector('#zt-filter-tags')?.checked || false,
        categories: document.querySelector('#zt-filter-categories')?.checked || false
      };

      const sort = document.querySelector('#zt-search-sort')?.value || 'relevance';

      // 执行搜索
      const results = this.search(query, filters, sort);

      // 显示结果
      this.displayResults(results, query);
    },

    /**
     * 搜索
     */
    search: function(query, filters, sort) {
      const lowerQuery = query.toLowerCase();

      // 搜索匹配
      const matches = this.searchIndex.filter(item => {
        let score = 0;

        // 标题匹配
        if (filters.title && item.title.toLowerCase().includes(lowerQuery)) {
          score += AdvancedSearchConfig.fields.title.weight;
          if (item.title.toLowerCase().startsWith(lowerQuery)) {
            score += 5;
          }
        }

        // 内容匹配
        if (filters.content && item.content.toLowerCase().includes(lowerQuery)) {
          score += AdvancedSearchConfig.fields.content.weight;
        }

        // 标签匹配
        if (filters.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
          score += AdvancedSearchConfig.fields.tags.weight;
        }

        // 分类匹配
        if (filters.categories && item.category.toLowerCase().includes(lowerQuery)) {
          score += AdvancedSearchConfig.fields.categories.weight;
        }

        return score > 0;
      }).map(item => ({
        ...item,
        score: this.calculateScore(item, lowerQuery, filters)
      }));

      // 排序
      matches.sort((a, b) => {
        if (sort === 'date') {
          return new Date(b.date) - new Date(a.date);
        } else if (sort === 'title') {
          return a.title.localeCompare(b.title);
        } else {
          return b.score - a.score;
        }
      });

      // 限制结果数量
      return matches.slice(0, AdvancedSearchConfig.maxResults);
    },

    /**
     * 计算相关性分数
     */
    calculateScore: function(item, query, filters) {
      let score = 0;

      if (filters.title && item.title.toLowerCase().includes(query)) {
        score += AdvancedSearchConfig.fields.title.weight;
        if (item.title.toLowerCase().startsWith(query)) {
          score += 5;
        }
      }

      if (filters.content && item.content.toLowerCase().includes(query)) {
        score += AdvancedSearchConfig.fields.content.weight;
      }

      if (filters.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) {
        score += AdvancedSearchConfig.fields.tags.weight;
      }

      if (filters.categories && item.category.toLowerCase().includes(query)) {
        score += AdvancedSearchConfig.fields.categories.weight;
      }

      return score;
    },

    /**
     * 创建结果容器
     */
    createResultsContainer: function() {
      const searchPage = document.querySelector('.search-page-content') || document.querySelector('main');

      if (!searchPage) return;

      const results = document.createElement('div');
      results.className = 'zt-search-results';
      searchPage.appendChild(results);
    },

    /**
     * 显示结果
     */
    displayResults: function(results, query) {
      const container = document.querySelector('.zt-search-results');

      if (!container) return;

      if (results.length === 0) {
        container.innerHTML = `
          <div class="zt-search-no-results">
            <div class="zt-no-results-icon">🔍</div>
            <h3>未找到相关结果</h3>
            <p>试试其他关键词或调整搜索范围</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="zt-search-results-header">
          <span class="zt-results-count">找到 ${results.length} 个结果</span>
          <span class="zt-search-query">"${query}"</span>
        </div>
        <div class="zt-search-results-list">
          ${results.map(result => this.renderResult(result, query)).join('')}
        </div>
      `;
    },

    /**
     * 渲染单个结果
     */
    renderResult: function(result, query) {
      const highlightedTitle = this.highlightText(result.title, query);
      const excerpt = AdvancedSearchConfig.showExcerpt ?
        this.generateExcerpt(result.content, query) : '';

      return `
        <div class="zt-search-result">
          <h3 class="zt-result-title">
            <a href="${result.url}">${highlightedTitle}</a>
          </h3>
          ${excerpt ? `<p class="zt-result-excerpt">${excerpt}</p>` : ''}
          <div class="zt-result-meta">
            ${result.category ? `<span class="zt-result-category">${result.category}</span>` : ''}
            ${result.date ? `<span class="zt-result-date">${result.date}</span>` : ''}
            ${result.tags.length > 0 ? `<span class="zt-result-tags">${result.tags.join(', ')}</span>` : ''}
          </div>
        </div>
      `;
    },

    /**
     * 高亮文本
     */
    highlightText: function(text, query) {
      if (!AdvancedSearchConfig.highlightResults) return text;

      const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
      return text.replace(regex, '<mark class="zt-search-highlight">$1</mark>');
    },

    /**
     * 生成摘要
     */
    generateExcerpt: function(content, query) {
      const lowerContent = content.toLowerCase();
      const lowerQuery = query.toLowerCase();
      const index = lowerContent.indexOf(lowerQuery);

      if (index === -1) {
        return content.substring(0, AdvancedSearchConfig.excerptLength) + '...';
      }

      const start = Math.max(0, index - 50);
      const end = Math.min(content.length, index + AdvancedSearchConfig.excerptLength);
      let excerpt = content.substring(start, end);

      if (start > 0) excerpt = '...' + excerpt;
      if (end < content.length) excerpt = excerpt + '...';

      return this.highlightText(excerpt, query);
    },

    /**
     * 转义正则表达式
     */
    escapeRegex: function(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  };

  // 导出 API
  ZootopiaCore.advancedSearch = AdvancedSearch;
  ZootopiaCore.advancedSearchConfig = AdvancedSearchConfig;

  // 全局 API
  window.ztPerformSearch = (query) => AdvancedSearch.performSearch();
  window.ztRebuildSearchIndex = () => AdvancedSearch.buildSearchIndex();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    AdvancedSearch.init();
  });

})();
