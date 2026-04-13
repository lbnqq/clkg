/**
 * 疯狂动物城主题 - 动物城新闻播报系统
 * Zootopia Theme - News Ticker System
 * 定期播报动物城的最新新闻和趣事
 */

(function() {
  'use strict';

  // 新闻数据
  const newsData = [
    {
      category: 'Breaking',
      categoryCn: '突发',
      icon: '🚨',
      color: '#FF6B6B',
      headline: 'ZPD 破获重大 Pawpsicle 走私案！',
      content: '朱迪警官和尼克搭档成功捣毁非法冰棍交易团伙，缴获 Pawpsicle 超过 500 支。',
      reporter: 'Peter Moosebridge',
      reporterEmoji: '🦙'
    },
    {
      category: 'Entertainment',
      categoryCn: '娱乐',
      icon: '🎵',
      color: '#9B59B6',
      headline: 'Gazelle 新单曲《Try Everything》登顶榜首！',
      content: 'Gazelle 在撒哈拉广场举办盛大演唱会，数万粉丝狂欢，新单曲获得一致好评。',
      reporter: 'Fabienne Growley',
      reporterEmoji: '🦊'
    },
    {
      category: 'Weather',
      categoryCn: '天气',
      icon: '☀️',
      color: '#F39C12',
      headline: '本周末动物城天气宜人',
      content: '撒哈拉广场持续晴朗，冰川镇温度回升至 -10°C，雨林区湿度适中，适合出游。',
      reporter: 'Weather Team',
      reporterEmoji: '🌤️'
    },
    {
      category: 'Traffic',
      categoryCn: '交通',
      icon: '🚇',
      color: '#3498DB',
      headline: '地铁蓝线今起增加班次',
      content: '为应对旅游高峰，地铁蓝线从冰川镇到撒哈拉广场的班次增加 30%。',
      reporter: 'Metro Authority',
      reporterEmoji: '🚊'
    },
    {
      category: 'Community',
      categoryCn: '社区',
      icon: '🎉',
      color: '#2ECC71',
      headline: '兔窝镇举办第88届胡萝卜节',
      content: '霍普斯家族邀请全城居民参加，届时将有胡萝卜美食展、胡萝卜雕刻比赛等活动。',
      reporter: 'Local News',
      reporterEmoji: '🐰'
    },
    {
      category: 'Sports',
      categoryCn: '体育',
      icon: '🏆',
      color: '#E74C3C',
      headline: '冰川镇企鹅冰球队夺冠',
      content: '在激烈的总决赛中，冰川镇闪电队以 3:2 击败撒哈拉广场骆驼队，获得年度冠军。',
      reporter: 'Sports Desk',
      reporterEmoji: '🐧'
    },
    {
      category: 'Politics',
      categoryCn: '政治',
      icon: '🏛️',
      color: '#34495E',
      headline: 'Lionheart 市长宣布新的城市计划',
      content: '计划包括扩建雨林区步道、升级冰川镇制冷系统、在小啮齿镇建设新公园。',
      reporter: 'Press Office',
      reporterEmoji: '🦁'
    },
    {
      category: 'Business',
      categoryCn: '商业',
      icon: '💼',
      color: '#1ABC9C',
      headline: '小啮齿镇奶酪工厂上市',
      content: '著名的奶酪制造商今日在股票交易所上市，首日涨幅达 25%。',
      reporter: 'Business Daily',
      reporterEmoji: '🐭'
    },
    {
      category: 'Crime',
      categoryCn: '治安',
      icon: '👮',
      color: '#0984E3',
      headline: 'ZPD 本周犯罪率下降 15%',
      content: '博戈局长表示，这归功于社区警务计划和居民配合。朱迪警官获嘉奖。',
      reporter: 'ZPD Spokesperson',
      reporterEmoji: '🦏'
    },
    {
      category: 'Lifestyle',
      categoryCn: '生活',
      icon: '🌿',
      color: '#00B894',
      headline: '雨林区新开有机咖啡厅',
      content: '位于树冠大道的"绿色角落"咖啡厅开业，主打雨林特色饮品和环保理念。',
      reporter: 'Lifestyle Section',
      reporterEmoji: '🦥'
    },
    {
      category: 'Technology',
      categoryCn: '科技',
      icon: '💡',
      color: '#6C5CE7',
      headline: '动物城推出智能停车系统',
      content: '新系统可实时显示停车位，支持多种支付方式，解决停车难题。',
      reporter: 'Tech News',
      reporterEmoji: '🦉'
    },
    {
      category: 'Culture',
      categoryCn: '文化',
      icon: '🎭',
      color: '#FD79A8',
      headline: '动物城博物馆举办"多元文化展"',
      content: '展览展示各地区的历史文化，促进不同物种间的理解和和谐。',
      reporter: 'Culture Desk',
      reporterEmoji: '🦒'
    }
  ];

  // 已显示的新闻
  let shownNews = JSON.parse(localStorage.getItem('zootopiaShownNews')) || [];

  // 创建新闻播报器
  function createNewsTicker() {
    const ticker = document.createElement('div');
    ticker.className = 'zootopia-news-ticker';

    ticker.innerHTML = `
      <div class="ticker-header">
        <span class="ticker-icon">📰</span>
        <span class="ticker-title">动物城新闻</span>
        <span class="ticker-time" id="newsTime"></span>
      </div>
      <div class="ticker-content" id="tickerContent">
        <div class="ticker-placeholder">
          <span class="placeholder-icon">📡</span>
          <span class="placeholder-text">正在获取最新新闻...</span>
        </div>
      </div>
      <div class="ticker-controls">
        <button class="control-btn prev-btn" title="上一条">◀</button>
        <button class="control-btn next-btn" title="下一条">▶</button>
        <button class="control-btn close-btn" title="关闭">✕</button>
      </div>
    `;

    return ticker;
  }

  // 获取下一条未显示的新闻
  function getNextNews() {
    const unshown = newsData.filter((_, index) => !shownNews.includes(index));

    // 如果所有新闻都显示过了，重置
    if (unshown.length === 0) {
      shownNews = [];
      localStorage.setItem('zootopiaShownNews', JSON.stringify([]));
      return newsData[Math.floor(Math.random() * newsData.length)];
    }

    const news = unshown[Math.floor(Math.random() * unshown.length)];
    const index = newsData.indexOf(news);
    shownNews.push(index);
    localStorage.setItem('zootopiaShownNews', JSON.stringify(shownNews));

    return news;
  }

  // 显示新闻
  function showNews(news) {
    const content = document.getElementById('tickerContent');
    if (!content) return;

    content.innerHTML = `
      <div class="news-item">
        <div class="news-category" style="background: ${news.color}">
          <span class="category-icon">${news.icon}</span>
          <span class="category-text">${news.categoryCn}</span>
        </div>
        <div class="news-headline">${news.headline}</div>
        <div class="news-body">
          <p class="news-content">${news.content}</p>
          <div class="news-footer">
            <span class="reporter">
              <span class="reporter-emoji">${news.reporterEmoji}</span>
              <span class="reporter-name">${news.reporter}</span>
            </span>
            <span class="news-timestamp">${new Date().toLocaleTimeString('zh-CN')}</span>
          </div>
        </div>
      </div>
    `;

    // 更新时间
    updateTime();

    // 添加动画
    content.style.animation = 'none';
    setTimeout(() => {
      content.style.animation = 'newsSlideIn 0.5s ease';
    }, 10);
  }

  // 更新时间
  function updateTime() {
    const timeElement = document.getElementById('newsTime');
    if (timeElement) {
      const now = new Date();
      timeElement.textContent = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  // 自动播放新闻
  function startAutoPlay() {
    // 初始显示一条新闻
    const initialNews = getNextNews();
    showNews(initialNews);

    // 每30秒更新一条新闻
    setInterval(() => {
      // 检查是否应该显示新闻（30%概率）
      if (Math.random() < 0.3) {
        const news = getNextNews();
        showNews(news);
      }
    }, 30000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#news-ticker-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'news-ticker-styles';
    styles.textContent = `
      /* 新闻播报器 */
      .zootopia-news-ticker {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
        z-index: 9999;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: tickerSlideDown 0.5s ease;
      }

      @keyframes tickerSlideDown {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }

      .ticker-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .ticker-icon {
        font-size: 18px;
      }

      .ticker-title {
        font-size: 14px;
        font-weight: bold;
        flex: 1;
      }

      .ticker-time {
        font-size: 12px;
        opacity: 0.7;
        font-family: 'Courier New', monospace;
      }

      .ticker-content {
        padding: 15px 20px;
        min-height: 120px;
        max-height: 200px;
        overflow-y: auto;
      }

      .ticker-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        height: 90px;
        opacity: 0.7;
      }

      .placeholder-icon {
        font-size: 32px;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }

      .news-item {
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

      .news-category {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .category-icon {
        font-size: 14px;
      }

      .news-headline {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        line-height: 1.4;
      }

      .news-body {
        background: rgba(255, 255, 255, 0.1);
        padding: 12px;
        border-radius: 8px;
      }

      .news-content {
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 10px 0;
      }

      .news-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        opacity: 0.8;
      }

      .reporter {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .reporter-emoji {
        font-size: 16px;
      }

      .ticker-controls {
        display: flex;
        gap: 5px;
        padding: 8px 20px;
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .control-btn {
        width: 32px;
        height: 32px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .close-btn {
        margin-left: auto;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .ticker-header {
          padding: 8px 15px;
        }

        .ticker-content {
          padding: 12px 15px;
          min-height: 150px;
        }

        .news-headline {
          font-size: 16px;
        }

        .news-content {
          font-size: 13px;
        }
      }

      /* 滚动条样式 */
      .ticker-content::-webkit-scrollbar {
        width: 6px;
      }

      .ticker-content::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
      }

      .ticker-content::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化新闻播报器
  function initNewsTicker() {
    injectStyles();

    const ticker = createNewsTicker();
    document.body.appendChild(ticker);

    // 控制按钮
    const prevBtn = ticker.querySelector('.prev-btn');
    const nextBtn = ticker.querySelector('.next-btn');
    const closeBtn = ticker.querySelector('.close-btn');

    prevBtn.onclick = () => {
      const news = newsData[Math.floor(Math.random() * newsData.length)];
      showNews(news);
    };

    nextBtn.onclick = () => {
      const news = getNextNews();
      showNews(news);
    };

    closeBtn.onclick = () => {
      ticker.style.animation = 'tickerSlideUp 0.5s ease forwards';
      setTimeout(() => {
        ticker.remove();
        // 5分钟后重新创建
        setTimeout(() => {
          initNewsTicker();
        }, 300000);
      }, 500);
    };

    // 添加关闭动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes tickerSlideUp {
        to {
          transform: translateY(-100%);
        }
      }
    `;
    document.head.appendChild(style);

    // 启动自动播放
    startAutoPlay();

    // 每分钟更新时间
    setInterval(updateTime, 60000);
  }

  // 页面加载完成后初始化（延迟显示）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initNewsTicker, 3000);
    });
  } else {
    setTimeout(initNewsTicker, 3000);
  }

  // 导出显示函数
  window.showZootopiaNews = () => {
    initNewsTicker();
  };
})();
