/**
 * 疯狂动物城主题 - 彩蛋指南系统
 * Zootopia Theme - Easter Egg Guide System
 * | 疯狂动物城电影彩蛋发现指南
 */

(function() {
  'use strict';

  // 彩蛋数据库
  const easterEggs = {
    // Zootopia 2 彩蛋
    movie2: [
      {
        id: 'm2_001',
        category: '电影致敬',
        title: '教父致敬',
        description: 'Mr.Big的场景致敬《教父》电影',
        location: 'Mr Big宅邸',
        difficulty: 1,
        emoji: '🎬'
      },
      {
        id: 'm2_002',
        category: '隐藏角色',
        title: '迪士尼Logo彩蛋',
        description: '背景中隐藏的米奇轮廓',
        location: '多个场景',
        difficulty: 3,
        emoji: '🐭'
      },
      {
        id: 'm2_003',
        category: '剧情细节',
        title: '电脑密码含义',
        description: 'ZPD电脑系统的密码有特殊含义',
        location: 'ZPD总部',
        difficulty: 2,
        emoji: '💻'
      },
      {
        id: 'm2_004',
        category: '第三部暗示',
        title: '第三部电影伏笔',
        description: '结尾暗示了第三部的内容',
        location: '电影结尾',
        difficulty: 1,
        emoji: '🎯'
      },
      {
        id: 'm2_005',
        category: '角色彩蛋',
        title: '新角色关系',
        description: '野猪二人组和斑马二人组的设置',
        location: '精英警察小队',
        difficulty: 2,
        emoji: '🐗'
      },
      {
        id: 'm2_006',
        category: '场景细节',
        title: '城市地图细节',
        description: '动物城地图更新了新区域',
        location: '多个场景',
        difficulty: 2,
        emoji: '🗺️'
      },
      {
        id: 'm2_007',
        category: '背景细节',
        title: '广告牌彩蛋',
        description: '背景中的广告牌有隐藏信息',
        location: '街道场景',
        difficulty: 3,
        emoji: '🪧'
      },
      {
        id: 'm2_008',
        category: '服装细节',
        title: '角色服装变化',
        description: '朱迪和尼克的新制服有细节',
        location: '角色设计',
        difficulty: 2,
        emoji: '👔'
      },
      {
        id: 'm2_009',
        category: '音乐彩蛋',
        title: '背景音乐致敬',
        description: 'BGM中隐藏了第一部主题曲',
        location: '音乐部分',
        difficulty: 3,
        emoji: '🎵'
      },
      {
        id: 'm2_010',
        category: '对话彩蛋',
        title: '经典台词重现',
        description: '第一部经典台词在对话中重现',
        location: '对话场景',
        difficulty: 2,
        emoji: '💬'
      },
      {
        id: 'm2_011',
        category: '社会评论',
        title: '现实映射',
        description: '剧情暗示了现实社会议题',
        location: '整体剧情',
        difficulty: 3,
        emoji: '🌍'
      },
      {
        id: 'm2_012',
        category: '道具细节',
        title: 'ZPD装备更新',
        description: '警局设备有新的细节设计',
        location: 'ZPD装备',
        difficulty: 2,
        emoji: '🔫'
      },
      {
        id: 'm2_013',
        category: '配角彩蛋',
        title: '配角回归',
        description: '第一部配角角色回归',
        location: '多个场景',
        difficulty: 2,
        emoji: '🎭'
      },
      {
        id: 'm2_014',
        category: '技术细节',
        title: '动画技术升级',
        description: '毛发和场景渲染技术提升',
        location: '整体画面',
        difficulty: 3,
        emoji: '✨'
      },
      {
        id: 'm2_015',
        category: '彩中彩',
        title: '导演客串',
        description: '导演在电影中客串',
        location: '背景角色',
        difficulty: 3,
        emoji: '🎬'
      }
    ],

    // Zootopia 1 经典彩蛋
    movie1: [
      {
        id: 'm1_001',
        category: '电影致敬',
        title: '教父马头场景',
        description: 'Mr.Small的床榻场景致敬《教父》',
        location: 'Mr.Small宅邸',
        difficulty: 1,
        emoji: '🐹'
      },
      {
        id: 'm1_002',
        category: '品牌恶搞',
        title: 'Bunnyburry面包',
        description: '面包店恶搞现实品牌',
        location: '朱迪家乡',
        difficulty: 2,
        emoji: '🥐'
      },
      {
        id: 'm1_003',
        category: '技术细节',
        title: '不同体型通道',
        description: '为不同体型动物设计的通道',
        location: '各个区域',
        difficulty: 1,
        emoji: '🚪'
      },
      {
        id: 'm1_004',
        category: '角色细节',
        title: '豹警官的Gazelle周边',
        description: '本杰明喜欢Gazelle的证据',
        location: 'ZPD前台',
        difficulty: 2,
        emoji: '🐆'
      },
      {
        id: 'm1_005',
        category: '背景细节',
        title: '老鼠城',
        description: 'Little Rodentia的细节设计',
        location: '小啮齿动物镇',
        difficulty: 2,
        emoji: '🐁'
      },
      {
        id: 'm1_006',
        category: '台词彩蛋',
        title: 'Try Everything',
        description: '歌曲名字在电影中多次出现',
        location: '多处',
        difficulty: 1,
        emoji: '🎶'
      },
      {
        id: 'm1_007',
        category: '场景细节',
        title: 'DMV树懒速度',
        description: 'DMV的一切都超级慢',
        location: 'DMV',
        difficulty: 1,
        emoji: '🐢'
      },
      {
        id: 'm1_008',
        category: '颜色象征',
        title: '区域颜色设计',
        description: '每个区域有独特的颜色主题',
        location: '整体设计',
        difficulty: 2,
        emoji: '🎨'
      }
    ],

    // 上海迪士尼园区彩蛋
    shanghaiDisney: [
      {
        id: 'sd_001',
        category: '建筑细节',
        title: 'ZYPD警徽',
        description: '园区内隐藏的ZYPD标志',
        location: 'ZPD总部',
        difficulty: 2,
        emoji: '👮'
      },
      {
        id: 'sd_002',
        category: '隐藏物品',
        title: 'Mr.Small豪车',
        description: '迷你版的豪车模型',
        location: '城市广场',
        difficulty: 3,
        emoji: '🚗'
      },
      {
        id: 'sd_003',
        category: '角色彩蛋',
        title: '闪电相框',
        description: '闪电在DMV的照片',
        location: '雨林区',
        difficulty: 2,
        emoji: '🖼️'
      },
      {
        id: 'sd_004',
        category: '场景细节',
        title: '体型差异设计',
        description: '不同区域的通道设计',
        location: '园区各处',
        difficulty: 2,
        emoji: '📏'
      },
      {
        id: 'sd_005',
        category: '隐藏装饰',
        title: '爪爪冰棍包装',
        description: '尼克卖冰棍的历史',
        location: '草原中心',
        difficulty: 3,
        emoji: '🍦'
      },
      {
        id: 'sd_006',
        category: '互动彩蛋',
        title: '博戈局长咖啡杯',
        description: '局长专属咖啡杯',
        location: 'ZPD总部',
        difficulty: 2,
        emoji: '☕'
      },
      {
        id: 'sd_007',
        category: '建筑细节',
        title: '给小老鼠的小门',
        description: '旋转门旁的小门',
        location: '园区入口',
        difficulty: 3,
        emoji: '🐭'
      },
      {
        id: 'sd_008',
        category: '背景细节',
        title: '动物城报纸',
        description: '背景中的动物城日报',
        location: '园区各处',
        difficulty: 3,
        emoji: '📰'
      }
    ]
  };

  // 当前状态
  let eggGuideState = {
    discovered: JSON.parse(localStorage.getItem('zootopiaEggsDiscovered') || '[]'),
    favorites: JSON.parse(localStorage.getItem('zootopiaEggsFavorites') || '[]'),
    currentCategory: 'movie2',
    filter: 'all'
  };

  // 创建彩蛋指南面板
  function createEggGuidePanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-egg-guide';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="egg-guide-toggle" id="eggGuideToggle">
        <span class="toggle-icon">🥚</span>
        <span class="toggle-text">彩蛋指南</span>
      </div>

      <!-- 主面板 -->
      <div class="egg-guide-panel" id="eggGuidePanel" style="display: none;">
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🥚</span>
            <span class="title-text">彩蛋指南</span>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 统计信息 -->
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-icon">🎯</span>
            <span class="stat-value" id="discoveredCount">0</span>
            <span class="stat-label">已发现</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">📚</span>
            <span class="stat-value" id="totalCount">0</span>
            <span class="stat-label">总彩蛋</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⭐</span>
            <span class="stat-value" id="favoriteCount">0</span>
            <span class="stat-label">收藏</span>
          </div>
        </div>

        <!-- 分类标签 -->
        <div class="category-tabs">
          <button class="category-tab active" data-category="movie2">
            <span class="tab-emoji">🎬</span>
            <span class="tab-text">Zootopia 2</span>
            <span class="tab-count">(15)</span>
          </button>
          <button class="category-tab" data-category="movie1">
            <span class="tab-emoji">🐰</span>
            <span class="tab-text">Zootopia 1</span>
            <span class="tab-count">(8)</span>
          </button>
          <button class="category-tab" data-category="shanghaiDisney">
            <span class="tab-emoji">🏰</span>
            <span class="tab-text">上海迪士尼</span>
            <span class="tab-count">(8)</span>
          </button>
        </div>

        <!-- 筛选器 -->
        <div class="filter-bar">
          <button class="filter-btn active" data-filter="all">全部</button>
          <button class="filter-btn" data-filter="undiscovered">未发现</button>
          <button class="filter-btn" data-filter="discovered">已发现</button>
          <button class="filter-btn" data-filter="favorites">收藏</button>
        </div>

        <!-- 彩蛋列表 -->
        <div class="eggs-container" id="eggsContainer"></div>
      </div>

      <!-- 发现通知 -->
      <div class="egg-discovery-notification" id="eggDiscoveryNotification">
        <div class="notification-content" id="eggNotificationContent"></div>
      </div>
    `;

    return panel;
  }

  // 渲染彩蛋列表
  function renderEggs() {
    const container = document.getElementById('eggsContainer');
    if (!container) return;

    let eggs = easterEggs[eggGuideState.currentCategory] || [];

    // 应用筛选器
    if (eggGuideState.filter === 'undiscovered') {
      eggs = eggs.filter(e => !eggGuideState.discovered.includes(e.id));
    } else if (eggGuideState.filter === 'discovered') {
      eggs = eggs.filter(e => eggGuideState.discovered.includes(e.id));
    } else if (eggGuideState.filter === 'favorites') {
      eggs = eggs.filter(e => eggGuideState.favorites.includes(e.id));
    }

    container.innerHTML = eggs.map(egg => {
      const isDiscovered = eggGuideState.discovered.includes(egg.id);
      const isFavorite = eggGuideState.favorites.includes(egg.id);

      return `
        <div class="egg-card ${isDiscovered ? 'discovered' : ''}" data-egg="${egg.id}">
          <div class="egg-header">
            <span class="egg-emoji">${egg.emoji}</span>
            <div class="egg-info">
              <h3 class="egg-title">${egg.title}</h3>
              <span class="egg-category">${egg.category}</span>
            </div>
            <div class="egg-actions">
              <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-egg="${egg.id}">
                ${isFavorite ? '⭐' : '☆'}
              </button>
            </div>
          </div>

          <div class="egg-content">
            ${isDiscovered ? `
              <p class="egg-description">${egg.description}</p>
              <p class="egg-location">
                <span class="location-icon">📍</span>
                <span class="location-text">${egg.location}</span>
              </p>
              <div class="egg-difficulty">
                ${'🌟'.repeat(egg.difficulty)}
                <span class="difficulty-text">难度 ${egg.difficulty}/3</span>
              </div>
            ` : `
              <div class="egg-hidden">
                <span class="hidden-icon">🔒</span>
                <span class="hidden-text">尚未发现</span>
                <button class="discover-btn" data-egg="${egg.id}">发现彩蛋!</button>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');

    if (eggs.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🥚</span>
          <p class="empty-text">没有符合条件的彩蛋</p>
        </div>
      `;
    }

    // 添加事件监听
    container.querySelectorAll('.discover-btn').forEach(btn => {
      btn.addEventListener('click', () => discoverEgg(btn.dataset.egg));
    });

    container.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleFavorite(btn.dataset.egg));
    });

    updateStats();
  }

  // 发现彩蛋
  function discoverEgg(eggId) {
    if (eggGuideState.discovered.includes(eggId)) return;

    eggGuideState.discovered.push(eggId);
    localStorage.setItem('zootopiaEggsDiscovered', JSON.stringify(eggGuideState.discovered));

    // 查找彩蛋信息
    let egg = null;
    for (const category in easterEggs) {
      egg = easterEggs[category].find(e => e.id === eggId);
      if (egg) break;
    }

    if (egg) {
      showDiscoveryNotification(egg);
    }

    renderEggs();
  }

  // 切换收藏
  function toggleFavorite(eggId) {
    const index = eggGuideState.favorites.indexOf(eggId);
    if (index > -1) {
      eggGuideState.favorites.splice(index, 1);
    } else {
      eggGuideState.favorites.push(eggId);
    }
    localStorage.setItem('zootopiaEggsFavorites', JSON.stringify(eggGuideState.favorites));
    renderEggs();
  }

  // 显示发现通知
  function showDiscoveryNotification(egg) {
    const notification = document.getElementById('eggDiscoveryNotification');
    const content = document.getElementById('eggNotificationContent');

    if (!notification || !content) return;

    content.innerHTML = `
      <div class="discovery-animation">
        <div class="discovery-icon">${egg.emoji}</div>
        <div class="discovery-title">发现新彩蛋！</div>
        <div class="discovery-egg-name">${egg.title}</div>
        <div class="discovery-confetti">🎉🎊🥚</div>
      </div>
    `;

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);
  }

  // 更新统计
  function updateStats() {
    const totalEggs = Object.values(easterEggs).flat().length;
    const discoveredEl = document.getElementById('discoveredCount');
    const totalEl = document.getElementById('totalCount');
    const favoriteEl = document.getElementById('favoriteCount');

    if (discoveredEl) discoveredEl.textContent = eggGuideState.discovered.length;
    if (totalEl) totalEl.textContent = totalEggs;
    if (favoriteEl) favoriteEl.textContent = eggGuideState.favorites.length;
  }

  // 切换分类
  function switchCategory(category) {
    eggGuideState.currentCategory = category;

    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });

    renderEggs();
  }

  // 切换筛选器
  function switchFilter(filter) {
    eggGuideState.filter = filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    renderEggs();
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('eggGuidePanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#egg-guide-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'egg-guide-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-egg-guide {
        position: fixed;
        bottom: 180px;
        right: 20px;
        z-index: 9995;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .egg-guide-toggle {
        background: linear-gradient(135deg, #FDCB6E, #E17055);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(253, 203, 110, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .egg-guide-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(253, 203, 110, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: eggWiggle 2s ease infinite;
      }

      @keyframes eggWiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .egg-guide-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 85vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        background: linear-gradient(135deg, #FDCB6E, #E17055);
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

      /* 统计栏 */
      .stats-bar {
        display: flex;
        background: rgba(253, 203, 110, 0.1);
        padding: 12px 15px;
        gap: 15px;
      }

      .stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }

      .stat-icon {
        font-size: 20px;
      }

      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #E17055;
      }

      .stat-label {
        font-size: 10px;
        color: #636E72;
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
        padding: 8px 6px;
        border: none;
        background: #F8F9FA;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        transition: all 0.3s ease;
      }

      .category-tab:hover {
        background: #ECF0F1;
      }

      .category-tab.active {
        background: linear-gradient(135deg, #FDCB6E, #E17055);
        color: white;
      }

      .tab-emoji {
        font-size: 18px;
      }

      .tab-text {
        font-size: 10px;
        font-weight: bold;
      }

      .tab-count {
        font-size: 9px;
        opacity: 0.8;
      }

      /* 筛选器 */
      .filter-bar {
        display: flex;
        padding: 10px 15px;
        gap: 8px;
        background: #FAFAFA;
      }

      .filter-btn {
        flex: 1;
        padding: 6px 10px;
        border: 1px solid #ECF0F1;
        background: white;
        border-radius: 20px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .filter-btn:hover {
        background: #F8F9FA;
      }

      .filter-btn.active {
        background: linear-gradient(135deg, #FDCB6E, #E17055);
        border-color: transparent;
        color: white;
      }

      /* 彩蛋容器 */
      .eggs-container {
        padding: 15px;
        overflow-y: auto;
        max-height: 400px;
      }

      /* 彩蛋卡片 */
      .egg-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .egg-card:hover {
        border-color: #FDCB6E;
        box-shadow: 0 4px 12px rgba(253, 203, 110, 0.2);
      }

      .egg-card.discovered {
        border-color: #00B894;
        background: linear-gradient(135deg, rgba(0, 184, 148, 0.05), transparent);
      }

      .egg-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: #F8F9FA;
      }

      .egg-emoji {
        font-size: 28px;
      }

      .egg-info {
        flex: 1;
      }

      .egg-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 4px 0;
      }

      .egg-category {
        font-size: 10px;
        color: #636E72;
        background: white;
        padding: 2px 8px;
        border-radius: 10px;
      }

      .favorite-btn {
        width: 32px;
        height: 32px;
        border: 2px solid #ECF0F1;
        background: white;
        border-radius: 50%;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .favorite-btn:hover {
        border-color: #FFD700;
        transform: scale(1.1);
      }

      .favorite-btn.active {
        background: #FFD700;
        border-color: #FFD700;
      }

      .egg-content {
        padding: 12px;
      }

      .egg-description {
        font-size: 13px;
        color: #2D3436;
        margin: 0 0 8px 0;
        line-height: 1.5;
      }

      .egg-location {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .egg-difficulty {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
      }

      .difficulty-text {
        color: #636E72;
      }

      /* 隐藏状态 */
      .egg-hidden {
        text-align: center;
        padding: 15px;
      }

      .hidden-icon {
        font-size: 32px;
        display: block;
        margin-bottom: 8px;
      }

      .hidden-text {
        font-size: 12px;
        color: #636E72;
        display: block;
        margin-bottom: 10px;
      }

      .discover-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        background: linear-gradient(135deg, #FDCB6E, #E17055);
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .discover-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(253, 203, 110, 0.4);
      }

      /* 空状态 */
      .empty-state {
        text-align: center;
        padding: 40px 20px;
      }

      .empty-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 12px;
        opacity: 0.5;
      }

      .empty-text {
        font-size: 14px;
        color: #636E72;
      }

      /* 发现通知 */
      .egg-discovery-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 10000;
      }

      .egg-discovery-notification.show {
        opacity: 1;
        pointer-events: auto;
      }

      .discovery-animation {
        padding: 25px;
        text-align: center;
      }

      .discovery-icon {
        font-size: 64px;
        display: block;
        margin-bottom: 15px;
        animation: bounce 0.5s ease;
      }

      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }

      .discovery-title {
        font-size: 18px;
        font-weight: bold;
        color: #FDCB6E;
        margin-bottom: 10px;
      }

      .discovery-egg-name {
        font-size: 14px;
        color: #2D3436;
        margin-bottom: 15px;
      }

      .discovery-confetti {
        font-size: 20px;
      }

      /* 滚动条 */
      .eggs-container::-webkit-scrollbar {
        width: 4px;
      }

      .eggs-container::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .eggs-container::-webkit-scrollbar-thumb {
        background: #FDCB6E;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-egg-guide {
          right: 10px;
          bottom: 160px;
        }

        .egg-guide-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initEggGuide() {
    injectStyles();

    const guide = createEggGuidePanel();
    document.body.appendChild(guide);

    // 切换按钮
    document.getElementById('eggGuideToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('eggGuidePanel').style.display = 'none';
    };

    // 分类标签
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => switchCategory(tab.dataset.category));
    });

    // 筛选器
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => switchFilter(btn.dataset.filter));
    });

    // 初始渲染
    renderEggs();

    // 导出全局函数
    window.zootopiaEggGuide = {
      open: () => {
        document.getElementById('eggGuidePanel').style.display = 'block';
      },
      discover: discoverEgg,
      showCategory: (category) => switchCategory(category)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEggGuide);
  } else {
    initEggGuide();
  }
})();
