/**
 * 疯狂动物城主题 - 节日庆典系统
 * Zootopia Theme - Festival Celebration System
 * | 动物城的节日庆典活动
 */

(function() {
  'use strict';

  // 节日庆典数据库
  const zootopiaFestivals = {
    // 年度庆典
    annual: [
      {
        id: 'founding_day',
        name: '动物城日',
        nameEn: 'Zootopia Day',
        icon: '🏙️',
        date: '1月1日',
        duration: '3天',
        color: '#E74C3C',
        description: '庆祝动物城建立的日子',
        activities: ['城市巡游', '烟花表演', '免费音乐会', '市长致辞', '和平仪式'],
        highlights: ['全城放假', '大游行', 'Gazelle压轴演出']
      },
      {
        id: 'unity_day',
        name: '团结日',
        nameEn: 'Unity Day',
        icon: '🤝',
        date: '3月15日',
        duration: '1天',
        color: '#3498DB',
        description: '庆祝食肉动物和食草动物团结共处',
        activities: ['和平论坛', '文化交流', '联合演出', '友谊晚宴'],
        highlights: ['朱迪和尼克演讲', '跨区域派对']
      },
      {
        id: 'harvest_festival',
        name: '丰收节',
        nameEn: 'Harvest Festival',
        icon: '🌾',
        date: '9月20日',
        duration: '7天',
        color: '#F39C12',
        description: '庆祝丰收的农业节日',
        activities: ['农产品展', '美食市集', '农民市场', '丰收游行'],
        highlights: ['兔窝镇特色农产品', '南瓜雕刻比赛']
      },
      {
        id: 'winter_carnival',
        name: '冬季嘉年华',
        nameEn: 'Winter Carnival',
        icon: '❄️',
        date: '12月15日',
        duration: '14天',
        color: '#3498DB',
        description: '冬季庆典和冰雪活动',
        activities: ['冰雕展览', '滑雪比赛', '冰雪派对', '灯光秀'],
        highlights: ['冰川镇主办', '冰雕比赛', '跨年倒计时']
      }
    ],

    // 特别活动
    special: [
      {
        id: 'zootopia2_premiere',
        name: '《疯狂动物城2》首映庆典',
        icon: '🎬',
        date: '2025年11月18日 - 2026年1月27日',
        venue: '上海迪士尼',
        color: '#E91E63',
        description: '疯狂动物城2全球庆典',
        activities: ['角色见面会', '首映礼', '粉丝派对', '主题展览'],
        highlights: ['朱迪尼克新造型', '独家周边', '纪念品发售']
      },
      {
        id: 'gazelle_birthday',
        name: 'Gazelle生日庆典',
        icon: '🎂',
        date: 'Gazelle生日（每年不同）',
        venue: '雨林区体育场',
        color: '#E91E63',
        description: 'Gazelle粉丝的大型庆祝活动',
        activities: ['演唱会', '粉丝见面会', '限量周边发售', '慈善拍卖'],
        highlights: ['6只老虎伴舞', '新歌首唱', '粉丝互动']
      },
      {
        id: 'dmv_appreciation',
        name: 'DMV员工感谢日',
        icon: '🐢',
        date: '4月1日',
        venue: 'DMV总部',
        color: '#27AE60',
        description: '感谢闪电和DMV员工的特殊节日',
        activities: ['表彰仪式', '慢动作比赛', '冰淇淋派对'],
        highlights: ['闪电致辞（很慢）', '效率颁奖', '趣味活动']
      }
    ],

    // 地区节日
    regional: [
      {
        id: 'sahara_festival',
        name: '撒哈拉太阳节',
        region: 'sahara',
        icon: '☀️',
        date: '夏季每个月第一个周末',
        color: '#E67E22',
        description: '撒哈拉广场的热带庆典',
        activities: ['沙雕艺术', '沙漠美食节', '热浪派对', '骆驼赛跑'],
        features: ['白天沙滩', '夜晚篝火晚会', '传统音乐']
      },
      {
        id: 'tundratown_ice_festival',
        name: '冰雪节',
        region: 'tundratown',
        icon: '❄️',
        date: '12月整月',
        color: '#3498DB',
        description: '冰川镇的冬季庆典',
        activities: ['冰雕大赛', '滑冰比赛', '冰雪嘉年华', '极地体验'],
        features: ['冰雕展览', '冰上表演', '热巧克力站']
      },
      {
        id: 'rainforest_bloom',
        name: '雨林花朝节',
        region: 'rainforest',
        icon: '🌺',
        date: '春季',
        color: '#27AE60',
        description: '雨林区的花卉庆典',
        activities: ['花车游行', '花卉展览', '生态讲座', '自然摄影'],
        features: ['珍稀花卉', '蝴蝶园', '生态导览']
      },
      {
        id: 'downtown_night',
        name: '市中心灯光节',
        region: 'downtown',
        icon: '✨',
        date: '10月整月',
        color: '#9B59B6',
        description: '市中心区的灯光艺术节',
        activities: ['灯光秀', '夜市', '街头表演', '艺术展览'],
        features: ['建筑投影', '互动灯光', '夜游路线']
      }
    ]
  };

  // 当前状态
  let festivalState = {
    selectedFestival: null,
    showCountdown: false
  };

  // 创建节日庆典系统
  function createFestivalSystem() {
    const system = document.createElement('div');
    system.className = 'zootopia-festival-system';
    system.innerHTML = `
      <!-- 节日提醒通知 -->
      <div class="festival-notification" id="festivalNotification">
        <div class="notification-content" id="festivalContent"></div>
        <button class="notification-close" id="closeFestivalBtn">×</button>
      </div>

      <!-- 切换按钮 -->
      <div class="festival-toggle" id="festivalToggle">
        <span class="toggle-icon">🎉</span>
        <span class="toggle-text">节日庆典</span>
        <span class="festival-badge" id="festivalBadge">0</span>
      </div>

      <!-- 庆典面板 -->
      <div class="festival-panel" id="festivalPanel">
        <!-- 头部 -->
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🎊</span>
            <span class="title-text">动物城节日庆典</span>
          </div>
          <button class="close-btn" id="closeFestivalPanelBtn">×</button>
        </div>

        <!-- 分类标签 -->
        <div class="festival-tabs">
          <button class="festival-tab active" data-type="annual">📅 年度庆典</button>
          <button class="festival-tab" data-type="special">⭐ 特别活动</button>
          <button class="festival-tab" data-type="regional">🏘️ 地区节日</button>
        </div>

        <!-- 节日列表 -->
        <div class="festivals-container">
          <div class="festivals-list" id="festivalsList"></div>
        </div>

        <!-- 节日详情 -->
        <div class="festival-detail" id="festivalDetail" style="display: none;">
          <button class="back-btn" id="backToListBtn">← 返回列表</button>
          <div class="detail-content" id="festivalDetailContent"></div>
        </div>
      </div>
    `;

    return system;
  }

  // 渲染节日列表
  function renderFestivalsList(type = 'annual') {
    const listContainer = document.getElementById('festivalsList');

    if (!listContainer) return;

    let festivals = [];
    if (type === 'annual') {
      festivals = zootopiaFestivals.annual;
    } else if (type === 'special') {
      festivals = zootopiaFestivals.special;
    } else if (type === 'regional') {
      festivals = zootopiaFestivals.regional;
    }

    listContainer.innerHTML = festivals.map(festival => {
      const isOngoing = isFestivalOngoing(festival);
      const daysLeft = getDaysUntilFestival(festival);

      return `
        <div class="festival-card ${isOngoing ? 'ongoing' : ''}" data-id="${festival.id}">
          <div class="card-header" style="background: linear-gradient(135deg, ${festival.color}, ${festival.color}dd);">
            <div class="card-icon">${festival.icon}</div>
            <div class="card-info">
              <div class="card-name">${festival.name}</div>
              <div class="card-name-en">${festival.nameEn || ''}</div>
            </div>
            ${isOngoing ? '<div class="live-badge">进行中</div>' : ''}
          </div>
          <div class="card-body">
            <div class="card-meta">
              <span class="meta-date">📅 ${festival.date}</span>
              <span class="meta-duration">${festival.duration}</span>
            </div>
            <div class="card-description">${festival.description}</div>
            ${!isOngoing && daysLeft >= 0 ? `
              <div class="card-countdown">
                <span class="countdown-label">还有</span>
                <span class="countdown-days">${daysLeft}</span>
                <span class="countdown-unit">天</span>
              </div>
            ` : ''}
            <div class="card-highlights">
              ${festival.highlights.slice(0, 2).map(h => `
                <div class="highlight-item">✨ ${h}</div>
              `).join('')}
            </div>
            <button class="view-detail-btn">查看详情</button>
          </div>
        </div>
      `;
    }).join('');

    // 添加点击事件
    listContainer.querySelectorAll('.festival-card').forEach(card => {
      const btn = card.querySelector('.view-detail-btn');
      btn.onclick = () => {
        const festivalId = card.dataset.id;
        showFestivalDetail(festivalId);
      };
    });
  }

  // 检查节日是否正在进行
  function isFestivalOngoing(festival) {
    // 简化版检查，实际应该解析日期
    if (festival.date.includes('-')) {
      // 有日期范围
      const [start, end] = festival.date.split(' - ');
      const now = new Date();
      // 这里简化处理，实际应该解析完整日期
      return false;
    }
    return false;
  }

  // 获取距离节日的天数
  function getDaysUntilFestival(festival) {
    // 简化版，实际应该计算真实日期差
    return Math.floor(Math.random() * 100) + 1;
  }

  // 显示节日详情
  function showFestivalDetail(festivalId) {
    // 查找节日
    let festival = null;
    Object.values(zootopiaFestivals).forEach(category => {
      const found = category.find(f => f.id === festivalId);
      if (found) festival = found;
    });

    if (!festival) return;

    const detailContainer = document.getElementById('festivalDetail');
    const listContainer = document.querySelector('.festivals-container');
    const contentContainer = document.getElementById('festivalDetailContent');

    if (!detailContainer || !contentContainer) return;

    // 显示详情，隐藏列表
    detailContainer.style.display = 'block';
    listContainer.style.display = 'none';

    contentContainer.innerHTML = `
      <div class="detail-header" style="background: linear-gradient(135deg, ${festival.color}, ${festival.color}dd);">
        <div class="detail-icon">${festival.icon}</div>
        <div class="detail-info">
          <div class="detail-name">${festival.name}</div>
          <div class="detail-name-en">${festival.nameEn || ''}</div>
        </div>
      </div>

      <div class="detail-info">
        <div class="info-row">
          <span class="info-label">📅 日期</span>
          <span class="info-value">${festival.date}</span>
        </div>
        <div class="info-row">
          <span class="info-label">⏱️ 时长</span>
          <span class="info-value">${festival.duration}</span>
        </div>
        ${festival.venue ? `
          <div class="info-row">
            <span class="info-label">📍 地点</span>
            <span class="info-value">${festival.venue}</span>
          </div>
        ` : ''}
      </div>

      <div class="detail-description">${festival.description}</div>

      <div class="detail-activities">
        <div class="activities-title">🎭 活动内容</div>
        <div class="activities-list">
          ${festival.activities.map(activity => `
            <div class="activity-item">
              <span class="activity-icon">🎉</span>
              <span class="activity-text">${activity}</span>
            </div>
          `).join('')}
        </div>
      </div>

      ${festival.features ? `
        <div class="detail-features">
          <div class="features-title">✨ 特色亮点</div>
          <div class="features-grid">
            ${festival.features.map(feature => `
              <div class="feature-chip">${feature}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="detail-actions">
        <button class="action-btn calendar-btn" data-id="${festival.id}">
          <span>📅</span>
          <span>添加到日历</span>
        </button>
        <button class="action-btn share-btn" data-id="${festival.id}">
          <span>📤</span>
          <span>分享活动</span>
        </button>
        <button class="action-btn remind-btn" data-id="${festival.id}">
          <span>🔔</span>
          <span>设置提醒</span>
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
    const system = document.querySelector('.zootopia-festival-system');
    const panel = document.getElementById('festivalPanel');

    system.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#festival-system-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'festival-system-styles';
    styles.textContent = `
      /* 节日庆典系统容器 */
      .zootopia-festival-system {
        position: fixed;
        bottom: 630px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 节日通知 */
      .festival-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        width: 350px;
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(233, 30, 99, 0.4);
        z-index: 10002;
        display: none;
        animation: festivalSlideIn 0.5s ease;
      }

      .festival-notification.show {
        display: block;
      }

      @keyframes festivalSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .notification-content {
        padding: 20px;
      }

      .notification-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      /* 切换按钮 */
      .festival-toggle {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
        position: relative;
      }

      .festival-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(233, 30, 99, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: festivalPulse 2s ease infinite;
      }

      @keyframes festivalPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      .festival-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #F1C40F;
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 10px;
      }

      /* 庆典面板 */
      .festival-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 420px;
        max-height: 650px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }

      .festival-panel.visible {
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
        background: linear-gradient(135deg, #E91E63, #9C27B0);
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
      .festival-tabs {
        display: flex;
        border-bottom: 1px solid #ECF0F1;
      }

      .festival-tab {
        flex: 1;
        padding: 12px;
        border: none;
        background: #F8F9FA;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 12px;
        font-weight: 600;
      }

      .festival-tab.active {
        background: white;
        color: #E91E63;
        border-bottom: 3px solid #E91E63;
      }

      .festival-tab:hover:not(.active) {
        background: #ECF0F1;
      }

      /* 节日列表 */
      .festivals-container {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        max-height: 450px;
      }

      .festivals-list {
        display: grid;
        gap: 15px;
      }

      .festival-card {
        background: white;
        border: 1px solid #ECF0F1;
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .festival-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      }

      .festival-card.ongoing {
        border-color: #2ECC71;
        box-shadow: 0 0 20px rgba(46, 204, 113, 0.3);
      }

      .card-header {
        padding: 15px;
        color: white;
        display: flex;
        align-items: center;
        gap: 12px;
        position: relative;
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
        margin-top: 2px;
      }

      .live-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #2ECC71;
        color: white;
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
        animation: livePulse 1.5s ease infinite;
      }

      @keyframes livePulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .card-body {
        padding: 15px;
      }

      .card-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
        font-size: 11px;
        color: #636E72;
      }

      .card-countdown {
        background: #FFF9E6;
        padding: 8px 12px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 10px;
        color: #F39C12;
      }

      .countdown-label {
        font-size: 10px;
      }

      .countdown-days {
        font-size: 18px;
        font-weight: bold;
      }

      .card-description {
        font-size: 13px;
        color: #636E72;
        line-height: 1.5;
        margin-bottom: 10px;
      }

      .card-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 12px;
      }

      .highlight-item {
        background: #F8F9FA;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 10px;
        color: #636E72;
      }

      .view-detail-btn {
        width: 100%;
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .view-detail-btn:hover {
        transform: scale(1.02);
      }

      /* 节日详情 */
      .festival-detail {
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
        margin-top: 3px;
      }

      .detail-info {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 13px;
      }

      .info-label {
        color: #636E72;
      }

      .info-value {
        font-weight: bold;
        color: #2D3436;
      }

      .detail-description {
        font-size: 14px;
        color: #636E72;
        line-height: 1.6;
        margin-bottom: 15px;
      }

      .detail-activities {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .activities-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .activities-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .activity-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #2D3436;
      }

      .detail-features {
        margin-bottom: 15px;
      }

      .features-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .features-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .feature-chip {
        background: #E91E6315;
        color: #E91E63;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 11px;
        font-weight: 600;
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
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s ease;
      }

      .calendar-btn {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
      }

      .share-btn {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
      }

      .remind-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .action-btn:hover {
        transform: scale(1.05);
      }

      /* 滚动条 */
      .festivals-container::-webkit-scrollbar {
        width: 6px;
      }

      .festivals-container::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .festivals-container::-webkit-scrollbar-thumb {
        background: #E91E63;
        border-radius: 3px;
      }

      /* 响应式 */
      @media (max-width: 480px) {
        .zootopia-festival-system {
          right: 10px;
          bottom: 610px;
        }

        .festival-notification {
          width: calc(100vw - 40px);
          right: 20px;
        }

        .festival-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initFestivalSystem() {
    injectStyles();

    const system = createFestivalSystem();
    document.body.appendChild(system);

    // 切换按钮
    document.getElementById('festivalToggle').onclick = togglePanel;
    document.getElementById('closeFestivalPanelBtn').onclick = togglePanel;

    // 标签页切换
    document.querySelectorAll('.festival-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.festival-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const type = tab.dataset.type;
        renderFestivalsList(type);
      };
    });

    // 初始化年度庆典列表
    renderFestivalsList('annual');

    // 关闭通知按钮
    document.getElementById('closeFestivalBtn').onclick = () => {
      document.getElementById('festivalNotification').classList.remove('show');
    };

    // 导出全局函数
    window.zootopiaFestival = {
      show: () => {
        const system = document.querySelector('.zootopia-festival-system');
        if (!system.classList.contains('expanded')) {
          togglePanel();
        }
      },
      hide: () => {
        const system = document.querySelector('.zootopia-festival-system');
        if (system.classList.contains('expanded')) {
          togglePanel();
        }
      },
      showNotification: (festivalId) => {
        // 显示特定节日通知
      },
      getAllFestivals: () => zootopiaFestivals
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFestivalSystem);
  } else {
    initFestivalSystem();
  }
})();
