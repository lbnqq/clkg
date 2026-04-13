/**
 * 疯狂动物城主题 - 季节性装饰系统
 * Zootopia Theme - Seasonal Decorations
 * 根据季节自动更换装饰元素
 */

(function() {
  'use strict';

  // 获取当前季节
  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;

    if (month >= 3 && month <= 5) {
      return 'spring';
    } else if (month >= 6 && month <= 8) {
      return 'summer';
    } else if (month >= 9 && month <= 11) {
      return 'autumn';
    } else {
      return 'winter';
    }
  }

  // 季节配置
  const seasons = {
    spring: {
      name: '春季',
      nameEn: 'Spring',
      emoji: '🌸',
      colors: ['#FFB6C1', '#FFC0CB', '#FFDAB9', '#FFE4E1'],
      primaryColor: '#FF69B4',
      decorations: ['🌸', '🌷', '🌹', '🌺', '🌻', '🌼', '🌱', '🐝', '🦋'],
      message: '春暖花开，万物复苏！',
      bgGradient: 'linear-gradient(135deg, #FFE4E1 0%, #FFC0CB 50%, #FFB6C1 100%)'
    },
    summer: {
      name: '夏季',
      nameEn: 'Summer',
      emoji: '☀️',
      colors: ['#FFD700', '#FFA500', '#FF6347', '#FF4500'],
      primaryColor: '#FF8C00',
      decorations: ['☀️', '🌞', '🏖️', '🍦', '🍉', '🌴', '🌻', '🐚', '🕶️'],
      message: '夏日炎炎，清凉一夏！',
      bgGradient: 'linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 50%, #FFDAB9 100%)'
    },
    autumn: {
      name: '秋季',
      nameEn: 'Autumn',
      emoji: '🍂',
      colors: ['#D2691E', '#CD853F', '#8B4513', '#A0522D'],
      primaryColor: '#D2691E',
      decorations: ['🍂', '🍁', '🌰', '🎃', '🍎', '🌾', '🦔', '🐿️', '🦃'],
      message: '秋高气爽，收获满满！',
      bgGradient: 'linear-gradient(135deg, #FFE4C4 0%, #FFDAB9 50%, #DEB887 100%)'
    },
    winter: {
      name: '冬季',
      nameEn: 'Winter',
      emoji: '❄️',
      colors: ['#E0FFFF', '#B0E0E6', '#87CEEB', '#ADD8E6'],
      primaryColor: '#00CED1',
      decorations: ['❄️', '⛄', '🎄', '🎅', '🎁', '🕎️', '🐧', '🦌', '🔔'],
      message: '冬日暖阳，温馨时光！',
      bgGradient: 'linear-gradient(135deg, #E0FFFF 0%, #B0E0E6 50%, #ADD8E6 100%)'
    }
  };

  // 当前季节
  const currentSeason = getCurrentSeason();
  const seasonConfig = seasons[currentSeason];

  // 创建季节装饰容器
  function createSeasonalDecorations() {
    const container = document.createElement('div');
    container.className = 'seasonal-decorations';
    container.dataset.season = currentSeason;

    // 添加浮动装饰元素
    for (let i = 0; i < 15; i++) {
      const decoration = document.createElement('div');
      decoration.className = 'floating-decoration';

      const emoji = seasonConfig.decorations[Math.floor(Math.random() * seasonConfig.decorations.length)];
      decoration.textContent = emoji;

      // 随机位置和大小
      const size = 20 + Math.random() * 30;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 5;

      decoration.style.cssText = `
        position: fixed;
        left: ${left}%;
        top: ${top}%;
        font-size: ${size}px;
        opacity: ${0.3 + Math.random() * 0.4};
        pointer-events: none;
        z-index: 1;
        animation: float${i} ${duration}s ease-in-out ${delay}s infinite;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      `;

      // 添加自定义动画
      const keyframes = `
        @keyframes float${i} {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 20 - 10}deg);
          }
          50% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 20 - 10}deg);
          }
          75% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 20 - 10}deg);
          }
        }
      `;

      container.appendChild(decoration);

      // 添加动画样式
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
    }

    return container;
  }

  // 创建季节指示器
  function createSeasonIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'season-indicator';
    indicator.innerHTML = `
      <div class="indicator-icon">${seasonConfig.emoji}</div>
      <div class="indicator-text">
        <div class="indicator-season">${seasonConfig.name}</div>
        <div class="indicator-message">${seasonConfig.message}</div>
      </div>
      <button class="indicator-close" title="隐藏">×</button>
    `;

    return indicator;
  }

  // 创建季节切换面板
  function createSeasonSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'season-switcher';
    switcher.innerHTML = `
      <button class="season-trigger" title="切换季节">
        <span class="trigger-icon">${seasonConfig.emoji}</span>
      </button>
      <div class="season-panel">
        <div class="panel-header">
          <h3>🎨 选择季节主题</h3>
          <button class="panel-close">×</button>
        </div>
        <div class="season-options">
          ${Object.entries(seasons).map(([key, season]) => `
            <div class="season-option ${key === currentSeason ? 'active' : ''}" data-season="${key}">
              <div class="option-emoji">${season.emoji}</div>
              <div class="option-info">
                <div class="option-name">${season.name}</div>
                <div class="option-name-en">${season.nameEn}</div>
                <div class="option-message">${season.message}</div>
              </div>
              <div class="option-preview" style="background: ${season.bgGradient}"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    return switcher;
  }

  // 应用季节主题
  function applySeasonTheme(seasonKey) {
    const season = seasons[seasonKey];
    if (!season) return;

    // 移除旧的装饰
    const oldDecorations = document.querySelector('.seasonal-decorations');
    if (oldDecorations) oldDecorations.remove();

    // 添加新的装饰
    document.body.appendChild(createSeasonalDecorations());

    // 更新页面背景
    document.body.style.background = season.bgGradient;
    document.body.style.transition = 'background 1s ease';

    // 更新CSS变量
    const root = document.documentElement;
    root.style.setProperty('--season-primary', season.primaryColor);
    root.style.setProperty('--season-bg', season.bgGradient);

    // 显示季节消息
    showSeasonMessage(season);

    // 保存到本地存储
    localStorage.setItem('zootopiaSeason', seasonKey);

    // 更新当前季节
    const switcher = document.querySelector('.season-switcher');
    if (switcher) {
      switcher.querySelector('.trigger-icon').textContent = season.emoji;
      switcher.querySelectorAll('.season-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.season === seasonKey) {
          option.classList.add('active');
        }
      });
    }
  }

  // 显示季节消息
  function showSeasonMessage(season) {
    const existingMessage = document.querySelector('.season-welcome-message');
    if (existingMessage) existingMessage.remove();

    const message = document.createElement('div');
    message.className = 'season-welcome-message';
    message.innerHTML = `
      <span class="message-emoji">${season.emoji}</span>
      <span class="message-text">切换到${season.name}主题！${season.message}</span>
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = 'messageFadeOut 0.5s ease forwards';
      setTimeout(() => message.remove(), 500);
    }, 3000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#seasonal-decor-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'seasonal-decor-styles';
    styles.textContent = `
      /* 季节指示器 */
      .season-indicator {
        position: fixed;
        top: 80px;
        right: 30px;
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 20px;
        background: linear-gradient(135deg, var(--season-primary, #FF69B4), rgba(255, 255, 255, 0.9));
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        z-index: 9996;
        animation: indicatorSlideIn 0.5s ease;
      }

      @keyframes indicatorSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .indicator-icon {
        font-size: 36px;
      }

      .indicator-season {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .indicator-message {
        font-size: 12px;
        color: #636E72;
      }

      .indicator-close {
        background: none;
        border: none;
        font-size: 20px;
        color: #2D3436;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.3s;
        margin-left: 10px;
      }

      .indicator-close:hover {
        opacity: 1;
      }

      /* 季节切换器 */
      .season-switcher {
        position: fixed;
        bottom: 450px;
        left: 30px;
        z-index: 9995;
      }

      .season-trigger {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #FF69B4, #FFB6C1);
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
        transition: all 0.3s ease;
      }

      .season-trigger:hover {
        transform: scale(1.1) rotate(10deg);
        box-shadow: 0 6px 20px rgba(255, 105, 180, 0.5);
      }

      .season-panel {
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 320px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: panelSlideUp 0.3s ease;
      }

      .season-panel.show {
        display: block;
      }

      @keyframes panelSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .panel-header {
        background: linear-gradient(135deg, #FF69B4, #FFB6C1);
        color: white;
        padding: 15px 20px;
        border-radius: 15px 15px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-header h3 {
        margin: 0;
        font-size: 16px;
      }

      .panel-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
      }

      .panel-close:hover {
        opacity: 1;
      }

      .season-options {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .season-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }

      .season-option:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateX(5px);
      }

      .season-option.active {
        border-color: #FF69B4;
        background: rgba(255, 105, 180, 0.1);
      }

      .option-emoji {
        font-size: 32px;
      }

      .option-info {
        flex: 1;
      }

      .option-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 2px;
      }

      .option-name-en {
        font-size: 11px;
        color: #636E72;
        margin-bottom: 3px;
      }

      .option-message {
        font-size: 11px;
        color: #636E72;
      }

      .option-preview {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        border: 2px solid rgba(0, 0, 0, 0.1);
      }

      /* 季节欢迎消息 */
      .season-welcome-message {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px 30px;
        background: linear-gradient(135deg, var(--season-primary, #FF69B4), white);
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10007;
        animation: messagePop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes messagePop {
        0% {
          opacity: 0;
          transform: translateX(-50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }
      }

      @keyframes messageFadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }

      .message-emoji {
        font-size: 36px;
      }

      .message-text {
        font-size: 16px;
        font-weight: bold;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .season-indicator {
          top: 60px;
          right: 15px;
          padding: 12px 15px;
        }

        .indicator-icon {
          font-size: 28px;
        }

        .season-switcher {
          bottom: 420px;
          left: 20px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化季节装饰
  function initSeasonalDecor() {
    injectStyles();

    // 添加季节装饰
    document.body.appendChild(createSeasonalDecorations());

    // 添加季节指示器
    const indicator = createSeasonIndicator();
    document.body.appendChild(indicator);

    // 关闭按钮
    indicator.querySelector('.indicator-close').onclick = () => {
      indicator.style.animation = 'indicatorSlideOut 0.5s ease forwards';
      setTimeout(() => indicator.remove(), 500);
    };

    // 添加关闭动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes indicatorSlideOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
    `;
    document.head.appendChild(style);

    // 添加季节切换器
    const switcher = createSeasonSwitcher();
    document.body.appendChild(switcher);

    // 切换面板
    const triggerBtn = switcher.querySelector('.season-trigger');
    const panel = switcher.querySelector('.season-panel');

    triggerBtn.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    };

    // 关闭按钮
    switcher.querySelector('.panel-close').onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 季节选项点击
    switcher.querySelectorAll('.season-option').forEach(option => {
      option.onclick = () => {
        const seasonKey = option.dataset.season;
        applySeasonTheme(seasonKey);
        setTimeout(() => {
          panel.classList.remove('show');
        }, 500);
      };
    });

    // 应用初始主题
    applySeasonTheme(currentSeason);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSeasonalDecor);
  } else {
    initSeasonalDecor();
  }

  // 导出切换函数
  window.zootopiaSetSeason = applySeasonTheme;
})();
