/**
 * 疯狂动物城主题 - 角色卡牌翻转游戏
 * Zootopia Theme - Character Card Flip Game
 * 翻转卡牌寻找配对，训练你的记忆力！
 */

(function() {
  'use strict';

  // 卡牌数据
  const cardData = [
    { id: 'judy', name: 'Judy', emoji: '🐰', color: '#A17F68' },
    { id: 'nick', name: 'Nick', emoji: '🦊', color: '#E67E22' },
    { id: 'flash', name: 'Flash', emoji: '🐢', color: '#27AE60' },
    { id: 'bogo', name: 'Bogo', emoji: '🦬', color: '#2C3E50' },
    { id: 'clawhauser', name: 'Ben', emoji: '🦆', color: '#3498DB' },
    { id: 'bellwether', name: 'Dawn', emoji: '🐑', color: '#95A5A6' },
    { id: 'lionheart', name: 'Lionheart', emoji: '🦁', color: '#D35400' },
    { id: 'finnick', name: 'Finnick', emoji: '🦊', color: '#C0392B' }
  ];

  // 游戏状态
  let gameState = {
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timer: 0,
    isPlaying: false,
    timerInterval: null
  };

  // 创建游戏容器
  function createGameContainer() {
    const container = document.createElement('div');
    container.className = 'card-flip-game';
    container.innerHTML = `
      <div class="game-overlay" onclick="this.closest('.card-flip-game').remove()"></div>
      <div class="game-content">
        <div class="game-header">
          <h2>🎴 角色卡牌记忆游戏</h2>
          <button class="game-close">×</button>
        </div>

        <div class="game-stats">
          <div class="stat-item">
            <span class="stat-icon">👆</span>
            <span class="stat-label">步数</span>
            <span class="stat-value" id="moveCount">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⏱️</span>
            <span class="stat-label">时间</span>
            <span class="stat-value" id="gameTimer">00:00</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">✅</span>
            <span class="stat-label">配对</span>
            <span class="stat-value"><span id="matchCount">0</span>/8</span>
          </div>
        </div>

        <div class="game-board" id="gameBoard">
          <div class="game-start-screen">
            <div class="start-icon">🎮</div>
            <div class="start-title">准备好测试你的记忆力了吗？</div>
            <div class="start-desc">翻转卡牌，找到相同的角色配对！</div>
            <button class="start-btn" onclick="startCardGame()">
              🎯 开始游戏
            </button>
          </div>
        </div>

        <div class="game-footer">
          <button class="footer-btn" onclick="resetCardGame()">🔄 重新开始</button>
          <button class="footer-btn" onclick="this.closest('.card-flip-game').remove()">✕ 关闭游戏</button>
        </div>
      </div>
    `;

    return container;
  }

  // 初始化游戏
  function startGame() {
    // 重置状态
    gameState = {
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      timer: 0,
      isPlaying: true,
      timerInterval: null
    };

    // 更新显示
    document.getElementById('moveCount').textContent = '0';
    document.getElementById('gameTimer').textContent = '00:00';
    document.getElementById('matchCount').textContent = '0';

    // 创建卡牌
    const cards = [...cardData, ...cardData]; // 每个角色两张
    shuffleArray(cards);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    gameBoard.className = 'game-board playing';

    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'memory-card';
      cardElement.dataset.index = index;
      cardElement.dataset.id = card.id;
      cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <span class="card-pattern">❓</span>
          </div>
          <div class="card-back" style="background: ${card.color}">
            <span class="card-emoji">${card.emoji}</span>
            <span class="card-name">${card.name}</span>
          </div>
        </div>
      `;

      cardElement.onclick = () => flipCard(cardElement);
      gameBoard.appendChild(cardElement);
    });

    // 启动计时器
    gameState.timerInterval = setInterval(updateTimer, 1000);
  }

  // 翻转卡牌
  function flipCard(cardElement) {
    // 检查是否可以翻转
    if (!gameState.isPlaying ||
        gameState.flippedCards.length >= 2 ||
        cardElement.classList.contains('flipped') ||
        cardElement.classList.contains('matched')) {
      return;
    }

    // 翻转卡牌
    cardElement.classList.add('flipped');
    gameState.flippedCards.push(cardElement);

    // 检查是否翻转了两张
    if (gameState.flippedCards.length === 2) {
      gameState.moves++;
      document.getElementById('moveCount').textContent = gameState.moves;
      checkMatch();
    }
  }

  // 检查匹配
  function checkMatch() {
    const [card1, card2] = gameState.flippedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;

    if (id1 === id2) {
      // 匹配成功
      setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameState.flippedCards = [];
        gameState.matchedPairs++;
        document.getElementById('matchCount').textContent = gameState.matchedPairs;

        // 检查游戏是否结束
        if (gameState.matchedPairs === cardData.length) {
          endGame(true);
        }
      }, 500);
    } else {
      // 匹配失败
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        gameState.flippedCards = [];
      }, 1000);
    }
  }

  // 更新计时器
  function updateTimer() {
    gameState.timer++;
    const minutes = Math.floor(gameState.timer / 60).toString().padStart(2, '0');
    const seconds = (gameState.timer % 60).toString().padStart(2, '0');
    document.getElementById('gameTimer').textContent = `${minutes}:${seconds}`;
  }

  // 结束游戏
  function endGame(won) {
    gameState.isPlaying = false;
    clearInterval(gameState.timerInterval);

    const gameBoard = document.getElementById('gameBoard');
    const minutes = Math.floor(gameState.timer / 60).toString().padStart(2, '0');
    const seconds = (gameState.timer % 60).toString().padStart(2, '0');

    gameBoard.innerHTML = `
      <div class="game-end-screen ${won ? 'won' : 'lost'}">
        <div class="end-icon">${won ? '🎉' : '😢'}</div>
        <div class="end-title">${won ? '恭喜你！' : '游戏结束'}</div>
        <div class="end-stats">
          <div class="end-stat">
            <span class="end-stat-label">用时</span>
            <span class="end-stat-value">${minutes}:${seconds}</span>
          </div>
          <div class="end-stat">
            <span class="end-stat-label">步数</span>
            <span class="end-stat-value">${gameState.moves}</span>
          </div>
        </div>
        ${won ? '<div class="end-message">你的记忆力太棒了！🌟</div>' : ''}
        <button class="start-btn" onclick="startCardGame()">
          🔄 再玩一次
        </button>
      </div>
    `;
  }

  // 重置游戏
  function resetGame() {
    clearInterval(gameState.timerInterval);
    startGame();
  }

  // 数组洗牌
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#card-flip-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'card-flip-styles';
    styles.textContent = `
      /* 卡牌翻转游戏 */
      .card-flip-game {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10007;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: gameFadeIn 0.3s ease;
      }

      @keyframes gameFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .game-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }

      .game-content {
        position: relative;
        width: 90%;
        max-width: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        overflow: hidden;
      }

      .game-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 25px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .game-header h2 {
        margin: 0;
        font-size: 20px;
      }

      .game-close {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .game-close:hover {
        opacity: 1;
      }

      .game-stats {
        display: flex;
        justify-content: space-around;
        padding: 20px;
        background: rgba(155, 89, 182, 0.05);
        border-bottom: 1px solid rgba(155, 89, 182, 0.1);
      }

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .stat-icon {
        font-size: 24px;
      }

      .stat-label {
        font-size: 12px;
        color: #636E72;
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #9B59B6;
      }

      /* 游戏区域 */
      .game-board {
        padding: 20px;
        min-height: 400px;
      }

      .game-board.playing {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
      }

      .memory-card {
        aspect-ratio: 1;
        perspective: 1000px;
        cursor: pointer;
      }

      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }

      .memory-card.flipped .card-inner,
      .memory-card.matched .card-inner {
        transform: rotateY(180deg);
      }

      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .card-front {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .card-pattern {
        font-size: 36px;
      }

      .card-back {
        background: white;
        transform: rotateY(180deg);
        color: white;
      }

      .card-emoji {
        font-size: 36px;
        margin-bottom: 5px;
      }

      .card-name {
        font-size: 12px;
        font-weight: bold;
      }

      .memory-card.matched .card-back {
        opacity: 0.5;
        box-shadow: 0 0 20px rgba(155, 89, 182, 0.8);
      }

      /* 开始屏幕 */
      .game-start-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 360px;
        text-align: center;
      }

      .start-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .start-title {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .start-desc {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 30px;
      }

      .start-btn {
        padding: 15px 40px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      }

      .start-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(155, 89, 182, 0.5);
      }

      /* 结束屏幕 */
      .game-end-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 360px;
        text-align: center;
        animation: endPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes endPop {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .end-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .end-title {
        font-size: 28px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 20px;
      }

      .end-stats {
        display: flex;
        gap: 30px;
        margin-bottom: 20px;
      }

      .end-stat {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .end-stat-label {
        font-size: 12px;
        color: #636E72;
      }

      .end-stat-value {
        font-size: 32px;
        font-weight: bold;
        color: #9B59B6;
      }

      .end-message {
        font-size: 16px;
        color: #00B894;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .game-end-screen.won .end-icon {
        animation: winBounce 1s ease infinite;
      }

      @keyframes winBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      /* 底部按钮 */
      .game-footer {
        display: flex;
        gap: 10px;
        padding: 15px 20px;
        background: rgba(155, 89, 182, 0.05);
      }

      .footer-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        background: rgba(155, 89, 182, 0.1);
        color: #9B59B6;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .footer-btn:hover {
        background: rgba(155, 89, 182, 0.2);
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .game-board.playing {
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .card-emoji {
          font-size: 24px;
        }

        .card-name {
          font-size: 10px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 创建触发器按钮
  function createTriggerButton() {
    const btn = document.createElement('button');
    btn.className = 'card-game-trigger';
    btn.innerHTML = '🎴';
    btn.title = '记忆卡牌游戏';

    btn.style.cssText = `
      position: fixed;
      bottom: 520px;
      left: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #00CEC9, #00B894);
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
      z-index: 9995;
      transition: all 0.3s ease;
    `;

    btn.onmouseenter = () => {
      btn.style.transform = 'scale(1.1) rotate(-5deg)';
      btn.style.boxShadow = '0 6px 20px rgba(0, 184, 148, 0.5)';
    };

    btn.onmouseleave = () => {
      btn.style.transform = 'scale(1) rotate(0deg)';
      btn.style.boxShadow = '0 4px 15px rgba(0, 184, 148, 0.4)';
    };

    btn.onclick = () => {
      injectStyles();
      const game = createGameContainer();
      document.body.appendChild(game);

      // 添加关闭按钮
      game.querySelector('.game-close').onclick = () => {
        clearInterval(gameState.timerInterval);
        game.remove();
      };
    };

    return btn;
  }

  // 导出全局函数
  window.startCardGame = startGame;
  window.resetCardGame = resetGame;

  // 页面加载完成后添加触发器
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(createTriggerButton());
    });
  } else {
    document.body.appendChild(createTriggerButton());
  }
})();
