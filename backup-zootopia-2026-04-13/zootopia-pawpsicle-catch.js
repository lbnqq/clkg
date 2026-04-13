/**
 * 疯狂动物城主题 - Pawpsicle掉落收集小游戏
 * Zootopia Theme - Pawpsicle Catch Mini-Game
 * | 接住掉落的Pawpsicle，赢取经验值和奖励！
 */

(function() {
  'use strict';

  // 游戏配置
  const gameConfig = {
    minSpeed: 2,
    maxSpeed: 5,
    spawnRate: 1500,
    gameDuration: 60,
    canvasWidth: 400,
    canvasHeight: 500
  };

  // Pawpsicle类型
  const pawpsicleTypes = [
    { type: 'cherry', icon: '🍒', color: '#FF6B6B', points: 10, weight: 40 },
    { type: 'lime', icon: '🍋', color: '#F1C40F', points: 15, weight: 30 },
    { type: 'blue', icon: '🫐', color: '#3498DB', points: 20, weight: 20 },
    { type: 'golden', icon: '⭐', color: '#F39C12', points: 50, weight: 8 },
    { type: 'special', icon: '🏆', color: '#9B59B6', points: 100, weight: 2 }
  ];

  // 障碍物
  const obstacles = [
    { type: 'donut', icon: '🍩', penalty: -20, weight: 15 },
    { type: 'coffee', icon: '☕', penalty: -10, weight: 10 }
  ];

  // 游戏状态
  let gameState = {
    isPlaying: false,
    score: 0,
    timeLeft: 60,
    pawpsicles: [],
    player: {
      x: 175,
      y: 450,
      width: 50,
      height: 40
    },
    stats: {
      totalCaught: 0,
      goldenCaught: 0,
      maxCombo: 0,
      gamesPlayed: 0
    },
    combo: 0,
    lastCatchTime: 0
  };

  // 游戏循环ID
  let gameLoopId = null;
  let spawnTimeoutId = null;

  // 创建游戏面板
  function createGamePanel() {
    const panel = document.createElement('div');
    panel.className = 'pawpsicle-game-panel';
    panel.innerHTML = `
      <button class="game-toggle" title="Pawpsicle收集">
        <span class="toggle-icon">🍦</span>
      </button>
      <div class="game-content">
        <div class="game-header">
          <div class="header-left">
            <span class="header-icon">🍦</span>
            <div class="header-text">
              <div class="header-title">Pawpsicle收集</div>
              <div class="header-subtitle">接住掉落的冰棍！</div>
            </div>
          </div>
          <button class="game-close">×</button>
        </div>

        <div class="game-stats-bar">
          <div class="stat-item">
            <span class="stat-icon">🏆</span>
            <span class="stat-value" id="gameScore">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⏱️</span>
            <span class="stat-value" id="gameTime">60</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🔥</span>
            <span class="stat-value" id="gameCombo">0x</span>
          </div>
        </div>

        <div class="game-canvas-container">
          <canvas id="pawpsicleCanvas" width="${gameConfig.canvasWidth}" height="${gameConfig.canvasHeight}"></canvas>
        </div>

        <div class="game-controls">
          <div class="game-instructions">
            <div class="instruction-item">
              <span class="instruction-icon">⬅️</span>
              <span class="instruction-text">使用键盘左右方向键或A/D移动</span>
            </div>
            <div class="instruction-item">
              <span class="instruction-icon">📱</span>
              <span class="instruction-text">点击画布左右侧移动</span>
            </div>
          </div>
          <button class="start-btn" id="startGameBtn">开始游戏</button>
        </div>

        <div class="game-records">
          <div class="records-title">📊 游戏记录</div>
          <div class="records-list">
            <div class="record-item">
              <span class="record-label">最高分</span>
              <span class="record-value" id="highScore">0</span>
            </div>
            <div class="record-item">
              <span class="record-label">总收集</span>
              <span class="record-value" id="totalCaught">0</span>
            </div>
            <div class="record-item">
              <span class="record-label">金色数量</span>
              <span class="record-value" id="goldenCaught">0</span>
            </div>
            <div class="record-item">
              <span class="record-label">最大连击</span>
              <span class="record-value" id="maxCombo">0</span>
            </div>
          </div>
        </div>
      </div>
    `;

    return panel;
  }

  // 初始化Canvas
  function initCanvas() {
    const canvas = document.getElementById('pawpsicleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 绘制初始画面
    drawInitialScreen(ctx);
  }

  // 绘制初始画面
  function drawInitialScreen(ctx) {
    const { canvasWidth, canvasHeight } = gameConfig;

    // 背景
    ctx.fillStyle = '#FF9F4320';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 动物城背景元素
    ctx.fillStyle = '#E67E2240';
    ctx.beginPath();
    ctx.arc(50, canvasHeight - 100, 80, Math.PI, 0);
    ctx.fill();

    ctx.fillStyle = '#0ABDE340';
    ctx.beginPath();
    ctx.arc(canvasWidth - 50, canvasHeight - 80, 100, Math.PI, 0);
    ctx.fill();

    // 标题
    ctx.fillStyle = '#E67E22';
    ctx.font = 'bold 24px Fredoka One, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍦 Pawpsicle Catch', canvasWidth / 2, canvasHeight / 2 - 40);

    ctx.fillStyle = '#636E72';
    ctx.font = '16px Nunito, sans-serif';
    ctx.fillText('点击"开始游戏"开始！', canvasWidth / 2, canvasHeight / 2);

    // 示例Pawpsicle
    ctx.font = '40px sans-serif';
    ctx.fillText('🍦', canvasWidth / 2 - 50, canvasHeight / 2 + 50);
    ctx.fillText('🍒', canvasWidth / 2, canvasHeight / 2 + 50);
    ctx.fillText('⭐', canvasWidth / 2 + 50, canvasHeight / 2 + 50);
  }

  // 开始游戏
  function startGame() {
    if (gameState.isPlaying) return;

    gameState = {
      ...gameState,
      isPlaying: true,
      score: 0,
      timeLeft: gameConfig.gameDuration,
      pawpsicles: [],
      combo: 0,
      lastCatchTime: 0
    };

    updateUI();
    gameLoop();
    scheduleSpawn();

    // 更新按钮
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
      startBtn.textContent = '游戏中...';
      startBtn.disabled = true;
    }
  }

  // 游戏主循环
  function gameLoop() {
    if (!gameState.isPlaying) return;

    const canvas = document.getElementById('pawpsicleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    drawBackground(ctx);

    // 更新和绘制Pawpsicle
    updatePawpsicles();
    drawPawpsicles(ctx);

    // 绘制玩家（篮子）
    drawPlayer(ctx);

    // 检测碰撞
    checkCollisions();

    // 更新时间
    if (gameState.timeLeft > 0) {
      gameState.timeLeft -= 1/60;
      if (gameState.timeLeft <= 0) {
        endGame();
        return;
      }
    }

    updateUI();

    gameLoopId = requestAnimationFrame(gameLoop);
  }

  // 绘制背景
  function drawBackground(ctx) {
    const { canvasWidth, canvasHeight } = gameConfig;

    // 渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#FFEAA740');
    gradient.addColorStop(1, '#FF9F4320');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 地面
    ctx.fillStyle = '#E67E2260';
    ctx.fillRect(0, canvasHeight - 20, canvasWidth, 20);
  }

  // 生成新的Pawpsicle
  function spawnPawpsicle() {
    if (!gameState.isPlaying) return;

    // 随机决定是Pawpsicle还是障碍物
    const isObstacle = Math.random() < 0.15;

    if (isObstacle) {
      // 生成障碍物
      const obstacleTypes = obstacles.filter(o => Math.random() * 100 < o.weight);
      if (obstacleTypes.length > 0) {
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        gameState.pawpsicles.push({
          ...type,
          x: Math.random() * (gameConfig.canvasWidth - 30),
          y: -30,
          size: 25,
          speed: gameConfig.minSpeed + Math.random() * 2
        });
      }
    } else {
      // 生成Pawpsicle
      const types = pawpsicleTypes.filter(p => Math.random() * 100 < p.weight);
      if (types.length > 0) {
        const type = types[Math.floor(Math.random() * types.length)];
        gameState.pawpsicles.push({
          ...type,
          x: Math.random() * (gameConfig.canvasWidth - 30),
          y: -30,
          size: 30,
          speed: gameConfig.minSpeed + Math.random() * (gameConfig.maxSpeed - gameConfig.minSpeed)
        });
      }
    }
  }

  // 计划生成
  function scheduleSpawn() {
    if (!gameState.isPlaying) return;

    spawnTimeoutId = setTimeout(() => {
      spawnPawpsicle();
      scheduleSpawn();
    }, gameConfig.spawnRate);
  }

  // 更新Pawpsicle位置
  function updatePawpsicles() {
    gameState.pawpsicles = gameState.pawpsicles.filter(p => {
      p.y += p.speed;
      return p.y < gameConfig.canvasHeight + 50;
    });
  }

  // 绘制Pawpsicle
  function drawPawpsicles(ctx) {
    gameState.pawpsicles.forEach(p => {
      // 阴影
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(p.x + p.size/2, p.y + p.size - 5, p.size/2, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // 图标
      ctx.font = `${p.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(p.icon, p.x + p.size/2, p.y + p.size - 5);
    });
  }

  // 绘制玩家（篮子）
  function drawPlayer(ctx) {
    const { x, y, width, height } = gameState.player;

    // 篮子主体
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x, y, width, height);

    // 篮子纹理
    ctx.strokeStyle = '#6B3410';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(x, y + i * 8);
      ctx.lineTo(x + width, y + i * 8);
      ctx.stroke();
    }

    // 篮子边缘
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(x - 3, y, width + 6, 8);
  }

  // 检测碰撞
  function checkCollisions() {
    const { x, y, width, height } = gameState.player;

    gameState.pawpsicles = gameState.pawpsicles.filter(p => {
      // 简单的矩形碰撞检测
      if (p.x < x + width &&
          p.x + p.size > x &&
          p.y < y + height &&
          p.y + p.size > y) {
        // 发生碰撞
        handleCatch(p);
        return false;
      }
      return true;
    });
  }

  // 处理接住
  function handleCatch(pawpsicle) {
    const now = Date.now();

    // 检查连击
    if (now - gameState.lastCatchTime < 2000) {
      gameState.combo++;
    } else {
      gameState.combo = 1;
    }
    gameState.lastCatchTime = now;

    // 计算分数（包含连击加成）
    const comboMultiplier = Math.min(gameState.combo, 10);
    const points = pawpsicle.points * comboMultiplier;
    gameState.score += points;

    // 更新统计
    gameState.stats.totalCaught++;
    if (pawpsicle.type === 'golden' || pawpsicle.type === 'special') {
      gameState.stats.goldenCaught++;
    }
    if (gameState.combo > gameState.stats.maxCombo) {
      gameState.stats.maxCombo = gameState.combo;
    }

    // 显示得分动画
    showPointsAnimation(pawpsicle.x, pawpsicle.y, points, comboMultiplier);
  }

  // 显示得分动画
  function showPointsAnimation(x, y, points, combo) {
    const canvas = document.getElementById('pawpsicleCanvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const animation = document.createElement('div');
    animation.className = 'points-animation';
    animation.textContent = `+${points}${combo > 1 ? ` (${combo}x)` : ''}`;
    animation.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      font-size: 20px;
      font-weight: bold;
      color: #F39C12;
      pointer-events: none;
      animation: pointsFloat 1s ease forwards;
    `;

    container.appendChild(animation);
    setTimeout(() => animation.remove(), 1000);
  }

  // 结束游戏
  function endGame() {
    gameState.isPlaying = false;
    gameState.stats.gamesPlayed++;

    // 取消循环和定时器
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
      gameLoopId = null;
    }
    if (spawnTimeoutId) {
      clearTimeout(spawnTimeoutId);
      spawnTimeoutId = null;
    }

    // 保存数据
    saveGameData();

    // 显示结束画面
    showEndScreen();

    // 更新按钮
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
      startBtn.textContent = '再玩一次';
      startBtn.disabled = false;
    }

    // 添加经验值
    if (window.zootopiaAddXP) {
      window.zootopiaAddXP(Math.floor(gameState.score / 10), 'Pawpsicle收集游戏');
    }
  }

  // 显示结束画面
  function showEndScreen() {
    const canvas = document.getElementById('pawpsicleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { canvasWidth, canvasHeight } = gameConfig;

    // 背景
    ctx.fillStyle = '#FF9F4240';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 游戏结束
    ctx.fillStyle = '#E74C3C';
    ctx.font = 'bold 28px Fredoka One, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⏰ 时间到！', canvasWidth / 2, canvasHeight / 2 - 60);

    // 分数
    ctx.fillStyle = '#2D3436';
    ctx.font = 'bold 20px Nunito, sans-serif';
    ctx.fillText(`得分: ${gameState.score}`, canvasWidth / 2, canvasHeight / 2 - 20);

    ctx.font = '16px Nunito, sans-serif';
    ctx.fillText(`收集: ${gameState.stats.totalCaught} 个`, canvasWidth / 2, canvasHeight / 2 + 10);
    ctx.fillText(`最大连击: ${gameState.stats.maxCombo}x`, canvasWidth / 2, canvasHeight / 2 + 35);

    // 评价
    let rating = '';
    if (gameState.score >= 1000) rating = '🏆 传奇级！';
    else if (gameState.score >= 500) rating = '⭐ 太棒了！';
    else if (gameState.score >= 200) rating = '👍 不错！';
    else rating = '💪 继续加油！';

    ctx.fillStyle = '#9B59B6';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText(rating, canvasWidth / 2, canvasHeight / 2 + 70);
  }

  // 更新UI
  function updateUI() {
    document.getElementById('gameScore').textContent = gameState.score;
    document.getElementById('gameTime').textContent = Math.ceil(gameState.timeLeft);
    document.getElementById('gameCombo').textContent = `${gameState.combo}x`;
  }

  // 保存游戏数据
  function saveGameData() {
    const savedData = JSON.parse(localStorage.getItem('pawpsicleGameData')) || {
      highScore: 0,
      totalCaught: 0,
      goldenCaught: 0,
      maxCombo: 0,
      gamesPlayed: 0
    };

    // 更新最高分
    if (gameState.score > savedData.highScore) {
      savedData.highScore = gameState.score;
    }

    savedData.totalCaught += gameState.stats.totalCaught;
    savedData.goldenCaught += gameState.stats.goldenCaught;
    savedData.maxCombo = Math.max(savedData.maxCombo, gameState.stats.maxCombo);
    savedData.gamesPlayed += gameState.stats.gamesPlayed;

    localStorage.setItem('pawpsicleGameData', JSON.stringify(savedData));

    updateRecordsDisplay(savedData);
  }

  // 更新记录显示
  function updateRecordsDisplay(data) {
    document.getElementById('highScore').textContent = data.highScore;
    document.getElementById('totalCaught').textContent = data.totalCaught;
    document.getElementById('goldenCaught').textContent = data.goldenCaught;
    document.getElementById('maxCombo').textContent = data.maxCombo;
  }

  // 加载游戏数据
  function loadGameData() {
    const savedData = JSON.parse(localStorage.getItem('pawpsicleGameData'));
    if (savedData) {
      updateRecordsDisplay(savedData);
    }
  }

  // 移动玩家
  function movePlayer(direction) {
    if (!gameState.isPlaying) return;

    const speed = 20;
    const { canvasWidth } = gameConfig;

    if (direction === 'left' && gameState.player.x > 0) {
      gameState.player.x -= speed;
    } else if (direction === 'right' && gameState.player.x < canvasWidth - gameState.player.width) {
      gameState.player.x += speed;
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#pawpsicle-game-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'pawpsicle-game-styles';
    styles.textContent = `
      /* 游戏面板 */
      .pawpsicle-game-panel {
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9998;
      }

      .game-toggle {
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

      .game-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(255, 159, 67, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .game-content {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 420px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: gameSlideDown 0.3s ease;
      }

      .game-content.show {
        display: block;
      }

      @keyframes gameSlideDown {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      /* 游戏头部 */
      .game-header {
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px 20px 0 0;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .header-icon {
        font-size: 28px;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .header-title {
        font-size: 16px;
        font-weight: bold;
      }

      .header-subtitle {
        font-size: 11px;
        opacity: 0.9;
      }

      .game-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      /* 统计栏 */
      .game-stats-bar {
        display: flex;
        justify-content: space-around;
        padding: 15px;
        background: linear-gradient(135deg, rgba(255, 159, 67, 0.1), rgba(238, 90, 36, 0.1));
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
      }

      .stat-icon {
        font-size: 18px;
      }

      /* Canvas容器 */
      .game-canvas-container {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 15px;
        background: #FFF5E6;
      }

      #pawpsicleCanvas {
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }

      /* 游戏控制 */
      .game-controls {
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .game-instructions {
        margin-bottom: 15px;
      }

      .instruction-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
        font-size: 12px;
        color: #636E72;
      }

      .instruction-icon {
        font-size: 16px;
      }

      .start-btn {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .start-btn:hover:not(:disabled) {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
      }

      .start-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* 游戏记录 */
      .game-records {
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        background: rgba(255, 159, 67, 0.05);
      }

      .records-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .records-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .record-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: white;
        border-radius: 8px;
        font-size: 12px;
      }

      .record-label {
        color: #636E72;
      }

      .record-value {
        font-weight: bold;
        color: #FF9F43;
      }

      /* 得分动画 */
      @keyframes pointsFloat {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-30px);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .pawpsicle-game-panel {
          top: 80px;
          left: 15px;
          transform: none;
        }

        .game-content {
          left: 0;
          transform: none;
          width: calc(100vw - 30px);
        }

        #pawpsicleCanvas {
          max-width: 100%;
          height: auto;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化游戏
  function initGame() {
    injectStyles();

    const panel = createGamePanel();
    document.body.appendChild(panel);

    const content = panel.querySelector('.game-content');
    const toggle = panel.querySelector('.game-toggle');
    const close = panel.querySelector('.game-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      content.classList.toggle('show');
      if (content.classList.contains('show')) {
        initCanvas();
        loadGameData();
      }
    };

    // 关闭按钮
    close.onclick = () => {
      content.classList.remove('show');
      if (gameState.isPlaying) {
        endGame();
      }
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) {
        content.classList.remove('show');
        if (gameState.isPlaying) {
          endGame();
        }
      }
    });

    // 开始按钮
    document.getElementById('startGameBtn').addEventListener('click', startGame);

    // 键盘控制
    document.addEventListener('keydown', (e) => {
      if (!gameState.isPlaying) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer('right');
      }
    });

    // 触摸/点击控制
    const canvas = document.getElementById('pawpsicleCanvas');
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        if (!gameState.isPlaying) return;
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width / 2) {
          movePlayer('left');
        } else {
          movePlayer('right');
        }
      });
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
})();
