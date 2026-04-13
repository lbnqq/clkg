/**
 * 疯狂动物城音乐系统（优化版）
 * Zootopia Music System - 统一音乐播放管理
 */

(function() {
  'use strict';

  // ==================== 音乐数据 ====================
  const MusicDatabase = [
    {
      id: 1,
      title: 'Try Everything',
      artist: 'Shakira',
      album: 'Zootopia OST',
      cover: '🎤',
      src: 'https://music.163.com/song/media/outer/url?id=436514312.mp3',
      duration: '3:16'
    },
    {
      id: 2,
      title: 'Donut Hole',
      artist: 'Shakira',
      album: 'Zootopia OST',
      cover: '🍩',
      src: 'https://music.163.com/song/media/outer/url?id=436514324.mp3',
      duration: '2:45'
    }
  ];

  // ==================== 音乐播放器 ====================
  class MusicPlayer {
    constructor() {
      this.audio = null;
      this.playlist = [];
      this.currentIndex = 0;
      this.isPlaying = false;
      this.volume = 0.7;
      this.progress = 0;
      this.mode = 'loop'; // loop, shuffle, repeat
      this.container = null;
      this.events = {};
    }

    init() {
      this.createPlayer();
      this.bindEvents();
      this.loadPlaylist();
    }

    createPlayer() {
      // 检查是否已有播放器容器
      this.container = document.querySelector('.zt-music-player-container');

      if (!this.container) {
        this.container = document.createElement('div');
        this.container.className = 'zt-music-player-container';
        this.container.innerHTML = `
          <div class="zt-music-player" id="zt-music-player">
            <div class="zt-player-cover">
              <div class="zt-cover-art" id="zt-cover-art">🎵</div>
              <div class="zt-cover-spin" id="zt-cover-spin"></div>
            </div>
            <div class="zt-player-info">
              <div class="zt-track-info">
                <span class="zt-track-title" id="zt-track-title">未播放</span>
                <span class="zt-track-artist" id="zt-track-artist">-</span>
              </div>
              <div class="zt-player-progress">
                <div class="zt-progress-bar">
                  <div class="zt-progress-fill" id="zt-progress-fill"></div>
                </div>
                <div class="zt-time-info">
                  <span id="zt-current-time">0:00</span>
                  <span id="zt-duration">0:00</span>
                </div>
              </div>
              <div class="zt-player-controls">
                <button class="zt-control-btn zt-prev" id="zt-prev" title="上一首">⏮️</button>
                <button class="zt-control-btn zt-play" id="zt-play" title="播放">▶️</button>
                <button class="zt-control-btn zt-next" id="zt-next" title="下一首">⏭️</button>
              </div>
              <div class="zt-player-volume">
                <button class="zt-volume-btn" id="zt-volume">🔊</button>
                <div class="zt-volume-slider">
                  <input type="range" min="0" max="100" value="70" id="zt-volume-slider">
                </div>
              </div>
              <div class="zt-player-mode">
                <button class="zt-mode-btn" id="zt-mode" title="循环播放">🔁</button>
              </div>
              <button class="zt-player-toggle" id="zt-toggle">🎵</button>
            </div>
            <div class="zt-playlist-container">
              <div class="zt-playlist-header">
                <h3>播放列表</h3>
                <button class="zt-playlist-toggle" id="zt-playlist-toggle">📋</button>
              </div>
              <div class="zt-playlist" id="zt-playlist"></div>
            </div>
          </div>
        `;

        document.body.appendChild(this.container);
      }

      // 创建音频元素
      this.audio = new Audio();
      this.audio.volume = this.volume;

      // 绑定音频事件
      this.bindAudioEvents();
    }

    bindEvents() {
      if (!this.container) return;

      // 播放/暂停
      const playBtn = this.container.querySelector('#zt-play');
      ZootopiaCore.events.on(playBtn, 'click', () => this.togglePlay());

      // 上一首/下一首
      const prevBtn = this.container.querySelector('#zt-prev');
      const nextBtn = this.container.querySelector('#zt-next');
      ZootopiaCore.events.on(prevBtn, 'click', () => this.playPrev());
      ZootopiaCore.events.on(nextBtn, 'click', () => this.playNext());

      // 进度条
      const progressBar = this.container.querySelector('.zt-progress-bar');
      ZootopiaCore.events.on(progressBar, 'click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.seek(percent);
      });

      // 音量
      const volumeBtn = this.container.querySelector('#zt-volume');
      const volumeSlider = this.container.querySelector('#zt-volume-slider');

      ZootopiaCore.events.on(volumeBtn, 'click', () => this.toggleMute());
      ZootopiaCore.events.on(volumeSlider, 'input', (e) => {
        this.setVolume(e.target.value / 100);
      });

      // 播放模式
      const modeBtn = this.container.querySelector('#zt-mode');
      ZootopiaCore.events.on(modeBtn, 'click', () => this.switchMode());

      // 展开/收起
      const toggleBtn = this.container.querySelector('#zt-toggle');
      ZootopiaCore.events.on(toggleBtn, 'click', () => this.togglePlayer());

      // 播放列表
      const playlistToggle = this.container.querySelector('#zt-playlist-toggle');
      ZootopiaCore.events.on(playlistToggle, 'click', () => this.togglePlaylist());
    }

    bindAudioEvents() {
      if (!this.audio) return;

      ZootopiaCore.events.on(this.audio, 'timeupdate', () => this.updateProgress());
      ZootopiaCore.events.on(this.audio, 'ended', () => this.onTrackEnded());
      ZootopiaCore.events.on(this.audio, 'loadedmetadata', () => this.updateDuration());
      ZootopiaCore.events.on(this.audio, 'play', () => {
        this.isPlaying = true;
        this.updatePlayButton();
        this.updateCoverAnimation();
      });
      ZootopiaCore.events.on(this.audio, 'pause', () => {
        this.isPlaying = false;
        this.updatePlayButton();
        this.updateCoverAnimation();
      });
    }

    loadPlaylist() {
      // 加载播放列表
      this.playlist = MusicDatabase;

      const playlistEl = this.container.querySelector('#zt-playlist');
      if (!playlistEl) return;

      playlistEl.innerHTML = this.playlist.map((track, index) => `
        <div class="zt-playlist-item ${index === this.currentIndex ? 'zt-playing' : ''}"
             data-index="${index}">
          <span class="zt-playlist-cover">${track.cover}</span>
          <div class="zt-playlist-info">
            <span class="zt-playlist-title">${track.title}</span>
            <span class="zt-playlist-artist">${track.artist}</span>
          </div>
          <span class="zt-playlist-duration">${track.duration}</span>
        </div>
      `).join('');

      // 绑定播放列表点击事件
      ZootopiaCore.events.delegate(playlistEl, '.zt-playlist-item', 'click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        this.playTrack(index);
      });
    }

    playTrack(index) {
      if (index < 0 || index >= this.playlist.length) return;

      this.currentIndex = index;
      const track = this.playlist[index];

      this.audio.src = track.src;
      this.audio.play().catch(err => {
        console.warn('播放失败:', err);
      });

      this.updateTrackInfo();
      this.updatePlaylistHighlight();
    }

    togglePlay() {
      if (!this.audio) return;

      if (this.audio.paused) {
        if (!this.audio.src) {
          this.playTrack(0);
        } else {
          this.audio.play();
        }
      } else {
        this.audio.pause();
      }
    }

    playPrev() {
      let index = this.currentIndex - 1;
      if (index < 0) index = this.playlist.length - 1;
      this.playTrack(index);
    }

    playNext() {
      let index = this.currentIndex + 1;
      if (index >= this.playlist.length) index = 0;
      this.playTrack(index);
    }

    seek(percent) {
      if (!this.audio || !this.audio.duration) return;

      this.audio.currentTime = this.audio.duration * percent;
    }

    setVolume(value) {
      this.volume = Math.max(0, Math.min(1, value));
      if (this.audio) {
        this.audio.volume = this.volume;
      }

      const slider = this.container.querySelector('#zt-volume-slider');
      if (slider) {
        slider.value = this.volume * 100;
      }

      this.updateVolumeIcon();
    }

    toggleMute() {
      if (this.audio) {
        this.audio.muted = !this.audio.muted;
        this.updateVolumeIcon();
      }
    }

    switchMode() {
      const modes = ['loop', 'shuffle', 'repeat'];
      const currentIndex = modes.indexOf(this.mode);
      this.mode = modes[(currentIndex + 1) % modes.length];

      const modeBtn = this.container.querySelector('#zt-mode');
      const modeIcons = {
        loop: '🔁',
        shuffle: '🔀',
        repeat: '🔂'
      };

      if (modeBtn) {
        modeBtn.textContent = modeIcons[this.mode];
      }
    }

    onTrackEnded() {
      switch (this.mode) {
        case 'loop':
          this.playNext();
          break;
        case 'shuffle':
          this.playTrack(Math.floor(Math.random() * this.playlist.length));
          break;
        case 'repeat':
          this.audio.currentTime = 0;
          this.audio.play();
          break;
      }
    }

    updateProgress() {
      if (!this.audio || !this.audio.duration) return;

      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      const progressFill = this.container.querySelector('#zt-progress-fill');
      const currentTimeEl = this.container.querySelector('#zt-current-time');

      if (progressFill) {
        progressFill.style.width = `${percent}%`;
      }

      if (currentTimeEl) {
        currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
      }
    }

    updateDuration() {
      if (!this.audio) return;

      const durationEl = this.container.querySelector('#zt-duration');
      if (durationEl) {
        durationEl.textContent = this.formatTime(this.audio.duration);
      }
    }

    updateTrackInfo() {
      const track = this.playlist[this.currentIndex];
      if (!track) return;

      const titleEl = this.container.querySelector('#zt-track-title');
      const artistEl = this.container.querySelector('#zt-track-artist');
      const coverArt = this.container.querySelector('#zt-cover-art');

      if (titleEl) titleEl.textContent = track.title;
      if (artistEl) artistEl.textContent = track.artist;
      if (coverArt) coverArt.textContent = track.cover;
    }

    updatePlayButton() {
      const playBtn = this.container.querySelector('#zt-play');
      if (playBtn) {
        playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
      }
    }

    updateVolumeIcon() {
      const volumeBtn = this.container.querySelector('#zt-volume');
      if (!volumeBtn) return;

      if (this.audio && this.audio.muted) {
        volumeBtn.textContent = '🔇';
      } else if (this.volume === 0) {
        volumeBtn.textContent = '🔈';
      } else if (this.volume < 0.5) {
        volumeBtn.textContent = '🔉';
      } else {
        volumeBtn.textContent = '🔊';
      }
    }

    updatePlaylistHighlight() {
      const items = this.container.querySelectorAll('.zt-playlist-item');
      items.forEach((item, index) => {
        if (index === this.currentIndex) {
          item.classList.add('zt-playing');
        } else {
          item.classList.remove('zt-playing');
        }
      });
    }

    updateCoverAnimation() {
      const spin = this.container.querySelector('#zt-cover-spin');
      if (spin) {
        spin.style.animationPlayState = this.isPlaying ? 'running' : 'paused';
      }
    }

    togglePlayer() {
      this.container.classList.toggle('zt-player-expanded');
    }

    togglePlaylist() {
      const playlist = this.container.querySelector('.zt-playlist-container');
      if (playlist) {
        playlist.classList.toggle('zt-playlist-show');
      }
    }

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }

  // ==================== 导出 API ====================
  let playerInstance = null;

  ZootopiaCore.music = {
    getPlayer: function() {
      if (!playerInstance) {
        playerInstance = new MusicPlayer();
        playerInstance.init();
      }
      return playerInstance;
    },

    play: function(index) {
      this.getPlayer().playTrack(index);
    },

    pause: function() {
      this.getPlayer().togglePlay();
    },

    next: function() {
      this.getPlayer().playNext();
    },

    prev: function() {
      this.getPlayer().playPrev();
    }
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    // 自动初始化播放器（如果页面有标记）
    if (document.querySelector('[data-zt-music-player]')) {
      playerInstance = new MusicPlayer();
      playerInstance.init();
    }

    console.log('🎵 Zootopia 音乐系统已加载');
  });

  // ==================== 工具函数 ====================
  // 快捷控制音乐
  window.ztMusic = {
    play: (index) => ZootopiaCore.music.play(index),
    pause: () => ZootopiaCore.music.pause(),
    next: () => ZootopiaCore.music.next(),
    prev: () => ZootopiaCore.music.prev()
  };

})();
