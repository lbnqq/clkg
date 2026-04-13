/**
 * 疯狂动物城主题 - 音乐播放器
 * Zootopia Theme - Music Player
 * 播放 Gazelle 的音乐和动物城经典曲目
 */

(function() {
  'use strict';

  // 播放列表
  const playlist = [
    {
      id: 1,
      title: 'Try Everything',
      artist: 'Shakira as Gazelle',
      duration: '3:45',
      emoji: '🦌',
      cover: 'linear-gradient(135deg, #FF9F43, #EE5A24)',
      genre: 'Pop',
      year: 2016
    },
    {
      id: 2,
      title: ' Suite from Zootopia',
      artist: 'Michael Giacchino',
      duration: '4:23',
      emoji: '🎼',
      cover: 'linear-gradient(135deg, #0ABDE3, #10AC84)',
      genre: 'Soundtrack',
      year: 2016
    },
    {
      id: 3,
      title: 'Handle My Flame',
      artist: 'Gazelle',
      duration: '3:18',
      emoji: '🔥',
      cover: 'linear-gradient(135deg, #EE5A24, #D63031)',
      genre: 'Pop',
      year: 2016
    },
    {
      id: 4,
      title: 'Ticket to Ride',
      artist: 'Zootopia Express Band',
      duration: '2:56',
      emoji: '🚂',
      cover: 'linear-gradient(135deg, #5F27CD, #A29BFE)',
      genre: 'Jazz',
      year: 2016
    },
    {
      id: 5,
      title: 'Funky Town',
      artist: 'Downtown All-Stars',
      duration: '3:33',
      emoji: '🏙️',
      cover: 'linear-gradient(135deg, #26DE81, #20BF6B)',
      genre: 'Funk',
      year: 2016
    },
    {
      id: 6,
      title: 'Tundratown Blues',
      artist: 'The Polar Bears',
      duration: '4:12',
      emoji: '❄️',
      cover: 'linear-gradient(135deg, #74B9FF, #0984E3)',
      genre: 'Blues',
      year: 2016
    },
    {
      id: 7,
      title: 'Jungle Rhythm',
      artist: 'Rainforest Beats',
      duration: '3:47',
      emoji: '🌴',
      cover: 'linear-gradient(135deg, #55E6C1, #00B894)',
      genre: 'Tropical',
      year: 2016
    },
    {
      id: 8,
      title: 'Sahara Sunset',
      artist: 'Desert Dreams',
      duration: '4:05',
      emoji: '🏜️',
      cover: 'linear-gradient(135deg, #FDCB6E, #F39C12)',
      genre: 'Ambient',
      year: 2016
    }
  ];

  // 播放器状态
  let playerState = {
    currentTrack: 0,
    isPlaying: false,
    volume: 80,
    progress: 0,
    isShuffle: false,
    isRepeat: false,
    playlist: [...playlist]
  };

  // 创建播放器
  function createMusicPlayer() {
    const player = document.createElement('div');
    player.className = 'zootopia-music-player';
    player.innerHTML = `
      <div class="player-toggle" id="playerToggle">
        <span class="toggle-icon">🎵</span>
      </div>

      <div class="player-panel" id="playerPanel">
        <div class="player-header">
          <div class="header-title">
            <span class="title-icon">🎵</span>
            <span class="title-text">Gazelle 音乐</span>
          </div>
          <button class="header-close" id="playerClose">−</button>
        </div>

        <div class="now-playing">
          <div class="album-art" id="albumArt" style="background: ${playlist[0].cover}">
            <div class="art-emoji">${playlist[0].emoji}</div>
          </div>
          <div class="track-info">
            <div class="track-title" id="trackTitle">${playlist[0].title}</div>
            <div class="track-artist" id="trackArtist">${playlist[0].artist}</div>
            <div class="track-meta">
              <span class="track-genre">${playlist[0].genre}</span>
              <span class="track-year">${playlist[0].year}</span>
            </div>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
          </div>
          <div class="time-display">
            <span id="currentTime">0:00</span>
            <span id="totalTime">${playlist[0].duration}</span>
          </div>
        </div>

        <div class="player-controls">
          <button class="control-btn shuffle-btn ${playerState.isShuffle ? 'active' : ''}" id="shuffleBtn" title="随机播放">
            🔀
          </button>
          <button class="control-btn prev-btn" id="prevBtn" title="上一首">
            ⏮️
          </button>
          <button class="control-btn play-btn" id="playBtn" title="播放/暂停">
            ▶️
          </button>
          <button class="control-btn next-btn" id="nextBtn" title="下一首">
            ⏭️
          </button>
          <button class="control-btn repeat-btn ${playerState.isRepeat ? 'active' : ''}" id="repeatBtn" title="重复播放">
            🔁
          </button>
        </div>

        <div class="volume-control">
          <span class="volume-icon">🔊</span>
          <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="${playerState.volume}">
          <span class="volume-value" id="volumeValue">${playerState.volume}%</span>
        </div>

        <div class="playlist-section">
          <div class="playlist-header">
            <h3>📋 播放列表</h3>
            <span class="playlist-count">${playlist.length} 首歌曲</span>
          </div>
          <div class="playlist-items" id="playlistItems">
            ${playlist.map((track, index) => `
              <div class="playlist-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <span class="item-emoji">${track.emoji}</span>
                <div class="item-info">
                  <div class="item-title">${track.title}</div>
                  <div class="item-artist">${track.artist}</div>
                </div>
                <span class="item-duration">${track.duration}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    return player;
  }

  // 播放/暂停
  function togglePlay() {
    playerState.isPlaying = !playerState.isPlaying;
    const playBtn = document.getElementById('playBtn');

    if (playerState.isPlaying) {
      playBtn.textContent = '⏸️';
      startProgressSimulation();
    } else {
      playBtn.textContent = '▶️';
      stopProgressSimulation();
    }
  }

  // 进度模拟
  let progressInterval = null;

  function startProgressSimulation() {
    stopProgressSimulation();
    progressInterval = setInterval(() => {
      playerState.progress += 0.5;
      if (playerState.progress >= 100) {
        playerState.progress = 0;
        nextTrack();
      }
      updateProgress();
    }, 500);
  }

  function stopProgressSimulation() {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }

  // 更新进度
  function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');

    if (progressFill) {
      progressFill.style.width = `${playerState.progress}%`;
    }

    if (currentTime) {
      const track = playerState.playlist[playerState.currentTrack];
      const [mins, secs] = track.duration.split(':').map(Number);
      const totalSeconds = mins * 60 + secs;
      const currentSeconds = Math.floor((playerState.progress / 100) * totalSeconds);
      const currentMins = Math.floor(currentSeconds / 60);
      const currentSecs = currentSeconds % 60;
      currentTime.textContent = `${currentMins}:${currentSecs.toString().padStart(2, '0')}`;
    }
  }

  // 下一首
  function nextTrack() {
    if (playerState.isShuffle) {
      playerState.currentTrack = Math.floor(Math.random() * playerState.playlist.length);
    } else {
      playerState.currentTrack = (playerState.currentTrack + 1) % playerState.playlist.length;
    }
    loadTrack(playerState.currentTrack);
  }

  // 上一首
  function prevTrack() {
    if (playerState.progress > 10) {
      playerState.progress = 0;
    } else {
      playerState.currentTrack = (playerState.currentTrack - 1 + playerState.playlist.length) % playerState.playlist.length;
    }
    loadTrack(playerState.currentTrack);
  }

  // 加载歌曲
  function loadTrack(index) {
    playerState.currentTrack = index;
    playerState.progress = 0;
    const track = playerState.playlist[index];

    // 更新显示
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('trackArtist').textContent = track.artist;
    document.getElementById('totalTime').textContent = track.duration;
    document.getElementById('albumArt').style.background = track.cover;
    document.querySelector('.art-emoji').textContent = track.emoji;

    // 更新播放列表高亮
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });

    updateProgress();

    if (playerState.isPlaying) {
      startProgressSimulation();
    }
  }

  // 切换随机播放
  function toggleShuffle() {
    playerState.isShuffle = !playerState.isShuffle;
    document.getElementById('shuffleBtn').classList.toggle('active', playerState.isShuffle);
  }

  // 切换重复播放
  function toggleRepeat() {
    playerState.isRepeat = !playerState.isRepeat;
    document.getElementById('repeatBtn').classList.toggle('active', playerState.isRepeat);
  }

  // 更新音量
  function updateVolume(value) {
    playerState.volume = value;
    document.getElementById('volumeValue').textContent = `${value}%`;
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#music-player-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'music-player-styles';
    styles.textContent = `
      /* 音乐播放器 */
      .zootopia-music-player {
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 9995;
      }

      .player-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 20px rgba(255, 159, 67, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .player-toggle:hover {
        transform: scale(1.1) rotate(10deg);
        box-shadow: 0 8px 25px rgba(255, 159, 67, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .player-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: panelSlideUp 0.3s ease;
        overflow: hidden;
      }

      .player-panel.show {
        display: block;
      }

      @keyframes panelSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .player-header {
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
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
        font-weight: bold;
      }

      .title-icon {
        font-size: 24px;
      }

      .header-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .header-close:hover {
        opacity: 1;
      }

      /* 当前播放 */
      .now-playing {
        padding: 20px;
        display: flex;
        gap: 15px;
      }

      .album-art {
        width: 80px;
        height: 80px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .art-emoji {
        font-size: 40px;
      }

      .track-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .track-title {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .track-artist {
        font-size: 13px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .track-meta {
        display: flex;
        gap: 10px;
      }

      .track-genre,
      .track-year {
        padding: 3px 10px;
        background: rgba(255, 159, 67, 0.1);
        border-radius: 10px;
        font-size: 11px;
        color: #FF9F43;
        font-weight: 600;
      }

      /* 进度条 */
      .progress-section {
        padding: 0 20px 15px;
      }

      .progress-bar {
        height: 6px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #FF9F43, #EE5A24);
        border-radius: 3px;
        transition: width 0.1s linear;
      }

      .time-display {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #636E72;
        font-family: 'Courier New', monospace;
      }

      /* 控制按钮 */
      .player-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        padding: 0 20px 20px;
      }

      .control-btn {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 159, 67, 0.1);
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: rgba(255, 159, 67, 0.2);
        transform: scale(1.1);
      }

      .control-btn.active {
        background: #FF9F43;
        color: white;
      }

      .play-btn {
        width: 55px;
        height: 55px;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
        font-size: 24px;
      }

      .play-btn:hover {
        background: linear-gradient(135deg, #EE5A24, #D63031);
      }

      /* 音量控制 */
      .volume-control {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        background: rgba(255, 159, 67, 0.05);
      }

      .volume-icon {
        font-size: 18px;
      }

      .volume-slider {
        flex: 1;
        height: 4px;
        -webkit-appearance: none;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        outline: none;
      }

      .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 14px;
        height: 14px;
        background: #FF9F43;
        border-radius: 50%;
        cursor: pointer;
      }

      .volume-value {
        font-size: 12px;
        color: #636E72;
        min-width: 35px;
        text-align: right;
      }

      /* 播放列表 */
      .playlist-section {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        max-height: 300px;
        overflow-y: auto;
      }

      .playlist-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px 10px;
      }

      .playlist-header h3 {
        margin: 0;
        font-size: 14px;
        color: #2D3436;
      }

      .playlist-count {
        font-size: 12px;
        color: #636E72;
      }

      .playlist-items {
        padding: 0 10px 10px;
      }

      .playlist-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .playlist-item:hover {
        background: rgba(255, 159, 67, 0.1);
      }

      .playlist-item.active {
        background: rgba(255, 159, 67, 0.2);
      }

      .item-emoji {
        font-size: 24px;
      }

      .item-info {
        flex: 1;
      }

      .item-title {
        font-size: 14px;
        font-weight: 600;
        color: #2D3436;
        margin-bottom: 2px;
      }

      .item-artist {
        font-size: 12px;
        color: #636E72;
      }

      .item-duration {
        font-size: 12px;
        color: #636E72;
        font-family: 'Courier New', monospace;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .player-panel {
          width: calc(100vw - 80px);
          max-width: none;
        }

        .zootopia-music-player {
          bottom: 10px;
          right: 15px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化播放器
  function initMusicPlayer() {
    injectStyles();

    const player = createMusicPlayer();
    document.body.appendChild(player);

    // 切换面板
    const toggle = document.getElementById('playerToggle');
    const panel = document.getElementById('playerPanel');

    toggle.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    };

    // 关闭按钮
    document.getElementById('playerClose').onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!player.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 控制按钮
    document.getElementById('playBtn').onclick = togglePlay;
    document.getElementById('nextBtn').onclick = nextTrack;
    document.getElementById('prevBtn').onclick = prevTrack;
    document.getElementById('shuffleBtn').onclick = toggleShuffle;
    document.getElementById('repeatBtn').onclick = toggleRepeat;

    // 音量控制
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.oninput = (e) => {
      updateVolume(e.target.value);
    };

    // 播放列表点击
    document.getElementById('playlistItems').addEventListener('click', (e) => {
      const item = e.target.closest('.playlist-item');
      if (item) {
        const index = parseInt(item.dataset.index);
        loadTrack(index);
        if (!playerState.isPlaying) {
          togglePlay();
        }
      }
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMusicPlayer);
  } else {
    initMusicPlayer();
  }
})();
