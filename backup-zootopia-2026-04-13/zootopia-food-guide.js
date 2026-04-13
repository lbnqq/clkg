/**
 * 疯狂动物城主题 - 美食指南系统
 * Zootopia Theme - Food Guide System
 * | 动物城餐厅和美食推荐
 */

(function() {
  'use strict';

  // 动物城美食数据库
  const zootopiaFood = {
    // 快餐
    fastFood: [
      {
        id: 'bug_burga',
        name: 'Bug Burga',
        nameEn: '昆虫汉堡',
        icon: '🍔',
        category: '快餐',
        targetAudience: '食肉动物',
        color: '#E74C3C',
        rating: 4.8,
        priceRange: '¥¥',
        description: '动物城最受欢迎的快餐连锁店，专为食肉动物设计',
        specialties: [
          { name: '蠕虫汉堡包', price: 15, icon: '🍔', description: '新鲜蠕虫肉，蛋白质丰富' },
          { name: '炸蟋蟀薯片', price: 8, icon: '🍟', description: '酥脆蟋蟀，昆虫界薯片' },
          { name: '蝉汉堡', price: 18, icon: '🪲', description: '季节性蝉肉，鲜美多汁' },
          { name: '蚂蚱奶昔', price: 12, icon: '🥤', description: '什锦昆虫奶昔' },
          { name: '炸虫子套餐', price: 25, icon: '🍱️', description: '全家分享装' }
        ],
        locations: ['撒哈拉广场店', '市中心店', '雨林区分店'],
        openHours: '06:00 - 23:00',
        tags: ['快餐', '昆虫', '蛋白质', '热门']
      },
      {
        id: 'jumbeaux_cafe',
        name: '姜贝奥咖啡馆',
        nameEn: "Jumbeaux's Cafe",
        icon: '🍦',
        category: '咖啡馆',
        targetAudience: '全动物',
        color: '#F39C12',
        rating: 4.9,
        priceRange: '¥¥',
        description: '朱迪和尼克相遇的地方，爪爪冰棍的发源地',
        specialties: [
          { name: '爪爪冰棍', price: 5, icon: '🍦', description: '尼克招牌冰棍' },
          { name: 'Jumbo Pop', price: 15, icon: '🍭', description: '巨型冰棍，适合分享' },
          { name: '胡萝卜蛋糕', price: 12, icon: '🥕', description: '朱迪的最爱' },
          { name: '昆虫咖啡', price: 8, icon: '☕', description: '独特昆虫风味' },
          { name: '甜甜圈', price: 6, icon: '🍩', description: '豹警官的最爱' }
        ],
        locations: ['市中心店'],
        openHours: '07:00 - 22:00',
        tags: ['甜点', '咖啡', '冰品', '经典场景']
      }
    ],

    // 正餐
    restaurants: [
      {
        id: 'mystic_spring_oasis',
        name: '神秘绿洲',
        nameEn: 'Mystic Spring Oasis',
        icon: '🌿',
        category: '雨林区料理',
        targetAudience: '全动物',
        color: '#27AE60',
        rating: 4.7,
        priceRange: '¥¥¥',
        description: '雨林区特色餐厅，提供热带植物料理',
        specialties: [
          { name: '雨林沙拉', price: 35, icon: '🥗', description: '新鲜热带蔬菜' },
          { name: '水果拼盘', price: 28, icon: '🍇', description: '季节性热带水果' },
          { name: '椰子汤', price: 22, icon: '🥥', description: '清甜椰子汤' },
          { name: '昆虫烤串', price: 45, icon: '🍢', description: '精选昆虫烤制' }
        ],
        locations: ['雨林区'],
        openHours: '11:00 - 22:00',
        tags: ['健康', '素食', '雨林特色']
      },
      {
        id: 'tundra_grill',
        name: '冰川烧烤',
        nameEn: 'Tundra Grill',
        icon: '🥩',
        category: '冰川镇料理',
        targetAudience: '食肉动物',
        color: '#3498DB',
        rating: 4.6,
        priceRange: '¥¥¥',
        description: '冰川镇特色烧烤，温暖你的胃',
        specialties: [
          { name: '烤鱼排', price: 68, icon: '🐟', description: '冰川新鲜鱼类' },
          { name: '昆虫烤肉', price: 55, icon: '🍖', description: '优质昆虫蛋白' },
          { name: '热汤', price: 18, icon: '🍲', description: '驱寒暖身' },
          { name: '冰川冰淇淋', price: 15, icon: '🍨', description: '天然冰制' }
        ],
        locations: ['冰川镇'],
        openHours: '11:00 - 23:00',
        tags: ['烧烤', '温暖', '肉类']
      },
      {
        id: 'sahara_spice',
        name: '撒哈拉香料',
        nameEn: 'Sahara Spice House',
        icon: '🌶️',
        category: '中东风味',
        targetAudience: '全动物',
        color: '#E67E22',
        rating: 4.8,
        priceRange: '¥¥¥',
        description: '撒哈拉广场特色香料料理',
        specialties: [
          { name: '香料昆虫卷', price: 38, icon: '🌯', description: '特色香料包裹' },
          { name: '沙漠烤肉', price: 58, icon: '🍗', description: '秘制香料腌制' },
          { name: '椰枣甜点', price: 16, icon: '🍯', description: '天然椰枣' },
          { name: '香料茶', price: 10, icon: '🍵', description: '暖胃香料茶' }
        ],
        locations: ['撒哈拉广场'],
        openHours: '10:00 - 23:00',
        tags: ['香料', '中东风味', '烤肉']
      }
    ],

    // 小吃和街头美食
    streetFood: [
      {
        id: 'pawpsicle_cart',
        name: 'Pawpsicle推车',
        nameEn: "Nick's Pawpsicle Cart",
        icon: '🛒',
        category: '街头小吃',
        targetAudience: '全动物',
        color: '#9B59B6',
        rating: 5.0,
        priceRange: '¥',
        description: '尼克的流动Pawpsicle推车',
        specialties: [
          { name: '爪爪冰棍', price: 2, icon: '🍦', description: '经典口味' },
          { name: '彩虹冰棍', price: 3, icon: '🌈', description: '多种口味' }
        ],
        locations: ['市中心街头', '公园入口'],
        openHours: '不定时',
        tags: ['街头', '便宜', '经典']
      },
      {
        id: 'bunny_burrow_farm',
        name: '兔窝镇农场直供',
        nameEn: 'Bunnyburrow Farm Fresh',
        icon: '🥕',
        category: '农产品',
        targetAudience: '食草动物',
        color: '#2ECC71',
        rating: 4.9,
        priceRange: '¥',
        description: '新鲜蔬菜和水果直供',
        specialties: [
          { name: '有机胡萝卜', price: 5, icon: '🥕', description: '兔家农场直供' },
          { name: '新鲜蔬菜箱', price: 25, icon: '📦', description: '一周蔬菜' },
          { name: '果酱', price: 12, icon: '🍓', description: '自制果酱' }
        ],
        locations: ['市中心市场', '社区配送'],
        openHours: '06:00 - 18:00',
        tags: ['有机', '新鲜', '健康']
      }
    ],

    // 甜点和饮品
    desserts: [
      {
        id: 'gazelle_sweets',
        name: 'Gazelle甜点屋',
        nameEn: "Gazelle's Sweet Shop",
        icon: '🧁',
        category: '甜品',
        targetAudience: '全动物',
        color: '#E91E63',
        rating: 4.8,
        priceRange: '¥¥',
        description: 'Gazelle亲自设计的甜点店',
        specialties: [
          { name: 'Try Everything蛋糕', price: 35, icon: '🎂', description: '主题曲主题蛋糕' },
          { name: '老虎饼干', price: 8, icon: '🍪', description: '老虎伴舞造型' },
          { name: '彩虹马卡龙', price: 18, icon: '🌈', description: '六色马卡龙' },
          { name: 'Gazelle奶昔', price: 20, icon: '🥤', description: '明星特调' }
        ],
        locations: ['市中心店'],
        openHours: '10:00 - 22:00',
        tags: ['甜品', '明星', '精美']
      }
    ]
  };

  // 美食分类
  const foodCategories = {
    all: '🍽️ 全部',
    fastFood: '🍔 快餐',
    restaurants: '🍽️ 正餐',
    streetFood: '🛒 街头小吃',
    desserts: '🧁 甜品'
  };

  // 当前状态
  let guideState = {
    selectedCategory: 'all',
    selectedRestaurant: null,
    cart: [],
    favorites: []
  };

  // 创建美食指南
  function createFoodGuide() {
    const guide = document.createElement('div');
    guide.className = 'zootopia-food-guide';
    guide.innerHTML = `
      <!-- 切换按钮 -->
      <div class="guide-toggle" id="guideToggle">
        <span class="toggle-icon">🍽️</span>
        <span class="toggle-text">美食指南</span>
      </div>

      <!-- 指南面板 -->
      <div class="guide-panel" id="guidePanel">
        <!-- 头部 -->
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🍕</span>
            <span class="title-text">动物城美食指南</span>
          </div>
          <button class="close-btn" id="closeGuideBtn">×</button>
        </div>

        <!-- 分类筛选 -->
        <div class="category-filter">
          <div class="filter-title">美食分类</div>
          <div class="filter-options" id="categoryFilter"></div>
        </div>

        <!-- 餐厅列表 -->
        <div class="restaurants-container">
          <div class="restaurants-header">
            <span class="header-text">餐厅列表</span>
            <span class="restaurant-count" id="restaurantCount">0 家餐厅</span>
          </div>
          <div class="restaurants-grid" id="restaurantsGrid"></div>
        </div>

        <!-- 餐厅详情 -->
        <div class="restaurant-detail" id="restaurantDetail" style="display: none;">
          <button class="back-btn" id="backToListBtn">← 返回列表</button>
          <div class="detail-content" id="detailContent"></div>
        </div>
      </div>
    `;

    return guide;
  }

  // 渲染分类筛选
  function renderCategoryFilter() {
    const filterContainer = document.getElementById('categoryFilter');
    if (!filterContainer) return;

    filterContainer.innerHTML = Object.entries(foodCategories).map(([key, label]) => `
      <div class="filter-option ${key === guideState.selectedCategory ? 'active' : ''}" data-category="${key}">
        ${label}
      </div>
    `).join('');

    // 添加点击事件
    filterContainer.querySelectorAll('.filter-option').forEach(option => {
      option.onclick = () => {
        const category = option.dataset.category;
        guideState.selectedCategory = category;
        renderCategoryFilter();
        renderRestaurantsGrid();
      };
    });
  }

  // 渲染餐厅列表
  function renderRestaurantsGrid() {
    const gridContainer = document.getElementById('restaurantsGrid');
    const countElement = document.getElementById('restaurantCount');

    if (!gridContainer) return;

    // 收集所有餐厅
    let allRestaurants = [];
    if (guideState.selectedCategory === 'all') {
      allRestaurants = [
        ...zootopiaFood.fastFood,
        ...zootopiaFood.restaurants,
        ...zootopiaFood.streetFood,
        ...zootopiaFood.desserts
      ];
    } else {
      allRestaurants = zootopiaFood[guideState.selectedCategory] || [];
    }

    if (countElement) {
      countElement.textContent = `${allRestaurants.length} 家餐厅`;
    }

    gridContainer.innerHTML = allRestaurants.map(restaurant => `
      <div class="restaurant-card" data-id="${restaurant.id}">
        <div class="card-header" style="background: linear-gradient(135deg, ${restaurant.color}, ${restaurant.color}dd);">
          <div class="card-icon">${restaurant.icon}</div>
          <div class="card-info">
            <div class="card-name">${restaurant.name}</div>
            <div class="card-name-en">${restaurant.nameEn}</div>
          </div>
          <div class="card-rating">
            <span class="rating-star">⭐</span>
            <span class="rating-value">${restaurant.rating}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-description">${restaurant.description}</div>
          <div class="card-meta">
            <span class="meta-item">🎯 ${restaurant.targetAudience}</span>
            <span class="meta-item">💰 ${restaurant.priceRange}</span>
          </div>
          <div class="card-tags">
            ${restaurant.tags.slice(0, 3).map(tag => `
              <span class="tag">${tag}</span>
            `).join('')}
          </div>
          <button class="view-menu-btn">查看菜单</button>
        </div>
      </div>
    `).join('');

    // 添加点击事件
    gridContainer.querySelectorAll('.restaurant-card').forEach(card => {
      const menuBtn = card.querySelector('.view-menu-btn');
      menuBtn.onclick = (e) => {
        e.stopPropagation();
        const restaurantId = card.dataset.id;
        showRestaurantDetail(restaurantId);
      };
    });
  }

  // 显示餐厅详情
  function showRestaurantDetail(restaurantId) {
    // 查找餐厅
    let restaurant = null;
    Object.values(zootopiaFood).forEach(category => {
      const found = category.find(r => r.id === restaurantId);
      if (found) restaurant = found;
    });

    if (!restaurant) return;

    const detailContainer = document.getElementById('restaurantDetail');
    const listContainer = document.querySelector('.restaurants-container');
    const contentContainer = document.getElementById('detailContent');

    if (!detailContainer || !contentContainer) return;

    // 显示详情，隐藏列表
    detailContainer.style.display = 'block';
    listContainer.style.display = 'none';

    contentContainer.innerHTML = `
      <div class="detail-header" style="background: linear-gradient(135deg, ${restaurant.color}, ${restaurant.color}dd);">
        <div class="detail-icon">${restaurant.icon}</div>
        <div class="detail-info">
          <div class="detail-name">${restaurant.name}</div>
          <div class="detail-name-en">${restaurant.nameEn}</div>
          <div class="detail-rating">
            <span class="rating-stars">${'⭐'.repeat(Math.floor(restaurant.rating))}</span>
            <span class="rating-value">${restaurant.rating}</span>
          </div>
        </div>
      </div>

      <div class="detail-description">${restaurant.description}</div>

      <div class="detail-meta">
        <div class="meta-row">
          <span class="meta-label">🎯 适合人群</span>
          <span class="meta-value">${restaurant.targetAudience}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">💰 价格区间</span>
          <span class="meta-value">${restaurant.priceRange}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">🕐 营业时间</span>
          <span class="meta-value">${restaurant.openHours}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">📍 分店地址</span>
          <span class="meta-value">${restaurant.locations.join(', ')}</span>
        </div>
      </div>

      <div class="detail-tags">
        ${restaurant.tags.map(tag => `
          <span class="tag">${tag}</span>
        `).join('')}
      </div>

      <div class="detail-menu">
        <div class="menu-title">🍽️ 招牌菜品</div>
        <div class="menu-items">
          ${restaurant.specialties.map(item => `
            <div class="menu-item">
              <div class="item-icon">${item.icon}</div>
              <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
              </div>
              <div class="item-price">¥${item.price}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="detail-actions">
        <button class="action-btn favorite-btn" data-id="${restaurant.id}">
          <span>❤️</span>
          <span>收藏</span>
        </button>
        <button class="action-btn share-btn" data-id="${restaurant.id}">
          <span>📤</span>
          <span>分享</span>
        </button>
        <button class="action-btn navigate-btn" data-id="${restaurant.id}">
          <span>🗺️</span>
          <span>导航</span>
        </button>
      </div>
    `;

    // 返回按钮事件
    document.getElementById('backToListBtn').onclick = () => {
      detailContainer.style.display = 'none';
      listContainer.style.display = 'block';
    };

    // 操作按钮事件
    contentContainer.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.onclick = () => toggleFavorite(btn.dataset.id);
    });
  }

  // 切换收藏
  function toggleFavorite(restaurantId) {
    const index = guideState.favorites.indexOf(restaurantId);
    if (index > -1) {
      guideState.favorites.splice(index, 1);
      showToast('已取消收藏');
    } else {
      guideState.favorites.push(restaurantId);
      showToast('已添加收藏 ❤️');
    }
  }

  // 显示提示
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'food-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px 30px;
      border-radius: 10px;
      z-index: 10001;
      animation: toastFadeIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // 切换面板
  function togglePanel() {
    const guide = document.querySelector('.zootopia-food-guide');
    const panel = document.getElementById('guidePanel');

    guide.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#food-guide-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'food-guide-styles';
    styles.textContent = `
      /* 美食指南容器 */
      .zootopia-food-guide {
        position: fixed;
        bottom: 350px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .guide-toggle {
        background: linear-gradient(135deg, #E67E22, #D35400);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(230, 126, 34, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .guide-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(230, 126, 34, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: foodBounce 2s ease infinite;
      }

      @keyframes foodBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 面板 */
      .guide-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 450px;
        max-height: 700px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }

      .guide-panel.visible {
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
        background: linear-gradient(135deg, #E67E22, #D35400);
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

      /* 分类筛选 */
      .category-filter {
        padding: 15px 20px;
        border-bottom: 1px solid #ECF0F1;
      }

      .filter-title {
        font-size: 13px;
        font-weight: bold;
        color: #636E72;
        margin-bottom: 10px;
      }

      .filter-options {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .filter-option {
        padding: 6px 12px;
        background: #F8F9FA;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .filter-option.active {
        background: #E67E22;
        color: white;
      }

      .filter-option:hover:not(.active) {
        background: #ECF0F1;
      }

      /* 餐厅列表 */
      .restaurants-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        max-height: 500px;
      }

      .restaurants-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .header-text {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
      }

      .restaurant-count {
        font-size: 12px;
        color: #636E72;
      }

      .restaurants-grid {
        display: grid;
        gap: 15px;
      }

      .restaurant-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .restaurant-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }

      .card-header {
        padding: 15px;
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .card-icon {
        font-size: 32px;
      }

      .card-info {
        flex: 1;
      }

      .card-name {
        font-size: 16px;
        font-weight: bold;
      }

      .card-name-en {
        font-size: 11px;
        opacity: 0.9;
      }

      .card-rating {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 14px;
        font-weight: bold;
      }

      .card-body {
        padding: 15px;
      }

      .card-description {
        font-size: 13px;
        color: #636E72;
        line-height: 1.5;
        margin-bottom: 10px;
      }

      .card-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
        font-size: 11px;
        color: #636E72;
      }

      .card-tags {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .tag {
        padding: 3px 8px;
        background: #F8F9FA;
        border-radius: 10px;
        font-size: 10px;
        color: #636E72;
      }

      .view-menu-btn {
        width: 100%;
        background: linear-gradient(135deg, #E67E22, #D35400);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .view-menu-btn:hover {
        transform: scale(1.02);
      }

      /* 餐厅详情 */
      .restaurant-detail {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        max-height: 500px;
      }

      .back-btn {
        background: #F8F9FA;
        border: none;
        border-radius: 10px;
        padding: 10px 15px;
        font-size: 13px;
        font-weight: bold;
        color: #636E72;
        cursor: pointer;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .back-btn:hover {
        background: #ECF0F1;
      }

      .detail-header {
        border-radius: 15px;
        padding: 20px;
        color: white;
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }

      .detail-icon {
        font-size: 48px;
      }

      .detail-info {
        flex: 1;
      }

      .detail-name {
        font-size: 20px;
        font-weight: bold;
      }

      .detail-name-en {
        font-size: 12px;
        opacity: 0.9;
        margin-bottom: 5px;
      }

      .detail-rating {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .rating-stars {
        font-size: 14px;
      }

      .rating-value {
        font-weight: bold;
      }

      .detail-description {
        font-size: 14px;
        color: #636E72;
        line-height: 1.6;
        margin-bottom: 15px;
      }

      .detail-meta {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .meta-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 13px;
      }

      .meta-label {
        color: #636E72;
        font-weight: 600;
      }

      .meta-value {
        color: #2D3436;
        font-weight: bold;
      }

      .detail-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 15px;
      }

      .detail-tags .tag {
        padding: 5px 12px;
        font-size: 11px;
      }

      .detail-menu {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .menu-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
      }

      .menu-items {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        background: white;
        border-radius: 10px;
      }

      .item-icon {
        font-size: 24px;
      }

      .item-info {
        flex: 1;
      }

      .item-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .item-description {
        font-size: 11px;
        color: #636E72;
      }

      .item-price {
        font-size: 14px;
        font-weight: bold;
        color: #E67E22;
      }

      .detail-actions {
        display: flex;
        gap: 10px;
      }

      .action-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        transition: all 0.3s ease;
      }

      .favorite-btn {
        background: linear-gradient(135deg, #E91E63, #C2185B);
        color: white;
      }

      .share-btn {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
      }

      .navigate-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .action-btn:hover {
        transform: scale(1.05);
      }

      /* 提示动画 */
      @keyframes toastFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes toastFadeOut {
        to { opacity: 0; }
      }

      /* 滚动条 */
      .restaurants-container::-webkit-scrollbar,
      .restaurant-detail::-webkit-scrollbar {
        width: 6px;
      }

      .restaurants-container::-webkit-scrollbar-track,
      .restaurant-detail::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .restaurants-container::-webkit-scrollbar-thumb,
      .restaurant-detail::-webkit-scrollbar-thumb {
        background: #E67E22;
        border-radius: 3px;
      }

      /* 响应式 */
      @media (max-width: 500px) {
        .zootopia-food-guide {
          right: 10px;
          bottom: 330px;
        }

        .guide-panel {
          width: calc(100vw - 20px);
          max-width: 430px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initFoodGuide() {
    injectStyles();

    const guide = createFoodGuide();
    document.body.appendChild(guide);

    // 切换按钮
    document.getElementById('guideToggle').onclick = togglePanel;
    document.getElementById('closeGuideBtn').onclick = togglePanel;

    // 初始化内容
    renderCategoryFilter();
    renderRestaurantsGrid();

    // 导出全局函数
    window.zootopiaFoodGuide = {
      show: () => {
        const guide = document.querySelector('.zootopia-food-guide');
        if (!guide.classList.contains('expanded')) {
          togglePanel();
        }
      },
      hide: () => {
        const guide = document.querySelector('.zootopia-food-guide');
        if (guide.classList.contains('expanded')) {
          togglePanel();
        }
      },
      getRestaurant: (id) => {
        let restaurant = null;
        Object.values(zootopiaFood).forEach(category => {
          const found = category.find(r => r.id === id);
          if (found) restaurant = found;
        });
        return restaurant;
      }
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFoodGuide);
  } else {
    initFoodGuide();
  }
})();
