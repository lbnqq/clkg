/**
 * 疯狂动物城主题 - 沉浸式交互体验
 * Zootopia Immersive Interactive Experience
 */

(function() {
  'use strict';

  // 角色互动系统
  const characterInteractions = {
    judy: {
      phrases: [
        "Try Everything! 永不放弃！",
        "任何人都可以成就任何事！",
        "改变从你开始！",
        "我是ZPD第一位兔子警官！",
        "胡萝卜蛋糕是我的最爱！"
      ],
      mood: 'energetic',
      color: '#FF9F43'
    },
    nick: {
      phrases: [
        "It's called a hustle, sweetheart!",
        "狡猾是我的生存之道",
        "这个 Pawpsicle 只要 $2",
        "你知道一只狐狸一年能赚多少吗？",
        "让我教你怎样做买卖"
      ],
      mood: 'sly',
      color: '#EE5A24'
    },
    flash: {
      phrases: [
        "..............................",
        "你...好...",
        "请...稍...等...",
        "我...马...上...好...",
        "今...天...天...气...不...错..."
      ],
      mood: 'slow',
      color: '#0ABDE3'
    },
    bogo: {
      phrases: [
        "你有48小时！",
        "生命不是卡通音乐剧！",
        "这不是一个请求",
        "效率！我要看到效率！",
        "办公室可不是给你睡觉的"
      ],
      mood: 'serious',
      color: '#5F27CD'
    },
    clawhauser: {
      phrases: [
        "Gazelle 的新歌太好听了！",
        "你是 Gazelle 的粉丝吗？",
        "我就爱甜甜圈！",
        "欢迎来到ZPD！",
        "你有预约吗？"
      ],
      mood: 'cheerful',
      color: '#10AC84'
    }
  };

  // 地区天气数据
  const districtWeather = {
    sahara: {
      name: '撒哈拉广场',
      emoji: '🏜️',
      temp: 38,
      condition: '晴朗',
      advice: '记得涂防晒霜！'
    },
    tundratown: {
      name: '冰川镇',
      emoji: '❄️',
      temp: -12,
      condition: '寒冷',
      advice: '穿厚点！'
    },
    rainforest: {
      name: '雨林区',
      emoji: '🌴',
      temp: 28,
      condition: '多云转雨',
      advice: '带把伞！'
    },
    downtown: {
      name: '市中心',
      emoji: '🏙️',
      temp: 22,
      condition: '晴',
      advice: '适合逛街！'
    },
    bunnyburrow: {
      name: '兔子洞',
      emoji: '🥕',
      temp: 20,
      condition: '晴朗',
      advice: '胡萝卜丰收了！'
    }
  };

  // 创建角色互动气泡
  function createCharacterBubble(character = 'judy') {
    const char = characterInteractions[character];
    if (!char) return null;

    const phrase = char.phrases[Math.floor(Math.random() * char.phrases.length)];
    const bubble = document.createElement('div');
    bubble.className = `zootopia-char-bubble char-${character}`;
    bubble.innerHTML = `
      <div class="bubble-avatar">${character === 'judy' ? '🐰' : character === 'nick' ? '🦊' : character === 'flash' ? '🦥' : character === 'bogo' ? '🦬' : '🦆'}</div>
      <div class="bubble-content">
        <div class="bubble-text">${phrase}</div>
        <div class="bubble-close" onclick="this.parentElement.parentElement.remove()">×</div>
      </div>
    `;

    // 随机位置
    const positions = [
      { top: '80px', right: '20px' },
      { top: '80px', left: '20px' },
      { bottom: '100px', right: '20px' },
      { bottom: '100px', left: '20px' }
    ];
    const pos = positions[Math.floor(Math.random() * positions.length)];
    Object.assign(bubble.style, pos);

    // 添加样式
    bubble.style.cssText += `
      position: fixed;
      z-index: 9999;
      max-width: 300px;
      animation: bubblePop 0.5s ease;
    `;

    return bubble;
  }

  // 创建天气小组件
  function createWeatherWidget() {
    const districts = Object.values(districtWeather);
    const district = districts[Math.floor(Math.random() * districts.length)];

    const widget = document.createElement('div');
    widget.className = 'zootopia-weather-widget';
    widget.innerHTML = `
      <div class="weather-header">
        <span class="weather-emoji">${district.emoji}</span>
        <span class="weather-title">${district.name}天气</span>
      </div>
      <div class="weather-temp">${district.temp}°C</div>
      <div class="weather-condition">${district.condition}</div>
      <div class="weather-advice">${district.advice}</div>
      <div class="weather-time">${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</div>
    `;

    widget.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      background: linear-gradient(135deg, ${district.emoji === '🏜️' ? '#FF9F43' : district.emoji === '❄️' ? '#0ABDE3' : district.emoji === '🌴' ? '#10AC84' : district.emoji === '🏙️' ? '#5F27CD' : '#26DE81'}, ${district.emoji === '🏜️' ? '#EE5A24' : district.emoji === '❄️' ? '#48DBFB' : district.emoji === '🌴' ? '#1DD1A1' : district.emoji === '🏙️' ? '#341F97' : '#20BF6B'});
      color: white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 9998;
      font-family: 'Arial', sans-serif;
      min-width: 200px;
    `;

    return widget;
  }

  // 创建Pawpsicles计数器升级版
  function createPawpsicleCounter() {
    const count = parseInt(localStorage.getItem('pawpsicles-collected') || '0');

    const counter = document.createElement('div');
    counter.className = 'pawpsicle-counter-upgrade';
    counter.innerHTML = `
      <div class="counter-header">🍦 Nick's 商店</div>
      <div class="counter-item">
        <span class="counter-icon">🍦</span>
        <span class="counter-label">Pawpsicles</span>
        <span class="counter-value">${count}</span>
      </div>
      <div class="counter-item">
        <span class="counter-icon">💰</span>
        <span class="counter-label">今日收入</span>
        <span class="counter-value">$${count * 2}</span>
      </div>
      <button class="counter-btn" onclick="collectPawpsicle()">+ 收集 Pawpsicle</button>
    `;

    counter.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: white;
      border: 3px solid #EE5A24;
      border-radius: 15px;
      padding: 15px;
      box-shadow: 0 5px 20px rgba(238, 90, 36, 0.3);
      z-index: 9997;
      font-family: 'Arial', sans-serif;
    `;

    return counter;
  }

  // 创建ZPD任务板
  function createZPDTaskBoard() {
    const missions = [
      { id: 1, title: '寻找丢失的甜甜圈', priority: 'high', reward: '$50' },
      { id: 2, title: '交通巡逻', priority: 'medium', reward: '$30' },
      { id: 3, title: '社区服务', priority: 'low', reward: '$20' },
      { id: 4, title: '破获重大案件', priority: 'high', reward: '$500' }
    ];

    const board = document.createElement('div');
    board.className = 'zpd-task-board';
    board.innerHTML = `
      <div class="board-header">
        <span class="board-icon">👮</span>
        <span class="board-title">ZPD 任务板</span>
      </div>
      <div class="board-missions">
        ${missions.map(m => `
          <div class="mission-item priority-${m.priority}">
            <div class="mission-title">${m.title}</div>
            <div class="mission-reward">奖励: ${m.reward}</div>
            <button class="mission-accept" onclick="acceptMission(${m.id})">接受任务</button>
          </div>
        `).join('')}
      </div>
    `;

    board.style.cssText = `
      position: fixed;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #2C3E50, #34495E);
      color: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      z-index: 9996;
      max-width: 280px;
    `;

    return board;
  }

  // 创建地区快速切换器
  function createDistrictQuickSwitch() {
    const districts = [
      { name: 'Sahara', emoji: '🏜️', color: '#FF9F43' },
      { name: 'Tundra', emoji: '❄️', color: '#0ABDE3' },
      { name: 'Rainforest', emoji: '🌴', color: '#10AC84' },
      { name: 'Downtown', emoji: '🏙️', color: '#5F27CD' }
    ];

    const switcher = document.createElement('div');
    switcher.className = 'district-quick-switch';
    switcher.innerHTML = `
      <div class="switch-title">🚇 快速切换地区</div>
      ${districts.map(d => `
        <div class="switch-item" style="border-left: 4px solid ${d.color}" data-district="${d.name}">
          <span class="switch-emoji">${d.emoji}</span>
          <span class="switch-name">${d.name}</span>
        </div>
      `).join('')}
    `;

    switcher.style.cssText = `
      position: fixed;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      padding: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      z-index: 9995;
    `;

    // 添加点击事件
    switcher.querySelectorAll('.switch-item').forEach(item => {
      item.style.cssText = `
        padding: 10px 15px;
        margin: 8px 0;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      item.onmouseenter = () => {
        item.style.transform = 'translateX(10px)';
        item.style.background = 'rgba(0, 0, 0, 0.05)';
      };
      item.onmouseleave = () => {
        item.style.transform = 'translateX(0)';
        item.style.background = 'transparent';
      };
      item.onclick = () => {
        const district = item.dataset.district;
        document.body.style.setProperty('--theme-color', districts.find(d => d.name === district).color);
        // 保存选择
        localStorage.setItem('zootopia-district', district);
      };
    });

    return switcher;
  }

  // 创建滚动进度指示器（动物城主题）
  function createZootopiaScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'zootopia-scroll-indicator';
    indicator.innerHTML = `
      <div class="indicator-track">
        <div class="indicator-fill"></div>
      </div>
      <div class="indicator-train">🚂</div>
    `;

    indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      z-index: 10000;
      pointer-events: none;
    `;

    // 更新进度
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const fill = indicator.querySelector('.indicator-fill');
      const train = indicator.querySelector('.indicator-train');

      fill.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #FF9F43, #0ABDE3, #10AC84);
        width: ${scrollPercent}%;
        transition: width 0.1s ease;
      `;

      train.style.cssText = `
        position: absolute;
        left: ${scrollPercent}%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        transition: left 0.1s ease;
      `;
    });

    return indicator;
  }

  // 创建页面加载动画
  function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'zootopia-page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-train">🚂</div>
        <div class="loader-text">前往动物城...</div>
        <div class="loader-progress">
          <div class="loader-bar"></div>
        </div>
      </div>
    `;

    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #FF9F43, #0ABDE3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    // 页面加载完成后移除
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => loader.remove(), 500);
      }, 1000);
    });

    return loader;
  }

  // 创建角色随机出现系统
  function initCharacterRandomAppearance() {
    const characters = ['judy', 'nick', 'flash', 'bogo', 'clawhauser'];

    // 每2-5分钟随机出现一个角色气泡
    setInterval(() => {
      if (Math.random() < 0.3) { // 30% 概率
        const character = characters[Math.floor(Math.random() * characters.length)];
        const bubble = createCharacterBubble(character);
        if (bubble) {
          document.body.appendChild(bubble);

          // 10秒后自动移除
          setTimeout(() => {
            if (bubble.parentNode) {
              bubble.style.animation = 'bubbleFadeOut 0.5s ease forwards';
              setTimeout(() => bubble.remove(), 500);
            }
          }, 10000);
        }
      }
    }, 2 * 60 * 1000); // 2分钟检查一次
  }

  // 初始化所有沉浸式功能
  function initImmersiveFeatures() {
    // 注入样式
    const styles = document.createElement('style');
    styles.textContent = `
      @keyframes bubblePop {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
      }

      @keyframes bubbleFadeOut {
        to { transform: scale(0); opacity: 0; }
      }

      .zootopia-char-bubble {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }

      .bubble-avatar {
        font-size: 40px;
        animation: avatarBounce 1s ease infinite;
      }

      @keyframes avatarBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .bubble-content {
        background: white;
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
        position: relative;
        max-width: 250px;
      }

      .bubble-content::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 20px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent white transparent transparent;
      }

      .bubble-text {
        color: #333;
        font-size: 14px;
        line-height: 1.5;
      }

      .bubble-close {
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
        color: #999;
        transition: color 0.3s ease;
      }

      .bubble-close:hover {
        color: #FF6B6B;
      }

      .weather-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: bold;
      }

      .weather-temp {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .weather-condition {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 10px;
      }

      .weather-advice {
        font-size: 12px;
        opacity: 0.8;
        font-style: italic;
      }

      .weather-time {
        font-size: 11px;
        opacity: 0.7;
        margin-top: 10px;
        text-align: right;
      }

      .counter-header {
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #EE5A24;
      }

      .counter-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid rgba(238, 90, 36, 0.2);
      }

      .counter-icon {
        font-size: 20px;
      }

      .counter-label {
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
      }

      .counter-value {
        font-weight: bold;
        color: #EE5A24;
      }

      .counter-btn {
        width: 100%;
        margin-top: 15px;
        padding: 10px;
        background: linear-gradient(135deg, #EE5A24, #FF9F43);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.3s ease;
      }

      .counter-btn:hover {
        transform: scale(1.05);
      }

      .board-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
      }

      .mission-item {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 10px;
        border-left: 4px solid;
      }

      .mission-item.priority-high {
        border-left-color: #FF6B6B;
      }

      .mission-item.priority-medium {
        border-left-color: #FFD93D;
      }

      .mission-item.priority-low {
        border-left-color: #6BCB77;
      }

      .mission-title {
        font-size: 14px;
        margin-bottom: 8px;
      }

      .mission-reward {
        font-size: 12px;
        color: #FFD93D;
        margin-bottom: 10px;
      }

      .mission-accept {
        width: 100%;
        padding: 6px;
        background: #10AC84;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        transition: background 0.3s ease;
      }

      .mission-accept:hover {
        background: #1DD1A1;
      }

      .switch-title {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
      }

      .switch-emoji {
        font-size: 20px;
      }

      .switch-name {
        font-size: 12px;
        font-weight: 600;
        color: #555;
      }

      .indicator-track {
        position: relative;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
      }

      .loader-content {
        text-align: center;
        color: white;
      }

      .loader-train {
        font-size: 80px;
        animation: trainMove 1s ease-in-out infinite;
      }

      @keyframes trainMove {
        0%, 100% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
      }

      .loader-text {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }

      .loader-progress {
        width: 300px;
        height: 10px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        overflow: hidden;
        margin: 0 auto;
      }

      .loader-bar {
        height: 100%;
        background: white;
        border-radius: 10px;
        animation: loadingBar 2s ease-in-out infinite;
      }

      @keyframes loadingBar {
        0% { width: 0%; }
        50% { width: 80%; }
        100% { width: 100%; }
      }
    `;
    document.head.appendChild(styles);

    // 添加页面加载器
    document.body.appendChild(createPageLoader());

    // 添加滚动进度指示器
    document.body.appendChild(createZootopiaScrollIndicator());

    // 添加天气小组件（仅在首页显示）
    if (document.body.classList.contains('home') || location.pathname === '/') {
      document.body.appendChild(createWeatherWidget());
    }

    // 添加Pawpsicles计数器
    document.body.appendChild(createPawpsicleCounter());

    // 添加ZPD任务板
    document.body.appendChild(createZPDTaskBoard());

    // 添加地区快速切换器
    document.body.appendChild(createDistrictQuickSwitch());

    // 初始化角色随机出现系统
    initCharacterRandomAppearance();

    // 全局函数：收集Pawpsicle
    window.collectPawpsicle = function() {
      const count = parseInt(localStorage.getItem('pawpsicles-collected') || '0') + 1;
      localStorage.setItem('pawpsicles-collected', count.toString());

      // 更新显示
      const counterValue = document.querySelector('.counter-value');
      if (counterValue) {
        counterValue.textContent = count;
      }

      // 显示收集动画
      const notification = document.createElement('div');
      notification.textContent = '🍦 +1 Pawpsicle!';
      notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #EE5A24, #FF9F43);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 24px;
        font-weight: bold;
        z-index: 99999;
        animation: collectAnimation 1s ease forwards;
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes collectAnimation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 1000);
    };

    // 全局函数：接受任务
    window.acceptMission = function(id) {
      const notification = document.createElement('div');
      notification.textContent = '✅ 任务已接受！好运！';
      notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 320px;
        background: #10AC84;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.5s ease;
      `;

      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImmersiveFeatures);
  } else {
    initImmersiveFeatures();
  }
})();
