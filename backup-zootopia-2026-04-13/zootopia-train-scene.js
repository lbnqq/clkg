/**
 * 疯狂动物城主题 - 火车站场景动画
 * Zootopia Theme - Train Station Scene
 * 模仿电影开场 Judy 乘坐火车的经典场景
 */

(function() {
  'use strict';

  // 站点配置
  const stations = [
    { name: '兔窝镇', nameEn: 'Bunnyburrow', emoji: '🐰', color: '#26DE81', time: '6:00 AM' },
    { name: '小啮齿镇', nameEn: 'Little Rodentia', emoji: '🐭', color: '#EE5A24', time: '7:30 AM' },
    { name: '草甸镇', nameEn: 'Meadowlands', emoji: '🌾', color: '#2ED573', time: '9:00 AM' },
    { name: '冰川镇', nameEn: 'Tundratown', emoji: '❄️', color: '#0ABDE3', time: '10:30 AM' },
    { name: '撒哈拉广场', nameEn: 'Sahara Square', emoji: '🏜️', color: '#FF9F43', time: '12:00 PM' },
    { name: '雨林区', nameEn: 'Rainforest District', emoji: '🌴', color: '#10AC84', time: '1:30 PM' },
    { name: '市中心', nameEn: 'Downtown', emoji: '🏙️', color: '#5F27CD', time: '3:00 PM' }
  ];

  // 当前站点索引
  let currentStation = 0;

  // 创建火车站场景
  function createTrainStation() {
    const station = document.createElement('div');
    station.className = 'zootopia-train-scene';
    station.innerHTML = `
      <div class="station-window">
        <div class="window-frame">
          <div class="scene-container">
            <!-- 背景层 -->
            <div class="background-layer">
              <div class="sky"></div>
              <div class="mountains"></div>
              <div class="city-skyline"></div>
            </div>

            <!-- 中景层 -->
            <div class="midground-layer">
              <div class="trees"></div>
              <div class="buildings"></div>
            </div>

            <!-- 前景层 -->
            <div class="foreground-layer">
              <div class="train-track"></div>
              <div class="train-wheels">
                <div class="wheel wheel-1"></div>
                <div class="wheel wheel-2"></div>
                <div class="wheel wheel-3"></div>
                <div class="wheel wheel-4"></div>
              </div>
            </div>

            <!-- 动物元素 -->
            <div class="animals-layer">
              <div class="animal animal-1">🐰</div>
              <div class="animal animal-2">🐿️</div>
              <div class="animal animal-3">🦊</div>
              <div class="animal animal-4">🦔</div>
            </div>

            <!-- 列车 -->
            <div class="train">
              <div class="train-engine">🚂</div>
              <div class="train-carriage">🚃</div>
              <div class="train-carriage">🚃</div>
            </div>
          </div>

          <!-- 窗户反光 -->
          <div class="window-reflection"></div>
        </div>

        <!-- 车站信息 -->
        <div class="station-info">
          <div class="current-station">
            <span class="station-icon">${stations[currentStation].emoji}</span>
            <div class="station-names">
              <div class="station-name">${stations[currentStation].name}</div>
              <div class="station-name-en">${stations[currentStation].nameEn}</div>
            </div>
          </div>
          <div class="arrival-time">
            <span class="time-label">到达时间</span>
            <span class="time-value">${stations[currentStation].time}</span>
          </div>
        </div>

        <!-- 站点进度 -->
        <div class="station-progress">
          ${stations.map((s, i) => `
            <div class="progress-item ${i === currentStation ? 'current' : ''} ${i < currentStation ? 'visited' : ''}" data-station="${i}">
              <div class="progress-dot"></div>
              <div class="progress-label">${s.emoji}</div>
            </div>
          `).join('')}
          <div class="progress-line"></div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="train-controls">
        <button class="control-btn reverse-btn" title="反向行驶">◀</button>
        <button class="control-btn next-btn" title="下一站">▶</button>
        <button class="control-btn auto-btn" title="自动播放">▶▶</button>
        <button class="control-btn close-btn" title="关闭">✕</button>
      </div>
    `;

    return station;
  }

  // 切换到下一站
  function nextStation() {
    currentStation = (currentStation + 1) % stations.length;
    updateStation();
  }

  // 切换到上一站
  function prevStation() {
    currentStation = (currentStation - 1 + stations.length) % stations.length;
    updateStation();
  }

  // 更新车站显示
  function updateStation() {
    const scene = document.querySelector('.zootopia-train-scene');
    if (!scene) return;

    const station = stations[currentStation];

    // 更新车站信息
    scene.querySelector('.station-icon').textContent = station.emoji;
    scene.querySelector('.station-name').textContent = station.name;
    scene.querySelector('.station-name-en').textContent = station.nameEn;
    scene.querySelector('.time-value').textContent = station.time;

    // 更新进度条
    scene.querySelectorAll('.progress-item').forEach((item, index) => {
      item.classList.remove('current', 'visited');
      if (index < currentStation) {
        item.classList.add('visited');
      } else if (index === currentStation) {
        item.classList.add('current');
      }
    });

    // 更新背景色
    const sky = scene.querySelector('.sky');
    sky.style.background = `linear-gradient(180deg, ${station.color}40 0%, ${station.color}20 100%)`;

    // 播放火车音效
    playTrainSound();

    // 显示到达提示
    showArrivalToast(station);
  }

  // 显示到达提示
  function showArrivalToast(station) {
    const existingToast = document.querySelector('.arrival-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'arrival-toast';
    toast.innerHTML = `
      <span class="toast-icon">${station.emoji}</span>
      <span class="toast-message">到达 ${station.name} 站</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }

  // 播放火车音效（模拟）
  function playTrainSound() {
    console.log('🚂 火车声：况且况且...');
  }

  // 自动播放
  let autoPlayInterval = null;

  function toggleAutoPlay() {
    const scene = document.querySelector('.zootopia-train-scene');
    if (!scene) return;

    const btn = scene.querySelector('.auto-btn');

    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      btn.textContent = '▶▶';
      btn.title = '自动播放';
    } else {
      nextStation();
      autoPlayInterval = setInterval(nextStation, 5000);
      btn.textContent = '⏸';
      btn.title = '暂停';
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#train-scene-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'train-scene-styles';
    styles.textContent = `
      /* 火车站场景 */
      .zootopia-train-scene {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10006;
        animation: scenePopIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes scenePopIn {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .station-window {
        position: relative;
        width: 90vw;
        max-width: 900px;
        background: #2D3436;
        border-radius: 20px;
        padding: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }

      .window-frame {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        aspect-ratio: 16/9;
      }

      .scene-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      /* 背景层 */
      .background-layer {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .sky {
        position: absolute;
        width: 100%;
        height: 60%;
        background: linear-gradient(180deg, #FFE4C4 0%, #FFF8DC 100%);
        transition: background 1s ease;
      }

      .mountains {
        position: absolute;
        bottom: 40%;
        left: 0;
        right: 0;
        height: 30%;
        background:
          linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%),
          linear-gradient(225deg, transparent 50%, rgba(0,0,0,0.1) 50%);
        background-size: 100px 100px;
      }

      .city-skyline {
        position: absolute;
        bottom: 40%;
        left: 0;
        right: 0;
        height: 20%;
        background:
          repeating-linear-gradient(90deg,
            rgba(44, 62, 80, 0.3) 0px,
            rgba(44, 62, 80, 0.3) 20px,
            transparent 20px,
            transparent 40px
          );
      }

      /* 中景层 */
      .midground-layer {
        position: absolute;
        bottom: 20%;
        left: 0;
        right: 0;
        height: 30%;
      }

      .trees {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        background:
          repeating-linear-gradient(90deg,
            🌲 0px,
            🌲 30px,
            transparent 30px,
            transparent 60px
          );
        font-size: 40px;
        line-height: 1;
      }

      .buildings {
        position: absolute;
        bottom: 0;
        right: 10%;
        width: 30%;
        height: 80%;
        background:
          repeating-linear-gradient(90deg,
            🏢 0px,
            🏢 40px,
            transparent 40px,
            transparent 50px
          );
        font-size: 50px;
        line-height: 1;
      }

      /* 前景层 */
      .foreground-layer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 25%;
      }

      .train-track {
        position: absolute;
        bottom: 10%;
        left: 0;
        right: 0;
        height: 10px;
        background:
          repeating-linear-gradient(90deg,
            #57606f 0px,
            #57606f 30px,
            transparent 30px,
            transparent 50px
          );
      }

      .train-wheels {
        position: absolute;
        bottom: 5%;
        display: flex;
        gap: 100px;
        animation: wheelsMove 2s linear infinite;
      }

      @keyframes wheelsMove {
        0% { transform: translateX(-100px); }
        100% { transform: translateX(calc(100vw + 100px)); }
      }

      .wheel {
        width: 40px;
        height: 40px;
        border: 4px solid #2D3436;
        border-radius: 50%;
        animation: wheelSpin 0.5s linear infinite;
      }

      @keyframes wheelSpin {
        100% { transform: rotate(360deg); }
      }

      /* 动物元素 */
      .animals-layer {
        position: absolute;
        bottom: 20%;
        left: 0;
        right: 0;
        height: 30%;
      }

      .animal {
        position: absolute;
        font-size: 32px;
        animation: animalBob 2s ease-in-out infinite;
      }

      .animal-1 { left: 10%; animation-delay: 0s; }
      .animal-2 { left: 30%; animation-delay: 0.5s; font-size: 20px; }
      .animal-3 { right: 20%; animation-delay: 1s; }
      .animal-4 { right: 35%; animation-delay: 1.5s; font-size: 24px; }

      @keyframes animalBob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      /* 列车 */
      .train {
        position: absolute;
        bottom: 15%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        font-size: 60px;
        animation: trainShake 0.1s ease-in-out infinite;
      }

      @keyframes trainShake {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-2px); }
      }

      .train-engine {
        animation: engineRock 0.5s ease-in-out infinite;
      }

      @keyframes engineRock {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }

      /* 窗户反光 */
      .window-reflection {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          linear-gradient(135deg,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.2) 100%
          );
        pointer-events: none;
      }

      /* 车站信息 */
      .station-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background: rgba(0, 0, 0, 0.3);
        margin-top: 15px;
        border-radius: 10px;
      }

      .current-station {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .station-icon {
        font-size: 48px;
        animation: iconPulse 2s ease-in-out infinite;
      }

      @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .station-name {
        font-size: 24px;
        font-weight: bold;
        color: white;
        margin-bottom: 3px;
      }

      .station-name-en {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.7);
      }

      .arrival-time {
        text-align: right;
      }

      .time-label {
        display: block;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 5px;
      }

      .time-value {
        font-size: 28px;
        font-weight: bold;
        color: #FDCB6E;
        font-family: 'Courier New', monospace;
      }

      /* 站点进度 */
      .station-progress {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 20px 30px;
        margin-top: 15px;
      }

      .progress-line {
        position: absolute;
        top: 50%;
        left: 40px;
        right: 40px;
        height: 3px;
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%);
      }

      .progress-item {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .progress-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        border: 3px solid rgba(255, 255, 255, 0.5);
        transition: all 0.5s ease;
      }

      .progress-item.current .progress-dot {
        background: #FDCB6E;
        border-color: #FDCB6E;
        box-shadow: 0 0 20px rgba(253, 203, 110, 0.8);
        animation: dotPulse 1s ease-in-out infinite;
      }

      @keyframes dotPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
      }

      .progress-item.visited .progress-dot {
        background: #00B894;
        border-color: #00B894;
      }

      .progress-label {
        font-size: 20px;
        opacity: 0.7;
        transition: all 0.5s ease;
      }

      .progress-item.current .progress-label {
        opacity: 1;
        transform: scale(1.3);
      }

      /* 控制按钮 */
      .train-controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0 0 20px 20px;
      }

      .control-btn {
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }

      .close-btn {
        background: rgba(255, 107, 107, 0.3);
      }

      .close-btn:hover {
        background: rgba(255, 107, 107, 0.5);
      }

      /* 到达提示 */
      .arrival-toast {
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px 30px;
        background: linear-gradient(135deg, #00B894, #00CEC9);
        color: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 184, 148, 0.5);
        z-index: 10007;
        animation: toastSlideIn 0.5s ease;
      }

      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      @keyframes toastFadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }

      .toast-icon {
        font-size: 36px;
      }

      .toast-message {
        font-size: 18px;
        font-weight: bold;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .station-window {
          width: 95vw;
        }

        .station-name {
          font-size: 18px;
        }

        .time-value {
          font-size: 20px;
        }

        .train {
          font-size: 40px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化火车站场景
  function initTrainStation() {
    injectStyles();

    const scene = createTrainStation();
    document.body.appendChild(scene);

    // 控制按钮
    scene.querySelector('.next-btn').onclick = nextStation;
    scene.querySelector('.reverse-btn').onclick = prevStation;
    scene.querySelector('.auto-btn').onclick = toggleAutoPlay;
    scene.querySelector('.close-btn').onclick = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
      scene.style.animation = 'scenePopOut 0.5s ease forwards';
      setTimeout(() => scene.remove(), 500);
    };

    // 添加关闭动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scenePopOut {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
      }
    `;
    document.head.appendChild(style);

    // 播放初始音效
    playTrainSound();
  }

  // 创建触发器按钮
  function createTriggerButton() {
    const btn = document.createElement('button');
    btn.className = 'train-scene-trigger';
    btn.innerHTML = '🚂';
    btn.title = '火车站之旅';

    btn.style.cssText = `
      position: fixed;
      bottom: 310px;
      left: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #00B894, #00CEC9);
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
      z-index: 9995;
      transition: all 0.3s ease;
    `;

    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.1) rotate(5deg)';
      btn.style.boxShadow = '0 6px 20px rgba(0, 184, 148, 0.5)';
    };

    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
      btn.style.boxShadow = '0 4px 15px rgba(0, 184, 148, 0.4)';
    };

    btn.onclick = initTrainStation;

    return btn;
  }

  // 页面加载完成后添加触发器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(createTriggerButton());
    });
  } else {
    document.body.appendChild(createTriggerButton());
  }

  // 导出初始化函数
  window.showTrainStation = initTrainStation;
})();
