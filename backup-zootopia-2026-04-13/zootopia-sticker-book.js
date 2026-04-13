/**
 * 疯狂动物城主题 - 贴纸书
 * Zootopia Theme - Sticker Book
 * | 收集和装饰的贴纸系统
 */

(function() {
  'use strict';

  // 贴纸数据
  const stickers = {
    characters: [
      { id: 'judy1', name: '警官朱迪', emoji: '🐰', rarity: 'common', category: 'character' },
      { id: 'nick1', name: '尼克·王尔德', emoji: '🦊', rarity: 'common', category: 'character' },
      { id: 'flash1', name: '闪电', emoji: '🐢', rarity: 'common', category: 'character' },
      { id: 'bogo1', name: '博戈局长', emoji: '🦁', rarity: 'rare', category: 'character' },
      { id: 'bellwether1', name: '绵羊副市长', emoji: '🐑', rarity: 'rare', category: 'character' },
      { id: ' Clawhauser1', name: '本杰明', emoji: '🐆', rarity: 'common', category: 'character' },
      { id: 'mrbig1', name: 'Mr. Big', emoji: '🐀', rarity: 'epic', category: 'character' },
      { id: 'finnick1', name: '芬尼克', emoji: '🦊', rarity: 'rare', category: 'character' }
    ],
    items: [
      { id: 'pawpsicle1', name: 'Pawpsicle', emoji: '🍦', rarity: 'common', category: 'item' },
      { id: 'carrot1', name: '胡萝卜笔', emoji: '🥕', rarity: 'common', category: 'item' },
      { id: 'badge1', name: 'ZPD警徽', emoji: '👮', rarity: 'rare', category: 'item' },
      { id: 'ticket1', name: '罚单', emoji: '🎫', rarity: 'common', category: 'item' },
      { id: 'donut1', name: '甜甜圈', emoji: '🍩', rarity: 'common', category: 'item' },
      { id: 'coffee1', name: '咖啡', emoji: '☕', rarity: 'common', category: 'item' },
      { id: 'train1', name: '火车', emoji: '🚂', rarity: 'rare', category: 'item' },
      { id: 'sunglasses1', name: '墨镜', emoji: '🕶️', rarity: 'epic', category: 'item' }
    ],
    locations: [
      { id: 'station1', name: 'ZPD总部', emoji: '🏢', rarity: 'rare', category: 'location' },
      { id: 'sahara1', name: '撒哈拉广场', emoji: '🏜️', rarity: 'rare', category: 'location' },
      { id: 'tundratown1', name: '冰川镇', emoji: '❄️', rarity: 'rare', category: 'location' },
      { id: 'rainforest1', name: '雨林区', emoji: '🌴', rarity: 'rare', category: 'location' },
      { id: 'bunnyburrow1', name: '兔子洞', emoji: '🥕', rarity: 'common', category: 'location' },
      { id: 'littleRodentia1', name: '啮齿小镇', emoji: '🐁', rarity: 'epic', category: 'location' }
    ],
    effects: [
      { id: 'sparkle1', name: '闪光', emoji: '✨', rarity: 'common', category: 'effect' },
      { id: 'star1', name: '星星', emoji: '⭐', rarity: 'common', category: 'effect' },
      { id: 'heart1', name: '爱心', emoji: '❤️', rarity: 'common', category: 'effect' },
      { id: 'fire1', name: '火焰', emoji: '🔥', rarity: 'rare', category: 'effect' },
      { id: 'rainbow1', name: '彩虹', emoji: '🌈', rarity: 'epic', category: 'effect' }
    ]
  };

  // 稀有度颜色
  const rarityColors = {
    common: '#95A5A6',
    rare: '#3498DB',
    epic: '#9B59B6',
    legendary: '#F39C12'
  };

  // 用户贴纸书数据
  let stickerBook = {
    collected: [],
    placed: [],
    pages: 1,
    unlocked: true
  };

  // 加载贴纸书数据
  function loadStickerBook() {
    const saved = localStorage.getItem('zootopiaStickerBook');
    if (saved) {
      stickerBook = JSON.parse(saved);
    }
  }

  // 保存贴纸书数据
  function saveStickerBook() {
    localStorage.setItem('zootopiaStickerBook', JSON.stringify(stickerBook));
  }

  // 创建贴纸书界面
  function createStickerBook() {
    const book = document.createElement('div');
    book.className = 'zootopia-sticker-book';
    book.innerHTML = `
      <div class="sticker-backdrop"></div>
      <div class="sticker-container">
        <div class="sticker-header">
          <div class="sticker-logo">📒</div>
          <div class="sticker-title">动物城贴纸书</div>
          <div class="sticker-stats">
            <span class="collected-count">${stickerBook.collected.length}/${Object.values(stickers).flat().length}</span>
          </div>
          <button class="sticker-close">×</button>
        </div>

        <div class="sticker-tabs">
          <button class="tab-btn active" data-tab="collection">收藏</button>
          <button class="tab-btn" data-tab="placed">已放置</button>
          <button class="tab-btn" data-tab="shop">商店</button>
        </div>

        <div class="sticker-content">
          <div class="tab-content active" id="collectionTab">
            <div class="category-filters">
              <button class="filter-btn active" data-filter="all">全部</button>
              <button class="filter-btn" data-filter="character">角色</button>
              <button class="filter-btn" data-filter="item">物品</button>
              <button class="filter-btn" data-filter="location">地点</button>
              <button class="filter-btn" data-filter="effect">特效</button>
            </div>
            <div class="stickers-grid" id="stickersGrid"></div>
          </div>

          <div class="tab-content" id="placedTab">
            <div class="placement-area" id="placementArea">
              <div class="placement-canvas" id="placementCanvas">
                <!-- 放置的贴纸会在这里 -->
              </div>
            </div>
            <div class="placement-tools">
              <button class="tool-btn" id="clearAllBtn">清空全部</button>
              <button class="tool-btn" id="saveLayoutBtn">保存布局</button>
            </div>
          </div>

          <div class="tab-content" id="shopTab">
            <div class="shop-grid" id="shopGrid"></div>
          </div>
        </div>

        <div class="sticker-detail" id="stickerDetail">
          <!-- 贴纸详情 -->
        </div>
      </div>

      <button class="sticker-toggle" id="stickerToggle">
        <span class="toggle-icon">📒</span>
      </button>
    `;

    return book;
  }

  // 渲染贴纸网格
  function renderStickersGrid(filter = 'all') {
    const grid = document.getElementById('stickersGrid');
    if (!grid) return;

    const allStickers = Object.values(stickers).flat();
    const filtered = filter === 'all' ? allStickers : allStickers.filter(s => s.category === filter);

    grid.innerHTML = filtered.map(sticker => {
      const collected = stickerBook.collected.includes(sticker.id);
      return `
        <div class="sticker-item ${collected ? 'collected' : 'locked'}" data-sticker="${sticker.id}">
          <div class="sticker-card" style="border-color: ${rarityColors[sticker.rarity]}">
            <div class="sticker-emoji">${sticker.emoji}</div>
            <div class="sticker-name">${sticker.name}</div>
            <div class="sticker-rarity" style="background: ${rarityColors[sticker.rarity]}">${sticker.rarity}</div>
            ${!collected ? '<div class="sticker-lock">🔒</div>' : ''}
          </div>
        </div>
      `;
    }).join('');

    // 添加点击事件
    grid.querySelectorAll('.sticker-item').forEach(item => {
      item.addEventListener('click', () => {
        const stickerId = item.dataset.sticker;
        showStickerDetail(stickerId);
      });
    });
  }

  // 显示贴纸详情
  function showStickerDetail(stickerId) {
    const allStickers = Object.values(stickers).flat();
    const sticker = allStickers.find(s => s.id === stickerId);
    if (!sticker) return;

    const collected = stickerBook.collected.includes(stickerId);
    const detail = document.getElementById('stickerDetail');

    detail.innerHTML = `
      <div class="detail-content">
        <div class="detail-emoji" style="font-size: 64px">${sticker.emoji}</div>
        <div class="detail-name">${sticker.name}</div>
        <div class="detail-rarity" style="background: ${rarityColors[sticker.rarity]}">${sticker.rarity}</div>
        <div class="detail-category">${sticker.category}</div>
        ${collected ? `
          <button class="detail-btn place-btn">放置贴纸</button>
          <button class="detail-btn close-btn">关闭</button>
        ` : `
          <div class="detail-locked">尚未收集到此贴纸</div>
          <button class="detail-btn close-btn">关闭</button>
        `}
      </div>
    `;

    detail.classList.add('active');

    detail.querySelector('.close-btn').onclick = () => {
      detail.classList.remove('active');
    };

    if (collected) {
      detail.querySelector('.place-btn').onclick = () => {
        detail.classList.remove('active');
        switchToPlacedTab();
        addToCanvas(sticker);
      };
    }
  }

  // 切换到已放置标签
  function switchToPlacedTab() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === 'placed');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === 'placedTab');
    });
  }

  // 添加到画布
  function addToCanvas(sticker) {
    const canvas = document.getElementById('placementCanvas');
    const placedSticker = document.createElement('div');
    placedSticker.className = 'placed-sticker';
    placedSticker.dataset.sticker = sticker.id;
    placedSticker.innerHTML = sticker.emoji;
    placedSticker.style.cssText = `
      position: absolute;
      left: ${Math.random() * 80 + 10}%;
      top: ${Math.random() * 80 + 10}%;
      font-size: 48px;
      cursor: move;
      user-select: none;
    `;

    // 拖拽功能
    let isDragging = false;
    let startX, startY, initialX, initialY;

    placedSticker.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = placedSticker.offsetLeft;
      initialY = placedSticker.offsetTop;
      placedSticker.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      placedSticker.style.left = `${initialX + dx}px`;
      placedSticker.style.top = `${initialY + dy}px`;
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        placedSticker.style.zIndex = '';
        savePlacedStickers();
      }
    });

    // 右键删除
    placedSticker.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      placedSticker.remove();
      savePlacedStickers();
    });

    canvas.appendChild(placedSticker);
    savePlacedStickers();
  }

  // 保存放置的贴纸
  function savePlacedStickers() {
    const canvas = document.getElementById('placementCanvas');
    const placed = [];
    canvas.querySelectorAll('.placed-sticker').forEach(sticker => {
      placed.push({
        id: sticker.dataset.sticker,
        left: sticker.style.left,
        top: sticker.style.top
      });
    });
    stickerBook.placed = placed;
    saveStickerBook();
  }

  // 加载放置的贴纸
  function loadPlacedStickers() {
    stickerBook.placed.forEach(placed => {
      const allStickers = Object.values(stickers).flat();
      const sticker = allStickers.find(s => s.id === placed.id);
      if (sticker) {
        const canvas = document.getElementById('placementCanvas');
        if (canvas) {
          const placedSticker = document.createElement('div');
          placedSticker.className = 'placed-sticker';
          placedSticker.dataset.sticker = sticker.id;
          placedSticker.innerHTML = sticker.emoji;
          placedSticker.style.cssText = `
            position: absolute;
            left: ${placed.left};
            top: ${placed.top};
            font-size: 48px;
            cursor: move;
            user-select: none;
          `;
          canvas.appendChild(placedSticker);
        }
      }
    });
  }

  // 渲染商店
  function renderShop() {
    const shopGrid = document.getElementById('shopGrid');
    if (!shopGrid) return;

    // 随机生成3个可购买的贴纸包
    const packs = [
      { name: '基础包', emoji: '📦', price: 50, stickers: 3, rarity: 'common' },
      { name: '稀有包', emoji: '🎁', price: 100, stickers: 2, rarity: 'rare' },
      { name: '史诗包', emoji: '👑', price: 200, stickers: 1, rarity: 'epic' }
    ];

    shopGrid.innerHTML = packs.map(pack => `
      <div class="shop-pack" data-pack="${pack.rarity}">
        <div class="pack-emoji">${pack.emoji}</div>
        <div class="pack-name">${pack.name}</div>
        <div class="pack-info">${pack.stickers} 贴纸</div>
        <div class="pack-price">⭐ ${pack.price}</div>
        <button class="pack-buy-btn">购买</button>
      </div>
    `).join('');

    shopGrid.querySelectorAll('.pack-buy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pack = e.target.closest('.shop-pack');
        buyPack(pack.dataset.pack);
      });
    });
  }

  // 购买贴纸包
  function buyPack(rarity) {
    const prices = { common: 50, rare: 100, epic: 200 };
    const price = prices[rarity];

    // 获取用户积分（从等级系统）
    const userXP = parseInt(localStorage.getItem('zootopiaXP') || '0');

    if (userXP < price) {
      alert('积分不足！');
      return;
    }

    // 扣除积分
    localStorage.setItem('zootopiaXP', userXP - price);

    // 随机获取贴纸
    const allStickers = Object.values(stickers).flat().filter(s => s.rarity === rarity && !stickerBook.collected.includes(s.id));
    if (allStickers.length > 0) {
      const newSticker = allStickers[Math.floor(Math.random() * allStickers.length)];
      stickerBook.collected.push(newSticker.id);
      saveStickerBook();

      // 显示获得通知
      window.dispatchEvent(new CustomEvent('zootopiaCollection', {
        detail: { message: `获得贴纸: ${newSticker.name}`, item: newSticker.emoji }
      }));

      renderStickersGrid();
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#sticker-book-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'sticker-book-styles';
    styles.textContent = `
      /* 贴纸书容器 */
      .zootopia-sticker-book {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: none;
      }

      .zootopia-sticker-book.active {
        display: block;
      }

      .sticker-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        animation: backdropFadeIn 0.3s ease;
      }

      .sticker-container {
        position: relative;
        width: 90vw;
        height: 90vh;
        margin: 5vh auto;
        background: linear-gradient(135deg, #FFF5E6 0%, #FFE5CC 100%);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      }

      /* 贴纸书头部 */
      .sticker-header {
        background: linear-gradient(135deg, #FF9F43, #F39C12);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .sticker-logo {
        font-size: 36px;
        animation: logoWiggle 2s ease infinite;
      }

      @keyframes logoWiggle {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }

      .sticker-title {
        flex: 1;
        font-size: 24px;
        font-weight: bold;
      }

      .sticker-stats {
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        font-weight: bold;
      }

      .sticker-close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      /* 标签页 */
      .sticker-tabs {
        display: flex;
        background: rgba(0, 0, 0, 0.1);
        padding: 10px 20px 0;
        gap: 10px;
      }

      .tab-btn {
        padding: 12px 24px;
        background: transparent;
        border: none;
        border-radius: 10px 10px 0 0;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.3s ease;
      }

      .tab-btn.active {
        background: white;
        opacity: 1;
      }

      .tab-btn:hover {
        opacity: 1;
      }

      /* 标签内容 */
      .sticker-content {
        background: white;
        height: calc(90vh - 100px);
        overflow: hidden;
      }

      .tab-content {
        display: none;
        height: 100%;
        padding: 20px;
        overflow-y: auto;
      }

      .tab-content.active {
        display: block;
      }

      /* 分类过滤 */
      .category-filters {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .filter-btn {
        padding: 8px 16px;
        background: #F39C12;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
      }

      .filter-btn:hover, .filter-btn.active {
        background: #E67E22;
        transform: scale(1.05);
      }

      /* 贴纸网格 */
      .stickers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
      }

      .sticker-item {
        cursor: pointer;
      }

      .sticker-card {
        background: white;
        border: 3px solid;
        border-radius: 15px;
        padding: 15px;
        text-align: center;
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .sticker-item:hover .sticker-card {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
      }

      .sticker-item.locked .sticker-card {
        opacity: 0.5;
        filter: grayscale(50%);
      }

      .sticker-emoji {
        font-size: 48px;
        margin-bottom: 10px;
      }

      .sticker-name {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .sticker-rarity {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
        color: white;
      }

      .sticker-lock {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 20px;
      }

      /* 放置区域 */
      .placement-area {
        width: 100%;
        height: calc(100% - 60px);
        background: linear-gradient(135deg, #FFE5CC 0%, #FFD5B3 100%);
        border-radius: 15px;
        position: relative;
        overflow: hidden;
      }

      .placement-canvas {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .placed-sticker {
        position: absolute;
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        transition: transform 0.2s ease;
      }

      .placed-sticker:hover {
        transform: scale(1.1);
      }

      .placement-tools {
        display: flex;
        gap: 10px;
        margin-top: 15px;
      }

      .tool-btn {
        flex: 1;
        padding: 12px;
        background: #F39C12;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
      }

      .tool-btn:hover {
        background: #E67E22;
      }

      /* 商店 */
      .shop-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }

      .shop-pack {
        background: linear-gradient(135deg, #FFE5CC, #FFD5B3);
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .shop-pack:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(255, 159, 67, 0.3);
      }

      .pack-emoji {
        font-size: 64px;
        margin-bottom: 10px;
      }

      .pack-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .pack-info {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 10px;
      }

      .pack-price {
        font-size: 20px;
        font-weight: bold;
        color: #F39C12;
        margin-bottom: 15px;
      }

      .pack-buy-btn {
        padding: 10px 30px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
      }

      .pack-buy-btn:hover {
        transform: scale(1.05);
      }

      /* 详情面板 */
      .sticker-detail {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 20px;
        padding: 30px;
        text-align: center;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: none;
      }

      .sticker-detail.active {
        display: block;
        animation: detailPop 0.3s ease;
      }

      @keyframes detailPop {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .detail-emoji {
        margin-bottom: 15px;
      }

      .detail-name {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .detail-rarity {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
      }

      .detail-category {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 20px;
      }

      .detail-btn {
        padding: 12px 30px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        margin: 5px;
      }

      .detail-locked {
        color: #E74C3C;
        font-weight: bold;
        margin: 20px 0;
      }

      /* 切换按钮 */
      .sticker-toggle {
        position: fixed;
        bottom: 90px;
        left: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF9F43, #F39C12);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .sticker-toggle:hover {
        transform: scale(1.1) rotate(10deg);
      }

      .toggle-icon {
        font-size: 28px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .sticker-container {
          width: 95vw;
          height: 95vh;
          margin: 2.5vh auto;
        }

        .sticksers-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .sticker-toggle {
          bottom: 170px;
          left: 15px;
          width: 50px;
          height: 50px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化贴纸书
  function initStickerBook() {
    loadStickerBook();
    injectStyles();

    const book = createStickerBook();
    document.body.appendChild(book);

    // 切换按钮
    document.getElementById('stickerToggle').onclick = () => {
      book.classList.add('active');
      renderStickersGrid();
      loadPlacedStickers();
      renderShop();
    };

    // 关闭按钮
    document.querySelector('.sticker-close').onclick = () => {
      book.classList.remove('active');
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${tab}Tab`).classList.add('active');
      });
    });

    // 分类过滤
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderStickersGrid(btn.dataset.filter);
      });
    });

    // 清空全部
    document.getElementById('clearAllBtn').onclick = () => {
      if (confirm('确定要清空所有贴纸吗？')) {
        document.getElementById('placementCanvas').innerHTML = '';
        savePlacedStickers();
      }
    };

    // 保存布局
    document.getElementById('saveLayoutBtn').onclick = () => {
      savePlacedStickers();
      alert('布局已保存！');
    };
  }

  // 导出全局函数
  window.zootopiaStickers = {
    show: () => {
      document.querySelector('.zootopia-sticker-book').classList.add('active');
    },
    collect: (stickerId) => {
      if (!stickerBook.collected.includes(stickerId)) {
        stickerBook.collected.push(stickerId);
        saveStickerBook();
        return true;
      }
      return false;
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickerBook);
  } else {
    initStickerBook();
  }
})();
