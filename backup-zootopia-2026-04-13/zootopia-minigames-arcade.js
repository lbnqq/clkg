/**
 * 疯狂动物城主题 - 迷你游戏街机
 * Zootopia Theme - Minigames Arcade
 * | 多种小型游戏合集
 */

(function() {
  'use strict';

  // 游戏列表
  const arcadeGames = {
    whackAFox: {
      id: 'whackAFox',
      name: '打地鼠',
      icon: '🦊',
      description: '尼克会从洞里冒出来，点击他获得积分！',
      difficulty: 'easy',
      highScore: 0,
      plays: 0
    },
    carrotCatch: {
      id: 'carrotCatch',
      name: '胡萝卜雨',
      icon: '🥕',
      description: '朱迪扔下胡萝卜，用篮子接住它们！',
      difficulty: 'medium',
      highScore: 0,
      plays: 0
    },
    memoryMatch: {
      id: 'memoryMatch',
      name: '记忆翻牌',
      icon: '🃏',
      description: '找出所有匹配的卡牌对！',
      difficulty: 'medium',
      highScore: 0,
      plays: 0
    },
    speedTyping: {
      id: 'speedTyping',
      name: '极速打字',
      icon: '⌨️',
      description: '快速打出动物城的词汇！',
      difficulty: 'hard',
      highScore: 0,
      plays: 0
    },
    targetPractice: {
      id: 'targetPractice',
      name: '靶场练习',
      icon: '🎯',
      description: '像朱迪一样练习射击！',
      difficulty: 'medium',
      highScore: 0,
      plays: 0
    }
  };

  // 街机数据
  let arcadeData = {
    totalPlays: 0,
    totalScore: 0,
    unlockedGames: ['whackAFox', 'carrotCatch'],
    currentGame: null
  };

  // 加载保存的数据
  function loadArcadeData() {
    const saved = localStorage.getItem('zootopiaArcade');
    if (saved) {
      arcadeData = JSON.parse(saved);
      Object.keys(arcadeGames).forEach(gameId => {
        const gameSaved = localStorage.getItem(`zootopiaGame_${gameId}`);
        if (gameSaved) {
          arcadeGames[gameId] = { ...arcadeGames[gameId], ...JSON.parse(gameSaved) };
        }
      });
    }
  }

  // 保存游戏数据
  function saveGameData(gameId) {
    localStorage.setItem(`zootopiaGame_${gameId}`, JSON.stringify(arcadeGames[gameId]));
    localStorage.setItem('zootopiaArcade', JSON.stringify(arcadeData));
  }

  // 创建街机界面
  function createArcadeInterface() {
    const arcade = document.createElement('div');
    arcade.className = 'zootopia-arcade';
    arcade.innerHTML = `
      <div class="arcade-backdrop"></div>
      <div class="arcade-container">
        <div class="arcade-header">
          <div class="arcade-logo">🎮</div>
          <div class="arcade-title">动物城游戏街机</div>
          <button class="arcade-close">×</button>
        </div>

        <div class="arcade-stats">
          <div class="stat-item">
            <span class="stat-icon">🎯</span>
            <span class="stat-value">${arcadeData.totalPlays}</span>
            <span class="stat-label">总局数</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">${arcadeData.totalScore}</span>
            <span class="stat-label">总积分</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🏆</span>
            <span class="stat-value">${arcadeData.unlockedGames.length}/${Object.keys(arcadeGames).length}</span>
            <span class="stat-label">已解锁</span>
          </div>
        </div>

        <div class="arcade-games-grid">
          ${Object.values(arcadeGames).map(game => createGameCard(game)).join('')}
        </div>

        <div class="arcade-game-area" id="gameArea">
          <!-- 游戏区域 -->
        </div>
      </div>

      <button class="arcade-toggle" id="arcadeToggle">
        <span class="toggle-icon">🎮</span>
        <span class="toggle-badge">NEW</span>
      </button>
    `;

    return arcade;
  }

  // 创建游戏卡片
  function createGameCard(game) {
    const isUnlocked = arcadeData.unlockedGames.includes(game.id);
    const difficultyColor = {
      easy: '#2ECC71',
      medium: '#F39C12',
      hard: '#E74C3C'
    }[game.difficulty];

    return `
      <div class="game-card ${isUnlocked ? 'unlocked' : 'locked'}" data-game="${game.id}">
        <div class="game-card-header">
          <span class="game-icon">${game.icon}</span>
          ${!isUnlocked ? '<span class="lock-icon">🔒</span>' : ''}
        </div>
        <div class="game-card-body">
          <div class="game-name">${game.name}</div>
          <div class="game-description">${game.description}</div>
          <div class="game-stats">
            <span class="game-highscore">🏆 ${game.highScore}</span>
            <span class="game-plays">🎮 ${game.plays}</span>
          </div>
        </div>
        <div class="game-card-footer">
          <span class="difficulty-badge" style="background: ${difficultyColor}">
            ${game.difficulty.toUpperCase()}
          </span>
          <button class="game-play-btn" ${isUnlocked ? '' : 'disabled'}>
            ${isUnlocked ? '开始游戏' : '未解锁'}
          </button>
        </div>
      </div>
    `;
  }

  // 游戏实现
  const games = {
    whackAFox: {
      init: (gameArea) => {
        let score = 0;
        let timeLeft = 30;
        let active = true;

        gameArea.innerHTML = `
          <div class="whack-game">
            <div class="game-hud">
              <span class="game-score">分数: ${score}</span>
              <span class="game-timer">时间: ${timeLeft}s</span>
            </div>
            <div class="holes-grid">
              ${Array(9).fill(0).map((_, i) => `
                <div class="hole" data-hole="${i}">
                  <div class="fox"></div>
                </div>
              `).join('')}
            </div>
            <button class="game-end-btn">结束游戏</button>
          </div>
        `;

        const holes = gameArea.querySelectorAll('.hole');
        const scoreDisplay = gameArea.querySelector('.game-score');
        const timerDisplay = gameArea.querySelector('.game-timer');

        function showFox() {
          if (!active) return;
          const randomHole = holes[Math.floor(Math.random() * holes.length)];
          const fox = randomHole.querySelector('.fox');
          fox.classList.add('active');
          setTimeout(() => {
            fox.classList.remove('active');
            if (active) setTimeout(showFox, Math.random() * 1000 + 500);
          }, 1000);
        }

        holes.forEach(hole => {
          hole.querySelector('.fox').addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
              e.target.classList.remove('active');
              score += 10;
              scoreDisplay.textContent = `分数: ${score}`;
              showPoints(e.clientX, e.clientY, '+10');
            }
          });
        });

        showFox();

        const timer = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = `时间: ${timeLeft}s`;
          if (timeLeft <= 0) {
            clearInterval(timer);
            active = false;
            endGame(score);
          }
        }, 1000);

        gameArea.querySelector('.game-end-btn').onclick = () => {
          clearInterval(timer);
          active = false;
          endGame(score);
        };
      }
    },

    carrotCatch: {
      init: (gameArea) => {
        let score = 0;
        let lives = 3;
        let active = true;

        gameArea.innerHTML = `
          <div class="carrot-game">
            <div class="game-hud">
              <span class="game-score">🥕 ${score}</span>
              <span class="game-lives">❤️ ${lives}</span>
            </div>
            <div class="basket"></div>
            <button class="game-end-btn">结束游戏</button>
          </div>
        `;

        const basket = gameArea.querySelector('.basket');
        const scoreDisplay = gameArea.querySelector('.game-score');
        const livesDisplay = gameArea.querySelector('.game-lives');

        let basketX = 50;
        gameArea.addEventListener('mousemove', (e) => {
          const rect = gameArea.getBoundingClientRect();
          basketX = ((e.clientX - rect.left) / rect.width) * 100;
          basket.style.left = `${basketX}%`;
        });

        function spawnCarrot() {
          if (!active) return;
          const carrot = document.createElement('div');
          carrot.className = 'carrot';
          carrot.style.left = `${Math.random() * 90 + 5}%`;
          gameArea.appendChild(carrot);

          let posY = 0;
          const fall = setInterval(() => {
            if (!active) {
              clearInterval(fall);
              carrot.remove();
              return;
            }

            posY += 3;
            carrot.style.top = `${posY}%`;

            if (posY > 80) {
              const basketRect = basket.getBoundingClientRect();
              const carrotRect = carrot.getBoundingClientRect();

              if (carrotRect.left < basketRect.right && carrotRect.right > basketRect.left) {
                score += 5;
                scoreDisplay.textContent = `🥕 ${score}`;
                showPoints(carrotRect.left, carrotRect.top, '+5');
              } else if (posY > 90) {
                lives--;
                livesDisplay.textContent = `❤️ ${lives}`;
                if (lives <= 0) {
                  active = false;
                  endGame(score);
                }
              }

              clearInterval(fall);
              carrot.remove();
            }
          }, 20);

          setTimeout(spawnCarrot, Math.random() * 1500 + 500);
        }

        spawnCarrot();
        gameArea.querySelector('.game-end-btn').onclick = () => {
          active = false;
          endGame(score);
        };
      }
    },

    memoryMatch: {
      init: (gameArea) => {
        const emojis = ['🐰', '🦊', '🐢', '🦁', '🦊', '🐰', '🐢', '🦁', '🐭', '🐼', '🐨', '🐭', '🐼', '🐨', '🦊', '🐰'];
        let flipped = [];
        let matched = 0;
        let moves = 0;

        gameArea.innerHTML = `
          <div class="memory-game">
            <div class="game-hud">
              <span class="game-moves">步数: ${moves}</span>
              <span class="game-matched">匹配: ${matched}/8</span>
            </div>
            <div class="memory-grid">
              ${emojis.map((emoji, i) => `
                <div class="memory-card" data-card="${i}" data-emoji="${emoji}">
                  <div class="card-front">?</div>
                  <div class="card-back">${emoji}</div>
                </div>
              `).join('')}
            </div>
            <button class="game-restart-btn">重新开始</button>
          </div>
        `;

        const cards = gameArea.querySelectorAll('.memory-card');
        const movesDisplay = gameArea.querySelector('.game-moves');
        const matchedDisplay = gameArea.querySelector('.game-matched');

        cards.forEach(card => {
          card.addEventListener('click', () => {
            if (flipped.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

            card.classList.add('flipped');
            flipped.push(card);

            if (flipped.length === 2) {
              moves++;
              movesDisplay.textContent = `步数: ${moves}`;

              const [card1, card2] = flipped;
              if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matched++;
                matchedDisplay.textContent = `匹配: ${matched}/8`;
                flipped = [];

                if (matched === 8) {
                  setTimeout(() => endGame(100 - moves * 2), 500);
                }
              } else {
                setTimeout(() => {
                  card1.classList.remove('flipped');
                  card2.classList.remove('flipped');
                  flipped = [];
                }, 1000);
              }
            }
          });
        });

        gameArea.querySelector('.game-restart-btn').onclick = () => {
          gameArea.innerHTML = '';
          games.memoryMatch.init(gameArea);
        };
      }
    },

    speedTyping: {
      init: (gameArea) => {
        const words = ['ZOOTOPia', 'NICK', 'JUDY', 'FLASH', 'POLICE', 'CARROTS', 'PAWPSICLE', 'MAMMAL', 'SAHARA', 'TUNDRA'];
        let currentWord = '';
        let score = 0;
        let timeLeft = 60;

        gameArea.innerHTML = `
          <div class="typing-game">
            <div class="game-hud">
              <span class="game-score">分数: ${score}</span>
              <span class="game-timer">时间: ${timeLeft}s</span>
            </div>
            <div class="word-display"></div>
            <input type="text" class="word-input" placeholder="输入显示的单词..." autofocus>
            <button class="game-end-btn">结束游戏</button>
          </div>
        `;

        const wordDisplay = gameArea.querySelector('.word-display');
        const input = gameArea.querySelector('.word-input');
        const scoreDisplay = gameArea.querySelector('.game-score');
        const timerDisplay = gameArea.querySelector('.game-timer');

        function showWord() {
          currentWord = words[Math.floor(Math.random() * words.length)];
          wordDisplay.innerHTML = currentWord.split('').map(char => `
            <span class="letter">${char}</span>
          `).join('');
          input.value = '';
        }

        input.addEventListener('input', () => {
          const letters = wordDisplay.querySelectorAll('.letter');
          const value = input.value.toUpperCase();

          letters.forEach((letter, i) => {
            if (value[i]) {
              letter.classList.toggle('correct', value[i] === currentWord[i]);
              letter.classList.toggle('incorrect', value[i] !== currentWord[i]);
            } else {
              letter.classList.remove('correct', 'incorrect');
            }
          });

          if (value === currentWord) {
            score += currentWord.length * 2;
            scoreDisplay.textContent = `分数: ${score}`;
            showPoints(input.getBoundingClientRect().left, input.getBoundingClientRect().top, `+${currentWord.length * 2}`);
            showWord();
          }
        });

        const timer = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = `时间: ${timeLeft}s`;
          if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(score);
          }
        }, 1000);

        showWord();
        input.focus();

        gameArea.querySelector('.game-end-btn').onclick = () => {
          clearInterval(timer);
          endGame(score);
        };
      }
    },

    targetPractice: {
      init: (gameArea) => {
        let score = 0;
        let bullets = 10;
        let active = true;

        gameArea.innerHTML = `
          <div class="target-game">
            <div class="game-hud">
              <span class="game-score">分数: ${score}</span>
              <span class="game-bullets">子弹: ${bullets}</span>
            </div>
            <div class="target-area"></div>
            <button class="game-end-btn">结束游戏</button>
          </div>
        `;

        const targetArea = gameArea.querySelector('.target-area');
        const scoreDisplay = gameArea.querySelector('.game-score');
        const bulletsDisplay = gameArea.querySelector('.game-bullets');

        function spawnTarget() {
          if (!active || bullets <= 0) return;

          const target = document.createElement('div');
          target.className = 'target';
          target.style.left = `${Math.random() * 80 + 10}%`;
          target.style.top = `${Math.random() * 60 + 10}%`;
          targetArea.appendChild(target);

          setTimeout(() => {
            if (target.parentElement) {
              target.remove();
              if (active) setTimeout(spawnTarget, Math.random() * 2000 + 1000);
            }
          }, 3000);

          target.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = target.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
            const points = Math.max(1, Math.round(10 - distance / 20));
            score += points;
            scoreDisplay.textContent = `分数: ${score}`;
            showPoints(e.clientX, e.clientY, `+${points}`);
            target.remove();
            setTimeout(spawnTarget, Math.random() * 1500 + 500);
          });
        }

        spawnTarget();

        targetArea.addEventListener('click', () => {
          if (bullets > 0 && active) {
            bullets--;
            bulletsDisplay.textContent = `子弹: ${bullets}`;
            if (bullets <= 0) {
              active = false;
              setTimeout(() => endGame(score), 1000);
            }
          }
        });

        gameArea.querySelector('.game-end-btn').onclick = () => {
          active = false;
          endGame(score);
        };
      }
    }
  };

  // 显示得分
  function showPoints(x, y, text) {
    const points = document.createElement('div');
    points.className = 'points-popup';
    points.textContent = text;
    points.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      color: #FFD700;
      font-weight: bold;
      font-size: 20px;
      animation: pointsFloat 1s ease forwards;
      z-index: 10000;
    `;
    document.body.appendChild(points);
    setTimeout(() => points.remove(), 1000);
  }

  // 结束游戏
  function endGame(finalScore) {
    const gameArea = document.getElementById('gameArea');
    if (!arcadeData.currentGame) return;

    const game = arcadeGames[arcadeData.currentGame];
    game.plays++;
    game.highScore = Math.max(game.highScore, finalScore);
    saveGameData(arcadeData.currentGame);

    arcadeData.totalPlays++;
    arcadeData.totalScore += finalScore;
    localStorage.setItem('zootopiaArcade', JSON.stringify(arcadeData));

    // 触发成就事件
    if (finalScore >= 100) {
      window.dispatchEvent(new CustomEvent('zootopiaAchievement', {
        detail: { name: `高分达成！`, xp: finalScore, reward: '🏆 高分徽章' }
      }));
    }

    gameArea.innerHTML = `
      <div class="game-over">
        <div class="game-over-icon">🎮</div>
        <div class="game-over-title">游戏结束！</div>
        <div class="final-score">得分: ${finalScore}</div>
        ${finalScore > game.highScore - finalScore ? '<div class="new-record">🎉 新纪录！</div>' : ''}
        <button class="play-again-btn">再玩一次</button>
        <button class="back-to-arcade-btn">返回街机</button>
      </div>
    `;

    gameArea.querySelector('.play-again-btn').onclick = () => {
      startGame(arcadeData.currentGame);
    };

    gameArea.querySelector('.back-to-arcade-btn').onclick = () => {
      gameArea.innerHTML = '';
      document.querySelector('.arcade-games-grid').style.display = 'grid';
    };

    arcadeData.currentGame = null;
  }

  // 开始游戏
  function startGame(gameId) {
    if (!arcadeData.unlockedGames.includes(gameId)) return;

    arcadeData.currentGame = gameId;
    const gameArea = document.getElementById('gameArea');
    document.querySelector('.arcade-games-grid').style.display = 'none';

    if (games[gameId]) {
      games[gameId].init(gameArea);
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#arcade-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'arcade-styles';
    styles.textContent = `
      /* 街机容器 */
      .zootopia-arcade {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: none;
      }

      .zootopia-arcade.active {
        display: block;
      }

      .arcade-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        animation: backdropFadeIn 0.3s ease;
      }

      @keyframes backdropFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .arcade-container {
        position: relative;
        width: 90vw;
        height: 90vh;
        margin: 5vh auto;
        background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
        border-radius: 20px;
        overflow: hidden;
        animation: containerSlideIn 0.5s ease;
      }

      @keyframes containerSlideIn {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      /* 街机头部 */
      .arcade-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .arcade-logo {
        font-size: 36px;
        animation: logoBounce 2s ease infinite;
      }

      @keyframes logoBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1) rotate(10deg); }
      }

      .arcade-title {
        flex: 1;
        font-size: 24px;
        font-weight: bold;
      }

      .arcade-close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      /* 统计信息 */
      .arcade-stats {
        display: flex;
        justify-content: space-around;
        padding: 20px;
        background: rgba(0, 0, 0, 0.2);
      }

      .stat-item {
        text-align: center;
        color: white;
      }

      .stat-icon {
        font-size: 28px;
        display: block;
        margin-bottom: 5px;
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #FFD700;
      }

      .stat-label {
        font-size: 12px;
        opacity: 0.8;
      }

      /* 游戏网格 */
      .arcade-games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        padding: 20px;
        overflow-y: auto;
        max-height: calc(90vh - 200px);
      }

      .game-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .game-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      .game-card.locked {
        opacity: 0.6;
      }

      .game-card-header {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        padding: 15px;
        text-align: center;
        position: relative;
      }

      .game-icon {
        font-size: 48px;
      }

      .lock-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 20px;
      }

      .game-card-body {
        padding: 15px;
        text-align: center;
      }

      .game-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .game-description {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 10px;
      }

      .game-stats {
        display: flex;
        justify-content: center;
        gap: 15px;
        font-size: 12px;
      }

      .game-card-footer {
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .difficulty-badge {
        padding: 4px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
        color: white;
      }

      .game-play-btn {
        padding: 8px 16px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        border: none;
        border-radius: 15px;
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
      }

      .game-play-btn:disabled {
        background: #BDC3C7;
        cursor: not-allowed;
      }

      /* 游戏区域 */
      .arcade-game-area {
        position: absolute;
        top: 130px;
        left: 0;
        right: 0;
        bottom: 0;
        display: none;
      }

      .arcade-game-area.active {
        display: block;
      }

      /* 各游戏样式 */
      .whack-game, .carrot-game, .memory-game, .typing-game, .target-game {
        width: 100%;
        height: 100%;
        padding: 20px;
      }

      .game-hud {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
      }

      .holes-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        max-width: 400px;
        margin: 0 auto;
      }

      .hole {
        width: 100px;
        height: 100px;
        background: #8B4513;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }

      .fox {
        position: absolute;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 50px;
        transition: bottom 0.3s ease;
      }

      .fox.active {
        bottom: 10px;
      }

      .basket {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 40px;
        background: #8B4513;
        border-radius: 0 0 40px 40px;
        transition: left 0.1s ease;
      }

      .carrot {
        position: absolute;
        font-size: 30px;
        animation: carrotFall linear;
      }

      @keyframes carrotFall {
        to { transform: translateY(100vh); }
      }

      .memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        max-width: 400px;
        margin: 0 auto;
      }

      .memory-card {
        width: 80px;
        height: 100px;
        perspective: 1000px;
        cursor: pointer;
      }

      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        border-radius: 10px;
        transition: transform 0.6s ease;
      }

      .card-front {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        transform: rotateY(180deg);
      }

      .card-back {
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .memory-card.flipped .card-front {
        transform: rotateY(0deg);
      }

      .memory-card.flipped .card-back {
        transform: rotateY(-180deg);
      }

      .memory-card.matched {
        opacity: 0.5;
        cursor: default;
      }

      .word-display {
        text-align: center;
        font-size: 48px;
        margin: 50px 0;
        min-height: 60px;
      }

      .letter {
        display: inline-block;
        min-width: 30px;
      }

      .letter.correct {
        color: #2ECC71;
      }

      .letter.incorrect {
        color: #E74C3C;
      }

      .word-input {
        display: block;
        width: 300px;
        margin: 0 auto;
        padding: 15px;
        font-size: 24px;
        text-align: center;
        border: 2px solid #BDC3C7;
        border-radius: 10px;
      }

      .word-input:focus {
        outline: none;
        border-color: #9B59B6;
      }

      .target-area {
        position: relative;
        width: 100%;
        height: calc(100% - 100px);
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        border-radius: 15px;
        cursor: crosshair;
      }

      .target {
        position: absolute;
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, #FF6B6B 0%, #EE5A24 70%, #FFFFFF 75%, #FF6B6B 100%);
        border-radius: 50%;
        cursor: pointer;
        animation: targetPulse 1s ease infinite;
      }

      @keyframes targetPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      /* 游戏结束 */
      .game-over {
        text-align: center;
        padding: 40px;
      }

      .game-over-icon {
        font-size: 64px;
        margin-bottom: 20px;
      }

      .game-over-title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .final-score {
        font-size: 48px;
        color: #FFD700;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .new-record {
        color: #E74C3C;
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }

      .play-again-btn, .back-to-arcade-btn, .game-end-btn, .game-restart-btn {
        margin: 10px;
        padding: 15px 30px;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      /* 得分弹出 */
      @keyframes pointsFloat {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-50px);
        }
      }

      /* 切换按钮 */
      .arcade-toggle {
        position: fixed;
        bottom: 20px;
        left: 30px;
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

      .arcade-toggle:hover {
        transform: scale(1.1);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .toggle-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        padding: 3px 8px;
        background: #E74C3C;
        color: white;
        font-size: 10px;
        font-weight: bold;
        border-radius: 10px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .arcade-container {
          width: 95vw;
          height: 95vh;
          margin: 2.5vh auto;
        }

        .arcade-games-grid {
          grid-template-columns: 1fr;
        }

        .arcade-toggle {
          bottom: 100px;
          left: 15px;
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

  // 初始化街机
  function initArcade() {
    loadArcadeData();
    injectStyles();

    const arcade = createArcadeInterface();
    document.body.appendChild(arcade);

    // 切换按钮
    document.getElementById('arcadeToggle').onclick = () => {
      arcade.classList.add('active');
    };

    // 关闭按钮
    arcade.querySelector('.arcade-close').onclick = () => {
      arcade.classList.remove('active');
    };

    // 游戏卡片点击
    arcade.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => {
        const gameId = card.dataset.game;
        if (arcadeData.unlockedGames.includes(gameId)) {
          startGame(gameId);
        }
      });
    });
  }

  // 导出全局函数
  window.zootopiaArcade = {
    show: () => {
      document.querySelector('.zootopia-arcade').classList.add('active');
    },
    unlockGame: (gameId) => {
      if (!arcadeData.unlockedGames.includes(gameId)) {
        arcadeData.unlockedGames.push(gameId);
        localStorage.setItem('zootopiaArcade', JSON.stringify(arcadeData));
      }
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArcade);
  } else {
    initArcade();
  }
})();
