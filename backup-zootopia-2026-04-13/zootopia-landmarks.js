/**
 * 疯狂动物城主题 - 地标建筑展示系统
 * Zootopia Theme - Landmarks Showcase System
 * | 动物城著名地标和建筑
 */

(function() {
  'use strict';

  // 动物城地标数据库
  const zootopiaLandmarks = {
    // 中央区域
    downtown: {
      name: '市中心区',
      nameEn: 'Downtown District',
      icon: '🏙️',
      color: '#3498DB',
      description: '动物城的繁华心脏，摩天大楼林立',
      landmarks: [
        {
          id: 'city_hall',
          name: '市政厅',
          icon: '🏛️',
          height: '120米',
          built: '1990年',
          style: '新古典主义',
          description: '动物城市政府所在地，市长办公室',
          features: ['希腊式柱廊', '宏伟穹顶', '金狮雕像'],
          significance: '政治中心，重大决策场所'
        },
        {
          id: 'zpd_headquarters',
          name: 'ZPD警察总局',
          icon: '👮',
          height: '80米',
          built: '1985年',
          style: '现代主义',
          description: '动物城警察局总部，维护城市安全',
          features: ['警徽装饰', '透明玻璃幕墙', '直升机停机坪'],
          significance: '朱迪和尼克工作的地方'
        },
        {
          id: 'central_station',
          name: '中央车站',
          icon: '🚉',
          height: '150米',
          built: '1975年',
          style: '工业风',
          description: '全城最大交通枢纽，日客流量50,000+',
          features: ['12个站台', '玻璃穹顶', '地下通道'],
          significance: '朱迪第一次来到动物城的地方'
        },
        {
          id: 'skyscraper_row',
          name: '摩天大楼群',
          icon: '🏢',
          height: '200-300米',
          built: '2000-2015年',
          style: '后现代主义',
          description: '动物城天际线，充满动物元素设计',
          features: ['虎纹建筑', '斑点装饰', '爪印造型'],
          significance: '城市地标，现代建筑杰作'
        }
      ]
    },

    // 撒哈拉广场
    sahara: {
      name: '撒哈拉广场',
      nameEn: 'Sahara Square',
      icon: '☀️',
      color: '#E67E22',
      description: '沙漠风情区，适应干旱环境动物',
      landmarks: [
        {
          id: 'sahara_towers',
          name: '撒哈拉双子塔',
          icon: '🕌',
          height: '180米',
          built: '2005年',
          style: '伊斯兰风格',
          description: '红色条纹装饰，灵感来自虎纹',
          features: ['虎纹玻璃幕墙', '沙漠绿化', '观景平台'],
          significance: '撒哈拉广场标志性建筑'
        },
        {
          id: 'desert_resort',
          name: '绿洲度假村',
          icon: '🏨',
          height: '60米',
          built: '2010年',
          style: '度假村风格',
          description: '奢华度假酒店，泉水泳池环绕',
          features: ['棕榈树装饰', '沙地SPA', '星空圆顶'],
          significance: '热门度假胜地'
        },
        {
          id: 'bug_burga_flagship',
          name: 'Bug Burga旗舰店',
          icon: '🍔',
          height: '40米',
          built: '2008年',
          style: '快餐连锁风格',
          description: '动物城最受欢迎快餐店',
          features: ['巨型昆虫雕像', '儿童乐园', '得来速通道'],
          significance: '食肉动物的最爱'
        }
      ]
    },

    // 冰川镇
    tundratown: {
      name: '冰川镇',
      nameEn: 'Tundratown',
      icon: '❄️',
      color: '#3498DB',
      description: '冰雪世界，适应寒冷环境动物',
      landmarks: [
        {
          id: 'ice_hotel',
          name: '冰雪大酒店',
          icon: '🏨',
          height: '100米',
          built: '2002年',
          style: '冰雪风格',
          description: '完全由冰块建造的酒店',
          features: ['冰雕装饰', '冰雪滑梯', '恒温房间'],
          significance: '冰川镇地标建筑'
        },
        {
          id: 'ski_resort',
          name: '北极滑雪场',
          icon: '🎿',
          height: '800米（山）',
          built: '1995年',
          style: '山地建筑',
          description: '全年可滑雪的度假胜地',
          features: ['人工造雪', '滑雪学校', '温泉中心'],
          significance: '最受欢迎冬季运动场所'
        },
        {
          id: 'ice_palace',
          name: '冰晶宫殿',
          icon: '🏰',
          height: '70米',
          built: '2008年',
          style: '冰晶风格',
          description: '精美的冰雕建筑，宛如童话城堡',
          features: ['彩色冰雕', '音乐喷泉', '冰雕花园'],
          significance: '婚纱照热门地点'
        }
      ]
    },

    // 雨林区
    rainforest: {
      name: '雨林区',
      nameEn: 'Rainforest District',
      icon: '🌴',
      color: '#27AE60',
      description: '热带雨林环境，适应温暖潮湿动物',
      landmarks: [
        {
          id: 'tree_towers',
          name: '树屋群',
          icon: '🌳',
          height: '50-80米',
          built: '1998年',
          style: '树屋建筑',
          description: '建在巨树上的房屋群',
          features: ['藤蔓通道', '空中桥梁', '生态设计'],
          significance: '雨林区特色居住方式'
        },
        {
          id: 'botanical_garden',
          name: '热带植物园',
          icon: '🌺',
          height: '30米',
          built: '2003年',
          style: '生态建筑',
          description: '收集全球热带植物的植物园',
          features: ['巨型温室', '蝴蝶花园', '雨林生态展示'],
          significance: '教育和旅游胜地'
        },
        {
          id: 'waterfall_complex',
          name: '瀑布商业中心',
          icon: '💦',
          height: '60米',
          built: '2012年',
          style: '现代生态风格',
          description: '环绕巨大瀑布的商业中心',
          features: ['水景购物', '瀑布餐厅', '雨物体验'],
          significance: '独特购物体验'
        }
      ]
    },

    // 小啮齿动物镇
    littleRodentia: {
      name: '小啮齿动物镇',
      nameEn: 'Little Rodentia',
      icon: '🐭',
      color: '#95A5A6',
      description: '微型城市，专门为小型动物设计',
      landmarks: [
        {
          id: 'tiny_city_hall',
          name: '微型市政厅',
          icon: '🏛️',
          height: '15米',
          built: '2005年',
          style: '迷你古典主义',
          description: '小型但功能齐全的市政厅',
          features: ['迷你雕像', '小型会议室', '宠物友好'],
          significance: '小动物的市政中心'
        },
        {
          id: 'mouse_mall',
          name: '老鼠购物中心',
          icon: '🛍️',
          height: '20米',
          built: '2010年',
          style: '迷你现代主义',
          description: '专为小型动物设计的购物城',
          features: ['微型店铺', '奶酪专卖店', '小家具店'],
          significance: '小动物的购物天堂'
        }
      ]
    }
  };

  // 当前状态
  let landmarksState = {
    selectedDistrict: 'downtown',
    selectedLandmark: null
  };

  // 创建地标展示系统
  function createLandmarksShowcase() {
    const showcase = document.createElement('div');
    showcase.className = 'zootopia-landmarks-showcase';
    showcase.innerHTML = `
      <!-- 切换按钮 -->
      <div class="landmarks-toggle" id="landmarksToggle">
        <span class="toggle-icon">🏛️</span>
        <span class="toggle-text">地标建筑</span>
      </div>

      <!-- 展示面板 -->
      <div class="landmarks-panel" id="landmarksPanel">
        <!-- 头部 -->
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🏰</span>
            <span class="title-text">动物城地标建筑</span>
          </div>
          <button class="close-btn" id="closeLandmarksBtn">×</button>
        </div>

        <!-- 地区选择 -->
        <div class="district-selector">
          <div class="selector-title">选择地区</div>
          <div class="district-tabs" id="districtTabs"></div>
        </div>

        <!-- 地区信息 -->
        <div class="district-info" id="districtInfo"></div>

        <!-- 地标列表 -->
        <div class="landmarks-list">
          <div class="list-header">
            <span class="header-text">地标建筑</span>
            <span class="landmark-count" id="landmarkCount">0 座建筑</span>
          </div>
          <div class="landmarks-grid" id="landmarksGrid"></div>
        </div>

        <!-- 地标详情 -->
        <div class="landmark-detail" id="landmarkDetail" style="display: none;">
          <button class="back-btn" id="backToListBtn">← 返回列表</button>
          <div class="detail-content" id="detailContent"></div>
        </div>
      </div>
    `;

    return showcase;
  }

  // 渲染地区标签
  function renderDistrictTabs() {
    const tabsContainer = document.getElementById('districtTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = Object.entries(zootopiaLandmarks).map(([key, district]) => `
      <div class="district-tab ${key === landmarksState.selectedDistrict ? 'active' : ''}" data-district="${key}">
        <span class="tab-icon">${district.icon}</span>
        <span class="tab-name">${district.name}</span>
      </div>
    `).join('');

    // 添加点击事件
    tabsContainer.querySelectorAll('.district-tab').forEach(tab => {
      tab.onclick = () => {
        const districtKey = tab.dataset.district;
        selectDistrict(districtKey);
      };
    });
  }

  // 选择地区
  function selectDistrict(districtKey) {
    landmarksState.selectedDistrict = districtKey;
    renderDistrictTabs();
    renderDistrictInfo();
    renderLandmarksGrid();
  }

  // 渲染地区信息
  function renderDistrictInfo() {
    const infoContainer = document.getElementById('districtInfo');
    const district = zootopiaLandmarks[landmarksState.selectedDistrict];

    if (!infoContainer || !district) return;

    infoContainer.innerHTML = `
      <div class="district-banner" style="background: linear-gradient(135deg, ${district.color}, ${district.color}dd);">
        <div class="banner-icon">${district.icon}</div>
        <div class="banner-info">
          <div class="banner-name">${district.name}</div>
          <div class="banner-name-en">${district.nameEn}</div>
        </div>
      </div>
      <div class="district-description">${district.description}</div>
    `;
  }

  // 渲染地标列表
  function renderLandmarksGrid() {
    const gridContainer = document.getElementById('landmarksGrid');
    const countElement = document.getElementById('landmarkCount');
    const district = zootopiaLandmarks[landmarksState.selectedDistrict];

    if (!gridContainer || !district) return;

    const landmarks = district.landmarks;

    if (countElement) {
      countElement.textContent = `${landmarks.length} 座建筑`;
    }

    gridContainer.innerHTML = landmarks.map(landmark => `
      <div class="landmark-card" data-id="${landmark.id}">
        <div class="card-icon">${landmark.icon}</div>
        <div class="card-info">
          <div class="card-name">${landmark.name}</div>
          <div class="card-meta">
            <span class="meta-item">📏 ${landmark.height}</span>
            <span class="meta-item">📅 ${landmark.built}</span>
          </div>
        </div>
        <button class="view-detail-btn">查看详情</button>
      </div>
    `).join('');

    // 添加点击事件
    gridContainer.querySelectorAll('.view-detail-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = btn.closest('.landmark-card');
        const landmarkId = card.dataset.id;
        showLandmarkDetail(landmarkId);
      };
    });
  }

  // 显示地标详情
  function showLandmarkDetail(landmarkId) {
    const district = zootopiaLandmarks[landmarksState.selectedDistrict];
    const landmark = district.landmarks.find(l => l.id === landmarkId);

    if (!landmark) return;

    const detailContainer = document.getElementById('landmarkDetail');
    const listContainer = document.querySelector('.landmarks-list');
    const contentContainer = document.getElementById('detailContent');

    if (!detailContainer || !contentContainer) return;

    // 显示详情，隐藏列表
    detailContainer.style.display = 'block';
    listContainer.style.display = 'none';

    contentContainer.innerHTML = `
      <div class="detail-header">
        <div class="detail-icon">${landmark.icon}</div>
        <div class="detail-info">
          <div class="detail-name">${landmark.name}</div>
          <div class="detail-style">${landmark.style}风格</div>
        </div>
        <div class="detail-height">📏 ${landmark.height}</div>
      </div>

      <div class="detail-description">${landmark.description}</div>

      <div class="detail-build">
        <div class="build-info">
          <span class="build-label">建造年份</span>
          <span class="build-value">${landmark.built}</span>
        </div>
        <div class="build-info">
          <span class="build-label">建筑风格</span>
          <span class="build-value">${landmark.style}</span>
        </div>
      </div>

      <div class="detail-features">
        <div class="features-title">✨ 特色</div>
        <div class="features-list">
          ${landmark.features.map(feature => `
            <div class="feature-item">
              <span class="feature-icon">🌟</span>
              <span class="feature-text">${feature}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="detail-significance">
        <div class="significance-title">🎯 重要性</div>
        <div class="significance-text">${landmark.significance}</div>
      </div>

      <div class="detail-actions">
        <button class="action-btn gallery-btn" data-id="${landmark.id}">
          <span>🖼️</span>
          <span>查看图片</span>
        </button>
        <button class="action-btn navigate-btn" data-id="${landmark.id}">
          <span>🗺️</span>
          <span>导航前往</span>
        </button>
      </div>
    `;

    // 返回按钮事件
    document.getElementById('backToListBtn').onclick = () => {
      detailContainer.style.display = 'none';
      listContainer.style.display = 'block';
    };
  }

  // 切换面板
  function togglePanel() {
    const showcase = document.querySelector('.zootopia-landmarks-showcase');
    const panel = document.getElementById('landmarksPanel');

    showcase.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#landmarks-showcase-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'landmarks-showcase-styles';
    styles.textContent = `
      /* 地标展示容器 */
      .zootopia-landmarks-showcase {
        position: fixed;
        bottom: 490px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .landmarks-toggle {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .landmarks-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: landmarkBounce 2s ease infinite;
      }

      @keyframes landmarkBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 面板 */
      .landmarks-panel {
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

      .landmarks-panel.visible {
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
        background: linear-gradient(135deg, #3498DB, #2980B9);
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

      /* 地区选择 */
      .district-selector {
        padding: 15px 20px;
        border-bottom: 1px solid #ECF0F1;
      }

      .selector-title {
        font-size: 13px;
        font-weight: bold;
        color: #636E72;
        margin-bottom: 10px;
      }

      .district-tabs {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .district-tab {
        flex: 1;
        min-width: 80px;
        padding: 10px;
        background: #F8F9FA;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }

      .district-tab:hover {
        background: #ECF0F1;
      }

      .district-tab.active {
        background: white;
        border-color: #3498DB;
        box-shadow: 0 2px 10px rgba(52, 152, 219, 0.2);
      }

      .tab-icon {
        display: block;
        font-size: 20px;
        margin-bottom: 3px;
      }

      .tab-name {
        font-size: 11px;
        font-weight: bold;
        color: #2D3436;
      }

      /* 地区信息 */
      .district-info {
        padding: 15px 20px;
      }

      .district-banner {
        border-radius: 15px;
        padding: 15px;
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
      }

      .banner-icon {
        font-size: 36px;
      }

      .banner-name {
        font-size: 18px;
        font-weight: bold;
      }

      .banner-name-en {
        font-size: 12px;
        opacity: 0.9;
      }

      .district-description {
        font-size: 13px;
        color: #636E72;
        line-height: 1.6;
      }

      /* 地标列表 */
      .landmarks-list {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        max-height: 350px;
      }

      .list-header {
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

      .landmark-count {
        font-size: 12px;
        color: #636E72;
      }

      .landmarks-grid {
        display: grid;
        gap: 12px;
      }

      .landmark-card {
        background: white;
        border: 1px solid #ECF0F1;
        border-radius: 12px;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .landmark-card:hover {
        border-color: #3498DB;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
        transform: translateX(5px);
      }

      .card-icon {
        font-size: 32px;
        flex-shrink: 0;
      }

      .card-info {
        flex: 1;
      }

      .card-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .card-meta {
        display: flex;
        gap: 12px;
        font-size: 11px;
        color: #636E72;
      }

      .view-detail-btn {
        background: #3498DB;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 6px 12px;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .view-detail-btn:hover {
        background: #2980B9;
      }

      /* 地标详情 */
      .landmark-detail {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
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

      .detail-header {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px;
        background: linear-gradient(135deg, #F8F9FA, #E9ECEF);
        border-radius: 15px;
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
        color: #2D3436;
      }

      .detail-style {
        font-size: 12px;
        color: #636E72;
        margin-top: 3px;
      }

      .detail-height {
        font-size: 14px;
        font-weight: bold;
        color: #3498DB;
      }

      .detail-description {
        font-size: 14px;
        color: #636E72;
        line-height: 1.6;
        margin-bottom: 15px;
      }

      .detail-build {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-bottom: 15px;
      }

      .build-info {
        background: #F8F9FA;
        padding: 10px;
        border-radius: 8px;
      }

      .build-label {
        display: block;
        font-size: 11px;
        color: #636E72;
        margin-bottom: 3px;
      }

      .build-value {
        display: block;
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .detail-features {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .features-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .features-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #2D3436;
      }

      .feature-icon {
        font-size: 16px;
      }

      .detail-significance {
        background: linear-gradient(135deg, #3498DB15, #2980B915);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .significance-title {
        font-size: 14px;
        font-weight: bold;
        color: #3498DB;
        margin-bottom: 8px;
      }

      .significance-text {
        font-size: 13px;
        color: #2D3436;
        line-height: 1.6;
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
        gap: 8px;
        transition: all 0.3s ease;
      }

      .gallery-btn {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .navigate-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .action-btn:hover {
        transform: scale(1.05);
      }

      /* 滚动条 */
      .landmarks-list::-webkit-scrollbar,
      .landmark-detail::-webkit-scrollbar {
        width: 6px;
      }

      .landmarks-list::-webkit-scrollbar-track,
      .landmark-detail::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .landmarks-list::-webkit-scrollbar-thumb,
      .landmark-detail::-webkit-scrollbar-thumb {
        background: #3498DB;
        border-radius: 3px;
      }

      /* 响应式 */
      @media (max-width: 500px) {
        .zootopia-landmarks-showcase {
          right: 10px;
          bottom: 470px;
        }

        .landmarks-panel {
          width: calc(100vw - 20px);
          max-width: 430px;
        }

        .district-tabs {
          flex-wrap: wrap;
        }

        .district-tab {
          min-width: 60px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initLandmarksShowcase() {
    injectStyles();

    const showcase = createLandmarksShowcase();
    document.body.appendChild(showcase);

    // 切换按钮
    document.getElementById('landmarksToggle').onclick = togglePanel;
    document.getElementById('closeLandmarksBtn').onclick = togglePanel;

    // 初始化内容
    selectDistrict('downtown');

    // 导出全局函数
    window.zootopiaLandmarks = {
      show: () => {
        const showcase = document.querySelector('.zootopia-landmarks-showcase');
        if (!showcase.classList.contains('expanded')) {
          togglePanel();
        }
      },
      hide: () => {
        const showcase = document.querySelector('.zootopia-landmarks-showcase');
        if (showcase.classList.contains('expanded')) {
          togglePanel();
        }
      },
      getLandmark: (id) => {
        // 根据ID查找地标
        for (const district of Object.values(zootopiaLandmarks)) {
          const landmark = district.landmarks.find(l => l.id === id);
          if (landmark) return landmark;
        }
        return null;
      }
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandmarksShowcase);
  } else {
    initLandmarksShowcase();
  }
})();
