/**
 * 疯狂动物城主题 - 成就通知系统
 * Zootopia Theme - Achievement Notification System
 * | 精美的成就解锁通知和庆祝动画
 */

(function() {
  'use strict';

  // 通知类型
  const notificationTypes = {
    levelUp: {
      icon: '🎉',
      title: '升级啦！',
      color: '#FFD700',
      bgGradient: 'linear-gradient(135deg, #FFD700, #F39C12)',
      style: 'premium'
    },
    achievement: {
      icon: '🏆',
      title: '成就解锁！',
      color: '#9B59B6',
      bgGradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)',
      style: 'epic'
    },
    milestone: {
      icon: '⭐',
      title: '里程碑！',
      color: '#2ECC71',
      bgGradient: 'linear-gradient(135deg, #2ECC71, #27AE60)',
      style: 'rare'
    },
    collection: {
      icon: '🃏',
      title: '收集成功！',
      color: '#3498DB',
      bgGradient: 'linear-gradient(135deg, #3498DB, #2980B9)',
      style: 'common'
    },
    discovery: {
      icon: '🗺️',
      title: '新发现！',
      color: '#E67E22',
      bgGradient: 'linear-gradient(135deg, #E67E22, #D35400)',
      style: 'discovery'
    },
    special: {
      icon: '💎',
      title: '特别时刻！',
      color: '#FF6B6B',
      bgGradient: 'linear-gradient(135deg, #FF6B6B, #EE5A24)',
      style: 'legendary'
    }
  };

  // 通知队列
  let notificationQueue = [];
  let isShowingNotification = false;

  // 显示通知
  function showNotification(type, options = {}) {
    const notification = {
      type: type,
      title: options.title || notificationTypes[type].title,
      message: options.message || '',
      icon: options.icon || notificationTypes[type].icon,
      color: options.color || notificationTypes[type].color,
      xp: options.xp || 0,
      reward: options.reward || null,
      duration: options.duration || 4000
    };

    notificationQueue.push(notification);

    // 处理队列
    processQueue();
  }

  // 处理通知队列
  function processQueue() {
    if (isShowingNotification || notificationQueue.length === 0) return;

    const notification = notificationQueue.shift();
    isShowingNotification = true;

    createNotificationElement(notification);
  }

  // 创建通知元素
  function createNotificationElement(notification) {
    const type = notificationTypes[notification.type];
    const config = notification;

    const container = document.createElement('div');
    container.className = `achievement-notification ${config.style}`;
    container.innerHTML = `
      <div class="notification-backdrop"></div>
      <div class="notification-content">
        <div class="notification-header" style="background: ${config.bgGradient}">
          <div class="notification-icon">${config.icon}</div>
          <div class="notification-title">${config.title}</div>
          <button class="notification-close">×</button>
        </div>

        <div class="notification-body">
          <div class="notification-message">${config.message}</div>

          ${config.xp > 0 ? `
            <div class="notification-xp">
              <span class="xp-icon">⭐</span>
              <span class="xp-text">+${config.xp} XP</span>
            </div>
          ` : ''}

          ${config.reward ? `
            <div class="notification-reward">
              <span class="reward-icon">🎁</span>
              <span class="reward-text">${config.reward}</span>
            </div>
          ` : ''}

          ${config.type === 'levelUp' ? `
            <div class="level-reward">
              <div class="level-info">
                <span class="level-icon">📈</span>
                <span class="level-text">等级提升！解锁更多功能</span>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="notification-footer">
          <button class="notification-action-btn" onclick="this.closest('.achievement-notification').remove()">
            太棒了！
          </button>
          <button class="notification-share-btn" onclick="shareAchievement('${config.title}', '${config.message}')">
            分享
          </button>
        </div>

        <div class="notification-confetti">
          ${createConfetti()}
        </div>

        <div class="notification-sparkles">
          ${createSparkles(config.color)}
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // 关闭按钮
    container.querySelector('.notification-close').onclick = () => {
      hideNotification(container);
    };

    // 自动隐藏
    setTimeout(() => {
      if (container.parentElement) {
        hideNotification(container);
      }
    }, config.duration);

    // 播放音效提示
    console.log(`🎵 ${config.title} - ${config.message}`);
  }

  // 隐藏通知
  function hideNotification(container) {
    container.classList.add('notification-hide');

    setTimeout(() => {
      container.remove();
      isShowingNotification = false;

      // 处理下一个通知
      setTimeout(() => {
        processQueue();
      }, 500);
    }, 500);
  }

  // 创建彩纸效果
  function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DFE6E9', '#FF9F43', '#EE5A24'];
    let confetti = '';

    for (let i = 0; i < 30; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;

      confetti += `
        <div class="confetti-piece" style="
          left: ${left}%;
          animation-delay: ${delay}s;
          background: ${color};
          width: ${size}px;
          height: ${size * 0.6}px;
        "></div>
      `;
    }

    return confetti;
  }

  // 创建闪光效果
  function createSparkles(color) {
    let sparkles = '';

    for (let i = 0; i < 12; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const size = Math.random() * 6 + 2;

      sparkles += `
        <div class="sparkle-piece" style="
          top: ${top}%;
          left: ${left}%;
          animation-delay: ${delay}s;
          background: ${color};
          width: ${size}px;
          height: ${size}px;
          box-shadow: 0 0 ${size}px ${color};
        "></div>
      `;
    }

    return sparkles;
  }

  // 分享成就
  function shareAchievement(title, message) {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: message,
        url: window.location.href
      }).catch(console.error);
    } else {
      // 复制到剪贴板
      const shareText = `${title} - ${message} | 疯狂动物城博客 ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        showShareToast('已复制到剪贴板！');
      }).catch(() => {
        showShareToast('复制失败，请手动分享');
      });
    }
  }

  // 显示分享提示
  function showShareToast(message) {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: #2ECC71;
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-weight: bold;
      box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
      z-index: 10010;
      animation: toastSlideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }

  // 成就解锁通知（供其他模块调用）
  window.achievementUnlock = function(achievementId, achievementData) {
    const achievements = {
      'first_post': {
        type: 'milestone',
        title: '第一篇文章',
        message: '你发布了第一篇博客文章！',
        xp: 50,
        reward: '📝 博主徽章'
      },
      'level_5': {
        type: 'levelUp',
        title: 'ZPD实习',
        message: '恭喜升到5级！解锁ZPD实习身份！',
        xp: 200,
        reward: '👮 警章'
      },
      'card_legendary': {
        type: 'special',
        title: '传奇卡牌！',
        message: '你获得了传奇卡牌！这是稀有的收藏！',
        xp: 100,
        reward: '🌟 传奇标记'
      },
      'district_complete': {
        type: 'discovery',
        title: '地区探索完成！',
        message: '你已完全探索一个地区！',
        xp: 150,
        reward: '🗺️ 探险家徽章'
      },
      'task_streak': {
        type: 'achievement',
        title: '连续7天',
        message: '连续7天完成所有任务！',
        xp: 300,
        reward: '🔥 坚持不懈徽章'
      },
      'all_characters': {
        type: 'special',
        title: '角色收集者！',
        message: '你已遇到所有角色！',
        xp: 500,
        reward: '🎭 角色大师'
      }
    };

    const achievement = achievements[achievementId];
    if (achievement) {
      showNotification(achievement.type, achievement);
    }
  };

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#achievement-notification-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'achievement-notification-styles';
    styles.textContent = `
      /* 成就通知 */
      .achievement-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: notificationPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes notificationPop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes notificationSlideOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      .achievement-notification.notification-hide {
        animation: notificationSlideOut 0.5s ease forwards;
      }

      .notification-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: -1;
      }

      .notification-content {
        position: relative;
        width: 400px;
        max-width: 90vw;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      /* 通知头部 */
      .notification-header {
        color: white;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .notification-icon {
        font-size: 32px;
        animation: iconRotate 2s ease infinite;
      }

      @keyframes iconRotate {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
      }

      .notification-title {
        flex: 1;
        font-size: 18px;
        font-weight: bold;
      }

      .notification-close {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }

      .notification-close:hover {
        opacity: 1;
      }

      /* 通知主体 */
      .notification-body {
        padding: 20px;
        text-align: center;
      }

      .notification-message {
        font-size: 16px;
        color: #2D3436;
        margin-bottom: 15px;
        line-height: 1.5;
      }

      .notification-xp,
      .notification-reward,
      .level-reward {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 20px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: bold;
      }

      .notification-xp {
        background: linear-gradient(135deg, rgba(241, 196, 15, 0.2), rgba(243, 156, 18, 0.2));
        color: #F39C12;
      }

      .notification-reward {
        background: linear-gradient(135deg, rgba(155, 89, 182, 0.2), rgba(142, 68, 173, 0.2));
        color: #9B59B6;
      }

      .level-reward {
        background: linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(39, 174, 96, 0.2));
        color: #2ECC71;
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 15px;
      }

      /* 通知底部 */
      .notification-footer {
        display: flex;
        gap: 10px;
        padding: 0 20px 20px;
      }

      .notification-action-btn,
      .notification-share-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .notification-action-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .notification-share-btn {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .notification-action-btn:hover,
      .notification-share-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      /* 彩纸效果 */
      .notification-confetti {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .confetti-piece {
        position: absolute;
        top: 100%;
        animation: confettiFall 3s ease forwards;
      }

      @keyframes confettiFall {
        0% {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }
        100% {
          opacity: 0;
          transform: translateY(100vh) rotate(720deg);
        }
      }

      /* 闪光效果 */
      .notification-sparkles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
      }

      .sparkle-piece {
        position: absolute;
        animation: sparkleFloat 2s ease infinite;
      }

      @keyframes sparkleFloat {
        0%, 100% {
          opacity: 0;
          transform: translateY(0) scale(0);
        }
        50% {
          opacity: 1;
          transform: translateY(-20px) scale(1);
        }
      }

      /* 稀有度样式 */
      .achievement-notification.legendary .notification-content {
        border: 3px solid #FFD700;
      }

      .achievement-notification.legendary .notification-header {
        background: linear-gradient(135deg, #FFD700, #F39C12, #E67E22);
        animation: legendaryGlow 2s ease infinite;
      }

      .achievement-notification.epic .notification-content {
        border: 2px solid #9B59B6;
      }

      .achievement-notification.epic .notification-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        animation: epicGlow 2s ease infinite;
      }

      @keyframes legendaryGlow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }
        50% {
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
        }
      }

      @keyframes epicGlow {
        0%, 100% {
          box-shadow: 0 0 15px rgba(155, 89, 182, 0.5);
        }
        50% {
          box-box-shadow: 0 0 30px rgba(155, 89, 182, 0.8);
        }
      }

      /* 分享提示 */
      .share-toast {
        animation: toastSlideIn 0.3s ease;
      }

      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      @keyframes toastFadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .notification-content {
          width: calc(100vw - 60px);
        }

        .notification-footer {
          flex-direction: column;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化成就通知系统
  function initAchievementNotifications() {
    injectStyles();

    // 监听全局事件
    window.addEventListener('zootopiaLevelUp', (e) => {
      showNotification('levelUp', {
        title: '升级啦！',
        message: `恭喜升到${e.detail.level}级！`,
        xp: e.detail.xp || 100
      });
    });

    window.addEventListener('zootopiaAchievement', (e) => {
      showNotification('achievement', {
        title: '成就解锁！',
        message: e.detail.name,
        xp: e.detail.xp || 50,
        reward: e.detail.reward
      });
    });

    window.addEventListener('zootopiaCollection', (e) => {
      showNotification('collection', {
        title: '收集成功！',
        message: e.detail.message,
        reward: e.detail.item
      });
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAchievementNotifications);
  } else {
    initAchievementNotifications();
  }
})();
