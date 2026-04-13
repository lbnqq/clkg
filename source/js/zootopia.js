/**
 * 疯狂动物城 Zootopia 主题自定义脚本
 * Zootopia Theme Custom JavaScript
 */

(function() {
  'use strict';

  // ZPD 徽章动画
  function createZPDBadge() {
    const badge = document.createElement('div');
    badge.className = 'zpd-badge-float';
    badge.innerHTML = `
      <svg width="60" height="60" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="badgeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700"/>
            <stop offset="50%" style="stop-color:#FFA500"/>
            <stop offset="100%" style="stop-color:#FFD700"/>
          </linearGradient>
        </defs>
        <!-- 外圈六边形 -->
        <polygon points="50,5 85,27 85,72 50,95 15,72 15,27"
                 fill="url(#badgeGold)" stroke="#B8860B" stroke-width="2"/>
        <!-- 内圈 -->
        <polygon points="50,15 75,32 75,67 50,85 25,67 25,32"
                 fill="#1E3A5F" stroke="#FFD700" stroke-width="1"/>
        <!-- ZPD 文字 -->
        <text x="50" y="45" text-anchor="middle" fill="#FFD700"
              font-size="10" font-weight="bold">ZPD</text>
        <!-- 盾牌图标 -->
        <path d="M 35 55 Q 50 75 65 55"
              fill="none" stroke="#FFD700" stroke-width="2"/>
        <circle cx="50" cy="62" r="3" fill="#FFD700"/>
      </svg>
    `;
    return badge;
  }

  // 插入 ZPD 徽章
  function insertZPDBadge() {
    const header = document.querySelector('#page-header');
    if (header && !document.querySelector('.zpd-badge-float')) {
      const badge = createZPDBadge();
      badge.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
        animation: badgeFloat 3s ease-in-out infinite;
        cursor: pointer;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
      `;
      header.appendChild(badge);
    }
  }

  // 疯狂动物城角色头像
  const characters = [
    { name: 'Judy Hopps', emoji: '🐰', color: '#9C85C6' },
    { name: 'Nick Wilde', emoji: '🦊', color: '#FF6B35' },
    { name: 'Chief Bogo', emoji: '🦬', color: '#5D4E37' },
    { name: 'Flash', emoji: '🦥', color: '#8B7355' },
    { name: 'Bellwether', emoji: '🐑', color: '#E8E8E8' }
  ];

  // 随机角色问候
  function randomCharacterGreeting() {
    const character = characters[Math.floor(Math.random() * characters.length)];
    const greetings = [
      `Hi! I'm ${character.name} ${character.emoji}`,
      `${character.emoji} Welcome to Zootopia!`,
      `Try Everything! ${character.emoji}`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 添加欢迎横幅
  function createWelcomeBanner() {
    const banner = document.createElement('div');
    banner.className = 'zootopia-welcome-banner';
    banner.innerHTML = `
      <div class="banner-content">
        <span class="zootopia-logo">🦁 ZOOTOPIA</span>
        <p class="banner-text">${randomCharacterGreeting()}</p>
        <button class="banner-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;
    return banner;
  }

  // 地区切换器
  function createDistrictSwitcher() {
    const districts = [
      { name: 'Sahara Square', emoji: '🏜️', colors: ['#FF9F43', '#EE5A24'] },
      { name: 'Tundratown', emoji: '❄️', colors: ['#0ABDE3', '#48DBFB'] },
      { name: 'Rainforest', emoji: '🌴', colors: ['#10AC84', '#1DD1A1'] },
      { name: 'Downtown', emoji: '🏙️', colors: ['#5F27CD', '#341F97'] },
      { name: 'Bunnyburrow', emoji: '🥕', colors: ['#26DE81', '#20BF6B'] }
    ];

    const switcher = document.createElement('div');
    switcher.className = 'district-switcher';
    switcher.innerHTML = '<div class="switcher-title">🌆 Choose Your District</div>';

    const districtList = document.createElement('div');
    districtList.className = 'district-list';

    districts.forEach(district => {
      const btn = document.createElement('button');
      btn.className = 'district-btn';
      btn.innerHTML = `${district.emoji} ${district.name}`;
      btn.style.background = `linear-gradient(135deg, ${district.colors[0]}, ${district.colors[1]})`;
      btn.onclick = () => switchDistrict(district);
      districtList.appendChild(btn);
    });

    switcher.appendChild(districtList);
    return switcher;
  }

  // 切换地区主题
  function switchDistrict(district) {
    document.documentElement.style.setProperty('--main-color', district.colors[0]);
    document.documentElement.style.setProperty('--secondary-color', district.colors[1]);

    // 添加切换动画
    document.body.style.animation = 'none';
    setTimeout(() => {
      document.body.style.animation = 'districtTransition 1s ease';
    }, 10);

    // 显示欢迎消息
    showNotification(`🌆 Welcome to ${district.name}!`);
  }

  // 显示通知
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'zootopia-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      z-index: 1000;
      animation: slideIn 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  // 动物城火车动画
  function createTrainAnimation() {
    const train = document.createElement('div');
    train.className = 'zootopia-train';
    train.innerHTML = `
      <div class="train-engine">🚂</div>
      <div class="train-carriage">🐰</div>
      <div class="train-carriage">🦊</div>
      <div class="train-carriage">🦭</div>
      <div class="train-carriage">🐨</div>
    `;
    return train;
  }

  // 添加页面元素
  function addZootopiaElements() {
    // 添加欢迎横幅
    if (!localStorage.getItem('zootopia-welcome-seen')) {
      const banner = createWelcomeBanner();
      document.body.insertBefore(banner, document.body.firstChild);
      localStorage.setItem('zootopia-welcome-seen', 'true');
    }

    // 添加 ZPD 徽章
    insertZPDBadge();

    // 添加地区切换器
    const aside = document.querySelector('#aside');
    if (aside) {
      const switcher = createDistrictSwitcher();
      aside.insertBefore(switcher, aside.firstChild);
    }

    // 添加火车动画
    const train = createTrainAnimation();
    train.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: -200px;
      display: flex;
      gap: 5px;
      font-size: 30px;
      z-index: 50;
      animation: trainRide 30s linear infinite;
    `;
    document.body.appendChild(train);
  }

  // 初始化
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addZootopiaElements);
    } else {
      addZootopiaElements();
    }
  }

  init();
})();
