/**
 * 疯狂动物城主题 - 音乐播放器V2
 * Zootopia Theme - Music Player V2
 * | 动物城原声带音乐播放
 */

(function() {
  'use strict';

  // 动物城音乐数据库
  const zootopiaMusic = {
    movie1: {
      title: '疯狂动物城 原声带',
      year: '2016',
      cover: '/img/zootopia/music/zootopia1-cover.jpg',
      tracks: [
        {
          id: 'm1_01',
          title: 'Try Everything',
          artist: 'Shakira',
          duration: '3:24',
          mood: 'uplifting',
          icon: '🎤',
          color: '#E91E63',
          description: '电影主题曲，鼓励勇于尝试',
          lyrics: 'I messed up tonight, I lost another fight\nStill you make me smile...'
        },
        {
          id: 'm1_02',
          title: 'Stage Fright',
          artist: 'Michael Giacchino',
          duration: '2:18',
          mood: 'playful',
          icon: '🎭',
          color: '#9C27B0',
          description: '朱迪童年舞台场景配乐'
        },
        {
          id: 'm1_03',
          title: "Grey's uh-Mad at Me",
          artist: 'Michael Giacchino',
          duration: '1:45',
          mood: 'tense',
          icon: '🦊',
          color: '#E67E22',
          description: '朱迪与尼克相遇场景'
        },
        {
          id: 'm1_04',
          title: 'Ticket to Write',
          artist: 'Michael Giacchino',
          duration: '2:56',
          mood: 'adventurous',
          icon: '🚂',
          color: '#3498DB',
          description: '前往动物城列车场景'
        },
        {
          id: 'm1_05',
          title: 'Foxy Fakeout',
          artist: 'Michael Giacchino',
          duration: '2:12',
          mood: 'sly',
          icon: '🦊',
          color: '#E67E22',
          description: '尼克的狡猾计划'
        },
        {
          id: 'm1_06',
          title: 'The Curling Song',
          artist: 'Michael Giacchino',
          duration: '1:38',
          mood: 'funny',
          icon: '🐻',
          color: '#795548',
          description: '有趣的原野区场景'
        },
        {
          id: 'm1_07',
          title: 'Not a Real Cop',
          artist: 'Michael Giacchino',
          duration: '3:15',
          mood: 'emotional',
          icon: '👮',
          color: '#3498DB',
          description: '朱迪的挫折时刻'
        },
        {
          id: 'm1_08',
          title: 'It's My Fault',
          artist: 'Michael Giacchino',
          duration: '2:45',
          mood: 'sad',
          icon: '😢',
          color: '#607D8B',
          description: '尼克与朱迪的冲突'
        }
      ]
    },
    movie2: {
      title: '疯狂动物城2 原声带',
      year: '2024',
      cover: '/img/zootopia/music/zootopia2-cover.jpg',
      tracks: [
        {
          id: 'm2_01',
          title: 'Zoo',
          artist: 'Shakira',
          duration: '3:45',
          mood: 'uplifting',
          icon: '🎤',
          color: '#E91E63',
          description: '疯狂动物城2主题曲',
          lyrics: 'In this world of wonder, dreams come true...'
        },
        {
          id: 'm2_02',
          title: 'Zootopening',
          artist: 'Michael Giacchino',
          duration: '2:30',
          mood: 'grand',
          icon: '🏙️',
          color: '#FF9F43',
          description: '续集开场宏大场景'
        },
        {
          id: 'm2_03',
          title: 'The Old Zoo Review',
          artist: 'Michael Giacchino',
          duration: '3:12',
          mood: 'nostalgic',
          icon: '📜',
          color: '#9B59B6',
          description: '回顾第一部的经典时刻'
        },
        {
          id: 'm2_04',
          title: 'New Adventures',
          artist: 'Michael Giacchino',
          duration: '2:48',
          mood: 'exciting',
          icon: '🌟',
          color: '#F1C40F',
          description: '新冒险的开始'
        },
        {
          id: 'm2_05',
          title: 'Sloth Speed',
          artist: 'Michael Giacchino',
          duration: '4:20',
          mood: 'funny',
          icon: '🐢',
          color: '#27AE60',
          description: '闪电的回归场景'
        }
      ]
    },
    shanghaiDisney: {
      title: '我们都爱动物城 EP',
      year: '2024',
      cover: '/img/zootopia/music/shanghai-disney-cover.jpg',
      tracks: [
        {
          id: 'sd_01',
          title: '我们都爱动物城',
          artist: '上海迪士尼',
          duration: '3:15',
          mood: 'celebratory',
          icon: '🏰',
          color: '#FF6B6B',
          description: '上海迪士尼疯狂动物城园区主题曲'
        },
        {
          id: 'sd_02',
          title: '尝试一切 (投影版)',
          artist: 'Disney',
          duration: '3:24',
          mood: 'uplifting',
          icon: '🎆',
          color: '#4ECDC4',
          description: '欢庆投影秀版本'
        },
        {
          id: 'sd_03',
          title: '尝试一切 (巡游版)',
          artist: 'Disney',
          duration: '3:30',
          mood: 'festive',
          icon: '🎉',
          color: '#FFE66D',
          description: '日特别巡游版本'
        }
      ]
    }
  };

  // 播放器状态
  let playerState = {
    isPlaying: false,
    currentTrack: null,
    currentAlbum: 'movie1',
    volume: 0.7,
    progress: 0,
    playlist: [],
    shuffle: false,
    repeat: 'none' // none, one, all
  };

  // 模拟音频播放（真实场景需要实际音频文件）
  let playbackInterval = null;

  // 创建音乐播放器
  function createMusicPlayer() {
    const player = document.createElement('div');
    player.className = 'zootopia-music-player';
    player.innerHTML = `
      <!-- 最小化按钮 -->
      <div class="player-toggle" id="playerToggle">
        <span class="toggle-icon">🎵</span>
        <span class="toggle-indicator" id="toggleIndicator"></span>
      </div>

      <!-- 播放器面板 -->
      <div class="player-panel" id="playerPanel">
        <!-- 头部 -->
        <div class="player-header">
          <div class="header-title">
            <span class="title-icon">🎬</span>
            <span class="title-text">动物城音乐</span>
          </div>
          <button class="expand-btn" id="expandBtn">⬆️</button>
        </div>

        <!-- 专辑选择 -->
        <div class="album-selector">
          <div class="album-tabs" id="albumTabs"></div>
        </div>

        <!-- 当前播放 -->
        <div class="now-playing">
          <div class="track-cover" id="trackCover">
            <div class="cover-placeholder">
              <span class="placeholder-icon">🎵</span>
            </div>
          </div>
          <div class="track-info">
            <div class="track-title" id="trackTitle">选择一首歌曲</div>
            <div class="track-artist" id="trackArtist">--</div>
            <div class="track-mood" id="trackMood"></div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-container">
          <div class="progress-bar" id="progressBar">
            <div class="progress-fill" id="progressFill"></div>
            <div class="progress-handle" id="progressHandle"></div>
          </div>
          <div class="time-display">
            <span id="currentTime">0:00</span>
            <span id="totalTime">0:00</span>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="player-controls">
          <button class="control-btn shuffle-btn" id="shuffleBtn" title="随机播放">
            🔀
          </button>
          <button class="control-btn prev-btn" id="prevBtn" title="上一首">
            ⏮️
          </button>
          <button class="control-btn play-btn" id="playBtn" title="播放/暂停">
            <span id="playBtnIcon">▶️</span>
          </button>
          <button class="control-btn next-btn" id="nextBtn" title="下一首">
            ⏭️
          </button>
          <button class="control-btn repeat-btn" id="repeatBtn" title="循环模式">
            🔁
          </button>
        </div>

        <!-- 音量控制 -->
        <div class="volume-control">
          <span class="volume-icon">🔊</span>
          <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="70">
        </div>

        <!-- 播放列表 -->
        <div class="playlist-container">
          <div class="playlist-header">
            <span class="playlist-title">播放列表</span>
            <span class="playlist-count" id="playlistCount">0 首歌曲</span>
          </div>
          <div class="playlist-tracks" id="playlistTracks"></div>
        </div>
      </div>
    `;

    return player;
  }

  // 渲染专辑标签
  function renderAlbumTabs() {
    const tabsContainer = document.getElementById('albumTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = Object.entries(zootopiaMusic).map(([key, album]) => `
      <div class="album-tab ${key === playerState.currentAlbum ? 'active' : ''}" data-album="${key}">
        <div class="tab-year">${album.year}</div>
        <div class="tab-title">${album.title}</div>
      </div>
    `).join('');

    // 添加点击事件
    tabsContainer.querySelectorAll('.album-tab').forEach(tab => {
      tab.onclick = () => {
        const albumKey = tab.dataset.album;
        switchAlbum(albumKey);
      };
    });
  }

  // 切换专辑
  function switchAlbum(albumKey) {
    playerState.currentAlbum = albumKey;
    playerState.playlist = zootopiaMusic[albumKey].tracks;

    renderAlbumTabs();
    renderPlaylist();

    // 如果没有播放中的歌曲，选择第一首
    if (!playerState.currentTrack) {
      selectTrack(playerState.playlist[0]);
    }
  }

  // 渲染播放列表
  function renderPlaylist() {
    const tracksContainer = document.getElementById('playlistTracks');
    const countElement = document.getElementById('playlistCount');

    if (!tracksContainer) return;

    if (countElement) {
      countElement.textContent = `${playerState.playlist.length} 首歌曲`;
    }

    tracksContainer.innerHTML = playerState.playlist.map((track, index) => `
      <div class="playlist-track ${playerState.currentTrack?.id === track.id ? 'playing' : ''}" data-index="${index}">
        <div class="track-number">${index + 1}</div>
        <div class="track-icon" style="background: ${track.color}">${track.icon}</div>
        <div class="track-details">
          <div class="track-name">${track.title}</div>
          <div class="track-meta">
            <span>${track.artist}</span>
            <span>${track.duration}</span>
          </div>
        </div>
        ${playerState.currentTrack?.id === track.id && playerState.isPlaying ? `
          <div class="track-playing-indicator">
            <span class="indicator-bar"></span>
            <span class="indicator-bar"></span>
            <span class="indicator-bar"></span>
          </div>
        ` : ''}
      </div>
    `).join('');

    // 添加点击事件
    tracksContainer.querySelectorAll('.playlist-track').forEach(track => {
      track.onclick = () => {
        const index = parseInt(track.dataset.index);
        playTrack(index);
      };
    });
  }

  // 选择歌曲
  function selectTrack(track) {
    playerState.currentTrack = track;

    // 更新显示
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('trackArtist').textContent = track.artist;
    document.getElementById('trackMood').innerHTML = `<span style="color: ${track.color}">${track.icon} ${track.mood}</span>`;
    document.getElementById('totalTime').textContent = track.duration;

    // 更新封面
    const coverElement = document.getElementById('trackCover');
    coverElement.innerHTML = `
      <div class="cover-art" style="background: linear-gradient(135deg, ${track.color}, ${track.color}88)">
        <span class="cover-icon">${track.icon}</span>
      </div>
    `;

    // 重置进度
    playerState.progress = 0;
    updateProgress();
  }

  // 播放歌曲
  function playTrack(index) {
    if (index >= 0 && index < playerState.playlist.length) {
      selectTrack(playerState.playlist[index]);
      startPlayback();
    }
  }

  // 开始播放
  function startPlayback() {
    if (!playerState.currentTrack) return;

    playerState.isPlaying = true;
    updatePlayButton();
    renderPlaylist();

    // 模拟播放进度
    if (playbackInterval) clearInterval(playbackInterval);

    playbackInterval = setInterval(() => {
      if (playerState.isPlaying) {
        playerState.progress += 0.5; // 每500ms增加0.5%
        if (playerState.progress >= 100) {
          handleTrackEnd();
        } else {
          updateProgress();
        }
      }
    }, 500);
  }

  // 暂停播放
  function pausePlayback() {
    playerState.isPlaying = false;
    updatePlayButton();
    renderPlaylist();

    if (playbackInterval) {
      clearInterval(playbackInterval);
      playbackInterval = null;
    }
  }

  // 切换播放/暂停
  function togglePlayback() {
    if (playerState.isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  }

  // 更新播放按钮
  function updatePlayButton() {
    const icon = document.getElementById('playBtnIcon');
    if (icon) {
      icon.textContent = playerState.isPlaying ? '⏸️' : '▶️';
    }
  }

  // 更新进度
  function updateProgress() {
    const fill = document.getElementById('progressFill');
    const handle = document.getElementById('progressHandle');
    const currentTime = document.getElementById('currentTime');

    if (fill) fill.style.width = `${playerState.progress}%`;
    if (handle) handle.style.left = `${playerState.progress}%`;

    // 计算当前时间
    if (playerState.currentTrack) {
      const [mins, secs] = playerState.currentTrack.duration.split(':').map(Number);
      const totalSeconds = mins * 60 + secs;
      const currentSeconds = Math.floor(totalSeconds * playerState.progress / 100);
      const currentMins = Math.floor(currentSeconds / 60);
      const currentSecs = currentSeconds % 60;
      if (currentTime) {
        currentTime.textContent = `${currentMins}:${currentSecs.toString().padStart(2, '0')}`;
      }
    }
  }

  // 处理歌曲结束
  function handleTrackEnd() {
    pausePlayback();
    playerState.progress = 0;
    updateProgress();

    // 根据重复模式决定下一步
    if (playerState.repeat === 'one') {
      startPlayback();
    } else if (playerState.repeat === 'all' || hasNextTrack()) {
      playNextTrack();
    }
  }

  // 是否有下一首
  function hasNextTrack() {
    const currentIndex = playerState.playlist.findIndex(t => t.id === playerState.currentTrack?.id);
    return currentIndex < playerState.playlist.length - 1;
  }

  // 播放下一首
  function playNextTrack() {
    let currentIndex = playerState.playlist.findIndex(t => t.id === playerState.currentTrack?.id);

    if (playerState.shuffle) {
      // 随机播放
      const randomIndex = Math.floor(Math.random() * playerState.playlist.length);
      playTrack(randomIndex);
    } else {
      // 顺序播放
      if (currentIndex < playerState.playlist.length - 1) {
        playTrack(currentIndex + 1);
      } else if (playerState.repeat === 'all') {
        playTrack(0); // 循环到第一首
      }
    }
  }

  // 播放上一首
  function playPreviousTrack() {
    const currentIndex = playerState.playlist.findIndex(t => t.id === playerState.currentTrack?.id);
    if (currentIndex > 0) {
      playTrack(currentIndex - 1);
    }
  }

  // 切换随机播放
  function toggleShuffle() {
    playerState.shuffle = !playerState.shuffle;
    const btn = document.getElementById('shuffleBtn');
    if (btn) {
      btn.classList.toggle('active', playerState.shuffle);
    }
  }

  // 切换循环模式
  function toggleRepeat() {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(playerState.repeat);
    playerState.repeat = modes[(currentIndex + 1) % modes.length];

    const btn = document.getElementById('repeatBtn');
    if (btn) {
      btn.classList.toggle('active', playerState.repeat !== 'none');
      btn.textContent = playerState.repeat === 'one' ? '🔂' : '🔁';
    }
  }

  // 更新音量
  function updateVolume(value) {
    playerState.volume = value / 100;
  }

  // 切换面板
  function togglePanel() {
    const player = document.querySelector('.zootopia-music-player');
    const panel = document.getElementById('playerPanel');

    player.classList.toggle('expanded');
    panel.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#music-player-v2-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'music-player-v2-styles';
    styles.textContent = `
      /* 音乐播放器容器 */
      .zootopia-music-player {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .player-toggle {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
        transition: all 0.3s ease;
        position: relative;
      }

      .player-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(233, 30, 99, 0.5);
      }

      .toggle-icon {
        font-size: 28px;
        animation: musicBounce 2s ease infinite;
      }

      @keyframes musicBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-indicator {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 12px;
        height: 12px;
        background: #4CAF50;
        border-radius: 50%;
        display: none;
      }

      .zootopia-music-player.expanded .toggle-indicator {
        display: block;
      }

      /* 播放器面板 */
      .player-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 380px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }

      .player-panel.visible {
        display: flex;
        animation: playerSlideIn 0.3s ease;
      }

      @keyframes playerSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 头部 */
      .player-header {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .title-icon {
        font-size: 20px;
      }

      .title-text {
        font-size: 16px;
        font-weight: bold;
      }

      .expand-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 14px;
      }

      /* 专辑选择 */
      .album-selector {
        padding: 15px 20px;
        border-bottom: 1px solid #ECF0F1;
      }

      .album-tabs {
        display: flex;
        gap: 10px;
        overflow-x: auto;
      }

      .album-tab {
        flex-shrink: 0;
        background: #F8F9FA;
        border-radius: 12px;
        padding: 10px 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 120px;
      }

      .album-tab:hover {
        background: #ECF0F1;
      }

      .album-tab.active {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
      }

      .tab-year {
        font-size: 11px;
        opacity: 0.7;
        margin-bottom: 3px;
      }

      .tab-title {
        font-size: 12px;
        font-weight: bold;
      }

      /* 当前播放 */
      .now-playing {
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #ECF0F1;
      }

      .track-cover {
        width: 150px;
        height: 150px;
        margin: 0 auto 15px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .cover-placeholder {
        width: 100%;
        height: 100%;
        background: #ECF0F1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .placeholder-icon {
        font-size: 48px;
        opacity: 0.5;
      }

      .cover-art {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: albumRotate 20s linear infinite;
      }

      @keyframes albumRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .cover-icon {
        font-size: 64px;
      }

      .track-title {
        font-size: 18px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .track-artist {
        font-size: 14px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .track-mood {
        font-size: 12px;
      }

      /* 进度条 */
      .progress-container {
        padding: 15px 20px;
      }

      .progress-bar {
        position: relative;
        height: 6px;
        background: #ECF0F1;
        border-radius: 3px;
        margin-bottom: 8px;
        cursor: pointer;
      }

      .progress-fill {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background: linear-gradient(90deg, #E91E63, #9C27B0);
        border-radius: 3px;
        width: 0%;
        transition: width 0.1s ease;
      }

      .progress-handle {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 14px;
        height: 14px;
        background: white;
        border: 3px solid #E91E63;
        border-radius: 50%;
        left: 0%;
        cursor: grab;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      .time-display {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #636E72;
      }

      /* 控制按钮 */
      .player-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        padding: 15px 20px;
      }

      .control-btn {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        background: #F8F9FA;
        cursor: pointer;
        font-size: 18px;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: #ECF0F1;
        transform: scale(1.1);
      }

      .control-btn.active {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
      }

      .play-btn {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        font-size: 24px;
      }

      .play-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
      }

      /* 音量控制 */
      .volume-control {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
      }

      .volume-icon {
        font-size: 18px;
      }

      .volume-slider {
        flex: 1;
        height: 4px;
        -webkit-appearance: none;
        background: #ECF0F1;
        border-radius: 2px;
        outline: none;
      }

      .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        background: #E91E63;
        border-radius: 50%;
        cursor: pointer;
      }

      /* 播放列表 */
      .playlist-container {
        flex: 1;
        overflow-y: auto;
        max-height: 250px;
        border-top: 1px solid #ECF0F1;
      }

      .playlist-header {
        padding: 12px 20px;
        background: #F8F9FA;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        color: #636E72;
        position: sticky;
        top: 0;
      }

      .playlist-tracks {
        padding: 10px;
      }

      .playlist-track {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 5px;
      }

      .playlist-track:hover {
        background: #F8F9FA;
        transform: translateX(5px);
      }

      .playlist-track.playing {
        background: linear-gradient(135deg, #E91E6315, #9C27B015);
        border-left: 3px solid #E91E63;
      }

      .track-number {
        font-size: 12px;
        color: #95A5A6;
        width: 20px;
      }

      .track-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: white;
        flex-shrink: 0;
      }

      .track-details {
        flex: 1;
      }

      .track-name {
        font-size: 14px;
        font-weight: 600;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .track-meta {
        font-size: 11px;
        color: #636E72;
        display: flex;
        justify-content: space-between;
      }

      /* 播放指示器 */
      .track-playing-indicator {
        display: flex;
        gap: 3px;
        align-items: flex-end;
        height: 15px;
      }

      .indicator-bar {
        width: 3px;
        background: #E91E63;
        border-radius: 2px;
        animation: indicatorPulse 1s ease-in-out infinite;
      }

      .indicator-bar:nth-child(1) { animation-delay: 0s; height: 8px; }
      .indicator-bar:nth-child(2) { animation-delay: 0.2s; height: 12px; }
      .indicator-bar:nth-child(3) { animation-delay: 0.4s; height: 6px; }

      @keyframes indicatorPulse {
        0%, 100% { transform: scaleY(1); }
        50% { transform: scaleY(0.5); }
      }

      /* 滚动条 */
      .album-tabs::-webkit-scrollbar,
      .playlist-container::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      .album-tabs::-webkit-scrollbar-track,
      .playlist-container::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .album-tabs::-webkit-scrollbar-thumb,
      .playlist-container::-webkit-scrollbar-thumb {
        background: #E91E63;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-music-player {
          right: 10px;
          bottom: 10px;
        }

        .player-panel {
          width: calc(100vw - 20px);
          max-width: 380px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initMusicPlayer() {
    injectStyles();

    const player = createMusicPlayer();
    document.body.appendChild(player);

    // 切换按钮
    document.getElementById('playerToggle').onclick = togglePanel;
    document.getElementById('expandBtn').onclick = togglePanel;

    // 控制按钮
    document.getElementById('playBtn').onclick = togglePlayback;
    document.getElementById('nextBtn').onclick = playNextTrack;
    document.getElementById('prevBtn').onclick = playPreviousTrack;
    document.getElementById('shuffleBtn').onclick = toggleShuffle;
    document.getElementById('repeatBtn').onclick = toggleRepeat;

    // 音量控制
    document.getElementById('volumeSlider').oninput = (e) => {
      updateVolume(e.target.value);
    };

    // 初始化专辑和播放列表
    switchAlbum('movie1');

    // 导出全局函数
    window.zootopiaMusicPlayer = {
      play: (index) => playTrack(index),
      pause: pausePlayback,
      toggle: togglePlayback,
      next: playNextTrack,
      prev: playPreviousTrack,
      show: () => {
        const player = document.querySelector('.zootopia-music-player');
        if (!player.classList.contains('expanded')) {
          togglePanel();
        }
      },
      hide: () => {
        const player = document.querySelector('.zootopia-music-player');
        if (player.classList.contains('expanded')) {
          togglePanel();
        }
      }
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicPlayer);
  } else {
    initMusicPlayer();
  }
})();
