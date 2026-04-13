/**
 * 疯狂动物城主题 - 高级交互脚本
 * Advanced Zootopia Interactive Scripts
 */

(function() {
  'use strict';

  // 动物城每日一言
  const zootopiaDailyQuotes = [
    { quote: "Try Everything! 任何人都可以成就任何事！", character: "Judy", emoji: "🐰" },
    { quote: "It's called a hustle, sweetheart!", character: "Nick", emoji: "🦊" },
    { quote: "Change starts with you. 改变从你开始。", character: "Judy", emoji: "🐰" },
    { quote: "Never let them see they get to you.", character: "Nick", emoji: "🦊" },
    { quote: "You have 48 hours! 你有48小时！", character: "Bogo", emoji: "🦬" },
    { quote: "..............", character: "Flash", emoji: "🦥" },
    { quote: "Life isn't some cartoon musical!", character: "Bogo", emoji: "🦬" }
  ];

  // 创建每日一言横幅
  function createDailyQuoteBanner() {
    const quote = zootopiaDailyQuotes[Math.floor(Math.random() * zootopiaDailyQuotes.length)];
    const banner = document.createElement('div');
    banner.className = 'daily-quote-banner';
    banner.innerHTML = `
      <div class="daily-quote-content">
        <span class="daily-quote-emoji">${quote.emoji}</span>
        <span class="daily-quote-text">"${quote.quote}"</span>
        <span class="daily-quote-character">- ${quote.character}</span>
        <button class="daily-quote-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    banner.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, rgba(255, 159, 67, 0.95), rgba(238, 90, 36, 0.95));
      color: white;
      padding: 15px 30px;
      border-radius: 25px;
      box-shadow: 0 5px 20px rgba(255, 159, 67, 0.4);
      z-index: 9999;
      font-weight: bold;
      animation: bannerSlideDown 0.5s ease;
    `;
    return banner;
  }

  // 动物城小游戏：猜角色
  function createGuessCharacterGame() {
    const characters = [
      { name: 'Judy Hopps', emoji: '🐰', hints: ['兔子', '警察', '第一位兔子警官'] },
      { name: 'Nick Wilde', emoji: '🦊', hints: ['狐狸', '卖 Pawpsicles', '狡猾'] },
      { name: 'Chief Bogo', emoji: '🦬', hints: ['非洲水牛', 'ZPD局长', '严肃'] },
      { name: 'Flash', emoji: '🦥', hints: ['树懒', 'DMV职员', '超慢'] },
      { name: 'Clawhauser', emoji: '🦆', hints: ['猎豹', '前台接待', 'Gazelle粉丝'] }
    ];

    const character = characters[Math.floor(Math.random() * characters.length)];
    const hints = character.hints.sort(() => Math.random() - 0.5);
    const currentHint = hints[0];

    const gameBox = document.createElement('div');
    gameBox.className = 'guess-character-game';
    gameBox.innerHTML = `
      <div class="game-header">🎮 猜猜我是谁</div>
      <div class="game-emoji">${character.emoji}</div>
      <div class="game-hint">提示: ${currentHint}</div>
      <div class="game-options">
        ${characters.map(c => `
          <button class="game-option" data-name="${c.name}">${c.emoji} ${c.name}</button>
        `).join('')}
      </div>
      <div class="game-message"></div>
    `;
    gameBox.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 9998;
      min-width: 250px;
    `;
    return gameBox;
  }

  // 动物城地区导航器
  function createDistrictNavigator() {
    const districts = [
      { name: 'Sahara Square', emoji: '🏜️', color: '#FF9F43', desc: '温暖的沙漠风情' },
      { name: 'Tundratown', emoji: '❄️', color: '#0ABDE3', desc: '寒冷的冰雪世界' },
      { name: 'Rainforest', emoji: '🌴', color: '#10AC84', desc: '热带雨林探险' },
      { name: 'Downtown', emoji: '🏙️', color: '#5F27CD', desc: '繁华都市中心' },
      { name: 'Bunnyburrow', emoji: '🥕', color: '#26DE81', desc: '宁静田园风光' }
    ];

    const nav = document.createElement('div');
    nav.className = 'district-navigator';
    nav.innerHTML = '<div class="nav-title">🗺️ 快速导航</div>';

    districts.forEach(d => {
      const btn = document.createElement('div');
      btn.className = 'district-nav-item';
      btn.innerHTML = `
        <div class="nav-emoji">${d.emoji}</div>
        <div class="nav-name">${d.name}</div>
        <div class="nav-desc">${d.desc}</div>
      `;
      btn.style.cssText = `
        padding: 15px;
        border-radius: 10px;
        margin: 10px 0;
        cursor: pointer;
        transition: all 0.3s ease;
        border-left: 4px solid ${d.color};
        background: rgba(255, 255, 255, 0.8);
      `;
      btn.onmouseenter = () => {
        btn.style.transform = 'translateX(10px)';
        btn.style.background = `${d.color}15`;
      };
      btn.onmouseleave = () => {
        btn.style.transform = 'translateX(0)';
        btn.style.background = 'rgba(255, 255, 255, 0.8)';
      };
      nav.appendChild(btn);
    });

    nav.style.cssText = `
      position: fixed;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 9997;
      max-height: 80vh;
      overflow-y: auto;
    `;
    return nav;
  }

  // 注入样式
  function injectStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      @keyframes bannerSlideDown {
        from {
          transform: translateX(-50%) translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }

      .game-option {
        display: block;
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 2px solid #FF9F43;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
      }

      .game-option:hover {
        background: #FF9F43;
        color: white;
        transform: scale(1.05);
      }

      .game-option.correct {
        background: #10AC84;
        color: white;
        border-color: #10AC84;
      }

      .game-option.wrong {
        background: #FF6B6B;
        color: white;
        border-color: #FF6B6B;
      }

      .game-header {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
      }

      .game-emoji {
        font-size: 64px;
        text-align: center;
        margin-bottom: 15px;
      }

      .game-hint {
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-bottom: 15px;
        font-style: italic;
      }

      .game-message {
        text-align: center;
        margin-top: 15px;
        font-weight: bold;
        min-height: 20px;
      }
    `;
    document.head.appendChild(styles);
  }

  // 初始化高级功能
  function initAdvancedFeatures() {
    injectStyles();

    // 每日一言（首次访问显示）
    if (!sessionStorage.getItem('daily-quote-seen')) {
      const banner = createDailyQuoteBanner();
      document.body.appendChild(banner);
      sessionStorage.setItem('daily-quote-seen', 'true');

      // 10秒后自动移除
      setTimeout(() => {
        if (banner.parentNode) {
          banner.style.animation = 'bannerSlideUp 0.5s ease forwards';
          setTimeout(() => banner.remove(), 500);
        }
      }, 10000);
    }

    // 小游戏（随机显示，30%概率）
    if (Math.random() < 0.3 && !sessionStorage.getItem('game-played')) {
      const game = createGuessCharacterGame();
      document.body.appendChild(game);

      // 绑定选项事件
      const options = game.querySelectorAll('.game-option');
      const message = game.querySelector('.game-message');
      const correctName = game.querySelector('.game-emoji').textContent;

      options.forEach(option => {
        option.onclick = () => {
          const name = option.dataset.name;
          const emoji = game.querySelector('.game-emoji').textContent;

          if (emoji === character.emoji && name === character.name) {
            option.classList.add('correct');
            message.textContent = '✅ 正确！太棒了！';
            message.style.color = '#10AC84';
            game.querySelector('.game-hint').textContent = `正确答案：${character.name}`;
          } else {
            option.classList.add('wrong');
            message.textContent = '❌ 再试一次！';
            message.style.color = '#FF6B6B';
          }

          // 禁用所有选项
          options.forEach(opt => opt.style.pointerEvents = 'none');
        };
      });

      // 30秒后自动移除
      setTimeout(() => {
        game.remove();
      }, 30000);
    }

    // 地区导航器（悬停显示）
    const nav = createDistrictNavigator();
    document.body.appendChild(nav);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedFeatures);
  } else {
    initAdvancedFeatures();
  }
})();
