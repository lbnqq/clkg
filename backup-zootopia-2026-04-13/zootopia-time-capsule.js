/**
 * 疯狂动物城主题 - 时间胶囊系统
 * Zootopia Theme - Time Capsule System
 * | 记录你在动物城的美好回忆
 */

(function() {
  'use strict';

  // 时间胶囊类型
  const capsuleTypes = {
    milestone: {
      name: '里程碑',
      icon: '🏆',
      color: '#FFD700',
      description: '重要成就时刻'
    },
    memory: {
      name: '回忆',
      icon: '📸',
      color: '#9B59B6',
      description: '美好回忆'
    },
    achievement: {
      name: '成就',
      icon: '🎖️',
      color: '#2ECC71',
      description: '解锁的成就'
    },
    discovery: {
      name: '发现',
      icon: '🗺️',
      color: '#3498DB',
      description: '新发现'
    },
    friendship: {
      name: '友谊',
      icon: '💝',
      color: '#E74C3C',
      description: '与角色的互动'
    },
    collection: {
      name: '收藏',
      icon: '🃏',
      color: '#F39C12',
      description: '收集的宝物'
    }
  };

  // 用户胶囊数据
  let capsuleData = JSON.parse(localStorage.getItem('zootopiaTimeCapsules')) || {
    capsules: [],
    totalCapsules: 0,
    firstCapsule: null,
    lastCapsule: null
  };

  // 保存数据
  function saveCapsuleData() {
    localStorage.setItem('zootopiaTimeCapsules', JSON.stringify(capsuleData));
  }

  // 创建时间胶囊面板
  function createCapsulePanel() {
    const panel = document.createElement('div');
    panel.className = 'time-capsule-panel';
    panel.innerHTML = `
      <button class="capsule-toggle" title="时间胶囊">
        <span class="toggle-icon">📦</span>
        <span class="capsule-count" id="capsuleCount">${capsuleData.totalCapsules}</span>
      </button>
      <div class="capsule-content">
        <div class="capsule-header">
          <div class="header-left">
            <span class="header-icon">📦</span>
            <div class="header-text">
              <div class="header-title">时间胶囊</div>
              <div class="header-subtitle">记录你的动物城回忆</div>
            </div>
          </div>
          <button class="capsule-close">×</button>
        </div>

        <div class="capsule-stats">
          <div class="stat-item">
            <span class="stat-icon">📊</span>
            <div class="stat-info">
              <span class="stat-value">${capsuleData.totalCapsules}</span>
              <span class="stat-label">总胶囊</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-icon">📅</span>
            <div class="stat-info">
              <span class="stat-value">${getCapsulesThisMonth()}</span>
              <span class="stat-label">本月</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🔥</span>
            <div class="stat-info">
              <span class="stat-value">${getStreak()}</span>
              <span class="stat-label">连续天数</span>
            </div>
          </div>
        </div>

        <div class="create-capsule">
          <div class="create-title">✨ 创建新胶囊</div>
          <div class="type-selector">
            ${Object.entries(capsuleTypes).map(([key, type]) => `
              <button class="type-btn" data-type="${key}" style="--type-color: ${type.color}">
                <span class="type-icon">${type.icon}</span>
                <span class="type-name">${type.name}</span>
              </button>
            `).join('')}
          </div>
          <div class="create-inputs">
            <input type="text" class="capsule-title-input" id="capsuleTitle" placeholder="胶囊标题..." maxlength="30">
            <textarea class="capsule-desc-input" id="capsuleDesc" placeholder="描述这个时刻..." rows="3" maxlength="100"></textarea>
          </div>
          <div class="create-actions">
            <button class="create-btn" id="createCapsuleBtn">
              <span class="btn-icon">📦</span>
              <span class="btn-text">封存胶囊</span>
            </button>
            <button class="quick-btn" onclick="quickCreateCapsule()">快速记录</button>
          </div>
        </div>

        <div class="capsules-timeline">
          <div class="timeline-header">
            <span class="timeline-title">🕐 时间线</span>
            <div class="timeline-filters">
              <button class="filter-btn active" data-filter="all">全部</button>
              <button class="filter-btn" data-filter="recent">最近</button>
              <button class="filter-btn" data-filter="milestone">里程碑</button>
            </div>
          </div>
          <div class="timeline-content" id="timelineContent">
            ${renderTimeline()}
          </div>
        </div>

        <div class="capsule-memories">
          <div class="memories-title">💫 特殊回忆</div>
          <div class="memories-grid" id="memoriesGrid">
            ${renderSpecialMemories()}
          </div>
        </div>
      </div>
    `;

    return panel;
  }

  // 渲染时间线
  function renderTimeline(filter = 'all') {
    if (capsuleData.capsules.length === 0) {
      return `
        <div class="empty-timeline">
          <span class="empty-icon">📦</span>
          <span class="empty-text">还没有时间胶囊</span>
          <span class="empty-hint">创建你的第一个胶囊吧！</span>
        </div>
      `;
    }

    let filteredCapsules = [...capsuleData.capsules];

    if (filter === 'recent') {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      filteredCapsules = filteredCapsules.filter(c => c.timestamp > weekAgo);
    } else if (filter === 'milestone') {
      filteredCapsules = filteredCapsules.filter(c => c.type === 'milestone');
    }

    // 按时间倒序
    filteredCapsules.sort((a, b) => b.timestamp - a.timestamp);

    return filteredCapsules.map(capsule => {
      const type = capsuleTypes[capsule.type];
      const date = new Date(capsule.timestamp);
      const dateStr = formatDate(date);

      return `
        <div class="timeline-item" data-capsule-id="${capsule.id}">
          <div class="timeline-marker" style="background: ${type.color}">
            <span class="marker-icon">${type.icon}</span>
          </div>
          <div class="timeline-content-box">
            <div class="timeline-header-row">
              <span class="timeline-title">${escapeHtml(capsule.title)}</span>
              <button class="timeline-delete" onclick="deleteCapsule('${capsule.id}')">🗑️</button>
            </div>
            <div class="timeline-desc">${escapeHtml(capsule.description)}</div>
            <div class="timeline-meta">
              <span class="timeline-type" style="color: ${type.color}">${type.icon} ${type.name}</span>
              <span class="timeline-date">${dateStr}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 渲染特殊回忆
  function renderSpecialMemories() {
    const specialCapsules = capsuleData.capsules.filter(c =>
      c.type === 'milestone' || c.type === 'achievement'
    ).slice(0, 6);

    if (specialCapsules.length === 0) {
      return '<div class="no-memories">还没有特殊回忆</div>';
    }

    return specialCapsules.map(capsule => {
      const type = capsuleTypes[capsule.type];
      return `
        <div class="memory-card" onclick="viewCapsule('${capsule.id}')" style="border-color: ${type.color}">
          <span class="memory-icon">${type.icon}</span>
          <span class="memory-title">${escapeHtml(capsule.title)}</span>
          <span class="memory-date">${formatDateShort(new Date(capsule.timestamp))}</span>
        </div>
      `;
    }).join('');
  }

  // 创建胶囊
  function createCapsule(type, title, description) {
    const capsule = {
      id: 'capsule_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      type: type,
      title: title,
      description: description,
      timestamp: Date.now(),
      metadata: {
        weekday: new Date().getDay(),
        hour: new Date().getHours(),
        season: getSeason()
      }
    };

    capsuleData.capsules.push(capsule);
    capsuleData.totalCapsules++;

    if (!capsuleData.firstCapsule) {
      capsuleData.firstCapsule = capsule.timestamp;
    }
    capsuleData.lastCapsule = capsule.timestamp;

    saveCapsuleData();
    updateCapsuleUI();

    // 显示创建动画
    showCapsuleCreated(capsule);

    // 添加经验值
    if (window.zootopiaAddXP) {
      window.zootopiaAddXP(25, '创建时间胶囊');
    }
  }

  // 快速创建胶囊
  function quickCreateCapsule() {
    const activities = [
      { type: 'discovery', title: '探索动物城', description: '在动物城中发现了新事物' },
      { type: 'memory', title: '美好时刻', description: '在博客度过的愉快时光' },
      { type: 'collection', title: '收藏家', description: '收集了新的宝物' },
      { type: 'friendship', title: '新朋友', description: '与角色进行了互动' }
    ];

    const activity = activities[Math.floor(Math.random() * activities.length)];
    createCapsule(activity.type, activity.title, activity.description);
  }

  // 删除胶囊
  function deleteCapsule(id) {
    if (!confirm('确定要删除这个时间胶囊吗？')) return;

    capsuleData.capsules = capsuleData.capsules.filter(c => c.id !== id);
    capsuleData.totalCapsules = capsuleData.capsules.length;

    saveCapsuleData();
    updateCapsuleUI();
  }

  // 查看胶囊详情
  function viewCapsule(id) {
    const capsule = capsuleData.capsules.find(c => c.id === id);
    if (!capsule) return;

    const type = capsuleTypes[capsule.type];
    const modal = document.createElement('div');
    modal.className = 'capsule-detail-modal';
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
      <div class="modal-content" style="border-color: ${type.color}">
        <button class="modal-close" onclick="this.closest('.capsule-detail-modal').remove()">×</button>

        <div class="detail-type" style="background: ${type.color}">
          <span class="detail-type-icon">${type.icon}</span>
          <span class="detail-type-name">${type.name}</span>
        </div>

        <div class="detail-title">${escapeHtml(capsule.title)}</div>
        <div class="detail-desc">${escapeHtml(capsule.description)}</div>

        <div class="detail-meta">
          <div class="meta-item">
            <span class="meta-icon">📅</span>
            <span class="meta-text">${formatDate(new Date(capsule.timestamp))}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🕐</span>
            <span class="meta-text">${formatTime(new Date(capsule.timestamp))}</span>
          </div>
        </div>

        <div class="detail-seal">
          <span class="seal-icon">🔖</span>
          <span class="seal-text">永久封存</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  // 显示胶囊创建动画
  function showCapsuleCreated(capsule) {
    const type = capsuleTypes[capsule.type];
    const notification = document.createElement('div');
    notification.className = 'capsule-created-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">${type.icon}</div>
        <div class="notification-title">胶囊已封存！</div>
        <div class="notification-capsule">${escapeHtml(capsule.title)}</div>
        <div class="notification-type" style="color: ${type.color}">${type.name}</div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // 更新UI
  function updateCapsuleUI() {
    document.getElementById('capsuleCount').textContent = capsuleData.totalCapsules;
    document.getElementById('timelineContent').innerHTML = renderTimeline();
    document.getElementById('memoriesGrid').innerHTML = renderSpecialMemories();
  }

  // 获取本月胶囊数
  function getCapsulesThisMonth() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return capsuleData.capsules.filter(c => c.timestamp >= startOfMonth.getTime()).length;
  }

  // 获取连续天数
  function getStreak() {
    if (capsuleData.capsules.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);

      const hasCapsule = capsuleData.capsules.some(c => {
        const capsuleDate = new Date(c.timestamp);
        capsuleDate.setHours(0, 0, 0, 0);
        return capsuleDate.getTime() === checkDate.getTime();
      });

      if (hasCapsule) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    return streak;
  }

  // 获取季节
  function getSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  }

  // 格式化日期
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${year}年${month}月${day}日 ${hour}:${minute}`;
  }

  // 格式化短日期
  function formatDateShort(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  }

  // 格式化时间
  function formatTime(date) {
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  // HTML转义
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#time-capsule-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'time-capsule-styles';
    styles.textContent = `
      /* 时间胶囊面板 */
      .time-capsule-panel {
        position: fixed;
        top: 650px;
        left: 30px;
        z-index: 9997;
      }

      .capsule-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #F39C12, #E67E22);
        border: none;
        box-shadow: 0 5px 20px rgba(243, 156, 18, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .capsule-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(243, 156, 18, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .capsule-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #E74C3C;
        color: white;
        font-size: 11px;
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 10px;
        border: 2px solid white;
      }

      .capsule-content {
        position: absolute;
        top: 0;
        left: 80px;
        width: 400px;
        max-height: 85vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: capsuleSlideIn 0.3s ease;
        overflow: hidden;
      }

      .capsule-content.show {
        display: block;
      }

      @keyframes capsuleSlideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* 头部 */
      .capsule-header {
        background: linear-gradient(135deg, #F39C12, #E67E22);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px 20px 0 0;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .header-icon {
        font-size: 28px;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .header-title {
        font-size: 16px;
        font-weight: bold;
      }

      .header-subtitle {
        font-size: 11px;
        opacity: 0.9;
      }

      .capsule-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      /* 统计 */
      .capsule-stats {
        display: flex;
        justify-content: space-around;
        padding: 15px;
        background: linear-gradient(135deg, rgba(243, 156, 18, 0.1), rgba(230, 126, 34, 0.1));
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .stat-icon {
        font-size: 20px;
      }

      .stat-info {
        display: flex;
        flex-direction: column;
      }

      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .stat-label {
        font-size: 11px;
        color: #636E72;
      }

      /* 创建胶囊 */
      .create-capsule {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .create-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
        text-align: center;
      }

      .type-selector {
        display: flex;
        gap: 8px;
        margin-bottom: 15px;
        flex-wrap: wrap;
      }

      .type-btn {
        flex: 1;
        min-width: 70px;
        padding: 10px;
        border: 2px solid var(--type-color);
        border-radius: 10px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }

      .type-btn:hover,
      .type-btn.selected {
        background: var(--type-color);
        color: white;
      }

      .type-icon {
        font-size: 20px;
      }

      .type-name {
        font-size: 11px;
        font-weight: bold;
      }

      .create-inputs {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 15px;
      }

      .capsule-title-input,
      .capsule-desc-input {
        padding: 12px;
        border: 2px solid rgba(243, 156, 18, 0.3);
        border-radius: 10px;
        font-size: 13px;
        font-family: inherit;
        outline: none;
        transition: all 0.3s ease;
      }

      .capsule-title-input:focus,
      .capsule-desc-input:focus {
        border-color: #F39C12;
        box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.1);
      }

      .capsule-desc-input {
        resize: none;
      }

      .create-actions {
        display: flex;
        gap: 10px;
      }

      .create-btn {
        flex: 2;
        padding: 12px;
        background: linear-gradient(135deg, #F39C12, #E67E22);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .create-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
      }

      .quick-btn {
        flex: 1;
        padding: 12px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .quick-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      }

      /* 时间线 */
      .capsules-timeline {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .timeline-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
      }

      .timeline-filters {
        display: flex;
        gap: 5px;
      }

      .filter-btn {
        padding: 5px 10px;
        background: #F8F9FA;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .filter-btn:hover,
      .filter-btn.active {
        background: #F39C12;
        color: white;
        border-color: #F39C12;
      }

      .timeline-content {
        max-height: 250px;
        overflow-y: auto;
      }

      .empty-timeline {
        text-align: center;
        padding: 30px 20px;
        color: #95A5A6;
      }

      .empty-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .empty-text {
        font-size: 14px;
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
      }

      .empty-hint {
        font-size: 12px;
        display: block;
      }

      .timeline-item {
        display: flex;
        gap: 15px;
        padding: 12px 0;
        position: relative;
      }

      .timeline-item:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 15px;
        top: 40px;
        bottom: -12px;
        width: 2px;
        background: rgba(0, 0, 0, 0.1);
      }

      .timeline-marker {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        z-index: 1;
      }

      .marker-icon {
        font-size: 16px;
      }

      .timeline-content-box {
        flex: 1;
        background: #F8F9FA;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }

      .timeline-header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }

      .timeline-title {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .timeline-delete {
        background: none;
        border: none;
        font-size: 14px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s ease;
      }

      .timeline-delete:hover {
        opacity: 1;
      }

      .timeline-desc {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .timeline-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
      }

      .timeline-type {
        font-weight: bold;
      }

      .timeline-date {
        color: #95A5A6;
      }

      /* 特殊回忆 */
      .capsule-memories {
        padding: 15px 20px;
        background: rgba(243, 156, 18, 0.05);
      }

      .memories-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 12px;
      }

      .memories-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .memory-card {
        padding: 12px;
        background: white;
        border: 2px solid;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        text-align: center;
      }

      .memory-card:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .memory-icon {
        font-size: 24px;
      }

      .memory-title {
        font-size: 11px;
        font-weight: bold;
        color: #2D3436;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      .memory-date {
        font-size: 10px;
        color: #95A5A6;
      }

      .no-memories {
        grid-column: 1 / -1;
        text-align: center;
        color: #95A5A6;
        font-size: 12px;
        padding: 15px;
      }

      /* 详情弹窗 */
      .capsule-detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10010;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }

      .modal-content {
        position: relative;
        width: 320px;
        background: white;
        border-radius: 20px;
        border: 3px solid;
        padding: 25px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
      }

      .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        font-size: 20px;
        cursor: pointer;
      }

      .detail-type {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .detail-title {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .detail-desc {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 20px;
        line-height: 1.5;
      }

      .detail-meta {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        color: #636E72;
      }

      .meta-icon {
        font-size: 14px;
      }

      .detail-seal {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: linear-gradient(135deg, rgba(243, 156, 18, 0.2), rgba(230, 126, 34, 0.2));
        border-radius: 20px;
        font-size: 12px;
        color: #F39C12;
        font-weight: bold;
      }

      /* 创建通知 */
      .capsule-created-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: notificationPop 0.5s ease;
      }

      @keyframes notificationPop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      .notification-content {
        background: white;
        border-radius: 20px;
        padding: 30px 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 280px;
      }

      .notification-icon {
        font-size: 64px;
        display: block;
        margin-bottom: 15px;
        animation: bounce 1s ease infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }

      .notification-title {
        font-size: 20px;
        font-weight: bold;
        color: #F39C12;
        margin-bottom: 10px;
      }

      .notification-capsule {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 8px;
      }

      .notification-type {
        font-size: 14px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .time-capsule-panel {
          left: 15px;
        }

        .capsule-content {
          width: calc(100vw - 60px);
          left: 0;
        }

        .memories-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化时间胶囊系统
  function initTimeCapsule() {
    injectStyles();

    const panel = createCapsulePanel();
    document.body.appendChild(panel);

    const content = panel.querySelector('.capsule-content');
    const toggle = panel.querySelector('.capsule-toggle');
    const close = panel.querySelector('.capsule-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      content.classList.toggle('show');
      if (content.classList.contains('show')) {
        updateCapsuleUI();
      }
    };

    // 关闭按钮
    close.onclick = () => {
      content.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) {
        content.classList.remove('show');
      }
    });

    // 类型选择
    let selectedType = 'memory';
    panel.querySelectorAll('.type-btn').forEach(btn => {
      btn.onclick = () => {
        panel.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedType = btn.dataset.type;
      };
    });

    // 默认选择第一个类型
    panel.querySelector('.type-btn').classList.add('selected');

    // 创建按钮
    document.getElementById('createCapsuleBtn').onclick = () => {
      const title = document.getElementById('capsuleTitle').value.trim();
      const desc = document.getElementById('capsuleDesc').value.trim();

      if (!title) {
        alert('请输入胶囊标题');
        return;
      }

      createCapsule(selectedType, title, desc || '无描述');

      // 清空输入
      document.getElementById('capsuleTitle').value = '';
      document.getElementById('capsuleDesc').value = '';
    };

    // 筛选按钮
    panel.querySelectorAll('.filter-btn').forEach(btn => {
      btn.onclick = () => {
        panel.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('timelineContent').innerHTML = renderTimeline(btn.dataset.filter);
      };
    });
  }

  // 导出全局函数
  window.quickCreateCapsule = quickCreateCapsule;
  window.deleteCapsule = deleteCapsule;
  window.viewCapsule = viewCapsule;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeCapsule);
  } else {
    initTimeCapsule();
  }
})();
