/**
 * 疯狂动物城主题 - 货币系统
 * Zootopia Theme - Currency System
 * | 动物城的胡萝卜币经济系统
 */

(function() {
  'use strict';

  // 动物城货币数据库
  const zootopiaCurrency = {
    name: '动物城币',
    symbol: 'z',
    symbolDisplay: '🥕',
    subdivisions: '分',
    exchangeRate: 1, // 1胡萝卜币 = 100分
    inflationRate: 0.02, // 年通胀率2%
    description: '动物城官方货币，以胡萝卜为符号',

    // 用户钱包
    wallet: {
      balance: 1500.00, // 初始余额
      income: 0,
      expenses: 0,
      transactions: []
    },

    // 商品和服务价格
    prices: {
      // 食品饮料
      pawpsicle: 2,
      jumbo_pop: 15,
      bug_burger_meal: 18,
      coffee: 5,
      carrot_cake: 12,

      // 交通
      subway_ride: 3,
      day_pass: 15,
      weekly_pass: 80,
      month_pass: 280,
      express_train: 25,

      // 娱乐
      gazelle_concert: 150,
      movie_ticket: 25,
      zoo_ticket: 50,

      // 服务
      dmv_service: 0, // 免费...但很慢
      zpd_consultation: 20,
      taxi_ride: 15,

      // 商品
      carrot_pen: 35,
      gazelle_album: 45,
      zpd_badge_replica: 28,
      plush_toy: 22,

      // 住宿
      budget_hotel: 120,
      luxury_hotel: 350,
      tree_house: 180
    },

    // 收入来源
    incomeSources: {
      zpd_salary: 2500,
      part_time_job: 800,
      pawpsicle_sales: 500,
      gig_work: 300,
      investment: 100
    },

    // 支出类别
    expenseCategories: {
      food: '🍔 餐饮',
      transport: '🚇 交通',
      entertainment: '🎬 娱乐',
      shopping: '🛍️ 购物',
      housing: '🏠 住宿',
      utilities: '💡 水电',
      other: '📦 其他'
    }
  };

  // 当前状态
  let currencyState = {
    balance: 1500.00,
    dailyIncome: 0,
    dailyExpenses: 0,
    savings: 0,
    lastUpdate: Date.now()
  };

  // 创建货币系统
  function createCurrencySystem() {
    const system = document.createElement('div');
    system.className = 'zootopia-currency-system';
    system.innerHTML = `
      <!-- 钱包显示 -->
      <div class="wallet-display" id="walletDisplay">
        <div class="wallet-icon">${zootopiaCurrency.symbolDisplay}</div>
        <div class="wallet-info">
          <div class="wallet-label">我的钱包</div>
          <div class="wallet-balance" id="walletBalance">${zootopiaCurrency.symbol}${currencyState.balance.toFixed(2)}</div>
        </div>
        <button class="expand-wallet-btn" id="expandWalletBtn">▼</button>
      </div>

      <!-- 货币面板 -->
      <div class="currency-panel" id="currencyPanel">
        <!-- 面板头部 -->
        <div class="panel-header">
          <div class="header-title">
            <span class="title-icon">${zootopiaCurrency.symbolDisplay}</span>
            <span class="title-text">动物城银行</span>
          </div>
          <button class="close-btn" id="closeCurrencyBtn">×</button>
        </div>

        <!-- 账户概览 -->
        <div class="account-overview">
          <div class="overview-card">
            <div class="card-label">当前余额</div>
            <div class="card-balance" id="panelBalance">${zootopiaCurrency.symbol}${currencyState.balance.toFixed(2)}</div>
            <div class="card-change" id="balanceChange">今日变化: +${zootopiaCurrency.symbol}0.00</div>
          </div>
          <div class="overview-stats">
            <div class="stat-item">
              <div class="stat-icon">💰</div>
              <div class="stat-info">
                <div class="stat-label">今日收入</div>
                <div class="stat-value" id="dailyIncome">+${zootopiaCurrency.symbol}0.00</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">💸</div>
              <div class="stat-info">
                <div class="stat-label">今日支出</div>
                <div class="stat-value" id="dailyExpenses">-${zootopiaCurrency.symbol}0.00</div>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">🏦</div>
              <div class="stat-info">
                <div class="stat-label">储蓄</div>
                <div class="stat-value" id="savings">${zootopiaCurrency.symbol}${currencyState.savings.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能标签 -->
        <div class="currency-tabs">
          <button class="currency-tab active" data-tab="shop">🛒 购物</button>
          <button class="currency-tab" data-tab="work">💼 工作</button>
          <button class="currency-tab" data-tab="history">📜 交易</button>
          <button class="currency-tab" data-tab="exchange">💱 汇率</button>
        </div>

        <!-- 购物内容 -->
        <div class="tab-content active" id="shopContent">
          <div class="shop-categories">
            <div class="category-filter active" data-category="all">全部</div>
            <div class="category-filter" data-category="food">🍔 餐饮</div>
            <div class="category-filter" data-category="transport">🚇 交通</div>
            <div class="category-filter" data-category="entertainment">🎬 娱乐</div>
            <div class="category-filter" data-category="shopping">🛍️ 商品</div>
          </div>
          <div class="shop-items" id="shopItems"></div>
        </div>

        <!-- 工作内容 -->
        <div class="tab-content" id="workContent">
          <div class="job-list" id="jobList"></div>
        </div>

        <!-- 交易历史 -->
        <div class="tab-content" id="historyContent">
          <div class="transaction-list" id="transactionList">
            <div class="empty-state">暂无交易记录</div>
          </div>
        </div>

        <!-- 汇率信息 -->
        <div class="tab-content" id="exchangeContent">
          <div class="exchange-info">
            <div class="exchange-title">💱 货币信息</div>
            <div class="exchange-details">
              <div class="detail-item">
                <span class="detail-label">货币名称</span>
                <span class="detail-value">动物城币</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">货币符号</span>
                <span class="detail-value">${zootopiaCurrency.symbol} (${zootopiaCurrency.symbolDisplay})</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">最小单位</span>
                <span class="detail-value">1分 = 0.01${zootopiaCurrency.symbol}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">年通胀率</span>
                <span class="detail-value">${(zootopiaCurrency.inflationRate * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div class="exchange-tips">
              <div class="tips-title">💡 理财小贴士</div>
              <ul class="tips-list">
                <li>🥕 胡萝卜是货币符号，不是真的胡萝卜</li>
                <li>💰 每日记账有助于理财规划</li>
                <li>🏦 储蓄可以应对突发情况</li>
                <li>📊 谨慎消费，量入为出</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    return system;
  }

  // 渲染商店物品
  function renderShopItems(category = 'all') {
    const itemsContainer = document.getElementById('shopItems');
    if (!itemsContainer) return;

    const allItems = [
      { id: 'pawpsicle', name: '爪爪冰棍', icon: '🍦', price: zootopiaCurrency.prices.pawpsicle, category: 'food', description: '尼克招牌，清凉解暑' },
      { id: 'jumbo_pop', name: 'Jumbo Pop', icon: '🍭', price: zootopiaCurrency.prices.jumbo_pop, category: 'food', description: '巨型冰棍，适合分享' },
      { id: 'bug_burger', name: '昆虫汉堡套餐', icon: '🍔', price: zootopiaCurrency.prices.bug_burger_meal, category: 'food', description: '含薯条和饮料' },
      { id: 'coffee', name: '咖啡', icon: '☕', price: zootopiaCurrency.prices.coffee, category: 'food', description: '提神醒脑' },
      { id: 'carrot_cake', name: '胡萝卜蛋糕', icon: '🥕', price: zootopiaCurrency.prices.carrot_cake, category: 'food', description: '朱迪的最爱' },
      { id: 'subway_ride', name: '地铁单程票', icon: '🎫', price: zootopiaCurrency.prices.subway_ride, category: 'transport', description: '单次地铁乘车' },
      { id: 'day_pass', name: '地铁日票', icon: '📅', price: zootopiaCurrency.prices.day_pass, category: 'transport', description: '当日无限次乘坐' },
      { id: 'month_pass', name: '地铁月票', icon: '📆', price: zootopiaCurrency.prices.month_pass, category: 'transport', description: '30天无限次乘坐' },
      { id: 'gazelle_concert', name: 'Gazelle演唱会', icon: '🎤', price: zootopiaCurrency.prices.gazelle_concert, category: 'entertainment', description: 'VIP座位' },
      { id: 'movie_ticket', name: '电影票', icon: '🎬', price: zootopiaCurrency.prices.movie_ticket, category: 'entertainment', description: '最新上映电影' },
      { id: 'zoo_ticket', name: '动物园门票', icon: '🎫', price: zootopiaCurrency.prices.zoo_ticket, category: 'entertainment', description: '周末游玩' },
      { id: 'carrot_pen', name: '胡萝卜录音笔', icon: '🥕', price: zootopiaCurrency.prices.carrot_pen, category: 'shopping', description: 'ZPD标准装备' },
      { id: 'gazelle_album', name: 'Gazelle专辑', icon: '💿', price: zootopiaCurrency.prices.gazelle_album, category: 'shopping', description: '最新专辑' },
      { id: 'zpd_badge', name: 'ZPD徽章', icon: '🎖️', price: zootopiaCurrency.prices.zpd_badge_replica, category: 'shopping', description: '收藏级徽章' },
      { id: 'plush_toy', name: '毛绒玩具', icon: '🧸', price: zootopiaCurrency.prices.plush_toy, category: 'shopping', description: '角色毛绒玩具' },
      { id: 'budget_hotel', name: '经济酒店', icon: '🏨', price: zootopiaCurrency.prices.budget_hotel, category: 'housing', description: '舒适便捷' },
      { id: 'luxury_hotel', name: '豪华酒店', icon: '🏰', price: zootopiaCurrency.prices.luxury_hotel, category: 'housing', description: '奢华享受' }
    ];

    const filteredItems = category === 'all'
      ? allItems
      : allItems.filter(item => item.category === category);

    itemsContainer.innerHTML = filteredItems.map(item => `
      <div class="shop-item">
        <div class="item-icon">${item.icon}</div>
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-description">${item.description}</div>
          <div class="item-price">${zootopiaCurrency.symbol}${item.price.toFixed(2)}</div>
        </div>
        <button class="buy-btn" data-id="${item.id}" data-price="${item.price}">
          <span>🛒</span>
          <span>购买</span>
        </button>
      </div>
    `).join('');

    // 添加购买事件
    itemsContainer.querySelectorAll('.buy-btn').forEach(btn => {
      btn.onclick = () => {
        const itemId = btn.dataset.id;
        const price = parseFloat(btn.dataset.price);
        purchaseItem(itemId, price);
      };
    });
  }

  // 渲染工作列表
  function renderJobList() {
    const listContainer = document.getElementById('jobList');
    if (!listContainer) return;

    const jobs = [
      { id: 'zpd_officer', name: 'ZPD警官', icon: '👮', daily: zootopiaCurrency.incomeSources.zpd_salary / 30, description: '维护动物城和平', requirement: '警校毕业' },
      { id: 'part_time', name: '兼职工作', icon: '🕐', daily: zootopiaCurrency.incomeSources.part_time_job / 30, description: '轻松赚取零花钱', requirement: '无' },
      { id: 'sales', name: 'Pawpsicle销售', icon: '🍦', daily: zootopiaCurrency.incomeSources.pawpsicle_sales / 30, description: '跟着尼克学赚钱', requirement: '冰棍制作技巧' },
      { id: 'gig', name: '自由职业', icon: '💼', daily: zootopiaCurrency.incomeSources.gig_work / 30, description: '完成各种任务', requirement: '根据任务而定' }
    ];

    listContainer.innerHTML = jobs.map(job => `
      <div class="job-card">
        <div class="job-icon">${job.icon}</div>
        <div class="job-info">
          <div class="job-name">${job.name}</div>
          <div class="job-description">${job.description}</div>
          <div class="job-meta">
            <span class="job-income">日薪: ${zootopiaCurrency.symbol}${job.daily.toFixed(2)}</span>
            <span class="job-requirement">${job.requirement}</span>
          </div>
        </div>
        <button class="work-btn" data-id="${job.id}" data-income="${job.daily}">
          <span>💼</span>
          <span>工作</span>
        </button>
      </div>
    `).join('');

    // 添加工作事件
    listContainer.querySelectorAll('.work-btn').forEach(btn => {
      btn.onclick = () => {
        const jobId = btn.dataset.id;
        const income = parseFloat(btn.dataset.income);
        doWork(jobId, income);
      };
    });
  }

  // 购买物品
  function purchaseItem(itemId, price) {
    if (currencyState.balance < price) {
      showNotification('余额不足！', 'error');
      return;
    }

    // 扣款
    currencyState.balance -= price;
    currencyState.dailyExpenses += price;

    // 添加交易记录
    addTransaction('purchase', itemId, -price);

    // 更新显示
    updateBalanceDisplay();
    showNotification(`购买成功！-${zootopiaCurrency.symbol}${price.toFixed(2)}`, 'success');
  }

  // 工作
  function doWork(jobId, income) {
    // 显示工作动画
    showNotification('正在工作...', 'info');

    setTimeout(() => {
      // 收款
      currencyState.balance += income;
      currencyState.dailyIncome += income;

      // 添加交易记录
      addTransaction('income', jobId, income);

      // 更新显示
      updateBalanceDisplay();
      showNotification(`工作完成！+${zootopiaCurrency.symbol}${income.toFixed(2)}`, 'success');
    }, 1000);
  }

  // 添加交易记录
  function addTransaction(type, description, amount) {
    const transaction = {
      id: Date.now(),
      type: type,
      description: description,
      amount: amount,
      timestamp: new Date().toLocaleString('zh-CN')
    };

    zootopiaCurrency.wallet.transactions.unshift(transaction);

    // 只保留最近50条
    if (zootopiaCurrency.wallet.transactions.length > 50) {
      zootopiaCurrency.wallet.transactions = zootopiaCurrency.wallet.transactions.slice(0, 50);
    }

    renderTransactionHistory();
  }

  // 渲染交易历史
  function renderTransactionHistory() {
    const listContainer = document.getElementById('transactionList');
    if (!listContainer) return;

    const transactions = zootopiaCurrency.wallet.transactions;

    if (transactions.length === 0) {
      listContainer.innerHTML = '<div class="empty-state">暂无交易记录</div>';
      return;
    }

    listContainer.innerHTML = transactions.map(t => `
      <div class="transaction-item">
        <div class="transaction-icon">${t.type === 'income' ? '💰' : '🛒'}</div>
        <div class="transaction-info">
          <div class="transaction-desc">${t.description}</div>
          <div class="transaction-time">${t.timestamp}</div>
        </div>
        <div class="transaction-amount ${t.type === 'income' ? 'income' : 'expense'}">
          ${t.amount >= 0 ? '+' : ''}${zootopiaCurrency.symbol}${Math.abs(t.amount).toFixed(2)}
        </div>
      </div>
    `).join('');
  }

  // 更新余额显示
  function updateBalanceDisplay() {
    document.getElementById('walletBalance').textContent = `${zootopiaCurrency.symbol}${currencyState.balance.toFixed(2)}`;
    document.getElementById('panelBalance').textContent = `${zootopiaCurrency.symbol}${currencyState.balance.toFixed(2)}`;
    document.getElementById('dailyIncome').textContent = `+${zootopiaCurrency.symbol}${currencyState.dailyIncome.toFixed(2)}`;
    document.getElementById('dailyExpenses').textContent = `-${zootopiaCurrency.symbol}${currencyState.dailyExpenses.toFixed(2)}`;
    document.getElementById('savings').textContent = `${zootopiaCurrency.symbol}${currencyState.savings.toFixed(2)}`;

    // 更今日变化
    const dailyChange = currencyState.dailyIncome - currencyState.dailyExpenses;
    const changeElement = document.getElementById('balanceChange');
    changeElement.textContent = `今日变化: ${dailyChange >= 0 ? '+' : ''}${zootopiaCurrency.symbol}${dailyChange.toFixed(2)}`;
    changeElement.style.color = dailyChange >= 0 ? '#2ECC71' : '#E74C3C';
  }

  // 显示通知
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `currency-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#E74C3C' : '#3498DB'};
      color: white;
      padding: 15px 30px;
      border-radius: 10px;
      z-index: 10001;
      font-size: 14px;
      font-weight: bold;
      animation: notificationFadeIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'notificationFadeOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // 切换面板
  function togglePanel() {
    const system = document.querySelector('.zootopia-currency-system');
    const panel = document.getElementById('currencyPanel');

    system.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 扩展钱包
  function expandWallet() {
    togglePanel();
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#currency-system-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'currency-system-styles';
    styles.textContent = `
      /* 货币系统容器 */
      .zootopia-currency-system {
        position: fixed;
        bottom: 560px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 钱包显示 */
      .wallet-display {
        background: linear-gradient(135deg, #27AE60, #2ECC71);
        color: white;
        border-radius: 50px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
        transition: all 0.3s ease;
      }

      .wallet-display:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(39, 174, 96, 0.5);
      }

      .wallet-icon {
        font-size: 24px;
      }

      .wallet-info {
        flex: 1;
      }

      .wallet-label {
        font-size: 11px;
        opacity: 0.9;
      }

      .wallet-balance {
        font-size: 18px;
        font-weight: bold;
      }

      .expand-wallet-btn {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .zootopia-currency-system.expanded .expand-wallet-btn {
        transform: rotate(180deg);
      }

      /* 货币面板 */
      .currency-panel {
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

      .currency-panel.visible {
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
        background: linear-gradient(135deg, #27AE60, #2ECC71);
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

      /* 账户概览 */
      .account-overview {
        padding: 20px;
        background: #F8F9FA;
      }

      .overview-card {
        text-align: center;
        margin-bottom: 15px;
      }

      .card-label {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .card-balance {
        font-size: 28px;
        font-weight: bold;
        color: #27AE60;
      }

      .card-change {
        font-size: 12px;
        margin-top: 5px;
      }

      .overview-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      .stat-item {
        background: white;
        border-radius: 10px;
        padding: 12px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .stat-icon {
        font-size: 20px;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 10px;
        color: #636E72;
      }

      .stat-value {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      /* 标签页 */
      .currency-tabs {
        display: flex;
        border-bottom: 1px solid #ECF0F1;
      }

      .currency-tab {
        flex: 1;
        padding: 12px;
        background: #F8F9FA;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 12px;
        font-weight: 600;
      }

      .currency-tab.active {
        background: white;
        color: #27AE60;
        border-bottom: 3px solid #27AE60;
      }

      .currency-tab:hover:not(.active) {
        background: #ECF0F1;
      }

      /* 标签内容 */
      .tab-content {
        display: none;
        padding: 15px 20px;
        max-height: 350px;
        overflow-y: auto;
      }

      .tab-content.active {
        display: block;
      }

      /* 购物分类 */
      .shop-categories {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
        flex-wrap: wrap;
      }

      .category-filter {
        padding: 6px 12px;
        background: #F8F9FA;
        border-radius: 15px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .category-filter.active {
        background: #27AE60;
        color: white;
      }

      .category-filter:hover:not(.active) {
        background: #ECF0F1;
      }

      /* 商品列表 */
      .shop-items {
        display: grid;
        gap: 12px;
      }

      .shop-item {
        background: white;
        border: 1px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: all 0.3s ease;
      }

      .shop-item:hover {
        border-color: #27AE60;
        box-shadow: 0 2px 10px rgba(39, 174, 96, 0.2);
      }

      .item-icon {
        font-size: 32px;
        flex-shrink: 0;
      }

      .item-info {
        flex: 1;
      }

      .item-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .item-description {
        font-size: 11px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .item-price {
        font-size: 16px;
        font-weight: bold;
        color: #27AE60;
      }

      .buy-btn {
        background: linear-gradient(135deg, #27AE60, #2ECC71);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
      }

      .buy-btn:hover {
        transform: scale(1.05);
      }

      /* 工作列表 */
      .job-list {
        display: grid;
        gap: 12px;
      }

      .job-card {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .job-icon {
        font-size: 28px;
      }

      .job-info {
        flex: 1;
      }

      .job-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .job-description {
        font-size: 11px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .job-meta {
        display: flex;
        gap: 10px;
        font-size: 10px;
      }

      .job-income {
        color: #27AE60;
        font-weight: bold;
      }

      .job-requirement {
        color: #636E72;
      }

      .work-btn {
        background: linear-gradient(135deg, #27AE60, #2ECC71);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      /* 交易历史 */
      .transaction-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .transaction-item {
        background: white;
        border: 1px solid #ECF0F1;
        border-radius: 10px;
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .transaction-icon {
        font-size: 20px;
      }

      .transaction-info {
        flex: 1;
      }

      .transaction-desc {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .transaction-time {
        font-size: 10px;
        color: #95A5A6;
      }

      .transaction-amount {
        font-size: 14px;
        font-weight: bold;
      }

      .transaction-amount.income {
        color: #2ECC71;
      }

      .transaction-amount.expense {
        color: #E74C3C;
      }

      .empty-state {
        text-align: center;
        color: #95A5A6;
        padding: 40px 20px;
      }

      /* 汇率信息 */
      .exchange-info {
        padding: 15px;
      }

      .exchange-title {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 15px;
        text-align: center;
      }

      .exchange-details {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 13px;
      }

      .detail-label {
        color: #636E72;
      }

      .detail-value {
        font-weight: bold;
        color: #2D3436;
      }

      .exchange-tips {
        background: #FFF9E6;
        border-radius: 12px;
        padding: 15px;
      }

      .tips-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .tips-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .tips-list li {
        font-size: 13px;
        color: #636E72;
        padding: 5px 0;
      }

      /* 通知动画 */
      @keyframes notificationFadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }

      @keyframes notificationFadeOut {
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
      }

      /* 滚动条 */
      .tab-content::-webkit-scrollbar {
        width: 4px;
      }

      .tab-content::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .tab-content::-webkit-scrollbar-thumb {
        background: #27AE60;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 480px) {
        .zootopia-currency-system {
          right: 10px;
          bottom: 540px;
        }

        .currency-panel {
          width: calc(100vw - 20px);
        }

        .overview-stats {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initCurrencySystem() {
    injectStyles();

    const system = createCurrencySystem();
    document.body.appendChild(system);

    // 钱包点击
    document.getElementById('expandWalletBtn').onclick = expandWallet;
    document.getElementById('closeCurrencyBtn').onclick = togglePanel;

    // 标签页切换
    document.querySelectorAll('.currency-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.currency-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });

        const tabName = tab.dataset.tab;
        document.getElementById(`${tabName}Content`).classList.add('active');

        // 初始化内容
        if (tabName === 'shop') renderShopItems();
        if (tabName === 'work') renderJobList();
      };
    });

    // 分类筛选
    document.querySelectorAll('.category-filter').forEach(filter => {
      filter.onclick = () => {
        document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        renderShopItems(filter.dataset.category);
      };
    });

    // 初始化购物
    renderShopItems();

    // 导出全局函数
    window.zootopiaCurrency = {
      getBalance: () => currencyState.balance,
      addIncome: (amount) => {
        currencyState.balance += amount;
        currencyState.dailyIncome += amount;
        updateBalanceDisplay();
      },
      purchase: (itemId, price) => purchaseItem(itemId, price)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCurrencySystem);
  } else {
    initCurrencySystem();
  }
})();
