/**
 * 疯狂动物城主题 - 侧边栏小组件系统
 * Zootopia Theme - Sidebar Widgets System
 * | 动物城风格的侧边栏组件
 */

(function() {
  'use strict';

  // 小组件数据
  const widgets = {
    zpdBulletin: {
      id: 'zpdBulletin',
      name: 'ZPD公告板',
      icon: '👮',
      color: '#3498DB',
      items: [
        { title: '寻找目击者', content: '冰川镇发生Pawpsicle失窃案，请知情者联系ZPD', priority: 'high', date: '2026-04-09' },
        { title: '交通提醒', content: '撒哈拉广场至市中心路段施工，建议绕行', priority: 'normal', date: '2026-04-08' },
        { title: '寻物启事', content: '谁看到了我的胡萝卜笔？', priority: 'low', date: '2026-04-07' }
      ]
    },
    weatherWidget: {
      id: 'weatherWidget',
      name: '天气播报',
      icon: '🌤️',
      color: '#2ECC71',
      districts: [
        { name: '撒哈拉广场', temp: '36°C', condition: '☀️ 晴朗', icon: '🏜️' },
        { name: '冰川镇', temp: '-15°C', condition: '❄️ 小雪', icon: '❄️' },
        { name: '雨林区', temp: '28°C', condition: '🌧️ 阵雨', icon: '🌴' },
        { name: '市中心', temp: '22°C', condition: '⛅ 多云', icon: '🏙️' }
      ]
    },
    characterQuote: {
      id: 'characterQuote',
      name: '每日名言',
      icon: '💬',
      color: '#9B59B6',
      quotes: [
        { character: '朱迪', quote: 'Try Everything! 试试一切！', emoji: '🐰' },
        { character: '尼克', quote: '你知道你爱我的聪明。', emoji: '🦊' },
        { character: '闪电', quote: '慢...就是...快...', emoji: '🐢' },
        { character: '博戈局长', quote: '效率！我要求效率！', emoji: '🦁' }
      ]
    },
    quickLinks: {
      id: 'quickLinks',
      name: '快速导航',
      icon: '🔗',
      color: '#E74C3C',
      links: [
        { name: 'ZPD官网', url: '#', icon: '👮' },
        { name: '市政厅', url: '#', icon: '🏛️' },
        { name: ' Gazelle官网', url: '#', icon: '🎵' },
        { name: 'Pawpsicle店', url: '#', icon: '🍦' }
      ]
    },
    pollWidget: {
      id: 'pollWidget',
      name: '每日投票',
      icon: '📊',
      color: '#F39C12',
      question: '你最喜欢的动物城地区是？',
      options: [
        { id: 'sahara', name: '撒哈拉广场', icon: '🏜️', votes: 0 },
        { id: 'tundra', name: '冰川镇', icon: '❄️', votes: 0 },
        { id: 'rainforest', name: '雨林区', icon: '🌴', votes: 0 },
        { id: 'downtown', name: '市中心', icon: '🏙️', votes: 0 }
      ]
    },
    upcomingEvents: {
      id: 'upcomingEvents',
      name: '即将到来',
      icon: '📅',
      color: '#1ABC9C',
      events: [
        { name: 'Gazelle演唱会', date: '今晚8点', icon: '🎵', location: '雨林区体育场' },
        { name: 'ZPD开放日', date: '明天上午', icon: '👮', location: 'ZPD总部' },
        { name: '胡萝卜节', date: '本周日', icon: '🥕', location: '兔子洞' }
      ]
    }
  };

  // 创建小组件容器
  function createWidgetContainer() {
    const container = document.createElement('div');
    container.className = 'zootopia-sidebar-widgets';
    container.innerHTML = `
      <div class="widgets-toggle" id="widgetsToggle">
        <span class="toggle-icon">📰</span>
        <span class="toggle-text">侧边栏</span>
      </div>
      <div class="widgets-panel" id="widgetsPanel">
        <div class="widgets-header">
          <span class="header-title">📰 动物城快讯</span>
          <button class="header-close">×</button>
        </div>
        <div class="widgets-content" id="widgetsContent">
          ${Object.values(widgets).map(widget => createWidgetHTML(widget)).join('')}
        </div>
      </div>
    `;

    return container;
  }

  // 创建小组件HTML
  function createWidgetHTML(widget) {
    switch (widget.id) {
      case 'zpdBulletin':
        return createZPDBulletin(widget);
      case 'weatherWidget':
        return createWeatherWidget(widget);
      case 'characterQuote':
        return createCharacterQuoteWidget(widget);
      case 'quickLinks':
        return createQuickLinksWidget(widget);
      case 'pollWidget':
        return createPollWidget(widget);
      case 'upcomingEvents':
        return createUpcomingEventsWidget(widget);
      default:
        return '';
    }
  }

  // ZPD公告板
  function createZPDBulletin(widget) {
    return `
      <div class="widget-item" data-widget="${widget.id}">
        <div class="widget-header" style="background: ${widget.color}">
          <span class="widget-icon">${widget.icon}</span>
          <span class="widget-name">${widget.name}</span>
        </div>
        <div class="widget-body">
          ${widget.items.map(item => `
            <div class="bulletin-item priority-${item.priority}">
              <div class="bulletin-header">
                <span class="bulletin-title">${item.title}</span>
                <span class="bulletin-date">${item.date}</span>
              </div>
              <div class="bulletin-content">${item.content}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 天气小组件
  function createWeatherWidget(widget) {
    return `
      <div class="widget-item" data-widget="${widget.id}">
        <div class="widget-header" style="background: ${widget.color}">
          <span class="widget-icon">${widget.icon}</span>
          <span class="widget-name">${widget.name}</span>
        </div>
        <div class="widget-body">
          <div class="weather-list">
            ${widget.districts.map(district => `
              <div class="weather-item">
                <span class="weather-icon">${district.icon}</span>
                <span class="weather-info">
                  <span class="district-name">${district.name}</span>
                  <span class="weather-temp">${district.temp}</span>
                  <span class="weather-condition">${district.condition}</span>
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 角色名言小组件
  function createCharacterQuoteWidget(widget) {
    return `
      <div class="widget-item" data-widget="${widget.id}">
        <div class="widget-header" style="background: ${widget.color}">
          <span class="widget-icon">${widget.icon}</span>
          <span class="widget-name">${widget.name}</span>
        </div>
        <div class="widget-body">
          <div class="quote-container" id="quoteContainer">
            ${widget.quotes[0].emoji} "${widget.quotes[0].quote}"
            <div class="quote-character">— ${widget.quotes[0].character}</div>
          </div>
        </div>
      </div>
    `;
  }

  // 快速链接小组件
  function createQuickLinksWidget(widget) {
    return `
      <div class="widget-item" data-widget="${widget.id}">
        <div class="widget-header" style="background: ${widget.color}">
          <span class="widget-icon">${widget.icon}</span>
          <span class="widget-name">${widget.name}</span>
        </div>
        <div class="widget-body">
          <div class="quick-links-grid">
            ${widget.links.map(link => `
              <a href="${link.url}" class="quick-link">
                <span class="link-icon">${link.icon}</span>
                <span class="link-name">${link.name}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 投票小组件
  function createPollWidget(widget) {
    return `
      <div class="widget-item" data-widget="${widget.id}">
        <div class="widget-header" style="background: ${widget.color}">
          <span class="widget-icon">${widget.icon}</span>
          <span class="widget-name">${widget.name}</span>
        </div>
        <div class="widget-body">
          <div class="poll-question">${widget.question}</div>
          <div class="poll-options">
            ${widget.options.map(option => `
              <button class="poll-option" data-option="${option.id}">
                <span class="option-icon">${option.icon}</span>
                <span class="option-name">${option.name}</span>
                <span class="option-votes">${option.votes}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 即将到来小组件
  function createUpcomingEventsWidget(widget) {
    return `
      <div class="widget-item" data-widget="${widget.id}">
        <div class="widget-header" style="background: ${widget.color}">
          <span class="widget-icon">${widget.icon}</span>
          <span class="widget-name}</span>
        </div>
        <div class="widget-body">
          <div class="events-list">
            ${widget.events.map(event => `
              <div class="event-item">
                <span class="event-icon">${event.icon}</span>
                <div class="event-info">
                  <div class="event-name">${event.name}</div>
                  <div class="event-details">
                    <span class="event-date">${event.date}</span>
                    <span class="event-location">📍 ${event.location}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#sidebar-widgets-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'sidebar-widgets-styles';
    styles.textContent = `
      /* 侧边栏容器 */
      .zootopia-sidebar-widgets {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 320px;
        z-index: 9997;
        transition: transform 0.3s ease;
        transform: translateX(-100%);
      }

      .zootopia-sidebar-widgets.active {
        transform: translateX(0);
      }

      /* 切换按钮 */
      .widgets-toggle {
        position: absolute;
        right: -50px;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 100px;
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        border: none;
        border-radius: 0 25px 25px 0;
        color: white;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 4px 4px 15px rgba(231, 76, 60, 0.3);
        transition: all 0.3s ease;
      }

      .widgets-toggle:hover {
        right: -55px;
        width: 55px;
      }

      .toggle-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }

      .toggle-text {
        font-size: 12px;
        font-weight: bold;
        writing-mode: vertical-rl;
      }

      /* 面板 */
      .widgets-panel {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
      }

      .widgets-header {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .header-title {
        font-size: 16px;
        font-weight: bold;
      }

      .header-close {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .widgets-content {
        padding: 15px;
      }

      /* 小组件 */
      .widget-item {
        margin-bottom: 20px;
        background: #F8F9FA;
        border-radius: 15px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .widget-item:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .widget-header {
        color: white;
        padding: 12px 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: bold;
      }

      .widget-icon {
        font-size: 20px;
      }

      .widget-body {
        padding: 15px;
      }

      /* ZPD公告板 */
      .bulletin-item {
        padding: 12px;
        margin-bottom: 10px;
        background: white;
        border-radius: 10px;
        border-left: 3px solid #BDC3C7;
      }

      .bulletin-item.priority-high {
        border-left-color: #E74C3C;
        background: rgba(231, 76, 60, 0.05);
      }

      .bulletin-item.priority-normal {
        border-left-color: #3498DB;
      }

      .bulletin-item.priority-low {
        border-left-color: #95A5A6;
      }

      .bulletin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
      }

      .bulletin-title {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .bulletin-date {
        font-size: 11px;
        color: #636E72;
      }

      .bulletin-content {
        font-size: 12px;
        color: #495057;
        line-height: 1.5;
      }

      /* 天气小组件 */
      .weather-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .weather-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: white;
        border-radius: 10px;
      }

      .weather-icon {
        font-size: 24px;
      }

      .weather-info {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        font-size: 12px;
      }

      .district-name {
        font-weight: bold;
        color: #2D3436;
      }

      .weather-temp {
        color: #E74C3C;
        font-weight: bold;
      }

      /* 名言小组件 */
      .quote-container {
        padding: 15px;
        background: linear-gradient(135deg, #F8E5E9, #FCE4EC);
        border-radius: 10px;
        text-align: center;
        font-style: italic;
        color: #495057;
      }

      .quote-character {
        font-size: 11px;
        color: #636E72;
        margin-top: 8px;
      }

      /* 快速链接 */
      .quick-links-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .quick-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        background: white;
        border-radius: 10px;
        text-decoration: none;
        color: #495057;
        transition: all 0.3s ease;
      }

      .quick-link:hover {
        background: linear-gradient(135deg, #74B9FF, #0984E3);
        color: white;
        transform: translateY(-2px);
      }

      .link-icon {
        font-size: 18px;
      }

      .link-name {
        font-size: 12px;
        font-weight: 500;
      }

      /* 投票 */
      .poll-question {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
        text-align: center;
      }

      .poll-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .poll-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .poll-option:hover {
        border-color: #F39C12;
        background: rgba(243, 156, 18, 0.1);
      }

      .poll-option.selected {
        border-color: #F39C12;
        background: rgba(243, 156, 18, 0.2);
      }

      .option-icon {
        font-size: 20px;
      }

      .option-name {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        color: #2D3436;
      }

      .option-votes {
        font-size: 12px;
        color: #636E72;
        font-weight: bold;
      }

      /* 活动事件 */
      .events-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .event-item {
        display: flex;
        gap: 12px;
        padding: 12px;
        background: white;
        border-radius: 10px;
        border-left: 3px solid #1ABC9C;
      }

      .event-icon {
        font-size: 24px;
      }

      .event-info {
        flex: 1;
      }

      .event-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 4px;
      }

      .event-details {
        font-size: 11px;
        color: #636E72;
      }

      .event-date {
        color: #E67E22;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-sidebar-widgets {
          width: 280px;
        }

        .widgets-toggle {
          width: 40px;
          height: 80px;
        }

        .toggle-icon {
          font-size: 20px;
        }

        .toggle-text {
          font-size: 10px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化小组件
  function initWidgets() {
    injectStyles();

    const container = createWidgetContainer();
    document.body.appendChild(container);

    // 切换按钮
    const toggle = document.getElementById('widgetsToggle');
    toggle.onclick = () => {
      container.classList.toggle('active');
    };

    // 关闭按钮
    document.querySelector('.header-close').onclick = () => {
      container.classList.remove('active');
    };

    // 投票功能
    document.querySelectorAll('.poll-option').forEach(option => {
      option.onclick = () => {
        document.querySelectorAll('.poll-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');

        const votesEl = option.querySelector('.option-votes');
        votesEl.textContent = parseInt(votesEl.textContent) + 1;

        // 保存投票
        const pollData = JSON.parse(localStorage.getItem('zootopiaPoll') || '{}');
        pollData[option.dataset.option] = (pollData[option.dataset.option] || 0) + 1;
        localStorage.setItem('zootopiaPoll', JSON.stringify(pollData));
      };
    });

    // 加载投票数据
    const pollData = JSON.parse(localStorage.getItem('zootopiaPoll') || '{}');
    Object.entries(pollData).forEach(([id, votes]) => {
      const option = document.querySelector(`[data-option="${id}"]`);
      if (option) {
        option.querySelector('.option-votes').textContent = votes;
      }
    });
  }

  // 导出全局函数
  window.zootopiaWidgets = {
    show: () => {
      document.querySelector('.zootopia-sidebar-widgets').classList.add('active');
    },
    hide: () => {
      document.querySelector('.zootopia-sidebar-widgets').classList.remove('active');
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }
})();
