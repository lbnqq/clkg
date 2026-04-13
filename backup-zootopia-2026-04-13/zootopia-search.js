/**
 * 疯狂动物城搜索系统
 * Zootopia Search System - 全文搜索、高亮显示、搜索历史
 */

(function() {
  'use strict';

  // ==================== 搜索配置 ====================
  const SearchConfig = {
    // 搜索源
    sources: {
      posts: true,           // 文章
      pages: true,           // 页面
      tags: true,            // 标签
      categories: true       // 分类
    },

    // 搜索选项
    options: {
      fuzzy: true,           // 模糊匹配
      highlight: true,       // 高亮显示
      caseSensitive: false,  // 区分大小写
      maxResults: 20,        // 最大结果数
      minLength: 2           // 最小搜索长度
    },

    // 历史记录
    history: {
      enabled: true,
      maxItems: 10,
      storageKey: 'zt_search_history'
    },

    // 快捷键
    hotkeys: {
      open: 'Ctrl+K',
      openAlt: 'Cmd+K',
      close: 'Escape',
      navigateUp: 'ArrowUp',
      navigateDown: 'ArrowDown',
      select: 'Enter'
    }
  };

  // ==================== 搜索历史管理 ====================
  const SearchHistory = {
    items: [],

    init: function() {
      this.load();
    },

    load: function() {
      try {
        const data = localStorage.getItem(SearchConfig.history.storageKey);
        this.items = data ? JSON.parse(data) : [];
      } catch (e) {
        this.items = [];
      }
    },

    save: function() {
      try {
        localStorage.setItem(
          SearchConfig.history.storageKey,
          JSON.stringify(this.items)
        );
      } catch (e) {
        console.warn('无法保存搜索历史:', e);
      }
    },

    add: function(query) {
      if (!query || query.trim().length === 0) return;

      // 移除重复项
      this.items = this.items.filter(item => item !== query);

      // 添加到开头
      this.items.unshift(query);

      // 限制数量
      if (this.items.length > SearchConfig.history.maxItems) {
        this.items = this.items.slice(0, SearchConfig.history.maxItems);
      }

      this.save();
    },

    remove: function(query) {
      this.items = this.items.filter(item => item !== query);
      this.save();
    },

    clear: function() {
      this.items = [];
      this.save();
    },

    get: function() {
      return this.items;
    }
  };

  // ==================== 搜索管理器 ====================
  const SearchManager = {
    isOpen: false,
    element: null,
    input: null,
    resultsContainer: null,
    selectedIndex: 0,
    currentResults: [],
    searchIndex: null,

    init: function() {
      SearchHistory.init();
      this.buildSearchIndex();
      this.createSearchUI();
      this.bindEvents();
      this.bindHotkeys();
    },

    // 构建搜索索引
    buildSearchIndex: function() {
      this.searchIndex = [];

      // 获取文章数据
      const posts = document.querySelectorAll('.post-item, article.post');
      posts.forEach(post => {
        const title = post.querySelector('.post-title a, h1, h2, h3')?.textContent || '';
        const excerpt = post.querySelector('.post-content, .post-excerpt, p')?.textContent || '';
        const url = post.querySelector('a')?.href || '';

        this.searchIndex.push({
          type: 'post',
          title: this.cleanText(title),
          content: this.cleanText(excerpt),
          url: url
        });
      });

      // 获取页面数据
      const pages = document.querySelectorAll('.page, [data-page]');
      pages.forEach(page => {
        const title = page.querySelector('h1, h2')?.textContent || '';
        const content = page.textContent || '';
        const url = window.location.href;

        this.searchIndex.push({
          type: 'page',
          title: this.cleanText(title),
          content: this.cleanText(content),
          url: url
        });
      });

      console.log(`🔍 搜索索引已构建: ${this.searchIndex.length} 项`);
    },

    // 清理文本
    cleanText: function(text) {
      return text
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s\u4e00-\u9fa5]/g, ' ')
        .trim()
        .toLowerCase();
    },

    // 创建搜索界面
    createSearchUI: function() {
      // 创建搜索遮罩
      const overlay = document.createElement('div');
      overlay.className = 'zt-search-overlay';
      overlay.innerHTML = `
        <div class="zt-search-container">
          <div class="zt-search-header">
            <div class="zt-search-input-wrapper">
              <span class="zt-search-icon">🔍</span>
              <input
                type="text"
                class="zt-search-input"
                placeholder="搜索文章、页面、标签..."
                autocomplete="off"
              />
              <button class="zt-search-clear" style="display: none;">×</button>
            </div>
            <div class="zt-search-shortcut">ESC 关闭</div>
          </div>
          <div class="zt-search-results-container">
            <div class="zt-search-results"></div>
            <div class="zt-search-empty" style="display: none;">
              <div class="zt-search-empty-icon">🔍</div>
              <div class="zt-search-empty-text">输入关键词开始搜索</div>
            </div>
            <div class="zt-search-no-results" style="display: none;">
              <div class="zt-search-no-results-icon">😕</div>
              <div class="zt-search-no-results-text">未找到相关结果</div>
            </div>
          </div>
          <div class="zt-search-footer">
            <div class="zt-search-history"></div>
            <div class="zt-search-tips">
              <span class="zt-search-tip">↑↓ 导航</span>
              <span class="zt-search-tip">Enter 选择</span>
              <span class="zt-search-tip">ESC 关闭</span>
            </div>
          </div>
        </div>
      `;

      // 添加样式
      this.addStyles();

      document.body.appendChild(overlay);
      this.element = overlay;

      // 缓存元素引用
      this.input = overlay.querySelector('.zt-search-input');
      this.resultsContainer = overlay.querySelector('.zt-search-results');
    },

    addStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        .zt-search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: none;
          opacity: 0;
          transition: opacity 300ms ease-out;
        }

        .zt-search-overlay.zt-open {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
        }

        .zt-search-container {
          width: 90%;
          max-width: 700px;
          max-height: 80vh;
          background: rgba(26, 26, 46, 0.98);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .zt-search-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .zt-search-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 12px 16px;
          border: 2px solid transparent;
          transition: all 200ms ease-out;
        }

        .zt-search-input-wrapper:focus-within {
          border-color: #FF9F43;
          background: rgba(255, 255, 255, 0.08);
        }

        .zt-search-icon {
          font-size: 20px;
        }

        .zt-search-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: white;
          font-size: 16px;
        }

        .zt-search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .zt-search-clear {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 24px;
          cursor: pointer;
          padding: 0 8px;
          transition: color 200ms ease-out;
        }

        .zt-search-clear:hover {
          color: white;
        }

        .zt-search-shortcut {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 12px;
          border-radius: 8px;
        }

        .zt-search-results-container {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
        }

        .zt-search-results {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .zt-search-result {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 150ms ease-out;
        }

        .zt-search-result:hover,
        .zt-search-result.zt-selected {
          background: rgba(255, 255, 255, 0.08);
        }

        .zt-search-result-icon {
          font-size: 20px;
          margin-top: 2px;
        }

        .zt-search-result-content {
          flex: 1;
          min-width: 0;
        }

        .zt-search-result-title {
          font-size: 14px;
          font-weight: 600;
          color: white;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .zt-search-result-title em {
          color: #FF9F43;
          font-style: normal;
        }

        .zt-search-result-type {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 159, 67, 0.2);
          color: #FF9F43;
        }

        .zt-search-result-excerpt {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .zt-search-result-excerpt em {
          color: #FF9F43;
          font-style: normal;
        }

        .zt-search-empty,
        .zt-search-no-results {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.4);
        }

        .zt-search-empty-icon,
        .zt-search-no-results-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .zt-search-footer {
          padding: 15px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }

        .zt-search-history {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .zt-search-history-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 6px 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 150ms ease-out;
        }

        .zt-search-history-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .zt-search-tips {
          display: flex;
          gap: 15px;
          color: rgba(255, 255, 255, 0.4);
        }

        .zt-search-tip {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* 滚动条样式 */
        .zt-search-results-container::-webkit-scrollbar {
          width: 6px;
        }

        .zt-search-results-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .zt-search-results-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
      `;

      document.head.appendChild(style);
    },

    bindEvents: function() {
      // 输入事件
      this.input.addEventListener('input', ZootopiaCore.utils.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));

      // 清空按钮
      const clearBtn = this.element.querySelector('.zt-search-clear');
      clearBtn.addEventListener('click', () => {
        this.input.value = '';
        this.input.focus();
        this.clearResults();
        clearBtn.style.display = 'none';
      });

      // 点击遮罩关闭
      this.element.addEventListener('click', (e) => {
        if (e.target === this.element) {
          this.close();
        }
      });

      // 结果点击
      this.resultsContainer.addEventListener('click', (e) => {
        const result = e.target.closest('.zt-search-result');
        if (result) {
          const index = parseInt(result.dataset.index);
          this.selectResult(index);
        }
      });
    },

    bindHotkeys: function() {
      // 打开搜索
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }

        if (!this.isOpen) return;

        // 关闭搜索
        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
          return;
        }

        // 导航结果
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.navigateResults(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateResults(-1);
        }

        // 选择结果
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.selectedIndex >= 0 && this.selectedIndex < this.currentResults.length) {
            this.selectResult(this.selectedIndex);
          }
        }
      });
    },

    // 执行搜索
    handleSearch: function(query) {
      const trimmedQuery = query.trim();
      const clearBtn = this.element.querySelector('.zt-search-clear');

      // 显示/隐藏清空按钮
      clearBtn.style.display = trimmedQuery ? 'block' : 'none';

      if (trimmedQuery.length < SearchConfig.options.minLength) {
        this.showEmpty();
        return;
      }

      // 执行搜索
      const results = this.search(trimmedQuery));
      this.currentResults = results;
      this.displayResults(results);

      // 添加到历史
      if (results.length > 0) {
        SearchHistory.add(trimmedQuery);
      }
    },

    // 搜索算法
    search: function(query) {
      const terms = query.toLowerCase().split(/\s+/);
      const results = [];
      const options = SearchConfig.options;

      this.searchIndex.forEach(item => {
        let score = 0;
        let matched = false;

        terms.forEach(term => {
          // 标题匹配（权重更高）
          if (item.title.includes(term)) {
            score += 10;
            matched = true;
          }

          // 内容匹配
          if (item.content.includes(term)) {
            score += 1;
            matched = true;
          }
        });

        if (matched) {
          results.push({ ...item, score });
        }
      });

      // 按相关性排序
      results.sort((a, b) => b.score - a.score);

      // 限制结果数量
      return results.slice(0, options.maxResults);
    },

    // 显示结果
    displayResults: function(results) {
      this.clearResults();
      this.selectedIndex = 0;

      if (results.length === 0) {
        this.showNoResults();
        return;
      }

      results.forEach((result, index) => {
        const resultEl = this.createResultElement(result, index);
        this.resultsContainer.appendChild(resultEl);
      });

      // 更新选中状态
      this.updateSelection();
    },

    // 创建结果元素
    createResultElement: function(result, index) {
      const element = document.createElement('div');
      element.className = 'zt-search-result';
      element.dataset.index = index;

      // 图标
      const icon = result.type === 'post' ? '📝' : '📄';

      // 高亮关键词
      const highlightedTitle = this.highlightTerms(result.title);
      const highlightedExcerpt = this.highlightTerms(result.content, 150);

      element.innerHTML = `
        <div class="zt-search-result-icon">${icon}</div>
        <div class="zt-search-result-content">
          <div class="zt-search-result-title">
            ${highlightedTitle}
            <span class="zt-search-result-type">${result.type}</span>
          </div>
          <div class="zt-search-result-excerpt">${highlightedExcerpt}</div>
        </div>
      `;

      return element;
    },

    // 高亮关键词
    highlightTerms: function(text, maxLength = 0) {
      let result = text;

      if (maxLength > 0 && result.length > maxLength) {
        result = result.substring(0, maxLength) + '...';
      }

      // 高亮（简单实现）
      const query = this.input.value.trim();
      if (query) {
        const terms = query.toLowerCase().split(/\s+/);
        terms.forEach(term => {
          const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
          result = result.replace(regex, '<em>$1</em>');
        });
      }

      return result;
    },

    escapeRegex: function(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    // 导航结果
    navigateResults: function(direction) {
      if (this.currentResults.length === 0) return;

      this.selectedIndex += direction;

      // 循环导航
      if (this.selectedIndex < 0) {
        this.selectedIndex = this.currentResults.length - 1;
      } else if (this.selectedIndex >= this.currentResults.length) {
        this.selectedIndex = 0;
      }

      this.updateSelection();
    },

    // 更新选中状态
    updateSelection: function() {
      const results = this.resultsContainer.querySelectorAll('.zt-search-result');
      results.forEach((result, index) => {
        result.classList.toggle('zt-selected', index === this.selectedIndex);
      });

      // 滚动到可见区域
      const selected = results[this.selectedIndex];
      if (selected) {
        selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    },

    // 选择结果
    selectResult: function(index) {
      const result = this.currentResults[index];
      if (result && result.url) {
        // 使用页面过渡
        if (window.ztTransitionTo) {
          ztTransitionTo(result.url, 'fade');
        } else {
          window.location.href = result.url;
        }
        this.close();
      }
    },

    // 显示空状态
    showEmpty: function() {
      this.clearResults();
      const empty = this.element.querySelector('.zt-search-empty');
      const noResults = this.element.querySelector('.zt-search-no-results');

      empty.style.display = 'block';
      noResults.style.display = 'none';

      // 显示历史记录
      this.displayHistory();
    },

    // 显示无结果
    showNoResults: function() {
      this.clearResults();
      const empty = this.element.querySelector('.zt-search-empty');
      const noResults = this.element.querySelector('.zt-search-no-results');

      empty.style.display = 'none';
      noResults.style.display = 'block';
    },

    // 显示历史记录
    displayHistory: function() {
      const container = this.element.querySelector('.zt-search-history');
      const history = SearchHistory.get();

      if (history.length === 0) {
        container.innerHTML = '';
        return;
      }

      container.innerHTML = history.map(item => `
        <span class="zt-search-history-item" data-zt-history="${item}">${item}</span>
      `).join('');

      // 绑定点击事件
      container.querySelectorAll('.zt-search-history-item').forEach(el => {
        el.addEventListener('click', () => {
          const query = el.dataset.ztHistory;
          this.input.value = query;
          this.handleSearch(query);
        });
      });
    },

    // 清空结果
    clearResults: function() {
      this.resultsContainer.innerHTML = '';
      this.currentResults = [];
      this.selectedIndex = 0;
    },

    // 打开搜索
    open: function() {
      this.isOpen = true;
      this.element.classList.add('zt-open');
      this.input.value = '';
      this.input.focus();
      this.showEmpty();

      // 重建搜索索引（获取最新内容）
      this.buildSearchIndex();
    },

    // 关闭搜索
    close: function() {
      this.isOpen = false;
      this.element.classList.remove('zt-open');
    },

    // 切换搜索
    toggle: function() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.search = SearchManager;
  ZootopiaCore.searchHistory = SearchHistory;
  ZootopiaCore.searchConfig = SearchConfig;

  // ==================== 全局 API ====================
  // 打开搜索
  window.ztOpenSearch = () => SearchManager.open();

  // 关闭搜索
  window.ztCloseSearch = () => SearchManager.close();

  // 执行搜索
  window.ztSearch = (query) => {
    SearchManager.open();
    SearchManager.input.value = query;
    SearchManager.handleSearch(query);
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    SearchManager.init();
    console.log('🔍 搜索系统已就绪 (快捷键: Ctrl+K)');
  });

  // ==================== 搜索按钮支持 ====================
  // 为页面添加搜索按钮
  ZootopiaCore.dom.then(() => {
    const searchBtn = document.createElement('button');
    searchBtn.className = 'zt-search-trigger';
    searchBtn.innerHTML = '🔍';
    searchBtn.setAttribute('aria-label', '搜索');
    searchBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
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

    searchBtn.addEventListener('mouseenter', () => {
      searchBtn.style.transform = 'scale(1.05)';
      searchBtn.style.borderColor = '#FF9F43';
    });

    searchBtn.addEventListener('mouseleave', () => {
      searchBtn.style.transform = 'scale(1)';
      searchBtn.style.borderColor = 'rgba(255, 159, 67, 0.3)';
    });

    searchBtn.addEventListener('click', () => SearchManager.open());

    document.body.appendChild(searchBtn);
  });

})();
