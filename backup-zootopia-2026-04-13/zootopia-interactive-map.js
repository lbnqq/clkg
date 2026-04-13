/**
 * 疯狂动物城主题 - 互动地图导航
 * Zootopia Theme - Interactive Map Navigation
 * | 可视化动物城地图导航系统
 */

(function() {
  'use strict';

  // 地区数据
  const districts = {
    SaharaSquare: {
      id: 'SaharaSquare',
      name: '撒哈拉广场',
      nameEn: 'Sahara Square',
      emoji: '🏜️',
      color: '#FF9F43',
      position: { x: 10, y: 30 },
      description: '沙漠主题的度假区，享受阳光和沙子！',
      attractions: ['🏊 沙漠泳池', '☀️ 阳光浴场', '🐪 骆驼骑行'],
      temperature: '36°C',
      population: '200万',
      unlocked: true
    },
    Tundratown: {
      id: 'Tundratown',
      name: '冰川镇',
      nameEn: 'Tundratown',
      emoji: '❄️',
      color: '#0ABDE3',
      position: { x: 75, y: 20 },
      description: '全年零下温度的冰雪世界！',
      attractions: ['⛷️ 滑雪场', '🏒 冰球馆', '🧊 冰雕展览'],
      temperature: '-15°C',
      population: '150万',
      unlocked: true
    },
    RainforestDistrict: {
      id: 'RainforestDistrict',
      name: '雨林区',
      nameEn: 'Rainforest District',
      emoji: '🌴',
      color: '#10AC84',
      position: { x: 60, y: 70 },
      description: '郁郁葱葱的热带雨林区！',
      attractions: ['🚠 缆车系统', '🌿 植物园', '🦋 蝴蝶馆'],
      temperature: '28°C',
      population: '100万',
      unlocked: true
    },
    Downtown: {
      id: 'Downtown',
      name: '市中心',
      nameEn: 'Downtown',
      emoji: '🏙️',
      color: '#9B59B6',
      position: { x: 50, y: 45 },
      description: '动物城的繁华商业中心！',
      attractions: ['🏢 ZPD总部', '🏛️ 市政厅', '🛍️ 购物中心'],
      temperature: '22°C',
      population: '300万',
      unlocked: true
    },
    Bunnyburrow: {
      id: 'Bunnyburrow',
      name: '兔子洞',
      nameEn: 'Bunnyburrow',
      emoji: '🥕',
      color: '#26DE81',
      position: { x: 25, y: 80 },
      description: '宁静的乡村小镇，朱迪的家乡！',
      attractions: ['🥕 胡萝卜田', '🏠 农庄', '🚜 农场体验'],
      temperature: '20°C',
      population: '50万',
      unlocked: true
    },
    LittleRodentia: {
      id: 'LittleRodentia',
      name: '啮齿小镇',
      nameEn: 'Little Rodentia',
      emoji: '🐁',
      color: '#EE5A24',
      position: { x: 35, y: 50 },
      description: '小型动物的专属迷你城市！',
      attractions: ['🏗️ 迷你建筑', '🧀 奶酪工厂', '🎪 迷你游乐场'],
      temperature: '24°C',
      population: '10万',
      unlocked: true
    },
    Meadowlands: {
      id: 'Meadowlands',
      name: '草地',
      nameEn: 'Meadowlands',
      emoji: '🌾',
      color: '#A17F68',
      position: { x: 80, y: 60 },
      description: '开阔的草地和自然风光！',
      attractions: ['🏕️ 露营地', '🌺 花海', '🦌 野生动物观察'],
      temperature: '25°C',
      population: '30万',
      unlocked: true
    }
  };

  // 地标数据
  const landmarks = [
    { id: 'zpd', name: 'ZPD总部', emoji: '👮', district: 'Downtown', position: { x: 52, y: 43 } },
    { id: 'cityHall', name: '市政厅', emoji: '🏛️', district: 'Downtown', position: { x: 48, y: 47 } },
    { id: 'trainStation', name: '火车站', emoji: '🚂', district: 'Downtown', position: { x: 50, y: 50 } },
    { id: 'gazelleStadium', name: 'Gazelle体育场', emoji: '🎵', district: 'Downtown', position: { x: 55, y: 40 } },
    { id: 'pawpsicleStand', name: 'Pawpsicle摊位', emoji: '🍦', district: 'Downtown', position: { x: 47, y: 52 } },
    { id: 'mrbigMansion', name: 'Mr. Big豪宅', emoji: '🐀', district: 'LittleRodentia', position: { x: 33, y: 48 } },
    { id: 'judyFamilyFarm', name: '朱迪家农场', emoji: '🥕', district: 'Bunnyburrow', position: { x: 23, y: 82 } }
  ];

  // 当前选中的地区
  let selectedDistrict = null;
  let visitedDistricts = JSON.parse(localStorage.getItem('zootopiaVisitedDistricts') || '[]');

  // 创建互动地图
  function createInteractiveMap() {
    const mapContainer = document.createElement('div');
    mapContainer.className = 'zootopia-map-overlay';
    mapContainer.innerHTML = `
      <div class="map-backdrop"></div>
      <div class="map-container">
        <div class="map-header">
          <div class="map-title">🗺️ 动物城互动地图</div>
          <div class="map-subtitle">点击地区探索详细信息</div>
          <button class="map-close">×</button>
        </div>

        <div class="map-content">
          <div class="map-view" id="mapView">
            <div class="map-svg-container">
              ${createMapSVG()}
            </div>
            <div class="map-landmarks" id="mapLandmarks">
              ${landmarks.map(landmark => `
                <div class="landmark-marker" data-landmark="${landmark.id}" style="
                  left: ${landmark.position.x}%;
                  top: ${landmark.position.y}%;
                  title: ${landmark.name}
                ">
                  ${landmark.emoji}
                </div>
              `).join('')}
            </div>
            <div class="map-districts" id="mapDistricts">
              ${Object.values(districts).map(district => `
                <div class="district-marker ${visitedDistricts.includes(district.id) ? 'visited' : ''}"
                     data-district="${district.id}"
                     style="
                  left: ${district.position.x}%;
                  top: ${district.position.y}%;
                  background: ${district.color};
                ">
                  <span class="marker-emoji">${district.emoji}</span>
                  <span class="marker-label">${district.name}</span>
                </div>
              `).join('')}
            </div>
            <div class="map-connection-lines">
              ${createConnectionLines()}
            </div>
          </div>

          <div class="map-info-panel" id="mapInfoPanel">
            <div class="panel-placeholder">
              <span class="placeholder-icon">👆</span>
              <span class="placeholder-text">点击地图上的地区查看详情</span>
            </div>
          </div>
        </div>

        <div class="map-stats">
          <div class="stat-item">
            <span class="stat-icon">🗺️</span>
            <span class="stat-value">${visitedDistricts.length}/${Object.keys(districts).length}</span>
            <span class="stat-label">已探索</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">📍</span>
            <span class="stat-value" id="currentLocation">市中心</span>
            <span class="stat-label">当前位置</span>
          </div>
        </div>
      </div>

      <button class="map-toggle" id="mapToggle">
        <span class="toggle-icon">🗺️</span>
      </button>
    `;

    return mapContainer;
  }

  // 创建地图SVG
  function createMapSVG() {
    return `
      <svg class="zootopia-map-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- 背景渐变 -->
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFE5CC;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#F0F8FF;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E8F5E9;stop-opacity:1" />
        </linearGradient>

        <!-- 地区区域 -->
        ${Object.values(districts).map(district => `
          <ellipse cx="${district.position.x}" cy="${district.position.y}" rx="12" ry="10"
                   fill="${district.color}22" stroke="${district.color}" stroke-width="0.5"
                   class="district-region" data-district="${district.id}" />
        `).join('')}

        <!-- 道路网络 -->
        <g class="road-network">
          <!-- 主要道路 -->
          <path d="M 50 50 Q 40 40, 25 80" stroke="#BDC3C7" stroke-width="0.8" fill="none" stroke-dasharray="2,2"/>
          <path d="M 50 50 Q 60 35, 75 20" stroke="#BDC3C7" stroke-width="0.8" fill="none" stroke-dasharray="2,2"/>
          <path d="M 50 50 Q 55 60, 60 70" stroke="#BDC3C7" stroke-width="0.8" fill="none" stroke-dasharray="2,2"/>
          <path d="M 50 50 Q 40 50, 35 50" stroke="#BDC3C7" stroke-width="0.8" fill="none" stroke-dasharray="2,2"/>
          <path d="M 50 50 Q 20 40, 10 30" stroke="#BDC3C7" stroke-width="0.8" fill="none" stroke-dasharray="2,2"/>
        </g>

        <!-- 铁路线 -->
        <g class="train-lines">
          <circle cx="50" cy="50" r="15" stroke="#E74C3C" stroke-width="0.3" fill="none" stroke-dasharray="1,1"/>
          <circle cx="50" cy="50" r="25" stroke="#3498DB" stroke-width="0.3" fill="none" stroke-dasharray="1,1"/>
        </g>

        <!-- 装饰元素 -->
        <g class="map-decorations">
          <text x="10" y="15" font-size="3" fill="#95A5A6" opacity="0.5">🏜️ 撒哈拉广场</text>
          <text x="70" y="10" font-size="3" fill="#95A5A6" opacity="0.5">❄️ 冰川镇</text>
          <text x="75" y="75" font-size="3" fill="#95A5A6" opacity="0.5">🌴 雨林区</text>
          <text x="20" y="90" font-size="3" fill="#95A5A6" opacity="0.5">🥕 兔子洞</text>
        </g>
      </svg>
    `;
  }

  // 创建连接线
  function createConnectionLines() {
    return `
      <svg class="connection-lines-svg" viewBox="0 0 100 100">
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#95A5A6"/>
          </marker>
        </defs>
        <!-- 动态连接线 -->
      </svg>
    `;
  }

  // 显示地区详情
  function showDistrictDetails(districtId) {
    const district = Object.values(districts).find(d => d.id === districtId);
    if (!district) return;

    selectedDistrict = districtId;

    // 标记为已访问
    if (!visitedDistricts.includes(districtId)) {
      visitedDistricts.push(districtId);
      localStorage.setItem('zootopiaVisitedDistricts', JSON.stringify(visitedDistricts));

      // 更新地图标记
      const marker = document.querySelector(`[data-district="${districtId}"]`);
      if (marker) {
        marker.classList.add('visited');
      }

      // 更新统计
      updateMapStats();

      // 触发成就事件
      window.dispatchEvent(new CustomEvent('zootopiaDiscovery', {
        detail: { message: `探索新地区: ${district.name}`, item: district.emoji }
      }));
    }

    const panel = document.getElementById('mapInfoPanel');
    panel.innerHTML = `
      <div class="district-details">
        <div class="district-header" style="background: ${district.color}">
          <div class="district-emoji-large">${district.emoji}</div>
          <div class="district-names">
            <div class="district-name">${district.name}</div>
            <div class="district-name-en">${district.nameEn}</div>
          </div>
        </div>

        <div class="district-info">
          <div class="info-item">
            <span class="info-label">📍 位置</span>
            <span class="info-value">${district.description}</span>
          </div>
          <div class="info-item">
            <span class="info-label">🌡️ 温度</span>
            <span class="info-value">${district.temperature}</span>
          </div>
          <div class="info-item">
            <span class="info-label">👥 人口</span>
            <span class="info-value">${district.population}</span>
          </div>
        </div>

        <div class="district-attractions">
          <div class="attractions-title">🎯 主要景点</div>
          <div class="attractions-list">
            ${district.attractions.map(attraction => `
              <div class="attraction-item">${attraction}</div>
            `).join('')}
          </div>
        </div>

        <div class="district-actions">
          <button class="action-btn travel-btn">🚗 前往该地区</button>
          <button class="action-btn explore-btn">🔍 深入探索</button>
        </div>
      </div>
    `;

    // 绑定事件
    panel.querySelector('.travel-btn').onclick = () => {
      window.dispatchEvent(new CustomEvent('zootopiaDistrictChange', {
        detail: { district: districtId }
      }));
      alert(`正在前往 ${district.name}...`);
    };

    panel.querySelector('.explore-btn').onclick = () => {
      showExplorationOptions(districtId);
    };
  }

  // 显示探索选项
  function showExplorationOptions(districtId) {
    const district = Object.values(districts).find(d => d.id === districtId);
    if (!district) return;

    const modal = document.createElement('div');
    modal.className = 'exploration-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title">探索 ${district.name}</span>
          <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="exploration-options">
            <button class="explore-option" data-action="sightseeing">
              <span class="option-icon">📸</span>
              <span class="option-name">观光游览</span>
              <span class="option-desc">欣赏${district.name}的美景</span>
            </button>
            <button class="explore-option" data-action="interact">
              <span class="option-icon">💬</span>
              <span class="option-name">角色互动</span>
              <span class="option-desc">与当地居民交流</span>
            </button>
            <button class="explore-option" data-action="collect">
              <span class="option-icon">🎁</span>
              <span class="option-name">收集纪念品</span>
              <span class="option-desc">收集特色物品</span>
            </button>
            <button class="explore-option" data-action="challenge">
              <span class="option-icon">🎮</span>
              <span class="option-name">地区挑战</span>
              <span class="option-desc">完成特殊任务</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // 关闭按钮
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.querySelector('.modal-backdrop').onclick = () => modal.remove();

    // 探索选项
    modal.querySelectorAll('.explore-option').forEach(option => {
      option.onclick = () => {
        const action = option.dataset.action;
        handleExplorationAction(action, districtId);
        modal.remove();
      };
    });
  }

  // 处理探索动作
  function handleExplorationAction(action, districtId) {
    const district = Object.values(districts).find(d => d.id === districtId);

    switch (action) {
      case 'sightseeing':
        alert(`你正在游览 ${district.name}，这里的风景真美！`);
        break;
      case 'interact':
        alert(`你与 ${district.name} 的居民进行了友好交流！`);
        break;
      case 'collect':
        const item = district.attractions[Math.floor(Math.random() * district.attractions.length)];
        alert(`你收集了 ${district.name} 的特色物品: ${item}`);
        break;
      case 'challenge':
        alert(`${district.name} 的挑战任务即将解锁！`);
        break;
    }
  }

  // 更新地图统计
  function updateMapStats() {
    const visitedCount = document.querySelector('.stat-item:first-child .stat-value');
    if (visitedCount) {
      visitedCount.textContent = `${visitedDistricts.length}/${Object.keys(districts).length}`;
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#interactive-map-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'interactive-map-styles';
    styles.textContent = `
      /* 地图覆盖层 */
      .zootopia-map-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10005;
        display: none;
      }

      .zootopia-map-overlay.active {
        display: block;
      }

      .map-backdrop {
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

      .map-container {
        position: relative;
        width: 90vw;
        height: 90vh;
        margin: 5vh auto;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
      }

      /* 地图头部 */
      .map-header {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
        padding: 20px;
        text-align: center;
      }

      .map-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .map-subtitle {
        font-size: 14px;
        opacity: 0.9;
      }

      .map-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      /* 地图内容 */
      .map-content {
        flex: 1;
        display: flex;
        overflow: hidden;
      }

      .map-view {
        flex: 2;
        position: relative;
        background: linear-gradient(135deg, #FFE5CC 0%, #F0F8FF 50%, #E8F5E9 100%);
        padding: 20px;
      }

      .map-svg-container {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .zootopia-map-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
      }

      /* 地区标记 */
      .map-districts {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }

      .district-marker {
        position: absolute;
        transform: translate(-50%, -50%);
        padding: 8px 12px;
        border-radius: 20px;
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        animation: markerPulse 2s ease infinite;
      }

      @keyframes markerPulse {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.05);
        }
      }

      .district-marker:hover {
        transform: translate(-50%, -50%) scale(1.15);
        z-index: 10;
      }

      .district-marker.visited {
        border: 2px solid #2ECC71;
      }

      .marker-emoji {
        font-size: 20px;
        margin-right: 5px;
      }

      /* 地标标记 */
      .map-landmarks {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }

      .landmark-marker {
        position: absolute;
        transform: translate(-50%, -50%);
        font-size: 16px;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.3s ease;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
      }

      .landmark-marker:hover {
        transform: translate(-50%, -50%) scale(1.5);
        z-index: 10;
      }

      /* 信息面板 */
      .map-info-panel {
        flex: 1;
        background: #F8F9FA;
        border-left: 1px solid #ECF0F1;
        padding: 20px;
        overflow-y: auto;
      }

      .panel-placeholder {
        text-align: center;
        padding: 40px 20px;
        color: #636E72;
      }

      .placeholder-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 15px;
      }

      /* 地区详情 */
      .district-details {
        animation: slideInRight 0.3s ease;
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .district-header {
        padding: 20px;
        border-radius: 15px;
        color: white;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .district-emoji-large {
        font-size: 48px;
      }

      .district-names {
        flex: 1;
      }

      .district-name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .district-name-en {
        font-size: 12px;
        opacity: 0.9;
      }

      .district-info {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        background: white;
        border-radius: 10px;
        font-size: 14px;
      }

      .info-label {
        font-weight: 500;
        color: #636E72;
      }

      .info-value {
        font-weight: bold;
        color: #2D3436;
      }

      .district-attractions {
        margin-bottom: 20px;
      }

      .attractions-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
        color: #2D3436;
      }

      .attractions-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .attraction-item {
        padding: 10px;
        background: white;
        border-radius: 10px;
        text-align: center;
        font-size: 13px;
        color: #495057;
        transition: all 0.3s ease;
      }

      .attraction-item:hover {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
        transform: translateY(-2px);
      }

      .district-actions {
        display: flex;
        gap: 10px;
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
      }

      .travel-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .explore-btn {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      /* 地图统计 */
      .map-stats {
        display: flex;
        justify-content: space-around;
        padding: 15px;
        background: rgba(0, 0, 0, 0.05);
        border-top: 1px solid #ECF0F1;
      }

      .stat-item {
        text-align: center;
      }

      .stat-icon {
        font-size: 24px;
        display: block;
        margin-bottom: 5px;
      }

      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .stat-label {
        font-size: 12px;
        color: #636E72;
      }

      /* 探索模态框 */
      .exploration-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10006;
        display: block;
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
        width: 90vw;
        max-width: 500px;
        margin: 50vh auto;
        transform: translateY(-50%);
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }

      .modal-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-title {
        font-size: 18px;
        font-weight: bold;
      }

      .modal-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .modal-body {
        padding: 20px;
      }

      .exploration-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .explore-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #F8F9FA;
        border: 2px solid transparent;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .explore-option:hover {
        border-color: #9B59B6;
        background: rgba(155, 89, 182, 0.1);
      }

      .option-icon {
        font-size: 28px;
      }

      .option-name {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
      }

      .option-desc {
        font-size: 12px;
        color: #636E72;
      }

      /* 切换按钮 */
      .map-toggle {
        position: fixed;
        top: 280px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .map-toggle:hover {
        transform: scale(1.1);
      }

      .toggle-icon {
        font-size: 28px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .map-container {
          width: 95vw;
          height: 95vh;
        }

        .map-content {
          flex-direction: column;
        }

        .map-view {
          flex: 1;
          min-height: 300px;
        }

        .map-info-panel {
          flex: 1;
          border-left: none;
          border-top: 1px solid #ECF0F1;
        }

        .map-toggle {
          top: auto;
          bottom: 420px;
          right: 15px;
          width: 50px;
          height: 50px;
        }

        .toggle-icon {
          font-size: 24px;
        }

        .attractions-list {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化互动地图
  function initInteractiveMap() {
    injectStyles();

    const map = createInteractiveMap();
    document.body.appendChild(map);

    // 切换按钮
    document.getElementById('mapToggle').onclick = () => {
      map.classList.add('active');
    };

    // 关闭按钮
    document.querySelector('.map-close').onclick = () => {
      map.classList.remove('active');
    };

    // 地区标记点击
    document.querySelectorAll('.district-marker').forEach(marker => {
      marker.onclick = () => {
        showDistrictDetails(marker.dataset.district);
      };
    });

    // 地标标记点击
    document.querySelectorAll('.landmark-marker').forEach(marker => {
      marker.onclick = () => {
        const landmark = landmarks.find(l => l.id === marker.dataset.landmark);
        if (landmark) {
          alert(`${landmark.emoji} ${landmark.name}\n位于: ${Object.values(districts).find(d => d.id === landmark.district)?.name}`);
        }
      };
    });
  }

  // 导出全局函数
  window.zootopiaMap = {
    show: () => {
      document.querySelector('.zootopia-map-overlay').classList.add('active');
    },
    visitDistrict: (districtId) => {
      if (!visitedDistricts.includes(districtId)) {
        visitedDistricts.push(districtId);
        localStorage.setItem('zootopiaVisitedDistricts', JSON.stringify(visitedDistricts));
      }
    },
    getVisited: () => visitedDistricts
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveMap);
  } else {
    initInteractiveMap();
  }
})();
