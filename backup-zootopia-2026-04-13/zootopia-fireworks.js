/**
 * 疯狂动物城主题 - 烟花庆祝系统
 * Zootopia Theme - Fireworks Celebration System
 * | 特殊时刻触发烟花，庆祝成就！
 */

(function() {
  'use strict';

  // 烟花配置
  const fireworkConfig = {
    colors: [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEAA7', '#DFE6E9', '#FF9F43', '#EE5A24',
      '#9B59B6', '#3498DB', '#2ECC71', '#F1C40F',
      '#E74C3C', '#1ABC9C', '#E67E22', '#34495E'
    ],
    shapes: ['circle', 'star', 'heart', 'burst'],
    gravity: 0.1,
    friction: 0.99
  };

  // 烟花状态
  let fireworks = [];
  let particles = [];
  let canvas = null;
  let ctx = null;
  let animationId = null;
  let isActive = false;

  // 动物城主题烟花类型
  const zootopiaFireworks = [
    {
      name: 'Judy特制',
      colors: ['#A17F68', '#26DE81', '#FF9F43'],
      icon: '🐰',
      pattern: 'rabbit'
    },
    {
      name: '尼克风格',
      colors: ['#E67E22', '#2C3E50', '#F39C12'],
      icon: '🦊',
      pattern: 'fox'
    },
    {
      name: 'Gazelle炫彩',
      colors: ['#FF9F43', '#9B59B6', '#3498DB', '#2ECC71'],
      icon: '🦌',
      pattern: 'rainbow'
    },
    {
      name: '冰川镇冰雪',
      colors: ['#0ABDE3', '#74B9FF', '#A29BFE'],
      icon: '❄️',
      pattern: 'snowflake'
    },
    {
      name: '撒哈拉阳光',
      colors: ['#FF9F43', '#F39C12', '#F1C40F'],
      icon: '☀️',
      pattern: 'sun'
    }
  ];

  // 创建烟花Canvas
  function createFireworksCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'zootopiaFireworksCanvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      display: none;
    `;
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
  }

  // 调整Canvas大小
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // 烟花类
  class Firework {
    constructor(sx, sy, tx, ty, options = {}) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;

      this.distanceToTarget = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2));
      this.distanceTraveled = 0;

      this.coordinates = [];
      this.coordinateCount = 3;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }

      const angle = Math.atan2(ty - sy, tx - sx);
      const speed = 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.brightness = Math.random() * 50 + 50;
      this.targetRadius = 1;

      this.type = options.type || 'normal';
      this.zootopiaType = options.zootopiaType || null;
      this.colors = options.colors || [fireworkConfig.colors[Math.floor(Math.random() * fireworkConfig.colors.length)]];
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }

      this.speed *= 1.01;
      this.vx *= 1.01;
      this.vy *= 1.01;

      this.x += this.vx;
      this.y += this.vy;

      this.distanceTraveled = Math.sqrt(Math.pow(this.x - this.sx, 2) + Math.pow(this.y - this.sy, 2));

      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.x, this.y, {
          type: this.type,
          zootopiaType: this.zootopiaType,
          colors: this.colors
        });
        fireworks.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);

      const gradient = ctx.createLinearGradient(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1],
        this.x, this.y
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${this.brightness / 100})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制目标
      ctx.beginPath();
      ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // 粒子类
  class Particle {
    constructor(x, y, options = {}) {
      this.x = x;
      this.y = y;
      this.coordinates = [];
      this.coordinateCount = 5;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 1;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      this.friction = options.friction || fireworkConfig.friction;
      this.gravity = options.gravity || fireworkConfig.gravity;

      this.hue = Math.random() * 360;
      this.brightness = Math.random() * 50 + 50;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.015;

      this.type = options.type || 'normal';
      this.zootopiaType = options.zootopiaType || null;
      this.colors = options.colors || [fireworkConfig.colors[Math.floor(Math.random() * fireworkConfig.colors.length)]];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.shape = options.shape || fireworkConfig.shapes[Math.floor(Math.random() * fireworkConfig.shapes.length)];
      this.size = Math.random() * 3 + 1;

      // 特殊形状参数
      if (this.shape === 'heart') {
        this.heartSize = 0;
        this.heartAngle = Math.random() * Math.PI * 2;
      }
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      if (this.shape === 'heart') {
        // 心形轨迹
        this.heartSize += 0.02;
        this.x += Math.cos(this.heartAngle) * (1 + this.heartSize) * this.vx * 0.5;
        this.y += Math.sin(this.heartAngle) * this.heartSize * this.vy * 0.5;
        this.heartAngle += 0.02;
      } else {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
      }

      this.alpha -= this.decay;

      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;

      const lastCoord = this.coordinates[this.coordinates.length - 1];

      if (this.shape === 'star') {
        // 星星形状
        drawStar(this.x, this.y, 5, this.size, this.size / 2, this.color);
      } else if (this.shape === 'heart') {
        // 心形
        drawHeart(this.x, this.y, this.size, this.color);
      } else if (this.shape === 'burst') {
        // 爆发效果
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      } else {
        // 圆形（默认）
        ctx.beginPath();
        ctx.moveTo(lastCoord[0], lastCoord[1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // 绘制星星
  function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  // 绘制心形
  function drawHeart(x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fillStyle = color;
    ctx.fill();
  }

  // 创建粒子爆炸
  function createParticles(x, y, options = {}) {
    const particleCount = options.particleCount || 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(x, y, options));
    }

    // 添加闪光效果
    if (options.addFlash !== false) {
      createFlash(x, y);
    }

    // 动物城主题特殊效果
    if (options.zootopiaType) {
      createZootopiaEffect(x, y, options.zootopiaType);
    }
  }

  // 创建闪光效果
  function createFlash(x, y) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
  }

  // 创建动物城主题效果
  function createZootopiaEffect(x, y, type) {
    const fw = zootopiaFireworks.find(f => f.pattern === type);
    if (!fw) return;

    // 添加主题图标
    const icon = document.createElement('div');
    icon.className = 'firework-icon';
    icon.textContent = fw.icon;
    icon.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 32px;
      z-index: 9999;
      pointer-events: none;
      animation: iconFade 2s ease forwards;
    `;
    document.body.appendChild(icon);
    setTimeout(() => icon.remove(), 2000);
  }

  // 发射烟花
  function launchFirework(options = {}) {
    if (!isActive) {
      startFireworks();
    }

    const sx = Math.random() * canvas.width;
    const sy = canvas.height;
    const tx = options.x || Math.random() * canvas.width;
    const ty = options.y || Math.random() * canvas.height * 0.5;

    fireworks.push(new Firework(sx, sy, tx, ty, options));
  }

  // 发射多个烟花（庆祝效果）
  function launchCelebration(options = {}) {
    const count = options.count || 5;
    const delay = options.delay || 300;
    const zootopiaType = options.zootopiaType || null;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const fwOptions = { ...options };

        if (zootopiaType) {
          const type = zootopiaFireworks.find(f => f.pattern === zootopiaType);
          if (type) {
            fwOptions.colors = type.colors;
            fwOptions.zootopiaType = zootopiaType;
          }
        }

        launchFirework(fwOptions);
      }, i * delay);
    }
  }

  // 启动烟花动画
  function startFireworks() {
    if (isActive) return;
    isActive = true;
    canvas.style.display = 'block';
    animate();
  }

  // 停止烟花动画
  function stopFireworks() {
    isActive = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    // 让现有粒子自然消失
    const fadeOut = setInterval(() => {
      if (particles.length === 0 && fireworks.length === 0) {
        canvas.style.display = 'none';
        clearInterval(fadeOut);
      }
    }, 500);
  }

  // 动画循环
  function animate() {
    if (!isActive && fireworks.length === 0 && particles.length === 0) {
      canvas.style.display = 'none';
      return;
    }

    animationId = requestAnimationFrame(animate);

    // 创建拖尾效果
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    // 更新和绘制烟花
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }

    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].draw();
      particles[i].update(i);
    }
  }

  // 创建烟花控制面板
  function createFireworksControl() {
    const control = document.createElement('div');
    control.className = 'fireworks-control';
    control.innerHTML = `
      <button class="fireworks-toggle" title="烟花庆祝">
        <span class="toggle-icon">🎆</span>
      </button>
      <div class="fireworks-panel">
        <div class="panel-header">
          <h3>🎆 烟花庆祝系统</h3>
          <button class="panel-close">×</button>
        </div>

        <div class="panel-section">
          <div class="section-title">快速庆祝</div>
          <div class="button-grid">
            <button class="firework-btn" onclick="launchFireworkQuick('normal')">🎇 普通烟花</button>
            <button class="firework-btn" onclick="launchFireworkQuick('celebration')">🎊 庆祝时刻</button>
            <button class="firework-btn" onclick="launchFireworkQuick('grand')">🎉 盛大庆典</button>
            <button class="firework-btn" onclick="launchFireworkQuick('finale')">🎆 终极绽放</button>
          </div>
        </div>

        <div class="panel-section">
          <div class="section-title">动物城主题</div>
          <div class="button-grid">
            ${zootopiaFireworks.map(fw => `
              <button class="firework-btn zootopia-btn" onclick="launchFireworkZootopia('${fw.pattern}')" style="background: linear-gradient(135deg, ${fw.colors[0]}, ${fw.colors[1] || fw.colors[0]})">
                ${fw.icon} ${fw.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="panel-section">
          <div class="section-title">自定义</div>
          <div class="custom-controls">
            <div class="control-row">
              <label>数量</label>
              <input type="range" id="fireworkCount" min="1" max="20" value="5">
              <span id="fireworkCountValue">5</span>
            </div>
            <div class="control-row">
              <label>形状</label>
              <select id="fireworkShape">
                <option value="circle">圆形</option>
                <option value="star">星星</option>
                <option value="heart">心形</option>
                <option value="burst">爆发</option>
              </select>
            </div>
            <button class="launch-custom-btn" onclick="launchCustomFirework()">发射！</button>
          </div>
        </div>

        <div class="panel-section">
          <div class="section-title">自动烟花</div>
          <div class="auto-controls">
            <button class="auto-btn" id="autoToggle" onclick="toggleAutoFireworks()">自动烟花：关</button>
            <button class="auto-btn" onclick="stopAllFireworks()">停止所有</button>
          </div>
        </div>
      </div>
    `;

    return control;
  }

  // 快速发射烟花
  function launchFireworkQuick(type) {
    switch (type) {
      case 'normal':
        launchFirework();
        break;
      case 'celebration':
        launchCelebration({ count: 5, delay: 200 });
        break;
      case 'grand':
        launchCelebration({ count: 10, delay: 150 });
        break;
      case 'finale':
        launchCelebration({ count: 20, delay: 100 });
        break;
    }
  }

  // 发射动物城主题烟花
  function launchFireworkZootopia(pattern) {
    const fw = zootopiaFireworks.find(f => f.pattern === pattern);
    if (!fw) return;

    launchCelebration({
      count: 7,
      delay: 150,
      zootopiaType: pattern,
      colors: fw.colors,
      shape: 'star'
    });
  }

  // 发射自定义烟花
  function launchCustomFirework() {
    const count = parseInt(document.getElementById('fireworkCount').value);
    const shape = document.getElementById('fireworkShape').value;

    launchCelebration({
      count: count,
      delay: 200,
      shape: shape
    });
  }

  // 自动烟花
  let autoFireworksInterval = null;

  function toggleAutoFireworks() {
    const btn = document.getElementById('autoToggle');
    if (autoFireworksInterval) {
      clearInterval(autoFireworksInterval);
      autoFireworksInterval = null;
      btn.textContent = '自动烟花：关';
    } else {
      autoFireworksInterval = setInterval(() => {
        const patterns = ['rabbit', 'fox', 'rainbow', 'snowflake', 'sun'];
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        launchFireworkZootopia(randomPattern);
      }, 2000);
      btn.textContent = '自动烟花：开';
    }
  }

  // 停止所有烟花
  function stopAllFireworks() {
    if (autoFireworksInterval) {
      clearInterval(autoFireworksInterval);
      autoFireworksInterval = null;
    }
    fireworks = [];
    particles = [];
    stopFireworks();

    const btn = document.getElementById('autoToggle');
    if (btn) btn.textContent = '自动烟花：关';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#fireworks-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'fireworks-styles';
    styles.textContent = `
      /* 烟花控制 */
      .fireworks-control {
        position: fixed;
        bottom: 40px;
        right: 30px;
        z-index: 9998;
      }

      .fireworks-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        border: none;
        box-shadow: 0 5px 20px rgba(255, 159, 67, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .fireworks-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(255, 159, 67, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .fireworks-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: panelSlideUp 0.3s ease;
        overflow-y: auto;
      }

      .fireworks-panel.show {
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
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
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

      .panel-section {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
      }

      .button-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .firework-btn {
        padding: 12px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .firework-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
      }

      .zootopia-btn {
        color: white;
      }

      .custom-controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .control-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .control-row label {
        min-width: 50px;
        font-size: 13px;
        color: #2D3436;
      }

      .control-row input[type="range"] {
        flex: 1;
      }

      .control-row select {
        flex: 1;
        padding: 8px;
        border: 2px solid rgba(255, 159, 67, 0.3);
        border-radius: 8px;
        font-size: 12px;
      }

      .launch-custom-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .launch-custom-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
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
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .auto-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      }

      /* 图标淡出动画 */
      @keyframes iconFade {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        50% {
          opacity: 1;
          transform: translateY(-20px) scale(1.2);
        }
        100% {
          opacity: 0;
          transform: translateY(-40px) scale(0.8);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .fireworks-panel {
          width: calc(100vw - 60px);
          right: -10px;
        }

        .button-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化烟花系统
  function initFireworks() {
    injectStyles();
    createFireworksCanvas();

    const control = createFireworksControl();
    document.body.appendChild(control);

    const panel = control.querySelector('.fireworks-panel');
    const toggle = control.querySelector('.fireworks-toggle');
    const close = control.querySelector('.panel-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
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

    // 数量滑块
    const countSlider = document.getElementById('fireworkCount');
    const countValue = document.getElementById('fireworkCountValue');
    if (countSlider && countValue) {
      countSlider.oninput = () => {
        countValue.textContent = countSlider.value;
      };
    }

    // 监听全局事件，触发庆祝烟花
    window.addEventListener('zootopiaAchievement', (e) => {
      launchFireworkZootopia('rabbit');
    });

    window.addEventListener('zootopiaLevelUp', (e) => {
      launchCelebration({ count: 10, delay: 150 });
    });
  }

  // 导出全局函数
  window.launchFirework = launchFirework;
  window.launchFireworkQuick = launchFireworkQuick;
  window.launchFireworkZootopia = launchFireworkZootopia;
  window.launchCustomFirework = launchCustomFirework;
  window.toggleAutoFireworks = toggleAutoFireworks;
  window.stopAllFireworks = stopAllFireworks;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFireworks);
  } else {
    initFireworks();
  }
})();
