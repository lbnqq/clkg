/**
 * 疯狂动物城主题 - ZTA官方交通系统
 * Zootopia Theme - Zootopia Transit Authority Official
 * | 7条地铁线+1条郊区铁路完整系统
 */

(function() {
  'use strict';

  // Zootopia Transit Authority 官方数据
  const ztaSystem = {
    authority: {
      name: 'Zootopia Transit Authority',
      abbreviation: 'ZTA',
      founded: '动物城建立初期',
      director: 'Matthias Lechner (概念设计)',
      slogan: 'Connecting All Animals, All Sizes',
      logo: '🚇',
      color: '#2C3E50'
    },

    // 地铁线路
    lines: [
      {
        id: 'line1',
        name: 'Zootopia Loop',
        chineseName: '动物城环线',
        number: '1号线',
        color: '#E74C3C',
        type: '环线',
        description: '环绕市中心的主要环线',
        stations: [
          { name: 'Central Station', chineseName: '中央车站', district: 'Savanna Central', type: 'transfer' },
          { name: 'Savanna Central', chineseName: '草原中心', district: 'Savanna Central', type: 'terminal' },
          { name: 'City Hall', chineseName: '市政厅', district: 'Downtown', type: 'station' },
          { name: 'ZPD Headquarters', chineseName: 'ZPD总部', district: 'Downtown', type: 'station' },
          { name: 'Financial District', chineseName: '金融区', district: 'Downtown', type: 'station' }
        ],
        features: ['环线运营', '连接主要办公区', '高峰期高频次'],
        operatingHours: '05:30 - 01:00',
        frequency: '高峰3分钟，平峰6分钟'
      },
      {
        id: 'line2',
        name: 'Animalia Line',
        chineseName: '动物线',
        number: '2号线',
        color: '#3498DB',
        type: '南北线',
        description: '贯穿城市南北的干线',
        stations: [
          { name: 'Savanna Central', chineseName: '草原中心', district: 'Savanna Central', type: 'transfer' },
          { name: 'Rainforest District', chineseName: '雨林区', district: 'Rainforest District', type: 'transfer' },
          { name: 'Canal Street', chineseName: '运河街', district: 'Rainforest District', type: 'station' },
          { name: 'Meadowlands', chineseName: '草地', district: 'Rainforest District', type: 'station' }
        ],
        features: ['跨区主干线', '连接雨林区', '多尺度车厢设计'],
        operatingHours: '05:00 - 00:30',
        frequency: '高峰4分钟，平峰8分钟'
      },
      {
        id: 'line3',
        name: 'Inner Loop',
        chineseName: '内环线',
        number: '3号线',
        color: '#2ECC71',
        type: '环线',
        description: '服务于市中心的内环线',
        stations: [
          { name: 'Central Station', chineseName: '中央车站', district: 'Savanna Central', type: 'transfer' },
          { name: 'Downtown Loop', chineseName: '市中心环线', district: 'Downtown', type: 'station' },
          { name: 'Government Center', chineseName: '政府中心', district: 'Downtown', type: 'station' },
          { name: 'Civic Plaza', chineseName: '市民广场', district: 'Savanna Central', type: 'station' }
        ],
        features: ['市中心快捷', '政府区服务', '接驳多条线路'],
        operatingHours: '06:00 - 00:00',
        frequency: '5分钟一班'
      },
      {
        id: 'line4',
        name: 'Tundratown Line',
        chineseName: '冰川镇线',
        number: '4号线',
        color: '#00CEC9',
        type: '东西线',
        description: '连接冰川镇的东西向线路',
        stations: [
          { name: 'Tundratown Central', chineseName: '冰川镇中心', district: 'Tundratown', type: 'transfer' },
          { name: 'Frosty Road', chineseName: '霜冻路', district: 'Tundratown', type: 'station' },
          { name: 'Drift Street', chineseName: '漂移街', district: 'Tundratown', type: 'station' },
          { name: 'Avalanche Avenue', chineseName: '雪崩大道', district: 'Tundratown', type: 'station' },
          { name: 'Ice Palace', chineseName: '冰宫', district: 'Tundratown', type: 'station' },
          { name: 'Polar Plaza', chineseName: '极地广场', district: 'Tundratown', type: 'terminal' }
        ],
        features: ['冰雪主题站点', '保暖车厢', '极地区域服务'],
        operatingHours: '05:30 - 01:00',
        frequency: '高峰5分钟，平峰10分钟',
        notes: '车厢保持较低温度'
      },
      {
        id: 'line5',
        name: 'Oasis Loop',
        chineseName: '绿洲环线',
        number: '5号线',
        color: '#F39C12',
        type: '环线',
        description: '服务撒哈拉广场的环线',
        stations: [
          { name: 'Sahara Square Central', chineseName: '撒哈拉广场中心', district: 'Sahara Square', type: 'transfer' },
          { name: 'Palm Avenue', chineseName: '棕榈大道', district: 'Sahara Square', type: 'station' },
          { name: 'Sunset Boulevard', chineseName: '日落大道', district: 'Sahara Square', type: 'station' },
          { name: 'Mirage Gardens', chineseName: '海市蜃楼花园', district: 'Sahara Square', type: 'station' },
          { name: 'Oasis Terminal', chineseName: '绿洲终点站', district: 'Sahara Square', type: 'terminal' }
        ],
        features: ['沙漠主题站点', '空调系统', '游客区服务'],
        operatingHours: '06:00 - 00:00',
        frequency: '8分钟一班',
        notes: '夏季增加班次'
      },
      {
        id: 'line6',
        name: 'Rainforest District Line',
        chineseName: '雨林区线',
        number: '6号线',
        color: '#27AE60',
        type: '区域铁路',
        description: '深入雨林区的区域线路',
        stations: [
          { name: 'Rainforest Gateway', chineseName: '雨林门户', district: 'Rainforest District', type: 'transfer' },
          { name: 'Canopy Central', chineseName: '树冠中心', district: 'Rainforest District', type: 'station' },
          { name: 'Waterfall Station', chineseName: '瀑布站', district: 'Rainforest District', type: 'station' },
          { name: 'Jungle Junction', chineseName: '丛林枢纽', district: 'Rainforest District', type: 'station' },
          { name: 'Rainforest Terminal', chineseName: '雨林终点站', district: 'Rainforest District', type: 'terminal' }
        ],
        features: ['自然景观线路', '露天站台', '生态友好设计'],
        operatingHours: '06:00 - 22:00',
        frequency: '15分钟一班',
        notes: '部分站台有喷雾降温'
      },
      {
        id: 'line7',
        name: 'Line 7',
        chineseName: '7号线',
        number: '7号线',
        color: '#9B59B6',
        type: '支线',
        description: '连接次要区域的支线',
        stations: [
          { name: 'Central Station', chineseName: '中央车站', district: 'Savanna Central', type: 'transfer' },
          { name: 'Little Rodentia', chineseName: '小啮齿动物镇', district: 'Little Rodentia', type: 'station' },
          { name: 'Meadowlands', chineseName: '草地', district: 'Meadowlands', type: 'station' }
        ],
        features: ['小动物专用车厢', '微型站台', '社区服务'],
        operatingHours: '06:30 - 21:30',
        frequency: '20分钟一班',
        notes: '为小型动物设计'
      }
    ],

    // 郊区铁路
    suburban: {
      name: 'Suburban Railway',
      chineseName: '郊区铁路',
      color: '#34495E',
      description: '连接动物城与周边郊区的铁路',
      stations: [
        { name: 'Central Station', chineseName: '中央车站', type: 'hub' },
        { name: 'Bunnyburrow', chineseName: '兔窝镇', type: 'terminal' },
        { name: 'Meadowlands', chineseName: '草地', type: 'station' },
        { name: 'Forest Edge', chineseName: '森林边缘', type: 'station' }
      ],
      features: ['长距离运输', '城际连接', '大容量车厢'],
      operatingHours: '05:00 - 23:00',
      frequency: '30分钟一班'
    },

    // 车票系统
    fares: {
      currency: 'z (🥕)',
      base: { price: 2.00, description: '基础票价' },
      zones: { price: 0.50, description: '每增加一个区域' },
      daily: { price: 15.00, description: '日票' },
      weekly: { price: 80.00, description: '周票' },
      monthly: { price: 280.00, description: '月票' },
      discounts: {
        senior: '50%折扣',
        student: '25%折扣',
        child: '免费 (3岁以下)',
        disabled: '免费'
      }
    },

    // 多尺度设计
    multiScaling: {
      description: '为不同体型动物设计的交通系统',
      categories: [
        {
          type: '巨型动物',
          examples: ['大象', '犀牛', '长颈鹿'],
          carriage: '特大号车厢',
          features: ['加高车门', '强化地板', '专用座位区']
        },
        {
          type: '大型动物',
          examples: ['狮子', '老虎', '牛'],
          carriage: '大号车厢',
          features: ['宽敞空间', '加固扶手']
        },
        {
          type: '中型动物',
          examples: ['狼', '狐狸', '兔子'],
          carriage: '标准车厢',
          features: ['标准座位', '普通扶手']
        },
        {
          type: '小型动物',
          examples: ['老鼠', '仓鼠', '松鼠'],
          carriage: '微型车厢',
          features: ['迷你通道', '专用小门', '微型座位']
        }
      ]
    },

    // 服务特色
    features: [
      { name: '多尺度设计', description: '为不同体型动物提供合适的服务' },
      { name: '主题站点', description: '每个区域的站点都有独特主题' },
      { name: '无障碍设施', description: '全系统无障碍设计' },
      { name: '智能调度', description: '根据需求动态调整班次' },
      { name: '环保设计', description: '使用清洁能源' },
      { name: '多语言服务', description: '支持多种动物语言' },
      { name: '实时信息', description: '提供实时到站信息' },
      { name: '安全系统', description: 'ZPD巡逻保障安全' }
    ],

    // 规则与提示
    rules: [
      '🚇 请按体型排队，选择合适车厢',
      '🎫 上车前请购买车票或刷卡',
      '🚪 注意车门开关，小心夹伤',
      '👵 请为老幼病残孕让座',
      '🚭 全线禁烟（包括电子烟）',
      '🍔 禁止在车厢内饮食',
      '🔊 请保持安静，不要大声喧哗',
      '🐾 请妥善管理好您的宠物',
      '📱 紧急情况按红色报警按钮',
      '👮 配合ZPD人员的安全检查'
    ],

    // 趣味事实
    funFacts: [
      '🎨 地铁图由艺术总监Matthias Lechner设计',
      '🗺️ 设计灵感来自1972年纽约地铁图（Massimo Vignelli）',
      '🚇 中央车站是最大的换乘枢纽，连接5条线路',
      '🐘 特大号车厢可以容纳大象和长颈鹿',
      '🐭 小啮齿动物镇有专门的微型通道',
      '❄️ Tundratown Line车厢保持较低温度',
      '🌴 Sahara Square车站在夏季加强空调',
      '🌧️ Rainforest District部分站台有喷雾降温',
      '🔄 Zootopia Loop是唯一的环线',
      '📊 系统每天服务超过百万乘客'
    ]
  };

  // 创建交通系统面板
  function createTransitPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-zta-transit';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="zta-toggle" id="ztaToggle">
        <span class="toggle-icon">🚇</span>
        <span class="toggle-text">ZTA交通</span>
      </div>

      <!-- 主面板 -->
      <div class="zta-panel" id="ztaPanel" style="display: none;">
        <div class="panel-header">
          <div class="header-content">
            <span class="zta-logo">${ztaSystem.authority.logo}</span>
            <div class="header-text">
              <h2 class="zta-name">${ztaSystem.authority.name}</h2>
              <p class="zta-slogan">${ztaSystem.authority.slogan}</p>
            </div>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 内容标签 -->
        <div class="content-tabs">
          <button class="tab-btn active" data-tab="lines">线路</button>
          <button class="tab-btn" data-tab="map">地图</button>
          <button class="tab-btn" data-tab="fares">票价</button>
          <button class="tab-btn" data-tab="info">信息</button>
        </div>

        <!-- 内容区域 -->
        <div class="content-area" id="contentArea">
          <!-- 线路列表 -->
          <div class="tab-content active" data-content="lines" id="linesContent"></div>

          <!-- 地图 -->
          <div class="tab-content" data-content="map" id="mapContent"></div>

          <!-- 票价 -->
          <div class="tab-content" data-content="fares" id="faresContent"></div>

          <!-- 信息 -->
          <div class="tab-content" data-content="info" id="infoContent"></div>
        </div>
      </div>

      <!-- 线路详情模态框 -->
      <div class="line-modal" id="lineModal" style="display: none;">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content" id="lineModalContent"></div>
      </div>
    `;

    return panel;
  }

  // 渲染线路列表
  function renderLines() {
    const container = document.getElementById('linesContent');
    if (!container) return;

    container.innerHTML = `
      <div class="lines-list">
        ${ztaSystem.lines.map(line => `
          <div class="line-card" style="--line-color: ${line.color}" data-line="${line.id}">
            <div class="line-header">
              <div class="line-number" style="background: ${line.color}">${line.number}</div>
              <div class="line-info">
                <h3 class="line-name">${line.name}</h3>
                <p class="line-chinese-name">${line.chineseName}</p>
              </div>
              <span class="line-type">${line.type}</span>
            </div>
            <p class="line-description">${line.description}</p>
            <div class="line-stats">
              <span class="stat">🚇 ${line.stations.length}站</span>
              <span class="stat">🕐 ${line.operatingHours}</span>
            </div>
            <button class="view-line-btn" data-line="${line.id}">查看详情 →</button>
          </div>
        `).join('')}

        <!-- 郊区铁路 -->
        <div class="line-card suburban-card" style="--line-color: ${ztaSystem.suburban.color}" data-line="suburban">
          <div class="line-header">
            <div class="line-number" style="background: ${ztaSystem.suburban.color}">🚂</div>
            <div class="line-info">
              <h3 class="line-name">${ztaSystem.suburban.name}</h3>
              <p class="line-chinese-name">${ztaSystem.suburban.chineseName}</p>
            </div>
            <span class="line-type">区域铁路</span>
          </div>
          <p class="line-description">${ztaSystem.suburban.description}</p>
          <div class="line-stats">
            <span class="stat">🚇 ${ztaSystem.suburban.stations.length}站</span>
            <span class="stat">🕐 ${ztaSystem.suburban.operatingHours}</span>
          </div>
          <button class="view-line-btn" data-line="suburban">查看详情 →</button>
        </div>
      </div>
    `;

    // 添加查看详情事件
    container.querySelectorAll('.view-line-btn').forEach(btn => {
      btn.addEventListener('click', () => showLineDetails(btn.dataset.line));
    });
  }

  // 显示线路详情
  function showLineDetails(lineId) {
    const line = lineId === 'suburban' ? ztaSystem.suburban : ztaSystem.lines.find(l => l.id === lineId);
    if (!line) return;

    const modal = document.getElementById('lineModal');
    const content = document.getElementById('lineModalContent');

    if (!modal || !content) return;

    const color = line.color;

    content.innerHTML = `
      <div class="line-detail-header" style="background: ${color}">
        <button class="close-modal" id="closeModalBtn">×</button>
        <div class="detail-hero">
          <span class="detail-emoji">${lineId === 'suburban' ? '🚂' : '🚇'}</span>
          <div class="detail-title">
            <h2 class="detail-name">${line.name}</h2>
            <p class="detail-chinese-name">${line.chineseName}</p>
            <p class="detail-type">${line.type}</p>
          </div>
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-section">
          <h3 class="section-title">📝 线路描述</h3>
          <p class="section-content">${line.description}</p>
        </div>

        <div class="detail-section">
          <h3 class="section-title">🕐 运营时间</h3>
          <p class="section-content">${line.operatingHours}</p>
        </div>

        <div class="detail-section">
          <h3 class="section-title">⏱️ 发车间隔</h3>
          <p class="section-content">${line.frequency}</p>
        </div>

        ${line.features ? `
        <div class="detail-section">
          <h3 class="section-title">✨ 线路特色</h3>
          <div class="features-list">
            ${line.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
          </div>
        </div>
        ` : ''}

        ${line.notes ? `
        <div class="detail-section">
          <h3 class="section-title">📋 特别说明</h3>
          <p class="section-content">${line.notes}</p>
        </div>
        ` : ''}

        <div class="detail-section">
          <h3 class="section-title">🚇 站点列表</h3>
          <div class="stations-list">
            ${line.stations.map((station, index) => `
              <div class="station-item">
                <span class="station-number">${index + 1}</span>
                <div class="station-info">
                  <span class="station-name">${station.name}</span>
                  <span class="station-chinese">${station.chineseName}</span>
                </div>
                <div class="station-meta">
                  <span class="station-district">${station.district || ''}</span>
                  <span class="station-type ${station.type}">${getStationTypeLabel(station.type)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'block';

    document.getElementById('closeModalBtn').onclick = closeModal;
    document.getElementById('modalOverlay').onclick = closeModal;
  }

  // 获取站点类型标签
  function getStationTypeLabel(type) {
    const labels = {
      'transfer': '换乘',
      'terminal': '终点',
      'station': '车站',
      'hub': '枢纽'
    };
    return labels[type] || '';
  }

  // 关闭模态框
  function closeModal() {
    const modal = document.getElementById('lineModal');
    if (modal) modal.style.display = 'none';
  }

  // 渲染地图
  function renderMap() {
    const container = document.getElementById('mapContent');
    if (!container) return;

    container.innerHTML = `
      <div class="transit-map-container">
        <div class="map-placeholder">
          <div class="map-icon">🗺️</div>
          <h3>Zootopia Transit Map</h3>
          <p>动物城地铁系统示意图</p>
          <div class="map-legend">
            <h4>线路图例</h4>
            ${ztaSystem.lines.map(line => `
              <div class="legend-item">
                <span class="legend-color" style="background: ${line.color}"></span>
                <span class="legend-text">${line.number} ${line.chineseName}</span>
              </div>
            `).join('')}
            <div class="legend-item">
              <span class="legend-color" style="background: ${ztaSystem.suburban.color}"></span>
              <span class="legend-text">🚂 郊区铁路</span>
            </div>
          </div>
          <div class="map-note">
            <p>💡 地铁图由艺术总监 Matthias Lechner 设计</p>
            <p>🎨 设计灵感来自1972年纽约地铁图</p>
          </div>
        </div>
      </div>
    `;
  }

  // 渲染票价
  function renderFares() {
    const container = document.getElementById('faresContent');
    if (!container) return;

    const fares = ztaSystem.fares;

    container.innerHTML = `
      <div class="fares-container">
        <div class="fare-section">
          <h3 class="section-title">💰 基础票价</h3>
          <div class="fare-list">
            <div class="fare-item">
              <span class="fare-label">基础票价</span>
              <span class="fare-price">${fares.base.price} z</span>
            </div>
            <div class="fare-item">
              <span class="fare-label">每增加一个区域</span>
              <span class="fare-price">+${fares.zones.price} z</span>
            </div>
          </div>
        </div>

        <div class="fare-section">
          <h3 class="section-title">🎫 通票</h3>
          <div class="fare-list">
            <div class="fare-item">
              <span class="fare-label">日票 (24小时)</span>
              <span class="fare-price">${fares.daily.price} z</span>
            </div>
            <div class="fare-item">
              <span class="fare-label">周票 (7天)</span>
              <span class="fare-price">${fares.weekly.price} z</span>
            </div>
            <div class="fare-item">
              <span class="fare-label">月票 (30天)</span>
              <span class="fare-price">${fares.monthly.price} z</span>
            </div>
          </div>
        </div>

        <div class="fare-section">
          <h3 class="section-title">🏷️ 优惠</h3>
          <div class="discount-list">
            ${Object.entries(fares.discounts).map(([key, value]) => `
              <div class="discount-item">
                <span class="discount-label">${key}:</span>
                <span class="discount-value">${value}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="fare-note">
          <p>💡 使用日票可无限次乘坐所有线路</p>
          <p>🐾 小动物和老年动物可享受优惠</p>
        </div>
      </div>
    `;
  }

  // 渲染信息
  function renderInfo() {
    const container = document.getElementById('infoContent');
    if (!container) return;

    container.innerHTML = `
      <div class="info-container">
        <!-- 多尺度设计 -->
        <div class="info-section">
          <h3 class="section-title">📏 多尺度设计</h3>
          <p class="section-intro">${ztaSystem.multiScaling.description}</p>
          <div class="scaling-list">
            ${ztaSystem.multiScaling.categories.map(cat => `
              <div class="scaling-item">
                <h4 class="scaling-type">${cat.type}</h4>
                <p class="scaling-examples">例如: ${cat.examples.join('、')}</p>
                <div class="scaling-features">
                  ${cat.features.map(f => `<span class="scaling-feature">${f}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 服务特色 -->
        <div class="info-section">
          <h3 class="section-title">✨ 服务特色</h3>
          <div class="features-grid">
            ${ztaSystem.features.map(f => `
              <div class="feature-card">
                <span class="feature-icon">✅</span>
                <div class="feature-text">
                  <h4 class="feature-name">${f.name}</h4>
                  <p class="feature-desc">${f.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 乘车规则 -->
        <div class="info-section">
          <h3 class="section-title">📋 乘车规则</h3>
          <div class="rules-list">
            ${ztaSystem.rules.map(rule => `
              <div class="rule-item">${rule}</div>
            `).join('')}
          </div>
        </div>

        <!-- 趣味事实 -->
        <div class="info-section">
          <h3 class="section-title">💡 趣味事实</h3>
          <div class="facts-list">
            ${ztaSystem.funFacts.map(fact => `
              <div class="fact-item">${fact}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 切换标签
  function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabName);
    });

    // 渲染对应内容
    switch(tabName) {
      case 'lines': renderLines(); break;
      case 'map': renderMap(); break;
      case 'fares': renderFares(); break;
      case 'info': renderInfo(); break;
    }
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('ztaPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#zta-transit-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'zta-transit-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-zta-transit {
        position: fixed;
        bottom: 60px;
        right: 20px;
        z-index: 9993;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .zta-toggle {
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(44, 62, 80, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .zta-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(44, 62, 80, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: trainBounce 1.5s ease infinite;
      }

      @keyframes trainBounce {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-3px); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .zta-panel {
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
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .zta-logo {
        font-size: 32px;
      }

      .zta-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 3px 0;
      }

      .zta-slogan {
        font-size: 11px;
        margin: 0;
        opacity: 0.8;
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

      /* 标签 */
      .content-tabs {
        display: flex;
        padding: 10px;
        gap: 5px;
        border-bottom: 1px solid #ECF0F1;
      }

      .tab-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
      }

      .tab-btn:hover {
        background: #ECF0F1;
      }

      .tab-btn.active {
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
      }

      /* 内容区域 */
      .content-area {
        padding: 15px;
        overflow-y: auto;
        max-height: 550px;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      /* 线路卡片 */
      .lines-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .line-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        transition: all 0.3s ease;
      }

      .line-card:hover {
        border-color: var(--line-color, #2C3E50);
        box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
      }

      .line-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .line-number {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
      }

      .line-info {
        flex: 1;
      }

      .line-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 2px 0;
      }

      .line-chinese-name {
        font-size: 11px;
        color: #636E72;
        margin: 0;
      }

      .line-type {
        padding: 3px 8px;
        background: #F8F9FA;
        border-radius: 10px;
        font-size: 10px;
        color: #636E72;
      }

      .line-description {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 8px 0;
      }

      .line-stats {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
      }

      .stat {
        font-size: 11px;
        color: #636E72;
      }

      .view-line-btn {
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .view-line-btn:hover {
        transform: scale(1.02);
      }

      .suburban-card {
        border-color: #34495E;
      }

      /* 地图占位 */
      .transit-map-container {
        text-align: center;
      }

      .map-placeholder {
        background: linear-gradient(135deg, rgba(44, 62, 80, 0.05), rgba(52, 73, 94, 0.05));
        border-radius: 15px;
        padding: 30px 20px;
      }

      .map-icon {
        font-size: 64px;
        display: block;
        margin-bottom: 15px;
      }

      .map-placeholder h3 {
        font-size: 18px;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .map-placeholder p {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 20px 0;
      }

      .map-legend {
        margin: 20px 0;
      }

      .map-legend h4 {
        font-size: 14px;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
        font-size: 12px;
        color: #636E72;
      }

      .legend-color {
        width: 20px;
        height: 6px;
        border-radius: 3px;
      }

      .map-note {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ECF0F1;
      }

      .map-note p {
        font-size: 11px;
        color: #636E72;
        margin: 5px 0;
      }

      /* 票价 */
      .fares-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .fare-section {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .fare-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .fare-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: white;
        border-radius: 8px;
      }

      .fare-label {
        font-size: 12px;
        color: #636E72;
      }

      .fare-price {
        font-size: 16px;
        font-weight: bold;
        color: #2C3E50;
      }

      .discount-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .discount-item {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 8px;
        background: white;
        border-radius: 8px;
      }

      .discount-label {
        color: #636E72;
      }

      .discount-value {
        font-weight: bold;
        color: #27AE60;
      }

      .fare-note {
        background: rgba(44, 62, 80, 0.05);
        border-radius: 10px;
        padding: 12px;
        margin-top: 10px;
      }

      .fare-note p {
        font-size: 11px;
        color: #636E72;
        margin: 5px 0;
      }

      /* 信息 */
      .info-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .info-section {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
      }

      .section-intro {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 12px 0;
      }

      .scaling-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .scaling-item {
        background: white;
        padding: 12px;
        border-radius: 10px;
      }

      .scaling-type {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .scaling-examples {
        font-size: 11px;
        color: #636E72;
        margin: 0 0 8px 0;
      }

      .scaling-features {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .scaling-feature {
        padding: 3px 8px;
        background: rgba(44, 62, 80, 0.1);
        border-radius: 10px;
        font-size: 10px;
        color: #2C3E50;
      }

      .features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .feature-card {
        background: white;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        gap: 8px;
      }

      .feature-icon {
        font-size: 16px;
      }

      .feature-text {
        flex: 1;
      }

      .feature-name {
        font-size: 11px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 3px 0;
      }

      .feature-desc {
        font-size: 10px;
        color: #636E72;
        margin: 0;
      }

      .rules-list,
      .facts-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .rule-item,
      .fact-item {
        padding: 8px 12px;
        background: white;
        border-radius: 8px;
        font-size: 12px;
        color: #2D3436;
      }

      .fact-item {
        border-left: 3px solid #F39C12;
      }

      /* 线路详情模态框 */
      .line-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
      }

      .modal-content {
        position: relative;
        width: 90%;
        max-width: 450px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .line-detail-header {
        color: white;
        padding: 20px;
        position: relative;
      }

      .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1;
      }

      .detail-hero {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .detail-emoji {
        font-size: 48px;
      }

      .detail-name {
        font-size: 20px;
        font-weight: bold;
        margin: 0 0 5px 0;
      }

      .detail-chinese-name {
        font-size: 14px;
        margin: 0 0 3px 0;
        opacity: 0.9;
      }

      .detail-type {
        font-size: 12px;
        margin: 0;
        opacity: 0.8;
      }

      .detail-body {
        padding: 20px;
        overflow-y: auto;
        max-height: 60vh;
      }

      .detail-section {
        margin-bottom: 20px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .section-content {
        font-size: 13px;
        color: #636E72;
        line-height: 1.6;
        margin: 0;
      }

      .features-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .feature-tag {
        padding: 5px 12px;
        background: rgba(44, 62, 80, 0.1);
        border-radius: 15px;
        font-size: 11px;
        color: #2C3E50;
      }

      .stations-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .station-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        background: #F8F9FA;
        border-radius: 8px;
      }

      .station-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #2C3E50;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
      }

      .station-info {
        flex: 1;
      }

      .station-name {
        display: block;
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .station-chinese {
        display: block;
        font-size: 11px;
        color: #636E72;
      }

      .station-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 3px;
      }

      .station-district {
        font-size: 10px;
        color: #636E72;
      }

      .station-type {
        font-size: 9px;
        padding: 2px 6px;
        border-radius: 8px;
        color: white;
      }

      .station-type.transfer {
        background: #3498DB;
      }

      .station-type.terminal {
        background: #E74C3C;
      }

      .station-type.station {
        background: #95A5A6;
      }

      .station-type.hub {
        background: #F39C12;
      }

      /* 滚动条 */
      .content-area::-webkit-scrollbar,
      .detail-body::-webkit-scrollbar {
        width: 4px;
      }

      .content-area::-webkit-scrollbar-track,
      .detail-body::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .content-area::-webkit-scrollbar-thumb,
      .detail-body::-webkit-scrollbar-thumb {
        background: #2C3E50;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-zta-transit {
          right: 10px;
          bottom: 40px;
        }

        .zta-panel {
          width: calc(100vw - 20px);
        }

        .modal-content {
          width: 95%;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initZTATransit() {
    injectStyles();

    const transit = createTransitPanel();
    document.body.appendChild(transit);

    // 切换按钮
    document.getElementById('ztaToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('ztaPanel').style.display = 'none';
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 初始渲染
    renderLines();

    // 导出全局函数
    window.zootopiaZTA = {
      open: () => {
        document.getElementById('ztaPanel').style.display = 'block';
      },
      showLine: (lineId) => showLineDetails(lineId),
      showTab: (tabName) => switchTab(tabName)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initZTATransit);
  } else {
    initZTATransit();
  }
})();
