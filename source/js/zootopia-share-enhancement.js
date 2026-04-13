/**
 * 疯狂动物城分享功能增强系统
 * Zootopia Share Enhancement
 *
 * 社交分享优化、引用链接生成、分享卡片预览
 */

(function() {
  'use strict';

  const ShareConfig = {
    // 社交平台
    platforms: {
      weibo: {
        name: '微博',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20c-4.47 0-8.098-1.92-8.098-4.286 0-2.366 3.628-4.285 8.098-4.285s8.098 1.919 8.098 4.285c0 2.366-3.628 4.286-8.098 4.286zm0-6.429c-3.086 0-5.59 1.256-5.59 2.857s2.504 2.857 5.59 2.857 5.59-1.256 5.59-2.857-2.504-2.857-5.59-2.857z"/></svg>',
        shareUrl: (url, title) => `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
      },
      wechat: {
        name: '微信',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.78 2.888c-.1.37.377.65.72.55l3.597-1.666a.58.58 0 01.435-.058 10.97 10.97 0 002.503.28c4.8 0 8.691-3.287 8.691-7.342 0-4.054-3.89-7.341-8.69-7.341zM5.785 10.09a1.03 1.03 0 110-2.058 1.03 1.03 0 010 2.057zm5.812 0a1.03 1.03 0 110-2.058 1.03 1.03 0 010 2.057zm12.133-5.293c-2.482 0-4.726 1.336-6.094 3.402a9.702 9.702 0 011.969-.204c4.8 0 8.691 3.287 8.691 7.342 0 .638-.076 1.254-.213 1.84 1.526-1.247 2.66-2.86 2.66-4.746 0-3.966-3.338-7.188-7.464-7.188a8.986 8.986 0 00-1.55.14zm-1.252 2.772a.86.86 0 110 1.718.86.86 0 010-1.718zm4.929 0a.86.86 0 110 1.718.86.86 0 010-1.718z"/></svg>',
        type: 'qrcode'
      },
      twitter: {
        name: 'Twitter',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
        shareUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
      },
      facebook: {
        name: 'Facebook',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      },
      linkedin: {
        name: 'LinkedIn',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        shareUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
      },
      copy: {
        name: '复制链接',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',
        type: 'copy'
      }
    },

    // 引用生成
    citation: {
      format: '{title} - {author} - {url}',
      includeDate: true
    },

    // 分享卡片
    card: {
      enabled: true,
      position: 'bottom-right',
      showOnHover: true
    }
  };

  /**
   * 分享增强管理器
   */
  const ShareEnhancement = {
    /**
     * 初始化
     */
    init: function() {
      this.createShareButton();
      this.setupShareCard();
    },

    /**
     * 创建分享按钮
     */
    createShareButton: function() {
      // 查找文章内容区域
      const article = document.querySelector('article.post') || document.querySelector('.post-content') || document.querySelector('.article-content');

      if (!article) return;

      // 创建分享按钮容器
      const shareContainer = document.createElement('div');
      shareContainer.className = 'zt-share-container';
      shareContainer.innerHTML = `
        <div class="zt-share-label">分享这篇文章</div>
        <div class="zt-share-buttons">
          ${this.generateShareButtons()}
        </div>
      `;

      // 插入到文章内容后面
      article.appendChild(shareContainer);

      // 附加事件
      this.attachShareEvents(shareContainer);
    },

    /**
     * 生成分享按钮
     */
    generateShareButtons: function() {
      const url = window.location.href;
      const title = document.title;

      return Object.entries(ShareConfig.platforms).map(([key, platform]) => {
        return `
          <button class="zt-share-btn zt-share-${key}"
                  data-platform="${key}"
                  title="${platform.name}">
            <span class="zt-share-icon">${platform.icon}</span>
            <span class="zt-share-name">${platform.name}</span>
          </button>
        `;
      }).join('');
    },

    /**
     * 附加分享事件
     */
    attachShareEvents: function(container) {
      container.querySelectorAll('.zt-share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const platform = btn.dataset.platform;
          this.share(platform);
        });
      });
    },

    /**
     * 执行分享
     */
    share: function(platform) {
      const config = ShareConfig.platforms[platform];
      const url = window.location.href;
      const title = document.title;

      if (config.type === 'copy') {
        this.copyLink(url);
      } else if (config.type === 'qrcode') {
        this.showQRCode(url);
      } else if (config.shareUrl) {
        const shareUrl = config.shareUrl(url, title);
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    },

    /**
     * 复制链接
     */
    copyLink: function(url) {
      navigator.clipboard.writeText(url).then(() => {
        if (window.ztNotify) {
          ztNotify({
            type: 'success',
            message: '链接已复制到剪贴板',
            duration: 2000
          });
        }
      }).catch(() => {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        if (window.ztNotify) {
          ztNotify({
            type: 'success',
            message: '链接已复制到剪贴板',
            duration: 2000
          });
        }
      });
    },

    /**
     * 显示二维码
     */
    showQRCode: function(url) {
      // 创建二维码容器
      const modal = document.createElement('div');
      modal.className = 'zt-qrcode-modal';
      modal.innerHTML = `
        <div class="zt-qrcode-content">
          <button class="zt-qrcode-close" aria-label="关闭">×</button>
          <div class="zt-qrcode-title">扫码分享</div>
          <div class="zt-qrcode-image">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}" alt="二维码">
          </div>
          <div class="zt-qrcode-url">${url}</div>
        </div>
      `;

      document.body.appendChild(modal);

      // 显示动画
      setTimeout(() => modal.classList.add('zt-qrcode-visible'), 10);

      // 关闭事件
      modal.querySelector('.zt-qrcode-close').addEventListener('click', () => {
        this.closeQRCode(modal);
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeQRCode(modal);
        }
      });
    },

    /**
     * 关闭二维码
     */
    closeQRCode: function(modal) {
      modal.classList.remove('zt-qrcode-visible');
      setTimeout(() => modal.remove(), 300);
    },

    /**
     * 设置分享卡片
     */
    setupShareCard: function() {
      if (!ShareConfig.card.enabled) return;

      const card = document.createElement('div');
      card.className = `zt-share-card zt-share-card-${ShareConfig.card.position}`;
      card.innerHTML = `
        <button class="zt-share-card-toggle" title="分享">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          </svg>
        </button>
        <div class="zt-share-card-menu">
          ${this.generateShareButtons()}
        </div>
      `;

      document.body.appendChild(card);

      // 切换菜单
      const toggle = card.querySelector('.zt-share-card-toggle');
      toggle.addEventListener('click', () => {
        card.classList.toggle('zt-share-card-open');
      });

      // 点击外部关闭
      document.addEventListener('click', (e) => {
        if (!card.contains(e.target)) {
          card.classList.remove('zt-share-card-open');
        }
      });

      // 悬浮显示
      if (ShareConfig.card.showOnHover) {
        card.addEventListener('mouseenter', () => {
          card.classList.add('zt-share-card-open');
        });

        card.addEventListener('mouseleave', () => {
          card.classList.remove('zt-share-card-open');
        });
      }

      // 附加菜单内按钮事件
      this.attachShareEvents(card);
    },

    /**
     * 生成引用文本
     */
    generateCitation: function() {
      const url = window.location.href;
      const title = document.title;
      const author = document.querySelector('.post-author')?.textContent || document.querySelector('meta[name="author"]')?.content || '';
      const date = new Date().toLocaleDateString('zh-CN');

      let citation = ShareConfig.citation.format
        .replace('{title}', title)
        .replace('{author}', author)
        .replace('{url}', url);

      if (ShareConfig.citation.includeDate) {
        citation += ` (${date})`;
      }

      return citation;
    },

    /**
     * 复制引用
     */
    copyCitation: function() {
      const citation = this.generateCitation();

      navigator.clipboard.writeText(citation).then(() => {
        if (window.ztNotify) {
          ztNotify({
            type: 'success',
            message: '引用已复制到剪贴板',
            duration: 2000
          });
        }
      });
    }
  };

  // 导出 API
  ZootopiaCore.shareEnhancement = ShareEnhancement;
  ZootopiaCore.shareConfig = ShareConfig;

  // 全局 API
  window.ztShare = (platform) => ShareEnhancement.share(platform);
  window.ztCopyCitation = () => ShareEnhancement.copyCitation();
  window.ztGenerateCitation = () => ShareEnhancement.generateCitation();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    ShareEnhancement.init();
  });

})();
