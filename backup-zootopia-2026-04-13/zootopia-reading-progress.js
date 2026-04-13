/**
 * 疯狂动物城阅读进度条系统
 * Zootopia Reading Progress - 文章阅读进度指示、章节追踪
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const ReadingProgressConfig = {
    // 进度条配置
    progressBar: {
      position: 'top',           // top, bottom
      height: 4,                 // 进度条高度
      colors: {
        default: '#FF9F43',      // 默认金橙色
        complete: '#10AC84',     // 完成翠绿色
        gradient: true           // 渐变效果
      },
      showPercentage: false,     // 显示百分比
      hideOnTop: true,           // 到顶部时隐藏
      hideOnBottom: false,       // 到底部时隐藏
      shadow: true,              // 阴影效果
      animation: 'smooth'         // smooth, jump, none
    },

    // 章节进度
    chapters: {
      enabled: true,             // 启用章节追踪
      autoDetect: true,          // 自动检测章节
      markers: {
        h1: 100,                 // 一级标题权重
        h2: 50,                  // 二级标题权重
        h3: 25,                  // 三级标题权重
        h4: 10                   // 四级标题权重
      },
      showIndicator: true,       // 显示章节指示器
      highlightCurrent: true     // 高亮当前章节
    },

    // 阅读时间预估
    readingTime: {
      enabled: true,             // 启用阅读时间
      wordsPerMinute: 300,       // 阅读速度
      showEstimate: true,        // 显示预估时间
      countDown: true            // 倒计时模式
    },

    // 行为配置
    behavior: {
      autoHide: false,           // 自动隐藏
      hideDelay: 2000,           // 隐藏延迟
      smoothScroll: true,        // 平滑滚动
      updateInterval: 100        // 更新间隔
    }
  };

  // ==================== 进度条管理器 ====================
  const ProgressBar = {
    element: null,
    isVisible: false,
    currentProgress: 0,
    targetProgress: 0,

    create: function() {
      if (this.element) return this.element;

      const progressBar = document.createElement('div');
      progressBar.className = 'zt-reading-progress';
      progressBar.innerHTML = `
        <div class="zt-progress-bar">
          <div class="zt-progress-fill"></div>
        </div>
        ${ReadingProgressConfig.progressBar.showPercentage ?
          '<div class="zt-progress-percentage">0%</div>' : ''}
      `;

      document.body.appendChild(progressBar);
      this.element = progressBar;

      return progressBar;
    },

    show: function() {
      if (!this.element) {
        this.create();
      }

      this.element.style.display = 'block';
      this.isVisible = true;
    },

    hide: function() {
      if (this.element) {
        this.element.style.display = 'none';
      }
      this.isVisible = false;
    },

    update: function(progress) {
      if (!this.element) return;

      this.targetProgress = progress;

      if (ReadingProgressConfig.progressBar.animation === 'smooth') {
        this.animateProgress(progress);
      } else {
        this.setProgress(progress);
      }
    },

    setProgress: function(progress) {
      this.currentProgress = progress;

      const fill = this.element.querySelector('.zt-progress-fill');
      if (fill) {
        fill.style.width = `${progress}%`;
      }

      const percentage = this.element.querySelector('.zt-progress-percentage');
      if (percentage) {
        percentage.textContent = `${Math.round(progress)}%`;
      }

      // 颜色变化
      if (progress >= 100) {
        this.setCompleteColor();
      } else {
        this.setDefaultColor();
      }
    },

    animateProgress: function(target) {
      const start = this.currentProgress;
      const diff = target - start;
      const duration = 300;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (diff * easeOutQuart);

        this.setProgress(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.setProgress(target);
        }
      };

      requestAnimationFrame(animate);
    },

    setDefaultColor: function() {
      const fill = this.element.querySelector('.zt-progress-fill');
      const config = ReadingProgressConfig.progressBar.colors;

      if (config.gradient) {
        fill.style.background = `linear-gradient(90deg, ${config.default}, ${config.complete})`;
      } else {
        fill.style.background = config.default;
      }
    },

    setCompleteColor: function() {
      const fill = this.element.querySelector('.zt-progress-fill');
      fill.style.background = ReadingProgressConfig.progressBar.colors.complete;
    },

    getHeight: function() {
      return ReadingProgressConfig.progressBar.height;
    },

    getPosition: function() {
      return ReadingProgressConfig.progressBar.position;
    }
  };

  // ==================== 章节追踪器 ====================
  const ChapterTracker = {
    chapters: [],
    currentChapter: null,
    chapterIndicators: [],

    init: function() {
      if (!ReadingProgressConfig.chapters.enabled) return;

      this.detectChapters();
      this.createIndicators();
      this.trackProgress();
    },

    detectChapters: function() {
      if (!ReadingProgressConfig.chapters.autoDetect) return;

      const article = this.findArticleElement();
      if (!article) return;

      const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');

      this.chapters = Array.from(headings).map((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const weight = ReadingProgressConfig.chapters.markers[`h${level}`] || 10;

        // 生成 ID
        if (!heading.id) {
          heading.id = `zt-chapter-${index}`;
        }

        return {
          id: heading.id,
          element: heading,
          text: heading.textContent.trim(),
          level: level,
          weight: weight,
          position: heading.offsetTop
        };
      });
    },

    findArticleElement: function() {
      // 尝试找到文章容器
      const selectors = [
        'article',
        '.post-content',
        '.entry-content',
        '.article-content',
        '[itemprop="articleBody"]',
        'main'
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) return element;
      }

      return document.body;
    },

    createIndicators: function() {
      if (!ReadingProgressConfig.chapters.showIndicator) return;

      const container = document.createElement('div');
      container.className = 'zt-chapter-indicators';
      container.innerHTML = `
        <div class="zt-chapter-list"></div>
      `;

      document.body.appendChild(container);
      this.indicatorContainer = container;

      this.renderIndicators();
    },

    renderIndicators: function() {
      if (!this.indicatorContainer) return;

      const list = this.indicatorContainer.querySelector('.zt-chapter-list');
      if (!list) return;

      list.innerHTML = this.chapters.map((chapter, index) => `
        <div class="zt-chapter-item" data-chapter="${chapter.id}">
          <div class="zt-chapter-dot"></div>
          <div class="zt-chapter-tooltip">${chapter.text}</div>
        </div>
      `).join('');

      // 添加点击事件
      list.querySelectorAll('.zt-chapter-item').forEach(item => {
        item.addEventListener('click', () => {
          const chapterId = item.getAttribute('data-chapter');
          this.scrollToChapter(chapterId);
        });
      });
    },

    trackProgress: function() {
      window.addEventListener('scroll', () => {
        this.updateCurrentChapter();
      });
    },

    updateCurrentChapter: function() {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      let currentChapter = null;

      for (const chapter of this.chapters) {
        if (scrollPos >= chapter.position) {
          currentChapter = chapter;
        } else {
          break;
        }
      }

      if (currentChapter && currentChapter !== this.currentChapter) {
        this.currentChapter = currentChapter;
        this.highlightChapter(currentChapter.id);

        // 播报章节变化（可访问性）
        if (window.ztAnnounceToScreenReader) {
          ztAnnounceToScreenReader(`进入章节：${currentChapter.text}`, 'polite');
        }
      }
    },

    highlightChapter: function(chapterId) {
      if (!this.indicatorContainer) return;

      const items = this.indicatorContainer.querySelectorAll('.zt-chapter-item');
      items.forEach(item => {
        if (item.getAttribute('data-chapter') === chapterId) {
          item.classList.add('zt-chapter-active');
        } else {
          item.classList.remove('zt-chapter-active');
        }
      });
    },

    scrollToChapter: function(chapterId) {
      const element = document.getElementById(chapterId);
      if (element) {
        const offset = 80; // 顶部留出空间
        const position = element.offsetTop - offset;

        window.scrollTo({
          top: position,
          behavior: ReadingProgressConfig.behavior.smoothScroll ? 'smooth' : 'auto'
        });
      }
    },

    getChapters: function() {
      return this.chapters;
    },

    getCurrentChapter: function() {
      return this.currentChapter;
    }
  };

  // ==================== 阅读时间计算器 ====================
  const ReadingTimeCalculator = {
    totalWords: 0,
    readWords: 0,
    startTime: null,
    remainingTime: null,

    init: function() {
      if (!ReadingProgressConfig.readingTime.enabled) return;

      this.calculateTotalWords();
      this.startTracking();
    },

    calculateTotalWords: function() {
      const article = ChapterTracker.findArticleElement();
      if (!article) return;

      const text = article.innerText || article.textContent;
      // 移除空白字符后按空格分词
      const words = text.trim().split(/\s+/);
      this.totalWords = words.length;
    },

    startTracking: function() {
      this.startTime = Date.now();
      this.trackProgress();
    },

    trackProgress: function() {
      // 根据滚动位置估算已读字数
      window.addEventListener('scroll', () => {
        const progress = ReadingTracker.getProgress();
        this.readWords = Math.floor(this.totalWords * (progress / 100));

        if (ReadingProgressConfig.readingTime.countDown) {
          this.calculateRemainingTime();
        }
      });
    },

    calculateRemainingTime: function() {
      const readTime = (this.readWords / ReadingProgressConfig.readingTime.wordsPerMinute) * 60 * 1000;
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = Math.max(0, readTime - elapsedTime);

      this.remainingTime = remainingTime;
    },

    getEstimate: function() {
      const totalMinutes = this.totalWords / ReadingProgressConfig.readingTime.wordsPerMinute;
      return Math.ceil(totalMinutes);
    },

    getRemainingTime: function() {
      if (!ReadingProgressConfig.readingTime.countDown) {
        return null;
      }

      const minutes = Math.ceil(this.remainingTime / 60 / 1000);
      return minutes;
    },

    getFormattedTime: function() {
      const estimate = this.getEstimate();

      if (estimate < 1) {
        return '少于1分钟';
      } else if (estimate < 60) {
        return `约${estimate}分钟`;
      } else {
        const hours = Math.floor(estimate / 60);
        const minutes = estimate % 60;
        return `约${hours}小时${minutes}分钟`;
      }
    }
  };

  // ==================== 阅读追踪器 ====================
  const ReadingTracker = {
    scrollPosition: 0,
    maxScroll: 0,
    articleTop: 0,
    articleBottom: 0,
    articleHeight: 0,

    init: function() {
      this.calculateDimensions();
      this.trackScroll();

      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        this.calculateDimensions();
      });
    },

    calculateDimensions: function() {
      const article = ChapterTracker.findArticleElement();
      if (!article) {
        // 如果没有找到文章容器，使用整个页面
        this.articleTop = 0;
        this.articleBottom = document.body.scrollHeight;
      } else {
        const rect = article.getBoundingClientRect();
        this.articleTop = window.scrollY + rect.top;
        this.articleBottom = this.articleTop + article.offsetHeight;
      }

      this.articleHeight = this.articleBottom - this.articleTop;
      this.maxScroll = window.scrollY + window.innerHeight;
    },

    trackScroll: function() {
      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.updateProgress();
            ticking = false;
          });
          ticking = true;
        }
      });
    },

    updateProgress: function() {
      this.scrollPosition = window.scrollY;
      const progress = this.getProgress();

      // 更新进度条
      ProgressBar.update(progress);

      // 检查是否需要隐藏/显示
      if (ReadingProgressConfig.progressBar.hideOnTop && progress <= 0) {
        ProgressBar.hide();
      } else if (ReadingProgressConfig.progressBar.hideOnBottom && progress >= 100) {
        // 完成后可以隐藏，也可以保持显示
      } else {
        ProgressBar.show();
      }
    },

    getProgress: function() {
      const viewportHeight = window.innerHeight;
      const scrolled = this.scrollPosition + viewportHeight / 2; // 中点位置
      const relativeScroll = scrolled - this.articleTop;

      let progress = (relativeScroll / this.articleHeight) * 100;

      // 限制在 0-100 范围
      progress = Math.max(0, Math.min(100, progress));

      return progress;
    },

    scrollToProgress: function(percent) {
      const targetScroll = this.articleTop + (this.articleHeight * percent / 100) - window.innerHeight / 2;

      window.scrollTo({
        top: targetScroll,
        behavior: ReadingProgressConfig.behavior.smoothScroll ? 'smooth' : 'auto'
      });
    }
  };

  // ==================== 阅读进度主系统 ====================
  const ReadingProgress = {
    initialized: false,

    init: function() {
      if (this.initialized) return;

      // 检查是否在文章页面
      if (!this.isArticlePage()) {
        console.log('📖 非文章页面，跳过阅读进度初始化');
        return;
      }

      // 初始化各个模块
      ReadingTracker.init();
      ChapterTracker.init();
      ReadingTimeCalculator.init();
      ProgressBar.create();

      this.initialized = true;
      console.log('📖 阅读进度系统已就绪');
    },

    isArticlePage: function() {
      // 检查是否在文章页面
      const isPost = document.body.classList.contains('post-template') ||
                    document.querySelector('.post-header') ||
                    document.querySelector('[itemprop="articleBody"]');

      return isPost;
    },

    show: function() {
      ProgressBar.show();
      if (ChapterTracker.indicatorContainer) {
        ChapterTracker.indicatorContainer.style.display = 'block';
      }
    },

    hide: function() {
      ProgressBar.hide();
      if (ChapterTracker.indicatorContainer) {
        ChapterTracker.indicatorContainer.style.display = 'none';
      }
    },

    getProgress: function() {
      return ReadingTracker.getProgress();
    },

    getChapters: function() {
      return ChapterTracker.getChapters();
    },

    getCurrentChapter: function() {
      return ChapterTracker.getCurrentChapter();
    },

    getReadingTime: function() {
      return ReadingTimeCalculator.getFormattedTime();
    },

    scrollToChapter: function(chapterId) {
      ChapterTracker.scrollToChapter(chapterId);
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.readingProgress = ReadingProgress;
  ZootopiaCore.progressBar = ProgressBar;
  ZootopiaCore.chapterTracker = ChapterTracker;
  ZootopiaCore.readingTime = ReadingTimeCalculator;
  ZootopiaCore.readingProgressConfig = ReadingProgressConfig;

  // ==================== 全局 API ====================
  // 显示阅读进度
  window.ztShowReadingProgress = () => ReadingProgress.show();

  // 隐藏阅读进度
  window.ztHideReadingProgress = () => ReadingProgress.hide();

  // 更新阅读进度
  window.ztUpdateReadingProgress = () => ReadingProgress.updateProgress();

  // 获取阅读进度
  window.ztGetReadingProgress = () => ReadingProgress.getProgress();

  // 获取章节列表
  window.ztGetChapters = () => ReadingProgress.getChapters();

  // 获取当前章节
  window.ztGetCurrentChapter = () => ReadingProgress.getCurrentChapter();

  // 跳转到章节
  window.ztNavigateToChapter = (chapterId) => ReadingProgress.scrollToChapter(chapterId);

  // 获取阅读时间
  window.ztGetReadingTime = () => ReadingProgress.getReadingTime();

  // 滚动到指定进度
  window.ztScrollToProgress = (percent) => ReadingTracker.scrollToProgress(percent);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    ReadingProgress.init();
  });

})();
