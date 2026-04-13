/**
 * 疯狂动物城主题 - 增强新闻滚动条
 * Zootopia Theme - Enhanced News Ticker
 * | 动物城最新动态播报
 */

(function() {
  'use strict';

  // 动物城新闻数据
  const zootopiaNews = [
    {
      category: 'breaking',
      icon: '🚨',
      priority: 'high',
      title: '突发新闻',
      content: 'ZPD破获重大案件！朱迪警官和尼克警官立功！'
    },
    {
      category: 'weather',
      icon: '🌤️',
      priority: 'normal',
      title: '天气预报',
      content: '撒哈拉广场：晴朗高温36°C | 冰川镇：寒冷零下15°C'
    },
    {
      category: 'traffic',
      icon: '🚂',
      priority: 'normal',
      title: '交通状况',
      content: '动物城地铁运行正常，高峰时段建议错峰出行'
    },
    {
      category: 'event',
      icon: '🎉',
      priority: 'normal',
      title: '活动预告',
      content: 'Gazelle今晚在雨林区举行演唱会，门票即将售罄！'
    },
    {
      category: 'social',
      icon: '🐰',
      priority: 'low',
      title: '社交动态',
      content: '朱迪警官在社交媒体分享：新的一天，新的挑战！'
    },
    {
      category: 'business',
      icon: '💼',
      priority: 'normal',
      title: '商业资讯',
      content: '尼克的新 Pawpsicle 生意火爆，日销量突破1000根！'
    },
    {
      category: 'police',
      icon: '👮',
      priority: 'high',
      title: '警方通报',
      content: 'ZPD提醒市民：保持警惕，防范诈骗'
    },
    {
      category: 'lifestyle',
      icon: '🥕',
      priority: 'low',
      title: '生活贴士',
      content: '兔子洞农场新鲜胡萝卜上市，欢迎采购！'
    },
    {
      category: 'entertainment',
      icon: '🎬',
      priority: 'normal',
      title: '娱乐快讯',
      content: '《疯狂动物城》续集筹备中，敬请期待！'
    },
    {
      category: 'sports',
      icon: '🏆',
      priority: 'normal',
      title: '体育新闻',
      content: '动物城马拉松比赛报名开始，全城动物欢迎参加！'
    }
  ];

  // 新闻配置
  let newsConfig = {
    speed: 30,
    pauseOnHover: true,
    showIcons: true,
    showCategory: true,
    autoUpdate: true,
    updateInterval: 60000
  };

  // 当前新闻索引
  let currentNewsIndex = 0;
  let newsTicker = null;
  let updateTimer = null;

  // 创建新闻滚动条
  function createNewsTicker() {
    const ticker = document.createElement('div');
    ticker.className = 'zootopia-news-ticker';
    ticker.innerHTML = `
      <div class="ticker-header">
        <div class="ticker-logo">
          <span class="logo-icon">📰</span>
          <span class="logo-text">动物城新闻</span>
        </div>
        <div class="ticker-controls">
          <button class="control-btn prev-btn" title="上一条">◀</button>
          <button class="control-btn play-pause-btn" title="暂停">⏸</button>
          <button class="control-btn next-btn" title="下一条">▶</button>
          <button class="control-btn settings-btn" title="设置">⚙</button>
          <button class="control-btn collapse-btn" id="collapseBtn" title="折叠">▲</button>
        </div>
      </div>
      <div class="ticker-content" id="tickerContent">
        <div class="news-item" id="currentNews"></div>
      </div>
      <div class="ticker-progress" id="tickerProgress">
        <div class="progress-bar" id="progressBar"></div>
      </div>
      <div class="ticker-settings" id="tickerSettings"></div>
    `;

    return ticker;
  }

  // 显示新闻
  function showNews(index) {
    const news = zootopiaNews[index];
    const newsElement = document.getElementById('currentNews');
    if (!newsElement || !news) return;

    const priorityClass = {
      high: 'priority-high',
      normal: 'priority-normal',
      low: 'priority-low'
    }[news.priority];

    newsElement.innerHTML = `
      <div class="news-content ${priorityClass}">
        ${newsConfig.showIcons ? `<span class="news-icon">${news.icon}</span>` : ''}
        ${newsConfig.showCategory ? `<span class="news-category">${news.title}</span>` : ''}
        <span class="news-text">${news.content}</span>
      </div>
    `;

    // 更新进度条
    resetProgress();

    // 触发新闻事件
    window.dispatchEvent(new CustomEvent('zootopiaNews', {
      detail: { news: news, index: index }
    }));
  }

  // 重置进度条
  function resetProgress() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      setTimeout(() => {
        progressBar.style.transition = `width ${zootopiaNews.length * newsConfig.speed}s linear`;
        progressBar.style.width = '100%';
      }, 10);
    }
  }

  // 上一条新闻
  function previousNews() {
    currentNewsIndex = (currentNewsIndex - 1 + zootopiaNews.length) % zootopiaNews.length;
    showNews(currentNewsIndex);
  }

  // 下一条新闻
  function nextNews() {
    currentNewsIndex = (currentNewsIndex + 1) % zootopiaNews.length;
    showNews(currentNewsIndex);
  }

  // 自动播放新闻
  function startAutoPlay() {
    if (newsTicker) return;
    newsTicker = setInterval(() => {
      nextNews();
    }, newsConfig.speed * 1000);
  }

  // 停止自动播放
  function stopAutoPlay() {
    if (newsTicker) {
      clearInterval(newsTicker);
      newsTicker = null;
    }
  }

  // 切换播放/暂停
  function togglePlayPause() {
    const btn = document.querySelector('.play-pause-btn');
    if (newsTicker) {
      stopAutoPlay();
      btn.textContent = '▶';
      btn.title = '播放';
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.animationPlayState = 'paused';
      }
    } else {
      startAutoPlay();
      btn.textContent = '⏸';
      btn.title = '暂停';
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.animationPlayState = 'running';
      }
    }
  }

  // 创建设置面板
  function createSettingsPanel() {
    const settings = document.getElementById('tickerSettings');
    if (!settings) return;

    settings.innerHTML = `
      <div class="settings-backdrop"></div>
      <div class="settings-content">
        <div class="settings-header">
          <div class="settings-title">新闻设置</div>
          <button class="settings-close">×</button>
        </div>

        <div class="settings-body">
          <div class="setting-item">
            <label class="setting-label">滚动速度</label>
            <div class="setting-control">
              <input type="range" id="speedControl" min="10" max="60" value="${newsConfig.speed}">
              <span class="setting-value">${newsConfig.speed}秒</span>
            </div>
          </div>

          <div class="setting-item">
            <label class="setting-label">显示选项</label>
            <div class="setting-options">
              <label class="option-label">
                <input type="checkbox" id="showIcons" ${newsConfig.showIcons ? 'checked' : ''}>
                显示图标
              </label>
              <label class="option-label">
                <input type="checkbox" id="showCategory" ${newsConfig.showCategory ? 'checked' : ''}>
                显示分类
              </label>
              <label class="option-label">
                <input type="checkbox" id="pauseOnHover" ${newsConfig.pauseOnHover ? 'checked' : ''}>
                悬停暂停
              </label>
            </div>
          </div>

          <div class="setting-item">
            <label class="setting-label">自动更新</label>
            <div class="setting-options">
              <label class="option-label">
                <input type="checkbox" id="autoUpdate" ${newsConfig.autoUpdate ? 'checked' : ''}>
                启用自动更新
              </label>
            </div>
          </div>
        </div>

        <div class="settings-footer">
          <button class="settings-btn apply-btn">应用设置</button>
          <button class="settings-btn reset-btn">重置默认</button>
        </div>
      </div>
    `;

    // 关闭按钮
    settings.querySelector('.settings-close').onclick = () => {
      settings.innerHTML = '';
      settings.classList.remove('active');
    };

    // 速度控制
    const speedControl = document.getElementById('speedControl');
    const speedValue = settings.querySelector('.setting-value');
    speedControl.oninput = () => {
      speedValue.textContent = `${speedControl.value}秒`;
    };

    // 应用设置
    settings.querySelector('.apply-btn').onclick = () => {
      newsConfig.speed = parseInt(speedControl.value);
      newsConfig.showIcons = document.getElementById('showIcons').checked;
      newsConfig.showCategory = document.getElementById('showCategory').checked;
      newsConfig.pauseOnHover = document.getElementById('pauseOnHover').checked;
      newsConfig.autoUpdate = document.getElementById('autoUpdate').checked;

      localStorage.setItem('zootopiaNewsConfig', JSON.stringify(newsConfig));
      applySettings();
      settings.innerHTML = '';
      settings.classList.remove('active');
    };

    // 重置设置
    settings.querySelector('.reset-btn').onclick = () => {
      newsConfig = {
        speed: 30,
        pauseOnHover: true,
        showIcons: true,
        showCategory: true,
        autoUpdate: true,
        updateInterval: 60000
      };
      localStorage.removeItem('zootopiaNewsConfig');
      applySettings();
      settings.innerHTML = '';
      settings.classList.remove('active');
    };
  }

  // 应用设置
  function applySettings() {
    stopAutoPlay();
    startAutoPlay();
    showNews(currentNewsIndex);
  }

  // 添加自定义新闻
  function addCustomNews(news) {
    zootopiaNews.push({
      category: news.category || 'custom',
      icon: news.icon || '📌',
      priority: news.priority || 'normal',
      title: news.title || '自定义消息',
      content: news.content
    });
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#news-ticker-enhanced-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'news-ticker-enhanced-styles';
    styles.textContent = `
      /* 新闻滚动条容器 */
      .zootopia-news-ticker {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10001;
        background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
        transform-origin: top;
      }

      .zootopia-news-ticker.collapsed {
        transform: translateY(-100%);
      }

      /* 滚动条头部 */
      .ticker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.3);
      }

      .ticker-logo {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .logo-icon {
        font-size: 24px;
        animation: logoPulse 2s ease infinite;
      }

      @keyframes logoPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .logo-text {
        font-size: 16px;
        font-weight: bold;
        color: white;
      }

      .ticker-controls {
        display: flex;
        gap: 8px;
      }

      .control-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }

      /* 新闻内容 */
      .ticker-content {
        padding: 15px 20px;
        min-height: 60px;
        display: flex;
        align-items: center;
      }

      .news-item {
        width: 100%;
        animation: newsSlideIn 0.5s ease;
      }

      @keyframes newsSlideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .news-content {
        display: flex;
        align-items: center;
        gap: 15px;
        color: white;
        font-size: 16px;
      }

      .news-icon {
        font-size: 28px;
        flex-shrink: 0;
      }

      .news-category {
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .news-text {
        flex: 1;
        line-height: 1.5;
      }

      /* 优先级样式 */
      .priority-high .news-category {
        background: rgba(231, 76, 60, 0.8);
      }

      .priority-normal .news-category {
        background: rgba(52, 152, 219, 0.8);
      }

      .priority-low .news-category {
        background: rgba(46, 204, 113, 0.8);
      }

      /* 进度条 */
      .ticker-progress {
        height: 3px;
        background: rgba(0, 0, 0, 0.3);
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #FF9F43, #F39C12);
        width: 0%;
      }

      /* 设置面板 */
      .ticker-settings {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10002;
        display: none;
      }

      .ticker-settings.active {
        display: block;
      }

      .settings-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }

      .settings-content {
        position: relative;
        width: 90vw;
        max-width: 400px;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }

      .settings-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .settings-title {
        font-size: 18px;
        font-weight: bold;
      }

      .settings-close {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .settings-body {
        padding: 20px;
      }

      .setting-item {
        margin-bottom: 20px;
      }

      .setting-label {
        display: block;
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .setting-control {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .setting-control input[type="range"] {
        flex: 1;
        height: 6px;
        -webkit-appearance: none;
        background: #ECF0F1;
        border-radius: 3px;
        outline: none;
      }

      .setting-control input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        background: #9B59B6;
        border-radius: 50%;
        cursor: pointer;
      }

      .setting-value {
        font-size: 12px;
        color: #636E72;
        min-width: 50px;
      }

      .setting-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .option-label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        color: #2D3436;
        cursor: pointer;
      }

      .option-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: #9B59B6;
      }

      .settings-footer {
        display: flex;
        gap: 10px;
        padding: 15px 20px;
        background: #F8F9FA;
      }

      .settings-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .apply-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .apply-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
      }

      .reset-btn {
        background: #ECF0F1;
        color: #636E72;
      }

      .reset-btn:hover {
        background: #D5DBDB;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .ticker-logo {
          flex-direction: column;
          gap: 5px;
        }

        .logo-text {
          font-size: 12px;
        }

        .news-content {
          font-size: 14px;
          gap: 10px;
        }

        .news-icon {
          font-size: 24px;
        }

        .ticker-controls {
          gap: 5px;
        }

        .control-btn {
          width: 28px;
          height: 28px;
          font-size: 12px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化新闻滚动条
  function initNewsTicker() {
    // 加载配置
    const savedConfig = localStorage.getItem('zootopiaNewsConfig');
    if (savedConfig) {
      newsConfig = JSON.parse(savedConfig);
    }

    injectStyles();

    const ticker = createNewsTicker();
    document.body.appendChild(ticker);

    // 显示第一条新闻
    showNews(currentNewsIndex);

    // 开始自动播放
    startAutoPlay();

    // 控制按钮
    document.querySelector('.prev-btn').onclick = previousNews;
    document.querySelector('.next-btn').onclick = nextNews;
    document.querySelector('.play-pause-btn').onclick = togglePlayPause;
    document.querySelector('.settings-btn').onclick = createSettingsPanel;

    // 折叠按钮
    const collapseBtn = document.getElementById('collapseBtn');
    const ticker = document.querySelector('.zootopia-news-ticker');
    let isCollapsed = false;

    collapseBtn.onclick = () => {
      isCollapsed = !isCollapsed;
      ticker.classList.toggle('collapsed', isCollapsed);
      collapseBtn.textContent = isCollapsed ? '▼' : '▲';
      collapseBtn.title = isCollapsed ? '展开' : '折叠';
    };

    // 悬停暂停
    if (newsConfig.pauseOnHover) {
      ticker.addEventListener('mouseenter', () => {
        if (newsTicker) {
          stopAutoPlay();
        }
      });

      ticker.addEventListener('mouseleave', () => {
        if (!document.querySelector('.play-pause-btn').textContent.includes('▶')) {
          startAutoPlay();
        }
      });
    }

    // 不再强制设置paddingTop，让用户自己决定
    // document.body.style.paddingTop = '120px';

    // 自动更新新闻
    if (newsConfig.autoUpdate) {
      updateTimer = setInterval(() => {
        // 这里可以添加从服务器获取最新新闻的逻辑
        console.log('新闻已更新');
      }, newsConfig.updateInterval);
    }
  }

  // 导出全局函数
  window.zootopiaNews = {
    add: addCustomNews,
    next: nextNews,
    previous: previousNews,
    pause: stopAutoPlay,
    play: startAutoPlay,
    show: showNews
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsTicker);
  } else {
    initNewsTicker();
  }
})();
