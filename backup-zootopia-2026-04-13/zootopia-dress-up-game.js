/**
 * 疯狂动物城主题 - 角色换装游戏
 * Zootopia Theme - Character Dress Up Game
 * | 为动物城角色搭配服装和道具
 */

(function() {
  'use strict';

  // 服装数据库
  const wardrobeDatabase = {
    // 朱迪的服装
    judy: {
      name: '朱迪·霍普斯',
      emoji: '🐰',
      baseColor: '#FF9F43',
      categories: {
        uniforms: [
          {
            id: 'j_uniform_police',
            name: 'ZPD警察制服',
            icon: '👮',
            preview: 'police',
            description: '标准警官制服，展现专业果敢',
            rarity: 'common',
            stats: { authority: 8, cute: 5, professional: 9 }
          },
          {
            id: 'j_uniform_trainee',
            name: '警校训练服',
            icon: '🎽',
            preview: 'trainee',
            description: '警校学员训练服装',
            rarity: 'common',
            stats: { authority: 3, cute: 6, professional: 5 }
          },
          {
            id: 'j_uniform_casual',
            name: '便装',
            icon: '👕',
            preview: 'casual',
            description: '轻松舒适的日常穿搭',
            rarity: 'common',
            stats: { authority: 2, cute: 8, professional: 3 }
          }
        ],
        accessories: [
          {
            id: 'j_badge_regular',
            name: '标准警官徽章',
            icon: '🎖️',
            type: 'badge',
            position: 'chest',
            description: 'ZPD标准警官徽章',
            rarity: 'common'
          },
          {
            id: 'j_badge_gold',
            name: '金质徽章',
            icon: '🏅',
            type: 'badge',
            position: 'chest',
            description: '杰出表现金质徽章',
            rarity: 'rare'
          },
          {
            id: 'j_hat_police',
            name: '警帽',
            icon: '👒',
            type: 'hat',
            position: 'head',
            description: '标准警用帽子',
            rarity: 'common'
          },
          {
            id: 'j_ears_bow',
            name: '耳朵蝴蝶结',
            icon: '🎀',
            type: 'head',
            position: 'ears',
            description: '可爱的粉色蝴蝶结',
            rarity: 'common'
          },
          {
            id: 'j_carrot_pen',
            name: '胡萝卜录音笔',
            icon: '🥕',
            type: 'tool',
            position: 'hand',
            description: '特制录音笔，外观像胡萝卜',
            rarity: 'rare'
          },
          {
            id: 'j_sunglasses',
            name: '太阳镜',
            icon: '🕶️',
            type: 'face',
            position: 'face',
            description: '酷酷的太阳镜',
            rarity: 'uncommon'
          },
          {
            id: 'j_tiger_stuffed',
            name: '老虎玩偶',
            icon: '🧸',
            type: 'hold',
            position: 'hand',
            description: '小时候最爱的玩具',
            rarity: 'rare'
          }
        ],
        items: [
          {
            id: 'j_belt_utility',
            name: '多功能腰带',
            icon: '🔧',
            type: 'belt',
            position: 'waist',
            description: '装有各种警用装备',
            rarity: 'common'
          },
          {
            id: 'j_cuffs',
            name: '手铐',
            icon: '⛓️',
            type: 'tool',
            position: 'belt',
            description: '标准警用手铐',
            rarity: 'common'
          },
          {
            id: 'j_ticket_book',
            name: '罚单本',
            icon: '📝',
            type: 'tool',
            position: 'hand',
            description: 'ZPD标准罚单本',
            rarity: 'common'
          }
        ]
      }
    },

    // 尼克的服装
    nick: {
      name: '尼克·王尔德',
      emoji: '🦊',
      baseColor: '#E67E22',
      categories: {
        uniforms: [
          {
            id: 'n_uniform_police',
            name: 'ZPD警察制服',
            icon: '👮',
            preview: 'police',
            description: '警官尼克，帅气逼人',
            rarity: 'rare',
            stats: { authority: 8, charm: 9, cool: 10 }
          },
          {
            id: 'n_outfit_hawaiian',
            name: '夏威夷衫',
            icon: '🌺',
            preview: 'hawaiian',
            description: '经典的夏威夷衬衫造型',
            rarity: 'common',
            stats: { authority: 2, charm: 7, cool: 8 }
          },
          {
            id: 'n_outfit_conman',
            name: '骗子装束',
            icon: '🎩',
            preview: 'conman',
            description: '经典的街头行骗装扮',
            rarity: 'uncommon',
            stats: { authority: 1, charm: 10, cool: 7 }
          },
          {
            id: 'n_outfit_pawpsicle',
            name: 'Pawpsicle销售服',
            icon: '🍦',
            preview: 'sales',
            description: '卖冰棍时的便装',
            rarity: 'common',
            stats: { authority: 1, charm: 6, cool: 5 }
          }
        ],
        accessories: [
          {
            id: 'n_badge_police',
            name: '警官徽章',
            icon: '🎖️',
            type: 'badge',
            position: 'chest',
            description: '尼克终于也有警官徽章了',
            rarity: 'rare'
          },
          {
            id: 'n_sunglasses_cool',
            name: '飞行员墨镜',
            icon: '🕶️',
            type: 'face',
            position: 'face',
            description: '超酷的飞行员墨镜',
            rarity: 'uncommon'
          },
          {
            id: 'n_tie_pawpsicle',
            name: 'Pawpsicle领带',
            icon: '👔',
            type: 'neck',
            position: 'neck',
            description: '冰棍棍做的领带',
            rarity: 'rare'
          }
        ],
        items: [
          {
            id: 'n_pawpsicle',
            name: 'Pawpsicle冰棍',
            icon: '🍦',
            type: 'hold',
            position: 'hand',
            description: '尼克的招牌冰棍',
            rarity: 'common'
          },
          {
            id: 'n_wallet',
            name: '钱包',
            icon: '👛',
            type: 'hold',
            position: 'hand',
            description: '装满胡萝卜币的钱包',
            rarity: 'common'
          }
        ]
      }
    },

    // Gazelle的服装
    gazelle: {
      name: 'Gazelle',
      emoji: '🦌',
      baseColor: '#E91E63',
      categories: {
        costumes: [
          {
            id: 'g_costume_stage',
            name: '舞台演出服',
            icon: '👗',
            preview: 'stage',
            description: '演唱会专用亮片服装',
            rarity: 'rare',
            stats: { beauty: 10, performance: 10, star: 10 }
          },
          {
            id: 'g_costume_casual',
            name: '休闲装',
            icon: '👚',
            preview: 'casual',
            description: '私服休闲穿搭',
            rarity: 'common',
            stats: { beauty: 7, performance: 3, star: 6 }
          },
          {
            id: 'g_costume_elegant',
            name: '优雅礼服',
            icon: '👘',
            preview: 'elegant',
            description: '红毯正式礼服',
            rarity: 'rare',
            stats: { beauty: 10, performance: 5, star: 9 }
          }
        ],
        accessories: [
          {
            id: 'g_microphone',
            name: '专业麦克风',
            icon: '🎤',
            type: 'hold',
            position: 'hand',
            description: '演唱会专用麦克风',
            rarity: 'rare'
          },
          {
            id: 'g_tiger_dancers',
            name: '老虎伴舞团',
            icon: '🐯',
            type: 'companion',
            position: 'side',
            description: '6只老虎伴舞',
            rarity: 'legendary'
          },
          {
            id: 'g_headphones',
            name: '专业监听耳机',
            icon: '🎧',
            type: 'head',
            position: 'head',
            description: '舞台监听耳机',
            rarity: 'common'
          }
        ],
        items: [
          {
            id: 'g_album_tryeverything',
            name: 'Try Everything专辑',
            icon: '💿',
            type: 'hold',
            position: 'hand',
            description: '最新专辑封面',
            rarity: 'rare'
          }
        ]
      }
    },

    // 闪电的服装
    flash: {
      name: '闪电',
      emoji: '🐢',
      baseColor: '#27AE60',
      categories: {
        uniforms: [
          {
            id: 'f_uniform_dmv',
            name: 'DMV工作服',
            icon: '👔',
            preview: 'dmv',
            description: '标准DMV员工制服',
            rarity: 'common',
            stats: { efficiency: 1, professional: 5, cute: 8 }
          },
          {
            id: 'f_uniform_casual',
            name: '休闲装',
            icon: '👕',
            preview: 'casual',
            description: '极其舒适的休闲服',
            rarity: 'common',
            stats: { efficiency: 1, professional: 2, cute: 9 }
          }
        ],
        accessories: [
          {
            id: 'f_glasses',
            name: '眼镜',
            icon: '👓',
            type: 'face',
            position: 'face',
            description: '缓慢的眼镜',
            rarity: 'common'
          },
          {
            id: 'f_name_tag',
            name: '工作牌',
            icon: '🏷️',
            type: 'chest',
            position: 'chest',
            description: '"效率第一员工"工作牌',
            rarity: 'rare'
          }
        ],
        items: [
          {
            id: 'f_keyboard',
            name: 'DMV键盘',
            icon: '⌨️',
            type: 'desk',
            position: 'front',
            description: '那个...打字...很...慢...的键盘',
            rarity: 'common'
          }
        ]
      }
    }
  };

  // 稀有度配置
  const rarityConfig = {
    common: { color: '#95A5A6', label: '普通', stars: 1 },
    uncommon: { color: '#3498DB', label: '优秀', stars: 2 },
    rare: { color: '#9B59B6', label: '稀有', stars: 3 },
    epic: { color: '#E67E22', label: '史诗', stars: 4 },
    legendary: { color: '#F1C40F', label: '传说', stars: 5 }
  };

  // 当前状态
  let gameState = {
    selectedCharacter: 'judy',
    equippedItems: {},
    unlockedItems: {},
    collectionPoints: 0
  };

  // 创建换装游戏
  function createDressUpGame() {
    const game = document.createElement('div');
    game.className = 'zootopia-dress-up-game';
    game.innerHTML = `
      <!-- 最小化按钮 -->
      <div class="game-toggle" id="gameToggle">
        <span class="toggle-icon">👗</span>
        <span class="toggle-text">换装游戏</span>
      </div>

      <!-- 游戏面板 -->
      <div class="game-panel" id="gamePanel">
        <!-- 头部 -->
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🎭</span>
            <span class="title-text">动物城换装游戏</span>
          </div>
          <button class="close-btn" id="closeGameBtn">×</button>
        </div>

        <!-- 角色选择 -->
        <div class="character-selector">
          <div class="selector-title">选择角色</div>
          <div class="character-tabs" id="characterTabs"></div>
        </div>

        <!-- 主内容区 -->
        <div class="game-content">
          <!-- 角色展示 -->
          <div class="character-showcase">
            <div class="character-avatar" id="characterAvatar">
              <div class="avatar-base" id="avatarBase">
                <span class="avatar-emoji">🐰</span>
              </div>
              <div class="avatar-layers" id="avatarLayers"></div>
            </div>
            <div class="character-stats" id="characterStats"></div>
            <div class="outfit-save">
              <button class="save-outfit-btn" id="saveOutfitBtn">
                <span>💾</span>
                <span>保存搭配</span>
              </button>
            </div>
          </div>

          <!-- 衣柜 -->
          <div class="wardrobe-panel">
            <!-- 分类标签 -->
            <div class="category-tabs" id="categoryTabs"></div>

            <!-- 物品列表 -->
            <div class="items-grid" id="itemsGrid"></div>
          </div>
        </div>

        <!-- 已装备物品 -->
        <div class="equipped-panel">
          <div class="equipped-title">已装备</div>
          <div class="equipped-slots" id="equippedSlots"></div>
        </div>
      </div>
    `;

    return game;
  }

  // 渲染角色标签
  function renderCharacterTabs() {
    const tabsContainer = document.getElementById('characterTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = Object.entries(wardrobeDatabase).map(([key, char]) => `
      <div class="character-tab ${key === gameState.selectedCharacter ? 'active' : ''}" data-character="${key}">
        <span class="tab-emoji">${char.emoji}</span>
        <span class="tab-name">${char.name}</span>
      </div>
    `).join('');

    // 添加点击事件
    tabsContainer.querySelectorAll('.character-tab').forEach(tab => {
      tab.onclick = () => {
        const charKey = tab.dataset.character;
        selectCharacter(charKey);
      };
    });
  }

  // 选择角色
  function selectCharacter(charKey) {
    gameState.selectedCharacter = charKey;
    renderCharacterTabs();
    renderCategoryTabs();
    renderEquippedSlots();
    updateCharacterAvatar();
  }

  // 渲染分类标签
  function renderCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    if (!tabsContainer) return;

    const character = wardrobeDatabase[gameState.selectedCharacter];
    if (!character) return;

    const categories = Object.keys(character.categories);

    tabsContainer.innerHTML = categories.map((cat, index) => {
      const categoryNames = {
        uniforms: '👔 制服',
        costumes: '👗 服装',
        accessories: '🎀 配饰',
        items: '🎒 道具'
      };
      return `
        <div class="category-tab ${index === 0 ? 'active' : ''}" data-category="${cat}">
          ${categoryNames[cat] || cat}
        </div>
      `;
    }).join('');

    // 添加点击事件
    tabsContainer.querySelectorAll('.category-tab').forEach(tab => {
      tab.onclick = () => {
        const category = tab.dataset.category;
        switchCategory(category);
      };
    });

    // 默认显示第一个分类
    renderItemsGrid(categories[0]);
  }

  // 切换分类
  function switchCategory(category) {
    // 更新标签状态
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });

    renderItemsGrid(category);
  }

  // 渲染物品列表
  function renderItemsGrid(category) {
    const grid = document.getElementById('itemsGrid');
    if (!grid) return;

    const character = wardrobeDatabase[gameState.selectedCharacter];
    if (!character || !character.categories[category]) return;

    const items = character.categories[category];

    grid.innerHTML = items.map(item => {
      const rarity = rarityConfig[item.rarity];
      const isEquipped = gameState.equippedItems[item.type] === item.id;

      return `
        <div class="wardrobe-item ${isEquipped ? 'equipped' : ''}" data-item="${item.id}">
          <div class="item-card" style="border-color: ${rarity.color}">
            <div class="item-icon">${item.icon}</div>
            <div class="item-rarity" style="color: ${rarity.color}">
              ${'⭐'.repeat(rarity.stars)}
            </div>
            <div class="item-name">${item.name}</div>
            <div class="item-description">${item.description}</div>
            ${item.stats ? `
              <div class="item-stats">
                ${Object.entries(item.stats).map(([stat, value]) => `
                  <div class="stat-bar">
                    <span class="stat-name">${stat}</span>
                    <div class="stat-bar-bg">
                      <div class="stat-bar-fill" style="width: ${value * 10}%"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${isEquipped ? '<div class="equipped-badge">✓ 已装备</div>' : `
              <button class="equip-btn" data-item="${item.id}">装备</button>
            `}
          </div>
        </div>
      `;
    }).join('');

    // 添加装备按钮事件
    grid.querySelectorAll('.equip-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const itemId = btn.dataset.item;
        equipItem(itemId);
      };
    });
  }

  // 装备物品
  function equipItem(itemId) {
    // 查找物品
    const character = wardrobeDatabase[gameState.selectedCharacter];
    let foundItem = null;
    let foundCategory = null;

    Object.entries(character.categories).forEach(([cat, items]) => {
      const item = items.find(i => i.id === itemId);
      if (item) {
        foundItem = item;
        foundCategory = cat;
      }
    });

    if (!foundItem) return;

    // 装备物品
    gameState.equippedItems[foundItem.type] = itemId;

    // 更新显示
    renderCategoryTabs();
    renderEquippedSlots();
    updateCharacterAvatar();
  }

  // 渲染已装备槽位
  function renderEquippedSlots() {
    const slotsContainer = document.getElementById('equippedSlots');
    if (!slotsContainer) return;

    const slotTypes = {
      badge: '🎖️ 徽章',
      hat: '👒 帽子',
      face: '🕶️ 面部',
      chest: '👕 胸部',
      neck: '👔 颈部',
      hand: '✋ 手持',
      belt: '🔧 腰带',
      hold: '🎒 携带'
    };

    slotsContainer.innerHTML = Object.entries(slotTypes).map(([type, label]) => {
      const equippedId = gameState.equippedItems[type];
      const character = wardrobeDatabase[gameState.selectedCharacter];

      let equippedItem = null;
      if (equippedId && character) {
        Object.values(character.categories).forEach(items => {
          const item = items.find(i => i.id === equippedId);
          if (item) equippedItem = item;
        });
      }

      return `
        <div class="equipped-slot ${equippedItem ? 'filled' : ''}" data-type="${type}">
          <div class="slot-label">${label}</div>
          <div class="slot-content">
            ${equippedItem ? `
              <span class="slot-icon">${equippedItem.icon}</span>
              <span class="slot-name">${equippedItem.name}</span>
            ` : '<span class="slot-empty">空</span>'}
          </div>
        </div>
      `;
    }).join('');
  }

  // 更新角色头像
  function updateCharacterAvatar() {
    const baseContainer = document.getElementById('avatarBase');
    const layersContainer = document.getElementById('avatarLayers');
    const character = wardrobeDatabase[gameState.selectedCharacter];

    if (!baseContainer || !layersContainer || !character) return;

    // 更新基础
    baseContainer.innerHTML = `<span class="avatar-emoji">${character.emoji}</span>`;

    // 添加装备图层
    const equippedLayers = Object.values(gameState.equippedItems);
    layersContainer.innerHTML = equippedLayers.map(itemId => {
      let equippedItem = null;
      Object.values(character.categories).forEach(items => {
        const item = items.find(i => i.id === itemId);
        if (item) equippedItem = item;
      });

      if (!equippedItem) return '';

      return `
        <div class="avatar-layer" data-type="${equippedItem.type}">
          <span class="layer-icon">${equippedItem.icon}</span>
        </div>
      `;
    }).join('');

    // 更新统计
    updateCharacterStats();
  }

  // 更新角色统计
  function updateCharacterStats() {
    const statsContainer = document.getElementById('characterStats');
    if (!statsContainer) return;

    const character = wardrobeDatabase[gameState.selectedCharacter];
    if (!character) return;

    // 计算总属性
    const totalStats = {};

    Object.values(gameState.equippedItems).forEach(itemId => {
      Object.values(character.categories).forEach(items => {
        const item = items.find(i => i.id === itemId);
        if (item && item.stats) {
          Object.entries(item.stats).forEach(([stat, value]) => {
            totalStats[stat] = (totalStats[stat] || 0) + value;
          });
        }
      });
    });

    const statNames = {
      authority: '👮 权威',
      cute: '🐰 可爱',
      professional: '💼 专业',
      charm: '😊 魅力',
      cool: '😎 酷炫',
      beauty: '💄 美丽',
      performance: '🎤 表演',
      star: '⭐ 星光',
      efficiency: '🐢 效率'
    };

    statsContainer.innerHTML = `
      <div class="stats-title">角色属性</div>
      <div class="stats-list">
        ${Object.entries(totalStats).map(([stat, value]) => `
          <div class="stat-item">
            <span class="stat-label">${statNames[stat] || stat}</span>
            <div class="stat-bar-bg">
              <div class="stat-bar-fill" style="width: ${Math.min(100, value * 10)}%"></div>
            </div>
            <span class="stat-value">${value}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 切换面板
  function togglePanel() {
    const game = document.querySelector('.zootopia-dress-up-game');
    const panel = document.getElementById('gamePanel');

    game.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#dress-up-game-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'dress-up-game-styles';
    styles.textContent = `
      /* 换装游戏容器 */
      .zootopia-dress-up-game {
        position: fixed;
        bottom: 280px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .game-toggle {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .game-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(233, 30, 99, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: dressBounce 2s ease infinite;
      }

      @keyframes dressBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 游戏面板 */
      .game-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 600px;
        max-height: 700px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }

      .game-panel.visible {
        display: flex;
        animation: panelSlideIn 0.3s ease;
      }

      @keyframes panelSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 面板头部 */
      .panel-header {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
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
      }

      .title-icon {
        font-size: 24px;
      }

      .title-text {
        font-size: 16px;
        font-weight: bold;
      }

      .close-btn {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      /* 角色选择 */
      .character-selector {
        padding: 15px 20px;
        border-bottom: 1px solid #ECF0F1;
      }

      .selector-title {
        font-size: 13px;
        font-weight: bold;
        color: #636E72;
        margin-bottom: 10px;
      }

      .character-tabs {
        display: flex;
        gap: 10px;
      }

      .character-tab {
        flex: 1;
        padding: 10px;
        background: #F8F9FA;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        border: 2px solid transparent;
      }

      .character-tab:hover {
        background: #ECF0F1;
      }

      .character-tab.active {
        background: white;
        border-color: #E91E63;
        box-shadow: 0 2px 10px rgba(233, 30, 99, 0.2);
      }

      .tab-emoji {
        display: block;
        font-size: 28px;
        margin-bottom: 5px;
      }

      .tab-name {
        font-size: 11px;
        font-weight: bold;
        color: #2D3436;
      }

      /* 主内容区 */
      .game-content {
        display: flex;
        padding: 20px;
        gap: 20px;
        max-height: 350px;
      }

      /* 角色展示 */
      .character-showcase {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .character-avatar {
        width: 200px;
        height: 200px;
        background: linear-gradient(135deg, #F8F9FA, #E9ECEF);
        border-radius: 20px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .avatar-base {
        font-size: 80px;
      }

      .avatar-layers {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .avatar-layer {
        position: absolute;
        font-size: 32px;
        animation: layerFloat 3s ease-in-out infinite;
      }

      @keyframes layerFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      .character-stats {
        width: 100%;
        padding: 15px;
        background: #F8F9FA;
        border-radius: 12px;
        margin-bottom: 15px;
      }

      .stats-title {
        font-size: 12px;
        font-weight: bold;
        color: #636E72;
        margin-bottom: 10px;
      }

      .stats-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
      }

      .stat-label {
        min-width: 80px;
        color: #2D3436;
      }

      .stat-bar-bg {
        flex: 1;
        height: 6px;
        background: #ECF0F1;
        border-radius: 3px;
        overflow: hidden;
      }

      .stat-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #E91E63, #9C27B0);
        border-radius: 3px;
        transition: width 0.3s ease;
      }

      .stat-value {
        min-width: 30px;
        text-align: right;
        font-weight: bold;
        color: #2D3436;
      }

      .save-outfit-btn {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .save-outfit-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
      }

      /* 衣柜面板 */
      .wardrobe-panel {
        flex: 2;
        display: flex;
        flex-direction: column;
      }

      .category-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
        flex-wrap: wrap;
      }

      .category-tab {
        padding: 8px 15px;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .category-tab.active {
        background: #E91E63;
        color: white;
      }

      .category-tab:hover:not(.active) {
        background: #ECF0F1;
      }

      .items-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        overflow-y: auto;
        max-height: 250px;
        padding: 5px;
      }

      .wardrobe-item {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .wardrobe-item:hover {
        transform: scale(1.02);
      }

      .item-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        text-align: center;
        position: relative;
        transition: all 0.3s ease;
      }

      .item-card.equipped {
        background: linear-gradient(135deg, #E91E6315, #9C27B015);
        border-color: #E91E63;
      }

      .item-icon {
        font-size: 32px;
        margin-bottom: 8px;
      }

      .item-rarity {
        font-size: 10px;
        margin-bottom: 5px;
      }

      .item-name {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .item-description {
        font-size: 10px;
        color: #636E72;
        margin-bottom: 8px;
        line-height: 1.3;
      }

      .item-stats {
        margin-bottom: 8px;
      }

      .stat-bar {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 3px;
        font-size: 9px;
      }

      .stat-name {
        min-width: 40px;
        color: #636E72;
      }

      .equip-btn {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .equip-btn:hover {
        transform: scale(1.05);
      }

      .equipped-badge {
        background: #2ECC71;
        color: white;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: bold;
      }

      /* 已装备面板 */
      .equipped-panel {
        padding: 15px 20px;
        background: #F8F9FA;
        border-top: 1px solid #ECF0F1;
      }

      .equipped-title {
        font-size: 13px;
        font-weight: bold;
        color: #636E72;
        margin-bottom: 10px;
      }

      .equipped-slots {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
      }

      .equipped-slot {
        background: white;
        border-radius: 8px;
        padding: 8px;
        text-align: center;
        border: 1px solid #ECF0F1;
      }

      .equipped-slot.filled {
        border-color: #E91E63;
        background: linear-gradient(135deg, #E91E6315, #9C27B015);
      }

      .slot-label {
        font-size: 10px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .slot-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
      }

      .slot-icon {
        font-size: 16px;
      }

      .slot-name {
        font-size: 9px;
        color: #2D3436;
        font-weight: bold;
      }

      .slot-empty {
        font-size: 10px;
        color: #95A5A6;
      }

      /* 滚动条 */
      .items-grid::-webkit-scrollbar {
        width: 4px;
      }

      .items-grid::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .items-grid::-webkit-scrollbar-thumb {
        background: #E91E63;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 650px) {
        .zootopia-dress-up-game {
          right: 10px;
          bottom: 260px;
        }

        .game-panel {
          width: calc(100vw - 20px);
          max-width: 580px;
        }

        .game-content {
          flex-direction: column;
        }

        .character-showcase {
          width: 100%;
        }

        .items-grid {
          grid-template-columns: 1fr;
        }

        .equipped-slots {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initDressUpGame() {
    injectStyles();

    const game = createDressUpGame();
    document.body.appendChild(game);

    // 切换按钮
    document.getElementById('gameToggle').onclick = togglePanel;
    document.getElementById('closeGameBtn').onclick = togglePanel;

    // 初始化角色
    selectCharacter('judy');

    // 导出全局函数
    window.zootopiaDressUp = {
      show: () => {
        const game = document.querySelector('.zootopia-dress-up-game');
        if (!game.classList.contains('expanded')) {
          togglePanel();
        }
      },
      hide: () => {
        const game = document.querySelector('.zootopia-dress-up-game');
        if (game.classList.contains('expanded')) {
          togglePanel();
        }
      },
      equipItem: equipItem,
      getOutfit: () => gameState.equippedItems
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDressUpGame);
  } else {
    initDressUpGame();
  }
})();
