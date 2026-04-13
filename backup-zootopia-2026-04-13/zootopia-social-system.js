/**
 * 疯狂动物城社交系统（优化版）
 * Zootopia Social System - 统一社交交互管理
 */

(function() {
  'use strict';

  // ==================== 社交管理器 ====================
  const SocialManager = {
    shareConfig: {
      title: document.title,
      url: window.location.href,
      description: '欢迎来到疯狂动物城！',
      image: ''
    },

    init: function() {
      this.initShareButtons();
      this.initEmojiReactions();
      this.initComments();
    },

    initShareButtons: function() {
      // 自动初始化分享按钮
      document.querySelectorAll('[data-zt-share]').forEach(el => {
        const platform = el.getAttribute('data-zt-share');
        ZootopiaCore.events.on(el, 'click', (e) => {
          e.preventDefault();
          this.share(platform);
        });
      });
    },

    share: function(platform) {
      const config = {
        url: encodeURIComponent(this.shareConfig.url),
        title: encodeURIComponent(this.shareConfig.title),
        description: encodeURIComponent(this.shareConfig.description)
      };

      const urls = {
        weibo: `https://service.weibo.com/share/share.php?url=${config.url}&title=${config.title}`,
        wechat: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${config.url}`,
        qq: `https://connect.qq.com/widget/shareqq/index.html?url=${config.url}&title=${config.title}`,
        qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${config.url}`,
        twitter: `https://twitter.com/intent/tweet?url=${config.url}&text=${config.title}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${config.url}`,
        copy: null
      };

      if (platform === 'copy') {
        this.copyToClipboard(this.shareConfig.url);
      } else if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
      }
    },

    copyToClipboard: function(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand('copy');
        this.showToast('链接已复制到剪贴板！');
      } catch (err) {
        this.showToast('复制失败，请手动复制');
      }

      document.body.removeChild(textarea);
    },

    showToast: function(message, duration = 2000) {
      const toast = document.createElement('div');
      toast.className = 'zt-social-toast';
      toast.textContent = message;

      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 24px;
        z-index: 10000;
        font-size: 14px;
      `;

      document.body.appendChild(toast);

      ZootopiaCore.animation.animate(toast, 'slideDown');

      setTimeout(() => {
        toast.classList.add('zt-social-toast-out');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    },

    initEmojiReactions: function() {
      // 自动初始化表情反应
      document.querySelectorAll('[data-zt-emoji-reactions]').forEach(el => {
        this.createEmojiBar(el);
      });
    },

    createEmojiBar: function(container) {
      const emojis = ['👍', '❤️', '😂', '😮', '😢', '🎉'];
      const reactions = this.loadReactions();

      const bar = document.createElement('div');
      bar.className = 'zt-emoji-bar';

      bar.innerHTML = `
        <div class="zt-emoji-list">
          ${emojis.map(emoji => `
            <button class="zt-emoji-btn" data-emoji="${emoji}">
              <span class="zt-emoji-icon">${emoji}</span>
              <span class="zt-emoji-count">${reactions[emoji] || 0}</span>
            </button>
          `).join('')}
        </div>
      `;

      container.appendChild(bar);

      // 绑定事件
      ZootopiaCore.events.delegate(bar, '.zt-emoji-btn', 'click', function() {
        const emoji = this.getAttribute('data-emoji');
        SocialManager.react(emoji, this);
      });
    },

    react: function(emoji, button) {
      // 更新计数
      const countEl = button.querySelector('.zt-emoji-count');
      const currentCount = parseInt(countEl.textContent) || 0;
      const reactions = this.loadReactions();

      // 检查是否已经反应过
      const reacted = button.classList.contains('zt-reacted');

      if (reacted) {
        reactions[emoji] = Math.max(0, (reactions[emoji] || 1) - 1);
        button.classList.remove('zt-reacted');
      } else {
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        button.classList.add('zt-reacted');

        // 动画效果
        ZootopiaCore.animation.animate(button, 'pulse');
        ZootopiaCore.particles.burst(
          event.clientX,
          event.clientY,
          5
        );
      }

      countEl.textContent = reactions[emoji];
      this.saveReactions(reactions);
    },

    loadReactions: function() {
      try {
        const saved = localStorage.getItem('zt_emojiReactions');
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        return {};
      }
    },

    saveReactions: function(reactions) {
      try {
        localStorage.setItem('zt_emojiReactions', JSON.stringify(reactions));
      } catch (e) {
        console.warn('无法保存表情反应');
      }
    },

    initComments: function() {
      // 自动初始化评论区
      document.querySelectorAll('[data-zt-comments]').forEach(el => {
        this.createCommentSection(el);
      });
    },

    createCommentSection: function(container) {
      const section = document.createElement('div');
      section.className = 'zt-comment-section';

      section.innerHTML = `
        <div class="zt-comment-header">
          <h3>💬 评论</h3>
          <span class="zt-comment-count">0 条评论</span>
        </div>
        <div class="zt-comment-form">
          <textarea class="zt-comment-input" placeholder="说点什么吧..." rows="3"></textarea>
          <div class="zt-comment-actions">
            <button class="zt-comment-submit">发表评论</button>
          </div>
        </div>
        <div class="zt-comment-list" id="zt-comment-list"></div>
      `;

      container.appendChild(section);

      // 绑定事件
      const submitBtn = section.querySelector('.zt-comment-submit');
      ZootopiaCore.events.on(submitBtn, 'click', () => {
        this.submitComment(section);
      });

      // 加载评论
      this.loadComments(section);
    },

    submitComment: function(section) {
      const input = section.querySelector('.zt-comment-input');
      const content = input.value.trim();

      if (!content) {
        this.showToast('请输入评论内容');
        return;
      }

      const comment = {
        id: Date.now(),
        content: content,
        author: '访客',
        avatar: ZootopiaCore.utils.random(Object.values(ZootopiaCore.characters)).emoji,
        time: new Date().toLocaleString(),
        likes: 0
      };

      // 添加到列表
      this.addCommentToList(section, comment);

      // 保存
      this.saveComment(comment);

      // 清空输入
      input.value = '';

      this.showToast('评论发表成功！');
    },

    addCommentToList: function(section, comment) {
      const list = section.querySelector('#zt-comment-list');
      const commentEl = this.createCommentElement(comment);

      list.insertBefore(commentEl, list.firstChild);
      this.updateCommentCount(section);
    },

    createCommentElement: function(comment) {
      const el = document.createElement('div');
      el.className = 'zt-comment';
      el.setAttribute('data-comment-id', comment.id);

      el.innerHTML = `
        <div class="zt-comment-avatar">${comment.avatar}</div>
        <div class="zt-comment-content">
          <div class="zt-comment-header">
            <span class="zt-comment-author">${comment.author}</span>
            <span class="zt-comment-time">${comment.time}</span>
          </div>
          <div class="zt-comment-text">${comment.content}</div>
          <div class="zt-comment-actions">
            <button class="zt-comment-like" data-id="${comment.id}">
              <span>👍</span>
              <span class="zt-like-count">${comment.likes}</span>
            </button>
            <button class="zt-comment-reply">回复</button>
          </div>
        </div>
      `;

      // 绑定事件
      ZootopiaCore.events.delegate(el, '.zt-comment-like', 'click', function() {
        SocialManager.likeComment(comment.id, this);
      });

      return el;
    },

    likeComment: function(commentId, button) {
      const countEl = button.querySelector('.zt-like-count');
      const currentCount = parseInt(countEl.textContent) || 0;

      countEl.textContent = currentCount + 1;
      button.classList.add('zt-liked');

      // 动画
      ZootopiaCore.animation.animate(button, 'pulse');

      // 保存
      const comments = this.loadComments();
      const comment = comments.find(c => c.id === commentId);
      if (comment) {
        comment.likes = currentCount + 1;
        this.saveComments(comments);
      }
    },

    loadComments: function(section) {
      const comments = this.loadCommentsFromStorage();
      const list = section.querySelector('#zt-comment-list');

      comments.forEach(comment => {
        const commentEl = this.createCommentElement(comment);
        list.appendChild(commentEl);
      });

      this.updateCommentCount(section);
    },

    loadCommentsFromStorage: function() {
      try {
        const saved = localStorage.getItem('zt_comments');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    },

    saveComment: function(comment) {
      const comments = this.loadCommentsFromStorage();
      comments.unshift(comment);
      this.saveComments(comments);
    },

    saveComments: function(comments) {
      try {
        localStorage.setItem('zt_comments', JSON.stringify(comments.slice(0, 50))); // 只保存最近50条
      } catch (e) {
        console.warn('无法保存评论');
      }
    },

    updateCommentCount: function(section) {
      const count = section.querySelectorAll('.zt-comment').length;
      section.querySelector('.zt-comment-count').textContent = `${count} 条评论`;
    }
  };

  // ==================== 分享按钮组件 ====================
  const ShareButtons = {
    create: function(options = {}) {
      const container = document.createElement('div');
      container.className = 'zt-share-buttons';

      const platforms = [
        { id: 'weibo', name: '微博', icon: '🌐', color: '#E6162D' },
        { id: 'wechat', name: '微信', icon: '💬', color: '#09BB07' },
        { id: 'qq', name: 'QQ', icon: '🐧', color: '#12B7F5' },
        { id: 'qzone', name: 'QQ空间', icon: '🌟', color: '#FECB2F' },
        { id: 'copy', name: '复制链接', icon: '🔗', color: '#666' }
      ];

      container.innerHTML = platforms.map(p => `
        <button class="zt-share-btn" data-zt-share="${p.id}" style="--zt-share-color: ${p.color}">
          <span class="zt-share-icon">${p.icon}</span>
          <span class="zt-share-name">${p.name}</span>
        </button>
      `).join('');

      if (options.vertical) {
        container.classList.add('zt-share-vertical');
      }

      return container;
    }
  };

  // ==================== 表情反应组件 ====================
  const EmojiReactions = {
    create: function(options = {}) {
      const container = document.createElement('div');
      container.className = 'zt-emoji-reactions';

      const emojis = options.emojis || ['👍', '❤️', '😂', '😮', '😢', '🎉'];
      const reactions = SocialManager.loadReactions();

      container.innerHTML = `
        <div class="zt-emoji-trigger">
          <button class="zt-emoji-toggle">
            <span>👍</span>
            <span class="zt-emoji-total">${Object.values(reactions).reduce((a, b) => a + b, 0)}</span>
          </button>
        </div>
        <div class="zt-emoji-dropdown">
          ${emojis.map(emoji => `
            <button class="zt-emoji-item" data-emoji="${emoji}" title="${emoji}">
              <span>${emoji}</span>
              <small>${reactions[emoji] || 0}</small>
            </button>
          `).join('')}
        </div>
      `;

      // 切换下拉菜单
      const toggle = container.querySelector('.zt-emoji-toggle');
      const dropdown = container.querySelector('.zt-emoji-dropdown');

      ZootopiaCore.events.on(toggle, 'click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('zt-emoji-show');
      });

      // 点击外部关闭
      ZootopiaCore.events.on(document, 'click', () => {
        dropdown.classList.remove('zt-emoji-show');
      });

      // 选择表情
      ZootopiaCore.events.delegate(container, '.zt-emoji-item', 'click', function() {
        const emoji = this.getAttribute('data-emoji');
        SocialManager.react(emoji, this);
        dropdown.classList.remove('zt-emoji-show');
      });

      return container;
    }
  };

  // ==================== 评论组件 ====================
  const CommentWidget = {
    create: function(options = {}) {
      const container = document.createElement('div');
      container.className = 'zt-comment-widget';

      container.innerHTML = `
        <div class="zt-comment-header">
          <h3>💬 评论</h3>
          <button class="zt-comment-expand">展开</button>
        </div>
        <div class="zt-comment-body" style="display: none;">
          <div class="zt-comment-input-area">
            <textarea class="zt-comment-textarea" placeholder="说点什么吧..."></textarea>
            <div class="zt-comment-toolbar">
              <button class="zt-comment-submit">发表</button>
            </div>
          </div>
          <div class="zt-comment-list-area"></div>
        </div>
      `;

      // 展开/收起
      const expandBtn = container.querySelector('.zt-comment-expand');
      const body = container.querySelector('.zt-comment-body');

      ZootopiaCore.events.on(expandBtn, 'click', () => {
        const isExpanded = body.style.display !== 'none';
        body.style.display = isExpanded ? 'none' : 'block';
        expandBtn.textContent = isExpanded ? '展开' : '收起';
      });

      // 提交评论
      const submitBtn = container.querySelector('.zt-comment-submit');
      ZootopiaCore.events.on(submitBtn, 'click', () => {
        const textarea = container.querySelector('.zt-comment-textarea');
        if (textarea.value.trim()) {
          SocialManager.submitComment(container);
          textarea.value = '';
        }
      });

      // 加载评论
      SocialManager.loadComments(container);

      return container;
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.social = SocialManager;
  ZootopiaCore.ShareButtons = ShareButtons;
  ZootopiaCore.EmojiReactions = EmojiReactions;
  ZootopiaCore.CommentWidget = CommentWidget;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    SocialManager.init();
    console.log('💬 Zootopia 社交系统已加载');
  });

  // ==================== 工具函数 ====================
  // 快捷创建分享按钮
  window.ztCreateShareButtons = function(options) {
    return ShareButtons.create(options);
  };

  // 快捷创建表情反应
  window.ztCreateEmojiReactions = function(options) {
    return EmojiReactions.create(options);
  };

  // 快捷创建评论组件
  window.ztCreateCommentWidget = function(options) {
    return CommentWidget.create(options);
  };

})();
