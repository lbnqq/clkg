/**
 * 疯狂动物城主题 - 角色见面会系统
 * Zootopia Theme - Character Meetup System
 * | 动物城角色见面时间表与互动
 */

(function() {
  'use strict';

  // 角色见面会数据
  const characterMeetups = {
    // 上海迪士尼
    shanghaiDisney: [
      {
        id: 'judy_shanghai',
        character: '朱迪·霍普斯',
        emoji: '🐰',
        location: 'ZPD总部前',
        area: '草原中心',
        schedule: [
          { day: '周一至周五', times: ['10:30', '13:00', '15:30'] },
          { day: '周末及节假日', times: ['10:00', '11:30', '14:00', '15:30', '17:00'] }
        ],
        duration: '每场约20分钟',
        photo: true,
        autograph: false,
        tips: '警官制服造型，建议提前10分钟排队',
        waitTime: '20-40分钟',
        bestTime: '开园第一场'
      },
      {
        id: 'nick_shanghai',
        character: '尼克·王尔德',
        emoji: '🦊',
        location: '城市广场',
        area: '草原中心',
        schedule: [
          { day: '周一至周五', times: ['11:00', '13:30', '16:00'] },
          { day: '周末及节假日', times: ['10:30', '12:00', '14:30', '16:00', '17:30'] }
        ],
        duration: '每场约20分钟',
        photo: true,
        autograph: false,
        tips: '经常和朱迪一起出现，可以双人合影',
        waitTime: '15-35分钟',
        bestTime: '下午场次'
      },
      {
        id: 'flash_shanghai',
        character: '闪电',
        emoji: '🐢',
        location: 'DMV区域',
        area: '草原中心',
        schedule: [
          { day: '每日', times: ['11:30', '14:30', '16:30'] }
        ],
        duration: '每场约15分钟',
        photo: true,
        autograph: false,
        tips: '树懒动作很慢，要有耐心！互动很有趣',
        waitTime: '10-25分钟',
        bestTime: '任何时间'
      },
      {
        id: 'gazelle_shanghai',
        character: 'Gazelle',
        emoji: '🦌',
        location: '城市广场舞台',
        area: '草原中心',
        schedule: [
          { day: '每日', times: ['12:00', '15:00', '17:30'] }
        ],
        duration: '每场约15分钟',
        photo: true,
        autograph: false,
        tips: '会跳舞表演，建议选前排位置观赏',
        waitTime: '15-30分钟',
        bestTime: '下午3点场'
      },
      {
        id: 'bogo_shanghai',
        character: '博戈局长',
        emoji: '🦁',
        location: 'ZPD总部',
        area: '草原中心',
        schedule: [
          { day: '不定时', times: ['看园区公告'] }
        ],
        duration: '约10分钟',
        photo: true,
        autograph: false,
        tips: '偶尔出现，威严的豹子警官',
        waitTime: '不定',
        bestTime: '碰运气'
      },
      {
        id: 'benjamin_shanghai',
        character: '本杰明警官',
        emoji: '🐆',
        location: 'ZPD前台区域',
        area: '草原中心',
        schedule: [
          { day: '每日', times: ['10:00', '12:30', '15:00', '17:00'] }
        ],
        duration: '每场约15分钟',
        photo: true,
        autograph: false,
        tips: '热情的豹子，喜欢Gazelle',
        waitTime: '10-20分钟',
        bestTime: '任何时间'
      }
    ],

    // 香港时代广场活动
    hkTimesSquare: [
      {
        id: 'judy_hk',
        character: '朱迪·霍普斯',
        emoji: '🐰',
        location: '香港时代广场',
        event: 'Zootopia 2: Zoo-tastic Celebration',
        period: '至2026年1月4日',
        schedule: [
          { day: '周末', times: ['14:00', '16:00', '18:00'] },
          { day: '节假日', times: ['13:00', '15:00', '17:00', '19:00'] }
        ],
        activities: ['合影', '互动游戏', '限量礼品']
      },
      {
        id: 'nick_hk',
        character: '尼克·王尔德',
        emoji: '🦊',
        location: '香港时代广场',
        event: 'Zootopia 2: Zoo-tastic Celebration',
        period: '至2026年1月4日',
        schedule: [
          { day: '周末', times: ['14:30', '16:30', '18:30'] },
          { day: '节假日', times: ['13:30', '15:30', '17:30', '19:30'] }
        ],
        activities: ['合影', '魔术表演', '限量礼品']
      }
    ],

    // 见面会贴士
    tips: [
      '📱 查看园区APP获取最新见面会时间',
      '⏰ 提前15-20分钟到达排队',
      '📸 准备好相机/手机，确保电量充足',
      '🎒 轻装上阵，便于快速移动',
      '🌂 热门角色可能需要等待更长时间',
      '💬 保持礼貌，听从工作人员指引',
      '👕 可以穿主题服装增加互动乐趣',
      '🎁 部分活动提供限量纪念品',
      '🔋 充电宝是必备物品',
      '🧴 夏日注意防晒，雨天记得带伞'
    ],

    // 拍照技巧
    photoTips: [
      '📸 站在角色前方正中间位置',
      '👯‍♀️ 可以和朋友一起拍团体照',
      '🎭 表情要生动有趣',
      '🙆‍♀️ 可以和角色做互动动作',
      '📱 请求工作人员帮忙拍照效果更好',
      '⚡ 快速拍照，让后面的人也能拍到'
    ]
  };

  // 当前状态
  let meetupState = {
    checkedIn: JSON.parse(localStorage.getItem('zootopiaMeetupCheckedIn') || '[]'),
    favorites: JSON.parse(localStorage.getItem('zootopiaMeetupFavorites') || '[]'),
    upcomingReminders: []
  };

  // 创建见面会面板
  function createMeetupPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-character-meetup';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="meetup-toggle" id="meetupToggle">
        <span class="toggle-icon">🤝</span>
        <span class="toggle-text">角色见面会</span>
      </div>

      <!-- 主面板 -->
      <div class="meetup-panel" id="meetupPanel" style="display: none;">
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">🤝</span>
            <span class="title-text">角色见面会</span>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 位置标签 -->
        <div class="location-tabs">
          <button class="location-tab active" data-location="shanghai">
            <span class="tab-icon">🏰</span>
            <span class="tab-text">上海迪士尼</span>
          </button>
          <button class="location-tab" data-location="hk">
            <span class="tab-icon">🇭🇰</span>
            <span class="tab-text">香港时代广场</span>
          </button>
        </div>

        <!-- 内容区域 -->
        <div class="panel-content" id="panelContent">
          <!-- 上海迪士尼 -->
          <div class="location-content active" data-location="shanghai" id="shanghaiContent"></div>

          <!-- 香港时代广场 -->
          <div class="location-content" data-location="hk" id="hkContent"></div>
        </div>

        <!-- 贴士标签 -->
        <div class="tips-tabs">
          <button class="tips-tab active" data-tips="general">见面贴士</button>
          <button class="tips-tab" data-tips="photo">拍照技巧</button>
        </div>

        <!-- 贴士内容 -->
        <div class="tips-content" id="tipsContent"></div>
      </div>

      <!-- 提醒通知 -->
      <div class="reminder-notification" id="reminderNotification">
        <div class="notification-content" id="notificationContent"></div>
      </div>
    `;

    return panel;
  }

  // 渲染上海迪士尼见面会
  function renderShanghaiMeetups() {
    const container = document.getElementById('shanghaiContent');
    if (!container) return;

    container.innerHTML = `
      <div class="meetup-list">
        ${characterMeetups.shanghaiDisney.map(char => `
          <div class="meetup-card" data-character="${char.id}">
            <div class="card-header">
              <span class="char-emoji">${char.emoji}</span>
              <div class="char-info">
                <h3 class="char-name">${char.character}</h3>
                <span class="char-area">${char.area}</span>
              </div>
              <button class="favorite-btn ${meetupState.favorites.includes(char.id) ? 'active' : ''}" data-char="${char.id}">
                ${meetupState.favorites.includes(char.id) ? '⭐' : '☆'}
              </button>
            </div>

            <div class="card-details">
              <p class="detail-item">
                <span class="detail-icon">📍</span>
                <span class="detail-text">${char.location}</span>
              </p>

              <div class="schedule-section">
                <h4 class="schedule-title">⏰ 见面时间</h4>
                ${char.schedule.map(sch => `
                  <div class="schedule-item">
                    <span class="schedule-day">${sch.day}</span>
                    <div class="schedule-times">
                      ${sch.times.map(t => `<span class="time-slot">${t}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
                <p class="schedule-duration">每场约 ${char.duration}</p>
              </div>

              <div class="features-section">
                ${char.photo ? '<span class="feature-tag">📸 可合影</span>' : ''}
                ${char.autograph ? '<span class="feature-tag">✍️ 可签名</span>' : ''}
                <span class="feature-tag">⏱️ 等待 ${char.waitTime}</span>
              </div>

              <div class="tips-section">
                <p class="tip-item">💡 ${char.tips}</p>
                <p class="best-time">✨ 最佳时间: ${char.bestTime}</p>
              </div>

              <div class="card-actions">
                <button class="checkin-btn ${meetupState.checkedIn.includes(char.id) ? 'checked' : ''}" data-char="${char.id}">
                  ${meetupState.checkedIn.includes(char.id) ? '✅ 已签到' : '签到打卡'}
                </button>
                <button class="remind-btn" data-char="${char.id}">
                  🔔 设置提醒
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // 添加事件监听
    container.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleFavorite(btn.dataset.char));
    });

    container.querySelectorAll('.checkin-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleCheckIn(btn.dataset.char));
    });

    container.querySelectorAll('.remind-btn').forEach(btn => {
      btn.addEventListener('click', () => setReminder(btn.dataset.char));
    });
  }

  // 渲染香港时代广场见面会
  function renderHKMeetups() {
    const container = document.getElementById('hkContent');
    if (!container) return;

    container.innerHTML = `
      <div class="event-notice">
        <span class="notice-icon">🎉</span>
        <div class="notice-text">
          <h4>Zootopia 2: Zoo-tastic Celebration</h4>
          <p>活动至2026年1月4日</p>
        </div>
      </div>

      <div class="meetup-list">
        ${characterMeetups.hkTimesSquare.map(char => `
          <div class="meetup-card" data-character="${char.id}">
            <div class="card-header">
              <span class="char-emoji">${char.emoji}</span>
              <div class="char-info">
                <h3 class="char-name">${char.character}</h3>
                <span class="char-event">${char.event}</span>
              </div>
            </div>

            <div class="card-details">
              <p class="detail-item">
                <span class="detail-icon">📍</span>
                <span class="detail-text">${char.location}</span>
              </p>
              <p class="detail-item">
                <span class="detail-icon">📅</span>
                <span class="detail-text">${char.period}</span>
              </p>

              <div class="schedule-section">
                <h4 class="schedule-title">⏰ 见面时间</h4>
                ${char.schedule.map(sch => `
                  <div class="schedule-item">
                    <span class="schedule-day">${sch.day}</span>
                    <div class="schedule-times">
                      ${sch.times.map(t => `<span class="time-slot">${t}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="activities-section">
                <h4 class="activities-title">🎭 活动内容</h4>
                <div class="activities-list">
                  ${char.activities.map(a => `<span class="activity-tag">${a}</span>`).join('')}
                </div>
              </div>

              <div class="card-actions">
                <button class="checkin-btn ${meetupState.checkedIn.includes(char.id) ? 'checked' : ''}" data-char="${char.id}">
                  ${meetupState.checkedIn.includes(char.id) ? '✅ 已签到' : '签到打卡'}
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // 添加签到事件
    container.querySelectorAll('.checkin-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleCheckIn(btn.dataset.char));
    });
  }

  // 渲染贴士
  function renderTips(type) {
    const container = document.getElementById('tipsContent');
    if (!container) return;

    const tips = type === 'photo' ? characterMeetups.photoTips : characterMeetups.tips;

    container.innerHTML = `
      <div class="tips-list">
        ${tips.map(tip => `
          <div class="tip-card">${tip}</div>
        `).join('')}
      </div>
    `;
  }

  // 切换收藏
  function toggleFavorite(charId) {
    const index = meetupState.favorites.indexOf(charId);
    if (index > -1) {
      meetupState.favorites.splice(index, 1);
    } else {
      meetupState.favorites.push(charId);
    }
    localStorage.setItem('zootopiaMeetupFavorites', JSON.stringify(meetupState.favorites));

    // 更新按钮状态
    document.querySelectorAll(`.favorite-btn[data-char="${charId}"]`).forEach(btn => {
      btn.textContent = meetupState.favorites.includes(charId) ? '⭐' : '☆';
      btn.classList.toggle('active', meetupState.favorites.includes(charId));
    });
  }

  // 切换签到
  function toggleCheckIn(charId) {
    const index = meetupState.checkedIn.indexOf(charId);
    if (index > -1) {
      meetupState.checkedIn.splice(index, 1);
    } else {
      meetupState.checkedIn.push(charId);
      showNotification('✅ 签到成功！已记录打卡');
    }
    localStorage.setItem('zootopiaMeetupCheckedIn', JSON.stringify(meetupState.checkedIn));

    // 更新按钮状态
    document.querySelectorAll(`.checkin-btn[data-char="${charId}"]`).forEach(btn => {
      btn.textContent = meetupState.checkedIn.includes(charId) ? '✅ 已签到' : '签到打卡';
      btn.classList.toggle('checked', meetupState.checkedIn.includes(charId));
    });
  }

  // 设置提醒
  function setReminder(charId) {
    // 查找角色信息
    const allChars = [...characterMeetups.shanghaiDisney, ...characterMeetups.hkTimesSquare];
    const char = allChars.find(c => c.id === charId);

    if (!char) return;

    showNotification(`🔔 已设置 ${char.character} 见面会提醒！`);

    // 在实际应用中，这里可以设置真实的提醒
    // 例如使用 Notification API 或日历 API
  }

  // 显示通知
  function showNotification(message) {
    const notification = document.getElementById('reminderNotification');
    const content = document.getElementById('notificationContent');

    if (!notification || !content) return;

    content.innerHTML = `<div class="notification-message">${message}</div>`;

    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // 切换位置标签
  function switchLocation(location) {
    document.querySelectorAll('.location-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.location === location);
    });

    document.querySelectorAll('.location-content').forEach(content => {
      content.classList.toggle('active', content.dataset.location === location);
    });

    if (location === 'shanghai') {
      renderShanghaiMeetups();
    } else {
      renderHKMeetups();
    }
  }

  // 切换贴士标签
  function switchTips(tipsType) {
    document.querySelectorAll('.tips-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tips === tipsType);
    });

    renderTips(tipsType);
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('meetupPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#meetup-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'meetup-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-character-meetup {
        position: fixed;
        bottom: 240px;
        right: 20px;
        z-index: 9996;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .meetup-toggle {
        background: linear-gradient(135deg, #FF9F43, #FF6B6B);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .meetup-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(255, 159, 67, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: waveBounce 2s ease infinite;
      }

      @keyframes waveBounce {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(15deg); }
        75% { transform: rotate(-15deg); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .meetup-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        background: linear-gradient(135deg, #FF9F43, #FF6B6B);
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

      /* 位置标签 */
      .location-tabs {
        display: flex;
        padding: 10px;
        gap: 8px;
        border-bottom: 1px solid #ECF0F1;
      }

      .location-tab {
        flex: 1;
        padding: 10px;
        border: none;
        background: #F8F9FA;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
      }

      .location-tab:hover {
        background: #ECF0F1;
      }

      .location-tab.active {
        background: linear-gradient(135deg, #FF9F43, #FF6B6B);
        color: white;
      }

      .tab-icon {
        font-size: 20px;
      }

      .tab-text {
        font-size: 11px;
        font-weight: bold;
      }

      /* 内容区域 */
      .panel-content {
        padding: 15px;
        overflow-y: auto;
        max-height: 450px;
      }

      .location-content {
        display: none;
      }

      .location-content.active {
        display: block;
      }

      /* 活动通知 */
      .event-notice {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 15px;
      }

      .notice-icon {
        font-size: 32px;
      }

      .notice-text h4 {
        font-size: 14px;
        margin: 0 0 4px 0;
      }

      .notice-text p {
        font-size: 12px;
        margin: 0;
        opacity: 0.9;
      }

      /* 见面会卡片 */
      .meetup-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 15px;
        margin-bottom: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .meetup-card:hover {
        border-color: #FF9F43;
        box-shadow: 0 5px 15px rgba(255, 159, 67, 0.2);
      }

      .card-header {
        background: linear-gradient(135deg, rgba(255, 159, 67, 0.1), rgba(255, 107, 107, 0.1));
        padding: 12px 15px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .char-emoji {
        font-size: 32px;
      }

      .char-info {
        flex: 1;
      }

      .char-name {
        font-size: 15px;
        font-weight: bold;
        color: #2D3436;
        margin: 0;
      }

      .char-area,
      .char-event {
        font-size: 11px;
        color: #636E72;
      }

      .favorite-btn {
        width: 36px;
        height: 36px;
        border: 2px solid #ECF0F1;
        background: white;
        border-radius: 50%;
        font-size: 18px;
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

      .card-details {
        padding: 12px 15px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .detail-icon {
        font-size: 16px;
      }

      /* 时间表 */
      .schedule-section {
        background: #F8F9FA;
        border-radius: 10px;
        padding: 10px;
        margin: 10px 0;
      }

      .schedule-title {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .schedule-item {
        margin-bottom: 8px;
      }

      .schedule-day {
        font-size: 11px;
        color: #636E72;
        display: block;
        margin-bottom: 4px;
      }

      .schedule-times {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .time-slot {
        padding: 4px 8px;
        background: white;
        border-radius: 6px;
        font-size: 11px;
        color: #FF9F43;
        font-weight: bold;
      }

      .schedule-duration {
        font-size: 10px;
        color: #636E72;
        margin: 8px 0 0 0;
      }

      /* 特性标签 */
      .features-section {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin: 10px 0;
      }

      .feature-tag {
        padding: 4px 10px;
        background: linear-gradient(135deg, rgba(255, 159, 67, 0.1), rgba(255, 107, 107, 0.1));
        border-radius: 15px;
        font-size: 10px;
        color: #FF9F43;
      }

      /* 贴士 */
      .tips-section {
        background: rgba(0, 206, 201, 0.05);
        border-radius: 8px;
        padding: 8px 10px;
        margin: 10px 0;
      }

      .tip-item,
      .best-time {
        font-size: 11px;
        color: #636E72;
        margin: 4px 0;
      }

      .best-time {
        color: #00CEC9;
        font-weight: bold;
      }

      /* 活动内容 */
      .activities-section {
        margin: 10px 0;
      }

      .activities-title {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .activities-list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .activity-tag {
        padding: 4px 10px;
        background: #667eea;
        color: white;
        border-radius: 15px;
        font-size: 10px;
      }

      /* 操作按钮 */
      .card-actions {
        display: flex;
        gap: 8px;
        margin-top: 10px;
      }

      .checkin-btn,
      .remind-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        border-radius: 8px;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .checkin-btn {
        background: linear-gradient(135deg, #00B894, #00CEC9);
        color: white;
      }

      .checkin-btn.checked {
        background: #95A5A6;
        cursor: default;
      }

      .checkin-btn:not(.checked):hover {
        transform: scale(1.02);
      }

      .remind-btn {
        background: #F8F9FA;
        color: #636E72;
        border: 1px solid #ECF0F1;
      }

      .remind-btn:hover {
        background: #ECF0F1;
      }

      /* 贴士标签 */
      .tips-tabs {
        display: flex;
        padding: 10px 15px;
        gap: 8px;
        border-top: 1px solid #ECF0F1;
      }

      .tips-tab {
        flex: 1;
        padding: 8px;
        border: none;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .tips-tab:hover {
        background: #ECF0F1;
      }

      .tips-tab.active {
        background: linear-gradient(135deg, #FF9F43, #FF6B6B);
        color: white;
      }

      /* 贴士内容 */
      .tips-content {
        padding: 15px;
        max-height: 200px;
        overflow-y: auto;
        background: #FAFAFA;
      }

      .tips-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .tip-card {
        padding: 10px 12px;
        background: white;
        border-left: 4px solid #FF9F43;
        border-radius: 8px;
        font-size: 12px;
        color: #2D3436;
      }

      /* 通知 */
      .reminder-notification {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 280px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
        transition: all 0.3s ease;
      }

      .reminder-notification.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .notification-content {
        padding: 15px;
        text-align: center;
      }

      .notification-message {
        font-size: 13px;
        color: #2D3436;
      }

      /* 滚动条 */
      .panel-content::-webkit-scrollbar,
      .tips-content::-webkit-scrollbar {
        width: 4px;
      }

      .panel-content::-webkit-scrollbar-track,
      .tips-content::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .panel-content::-webkit-scrollbar-thumb,
      .tips-content::-webkit-scrollbar-thumb {
        background: #FF9F43;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-character-meetup {
          right: 10px;
          bottom: 220px;
        }

        .meetup-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initMeetupSystem() {
    injectStyles();

    const meetup = createMeetupPanel();
    document.body.appendChild(meetup);

    // 切换按钮
    document.getElementById('meetupToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('meetupPanel').style.display = 'none';
    };

    // 位置标签切换
    document.querySelectorAll('.location-tab').forEach(tab => {
      tab.addEventListener('click', () => switchLocation(tab.dataset.location));
    });

    // 贴士标签切换
    document.querySelectorAll('.tips-tab').forEach(tab => {
      tab.addEventListener('click', () => switchTips(tab.dataset.tips));
    });

    // 初始渲染
    renderShanghaiMeetups();
    renderTips('general');

    // 导出全局函数
    window.zootopiaMeetup = {
      open: () => {
        document.getElementById('meetupPanel').style.display = 'block';
      },
      showLocation: (location) => switchLocation(location)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMeetupSystem);
  } else {
    initMeetupSystem();
  }
})();
