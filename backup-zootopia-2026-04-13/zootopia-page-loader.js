/**
 * 疯狂动物城主题 - 页面加载动画系统
 * Zootopia Theme - Page Loading Animation System
 * | 进入动物城的精彩加载动画
 */

(function() {
  'use strict';

  // 加载动画配置
  const loaderConfig = {
    minLoadTime: 1500,
    maxLoadTime: 5000,
    animationDuration: 800
  };

  // 动物城加载场景
  const loadingScenes = [
    {
      id: 'train',
      name: '火车进站',
      icon: '🚂',
      elements: ['火车', '轨道', '车站', '乘客']
    },
    {
      id: 'pawpsicle',
      name: 'Pawpsicle',
      icon: '🍦',
      elements: ['冰棍', '胡萝卜', '狐狸', '兔子']
    },
    {
      id: 'city',
      name: '城市全景',
      icon: '🏙️',
      elements: ['建筑', '汽车', '角色', '标志']
    },
    {
      id: 'police',
      name: 'ZPD总部',
      icon: '🚔',
      elements: ['警徽', '局长', '警官', '案件']
    }
  ];

  // 页面加载状态
  let pageLoadState = {
    startTime: Date.now(),
    isLoading: true,
    currentScene: null
  };

  // 创建加载器
  function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'zootopia-page-loader';
    loader.id = 'pageLoader';

    const scene = loadingScenes[Math.floor(Math.random() * loadingScenes.length)];
    pageLoadState.currentScene = scene.id;

    loader.innerHTML = `
      <div class="loader-backdrop">
        <div class="backdrop-animation">
          <div class="city-skyline"></div>
          <div class="clouds">
            <div class="cloud cloud-1"></div>
            <div class="cloud cloud-2"></div>
            <div class="cloud cloud-3"></div>
          </div>
        </div>
      </div>

      <div class="loader-content">
        <div class="loader-icon">
          <div class="icon-container">
            <div class="main-icon">${scene.icon}</div>
            <div class="rotating-ring"></div>
            <div class="pulsing-glow"></div>
          </div>
        </div>

        <div class="loader-text">
          <div class="loading-title">正在进入疯狂动物城...</div>
          <div class="loading-subtitle">${scene.name}</div>
        </div>

        <div class="loader-progress">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" id="loaderProgressBar"></div>
          </div>
          <div class="progress-text">
            <span id="loaderProgressText">0%</span>
          </div>
        </div>

        <div class="loader-facts">
          <div class="fact-item" id="loadingFact">
            <span class="fact-icon">💡</span>
            <span class="fact-text">你知道吗？动物城有12个不同的气候区！</span>
          </div>
        </div>

        <div class="loader-characters">
          <div class="character character-1" style="animation-delay: 0s">🐰</div>
          <div class="character character-2" style="animation-delay: 0.5s">🦊</div>
          <div class="character character-3" style="animation-delay: 1s">🐢</div>
          <div class="character character-4" style="animation-delay: 1.5s">🦁</div>
        </div>
      </div>
    `;

    return loader;
  }

  // 疯狂动物城冷知识
  const zootopiaFacts = [
    { icon: '💡', text: '你知道吗？动物城有12个不同的气候区！' },
    { icon: '🐰', text: '朱迪是动物城历史上第一个兔子警官！' },
    { icon: '🦊', text: '尼克一天能卖2000根Pawpsicle！' },
    { icon: '🐢', text: '闪电是动物城最快的树懒...他敲断号需要3小时！' },
    { icon: '🦁', text: '博戈局长的口头禅是"效率"！' },
    { icon: '🦌', text: '羚羊的《Try Everything》是动物城的主题曲！' },
    { icon: '🐀', text: 'Mr. Big其实是一只小小的北极鼩！' },
    { icon: '🚔', text: 'ZPD代表动物城警察局！' },
    { icon: '🏜️', text: '撒哈拉广场是沙漠主题的度假区！' },
    { icon: '❄️', text: '冰川镇全年保持零下温度！' },
    { icon: '🌴', text: '雨林区的缆车系统连接着各个区域！' },
    { icon: '🥕', text: '兔子洞有276个胡萝卜田！' }
  ];

  // 更新加载进度
  function updateLoaderProgress(percent) {
    const progressBar = document.getElementById('loaderProgressBar');
    const progressText = document.getElementById('loaderProgressText');

    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }

    if (progressText) {
      progressText.textContent = `${percent}%`;
    }

    // 更新冷知识
    if (percent % 25 === 0) {
      updateLoadingFact();
    }
  }

  // 更新冷知识
  function updateLoadingFact() {
    const factElement = document.getElementById('loadingFact');
    if (!factElement) return;

    const fact = zootopiaFacts[Math.floor(Math.random() * zootopiaFacts.length)];

    factElement.innerHTML = `
      <span class="fact-icon">${fact.icon}</span>
      <span class="fact-text">${fact.text}</span>
    `;

    factElement.style.animation = 'none';
    factElement.offsetHeight; // 触发重排
    factElement.style.animation = 'factFadeIn 0.5s ease';
  }

  // 模拟加载进度
  function simulateLoading() {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      const elapsed = Date.now() - pageLoadState.startTime;
      const targetProgress = Math.min(100, (elapsed / loaderConfig.minLoadTime) * 100);

      progress = Math.max(progress, targetProgress + Math.random() * 5);

      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        updateLoaderProgress(100);

        setTimeout(() => {
          hidePageLoader();
        }, 500);
      } else {
        updateLoaderProgress(Math.round(progress));
      }
    }, 100);
  }

  // 隐藏加载器
  function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    loader.classList.add('loader-hide');

    setTimeout(() => {
      loader.style.display = 'none';

      // 显示进入动画
      showEnterAnimation();
    }, loaderConfig.animationDuration);
  }

  // 显示页面进入动画
  function showEnterAnimation() {
    const body = document.body;
    body.classList.add('page-enter');

    // 添加动画完成后移除类
    setTimeout(() => {
      body.classList.remove('page-enter');
    }, 1000);
  }

  // 创建快速重新加载按钮
  function createReloadButton() {
    const button = document.createElement('button');
    button.className = 'reload-loader-btn';
    button.innerHTML = '🎬 重新加载动画';
    button.onclick = () => {
      location.reload();
    };
    return button;
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#page-loader-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'page-loader-styles';
    styles.textContent = `
      /* 页面加载器 */
      .zootopia-page-loader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.8s ease, visibility 0.8s ease;
      }

      .zootopia-page-loader.loader-hide {
        opacity: 0;
        visibility: hidden;
      }

      /* 背景动画 */
      .loader-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #FFEAA7 0%, #74B9FF 100%);
      }

      .backdrop-animation {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .city-skyline {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><rect fill="%232C3E50" x="0" y="150" width="80" height="50"/><rect fill="%2334495E" x="100" y="120" width="60" height="80"/><rect fill="%235F27CD" x="180" y="130" width="100" height="70"/><rect fill="%239B59B6" x="300" y="140" width="70" height="60"/><rect fill="%2334498DB" x="400" y="110" width="90" height="90"/><rect fill="%232ECC71" x="520" y="150" width="60" height="50"/></svg>') repeat-x;
        background-size: 600px 200px;
        animation: skylineMove 20s linear infinite;
        opacity: 0.3;
      }

      @keyframes skylineMove {
        0% { background-position: 0 0; }
        100% { background-position: -600px 0; }
      }

      .clouds {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .cloud {
        position: absolute;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50px;
        animation: cloudFloat 30s linear infinite;
      }

      .cloud-1 {
        width: 100px;
        height: 40px;
        top: 10%;
        left: -100px;
        animation-duration: 25s;
      }

      .cloud-2 {
        width: 80px;
        height: 30px;
        top: 20%;
        left: -80px;
        animation-delay: 10s;
        animation-duration: 30s;
      }

      .cloud-3 {
        width: 120px;
        height: 50px;
        top: 5%;
        left: -120px;
        animation-delay: 20s;
        animation-duration: 35s;
      }

      @keyframes cloudFloat {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(100vw + 120px));
        }
      }

      /* 加载内容 */
      .loader-content {
        position: relative;
        text-align: center;
        z-index: 1;
        padding: 40px;
      }

      .loader-icon {
        margin-bottom: 30px;
      }

      .icon-container {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto;
      }

      .main-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 60px;
        animation: iconBounce 1s ease infinite;
      }

      @keyframes iconBounce {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
        }
      }

      .rotating-ring {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 4px solid transparent;
        border-top-color: #FF9F43;
        border-radius: 50%;
        animation: rotate 1s linear infinite;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      .pulsing-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(255, 159, 67, 0.4), transparent);
        border-radius: 50%;
        animation: pulse 1.5s ease infinite;
      }

      @keyframes pulse {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.5;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.3);
          opacity: 0.3;
        }
      }

      /* 加载文本 */
      .loader-text {
        margin-bottom: 30px;
      }

      .loading-title {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 8px;
        animation: titlePulse 2s ease infinite;
      }

      @keyframes titlePulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }

      .loading-subtitle {
        font-size: 16px;
        color: #636E72;
      }

      /* 进度条 */
      .loader-progress {
        margin-bottom: 30px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }

      .progress-bar-bg {
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #FF9F43, #EE5A24, #E74C3C);
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      .progress-text {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #FF9F43;
      }

      /* 冷知识 */
      .loader-facts {
        max-width: 400px;
        margin: 0 auto 30px;
      }

      .fact-item {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .fact-icon {
        font-size: 20px;
      }

      .fact-text {
        font-size: 14px;
        color: #2D3436;
      }

      @keyframes factFadeIn {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 角色动画 */
      .loader-characters {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
      }

      .character {
        font-size: 32px;
        opacity: 0;
        animation: characterPop 0.5s ease forwards;
      }

      @keyframes characterPop {
        0% {
          opacity: 0;
          transform: scale(0) translateY(20px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      /* 页面进入动画 */
      .page-enter #page,
      .page-enter > * {
        animation: pageFadeIn 1s ease forwards;
      }

      .page-enter > *:nth-child(1) { animation-delay: 0s; }
      .page-enter > *:nth-child(2) { animation-delay: 0.1s; }
      .page-enter > *:nth-child(3) { animation-delay: 0.2s; }
      .page-enter > *:nth-child(4) { animation-delay: 0.3s; }

      @keyframes pageFadeIn {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 重新加载按钮 */
      .reload-loader-btn {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        border-radius: 25px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10000;
        opacity: 0.8;
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .reload-loader-btn:hover {
        opacity: 1;
        transform: translateX(-50%) scale(1.05);
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .main-icon {
          font-size: 50px;
        }

        .loading-title {
          font-size: 20px;
        }

        .loading-subtitle {
          font-size: 14px;
        }

        .character {
          font-size: 28px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化加载器
  function initPageLoader() {
    injectStyles();

    const loader = createPageLoader();
    document.body.appendChild(loader);

    // 开始模拟加载
    simulateLoading();

    // 添加重新加载按钮
    const reloadBtn = createReloadButton();
    document.body.appendChild(reloadBtn);
  }

  // 导出函数供外部使用
  window.zootopiaLoader = {
    show: () => {
      location.reload();
    },
    updateProgress: updateLoaderProgress
  };

  // 页面加载时初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // 等待页面基本加载后再显示加载器
      setTimeout(initPageLoader, 100);
    });
  } else {
    // 页面已加载，直接初始化
    initPageLoader();
  }
})();
