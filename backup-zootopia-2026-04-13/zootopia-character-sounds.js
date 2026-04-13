/**
 * 疯狂动物城主题 - 角色声音系统
 * Zootopia Theme - Character Sounds System
 * | 角色语音和音效系统
 */

(function() {
  'use strict';

  // 角色语音数据（使用Web Audio API生成音效）
  const characterSounds = {
    judy: {
      name: '朱迪',
      emoji: '🐰',
      sounds: {
        greeting: { text: '你好！我是朱迪·霍普斯！', pitch: 1.4, rate: 1.2 },
        excited: { text: '太棒了！我们可以做到的！', pitch: 1.5, rate: 1.3 },
        thinking: { text: '让我想想...', pitch: 1.3, rate: 1.0 },
        happy: { text: '今天真是美好的一天！', pitch: 1.5, rate: 1.2 },
        determined: { text: '我绝不放弃！', pitch: 1.4, rate: 1.1 }
      },
      bgm: ['bright', 'upbeat']
    },
    nick: {
      name: '尼克',
      emoji: '🦊',
      sounds: {
        greeting: { text: '嘿，小兔子！', pitch: 0.9, rate: 1.0 },
        sly: { text: '这可是个聪明的计划...', pitch: 0.85, rate: 0.95 },
        relaxed: { text: '放松点，别这么紧张。', pitch: 0.9, rate: 0.9 },
        clever: { text: '我是最聪明的狐狸！', pitch: 0.95, rate: 1.0 },
        friendly: { text: '我们是搭档，对吧？', pitch: 0.95, rate: 1.0 }
      },
      bgm: ['cool', 'jazz']
    },
    flash: {
      name: '闪电',
      emoji: '🐢',
      sounds: {
        greeting: { text: '你...好...欢...迎...来...到...动...物...城...', pitch: 0.6, rate: 0.3 },
        working: { text: '我...现...在...就...处...理...', pitch: 0.6, rate: 0.3 },
        happy: { text: '太...棒...了...', pitch: 0.7, rate: 0.35 },
        goodbye: { text: '再...见...', pitch: 0.6, rate: 0.3 }
      },
      bgm: ['slow', 'calm']
    },
    bogo: {
      name: '博戈局长',
      emoji: '🦁',
      sounds: {
        command: { text: '效率！我要求效率！', pitch: 0.7, rate: 1.1 },
        impressed: { text: '嗯，还不错。', pitch: 0.75, rate: 1.0 },
        strict: { text: '这是你的任务！', pitch: 0.7, rate: 1.1 },
        approval: { text: '很好，警官。', pitch: 0.75, rate: 1.0 }
      },
      bgm: ['serious', 'authoritative']
    },
    bellwether: {
      name: '绵羊副市长',
      emoji: '🐑',
      sounds: {
        greeting: { text: '你好呀！', pitch: 1.1, rate: 1.1 },
        sweet: { text: '我们都是朋友！', pitch: 1.2, rate: 1.1 },
        helpful: { text: '让我来帮你！', pitch: 1.15, rate: 1.1 },
        clever: { text: '这对我很有利...', pitch: 1.1, rate: 1.0 }
      },
      bgm: ['innocent', 'sweet']
    },
    Clawhauser: {
      name: '本杰明',
      emoji: '🐆',
      sounds: {
        excited: { text: '哦我的天！是Gazelle！', pitch: 1.3, rate: 1.3 },
        friendly: { text: '欢迎来到ZPD！', pitch: 1.2, rate: 1.2 },
        helpful: { text: '我可以帮你！', pitch: 1.25, rate: 1.2 },
        fan: { text: '我超爱Gazelle的新歌！', pitch: 1.4, rate: 1.4 }
      },
      bgm: ['pop', 'energetic']
    }
  };

  // 音效数据
  const soundEffects = {
    click: { frequency: 800, duration: 0.1, type: 'sine' },
    success: { frequency: 523.25, duration: 0.3, type: 'sine' },
    achievement: { frequencies: [523.25, 659.25, 783.99], duration: 0.5 },
    pawpsicle: { frequency: 400, duration: 0.2, type: 'triangle' },
    levelUp: { frequencies: [392, 523.25, 659.25, 783.99], duration: 0.8 },
    notification: { frequency: 600, duration: 0.15, type: 'sine' }
  };

  // 背景音乐风格
  const bgmStyles = {
    bright: { tempo: 120, notes: [261.63, 293.66, 329.63, 349.23] },
    upbeat: { tempo: 140, notes: [329.63, 392, 440, 523.25] },
    cool: { tempo: 100, notes: [196, 220, 246.94, 261.63] },
    jazz: { tempo: 110, notes: [220, 261.63, 311.13, 349.23] },
    slow: { tempo: 60, notes: [174.61, 196, 220, 246.94] },
    calm: { tempo: 80, notes: [261.63, 293.66, 329.63, 349.23] },
    serious: { tempo: 90, notes: [220, 246.94, 261.63, 293.66] },
    authoritative: { tempo: 100, notes: [196, 220, 246.94, 261.63] },
    innocent: { tempo: 110, notes: [329.63, 392, 440, 523.25] },
    sweet: { tempo: 120, notes: [392, 440, 493.88, 523.25] },
    pop: { tempo: 130, notes: [440, 523.25, 587.33, 659.25] },
    energetic: { tempo: 140, notes: [523.25, 587.33, 659.25, 783.99] }
  };

  // 音频上下文
  let audioContext = null;
  let currentBGM = null;
  let isMuted = false;

  // 初始化音频上下文
  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  // 播放角色语音
  function playCharacterVoice(characterId, soundId) {
    const character = characterSounds[characterId];
    if (!character || !character.sounds[soundId]) return;

    const sound = character.sounds[soundId];
    speakText(sound.text, sound.pitch, sound.rate);
  }

  // 使用语音合成播放文本
  function speakText(text, pitch = 1, rate = 1) {
    if (isMuted) return;

    initAudioContext();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = 0.8;

    // 尝试找到中文语音
    const voices = speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice => voice.lang.startsWith('zh'));
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    speechSynthesis.speak(utterance);
  }

  // 播放音效
  function playSoundEffect(effectName) {
    if (isMuted) return;

    const effect = soundEffects[effectName];
    if (!effect) return;

    initAudioContext();

    if (effect.frequencies) {
      // 多音符音效
      effect.frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, effect.duration / effect.frequencies.length, effect.type || 'sine');
        }, index * (effect.duration / effect.frequencies.length * 1000));
      });
    } else {
      // 单音符音效
      playTone(effect.frequency, effect.duration, effect.type || 'sine');
    }
  }

  // 播放单音调
  function playTone(frequency, duration, type = 'sine') {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }

  // 播放背景音乐
  function playBGM(style) {
    if (isMuted) return;
    if (currentBGM) {
      stopBGM();
    }

    const bgm = bgmStyles[style];
    if (!bgm) return;

    initAudioContext();
    currentBGM = { style, interval: null };

    const noteDuration = 60 / bgm.tempo;
    let noteIndex = 0;

    function playNote() {
      if (!currentBGM || currentBGM.style !== style) return;

      const note = bgm.notes[noteIndex % bgm.notes.length];
      playTone(note, noteDuration * 0.8, 'sine');
      noteIndex++;
    }

    playNote();
    currentBGM.interval = setInterval(playNote, noteDuration * 1000);
  }

  // 停止背景音乐
  function stopBGM() {
    if (currentBGM && currentBGM.interval) {
      clearInterval(currentBGM.interval);
      currentBGM = null;
    }
  }

  // 创建声音控制面板
  function createSoundPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-sound-panel';
    panel.innerHTML = `
      <div class="sound-backdrop"></div>
      <div class="sound-container">
        <div class="sound-header">
          <div class="sound-logo">🔊</div>
          <div class="sound-title">动物城声音系统</div>
          <button class="sound-close">×</button>
        </div>

        <div class="sound-controls">
          <button class="control-btn mute-btn" id="muteBtn">
            <span class="btn-icon">${isMuted ? '🔇' : '🔊'}</span>
            <span class="btn-text">${isMuted ? '取消静音' : '静音'}</span>
          </button>
          <button class="control-btn bgm-btn" id="bgmBtn">
            <span class="btn-icon">🎵</span>
            <span class="btn-text">播放BGM</span>
          </button>
        </div>

        <div class="sound-sections">
          <div class="sound-section">
            <div class="section-title">🎭 角色语音</div>
            <div class="character-grid">
              ${Object.entries(characterSounds).map(([id, char]) => `
                <div class="character-card" data-character="${id}">
                  <div class="character-emoji">${char.emoji}</div>
                  <div class="character-name">${char.name}</div>
                  <div class="sound-list">
                    ${Object.keys(char.sounds).map(soundId => `
                      <button class="sound-play-btn" data-sound="${soundId}" data-character="${id}">
                        ${soundId}
                      </button>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="sound-section">
            <div class="section-title">🎵 音效</div>
            <div class="effect-grid">
              ${Object.keys(soundEffects).map(effect => `
                <button class="effect-btn" data-effect="${effect}">
                  ${effect}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="sound-section">
            <div class="section-title">🎼 背景音乐</div>
            <div class="bgm-grid">
              ${Object.keys(bgmStyles).map(style => `
                <button class="bgm-style-btn" data-style="${style}">
                  ${style}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="sound-status" id="soundStatus">
          <span class="status-text">准备就绪</span>
        </div>
      </div>

      <button class="sound-toggle" id="soundToggle">
        <span class="toggle-icon">🔊</span>
      </button>
    `;

    return panel;
  }

  // 显示状态消息
  function showStatus(message) {
    const status = document.getElementById('soundStatus');
    if (status) {
      status.querySelector('.status-text').textContent = message;
      status.classList.add('active');
      setTimeout(() => status.classList.remove('active'), 2000);
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#sound-panel-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'sound-panel-styles';
    styles.textContent = `
      /* 声音面板容器 */
      .zootopia-sound-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: none;
      }

      .zootopia-sound-panel.active {
        display: block;
      }

      .sound-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        animation: backdropFadeIn 0.3s ease;
      }

      .sound-container {
        position: relative;
        width: 90vw;
        height: 90vh;
        margin: 5vh auto;
        background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
        border-radius: 20px;
        overflow: hidden;
      }

      /* 面板头部 */
      .sound-header {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .sound-logo {
        font-size: 36px;
        animation: logoPulse 2s ease infinite;
      }

      @keyframes logoPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .sound-title {
        flex: 1;
        font-size: 24px;
        font-weight: bold;
      }

      .sound-close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      /* 控制按钮 */
      .sound-controls {
        display: flex;
        gap: 15px;
        padding: 20px;
        justify-content: center;
      }

      .control-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px 30px;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .mute-btn {
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        color: white;
      }

      .bgm-btn {
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        color: white;
      }

      .control-btn:hover {
        transform: scale(1.05);
      }

      .btn-icon {
        font-size: 24px;
      }

      /* 声音区域 */
      .sound-sections {
        height: calc(90vh - 200px);
        overflow-y: auto;
        padding: 20px;
      }

      .sound-section {
        margin-bottom: 30px;
      }

      .section-title {
        font-size: 20px;
        font-weight: bold;
        color: white;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }

      /* 角色网格 */
      .character-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }

      .character-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 15px;
        text-align: center;
      }

      .character-emoji {
        font-size: 48px;
        margin-bottom: 10px;
      }

      .character-name {
        font-size: 16px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
      }

      .sound-list {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: center;
      }

      .sound-play-btn {
        padding: 6px 12px;
        background: rgba(52, 152, 219, 0.3);
        border: 1px solid #3498DB;
        border-radius: 15px;
        color: white;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .sound-play-btn:hover {
        background: rgba(52, 152, 219, 0.5);
        transform: scale(1.05);
      }

      /* 音效和音乐网格 */
      .effect-grid, .bgm-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
      }

      .effect-btn, .bgm-style-btn {
        padding: 15px;
        background: rgba(155, 89, 182, 0.3);
        border: 2px solid #9B59B6;
        border-radius: 15px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: capitalize;
      }

      .effect-btn:hover, .bgm-style-btn:hover {
        background: rgba(155, 89, 182, 0.5);
        transform: translateY(-3px);
      }

      .bgm-style-btn.playing {
        background: rgba(46, 204, 113, 0.5);
        border-color: #2ECC71;
      }

      /* 状态栏 */
      .sound-status {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 20px;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .sound-status.active {
        opacity: 1;
      }

      /* 切换按钮 */
      .sound-toggle {
        position: fixed;
        bottom: 230px;
        left: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3498DB, #2980B9);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .sound-toggle:hover {
        transform: scale(1.1);
      }

      .sound-toggle.muted {
        background: linear-gradient(135deg, #95A5A6, #7F8C8D);
      }

      .toggle-icon {
        font-size: 28px;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .sound-container {
          width: 95vw;
          height: 95vh;
        }

        .character-grid {
          grid-template-columns: 1fr;
        }

        .sound-toggle {
          bottom: 310px;
          left: 15px;
          width: 50px;
          height: 50px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化声音面板
  function initSoundPanel() {
    injectStyles();

    const panel = createSoundPanel();
    document.body.appendChild(panel);

    // 切换按钮
    document.getElementById('soundToggle').onclick = () => {
      panel.classList.add('active');
      // 确保语音合成已加载
      speechSynthesis.getVoices();
    };

    // 关闭按钮
    document.querySelector('.sound-close').onclick = () => {
      panel.classList.remove('active');
    };

    // 静音按钮
    document.getElementById('muteBtn').onclick = () => {
      isMuted = !isMuted;
      const btn = document.getElementById('muteBtn');
      btn.querySelector('.btn-icon').textContent = isMuted ? '🔇' : '🔊';
      btn.querySelector('.btn-text').textContent = isMuted ? '取消静音' : '静音';
      document.getElementById('soundToggle').classList.toggle('muted', isMuted);

      if (isMuted) {
        speechSynthesis.cancel();
        stopBGM();
      }

      showStatus(isMuted ? '已静音' : '已取消静音');
    };

    // BGM按钮
    document.getElementById('bgmBtn').onclick = () => {
      if (currentBGM) {
        stopBGM();
        showStatus('BGM已停止');
      } else {
        playBGM('bright');
        showStatus('正在播放BGM');
      }
    };

    // 角色语音按钮
    panel.querySelectorAll('.sound-play-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const character = btn.dataset.character;
        const sound = btn.dataset.sound;
        playCharacterVoice(character, sound);
        showStatus(`播放: ${characterSounds[character].name} - ${sound}`);
      });
    });

    // 音效按钮
    panel.querySelectorAll('.effect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const effect = btn.dataset.effect;
        playSoundEffect(effect);
        showStatus(`播放音效: ${effect}`);
      });
    });

    // BGM风格按钮
    panel.querySelectorAll('.bgm-style-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const style = btn.dataset.style;
        panel.querySelectorAll('.bgm-style-btn').forEach(b => b.classList.remove('playing'));
        btn.classList.add('playing');
        playBGM(style);
        showStatus(`播放BGM: ${style}`);
      });
    });

    // 加载语音列表
    speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices();
    };
  }

  // 导出全局函数
  window.zootopiaSounds = {
    speak: speakText,
    play: playSoundEffect,
    voice: playCharacterVoice,
    bgm: playBGM,
    stopBGM: stopBGM,
    mute: () => { isMuted = true; },
    unmute: () => { isMuted = false; }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSoundPanel);
  } else {
    initSoundPanel();
  }
})();
