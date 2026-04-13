/**
 * 疯狂动物城 Zootopia 额外交互脚本
 * Extra Zootopia Interactive Scripts
 */

(function() {
  'use strict';

  // 经典台词库 - Extended
  const zootopiaQuotes = [
    // Judy Hopps
    { character: 'Judy', quote: 'Try Everything! 🐰', emoji: '🐰' },
    { character: 'Judy', quote: 'Change starts with you!', emoji: '🐰' },
    { character: 'Judy', quote: 'Anyone can be anything!', emoji: '🐰' },
    { character: 'Judy', quote: 'Never give up!', emoji: '🐰' },

    // Nick Wilde
    { character: 'Nick', quote: 'It\'s called a hustle, sweetheart! 🦊', emoji: '🦊' },
    { character: 'Nick', quote: 'You know you love me!', emoji: '🦊' },
    { character: 'Nick', quote: 'Never let them see they get to you!', emoji: '🦊' },
    { character: 'Nick', quote: 'Sweet cheese and crackers!', emoji: '🦊' },

    // Chief Bogo
    { character: 'Bogo', quote: 'Life isn\'t some cartoon musical! 🦬', emoji: '🦬' },
    { character: 'Bogo', quote: 'You have 48 hours! 🦁', emoji: '🦁' },

    // Flash
    { character: 'Flash', quote: '...moving...slowly... 🦥', emoji: '🦥' },

    // Bellwether
    { character: 'Bellwether', quote: 'We\'re on the same team! 🐑', emoji: '🐑' },

    // General
    { character: 'Zootopia', quote: 'Welcome to Zootopia! 🏙️', emoji: '🏙️' },
    { character: 'Zootopia', quote: 'Where anyone can be anything! ✨', emoji: '✨' }
  ];

  // 随机获取台词
  function getRandomQuote() {
    return zootopiaQuotes[Math.floor(Math.random() * zootopiaQuotes.length)];
  }

  // 创建角色对话气泡
  function createCharacterBubble(quote, character) {
    const bubble = document.createElement('div');
    bubble.className = `character-bubble ${character.toLowerCase()}`;
    bubble.setAttribute('data-character', `${character} says:`);
    bubble.textContent = quote;

    // 添加关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: inherit;
      opacity: 0.6;
    `;
    closeBtn.onclick = () => bubble.remove();
    bubble.appendChild(closeBtn);

    return bubble;
  }

  // Pawpsicles 冰棍追踪计数器
  let pawpsicleCount = parseInt(localStorage.getItem('pawpsicle-count') || '0');

  function createPawpsicleCounter() {
    const counter = document.createElement('div');
    counter.className = 'pawpsicle-counter';
    counter.innerHTML = `
      <div class="counter-icon">🍦</div>
      <div class="counter-text">Pawpsicles Sold: ${pawpsicleCount}</div>
    `;
    counter.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 20px;
      background: linear-gradient(135deg, #FF6B6B, #EE5A24);
      color: white;
      padding: 15px 20px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
      z-index: 100;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: counterBounce 0.5s ease;
    `;
    return counter;
  }

  // 更新 Pawpsicles 计数
  function updatePawpsicleCount() {
    pawpsicleCount++;
    localStorage.setItem('pawpsicle-count', pawpsicleCount.toString());
  }

  // 创建城市时钟（模仿 Flash 的树懒速度）
  function createSlothClock() {
    const clock = document.createElement('div');
    clock.className = 'sloth-clock';
    clock.innerHTML = `
      <div class="clock-icon">🦥</div>
      <div class="clock-time">Flash Time</div>
    `;
    clock.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      background: linear-gradient(135deg, #8B7355, #A0826D);
      color: white;
      padding: 15px 20px;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(139, 115, 85, 0.4);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
    `;

    // 更新时间（树懒速度，很慢）
    setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      clock.querySelector('.clock-time').textContent = `${hours}:${minutes}`;
    }, 60000); // 每分钟更新一次，像 Flash 一样慢

    return clock;
  }

  // 创建火车到站提醒
  function createTrainAnnouncement() {
    const announcements = [
      '🚂 Now arriving: Sahara Square!',
      '❄️ Next stop: Tundratown!',
      '🌴 Approaching: Rainforest District!',
      '🐰 Bunnyburrow express!',
      '🏙️ Downtown Zootopia!'
    ];

    const announcement = document.createElement('div');
    announcement.className = 'train-announcement';
    announcement.innerHTML = `
      🔊 ${announcements[Math.floor(Math.random() * announcements.length)]}
    `;
    announcement.style.cssText = `
      position: fixed;
      top: 150px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1E3A5F, #2E5C8A);
      color: #FFD700;
      padding: 15px 30px;
      border-radius: 10px;
      border: 2px solid #FFD700;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      font-weight: bold;
      animation: announcementSlide 0.5s ease, announcementFade 0.5s ease 4.5s forwards;
    `;

    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 5000);
  }

  // 创建角色徽章收集
  function createBadgeCollector() {
    const badges = [
      { name: 'Junior Officer', icon: '🏅', unlocked: pawpsicleCount >= 1 },
      { name: 'Traffic Cop', icon: '👮', unlocked: pawpsicleCount >= 5 },
      { name: 'Detective', icon: '🔍', unlocked: pawpsicleCount >= 10 },
      { name: 'ZPD Hero', icon: '🌟', unlocked: pawpsicleCount >= 20 }
    ];

    const collector = document.createElement('div');
    collector.className = 'badge-collector-panel';
    collector.innerHTML = `
      <div class="collector-title">🎖️ Badge Collection</div>
      <div class="badge-grid">
        ${badges.map(badge => `
          <div class="badge-item ${badge.unlocked ? 'unlocked' : 'locked'}">
            <div class="badge-icon">${badge.unlocked ? badge.icon : '🔒'}</div>
            <div class="badge-name">${badge.name}</div>
          </div>
        `).join('')}
      </div>
    `;
    collector.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      padding: 15px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 99;
      min-width: 200px;
    `;

    // 添加切换按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '🎖️';
    toggleBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
      z-index: 100;
    `;
    toggleBtn.onclick = () => {
      collector.style.display = collector.style.display === 'none' ? 'block' : 'none';
    };

    document.body.appendChild(toggleBtn);
    document.body.appendChild(collector);
    collector.style.display = 'none'; // 默认隐藏
  }

  // 创建 Donut 时间小部件
  function createDonutTimer() {
    const donut = document.createElement('div');
    donut.className = 'donut-timer';
    donut.innerHTML = `
      <div class="donut-icon">🍩</div>
      <div class="donut-label">Donut Break!</div>
    `;
    donut.style.cssText = `
      position: fixed;
      top: 150px;
      right: 20px;
      background: linear-gradient(135deg, #FF6B6B, #EE5A24);
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      box-shadow: 0 3px 10px rgba(255, 107, 107, 0.4);
      z-index: 99;
      font-weight: bold;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    `;

    donut.onclick = () => {
      const quote = getRandomQuote();
      const bubble = createCharacterBubble(
        'Time for a donut break! Even officers need snacks!',
        'Judy'
      );
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 5000);
    };

    donut.onmouseover = () => {
      donut.style.transform = 'scale(1.1) rotate(5deg)';
    };

    donut.onmouseout = () => {
      donut.style.transform = 'scale(1) rotate(0deg)';
    };

    return donut;
  }

  // 添加样式到页面
  function injectStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      @keyframes counterBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes announcementSlide {
        from {
          transform: translateX(-50%) translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }

      @keyframes announcementFade {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }

      .badge-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 10px;
        border-radius: 8px;
        background: ${pawpsicleCount >= 1 ? '#FFD700' : '#CCCCCC'};
        margin: 5px;
      }

      .badge-item.locked {
        opacity: 0.5;
      }

      .badge-icon {
        font-size: 24px;
      }

      .badge-name {
        font-size: 10px;
        font-weight: bold;
        text-align: center;
      }

      .collector-title {
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
      }

      .badge-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
      }
    `;
    document.head.appendChild(styles);
  }

  // 初始化所有额外元素
  function initZootopiaExtras() {
    injectStyles();

    // 添加 Pawpsicles 计数器
    const pawpsicleCounter = createPawpsicleCounter();
    document.body.appendChild(pawpsicleCounter);

    // 添加树懒时钟
    const slothClock = createSlothClock();
    document.body.appendChild(slothClock);

    // 添加徽章收集器
    createBadgeCollector();

    // 添加 Donut 计时器
    const donutTimer = createDonutTimer();
    document.body.appendChild(donutTimer);

    // 定期显示火车公告（每5分钟）
    setInterval(() => {
      if (Math.random() > 0.7) { // 30% 概率
        createTrainAnnouncement();
      }
    }, 300000); // 5分钟

    // 页面点击时增加 Pawpsicles 计数
    document.addEventListener('click', () => {
      updatePawpsicleCount();
      const counterEl = document.querySelector('.pawpsicle-counter .counter-text');
      if (counterEl) {
        counterEl.textContent = `Pawpsicles Sold: ${pawpsicleCount}`;
      }
    });

    // 首次访问显示火车公告
    if (!localStorage.getItem('train-announcement-seen')) {
      setTimeout(() => {
        createTrainAnnouncement();
        localStorage.setItem('train-announcement-seen', 'true');
      }, 2000);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZootopiaExtras);
  } else {
    initZootopiaExtras();
  }
})();
