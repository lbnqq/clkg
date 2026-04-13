/**
 * 疯狂动物城主题 - 季节性事件系统
 * Zootopia Theme - Seasonal Events System
 * | 动物城的节日和季节变换
 */

(function() {
  'use strict';

  // 季节配置
  const seasonalThemes = {
    spring: {
      name: '春季',
      nameEn: 'Spring',
      emoji: '🌸',
      colors: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'],
      effects: ['petals', 'butterflies', 'rainbow'],
      description: '兔子洞的春天！胡萝卜花盛开！',
      music: 'upbeat',
      characters: ['🐰', '🐦', '🦋', '🌸', '🌷', '🥕']
    },
    summer: {
      name: '夏季',
      nameEn: 'Summer',
      emoji: '☀️',
      colors: ['#FF6B6B', '#FFA07A', '#FFD93D', '#6BCF77', '#4ECDC4'],
      effects: ['sunshine', 'waves', 'icecream'],
      description: '撒哈拉广场的炎热夏天！',
      music: 'energetic',
      characters: ['☀️', '🌴', '🍦', '🏖️', '🐫', '🏜️']
    },
    autumn: {
      name: '秋季',
      nameEn: 'Autumn',
      emoji: '🍂',
      colors: ['#D4A373', '#FAEDCD', '#CCD5AE', '#E9EDC9', '#FEFAE0'],
      effects: ['leaves', 'wind', 'harvest'],
      description: '动物城的金色秋天！',
      music: 'calm',
      characters: ['🍂', '🍁', '🦊', '🌰', '🎃', '🍎']
    },
    winter: {
      name: '冬季',
      nameEn: 'Winter',
      emoji: '❄️',
      colors: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'],
      effects: ['snow', 'icicles', 'fireplace'],
      description: '冰川镇的冰雪世界！',
      music: 'magical',
      characters: ['❄️', '⛄', '🎄', '🎅', '🐧', '🏂']
    }
  };

  // 特殊节日
  const specialEvents = {
    newYear: {
      name: '新年',
      emoji: '🎊',
      date: '01-01',
      effects: ['fireworks', 'lanterns', 'celebration'],
      description: '动物城新年快乐！',
      bonusXP: 100
    },
    valentine: {
      name: '情人节',
      emoji: '💝',
      date: '02-14',
      effects: ['hearts', 'love'],
      description: '爱在动物城！',
      bonusXP: 50
    },
    judyDay: {
      name: '朱迪日',
      emoji: '🐰',
      date: '03-04',
      effects: ['carrots', 'police'],
      description: '庆祝朱迪警官日！',
      bonusXP: 75
    },
    zpdDay: {
      name: 'ZPD日',
      emoji: '👮',
      date: '05-15',
      effects: ['badges', 'siren'],
      description: '致敬动物城警察局！',
      bonusXP: 80
    },
    summerFest: {
      name: '夏日祭典',
      emoji: '🎪',
      date: '07-20',
      effects: ['festival', 'parade'],
      description: '动物城夏日庆典！',
      bonusXP: 60
    },
    halloween: {
      name: '万圣节',
      emoji: '🎃',
      date: '10-31',
      effects: ['pumpkins', 'ghosts', 'candy'],
      description: '动物城万圣节狂欢！',
      bonusXP: 90
    },
    christmas: {
      name: '圣诞节',
      emoji: '🎄',
      date: '12-25',
      effects: ['snow', 'gifts', 'lights'],
      description: '动物城圣诞节快乐！',
      bonusXP: 100
    },
    zootopiaDay: {
      name: '动物城日',
      emoji: '🏙️',
      date: '04-17',
      effects: ['fireworks', 'celebration', 'parade'],
      description: '疯狂动物城上映纪念日！',
      bonusXP: 150
    }
  };

  // 当前状态
  let currentSeason = 'spring';
  let currentEvent = null;
  let isEventActive = false;

  // 确定当前季节
  function determineSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  }

  // 检查特殊节日
  function checkSpecialEvent() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = `${month}-${day}`;

    for (const [key, event] of Object.entries(specialEvents)) {
      if (event.date === dateStr) {
        return { key, ...event };
      }
    }
    return null;
  }

  // 创建季节性横幅
  function createSeasonBanner() {
    const season = seasonalThemes[currentSeason];
    const banner = document.createElement('div');
    banner.className = 'seasonal-banner';
    banner.id = 'seasonalBanner';

    banner.innerHTML = `
      <div class="banner-background">
        ${createSeasonalBackground()}
      </div>
      <div class="banner-content">
        <div class="banner-emoji">${season.emoji}</div>
        <div class="banner-text">
          <div class="banner-title">${isEventActive ? currentEvent.name : season.name} ${season.nameEn}</div>
          <div class="banner-description">${isEventActive ? currentEvent.description : season.description}</div>
        </div>
        <div class="banner-countdown" id="bannerCountdown"></div>
        <button class="banner-close" id="bannerClose">×</button>
      </div>
      <div class="banner-effects" id="bannerEffects"></div>
    `;

    return banner;
  }

  // 创建季节背景
  function createSeasonalBackground() {
    const season = seasonalThemes[currentSeason];
    const event = currentEvent;
    const colors = event ? season.colors : season.colors;

    let background = '';
    colors.forEach((color, index) => {
      background += `<div class="bg-layer" style="background: ${color}; animation-delay: ${index * 0.5}s;"></div>`;
    });

    return background;
  }

  // 创建季节性效果
  function createSeasonalEffects() {
    const container = document.getElementById('bannerEffects');
    if (!container) return;

    const season = seasonalThemes[currentSeason];
    const effects = isEventActive ? currentEvent.effects : season.effects;

    effects.forEach(effectType => {
      const effectElement = createEffectElement(effectType);
      if (effectElement) {
        container.appendChild(effectElement);
      }
    });
  }

  // 创建效果元素
  function createEffectElement(type) {
    const effectContainer = document.createElement('div');
    effectContainer.className = `effect-container effect-${type}`;

    switch (type) {
      case 'petals':
        for (let i = 0; i < 20; i++) {
          const petal = document.createElement('div');
          petal.className = 'petal';
          petal.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${Math.random() * 3 + 4}s;
          `;
          effectContainer.appendChild(petal);
        }
        break;

      case 'snow':
        for (let i = 0; i < 30; i++) {
          const snowflake = document.createElement('div');
          snowflake.className = 'snowflake';
          snowflake.innerHTML = '❄️';
          snowflake.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            animation-duration: ${Math.random() * 2 + 3}s;
            font-size: ${Math.random() * 10 + 10}px;
          `;
          effectContainer.appendChild(snowflake);
        }
        break;

      case 'leaves':
        for (let i = 0; i < 15; i++) {
          const leaf = document.createElement('div');
          leaf.className = 'leaf';
          leaf.innerHTML = ['🍂', '🍁', '🍃'][Math.floor(Math.random() * 3)];
          leaf.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 4}s;
            animation-duration: ${Math.random() * 3 + 5}s;
            font-size: ${Math.random() * 15 + 20}px;
          `;
          effectContainer.appendChild(leaf);
        }
        break;

      case 'fireworks':
        for (let i = 0; i < 5; i++) {
          const firework = document.createElement('div');
          firework.className = 'firework';
          firework.style.cssText = `
            left: ${Math.random() * 80 + 10}%;
            animation-delay: ${i * 2}s;
          `;
          effectContainer.appendChild(firework);
        }
        break;

      case 'hearts':
        for (let i = 0; i < 15; i++) {
          const heart = document.createElement('div');
          heart.className = 'heart';
          heart.innerHTML = '❤️';
          heart.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            animation-duration: ${Math.random() * 2 + 3}s;
            font-size: ${Math.random() * 10 + 15}px;
          `;
          effectContainer.appendChild(heart);
        }
        break;

      case 'sunshine':
        const sun = document.createElement('div');
        sun.className = 'sun';
        sun.innerHTML = '☀️';
        effectContainer.appendChild(sun);
        break;

      case 'gifts':
        for (let i = 0; i < 10; i++) {
          const gift = document.createElement('div');
          gift.className = 'gift';
          gift.innerHTML = ['🎁', '🎀'][Math.floor(Math.random() * 2)];
          gift.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
          `;
          effectContainer.appendChild(gift);
        }
        break;

      default:
        return null;
    }

    return effectContainer;
  }

  // 创建事件日历
  function createEventCalendar() {
    const calendar = document.createElement('div');
    calendar.className = 'event-calendar';
    calendar.innerHTML = `
      <div class="calendar-backdrop"></div>
      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-title">📅 动物城节日日历</div>
          <button class="calendar-close">×</button>
        </div>

        <div class="calendar-content">
          <div class="year-view">
            <div class="year-title">2026年节日</div>
            ${Object.entries(specialEvents).map(([key, event]) => `
              <div class="event-item ${isEventActive && currentEvent.key === key ? 'active' : ''}" data-event="${key}">
                <div class="event-date">${event.date}</div>
                <div class="event-info">
                  <div class="event-emoji">${event.emoji}</div>
                  <div class="event-details">
                    <div class="event-name">${event.name}</div>
                    <div class="event-desc">${event.description}</div>
                  </div>
                </div>
                <div class="event-bonus">+${event.bonusXP} XP</div>
              </div>
            `).join('')}
          </div>

          <div class="season-info">
            <div class="season-title">当前季节</div>
            <div class="current-season">
              <div class="season-emoji">${seasonalThemes[currentSeason].emoji}</div>
              <div class="season-details">
                <div class="season-name">${seasonalThemes[currentSeason].name}</div>
                <div class="season-desc">${seasonalThemes[currentSeason].description}</div>
              </div>
            </div>
            <div class="season-effects">
              <div class="effect-title">季节效果</div>
              ${seasonalThemes[currentSeason].characters.map(char => `
                <span class="season-char">${char}</span>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <button class="calendar-toggle" id="calendarToggle">
        <span class="toggle-icon">📅</span>
        ${isEventActive ? '<span class="event-badge">🎉</span>' : ''}
      </button>
    `;

    return calendar;
  }

  // 更新倒计时
  function updateCountdown() {
    const countdownElement = document.getElementById('bannerCountdown');
    if (!countdownElement) return;

    const now = new Date();
    let targetDate = null;

    if (isEventActive) {
      // 如果事件正在进行，显示事件结束倒计时
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      targetDate = tomorrow;
    } else {
      // 显示下一个事件倒计时
      const nextEvent = getNextEvent();
      if (nextEvent) {
        const [month, day] = nextEvent.date.split('-');
        targetDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day));
        if (targetDate < now) {
          targetDate.setFullYear(targetDate.getFullYear() + 1);
        }
      }
    }

    if (targetDate) {
      const diff = targetDate - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (isEventActive) {
        countdownElement.textContent = `活动还剩 ${hours}小时 ${minutes}分钟`;
      } else {
        countdownElement.textContent = `距离下一个节日还有 ${hours}小时`;
      }
    }
  }

  // 获取下一个事件
  function getNextEvent() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let nextEvent = null;
    let minDiff = Infinity;

    for (const event of Object.values(specialEvents)) {
      const [month, day] = event.date.split('-').map(Number);
      let eventDate = new Date(today.getFullYear(), month - 1, day);

      if (eventDate < today) {
        eventDate = new Date(today.getFullYear() + 1, month - 1, day);
      }

      const diff = eventDate - today;
      if (diff < minDiff) {
        minDiff = diff;
        nextEvent = event;
      }
    }

    return nextEvent;
  }

  // 应用季节主题
  function applySeasonTheme() {
    const season = seasonalThemes[currentSeason];

    // 更新CSS变量
    document.documentElement.style.setProperty('--seasonal-primary', season.colors[0]);
    document.documentElement.style.setProperty('--seasonal-secondary', season.colors[1]);
    document.documentElement.style.setProperty('--seasonal-accent', season.colors[2]);

    // 触发主题变化事件
    window.dispatchEvent(new CustomEvent('zootopiaSeasonChange', {
      detail: { season: currentSeason, seasonData: season }
    }));
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#seasonal-events-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'seasonal-events-styles';
    styles.textContent = `
      /* 季节横幅 */
      .seasonal-banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10002;
        overflow: hidden;
        animation: bannerSlideIn 0.5s ease;
      }

      @keyframes bannerSlideIn {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }

      .banner-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }

      .bg-layer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: bgShift 10s ease infinite;
      }

      @keyframes bgShift {
        0%, 100% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
      }

      .banner-content {
        position: relative;
        display: flex;
        align-items: center;
        padding: 20px 30px;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }

      .banner-emoji {
        font-size: 48px;
        margin-right: 20px;
        animation: emojiBounce 2s ease infinite;
      }

      @keyframes emojiBounce {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-10px) scale(1.1);
        }
      }

      .banner-text {
        flex: 1;
      }

      .banner-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .banner-description {
        font-size: 14px;
        opacity: 0.9;
      }

      .banner-countdown {
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        font-size: 13px;
        font-weight: bold;
      }

      .banner-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 20px;
      }

      .banner-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* 效果容器 */
      .banner-effects {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
      }

      /* 花瓣效果 */
      .petal {
        position: absolute;
        width: 15px;
        height: 15px;
        background: radial-gradient(circle, #FFB7B2, #FFDAC1);
        border-radius: 50% 0 50% 50%;
        animation: petalFall 8s linear infinite;
      }

      @keyframes petalFall {
        0% {
          transform: translateY(-20px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }

      /* 雪花效果 */
      .snowflake {
        position: absolute;
        animation: snowFall 6s linear infinite;
      }

      @keyframes snowFall {
        0% {
          transform: translateY(-20px);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }

      /* 叶子效果 */
      .leaf {
        position: absolute;
        animation: leafFall 10s ease-in-out infinite;
      }

      @keyframes leafFall {
        0% {
          transform: translateY(-20px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }

      /* 烟花效果 */
      .firework {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: fireworkExplode 3s ease infinite;
      }

      @keyframes fireworkExplode {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        50% {
          transform: scale(20);
          opacity: 0.8;
        }
        100% {
          transform: scale(30);
          opacity: 0;
        }
      }

      /* 心形效果 */
      .heart {
        position: absolute;
        animation: heartFloat 5s ease infinite;
      }

      @keyframes heartFloat {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-30px) scale(1.2);
          opacity: 1;
        }
      }

      /* 太阳效果 */
      .sun {
        position: absolute;
        top: 10px;
        right: 50px;
        font-size: 60px;
        animation: sunPulse 4s ease infinite;
      }

      @keyframes sunPulse {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 0 20px #FFD93D);
        }
        50% {
          transform: scale(1.1);
          filter: drop-shadow(0 0 40px #FFD93D);
        }
      }

      /* 礼物效果 */
      .gift {
        position: absolute;
        animation: giftBounce 3s ease infinite;
      }

      @keyframes giftBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      /* 日历 */
      .event-calendar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10003;
        display: none;
      }

      .event-calendar.active {
        display: block;
      }

      .calendar-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }

      .calendar-container {
        position: relative;
        width: 90vw;
        max-width: 600px;
        max-height: 80vh;
        margin: 10vh auto;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }

      .calendar-header {
        background: linear-gradient(135deg, #FF9F43, #F39C12);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .calendar-title {
        font-size: 20px;
        font-weight: bold;
      }

      .calendar-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      .calendar-content {
        padding: 20px;
        max-height: calc(80vh - 80px);
        overflow-y: auto;
      }

      .year-view {
        margin-bottom: 30px;
      }

      .year-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #2D3436;
      }

      .event-item {
        display: flex;
        align-items: center;
        padding: 15px;
        margin-bottom: 10px;
        background: #F8F9FA;
        border-radius: 15px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .event-item:hover {
        border-color: #FF9F43;
        background: rgba(255, 159, 67, 0.1);
      }

      .event-item.active {
        border-color: #FF6B6B;
        background: rgba(255, 107, 107, 0.1);
      }

      .event-date {
        padding: 8px 12px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        margin-right: 15px;
      }

      .event-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .event-emoji {
        font-size: 32px;
      }

      .event-details {
        flex: 1;
      }

      .event-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .event-desc {
        font-size: 12px;
        color: #636E72;
      }

      .event-bonus {
        padding: 6px 12px;
        background: #2ECC71;
        color: white;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
      }

      .season-info {
        padding: 20px;
        background: #F8F9FA;
        border-radius: 15px;
      }

      .season-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #2D3436;
      }

      .current-season {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
      }

      .season-emoji {
        font-size: 48px;
      }

      .season-details {
        flex: 1;
      }

      .season-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .season-desc {
        font-size: 14px;
        color: #636E72;
      }

      .season-effects {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .effect-title {
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .season-char {
        font-size: 24px;
        padding: 5px;
      }

      /* 日历切换按钮 */
      .calendar-toggle {
        position: fixed;
        top: 140px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF9F43, #F39C12);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .calendar-toggle:hover {
        transform: scale(1.1);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .event-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 20px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .banner-content {
          flex-direction: column;
          text-align: center;
          padding: 15px;
        }

        .banner-emoji {
          margin-right: 0;
          margin-bottom: 10px;
          font-size: 36px;
        }

        .banner-title {
          font-size: 18px;
        }

        .banner-close {
          margin-left: 0;
          margin-top: 10px;
        }

        .calendar-toggle {
          top: auto;
          bottom: 280px;
          right: 15px;
          width: 50px;
          height: 50px;
        }

        .toggle-icon {
          font-size: 24px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化季节性事件
  function initSeasonalEvents() {
    // 确定当前季节和事件
    currentSeason = determineSeason();
    currentEvent = checkSpecialEvent();
    isEventActive = currentEvent !== null;

    injectStyles();
    applySeasonTheme();

    // 创建横幅
    const banner = createSeasonBanner();
    document.body.appendChild(banner);
    createSeasonalEffects();

    // 创建日历
    const calendar = createEventCalendar();
    document.body.appendChild(calendar);

    // 横幅关闭按钮
    document.getElementById('bannerClose').onclick = () => {
      banner.style.animation = 'bannerSlideOut 0.5s ease forwards';
      setTimeout(() => banner.remove(), 500);
    };

    // 日历切换按钮
    document.getElementById('calendarToggle').onclick = () => {
      calendar.classList.add('active');
    };

    // 日历关闭按钮
    document.querySelector('.calendar-close').onclick = () => {
      calendar.classList.remove('active');
    };

    // 更新倒计时
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // 检查是否获得节日奖励
    if (isEventActive) {
      const lastEvent = localStorage.getItem('zootopiaLastEvent');
      if (lastEvent !== currentEvent.key) {
        localStorage.setItem('zootopiaLastEvent', currentEvent.key);

        // 触发成就事件
        window.dispatchEvent(new CustomEvent('zootopiaAchievement', {
          detail: {
            name: `${currentEvent.name}快乐！`,
            xp: currentEvent.bonusXP,
            reward: currentEvent.emoji
          }
        }));
      }
    }
  }

  // 导出全局函数
  window.zootopiaSeasonal = {
    getCurrentSeason: () => currentSeason,
    getCurrentEvent: () => currentEvent,
    isEventActive: () => isEventActive,
    getSeasonData: (season) => seasonalThemes[season]
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSeasonalEvents);
  } else {
    initSeasonalEvents();
  }
})();
