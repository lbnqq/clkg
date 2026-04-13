/**
 * 疯狂动物城主题 - 页脚增强和社交功能
 * Zootopia Theme - Footer Enhancement and Social Features
 */

(function() {
  'use strict';

  // 创建社交分享组件
  function createSocialShare() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'zootopia-social-share';
    shareContainer.innerHTML = `
      <div class="share-title">分享到动物城各区域：</div>
      <div class="share-buttons">
        <a href="#" class="share-btn share-weibo" title="分享到微博">
          <span class="share-icon">📱</span>
          <span class="share-name">微博</span>
        </a>
        <a href="#" class="share-btn share-wechat" title="分享到微信">
          <span class="share-icon">💬</span>
          <span class="share-name">微信</span>
        </a>
        <a href="#" class="share-btn share-qq" title="分享到QQ">
          <span class="share-icon">🐧</span>
          <span class="share-name">QQ</span>
        </a>
        <a href="#" class="share-btn share-qzone" title="分享到QQ空间">
          <span class="share-icon">🌟</span>
          <span class="share-name">空间</span>
        </a>
        <a href="#" class="share-btn share-twitter" title="分享到Twitter">
          <span class="share-icon">🐦</span>
          <span class="share-name">Twitter</span>
        </a>
        <a href="#" class="share-btn share-facebook" title="分享到Facebook">
          <span class="share-icon">📘</span>
          <span class="share-name">Facebook</span>
        </a>
      </div>
    `;

    shareContainer.style.cssText = `
      position: fixed;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 9996;
      min-width: 60px;
      transition: all 0.3s ease;
    `;

    // 收起/展开功能
    let isCollapsed = true;
    shareContainer.onmouseenter = () => {
      if (isCollapsed) {
        shareContainer.style.minWidth = '200px';
        shareContainer.querySelector('.share-buttons').style.display = 'block';
        isCollapsed = false;
      }
    };

    shareContainer.onmouseleave = () => {
      setTimeout(() => {
        if (!shareContainer.matches(':hover')) {
          shareContainer.style.minWidth = '60px';
          shareContainer.querySelector('.share-buttons').style.display = 'none';
          isCollapsed = true;
        }
      }, 300);
    };

    // 初始收起状态
    const buttons = shareContainer.querySelector('.share-buttons');
    buttons.style.cssText = `
      display: none;
      margin-top: 15px;
      flex-direction: column;
      gap: 10px;
    `;

    return shareContainer;
  }

  // 创建回到顶部按钮
  function createBackToTop() {
    const btn = document.createElement('div');
    btn.className = 'zootopia-back-to-top';
    btn.innerHTML = `
      <span class="back-icon">🐰</span>
      <span class="back-text">TOP</span>
    `;

    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 5px 20px rgba(255, 159, 67, 0.4);
      z-index: 9997;
      opacity: 0;
      transition: all 0.3s ease;
      font-size: 12px;
    `;

    // 滚动显示/隐藏
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.transform = 'scale(1)';
      } else {
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0.8)';
      }
    });

    // 点击回到顶部
    btn.onclick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return btn;
  }

  // 创建阅读进度条
  function createReadingProgress() {
    const progress = document.createElement('div');
    progress.className = 'zootopia-reading-progress';
    progress.innerHTML = '<div class="progress-fill"></div>';

    progress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(0, 0, 0, 0.1);
      z-index: 10000;
      pointer-events: none;
    `;

    const fill = progress.querySelector('.progress-fill');
    fill.style.cssText = `
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #FF9F43, #0ABDE3, #10AC84);
      transition: width 0.1s ease;
    `;

    // 更新进度
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      fill.style.width = `${scrollPercent}%`;
    });

    return progress;
  }

  // 创建友情链接面板
  function createFriendLinks() {
    const friends = [
      { name: '官方博客', url: 'https://disney.com', emoji: '🏰' },
      { name: 'Hexo', url: 'https://hexo.io', emoji: '⚡' },
      { name: 'Butterfly', url: 'https://butterfly.js.org', emoji: '🦋' },
      { name: 'GitHub', url: 'https://github.com', emoji: '🐙‍♂️' }
    ];

    const panel = document.createElement('div');
    panel.className = 'zootopia-friends-panel';
    panel.innerHTML = `
      <div class="friends-header">
        <span class="friends-icon">🤝</span>
        <span class="friends-title">友好链接</span>
        <button class="friends-toggle">+</button>
      </div>
      <div class="friends-list">
        ${friends.map(f => `
          <a href="${f.url}" target="_blank" class="friend-link">
            <span class="friend-emoji">${f.emoji}</span>
            <span class="friend-name">${f.name}</span>
          </a>
        `).join('')}
      </div>
    `;

    panel.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border-radius: 15px;
      padding: 15px 25px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 9996;
    `;

    return panel;
  }

  // 创建随机提示框
  function createRandomTips() {
    const tips = [
      { emoji: '💡', text: '提示：点击右下角🎮可以玩小游戏哦！' },
      { emoji: '🎁', text: '提示：收集Pawpsicle有惊喜！' },
      { emoji: '🎨', text: '提示：点击左下角可以切换地区主题色！' },
      { emoji: '📸', text: '提示：每个地区都有独特的拍照点！' },
      { emoji: '🚇', text: '提示：查看地铁攻略了解更多交通信息！' },
      { emoji: '🎵', text: '提示：Gazelle的演唱会不要错过！' },
      { emoji: '🐰', text: 'Judy说：Try Everything!' },
      { emoji: '🦊', text: 'Nick说：It's called a hustle!' }
    ];

    // 每30秒显示一个提示
    setInterval(() => {
      const tip = tips[Math.floor(Math.random() * tips.length)];
      showToast(tip.emoji, tip.text);
    }, 30000);

    // 初始显示一个提示
    setTimeout(() => {
      showToast(tips[0].emoji, tips[0].text);
    }, 5000);
  }

  // 显示提示框
  function showToast(emoji, text) {
    // 移除旧的提示
    const oldToast = document.querySelector('.zootopia-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'zootopia-toast';
    toast.innerHTML = `
      <span class="toast-emoji">${emoji}</span>
      <span class="toast-text">${text}</span>
      <button class="toast-close">×</button>
    `;

    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(255, 159, 67, 0.4);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: toastSlide 0.5s ease;
    `;

    document.body.appendChild(toast);

    // 关闭按钮
    toast.querySelector('.toast-close').onclick = () => toast.remove();

    // 自动消失
    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 8000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#social-enhancement-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'social-enhancement-styles';
    styles.textContent = `
      /* 社交分享按钮 */
      .share-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        transition: all 0.3s ease;
        font-size: 14px;
      }

      .share-btn:hover {
        transform: translateX(5px);
      }

      .share-weibo { background: #E6162D; }
      .share-wechat { background: #07C160; }
      .share-qq { background: #12B7F5; }
      .share-qzone { background: #FFCE00; color: #333; }
      .share-twitter { background: #1DA1F2; }
      .share-facebook { background: #4267B2; }

      /* 回到顶部按钮悬停效果 */
      .zootopia-back-to-top:hover {
        transform: scale(1.2) rotate(360deg) !important;
      }

      .zootopia-back-to-top:hover .back-icon {
        display: none;
      }

      .zootopia-back-to-top:hover .back-text {
        display: block;
      }

      /* 提示框动画 */
      @keyframes toastSlide {
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

      .toast-emoji {
        font-size: 24px;
      }

      .toast-text {
        font-size: 14px;
      }

      .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
      }

      /* 友情链接 */
      .friends-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      .friends-icon {
        font-size: 24px;
      }

      .friends-toggle {
        margin-left: auto;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #FF9F43;
        background: white;
        color: #FF9F43;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .friends-toggle:hover {
        background: #FF9F43;
        color: white;
        transform: rotate(45deg);
      }

      .friend-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        margin: 5px 0;
        border-radius: 8px;
        text-decoration: none;
        color: #333;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
      }

      .friend-link:hover {
        background: #FF9F43;
        color: white;
        transform: translateX(5px);
      }

      .friend-emoji {
        font-size: 20px;
      }

      .friend-name {
        font-size: 14px;
        font-weight: 500;
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化社交功能
  function initSocialFeatures() {
    injectStyles();

    // 延迟添加，确保页面加载完成
    setTimeout(() => {
      // 添加社交分享
      document.body.appendChild(createSocialShare());

      // 添加回到顶部按钮
      document.body.appendChild(createBackToTop());

      // 添加阅读进度条
      document.body.appendChild(createReadingProgress());

      // 添加友情链接
      document.body.appendChild(createFriendLinks());

      // 启动随机提示
      createRandomTips();
    }, 1000);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialFeatures);
  } else {
    initSocialFeatures();
  }
})();
