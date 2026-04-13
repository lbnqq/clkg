/**
 * 疯狂动物城游戏系统（优化版）
 * Zootopia Game System - 统一游戏管理
 */

(function() {
  'use strict';

  // ==================== 游戏管理器 ====================
  const GameManager = {
    currentGame: null,
    gameContainer: null,
    gameStats: {
      totalPlayed: 0,
      gamesCompleted: 0,
      highScores: {}
    },

    init: function() {
      // 从 localStorage 加载游戏统计
      this.loadStats();

      // 创建游戏入口按钮
      this.createGameButton();

      // 自动初始化游戏容器
      this.initGameContainers();
    },

    loadStats: function() {
      try {
        const saved = localStorage.getItem('zt_gameStats');
        if (saved) {
          this.gameStats = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('无法加载游戏统计');
      }
    },

    saveStats: function() {
      try {
        localStorage.setItem('zt_gameStats', JSON.stringify(this.gameStats));
      } catch (e) {
        console.warn('无法保存游戏统计');
      }
    },

    createGameButton: function() {
      const button = document.createElement('button');
      button.className = 'zt-game-trigger';
      button.innerHTML = '🎮';
      button.setAttribute('aria-label', '打开游戏中心');

      button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(255, 159, 67, 0.4);
        z-index: 997;
        transition: transform var(--zt-duration-normal) var(--zt-ease-out);
      `;

      ZootopiaCore.events.on(button, 'click', () => this.showGameMenu());
      ZootopiaCore.events.on(button, 'mouseenter', () => {
        button.style.transform = 'scale(1.1) rotate(10deg)';
      });
      ZootopiaCore.events.on(button, 'mouseleave', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
      });

      document.body.appendChild(button);
    },

    showGameMenu: function() {
      const menu = this.createGameMenu();
      document.body.appendChild(menu);

      ZootopiaCore.animation.animate(menu, 'scaleIn');

      // 关闭按钮
      const closeBtn = menu.querySelector('.zt-game-menu-close');
      ZootopiaCore.events.on(closeBtn, 'click', () => {
        ZootopiaCore.animation.animate(menu, 'scaleOut').then(() => menu.remove());
      });

      // 游戏选择
      ZootopiaCore.events.delegate(menu, '.zt-game-item', 'click', (e) => {
        const gameId = e.currentTarget.getAttribute('data-game');
        this.startGame(gameId);
        menu.remove();
      });
    },

    createGameMenu: function() {
      const menu = document.createElement('div');
      menu.className = 'zt-game-menu';
      menu.innerHTML = `
        <div class="zt-game-menu-header">
          <h2>🎮 动物城游戏中心</h2>
          <button class="zt-game-menu-close" aria-label="关闭">×</button>
        </div>
        <div class="zt-game-menu-body">
          <div class="zt-game-item" data-game="guess">
            <div class="zt-game-icon">🔮</div>
            <div class="zt-game-info">
              <h3>猜角色</h3>
              <p>根据提示猜出角色</p>
            </div>
          </div>
          <div class="zt-game-item" data-game="memory">
            <div class="zt-game-icon">🧠</div>
            <div class="zt-game-info">
              <h3>记忆卡片</h3>
              <p>翻开卡片进行配对</p>
            </div>
          </div>
          <div class="zt-game-item" data-game="catch">
            <div class="zt-game-icon">🍦</div>
            <div class="zt-game-info">
              <h3>接Pawpsicle</h3>
              <p>接住掉落的冰棍</p>
            </div>
          </div>
          <div class="zt-game-item" data-game="quiz">
            <div class="zt-game-icon">❓</div>
            <div class="zt-game-info">
              <h3>知识问答</h3>
              <p>测试你的动物城知识</p>
            </div>
          </div>
        </div>
      `;

      return menu;
    },

    startGame: function(gameId) {
      // 关闭当前游戏
      if (this.currentGame) {
        this.endGame();
      }

      // 创建游戏容器
      this.gameContainer = document.createElement('div');
      this.gameContainer.className = 'zt-game-container';
      document.body.appendChild(this.gameContainer);

      // 启动游戏
      switch (gameId) {
        case 'guess':
          this.currentGame = new GuessCharacterGame(this.gameContainer);
          break;
        case 'memory':
          this.currentGame = new MemoryCardGame(this.gameContainer);
          break;
        case 'catch':
          this.currentGame = new CatchGame(this.gameContainer);
          break;
        case 'quiz':
          this.currentGame = new QuizGame(this.gameContainer);
          break;
        default:
          console.warn('未知游戏:', gameId);
          return;
      }

      this.currentGame.init();
      this.gameStats.totalPlayed++;
      this.saveStats();
    },

    endGame: function() {
      if (this.currentGame) {
        this.currentGame.destroy();
        this.currentGame = null;
      }

      if (this.gameContainer) {
        this.gameContainer.remove();
        this.gameContainer = null;
      }
    },

    initGameContainers: function() {
      // 为每个游戏创建自动初始化
      document.querySelectorAll('[data-zt-game]').forEach(el => {
        const gameId = el.getAttribute('data-zt-game');
        ZootopiaCore.events.on(el, 'click', () => {
          this.startGame(gameId);
        });
      });
    }
  };

  // ==================== 猜角色游戏 ====================
  class GuessCharacterGame {
    constructor(container) {
      this.container = container;
      this.characters = Object.values(ZootopiaCore.characters);
      this.currentCharacter = null;
      this.score = 0;
      this.streak = 0;
      this.hintsShown = 0;
    }

    init() {
      this.container.innerHTML = `
        <div class="zt-game-header">
          <h2>🔮 猜角色游戏</h2>
          <button class="zt-game-exit">×</button>
        </div>
        <div class="zt-game-content">
          <div class="zt-score-board">
            <span>得分: <strong id="zt-score">0</strong></span>
            <span>连胜: <strong id="zt-streak">0</strong></span>
          </div>
          <div class="zt-hint-container" id="zt-hints"></div>
          <div class="zt-guess-input">
            <input type="text" id="zt-guess-input" placeholder="输入角色名称..." autocomplete="off">
            <button id="zt-guess-submit">猜！</button>
          </div>
          <div class="zt-feedback" id="zt-feedback"></div>
        </div>
      `;

      this.bindEvents();
      this.newRound();
    }

    bindEvents() {
      const exitBtn = this.container.querySelector('.zt-game-exit');
      ZootopiaCore.events.on(exitBtn, 'click', () => GameManager.endGame());

      const input = this.container.querySelector('#zt-guess-input');
      const submitBtn = this.container.querySelector('#zt-guess-submit');

      ZootopiaCore.events.on(submitBtn, 'click', () => this.makeGuess());
      ZootopiaCore.events.on(input, 'keypress', (e) => {
        if (e.key === 'Enter') this.makeGuess();
      });
    }

    newRound() {
      this.currentCharacter = ZootopiaCore.utils.random(this.characters);
      this.hintsShown = 0;

      const hints = [
        this.currentCharacter.emoji,
        this.currentCharacter.species,
        this.currentCharacter.nameZh || this.currentCharacter.name,
        this.currentCharacter.quote.substring(0, 20) + '...'
      ];

      this.displayHints(hints);
      this.container.querySelector('#zt-guess-input').value = '';
      this.container.querySelector('#zt-feedback').textContent = '';
    }

    displayHints(hints) {
      const hintsContainer = this.container.querySelector('#zt-hints');
      hintsContainer.innerHTML = hints.map((hint, index) => `
        <div class="zt-hint" data-index="${index}" style="opacity: ${index === 0 ? 1 : 0.5}">
          ${hint}
        </div>
      `).join('');
    }

    makeGuess() {
      const input = this.container.querySelector('#zt-guess-input');
      const guess = input.value.trim().toLowerCase();
      const feedback = this.container.querySelector('#zt-feedback');

      if (!guess) return;

      const correctName = this.currentCharacter.name.toLowerCase();
      const correctNameZh = (this.currentCharacter.nameZh || '').toLowerCase();

      if (guess === correctName || guess === correctNameZh) {
        this.score += 10 + (this.streak * 2);
        this.streak++;
        this.updateScore();
        feedback.textContent = '🎉 正确！';
        feedback.style.color = '#10AC84';

        ZootopiaCore.animation.animate(feedback, 'bounce');

        setTimeout(() => this.newRound(), 1500);
      } else {
        this.streak = 0;
        this.updateScore();
        feedback.textContent = '❌ 再试试！';
        feedback.style.color = '#EE5A24';

        // 显示更多提示
        this.showMoreHint();
      }
    }

    showMoreHint() {
      const hints = this.container.querySelectorAll('.zt-hint');
      this.hintsShown++;

      if (this.hintsShown < hints.length) {
        ZootopiaCore.animation.animate(hints[this.hintsShown], 'fadeIn');
        hints[this.hintsShown].style.opacity = '1';
      }
    }

    updateScore() {
      this.container.querySelector('#zt-score').textContent = this.score;
      this.container.querySelector('#zt-streak').textContent = this.streak;
    }

    destroy() {
      // 清理
    }
  }

  // ==================== 记忆卡片游戏 ====================
  class MemoryCardGame {
    constructor(container) {
      this.container = container;
      this.cards = [];
      this.flippedCards = [];
      this.matchedPairs = 0;
      this.moves = 0;
      this.isLocked = false;
      this.emojis = ['🐰', '🦊', '🦬', '🦥', '🦆', '🐀', '🐑', '🦛'];
    }

    init() {
      this.container.innerHTML = `
        <div class="zt-game-header">
          <h2>🧠 记忆卡片</h2>
          <button class="zt-game-exit">×</button>
        </div>
        <div class="zt-game-content">
          <div class="zt-score-board">
            <span>移动: <strong id="zt-moves">0</strong></span>
            <span>配对: <strong id="zt-matched">0</strong>/8</span>
          </div>
          <div class="zt-memory-grid" id="zt-memory-grid"></div>
        </div>
      `;

      const exitBtn = this.container.querySelector('.zt-game-exit');
      ZootopiaCore.events.on(exitBtn, 'click', () => GameManager.endGame());

      this.setupCards();
    }

    setupCards() {
      // 创建配对卡片
      const cardPairs = [...this.emojis, ...this.emojis];
      // 洗牌
      for (let i = cardPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
      }

      const grid = this.container.querySelector('#zt-memory-grid');
      grid.innerHTML = cardPairs.map((emoji, index) => `
        <div class="zt-memory-card" data-index="${index}" data-emoji="${emoji}">
          <div class="zt-card-face zt-card-front">?</div>
          <div class="zt-card-face zt-card-back">${emoji}</div>
        </div>
      `).join('');

      // 绑定点击事件
      ZootopiaCore.events.delegate(grid, '.zt-memory-card', 'click', (e) => {
        this.flipCard(e.currentTarget);
      });
    }

    flipCard(card) {
      if (this.isLocked) return;
      if (card.classList.contains('zt-flipped')) return;

      card.classList.add('zt-flipped');
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.moves++;
        this.container.querySelector('#zt-moves').textContent = this.moves;
        this.checkMatch();
      }
    }

    checkMatch() {
      this.isLocked = true;
      const [card1, card2] = this.flippedCards;
      const match = card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji');

      if (match) {
        this.matchedPairs++;
        this.container.querySelector('#zt-matched').textContent = this.matchedPairs;

        ZootopiaCore.animation.animate(card1, 'pulse');
        ZootopiaCore.animation.animate(card2, 'pulse');

        this.flippedCards = [];
        this.isLocked = false;

        if (this.matchedPairs === 8) {
          setTimeout(() => this.showWin(), 500);
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('zt-flipped');
          card2.classList.remove('zt-flipped');
          this.flippedCards = [];
          this.isLocked = false;
        }, 1000);
      }
    }

    showWin() {
      const overlay = document.createElement('div');
      overlay.className = 'zt-game-win';
      overlay.innerHTML = `
        <div class="zt-win-content">
          <h2>🎉 恭喜完成！</h2>
          <p>总移动次数: ${this.moves}</p>
          <button class="zt-play-again">再玩一次</button>
          <button class="zt-close-game">关闭</button>
        </div>
      `;

      this.container.appendChild(overlay);

      ZootopiaCore.events.on(overlay.querySelector('.zt-play-again'), 'click', () => {
        overlay.remove();
        this.reset();
      });

      ZootopiaCore.events.on(overlay.querySelector('.zt-close-game'), 'click', () => {
        GameManager.endGame();
      });
    }

    reset() {
      this.flippedCards = [];
      this.matchedPairs = 0;
      this.moves = 0;
      this.isLocked = false;
      this.setupCards();
      this.container.querySelector('#zt-moves').textContent = '0';
      this.container.querySelector('#zt-matched').textContent = '0';
    }

    destroy() {
      // 清理
    }
  }

  // ==================== 接Pawpsicle游戏 ====================
  class CatchGame {
    constructor(container) {
      this.container = container;
      this.score = 0;
      this.lives = 3;
      this.isPlaying = false;
      this.pawpsicles = [];
      this.spawnInterval = null;
      this.gameLoop = null;
    }

    init() {
      this.container.innerHTML = `
        <div class="zt-game-header">
          <h2>🍦 接Pawpsicle</h2>
          <button class="zt-game-exit">×</button>
        </div>
        <div class="zt-game-content">
          <div class="zt-score-board">
            <span>得分: <strong id="zt-catch-score">0</strong></span>
            <span>生命: <strong id="zt-catch-lives">❤️❤️❤️</strong></span>
          </div>
          <div class="zt-catch-area" id="zt-catch-area">
            <div class="zt-catch-start">
              <p>点击屏幕接住掉落的 Pawpsicles！</p>
              <button class="zt-start-catch">开始游戏</button>
            </div>
          </div>
        </div>
      `;

      const exitBtn = this.container.querySelector('.zt-game-exit');
      ZootopiaCore.events.on(exitBtn, 'click', () => this.stopGame());

      const startBtn = this.container.querySelector('.zt-start-catch');
      ZootopiaCore.events.on(startBtn, 'click', () => this.startGame());

      // 点击接住
      ZootopiaCore.events.delegate(this.container, '#zt-catch-area', 'click', (e) => {
        if (!this.isPlaying) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.catchAt(x, y);
      });
    }

    startGame() {
      this.isPlaying = true;
      this.score = 0;
      this.lives = 3;
      this.updateUI();

      this.container.querySelector('.zt-catch-start').style.display = 'none';

      this.spawnInterval = setInterval(() => {
        this.spawnPawpsicle();
      }, 1000);

      this.gameLoop = setInterval(() => {
        this.update();
      }, 16);
    }

    stopGame() {
      this.isPlaying = false;

      if (this.spawnInterval) {
        clearInterval(this.spawnInterval);
        this.spawnInterval = null;
      }

      if (this.gameLoop) {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
      }

      this.pawpsicles.forEach(p => p.element.remove());
      this.pawpsicles = [];
    }

    spawnPawpsicle() {
      if (!this.isPlaying) return;

      const area = this.container.querySelector('#zt-catch-area');
      const rect = area.getBoundingClientRect();

      const pawpsicle = document.createElement('div');
      pawpsicle.className = 'zt-pawpsicle';
      pawpsicle.innerHTML = '🍦';
      pawpsicle.style.cssText = `
        position: absolute;
        left: ${Math.random() * (rect.width - 40)}px;
        top: -40px;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.1s;
      `;

      area.appendChild(pawpsicle);

      this.pawpsicles.push({
        element: pawpsicle,
        y: -40,
        speed: 2 + Math.random() * 2
      });
    }

    update() {
      const area = this.container.querySelector('#zt-catch-area');
      const rect = area.getBoundingClientRect();

      this.pawpsicles = this.pawpsicles.filter(p => {
        p.y += p.speed;
        p.element.style.top = p.y + 'px';

        // 掉出底部
        if (p.y > rect.height) {
          p.element.remove();
          this.lives--;
          this.updateUI();

          if (this.lives <= 0) {
            this.gameOver();
          }

          return false;
        }

        return true;
      });
    }

    catchAt(x, y) {
      const radius = 50;

      this.pawpsicles = this.pawpsicles.filter(p => {
        const pRect = p.element.getBoundingClientRect();
        const areaRect = this.container.querySelector('#zt-catch-area').getBoundingClientRect();

        const pX = pRect.left - areaRect.left;
        const pY = pRect.top - areaRect.top;

        const distance = Math.sqrt(Math.pow(x - pX - 20, 2) + Math.pow(y - pY - 20, 2));

        if (distance < radius) {
          p.element.remove();
          this.score += 10;
          this.updateUI();

          // 粒子效果
          ZootopiaCore.particles.burst(x, y, 5);

          return false;
        }

        return true;
      });
    }

    updateUI() {
      this.container.querySelector('#zt-catch-score').textContent = this.score;
      this.container.querySelector('#zt-catch-lives').textContent = '❤️'.repeat(this.lives);
    }

    gameOver() {
      this.stopGame();

      const overlay = document.createElement('div');
      overlay.className = 'zt-game-over';
      overlay.innerHTML = `
        <div class="zt-game-over-content">
          <h2>游戏结束</h2>
          <p>得分: ${this.score}</p>
          <button class="zt-play-again">再玩一次</button>
          <button class="zt-close-game">关闭</button>
        </div>
      `;

      this.container.appendChild(overlay);

      ZootopiaCore.events.on(overlay.querySelector('.zt-play-again'), 'click', () => {
        overlay.remove();
        this.startGame();
      });

      ZootopiaCore.events.on(overlay.querySelector('.zt-close-game'), 'click', () => {
        GameManager.endGame();
      });
    }

    destroy() {
      this.stopGame();
    }
  }

  // ==================== 问答游戏 ====================
  class QuizGame {
    constructor(container) {
      this.container = container;
      this.questions = this.generateQuestions();
      this.currentQuestion = 0;
      this.score = 0;
      this.answers = [];
    }

    generateQuestions() {
      return [
        {
          q: '朱迪·霍普斯是第一位什么动物？',
          options: ['兔子', '狐狸', '老虎', '狮子'],
          answer: 0
        },
        {
          q: '尼克·王尔德最擅长什么？',
          options: ['破案', '诈骗', '唱歌', '跳舞'],
          answer: 1
        },
        {
          q: '闪电在什么地方工作？',
          options: ['ZPD', 'DMV', '医院', '学校'],
          answer: 1
        },
        {
          q: '撒哈拉广场的特点是什么？',
          options: ['寒冷', '炎热', '湿润', '多风'],
          answer: 1
        },
        {
          q: '大先生是什么动物？',
          options: ['老鼠', '北极鼩', '仓鼠', '松鼠'],
          answer: 1
        }
      ];
    }

    init() {
      this.container.innerHTML = `
        <div class="zt-game-header">
          <h2>❓ 知识问答</h2>
          <button class="zt-game-exit">×</button>
        </div>
        <div class="zt-game-content">
          <div class="zt-score-board">
            <span>题号: <strong id="zt-question-num">1</strong>/${this.questions.length}</span>
            <span>得分: <strong id="zt-quiz-score">0</strong></span>
          </div>
          <div class="zt-quiz-area" id="zt-quiz-area"></div>
        </div>
      `;

      const exitBtn = this.container.querySelector('.zt-game-exit');
      ZootopiaCore.events.on(exitBtn, 'click', () => GameManager.endGame());

      this.showQuestion();
    }

    showQuestion() {
      const question = this.questions[this.currentQuestion];
      const area = this.container.querySelector('#zt-quiz-area');

      area.innerHTML = `
        <div class="zt-question">${this.currentQuestion + 1}. ${question.q}</div>
        <div class="zt-options">
          ${question.options.map((option, index) => `
            <button class="zt-option" data-index="${index}">${option}</button>
          `).join('')}
        </div>
      `;

      ZootopiaCore.events.delegate(area, '.zt-option', 'click', (e) => {
        this.selectAnswer(parseInt(e.currentTarget.getAttribute('data-index')));
      });
    }

    selectAnswer(index) {
      const question = this.questions[this.currentQuestion];
      const options = this.container.querySelectorAll('.zt-option');

      options.forEach(opt => opt.disabled = true);

      if (index === question.answer) {
        options[index].style.background = '#10AC84';
        options[index].style.color = 'white';
        this.score += 20;
        this.container.querySelector('#zt-quiz-score').textContent = this.score;
      } else {
        options[index].style.background = '#EE5A24';
        options[index].style.color = 'white';
        options[question.answer].style.background = '#10AC84';
        options[question.answer].style.color = 'white';
      }

      setTimeout(() => {
        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
          this.container.querySelector('#zt-question-num').textContent = this.currentQuestion + 1;
          this.showQuestion();
        } else {
          this.showResults();
        }
      }, 1500);
    }

    showResults() {
      const area = this.container.querySelector('#zt-quiz-area');
      const percentage = Math.round((this.score / (this.questions.length * 20)) * 100);

      area.innerHTML = `
        <div class="zt-quiz-results">
          <h2>测试完成！</h2>
          <p>得分: ${this.score}/${this.questions.length * 20}</p>
          <p>正确率: ${percentage}%</p>
          <div class="zt-result-actions">
            <button class="zt-play-again">再玩一次</button>
            <button class="zt-close-game">关闭</button>
          </div>
        </div>
      `;

      ZootopiaCore.events.on(area.querySelector('.zt-play-again'), 'click', () => {
        this.reset();
      });

      ZootopiaCore.events.on(area.querySelector('.zt-close-game'), 'click', () => {
        GameManager.endGame();
      });
    }

    reset() {
      this.currentQuestion = 0;
      this.score = 0;
      this.container.querySelector('#zt-question-num').textContent = '1';
      this.container.querySelector('#zt-quiz-score').textContent = '0';
      this.showQuestion();
    }

    destroy() {
      // 清理
    }
  }

  // ==================== 导出 API ====================
  ZootopiaCore.games = GameManager;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    GameManager.init();
    console.log('🎮 Zootopia 游戏系统已加载');
  });

})();
