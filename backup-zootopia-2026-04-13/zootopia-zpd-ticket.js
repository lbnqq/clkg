/**
 * 疯狂动物城主题 - ZPD 罚单生成器
 * Zootopia Theme - ZPD Ticket Generator
 * 生成有趣的 ZPD 罚单，像 Judy 一样开罚单！
 */

(function() {
  'use strict';

  // 违规类型
  const violationTypes = [
    { id: 'speeding', name: '超速行驶', emoji: '🏎️', fine: 150 },
    { id: 'jaywalking', name: '乱穿马路', emoji: '🚶', fine: 50 },
    { id: 'pawpsicle', name: '非法销售 Pawpsicle', emoji: '🍭', fine: 200 },
    { id: 'tax', name: '逃税', emoji: '💰', fine: 500 },
    { id: 'hustle', name: '无证经营', emoji: '🎪', fine: 300 },
    { id: 'noise', name: '噪音扰民', emoji: '🔊', fine: 75 },
    { id: 'parking', name: '违规停车', emoji: '🚗', fine: 100 },
    { id: 'littering', name: '乱扔垃圾', emoji: '🗑️', fine: 80 },
    { id: 'ice', name: '非法交易冰棍', emoji: '🍦', fine: 250 },
    { id: 'fox', name: '狐狸可疑行为', emoji: '🦊', fine: 175 },
    { id: 'dance', name: '无证街头表演', emoji: '💃', fine: 90 },
    { id: 'carrot', name: '浪费胡萝卜', emoji: '🥕', fine: 60 }
  ];

  // ZPD 警官
  const officers = [
    { name: 'Judy Hopps', nameCn: '朱迪·霍普斯', badge: 'ZPD-001', emoji: '🐰' },
    { name: 'Nick Wilde', nameCn: '尼克·王尔德', badge: 'ZPD-002', emoji: '🦊' },
    { name: 'Chief Bogo', nameCn: '博戈局长', badge: 'ZPD-000', emoji: '🦬' },
    { name: 'McHorn', nameCn: '麦克霍恩', badge: 'ZPD-003', emoji: '🦏' },
    { name: 'Wolfard', nameCn: '沃尔法德', badge: 'ZPD-004', emoji: '🐺' }
  ];

  // 罚单备注
  const ticketNotes = [
    '根据动物城市政法规第',
    '依据 ZPD 执法准则第',
    '按照 Mayor Lionheart 签署的第',
    '根据城市管理条例第',
    '依据动物城交通法规第'
  ];

  const noteNumbers = [
    '328 条规定',
    '156 条规定',
    '892 条规定',
    '445 条规定',
    '217 条规定'
  ];

  // 罚单数量统计
  let ticketCount = parseInt(localStorage.getItem('zpdTicketCount')) || 0;

  // 创建罚单生成器
  function createTicketGenerator() {
    const generator = document.createElement('div');
    generator.className = 'zpd-ticket-generator';

    generator.innerHTML = `
      <button class="ticket-trigger" title="生成 ZPD 罚单">
        <span class="trigger-icon">👮</span>
        <span class="trigger-text">ZPD罚单</span>
      </button>
    `;

    return generator;
  }

  // 生成随机罚单
  function generateRandomTicket() {
    const violation = violationTypes[Math.floor(Math.random() * violationTypes.length)];
    const officer = officers[Math.floor(Math.random() * officers.length)];
    const note = ticketNotes[Math.floor(Math.random() * ticketNotes.length)];
    const noteNumber = noteNumbers[Math.floor(Math.random() * noteNumbers.length)];

    const ticketNumber = 'ZPD-' + Date.now().toString().slice(-8);
    const dateTime = new Date().toLocaleString('zh-CN');
    const location = getRandomLocation();

    return {
      ticketNumber,
      dateTime,
      violation,
      officer,
      note,
      noteNumber,
      location,
      fine: violation.fine + Math.floor(Math.random() * 50) // 随机增加一些罚款
    };
  }

  // 随机地点
  function getRandomLocation() {
    const locations = [
      '撒哈拉广场主干道',
      '冰川镇冰雕馆前',
      '雨林区树冠大道',
      '市中心市政厅广场',
      '兔窝镇胡萝卜集市',
      '小啮齿镇奶酪街',
      '草甸镇森林路口',
      '地铁蓝线车站',
      'Gazelle 剧院门口',
      'ZPD 总部附近'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  // 显示罚单
  function showTicket(ticket) {
    // 更新统计
    ticketCount++;
    localStorage.setItem('zpdTicketCount', ticketCount);

    // 创建罚单弹窗
    const modal = document.createElement('div');
    modal.className = 'zpd-ticket-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="ticket-paper">
        <div class="ticket-close" onclick="this.closest('.zpd-ticket-modal').remove()">×</div>

        <div class="ticket-header">
          <div class="zpd-logo">
            <span class="zpd-badge">🛡️</span>
            <div class="zpd-text">
              <div class="zpd-title">ZPD</div>
              <div class="zpd-subtitle">Zootopia Police Department</div>
            </div>
          </div>
          <div class="ticket-type">
            <span class="type-emoji">📋</span>
            <span class="type-text">交通违规罚单</span>
          </div>
        </div>

        <div class="ticket-divider"></div>

        <div class="ticket-body">
          <div class="ticket-number">
            <span class="number-label">罚单编号：</span>
            <span class="number-value">${ticket.ticketNumber}</span>
          </div>

          <div class="ticket-info-grid">
            <div class="info-item">
              <span class="info-label">时间</span>
              <span class="info-value">${ticket.dateTime}</span>
            </div>
            <div class="info-item">
              <span class="info-label">地点</span>
              <span class="info-value">${ticket.location}</span>
            </div>
          </div>

          <div class="violation-section">
            <div class="violation-header">
              <span class="violation-emoji">${ticket.violation.emoji}</span>
              <span class="violation-title">违规行为</span>
            </div>
            <div class="violation-name">${ticket.violation.name}</div>
          </div>

          <div class="officer-section">
            <div class="officer-info">
              <span class="officer-emoji">${ticket.officer.emoji}</span>
              <div class="officer-details">
                <div class="officer-name">${ticket.officer.nameCn}</div>
                <div class="officer-name-en">${ticket.officer.name}</div>
              </div>
              <div class="officer-badge">${ticket.officer.badge}</div>
            </div>
          </div>

          <div class="note-section">
            <div class="note-text">
              ${ticket.note}${ticket.noteNumber}
            </div>
          </div>

          <div class="fine-section">
            <div class="fine-label">罚款金额</div>
            <div class="fine-amount">$${ticket.fine}</div>
          </div>
        </div>

        <div class="ticket-footer">
          <div class="footer-warning">
            ⚠️ 请在30天内到 ZPD 总部或在线缴纳罚款
          </div>
          <div class="footer-stamp">
            <div class="stamp-inner">
              <div class="stamp-icon">🐰</div>
              <div class="stamp-text">ZPD APPROVED</div>
            </div>
          </div>
        </div>

        <div class="ticket-actions">
          <button class="action-btn action-print" onclick="window.print()">
            🖨️ 打印罚单
          </button>
          <button class="action-btn action-pay" onclick="alert('在动物城，我们用胡萝卜币支付！🥕')">
            💳 立即支付
          </button>
          <button class="action-btn action-contest" onclick="alert('你可以向市长办公室申诉，但成功率只有 0.01%！')">
            ⚖️ 申诉
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // 动画
    setTimeout(() => {
      modal.querySelector('.ticket-paper').style.animation = 'ticketSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }, 10);

    // 播放音效
    playTicketSound();
  }

  // 播放罚单音效（模拟）
  function playTicketSound() {
    console.log('🚨 ZPD 警笛声：威武威武！');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#zpd-ticket-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'zpd-ticket-styles';
    styles.textContent = `
      /* 罚单生成器触发器 */
      .zpd-ticket-generator {
        position: fixed;
        bottom: 240px;
        left: 30px;
        z-index: 9995;
      }

      .ticket-trigger {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 18px;
        background: linear-gradient(135deg, #0984E3, #6C5CE7);
        border: none;
        border-radius: 20px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(9, 132, 227, 0.4);
        transition: all 0.3s ease;
      }

      .ticket-trigger:hover {
        transform: scale(1.05) rotate(-2deg);
        box-shadow: 0 6px 20px rgba(9, 132, 227, 0.5);
      }

      .trigger-icon {
        font-size: 20px;
      }

      /* 罚单弹窗 */
      .zpd-ticket-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10005;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: modalFadeIn 0.3s ease;
      }

      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
      }

      .ticket-paper {
        position: relative;
        width: 90%;
        max-width: 500px;
        background: linear-gradient(135deg, #FEF9E7, #FFF8DC);
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        padding: 30px;
        max-height: 90vh;
        overflow-y: auto;
        animation: ticketSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes ticketSlideIn {
        0% {
          opacity: 0;
          transform: scale(0.5) rotate(-10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      .ticket-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(0, 0, 0, 0.1);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #2D3436;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ticket-close:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: rotate(90deg);
      }

      /* 罚单头部 */
      .ticket-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
      }

      .zpd-logo {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .zpd-badge {
        font-size: 36px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }

      .zpd-text {
        display: flex;
        flex-direction: column;
      }

      .zpd-title {
        font-size: 24px;
        font-weight: bold;
        color: #0984E3;
        line-height: 1;
      }

      .zpd-subtitle {
        font-size: 10px;
        color: #636E72;
        letter-spacing: 1px;
      }

      .ticket-type {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 15px;
        background: rgba(9, 132, 227, 0.1);
        border-radius: 20px;
      }

      .type-emoji {
        font-size: 20px;
      }

      .type-text {
        font-size: 12px;
        font-weight: bold;
        color: #0984E3;
      }

      .ticket-divider {
        height: 3px;
        background: repeating-linear-gradient(
          90deg,
          #0984E3 0px,
          #0984E3 10px,
          transparent 10px,
          transparent 20px
        );
        margin-bottom: 20px;
      }

      /* 罚单主体 */
      .ticket-body {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .ticket-number {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: rgba(9, 132, 227, 0.1);
        border-radius: 8px;
        font-family: 'Courier New', monospace;
      }

      .number-label {
        color: #636E72;
        font-size: 12px;
      }

      .number-value {
        color: #0984E3;
        font-weight: bold;
      }

      .ticket-info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        padding: 10px;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 8px;
      }

      .info-label {
        font-size: 11px;
        color: #636E72;
        margin-bottom: 3px;
      }

      .info-value {
        font-size: 13px;
        color: #2D3436;
        font-weight: 500;
      }

      .violation-section {
        padding: 15px;
        background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 107, 107, 0.05));
        border-radius: 10px;
        border-left: 4px solid #FF6B6B;
      }

      .violation-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }

      .violation-emoji {
        font-size: 24px;
      }

      .violation-title {
        font-size: 14px;
        font-weight: bold;
        color: #FF6B6B;
      }

      .violation-name {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
      }

      .officer-section {
        padding: 15px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .officer-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .officer-emoji {
        font-size: 40px;
      }

      .officer-details {
        flex: 1;
      }

      .officer-name {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 2px;
      }

      .officer-name-en {
        font-size: 11px;
        color: #636E72;
      }

      .officer-badge {
        padding: 5px 10px;
        background: #0984E3;
        color: white;
        border-radius: 15px;
        font-size: 11px;
        font-family: 'Courier New', monospace;
      }

      .note-section {
        padding: 12px;
        background: rgba(255, 253, 208, 0.5);
        border-radius: 8px;
        border: 1px dashed #FDCB6E;
      }

      .note-text {
        font-size: 12px;
        color: #2D3436;
        line-height: 1.6;
        font-style: italic;
      }

      .fine-section {
        text-align: center;
        padding: 20px;
        background: linear-gradient(135deg, #FF6B6B, #EE5A5A);
        border-radius: 10px;
        color: white;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
      }

      .fine-label {
        font-size: 12px;
        opacity: 0.9;
        margin-bottom: 5px;
      }

      .fine-amount {
        font-size: 36px;
        font-weight: bold;
      }

      /* 罚单底部 */
      .ticket-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 2px dashed rgba(0, 0, 0, 0.1);
      }

      .footer-warning {
        font-size: 11px;
        color: #636E72;
      }

      .footer-stamp {
        position: relative;
      }

      .stamp-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 10px 20px;
        border: 3px solid #0984E3;
        border-radius: 10px;
        transform: rotate(-5deg);
        background: rgba(9, 132, 227, 0.1);
      }

      .stamp-icon {
        font-size: 24px;
      }

      .stamp-text {
        font-size: 10px;
        font-weight: bold;
        color: #0984E3;
        letter-spacing: 1px;
      }

      /* 操作按钮 */
      .ticket-actions {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 20px;
      }

      .action-btn {
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .action-print {
        background: #636E72;
        color: white;
      }

      .action-print:hover {
        background: #2D3436;
      }

      .action-pay {
        background: #00B894;
        color: white;
      }

      .action-pay:hover {
        background: #00A884;
      }

      .action-contest {
        background: #FDCB6E;
        color: #2D3436;
      }

      .action-contest:hover {
        background: #F4B940;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .ticket-paper {
          width: 95%;
          padding: 20px;
        }

        .ticket-actions {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化罚单生成器
  function initTicketGenerator() {
    injectStyles();

    const generator = createTicketGenerator();
    document.body.appendChild(generator);

    // 点击生成罚单
    generator.querySelector('.ticket-trigger').onclick = () => {
      const ticket = generateRandomTicket();
      showTicket(ticket);
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTicketGenerator);
  } else {
    initTicketGenerator();
  }
})();
