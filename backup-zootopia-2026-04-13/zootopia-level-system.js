/**
 * 疯狂动物城主题 - 用户等级系统
 * Zootopia Theme - User Level System
 | 从新手市民到动物城专家的成长系统
 */

(function() {
  'use strict';

  // 等级配置
  const levels = [
    { level: 1, name: '新居民', nameEn: 'Newcomer', emoji: '🐣', xp: 0, color: '#95A5A6', rewards: ['解锁基础功能'] },
    { level: 2, name: '实习生', nameEn: 'Intern', emoji: '📝', xp: 100, color: '#3498DB', rewards: ['解锁Pawpsicle收集'] },
    { level: 3, name: '市民', nameEn: 'Citizen', emoji: '🏙️', xp: 500, color: '#2ECC71', rewards: ['解锁所有地区'] },
    { level: 4, name: '志愿者', nameEn: 'Volunteer', emoji: '🤝', xp: 1000, color: '#F39C12', rewards: ['解锁角色对话'] },
    { level: 5, name: 'ZPD实习', nameEn: 'ZPD Intern', emoji: '👮', xp: 2000, color: '#9B59B6', rewards: ['解锁罚单系统'] },
    { level: 6, name: '警官', nameEn: 'Officer', emoji: '🚔', xp: 5000, color: '#E74C3C', rewards: ['解锁火车站'] },
    { level: 7, name: '侦探', nameEn: 'Detective', emoji: '🔍', xp: 10000, color: '#34495E', rewards: ['解锁关系图'] },
    { level: 8, name: '专家', nameEn: 'Expert', emoji: '🌟', xp: 20000, color: '#F1C40F', rewards: ['解锁卡牌游戏'] },
    { level: 9, name: '大师', nameEn: 'Master', emoji: '👑', xp: 50000, color: '#8E44AD', rewards: ['解锁音乐播放器'] },
    { level: 10, name: '传奇', nameEn: 'Legend', emoji: '🏆', xp: 100000, color: '#FF6B6B', rewards: ['解锁所有功能', '获得传奇徽章'] }
  ];

  // 经验值获取方式
  const xpActions = {
    visit: 5,          // 访问页面
    read: 10,          // 阅读文章
    collect: 20,       // 收集Pawpsicle
    reaction: 15,     // 表情反应
    game: 50,          // 完成游戏
    comment: 25,      // 发表评论
    share: 30,         // 分享文章
    daily: 100        // 每日登录
  };

  // 用户数据
  let userData = JSON.parse(localStorage.getItem('zootopiaUserData')) || {
    xp: 0,
    level: 1,
    actionCount: 0,
    lastVisit: null,
    achievements: []
  };

  // 创建等级显示组件
  function createLevelDisplay() {
    const currentLevel = getCurrentLevel(userData.xp);

    const display = document.createElement('div');
    display.className = 'zootopia-level-display';
    display.innerHTML = `
      <div class="level-header">
        <span class="level-emoji">${currentLevel.emoji}</span>
        <div class="level-info">
          <div class="level-name">${currentLevel.name}</div>
          <div class="level-name-en">${currentLevel.nameEn}</div>
        </div>
        <div class="level-number">Lv.${currentLevel.level}</div>
      </div>
      <div class="level-progress">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${getProgressPercent()}%; background: ${currentLevel.color}"></div>
        </div>
        <div class="progress-text">
          <span>${userData.xp}/${getNextLevelXp()} XP</span>
        </div>
      </div>
    `;

    return display;
  }

  // 获取当前等级
  function getCurrentLevel(xp) {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (xp >= levels[i].xp) {
        return levels[i];
      }
    }
    return levels[0];
  }

  // 获取下一等级所需经验
  function getNextLevelXp() {
    const currentLevel = getCurrentLevel(userData.xp);
    const nextLevelIndex = levels.findIndex(l => l.level === currentLevel.level);
    if (nextLevelIndex < levels.length - 1) {
      return levels[nextLevelIndex + 1].xp;
    }
    return currentLevel.xp;
  }

  // 获取进度百分比
  function getProgressPercent() {
    const currentLevel = getCurrentLevel(userData.xp);
    const prevLevelXp = currentLevel.xp;
    const nextLevelXp = getNextLevelXp();
    const progress = ((userData.xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100;
    return Math.min(100, Math.max(0, progress));
  }

  // 添加经验值
  function addXP(amount, source) {
    const oldLevel = getCurrentLevel(userData.xp);
    userData.xp += amount;
    userData.actionCount++;

    const newLevel = getCurrentLevel(userData.xp);

    // 保存数据
    saveUserData();

    // 更新显示
    updateLevelDisplay();

    // 检查升级
    if (newLevel.level > oldLevel.level) {
      showLevelUp(newLevel);
    }

    // 显示获得经验提示
    showXPGain(amount, source);
  }

  // 显示升级动画
  function showLevelUp(level) {
    const levelUpNotice = document.createElement('div');
    levelUpNotice.className = 'level-up-notice';
    levelUpNotice.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">🎉</div>
        <div class="level-up-title">升级啦！</div>
        <div class="level-up-new">
          <span class="new-emoji">${level.emoji}</span>
          <span class="new-level">${level.name}</span>
        </div>
        <div class="level-up-rewards">
          解锁：${level.rewards.join('、')}
        </div>
        <button class="level-up-close">太棒了！</button>
      </div>
    `;

    document.body.appendChild(levelUpNotice);

    // 播放音效
    playLevelUpSound();

    // 关闭按钮
    levelUpNotice.querySelector('.level-up-close').onclick = () => {
      levelUpNotice.style.animation = 'levelUpFadeOut 0.5s ease forwards';
      setTimeout(() => levelUpNotice.remove(), 500);
    };

    // 自动关闭
    setTimeout(() => {
      if (levelUpNotice.parentElement) {
        levelUpNotice.style.animation = 'levelUpFadeOut 0.5s ease forwards';
        setTimeout(() => levelUpNotice.remove(), 500);
      }
    }, 10000);
  }

  // 显示获得经验提示
  function showXPGain(amount, source) {
    const xpNotice = document.createElement('div');
    xpNotice.className = 'xp-gain-notice';
    xpNotice.innerHTML = `+${amount} XP`;
    xpNotice.style.cssText = `
      position: fixed;
      bottom: 200px;
      right: 30px;
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
      z-index: 9999;
      animation: xpFloat 2s ease forwards;
    `;

    document.body.appendChild(xpNotice);
    setTimeout(() => xpNotice.remove(), 2000);
  }

  // 更新等级显示
  function updateLevelDisplay() {
    const existingDisplay = document.querySelector('.zootopia-level-display');
    if (existingDisplay) {
      existingDisplay.remove();
    }
    document.body.appendChild(createLevelDisplay());
  }

  // 保存用户数据
  function saveUserData() {
    userData.lastVisit = new Date().toISOString();
    localStorage.setItem('zootopiaUserData', JSON.stringify(userData));
  }

  // 播放升级音效（模拟）
  function playLevelUpSound() {
    console.log('🎵 升级音效：叮叮叮！');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#level-system-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'level-system-styles';
    styles.textContent = `
      /* 等级显示 */
      .zootopia-level-display {
        position: fixed;
        top: 150px;
        right: 30px;
        width: 250px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        z-index: 9994;
        animation: levelSlideIn 0.5s ease;
      }

      @keyframes levelSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .level-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 15px 20px;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
        border-radius: 15px 15px 0 0;
      }

      .level-emoji {
        font-size: 36px;
      }

      .level-info {
        flex: 1;
      }

      .level-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 2px;
      }

      .level-name-en {
        font-size: 11px;
        opacity: 0.9;
      }

      .level-number {
        font-size: 14px;
        font-weight: bold;
        opacity: 0.9;
      }

      .level-progress {
        padding: 15px 20px;
      }

      .progress-bar-bg {
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .progress-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
      }

      .progress-text {
        font-size: 12px;
        color: #636E72;
        text-align: center;
        font-weight: 600;
      }

      /* 升级通知 */
      .level-up-notice {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: levelUpPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes levelUpPop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .level-up-content {
        background: white;
        border-radius: 20px;
        padding: 30px 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
      }

      .level-up-icon {
        font-size: 64px;
        margin-bottom: 15px;
        animation: iconBounce 1s ease infinite;
      }

      @keyframes iconBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      .level-up-title {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 15px;
      }

      .level-up-new {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(155, 89, 182, 0.1);
        border-radius: 10px;
      }

      .new-emoji {
        font-size: 48px;
      }

      .new-level {
        font-size: 20px;
        font-weight: bold;
        color: #9B59B6;
      }

      .level-up-rewards {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(255, 159, 67, 0.1);
        border-radius: 8px;
      }

      .level-up-close {
        padding: 12px 30px;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .level-up-close:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(255, 159, 67, 0.4);
      }

      @keyframes levelUpFadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      /* 经验获得提示 */
      @keyframes xpFloat {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-30px);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-level-display {
          top: 100px;
          right: 15px;
          width: 200px;
        }

        .level-emoji {
          font-size: 28px;
        }

        .level-name {
          font-size: 14px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化等级系统
  function initLevelSystem() {
    injectStyles();

    // 添加等级显示
    document.body.appendChild(createLevelDisplay());

    // 每日登录奖励
    const today = new Date().toDateString();
    if (userData.lastVisit !== today) {
      addXP(xpActions.daily, '每日登录');
    }

    // 页面浏览奖励
    setTimeout(() => {
      addXP(xpActions.visit, '访问页面');
    }, 5000);

    // 阅读文章奖励（滚动到页面底部时）
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        if (!userData.hasReadBonus) {
          addXP(xpActions.read, '阅读文章');
          userData.hasReadBonus = true;
          saveUserData();
        }
      }
    });
  }

  // 导出添加经验函数
  window.zootopiaAddXP = addXP;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLevelSystem);
  } else {
    initLevelSystem();
  }
})();
