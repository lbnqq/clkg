/**
 * 疯狂动物城主题 - 角色声音模拟器
 * Zootopia Theme - Character Voice Simulator
 | 模拟角色的声音特征，添加趣味音效
 */

(function() {
  'use strict';

  // 角色声音特征配置
  const characterVoices = {
    judy: {
      name: 'Judy Hopps',
      emoji: '🐰',
      pitch: 1.2,      // 高音调
      speed: 1.3,      // 快速
      energy: 'high',   // 充满活力
      phrases: ['Try Everything!', 'Anyone can be anything!', '我准备好了！', '加油加油！']
    },
    nick: {
      name: 'Nick Wilde',
      emoji: '🦊',
      pitch: 0.8,      // 低音调
      speed: 0.9,      // 悠闲
      energy: 'relaxed', // 悠闲自在
      phrases: ['It\'s called a hustle, sweetheart.', '听我说，甜心...', '我有个好主意', '这叫生意']
    },
    flash: {
      name: 'Flash',
      emoji: '🐢',
      pitch: 0.6,      // 很低
      speed: 0.3,      // 很慢
      energy: 'slow',    // 缓慢
      phrases: ['我........................很........................高兴', '你........................好', '谢............................谢']
    },
    bogo: {
      name: 'Chief Bogo',
      emoji: '🦁',
      pitch: 0.7,      // 低沉
      speed: 0.7,      // 稳重
      energy: 'serious', // 严肃
      phrases: ['效率！', '48小时！', '这是命令！', '不要让我失望']
    },
    gazelle: {
      name: 'Gazelle',
      emoji: '🦌',
      pitch: 1.1,      // 中高音
      speed: 1.0,      // 正常
      energy: 'energetic', // 充满活力
      phrases: ['Try Everything!', '大家一起来吧！', '音乐是世界的通用语言！', '跳舞吧！']
    },
    finnick: {
      name: 'Finnick',
      emoji: '🦊',
      pitch: 0.9,      // 中低
      speed: 1.1,      // 较快
      energy: 'feisty',  // 脾气
      phrases: ['你叫谁宝宝？！', '哼！', '别小看我！', '这是我的车！']
    }
  };

  // 创建声音模拟器UI
  function createVoiceSimulator() {
    const simulator = document.createElement('div');
    simulator.className = 'voice-simulator';
    simulator.innerHTML = `
      <button class="voice-toggle" title="角色声音模拟器">
        <span class="toggle-icon">🎙️</span>
      </button>
      <div class="voice-panel">
        <div class="panel-header">
          <h3>🎙️ 动物城角色声音模拟器</h3>
          <button class="panel-close">×</button>
        </div>

        <div class="voice-character-list">
          ${Object.values(characterVoices).map(char => `
            <div class="voice-character" data-character="${char.name}" style="border-color: ${getCharacterColor(char.name)}">
              <div class="char-emoji">${char.emoji}</div>
              <div class="char-info">
                <div class="char-name">${char.name}</div>
                <div class="char-voice-type">${getVoiceTypeText(char)}</div>
              </div>
              <div class="char-controls">
                <button class="voice-play-btn" onclick="playCharacterVoice('${char.name}')" title="播放">
                  ▶️
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="voice-quick-phrase">
          <h4>💬 快速台词</h4>
          <div class="phrase-grid">
            ${Object.values(characterVoices).map(char =>
              char.phrases.map(phrase => `
                <button class="phrase-btn" onclick="speakPhrase('${char.name}', '${phrase.replace(/'/g, "\\'")}')">
                  ${char.emoji} ${phrase}
                </button>
              `).join('')
            ).join('')}
          </div>
        </div>
      </div>
    `;

    return simulator;
  }

  // 获取角色颜色
  function getCharacterColor(name) {
    const colors = {
      'Judy Hopps': '#A17F68',
      'Nick Wilde': '#E67E22',
      'Flash': '#27AE60',
      'Chief Bogo': '#2C3E50',
      'Gazelle': '#FF9F43',
      'Finnick': '#C0392B'
    };
    return colors[name] || '#636E72';
  }

  // 获取声音类型描述
  function getVoiceTypeText(char) {
    const types = {
      'Judy Hopps': '高音调 | 快速 | 活力',
      'Nick Wilde': '低音调 | 悠慢 | 自在',
      'Flash': '极低音 | 极慢 | 缓慢',
      'Chief Bogo': '低沉 | 稳重 | 严肃',
      'Gazelle': '中高音 | 正常 | 活力',
      'Finnick': '中低音 | 较快 | 脾气'
    };
    return types[char.name] || '';
  }

  // 播放角色声音
  function playCharacterVoice(characterName) {
    const character = characterVoices[characterName.replace(/\s/g, '')];
    if (!character) return;

    // 播放音效（使用Web Audio API）
    playCharacterSound(character);

    // 显示声音提示
    showVoiceIndicator(character);
  }

  // 使用Web Audio API播放模拟声音
  function playCharacterSound(character) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();

      // 创建振荡器
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // 设置频率（模拟音调）
      oscillator.frequency.value = getFrequency(character.pitch);
      oscillator.type = 'sine';

      // 设置音量
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);

      // 播放
      oscillator.start(ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      // 停止
      setTimeout(() => {
        oscillator.stop(ctx.currentTime + 0.1);
      }, 300);

    } catch (e) {
      console.log('音频API不支持，使用文字提示代替');
    }
  }

  // 获取频率
  function getFrequency(pitch) {
    const baseFreq = 440; // A4
    return baseFreq * pitch;
  }

  // 说话功能
  function speakPhrase(characterName, phrase) {
    // 使用Web Speech API
    if ('speechSynthesis' in window) {
      const character = characterVoices[characterName.replace(/\s/g, '')];
      if (!character) return;

      const utterance = new SpeechSynthesisUtterance(phrase);

      // 设置语音参数
      utterance.rate = character.speed;
      utterance.pitch = character.pitch;
      utterance.volume = 1;

      // 尝试选择合适的语音
      const voices = speechSynthesis.getVoices();
      // 优先选择中文语音
      const zhVoice = voices.find(v => v.lang.includes('zh'));
      if (zhVoice) utterance.voice = zhVoice;

      speechSynthesis.speak(utterance);
    }

    // 同时显示文字气泡
    showSpeechBubble(characterName, phrase);
  }

  // 显示声音指示器
  function showVoiceIndicator(character) {
    const existingIndicator = document.querySelector('.voice-playing-indicator');
    if (existingIndicator) existingIndicator.remove();

    const indicator = document.createElement('div');
    indicator.className = 'voice-playing-indicator';
    indicator.innerHTML = `
      <span class="voice-indicator-emoji">${character.emoji}</span>
      <span class="voice-indicator-wave">🔊</span>
    `;

    indicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${getCharacterColor(character.name)};
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10008;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: bold;
      animation: voicePop 0.5s ease forwards;
    `;

    document.body.appendChild(indicator);

    setTimeout(() => {
      indicator.style.animation = 'voiceFadeOut 0.5s ease forwards';
      setTimeout(() => indicator.remove(), 500);
    }, 1000);
  }

  // 显示语音气泡
  function showSpeechBubble(characterName, text) {
    const existingBubble = document.querySelector('.voice-speech-bubble');
    if (existingBubble) existingBubble.remove();

    const character = characterVoices[characterName.replace(/\s/g, '')];
    if (!character) return;

    const bubble = document.createElement('div');
    bubble.className = 'voice-speech-bubble';
    bubble.innerHTML = `
      <span class="bubble-emoji">${character.emoji}</span>
      <span class="bubble-text">${text}</span>
    `;

    bubble.style.cssText = `
      position: fixed;
      bottom: 30%;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border: 3px solid ${getCharacterColor(character.name)};
      border-radius: 20px;
      padding: 15px 25px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10007;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      animation: bubbleUp 0.5s ease forwards;
    `;

    document.body.appendChild(bubble);

    setTimeout(() => {
      bubble.style.animation = 'bubbleFadeOut 0.5s ease forwards';
      setTimeout(() => bubble.remove(), 500);
    }, 2000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#voice-simulator-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'voice-simulator-styles';
    styles.textContent = `
      /* 声音模拟器 */
      .voice-simulator {
        position: fixed;
        bottom: 660px;
        left: 30px;
        z-index: 9995;
      }

      .voice-toggle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        border: none;
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .voice-toggle:hover {
        transform: scale(1.1) rotate(-5deg);
        box-shadow: 0 6px 20px rgba(231, 76, 60, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
      }

      .voice-panel {
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 380px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: panelSlideUp 0.3s ease;
        max-height: 80vh;
        overflow-y: auto;
      }

      .voice-panel.show {
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

      .panel-header {
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px 20px 0 0;
      }

      .panel-header h3 {
        margin: 0;
        font-size: 16px;
      }

      .panel-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.8;
      }

      .panel-close:hover {
        opacity: 1;
      }

      .voice-character-list {
        padding: 15px;
      }

      .voice-character {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        margin-bottom: 10px;
        background: rgba(231, 76, 60, 0.05);
        border: 2px solid transparent;
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .voice-character:hover {
        background: rgba(231, 76, 60, 0.1);
        border-color: #E74C3C;
        transform: translateX(5px);
      }

      .char-emoji {
        font-size: 32px;
      }

      .char-info {
        flex: 1;
      }

      .char-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 2px;
      }

      .char-voice-type {
        font-size: 11px;
        color: #636E72;
      }

      .char-controls {
        display: flex;
        gap: 8px;
      }

      .voice-play-btn {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: linear-gradient(135deg, #E74C3C, #C0392B);
        border: none;
        color: white;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .voice-play-btn:hover {
        transform: scale(1.1);
      }

      /* 快速台词 */
      .voice-quick-phrase {
        padding: 0 15px 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .voice-quick-phrase h4 {
        margin: 15px 0 10px 0;
        font-size: 14px;
        color: #2D3436;
      }

      .phrase-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      .phrase-btn {
        padding: 8px 12px;
        background: rgba(231, 76, 60, 0.1);
        border: 1px solid rgba(231, 76, 60, 0.3);
        border-radius: 8px;
        font-size: 11px;
        color: #2D3436;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
      }

      .phrase-btn:hover {
        background: rgba(231, 76, 60, 0.2);
        transform: scale(1.05);
      }

      /* 动画 */
      @keyframes voicePop {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes voiceFadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }

      @keyframes bubbleUp {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      @keyframes bubbleFadeOut {
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .voice-panel {
          width: calc(100vw - 80px);
        }

        .phrase-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化声音模拟器
  function initVoiceSimulator() {
    injectStyles();

    const simulator = createVoiceSimulator();
    document.body.appendChild(simulator);

    // 切换面板
    const toggle = simulator.querySelector('.voice-toggle');
    const panel = simulator.querySelector('.voice-panel');

    toggle.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    };

    // 关闭按钮
    simulator.querySelector('.panel-close').onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!simulator.contains(e.target)) {
        panel.classList.remove('show');
      }
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoiceSimulator);
  } else {
    initVoiceSimulator();
  }

  // 导出全局函数
  window.playCharacterVoice = playCharacterVoice;
  window.speakPhrase = speakPhrase;
})();
