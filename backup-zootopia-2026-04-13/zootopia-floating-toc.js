/**
 * 疯狂动物城悬浮目录系统
 * Zootopia Floating Table of Contents - 智能文章目录导航
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const TOCConfig = {
    // 目录配置
    toc: {
      position: 'right-bottom',    // right-bottom, right-middle, left-bottom
      width: 280,                  // 目录宽度
      maxHeight: 400,              // 最大高度
      autoCollapse: true,          // 自动折叠
      initiallyCollapsed: false,   // 初始折叠状态
      showToggle: true,            // 显示切换按钮
      showProgress: true,          // 显示阅读进度
      smoothScroll: true,          // 平滑滚动
      offset: 80                   // 滚动偏移
    },

    // 标题提取
    headings: {
      selectors: 'h1, h2, h3, h4', // 要提取的标题
      minLevel: 2,                 // 最小级别
      maxLevel: 4,                 // 最大级别
      excludePattern: '',          // 排除模式
      generateIds: true,           // 自动生成 ID
      idPrefix: 'zt-heading-'      // ID 前缀
    },

    // 样式配置
    style: {
      theme: 'zootopia',           // zootopia, minimal, modern
      icon: '🦊',                  // 目录图标
      animation: true,             // 启用动画
      shadow: true,                // 阴影效果
      borderRadius: 12             // 圆角大小
    },

    // 行为配置
    behavior: {
      highlightOnScroll: true,     // 滚动时高亮
      hideOnMobile: false,         // 移动端隐藏
      showOnHover: false,          // 悬停显示
      autoHide: false,             // 自动隐藏
      hideDelay: 3000              // 隐藏延迟
    }
  };

  // ==================== 标题提取器 ====================
  const HeadingExtractor = {
    headings: [],

    init: function() {
      this.findArticleElement();
      this.extractHeadings();
      this.ensureIds();
    },

    findArticleElement: function() {
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
        if (element) {
          this.articleElement = element;
          return;
        }
      }

      this.articleElement = document.body;
    },

    extractHeadings: function() {
      if (!this.articleElement) return;

      const elements = this.articleElement.querySelectorAll(TOCConfig.headings.selectors);

      this.headings = Array.from(elements)
        .filter(heading => this.shouldInclude(heading))
        .map((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1));
          return {
            element: heading,
            id: heading.id,
            level: level,
            text: heading.textContent.trim(),
            children: [],
            parent: null
          };
        });

      this.buildHierarchy();
    },

    shouldInclude: function(heading) {
      const level = parseInt(heading.tagName.charAt(1));

      // 检查级别范围
      if (level < TOCConfig.headings.minLevel || level > TOCConfig.headings.maxLevel) {
        return false;
      }

      // 检查排除模式
      if (TOCConfig.headings.excludePattern) {
        const pattern = new RegExp(TOCConfig.headings.excludePattern);
        if (pattern.test(heading.textContent)) {
          return false;
        }
      }

      return true;
    },

    ensureIds: function() {
      let idCounter = 0;

      this.headings.forEach(heading => {
        if (!heading.id && TOCConfig.headings.generateIds) {
          heading.id = TOCConfig.headings.idPrefix + (idCounter++);
          heading.element.id = heading.id;
        }
      });
    },

    buildHierarchy: function() {
      const stack = [];
      const root = [];

      this.headings.forEach(heading => {
        // 弹出比当前级别高的标题
        while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
          stack.pop();
        }

        // 设置父子关系
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          parent.children.push(heading);
          heading.parent = parent;
        } else {
          root.push(heading);
        }

        stack.push(heading);
      });

      this.hierarchy = root;
    },

    getHeadings: function() {
      return this.headings;
    },

    getHierarchy: function() {
      return this.hierarchy;
    }
  };

  // ==================== 目录渲染器 ====================
  const TOCRenderer = {
    element: null,
    toggleButton: null,
    isCollapsed: false,

    create: function() {
      if (this.element) return this.element;

      const toc = document.createElement('div');
      toc.className = 'zt-floating-toc';
      toc.setAttribute('role', 'navigation');
      toc.setAttribute('aria-label', '文章目录');
      toc.innerHTML = `
        <div class="zt-toc-header">
          <span class="zt-toc-title">${TOCConfig.style.icon} 目录</span>
          ${TOCConfig.toc.showToggle ? `
            <button class="zt-toc-toggle" aria-label="折叠/展开">
              <span class="zt-toc-toggle-icon">▼</span>
            </button>
          ` : ''}
        </div>
        <div class="zt-toc-content">
          <ul class="zt-toc-list"></ul>
        </div>
        ${TOCConfig.toc.showProgress ? `
          <div class="zt-toc-progress">
            <div class="zt-toc-progress-bar"></div>
          </div>
        ` : ''}
      `;

      document.body.appendChild(toc);
      this.element = toc;

      this.attachEvents();
      this.renderList();

      return toc;
    },

    attachEvents: function() {
      // 切换按钮
      if (TOCConfig.toc.showToggle) {
        const toggleBtn = this.element.querySelector('.zt-toc-toggle');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', () => this.toggle());
        }
      }

      // 点击外部关闭（如果是悬停显示模式）
      if (TOCConfig.behavior.showOnHover) {
        document.addEventListener('click', (e) => {
          if (!this.element.contains(e.target)) {
            this.hide();
          }
        });
      }
    },

    renderList: function() {
      const listContainer = this.element.querySelector('.zt-toc-list');
      if (!listContainer) return;

      const headings = HeadingExtractor.getHeadings();

      if (headings.length === 0) {
        listContainer.innerHTML = '<li class="zt-toc-empty">暂无目录</li>';
        return;
      }

      listContainer.innerHTML = this.renderItems(headings);
    },

    renderItems: function(headings, level = 0) {
      return headings.map(heading => {
        const isActive = heading.element.classList.contains('zt-active-heading');
        const hasChildren = heading.children && heading.children.length > 0;

        return `
          <li class="zt-toc-item" data-level="${heading.level}" data-id="${heading.id}">
            <a href="#${heading.id}" class="zt-toc-link ${isActive ? 'zt-toc-active' : ''}">
              <span class="zt-toc-dot"></span>
              <span class="zt-toc-text">${this.escapeHtml(heading.text)}</span>
            </a>
            ${hasChildren ? `
              <ul class="zt-toc-sublist">
                ${this.renderItems(heading.children, level + 1)}
              </ul>
            ` : ''}
          </li>
        `;
      }).join('');
    },

    escapeHtml: function(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    attachLinkEvents: function() {
      const links = this.element.querySelectorAll('.zt-toc-link');

      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const headingId = link.getAttribute('href').substring(1);
          this.scrollToHeading(headingId);
        });
      });
    },

    scrollToHeading: function(headingId) {
      const element = document.getElementById(headingId);
      if (!element) return;

      const offset = TOCConfig.toc.offset;
      const position = element.offsetTop - offset;

      window.scrollTo({
        top: position,
        behavior: TOCConfig.toc.smoothScroll ? 'smooth' : 'auto'
      });

      // 设置焦点（可访问性）
      element.setAttribute('tabindex', '-1');
      element.focus();
    },

    toggle: function() {
      this.isCollapsed = !this.isCollapsed;

      const content = this.element.querySelector('.zt-toc-content');
      const toggleIcon = this.element.querySelector('.zt-toc-toggle-icon');

      if (this.isCollapsed) {
        content.style.display = 'none';
        if (toggleIcon) {
          toggleIcon.textContent = '◀';
        }
        this.element.classList.add('zt-toc-collapsed');
      } else {
        content.style.display = 'block';
        if (toggleIcon) {
          toggleIcon.textContent = '▼';
        }
        this.element.classList.remove('zt-toc-collapsed');
      }
    },

    expand: function() {
      if (this.isCollapsed) {
        this.toggle();
      }
    },

    collapse: function() {
      if (!this.isCollapsed) {
        this.toggle();
      }
    },

    show: function() {
      if (!this.element) {
        this.create();
      }
      this.element.style.display = 'block';
    },

    hide: function() {
      if (this.element) {
        this.element.style.display = 'none';
      }
    },

    updateProgress: function(progress) {
      if (!TOCConfig.toc.showProgress) return;

      const progressBar = this.element.querySelector('.zt-toc-progress-bar');
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    },

    highlightCurrent: function(headingId) {
      // 移除所有高亮
      this.element.querySelectorAll('.zt-toc-active').forEach(item => {
        item.classList.remove('zt-toc-active');
      });

      // 添加当前高亮
      const currentLink = this.element.querySelector(`.zt-toc-link[href="#${headingId}"]`);
      if (currentLink) {
        currentLink.classList.add('zt-toc-active');

        // 确保可见
        this.ensureVisible(currentLink);
      }
    },

    ensureVisible: function(element) {
      const content = this.element.querySelector('.zt-toc-content');
      if (!content) return;

      const elementTop = element.offsetTop;
      const contentTop = content.scrollTop;
      const contentHeight = content.clientHeight;
      const elementHeight = element.offsetHeight;

      if (elementTop < contentTop) {
        content.scrollTop = elementTop;
      } else if (elementTop + elementHeight > contentTop + contentHeight) {
        content.scrollTop = elementTop - contentHeight + elementHeight;
      }
    }
  };

  // ==================== 滚动监听器 ====================
  const ScrollListener = {
    headings: [],
    currentHeading: null,
    ticking: false,

    init: function() {
      this.headings = HeadingExtractor.getHeadings();
      this.observeHeadings();
      this.trackScroll();
    },

    observeHeadings: function() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const heading = this.headings.find(h => h.id === entry.target.id);
            if (heading) {
              entry.target.classList.add('zt-in-view');
            }
          } else {
            entry.target.classList.remove('zt-in-view');
          }
        });
      }, {
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0
      });

      this.headings.forEach(heading => {
        if (heading.element) {
          observer.observe(heading.element);
        }
      });

      this.observer = observer;
    },

    trackScroll: function() {
      window.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateCurrentHeading();
            this.ticking = false;
          });
          this.ticking = true;
        }
      });
    },

    updateCurrentHeading: function() {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      let currentHeading = null;

      for (const heading of this.headings) {
        if (heading.element) {
          const position = heading.element.offsetTop;

          if (scrollPos >= position) {
            currentHeading = heading;
          } else {
            break;
          }
        }
      }

      if (currentHeading && currentHeading !== this.currentHeading) {
        this.currentHeading = currentHeading;

        // 更新目录高亮
        FloatingTOC.highlightCurrent(currentHeading.id);

        // 清除旧的高亮
        this.headings.forEach(h => {
          if (h.element) {
            h.element.classList.remove('zt-active-heading');
          }
        });

        // 添加新高亮
        if (currentHeading.element) {
          currentHeading.element.classList.add('zt-active-heading');
        }
      }
    }
  };

  // ==================== 悬浮目录主系统 ====================
  const FloatingTOC = {
    initialized: false,
    isVisible: false,

    init: function() {
      if (this.initialized) return;

      // 检查是否在文章页面
      if (!this.isArticlePage()) {
        console.log('📑 非文章页面，跳过目录初始化');
        return;
      }

      // 初始化各个模块
      HeadingExtractor.init();
      TOCRenderer.create();
      TOCRenderer.attachLinkEvents();

      // 如果启用滚动高亮
      if (TOCConfig.behavior.highlightOnScroll) {
        ScrollListener.init();
      }

      // 移动端处理
      if (TOCConfig.behavior.hideOnMobile && this.isMobile()) {
        TOCRenderer.hide();
      }

      this.initialized = true;
      console.log('📑 悬浮目录系统已就绪');
    },

    isArticlePage: function() {
      const isPost = document.body.classList.contains('post-template') ||
                    document.querySelector('.post-header') ||
                    document.querySelector('[itemprop="articleBody"]');

      // 检查是否有足够的标题
      const hasHeadings = document.querySelectorAll(TOCConfig.headings.selectors).length >= 3;

      return isPost && hasHeadings;
    },

    isMobile: function() {
      return window.innerWidth < 768;
    },

    show: function() {
      TOCRenderer.show();
      this.isVisible = true;
    },

    hide: function() {
      TOCRenderer.hide();
      this.isVisible = false;
    },

    toggle: function() {
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
      }
    },

    refresh: function() {
      HeadingExtractor.init();
      TOCRenderer.renderList();
      TOCRenderer.attachLinkEvents();
    },

    highlightCurrent: function(headingId) {
      TOCRenderer.highlightCurrent(headingId);
    },

    updateProgress: function(progress) {
      TOCRenderer.updateProgress(progress);
    },

    getHeadings: function() {
      return HeadingExtractor.getHeadings();
    },

    navigateTo: function(headingId) {
      TOCRenderer.scrollToHeading(headingId);
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.floatingTOC = FloatingTOC;
  ZootopiaCore.headingExtractor = HeadingExtractor;
  ZootopiaCore.tocRenderer = TOCRenderer;
  ZootopiaCore.tocConfig = TOCConfig;

  // ==================== 全局 API ====================
  // 显示目录
  window.ztShowTableOfContents = () => FloatingTOC.show();

  // 隐藏目录
  window.ztHideTableOfContents = () => FloatingTOC.hide();

  // 切换目录
  window.ztToggleTableOfContents = () => FloatingTOC.toggle();

  // 刷新目录
  window.ztRefreshTableOfContents = () => FloatingTOC.refresh();

  // 跳转到章节
  window.ztNavigateToSection = (sectionId) => FloatingTOC.navigateTo(sectionId);

  // 获取标题列表
  window.ztGetHeadings = () => FloatingTOC.getHeadings();

  // 展开目录
  window.ztExpandTOC = () => TOCRenderer.expand();

  // 折叠目录
  window.ztCollapseTOC = () => TOCRenderer.collapse();

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    FloatingTOC.init();
  });

})();
