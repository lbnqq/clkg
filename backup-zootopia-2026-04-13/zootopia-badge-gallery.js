/**
 * 疯狂动物城主题 - 徽章画廊
 * Zootopia Theme - Badge Gallery
 * | 成就徽章展示系统
 */

(function() {
  'use strict';

  // 徽章数据
  const badges = {
    // 基础徽章
    welcome: {
      id: 'welcome',
      name: '欢迎来到动物城',
      description: '首次访问博客',
      icon: '🌟',
      rarity: 'common',
      category: 'basic',
      requirement: '访问博客1次',
      unlocked: false
    },
    firstPost: {
      id: 'firstPost',
      name: '第一篇文章',
      description: '阅读你的第一篇博客文章',
      icon: '📝',
      rarity: 'common',
      category: 'basic',
      requirement: '阅读1篇文章',
      unlocked: false
    },
    explorer: {
      id: 'explorer',
      name: '动物城探险家',
      description: '探索动物城的所有地区',
      icon: '🗺️',
      rarity: 'rare',
      category: 'basic',
      requirement: '访问所有7个地区',
      unlocked: false
    },

    // 角色徽章
    judyFriend: {
      id: 'judyFriend',
      name: '朱迪的朋友',
      description: '与朱迪互动10次',
      icon: '🐰',
      rarity: 'common',
      category: 'character',
      requirement: '与朱迪互动10次',
      unlocked: false
    },
    nickPartner: {
      id: 'nickPartner',
      name: '尼克的搭档',
      description: '与尼克互动10次',
      icon: '🦊',
      rarity: 'common',
      category: 'character',
      requirement: '与尼克互动10次',
      unlocked: false
    },
    flashSpeed: {
      id: 'flashSpeed',
      name: '闪电速度',
      description: '与闪电互动5次（耐心！）',
      icon: '🐢',
      rarity: 'rare',
      category: 'character',
      requirement: '与闪电互动5次',
      unlocked: false
    },
    mrBigRespect: {
      id: 'mrBigRespect',
      name: 'Mr. Big的尊重',
      description: '获得Mr. Big的认可',
      icon: '🐀',
      rarity: 'epic',
      category: 'character',
      requirement: '完成Mr. Big相关任务',
      unlocked: false
    },

    // 游戏徽章
    gameMaster: {
      id: 'gameMaster',
      name: '游戏大师',
      description: '在所有游戏中获得100分以上',
      icon: '🎮',
      rarity: 'rare',
      category: 'game',
      requirement: '所有游戏高分达成',
      unlocked: false
    },
    pawpsicleCollector: {
      id: 'pawpsicleCollector',
      name: 'Pawpsicle收藏家',
      description: '收集100根Pawpsicle',
      icon: '🍦',
      rarity: 'rare',
      category: 'game',
      requirement: '收集100根Pawpsicle',
      unlocked: false
    },
    cardMaster: {
      id: 'cardMaster',
      name: '卡牌大师',
      description: '收集所有稀有度的卡牌',
      icon: '🃏',
      rarity: 'epic',
      category: 'game',
      requirement: '收集所有稀有度卡牌',
      unlocked: false
    },

    // 活跃徽章
    dailyVisitor: {
      id: 'dailyVisitor',
      name: '每日访客',
      description: '连续7天访问博客',
      icon: '📅',
      rarity: 'common',
      category: 'activity',
      requirement: '连续访问7天',
      unlocked: false
    },
    monthVisitor: {
      id: 'monthVisitor',
      name: '月度忠实者',
      description: '连续30天访问博客',
      icon: '📆',
      rarity: 'rare',
      category: 'activity',
      requirement: '连续访问30天',
      unlocked: false
    },
    nightOwl: {
      id: 'nightOwl',
      name: '夜猫子',
      description: '在深夜（22:00-6:00）访问博客',
      icon: '🦉',
      rarity: 'common',
      category: 'activity',
      requirement: '深夜访问',
      unlocked: false
    },
    earlyBird: {
      id: 'earlyBird',
      name: '早起鸟',
      description: '在早晨（6:00-9:00）访问博客',
      icon: '🐤',
      rarity: 'common',
      category: 'activity',
      requirement: '早晨访问',
      unlocked: false
    },

    // 收集徽章
    stickerBeginner: {
      id: 'stickerBeginner',
      name: '贴纸新手',
      description: '收集10张贴纸',
      icon: '📒',
      rarity: 'common',
      category: 'collection',
      requirement: '收集10张贴纸',
      unlocked: false
    },
    stickerExpert: {
      id: 'stickerExpert',
      name: '贴纸专家',
      description: '收集50张贴纸',
      icon: '📒',
      rarity: 'rare',
      category: 'collection',
      requirement: '收集50张贴纸',
      unlocked: false
    },
    districtExpert: {
      id: 'districtExpert',
      name: '地区专家',
      description: '解锁所有动物城地区',
      icon: '🏙️',
      rarity: 'epic',
      category: 'collection',
      requirement: '解锁所有7个地区',
      unlocked: false
    },

    // 特殊徽章
    zpdOfficer: {
      id: 'zpdOfficer',
      name: 'ZPD警官',
      description: '达到10级',
      icon: '👮',
      rarity: 'rare',
      category: 'special',
      requirement: '达到10级',
      unlocked: false
    },
    animalLegend: {
      id: 'animalLegend',
      name: '动物城传说',
      description: '达到最高等级（20级）',
      icon: '👑',
      rarity: 'legendary',
      category: 'special',
      requirement: '达到20级',
      unlocked: false
    },
    perfectDay: {
      id: 'perfectDay',
      name: '完美一天',
      description: '一天内完成所有任务',
      icon: '🌈',
      rarity: 'epic',
      category: 'special',
      requirement: '单日完成所有任务',
      unlocked: false
    }
  };

  // 徽章类别
  const categories = {
    all: '全部',
    basic: '基础',
    character: '角色',
    game: '游戏',
    activity: '活跃',
    collection: '收集',
    special: '特殊'
  };

  // 稀有度配置
  const rarityConfig = {
    common: { color: '#95A5A6', name: '普通', glow: 'none' },
    rare: { color: '#3498DB', name: '稀有', glow: '0 0 10px rgba(52, 152, 219, 0.5)' },
    epic: { color: '#9B59B6', name: '史诗', glow: '0 0 15px rgba(155, 89, 182, 0.6)' },
    legendary: { color: '#F39C12', name: '传说', glow: '0 0 20px rgba(243, 156, 18, 0.7), 0 0 30px rgba(243, 156, 18, 0.5)' }
  };

  // 用户徽章数据
  let badgeCollection = {
    unlocked: [],
    progress: {},
    totalBadges: Object.keys(badges).length
  };

  // 加载徽章数据
  function loadBadgeData() {
    const saved = localStorage.getItem('zootopiaBadges');
    if (saved) {
      badgeCollection = JSON.parse(saved);
    }

    // 更新徽章解锁状态
    Object.values(badges).forEach(badge => {
      badge.unlocked = badgeCollection.unlocked.includes(badge.id);
    });
  }

  // 保存徽章数据
  function saveBadgeData() {
    localStorage.setItem('zootopiaBadges', JSON.stringify(badgeCollection));
  }

  // 解锁徽章
  function unlockBadge(badgeId) {
    if (badgeCollection.unlocked.includes(badgeId)) return false;

    badgeCollection.unlocked.push(badgeId);
    saveBadgeData();

    const badge = badges[badgeId];
    badge.unlocked = true;

    // 触发成就事件
    window.dispatchEvent(new CustomEvent('zootopiaAchievement', {
      detail: {
        name: badge.name,
        xp: getBadgeXP(badge.rarity),
        reward: badge.icon
      }
    }));

    return true;
  }

  // 获取徽章经验值
  function getBadgeXP(rarity) {
    const xpMap = { common: 10, rare: 25, epic: 50, legendary: 100 };
    return xpMap[rarity] || 10;
  }

  // 创建徽章画廊
  function createBadgeGallery() {
    const gallery = document.createElement('div');
    gallery.className = 'zootopia-badge-gallery';
    gallery.innerHTML = `
      <div class="gallery-backdrop"></div>
      <div class="gallery-container">
        <div class="gallery-header">
          <div class="gallery-logo">🏆</div>
          <div class="gallery-title">动物城徽章馆</div>
          <div class="gallery-stats">
            <span class="unlocked-count">${badgeCollection.unlocked.length}/${badgeCollection.totalBadges}</span>
          </div>
          <button class="gallery-close">×</button>
        </div>

        <div class="gallery-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(badgeCollection.unlocked.length / badgeCollection.totalBadges) * 100}%"></div>
          </div>
          <div class="progress-text">
            <span>收集进度</span>
            <span>${Math.round((badgeCollection.unlocked.length / badgeCollection.totalBadges) * 100)}%</span>
          </div>
        </div>

        <div class="gallery-tabs">
          ${Object.entries(categories).map(([key, value]) => `
            <button class="tab-btn ${key === 'all' ? 'active' : ''}" data-tab="${key}">${value}</button>
          `).join('')}
        </div>

        <div class="gallery-content">
          <div class="badges-grid" id="badgesGrid"></div>
        </div>

        <div class="badge-detail" id="badgeDetail"></div>
      </div>

      <button class="gallery-toggle" id="galleryToggle">
        <span class="toggle-icon">🏆</span>
        <span class="toggle-count">${badgeCollection.unlocked.length}</span>
      </button>
    `;

    return gallery;
  }

  // 渲染徽章网格
  function renderBadgesGrid(category = 'all') {
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;

    const filteredBadges = category === 'all'
      ? Object.values(badges)
      : Object.values(badges).filter(b => b.category === category);

    grid.innerHTML = filteredBadges.map(badge => {
      const rarity = rarityConfig[badge.rarity];
      return `
        <div class="badge-item ${badge.unlocked ? 'unlocked' : 'locked'}" data-badge="${badge.id}">
          <div class="badge-card" style="
            border-color: ${rarity.color};
            ${badge.unlocked ? `box-shadow: ${rarity.glow};` : ''}
          ">
            <div class="badge-icon" style="
              background: linear-gradient(135deg, ${rarity.color}22, ${rarity.color}44);
              ${badge.unlocked ? '' : 'filter: grayscale(100%); opacity: 0.5;'}
            ">
              ${badge.icon}
            </div>
            <div class="badge-name">${badge.unlocked ? badge.name : '???'}</div>
            <div class="badge-rarity" style="background: ${rarity.color}">${rarity.name}</div>
            ${!badge.unlocked ? '<div class="badge-lock">🔒</div>' : ''}
          </div>
        </div>
      `;
    }).join('');

    // 添加点击事件
    grid.querySelectorAll('.badge-item').forEach(item => {
      item.addEventListener('click', () => {
        const badgeId = item.dataset.badge;
        showBadgeDetail(badgeId);
      });
    });
  }

  // 显示徽章详情
  function showBadgeDetail(badgeId) {
    const badge = badges[badgeId];
    if (!badge) return;

    const rarity = rarityConfig[badge.rarity];
    const detail = document.getElementById('badgeDetail');

    detail.innerHTML = `
      <div class="detail-content">
        <div class="detail-badge-icon" style="background: ${rarity.color}22;">
          <span class="detail-emoji" style="font-size: 64px">${badge.unlocked ? badge.icon : '🔒'}</span>
        </div>
        <div class="detail-name">${badge.unlocked ? badge.name : '???'}</div>
        <div class="detail-rarity" style="background: ${rarity.color}">${rarity.name}</div>
        <div class="detail-description">${badge.unlocked ? badge.description : '尚未解锁此徽章'}</div>
        ${badge.unlocked ? `
          <div class="detail-unlocked">✅ 已解锁</div>
        ` : `
          <div class="detail-requirement">解锁条件: ${badge.requirement}</div>
        `}
        <button class="detail-btn close-btn">关闭</button>
      </div>
    `;

    detail.classList.add('active');

    detail.querySelector('.close-btn').onclick = () => {
      detail.classList.remove('active');
    };
  }

  // 检查徽章解锁条件
  function checkBadgeUnlocks() {
    // 检查基础徽章
    const visitCount = parseInt(localStorage.getItem('zootopiaVisits') || '0');
    if (visitCount >= 1) unlockBadge('welcome');

    // 检查活跃徽章
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) unlockBadge('nightOwl');
    if (hour >= 6 && hour < 9) unlockBadge('earlyBird');

    // 检查等级徽章
    const level = parseInt(localStorage.getItem('zootopiaLevel') || '0');
    if (level >= 10) unlockBadge('zpdOfficer');
    if (level >= 20) unlockBadge('animalLegend');

    // 检查访问连续天数
    const visits = JSON.parse(localStorage.getItem('zootopiaVisitHistory') || '[]');
    const uniqueDays = [...new Set(visits.map(v => v.split(' ')[0]))];
    if (uniqueDays.length >= 7) unlockBadge('dailyVisitor');
    if (uniqueDays.length >= 30) unlockBadge('monthVisitor');

    // 检查贴纸收集
    const stickers = JSON.parse(localStorage.getItem('zootopiaStickerBook') || '{}');
    const stickerCount = stickers.collected?.length || 0;
    if (stickerCount >= 10) unlockBadge('stickerBeginner');
    if (stickerCount >= 50) unlockBadge('stickerExpert');

    // 检查游戏数据
    const arcadeGames = JSON.parse(localStorage.getItem('zootopiaArcade') || '{}');
    if (arcadeGames.unlockedGames?.length === 5) unlockBadge('gameMaster');

    // 检查Pawpsicle收集
    const pawpsicles = parseInt(localStorage.getItem('zootopiaPawpsicles') || '0');
    if (pawpsicles >= 100) unlockBadge('pawpsicleCollector');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#badge-gallery-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'badge-gallery-styles';
    styles.textContent = `
      /* 徽章画廊容器 */
      .zootopia-badge-gallery {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: none;
      }

      .zootopia-badge-gallery.active {
        display: block;
      }

      .gallery-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        animation: backdropFadeIn 0.3s ease;
      }

      .gallery-container {
        position: relative;
        width: 90vw;
        height: 90vh;
        margin: 5vh auto;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }

      /* 画廊头部 */
      .gallery-header {
        background: linear-gradient(135deg, #F39C12, #E67E22);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .gallery-logo {
        font-size: 36px;
        animation: trophyShine 3s ease infinite;
      }

      @keyframes trophyShine {
        0%, 100% { transform: rotate(-5deg) scale(1); }
        50% { transform: rotate(5deg) scale(1.1); }
      }

      .gallery-title {
        flex: 1;
        font-size: 24px;
        font-weight: bold;
      }

      .gallery-stats {
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        font-weight: bold;
      }

      .gallery-close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      /* 进度条 */
      .gallery-progress {
        padding: 20px;
        background: rgba(0, 0, 0, 0.2);
      }

      .progress-bar {
        height: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 10px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #F39C12, #E67E22);
        transition: width 0.5s ease;
      }

      .progress-text {
        display: flex;
        justify-content: space-between;
        color: white;
        font-size: 14px;
      }

      /* 标签页 */
      .gallery-tabs {
        display: flex;
        background: rgba(0, 0, 0, 0.3);
        padding: 10px 20px 0;
        gap: 10px;
        overflow-x: auto;
      }

      .tab-btn {
        padding: 10px 20px;
        background: transparent;
        border: none;
        border-radius: 10px 10px 0 0;
        color: white;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        white-space: nowrap;
        opacity: 0.6;
        transition: all 0.3s ease;
      }

      .tab-btn.active {
        background: rgba(255, 255, 255, 0.1);
        opacity: 1;
      }

      .tab-btn:hover {
        opacity: 1;
      }

      /* 内容区域 */
      .gallery-content {
        height: calc(90vh - 180px);
        overflow-y: auto;
        padding: 20px;
      }

      .badges-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 20px;
      }

      /* 徽章卡片 */
      .badge-item {
        cursor: pointer;
      }

      .badge-card {
        background: rgba(255, 255, 255, 0.1);
        border: 3px solid;
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s ease;
        position: relative;
      }

      .badge-item:hover .badge-card {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
      }

      .badge-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        transition: all 0.3s ease;
      }

      .badge-item.unlocked .badge-icon {
        animation: iconPulse 2s ease infinite;
      }

      @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .badge-name {
        font-size: 14px;
        font-weight: bold;
        color: white;
        margin-bottom: 8px;
      }

      .badge-rarity {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
        color: white;
      }

      .badge-lock {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        opacity: 0.5;
      }

      /* 详情面板 */
      .badge-detail {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: none;
        min-width: 300px;
      }

      .badge-detail.active {
        display: block;
        animation: detailPop 0.3s ease;
      }

      @keyframes detailPop {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .detail-badge-icon {
        width: 100px;
        height: 100px;
        margin: 0 auto 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .detail-emoji {
        font-size: 64px;
      }

      .detail-name {
        font-size: 24px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
      }

      .detail-rarity {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin-bottom: 15px;
      }

      .detail-description {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 15px;
        line-height: 1.5;
      }

      .detail-unlocked {
        color: #2ECC71;
        font-weight: bold;
        margin: 15px 0;
        font-size: 18px;
      }

      .detail-requirement {
        color: #F39C12;
        font-size: 12px;
        margin: 15px 0;
        padding: 10px;
        background: rgba(243, 156, 18, 0.1);
        border-radius: 10px;
      }

      .detail-btn {
        padding: 12px 30px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 15px;
      }

      /* 切换按钮 */
      .gallery-toggle {
        position: fixed;
        bottom: 160px;
        left: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #F39C12, #E67E22);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .gallery-toggle:hover {
        transform: scale(1.1) rotate(15deg);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .toggle-count {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 24px;
        height: 24px;
        background: #E74C3C;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .gallery-container {
          width: 95vw;
          height: 95vh;
          margin: 2.5vh auto;
        }

        .badges-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .gallery-toggle {
          bottom: 240px;
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

  // 初始化徽章画廊
  function initBadgeGallery() {
    loadBadgeData();
    injectStyles();

    const gallery = createBadgeGallery();
    document.body.appendChild(gallery);

    // 切换按钮
    document.getElementById('galleryToggle').onclick = () => {
      gallery.classList.add('active');
      renderBadgesGrid();
      checkBadgeUnlocks();
    };

    // 关闭按钮
    document.querySelector('.gallery-close').onclick = () => {
      gallery.classList.remove('active');
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderBadgesGrid(category);
      });
    });

    // 页面加载时检查徽章
    checkBadgeUnlocks();
  }

  // 导出全局函数
  window.zootopiaBadges = {
    show: () => {
      document.querySelector('.zootopia-badge-gallery').classList.add('active');
    },
    unlock: unlockBadge,
    check: checkBadgeUnlocks,
    getProgress: () => ({
      unlocked: badgeCollection.unlocked.length,
      total: badgeCollection.totalBadges,
      percent: Math.round((badgeCollection.unlocked.length / badgeCollection.totalBadges) * 100)
    })
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBadgeGallery);
  } else {
    initBadgeGallery();
  }
})();
