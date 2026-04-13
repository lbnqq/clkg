/**
 * 疯狂动物城主题 - 地图导航系统
 * Zootopia Theme - Map Navigator
 * 可交互的动物城地图，点击地区跳转相关内容
 */

(function() {
  'use strict';

  // 地区配置
  const districts = {
    sahara: {
      name: '撒哈拉广场',
      nameEn: 'Sahara Square',
      icon: '🏜️',
      color: '#FF9F43',
      position: { top: '20%', left: '15%' },
      tags: ['沙滩', '阳光', '骆驼', '水疗'],
      articles: ['动物城美食指南', '动物城最佳拍照地点']
    },
    tundratown: {
      name: '冰川镇',
      nameEn: 'Tundratown',
      icon: '❄️',
      color: '#0ABDE3',
      position: { top: '10%', left: '45%' },
      tags: ['冰雪', '企鹅', '冰雕', '极光'],
      articles: ['动物城天气预报', '动物城完全生存指南']
    },
    rainforest: {
      name: '雨林区',
      nameEn: 'Rainforest District',
      icon: '🌴',
      color: '#10AC84',
      position: { top: '30%', left: '70%' },
      tags: ['雨林', '树冠', '咖啡厅', '自然'],
      articles: ['动物城最佳拍照地点', 'Gazelle演唱会全记录']
    },
    downtown: {
      name: '市中心',
      nameEn: 'Downtown',
      icon: '🏙️',
      color: '#5F27CD',
      position: { top: '50%', left: '40%' },
      tags: ['市政厅', 'ZPD', '剧院', '购物'],
      articles: ['欢迎来到疯狂动物城', 'ZPD训练营第一天', '动物城节日庆典']
    },
    bunnyburrow: {
      name: '兔窝镇',
      nameEn: 'Bunnyburrow',
      icon: '🥕',
      color: '#26DE81',
      position: { top: '70%', left: '20%' },
      tags: ['农场', '胡萝卜', '田园', '家庭'],
      articles: ['动物城角色档案', '动物城角色配音挑战']
    },
    littlerodentia: {
      name: '小啮齿镇',
      nameEn: 'Little Rodentia',
      icon: '🐭',
      color: '#EE5A24',
      position: { top: '45%', left: '25%' },
      tags: ['奶酪', '迷你', '温馨', '工厂'],
      articles: ['动物城次要角色图鉴']
    },
    meadowlands: {
      name: '草甸镇',
      nameEn: 'Meadowlands',
      icon: '🌾',
      color: '#2ED573',
      position: { top: '60%', left: '60%' },
      tags: ['草原', '森林', '野花', '鹿'],
      articles: ['动物城完全生存指南']
    }
  };

  // 地铁线路
  const metroLines = {
    blue: {
      name: '蓝线',
      color: '#0ABDE3',
      stations: ['冰川镇', '市中心', '雨林区', '撒哈拉广场']
    },
    green: {
      name: '绿线',
      color: '#10AC84',
      stations: ['兔窝镇', '市中心', '草甸镇']
    },
    orange: {
      name: '橙线',
      color: '#FF9F43',
      stations: ['撒哈拉广场', '市中心', '小啮齿镇']
    }
  };

  // 创建地图导航器
  function createMapNavigator() {
    const navigator = document.createElement('div');
    navigator.className = 'zootopia-map-navigator';

    navigator.innerHTML = `
      <div class="map-toggle-btn" title="打开动物城地图">
        <span class="map-icon">🗺️</span>
        <span class="map-text">地图</span>
      </div>
      <div class="map-panel">
        <div class="map-header">
          <h2>🌆 动物城地图导航</h2>
          <button class="map-close">×</button>
        </div>
        <div class="map-content">
          <div class="zootopia-map">
            <svg class="map-svg" viewBox="0 0 800 600">
              <!-- 背景 -->
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#FFE4C4;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#E3F2FD;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#C8E6C9;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="800" height="600" fill="url(#mapGrad)"/>

              <!-- 地铁线路 -->
              ${Object.entries(metroLines).map(([key, line]) => `
                <polyline
                  points="${getLinePoints(line.stations)}"
                  fill="none"
                  stroke="${line.color}"
                  stroke-width="3"
                  stroke-dasharray="10,5"
                  opacity="0.6"
                  class="metro-line"
                  data-line="${key}"
                />
              `).join('')}

              <!-- 连接线 -->
              <g opacity="0.3" stroke="#57606f" stroke-width="2">
                <line x1="200" y1="180" x2="400" y2="300"/>
                <line x1="400" y1="300" x2="600" y2="250"/>
                <line x1="400" y1="300" x2="400" y2="120"/>
                <line x1="400" y1="300" x2="200" y2="450"/>
                <line x1="400" y1="300" x2="250" y2="280"/>
                <line x1="400" y1="300" x2="520" y2="400"/>
                <line x1="120" y1="120" x2="400" y2="300"/>
              </g>

              <!-- 地区标记 -->
              ${Object.entries(districts).map(([key, district]) => `
                <g class="district-marker" data-district="${key}" transform="translate(${parseInt(district.position.left) * 8}, ${parseInt(district.position.top) * 6})">
                  <circle r="35" fill="${district.color}" opacity="0.3"/>
                  <circle r="25" fill="${district.color}" opacity="0.6"/>
                  <text text-anchor="middle" dominant-baseline="middle" font-size="24">${district.icon}</text>
                  <text y="45" text-anchor="middle" font-size="11" fill="#2D3436" font-weight="bold">${district.name}</text>
                </g>
              `).join('')}

              <!-- 市中心标注 -->
              <circle cx="400" cy="300" r="50" fill="none" stroke="#5F27CD" stroke-width="3" opacity="0.5">
                <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          <!-- 地区信息面板 -->
          <div class="district-info-panel">
            <div class="info-header">
              <span class="info-icon">🏙️</span>
              <span class="info-title">选择一个地区查看详情</span>
            </div>
            <div class="info-content" id="districtInfoContent">
              <p class="info-hint">👆 点击地图上的地区图标</p>
            </div>
          </div>

          <!-- 地铁线路信息 -->
          <div class="metro-info">
            <h3>🚇 地铁线路</h3>
            <div class="metro-lines">
              ${Object.entries(metroLines).map(([key, line]) => `
                <div class="metro-line-item">
                  <div class="line-color" style="background: ${line.color}"></div>
                  <div class="line-info">
                    <div class="line-name">${line.name}</div>
                    <div class="line-stations">${line.stations.join(' → ')}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    return navigator;
  }

  // 获取线路坐标点
  function getLinePoints(stations) {
    const points = stations.map(stationName => {
      for (const [key, district] of Object.entries(districts)) {
        if (district.name.includes(stationName) || stationName.includes(district.name)) {
          const x = parseInt(district.position.left) * 8;
          const y = parseInt(district.position.top) * 6;
          return `${x},${y}`;
        }
      }
      // 默认市中心
      return '400,300';
    });
    return points.join(' ');
  }

  // 显示地区信息
  function showDistrictInfo(districtKey) {
    const district = districts[districtKey];
    if (!district) return;

    const infoContent = document.getElementById('districtInfoContent');
    if (!infoContent) return;

    infoContent.innerHTML = `
      <div class="district-detail">
        <div class="detail-header">
          <span class="detail-icon">${district.icon}</span>
          <div class="detail-names">
            <div class="detail-name">${district.name}</div>
            <div class="detail-name-en">${district.nameEn}</div>
          </div>
        </div>
        <div class="detail-tags">
          ${district.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="detail-articles">
          <div class="articles-title">📝 相关文章</div>
          <ul>
            ${district.articles.map(article => `
              <li><a href="/">${article}</a></li>
            `).join('')}
          </ul>
        </div>
        <div class="detail-actions">
          <button class="action-btn primary" onclick="window.zootopiaSwitchDistrict('${districtKey}')">
            🎨 切换到此主题
          </button>
          <button class="action-btn secondary" onclick="window.showZootopiaCharacter()">
            💬 遇见角色
          </button>
        </div>
      </div>
    `;

    // 添加动画
    infoContent.style.animation = 'none';
    setTimeout(() => {
      infoContent.style.animation = 'contentFadeIn 0.5s ease';
    }, 10);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#map-navigator-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'map-navigator-styles';
    styles.textContent = `
      /* 地图导航器 */
      .zootopia-map-navigator {
        position: fixed;
        bottom: 170px;
        left: 30px;
        z-index: 9995;
      }

      .map-toggle-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 18px;
        background: linear-gradient(135deg, #5F27CD, #A29BFE);
        border: none;
        border-radius: 20px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(95, 39, 205, 0.4);
        transition: all 0.3s ease;
      }

      .map-toggle-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(95, 39, 205, 0.5);
      }

      .map-icon {
        font-size: 20px;
      }

      /* 地图面板 */
      .map-panel {
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 700px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        overflow: hidden;
        animation: mapSlideUp 0.3s ease;
      }

      .map-panel.show {
        display: block;
      }

      @keyframes mapSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .map-header {
        background: linear-gradient(135deg, #5F27CD, #A29BFE);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .map-header h2 {
        margin: 0;
        font-size: 18px;
      }

      .map-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .map-close:hover {
        opacity: 1;
      }

      .map-content {
        padding: 20px;
        max-height: calc(80vh - 70px);
        overflow-y: auto;
      }

      /* 动物城地图 */
      .zootopia-map {
        width: 100%;
        margin-bottom: 20px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .map-svg {
        width: 100%;
        height: auto;
        display: block;
      }

      .district-marker {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .district-marker:hover {
        transform: scale(1.1);
      }

      .metro-line {
        stroke-dashoffset: 0;
        animation: lineDash 20s linear infinite;
      }

      @keyframes lineDash {
        to {
          stroke-dashoffset: -300;
        }
      }

      /* 地区信息面板 */
      .district-info-panel {
        background: rgba(95, 39, 205, 0.05);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .info-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 2px dashed rgba(95, 39, 205, 0.2);
      }

      .info-icon {
        font-size: 28px;
      }

      .info-title {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
      }

      .info-hint {
        text-align: center;
        color: #636E72;
        font-size: 14px;
        padding: 20px;
      }

      .district-detail {
        animation: contentFadeIn 0.5s ease;
      }

      @keyframes contentFadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .detail-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
      }

      .detail-icon {
        font-size: 48px;
      }

      .detail-name {
        font-size: 20px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .detail-name-en {
        font-size: 12px;
        color: #636E72;
      }

      .detail-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 15px;
      }

      .tag {
        padding: 5px 12px;
        background: white;
        border-radius: 15px;
        font-size: 12px;
        color: #636E72;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .detail-articles {
        margin-bottom: 15px;
      }

      .articles-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .detail-articles ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .detail-articles li {
        padding: 8px 12px;
        background: white;
        border-radius: 8px;
        margin-bottom: 5px;
        transition: all 0.3s ease;
      }

      .detail-articles li:hover {
        background: rgba(95, 39, 205, 0.1);
        transform: translateX(5px);
      }

      .detail-articles a {
        color: #5F27CD;
        text-decoration: none;
        font-size: 14px;
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
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .action-btn.primary {
        background: linear-gradient(135deg, #5F27CD, #A29BFE);
        color: white;
      }

      .action-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(95, 39, 205, 0.4);
      }

      .action-btn.secondary {
        background: white;
        color: #5F27CD;
        border: 2px solid #5F27CD;
      }

      .action-btn.secondary:hover {
        background: rgba(95, 39, 205, 0.1);
      }

      /* 地铁信息 */
      .metro-info {
        background: rgba(10, 189, 227, 0.05);
        border-radius: 15px;
        padding: 20px;
      }

      .metro-info h3 {
        margin: 0 0 15px 0;
        font-size: 16px;
        color: #2D3436;
      }

      .metro-lines {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .metro-line-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        background: white;
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .metro-line-item:hover {
        background: rgba(10, 189, 227, 0.1);
      }

      .line-color {
        width: 4px;
        height: 40px;
        border-radius: 2px;
      }

      .line-name {
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .line-stations {
        font-size: 12px;
        color: #636E72;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .map-panel {
          width: calc(100vw - 80px);
          max-width: none;
        }

        .zootopia-map-navigator {
          bottom: 140px;
          left: 20px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化地图导航器
  function initMapNavigator() {
    injectStyles();

    const navigator = createMapNavigator();
    document.body.appendChild(navigator);

    // 切换面板
    const toggleBtn = navigator.querySelector('.map-toggle-btn');
    const panel = navigator.querySelector('.map-panel');

    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    };

    // 关闭按钮
    navigator.querySelector('.map-close').onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!navigator.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 地区标记点击
    navigator.querySelectorAll('.district-marker').forEach(marker => {
      marker.onclick = () => {
        const districtKey = marker.dataset.district;
        showDistrictInfo(districtKey);

        // 高亮选中的标记
        navigator.querySelectorAll('.district-marker').forEach(m => {
          m.style.opacity = '0.5';
        });
        marker.style.opacity = '1';
      };
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMapNavigator);
  } else {
    initMapNavigator();
  }
})();
