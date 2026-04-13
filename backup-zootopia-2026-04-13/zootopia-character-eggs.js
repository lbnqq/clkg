/**
 * 疯狂动物城主题 - 角色彩蛋随机事件系统
 * Zootopia Theme - Character Easter Egg System
 * | 浏览时随机遇到动物城角色！
 */

(function() {
  'use strict';

  // 角色彩蛋配置
  const characterEggs = [
    {
      id: 'judy_carrot',
      character: '朱迪',
      icon: '🐰',
      color: '#A17F68',
      chance: 0.08,
      messages: [
        '嗨！看到你这么努力，我想送你一根胡萝卜！🥕',
        '任何事情都是可能的！继续加油！',
        '你知道吗？我是从兔子洞来到这里的第一个兔子警官！',
        'Try Everything！不要放弃！',
        '我想请你尝尝我妈妈种的胡萝卜，超甜的！',
        '尼克说他在做一个"大生意"，你觉得会是什么？'
      ],
      rewards: { xp: 15, item: '🥕' },
      locations: ['all']
    },
    {
      id: 'nick_hustle',
      character: '尼克',
      icon: '🦊',
      color: '#E67E22',
      chance: 0.07,
      messages: [
        '嘿，甜心。想要学点"街头智慧"吗？',
        '这叫hustle，不是骗局...',
        '卖过2000根Pawpsicle，一天之内。这是个记录。',
        '朱迪？她就是个理想主义的兔子，不过...还挺可爱的。',
        '我有个生意想法，需要投资吗？开玩笑的。',
        '在这个城市，要么聪明，要么饿死。'
      ],
      rewards: { xp: 20, item: '🍦' },
      locations: ['all']
    },
    {
      id: 'flash_slow',
      character: '闪电',
      icon: '🐢',
      color: '#27AE60',
      chance: 0.05,
      messages: [
        '你........................好........................很........................高........................兴........................见........................到........................你',
        '今........................天........................天........................气........................真........................好',
        '我........................就........................这........................样........................慢........................慢........................地........................过........................日........................子',
        '你........................想........................要........................一........................个........................冰........................淇........................淋........................吗'
      ],
      rewards: { xp: 10, item: '🍦' },
      locations: ['all'],
      special: 'slow'
    },
    {
      id: 'chief_bogo',
      character: '博戈局长',
      icon: '🦁',
      color: '#2C3E50',
      chance: 0.04,
      messages: [
        '效率！我现在只想看到效率。',
        '48小时！我给你48小时完成这件事。',
        '不要让我失望。',
        '这就是新人？希望你能坚持下去。',
        'ZPD不需要平庸的警官。'
      ],
      rewards: { xp: 30, item: '🚔' },
      locations: ['all']
    },
    {
      id: 'gazelle_dance',
      character: '羚羊',
      icon: '🦌',
      color: '#FF9F43',
      chance: 0.06,
      messages: [
        'Try Everybody！🎵',
        '音乐让一切变得更美好！',
        '来和我一起跳舞吧！',
        '你的笑容真灿烂！',
        '每个人都有自己的节奏，找到你的吧！'
      ],
      rewards: { xp: 25, item: '🎵' },
      locations: ['all'],
      special: 'dance'
    },
    {
      id: 'finnick_anger',
      character: '芬尼克',
      icon: '🦊',
      color: '#C0392B',
      chance: 0.05,
      messages: [
        '你叫谁宝宝？！',
        '哼！别以为我个头小就好欺负！',
        '这是我的车！',
        '尼克那家伙...算了，不想说他。',
        '要我帮忙？得看我的心情。'
      ],
      rewards: { xp: 20, item: '🚗' },
      locations: ['all']
    },
    {
      id: 'bellwether_sheep',
      character: '贝尔沃瑟',
      icon: '🐑',
      color: '#95A5A6',
      chance: 0.04,
      messages: [
        '你好呀！我是副市长，有什么可以帮你的吗？😊',
        '小动物们要团结起来！',
        '狮子市长总是那么忙...',
        '我们要让每个小动物的声音都被听到！',
        '你愿意支持我们的倡议吗？'
      ],
      rewards: { xp: 15, item: '🐑' },
      locations: ['all']
    },
    {
      id: 'benjamin_excited',
      character: '本杰明',
      icon: '🦆',
      color: '#3498DB',
      chance: 0.08,
      messages: [
        '欢迎来到ZPD！ Gazelle的新歌你听了吗？！',
        '太激动了！你想要报案吗？还是要看她的演唱会？',
        '我超爱Gazelle！她的每首歌我都会！',
        '想要杯咖啡吗？我有最好的咖啡豆！',
        '前台工作虽然忙，但能见到Gazelle我就满足了！'
      ],
      rewards: { xp: 18, item: '☕' },
      locations: ['all']
    },
    {
      id: 'yax_nudist',
      character: '亚克斯',
      icon: '🦘',
      color: '#2ECC71',
      chance: 0.03,
      messages: [
        '自然就是最好的衣服。',
        '你问为什么我不穿衣服？衣服束缚灵魂。',
        'Inner peace, bro.',
        '想学冥想吗？我可以教你。',
        '来坐下来，感受自然的韵律。'
      ],
      rewards: { xp: 22, item: '🧘' },
      locations: ['all']
    },
    {
      id: 'mrbig_godfather',
      character: 'Mr. Big',
      icon: '🐀',
      color: '#34495E',
      chance: 0.02,
      messages: [
        '冰化他。开玩笑的，也许。',
        '你对我女儿有意见吗？',
        '在这座城市，尊重是最重要的。',
        '来块小蛋糕吗？我儿媳做的。',
        '做一个有原则的人，像我的女婿那样。'
      ],
      rewards: { xp: 50, item: '🍰' },
      locations: ['all'],
      special: 'dramatic'
    }
  ];

  // 彩蛋数据
  let eggData = JSON.parse(localStorage.getItem('zootopiaEggData')) || {
    encounters: {},
    totalEncounters: 0,
    lastEncounter: null,
    unlockedCharacters: []
  };

  // 保存数据
  function saveEggData() {
    localStorage.setItem('zootopiaEggData', JSON.stringify(eggData));
  }

  // 显示角色彩蛋
  function showCharacterEgg() {
    // 随机选择一个角色
    const roll = Math.random() * 100;
    let cumulative = 0;
    let selectedEgg = null;

    for (const egg of characterEggs) {
      cumulative += egg.chance * 100;
      if (roll <= cumulative) {
        selectedEgg = egg;
        break;
      }
    }

    // 如果没有选中，随机选一个
    if (!selectedEgg) {
      selectedEgg = characterEggs[Math.floor(Math.random() * characterEggs.length)];
    }

    // 随机消息
    const message = selectedEgg.messages[Math.floor(Math.random() * selectedEgg.messages.length)];

    // 创建彩蛋弹窗
    createEggNotification(selectedEgg, message);

    // 记录遭遇
    recordEncounter(selectedEgg);
  }

  // 创建彩蛋通知
  function createEggNotification(egg, message) {
    const notification = document.createElement('div');
    notification.className = 'character-egg-notification';
    notification.innerHTML = `
      <div class="egg-content">
        <div class="egg-close" onclick="this.closest('.character-egg-notification').remove()">×</div>
        <div class="egg-avatar" style="background: ${egg.color}">
          <span class="egg-icon">${egg.icon}</span>
        </div>
        <div class="egg-character">${egg.character}</div>
        <div class="egg-message">${message}</div>
        <div class="egg-reward">
          <span class="reward-icon">${egg.rewards.item}</span>
          <span class="reward-text">+${egg.rewards.xp} XP</span>
        </div>
        <button class="egg-continue-btn" onclick="this.closest('.character-egg-notification').remove()">
          继续浏览
        </button>
      </div>
    `;

    // 添加特殊效果
    if (egg.special === 'slow') {
      notification.style.animationDuration = '2s';
    } else if (egg.special === 'dance') {
      notification.classList.add('dance');
    } else if (egg.special === 'dramatic') {
      notification.classList.add('dramatic');
    }

    document.body.appendChild(notification);

    // 添加经验值
    if (window.zootopiaAddXP) {
      window.zootopiaAddXP(egg.rewards.xp, `遇见${egg.character}`);
    }

    // 自动移除
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
      }
    }, 8000);
  }

  // 记录遭遇
  function recordEncounter(egg) {
    if (!eggData.encounters[egg.id]) {
      eggData.encounters[egg.id] = {
        count: 0,
        firstEncounter: new Date().toISOString(),
        lastEncounter: null
      };
    }

    eggData.encounters[egg.id].count++;
    eggData.encounters[egg.id].lastEncounter = new Date().toISOString();
    eggData.totalEncounters++;
    eggData.lastEncounter = new Date().toISOString();

    // 解锁新角色
    if (!eggData.unlockedCharacters.includes(egg.character)) {
      eggData.unlockedCharacters.push(egg.character);
    }

    saveEggData();
  }

  // 创建彩蛋面板
  function createEggPanel() {
    const panel = document.createElement('div');
    panel.className = 'character-egg-panel';
    panel.innerHTML = `
      <button class="egg-toggle" title="角色彩蛋">
        <span class="toggle-icon">🥚</span>
        <span class="egg-badge" id="eggBadge">${eggData.unlockedCharacters.length}/${characterEggs.length}</span>
      </button>
      <div class="egg-content">
        <div class="egg-header">
          <div class="header-left">
            <span class="header-icon">🥚</span>
            <div class="header-text">
              <div class="header-title">角色彩蛋</div>
              <div class="header-subtitle">随机遇到动物城角色</div>
            </div>
          </div>
          <button class="egg-close">×</button>
        </div>

        <div class="egg-stats">
          <div class="stat-item">
            <span class="stat-icon">🎊</span>
            <div class="stat-info">
              <span class="stat-value">${eggData.totalEncounters}</span>
              <span class="stat-label">总遭遇</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🎭</span>
            <div class="stat-info">
              <span class="stat-value">${eggData.unlockedCharacters.length}</span>
              <span class="stat-label">已解锁</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🎯</span>
            <div class="stat-info">
              <span class="stat-value">${getRareEncounters()}</span>
              <span class="stat-label">稀有遭遇</span>
            </div>
          </div>
        </div>

        <div class="egg-characters">
          <div class="characters-title">角色图鉴</div>
          <div class="characters-grid" id="charactersGrid">
            ${renderCharactersGrid()}
          </div>
        </div>

        <div class="egg-settings">
          <div class="settings-title">⚙️ 设置</div>
          <div class="setting-row">
            <label class="setting-label">启用随机遭遇</label>
            <label class="setting-switch">
              <input type="checkbox" id="eggEnabled" checked>
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-row">
            <label class="setting-label">遭遇频率</label>
            <select class="setting-select" id="eggFrequency">
              <option value="low">低 (滚动20次)</option>
              <option value="medium" selected>中 (滚动10次)</option>
              <option value="high">高 (滚动5次)</option>
            </select>
          </div>
          <div class="setting-row">
            <button class="test-egg-btn" onclick="triggerRandomEgg()">
              <span class="btn-icon">🎲</span>
              <span class="btn-text">测试彩蛋</span>
            </button>
          </div>
        </div>

        <div class="egg-tips">
          <div class="tips-title">💡 提示</div>
          <div class="tips-text">
            浏览博客时，你有几率随机遇到动物城的角色！
            遇到的角色越多，解锁的图鉴就越多。
            稀有角色（如Mr. Big）出现概率较低。
          </div>
        </div>
      </div>
    `;

    return panel;
  }

  // 渲染角色网格
  function renderCharactersGrid() {
    return characterEggs.map(egg => {
      const encounter = eggData.encounters[egg.id];
      const isUnlocked = !!encounter;
      const encounterCount = encounter ? encounter.count : 0;

      return `
        <div class="character-card ${isUnlocked ? 'unlocked' : 'locked'}" style="--card-color: ${egg.color}">
          <div class="card-avatar" style="background: ${isUnlocked ? egg.color : '#BDC3C7'}">
            ${isUnlocked ? egg.icon : '❓'}
          </div>
          <div class="card-info">
            <div class="card-name">${isUnlocked ? egg.character : '???'}</div>
            <div class="card-count">${isUnlocked ? `已遇${encounterCount}次` : '未解锁'}</div>
          </div>
          ${isUnlocked ? `
            <div class="card-chance">
              <span class="chance-label">出现率</span>
              <span class="chance-value">${(egg.chance * 100).toFixed(1)}%</span>
            </div>
          ` : `
            <div class="card-locked">???</div>
          `}
        </div>
      `;
    }).join('');
  }

  // 获取稀有遭遇次数
  function getRareEncounters() {
    const rareEggs = characterEggs.filter(e => e.chance <= 0.05);
    let count = 0;

    rareEggs.forEach(egg => {
      if (eggData.encounters[egg.id]) {
        count += eggData.encounters[egg.id].count;
      }
    });

    return count;
  }

  // 更新彩蛋UI
  function updateEggUI() {
    document.getElementById('eggBadge').textContent = `${eggData.unlockedCharacters.length}/${characterEggs.length}`;
    document.getElementById('charactersGrid').innerHTML = renderCharactersGrid();

    // 更新统计
    const stats = document.querySelectorAll('.egg-stats .stat-value');
    stats[0].textContent = eggData.totalEncounters;
    stats[1].textContent = eggData.unlockedCharacters.length;
    stats[2].textContent = getRareEncounters();
  }

  // 滚动计数器
  let scrollCounter = 0;
  let scrollTarget = 10;
  let eggEnabled = true;

  // 监听滚动事件
  function setupScrollListener() {
    let lastScrollTop = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const scrollDelta = Math.abs(scrollTop - lastScrollTop);

      if (scrollDelta > 50) {
        scrollCounter++;

        if (eggEnabled && scrollCounter >= scrollTarget) {
          showCharacterEgg();
          scrollCounter = 0;
        }

        lastScrollTop = scrollTop;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        lastScrollTop = window.scrollY;
      }, 100);
    });
  }

  // 手动触发彩蛋（测试用）
  function triggerRandomEgg() {
    showCharacterEgg();
    updateEggUI();
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#character-egg-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'character-egg-styles';
    styles.textContent = `
      /* 彩蛋面板 */
      .character-egg-panel {
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 9997;
      }

      .egg-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        border: none;
        box-shadow: 0 5px 20px rgba(46, 204, 113, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .egg-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(46, 204, 113, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .egg-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #E74C3C;
        color: white;
        font-size: 11px;
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 10px;
        border: 2px solid white;
      }

      .egg-content {
        position: absolute;
        bottom: 80px;
        left: 0;
        width: 360px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: eggSlideUp 0.3s ease;
        overflow: hidden;
        overflow-y: auto;
      }

      .egg-content.show {
        display: block;
      }

      @keyframes eggSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 头部 */
      .egg-header {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
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

      .egg-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
      }

      .egg-close:hover {
        opacity: 1;
      }

      /* 统计 */
      .egg-stats {
        display: flex;
        justify-content: space-around;
        padding: 15px;
        background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1));
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .stat-icon {
        font-size: 20px;
      }

      .stat-info {
        display: flex;
        flex-direction: column;
      }

      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .stat-label {
        font-size: 11px;
        color: #636E72;
      }

      /* 角色网格 */
      .egg-characters {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .characters-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
      }

      .characters-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .character-card {
        background: white;
        border: 2px solid var(--card-color);
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .character-card.unlocked {
        background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1));
      }

      .character-card.locked {
        opacity: 0.6;
        filter: grayscale(0.5);
      }

      .card-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        margin: 0 auto 8px;
        color: white;
      }

      .card-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .card-count {
        font-size: 11px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .card-chance {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #95A5A6;
      }

      .card-locked {
        font-size: 10px;
        color: #95A5A6;
      }

      /* 设置 */
      .egg-settings {
        padding: 15px 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .settings-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
      }

      .setting-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .setting-label {
        font-size: 13px;
        color: #2D3436;
      }

      .setting-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 26px;
      }

      .setting-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #BDC3C7;
        transition: 0.4s;
        border-radius: 26px;
      }

      .slider:before {
        position: absolute;
        content: '';
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }

      .setting-switch input:checked + .slider {
        background-color: #2ECC71;
      }

      .setting-switch input:checked + .slider:before {
        transform: translateX(24px);
      }

      .setting-select {
        padding: 6px 10px;
        border: 2px solid rgba(46, 204, 113, 0.3);
        border-radius: 8px;
        font-size: 12px;
        outline: none;
      }

      .test-egg-btn {
        flex: 1;
        padding: 10px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .test-egg-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      }

      /* 提示 */
      .egg-tips {
        padding: 15px 20px;
        background: rgba(46, 204, 113, 0.05);
      }

      .tips-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 8px;
      }

      .tips-text {
        font-size: 12px;
        color: #636E72;
        line-height: 1.6;
      }

      /* 彩蛋通知 */
      .character-egg-notification {
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10010;
        animation: eggPop 0.5s ease;
      }

      @keyframes eggPop {
        0% {
          opacity: 0;
          transform: translateX(-50%) scale(0.5) translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateX(-50%) scale(1) translateY(0);
        }
      }

      .egg-content {
        background: white;
        border-radius: 20px;
        padding: 20px 30px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
        max-width: 90vw;
        position: relative;
      }

      .egg-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s ease;
      }

      .egg-close:hover {
        opacity: 1;
      }

      .egg-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        margin: 0 auto 15px;
        color: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      }

      .egg-character {
        font-size: 20px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .egg-message {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 15px;
        line-height: 1.5;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .egg-reward {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: linear-gradient(135deg, rgba(241, 196, 15, 0.2), rgba(243, 156, 18, 0.2));
        border-radius: 20px;
        color: #F39C12;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .reward-icon {
        font-size: 18px;
      }

      .egg-continue-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .egg-continue-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) scale(0.8);
        }
      }

      /* 特殊效果 */
      .character-egg-notification.dance .egg-content {
        animation: dance 1s ease infinite;
      }

      @keyframes dance {
        0%, 100% { transform: translateX(-50%) rotate(0deg); }
        25% { transform: translateX(-50%) rotate(-3deg); }
        75% { transform: translateX(-50%) rotate(3deg); }
      }

      .character-egg-notification.dramatic .egg-content {
        animation: dramatic 2s ease infinite;
      }

      @keyframes dramatic {
        0%, 100% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.05); }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .character-egg-panel {
          left: 15px;
        }

        .egg-content {
          width: calc(100vw - 60px);
          left: 0;
        }

        .characters-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化彩蛋系统
  function initEggSystem() {
    injectStyles();

    const panel = createEggPanel();
    document.body.appendChild(panel);

    const content = panel.querySelector('.egg-content');
    const toggle = panel.querySelector('.egg-toggle');
    const close = panel.querySelector('.egg-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      content.classList.toggle('show');
      if (content.classList.contains('show')) {
        updateEggUI();
      }
    };

    // 关闭按钮
    close.onclick = () => {
      content.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) {
        content.classList.remove('show');
      }
    });

    // 启用开关
    document.getElementById('eggEnabled').onchange = (e) => {
      eggEnabled = e.target.checked;
    };

    // 频率选择
    document.getElementById('eggFrequency').onchange = (e) => {
      const targets = {
        low: 20,
        medium: 10,
        high: 5
      };
      scrollTarget = targets[e.target.value] || 10;
    };

    // 设置滚动监听
    setupScrollListener();
  }

  // 导出全局函数
  window.triggerRandomEgg = triggerRandomEgg;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEggSystem);
  } else {
    initEggSystem();
  }
})();
