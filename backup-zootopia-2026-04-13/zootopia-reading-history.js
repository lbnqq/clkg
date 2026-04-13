/**
 * 疯狂动物城阅读历史记录系统
 * Zootopia Reading History
 *
 * 自动保存阅读位置，追踪阅读历史，智能推荐继续阅读
 */

(function() {
  'use strict';

  const ReadingHistoryConfig = {
    // 存储配置
    storageKey: 'zt_reading_history',
    maxHistory: 100,
    retentionDays: 30,

    // 自动保存
    autoSave: true,
    saveInterval: 5000, // 5秒
    saveOnScroll: true,
    scrollThreshold: 10, // 滚动超过10%时保存

    // 恢复阅读
    showRestorePrompt: true,
    restorePromptDelay: 1000,

    // 阅读统计
    trackReadingTime: true,
    trackScrollDepth: true
  };

  /**
   * 阅读历史管理器
   */
  const ReadingHistory = {
    currentUrl: null,
    currentTitle: null,
    scrollPosition: 0,
    scrollTimer: null,
    startTime: null,
    readingTime: 0,
    lastSaveTime: 0,

    /**
     * 初始化
     */
    init: function() {
      this.currentUrl = window.location.href;
      this.currentTitle = document.title;

      // 检查是否需要恢复阅读位置
      this.checkRestorePosition();

      // 开始追踪
      this.startTracking();

      // 附加事件监听器
      this.attachEvents();
    },

    /**
     * 开始追踪
     */
    startTracking: function() {
      this.startTime = Date.now();

      // 定期保存
      if (ReadingHistoryConfig.autoSave) {
        setInterval(() => {
          this.autoSave();
        }, ReadingHistoryConfig.saveInterval);
      }
    },

    /**
     * 附加事件
     */
    attachEvents: function() {
      // 滚动事件
      if (ReadingHistoryConfig.saveOnScroll) {
        window.addEventListener('scroll', () => {
          this.handleScroll();
        });
      }

      // 页面隐藏前保存
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.savePosition();
        }
      });

      // 页面卸载前保存
      window.addEventListener('beforeunload', () => {
        this.savePosition();
      });
    },

    /**
     * 处理滚动
     */
    handleScroll: function() {
      const currentPosition = this.getScrollPosition();
      const diff = Math.abs(currentPosition - this.scrollPosition);

      if (diff > ReadingHistoryConfig.scrollThreshold) {
        this.scrollPosition = currentPosition;
        this.savePosition();
      }
    },

    /**
     * 获取滚动位置
     */
    getScrollPosition: function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    },

    /**
     * 自动保存
     */
    autoSave: function() {
      const now = Date.now();

      // 避免频繁保存
      if (now - this.lastSaveTime < ReadingHistoryConfig.saveInterval) {
        return;
      }

      this.savePosition();
      this.lastSaveTime = now;
    },

    /**
     * 保存阅读位置
     */
    savePosition: function() {
      const history = this.getHistory();

      // 更新或添加当前页面
      const existingIndex = history.findIndex(item => item.url === this.currentUrl);
      const entry = this.createEntry();

      if (existingIndex >= 0) {
        history[existingIndex] = entry;
      } else {
        history.unshift(entry);
      }

      // 限制历史记录数量
      const trimmed = this.trimHistory(history);

      // 保存到存储
      this.saveHistory(trimmed);
    },

    /**
     * 创建历史记录条目
     */
    createEntry: function() {
      const entry = {
        url: this.currentUrl,
        title: this.currentTitle,
        position: this.getScrollPosition(),
        scrollY: window.pageYOffset || document.documentElement.scrollTop,
        timestamp: Date.now(),
        readingTime: this.calculateReadingTime()
      };

      // 追踪滚动深度
      if (ReadingHistoryConfig.trackScrollDepth) {
        entry.maxScrollDepth = this.scrollPosition;
      }

      return entry;
    },

    /**
     * 计算阅读时间
     */
    calculateReadingTime: function() {
      if (!ReadingHistoryConfig.trackReadingTime || !this.startTime) {
        return 0;
      }

      const elapsed = Date.now() - this.startTime;
      return Math.floor(elapsed / 1000); // 秒
    },

    /**
     * 获取历史记录
     */
    getHistory: function() {
      try {
        const data = localStorage.getItem(ReadingHistoryConfig.storageKey);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        console.warn('Failed to get reading history:', e);
        return [];
      }
    },

    /**
     * 保存历史记录
     */
    saveHistory: function(history) {
      try {
        localStorage.setItem(ReadingHistoryConfig.storageKey, JSON.stringify(history));
      } catch (e) {
        console.warn('Failed to save reading history:', e);
      }
    },

    /**
     * 清理历史记录
     */
    trimHistory: function(history) {
      // 移除过期记录
      const cutoff = Date.now() - (ReadingHistoryConfig.retentionDays * 24 * 60 * 60 * 1000);
      let filtered = history.filter(item => item.timestamp > cutoff);

      // 限制数量
      if (filtered.length > ReadingHistoryConfig.maxHistory) {
        filtered = filtered.slice(0, ReadingHistoryConfig.maxHistory);
      }

      return filtered;
    },

    /**
     * 检查是否需要恢复阅读位置
     */
    checkRestorePosition: function() {
      if (!ReadingHistoryConfig.showRestorePrompt) return;

      const history = this.getHistory();
      const entry = history.find(item => item.url === this.currentUrl);

      if (!entry || entry.position < 5) return; // 阅读进度小于5%不提示

      // 延迟显示提示
      setTimeout(() => {
        this.showRestorePrompt(entry);
      }, ReadingHistoryConfig.restorePromptDelay);
    },

    /**
     * 显示恢复提示
     */
    showRestorePrompt: function(entry) {
      // 创建提示框
      const prompt = document.createElement('div');
      prompt.className = 'zt-restore-prompt';
      prompt.innerHTML = `
        <div class="zt-restore-prompt-content">
          <div class="zt-restore-prompt-icon">📖</div>
          <div class="zt-restore-prompt-text">
            <div class="zt-restore-prompt-title">继续阅读？</div>
            <div class="zt-restore-prompt-subtitle">上次阅读到 ${Math.round(entry.position)}%</div>
          </div>
          <div class="zt-restore-prompt-actions">
            <button class="zt-restore-btn zt-restore-accept">继续</button>
            <button class="zt-restore-btn zt-restore-dismiss">从头开始</button>
          </div>
          <button class="zt-restore-close" aria-label="关闭">×</button>
        </div>
      `;

      document.body.appendChild(prompt);

      // 添加动画类
      setTimeout(() => prompt.classList.add('zt-restore-prompt-visible'), 10);

      // 附加事件
      prompt.querySelector('.zt-restore-accept').addEventListener('click', () => {
        this.restorePosition(entry);
        this.hideRestorePrompt(prompt);
      });

      prompt.querySelector('.zt-restore-dismiss').addEventListener('click', () => {
        this.hideRestorePrompt(prompt);
      });

      prompt.querySelector('.zt-restore-close').addEventListener('click', () => {
        this.hideRestorePrompt(prompt);
      });

      // 自动隐藏（10秒后）
      setTimeout(() => {
        if (prompt.parentNode) {
          this.hideRestorePrompt(prompt);
        }
      }, 10000);
    },

    /**
     * 恢复阅读位置
     */
    restorePosition: function(entry) {
      window.scrollTo({
        top: entry.scrollY,
        behavior: 'smooth'
      });

      // 高亮提示
      if (window.ztNotify) {
        ztNotify({
          type: 'info',
          message: '已恢复到上次阅读位置',
          duration: 2000
        });
      }
    },

    /**
     * 隐藏恢复提示
     */
    hideRestorePrompt: function(prompt) {
      prompt.classList.remove('zt-restore-prompt-visible');
      setTimeout(() => {
        if (prompt.parentNode) {
          prompt.remove();
        }
      }, 300);
    },

    /**
     * 获取最近阅读
     */
    getRecentReading: function(limit = 10) {
      const history = this.getHistory();
      return history.slice(0, limit);
    },

    /**
     * 清除历史记录
     */
    clearHistory: function() {
      localStorage.removeItem(ReadingHistoryConfig.storageKey);

      if (window.ztNotify) {
        ztNotify({
          type: 'success',
          message: '阅读历史已清除',
          duration: 2000
        });
      }
    },

    /**
     * 清除指定页面的历史
     */
    clearPage: function(url) {
      const history = this.getHistory();
      const filtered = history.filter(item => item.url !== url);
      this.saveHistory(filtered);
    },

    /**
     * 获取阅读统计
     */
    getStats: function() {
      const history = this.getHistory();

      const totalReadingTime = history.reduce((sum, item) => sum + (item.readingTime || 0), 0);
      const uniquePages = history.length;
      const avgProgress = history.reduce((sum, item) => sum + item.position, 0) / history.length;

      return {
        totalReadingTime,
        uniquePages,
        avgProgress: avgProgress || 0,
        historySize: history.length
      };
    }
  };

  // 导出 API
  ZootopiaCore.readingHistory = ReadingHistory;
  ZootopiaCore.readingHistoryConfig = ReadingHistoryConfig;

  // 全局 API
  window.ztGetReadingHistory = (limit) => ReadingHistory.getRecentReading(limit);
  window.ztClearReadingHistory = () => ReadingHistory.clearHistory();
  window.ztClearPageHistory = (url) => ReadingHistory.clearPage(url);
  window.ztGetReadingStats = () => ReadingHistory.getStats();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    ReadingHistory.init();
  });

})();
