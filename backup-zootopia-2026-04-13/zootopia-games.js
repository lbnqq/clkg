/**
 * 疯狂动物城主题 - 小游戏集合
 * Zootopia Theme - Mini Games Collection
 */

(function() {
  'use strict';

  // 游戏数据
  const gameData = {
    // 猜角色游戏
    guessCharacter: {
      characters: [
        { name: 'Judy Hopps', emoji: '🐰', hints: ['兔子', '警察', '第一位兔子警官', '来自Bunnyburrow'] },
        { name: 'Nick Wilde', emoji: '🦊', hints: ['狐狸', '卖Pawpsicles', '狡猾', '穿着西装'] },
        { name: 'Flash', emoji: '🦥', hints: ['树懒', 'DMV职员', '说话很慢', '开车'] },
        { name: 'Chief Bogo', emoji: '🦬', hints: ['非洲水牛', 'ZPD局长', '严肃', '说"你有48小时"'] },
        { name: 'Clawhauser', emoji: '🦆', hints: ['猎豹', '前台接待', 'Gazelle粉丝', '爱吃甜甜圈'] },
        { name: 'Mr Big', emoji: '🐀', hints: ['北极鼩', '黑帮老大', '住在冰川镇', '女儿结婚'] },
        { name: 'Bellwether', emoji: '🐑', hints: ['绵羊', '副市长', '戴眼镜', '反派'] },
        { name: 'Yax', emoji: '🦛', hints: ['侏儒河马', '冥想大师', '天体俱乐部', '观察力强'] }
      ],
      currentCharacter: null,
      score: 0,
      streak: 0
    },

    // 地区配对游戏
    districtMatch: {
      districts: [
        { name: 'Sahara Square', emoji: '🏜️', color: '#FF9F43', desc: '温暖的沙漠地区' },
        { name: 'Tundratown', emoji: '❄️', color: '#0ABDE3', desc: '寒冷的冰雪世界' },
        { name: 'Rainforest', emoji: '🌴', color: '#10AC84', desc: '热带雨林探险' },
        { name: 'Downtown', emoji: '🏙️', color: '#5F27CD', desc: '繁华都市中心' },
        { name: 'Bunnyburrow', emoji: '🥕', color: '#26DE81', desc: '宁静田园风光' },
        { name: 'Little Rodentia', emoji: '🐭', color: '#EE5A24', desc: '微型动物世界' }
      ],
      selected: [],
      matches: 0,
      attempts: 0
    },

    // Pawpsicle 接住游戏
    catchPawpsicle: {
      pawpsicles: [],
      score: 0,
      lives: 3,
      speed: 2,
      isPlaying: false,
      lastSpawn: 0
    },

    // 角色记忆卡片
    memoryCard: {
      cards: [],
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      isLocked: false
    }
  };

  // 创建游戏主菜单
  function createGameMenu() {
    const menu = document.createElement('div');
    menu.className = 'zootopia-game-menu';
    menu.innerHTML = `
      <div class="game-menu-header">
        <span class="game-menu-emoji">🎮</span>
        <span class="game-menu-title">动物城小游戏中心</span>
        <button class="game-menu-close" onclick="this.closest('.zootopia-game-menu').remove()">×</button>
      </div>
      <div class="game-menu-games">
        <div class="game-menu-item" data-game="guess">
          <div class="game-icon">🔮</div>
          <div class="game-name">猜角色</div>
          <div class="game-desc">根据提示猜出角色</div>
        </div>
        <div class="game-menu-item" data-game="district">
          <div class="game-icon">🗺️</div>
          <div class="game-name">地区配对</div>
          <div class="game-desc">匹配地区和特征</div>
        </div>
        <div class="game-menu-item" data-game="catch">
          <div class="game-icon">🍦</div>
          <div class="game-name">接Pawpsicle</div>
          <div class="game-desc">接住掉落的冰棍</div>
        </div>
        <div class="game-menu-item" data-game="memory">
          <div class="game-icon">🧠</div>
          <div class="game-name">记忆卡片</div>
          <div class="game-desc">翻开卡片配对</div>
        </div>
      </div>
    `;

    menu.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      min-width: 400px;
      animation: gameMenuPop 0.5s ease;
    `;

    // 绑定游戏选择事件
    menu.querySelectorAll('.game-menu-item').forEach(item => {
      item.style.cssText = `
        padding: 20px;
        margin: 10px 0;
        border: 2px solid #FF9F43;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
      `;

      item.onmouseenter = () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0 5px 15px rgba(255, 159, 67, 0.3)';
      };

      item.onmouseleave = () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
      };

      item.onclick = () => {
        const gameType = item.dataset.game;
        menu.remove();
        startGame(gameType);
      };
    });

    return menu;
  }

  // 启动游戏
  function startGame(type) {
    switch(type) {
      case 'guess':
        createGuessCharacterGame();
        break;
      case 'district':
        createDistrictMatchGame();
        break;
      case 'catch':
        createCatchPawpsicleGame();
        break;
      case 'memory':
        createMemoryCardGame();
        break;
    }
  }

  // 猜角色游戏
  function createGuessCharacterGame() {
    const game = gameData.guessCharacter;
    const character = game.characters[Math.floor(Math.random() * game.characters.length)];
    game.currentCharacter = character;

    const gameContainer = document.createElement('div');
    gameContainer.className = 'guess-game-container';
    gameContainer.innerHTML = `
      <div class="guess-game-header">
        <span class="guess-game-title">🔮 猜猜我是谁</span>
        <button class="guess-game-close" onclick="this.closest('.guess-game-container').remove()">×</button>
      </div>
      <div class="guess-game-emoji">${character.emoji}</div>
      <div class="guess-game-hint">提示: ${character.hints[0]}</div>
      <div class="guess-game-options">
        ${game.characters.map(c => `
          <button class="guess-option" data-name="${c.name}">${c.emoji} ${c.name}</button>
        `).join('')}
      </div>
      <div class="guess-game-message"></div>
      <div class="guess-game-stats">
        <div class="guess-score">得分: ${game.score}</div>
        <div class="guess-streak">连胜: ${game.streak}</div>
      </div>
    `;

    gameContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      color: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(255, 159, 67, 0.4);
      z-index: 9999;
      min-width: 400px;
      text-align: center;
    `;

    document.body.appendChild(gameContainer);

    // 绑定选项事件
    gameContainer.querySelectorAll('.guess-option').forEach(option => {
      option.style.cssText = `
        display: block;
        width: 100%;
        padding: 12px;
        margin: 8px 0;
        border: 2px solid white;
        border-radius: 10px;
        background: transparent;
        color: white;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
      `;

      option.onmouseenter = () => {
        option.style.background = 'white';
        option.style.color = '#FF9F43';
      };

      option.onmouseleave = () => {
        option.style.background = 'transparent';
        option.style.color = 'white';
      };

      option.onclick = () => {
        const name = option.dataset.name;
        const message = gameContainer.querySelector('.guess-game-message');

        if (name === character.name) {
          game.score += 10 + game.streak * 5;
          game.streak++;
          option.style.background = '#10AC84';
          option.style.borderColor = '#10AC84';
          message.textContent = `✅ 正确！是${character.name}！`;
          message.style.color = '#10AC84';

          setTimeout(() => {
            gameContainer.remove();
            createGuessCharacterGame();
          }, 1500);
        } else {
          game.streak = 0;
          option.style.background = '#FF6B6B';
          option.style.borderColor = '#FF6B6B';
          message.textContent = '❌ 错了！再试一次！';
          message.style.color = '#FF6B6B';
          option.style.pointerEvents = 'none';
        }

        // 更新统计
        gameContainer.querySelector('.guess-score').textContent = `得分: ${game.score}`;
        gameContainer.querySelector('.guess-streak').textContent = `连胜: ${game.streak}`;
      };
    });
  }

  // 地区配对游戏
  function createDistrictMatchGame() {
    const game = gameData.districtMatch;
    const districts = game.districts;
    const items = [...districts, ...districts.map(d => ({...d, id: d.name + '_desc'}))];

    // 打乱顺序
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    const gameContainer = document.createElement('div');
    gameContainer.className = 'district-match-game';
    gameContainer.innerHTML = `
      <div class="match-game-header">
        <span class="match-game-title">🗺️ 地区配对游戏</span>
        <button class="match-game-close" onclick="this.closest('.district-match-game').remove()">×</button>
      </div>
      <div class="match-game-stats">
        <div class="match-matches">配对: ${game.matches}/${districts.length}</div>
        <div class="match-attempts">尝试: ${game.attempts}</div>
      </div>
      <div class="match-game-grid"></div>
    `;

    gameContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      max-width: 600px;
    `;

    document.body.appendChild(gameContainer);

    const grid = gameContainer.querySelector('.match-game-grid');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 20px;
    `;

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'match-card';
      card.dataset.index = index;
      card.dataset.name = item.name;

      const isEmoji = item.emoji && !item.id;
      card.innerHTML = isEmoji ? item.emoji : item.desc || item.name;

      card.style.cssText = `
        padding: 20px;
        border: 3px solid ${item.color};
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background: ${item.color}15;
        font-size: ${isEmoji ? '40px' : '14px'};
      `;

      card.onmouseenter = () => {
        card.style.transform = 'scale(1.1)';
        card.style.boxShadow = `0 5px 15px ${item.color}40`;
      };

      card.onmouseleave = () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
      };

      card.onclick = () => {
        if (card.classList.contains('matched')) return;

        card.classList.add('selected');
        card.style.background = item.color;
        card.style.color = 'white';

        game.selected.push({ card, item, element: card });

        if (game.selected.length === 2) {
          game.attempts++;
          gameContainer.querySelector('.match-attempts').textContent = `尝试: ${game.attempts}`;

          const [first, second] = game.selected;

          if (first.item.name === second.item.name ||
              first.item.name === second.item.id?.replace('_desc', '')) {
            // 配对成功
            first.card.classList.add('matched');
            second.card.classList.add('matched');
            first.card.style.background = '#10AC84';
            second.card.style.background = '#10AC84';
            game.matches++;
            gameContainer.querySelector('.match-matches').textContent =
              `配对: ${game.matches}/${districts.length}`;

            if (game.matches === districts.length) {
              setTimeout(() => {
                alert(`🎉 恭喜完成！共尝试 ${game.attempts} 次`);
                gameContainer.remove();
              }, 500);
            }
          } else {
            // 配对失败
            setTimeout(() => {
              first.card.classList.remove('selected');
              second.card.classList.remove('selected');
              first.card.style.background = `${first.item.color}15`;
              second.card.style.background = `${second.item.color}15`;
              first.card.style.color = 'inherit';
              second.card.style.color = 'inherit';
            }, 1000);
          }

          game.selected = [];
        }
      };

      grid.appendChild(card);
    });
  }

  // 接Pawpsicle游戏
  function createCatchPawpsicleGame() {
    const game = gameData.catchPawpsicle;
    game.isPlaying = true;
    game.score = 0;
    game.lives = 3;
    game.pawpsicles = [];

    const gameContainer = document.createElement('div');
    gameContainer.className = 'catch-game-container';
    gameContainer.innerHTML = `
      <div class="catch-game-header">
        <span class="catch-game-title">🍦 接Pawpsicle游戏</span>
        <button class="catch-game-close" onclick="stopCatchGame()">×</button>
      </div>
      <div class="catch-game-stats">
        <div class="catch-score">得分: ${game.score}</div>
        <div class="catch-lives">生命: ${'❤️'.repeat(game.lives)}</div>
      </div>
      <div class="catch-game-area"></div>
      <div class="catch-game-instructions">
        点击掉落的Pawpsicle来收集它们！不要让它们掉到底部！
      </div>
    `;

    gameContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #0ABDE3, #48DBFB);
      color: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(10, 189, 227, 0.4);
      z-index: 9999;
      width: 500px;
    `;

    document.body.appendChild(gameContainer);

    const area = gameContainer.querySelector('.catch-game-area');
    area.style.cssText = `
      width: 100%;
      height: 400px;
      position: relative;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
    `;

    // 游戏循环
    const gameLoop = setInterval(() => {
      if (!game.isPlaying) {
        clearInterval(gameLoop);
        return;
      }

      // 生成新的Pawpsicle
      if (Date.now() - game.lastSpawn > 1000) {
        const pawpsicle = document.createElement('div');
        pawpsicle.className = 'falling-pawpsicle';
        pawpsicle.textContent = '🍦';
        pawpsicle.style.cssText = `
          position: absolute;
          top: 0;
          left: ${Math.random() * 80 + 10}%;
          font-size: 30px;
          cursor: pointer;
          transition: top 0.05s linear;
        `;

        pawpsicle.onclick = () => {
          game.score += 10;
          game.speed += 0.1;
          gameContainer.querySelector('.catch-score').textContent = `得分: ${game.score}`;
          pawpsicle.remove();
        };

        area.appendChild(pawpsicle);
        game.pawpsicles.push({
          element: pawpsicle,
          y: 0,
          speed: game.speed
        });

        game.lastSpawn = Date.now();
      }

      // 更新位置
      game.pawpsicles.forEach((p, index) => {
        p.y += p.speed;
        p.element.style.top = `${p.y}px`;

        // 检查是否掉到底部
        if (p.y > 400) {
          game.lives--;
          gameContainer.querySelector('.catch-lives').textContent =
            `生命: ${'❤️'.repeat(game.lives)}${'🖤'.repeat(3 - game.lives)}`;
          p.element.remove();
          game.pawpsicles.splice(index, 1);

          if (game.lives <= 0) {
            game.isPlaying = false;
            alert(`游戏结束！得分: ${game.score}`);
            gameContainer.remove();
          }
        }
      });
    }, 50);

    // 停止游戏的函数
    window.stopCatchGame = () => {
      game.isPlaying = false;
      clearInterval(gameLoop);
      gameContainer.remove();
    };
  }

  // 记忆卡片游戏
  function createMemoryCardGame() {
    const game = gameData.memoryCard;
    const emojis = ['🐰', '🦊', '🦥', '🦬', '🦆', '🐀', '🐑', '🦛'];
    game.cards = [...emojis, ...emojis];

    // 打乱
    for (let i = game.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [game.cards[i], game.cards[j]] = [game.cards[j], game.cards[i]];
    }

    const gameContainer = document.createElement('div');
    gameContainer.className = 'memory-game-container';
    gameContainer.innerHTML = `
      <div class="memory-game-header">
        <span class="memory-game-title">🧠 记忆卡片游戏</span>
        <button class="memory-game-close" onclick="this.closest('.memory-game-container').remove()">×</button>
      </div>
      <div class="memory-game-stats">
        <div class="memory-moves">步数: ${game.moves}</div>
        <div class="memory-pairs">配对: ${game.matchedPairs}/8</div>
      </div>
      <div class="memory-game-grid"></div>
    `;

    gameContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 9999;
    `;

    document.body.appendChild(gameContainer);

    const grid = gameContainer.querySelector('.memory-game-grid');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 20px;
    `;

    game.cards.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.index = index;
      card.dataset.emoji = emoji;

      card.style.cssText = `
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      card.onclick = () => {
        if (game.isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        card.textContent = emoji;
        card.style.background = 'white';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';

        game.flippedCards.push(card);

        if (game.flippedCards.length === 2) {
          game.isLocked = true;
          game.moves++;
          gameContainer.querySelector('.memory-moves').textContent = `步数: ${game.moves}`;

          const [first, second] = game.flippedCards;

          if (first.dataset.emoji === second.dataset.emoji) {
            // 配对成功
            first.classList.add('matched');
            second.classList.add('matched');
            first.style.background = '#10AC84';
            second.style.background = '#10AC84';
            game.matchedPairs++;
            gameContainer.querySelector('.memory-pairs').textContent =
              `配对: ${game.matchedPairs}/8`;

            game.flippedCards = [];
            game.isLocked = false;

            if (game.matchedPairs === 8) {
              setTimeout(() => {
                alert(`🎉 恭喜完成！共使用 ${game.moves} 步`);
                gameContainer.remove();
              }, 500);
            }
          } else {
            // 配对失败
            setTimeout(() => {
              first.classList.remove('flipped');
              second.classList.remove('flipped');
              first.textContent = '';
              second.textContent = '';
              first.style.background = 'linear-gradient(135deg, #FF9F43, #EE5A24)';
              second.style.background = 'linear-gradient(135deg, #FF9F43, #EE5A24)';
              first.style.boxShadow = 'none';
              second.style.boxShadow = 'none';
              game.flippedCards = [];
              game.isLocked = false;
            }, 1000);
          }
        }
      };

      grid.appendChild(card);
    });
  }

  // 注入样式
  function injectGameStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      @keyframes gameMenuPop {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }

      .game-menu-header,
      .guess-game-header,
      .match-game-header,
      .catch-game-header,
      .memory-game-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .game-menu-emoji,
      .game-icon {
        font-size: 40px;
        margin-bottom: 10px;
      }

      .game-menu-title,
      .guess-game-title,
      .match-game-title,
      .catch-game-title,
      .memory-game-title {
        font-size: 24px;
        font-weight: bold;
      }

      .game-menu-close,
      .guess-game-close,
      .match-game-close,
      .catch-game-close,
      .memory-game-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: #FF6B6B;
        color: white;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .game-menu-close:hover,
      .guess-game-close:hover,
      .match-game-close:hover,
      .catch-game-close:hover,
      .memory-game-close:hover {
        transform: scale(1.1);
        background: #FF5252;
      }

      .game-name {
        font-size: 18px;
        font-weight: bold;
        margin: 5px 0;
      }

      .game-desc {
        font-size: 14px;
        color: #666;
      }

      .guess-game-emoji {
        font-size: 80px;
        margin: 20px 0;
        animation: emojiBounce 1s ease infinite;
      }

      @keyframes emojiBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .guess-game-hint {
        font-size: 18px;
        margin-bottom: 20px;
        font-style: italic;
      }

      .guess-game-message {
        min-height: 30px;
        font-weight: bold;
        margin: 15px 0;
      }

      .guess-game-stats,
      .match-game-stats,
      .catch-game-stats,
      .memory-game-stats {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px solid rgba(255, 255, 255, 0.3);
      }

      .catch-game-instructions {
        margin-top: 15px;
        font-size: 14px;
        text-align: center;
        opacity: 0.9;
      }
    `;

    document.head.appendChild(styles);
  }

  // 创建游戏入口按钮（浮动按钮）
  function createGameButton() {
    const button = document.createElement('div');
    button.className = 'zootopia-game-button';
    button.innerHTML = '🎮';

    button.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      cursor: pointer;
      box-shadow: 0 5px 20px rgba(255, 159, 67, 0.4);
      z-index: 9997;
      transition: all 0.3s ease;
    `;

    button.onmouseenter = () => {
      button.style.transform = 'scale(1.1) rotate(10deg)';
    };

    button.onmouseleave = () => {
      button.style.transform = 'scale(1) rotate(0deg)';
    };

    button.onclick = () => {
      document.body.appendChild(createGameMenu());
    };

    return button;
  }

  // 初始化游戏系统
  function initGames() {
    injectGameStyles();
    document.body.appendChild(createGameButton());

    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
      if (e.key === 'g' && e.ctrlKey) {
        e.preventDefault();
        document.body.appendChild(createGameMenu());
      }
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGames);
  } else {
    initGames();
  }
})();
