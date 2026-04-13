/**
 * 疯狂动物城主题 - 社交分享系统
 * Zootopia Theme - Social Share System
 * | 动物城风格的分享和评论功能
 */

(function() {
  'use strict';

  // 分享平台配置
  const sharePlatforms = {
    weibo: {
      name: '新浪微博',
      icon: '📱',
      color: '#E6162D',
      url: 'https://service.weibo.com/share/share.php'
    },
    wechat: {
      name: '微信',
      icon: '💬',
      color: '#07C160',
      url: 'javascript:void(0);'
    },
    qq: {
      name: 'QQ',
      icon: '🐧',
      color: '#1296DB',
      url: 'https://connect.qq.com/widget/shareqq/index.html'
    },
    qzone: {
      name: 'QQ空间',
      icon: '🌟',
      color: '#FECE00',
      url: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'
    },
    douban: {
      name: '豆瓣',
      icon: '📖',
      color: '#007722',
      url: 'https://www.douban.com/share/service'
    },
    twitter: {
      name: 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      url: 'https://twitter.com/intent/tweet'
    },
    facebook: {
      name: 'Facebook',
      icon: '👥',
      color: '#1877F2',
      url: 'https://www.facebook.com/sharer/sharer.php'
    },
    telegram: {
      name: 'Telegram',
      icon: '✈️',
      color: '#0088CC',
      url: 'https://t.me/share/url'
    }
  };

  // 动物城角色评论头像
  const characterAvatars = [
    { name: '朱迪', emoji: '🐰', color: '#FF9F43' },
    { name: '尼克', emoji: '🦊', color: '#E67E22' },
    { name: '闪电', emoji: '🐢', color: '#2ECC71' },
    { name: '博戈局长', emoji: '🦁', color: '#F39C12' },
    { name: '本杰明', emoji: '🐆', color: '#3498DB' },
    { name: 'Mr. Big', emoji: '🐀', color: '#9B59B6' },
    { name: '芬尼克', emoji: '🦊', color: '#D35400' },
    { name: '绵羊副市长', emoji: '🐑', color: '#ECF0F1' }
  ];

  // 评论数据
  let comments = [];

  // 创建分享按钮组件
  function createShareButtons() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'zootopia-share-container';
    shareContainer.innerHTML = `
      <button class="share-toggle" id="shareToggle">
        <span class="toggle-icon">📤</span>
        <span class="toggle-text">分享</span>
      </button>
      <div class="share-panel" id="sharePanel">
        <div class="panel-header">
          <span class="panel-title">🌍 分享到动物城</span>
          <button class="panel-close">×</button>
        </div>
        <div class="share-platforms">
          ${Object.entries(sharePlatforms).map(([key, platform]) => `
            <button class="share-btn ${key}-btn" data-platform="${key}" style="background: ${platform.color}">
              <span class="btn-icon">${platform.icon}</span>
              <span class="btn-name">${platform.name}</span>
            </button>
          `).join('')}
        </div>
        <div class="share-link">
          <div class="link-input-group">
            <input type="text" class="link-input" id="shareLinkInput" readonly>
            <button class="copy-btn" id="copyShareLink">复制链接</button>
          </div>
        </div>
      </div>
    `;

    return shareContainer;
  }

  // 分享到指定平台
  function shareToPlatform(platform, url, title, description) {
    const platformData = sharePlatforms[platform];
    if (!platformData) return;

    if (platform === 'wechat') {
      // 微信分享显示二维码
      showWeChatQRCode(url);
      return;
    }

    const shareUrl = new URL(platformData.url);
    const params = {
      url: url,
      title: title || document.title,
      summary: description || getPageDescription(),
      pics: getShareImage()
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        shareUrl.searchParams.set(key, value);
      }
    });

    window.open(shareUrl.toString(), '_blank', 'width=600,height=400');
  }

  // 获取页面描述
  function getPageDescription() {
    const metaDesc = document.querySelector('meta[name="description"]');
    return metaDesc ? metaDesc.content : `来自疯狂动物城博客的精彩内容！`;
  }

  // 获取分享图片
  function getShareImage() {
    const ogImage = document.querySelector('meta[property="og:image"]');
    return ogImage ? ogImage.content : '';
  }

  // 显示微信二维码
  function showWeChatQRCode(url) {
    const qrModal = document.createElement('div');
    qrModal.className = 'wechat-qr-modal';
    qrModal.innerHTML = `
      <div class="qr-backdrop"></div>
      <div class="qr-content">
        <div class="qr-header">
          <span class="qr-title">微信扫一扫</span>
          <button class="qr-close">×</button>
        </div>
        <div class="qr-code-container" id="qrCodeContainer">
          <div class="qr-loading">生成中...</div>
        </div>
        <div class="qr-description">使用微信扫描二维码分享</div>
      </div>
    `;

    document.body.appendChild(qrModal);

    // 使用在线API生成二维码
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    const container = document.getElementById('qrCodeContainer');
    container.innerHTML = `<img src="${qrUrl}" alt="二维码" class="qr-image">`;

    // 关闭按钮
    qrModal.querySelector('.qr-close').onclick = () => qrModal.remove();
    qrModal.querySelector('.qr-backdrop').onclick = () => qrModal.remove();
  }

  // 创建评论组件
  function createCommentSystem() {
    const commentSection = document.createElement('div');
    commentSection.className = 'zootopia-comment-section';
    commentSection.innerHTML = `
      <div class="comment-header">
        <span class="comment-title">💬 动物城评论</span>
        <span class="comment-count" id="commentCount">0 条评论</span>
      </div>

      <div class="comment-input-area">
        <div class="avatar-selector" id="avatarSelector">
          <div class="selected-avatar" id="selectedAvatar">
            <span class="avatar-emoji">🐰</span>
          </div>
          <button class="avatar-toggle-btn" id="avatarToggleBtn">更换头像</button>
        </div>
        <div class="comment-input-wrapper">
          <textarea class="comment-input" id="commentInput" placeholder="来说点什么吧..." rows="3"></textarea>
          <div class="input-tools">
            <button class="tool-btn emoji-btn" title="表情">😊</button>
            <button class="tool-btn preview-btn" title="预览">👁️</button>
            <span class="char-count" id="charCount">0/500</span>
          </div>
        </div>
        <button class="submit-btn" id="submitComment">发表评论</button>
      </div>

      <div class="avatar-panel" id="avatarPanel">
        <div class="panel-header">选择你的角色</div>
        <div class="avatar-grid">
          ${characterAvatars.map((avatar, index) => `
            <button class="avatar-option ${index === 0 ? 'selected' : ''}" data-index="${index}">
              <span class="avatar-emoji">${avatar.emoji}</span>
              <span class="avatar-name">${avatar.name}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="emoji-picker" id="emojiPicker">
        <div class="emoji-grid">
          ${['😊', '😂', '🥰', '😍', '🤔', '😎', '🎉', '👍', '❤️', '🔥', '⭐', '💯', '🐰', '🦊', '🐢', '🦁'].map(emoji => `
            <button class="emoji-btn" data-emoji="${emoji}">${emoji}</button>
          `).join('')}
        </div>
      </div>

      <div class="comment-list" id="commentList">
        <div class="empty-state">
          <span class="empty-icon">💬</span>
          <span class="empty-text">还没有评论，快来抢沙发吧！</span>
        </div>
      </div>

      <div class="comment-sort" id="commentSort">
        <button class="sort-btn active" data-sort="newest">最新</button>
        <button class="sort-btn" data-sort="oldest">最早</button>
        <button class="sort-btn" data-sort="hot">最热</button>
      </div>
    `;

    return commentSection;
  }

  // 当前选中的头像
  let selectedAvatarIndex = 0;

  // 提交评论
  function submitComment() {
    const input = document.getElementById('commentInput');
    const content = input.value.trim();

    if (!content) {
      alert('请输入评论内容！');
      return;
    }

    const comment = {
      id: Date.now(),
      content: content,
      avatar: characterAvatars[selectedAvatarIndex],
      author: characterAvatars[selectedAvatarIndex].name,
      timestamp: new Date().toISOString(),
      likes: 0
    };

    comments.push(comment);
    saveComments();
    renderComments();

    input.value = '';
    updateCharCount();

    // 显示成功提示
    showNotification('评论发表成功！');
  }

  // 保存评论到本地存储
  function saveComments() {
    localStorage.setItem('zootopiaComments', JSON.stringify(comments));
  }

  // 加载评论
  function loadComments() {
    const saved = localStorage.getItem('zootopiaComments');
    if (saved) {
      comments = JSON.parse(saved);
    }
  }

  // 渲染评论列表
  function renderComments(sortType = 'newest') {
    const listContainer = document.getElementById('commentList');
    const countElement = document.getElementById('commentCount');

    if (!listContainer) return;

    countElement.textContent = `${comments.length} 条评论`;

    if (comments.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">💬</span>
          <span class="empty-text">还没有评论，快来抢沙发吧！</span>
        </div>
      `;
      return;
    }

    // 排序评论
    let sortedComments = [...comments];
    switch (sortType) {
      case 'newest':
        sortedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        sortedComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'hot':
        sortedComments.sort((a, b) => b.likes - a.likes);
        break;
    }

    listContainer.innerHTML = sortedComments.map(comment => `
      <div class="comment-item" data-id="${comment.id}">
        <div class="comment-avatar" style="background: ${comment.avatar.color}">
          <span class="avatar-emoji">${comment.avatar.emoji}</span>
        </div>
        <div class="comment-body">
          <div class="comment-meta">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-time">${formatTime(comment.timestamp)}</span>
          </div>
          <div class="comment-content">${comment.content}</div>
          <div class="comment-actions">
            <button class="action-btn like-btn" data-id="${comment.id}">
              <span class="btn-icon">👍</span>
              <span class="btn-count">${comment.likes}</span>
            </button>
            <button class="action-btn reply-btn" data-id="${comment.id}">
              <span class="btn-icon">💬</span>
              <span class="btn-text">回复</span>
            </button>
            <button class="action-btn delete-btn" data-id="${comment.id}">
              <span class="btn-icon">🗑️</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // 绑定事件
    listContainer.querySelectorAll('.like-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        likeComment(id);
      };
    });

    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.id);
        if (confirm('确定删除这条评论吗？')) {
          deleteComment(id);
        }
      };
    });
  }

  // 点赞评论
  function likeComment(id) {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      comment.likes++;
      saveComments();
      renderComments();
    }
  }

  // 删除评论
  function deleteComment(id) {
    comments = comments.filter(c => c.id !== id);
    saveComments();
    renderComments();
  }

  // 格式化时间
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) {
      return '刚刚';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`;
    } else if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)}天前`;
    } else {
      return date.toLocaleDateString();
    }
  }

  // 更新字符计数
  function updateCharCount() {
    const input = document.getElementById('commentInput');
    const count = document.getElementById('charCount');
    if (input && count) {
      const length = input.value.length;
      count.textContent = `${length}/500`;
      count.className = length > 450 ? 'char-count warning' : 'char-count';
    }
  }

  // 显示通知
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.innerHTML = `
      <span class="notification-icon">✅</span>
      <span class="notification-message">${message}</span>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #2ECC71, #27AE60);
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
      z-index: 10000;
      animation: notificationSlideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'notificationSlideOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#social-share-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'social-share-styles';
    styles.textContent = `
      /* 分享容器 */
      .zootopia-share-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9998;
      }

      .share-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 15px 25px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
        transition: all 0.3s ease;
      }

      .share-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
      }

      .toggle-icon {
        font-size: 20px;
      }

      .share-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 320px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
      }

      .share-panel.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .panel-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 15px 20px;
        border-radius: 20px 20px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-title {
        font-size: 14px;
        font-weight: bold;
      }

      .panel-close {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .share-platforms {
        padding: 15px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .share-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .share-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .share-link {
        padding: 15px;
        border-top: 1px solid #ECF0F1;
      }

      .link-input-group {
        display: flex;
        gap: 10px;
      }

      .link-input {
        flex: 1;
        padding: 10px 15px;
        border: 2px solid #ECF0F1;
        border-radius: 10px;
        font-size: 13px;
        background: #F8F9FA;
      }

      .copy-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
      }

      /* 微信二维码 */
      .wechat-qr-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10001;
        display: block;
      }

      .qr-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }

      .qr-content {
        position: relative;
        width: 300px;
        margin: 100px auto;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }

      .qr-header {
        background: #07C160;
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .qr-close {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .qr-code-container {
        padding: 30px;
        text-align: center;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .qr-image {
        width: 200px;
        height: 200px;
      }

      .qr-description {
        padding: 15px;
        text-align: center;
        font-size: 14px;
        color: #636E72;
      }

      /* 评论系统 */
      .zootopia-comment-section {
        margin: 30px 0;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .comment-header {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
        padding: 20px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .comment-title {
        font-size: 18px;
        font-weight: bold;
      }

      .comment-count {
        font-size: 14px;
        opacity: 0.9;
      }

      .comment-input-area {
        padding: 25px;
        display: flex;
        gap: 20px;
      }

      .avatar-selector {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .selected-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF9F43, #F39C12);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.3);
      }

      .avatar-emoji {
        font-size: 32px;
      }

      .avatar-toggle-btn {
        padding: 6px 12px;
        background: #ECF0F1;
        border: none;
        border-radius: 15px;
        font-size: 12px;
        color: #636E72;
        cursor: pointer;
      }

      .avatar-toggle-btn:hover {
        background: #D5DBDB;
      }

      .comment-input-wrapper {
        flex: 1;
      }

      .comment-input {
        width: 100%;
        padding: 15px;
        border: 2px solid #ECF0F1;
        border-radius: 15px;
        font-size: 14px;
        font-family: inherit;
        resize: vertical;
        min-height: 80px;
      }

      .comment-input:focus {
        outline: none;
        border-color: #74B9FF;
      }

      .input-tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }

      .tool-btn {
        padding: 6px 12px;
        background: transparent;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .tool-btn:hover {
        background: #ECF0F1;
      }

      .char-count {
        font-size: 12px;
        color: #636E72;
      }

      .char-count.warning {
        color: #E74C3C;
      }

      .submit-btn {
        padding: 15px 30px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
        border: none;
        border-radius: 15px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        height: fit-content;
        align-self: flex-start;
      }

      .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
      }

      .avatar-panel {
        padding: 20px;
        border-top: 1px solid #ECF0F1;
        display: none;
      }

      .avatar-panel.active {
        display: block;
      }

      .avatar-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }

      .avatar-option {
        padding: 15px;
        background: #F8F9FA;
        border: 2px solid transparent;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .avatar-option:hover {
        background: #E9ECEF;
      }

      .avatar-option.selected {
        border-color: #74B9FF;
        background: rgba(116, 185, 255, 0.1);
      }

      .emoji-picker {
        padding: 15px;
        border-top: 1px solid #ECF0F1;
        display: none;
      }

      .emoji-picker.active {
        display: block;
      }

      .emoji-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 5px;
      }

      .emoji-btn {
        padding: 8px;
        background: transparent;
        border: none;
        border-radius: 8px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .emoji-btn:hover {
        background: #ECF0F1;
        transform: scale(1.2);
      }

      .comment-list {
        padding: 0 25px 25px;
      }

      .empty-state {
        text-align: center;
        padding: 40px;
        color: #636E72;
      }

      .empty-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .empty-text {
        font-size: 14px;
      }

      .comment-item {
        display: flex;
        gap: 15px;
        padding: 20px 0;
        border-bottom: 1px solid #ECF0F1;
      }

      .comment-item:last-child {
        border-bottom: none;
      }

      .comment-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .comment-body {
        flex: 1;
      }

      .comment-meta {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .comment-author {
        font-weight: bold;
        color: #2D3436;
      }

      .comment-time {
        font-size: 12px;
        color: #636E72;
      }

      .comment-content {
        color: #2D3436;
        line-height: 1.6;
        margin-bottom: 10px;
      }

      .comment-actions {
        display: flex;
        gap: 15px;
      }

      .action-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;
        background: transparent;
        border: none;
        border-radius: 15px;
        font-size: 13px;
        color: #636E72;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .action-btn:hover {
        background: #ECF0F1;
        color: #2D3436;
      }

      .comment-sort {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 15px 25px;
        border-top: 1px solid #ECF0F1;
      }

      .sort-btn {
        padding: 8px 16px;
        background: transparent;
        border: 1px solid #ECF0F1;
        border-radius: 15px;
        font-size: 13px;
        color: #636E72;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .sort-btn.active {
        background: #74B9FF;
        border-color: #74B9FF;
        color: white;
      }

      /* 动画 */
      @keyframes notificationSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes notificationSlideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-share-container {
          right: 15px;
          bottom: 15px;
        }

        .share-toggle {
          padding: 12px 20px;
          font-size: 14px;
        }

        .share-panel {
          width: calc(100vw - 30px);
        }

        .comment-input-area {
          flex-direction: column;
        }

        .avatar-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .emoji-grid {
          grid-template-columns: repeat(6, 1fr);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化社交分享
  function initSocialShare() {
    injectStyles();

    // 创建分享按钮
    const shareContainer = createShareButtons();
    document.body.appendChild(shareContainer);

    // 设置分享链接
    const shareLink = document.getElementById('shareLinkInput');
    if (shareLink) {
      shareLink.value = window.location.href;
    }

    // 切换面板
    const toggleBtn = document.getElementById('shareToggle');
    const panel = document.getElementById('sharePanel');

    toggleBtn.onclick = () => {
      panel.classList.toggle('active');
    };

    // 关闭面板
    document.querySelector('.panel-close').onclick = () => {
      panel.classList.remove('active');
    };

    // 分享按钮
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.onclick = () => {
        const platform = btn.dataset.platform;
        shareToPlatform(
          platform,
          window.location.href,
          document.title,
          getPageDescription()
        );
      };
    });

    // 复制链接
    document.getElementById('copyShareLink').onclick = () => {
      shareLink.select();
      document.execCommand('copy');
      showNotification('链接已复制到剪贴板！');
    };

    // 点击外部关闭面板
    document.addEventListener('click', (e) => {
      if (!shareContainer.contains(e.target)) {
        panel.classList.remove('active');
      }
    });
  }

  // 初始化评论系统
  function initCommentSystem() {
    loadComments();
    injectStyles();

    // 找到文章内容区域，插入评论组件
    const articleContent = document.querySelector('.article-content, .post-content, main');
    if (articleContent) {
      const commentSection = createCommentSystem();
      articleContent.appendChild(commentSection);

      // 绑定事件
      document.getElementById('submitComment').onclick = submitComment;
      document.getElementById('avatarToggleBtn').onclick = () => {
        document.getElementById('avatarPanel').classList.toggle('active');
      };

      document.querySelectorAll('.avatar-option').forEach(option => {
        option.onclick = () => {
          selectedAvatarIndex = parseInt(option.dataset.index);
          document.querySelectorAll('.avatar-option').forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');

          const avatar = characterAvatars[selectedAvatarIndex];
          document.querySelector('.selected-avatar').innerHTML = `<span class="avatar-emoji">${avatar.emoji}</span>`;
          document.querySelector('.selected-avatar').style.background = avatar.color;
          document.getElementById('avatarPanel').classList.remove('active');
        };
      });

      document.getElementById('commentInput').addEventListener('input', updateCharCount);

      document.querySelector('.emoji-btn').onclick = () => {
        document.getElementById('emojiPicker').classList.toggle('active');
      };

      document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.onclick = () => {
          const input = document.getElementById('commentInput');
          input.value += btn.dataset.emoji;
          updateCharCount();
          document.getElementById('emojiPicker').classList.remove('active');
        };
      });

      document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderComments(btn.dataset.sort);
        };
      });

      renderComments();
    }
  }

  // 导出全局函数
  window.zootopiaSocial = {
    share: shareToPlatform,
    addComment: (content) => {
      comments.push({
        id: Date.now(),
        content: content,
        avatar: characterAvatars[selectedAvatarIndex],
        author: characterAvatars[selectedAvatarIndex].name,
        timestamp: new Date().toISOString(),
        likes: 0
      });
      saveComments();
      renderComments();
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSocialShare();
      initCommentSystem();
    });
  } else {
    initSocialShare();
    initCommentSystem();
  }
})();
