/**
 * 疯狂动物城主题 - Pawpsicle 收集系统
 * Zootopia Theme - Pawpsicle Collector
 * 点击收集 Pawpsicle，获得成就和奖励！
 */

(function() {
  'use strict';

  // 收集统计
  let collectedCount = parseInt(localStorage.getItem('pawpsicleCount')) || 0;
  let totalClicks = parseInt(localStorage.getItem('pawpsicleClicks')) || 0;

  // Pawpsicle 类型
  const pawpsicleTypes = [
    { emoji: '🍭', name: '樱桃冰棍', rarity: 'common', points: 1 },
    { emoji: '🍦', name: '香草冰淇淋', rarity: 'common', points: 1 },
    { emoji: '🧊', name: '冰块', rarity: 'common', points: 1 },
    { emoji: '🍧', name: '刨冰', rarity: 'uncommon', points: 2 },
    { emoji: '🥤', name: '冰沙', rarity: 'uncommon', points: 2 },
    { emoji: '🍨', name: '冰淇淋球', rarity: 'rare', points: 3 },
    { emoji: '🍩', name: '甜甜圈冰棍', rarity: 'rare', points: 3 },
    { emoji: '🎀', name: '特制 Pawpsicle', rarity: 'legendary', points: 5 },
    { emoji: '⭐', name: '闪亮 Pawpsicle', rarity: 'legendary', points: 5 }
  ];

  // 稀有度配置
  const rarityConfig = {
    common: { color: '#636E72', probability: 0.5 },
    uncommon: { color: '#00D2D3', probability: 0.3 },
    rare: { color: '#5F27CD', probability: 0.15 },
    legendary: { color: '#FF9F43', probability: 0.05 }
  };

  // 成就系统
  const achievements = [
    { id: 'first', name: '第一次收集', description: '收集第1个 Pawpsicle', condition: (c) => c >= 1, icon: '🎉', unlocked: false },
    { id: 'ten', name: '收集新手', description: '收集10个 Pawpsicle', condition: (c) => c >= 10, icon: '🌟', unlocked: false },
    { id: 'fifty', name: '收集达人', description: '收集50个 Pawpsicle', condition: (c) => c >= 50, icon: '💎', unlocked: false },
    { id: 'hundred', name: '收集大师', description: '收集100个 Pawpsicle', condition: (c) => c >= 100, icon: '👑', unlocked: false },
    { id: 'legendary', name: '传奇收集者', description: '收集1个传说 Pawpsicle', condition: (c) => c.hasLegendary, icon: '🏆', unlocked: false }
  ];

  // 加载成就状态
  const savedAchievements = JSON.parse(localStorage.getItem('pawpsicleAchievements')) || {};
  achievements.forEach(a => {
    a.unlocked = savedAchievements[a.id] || false;
  });

  // 创建 Pawpsicle 元素
  function createPawpsicle() {
    const pawpsicle = document.createElement('div');
    pawpsicle.className = 'pawpsicle-item';

    // 随机选择类型
    const rand = Math.random();
    let cumulative = 0;
    let selectedType = pawpsicleTypes[0];

    for (const type of pawpsicleTypes) {
      cumulative += rarityConfig[type.rarity].probability;
      if (rand <= cumulative) {
        selectedType = type;
        break;
      }
    }

    pawpsicle.dataset.type = selectedType.name;
    pawpsicle.dataset.rarity = selectedType.rarity;
    pawpsicle.dataset.points = selectedType.points;

    pawpsicle.innerHTML = `
      <span class="pawpsicle-emoji">${selectedType.emoji}</span>
      <span class="pawpsicle-glow"></span>
    `;

    // 随机位置
    const x = Math.random() * (window.innerWidth - 60);
    const y = Math.random() * (window.innerHeight - 60);
    pawpsicle.style.left = `${x}px`;
    pawpsicle.style.top = `${y}px`;

    // 随机大小
    const size = 30 + Math.random() * 20;
    pawpsicle.style.width = `${size}px`;
    pawpsicle.style.height = `${size}px`;

    // 稀有度样式
    pawpsicle.style.setProperty('--pawpsicle-color', rarityConfig[selectedType.rarity].color);

    // 点击收集
    pawpsicle.onclick = (e) => {
      e.stopPropagation();
      collectPawpsicle(pawpsicle, selectedType);
    };

    // 自动消失
    setTimeout(() => {
      if (pawpsicle.parentElement) {
        pawpsicle.style.animation = 'pawpsicleFadeOut 0.5s ease forwards';
        setTimeout(() => pawpsicle.remove(), 500);
      }
    }, 8000 + Math.random() * 4000);

    return pawpsicle;
  }

  // 收集 Pawpsicle
  function collectPawpsicle(element, type) {
    // 更新统计
    collectedCount++;
    totalClicks++;
    localStorage.setItem('pawpsicleCount', collectedCount);
    localStorage.setItem('pawpsicleClicks', totalClicks);

    // 检查是否有传说级
    if (type.rarity === 'legendary') {
      const stats = JSON.parse(localStorage.getItem('pawpsicleStats')) || {};
      stats.hasLegendary = true;
      localStorage.setItem('pawpsicleStats', JSON.stringify(stats));
    }

    // 创建收集动画
    showCollectAnimation(element, type);

    // 显示收集消息
    showCollectMessage(type);

    // 检查成就
    checkAchievements();

    // 更新显示
    updateDisplay();

    // 移除元素
    element.remove();
  }

  // 收集动画
  function showCollectAnimation(element, type) {
    const rect = element.getBoundingClientRect();

    // 创建飞向收集器的动画
    const flyEffect = document.createElement('div');
    flyEffect.className = 'pawpsicle-fly';
    flyEffect.innerHTML = type.emoji;
    flyEffect.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      font-size: 24px;
      z-index: 10001;
      pointer-events: none;
      transition: all 0.5s ease;
    `;

    document.body.appendChild(flyEffect);

    setTimeout(() => {
      const counter = document.querySelector('.pawpsicle-counter');
      if (counter) {
        const counterRect = counter.getBoundingClientRect();
        flyEffect.style.left = `${counterRect.left + counterRect.width / 2}px`;
        flyEffect.style.top = `${counterRect.top + counterRect.height / 2}px`;
        flyEffect.style.opacity = '0';
        flyEffect.style.transform = 'scale(0)';
      }
    }, 50);

    setTimeout(() => flyEffect.remove(), 550);

    // 创建粒子效果
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'collect-particle';
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 8px;
        height: 8px;
        background: ${rarityConfig[type.rarity].color};
        border-radius: 50%;
        z-index: 10001;
        pointer-events: none;
      `;

      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.transition = 'all 0.5s ease';
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        particle.style.opacity = '0';
      }, 50);

      setTimeout(() => particle.remove(), 550);
    }
  }

  // 收集消息
  function showCollectMessage(type) {
    const rarityNames = {
      common: '普通',
      uncommon: '稀有',
      rare: '罕见',
      legendary: '传说'
    };

    const messages = document.createElement('div');
    messages.className = 'pawpsicle-message';
    messages.innerHTML = `
      <span class="message-emoji">${type.emoji}</span>
      <span class="message-text">
        <strong>+${type.points}</strong> ${rarityNames[type.rarity]} ${type.name}
      </span>
    `;

    messages.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, ${rarityConfig[type.rarity].color}, ${type.rarity === 'legendary' ? '#FFD700' : rarityConfig[type.rarity].color});
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      z-index: 10002;
      font-size: 18px;
      font-weight: bold;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      animation: messagePopup 1s ease forwards;
    `;

    document.body.appendChild(messages);
    setTimeout(() => messages.remove(), 1000);
  }

  // 检查成就
  function checkAchievements() {
    const stats = JSON.parse(localStorage.getItem('pawpsicleStats')) || {};
    stats.hasLegendary = stats.hasLegendary || false;

    let newAchievement = null;

    for (const achievement of achievements) {
      if (!achievement.unlocked && achievement.condition({ count: collectedCount, hasLegendary: stats.hasLegendary })) {
        achievement.unlocked = true;
        newAchievement = achievement;
      }
    }

    // 保存成就
    const unlockedIds = {};
    achievements.forEach(a => {
      if (a.unlocked) unlockedIds[a.id] = true;
    });
    localStorage.setItem('pawpsicleAchievements', JSON.stringify(unlockedIds));

    // 显示新成就
    if (newAchievement) {
      showAchievementUnlock(newAchievement);
    }
  }

  // 成就解锁
  function showAchievementUnlock(achievement) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <div class="achievement-title">🎉 成就解锁！</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
      <button class="achievement-close">×</button>
    `;

    document.body.appendChild(toast);

    // 自动消失
    setTimeout(() => {
      toast.style.animation = 'achievementSlideOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 5000);

    toast.querySelector('.achievement-close').onclick = () => toast.remove();
  }

  // 创建计数器
  function createCounter() {
    const counter = document.createElement('div');
    counter.className = 'pawpsicle-counter';
    counter.innerHTML = `
      <span class="counter-emoji">🍭</span>
      <span class="counter-number">${collectedCount}</span>
    `;

    counter.onclick = () => showStats();

    return counter;
  }

  // 显示统计
  function showStats() {
    const stats = JSON.parse(localStorage.getItem('pawpsicleStats')) || {};
    const hasLegendary = stats.hasLegendary || false;

    const statsPanel = document.createElement('div');
    statsPanel.className = 'pawpsicle-stats-panel';
    statsPanel.innerHTML = `
      <div class="stats-header">
        <h2>📊 Pawpsicle 收集统计</h2>
        <button class="stats-close">×</button>
      </div>
      <div class="stats-content">
        <div class="stats-overview">
          <div class="stat-card">
            <div class="stat-icon">🍭</div>
            <div class="stat-value">${collectedCount}</div>
            <div class="stat-label">已收集</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👆</div>
            <div class="stat-value">${totalClicks}</div>
            <div class="stat-label">总点击</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⭐</div>
            <div class="stat-value">${collectedCount > 0 ? (totalClicks / collectedCount).toFixed(1) : '0'}</div>
            <div class="stat-label">平均点击</div>
          </div>
        </div>
        <div class="achievements-section">
          <h3>🏆 成就</h3>
          <div class="achievements-list">
            ${achievements.map(a => `
              <div class="achievement-item ${a.unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-item-icon">${a.unlocked ? a.icon : '🔒'}</span>
                <div class="achievement-item-info">
                  <div class="achievement-item-name">${a.name}</div>
                  <div class="achievement-item-desc">${a.description}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="stats-actions">
          <button class="stats-btn stats-btn-reset">重置统计</button>
          <button class="stats-btn stats-btn-close">关闭</button>
        </div>
      </div>
    `;

    document.body.appendChild(statsPanel);

    // 关闭按钮
    statsPanel.querySelector('.stats-close').onclick = () => statsPanel.remove();
    statsPanel.querySelector('.stats-btn-close').onclick = () => statsPanel.remove();

    // 重置按钮
    statsPanel.querySelector('.stats-btn-reset').onclick = () => {
      if (confirm('确定要重置所有统计数据吗？')) {
        localStorage.removeItem('pawpsicleCount');
        localStorage.removeItem('pawpsicleClicks');
        localStorage.removeItem('pawpsicleAchievements');
        localStorage.removeItem('pawpsicleStats');
        collectedCount = 0;
        totalClicks = 0;
        updateDisplay();
        statsPanel.remove();
        location.reload();
      }
    };
  }

  // 更新显示
  function updateDisplay() {
    const counter = document.querySelector('.pawpsicle-counter');
    if (counter) {
      counter.querySelector('.counter-number').textContent = collectedCount;
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#pawpsicle-collector-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'pawpsicle-collector-styles';
    styles.textContent = `
      /* Pawpsicle 元素 */
      .pawpsicle-item {
        position: fixed;
        cursor: pointer;
        z-index: 9998;
        animation: pawpsicleFloat 3s ease-in-out infinite;
        transition: transform 0.2s ease;
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
      }

      .pawpsicle-item:hover {
        transform: scale(1.2);
      }

      @keyframes pawpsicleFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
      }

      @keyframes pawpsicleFadeOut {
        to {
          opacity: 0;
          transform: scale(0);
        }
      }

      .pawpsicle-emoji {
        font-size: inherit;
        display: block;
        position: relative;
        z-index: 2;
      }

      .pawpsicle-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150%;
        height: 150%;
        background: var(--pawpsicle-color, #FF9F43);
        border-radius: 50%;
        opacity: 0.3;
        filter: blur(8px);
        z-index: 1;
      }

      /* 消息弹出 */
      @keyframes messagePopup {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      /* 计数器 */
      .pawpsicle-counter {
        position: fixed;
        bottom: 100px;
        left: 30px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 15px;
        background: linear-gradient(135deg, #FF9F43, #FDCB6E);
        border-radius: 20px;
        color: white;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0 4px 15px rgba(255, 159, 67, 0.4);
        cursor: pointer;
        z-index: 9995;
        transition: all 0.3s ease;
      }

      .pawpsicle-counter:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(255, 159, 67, 0.5);
      }

      .counter-emoji {
        font-size: 20px;
      }

      .counter-number {
        font-size: 18px;
      }

      /* 统计面板 */
      .pawpsicle-stats-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 500px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10003;
        overflow: hidden;
        animation: statsPopup 0.3s ease;
      }

      @keyframes statsPopup {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .stats-header {
        background: linear-gradient(135deg, #FF9F43, #FDCB6E);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .stats-header h2 {
        margin: 0;
        font-size: 18px;
      }

      .stats-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .stats-close:hover {
        opacity: 1;
      }

      .stats-content {
        padding: 20px;
        max-height: calc(80vh - 80px);
        overflow-y: auto;
      }

      .stats-overview {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 20px;
      }

      .stat-card {
        background: rgba(255, 159, 67, 0.1);
        padding: 15px;
        border-radius: 12px;
        text-align: center;
      }

      .stat-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #FF9F43;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 12px;
        color: #636E72;
      }

      .achievements-section {
        margin-top: 20px;
      }

      .achievements-section h3 {
        margin: 0 0 15px 0;
        font-size: 16px;
        color: #2D3436;
      }

      .achievements-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .achievement-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px;
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .achievement-item.unlocked {
        background: rgba(46, 213, 115, 0.1);
        border: 2px solid #2ED573;
      }

      .achievement-item.locked {
        background: rgba(99, 110, 114, 0.1);
        border: 2px solid transparent;
        opacity: 0.6;
      }

      .achievement-item-icon {
        font-size: 32px;
      }

      .achievement-item-name {
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .achievement-item-desc {
        font-size: 12px;
        color: #636E72;
      }

      .stats-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }

      .stats-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .stats-btn-reset {
        background: #FF6B6B;
        color: white;
      }

      .stats-btn-reset:hover {
        background: #EE5A5A;
      }

      .stats-btn-close {
        background: #0ABDE3;
        color: white;
      }

      .stats-btn-close:hover {
        background: #00A8CC;
      }

      /* 成就提示 */
      .achievement-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 25px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: white;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.5);
        z-index: 10004;
        animation: achievementSlideIn 0.5s ease;
      }

      @keyframes achievementSlideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-100%);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      @keyframes achievementSlideOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-100%);
        }
      }

      .achievement-icon {
        font-size: 36px;
      }

      .achievement-info {
        flex: 1;
      }

      .achievement-title {
        font-size: 14px;
        margin-bottom: 5px;
      }

      .achievement-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 3px;
      }

      .achievement-desc {
        font-size: 12px;
        opacity: 0.9;
      }

      .achievement-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
      }

      .achievement-close:hover {
        opacity: 1;
      }
    `;

    document.head.appendChild(styles);
  }

  // 生成 Pawpsicle
  function spawnPawpsicle() {
    // 检查是否已有太多
    const existing = document.querySelectorAll('.pawpsicle-item');
    if (existing.length >= 5) return;

    const pawpsicle = createPawpsicle();
    document.body.appendChild(pawpsicle);
  }

  // 初始化收集系统
  function initCollector() {
    injectStyles();

    // 添加计数器
    document.body.appendChild(createCounter());

    // 定期生成 Pawpsicle
    setInterval(spawnPawpsicle, 5000);

    // 初始生成几个
    setTimeout(() => spawnPawpsicle(), 2000);
    setTimeout(() => spawnPawpsicle(), 4000);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollector);
  } else {
    initCollector();
  }

  // 导出生成函数
  window.spawnPawpsicle = spawnPawpsicle;
})();
