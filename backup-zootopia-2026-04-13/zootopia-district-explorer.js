/**
 * 疯狂动物城主题 - 地区探索进度系统
 * Zootopia Theme - District Explorer Progress System
 * | 探索动物城7大地区，解锁专属奖励
 */

(function() {
  'use strict';

  // 7个地区配置
  const districts = [
    {
      id: 'downtown',
      name: '市中心',
      nameEn: 'Downtown District',
      icon: '🏙️',
      color: '#5F27CD',
      description: '动物城的繁华中心，摩天大楼林立',
      landmarks: ['ZPD总部', '市政厅', '中央车站'],
      characters: ['朱迪', '尼克', '博戈局长'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    },
    {
      id: 'sahara',
      name: '撒哈拉广场',
      nameEn: 'Sahara Square',
      icon: '🏜️',
      color: '#FF9F43',
      description: '阳光明媚的沙漠绿洲度假胜地',
      landmarks: ['豪华酒店', '购物中心', '阳光海滩'],
      characters: ['富豪动物们'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    },
    {
      id: 'tundratown',
      name: '冰川镇',
      nameEn: 'Tundratown',
      icon: '❄️',
      color: '#0ABDE3',
      description: '冰雪覆盖的极地小镇',
      landmarks: ['冰滑梯', '冰川公园', '极地咖啡厅'],
      characters: ['Mr. Big', '极地动物们'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    },
    {
      id: 'rainforest',
      name: '雨林区',
      nameEn: 'Rainforest District',
      icon: '🌴',
      color: '#10AC84',
      description: '郁郁葱葱的热带雨林',
      landmarks: ['缆车站', '瀑布', '树屋酒店'],
      characters: ['老虎市长助理'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    },
    {
      id: 'bunnyburrow',
      name: '兔子洞',
      nameEn: 'Bunnyburrow',
      icon: '🥕',
      color: '#26DE81',
      description: '宁静的乡村小镇，朱迪的家乡',
      landmarks: ['胡萝卜农场', '霍普斯家', '乡村教堂'],
      characters: ['朱迪全家', '276个兄弟姐妹'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    },
    {
      id: 'little_rodentia',
      name: '啮齿镇',
      nameEn: 'Little Rodentia',
      icon: '🐭',
      color: '#EE5A24',
      description: '微小动物的专属小镇',
      landmarks: ['迷你摩天大楼', '小公园', '奶酪店'],
      characters: ['老鼠市民们'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    },
    {
      id: 'meadowlands',
      name: '草甸镇',
      nameEn: 'Meadowlands',
      icon: '🌾',
      color: '#FFFFFF',
      description: '宁静的郊区居住地',
      landmarks: ['郊外别墅', '花园', '学校'],
      characters: ['郊区居民'],
      xpReward: 100,
      unlocked: false,
      explorePercent: 0
    }
  ];

  // 探索等级
  const explorerLevels = [
    { level: 1, title: '迷失游客', icon: '🗺️', districtsNeeded: 0 },
    { level: 2, title: '初级探索者', icon: '🧭', districtsNeeded: 1 },
    { level: 3, title: '城市漫游者', icon: '🚶', districtsNeeded: 2 },
    { level: 4, title: '地区专家', icon: '🎯', districtsNeeded: 3 },
    { level: 5, title: '动物城向导', icon: '🌟', districtsNeeded: 5 },
    { level: 6, title: '传奇探险家', icon: '🏆', districtsNeeded: 7 }
  ];

  // 用户探索数据
  let explorerData = JSON.parse(localStorage.getItem('zootopiaExplorerData')) || {
    districts: {},
    totalExplored: 0,
    visits: {},
    discoveries: [],
    badges: []
  };

  // 初始化地区数据
  function initDistrictsData() {
    districts.forEach(district => {
      if (!explorerData.districts[district.id]) {
        explorerData.districts[district.id] = {
          unlocked: false,
          explorePercent: 0,
          visits: 0,
          landmarksFound: [],
          lastVisit: null
        };
      }
    });
    saveExplorerData();
  }

  // 保存数据
  function saveExplorerData() {
    localStorage.setItem('zootopiaExplorerData', JSON.stringify(explorerData));
  }

  // 创建探索地图面板
  function createExplorerPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-explorer-panel';
    panel.innerHTML = `
      <button class="explorer-toggle" title="地区探索">
        <span class="toggle-icon">🗺️</span>
        <span class="explorer-badge" id="explorerBadge">0/7</span>
      </button>
      <div class="explorer-content">
        <div class="explorer-header">
          <div class="header-left">
            <span class="header-icon">🏙️</span>
            <div class="header-text">
              <div class="header-title">动物城探索地图</div>
              <div class="header-subtitle">探索7大地区，成为传奇探险家</div>
            </div>
          </div>
          <button class="explorer-close">×</button>
        </div>

        <div class="explorer-status">
          <div class="status-level" id="explorerLevel">
            <span class="level-icon">🗺️</span>
            <span class="level-text">迷失游客</span>
          </div>
          <div class="status-progress">
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" id="explorerProgress" style="width: 0%; background: linear-gradient(90deg, #5F27CD, #9B59B6);"></div>
            </div>
            <div class="progress-text">
              <span id="exploredCount">0</span>/7 地区已探索
            </div>
          </div>
        </div>

        <div class="districts-map" id="districtsMap">
          ${districts.map(district => createDistrictCard(district)).join('')}
        </div>

        <div class="discovered-items">
          <div class="items-title">🔍 已发现的地标</div>
          <div class="items-grid" id="discoveriesGrid">
            <div class="no-discoveries">还没有发现任何地标</div>
          </div>
        </div>

        <div class="explorer-badges">
          <div class="badges-title">🏅 探险徽章</div>
          <div class="badges-list" id="badgesList">
            <!-- 徽章将动态生成 -->
          </div>
        </div>
      </div>
    `;

    return panel;
  }

  // 创建地区卡片
  function createDistrictCard(district) {
    const data = explorerData.districts[district.id] || { unlocked: false, explorePercent: 0, visits: 0 };
    const isUnlocked = data.unlocked || data.explorePercent > 0;

    return `
      <div class="district-card ${isUnlocked ? 'unlocked' : 'locked'}" data-district="${district.id}" style="--district-color: ${district.color}">
        <div class="district-header">
          <div class="district-icon">${district.icon}</div>
          <div class="district-info">
            <div class="district-name">${district.name}</div>
            <div class="district-name-en">${district.nameEn}</div>
          </div>
          <div class="district-status">
            ${isUnlocked ? '✓ 已解锁' : '🔒 未探索'}
          </div>
        </div>
        <div class="district-description">${district.description}</div>
        <div class="district-progress">
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${data.explorePercent}%; background: ${district.color}"></div>
          </div>
          <div class="progress-text">${data.explorePercent}% 探索度</div>
        </div>
        ${isUnlocked ? `
          <div class="district-stats">
            <span class="stat-item">
              <span class="stat-icon">👣</span>
              <span class="stat-text">${data.visits} 次访问</span>
            </span>
            <span class="stat-item">
              <span class="stat-icon">🏛️</span>
              <span class="stat-text">${data.landmarksFound?.length || 0}/${district.landmarks.length} 地标</span>
            </span>
          </div>
        ` : ''}
        <button class="explore-btn" onclick="exploreDistrict('${district.id}')">
          ${isUnlocked ? '继续探索' : '开始探索'}
        </button>
      </div>
    `;
  }

  // 探索地区
  function exploreDistrict(districtId) {
    const district = districts.find(d => d.id === districtId);
    if (!district) return;

    const data = explorerData.districts[districtId];

    // 增加探索进度
    if (!data.unlocked) {
      data.unlocked = true;
      showDistrictUnlocked(district);
    }

    data.explorePercent = Math.min(100, data.explorePercent + Math.floor(Math.random() * 15) + 10);
    data.visits++;
    data.lastVisit = new Date().toISOString();

    // 随机发现地标
    if (Math.random() < 0.3 && data.landmarksFound.length < district.landmarks.length) {
      const newLandmark = district.landmarks.find(l => !data.landmarksFound.includes(l));
      if (newLandmark) {
        data.landmarksFound.push(newLandmark);
        showLandmarkDiscovered(district, newLandmark);
        explorerData.discoveries.push({
          district: district.name,
          landmark: newLandmark,
          timestamp: Date.now()
        });
      }
    }

    // 检查是否完全探索
    if (data.explorePercent >= 100 && !data.completed) {
      data.completed = true;
      showDistrictComplete(district);
      if (window.zootopiaAddXP) {
        window.zootopiaAddXP(district.xpReward, `完全探索: ${district.name}`);
      }
    }

    // 更新总探索数
    updateExplorerProgress();

    saveExplorerData();
    refreshExplorerPanel();
  }

  // 显示地区解锁动画
  function showDistrictUnlocked(district) {
    const notification = document.createElement('div');
    notification.className = 'district-unlock-notification';
    notification.innerHTML = `
      <div class="unlock-animation">
        <div class="unlock-bg" style="background: linear-gradient(135deg, ${district.color}, ${district.color}88)"></div>
        <div class="unlock-content">
          <div class="unlock-icon">${district.icon}</div>
          <div class="unlock-title">新地区发现！</div>
          <div class="unlock-district">${district.name}</div>
          <div class="unlock-subtitle">${district.nameEn}</div>
          <div class="unlock-description">${district.description}</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  }

  // 显示地标发现动画
  function showLandmarkDiscovered(district, landmark) {
    const notification = document.createElement('div');
    notification.className = 'landmark-discover-notification';
    notification.innerHTML = `
      <div class="discover-animation">
        <div class="discover-icon">🔍</div>
        <div class="discover-title">发现新地标！</div>
        <div class="discover-landmark">${landmark}</div>
        <div class="discover-location">${district.icon} ${district.name}</div>
        <div class="discover-reward">+25 XP</div>
      </div>
    `;

    document.body.appendChild(notification);

    if (window.zootopiaAddXP) {
      window.zootopiaAddXP(25, `发现地标: ${landmark}`);
    }

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // 显示地区完全探索
  function showDistrictComplete(district) {
    const notification = document.createElement('div');
    notification.className = 'district-complete-notification';
    notification.innerHTML = `
      <div class="complete-animation">
        <div class="complete-icon">🎉</div>
        <div class="complete-title">完全探索！</div>
        <div class="complete-district">${district.icon} ${district.name}</div>
        <div class="complete-reward">+${district.xpReward} XP</div>
        <div class="complete-subtitle">你已成为这个地区的专家！</div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  }

  // 更新探索进度
  function updateExplorerProgress() {
    const unlockedCount = Object.values(explorerData.districts).filter(d => d.unlocked).length;
    explorerData.totalExplored = unlockedCount;

    // 计算当前等级
    for (let i = explorerLevels.length - 1; i >= 0; i--) {
      if (unlockedCount >= explorerLevels[i].districtsNeeded) {
        explorerData.currentLevel = i;
        break;
      }
    }

    // 检查徽章
    checkExplorerBadges();
  }

  // 检查探险徽章
  function checkExplorerBadges() {
    const unlocked = Object.values(explorerData.districts).filter(d => d.unlocked).length;

    const badges = [
      { id: 'first_district', name: '初出茅庐', icon: '👣', condition: unlocked >= 1 },
      { id: 'three_districts', name: '城市行者', icon: '🚶', condition: unlocked >= 3 },
      { id: 'five_districts', name: '探险专家', icon: '🗺️', condition: unlocked >= 5 },
      { id: 'all_districts', name: '动物城大师', icon: '👑', condition: unlocked >= 7 }
    ];

    badges.forEach(badge => {
      if (badge.condition && !explorerData.badges.includes(badge.id)) {
        explorerData.badges.push(badge.id);
        showBadgeEarned(badge);
        if (window.zootopiaAddXP) {
          window.zootopiaAddXP(150, `获得徽章: ${badge.name}`);
        }
      }
    });
  }

  // 显示获得徽章
  function showBadgeEarned(badge) {
    const notification = document.createElement('div');
    notification.className = 'badge-earn-notification';
    notification.innerHTML = `
      <div class="badge-animation">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-title">徽章解锁！</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-reward">+150 XP</div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // 刷新探索面板
  function refreshExplorerPanel() {
    const mapContainer = document.getElementById('districtsMap');
    if (mapContainer) {
      mapContainer.innerHTML = districts.map(district => createDistrictCard(district)).join('');
    }

    // 更新状态
    const unlockedCount = Object.values(explorerData.districts).filter(d => d.unlocked).length;
    const badge = document.getElementById('explorerBadge');
    if (badge) badge.textContent = `${unlockedCount}/7`;

    const countEl = document.getElementById('exploredCount');
    if (countEl) countEl.textContent = unlockedCount;

    const progressEl = document.getElementById('explorerProgress');
    if (progressEl) progressEl.style.width = `${(unlockedCount / 7) * 100}%`;

    // 更新等级显示
    const levelEl = document.getElementById('explorerLevel');
    if (levelEl) {
      const level = explorerLevels[explorerData.currentLevel] || explorerLevels[0];
      levelEl.innerHTML = `
        <span class="level-icon">${level.icon}</span>
        <span class="level-text">${level.title}</span>
      `;
    }

    // 更新已发现的地标
    updateDiscoveriesGrid();
    updateBadgesList();
  }

  // 更新已发现的地标网格
  function updateDiscoveriesGrid() {
    const grid = document.getElementById('discoveriesGrid');
    if (!grid) return;

    if (explorerData.discoveries.length === 0) {
      grid.innerHTML = '<div class="no-discoveries">还没有发现任何地标</div>';
      return;
    }

    grid.innerHTML = explorerData.discoveries.slice(-8).reverse().map(discovery => `
      <div class="discovery-item">
        <span class="discovery-landmark">🏛️ ${discovery.landmark}</span>
        <span class="discovery-district">${discovery.district}</span>
      </div>
    `).join('');
  }

  // 更新徽章列表
  function updateBadgesList() {
    const list = document.getElementById('badgesList');
    if (!list) return;

    const allBadges = [
      { id: 'first_district', name: '初出茅庐', icon: '👣' },
      { id: 'three_districts', name: '城市行者', icon: '🚶' },
      { id: 'five_districts', name: '探险专家', icon: '🗺️' },
      { id: 'all_districts', name: '动物城大师', icon: '👑' }
    ];

    list.innerHTML = allBadges.map(badge => {
      const earned = explorerData.badges.includes(badge.id);
      return `
        <div class="badge-item ${earned ? 'earned' : 'locked'}">
          <span class="badge-icon">${earned ? badge.icon : '🔒'}</span>
          <span class="badge-name">${badge.name}</span>
        </div>
      `;
    }).join('');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#explorer-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'explorer-styles';
    styles.textContent = `
      /* 探索面板 */
      .zootopia-explorer-panel {
        position: fixed;
        top: 300px;
        left: 30px;
        z-index: 9997;
      }

      .explorer-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #5F27CD, #9B59B6);
        border: none;
        box-shadow: 0 5px 20px rgba(95, 39, 205, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .explorer-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(95, 39, 205, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .explorer-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #F1C40F;
        color: #2D3436;
        font-size: 11px;
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 10px;
        border: 2px solid white;
      }

      .explorer-content {
        position: absolute;
        top: 0;
        left: 80px;
        width: 420px;
        max-height: 85vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: explorerSlideIn 0.3s ease;
        overflow: hidden;
      }

      .explorer-content.show {
        display: block;
      }

      @keyframes explorerSlideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* 探索头部 */
      .explorer-header {
        background: linear-gradient(135deg, #5F27CD, #9B59B6);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header-icon {
        font-size: 32px;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .header-title {
        font-size: 16px;
        font-weight: bold;
      }

      .header-subtitle {
        font-size: 12px;
        opacity: 0.9;
      }

      .explorer-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      /* 探索状态 */
      .explorer-status {
        padding: 20px;
        background: linear-gradient(135deg, rgba(95, 39, 205, 0.1), rgba(155, 89, 182, 0.1));
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .status-level {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: bold;
        color: #5F27CD;
      }

      .level-icon {
        font-size: 24px;
      }

      .status-progress {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .progress-bar-bg {
        height: 8px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
      }

      .progress-text {
        font-size: 12px;
        color: #636E72;
        text-align: center;
      }

      /* 地区地图 */
      .districts-map {
        padding: 15px;
        max-height: 350px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .district-card {
        padding: 15px;
        background: white;
        border: 2px solid var(--district-color);
        border-radius: 12px;
        transition: all 0.3s ease;
      }

      .district-card.unlocked {
        background: linear-gradient(135deg, rgba(95, 39, 205, 0.05), rgba(155, 89, 182, 0.05));
      }

      .district-card.locked {
        opacity: 0.7;
      }

      .district-card:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .district-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .district-icon {
        font-size: 32px;
      }

      .district-info {
        flex: 1;
      }

      .district-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
      }

      .district-name-en {
        font-size: 11px;
        color: #636E72;
      }

      .district-status {
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 10px;
        background: rgba(46, 204, 113, 0.2);
        color: #2ECC71;
        font-weight: bold;
      }

      .district-card.locked .district-status {
        background: rgba(149, 165, 166, 0.2);
        color: #95A5A6;
      }

      .district-description {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 10px;
      }

      .district-progress {
        margin-bottom: 10px;
      }

      .district-stats {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        color: #636E72;
      }

      .stat-icon {
        font-size: 14px;
      }

      .explore-btn {
        width: 100%;
        padding: 10px;
        background: linear-gradient(135deg, #5F27CD, #9B59B6);
        border: none;
        border-radius: 8px;
        color: white;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .explore-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(95, 39, 205, 0.4);
      }

      /* 已发现的地标 */
      .discovered-items {
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .items-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .items-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .discovery-item {
        padding: 8px 10px;
        background: rgba(95, 39, 205, 0.1);
        border-radius: 8px;
        font-size: 11px;
        border: 1px solid rgba(95, 39, 205, 0.2);
      }

      .discovery-landmark {
        font-weight: bold;
        color: #5F27CD;
        display: block;
        margin-bottom: 3px;
      }

      .discovery-district {
        color: #636E72;
        font-size: 10px;
      }

      .no-discoveries {
        grid-column: 1 / -1;
        text-align: center;
        padding: 20px;
        color: #95A5A6;
        font-size: 12px;
      }

      /* 徽章 */
      .explorer-badges {
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .badges-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .badges-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .badge-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 12px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .badge-item.earned {
        background: linear-gradient(135deg, rgba(241, 196, 15, 0.2), rgba(243, 156, 18, 0.2));
        border-color: #F1C40F;
      }

      .badge-item.locked {
        opacity: 0.6;
      }

      /* 通知动画 */
      .district-unlock-notification,
      .landmark-discover-notification,
      .district-complete-notification,
      .badge-earn-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: notificationPop 0.5s ease;
      }

      @keyframes notificationPop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      .unlock-animation,
      .discover-animation,
      .complete-animation,
      .badge-animation {
        background: white;
        border-radius: 20px;
        padding: 30px 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
        position: relative;
        overflow: hidden;
      }

      .unlock-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100px;
        opacity: 0.2;
        border-radius: 20px 20px 0 0;
      }

      .unlock-icon,
      .discover-icon,
      .complete-icon,
      .badge-icon {
        font-size: 64px;
        margin-bottom: 15px;
        position: relative;
        z-index: 1;
        animation: bounce 1s ease infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }

      .unlock-title,
      .discover-title,
      .complete-title,
      .badge-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        position: relative;
        z-index: 1;
      }

      .unlock-title { color: #5F27CD; }
      .discover-title { color: #F1C40F; }
      .complete-title { color: #2ECC71; }
      .badge-title { color: #9B59B6; }

      .unlock-district,
      .discover-landmark,
      .complete-district,
      .badge-name {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 8px;
        position: relative;
        z-index: 1;
      }

      .unlock-subtitle {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 10px;
        position: relative;
        z-index: 1;
      }

      .unlock-description {
        font-size: 13px;
        color: #636E72;
        margin-bottom: 15px;
        position: relative;
        z-index: 1;
      }

      .discover-location {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 15px;
      }

      .unlock-reward,
      .discover-reward,
      .complete-reward,
      .badge-reward {
        font-size: 16px;
        font-weight: bold;
        color: #F39C12;
        position: relative;
        z-index: 1;
      }

      .complete-subtitle {
        font-size: 13px;
        color: #636E72;
        margin-top: 10px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-explorer-panel {
          left: 15px;
        }

        .explorer-content {
          width: calc(100vw - 60px);
          left: 0;
        }

        .districts-map {
          max-height: 250px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化探索系统
  function initExplorerSystem() {
    injectStyles();

    initDistrictsData();
    updateExplorerProgress();

    const panel = createExplorerPanel();
    document.body.appendChild(panel);

    const content = panel.querySelector('.explorer-content');
    const toggle = panel.querySelector('.explorer-toggle');
    const close = panel.querySelector('.explorer-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      content.classList.toggle('show');
      if (content.classList.contains('show')) {
        refreshExplorerPanel();
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

    refreshExplorerPanel();
  }

  // 导出全局函数
  window.exploreDistrict = exploreDistrict;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExplorerSystem);
  } else {
    initExplorerSystem();
  }
})();
