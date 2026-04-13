/**
 * 疯狂动物城主题 - Zootopia 2 电影庆祝系统
 * Zootopia Theme - Zootopia 2 Movie Celebration
 * | 2025年续集电影庆祝活动
 */

(function() {
  'use strict';

  // Zootopia 2 电影数据
  const zootopia2Data = {
    movie: {
      title: 'Zootopia 2',
      chineseTitle: '疯狂动物城2',
      releaseDate: '2025年11月26日',
      studio: '迪士尼动画',
      directors: '拜伦·霍华德, 杰拉德·布什',
      producers: 'Yvonne Merager, Nathan Stanton',
      rating: 'PG',
      runtime: '待公布',
      poster: '🎬'
    },

    // 新歌 "Zoo"
    songs: [
      {
        title: 'Zoo',
        artist: 'Shakira (夏奇拉)',
        featuring: 'Ed Sheeran (艾德·希兰)',
        writers: 'Ed Sheeran, Blake Slatkin, Shakira',
        producers: 'Blake Slatkin, Alex (A.C.) Castillo, Shakira',
        release: '2025年',
        spotify: 'https://open.spotify.com/track/...',
        description: '继 "Try Everything" 后的又一动物城主题曲'
      }
    ],

    // 配乐
    score: {
      composer: 'Michael Giacchino (迈克尔·吉亚奇诺)',
      compositions: 23,
      note: '回归执导电影配乐，延续第一部的精彩'
    },

    // 主要角色
    characters: [
      {
        name: '朱迪·霍普斯',
        voice: 'Ginnifer Goodwin',
        role: '主角',
        description: '充满活力的兔子警官'
      },
      {
        name: '尼克·王尔德',
        voice: 'Jason Bateman',
        role: '主角',
        description: '机智狡猾的狐狸'
      },
      {
        name: 'Gazelle',
        voice: 'Shakira',
        role: '特别出演',
        description: '动物城超级巨星'
      }
    ],

    // 新角色 (预告片展示)
    newCharacters: [
      {
        name: '神秘新角色',
        description: '预告片展示，敬请期待',
        note: '官方将在上映前公布更多详情'
      }
    ],

    // 电影亮点
    highlights: [
      '70个配音角色 - 迪士尼动画历史之最',
      'Shakira 和 Ed Sheeran 合作新歌',
      'Michael Giacchino 回归配乐',
      '23首配乐作品',
      '全新故事线延续经典',
      '感恩节周末上映'
    ],

    // 宣传活动
    promotionalEvents: [
      {
        event: '香港时代广场 - Zootopia 2: Zoo-tastic Celebration',
        location: '香港时代广场',
        period: '至2026年1月4日',
        activities: ['角色见面会', '电影场景展示', '互动拍照区', '限定商品']
      },
      {
        event: '上海迪士尼 - 全新体验篇章',
        location: '上海迪士尼乐园',
        period: '2026年全年',
        activities: ['新角色融入园区', '新故事场景', '特别演出', '主题美食']
      }
    ],

    // 电影海报/预告片
    media: {
      trailers: [
        {
          title: '官方预告片',
          release: '2025年',
          description: '展示新角色和新故事'
        }
      ],
      posters: [
        {
          description: '朱迪和尼克的新冒险',
          release: '2025年'
        }
      ]
    },

    // 票房里程碑
    boxOffice: {
      opening: '待上映',
      worldwide: '待上映',
      note: '期待超越第一部 (10.24亿美元)'
    },

    // 影评
    reviews: [
      {
        source: 'IGN',
        rating: '8/10',
        excerpt: 'Full review coming soon...'
      }
    ],

    // 倒计时
    countdown: {
      targetDate: '2025-11-26',
      note: '感恩节周末'
    }
  };

  // 当前状态
  let celebrationState = {
    isActive: false,
    confettiActive: false,
    panel: null
  };

  // 计算倒计时
  function getCountdown() {
    const target = new Date('2025-11-26');
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      return { expired: true, message: '🎉 Zootopia 2 已上映！' };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;

    return {
      expired: false,
      months: months,
      days: remainingDays,
      message: `${months}个月 ${remainingDays}天`
    };
  }

  // 创建庆祝面板
  function createCelebrationPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-movie2-celebration';
    panel.innerHTML = `
      <!-- 切换按钮 -->
      <div class="movie2-toggle" id="movie2Toggle">
        <span class="toggle-icon">🎬</span>
        <span class="toggle-text">Zootopia 2</span>
      </div>

      <!-- 主面板 -->
      <div class="movie2-panel" id="movie2Panel" style="display: none;">
        <div class="panel-header">
          <div class="header-content">
            <span class="movie-poster">${zootopia2Data.movie.poster}</span>
            <div class="header-text">
              <h2 class="movie-title">${zootopia2Data.movie.chineseTitle}</h2>
              <p class="movie-subtitle">${zootopia2Data.movie.title}</p>
            </div>
          </div>
          <button class="close-panel" id="closePanelBtn">×</button>
        </div>

        <!-- 倒计时 -->
        <div class="countdown-section" id="countdownSection">
          <div class="countdown-label">距离上映还有</div>
          <div class="countdown-timer" id="countdownTimer"></div>
          <div class="countdown-date">${zootopia2Data.movie.releaseDate} 感恩节周末</div>
        </div>

        <!-- 上映通知 (如果已上映) -->
        <div class="release-notice" id="releaseNotice" style="display: none;">
          <div class="notice-content">
            <span class="notice-icon">🎉</span>
            <span class="notice-text">Zootopia 2 已在影院上映！</span>
          </div>
        </div>

        <!-- 内容标签 -->
        <div class="content-tabs">
          <button class="tab-btn active" data-tab="overview">概览</button>
          <button class="tab-btn" data-tab="songs">音乐</button>
          <button class="tab-btn" data-tab="characters">角色</button>
          <button class="tab-btn" data-tab="events">活动</button>
        </div>

        <!-- 内容区域 -->
        <div class="content-area" id="contentArea">
          <!-- 概览 -->
          <div class="tab-content active" data-content="overview">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">上映日期</span>
                <span class="info-value">${zootopia2Data.movie.releaseDate}</span>
              </div>
              <div class="info-item">
                <span class="info-label">制片厂</span>
                <span class="info-value">${zootopia2Data.movie.studio}</span>
              </div>
              <div class="info-item">
                <span class="info-label">分级</span>
                <span class="info-value">${zootopia2Data.movie.rating}</span>
              </div>
              <div class="info-item">
                <span class="info-label">配音角色</span>
                <span class="info-value">70个</span>
              </div>
            </div>

            <div class="highlights-section">
              <h3 class="section-title">🌟 电影亮点</h3>
              <div class="highlights-list">
                ${zootopia2Data.highlights.map(h => `<div class="highlight-item">✨ ${h}</div>`).join('')}
              </div>
            </div>

            <div class="score-section">
              <h3 class="section-title">🎵 电影配乐</h3>
              <div class="score-info">
                <p class="composer">作曲: ${zootopia2Data.score.composer}</p>
                <p class="compositions">${zootopia2Data.score.compositions} 首配乐作品</p>
                <p class="score-note">${zootopia2Data.score.note}</p>
              </div>
            </div>
          </div>

          <!-- 音乐 -->
          <div class="tab-content" data-content="songs">
            <div class="songs-list">
              ${zootopia2Data.songs.map(song => `
                <div class="song-card">
                  <div class="song-header">
                    <span class="song-icon">🎵</span>
                    <div class="song-info">
                      <h4 class="song-title">${song.title}</h4>
                      <p class="song-artist">演唱: ${song.artist}</p>
                      ${song.featuring ? `<p class="song-feat">feat. ${song.featuring}</p>` : ''}
                    </div>
                  </div>
                  <div class="song-details">
                    <p class="song-writers">创作: ${song.writers}</p>
                    <p class="song-producers">制作: ${song.producers}</p>
                    <p class="song-desc">${song.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="music-note">
              <p>🎧 "Zoo" 现已在各大音乐平台上线！</p>
            </div>
          </div>

          <!-- 角色 -->
          <div class="tab-content" data-content="characters">
            <div class="characters-section">
              <h3 class="section-title">🐰🦊 经典角色回归</h3>
              <div class="characters-list">
                ${zootopia2Data.characters.map(char => `
                  <div class="character-card">
                    <h4 class="char-name">${char.name}</h4>
                    <p class="char-voice">配音: ${char.voice}</p>
                    <p class="char-role">${char.role}</p>
                    <p class="char-desc">${char.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="new-characters-section">
              <h3 class="section-title">🆕 新角色</h3>
              <div class="new-characters-list">
                ${zootopia2Data.newCharacters.map(char => `
                  <div class="new-character-card">
                    <h4 class="new-char-name">${char.name}</h4>
                    <p class="new-char-desc">${char.description}</p>
                    <p class="new-char-note">${char.note}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- 活动 -->
          <div class="tab-content" data-content="events">
            <div class="events-list">
              ${zootopia2Data.promotionalEvents.map(event => `
                <div class="event-card">
                  <h3 class="event-name">🎉 ${event.event}</h3>
                  <p class="event-location">📍 ${event.location}</p>
                  <p class="event-period">📅 ${event.period}</p>
                  <div class="event-activities">
                    <h4>活动内容:</h4>
                    ${event.activities.map(act => `<span class="activity-tag">${act}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 底部操作 -->
        <div class="panel-footer">
          <button class="celebrate-btn" id="celebrateBtn">
            <span class="btn-icon">🎉</span>
            <span class="btn-text">庆祝一下</span>
          </button>
        </div>
      </div>

      <!-- 彩带效果容器 -->
      <div class="confetti-container" id="confettiContainer"></div>
    `;

    return panel;
  }

  // 更新倒计时
  function updateCountdown() {
    const countdown = getCountdown();
    const timerEl = document.getElementById('countdownTimer');
    const countdownSection = document.getElementById('countdownSection');
    const releaseNotice = document.getElementById('releaseNotice');

    if (!timerEl) return;

    if (countdown.expired) {
      countdownSection.style.display = 'none';
      if (releaseNotice) releaseNotice.style.display = 'block';
    } else {
      timerEl.innerHTML = `
        <div class="countdown-number">${countdown.months}</div>
        <div class="countdown-label">个月</div>
        <div class="countdown-number">${countdown.days}</div>
        <div class="countdown-label">天</div>
      `;
    }
  }

  // 切换标签
  function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabName);
    });
  }

  // 切换面板
  function togglePanel() {
    const panel = document.getElementById('movie2Panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  // 庆祝彩带效果
  function celebrate() {
    if (celebrationState.confettiActive) return;
    celebrationState.confettiActive = true;

    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const colors = ['#FF9F43', '#0ABDE3', '#10AC84', '#5F27CD', '#FF6B6B', '#FDCB6E'];
    const emojis = ['🐰', '🦊', '🎬', '✨', '🌟', '🎉', '🎊', '🦁', '🐨', '🦊'];

    // 创建彩带
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';

        const isEmoji = Math.random() > 0.5;
        confetti.textContent = isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : '';
        if (!isEmoji) {
          confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        }

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
      }, i * 50);
    }

    // 播放庆祝音效 (可选)
    // playCelebrationSound();

    setTimeout(() => {
      celebrationState.confettiActive = false;
    }, 5000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#movie2-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'movie2-styles';
    styles.textContent = `
      /* 容器 */
      .zootopia-movie2-celebration {
        position: fixed;
        bottom: 300px;
        right: 20px;
        z-index: 9997;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .movie2-toggle {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .movie2-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: clapperBounce 1.5s ease infinite;
      }

      @keyframes clapperBounce {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 主面板 */
      .movie2-panel {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 85vh;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .panel-header {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
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

      .movie-poster {
        font-size: 36px;
      }

      .movie-title {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .movie-subtitle {
        font-size: 14px;
        margin: 2px 0 0 0;
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

      /* 倒计时 */
      .countdown-section {
        text-align: center;
        padding: 20px;
        background: rgba(255, 255, 255, 0.95);
      }

      .countdown-label {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 10px;
      }

      .countdown-timer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;
      }

      .countdown-number {
        font-size: 42px;
        font-weight: bold;
        color: #667eea;
        min-width: 60px;
      }

      .countdown-label {
        font-size: 14px;
        color: #636E72;
      }

      .countdown-date {
        font-size: 12px;
        color: #636E72;
      }

      /* 上映通知 */
      .release-notice {
        background: linear-gradient(135deg, #00B894, #00CEC9);
        padding: 15px;
        text-align: center;
        color: white;
      }

      .notice-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 16px;
        font-weight: bold;
      }

      .notice-icon {
        font-size: 24px;
      }

      /* 标签 */
      .content-tabs {
        display: flex;
        background: rgba(255, 255, 255, 0.95);
        padding: 10px;
        gap: 5px;
      }

      .tab-btn {
        flex: 1;
        padding: 8px 12px;
        border: none;
        background: transparent;
        border-radius: 20px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #636E72;
        font-weight: bold;
      }

      .tab-btn:hover {
        background: #F8F9FA;
      }

      .tab-btn.active {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
      }

      /* 内容区域 */
      .content-area {
        background: rgba(255, 255, 255, 0.95);
        padding: 15px;
        overflow-y: auto;
        max-height: 400px;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      /* 信息网格 */
      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 15px;
      }

      .info-item {
        background: #F8F9FA;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
      }

      .info-label {
        display: block;
        font-size: 11px;
        color: #636E72;
        margin-bottom: 4px;
      }

      .info-value {
        display: block;
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      /* 亮点 */
      .highlights-section,
      .score-section {
        margin-bottom: 15px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 10px 0;
      }

      .highlights-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .highlight-item {
        padding: 10px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border-radius: 8px;
        font-size: 12px;
        color: #2D3436;
      }

      .score-info p {
        font-size: 12px;
        color: #636E72;
        margin: 5px 0;
      }

      .composer {
        font-weight: bold;
        color: #2D3436;
      }

      /* 歌曲 */
      .songs-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .song-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 12px;
        padding: 12px;
        transition: all 0.3s ease;
      }

      .song-card:hover {
        border-color: #667eea;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
      }

      .song-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .song-icon {
        font-size: 28px;
      }

      .song-title {
        font-size: 15px;
        font-weight: bold;
        color: #2D3436;
        margin: 0;
      }

      .song-artist,
      .song-feat {
        font-size: 12px;
        color: #636E72;
        margin: 2px 0 0 0;
      }

      .song-details p {
        font-size: 11px;
        color: #636E72;
        margin: 3px 0;
      }

      .music-note {
        text-align: center;
        padding: 15px;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        border-radius: 10px;
        margin-top: 10px;
      }

      .music-note p {
        font-size: 13px;
        color: #667eea;
        margin: 0;
      }

      /* 角色 */
      .characters-section,
      .new-characters-section {
        margin-bottom: 15px;
      }

      .characters-list,
      .new-characters-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .character-card,
      .new-character-card {
        background: white;
        border: 2px solid #ECF0F1;
        border-radius: 10px;
        padding: 10px;
        transition: all 0.3s ease;
      }

      .character-card:hover {
        border-color: #FF9F43;
      }

      .new-character-card {
        border-color: #667eea;
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
      }

      .char-name,
      .new-char-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin: 0 0 5px 0;
      }

      .char-voice,
      .char-role,
      .char-desc,
      .new-char-desc,
      .new-char-note {
        font-size: 11px;
        color: #636E72;
        margin: 3px 0;
      }

      /* 活动 */
      .events-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .event-card {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border-radius: 12px;
        padding: 12px;
      }

      .event-name {
        font-size: 14px;
        font-weight: bold;
        margin: 0 0 8px 0;
      }

      .event-location,
      .event-period {
        font-size: 11px;
        opacity: 0.9;
        margin: 4px 0;
      }

      .event-activities h4 {
        font-size: 11px;
        margin: 8px 0 5px 0;
      }

      .activity-tag {
        display: inline-block;
        padding: 3px 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        font-size: 10px;
        margin-right: 4px;
        margin-bottom: 4px;
      }

      /* 底部操作 */
      .panel-footer {
        background: rgba(255, 255, 255, 0.95);
        padding: 12px 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .celebrate-btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 25px;
        background: linear-gradient(135deg, #FF9F43, #FF6B6B);
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

      .celebrate-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 5px 15px rgba(255, 159, 67, 0.4);
      }

      .btn-icon {
        font-size: 18px;
      }

      /* 彩带效果 */
      .confetti-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 10000;
        overflow: hidden;
      }

      .confetti-piece {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 10px;
        background: #FF9F43;
        animation: confettiFall linear forwards;
      }

      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }

      /* 滚动条 */
      .content-area::-webkit-scrollbar {
        width: 4px;
      }

      .content-area::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .content-area::-webkit-scrollbar-thumb {
        background: #667eea;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-movie2-celebration {
          right: 10px;
          bottom: 280px;
        }

        .movie2-panel {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initCelebration() {
    injectStyles();

    const celebration = createCelebrationPanel();
    document.body.appendChild(celebration);

    // 切换按钮
    document.getElementById('movie2Toggle').onclick = togglePanel;
    document.getElementById('closePanelBtn').onclick = () => {
      document.getElementById('movie2Panel').style.display = 'none';
    };

    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 庆祝按钮
    document.getElementById('celebrateBtn').onclick = celebrate;

    // 更新倒计时
    updateCountdown();
    setInterval(updateCountdown, 60000); // 每分钟更新

    // 导出全局函数
    window.zootopiaMovie2 = {
      open: () => {
        document.getElementById('movie2Panel').style.display = 'block';
      },
      celebrate: celebrate,
      showTab: (tabName) => switchTab(tabName)
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCelebration);
  } else {
    initCelebration();
  }
})();
