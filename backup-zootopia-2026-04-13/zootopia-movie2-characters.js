/**
 * 疯狂动物城主题 - Zootopia 2 新角色介绍
 * Zootopia Theme - Zootopia 2 New Characters
 * | 2025年续集新角色详解
 */

(function() {
  'use strict';

  // Zootopia 2 新角色数据
  const movie2Characters = {
    // 主要新角色
    main: [
      {
        id: 'gary',
        name: 'Gary De\'Snake',
        chineseName: '加里·德·斯内克',
        species: '响尾蛇 (Pit Viper)',
        emoji: '🐍',
        role: '第二男主角 / 主要角色',
        voiceActor: '关继伟 (Ke Huy Quan)',
        voiceActorNotable: '《瞬息全宇宙》奥斯卡男配角',
        personality: ['神秘', '智慧', '魅力十足', '有点危险'],
        abilities: ['潜行', '催眠', '敏捷', '毒液（非致命）'],
        description: '一只神秘的响尾蛇，成为朱迪和尼克的新伙伴。虽然外表危险，但实际上帮助主角团队破获新案件。',
        background: '来自动物城的爬行动物区，过去经历神秘。',
        relationships: [
          { character: '朱迪·霍普斯', relation: '合作伙伴', dynamic: '从怀疑到信任' },
          { character: '尼克·王尔德', relation: '亦敌亦友', dynamic: '互相试探' }
        ],
        funFacts: [
          '是迪士尼动画中少数的爬行动物主角之一',
          '设计灵感来自西部片的蛇类角色',
          '关继伟的配音给角色增添了独特魅力'
        ],
        images: {
          portrait: '🐍',
          fullBody: '🐍',
          action: '🐍'
        }
      },
      {
        id: 'agnes',
        name: 'Agnes De\'Snake',
        chineseName: '艾格尼丝·德·斯内克',
        species: '蛇 (Snake)',
        emoji: '🐍',
        role: '新角色',
        voiceActor: '待公布',
        personality: ['优雅', '神秘', '聪明'],
        description: '与Gary相关的蛇类角色，可能是家人或伙伴。',
        background: '详情待官方公布',
        relationships: [
          { character: 'Gary De\'Snake', relation: '??', dynamic: '??' }
        ],
        funFacts: [
          '可能是Gary的家人或搭档',
          '官方尚未公布详细信息'
        ]
      },
      {
        id: 'nibbles',
        name: 'Nibbles Maples',
        chineseName: '尼布尔斯·梅普尔斯',
        species: '待确定',
        emoji: '🐾',
        role: '新角色',
        voiceActor: 'Fortune Feimster',
        voiceActorNotable: '美国喜剧演员',
        personality: ['幽默', '友善'],
        description: '新加入的角色，为故事增添喜剧色彩。',
        background: '详情待官方公布',
        funFacts: [
          'Fortune Feimster以喜剧表演闻名'
        ]
      }
    ],

    // 反派角色
    villains: [
      {
        id: 'pawbert',
        name: 'Pawbert',
        chineseName: '帕伯特',
        species: '??',
        emoji: '🎭',
        role: '反转反派',
        type: '隐藏BOSS',
        description: '被称为"反转反派"(Twist Villain)，不是真正的幕后黑手，但给主角们带来重大挑战。',
        reveal: '在电影后半段揭露真实身份',
        motive: '??（待官方确认）',
        traits: ['狡猾', '迷人', '危险', '神秘'],
        comparison: '类似第一部的Bellwether，但更加复杂',
        funFacts: [
          '不是传统意义上的"邪恶"反派',
          '动机可能与动物城的社会问题相关',
          '设计上有意想不到的反转'
        ]
      },
      {
        id: 'lynx_family',
        name: '猞猁家族 (Lynx Family)',
        chineseName: '猞猁家族',
        species: '猞猁 (Lynx)',
        emoji: '🐱',
        role: '可能的反派组织',
        type: '??',
        description: '传言中可能是主要反派的猞猁家族组织。',
        status: '未经官方确认',
        members: [
          { name: '??', role: '??' }
        ],
        traits: ['狡猾', '团队作战', '神秘'],
        funFacts: [
          '来自粉丝推测，官方尚未确认',
          '可能是新的犯罪组织'
        ]
      }
    ],

    // 回归角色
    returning: [
      {
        id: 'judy',
        name: '朱迪·霍普斯',
        species: '兔子',
        emoji: '🐰',
        voiceActor: 'Ginnifer Goodwin',
        role: '主角',
        newInMovie2: [
          '已是经验丰富的警官',
          '领导新的精英小队',
          '面临更大的职业挑战',
          '与尼克的关系进一步发展'
        ]
      },
      {
        id: 'nick',
        name: '尼克·王尔德',
        species: '狐狸',
        emoji: '🦊',
        voiceActor: 'Jason Bateman',
        role: '主角',
        newInMovie2: [
          '正式成为警察警官',
          '与朱迪搭档解决新案件',
          '展现更多技能和智慧',
          '与Gary的互动很有趣'
        ]
      },
      {
        id: 'gazelle',
        name: 'Gazelle',
        species: '瞪羚',
        emoji: '🦌',
        voiceActor: 'Shakira',
        role: '特别出演',
        newInMovie2: [
          '演唱新歌"Zoo"',
          '参与重要场景',
          '继续作为动物城的文化象征'
        ]
      }
    ],

    // 配角团队
    team: [
      {
        id: 'boar_duo',
        name: '野猪二人组',
        species: '野猪',
        emoji: '🐗',
        role: '精英警察小队成员',
        description: '沿用第一部的框架设计，是新的警察小队成员。',
        personalities: ['勇敢', '忠诚']
      },
      {
        id: 'zebra_duo',
        name: '斑马二人组',
        species: '斑马',
        emoji: '🦓',
        role: '精英警察小队成员',
        description: '与野猪二人组类似的新警察小队成员。',
        personalities: ['有条理', '认真']
      }
    ]
  };

  // 创建角色介绍面板
  function createCharacterPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-movie2-characters';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="characters-toggle" id="charactersToggle">
        <span class="toggle-icon">🎭</span>
        <span class="toggle-text">Zootopia 2角色</span>
      </div>

      <!-- 主面板 -->
      <div class="characters-panel" id="charactersPanel" style="display: none;">
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🎬</span>
            <span class="title-text">Zootopia 2 新角色</span>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 分类标签 -->
        <div class="category-tabs">
          <button class="category-tab active" data-category="main">
            <span class="tab-emoji">⭐</span>
            <span class="tab-text">主要角色</span>
          </button>
          <button class="category-tab" data-category="villains">
            <span class="tab-emoji">🎭</span>
            <span class="tab-text">反派</span>
          </button>
          <button class="category-tab" data-category="returning">
            <span class="tab-emoji">🐰</span>
            <span class="tab-text">回归角色</span>
          </button>
          <button class="category-tab" data-category="team">
            <span class="tab-emoji">👥</span>
            <span class="tab-text">配角团队</span>
          </button>
        </div>

        <!-- 角色列表 -->
        <div class="characters-container" id="charactersContainer"></div>
      </div>

      <!-- 角色详情模态框 -->
      <div class="character-modal" id="characterModal" style="display: none;">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content" id="modalContent"></div>
      </div>
    `;

    return panel;
  }

  // 渲染角色列表
  function renderCharacters(category) {
    const container = document.getElementById('charactersContainer');
    if (!container) return;

    const characters = movie2Characters[category] || [];

    container.innerHTML = characters.map(char => {
      const categoryInfo = getCategoryInfo(char.id);
      return `
        <div class="character-card" data-character="${char.id}" data-category="${category}">
          <div class="card-header">
            <span class="char-emoji">${char.emoji}</span>
            <div class="char-basic-info">
              <h3 class="char-name">${char.name}</h3>
              ${char.chineseName ? `<p class="char-chinese-name">${char.chineseName}</p>` : ''}
              <span class="char-species">${char.species}</span>
            </div>
            ${categoryInfo ? `<span class="char-category-badge" style="background: ${categoryInfo.color}">${categoryInfo.label}</span>` : ''}
          </div>

          ${char.role ? `<p class="char-role">📌 ${char.role}</p>` : ''}

          ${char.voiceActor ? `
          <div class="voice-actor-info">
            <span class="voice-label">🎙️ 配音</span>
            <span class="voice-name">${char.voiceActor}</span>
            ${char.voiceActorNotable ? `<span class="voice-note">${char.voiceActorNotable}</span>` : ''}
          </div>
          ` : ''}

          ${char.description ? `<p class="char-description">${char.description}</p>` : ''}

          <button class="view-details-btn" data-character="${char.id}" data-category="${category}">
            查看详情 →
          </button>
        </div>
      `;
    }).join('');

    // 添加查看详情事件
    container.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', () => showCharacterDetails(btn.dataset.character, btn.dataset.category));
    });
  }

  // 获取分类信息
  function getCategoryInfo(charId) {
    const categoryMap = {
      'gary': { label: '主角', color: '#FF9F43' },
      'agnes': { label: '新角色', color: '#0ABDE3' },
      'nibbles': { label: '新角色', color: '#0ABDE3' },
      'pawbert': { label: '反派', color: '#FF6B6B' },
      'lynx_family': { label: '反派组织', color: '#C0392B' }
    };
    return categoryMap[charId] || null;
  }

  // 显示角色详情
  function showCharacterDetails(charId, category) {
    const characters = movie2Characters[category];
    const char = characters.find(c => c.id === charId);

    if (!char) return;

    const modal = document.getElementById('characterModal');
    const content = document.getElementById('modalContent');

    if (!modal || !content) return;

    content.innerHTML = `
      <div class="character-detail-header">
        <button class="close-modal" id="closeModalBtn">×</button>
        <div class="detail-hero">
          <span class="detail-emoji">${char.emoji}</span>
          <div class="detail-title">
            <h2 class="detail-name">${char.name}</h2>
            ${char.chineseName ? `<p class="detail-chinese-name">${char.chineseName}</p>` : ''}
            <p class="detail-species">${char.species}</p>
          </div>
        </div>
      </div>

      <div class="detail-body">
        ${char.role ? `
        <div class="detail-section">
          <h3 class="section-title">📌 角色定位</h3>
          <p class="section-content">${char.role}</p>
        </div>
        ` : ''}

        ${char.voiceActor ? `
        <div class="detail-section">
          <h3 class="section-title">🎙️ 配音演员</h3>
          <p class="section-content"><strong>${char.voiceActor}</strong></p>
          ${char.voiceActorNotable ? `<p class="section-note">${char.voiceActorNotable}</p>` : ''}
        </div>
        ` : ''}

        ${char.personality && char.personality.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">✨ 性格特点</h3>
          <div class="personality-tags">
            ${char.personality.map(p => `<span class="personality-tag">${p}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${char.abilities && char.abilities.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">💪 能力</h3>
          <div class="abilities-list">
            ${char.abilities.map(a => `<span class="ability-item">${a}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${char.description ? `
        <div class="detail-section">
          <h3 class="section-title">📖 角色描述</h3>
          <p class="section-content">${char.description}</p>
        </div>
        ` : ''}

        ${char.background ? `
        <div class="detail-section">
          <h3 class="section-title">🔮 背景</h3>
          <p class="section-content">${char.background}</p>
        </div>
        ` : ''}

        ${char.relationships && char.relationships.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">🤝 人物关系</h3>
          <div class="relationships-list">
            ${char.relationships.map(r => `
              <div class="relationship-item">
                <span class="relation-character">${r.character}</span>
                <span class="relation-type">${r.relation}</span>
                <span class="relation-dynamic">${r.dynamic}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${char.newInMovie2 && char.newInMovie2.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">🆕 第二部新动态</h3>
          <ul class="new-features-list">
            ${char.newInMovie2.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${char.funFacts && char.funFacts.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">💡 趣味事实</h3>
          <ul class="fun-facts-list">
            ${char.funFacts.map(f => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${char.type ? `
        <div class="detail-section">
          <h3 class="section-title">🎭 反派类型</h3>
          <p class="section-content">${char.type}</p>
        </div>
        ` : ''}

        ${char.motive ? `
        <div class="detail-section">
          <h3 class="section-title">🎯 动机</h3>
          <p class="section-content">${char.motive}</p>
        </div>
        ` : ''}

        ${char.reveal ? `
        <div class="detail-section spoiler-section">
          <h3 class="section-title">⚠️ 剧透警告</h3>
          <p class="section-content">${char.reveal}</p>
        </div>
        ` : ''}

        ${char.status ? `
        <div class="detail-section">
          <h3 class="section-title">📝 状态</h3>
          <p class="section-content">${char.status}</p>
        </div>
        ` : ''}

        ${char.members && char.members.length > 0 ? `
        <div class="detail-section">
          <h3 class="section-title">👥 成员</h3>
          <div class="members-list">
            ${char.members.map(m => `
              <div class="member-item">
                <span class="member-name">${m.name}</span>
                <span class="member-role">${m.role}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    `;

    modal.style.display = 'block';

    // 关闭按钮
    document.getElementById('closeModalBtn').onclick = closeModal;
    document.getElementById('modalOverlay').onclick = closeModal;
  }

  // 关闭模态框
  function closeModal() {
    const modal = document.getElementById('characterModal');
    if (modal) modal.style.display = 'none';
  }

  // 切换分类
  function switchCategory(category) {
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });

    renderCharacters(category);
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('charactersPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#movie2-characters-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'movie2-characters-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-movie2-characters {
        position: fixed;
        bottom: 120px;
        right: 20px;
        z-index: 9994;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .characters-toggle {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .characters-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: dramaBounce 2s ease infinite;
      }

      @keyframes dramaBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .characters-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: bold;
      }

      .close-panel {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      /* 分类标签 */
      .category-tabs {
        display: flex;
        padding: 10px;
        gap: 5px;
        border-bottom: 1px solid #ECF0F1;
      }

      .category-tab {
        flex: 1;
        padding: 10px 8px;
        border: none;
        background: #F8F9FA;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
      }

      .category-tab:hover {
        background: #ECF0F1;
      }

      .category-tab.active {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
      }

      .tab-emoji {
        font-size: 18px;
      }

      .tab-text {
        font-size: 10px;
        font-weight: bold;
      }

      /* 角色容器 */
      .characters-container {
        padding: 15px;
        overflow-y: auto;
        max-height: 500px;
      }

      /* 角色卡片 */
      .character-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 12px;
        transition: all 0.3s ease;
      }

      .character-card:hover {
        border-color: #667eea;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
        transform: translateY(-2px);
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
      }

      .char-emoji {
        font-size: 36px;
      }

      .char-basic-info {
        flex: 1;
      }

      .char-name {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 3px 0;
      }

      .char-chinese-name {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 3px 0;
      }

      .char-species {
        font-size: 11px;
        color: #636E72;
      }

      .char-category-badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 10px;
        color: white;
        font-weight: bold;
      }

      .char-role,
      .char-description {
        font-size: 12px;
        color: #636E72;
        margin: 8px 0;
      }

      .voice-actor-info {
        background: #F8F9FA;
        padding: 8px 10px;
        border-radius: 8px;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .voice-label {
        font-size: 11px;
        color: #636E72;
      }

      .voice-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .voice-note {
        font-size: 10px;
        color: #636E72;
        font-style: italic;
      }

      .view-details-btn {
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .view-details-btn:hover {
        transform: scale(1.02);
      }

      /* 模态框 */
      .character-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }

      .modal-content {
        position: relative;
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .character-detail-header {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 20px;
        position: relative;
      }

      .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1;
      }

      .detail-hero {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .detail-emoji {
        font-size: 48px;
      }

      .detail-name {
        font-size: 20px;
        font-weight: bold;
        margin: 0 0 5px 0;
      }

      .detail-chinese-name {
        font-size: 14px;
        margin: 0 0 3px 0;
        opacity: 0.9;
      }

      .detail-species {
        font-size: 12px;
        margin: 0;
        opacity: 0.8;
      }

      .detail-body {
        padding: 20px;
        overflow-y: auto;
        max-height: 60vh;
      }

      .detail-section {
        margin-bottom: 20px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .section-content {
        font-size: 13px;
        color: #636E72;
        line-height: 1.6;
        margin: 0;
      }

      .section-note {
        font-size: 11px;
        color: #95A5A6;
        margin: 5px 0 0 0;
        font-style: italic;
      }

      .personality-tags,
      .abilities-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .personality-tag,
      .ability-item {
        padding: 5px 12px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border-radius: 15px;
        font-size: 11px;
        color: #667eea;
      }

      .relationships-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .relationship-item {
        background: #F8F9FA;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .relation-character {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
      }

      .relation-type {
        font-size: 11px;
        color: #667eea;
      }

      .relation-dynamic {
        font-size: 10px;
        color: #636E72;
        font-style: italic;
      }

      .new-features-list,
      .fun-facts-list {
        padding-left: 20px;
        margin: 0;
      }

      .new-features-list li,
      .fun-facts-list li {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 6px;
      }

      .spoiler-section {
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid #FF6B6B;
        border-radius: 10px;
        padding: 12px;
      }

      .spoiler-section .section-title {
        color: #C0392B;
      }

      .members-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .member-item {
        background: #F8F9FA;
        padding: 8px 12px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .member-name {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
      }

      .member-role {
        font-size: 10px;
        color: #636E72;
      }

      /* 滚动条 */
      .characters-container::-webkit-scrollbar,
      .detail-body::-webkit-scrollbar {
        width: 4px;
      }

      .characters-container::-webkit-scrollbar-track,
      .detail-body::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .characters-container::-webkit-scrollbar-thumb,
      .detail-body::-webkit-scrollbar-thumb {
        background: #667eea;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-movie2-characters {
          right: 10px;
          bottom: 100px;
        }

        .characters-panel {
          width: calc(100vw - 20px);
        }

        .modal-content {
          width: 95%;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initCharacters() {
    injectStyles();

    const characters = createCharacterPanel();
    document.body.appendChild(characters);

    // 切换按钮
    document.getElementById('charactersToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('charactersPanel').style.display = 'none';
    };

    // 分类标签
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => switchCategory(tab.dataset.category));
    });

    // 初始渲染
    renderCharacters('main');

    // 导出全局函数
    window.zootopiaMovie2Characters = {
      open: () => {
        document.getElementById('charactersPanel').style.display = 'block';
      },
      showCharacter: (charId, category) => showCharacterDetails(charId, category),
      showCategory: (category) => switchCategory(category)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacters);
  } else {
    initCharacters();
  }
})();
