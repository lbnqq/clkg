/**
 * 疯狂动物城SEO优化系统
 * Zootopia SEO Optimizer
 *
 * 结构化数据，元标签优化，搜索引擎友好
 */

(function() {
  'use strict';

  const SEOConfig = {
    // 结构化数据
    structuredData: {
      enabled: true,
      types: ['WebSite', 'Article', 'BreadcrumbList', 'Organization']
    },

    // 元标签
    metaTags: {
      enabled: true,
      description: true,
      keywords: true,
      ogTags: true,
      twitterCards: true
    },

    // 链接优化
    linkOptimization: {
      enabled: true,
      canonical: true,
      alternate: true,
      prevNext: true
    },

    // Sitemap
    sitemap: {
      enabled: true,
      autoUpdate: true,
      priority: {
        home: 1.0,
        posts: 0.9,
        pages: 0.8,
        categories: 0.7,
        tags: 0.6
      }
    },

    // Robots.txt
    robots: {
      enabled: true,
      disallow: ['/admin/', '/api/'],
      allow: []
    }
  };

  /**
   * SEO优化管理器
   */
  const SEOOptimizer = {
    /**
     * 初始化
     */
    init: function() {
      if (SEOConfig.structuredData.enabled) {
        this.setupStructuredData();
      }

      if (SEOConfig.metaTags.enabled) {
        this.setupMetaTags();
      }

      if (SEOConfig.linkOptimization.enabled) {
        this.setupLinkOptimization();
      }

      this.generateRobotsTxt();
      this.trackSEO();
    },

    /**
     * 设置结构化数据
     */
    setupStructuredData: function() {
      // WebSite结构化数据
      this.addWebSiteSchema();

      // BreadcrumbList结构化数据
      this.addBreadcrumbSchema();

      // Article结构化数据（在文章页面）
      if (this.isPostPage()) {
        this.addArticleSchema();
      }

      // Organization结构化数据
      this.addOrganizationSchema();
    },

    /**
     * 添加WebSite结构化数据
     */
    addWebSiteSchema: function() {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: document.title,
        url: window.location.href,
        potentialAction: {
          '@type': 'SearchAction',
          target: window.location.origin + '/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };

      this.insertSchema(schema);
    },

    /**
     * 添加面包屑结构化数据
     */
    addBreadcrumbSchema: function() {
      const breadcrumbs = this.getBreadcrumbs();
      if (breadcrumbs.length === 0) return;

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url
        }))
      };

      this.insertSchema(schema);
    },

    /**
     * 获取面包屑
     */
    getBreadcrumbs: function() {
      const breadcrumbs = [];
      const pathSegments = window.location.pathname.split('/').filter(Boolean);

      // 首页
      breadcrumbs.push({
        name: '首页',
        url: window.location.origin
      });

      // 构建面包屑路径
      let currentPath = '';
      pathSegments.forEach((segment, index) => {
        currentPath += '/' + segment;
        const name = this.capitalize(segment.replace(/-/g, ' '));
        breadcrumbs.push({
          name: name,
          url: window.location.origin + currentPath
        });
      });

      return breadcrumbs;
    },

    /**
     * 添加Article结构化数据
     */
    addArticleSchema: function() {
      const article = this.getArticleData();
      if (!article) return;

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        image: article.image,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: {
          '@type': 'Person',
          name: article.author
        },
        publisher: {
          '@type': 'Organization',
          name: article.publisher,
          logo: {
            '@type': 'ImageObject',
            url: article.logo
          }
        },
        description: article.description
      };

      this.insertSchema(schema);
    },

    /**
     * 获取文章数据
     */
    getArticleData: function() {
      const title = document.querySelector('h1, .post-title, article h1');
      const date = document.querySelector('time, .post-date, article time');
      const author = document.querySelector('.author, .post-author, article .author');
      const content = document.querySelector('.content, .post-content, article');

      if (!title) return null;

      return {
        title: title.textContent.trim(),
        image: this.getMainImage(),
        datePublished: date ? date.getAttribute('datetime') : new Date().toISOString(),
        dateModified: new Date().toISOString(),
        author: author ? author.textContent.trim() : '疯狂动物城',
        publisher: '疯狂动物城博客',
        logo: window.location.origin + '/img/logo.png',
        description: this.getMetaDescription()
      };
    },

    /**
     * 获取主要图片
     */
    getMainImage: function() {
      const img = document.querySelector('.post-content img, article img, .featured-image img');
      return img ? img.src : window.location.origin + '/img/default-og.jpg';
    },

    /**
     * 添加Organization结构化数据
     */
    addOrganizationSchema: function() {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '疯狂动物城博客',
        url: window.location.origin,
        logo: window.location.origin + '/img/logo.png',
        description: '一个关于疯狂动物城的个人博客'
      };

      this.insertSchema(schema);
    },

    /**
     * 插入结构化数据
     */
    insertSchema: function(schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    },

    /**
     * 设置元标签
     */
    setupMetaTags: function() {
      // Description
      if (SEOConfig.metaTags.description) {
        this.updateMetaDescription();
      }

      // Keywords
      if (SEOConfig.metaTags.keywords) {
        this.updateMetaKeywords();
      }

      // Open Graph标签
      if (SEOConfig.metaTags.ogTags) {
        this.setupOpenGraph();
      }

      // Twitter Card标签
      if (SEOConfig.metaTags.twitterCards) {
        this.setupTwitterCards();
      }
    },

    /**
     * 更新描述元标签
     */
    updateMetaDescription: function() {
      const description = this.getMetaDescription();
      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }

      meta.content = description;
    },

    /**
     * 获取描述
     */
    getMetaDescription: function() {
      // 尝试从meta标签获取
      let description = document.querySelector('meta[name="description"]')?.content;

      // 如果没有，从内容生成
      if (!description) {
        const content = document.querySelector('.content, .post-content, article p');
        if (content) {
          description = content.textContent.substring(0, 160).trim();
        }
      }

      return description || document.title;
    },

    /**
     * 更新关键词元标签
     */
    updateMetaKeywords: function() {
      const keywords = this.getKeywords();
      let meta = document.querySelector('meta[name="keywords"]');

      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'keywords';
        document.head.appendChild(meta);
      }

      meta.content = keywords.join(', ');
    },

    /**
     * 获取关键词
     */
    getKeywords: function() {
      const keywords = new Set();

      // 从标签获取
      document.querySelectorAll('.tags a, .tag-list a, [rel="tag"]').forEach(tag => {
        keywords.add(tag.textContent.trim());
      });

      // 从分类获取
      document.querySelectorAll('.categories a, .category-list a').forEach(cat => {
        keywords.add(cat.textContent.trim());
      });

      // 从标题提取关键词
      const titleWords = document.title.split(/\s+/);
      titleWords.forEach(word => {
        if (word.length > 2) {
          keywords.add(word);
        }
      });

      return Array.from(keywords).slice(0, 10);
    },

    /**
     * 设置Open Graph标签
     */
    setupOpenGraph: function() {
      const ogTags = [
        { property: 'og:title', content: document.title },
        { property: 'og:description', content: this.getMetaDescription() },
        { property: 'og:type', content: this.isPostPage() ? 'article' : 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: this.getMainImage() },
        { property: 'og:site_name', content: '疯狂动物城博客' },
        { property: 'og:locale', content: 'zh_CN' }
      ];

      ogTags.forEach(tag => {
        let meta = document.querySelector(`meta[property="${tag.property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', tag.property);
          document.head.appendChild(meta);
        }
        meta.content = tag.content;
      });
    },

    /**
     * 设置Twitter Card标签
     */
    setupTwitterCards: function() {
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: document.title },
        { name: 'twitter:description', content: this.getMetaDescription() },
        { name: 'twitter:image', content: this.getMainImage() }
      ];

      twitterTags.forEach(tag => {
        let meta = document.querySelector(`meta[name="${tag.name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = tag.name;
          document.head.appendChild(meta);
        }
        meta.content = tag.content;
      });
    },

    /**
     * 设置链接优化
     */
    setupLinkOptimization: function() {
      // Canonical链接
      if (SEOConfig.linkOptimization.canonical) {
        this.addCanonicalLink();
      }

      // Alternate链接
      if (SEOConfig.linkOptimization.alternate) {
        this.addAlternateLink();
      }

      // 上下页链接
      if (SEOConfig.linkOptimization.prevNext) {
        this.addPrevNextLinks();
      }
    },

    /**
     * 添加Canonical链接
     */
    addCanonicalLink: function() {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = window.location.href.split('?')[0].split('#')[0];
    },

    /**
     * 添加Alternate链接
     */
    addAlternateLink: function() {
      // 移动版alternate
      let alternate = document.querySelector('link[rel="alternate"][media*="mobile"]');
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.media = 'only screen and (max-width: 640px)';
        document.head.appendChild(alternate);
      }
      alternate.href = window.location.href;
    },

    /**
     * 添加上下页链接
     */
    addPrevNextLinks: function() {
      const prevLink = document.querySelector('a[rel="prev"], .prev-post, .previous-post');
      const nextLink = document.querySelector('a[rel="next"], .next-post, .next-post');

      if (prevLink) {
        let link = document.querySelector('link[rel="prev"]');
        if (!link) {
          link = document.createElement('link');
          link.rel = 'prev';
          document.head.appendChild(link);
        }
        link.href = prevLink.href;
      }

      if (nextLink) {
        let link = document.querySelector('link[rel="next"]');
        if (!link) {
          link = document.createElement('link');
          link.rel = 'next';
          document.head.appendChild(link);
        }
        link.href = nextLink.href;
      }
    },

    /**
     * 生成Robots.txt内容
     */
    generateRobotsTxt: function() {
      if (!SEOConfig.robots.enabled) return;

      const content = [
        'User-agent: *',
        ...SEOConfig.robots.disallow.map(d => `Disallow: ${d}`),
        ...SEOConfig.robots.allow.map(a => `Allow: ${a}`),
        '',
        'Sitemap: ' + window.location.origin + '/sitemap.xml'
      ].join('\n');

      // 这里只是生成内容，实际写入需要后端支持
      return content;
    },

    /**
     * 追踪SEO
     */
    trackSEO: function() {
      // 追踪页面浏览
      this.trackPageView();

      // 追踪滚动深度
      this.trackScrollDepth();
    },

    /**
     * 追踪页面浏览
     */
    trackPageView: function() {
      const seoData = {
        title: document.title,
        url: window.location.href,
        description: this.getMetaDescription(),
        keywords: this.getKeywords(),
        timestamp: Date.now()
      };

      // 存储SEO数据供分析
      this.storeSEOData(seoData);
    },

    /**
     * 追踪滚动深度
     */
    trackScrollDepth: function() {
      const depths = [25, 50, 75, 100];
      const trackedDepths = new Set();

      window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        depths.forEach(depth => {
          if (scrollPercent >= depth && !trackedDepths.has(depth)) {
            trackedDepths.add(depth);
            this.trackScrollDepthEvent(depth);
          }
        });
      });
    },

    /**
     * 追踪滚动深度事件
     */
    trackScrollDepthEvent: function(depth) {
      console.log(`[SEO] 滚动深度: ${depth}%`);
      // 这里可以发送到分析服务
    },

    /**
     * 存储SEO数据
     */
    storeSEOData: function(data) {
      try {
        const seoHistory = JSON.parse(localStorage.getItem('zt_seo_history') || '[]');
        seoHistory.push(data);

        // 只保留最近100条记录
        if (seoHistory.length > 100) {
          seoHistory.shift();
        }

        localStorage.setItem('zt_seo_history', JSON.stringify(seoHistory));
      } catch (e) {
        console.warn('Failed to store SEO data:', e);
      }
    },

    /**
     * 判断是否为文章页面
     */
    isPostPage: function() {
      return !!document.querySelector('article, .post, .post-content');
    },

    /**
     * 首字母大写
     */
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * 获取SEO数据
     */
    getSEOData: function() {
      return {
        title: document.title,
        description: this.getMetaDescription(),
        keywords: this.getKeywords(),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        ogTags: this.getOpenGraphTags(),
        twitterCards: this.getTwitterCardTags()
      };
    },

    /**
     * 获取Open Graph标签
     */
    getOpenGraphTags: function() {
      const tags = {};
      document.querySelectorAll('meta[property^="og:"]').forEach(meta => {
        const property = meta.getAttribute('property');
        tags[property] = meta.content;
      });
      return tags;
    },

    /**
     * 获取Twitter Card标签
     */
    getTwitterCardTags: function() {
      const tags = {};
      document.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
        const name = meta.getAttribute('name');
        tags[name] = meta.content;
      });
      return tags;
    }
  };

  // 导出 API
  ZootopiaCore.seoOptimizer = SEOOptimizer;
  ZootopiaCore.seoConfig = SEOConfig;

  // 全局 API
  window.ztGetSEOData = () => SEOOptimizer.getSEOData();
  window.ztUpdateMeta = () => {
    SEOOptimizer.setupMetaTags();
    SEOOptimizer.setupLinkOptimization();
  };

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    SEOOptimizer.init();
    console.log('🔍 SEO优化系统已就绪');
  });

})();
