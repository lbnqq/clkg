/**
 * 疯狂动物城主题 - 交通地图系统
 * Zootopia Theme - Transit Map System
 * | 动物城地铁和火车线路图
 */

(function() {
  'use strict';

  // 动物城交通数据
  const zootopiaTransit = {
    centralStation: {
      name: '动物城中央车站',
      nameEn: 'Zootopia Central Station',
      icon: '🏠',
      color: '#34495E',
      description: '全城主要交通枢纽',
      dailyPassengers: 50000,
      connections: ['all'],
      features: ['美食广场', '游客中心', '行李寄存', 'Wi-Fi']
    },

    subwayLines: [
      {
        id: 'red',
        name: '红线',
        nameEn: 'Red Line',
        color: '#E74C3C',
        icon: '🔴',
        stations: [
          { id: 'r1', name: '撒哈拉广场站', district: 'sahara', transfers: ['orange'] },
          { id: 'r2', name: '热带市场站', district: 'sahara', transfers: [] },
          { id: 'r3', name: '沙漠购物中心站', district: 'sahara', transfers: ['yellow'] },
          { id: 'r4', name: '中央车站', district: 'downtown', transfers: ['all'] },
          { id: 'r5', name: '市政厅站', district: 'downtown', transfers: ['blue'] },
          { id: 'r6', name: '雨林东站', district: 'rainforest', transfers: ['green'] }
        ],
        operatingHours: '05:30 - 01:00',
        frequency: '3-5分钟',
        description: '连接撒哈拉广场和雨林区的主要线路'
      },
      {
        id: 'blue',
        name: '蓝线',
        nameEn: 'Blue Line',
        color: '#3498DB',
        icon: '🔵',
        stations: [
          { id: 'b1', name: '冰川镇北站', district: 'tundratown', transfers: ['green'] },
          { id: 'b2', name: '滑雪场站', district: 'tundratown', transfers: [] },
          { id: 'b3', name: '冰湖站', district: 'tundratown', transfers: [] },
          { id: 'b4', name: '中央车站', district: 'downtown', transfers: ['all'] },
          { id: 'b5', name: '金融区站', district: 'downtown', transfers: ['purple'] },
          { id: 'b6', name: '港口站', district: 'downtown', transfers: [] }
        ],
        operatingHours: '06:00 - 00:30',
        frequency: '4-6分钟',
        description: '冰川镇直达市中心的快速线路'
      },
      {
        id: 'green',
        name: '绿线',
        nameEn: 'Green Line',
        color: '#27AE60',
        icon: '🟢',
        stations: [
          { id: 'g1', name: '雨林西区站', district: 'rainforest', transfers: [] },
          { id: 'g2', name: '植物园站', district: 'rainforest', transfers: [] },
          { id: 'g3', name: '雨林东站', district: 'rainforest', transfers: ['red'] },
          { id: 'g4', name: '中央车站', district: 'downtown', transfers: ['all'] },
          { id: 'g5', name: '冰川镇南站', district: 'tundratown', transfers: ['blue'] },
          { id: 'g6', name: '原野公园站', district: 'meadowlands', transfers: [] }
        ],
        operatingHours: '06:00 - 00:00',
        frequency: '5-8分钟',
        description: '环线连接雨林区和冰川镇'
      },
      {
        id: 'yellow',
        name: '黄线',
        nameEn: 'Yellow Line',
        color: '#F1C40F',
        icon: '🟡',
        stations: [
          { id: 'y1', name: '兔窝镇站', district: 'bunnyburrow', transfers: [] },
          { id: 'y2', name: '农场站', district: 'bunnyburrow', transfers: [] },
          { id: 'y3', name: '郊外站', district: 'meadowlands', transfers: [] },
          { id: 'y4', name: '中央车站', district: 'downtown', transfers: ['all'] },
          { id: 'y5', name: '沙漠购物中心站', district: 'sahara', transfers: ['red'] },
          { id: 'y6', name: '绿洲站', district: 'sahara', transfers: [] }
        ],
        operatingHours: '05:00 - 02:00',
        frequency: '10-15分钟',
        description: '连接兔窝镇和撒哈拉广场的郊区线路'
      },
      {
        id: 'purple',
        name: '紫线',
        nameEn: 'Purple Line',
        color: '#9B59B6',
        icon: '🟣',
        stations: [
          { id: 'p1', name: '小啮齿动物镇站', district: 'little-rodentia', transfers: [] },
          { id: 'p2', name: '运河站', district: 'downtown', transfers: [] },
          { id: 'p3', name: '金融区站', district: 'downtown', transfers: ['blue'] },
          { id: 'p4', name: '中央车站', district: 'downtown', transfers: ['all'] },
          { id: 'p5', name: '市政府站', district: 'downtown', transfers: [] },
          { id: 'p6', name: '大剧院站', district: 'downtown', transfers: [] }
        ],
        operatingHours: '06:30 - 23:30',
        frequency: '6-10分钟',
        description: '市中心区域环线'
      }
    ],

    // 特快列车
    expressTrains: [
      {
        id: 'x1',
        name: '市郊快线',
        type: 'express',
        icon: '⚡',
        stations: ['兔窝镇站', '中央车站', '冰川镇站', '雨林站'],
        travelTime: '15分钟',
        price: 15,
        description: '快速连接主要城区'
      },
      {
        id: 'x2',
        name: '旅游专线',
        type: 'tourist',
        icon: '🎫',
        stations: ['中央车站', '撒哈拉广场', '冰川镇', '雨林区', '小啮齿动物镇'],
        travelTime: '30分钟',
        price: 25,
        description: '游客环城游览专线'
      }
    ],

    // 票价信息
    fareInfo: {
      baseFare: 3, // 基础票价（胡萝卜币）
      perStation: 0.5, // 每站加收
      dailyPass: 15, // 日票
      weeklyPass: 80, // 周票
      monthlyPass: 280 // 月票
    }
  };

  // 当前状态
  let transitState = {
    selectedLine: null,
    selectedStation: null,
    routeFrom: null,
    routeTo: null,
    calculatedRoute: null
  };

  // 创建交通地图
  function createTransitMap() {
    const map = document.createElement('div');
    map.className = 'zootopia-transit-map';
    map.innerHTML = `
      <!-- 最小化按钮 -->
      <div class="transit-toggle" id="transitToggle">
        <span class="toggle-icon">🗺️</span>
        <span class="toggle-text">交通地图</span>
      </div>

      <!-- 地图面板 -->
      <div class="transit-panel" id="transitPanel">
        <!-- 头部 -->
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🚇</span>
            <span class="title-text">动物城交通地图</span>
          </div>
          <button class="close-btn" id="closeTransitBtn">×</button>
        </div>

        <!-- 标签页 -->
        <div class="map-tabs">
          <button class="map-tab active" data-tab="lines">线路图</button>
          <button class="map-tab" data-tab="route">路线规划</button>
          <button class="map-tab" data-tab="info">票价信息</button>
        </div>

        <!-- 线路图内容 -->
        <div class="tab-content active" id="linesContent">
          <div class="lines-legend">
            <div class="legend-title">地铁线路</div>
            <div class="legend-items" id="linesLegend"></div>
          </div>
          <div class="lines-display" id="linesDisplay">
            <div class="station-map" id="stationMap"></div>
          </div>
          <div class="line-details" id="lineDetails"></div>
        </div>

        <!-- 路线规划内容 -->
        <div class="tab-content" id="routeContent">
          <div class="route-planner">
            <div class="planner-inputs">
              <div class="input-group">
                <label>出发地</label>
                <select id="routeFrom" class="route-select">
                  <option value="">选择出发站</option>
                </select>
              </div>
              <div class="input-group">
                <label>目的地</label>
                <select id="routeTo" class="route-select">
                  <option value="">选择目的站</option>
                </select>
              </div>
              <button class="plan-route-btn" id="planRouteBtn">
                <span>🔍</span>
                <span>规划路线</span>
              </button>
            </div>
            <div class="route-result" id="routeResult"></div>
          </div>
        </div>

        <!-- 票价信息内容 -->
        <div class="tab-content" id="infoContent">
          <div class="fare-info">
            <div class="fare-cards">
              <div class="fare-card">
                <div class="card-icon">🎫</div>
                <div class="card-title">单程票</div>
                <div class="card-price">¥3 起</div>
                <div class="card-desc">基础票价 + 每站¥0.5</div>
              </div>
              <div class="fare-card">
                <div class="card-icon">📅</div>
                <div class="card-title">日票</div>
                <div class="card-price">¥15</div>
                <div class="card-desc">当日无限次乘坐</div>
              </div>
              <div class="fare-card">
                <div class="card-icon">📆</div>
                <div class="card-title">周票</div>
                <div class="card-price">¥80</div>
                <div class="card-desc">7天无限次乘坐</div>
              </div>
              <div class="fare-card">
                <div class="card-icon">🗓️</div>
                <div class="card-title">月票</div>
                <div class="card-price">¥280</div>
                <div class="card-desc">30天无限次乘坐</div>
              </div>
            </div>
            <div class="fare-rules">
              <h3>购票须知</h3>
              <ul>
                <li>🐰 小动物（身高<1.2米）免费</li>
                <li>👴 老年动物（65岁以上）半价</li>
                <li>👮 警务人员凭证件免费</li>
                <li>🎫 游客可购买动物城通票</li>
                <li>⏰ 高峰时段（7-9点，17-19点）票价上浮20%</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 特快列车 -->
        <div class="express-trains">
          <div class="express-title">⚡ 特快列车</div>
          <div class="express-list" id="expressList"></div>
        </div>
      </div>
    `;

    return map;
  }

  // 渲染线路图例
  function renderLinesLegend() {
    const legend = document.getElementById('linesLegend');
    if (!legend) return;

    legend.innerHTML = zootopiaTransit.subwayLines.map(line => `
      <div class="legend-item" data-line="${line.id}">
        <div class="line-color" style="background: ${line.color}"></div>
        <div class="line-info">
          <div class="line-name">${line.icon} ${line.name}</div>
          <div class="line-desc">${line.description}</div>
        </div>
      </div>
    `).join('');

    // 添加点击事件
    legend.querySelectorAll('.legend-item').forEach(item => {
      item.onclick = () => {
        const lineId = item.dataset.line;
        showLineDetails(lineId);
      };
    });
  }

  // 渲染站点地图
  function renderStationMap() {
    const map = document.getElementById('stationMap');
    if (!map) return;

    // 创建SVG地图
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 300');
    svg.style.width = '100%';
    svg.style.height = '100%';

    // 绘制中央车站
    const centralCircle = document.createElementNS(svgNS, 'circle');
    centralCircle.setAttribute('cx', '200');
    centralCircle.setAttribute('cy', '150');
    centralCircle.setAttribute('r', '25');
    centralCircle.setAttribute('fill', '#34495E');
    centralCircle.setAttribute('class', 'central-station');
    svg.appendChild(centralCircle);

    const centralText = document.createElementNS(svgNS, 'text');
    centralText.setAttribute('x', '200');
    centralText.setAttribute('y', '155');
    centralText.setAttribute('text-anchor', 'middle');
    centralText.setAttribute('fill', 'white');
    centralText.setAttribute('font-size', '10');
    centralText.textContent = '中央车站';
    svg.appendChild(centralText);

    // 绘制各线路
    zootopiaTransit.subwayLines.forEach(line => {
      const path = document.createElementNS(svgNS, 'path');
      const d = generateLinePath(line);
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', line.color);
      path.setAttribute('stroke-width', '4');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('class', 'subway-line');
      path.dataset.line = line.id;
      svg.appendChild(path);

      // 绘制站点
      line.stations.forEach(station => {
        const pos = getStationPosition(station.id, line.id);
        if (pos && station.id !== '中央车站') {
          const circle = document.createElementNS(svgNS, 'circle');
          circle.setAttribute('cx', pos.x);
          circle.setAttribute('cy', pos.y);
          circle.setAttribute('r', '6');
          circle.setAttribute('fill', 'white');
          circle.setAttribute('stroke', line.color);
          circle.setAttribute('stroke-width', '3');
          circle.setAttribute('class', 'station-point');
          circle.dataset.station = station.id;
          circle.dataset.line = line.id;
          svg.appendChild(circle);
        }
      });
    });

    map.appendChild(svg);
  }

  // 生成线路路径
  function generateLinePath(line) {
    const points = line.stations.map(station => {
      const pos = getStationPosition(station.id, line.id);
      return pos ? `${pos.x},${pos.y}` : '';
    }).filter(p => p).join(' L ');

    return `M ${points}`;
  }

  // 获取站点位置（简化版）
  function getStationPosition(stationId, lineId) {
    const positions = {
      // 中央车站
      '中央车站': { x: 200, y: 150 },
      // 红线站点
      'r1': { x: 300, y: 80 },
      'r2': { x: 280, y: 100 },
      'r3': { x: 260, y: 120 },
      'r5': { x: 220, y: 120 },
      'r6': { x: 180, y: 200 },
      // 蓝线站点
      'b1': { x: 100, y: 80 },
      'b2': { x: 120, y: 60 },
      'b3': { x: 140, y: 100 },
      'b5': { x: 240, y: 150 },
      'b6': { x: 280, y: 180 },
      // 绿线站点
      'g1': { x: 150, y: 250 },
      'g2': { x: 170, y: 220 },
      'g3': { x: 180, y: 200 },
      'g5': { x: 160, y: 120 },
      'g6': { x: 100, y: 180 },
      // 黄线站点
      'y1': { x: 50, y: 250 },
      'y2': { x: 80, y: 230 },
      'y3': { x: 120, y: 210 },
      'y5': { x: 260, y: 120 },
      'y6': { x: 320, y: 90 },
      // 紫线站点
      'p1': { x: 350, y: 150 },
      'p2': { x: 300, y: 160 },
      'p3': { x: 240, y: 150 },
      'p5': { x: 180, y: 140 },
      'p6': { x: 220, y: 180 }
    };

    return positions[stationId] || null;
  }

  // 显示线路详情
  function showLineDetails(lineId) {
    const line = zootopiaTransit.subwayLines.find(l => l.id === lineId);
    const detailsContainer = document.getElementById('lineDetails');

    if (!line || !detailsContainer) return;

    detailsContainer.innerHTML = `
      <div class="line-detail-card" style="border-left: 4px solid ${line.color}">
        <div class="detail-header">
          <span class="detail-icon">${line.icon}</span>
          <div class="detail-title">${line.name} (${line.nameEn})</div>
        </div>
        <div class="detail-info">
          <div class="info-row">
            <span class="info-label">运营时间</span>
            <span class="info-value">${line.operatingHours}</span>
          </div>
          <div class="info-row">
            <span class="info-label">发车间隔</span>
            <span class="info-value">${line.frequency}</span>
          </div>
          <div class="info-row">
            <span class="info-label">站点数</span>
            <span class="info-value">${line.stations.length} 站</span>
          </div>
        </div>
        <div class="line-stations">
          <div class="stations-title">站点列表</div>
          <div class="stations-list">
            ${line.stations.map(station => `
              <div class="station-item">
                <span class="station-dot" style="background: ${line.color}"></span>
                <span class="station-name">${station.name}</span>
                ${station.transfers.length > 0 ? `
                  <span class="station-transfers">
                    ${station.transfers.includes('all') ? '🔄 全线换乘' : station.transfers.map(t => {
                      const transferLine = zootopiaTransit.subwayLines.find(l => l.id === t);
                      return transferLine ? transferLine.icon : '';
                    }).join(' ')}
                  </span>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 初始化路线选择器
  function initRouteSelectors() {
    const fromSelect = document.getElementById('routeFrom');
    const toSelect = document.getElementById('routeTo');

    if (!fromSelect || !toSelect) return;

    // 收集所有站点
    const allStations = new Set();
    zootopiaTransit.subwayLines.forEach(line => {
      line.stations.forEach(station => {
        allStations.add(station.name);
      });
    });

    // 填充选择器
    allStations.forEach(station => {
      const optionFrom = document.createElement('option');
      optionFrom.value = station;
      optionFrom.textContent = station;
      fromSelect.appendChild(optionFrom);

      const optionTo = document.createElement('option');
      optionTo.value = station;
      optionTo.textContent = station;
      toSelect.appendChild(optionTo);
    });
  }

  // 规划路线
  function planRoute() {
    const from = document.getElementById('routeFrom').value;
    const to = document.getElementById('routeTo').value;
    const resultContainer = document.getElementById('routeResult');

    if (!from || !to || from === to) {
      if (resultContainer) {
        resultContainer.innerHTML = '<div class="route-error">请选择不同的出发站和目的站</div>';
      }
      return;
    }

    // 简单路线计算（实际应该用更复杂的算法）
    const route = calculateSimpleRoute(from, to);

    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="route-result-card">
          <div class="route-header">
            <span class="route-icon">🗺️</span>
            <span class="route-title">推荐路线</span>
          </div>
          <div class="route-summary">
            <div class="summary-item">
              <span class="summary-label">出发</span>
              <span class="summary-value">${from}</span>
            </div>
            <div class="summary-arrow">↓</div>
            <div class="summary-item">
              <span class="summary-label">到达</span>
              <span class="summary-value">${to}</span>
            </div>
          </div>
          <div class="route-details">
            <div class="route-steps">
              ${route.steps.map((step, index) => `
                <div class="route-step">
                  <div class="step-number">${index + 1}</div>
                  <div class="step-content">
                    <div class="step-line" style="color: ${step.color}">
                      ${step.icon} ${step.line}
                    </div>
                    <div class="step-description">${step.description}</div>
                    <div class="step-stations">
                      ${step.stations.join(' → ')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="route-info">
            <div class="info-item">
              <span class="info-icon">⏱️</span>
              <span class="info-text">预计用时：${route.duration}</span>
            </div>
            <div class="info-item">
              <span class="info-icon">💰</span>
              <span class="info-text">票价：¥${route.fare}</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🚇</span>
              <span class="info-text">${route.transfers} 次换乘</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 简单路线计算
  function calculateSimpleRoute(from, to) {
    // 查找站点所在线路
    const fromLines = [];
    const toLines = [];

    zootopiaTransit.subwayLines.forEach(line => {
      if (line.stations.some(s => s.name === from)) fromLines.push(line);
      if (line.stations.some(s => s.name === to)) toLines.push(line);
    });

    // 检查是否在同一线路
    const commonLine = fromLines.find(l => toLines.includes(l));

    if (commonLine) {
      const fromIndex = commonLine.stations.findIndex(s => s.name === from);
      const toIndex = commonLine.stations.findIndex(s => s.name === to);
      const stations = commonLine.stations.slice(
        Math.min(fromIndex, toIndex),
        Math.max(fromIndex, toIndex) + 1
      ).map(s => s.name);

      return {
        steps: [{
          line: commonLine.name,
          icon: commonLine.icon,
          color: commonLine.color,
          description: '直达',
          stations: stations
        }],
        duration: `${Math.abs(toIndex - fromIndex) * 2}分钟`,
        fare: (zootopiaTransit.fareInfo.baseFare + Math.abs(toIndex - fromIndex) * zootopiaTransit.fareInfo.perStation).toFixed(1),
        transfers: 0
      };
    }

    // 需要换乘（简化：通过中央车站）
    return {
      steps: [
        {
          line: fromLines[0].name,
          icon: fromLines[0].icon,
          color: fromLines[0].color,
          description: '乘坐至中央车站',
          stations: [from, '中央车站']
        },
        {
          line: toLines[0].name,
          icon: toLines[0].icon,
          color: toLines[0].color,
          description: '换乘前往目的地',
          stations: ['中央车站', to]
        }
      ],
      duration: '15-20分钟',
      fare: (zootopiaTransit.fareInfo.baseFare * 2).toFixed(1),
      transfers: 1
    };
  }

  // 渲染特快列车
  function renderExpressTrains() {
    const list = document.getElementById('expressList');
    if (!list) return;

    list.innerHTML = zootopiaTransit.expressTrains.map(train => `
      <div class="express-train-card">
        <div class="train-icon">${train.icon}</div>
        <div class="train-info">
          <div class="train-name">${train.name}</div>
          <div class="train-type">${train.type === 'express' ? '快速列车' : '旅游专线'}</div>
          <div class="train-stations">${train.stations.join(' → ')}</div>
          <div class="train-details">
            <span class="train-time">⏱️ ${train.travelTime}</span>
            <span class="train-price">💰 ¥${train.price}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 切换标签页
  function switchTab(tabName) {
    // 更新标签状态
    document.querySelectorAll('.map-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });

    const targetContent = document.getElementById(`${tabName}Content`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  }

  // 切换面板
  function togglePanel() {
    const map = document.querySelector('.zootopia-transit-map');
    const panel = document.getElementById('transitPanel');

    map.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#transit-map-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'transit-map-styles';
    styles.textContent = `
      /* 交通地图容器 */
      .zootopia-transit-map {
        position: fixed;
        bottom: 220px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .transit-toggle {
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

      .transit-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 面板 */
      .transit-panel {
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

      .transit-panel.visible {
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

      /* 头部 */
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

      /* 标签页 */
      .map-tabs {
        display: flex;
        border-bottom: 1px solid #ECF0F1;
      }

      .map-tab {
        flex: 1;
        padding: 12px;
        border: none;
        background: #F8F9FA;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 13px;
        font-weight: 600;
      }

      .map-tab.active {
        background: white;
        color: #3498DB;
        border-bottom: 3px solid #3498DB;
      }

      .map-tab:hover:not(.active) {
        background: #ECF0F1;
      }

      /* 标签内容 */
      .tab-content {
        display: none;
        padding: 20px;
        max-height: 500px;
        overflow-y: auto;
      }

      .tab-content.active {
        display: block;
      }

      /* 线路图例 */
      .lines-legend {
        margin-bottom: 20px;
      }

      .legend-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .legend-items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: #F8F9FA;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .legend-item:hover {
        background: #ECF0F1;
        transform: translateX(5px);
      }

      .line-color {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .line-name {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
      }

      .line-desc {
        font-size: 10px;
        color: #636E72;
      }

      /* 站点地图 */
      .lines-display {
        margin-bottom: 20px;
      }

      .station-map {
        background: #F8F9FA;
        border-radius: 15px;
        padding: 20px;
        min-height: 300px;
      }

      .station-map svg {
        display: block;
      }

      .central-station {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .central-station:hover {
        r: 30;
      }

      .subway-line {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .subway-line:hover {
        stroke-width: 6;
      }

      .station-point {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .station-point:hover {
        r: 8;
      }

      /* 线路详情 */
      .line-detail-card {
        background: white;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
      }

      .detail-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      .detail-icon {
        font-size: 28px;
      }

      .detail-title {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .detail-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 15px;
      }

      .info-row {
        text-align: center;
        padding: 10px;
        background: #F8F9FA;
        border-radius: 8px;
      }

      .info-label {
        display: block;
        font-size: 11px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .info-value {
        display: block;
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      /* 站点列表 */
      .line-stations {
        margin-top: 15px;
      }

      .stations-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .stations-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .station-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: #F8F9FA;
        border-radius: 8px;
      }

      .station-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .station-name {
        flex: 1;
        font-size: 13px;
        color: #2D3436;
      }

      .station-transfers {
        font-size: 12px;
      }

      /* 路线规划 */
      .planner-inputs {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 20px;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .input-group label {
        font-size: 13px;
        font-weight: bold;
        color: #636E72;
      }

      .route-select {
        padding: 10px 12px;
        border: 1px solid #DDD;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
      }

      .plan-route-btn {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 12px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .plan-route-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
      }

      .route-error {
        background: #FEE;
        color: #C33;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
        font-size: 14px;
      }

      /* 路线结果 */
      .route-result-card {
        background: #F8F9FA;
        border-radius: 15px;
        padding: 20px;
      }

      .route-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
      }

      .route-icon {
        font-size: 28px;
      }

      .route-title {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .route-summary {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        padding: 15px;
        background: white;
        border-radius: 12px;
      }

      .summary-item {
        flex: 1;
        text-align: center;
      }

      .summary-label {
        display: block;
        font-size: 11px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .summary-value {
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
      }

      .summary-arrow {
        font-size: 20px;
        color: #3498DB;
      }

      .route-steps {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .route-step {
        display: flex;
        gap: 15px;
        padding: 15px;
        background: white;
        border-radius: 12px;
      }

      .step-number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #3498DB;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      .step-content {
        flex: 1;
      }

      .step-line {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .step-description {
        font-size: 13px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .step-stations {
        font-size: 12px;
        color: #3498DB;
      }

      .route-info {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #DDD;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
      }

      /* 票价信息 */
      .fare-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 20px;
      }

      .fare-card {
        background: white;
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }

      .fare-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }

      .card-icon {
        font-size: 36px;
        margin-bottom: 10px;
      }

      .card-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 8px;
      }

      .card-price {
        font-size: 24px;
        font-weight: bold;
        color: #E74C3C;
        margin-bottom: 8px;
      }

      .card-desc {
        font-size: 11px;
        color: #636E72;
      }

      .fare-rules {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
      }

      .fare-rules h3 {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .fare-rules ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .fare-rules li {
        font-size: 13px;
        color: #636E72;
        padding: 5px 0;
      }

      /* 特快列车 */
      .express-trains {
        border-top: 1px solid #ECF0F1;
        padding: 15px 20px;
        background: #F8F9FA;
      }

      .express-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .express-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .express-train-card {
        background: white;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        gap: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .train-icon {
        font-size: 32px;
        flex-shrink: 0;
      }

      .train-info {
        flex: 1;
      }

      .train-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .train-type {
        font-size: 11px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .train-stations {
        font-size: 12px;
        color: #3498DB;
        margin-bottom: 5px;
      }

      .train-details {
        display: flex;
        gap: 15px;
        font-size: 11px;
      }

      /* 滚动条 */
      .tab-content::-webkit-scrollbar {
        width: 6px;
      }

      .tab-content::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .tab-content::-webkit-scrollbar-thumb {
        background: #3498DB;
        border-radius: 3px;
      }

      /* 响应式 */
      @media (max-width: 500px) {
        .zootopia-transit-map {
          right: 10px;
          bottom: 200px;
        }

        .transit-panel {
          width: calc(100vw - 20px);
          max-width: 400px;
        }

        .fare-cards {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initTransitMap() {
    injectStyles();

    const map = createTransitMap();
    document.body.appendChild(map);

    // 切换按钮
    document.getElementById('transitToggle').onclick = togglePanel;
    document.getElementById('closeTransitBtn').onclick = togglePanel;

    // 标签页切换
    document.querySelectorAll('.map-tab').forEach(tab => {
      tab.onclick = () => {
        switchTab(tab.dataset.tab);
      };
    });

    // 初始化内容
    renderLinesLegend();
    renderStationMap();
    initRouteSelectors();
    renderExpressTrains();

    // 路线规划按钮
    document.getElementById('planRouteBtn').onclick = planRoute;

    // 导出全局函数
    window.zootopiaTransitMap = {
      show: () => {
        const map = document.querySelector('.zootopia-transit-map');
        if (!map.classList.contains('expanded')) {
          togglePanel();
        }
      },
      hide: () => {
        const map = document.querySelector('.zootopia-transit-map');
        if (map.classList.contains('expanded')) {
          togglePanel();
        }
      },
      planRoute: planRoute
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTransitMap);
  } else {
    initTransitMap();
  }
})();
