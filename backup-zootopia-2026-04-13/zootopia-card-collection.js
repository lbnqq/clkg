/**
 * 疯狂动物城主题 - 角色卡牌收集系统
 * Zootopia Theme - Character Card Collection System
 * | 收集动物城角色卡牌，解锁稀有角色！
 */

(function() {
  'use strict';

  // 角色卡牌配置
  const characterCards = [
    // 传奇卡 (1%)
    {
      id: 'judy_legendary',
      name: '朱迪·霍普斯',
      nameEn: 'Judy Hopps',
      rarity: 'legendary',
      icon: '🐰',
      image: 'https://img.icons8.com/color/96/rabbit.png',
      stats: { courage: 95, speed: 90, intelligence: 85 },
      quote: '任何人都可以成就任何事！',
      ability: '永不放弃',
      dropRate: 1
    },
    {
      id: 'nick_legendary',
      name: '尼克·王尔德',
      nameEn: 'Nick Wilde',
      rarity: 'legendary',
      icon: '🦊',
      image: 'https://img.icons8.com/color/96/fox.png',
      stats: { charm: 95, wit: 90, cleverness: 95 },
      quote: '这叫hustle，甜心。',
      ability: '街头智慧',
      dropRate: 1
    },

    // 史诗卡 (5%)
    {
      id: 'flash_epic',
      name: '闪电',
      nameEn: 'Flash',
      rarity: 'epic',
      icon: '🐢',
      image: 'https://img.icons8.com/color/96/turtle.png',
      stats: { patience: 100, slow: 100, friendly: 90 },
      quote: '你........................好',
      ability: '极慢速度',
      dropRate: 5
    },
    {
      id: 'chief_epic',
      name: '博戈局长',
      nameEn: 'Chief Bogo',
      rarity: 'epic',
      icon: '🦁',
      image: 'https://img.icons8.com/color/96/lion.png',
      stats: { authority: 95, strength: 90, leadership: 95 },
      quote: '48小时！',
      ability: '绝对权威',
      dropRate: 5
    },
    {
      id: 'gazelle_epic',
      name: '羚羊',
      nameEn: 'Gazelle',
      rarity: 'epic',
      icon: '🦌',
      image: 'https://img.icons8.com/color/96/deer.png',
      stats: { charm: 100, voice: 100, dance: 95 },
      quote: 'Try Everything!',
      ability: '音乐魔法',
      dropRate: 5
    },
    {
      id: 'mrbig_epic',
      name: 'Mr. Big',
      nameEn: 'Mr. Big',
      rarity: 'epic',
      icon: '🐀',
      image: 'https://img.icons8.com/color/96/rat.png',
      stats: { power: 95, respect: 100, family: 90 },
      quote: '冰化他！',
      ability: '教父威严',
      dropRate: 5
    },

    // 稀有卡 (15%)
    {
      id: 'finnick_rare',
      name: '芬尼克',
      nameEn: 'Finnick',
      rarity: 'rare',
      icon: '🦊',
      image: 'https://img.icons8.com/color/96/fox-2.png',
      stats: { toughness: 80, attitude: 85, loyalty: 75 },
      quote: '你叫谁宝宝？！',
      ability: '脾气暴躁',
      dropRate: 15
    },
    {
      id: 'bellwether_rare',
      name: '贝尔沃瑟',
      nameEn: 'Bellwether',
      rarity: 'rare',
      icon: '🐑',
      image: 'https://img.icons8.com/color/96/sheep.png',
      stats: { deception: 85, cunning: 80, ambition: 90 },
      quote: '小动物要团结！',
      ability: '双面人格',
      dropRate: 15
    },
    {
      id: 'bogo_rare',
      name: '本杰明警官',
      nameEn: 'Benjamin',
      rarity: 'rare',
      icon: '🦆',
      image: 'https://img.icons8.com/color/96/duck.png',
      stats: { enthusiasm: 95, efficiency: 85, loyalty: 90 },
      quote: '欢迎来到ZPD！',
      ability: '超热情',
      dropRate: 15
    },
    {
      id: 'clawhauser_rare',
      name: '克拉豪斯',
      nameEn: 'Clawhauser',
      rarity: 'rare',
      icon: '🦍',
      image: 'https://img.icons8.com/color/96/gorilla.png',
      stats: { friendliness: 95, gossip: 90, music: 85 },
      quote: 'Gazelle的新歌！',
      ability: '八卦王',
      dropRate: 15
    },

    // 普通卡 (74%)
    {
      id: 'stu_common',
      name: '斯图·霍普斯',
      nameEn: 'Stu Hopps',
      rarity: 'common',
      icon: '🐰',
      image: 'https://img.icons8.com/color/96/rabbit-2.png',
      stats: { farming: 90, kindness: 85, patience: 80 },
      quote: '种胡萝卜需要耐心',
      ability: '胡萝卜种植',
      dropRate: 20
    },
    {
      id: 'bonnie_common',
      name: '邦妮·霍普斯',
      nameEn: 'Bonnie Hopps',
      rarity: 'common',
      icon: '🐰',
      image: 'https://img.icons8.com/color/96/rabbit-3.png',
      stats: { care: 95, love: 90, worry: 85 },
      quote: '朱迪，小心大城市！',
      ability: '母爱',
      dropRate: 20
    },
    {
      id: 'manchas_common',
      name: '曼查斯',
      nameEn: 'Manchas',
      rarity: 'common',
      icon: '🐆',
      image: 'https://img.icons8.com/color/96/jaguar.png',
      stats: { driving: 85, loyalty: 80, professionalism: 85 },
      quote: '请系好安全带',
      ability: '专业司机',
      dropRate: 18
    },
    {
      id: 'yax_common',
      name: '亚克斯',
      nameEn: 'Yax',
      rarity: 'common',
      icon: '🦘',
      image: 'https://img.icons8.com/color/96/kangaroo.png',
      stats: { zen: 95, wisdom: 90, nudity: 100 },
      quote: '自然就是最好的衣服',
      ability: '禅修大师',
      dropRate: 16
    }
  ];

  // 稀有度配置
  const rarityConfig = {
    legendary: { name: '传奇', color: '#FFD700', bgGradient: 'linear-gradient(135deg, #FFD700, #FFA500)', borderStyle: '3px solid #FFD700', stars: 5 },
    epic: { name: '史诗', color: '#9B59B6', bgGradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', borderStyle: '3px solid #9B59B6', stars: 4 },
    rare: { name: '稀有', color: '#3498DB', bgGradient: 'linear-gradient(135deg, #3498DB, #2980B9)', borderStyle: '2px solid #3498DB', stars: 3 },
    common: { name: '普通', color: '#95A5A6', bgGradient: 'linear-gradient(135deg, #95A5A6, #7F8C8D)', borderStyle: '2px solid #95A5A6', stars: 2 }
  };

  // 用户收集数据
  let collectionData = JSON.parse(localStorage.getItem('zootopiaCardCollection')) || {
    cards: {},
    totalPulls: 0,
    legendaryCount: 0,
    lastPullTime: null
  };

  // 保存数据
  function saveCollectionData() {
    localStorage.setItem('zootopiaCardCollection', JSON.stringify(collectionData));
  }

  // 创建卡牌收集面板
  function createCollectionPanel() {
    const panel = document.createElement('div');
    panel.className = 'card-collection-panel';
    panel.innerHTML = `
      <button class="collection-toggle" title="角色卡牌">
        <span class="toggle-icon">🃏</span>
        <span class="collection-badge" id="collectionBadge">0/16</span>
      </button>
      <div class="collection-content">
        <div class="collection-header">
          <div class="header-left">
            <span class="header-icon">🃏</span>
            <div class="header-text">
              <div class="header-title">角色卡牌收集</div>
              <div class="header-subtitle">收集所有角色卡牌！</div>
            </div>
          </div>
          <button class="collection-close">×</button>
        </div>

        <div class="collection-stats">
          <div class="stat-item">
            <span class="stat-icon">📊</span>
            <div class="stat-info">
              <span class="stat-value" id="totalCards">0</span>
              <span class="stat-label">已收集</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🎲</span>
            <div class="stat-info">
              <span class="stat-value" id="totalPulls">0</span>
              <span class="stat-label">抽取次数</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⭐</span>
            <div class="stat-info">
              <span class="stat-value" id="legendaryCount">0</span>
              <span class="stat-label">传奇卡</span>
            </div>
          </div>
        </div>

        <div class="gacha-section">
          <div class="gacha-title">🎰 抽取卡牌</div>
          <div class="gacha-display" id="gachaDisplay">
            <div class="gacha-placeholder">
              <span class="placeholder-icon">🎴</span>
              <span class="placeholder-text">点击下方按钮抽取卡牌</span>
            </div>
          </div>
          <div class="gacha-buttons">
            <button class="pull-btn single-pull" onclick="pullCard(1)">
              <span class="btn-icon">🎲</span>
              <span class="btn-text">单抽</span>
              <span class="btn-cost">免费</span>
            </button>
            <button class="pull-btn multi-pull" onclick="pullCard(5)">
              <span class="btn-icon">🎰</span>
              <span class="btn-text">五连抽</span>
              <span class="btn-cost">免费</span>
            </button>
          </div>
          <div class="pull-probability">
            <span class="prob-title">掉落概率：</span>
            <span class="prob-item legendary">⭐传奇 1%</span>
            <span class="prob-item epic">💜史诗 5%</span>
            <span class="prob-item rare">💙稀有 15%</span>
            <span class="prob-item common">🤍普通 79%</span>
          </div>
        </div>

        <div class="cards-grid-section">
          <div class="grid-header">
            <span class="grid-title">📚 卡牌图鉴</span>
            <div class="grid-filters">
              <button class="filter-btn active" data-filter="all">全部</button>
              <button class="filter-btn" data-filter="legendary">传奇</button>
              <button class="filter-btn" data-filter="epic">史诗</button>
              <button class="filter-btn" data-filter="rare">稀有</button>
              <button class="filter-btn" data-filter="common">普通</button>
            </div>
          </div>
          <div class="cards-grid" id="cardsGrid">
            <!-- 卡牌网格将动态生成 -->
          </div>
        </div>

        <div class="recent-pulls">
          <div class="recent-title">🕐 最近获得</div>
          <div class="recent-list" id="recentPulls">
            <div class="no-pulls">还没有抽取任何卡牌</div>
          </div>
        </div>
      </div>
    `;

    return panel;
  }

  // 抽取卡牌
  function pullCard(count) {
    const pulledCards = [];
    collectionData.totalPulls += count;

    for (let i = 0; i < count; i++) {
      const card = rollCard();
      pulledCards.push(card);

      // 保存卡牌
      if (!collectionData.cards[card.id]) {
        collectionData.cards[card.id] = {
          ...card,
          count: 0,
          obtainedAt: new Date().toISOString()
        };
      }
      collectionData.cards[card.id].count++;

      // 统计传奇卡
      if (card.rarity === 'legendary') {
        collectionData.legendaryCount++;
      }
    }

    collectionData.lastPullTime = new Date().toISOString();
    saveCollectionData();

    // 显示抽取结果
    showPullResults(pulledCards);

    // 更新UI
    updateCollectionUI();

    // 添加经验值
    if (window.zootopiaAddXP) {
      const xp = pulledCards.reduce((sum, card) => {
        const rarityXP = { legendary: 100, epic: 50, rare: 25, common: 10 };
        return sum + (rarityXP[card.rarity] || 10);
      }, 0);
      window.zootopiaAddXP(xp, '卡牌收集');
    }
  }

  // 随机抽取单张卡牌
  function rollCard() {
    const roll = Math.random() * 100;
    let cumulative = 0;

    // 按掉落率从高到低排序
    const sortedCards = [...characterCards].sort((a, b) => a.dropRate - b.dropRate);

    for (const card of sortedCards) {
      cumulative += card.dropRate;
      if (roll <= cumulative) {
        return card;
      }
    }

    // 默认返回第一张卡
    return characterCards[characterCards.length - 1];
  }

  // 显示抽取结果
  function showPullResults(cards) {
    const display = document.getElementById('gachaDisplay');
    if (!display) return;

    display.innerHTML = '';

    cards.forEach((card, index) => {
      const cardEl = createCardElement(card, true);
      cardEl.style.animationDelay = `${index * 0.15}s`;
      display.appendChild(cardEl);
    });

    // 高亮显示稀有卡牌
    const hasLegendary = cards.some(c => c.rarity === 'legendary');
    const hasEpic = cards.some(c => c.rarity === 'epic');

    if (hasLegendary) {
      showSpecialEffect('legendary');
    } else if (hasEpic) {
      showSpecialEffect('epic');
    }
  }

  // 创建卡牌元素
  function createCardElement(card, isNewPull = false) {
    const config = rarityConfig[card.rarity];
    const cardEl = document.createElement('div');
    cardEl.className = `card-item ${card.rarity} ${isNewPull ? 'new-pull' : ''}`;
    cardEl.style.cssText = `
      background: ${config.bgGradient};
      border: ${config.borderStyle};
      animation: ${isNewPull ? 'cardReveal' : 'cardFadeIn'} 0.5s ease forwards;
    `;

    const stars = '⭐'.repeat(config.stars);

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-header">
          <span class="card-rarity">${config.name}</span>
          <span class="card-stars">${stars}</span>
        </div>
        <div class="card-image">
          <span class="card-icon">${card.icon}</span>
        </div>
        <div class="card-info">
          <div class="card-name">${card.name}</div>
          <div class="card-name-en">${card.nameEn}</div>
          <div class="card-quote">"${card.quote}"</div>
          <div class="card-ability">
            <span class="ability-label">能力：</span>
            <span class="ability-value">${card.ability}</span>
          </div>
        </div>
        ${collectionData.cards[card.id] ? `
          <div class="card-count">×${collectionData.cards[card.id].count}</div>
        ` : `
          <div class="card-locked">未获得</div>
        `}
      </div>
    `;

    cardEl.onclick = () => showCardDetail(card);

    return cardEl;
  }

  // 显示卡牌详情
  function showCardDetail(card) {
    if (!collectionData.cards[card.id]) {
      // 未解锁的卡牌显示问号
      return;
    }

    const config = rarityConfig[card.rarity];
    const modal = document.createElement('div');
    modal.className = 'card-detail-modal';
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
      <div class="modal-content" style="background: ${config.bgGradient}">
        <button class="modal-close" onclick="this.closest('.card-detail-modal').remove()">×</button>

        <div class="detail-header">
          <span class="detail-rarity">${config.name}</span>
          <span class="detail-stars">${'⭐'.repeat(config.stars)}</span>
        </div>

        <div class="detail-image">
          <span class="detail-icon">${card.icon}</span>
        </div>

        <div class="detail-name">${card.name}</div>
        <div class="detail-name-en">${card.nameEn}</div>

        <div class="detail-quote">"${card.quote}"</div>

        <div class="detail-stats">
          ${Object.entries(card.stats).map(([key, value]) => `
            <div class="stat-bar">
              <span class="stat-name">${key}</span>
              <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${value}%; background: ${config.color}"></div>
              </div>
              <span class="stat-value">${value}</span>
            </div>
          `).join('')}
        </div>

        <div class="detail-ability">
          <span class="ability-title">特殊能力</span>
          <span class="ability-value">${card.ability}</span>
        </div>

        <div class="detail-count">
          已收集: ${collectionData.cards[card.id].count} 张
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // 显示特效
  function showSpecialEffect(rarity) {
    const effect = document.createElement('div');
    effect.className = 'special-effect';

    if (rarity === 'legendary') {
      effect.innerHTML = `
        <div class="effect-content legendary">
          <div class="effect-icon">🌟</div>
          <div class="effect-text">传奇卡！</div>
        </div>
      `;
    } else if (rarity === 'epic') {
      effect.innerHTML = `
        <div class="effect-content epic">
          <div class="effect-icon">💜</div>
          <div class="effect-text">史诗卡！</div>
        </div>
      `;
    }

    document.body.appendChild(effect);

    setTimeout(() => {
      effect.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => effect.remove(), 500);
    }, 3000);
  }

  // 更新收集UI
  function updateCollectionUI() {
    // 更新统计
    const totalCards = Object.keys(collectionData.cards).length;
    document.getElementById('totalCards').textContent = totalCards;
    document.getElementById('totalPulls').textContent = collectionData.totalPulls;
    document.getElementById('legendaryCount').textContent = collectionData.legendaryCount;
    document.getElementById('collectionBadge').textContent = `${totalCards}/${characterCards.length}`;

    // 更新卡牌网格
    renderCardsGrid('all');

    // 更新最近获得
    updateRecentPulls();
  }

  // 渲染卡牌网格
  function renderCardsGrid(filter) {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;

    const filteredCards = filter === 'all'
      ? characterCards
      : characterCards.filter(c => c.rarity === filter);

    grid.innerHTML = filteredCards.map(card => {
      const isOwned = collectionData.cards[card.id];
      const config = rarityConfig[card.rarity];

      return `
        <div class="grid-card ${isOwned ? 'owned' : 'locked'}" data-rarity="${card.rarity}">
          <div class="grid-card-inner" style="border: ${config.borderStyle}">
            ${isOwned ? `
              <span class="grid-card-icon">${card.icon}</span>
              <div class="grid-card-name">${card.name}</div>
              <div class="grid-card-count">×${collectionData.cards[card.id].count}</div>
            ` : `
              <span class="grid-card-placeholder">❓</span>
              <div class="grid-card-name">???</div>
            `}
            <div class="grid-card-rarity" style="color: ${config.color}">${config.name}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 更新最近获得
  function updateRecentPulls() {
    const recentList = document.getElementById('recentPulls');
    if (!recentList) return;

    if (!collectionData.lastPullTime) {
      recentList.innerHTML = '<div class="no-pulls">还没有抽取任何卡牌</div>';
      return;
    }

    // 获取最近获得的卡牌
    const recentCards = Object.values(collectionData.cards)
      .sort((a, b) => new Date(b.obtainedAt) - new Date(a.obtainedAt))
      .slice(0, 5);

    recentList.innerHTML = recentCards.map(card => {
      const config = rarityConfig[card.rarity];
      return `
        <div class="recent-card" style="border-left: 3px solid ${config.color}">
          <span class="recent-icon">${card.icon}</span>
          <div class="recent-info">
            <span class="recent-name">${card.name}</span>
            <span class="recent-rarity" style="color: ${config.color}">${config.name}</span>
          </div>
          <span class="recent-count">×${card.count}</span>
        </div>
      `;
    }).join('');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#card-collection-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'card-collection-styles';
    styles.textContent = `
      /* 卡牌收集面板 */
      .card-collection-panel {
        position: fixed;
        top: 200px;
        left: 30px;
        z-index: 9997;
      }

      .collection-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        box-shadow: 0 5px 20px rgba(155, 89, 182, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .collection-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(155, 89, 182, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .collection-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #F39C12;
        color: white;
        font-size: 11px;
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 10px;
        border: 2px solid white;
      }

      .collection-content {
        position: absolute;
        top: 0;
        left: 80px;
        width: 450px;
        max-height: 85vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: collectionSlideIn 0.3s ease;
        overflow: hidden;
      }

      .collection-content.show {
        display: block;
      }

      @keyframes collectionSlideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* 头部 */
      .collection-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
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

      .collection-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      /* 统计 */
      .collection-stats {
        display: flex;
        justify-content: space-around;
        padding: 15px;
        background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1));
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

      /* 抽卡区域 */
      .gacha-section {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .gacha-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 15px;
        text-align: center;
      }

      .gacha-display {
        min-height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
        padding: 15px;
        background: #F8F9FA;
        border-radius: 10px;
        flex-wrap: wrap;
      }

      .gacha-placeholder {
        text-align: center;
        color: #95A5A6;
      }

      .placeholder-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .placeholder-text {
        font-size: 14px;
      }

      .gacha-buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }

      .pull-btn {
        flex: 1;
        padding: 15px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .single-pull {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
      }

      .multi-pull {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .pull-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .btn-icon {
        font-size: 24px;
      }

      .btn-text {
        font-size: 14px;
        font-weight: bold;
      }

      .btn-cost {
        font-size: 11px;
        opacity: 0.9;
      }

      .pull-probability {
        text-align: center;
        font-size: 11px;
        color: #636E72;
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .prob-item {
        padding: 3px 8px;
        border-radius: 10px;
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .prob-item.legendary { color: #FFD700; }
      .prob-item.epic { color: #9B59B6; }
      .prob-item.rare { color: #3498DB; }
      .prob-item.common { color: #95A5A6; }

      /* 卡牌元素 */
      .card-item {
        width: 120px;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .card-item:hover {
        transform: scale(1.05) translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      }

      @keyframes cardReveal {
        0% {
          opacity: 0;
          transform: scale(0.5) rotateY(180deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotateY(0deg);
        }
      }

      @keyframes cardFadeIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .card-inner {
        padding: 10px;
        color: white;
        text-align: center;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 10px;
        font-weight: bold;
      }

      .card-image {
        font-size: 48px;
        margin: 10px 0;
      }

      .card-name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 3px;
      }

      .card-name-en {
        font-size: 10px;
        opacity: 0.9;
        margin-bottom: 8px;
      }

      .card-quote {
        font-size: 9px;
        font-style: italic;
        margin-bottom: 8px;
        opacity: 0.9;
      }

      .card-ability {
        font-size: 10px;
        background: rgba(0, 0, 0, 0.2);
        padding: 5px;
        border-radius: 5px;
      }

      .card-count {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(0, 0, 0, 0.3);
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: bold;
      }

      /* 卡牌网格 */
      .cards-grid-section {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .grid-header {
        margin-bottom: 15px;
      }

      .grid-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
        display: block;
      }

      .grid-filters {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }

      .filter-btn {
        padding: 5px 10px;
        background: #F8F9FA;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .filter-btn:hover,
      .filter-btn.active {
        background: #9B59B6;
        color: white;
        border-color: #9B59B6;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
      }

      .grid-card {
        cursor: pointer;
      }

      .grid-card-inner {
        background: white;
        border: 2px solid;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .grid-card:hover .grid-card-inner {
        transform: scale(1.05);
      }

      .grid-card.locked .grid-card-inner {
        opacity: 0.6;
        background: #F8F9FA;
      }

      .grid-card-icon {
        font-size: 32px;
        display: block;
        margin-bottom: 5px;
      }

      .grid-card-placeholder {
        font-size: 32px;
        display: block;
        margin-bottom: 5px;
      }

      .grid-card-name {
        font-size: 11px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .grid-card-count {
        font-size: 10px;
        color: #636E72;
      }

      .grid-card-rarity {
        font-size: 9px;
        font-weight: bold;
      }

      /* 最近获得 */
      .recent-pulls {
        padding: 15px 20px;
        background: rgba(155, 89, 182, 0.05);
      }

      .recent-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .recent-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .recent-card {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: white;
        border-radius: 8px;
        border-left-width: 3px;
        border-left-style: solid;
      }

      .recent-icon {
        font-size: 24px;
      }

      .recent-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .recent-name {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
      }

      .recent-rarity {
        font-size: 10px;
      }

      .recent-count {
        font-size: 11px;
        color: #636E72;
      }

      .no-pulls {
        text-align: center;
        color: #95A5A6;
        font-size: 12px;
        padding: 15px;
      }

      /* 特效 */
      .special-effect {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: effectPop 0.5s ease;
      }

      @keyframes effectPop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .effect-content {
        background: white;
        border-radius: 20px;
        padding: 30px 50px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
      }

      .effect-content.legendary {
        background: linear-gradient(135deg, #FFD700, #FFA500);
      }

      .effect-content.epic {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
      }

      .effect-icon {
        font-size: 64px;
        display: block;
        margin-bottom: 15px;
        animation: bounce 1s ease infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      .effect-text {
        font-size: 24px;
        font-weight: bold;
        color: white;
      }

      /* 详情弹窗 */
      .card-detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10010;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }

      .modal-content {
        position: relative;
        width: 320px;
        background: white;
        border-radius: 20px;
        padding: 25px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        color: white;
      }

      .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        font-size: 12px;
        font-weight: bold;
      }

      .detail-image {
        font-size: 80px;
        margin: 20px 0;
      }

      .detail-name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .detail-name-en {
        font-size: 14px;
        opacity: 0.9;
        margin-bottom: 15px;
      }

      .detail-quote {
        font-size: 12px;
        font-style: italic;
        margin-bottom: 20px;
        opacity: 0.9;
      }

      .detail-stats {
        margin-bottom: 20px;
        text-align: left;
      }

      .stat-bar {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
        font-size: 11px;
      }

      .stat-name {
        min-width: 80px;
        text-transform: capitalize;
      }

      .stat-bar-bg {
        flex: 1;
        height: 8px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        overflow: hidden;
      }

      .stat-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
      }

      .stat-value {
        min-width: 30px;
        text-align: right;
        font-weight: bold;
      }

      .detail-ability {
        background: rgba(255, 255, 255, 0.2);
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
        font-size: 12px;
      }

      .ability-title {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .detail-count {
        font-size: 12px;
        opacity: 0.9;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .card-collection-panel {
          left: 15px;
        }

        .collection-content {
          width: calc(100vw - 60px);
          left: 0;
        }

        .cards-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化卡牌收集
  function initCardCollection() {
    injectStyles();

    const panel = createCollectionPanel();
    document.body.appendChild(panel);

    const content = panel.querySelector('.collection-content');
    const toggle = panel.querySelector('.collection-toggle');
    const close = panel.querySelector('.collection-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      content.classList.toggle('show');
      if (content.classList.contains('show')) {
        updateCollectionUI();
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

    // 筛选按钮
    panel.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = () => {
        panel.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCardsGrid(btn.dataset.filter);
      };
    });

    updateCollectionUI();
  }

  // 导出全局函数
  window.pullCard = pullCard;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardCollection);
  } else {
    initCardCollection();
  }
})();
