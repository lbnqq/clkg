/**
 * 疯狂动物城主题 - 动态天气系统
 * Zootopia Theme - Dynamic Weather System
 * | 模拟动物城7大地区的天气效果
 */

(function() {
  'use strict';

  // 7大地区的天气配置
  const districtWeather = {
    sahara: {
      name: '撒哈拉广场',
      nameEn: 'Sahara Square',
      icon: '☀️',
      weather: 'sunny',
      temperature: '35°C',
      effects: ['sunlight', 'heatwave', 'sand']
    },
    tundratown: {
      name: '冰川镇',
      nameEn: 'Tundratown',
      icon: '❄️',
      weather: 'snowy',
      temperature: '-5°C',
      effects: ['snow', 'frost', 'icecrystals']
    },
    rainforest: {
      name: '雨林区',
      nameEn: 'Rainforest District',
      icon: '🌧️',
      weather: 'rainy',
      temperature: '28°C',
      effects: ['rain', 'mist', 'leaves']
    },
    downtown: {
      name: '市中心',
      nameEn: 'Downtown District',
      icon: '🌤️',
      weather: 'partlyCloudy',
      temperature: '22°C',
      effects: ['clouds', 'sunrays', 'birds']
    },
    bunnyburrow: {
      name: '兔子洞',
      nameEn: 'Bunnyburrow',
      icon: '🌤️',
      weather: 'clear',
      temperature: '20°C',
      effects: ['sunlight', 'butterflies', 'carrotfarms']
    },
    meadowlands: {
      name: '草甸镇',
      nameEn: 'Meadowlands',
      icon: '🌬️',
      weather: 'windy',
      temperature: '18°C',
      effects: ['wind', 'grass', 'flowers']
    },
    little_rodentia: {
      name: '啮齿镇',
      nameEn: 'Little Rodentia',
      icon: '🌥️',
      weather: 'cloudy',
      temperature: '21°C',
      effects: ['clouds', 'crumbs', 'tinyitems']
    }
  };

  // 当前天气
  let currentWeather = null;
  let weatherCanvas = null;
  let weatherCtx = null;
  let animationId = null;
  let particles = [];
  let isActive = false;

  // 创建天气Canvas
  function createWeatherCanvas() {
    weatherCanvas = document.createElement('canvas');
    weatherCanvas.id = 'zootopiaWeatherCanvas';
    weatherCanvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9997;
      opacity: 0.7;
    `;
    document.body.appendChild(weatherCanvas);

    weatherCtx = weatherCanvas.getContext('2d');
    resizeWeatherCanvas();

    window.addEventListener('resize', resizeWeatherCanvas);
  }

  // 调整Canvas大小
  function resizeWeatherCanvas() {
    weatherCanvas.width = window.innerWidth;
    weatherCanvas.height = window.innerHeight;
  }

  // 粒子类
  class WeatherParticle {
    constructor(type, options = {}) {
      this.type = type;
      this.reset(options);
    }

    reset(options = {}) {
      const { width, height } = options;

      switch (this.type) {
        case 'snow':
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.size = Math.random() * 3 + 1;
          this.speedY = Math.random() * 1 + 0.5;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.opacity = Math.random() * 0.5 + 0.5;
          break;

        case 'rain':
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.length = Math.random() * 20 + 10;
          this.speedY = Math.random() * 10 + 15;
          this.speedX = Math.random() * 1 - 0.5;
          this.opacity = Math.random() * 0.3 + 0.2;
          break;

        case 'sunlight':
          this.x = Math.random() * width;
          this.y = Math.random() * height * 0.3;
          this.size = Math.random() * 50 + 30;
          this.speedY = Math.random() * 0.2 + 0.1;
          this.opacity = Math.random() * 0.1 + 0.05;
          this.angle = Math.random() * Math.PI * 2;
          break;

        case 'cloud':
          this.x = Math.random() * width * 1.5 - width * 0.25;
          this.y = Math.random() * height * 0.3;
          this.size = Math.random() * 100 + 50;
          this.speedX = Math.random() * 0.3 + 0.1;
          this.opacity = Math.random() * 0.3 + 0.2;
          break;

        case 'leaf':
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.size = Math.random() * 10 + 5;
          this.speedY = Math.random() * 1 + 0.5;
          this.speedX = Math.random() * 2 - 1;
          this.rotation = Math.random() * Math.PI * 2;
          this.rotationSpeed = Math.random() * 0.1 - 0.05;
          this.color = ['#2ECC71', '#27AE60', '#F39C12', '#E67E22'][Math.floor(Math.random() * 4)];
          break;

        case 'petal':
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.size = Math.random() * 8 + 4;
          this.speedY = Math.random() * 0.8 + 0.3;
          this.speedX = Math.random() * 1.5 - 0.75;
          this.opacity = Math.random() * 0.5 + 0.5;
          this.color = ['#FF9F43', '#FF6B9D', '#FFB6C1', '#FFE4B5'][Math.floor(Math.random() * 4)];
          break;

        case 'sand':
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.size = Math.random() * 2 + 1;
          this.speedY = Math.random() * 0.5 + 0.3;
          this.speedX = Math.random() * 3 + 1;
          this.opacity = Math.random() * 0.3 + 0.2;
          break;

        case 'butterfly':
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = Math.random() * 10 + 8;
          this.speedX = Math.random() * 2 - 1;
          this.speedY = Math.random() * 1 - 0.5;
          this.flapSpeed = Math.random() * 0.2 + 0.1;
          this.flapAngle = 0;
          this.color = ['#FF6B9D', '#9B59B6', '#3498DB', '#F1C40F'][Math.floor(Math.random() * 4)];
          break;

        case 'firefly':
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.size = Math.random() * 3 + 2;
          this.speedX = Math.random() * 0.5 - 0.25;
          this.speedY = Math.random() * 0.5 - 0.25;
          this.opacity = Math.random() * 0.5 + 0.5;
          this.pulseSpeed = Math.random() * 0.1 + 0.05;
          this.pulseAngle = 0;
          break;

        case 'crumb':
          this.x = Math.random() * width;
          this.y = Math.random() * height - height;
          this.size = Math.random() * 3 + 1;
          this.speedY = Math.random() * 2 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.opacity = Math.random() * 0.5 + 0.5;
          break;
      }
    }

    update(width, height) {
      this.x += this.speedX;
      this.y += this.speedY;

      // 特殊行为
      if (this.type === 'leaf') {
        this.rotation += this.rotationSpeed;
      } else if (this.type === 'butterfly') {
        this.flapAngle += this.flapSpeed;
        this.x += Math.sin(this.flapAngle * 10) * 0.5;
      } else if (this.type === 'firefly') {
        this.pulseAngle += this.pulseSpeed;
        this.opacity = 0.3 + Math.sin(this.pulseAngle) * 0.5;
        this.x += Math.sin(this.pulseAngle * 5) * 0.3;
      }

      // 边界重置
      if (this.y > height + 20 || this.x > width + 20 || this.x < -20) {
        this.reset({ width, height });
      }
    }

    draw(ctx) {
      ctx.save();

      switch (this.type) {
        case 'snow':
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'rain':
          ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.speedX, this.y + this.length);
          ctx.stroke();
          break;

        case 'sunlight':
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          gradient.addColorStop(0, `rgba(255, 255, 200, ${this.opacity})`);
          gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'cloud':
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          this.drawCloud(ctx, this.x, this.y, this.size);
          break;

        case 'leaf':
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;

        case 'petal':
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.ellipse(this.x, this.y, this.size, this.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'sand':
          ctx.fillStyle = `rgba(210, 180, 140, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'butterfly':
          ctx.save();
          ctx.translate(this.x, this.y);
          const wingFlap = Math.sin(this.flapAngle * 10) * 0.3;
          ctx.fillStyle = this.color;
          // 左翅膀
          ctx.beginPath();
          ctx.ellipse(-this.size / 2, 0, this.size / 2, this.size, wingFlap, 0, Math.PI * 2);
          ctx.fill();
          // 右翅膀
          ctx.beginPath();
          ctx.ellipse(this.size / 2, 0, this.size / 2, this.size, -wingFlap, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;

        case 'firefly':
          ctx.fillStyle = `rgba(255, 255, 150, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          // 发光效果
          ctx.fillStyle = `rgba(255, 255, 150, ${this.opacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'crumb':
          ctx.fillStyle = `rgba(139, 90, 43, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;
      }

      ctx.restore();
    }

    drawCloud(ctx, x, y, size) {
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.arc(x + size * 0.3, y - size * 0.2, size * 0.4, 0, Math.PI * 2);
      ctx.arc(x + size * 0.6, y, size * 0.45, 0, Math.PI * 2);
      ctx.arc(x + size * 0.3, y + size * 0.1, size * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 设置天气
  function setWeather(districtKey) {
    const weather = districtWeather[districtKey];
    if (!weather) return;

    currentWeather = weather;
    createWeatherParticles(weather.effects);
    startWeatherAnimation();

    // 保存当前天气
    localStorage.setItem('zootopiaCurrentWeather', districtKey);
  }

  // 创建天气粒子
  function createWeatherParticles(effects) {
    particles = [];

    const { width, height } = weatherCanvas;

    effects.forEach(effect => {
      let type = '';
      let count = 0;

      switch (effect) {
        case 'snow':
        case 'frost':
        case 'icecrystals':
          type = 'snow';
          count = effect === 'snow' ? 100 : 50;
          break;
        case 'rain':
        case 'mist':
          type = effect === 'rain' ? 'rain' : 'sunlight';
          count = effect === 'rain' ? 150 : 30;
          break;
        case 'sunlight':
        case 'heatwave':
          type = 'sunlight';
          count = effect === 'sunlight' ? 20 : 40;
          break;
        case 'clouds':
          type = 'cloud';
          count = 8;
          break;
        case 'sunrays':
          type = 'sunlight';
          count = 15;
          break;
        case 'leaves':
          type = 'leaf';
          count = 30;
          break;
        case 'butterflies':
          type = 'butterfly';
          count = 15;
          break;
        case 'carrotfarms':
          type = 'petal';
          count = 25;
          break;
        case 'wind':
          type = 'leaf';
          count = 40;
          break;
        case 'grass':
          type = 'leaf';
          count = 20;
          break;
        case 'flowers':
          type = 'petal';
          count = 30;
          break;
        case 'sand':
          type = 'sand';
          count = 80;
          break;
        case 'crumbs':
        case 'tinyitems':
          type = effect === 'crumbs' ? 'crumb' : 'leaf';
          count = 20;
          break;
        case 'birds':
          type = 'butterfly';
          count = 10;
          break;
      }

      for (let i = 0; i < count; i++) {
        particles.push(new WeatherParticle(type, { width, height }));
      }
    });
  }

  // 开始天气动画
  function startWeatherAnimation() {
    if (isActive) return;
    isActive = true;
    animateWeather();
  }

  // 停止天气动画
  function stopWeatherAnimation() {
    isActive = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }

  // 天气动画循环
  function animateWeather() {
    if (!isActive) return;

    animationId = requestAnimationFrame(animateWeather);

    // 清空画布
    weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);

    // 更新和绘制粒子
    particles.forEach(particle => {
      particle.update(weatherCanvas.width, weatherCanvas.height);
      particle.draw(weatherCtx);
    });
  }

  // 创建天气控制面板
  function createWeatherControl() {
    const control = document.createElement('div');
    control.className = 'weather-control';
    control.innerHTML = `
      <button class="weather-toggle" title="天气系统">
        <span class="toggle-icon">${getWeatherIcon()}</span>
      </button>
      <div class="weather-panel">
        <div class="panel-header">
          <h3>🌤️ 动物城天气系统</h3>
          <button class="panel-close">×</button>
        </div>

        <div class="current-weather">
          <div class="weather-display" id="weatherDisplay">
            <span class="weather-icon">☀️</span>
            <span class="weather-text">选择一个地区</span>
          </div>
        </div>

        <div class="district-weather">
          <div class="section-title">选择地区天气</div>
          <div class="district-grid">
            ${Object.entries(districtWeather).map(([key, weather]) => `
              <button class="district-btn" onclick="setWeatherFromPanel('${key}')" style="background: linear-gradient(135deg, ${getDistrictColor(key)}40, ${getDistrictColor(key)}20)">
                <span class="district-icon">${weather.icon}</span>
                <span class="district-name">${weather.name}</span>
                <span class="district-temp">${weather.temperature}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="weather-effects">
          <div class="section-title">天气效果</div>
          <div class="effects-list" id="effectsList">
            <div class="no-effects">选择地区查看效果</div>
          </div>
        </div>

        <div class="weather-controls">
          <button class="weather-control-btn" onclick="toggleWeatherAnimation()">
            <span class="btn-icon">⏸️</span>
            <span class="btn-text">暂停/继续</span>
          </button>
          <button class="weather-control-btn" onclick="clearWeather()">
            <span class="btn-icon">🌅</span>
            <span class="btn-text">清除天气</span>
          </button>
        </div>

        <div class="auto-weather">
          <div class="section-title">自动天气</div>
          <div class="auto-controls">
            <button class="auto-btn" id="autoWeatherBtn" onclick="toggleAutoWeather()">自动切换：关</button>
            <button class="auto-btn" onclick="setRandomWeather()">随机天气</button>
          </div>
        </div>
      </div>
    `;

    return control;
  }

  // 获取地区颜色
  function getDistrictColor(key) {
    const colors = {
      sahara: '#FF9F43',
      tundratown: '#0ABDE3',
      rainforest: '#10AC84',
      downtown: '#5F27CD',
      bunnyburrow: '#26DE81',
      meadowlands: '#A29BFE',
      little_rodentia: '#EE5A24'
    };
    return colors[key] || '#636E72';
  }

  // 获取当前天气图标
  function getWeatherIcon() {
    const savedWeather = localStorage.getItem('zootopiaCurrentWeather');
    if (savedWeather && districtWeather[savedWeather]) {
      return districtWeather[savedWeather].icon;
    }
    return '🌤️';
  }

  // 从面板设置天气
  function setWeatherFromPanel(districtKey) {
    setWeather(districtKey);
    updateWeatherDisplay();
  }

  // 更新天气显示
  function updateWeatherDisplay() {
    const display = document.getElementById('weatherDisplay');
    const effectsList = document.getElementById('effectsList');
    const toggleIcon = document.querySelector('.weather-toggle .toggle-icon');

    if (!currentWeather || !display) return;

    display.innerHTML = `
      <span class="weather-icon">${currentWeather.icon}</span>
      <div class="weather-info">
        <span class="weather-name">${currentWeather.name}</span>
        <span class="weather-temp">${currentWeather.temperature}</span>
      </div>
    `;

    if (effectsList) {
      effectsList.innerHTML = currentWeather.effects.map(effect => {
        const effectNames = {
          snow: '❄️ 雪花',
          frost: '🧊 霜冻',
          icecrystals: '💎 冰晶',
          rain: '🌧️ 雨滴',
          mist: '🌫️ 薄雾',
          sunlight: '☀️ 阳光',
          heatwave: '🔥 热浪',
          clouds: '☁️ 云朵',
          sunrays: '🌅 光束',
          leaves: '🍃 落叶',
          butterflies: '🦋 蝴蝶',
          carrotfarms: '🥕 胡萝卜花瓣',
          wind: '💨 微风',
          grass: '🌿 草叶',
          flowers: '🌸 花瓣',
          sand: '🏜️ 沙尘',
          crumbs: '🍞 面包屑',
          tinyitems: '🧸 小物件',
          birds: '🐦 飞鸟'
        };
        return `<div class="effect-item">${effectNames[effect] || effect}</div>`;
      }).join('');
    }

    if (toggleIcon) {
      toggleIcon.textContent = currentWeather.icon;
    }
  }

  // 切换天气动画
  function toggleWeatherAnimation() {
    if (isActive) {
      stopWeatherAnimation();
    } else {
      startWeatherAnimation();
    }
  }

  // 清除天气
  function clearWeather() {
    stopWeatherAnimation();
    particles = [];
    weatherCtx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);
    currentWeather = null;
    localStorage.removeItem('zootopiaCurrentWeather');

    const toggleIcon = document.querySelector('.weather-toggle .toggle-icon');
    if (toggleIcon) toggleIcon.textContent = '🌤️';

    const display = document.getElementById('weatherDisplay');
    if (display) {
      display.innerHTML = `
        <span class="weather-icon">🌤️</span>
        <span class="weather-text">选择一个地区</span>
      `;
    }

    const effectsList = document.getElementById('effectsList');
    if (effectsList) {
      effectsList.innerHTML = '<div class="no-effects">选择地区查看效果</div>';
    }
  }

  // 自动天气切换
  let autoWeatherInterval = null;

  function toggleAutoWeather() {
    const btn = document.getElementById('autoWeatherBtn');
    if (autoWeatherInterval) {
      clearInterval(autoWeatherInterval);
      autoWeatherInterval = null;
      btn.textContent = '自动切换：关';
    } else {
      autoWeatherInterval = setInterval(() => {
        setRandomWeather();
      }, 30000); // 每30秒切换
      btn.textContent = '自动切换：开';
    }
  }

  // 设置随机天气
  function setRandomWeather() {
    const districts = Object.keys(districtWeather);
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    setWeather(randomDistrict);
    updateWeatherDisplay();
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#weather-system-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'weather-system-styles';
    styles.textContent = `
      /* 天气控制 */
      .weather-control {
        position: fixed;
        bottom: 120px;
        right: 30px;
        z-index: 9998;
      }

      .weather-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        border: none;
        box-shadow: 0 5px 20px rgba(9, 132, 227, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .weather-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(9, 132, 227, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .weather-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: panelSlideUp 0.3s ease;
        overflow-y: auto;
      }

      .weather-panel.show {
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
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px 20px 0 0;
      }

      .panel-header h3 {
        margin: 0;
        font-size: 16px;
      }

      .panel-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.8;
      }

      .panel-close:hover {
        opacity: 1;
      }

      .current-weather {
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .weather-display {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
      }

      .weather-icon {
        font-size: 48px;
      }

      .weather-info {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .weather-name {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .weather-temp {
        font-size: 14px;
        color: #636E72;
      }

      .weather-text {
        font-size: 16px;
        color: #636E72;
      }

      .district-weather {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
      }

      .district-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .district-btn {
        padding: 12px;
        border: 2px solid transparent;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .district-btn:hover {
        transform: scale(1.02);
        border-color: #0984E3;
        box-shadow: 0 4px 15px rgba(9, 132, 227, 0.3);
      }

      .district-icon {
        font-size: 24px;
      }

      .district-name {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
      }

      .district-temp {
        font-size: 11px;
        color: #636E72;
      }

      .weather-effects {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .effects-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .effect-item {
        padding: 6px 12px;
        background: rgba(116, 185, 255, 0.1);
        border: 1px solid rgba(116, 185, 255, 0.3);
        border-radius: 15px;
        font-size: 12px;
        color: #0984E3;
      }

      .no-effects {
        width: 100%;
        text-align: center;
        color: #95A5A6;
        font-size: 12px;
        padding: 10px;
      }

      .weather-controls {
        padding: 15px 20px;
        display: flex;
        gap: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .weather-control-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .weather-control-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(9, 132, 227, 0.4);
      }

      .btn-icon {
        font-size: 18px;
      }

      .auto-weather {
        padding: 15px 20px;
      }

      .auto-controls {
        display: flex;
        gap: 10px;
      }

      .auto-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #A29BFE, #6C5CE7);
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .auto-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .weather-control {
          right: 15px;
        }

        .weather-panel {
          width: calc(100vw - 60px);
          right: 0;
        }

        .district-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化天气系统
  function initWeatherSystem() {
    injectStyles();
    createWeatherCanvas();

    const control = createWeatherControl();
    document.body.appendChild(control);

    const panel = control.querySelector('.weather-panel');
    const toggle = control.querySelector('.weather-toggle');
    const close = control.querySelector('.panel-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
      if (panel.classList.contains('show')) {
        updateWeatherDisplay();
      }
    };

    // 关闭按钮
    close.onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!control.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 恢复上次天气
    const savedWeather = localStorage.getItem('zootopiaCurrentWeather');
    if (savedWeather) {
      setWeather(savedWeather);
    }
  }

  // 导出全局函数
  window.setWeatherFromPanel = setWeatherFromPanel;
  window.toggleWeatherAnimation = toggleWeatherAnimation;
  window.clearWeather = clearWeather;
  window.toggleAutoWeather = toggleAutoWeather;
  window.setRandomWeather = setRandomWeather;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWeatherSystem);
  } else {
    initWeatherSystem();
  }
})();
