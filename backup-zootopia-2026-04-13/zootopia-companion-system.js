/**
 * 疯狂动物城主题 - 伙伴系统
 * Zootopia Theme - Companion System
 * | 陪伴用户的动物伙伴
 */

(function() {
  'use strict';

  // 伙伴数据
  const companions = {
    judy: {
      id: 'judy',
      name: '朱迪',
      emoji: '🐰',
      personality: '乐观、勇敢、坚持不懈',
      quotes: [
        'Try Everything!试试一切！',
        '我们要改变世界！',
        '永不放弃！',
        '相信你自己！',
        '每个动物都有无限可能！',
        '让我们一起去冒险！',
        '今天又是美好的一天！',
        '我可以做到！'
      ],
      animations: ['bounce', 'wave', 'spin', 'jump'],
      unlockLevel: 1,
      rarity: 'common'
    },
    nick: {
      id: 'nick',
      name: '尼克',
      emoji: '🦊',
      personality: '聪明、机智、有点狡猾但心地善良',
      quotes: [
        '这可是个聪明的计划...',
        '放松点，兔子。',
        '你知道你爱我的聪明。',
        '我可以搞定任何事。',
        '生活就是要懂得享受。',
        '我们是最好的搭档。',
        '让我想想...算了。',
        '聪明是我的天性。'
      ],
      animations: ['sly', 'shrug', 'wink', 'stretch'],
      unlockLevel: 3,
      rarity: 'common'
    },
    flash: {
      id: 'flash',
      name: '闪电',
      emoji: '🐢',
      personality: '缓慢但可靠，非常认真',
      quotes: [
        '你...好...',
        '我...现...在...就...处...理...',
        '请...稍...等...',
        '不...要...着...急...',
        '我...很...快...的...',
        '谢...谢...等...待...',
        '马...上...好...',
        '再...见...'
      ],
      animations: ['slow_wave', 'slow_blink', 'slow_turn'],
      unlockLevel: 5,
      rarity: 'rare'
    },
    finnick: {
      id: 'finnick',
      name: '芬尼克',
      emoji: '🦊',
      personality: '暴躁但忠诚',
      quotes: [
        '别烦我！',
        '我在工作！',
        '你想干嘛？',
        '哼！',
        '快点！',
        '我很忙！'
      ],
      animations: ['angry_look', 'stomp', 'cross_arms'],
      unlockLevel: 7,
      rarity: 'rare'
    },
    bogo: {
      id: 'bogo',
      name: '博戈局长',
      emoji: '🦁',
      personality: '严肃、威严、重视效率',
      quotes: [
        '效率！',
        '这是你的任务。',
        '做得不错。',
        '继续努力。',
        '我要求效率！',
        '不要让我失望。'
      ],
      animations: ['authoritative_look', 'nod', 'cross_arms'],
      unlockLevel: 10,
      rarity: 'epic'
    }
  };

  // 伙伴状态
  let companionState = {
    active: null,
    unlocked: ['judy'],
    affinity: {},
    lastInteraction: null,
    interactionCount: 0
  };

  // 加载伙伴数据
  function loadCompanionData() {
    const saved = localStorage.getItem('zootopiaCompanion');
    if (saved) {
      companionState = JSON.parse(saved);
    }
  }

  // 保存伙伴数据
  function saveCompanionData() {
    localStorage.setItem('zootopiaCompanion', JSON.stringify(companionState));
  }

  // 创建伙伴
  function createCompanion() {
    const companion = document.createElement('div');
    companion.className = 'zootopia-companion';
    companion.innerHTML = `
      <div class="companion-bubble" id="companionBubble">
        <div class="bubble-text" id="bubbleText"></div>
        <div class="bubble-tail"></div>
      </div>
      <div class="companion-character" id="companionCharacter">
        <div class="character-shadow"></div>
        <div class="character-body">
          <div class="character-emoji" id="characterEmoji">🐰</div>
        </div>
      </div>
      <div class="companion-menu" id="companionMenu">
        <button class="menu-btn talk-btn" title="对话">💬</button>
        <button class="menu-btn pet-btn" title="抚摸">🤚</button>
        <button class="menu-btn switch-btn" title="切换">🔄</button>
        <button class="menu-btn settings-btn" title="设置">⚙️</button>
      </div>
      <div class="companion-settings" id="companionSettings"></div>
    `;

    return companion;
  }

  // 更新伙伴外观
  function updateCompanionAppearance() {
    if (!companionState.active) {
      companionState.active = companionState.unlocked[0];
    }

    const companion = companions[companionState.active];
    if (!companion) return;

    const emoji = document.getElementById('characterEmoji');
    if (emoji) {
      emoji.textContent = companion.emoji;
    }

    playAnimation('enter');
  }

  // 播放动画
  function playAnimation(animationName) {
    const character = document.getElementById('companionCharacter');
    if (!character) return;

    // 移除旧动画
    character.classList.remove('animating', 'bounce', 'wave', 'spin', 'jump', 'sly', 'shrug', 'wink', 'stretch', 'slow_wave', 'slow_blink', 'slow_turn', 'angry_look', 'stomp', 'cross_arms', 'authoritative_look', 'nod');

    // 添加新动画
    setTimeout(() => {
      character.classList.add('animating', animationName);
    }, 10);

    // 动画结束后移除类
    setTimeout(() => {
      character.classList.remove('animating', animationName);
    }, 2000);
  }

  // 显示对话气泡
  function showMessage(message, duration = 3000) {
    const bubble = document.getElementById('companionBubble');
    const text = document.getElementById('bubbleText');

    if (!bubble || !text) return;

    text.textContent = message;
    bubble.classList.add('active');

    setTimeout(() => {
      bubble.classList.remove('active');
    }, duration);
  }

  // 对话
  function talk() {
    if (!companionState.active) return;

    const companion = companions[companionState.active];
    const quote = companion.quotes[Math.floor(Math.random() * companion.quotes.length)];

    showMessage(quote);

    // 增加好感度
    increaseAffinity(companionState.active, 1);

    // 播放随机动画
    const animation = companion.animations[Math.floor(Math.random() * companion.animations.length)];
    playAnimation(animation);

    // 更新交互计数
    companionState.interactionCount++;
    companionState.lastInteraction = Date.now();
    saveCompanionData();
  }

  // 抚摸
  function pet() {
    if (!companionState.active) return;

    const companion = companions[companionState.active];
    const responses = [
      '好舒服~',
      '再摸摸~',
          '我喜欢！',
      '嘿嘿~',
      '太好了！'
    ];

    showMessage(responses[Math.floor(Math.random() * responses.length)]);

    playAnimation('bounce');

    // 增加好感度
    increaseAffinity(companionState.active, 2);

    // 显示爱心效果
    showHeartEffect();
  }

  // 显示爱心效果
  function showHeartEffect() {
    const character = document.getElementById('companionCharacter');
    if (!character) return;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-effect';
        heart.textContent = '❤️';
        heart.style.cssText = `
          position: absolute;
          font-size: 20px;
          left: ${Math.random() * 60 + 20}px;
          top: 0;
          animation: heartFloat 1s ease forwards;
          pointer-events: none;
        `;
        character.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
      }, i * 200);
    }
  }

  // 增加好感度
  function increaseAffinity(companionId, amount) {
    if (!companionState.affinity[companionId]) {
      companionState.affinity[companionId] = 0;
    }

    companionState.affinity[companionId] += amount;

    // 检查好感度里程碑
    checkAffinityMilestones(companionId);

    saveCompanionData();
  }

  // 检查好感度里程碑
  function checkAffinityMilestones(companionId) {
    const affinity = companionState.affinity[companionId] || 0;
    const milestones = [10, 25, 50, 100, 200];

    milestones.forEach(milestone => {
      if (affinity === milestone) {
        window.dispatchEvent(new CustomEvent('zootopiaAchievement', {
          detail: {
            name: `${companions[companionId].name}的好感达到${milestone}！`,
            xp: milestone * 2,
            reward: '❤️'
          }
        }));
      }
    });
  }

  // 切换伙伴
  function switchCompanion() {
    const availableCompanions = companionState.unlocked;

    if (availableCompanions.length <= 1) {
      showMessage('你还没有解锁其他伙伴哦~');
      return;
    }

    const currentIndex = availableCompanions.indexOf(companionState.active);
    const nextIndex = (currentIndex + 1) % availableCompanions.length;
    companionState.active = availableCompanions[nextIndex];

    saveCompanionData();
    updateCompanionAppearance();

    const companion = companions[companionState.active];
    showMessage(`我是${companion.name}！很高兴见到你！`);
  }

  // 创建设置面板
  function createSettingsPanel() {
    const settings = document.getElementById('companionSettings');
    if (!settings) return;

    settings.innerHTML = `
      <div class="settings-backdrop"></div>
      <div class="settings-content">
        <div class="settings-header">
          <div class="settings-title">伙伴设置</div>
          <button class="settings-close">×</button>
        </div>

        <div class="settings-section">
          <div class="section-title">选择伙伴</div>
          <div class="companion-list">
            ${Object.entries(companions).map(([id, companion]) => {
              const unlocked = companionState.unlocked.includes(id);
              const affinity = companionState.affinity[id] || 0;
              return `
                <div class="companion-option ${unlocked ? 'unlocked' : 'locked'} ${companionState.active === id ? 'active' : ''}" data-companion="${id}">
                  <div class="option-emoji">${companion.emoji}</div>
                  <div class="option-info">
                    <div class="option-name">${companion.name}</div>
                    <div class="option-rarity ${companion.rarity}">${companion.rarity}</div>
                    ${unlocked ? `
                      <div class="option-affinity">❤️ ${affinity}</div>
                    ` : `
                      <div class="option-locked">🔒 ${companion.unlockLevel}级解锁</div>
                    `}
                  </div>
                  ${unlocked ? `<button class="option-select">选择</button>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="settings-section">
          <div class="section-title">位置设置</div>
          <div class="position-options">
            <button class="position-btn ${companionState.position === 'bottom-left' ? 'active' : ''}" data-position="bottom-left">左下角</button>
            <button class="position-btn ${companionState.position === 'bottom-right' ? 'active' : ''}" data-position="bottom-right">右下角</button>
            <button class="position-btn ${companionState.position === 'float' ? 'active' : ''}" data-position="float">跟随鼠标</button>
          </div>
        </div>
      </div>
    `;

    // 关闭按钮
    settings.querySelector('.settings-close').onclick = () => {
      settings.innerHTML = '';
      settings.classList.remove('active');
    };

    // 伙伴选择
    settings.querySelectorAll('.option-select').forEach(btn => {
      btn.onclick = () => {
        const option = btn.closest('.companion-option');
        const id = option.dataset.companion;
        companionState.active = id;
        saveCompanionData();
        updateCompanionAppearance();
        settings.innerHTML = '';
        settings.classList.remove('active');
      };
    });

    // 位置设置
    settings.querySelectorAll('.position-btn').forEach(btn => {
      btn.onclick = () => {
        settings.querySelectorAll('.position-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        companionState.position = btn.dataset.position;
        saveCompanionData();
        updateCompanionPosition();
      };
    });
  }

  // 更新伙伴位置
  function updateCompanionPosition() {
    const companion = document.querySelector('.zootopia-companion');
    if (!companion) return;

    companion.classList.remove('bottom-left', 'bottom-right', 'float');
    if (companionState.position) {
      companion.classList.add(companionState.position);
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#companion-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'companion-styles';
    styles.textContent = `
      /* 伙伴容器 */
      .zootopia-companion {
        position: fixed;
        bottom: 100px;
        left: 100px;
        z-index: 9998;
        transition: all 0.3s ease;
      }

      .zootopia-companion.bottom-left {
        bottom: 100px;
        left: 100px;
        right: auto;
      }

      .zootopia-companion.bottom-right {
        bottom: 100px;
        right: 100px;
        left: auto;
      }

      .zootopia-companion.float {
        transition: none;
      }

      /* 对话气泡 */
      .companion-bubble {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        border-radius: 20px;
        padding: 15px 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        margin-bottom: 15px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        min-width: 150px;
        max-width: 250px;
      }

      .companion-bubble.active {
        opacity: 1;
        visibility: visible;
      }

      .bubble-text {
        font-size: 14px;
        color: #2D3436;
        text-align: center;
        line-height: 1.5;
      }

      .bubble-tail {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid white;
      }

      /* 伙伴角色 */
      .companion-character {
        position: relative;
        width: 80px;
        height: 80px;
        cursor: pointer;
      }

      .character-shadow {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 10px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }

      .character-body {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .character-emoji {
        font-size: 60px;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
        transition: transform 0.3s ease;
      }

      .companion-character:hover .character-emoji {
        transform: scale(1.1);
      }

      /* 动画 */
      .companion-character.animating .character-emoji {
        animation-duration: 1s;
        animation-iteration-count: 1;
      }

      .companion-character.animating.bounce .character-emoji {
        animation: bounce 0.5s ease;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }

      .companion-character.animating.wave .character-emoji {
        animation: wave 0.5s ease;
      }

      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-20deg); }
        75% { transform: rotate(20deg); }
      }

      .companion-character.animating.spin .character-emoji {
        animation: spin 0.5s ease;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* 菜单 */
      .companion-menu {
        position: absolute;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .companion-character:hover .companion-menu {
        opacity: 1;
        visibility: visible;
      }

      .menu-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }

      .menu-btn:hover {
        transform: scale(1.2);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      /* 爱心效果 */
      @keyframes heartFloat {
        0% {
          opacity: 1;
          transform: translateY(0) scale(0);
        }
        50% {
          opacity: 1;
          transform: translateY(-30px) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-60px) scale(0.5);
        }
      }

      /* 设置面板 */
      .companion-settings {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: none;
      }

      .companion-settings.active {
        display: block;
      }

      .settings-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
      }

      .settings-content {
        position: relative;
        width: 90vw;
        max-width: 500px;
        max-height: 80vh;
        margin: 10vh auto;
        background: white;
        border-radius: 20px;
        overflow: hidden;
      }

      .settings-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .settings-title {
        flex: 1;
        font-size: 20px;
        font-weight: bold;
      }

      .settings-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      .settings-section {
        padding: 20px;
        border-bottom: 1px solid #ECF0F1;
      }

      .section-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #2D3436;
      }

      /* 伙伴列表 */
      .companion-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .companion-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #F8F9FA;
        border-radius: 15px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .companion-option.unlocked:hover {
        border-color: #9B59B6;
      }

      .companion-option.active {
        border-color: #9B59B6;
        background: rgba(155, 89, 182, 0.1);
      }

      .companion-option.locked {
        opacity: 0.6;
      }

      .option-emoji {
        font-size: 36px;
      }

      .option-info {
        flex: 1;
      }

      .option-name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .option-rarity {
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }

      .option-rarity.common { color: #95A5A6; }
      .option-rarity.rare { color: #3498DB; }
      .option-rarity.epic { color: #9B59B6; }
      .option-rarity.legendary { color: #F39C12; }

      .option-affinity {
        font-size: 12px;
        color: #E74C3C;
        margin-top: 5px;
      }

      .option-locked {
        font-size: 12px;
        color: #636E72;
        margin-top: 5px;
      }

      .option-select {
        padding: 8px 16px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
        border: none;
        border-radius: 15px;
        font-weight: bold;
        cursor: pointer;
      }

      /* 位置选项 */
      .position-options {
        display: flex;
        gap: 10px;
      }

      .position-btn {
        flex: 1;
        padding: 12px;
        background: #ECF0F1;
        border: 2px solid transparent;
        border-radius: 10px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .position-btn:hover {
        background: #D5DBDB;
      }

      .position-btn.active {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border-color: #8E44AD;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-companion {
          bottom: 150px;
          left: 50px;
        }

        .zootopia-companion.bottom-left {
          bottom: 150px;
          left: 20px;
        }

        .zootopia-companion.bottom-right {
          bottom: 150px;
          right: 20px;
        }

        .companion-character {
          width: 60px;
          height: 60px;
        }

        .character-emoji {
          font-size: 45px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化伙伴系统
  function initCompanion() {
    loadCompanionData();
    injectStyles();

    const companion = createCompanion();
    document.body.appendChild(companion);

    updateCompanionAppearance();
    updateCompanionPosition();

    // 菜单按钮
    document.querySelector('.talk-btn').onclick = talk;
    document.querySelector('.pet-btn').onclick = pet;
    document.querySelector('.switch-btn').onclick = switchCompanion;
    document.querySelector('.settings-btn').onclick = createSettingsPanel;

    // 角色点击
    document.getElementById('companionCharacter').onclick = () => {
      talk();
    };

    // 跟随鼠标
    if (companionState.position === 'float') {
      document.addEventListener('mousemove', (e) => {
        companion.style.left = `${e.clientX + 20}px`;
        companion.style.top = `${e.clientY + 20}px`;
      });
    }

    // 自动问候
    setTimeout(() => {
      const companion = companions[companionState.active];
      showMessage(`你好！我是${companion.name}！`);
    }, 2000);

    // 定期互动
    setInterval(() => {
      if (Math.random() < 0.3) {
        const companion = companions[companionState.active];
        const quote = companion.quotes[Math.floor(Math.random() * companion.quotes.length)];
        showMessage(quote, 4000);
      }
    }, 60000);
  }

  // 导出全局函数
  window.zootopiaCompanion = {
    talk: talk,
    pet: pet,
    switch: switchCompanion,
    getActive: () => companionState.active,
    getAffinity: (id) => companionState.affinity[id] || 0
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompanion);
  } else {
    initCompanion();
  }
})();
