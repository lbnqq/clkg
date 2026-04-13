/**
 * 疯狂动物城主题 - 表情回复系统
 * Zootopia Theme - Emoji Reaction System
 | 文章评论的表情点赞和互动系统
 */

(function() {
  'use strict';

  // 动物城主题表情
  const zootopiaEmojis = [
    { emoji: '🐰', name: 'Judy点赞', color: '#A17F68' },
    { emoji: '🦊', name: 'Nick赞', color: '#E67E22' },
    { emoji: '🐢', name: 'Flash慢', color: '#27AE60' },
    { emoji: '🦁', name: 'Bogo威严', color: '#2C3E50' },
    { emoji: '🦆', name: 'Ben热情', color: '#3498DB' },
    { emoji: '🐑', name: 'Bellwether', color: '#95A5A6' },
    { emoji: '🍭', name: 'Pawpsicle', color: '#FF6B6B' },
    { emoji: '🚂', name: '火车', color: '#5F27CD' },
    { emoji: '🌴', name: '雨林', color: '#10AC84' },
    { emoji: '❄️', name: '冰川', color: '#0ABDE3' },
    { emoji: '🏜️', name: '撒哈拉', color: '#FF9F43' },
    { emoji: '🥕', name: '胡萝卜', color: '#FF6B6B' },
    { emoji: '🍩', name: '甜甜圈', color: '#F39C12' },
    { emoji: '🎵', name: '音乐', color: '#9B59B6' },
    { emoji: '⭐', name: '精彩', color: '#F1C40F' },
    { emoji: '❤️', name: '喜欢', color: '#E74C3C' }
  ];

  // 反应统计（从localStorage加载）
  let reactions = JSON.parse(localStorage.getItem('zootopiaReactions')) || {};

  // 为每篇文章创建表情反应栏
  function createReactionBar(postId) {
    const bar = document.createElement('div');
    bar.className = 'zootopia-reaction-bar';
    bar.dataset.postId = postId;

    // 获取当前文章的反应
    const postReactions = reactions[postId] || {};

    bar.innerHTML = `
      <div class="reaction-header">
        <span class="reaction-title">你觉得这篇文章怎么样？</span>
        <span class="reaction-count">共 <span id="totalCount-${postId}">${Object.values(postReactions).reduce((a, b) => a + b, 0)}</span> 人反应</span>
      </div>
      <div class="reactions-list">
        ${zootopiaEmojis.map(item => {
          const count = postReactions[item.emoji] || 0;
          return `
            <button class="reaction-btn ${count > 0 ? 'has-reaction' : ''}" data-emoji="${item.emoji}" data-post="${postId}">
              <span class="reaction-emoji">${item.emoji}</span>
              <span class="reaction-count">${count > 0 ? count : ''}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    // 绑定点击事件
    bar.querySelectorAll('.reaction-btn').forEach(btn => {
      btn.onclick = () => {
        const emoji = btn.dataset.emoji;
        const post = btn.dataset.post;
        handleReaction(post, emoji, btn);
      };
    });

    return bar;
  }

  // 处理表情反应
  function handleReaction(postId, emoji, button) {
    // 初始化文章反应
    if (!reactions[postId]) {
      reactions[postId] = {};
    }

    // 切换反应（如果已有点赞则取消，否则添加）
    if (reactions[postId][emoji]) {
      delete reactions[postId][emoji];
      button.classList.remove('has-reaction');
      button.querySelector('.reaction-count').textContent = '';
    } else {
      reactions[postId][emoji] = (reactions[postId][emoji] || 0) + 1;
      button.classList.add('has-reaction');
      button.querySelector('.reaction-count').textContent = reactions[postId][emoji];

      // 显示反应动画
      showReactionAnimation(emoji, button);
    }

    // 保存到localStorage
    localStorage.setItem('zootopiaReactions', JSON.stringify(reactions));

    // 更新总数
    updateTotalCount(postId);
  }

  // 显示反应动画
  function showReactionAnimation(emoji, button) {
    const rect = button.getBoundingClientRect();

    // 创建浮动表情
    const floatingEmoji = document.createElement('div');
    floatingEmoji.className = 'floating-emoji';
    floatingEmoji.textContent = emoji;
    floatingEmoji.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top}px;
      font-size: 32px;
      z-index: 10002;
      pointer-events: none;
      animation: floatUp 1s ease forwards;
    `;

    document.body.appendChild(floatingEmoji);

    setTimeout(() => floatingEmoji.remove(), 1000);
  }

  // 更新总数
  function updateTotalCount(postId) {
    const postReactions = reactions[postId] || {};
    const total = Object.values(postReactions).reduce((a, b) => a + b, 0);
    const totalCountEl = document.getElementById(`totalCount-${postId}`);
    if (totalCountEl) {
      totalCountEl.textContent = total;
    }
  }

  // 创建全局表情选择器（浮动按钮）
  function createGlobalEmojiPicker() {
    const picker = document.createElement('div');
    picker.className = 'global-emoji-picker';
    picker.innerHTML = `
      <button class="emoji-picker-toggle" title="动物城表情">
        <span class="toggle-icon">😊</span>
      </button>
      <div class="emoji-picker-panel">
        <div class="picker-header">
          <h3>🎭 选择动物城表情</h3>
          <button class="picker-close">×</button>
        </div>
        <div class="emoji-grid">
          ${zootopiaEmojis.map(item => `
            <button class="emoji-option" data-emoji="${item.emoji}" title="${item.name}">
              <span class="emoji-option-emoji">${item.emoji}</span>
              <span class="emoji-option-name">${item.name}</span>
            </button>
          `).join('')}
        </div>
        <div class="picker-footer">
          <span class="footer-text">点击表情复制到剪贴板</span>
        </div>
      </div>
    `;

    // 切换面板
    const toggle = picker.querySelector('.emoji-picker-toggle');
    const panel = picker.querySelector('.emoji-picker-panel');

    toggle.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    };

    // 关闭按钮
    picker.querySelector('.picker-close').onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!picker.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 表情选项点击
    picker.querySelectorAll('.emoji-option').forEach(option => {
      option.onclick = () => {
        const emoji = option.dataset.emoji;
        navigator.clipboard.writeText(emoji).then(() => {
          showToast(emoji, '已复制到剪贴板！');
        });
      };
    });

    return picker;
  }

  // 显示提示
  function showToast(emoji, message) {
    const existingToast = document.querySelector('.emoji-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'emoji-toast';
    toast.innerHTML = `
      <span class="toast-emoji">${emoji}</span>
      <span class="toast-message">${message}</span>
    `;

    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 30px;
      background: linear-gradient(135deg, #00B894, #00CEC9);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0, 184, 148, 0.4);
      z-index: 10003;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: toastSlideIn 0.5s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#emoji-reaction-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'emoji-reaction-styles';
    styles.textContent = `
      /* 文章表情反应栏 */
      .zootopia-reaction-bar {
        margin: 30px 0;
        padding: 20px;
        background: linear-gradient(135deg, rgba(255, 159, 67, 0.1), rgba(238, 90, 36, 0.1));
        border-radius: 15px;
        border: 2px dashed rgba(255, 159, 67, 0.3);
      }

      .reaction-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .reaction-title {
        font-size: 16px;
        font-weight: bold;
        color: #FF9F43;
      }

      .reaction-count {
        font-size: 14px;
        color: #636E72;
      }

      .reactions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .reaction-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 15px;
        background: white;
        border: 2px solid rgba(255, 159, 67, 0.3);
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .reaction-btn:hover {
        background: rgba(255, 159, 67, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 159, 67, 0.3);
      }

      .reaction-btn.has-reaction {
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        border-color: #FF9F43;
        color: white;
      }

      .reaction-emoji {
        font-size: 20px;
      }

      .reaction-count {
        font-size: 14px;
        font-weight: bold;
        min-width: 20px;
      }

      /* 浮动表情动画 */
      @keyframes floatUp {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-50px) scale(1.5);
        }
      }

      /* 全局表情选择器 */
      .global-emoji-picker {
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 9995;
      }

      .emoji-picker-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #F39C12, #E74C3C);
        border: none;
        box-shadow: 0 5px 20px rgba(243, 156, 18, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .emoji-picker-toggle:hover {
        transform: scale(1.1) rotate(-5deg);
        box-shadow: 0 8px 25px rgba(243, 156, 18, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .emoji-picker-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 320px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: pickerSlideUp 0.3s ease;
        overflow: hidden;
      }

      .emoji-picker-panel.show {
        display: block;
      }

      @keyframes pickerSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .picker-header {
        background: linear-gradient(135deg, #F39C12, #E74C3C);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .picker-header h3 {
        margin: 0;
        font-size: 16px;
      }

      .picker-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.8;
      }

      .picker-close:hover {
        opacity: 1;
      }

      .emoji-grid {
        padding: 15px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
      }

      .emoji-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 10px 5px;
        background: rgba(255, 255, 255, 0.8);
        border: 2px solid transparent;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .emoji-option:hover {
        background: rgba(243, 156, 18, 0.1);
        border-color: #F39C12;
        transform: scale(1.1);
      }

      .emoji-option-emoji {
        font-size: 28px;
      }

      .emoji-option-name {
        font-size: 10px;
        color: #636E72;
        text-align: center;
      }

      .picker-footer {
        padding: 10px 15px;
        background: rgba(243, 156, 18, 0.05);
        text-align: center;
      }

      .footer-text {
        font-size: 12px;
        color: #636E72;
      }

      /* 提示框动画 */
      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toastFadeOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .reactions-list {
          gap: 8px;
        }

        .reaction-btn {
          padding: 8px 12px;
        }

        .reaction-emoji {
          font-size: 18px;
        }

        .emoji-picker-panel {
          width: calc(100vw - 80px);
          right: -10px;
        }

        .emoji-grid {
          grid-template-columns: repeat(5, 1fr);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化表情系统
  function initEmojiReactions() {
    injectStyles();

    // 添加全局表情选择器
    document.body.appendChild(createGlobalEmojiPicker());

    // 为每篇文章添加表情反应栏
    // 这里需要等待页面加载完成后找到文章
    setTimeout(() => {
      const posts = document.querySelectorAll('.post-card, .article-item');
      posts.forEach((post, index) => {
        const postId = post.dataset.postId || `post-${index}`;
        const reactionBar = createReactionBar(postId);
        post.appendChild(reactionBar);
      });
    }, 1000);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmojiReactions);
  } else {
    initEmojiReactions();
  }
})();
