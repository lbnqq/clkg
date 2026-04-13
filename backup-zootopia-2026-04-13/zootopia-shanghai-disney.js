/**
 * 疯狂动物城主题 - 上海迪士尼园区指南
 * Zootopia Theme - Shanghai Disney Land Guide
 * | 世界首个疯狂动物城主题园区
 */

(function() {
  'use strict';

  // 上海迪士尼疯狂动物城园区数据
  const shanghaiDisneyZootopia = {
    parkInfo: {
      name: '疯狂动物城',
      englishName: 'Zootopia',
      openingDate: '2023年12月20日',
      status: '全新体验篇章 (2026)',
      tagline: '欢迎来到动物大都会！'
    },

    // 园区区域
    districts: [
      {
        id: 'glacier_town',
        name: '冰川镇',
        englishName: 'Glacier Town',
        emoji: '🧊',
        theme: '极地冰雪',
        colors: ['#74B9FF', '#0984E3'],
        description: '寒冷的北极主题区域，享受冰雪乐趣',
        attractions: [
          {
            name: '疯狂动物城：热力追踪',
            type: '骑乘设施',
            thrillLevel: '中等',
            duration: '约3分钟',
            description: '跟随朱迪和尼克追踪嫌疑人，穿越动物城各个区域'
          },
          {
            name: '雪橇冒险',
            type: '游乐设施',
            thrillLevel: '低',
            description: '适合全家体验的雪橇滑行'
          }
        ],
        photoSpots: [
          { name: '冰川镇标志', location: '入口处' },
          { name: '极光特效墙', location: '主通道' },
          { name: '冰雕艺术区', location: '中心广场' }
        ],
        food: [
          { name: '冰川冰沙', description: '清凉解暑' },
          { name: '企鹅饼干', description: '可爱造型' }
        ],
        merchandise: [
          { name: '冰川镇限定徽章', category: '徽章' },
          { name: '北极动物毛绒玩具', category: '玩具' }
        ]
      },
      {
        id: 'rainforest_district',
        name: '雨林区',
        englishName: 'Rainforest District',
        emoji: '🌿',
        theme: '热带雨林',
        colors: ['#00B894', '#00CEC9'],
        description: '郁郁葱葱的热带雨林，感受自然的魅力',
        attractions: [
          {
            name: '树冠漫步',
            type: '步行体验',
            thrillLevel: '低',
            description: '在空中步道欣赏雨林美景'
          },
          {
            name: '雨林奇遇',
            type: '互动体验',
            thrillLevel: '低',
            description: '寻找隐藏在雨林中的动物朋友'
          }
        ],
        photoSpots: [
          { name: '巨型榕树', location: '园区中央' },
          { name: '雨林小径', location: '步道' },
          { name: '瀑布景观', location: '水景区' }
        ],
        food: [
          { name: '热带水果杯', description: '新鲜水果' },
          { name: '雨林特饮', description: '清爽饮品' }
        ],
        merchandise: [
          { name: '雨林徽章', category: '徽章' },
          { name: '热带动物玩偶', category: '玩具' }
        ]
      },
      {
        id: 'savanna_central',
        name: '草原中心',
        englishName: 'Savanna Central',
        emoji: '🏙️',
        theme: '城市中心',
        colors: ['#FFA502', '#FF6348'],
        description: '繁华的动物城市中心，体验都市生活',
        attractions: [
          {
            name: 'ZPD总部参观',
            type: '步行体验',
            thrillLevel: '低',
            description: '探索动物城警察局，与朱迪和尼克合影'
          },
          {
            name: '城市广场庆典',
            type: '表演',
            thrillLevel: '低',
            description: '动物城居民们的日常庆典表演'
          },
          {
            name: '爪爪冰棍摊位',
            type: '互动体验',
            thrillLevel: '低',
            description: '购买并品尝尼克最爱的爪爪冰棍'
          }
        ],
        photoSpots: [
          { name: '动物城标志牌', location: '主入口' },
          { name: 'ZPD警局门口', location: '警局建筑前' },
          { name: '中央火车站', location: '车站区域' },
          { name: '城市天际线', location: '观景平台' }
        ],
        food: [
          { name: '爪爪冰棍', description: '经典电影美食' },
          { name: 'Bug Burga蝉汉堡', description: '昆虫汉堡' },
          { name: '胡萝卜汁', description: '朱迪最爱的饮料' }
        ],
        merchandise: [
          { name: 'ZYPD警徽', category: '徽章' },
          { name: '朱迪和尼克玩偶', category: '玩具' },
          { name: '动物城T恤', category: '服装' },
          { name: '爪爪冰棍钥匙扣', category: '配饰' }
        ]
      },
      {
        id: 'sahara_square',
        name: '撒哈拉广场',
        englishName: 'Sahara Square',
        emoji: '☀️',
        theme: '沙漠阳光',
        colors: ['#FDCB6E', '#E17055'],
        description: '阳光明媚的沙漠绿洲',
        attractions: [
          {
            name: '沙漠绿洲休息区',
            type: '休息区',
            thrillLevel: '低',
            description: '在棕榈树下享受阳光'
          }
        ],
        photoSpots: [
          { name: '棕榈树大道', location: '主街道' },
          { name: '沙漠日落墙', location: '背景墙' }
        ],
        food: [
          { name: '冰凉饮料', description: '解暑饮品' }
        ],
        merchandise: [
          { name: '撒哈拉徽章', category: '徽章' }
        ]
      }
    ],

    // 角色见面会
    characterMeetups: [
      {
        character: '朱迪·霍普斯',
        location: 'ZPD总部前',
        schedule: '每日多场次',
        photo: true,
        autograph: false,
        tips: '警官制服造型，可以和警局背景合影'
      },
      {
        character: '尼克·王尔德',
        location: '城市广场',
        schedule: '每日多场次',
        photo: true,
        autograph: false,
        tips: '经常和朱迪一起出现'
      },
      {
        character: '闪电',
        location: 'DMV区域',
        schedule: '不定时',
        photo: true,
        autograph: false,
        tips: '树懒动作很慢，要有耐心！'
      },
      {
        character: 'Gazelle',
        location: '城市广场舞台',
        schedule: '指定时间',
        photo: true,
        autograph: false,
        tips: '会跳舞表演'
      },
      {
        character: '牛局长',
        location: 'ZPD总部',
        schedule: '偶尔出现',
        photo: true,
        autograph: false,
        tips: '威严的豹子警官'
      },
      {
        character: '本杰明警官',
        location: 'ZPD总部',
        schedule: '前台区域',
        photo: true,
        autograph: false,
        tips: '热情的豹子，喜欢Gazelle'
      }
    ],

    // 隐藏彩蛋
    easterEggs: [
      { location: '雨林区', egg: '树懒闪电的相框' },
      { location: '冰川镇', egg: '最小的黑帮老鼠藏身处' },
      { location: '城市广场', egg: 'Mr.Big的豪车' },
      { location: 'ZPD总部', egg: '博戈局长的咖啡杯' },
      { location: '撒哈拉广场', egg: '尼克推销爪爪冰棍地点' },
      { location: '热力追踪排队区', egg: '各种动物的小物件' },
      { location: '旋转门区域', egg: '给小老鼠专门的小门' },
      { location: '各区域过渡处', egg: '不同体型的动物通道设计' }
    ],

    // 游玩贴士
    tips: [
      '🎢 热力追踪是最热门项目，建议开园第一时间前往',
      '📸 每个区域都有独特的拍照点，不要错过',
      '🍦 爪爪冰棍是必尝美食',
      '🐢 遇到闪电要耐心，这是他的特色！',
      '🎭 注意观察建筑细节，有很多电影彩蛋',
      '🌧️ 雨林区有喷雾特效，可能会弄湿衣服',
      '🧊 冰川镇气温较低，是夏天避暑好去处',
      '🎵 注意收听背景音乐，每个区域都有专属BGM',
      '🎫 角色见面会时间可能调整，查看园区APP',
      '🛍️ 限定商品数量有限，想要尽早购买'
    ],

    // 2026特别活动
    specialEvents: [
      {
        name: '全新体验篇章',
        period: '2026年全年',
        description: 'Zootopia 2电影新内容融入园区',
        highlights: ['新角色见面', '新故事场景', '新娱乐演出']
      },
      {
        name: '夏季冰节',
        period: '2026年6月-8月',
        location: '冰川镇',
        description: '夏日清凉特别活动'
      },
      {
        name: '雨林探险季',
        period: '2026年3月-5月',
        location: '雨林区',
        description: '探索热带雨林神秘生物'
      }
    ]
  };

  // 当前状态
  let guideState = {
    currentDistrict: null,
    collectedEggs: JSON.parse(localStorage.getItem('zootopiaDisneyEggs') || '[]'),
    visitedAreas: JSON.parse(localStorage.getItem('zootopiaDisneyVisited') || '[]'),
    panel: null
  };

  // 创建指南面板
  function createGuidePanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-disney-guide';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="disney-toggle" id="disneyToggle">
        <span class="toggle-icon">🏰</span>
        <span class="toggle-text">上海迪士尼</span>
      </div>

      <!-- 指南主面板 -->
      <div class="disney-guide-panel" id="disneyGuidePanel" style="display: none;">
        <div class="guide-header">
          <div class="guide-title">
            <span class="title-icon">🏰</span>
            <span class="title-text">上海迪士尼</span>
          </div>
          <button class="close-guide" id="closeGuideBtn">×</button>
        </div>

        <!-- 园区信息 -->
        <div class="park-info-section">
          <h2 class="section-title">${shanghaiDisneyZootopia.parkInfo.emoji} ${shanghaiDisneyZootopia.parkInfo.name}</h2>
          <p class="park-tagline">${shanghaiDisneyZootopia.parkInfo.tagline}</p>
          <p class="park-status">✨ ${shanghaiDisneyZootopia.parkInfo.status}</p>
          <p class="park-opening">📅 开园: ${shanghaiDisneyZootopia.parkInfo.openingDate}</p>
        </div>

        <!-- 标签页导航 -->
        <div class="guide-tabs">
          <button class="tab-btn active" data-tab="districts">区域</button>
          <button class="tab-btn" data-tab="characters">角色</button>
          <button class="tab-btn" data-tab="eggs">彩蛋</button>
          <button class="tab-btn" data-tab="tips">贴士</button>
          <button class="tab-btn" data-tab="events">活动</button>
        </div>

        <!-- 内容区域 -->
        <div class="guide-content" id="guideContent">
          <!-- 区域列表 -->
          <div class="tab-content active" data-content="districts" id="districtsContent"></div>

          <!-- 角色见面会 -->
          <div class="tab-content" data-content="characters" id="charactersContent"></div>

          <!-- 彩蛋收集 -->
          <div class="tab-content" data-content="eggs" id="eggsContent"></div>

          <!-- 游玩贴士 -->
          <div class="tab-content" data-content="tips" id="tipsContent"></div>

          <!-- 特别活动 -->
          <div class="tab-content" data-content="events" id="eventsContent"></div>
        </div>
      </div>

      <!-- 彩蛋发现通知 -->
      <div class="egg-notification" id="eggNotification">
        <div class="notification-content" id="eggNotificationContent"></div>
      </div>
    `;

    return panel;
  }

  // 渲染区域列表
  function renderDistricts() {
    const container = document.getElementById('districtsContent');
    if (!container) return;

    container.innerHTML = shanghaiDisneyZootopia.districts.map(district => `
      <div class="district-card" style="--theme-color: ${district.colors[0]}" data-district="${district.id}">
        <div class="district-header">
          <span class="district-emoji">${district.emoji}</span>
          <div class="district-info">
            <h3 class="district-name">${district.name}</h3>
            <p class="district-theme">${district.theme}</p>
          </div>
        </div>
        <p class="district-description">${district.description}</p>

        <div class="district-sections">
          <div class="district-section">
            <h4 class="section-label">🎢 游乐设施</h4>
            <div class="attraction-list">
              ${district.attractions.map(attr => `
                <div class="attraction-item">
                  <span class="attraction-name">${attr.name}</span>
                  <span class="attraction-type">${attr.type}</span>
                  <span class="attraction-thrill">刺激: ${attr.thrillLevel}</span>
                  <p class="attraction-desc">${attr.description}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="district-section">
            <h4 class="section-label">📸 拍照点</h4>
            <div class="photo-spot-list">
              ${district.photoSpots.map(spot => `
                <div class="photo-spot-item">
                  <span class="spot-name">${spot.name}</span>
                  <span class="spot-location">📍 ${spot.location}</span>
                </div>
              `).join('')}
            </div>
          </div>

          ${district.food.length > 0 ? `
          <div class="district-section">
            <h4 class="section-label">🍽️ 美食</h4>
            <div class="food-list">
              ${district.food.map(food => `
                <div class="food-item">
                  <span class="food-name">${food.name}</span>
                  <span class="food-desc">${food.description}</span>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          ${district.merchandise.length > 0 ? `
          <div class="district-section">
            <h4 class="section-label">🛍️ 商品</h4>
            <div class="merchandise-list">
              ${district.merchandise.map(item => `
                <div class="merchandise-item">
                  <span class="merch-category">[${item.category}]</span>
                  <span class="merch-name">${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>

        <button class="visit-district-btn" data-district="${district.id}">
          ${guideState.visitedAreas.includes(district.id) ? '✅ 已访问' : '标记访问'}
        </button>
      </div>
    `).join('');

    // 添加访问按钮事件
    container.querySelectorAll('.visit-district-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleVisitDistrict(btn.dataset.district));
    });
  }

  // 渲染角色见面会
  function renderCharacters() {
    const container = document.getElementById('charactersContent');
    if (!container) return;

    container.innerHTML = `
      <div class="character-meetup-list">
        ${shanghaiDisneyZootopia.characterMeetups.map(char => `
          <div class="character-meetup-card">
            <div class="character-header">
              <h3 class="character-name">${char.character}</h3>
            </div>
            <div class="character-details">
              <p class="character-location">📍 ${char.location}</p>
              <p class="character-schedule">⏰ ${char.schedule}</p>
              <div class="character-features">
                ${char.photo ? '<span class="feature-tag">📸 可合影</span>' : ''}
                ${char.autograph ? '<span class="feature-tag">✍️ 可签名</span>' : ''}
              </div>
              <p class="character-tips">💡 ${char.tips}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 渲染彩蛋收集
  function renderEggs() {
    const container = document.getElementById('eggsContent');
    if (!container) return;

    container.innerHTML = `
      <div class="egg-collection">
        <div class="egg-stats">
          <p class="collected-count">已发现: ${guideState.collectedEggs.length} / ${shanghaiDisneyZootopia.easterEggs.length}</p>
        </div>
        <div class="egg-list">
          ${shanghaiDisneyZootopia.easterEggs.map((egg, index) => {
            const isFound = guideState.collectedEggs.includes(index);
            return `
              <div class="egg-item ${isFound ? 'found' : ''}" data-egg="${index}">
                <span class="egg-icon">${isFound ? '🥚✨' : '❓'}</span>
                <div class="egg-info">
                  <p class="egg-location">📍 ${egg.location}</p>
                  <p class="egg-desc">${isFound ? egg.egg : '??? (去园区寻找！)'}</p>
                </div>
                ${!isFound ? `<button class="find-egg-btn" data-egg="${index}">发现彩蛋!</button>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // 添加发现按钮事件
    container.querySelectorAll('.find-egg-btn').forEach(btn => {
      btn.addEventListener('click', () => discoverEgg(parseInt(btn.dataset.egg)));
    });
  }

  // 渲染贴士
  function renderTips() {
    const container = document.getElementById('tipsContent');
    if (!container) return;

    container.innerHTML = `
      <div class="tips-list">
        ${shanghaiDisneyZootopia.tips.map(tip => `
          <div class="tip-item">${tip}</div>
        `).join('')}
      </div>
    `;
  }

  // 渲染活动
  function renderEvents() {
    const container = document.getElementById('eventsContent');
    if (!container) return;

    container.innerHTML = `
      <div class="events-list">
        ${shanghaiDisneyZootopia.specialEvents.map(event => `
          <div class="event-card">
            <h3 class="event-name">🎉 ${event.name}</h3>
            <p class="event-period">📅 ${event.period}</p>
            ${event.location ? `<p class="event-location">📍 ${event.location}</p>` : ''}
            <p class="event-description">${event.description}</p>
            ${event.highlights ? `
              <div class="event-highlights">
                <h4>活动亮点:</h4>
                ${event.highlights.map(h => `<span class="highlight-tag">${h}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // 切换访问状态
  function toggleVisitDistrict(districtId) {
    const index = guideState.visitedAreas.indexOf(districtId);
    if (index > -1) {
      guideState.visitedAreas.splice(index, 1);
    } else {
      guideState.visitedAreas.push(districtId);
      showNotification(`🎉 已访问 ${shanghaiDisneyZootopia.districts.find(d => d.id === districtId).name}!`);
    }
    localStorage.setItem('zootopiaDisneyVisited', JSON.stringify(guideState.visitedAreas));
    renderDistricts();
  }

  // 发现彩蛋
  function discoverEgg(eggIndex) {
    if (guideState.collectedEggs.includes(eggIndex)) return;

    guideState.collectedEggs.push(eggIndex);
    localStorage.setItem('zootopiaDisneyEggs', JSON.stringify(guideState.collectedEggs));

    const egg = shanghaiDisneyZootopia.easterEggs[eggIndex];
    showEggNotification(egg);

    renderEggs();
  }

  // 显示彩蛋发现通知
  function showEggNotification(egg) {
    const notification = document.getElementById('eggNotification');
    const content = document.getElementById('eggNotificationContent');

    if (!notification || !content) return;

    content.innerHTML = `
      <div class="egg-notification-icon">🥚✨</div>
      <div class="egg-notification-text">发现彩蛋！</div>
      <div class="egg-notification-detail">${egg.egg}</div>
      <div class="egg-notification-location">📍 ${egg.location}</div>
    `;

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 5000);
  }

  // 显示普通通知
  function showNotification(message) {
    const notification = document.getElementById('eggNotification');
    const content = document.getElementById('eggNotificationContent');

    if (!notification || !content) return;

    content.innerHTML = `
      <div class="notification-icon">✨</div>
      <div class="notification-message">${message}</div>
    `;

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // 切换标签
  function switchTab(tabName) {
    // 更新按钮状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // 更新内容显示
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabName);
    });

    // 渲染对应内容
    switch(tabName) {
      case 'districts': renderDistricts(); break;
      case 'characters': renderCharacters(); break;
      case 'eggs': renderEggs(); break;
      case 'tips': renderTips(); break;
      case 'events': renderEvents(); break;
    }
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('disneyGuidePanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#disney-guide-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'disney-guide-styles';
    styles.textContent = `
      /* 指南容器 */
      .zootopia-disney-guide {
        position: fixed;
        bottom: 360px;
        right: 20px;
        z-index: 9998;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .disney-toggle {
        background: linear-gradient(135deg, #00CEC9, #0984E3);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 206, 201, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .disney-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 206, 201, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: castleBounce 2s ease infinite;
      }

      @keyframes castleBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 指南面板 */
      .disney-guide-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 420px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .guide-header {
        background: linear-gradient(135deg, #00CEC9, #0984E3);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .guide-title {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: bold;
      }

      .close-guide {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .close-guide:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* 园区信息 */
      .park-info-section {
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(0, 206, 201, 0.1), rgba(9, 132, 227, 0.1));
        text-align: center;
      }

      .section-title {
        font-size: 18px;
        margin: 0 0 8px 0;
        color: #0984E3;
      }

      .park-tagline {
        font-size: 14px;
        color: #2D3436;
        margin: 5px 0;
      }

      .park-status {
        font-size: 12px;
        color: #00B894;
        margin: 5px 0;
      }

      .park-opening {
        font-size: 12px;
        color: #636E72;
        margin: 5px 0 0 0;
      }

      /* 标签页 */
      .guide-tabs {
        display: flex;
        padding: 10px 15px;
        gap: 5px;
        border-bottom: 1px solid #ECF0F1;
      }

      .tab-btn {
        flex: 1;
        padding: 8px 10px;
        border: none;
        background: transparent;
        border-radius: 20px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #636E72;
      }

      .tab-btn:hover {
        background: #F8F9FA;
      }

      .tab-btn.active {
        background: linear-gradient(135deg, #00CEC9, #0984E3);
        color: white;
      }

      /* 内容区域 */
      .guide-content {
        padding: 15px;
        overflow-y: auto;
        max-height: 500px;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      /* 区域卡片 */
      .district-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 15px;
        transition: all 0.3s ease;
      }

      .district-card:hover {
        border-color: var(--theme-color, #00CEC9);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 206, 201, 0.2);
      }

      .district-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
      }

      .district-emoji {
        font-size: 32px;
      }

      .district-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        color: #2D3436;
      }

      .district-theme {
        font-size: 12px;
        color: #636E72;
        margin: 2px 0 0 0;
      }

      .district-description {
        font-size: 13px;
        color: #636E72;
        margin: 0 0 15px 0;
      }

      .district-sections {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .district-section {
        background: #F8F9FA;
        border-radius: 10px;
        padding: 10px;
      }

      .section-label {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .attraction-item,
      .photo-spot-item,
      .food-item,
      .merchandise-item {
        padding: 8px;
        background: white;
        border-radius: 8px;
        margin-bottom: 6px;
      }

      .attraction-name,
      .spot-name,
      .food-name {
        font-weight: bold;
        color: #2D3436;
      }

      .attraction-type,
      .attraction-thrill,
      .spot-location,
      .food-desc {
        font-size: 11px;
        color: #636E72;
      }

      .attraction-desc {
        font-size: 12px;
        color: #636E72;
        margin: 5px 0 0 0;
      }

      .visit-district-btn {
        width: 100%;
        margin-top: 10px;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: linear-gradient(135deg, #00B894, #00CEC9);
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .visit-district-btn:hover {
        transform: scale(1.02);
      }

      /* 角色卡片 */
      .character-meetup-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 15px;
        padding: 12px;
        margin-bottom: 10px;
      }

      .character-name {
        font-size: 15px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .character-details p {
        font-size: 12px;
        color: #636E72;
        margin: 4px 0;
      }

      .character-features {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin: 8px 0;
      }

      .feature-tag {
        padding: 3px 8px;
        background: #00CEC9;
        color: white;
        border-radius: 10px;
        font-size: 10px;
      }

      /* 彩蛋收集 */
      .egg-stats {
        text-align: center;
        padding: 10px;
        background: linear-gradient(135deg, rgba(255, 159, 67, 0.1), rgba(255, 107, 107, 0.1));
        border-radius: 10px;
        margin-bottom: 15px;
      }

      .collected-count {
        font-size: 14px;
        font-weight: bold;
        color: #FF9F43;
      }

      .egg-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 10px;
        margin-bottom: 8px;
        transition: all 0.3s ease;
      }

      .egg-item.found {
        border-color: #FFD700;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 159, 67, 0.1));
      }

      .egg-icon {
        font-size: 24px;
      }

      .egg-info {
        flex: 1;
      }

      .egg-location,
      .egg-desc {
        font-size: 12px;
        color: #636E72;
        margin: 2px 0;
      }

      .find-egg-btn {
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: #FF9F43;
        color: white;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .find-egg-btn:hover {
        background: #FF8C42;
        transform: scale(1.05);
      }

      /* 贴士列表 */
      .tip-item {
        padding: 10px 15px;
        background: white;
        border-left: 4px solid #00CEC9;
        border-radius: 8px;
        margin-bottom: 8px;
        font-size: 13px;
        color: #2D3436;
      }

      /* 活动卡片 */
      .event-card {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 12px;
      }

      .event-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 8px 0;
      }

      .event-period,
      .event-location {
        font-size: 12px;
        opacity: 0.9;
        margin: 4px 0;
      }

      .event-description {
        font-size: 13px;
        margin: 8px 0;
      }

      .event-highlights {
        margin-top: 10px;
      }

      .event-highlights h4 {
        font-size: 12px;
        margin: 0 0 6px 0;
      }

      .highlight-tag {
        display: inline-block;
        padding: 4px 10px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        font-size: 11px;
        margin-right: 5px;
        margin-bottom: 5px;
      }

      /* 彩蛋通知 */
      .egg-notification {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 300px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
        transition: all 0.3s ease;
      }

      .egg-notification.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .egg-notification-content {
        padding: 15px;
        text-align: center;
      }

      .egg-notification-icon {
        font-size: 40px;
        margin-bottom: 10px;
      }

      .egg-notification-text {
        font-size: 16px;
        font-weight: bold;
        color: #FF9F43;
        margin-bottom: 8px;
      }

      .egg-notification-detail {
        font-size: 14px;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .egg-notification-location {
        font-size: 12px;
        color: #636E72;
      }

      .notification-icon {
        font-size: 32px;
        margin-bottom: 8px;
      }

      .notification-message {
        font-size: 14px;
        color: #2D3436;
      }

      /* 滚动条 */
      .guide-content::-webkit-scrollbar {
        width: 4px;
      }

      .guide-content::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .guide-content::-webkit-scrollbar-thumb {
        background: #00CEC9;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-disney-guide {
          right: 10px;
          bottom: 340px;
        }

        .disney-guide-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initDisneyGuide() {
    injectStyles();

    const guide = createGuidePanel();
    document.body.appendChild(guide);

    // 切换按钮
    document.getElementById('disneyToggle').onclick = togglePanel;
    document.getElementById('closeGuideBtn').onclick = () => {
      document.getElementById('disneyGuidePanel').style.display = 'none';
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 初始渲染
    renderDistricts();

    // 导出全局函数
    window.zootopiaDisneyGuide = {
      open: () => {
        document.getElementById('disneyGuidePanel').style.display = 'block';
      },
      showTab: (tabName) => switchTab(tabName),
      discoverEgg: discoverEgg
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDisneyGuide);
  } else {
    initDisneyGuide();
  }
})();
