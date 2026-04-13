/**
 * 疯狂动物城主题 - 角色展示系统
 * Zootopia Theme - Character Showcase System
 * | 3D旋转角色卡片展示
 */

(function() {
  'use strict';

  // 角色数据
  const characters = {
    judy: {
      name: '朱迪·霍普斯',
      nameEn: 'Judy Hopps',
      emoji: '🐰',
      role: 'ZPD警官',
      district: '兔子洞',
      color: '#FF9F43',
      bgColor: 'linear-gradient(135deg, #FFF5E6, #FFE5CC)',
      quotes: [
        'Try Everything! 试试一切！',
        '改变从自己开始！',
        '我要让世界变得更美好！'
      ],
      traits: ['勇敢', '乐观', '坚持不懈', '正义感'],
      stats: { speed: 85, intelligence: 78, charm: 90, determination: 95 },
      badges: ['👮 警官', '🥕 胡萝卜爱好者', '🏆 年度最佳警官']
    },
    nick: {
      name: '尼克·王尔德',
      nameEn: 'Nick Wilde',
      emoji: '🦊',
      role: 'ZPD顾问',
      district: '市中心',
      color: '#E67E22',
      bgColor: 'linear-gradient(135deg, #FFE5CC, #FFD5B3)',
      quotes: [
        '你知道你爱我的聪明。',
        '这可是个聪明的计划...',
        '生活就是要懂得享受。'
      ],
      traits: ['聪明', '狡猾', '善良', '忠诚'],
      stats: { speed: 70, intelligence: 92, charm: 88, determination: 75 },
      badges: ['🕶️ 墨镜专家', '🍦 Pawpsicle大王', '🦊 最佳搭档']
    },
    flash: {
      name: '闪电',
      nameEn: 'Flash',
      emoji: '🐢',
      role: 'ZPD职员',
      district: '冰川镇',
      color: '#2ECC71',
      bgColor: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
      quotes: [
        '你...好...',
        '我...很...快...的...',
        '请...稍...等...'
      ],
      traits: ['可靠', '认真', '缓慢', '友好'],
      stats: { speed: 5, intelligence: 75, charm: 85, determination: 80 },
      badges: ['🐢 最快树懒', '⌨️ 打字冠军', '🏢 最佳员工']
    },
    bogo: {
      name: '博戈局长',
      nameEn: 'Chief Bogo',
      emoji: '🦁',
      role: 'ZPD局长',
      district: '市中心',
      color: '#F39C12',
      bgColor: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
      quotes: [
        '效率！我要求效率！',
        '这是你的任务。',
        '做得不错，警官。'
      ],
      traits: ['威严', '严肃', '公正', '领导力'],
      stats: { speed: 60, intelligence: 85, charm: 70, determination: 90 },
      badges: ['👮 局长', '🦁 百兽之王', '⭐ 效率专家']
    },
    bellwether: {
      name: '绵羊副市长',
      nameEn: 'Dawn Bellwether',
      emoji: '🐑',
      role: '副市长',
      district: '市中心',
      color: '#ECF0F1',
      bgColor: 'linear-gradient(135deg, #F8F9FA, #E9ECEF)',
      quotes: [
        '我们都是朋友！',
        '让我来帮你！',
        '这对大家都有利...'
      ],
      traits: ['表面友善', '心机', '聪明', '野心'],
      stats: { speed: 50, intelligence: 88, charm: 82, determination: 85 },
      badges: ['🐑 副市长', '🏛️ 政治家', '📊 管理者']
    },
    Clawhauser: {
      name: '本杰明',
      nameEn: 'Benjamin Clawhauser',
      emoji: '🐆',
      role: 'ZPD前台',
      district: '市中心',
      color: '#3498DB',
      bgColor: 'linear-gradient(135deg, #EBF5FB, #D6EAF8)',
      quotes: [
        '哦我的天！是Gazelle！',
        '欢迎来到ZPD！',
        '我超爱Gazelle的新歌！'
      ],
      traits: ['热情', '友好', '粉丝', '乐于助人'],
      stats: { speed: 65, intelligence: 70, charm: 95, determination: 60 },
      badges: ['🎵 Gazelle粉丝', '☕ 咖啡爱好者', '💁 前台专家']
    },
    mrBig: {
      name: 'Mr. Big',
      nameEn: 'Mr. Big',
      emoji: '🐀',
      role: '黑帮老大',
      district: '啮齿小镇',
      color: '#9B59B6',
      bgColor: 'linear-gradient(135deg, #F5EEF8, #EBDEF0)',
      quotes: [
        '冰封他！',
        '你让我想起了年轻时的自己。',
        ' FAMILY就是一切。'
      ],
      traits: ['威严', '家族观念', '讲义气', '谨慎'],
      stats: { speed: 40, intelligence: 90, charm: 75, determination: 95 },
      badges: ['🐀 啮齿动物教父', '❄️ 冰冻专家', '👔 家族领袖']
    },
    finnick: {
      name: '芬尼克',
      nameEn: 'Finnick',
      emoji: '🦊',
      role: '合作伙伴',
      district: '市中心',
      color: '#D35400',
      bgColor: 'linear-gradient(135deg, #FEE5D3, #FECBA8)',
      quotes: [
        '别烦我！',
        '我在工作！',
        '这可是我的绝活！'
      ],
      traits: ['暴躁', '忠诚', '技术专家', '直率'],
      stats: { speed: 75, intelligence: 70, charm: 60, determination: 80 },
      badges: ['👶 大师', '🚐 驾驶高手', '🤝 合作伙伴']
    },
    gazelle: {
      name: '夏奇羊',
      nameEn: 'Gazelle',
      emoji: '🦌',
      role: '流行歌手',
      district: '全市',
      color: '#E74C3C',
      bgColor: 'linear-gradient(135deg, #FEE2E2, #FECACA)',
      quotes: [
        'Try Everything!',
        '音乐是连接所有人的桥梁！',
        '让我们一起改变世界！'
      ],
      traits: ['才华横溢', '善良', '影响力', '魅力'],
      stats: { speed: 80, intelligence: 75, charm: 98, determination: 85 },
      badges: ['🎵 超级明星', '💫 偶像', '🌟 榜样']
    },
    lionheart: {
      name: '狮子市长',
      nameEn: 'Mayor Lionheart',
      emoji: '🦁',
      role: '市长',
      district: '市中心',
      color: '#F1C40F',
      bgColor: 'linear-gradient(135deg, #FFF9E6, '],
      quotes: [
        '为了动物城的未来！',
        '这是必要的措施。',
        '我会保护所有市民。'
      ],
      traits: ['领导力', '责任感', '政治家', '果断'],
      stats: { speed: 55, intelligence: 82, charm: 78, determination: 88 },
      badges: ['🏛️ 市长', '🦁 领导者', '📜 决策者']
    }
  };

  // 当前展示的角色
  let currentCharacter = 'judy';
  let isRotating = false;

  // 创建角色展示卡片
  function createCharacterShowcase() {
    const showcase = document.createElement('div');
    showcase.className = 'character-showcase';
    showcase.innerHTML = `
      <div class="showcase-backdrop"></div>
      <div class="showcase-container">
        <div class="showcase-header">
          <div class="showcase-title">🎭 动物城角色展示</div>
          <button class="showcase-close">×</button>
        </div>

        <div class="showcase-content">
          <div class="character-selector" id="characterSelector">
            ${Object.entries(characters).map(([id, char]) => `
              <button class="char-selector-btn ${id === currentCharacter ? 'active' : ''}" data-character="${id}">
                <span class="btn-emoji">${char.emoji}</span>
                <span class="btn-name">${char.name}</span>
              </button>
            `).join('')}
          </div>

          <div class="character-display" id="characterDisplay">
            <div class="character-card-3d" id="characterCard">
              <div class="card-inner">
                <div class="card-front">
                  <div class="char-emoji-large">${characters[currentCharacter].emoji}</div>
                  <div class="char-name">${characters[currentCharacter].name}</div>
                  <div class="char-name-en">${characters[currentCharacter].nameEn}</div>
                </div>
                <div class="card-back">
                  <div class="back-content">
                    <div class="back-quote">"${characters[currentCharacter].quotes[0]}"</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="character-info" id="characterInfo">
              ${createCharacterInfo(currentCharacter)}
            </div>
          </div>

          <div class="character-actions">
            <button class="action-btn rotate-btn" id="rotateBtn">🔄 翻转卡片</button>
            <button class="action-btn voice-btn" id="voiceBtn">🔊 播放语音</button>
            <button class="action-btn favorite-btn" id="favoriteBtn">⭐ 收藏角色</button>
          </div>
        </div>
      </div>

      <button class="showcase-toggle" id="showcaseToggle">
        <span class="toggle-icon">🎭</span>
      </button>
    `;

    return showcase;
  }

  // 创建角色信息
  function createCharacterInfo(characterId) {
    const char = characters[characterId];

    return `
      <div class="info-section">
        <div class="info-label">基本信息</div>
        <div class="info-item">
          <span class="item-label">职位:</span>
          <span class="item-value">${char.role}</span>
        </div>
        <div class="info-item">
          <span class="item-label">地区:</span>
          <span class="item-value">${char.district}</span>
        </div>
      </div>

      <div class="info-section">
        <div class="info-label">性格特点</div>
        <div class="traits-container">
          ${char.traits.map(trait => `
            <span class="trait-tag">${trait}</span>
          `).join('')}
        </div>
      </div>

      <div class="info-section">
        <div class="info-label">能力值</div>
        <div class="stats-container">
          ${Object.entries(char.stats).map(([stat, value]) => `
            <div class="stat-item">
              <span class="stat-label">${getStatLabel(stat)}</span>
              <div class="stat-bar">
                <div class="stat-fill" style="width: ${value}%; background: ${char.color}"></div>
              </div>
              <span class="stat-value">${value}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="info-section">
        <div class="info-label">成就徽章</div>
        <div class="badges-container">
          ${char.badges.map(badge => `
            <span class="badge-item">${badge}</span>
          `).join('')}
        </div>
      </div>

      <div class="info-section">
        <div class="info-label">经典台词</div>
        <div class="quotes-container">
          ${char.quotes.map((quote, index) => `
            <div class="quote-item" data-quote="${index}">
              "${quote}"
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 获取能力值标签
  function getStatLabel(stat) {
    const labels = {
      speed: '速度',
      intelligence: '智慧',
      charm: '魅力',
      determination: '决心'
    };
    return labels[stat] || stat;
  }

  // 更新角色展示
  function updateCharacterDisplay(characterId) {
    const char = characters[characterId];
    if (!char) return;

    currentCharacter = characterId;

    // 更新3D卡片
    const card = document.getElementById('characterCard');
    if (card) {
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <div class="char-emoji-large">${char.emoji}</div>
            <div class="char-name">${char.name}</div>
            <div class="char-name-en">${char.nameEn}</div>
          </div>
          <div class="card-back">
            <div class="back-content">
              <div class="back-quote">"${char.quotes[0]}"</div>
            </div>
          </div>
        </div>
      `;
    }

    // 更新角色信息
    const info = document.getElementById('characterInfo');
    if (info) {
      info.innerHTML = createCharacterInfo(characterId);
    }

    // 更新卡片背景色
    card.style.background = char.bgColor;

    // 重置翻转状态
    isRotating = false;
    card.classList.remove('rotated');
  }

  // 翻转卡片
  function rotateCard() {
    const card = document.getElementById('characterCard');
    if (card) {
      isRotating = !isRotating;
      card.classList.toggle('rotated', isRotating);
    }
  }

  // 播放角色语音
  function playCharacterVoice() {
    const char = characters[currentCharacter];
    const quote = char.quotes[Math.floor(Math.random() * char.quotes.length)];

    // 使用语音合成
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(quote);
      utterance.lang = 'zh-CN';
      utterance.rate = 1;
      utterance.pitch = 1;

      // 尝试找到中文语音
      const voices = speechSynthesis.getVoices();
      const chineseVoice = voices.find(voice => voice.lang.startsWith('zh'));
      if (chineseVoice) {
        utterance.voice = chineseVoice;
      }

      speechSynthesis.speak(utterance);
    }
  }

  // 收藏角色
  function favoriteCharacter() {
    const char = characters[currentCharacter];
    let favorites = JSON.parse(localStorage.getItem('zootopiaFavoriteChars') || '[]');

    if (favorites.includes(currentCharacter)) {
      favorites = favorites.filter(f => f !== currentCharacter);
      alert(`已取消收藏 ${char.name}`);
    } else {
      favorites.push(currentCharacter);
      alert(`已收藏 ${char.name}！`);

      // 触发成就事件
      window.dispatchEvent(new CustomEvent('zootopiaCollection', {
        detail: { message: `收藏角色: ${char.name}`, item: char.emoji }
      }));
    }

    localStorage.setItem('zootopiaFavoriteChars', JSON.stringify(favorites));
    updateFavoriteButton();
  }

  // 更新收藏按钮状态
  function updateFavoriteButton() {
    const btn = document.getElementById('favoriteBtn');
    const favorites = JSON.parse(localStorage.getItem('zootopiaFavoriteChars') || '[]');

    if (favorites.includes(currentCharacter)) {
      btn.innerHTML = '⭐ 已收藏';
      btn.classList.add('favorited');
    } else {
      btn.innerHTML = '⭐ 收藏角色';
      btn.classList.remove('favorited');
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#character-showcase-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'character-showcase-styles';
    styles.textContent = `
      /* 角色展示容器 */
      .character-showcase {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10004;
        display: none;
      }

      .character-showcase.active {
        display: block;
      }

      .showcase-backdrop {
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

      .showcase-container {
        position: relative;
        width: 90vw;
        max-width: 900px;
        height: 90vh;
        margin: 5vh auto;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
      }

      /* 展示头部 */
      .showcase-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .showcase-title {
        font-size: 24px;
        font-weight: bold;
      }

      .showcase-close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      /* 展示内容 */
      .showcase-content {
        flex: 1;
        display: flex;
        overflow: hidden;
      }

      /* 角色选择器 */
      .character-selector {
        width: 200px;
        background: #F8F9FA;
        padding: 15px;
        overflow-y: auto;
        border-right: 1px solid #ECF0F1;
      }

      .char-selector-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 12px;
        margin-bottom: 8px;
        background: white;
        border: 2px solid transparent;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .char-selector-btn:hover {
        border-color: #9B59B6;
        background: rgba(155, 89, 182, 0.1);
      }

      .char-selector-btn.active {
        border-color: #9B59B6;
        background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1));
      }

      .btn-emoji {
        font-size: 24px;
      }

      .btn-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      /* 角色展示区 */
      .character-display {
        flex: 1;
        padding: 30px;
        overflow-y: auto;
      }

      /* 3D卡片 */
      .character-card-3d {
        width: 300px;
        height: 400px;
        margin: 0 auto 30px;
        perspective: 1000px;
      }

      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      .character-card-3d.rotated .card-inner {
        transform: rotateY(180deg);
      }

      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .card-front {
        background: linear-gradient(135deg, #FFF5E6, #FFE5CC);
      }

      .card-back {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        transform: rotateY(180deg);
      }

      .char-emoji-large {
        font-size: 120px;
        margin-bottom: 20px;
        filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.2));
      }

      .char-name {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .char-name-en {
        font-size: 14px;
        color: #636E72;
      }

      .back-content {
        padding: 30px;
      }

      .back-quote {
        font-size: 18px;
        font-style: italic;
        line-height: 1.6;
      }

      /* 角色信息 */
      .info-section {
        margin-bottom: 25px;
      }

      .info-label {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 2px solid #ECF0F1;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 14px;
      }

      .item-label {
        color: #636E72;
        font-weight: 500;
      }

      .item-value {
        color: #2D3436;
        font-weight: bold;
      }

      /* 特点标签 */
      .traits-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .trait-tag {
        padding: 6px 12px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
      }

      /* 能力值 */
      .stats-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .stat-label {
        width: 50px;
        font-size: 12px;
        color: #636E72;
      }

      .stat-bar {
        flex: 1;
        height: 8px;
        background: #ECF0F1;
        border-radius: 4px;
        overflow: hidden;
      }

      .stat-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
      }

      .stat-value {
        width: 30px;
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        text-align: right;
      }

      /* 徽章 */
      .badges-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .badge-item {
        padding: 8px 12px;
        background: #F8F9FA;
        border: 1px solid #DEE2E6;
        border-radius: 10px;
        font-size: 13px;
        color: #495057;
      }

      /* 台词 */
      .quotes-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .quote-item {
        padding: 12px;
        background: #F8F9FA;
        border-left: 4px solid #9B59B6;
        border-radius: 8px;
        font-style: italic;
        font-size: 14px;
        color: #495057;
      }

      /* 操作按钮 */
      .character-actions {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: #F8F9FA;
        border-top: 1px solid #ECF0F1;
      }

      .action-btn {
        flex: 1;
        padding: 15px;
        border: none;
        border-radius: 12px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .rotate-btn {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
      }

      .voice-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .favorite-btn {
        background: linear-gradient(135deg, #F39C12, #E67E22);
        color: white;
      }

      .favorite-btn.favorited {
        background: linear-gradient(135deg, #E74C3C, #C0392B);
      }

      .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      /* 切换按钮 */
      .showcase-toggle {
        position: fixed;
        top: 210px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .showcase-toggle:hover {
        transform: scale(1.1);
      }

      .toggle-icon {
        font-size: 28px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .showcase-container {
          width: 95vw;
          height: 95vh;
        }

        .showcase-content {
          flex-direction: column;
        }

        .character-selector {
          width: 100%;
          height: 120px;
          border-right: none;
          border-bottom: 1px solid #ECF0F1;
        }

        .character-display {
          padding: 15px;
        }

        .character-card-3d {
          width: 250px;
          height: 350px;
        }

        .char-emoji-large {
          font-size: 100px;
        }

        .showcase-toggle {
          top: auto;
          bottom: 350px;
          right: 15px;
          width: 50px;
          height: 50px;
        }

        .toggle-icon {
          font-size: 24px;
        }

        .character-actions {
          flex-wrap: wrap;
        }

        .action-btn {
          min-width: calc(50% - 8px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化角色展示
  function initCharacterShowcase() {
    injectStyles();

    const showcase = createCharacterShowcase();
    document.body.appendChild(showcase);

    // 切换按钮
    document.getElementById('showcaseToggle').onclick = () => {
      showcase.classList.add('active');
      updateFavoriteButton();
    };

    // 关闭按钮
    document.querySelector('.showcase-close').onclick = () => {
      showcase.classList.remove('active');
    };

    // 角色选择按钮
    document.querySelectorAll('.char-selector-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.char-selector-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCharacterDisplay(btn.dataset.character);
        updateFavoriteButton();
      };
    });

    // 操作按钮
    document.getElementById('rotateBtn').onclick = rotateCard;
    document.getElementById('voiceBtn').onclick = playCharacterVoice;
    document.getElementById('favoriteBtn').onclick = favoriteCharacter;
  }

  // 导出全局函数
  window.zootopiaCharacters = {
    show: (characterId) => {
      document.querySelector('.character-showcase').classList.add('active');
      if (characterId && characters[characterId]) {
        updateCharacterDisplay(characterId);
      }
    },
    getCharacter: (id) => characters[id],
    getAllCharacters: () => characters
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacterShowcase);
  } else {
    initCharacterShowcase();
  }
})();
