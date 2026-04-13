/**
 * 疯狂动物城主题 - 本杰明豹警官粉丝系统
 * Zootopia Theme - Benjamin Clawhauser Fan System
 * | ZPD前台接待员 Gazelle粉丝俱乐部
 */

(function() {
  'use strict';

  // 本杰明·克劳豪斯数据
  const clawhauserData = {
    character: {
      name: 'Benjamin Clawhauser',
      chineseName: '本杰明·克劳豪斯',
      nickname: '豹警官 / 本杰明 / 爪豪瑟',
      species: '猎豹 (Cheetah)',
      emoji: '🐆',
      role: 'ZPD前台接待员 / 调度员',
      voiceActor: 'Jake Johnson (英文)',
      badge: 'ZPD前台',
      personality: ['热情', '友好', '健谈', '甜美', '专业但不拘谨', '乐观'],
      appearance: {
        spots: '黑色斑点',
        build: '略显丰满',
        uniform: 'ZPD制服',
        accessories: '耳机'
      },
      quote: '"You\'re gonna be great!"',
      quoteChinese: '"你会很棒的！"',
      description: '动物城警察局(ZPD)的前台接待员，以热情友好的态度迎接每一位来访者。虽然体型略显丰满，但充满活力。'
    },

    // 最爱的两件事
    loves: [
      {
        item: 'Gazelle (夏奇羊)',
        emoji: '🦌',
        description: '动物城的超级巨星',
        fandom: '超级粉丝',
        activities: ['听她的歌', '看她的MV', '收藏周边', '参加演唱会']
      },
      {
        item: '甜甜圈',
        emoji: '🍩',
        description: '永远不嫌多的甜食',
        favorites: ['草莓味', '巧克力味', '糖霜甜甜圈', '彩虹糖甜甜圈'],
        daily: '每天至少3个'
      }
    ],

    // 工作职责
    duties: [
      { task: '前台接待', description: '欢迎来访的市民和警官' },
      { task: '调度协调', description: '管理无线电通讯' },
      { task: '信息登记', description: '记录报案和案件信息' },
      { task: '咖啡服务', description: '为同事提供咖啡' },
      { task: '文件管理', description: '整理和分发文件' }
    ],

    // Gazelle 粉丝行为
    gazelleFandom: {
      level: '超级粉丝',
      collection: [
        { item: 'Gazelle 全套专辑', owned: true },
        { item: '演唱会门票', count: '50+' },
        { item: '签名海报', owned: true },
        { item: '周边手办', count: '100+' },
        { item: '同款服装', owned: true }
      ],
      favoriteSongs: [
        'Try Everything',
        'Zoo',
        '所有Gazelle的歌曲'
      ],
      concertMemories: [
        '第一次听Try Everything当场流泪',
        '在演唱会前排被Gazelle点名',
        '收集了所有版本的专辑'
      ],
      dance: '会跳Gazelle的所有舞步'
    },

    // 与其他角色的关系
    relationships: [
      { character: '朱迪·霍普斯', relation: '同事好友', dynamic: '本杰明是朱迪最热情的支持者之一' },
      { character: '尼克·王尔德', relation: '同事', dynamic: '一开始对尼克有戒心，后来成为朋友' },
      { character: '博戈局长', relation: '上司下属', dynamic: '努力保持专业，但经常被打断' },
      { character: 'Gazelle', relation: '偶像粉丝', dynamic: '终极粉丝，梦想见面' },
      { character: '牛局长', relation: '同事', dynamic: '轻松的工作伙伴' }
    ],

    // 经典时刻
    classicMoments: [
      {
        scene: 'Gazelle电话',
        description: '当Gazelle打电话来时，本杰明激动得说不出话',
        quote: '"Is that... is that Gazelle?!"',
        humor: '超级粉丝的完全失控'
      },
      {
        scene: '甜甜圈时间',
        description: '总是能在适当的时候享用甜甜圈',
        detail: '桌上永远有甜甜圈'
      },
      {
        scene: '朱迪报到',
        description: '热情欢迎新警官朱迪',
        quote: '"You\'re gonna be great!"',
        significance: '展现了他友善的本性'
      },
      {
        scene: '跳舞',
        description: '跟着Gazelle的音乐跳舞',
        detail: '在办公桌前即兴表演'
      }
    ],

    // 趣味事实
    funFacts: [
      '🐆 猎豹是陆地上最快的动物，但本杰明更喜欢坐着',
      '🎧 总是戴着耳机听Gazelle的歌',
      '🍩 桌上的甜甜圈永远吃不完',
      '💻 对ZPD的通讯系统了如指掌',
      '🕺 会跳Gazelle的所有舞蹈',
      '😊 是ZPD最快乐的员工',
      '📺 工作时也在看Gazelle的MV',
      '🎵 能准确唱出Gazelle的所有歌词',
      '👔 虽然穿制服，但总是显得很随意',
      '⚡ 紧急情况下反应很快'
    ],

    // 粉丝互动活动
    fanActivities: [
      {
        name: 'Gazelle 歌词挑战',
        description: '测试你对Gazelle歌曲的了解程度',
        type: 'quiz'
      },
      {
        name: '甜甜圈品鉴',
        description: '评选今日最佳甜甜圈',
        type: 'vote'
      },
      {
        name: '舞蹈模仿',
        description: '学习本杰明的舞步',
        type: 'game'
      },
      {
        name: '粉丝留言板',
        description: '分享你与本杰明的互动时刻',
        type: 'community'
      }
    ],

    // Gazelle 歌词库
    gazelleLyrics: [
      { song: 'Try Everything', line: 'I won\'t give up, no I won\'t give in' },
      { song: 'Try Everything', line: 'I wanna try even though I could fail' },
      { song: 'Zoo', line: 'Coming to the zoo, coming to the zoo' },
      { song: 'Try Everything', line: 'Make my mistake, make them my friends' }
    ]
  };

  // 创建粉丝系统面板
  function createFanPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-clawhauser-fan';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="fan-toggle" id="fanToggle">
        <span class="toggle-icon">🐆</span>
        <span class="toggle-text">豹警官粉丝</span>
      </div>

      <!-- 主面板 -->
      <div class="fan-panel" id="fanPanel" style="display: none;">
        <div class="panel-header">
          <div class="header-content">
            <span class="character-emoji">${clawhauserData.character.emoji}</span>
            <div class="header-text">
              <h2 class="character-name">${clawhauserData.character.chineseName}</h2>
              <p class="character-role">${clawhauserData.character.role}</p>
            </div>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 角色介绍卡片 -->
        <div class="intro-card">
          <div class="intro-quote">
            <p class="quote-text">"${clawhauserData.character.quoteChinese}"</p>
            <p class="quote-original">${clawhauserData.character.quote}</p>
          </div>
          <p class="intro-description">${clawhauserData.character.description}</p>
          <div class="intro-personality">
            ${clawhauserData.character.personality.map(p => `<span class="personality-tag">${p}</span>`).join('')}
          </div>
        </div>

        <!-- 最爱的两件事 -->
        <div class="loves-section">
          <h3 class="section-title">💕 最爱的两件事</h3>
          <div class="loves-grid">
            ${clawhauserData.loves.map(love => `
              <div class="love-card">
                <span class="love-emoji">${love.emoji}</span>
                <div class="love-info">
                  <h4 class="love-name">${love.item}</h4>
                  <p class="love-desc">${love.description}</p>
                  ${love.fandom ? `<p class="love-fandom">${love.fandom}</p>` : ''}
                  ${love.activities ? `
                  <div class="love-activities">
                    ${love.activities.map(a => `<span class="activity-tag">${a}</span>`).join('')}
                  </div>
                  ` : ''}
                  ${love.favorites ? `
                  <div class="love-favorites">
                    <p>口味:</p>
                    ${love.favorites.map(f => `<span class="favorite-tag">${f}</span>`).join('')}
                  </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 内容标签 -->
        <div class="content-tabs">
          <button class="tab-btn active" data-tab="fandom">Gazelle粉丝</button>
          <button class="tab-btn" data-tab="duties">工作职责</button>
          <button class="tab-btn" data-tab="moments">经典时刻</button>
          <button class="tab-btn" data-tab="activities">粉丝活动</button>
        </div>

        <!-- 内容区域 -->
        <div class="content-area" id="contentArea">
          <!-- Gazelle 粉丝 -->
          <div class="tab-content active" data-content="fandom" id="fandomContent"></div>

          <!-- 工作职责 -->
          <div class="tab-content" data-content="duties" id="dutiesContent"></div>

          <!-- 经典时刻 -->
          <div class="tab-content" data-content="moments" id="momentsContent"></div>

          <!-- 粉丝活动 -->
          <div class="tab-content" data-content="activities" id="activitiesContent"></div>
        </div>
      </div>

      <!-- Gazelle 电话特效 -->
      <div class="gazelle-phone-modal" id="gazellePhoneModal" style="display: none;">
        <div class="modal-content">
          <div class="phone-header">📞 来电</div>
          <div class="phone-caller">🦌 Gazelle</div>
          <div class="phone-message">
            <p>"嘿，本杰明！"</p>
            <p>"谢谢你的支持！"</p>
            <p>"你是最好的粉丝！"</p>
          </div>
          <button class="phone-answer" id="answerPhone">接听 ❤️</button>
        </div>
      </div>
    `;

    return panel;
  }

  // 渲染 Gazelle 粉丝内容
  function renderFandom() {
    const container = document.getElementById('fandomContent');
    if (!container) return;

    const fandom = clawhauserData.gazelleFandom;

    container.innerHTML = `
      <div class="fandom-section">
        <div class="fandom-status">
          <span class="fandom-level">${fandom.level}</span>
          <span class="fandom-emoji">🦌</span>
        </div>

        <div class="collection-section">
          <h3 class="subsection-title">🎵 粉丝收藏</h3>
          <div class="collection-list">
            ${fandom.collection.map(item => `
              <div class="collection-item">
                <span class="item-name">${item.item}</span>
                ${item.owned ? '<span class="owned-badge">✓ 已拥有</span>' : item.count ? `<span class="item-count">${item.count}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="songs-section">
          <h3 class="subsection-title">💃 最爱歌曲</h3>
          <div class="songs-list">
            ${fandom.favoriteSongs.map(song => `
              <div class="song-item">
                <span class="song-emoji">🎵</span>
                <span class="song-name">${song}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="memories-section">
          <h3 class="subsection-title">🌟 演唱会回忆</h3>
          <div class="memories-list">
            ${fandom.concertMemories.map(memory => `
              <div class="memory-item">• ${memory}</div>
            `).join('')}
          </div>
        </div>

        <div class="dance-section">
          <h3 class="subsection-title">💃 舞蹈技能</h3>
          <p class="dance-text">${fandom.dance}</p>
        </div>

        <button class="call-btn" id="callGazelleBtn">
          <span class="btn-emoji">📞</span>
          <span class="btn-text">Gazelle来电！</span>
        </button>
      </div>
    `;

    // 添加来电按钮事件
    document.getElementById('callGazelleBtn')?.addEventListener('click', showGazelleCall);
  }

  // 显示 Gazelle 来电
  function showGazelleCall() {
    const modal = document.getElementById('gazellePhoneModal');
    if (modal) {
      modal.style.display = 'block';
      // 播放铃声（可选）
      // playRingtone();

      setTimeout(() => {
        const answerBtn = document.getElementById('answerPhone');
        if (answerBtn) {
          answerBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            showNotification('🦌 Gazelle: "你是最好的粉丝，本杰明！"');
          });
        }
      }, 3000);
    }
  }

  // 显示通知
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fan-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #E91E63, #9B59B6);
      color: white;
      padding: 15px 20px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  // 渲染工作职责
  function renderDuties() {
    const container = document.getElementById('dutiesContent');
    if (!container) return;

    container.innerHTML = `
      <div class="duties-section">
        <h3 class="section-title">💼 工作职责</h3>
        <div class="duties-list">
          ${clawhauserData.duties.map(duty => `
            <div class="duty-item">
              <span class="duty-icon">📋</span>
              <div class="duty-info">
                <h4 class="duty-name">${duty.task}</h4>
                <p class="duty-desc">${duty.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 渲染经典时刻
  function renderMoments() {
    const container = document.getElementById('momentsContent');
    if (!container) return;

    container.innerHTML = `
      <div class="moments-section">
        <h3 class="section-title">🎬 经典时刻</h3>
        <div class="moments-list">
          ${clawhauserData.classicMoments.map(moment => `
            <div class="moment-card">
              <h4 class="moment-name">${moment.scene}</h4>
              <p class="moment-desc">${moment.description}</p>
              ${moment.quote ? `<p class="moment-quote">"${moment.quote}"</p>` : ''}
              ${moment.humor ? `<p class="moment-humor">😄 ${moment.humor}</p>` : ''}
              ${moment.significance ? `<p class="moment-significance">📌 ${moment.significance}</p>` : ''}
            </div>
          `).join('')}
        </div>

        <div class="fun-facts-section">
          <h3 class="facts-title">💡 趣味事实</h3>
          <div class="facts-grid">
            ${clawhauserData.funFacts.map(fact => `
              <div class="fact-item">${fact}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 渲染粉丝活动
  function renderActivities() {
    const container = document.getElementById('activitiesContent');
    if (!container) return;

    container.innerHTML = `
      <div class="activities-section">
        <h3 class="section-title">🎉 粉丝活动</h3>
        <div class="activities-list">
          ${clawhauserData.fanActivities.map(activity => `
            <div class="activity-card">
              <span class="activity-icon">${getActivityIcon(activity.type)}</span>
              <div class="activity-info">
                <h4 class="activity-name">${activity.name}</h4>
                <p class="activity-desc">${activity.description}</p>
                <span class="activity-type">${getActivityTypeLabel(activity.type)}</span>
              </div>
              <button class="activity-btn" data-activity="${activity.name}">参与</button>
            </div>
          `).join('')}
        </div>

        <div class="lyrics-section">
          <h3 class="lyrics-title">🎵 Gazelle 歌词挑战</h3>
          <div class="lyrics-list">
            ${clawhauserData.gazelleLyrics.map((lyric, index) => `
              <div class="lyric-item">
                <span class="lyric-number">${index + 1}</span>
                <p class="lyric-song">${lyric.song}</p>
                <p class="lyric-line">${lyric.line}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // 添加活动按钮事件
    container.querySelectorAll('.activity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showActivityNotification(btn.dataset.activity);
      });
    });
  }

  // 获取活动图标
  function getActivityIcon(type) {
    const icons = {
      'quiz': '🎯',
      'vote': '🗳️',
      'game': '🎮',
      'community': '💬'
    };
    return icons[type] || '🎉';
  }

  // 获取活动类型标签
  function getActivityTypeLabel(type) {
    const labels = {
      'quiz': '问答挑战',
      'vote': '投票评选',
      'game': '互动游戏',
      'community': '社区交流'
    };
    return labels[type] || '活动';
  }

  // 显示活动通知
  function showActivityNotification(activityName) {
    showNotification(`🎉 ${activityName} 活动开启！`);
  }

  // 切换标签
  function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabName);
    });

    // 渲染对应内容
    switch(tabName) {
      case 'fandom': renderFandom(); break;
      case 'duties': renderDuties(); break;
      case 'moments': renderMoments(); break;
      case 'activities': renderActivities(); break;
    }
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('fanPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#clawhauser-fan-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'clawhauser-fan-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-clawhauser-fan {
        position: fixed;
        bottom: 540px;
        right: 20px;
        z-index: 9991;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .fan-toggle {
        background: linear-gradient(135deg, #E91E63, #9B59B6);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .fan-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(233, 30, 99, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: cheetahBounce 1.5s ease infinite;
      }

      @keyframes cheetahBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .fan-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 85vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        background: linear-gradient(135deg, #E91E63, #9B59B6);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .character-emoji {
        font-size: 32px;
      }

      .character-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 3px 0;
      }

      .character-role {
        font-size: 11px;
        margin: 0;
        opacity: 0.9;
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

      /* 介绍卡片 */
      .intro-card {
        padding: 15px;
        background: linear-gradient(135deg, rgba(233, 30, 99, 0.05), rgba(155, 89, 182, 0.05));
      }

      .intro-quote {
        background: white;
        border-left: 4px solid #E91E63;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 10px;
      }

      .quote-text {
        font-size: 13px;
        font-weight: bold;
        color: #E91E63;
        margin: 0 0 5px 0;
      }

      .quote-original {
        font-size: 11px;
        color: #636E72;
        margin: 0;
        font-style: italic;
      }

      .intro-description {
        font-size: 12px;
        color: #636E72;
        line-height: 1.5;
        margin-bottom: 10px;
      }

      .intro-personality {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .personality-tag {
        padding: 4px 10px;
        background: rgba(233, 30, 99, 0.1);
        border-radius: 15px;
        font-size: 10px;
        color: #E91E63;
        font-weight: bold;
      }

      /* 最爱的两件事 */
      .loves-section {
        padding: 15px;
        border-bottom: 1px solid #ECF0F1;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .loves-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .love-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        text-align: center;
      }

      .love-emoji {
        font-size: 32px;
        display: block;
        margin-bottom: 8px;
      }

      .love-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .love-desc {
        font-size: 10px;
        color: #636E72;
        margin: 0 0 5px 0;
      }

      .love-fandom {
        font-size: 11px;
        color: #E91E63;
        font-weight: bold;
        margin: 5px 0;
      }

      .love-activities,
      .love-favorites {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        justify-content: center;
      }

      .activity-tag,
      .favorite-tag {
        padding: 2px 6px;
        background: rgba(233, 30, 99, 0.1);
        border-radius: 10px;
        font-size: 9px;
        color: #E91E63;
      }

      /* 标签 */
      .content-tabs {
        display: flex;
        padding: 10px;
        gap: 5px;
        border-bottom: 1px solid #ECF0F1;
      }

      .tab-btn {
        flex: 1;
        padding: 8px 6px;
        border: none;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
      }

      .tab-btn:hover {
        background: #ECF0F1;
      }

      .tab-btn.active {
        background: linear-gradient(135deg, #E91E63, #9B59B6);
        color: white;
      }

      /* 内容区域 */
      .content-area {
        padding: 15px;
        overflow-y: auto;
        max-height: 450px;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      /* 粉丝内容 */
      .fandom-section {
        text-align: center;
      }

      .fandom-status {
        background: linear-gradient(135deg, #E91E63, #9B59B6);
        color: white;
        padding: 15px;
        border-radius: 15px;
        margin-bottom: 15px;
      }

      .fandom-level {
        font-size: 16px;
        font-weight: bold;
      }

      .fandom-emoji {
        font-size: 32px;
      }

      .collection-section,
      .songs-section,
      .memories-section,
      .dance-section {
        margin-bottom: 15px;
        text-align: left;
      }

      .subsection-title {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .collection-list,
      .songs-list,
      .memories-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .collection-item,
      .song-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #F8F9FA;
        border-radius: 8px;
      }

      .item-name {
        flex: 1;
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
      }

      .owned-badge {
        padding: 3px 8px;
        background: #27AE60;
        color: white;
        border-radius: 10px;
        font-size: 10px;
      }

      .item-count {
        padding: 3px 8px;
        background: #E91E63;
        color: white;
        border-radius: 10px;
        font-size: 10px;
      }

      .song-emoji {
        font-size: 20px;
      }

      .song-name {
        font-size: 12px;
        color: #2D3436;
      }

      .memory-item {
        font-size: 11px;
        color: #636E72;
        line-height: 1.6;
      }

      .dance-text {
        font-size: 13px;
        color: #E91E63;
        font-weight: bold;
        margin: 0;
      }

      .call-btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 15px;
        background: linear-gradient(135deg, #E91E63, #9B59B6);
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .call-btn:hover {
        transform: scale(1.02);
      }

      /* 工作职责 */
      .duties-section {
        text-align: center;
      }

      .duties-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .duty-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #F8F9FA;
        border-radius: 10px;
        text-align: left;
      }

      .duty-icon {
        font-size: 24px;
      }

      .duty-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 3px 0;
      }

      .duty-desc {
        font-size: 11px;
        color: #636E72;
        margin: 0;
      }

      /* 经典时刻 */
      .moments-section {
        text-align: center;
      }

      .moments-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .moment-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        text-align: left;
      }

      .moment-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 8px 0;
      }

      .moment-desc {
        font-size: 12px;
        color: #636E72;
        margin: 0 0 8px 0;
      }

      .moment-quote {
        font-size: 11px;
        color: #E91E63;
        font-style: italic;
        background: rgba(233, 30, 99, 0.05);
        padding: 8px;
        border-radius: 6px;
        margin: 8px 0;
      }

      .moment-humor {
        font-size: 11px;
        color: #27AE60;
        margin: 5px 0;
      }

      .moment-significance {
        font-size: 10px;
        color: #636E72;
        margin: 5px 0;
      }

      .fun-facts-section {
        background: rgba(243, 156, 18, 0.05);
        border-radius: 12px;
        padding: 15px;
      }

      .facts-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .facts-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }

      .fact-item {
        padding: 8px;
        background: white;
        border-radius: 8px;
        font-size: 11px;
        color: #636E72;
      }

      /* 粉丝活动 */
      .activities-section {
        text-align: center;
      }

      .activities-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .activity-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
      }

      .activity-icon {
        font-size: 28px;
      }

      .activity-info {
        flex: 1;
        text-align: left;
      }

      .activity-name {
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .activity-desc {
        font-size: 11px;
        color: #636E72;
        margin: 0 0 5px 0;
      }

      .activity-type {
        padding: 3px 8px;
        background: #E91E63;
        color: white;
        border-radius: 10px;
        font-size: 9px;
      }

      .activity-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 20px;
        background: linear-gradient(135deg, #E91E63, #9B59B6);
        color: white;
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .activity-btn:hover {
        transform: scale(1.05);
      }

      /* 歌词 */
      .lyrics-section {
        background: rgba(233, 30, 99, 0.05);
        border-radius: 12px;
        padding: 15px;
      }

      .lyrics-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 12px 0;
      }

      .lyrics-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .lyric-item {
        display: flex;
        gap: 10px;
        padding: 10px;
        background: white;
        border-radius: 8px;
      }

      .lyric-number {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #E91E63;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
      }

      .lyric-song {
        font-size: 11px;
        color: #E91E63;
        font-weight: bold;
        margin: 0 0 3px 0;
      }

      .lyric-line {
        font-size: 12px;
        color: #2D3436;
        font-style: italic;
        margin: 0;
      }

      /* Gazelle 电话模态框 */
      .gazelle-phone-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
      }

      .modal-content {
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        width: 280px;
        animation: phoneRing 0.5s ease infinite;
      }

      @keyframes phoneRing {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
      }

      .phone-header {
        background: #E91E63;
        color: white;
        text-align: center;
        padding: 15px;
        font-size: 18px;
        font-weight: bold;
      }

      .phone-caller {
        text-align: center;
        padding: 20px;
        font-size: 48px;
      }

      .phone-message {
        padding: 20px;
        text-align: center;
      }

      .phone-message p {
        font-size: 14px;
        color: #2D3436;
        margin: 10px 0;
      }

      .phone-answer {
        width: 100%;
        padding: 15px;
        border: none;
        background: #27AE60;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }

      /* 滚动条 */
      .content-area::-webkit-scrollbar {
        width: 4px;
      }

      .content-area::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .content-area::-webkit-scrollbar-thumb {
        background: #E91E63;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-clawhauser-fan {
          right: 10px;
          bottom: 520px;
        }

        .fan-panel {
          width: calc(100vw - 20px);
        }
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initClawhauserFan() {
    injectStyles();

    const fan = createFanPanel();
    document.body.appendChild(fan);

    // 切换按钮
    document.getElementById('fanToggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('fanPanel').style.display = 'none';
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 初始渲染
    renderFandom();

    // 导出全局函数
    window.zootopiaClawhauserFan = {
      open: () => {
        document.getElementById('fanPanel').style.display = 'block';
      },
      showTab: (tabName) => switchTab(tabName),
      callGazelle: showGazelleCall
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClawhauserFan);
  } else {
    initClawhauserFan();
  }
})();
