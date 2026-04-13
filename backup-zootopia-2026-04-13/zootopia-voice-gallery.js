/**
 * 疯狂动物城主题 - 角色声音画廊
 * Zootopia Theme - Character Voice Gallery
 * | 角色语音和台词收藏
 */

(function() {
  'use strict';

  // 角色声音数据库
  const characterVoices = {
    judy: {
      name: '朱迪·霍普斯',
      emoji: '🐰',
      color: '#FF9F43',
      personality: '乐观、勇敢、坚持不懈',
      voice: {
        pitch: 1.4,
        rate: 1.2,
        tone: 'cheerful'
      },
      quotes: [
        { text: '试试everything!', mood: 'excited' },
        { text: '我是朱迪，来自兔子洞！', mood: 'happy' },
        { text: '只要有梦想，什么都有可能！', mood: 'inspired' },
        { text: '我们不放弃！', mood: 'determined' },
        { text: '你好呀，新朋友！', mood: 'friendly' },
        { text: '警察工作，让我来完成！', mood: 'confident' },
        { text: '胡萝卜是最好的！', mood: 'happy' },
        { text: '我会证明他们都错了！', mood: 'determined' }
      ],
      sounds: [
        { name: '快乐哼唱', url: '/audio/judy-hum.mp3' },
        { name: '兴奋叫声', url: '/audio/judy-excited.mp3' }
      ]
    },

    nick: {
      name: '尼克·王尔德',
      emoji: '🦊',
      color: '#E67E22',
      personality: '机智、狡猾、内心善良',
      voice: {
        pitch: 0.9,
        rate: 1.0,
        tone: 'sly'
      },
      quotes: [
        { text: '嘿，你这兔子...还挺有意思的。', mood: 'charming' },
        { text: '你永远不会知道下一秒会发生什么。', mood: 'mysterious' },
        { text: '这就是我的风格。', mood: 'confident' },
        { text: '让我给你展示一下真正的方法。', mood: 'sly' },
        { text: '聪明人从不会吃亏。', mood: 'smart' },
        { text: '当然，我也曾经梦想过...', mood: 'nostalgic' },
        { text: '有时候你只需要相信自己。', mood: 'sincere' },
        { text: 'Pawpsicle，要一根吗？', mood: 'casual' }
      ],
      sounds: [
        { name: '狡黠笑声', url: '/audio/nick-chuckle.mp3' },
        { name: '得意口哨', url: '/audio/nick-whistle.mp3' }
      ]
    },

    flash: {
      name: '闪电',
      emoji: '🐢',
      color: '#27AE60',
      personality: '慢吞吞、高效（相对）',
      voice: {
        pitch: 0.6,
        rate: 0.4,
        tone: 'slow'
      },
      quotes: [
        { text: '你...好...欢...迎...', mood: 'slow' },
        { text: '请...稍...等...', mood: 'patient' },
        { text: '我...马...上...', mood: 'working' },
        { text: '今...天...天...气...不...错...', mood: 'casual' },
        { text: '谢...谢...', mood: 'polite' },
        { text: '这...就...是...我...', mood: 'slow' },
        { text: '已...经...完...成...', mood: 'accomplished' },
        { text: '再...见...', mood: 'slow' }
      ],
      sounds: [
        { name: '缓慢呼吸', url: '/audio/flash-breath.mp3' },
        { name: '打字声', url: '/audio/flash-typing.mp3' }
      ]
    },

    chief: {
      name: '博戈局长',
      emoji: '🦁',
      color: '#8E44AD',
      personality: '严肃、权威、高效',
      voice: {
        pitch: 0.7,
        rate: 1.1,
        tone: 'authoritative'
      },
      quotes: [
        { text: '效率！效率！效率！', mood: 'stern' },
        { text: '世界并不像你想象的那么美好。', mood: 'serious' },
        { text: '给我结果！', mood: 'demanding' },
        { text: '霍普斯警官，报告情况！', mood: 'commanding' },
        { text: '这是警察局，不是游乐场。', mood: 'stern' },
        { text: '很好，继续。', mood: 'approving' },
        { text: '我要看到实际行动！', mood: 'demanding' },
        { text: '案件破了吗？', mood: 'serious' }
      ],
      sounds: [
        { name: '严肃咳嗽', url: '/audio/chief-cough.mp3' },
        { name: '权威声音', url: '/audio/chief-authority.mp3' }
      ]
    },

    gazelle: {
      name: 'Gazelle瞪羚',
      emoji: '🦌',
      color: '#E91E63',
      personality: '优雅、热情、充满活力',
      voice: {
        pitch: 1.3,
        rate: 1.1,
        tone: 'melodic'
      },
      quotes: [
        { text: 'Try Everything!', mood: 'singing' },
        { text: '欢迎来到我的演唱会！', mood: 'excited' },
        { text: '让我们一起跳舞吧！', mood: 'happy' },
        { text: '音乐让世界更美好！', mood: 'inspired' },
        { text: 'Try~ Everything~', mood: 'singing' },
        { text: '感谢大家！', mood: 'grateful' },
        { text: '动物城是最棒的！', mood: 'proud' },
        { text: '爱你们每一个人！', mood: 'loving' }
      ],
      sounds: [
        { name: '歌声片段', url: '/audio/gazelle-sing.mp3' },
        { name: '欢呼声', url: '/audio/gazelle-cheer.mp3' }
      ]
    },

    bellwether: {
      name: '绵羊副市长',
      emoji: '🐑',
      color: '#95A5A6',
      personality: '表面温和、内心复杂',
      voice: {
        pitch: 1.1,
        rate: 1.0,
        tone: 'sweet'
      },
      quotes: [
        { text: '哦，你真是太好了！', mood: 'sweet' },
        { text: '我会帮助你的。', mood: 'helpful' },
        { text: '小动物要团结起来。', mood: 'motivational' },
        { text: '这...这不对！', mood: 'worried' },
        { text: '我们被忽视了太久了。', mood: 'serious' },
        { text: '是时候改变了。', mood: 'determined' },
        { text: '相信我，我会处理好的。', mood: 'reassuring' },
        { text: '这就是我们的机会。', mood: 'opportunistic' }
      ],
      sounds: [
        { name: '温和笑声', url: '/audio/bellwether-laugh.mp3' },
        { name: '担忧叹息', url: '/audio/bellwether-sigh.mp3' }
      ]
    },

    big: {
      name: '大先生',
      emoji: '🐀',
      color: '#2C3E50',
      personality: '威严、家族观念强',
      voice: {
        pitch: 0.5,
        rate: 0.8,
        tone: 'deep'
      },
      quotes: [
        { text: '坐...', mood: 'commanding' },
        { text: '你救了我女儿的生命。', mood: 'grateful' },
        { text: '现在，我们是家人了。', mood: 'family' },
        { text: '在这冰原区，我就是法律。', mood: 'powerful' },
        { text: '冰棍是我的生意。', mood: 'business' },
        { text: '你要什么？尽管说。', mood: 'generous' },
        { text: '家族的恩情要报答。', mood: 'honorable' },
        { text: '去...做你该做的事。', mood: 'authoritative' }
      ],
      sounds: [
        { name: '深沉呼吸', url: '/audio/big-breath.mp3' },
        { name: '权威声音', url: '/audio/big-speak.mp3' }
      ]
    },

    clawhauser: {
      name: '本杰明警官',
      emoji: '🐆',
      color: '#3498DB',
      personality: '热情、Gazelle粉丝、友好',
      voice: {
        pitch: 1.2,
        rate: 1.3,
        tone: 'excited'
      },
      quotes: [
        { text: 'Gazelle！她是最棒的！', mood: 'fan' },
        { text: '欢迎来到ZPD！', mood: 'friendly' },
        { text: '你有她的新歌吗？', mood: 'excited' },
        { text: '我喜欢这只老虎玩偶！', mood: 'happy' },
        { text: '要不要来点甜甜圈？', mood: 'casual' },
        { text: '天啊，Gazelle发新歌了！', mood: 'excited' },
        { text: '我们需要更多咖啡！', mood: 'casual' },
        { text: '你喜欢我的毛绒玩具吗？', mood: 'proud' }
      ],
      sounds: [
        { name: '兴奋欢呼', url: '/audio/clawhauser-cheer.mp3' },
        { name: '友好笑声', url: '/audio/clawhauser-laugh.mp3' }
      ]
    }
  };

  // 当前状态
  let currentCharacter = null;
  let isSpeaking = false;
  let speechQueue = [];

  // 创建声音画廊
  function createVoiceGallery() {
    const gallery = document.createElement('div');
    gallery.className = 'zootopia-voice-gallery';
    gallery.innerHTML = `
      <div class="voice-gallery-toggle" id="voiceGalleryToggle">
        <span class="toggle-icon">🎙️</span>
        <span class="toggle-text">声音画廊</span>
      </div>

      <div class="voice-gallery-panel" id="voiceGalleryPanel">
        <div class="gallery-header">
          <div class="header-title">
            <span class="title-icon">🎬</span>
            <span class="title-text">疯狂动物城声音画廊</span>
          </div>
          <button class="close-btn" id="closeGalleryBtn">×</button>
        </div>

        <div class="gallery-content">
          <!-- 角色选择 -->
          <div class="character-selector">
            <div class="selector-title">选择角色</div>
            <div class="character-grid" id="characterGrid"></div>
          </div>

          <!-- 当前角色信息 -->
          <div class="character-showcase" id="characterShowcase">
            <div class="showcase-placeholder">
              <span class="placeholder-icon">👆</span>
              <span class="placeholder-text">选择一个角色开始</span>
            </div>
          </div>

          <!-- 语音控制 -->
          <div class="voice-controls" id="voiceControls" style="display: none;">
            <div class="quotes-section">
              <div class="section-title">
                <span>💬 台词库</span>
              </div>
              <div class="quotes-list" id="quotesList"></div>
            </div>

            <div class="voice-settings">
              <div class="section-title">
                <span>🎛️ 语音设置</span>
              </div>
              <div class="setting-row">
                <label>语调</label>
                <input type="range" id="pitchControl" min="0.5" max="2" step="0.1" value="1">
                <span id="pitchValue">1.0</span>
              </div>
              <div class="setting-row">
                <label>语速</label>
                <input type="range" id="rateControl" min="0.5" max="2" step="0.1" value="1">
                <span id="rateValue">1.0</span>
              </div>
              <div class="setting-row">
                <label>音量</label>
                <input type="range" id="volumeControl" min="0" max="1" step="0.1" value="1">
                <span id="volumeValue">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return gallery;
  }

  // 渲染角色网格
  function renderCharacterGrid() {
    const grid = document.getElementById('characterGrid');
    if (!grid) return;

    grid.innerHTML = Object.entries(characterVoices).map(([key, char]) => `
      <div class="character-card" data-character="${key}">
        <div class="card-emoji">${char.emoji}</div>
        <div class="card-name">${char.name}</div>
        <div class="card-personality">${char.personality}</div>
      </div>
    `).join('');

    // 添加点击事件
    grid.querySelectorAll('.character-card').forEach(card => {
      card.onclick = () => {
        const charKey = card.dataset.character;
        selectCharacter(charKey);
      };
    });
  }

  // 选择角色
  function selectCharacter(charKey) {
    currentCharacter = characterVoices[charKey];
    const showcase = document.getElementById('characterShowcase');
    const controls = document.getElementById('voiceControls');

    showcase.innerHTML = `
      <div class="character-avatar" style="background: ${currentCharacter.color};">
        <span class="avatar-emoji">${currentCharacter.emoji}</span>
      </div>
      <div class="character-info">
        <div class="character-name">${currentCharacter.name}</div>
        <div class="character-personality">${currentCharacter.personality}</div>
      </div>
      <div class="voice-preview">
        <button class="preview-btn" id="previewVoiceBtn">
          <span class="btn-icon">🔊</span>
          <span class="btn-text">试听语音</span>
        </button>
      </div>
    `;

    controls.style.display = 'block';
    renderQuotes();
    updateVoiceControls();

    // 试听按钮
    document.getElementById('previewVoiceBtn').onclick = () => {
      speakQuote(currentCharacter.quotes[0].text);
    };
  }

  // 渲染台词列表
  function renderQuotes() {
    const list = document.getElementById('quotesList');
    if (!list || !currentCharacter) return;

    list.innerHTML = currentCharacter.quotes.map((quote, index) => `
      <div class="quote-item" data-index="${index}">
        <div class="quote-mood">${getMoodEmoji(quote.mood)}</div>
        <div class="quote-text">${quote.text}</div>
        <button class="play-quote-btn">
          <span>▶️</span>
        </button>
      </div>
    `).join('');

    // 添加播放事件
    list.querySelectorAll('.play-quote-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const index = btn.parentElement.dataset.index;
        const quote = currentCharacter.quotes[index];
        speakQuote(quote.text);
      };
    });
  }

  // 获取情绪表情
  function getMoodEmoji(mood) {
    const moodEmojis = {
      excited: '😄',
      happy: '😊',
      inspired: '✨',
      determined: '💪',
      friendly: '🤗',
      confident: '😎',
      charming: '😏',
      mysterious: '🤔',
      sly: '🦊',
      smart: '🧠',
      nostalgic: '😌',
      sincere: '💙',
      casual: '😌',
      slow: '🐌',
      patient: '😌',
      working: '💼',
      polite: '🙏',
      accomplished: '😊',
      stern: '😠',
      serious: '😐',
      demanding: '📋',
      commanding: '👮',
      approving: '👍',
      singing: '🎤',
      grateful: '🙏',
      proud: '😊',
      loving: '❤️',
      sweet: '🍯',
      helpful: '🤝',
      worried: '😰',
      powerful: '💪',
      business: '💼',
      generous: '🎁',
      honorable: '🏅',
      authoritative: '👑',
      fan: '⭐',
      proud: '😊'
    };
    return moodEmojis[mood] || '💬';
  }

  // 更新语音控制
  function updateVoiceControls() {
    if (!currentCharacter) return;

    document.getElementById('pitchControl').value = currentCharacter.voice.pitch;
    document.getElementById('pitchValue').textContent = currentCharacter.voice.pitch.toFixed(1);
    document.getElementById('rateControl').value = currentCharacter.voice.rate;
    document.getElementById('rateValue').textContent = currentCharacter.voice.rate.toFixed(1);
  }

  // 语音合成
  function speakQuote(text) {
    if (!window.speechSynthesis) {
      alert('抱歉，您的浏览器不支持语音合成功能。');
      return;
    }

    // 停止当前语音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // 应用角色语音设置
    if (currentCharacter) {
      utterance.pitch = currentCharacter.voice.pitch;
      utterance.rate = currentCharacter.voice.rate;
    }

    // 应用用户自定义设置
    const pitch = parseFloat(document.getElementById('pitchControl').value);
    const rate = parseFloat(document.getElementById('rateControl').value);
    const volume = parseFloat(document.getElementById('volumeControl').value);

    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    // 尝试选择中文语音
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(voice => voice.lang.includes('zh'));
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    // 显示说话状态
    isSpeaking = true;
    updateSpeakingStatus();

    utterance.onend = () => {
      isSpeaking = false;
      updateSpeakingStatus();
    };

    utterance.onerror = () => {
      isSpeaking = false;
      updateSpeakingStatus();
    };

    window.speechSynthesis.speak(utterance);
  }

  // 更新说话状态
  function updateSpeakingStatus() {
    const btns = document.querySelectorAll('.play-quote-btn');
    btns.forEach(btn => {
      if (isSpeaking) {
        btn.disabled = true;
        btn.innerHTML = '<span>🔊</span>';
      } else {
        btn.disabled = false;
        btn.innerHTML = '<span>▶️</span>';
      }
    });
  }

  // 切换面板
  function togglePanel() {
    const panel = document.querySelector('.zootopia-voice-gallery');
    const content = document.getElementById('voiceGalleryPanel');

    panel.classList.toggle('open');
    content.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#voice-gallery-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'voice-gallery-styles';
    styles.textContent = `
      /* 声音画廊容器 */
      .zootopia-voice-gallery {
        position: fixed;
        bottom: 80px;
        left: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .voice-gallery-toggle {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
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

      .voice-gallery-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(233, 30, 99, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: micPulse 2s ease infinite;
      }

      @keyframes micPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 16px;
      }

      /* 面板 */
      .voice-gallery-panel {
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 450px;
        max-height: 700px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }

      .voice-gallery-panel.visible {
        display: flex;
        animation: panelSlideIn 0.3s ease;
      }

      @keyframes panelSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 面板头部 */
      .gallery-header {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .title-icon {
        font-size: 28px;
      }

      .title-text {
        font-size: 18px;
        font-weight: bold;
      }

      .close-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .close-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* 面板内容 */
      .gallery-content {
        padding: 20px;
        max-height: 600px;
        overflow-y: auto;
      }

      /* 角色选择器 */
      .character-selector {
        margin-bottom: 20px;
      }

      .selector-title {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 15px;
      }

      .character-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }

      .character-card {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 12px 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .character-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .card-emoji {
        font-size: 32px;
        margin-bottom: 5px;
      }

      .card-name {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .card-personality {
        font-size: 10px;
        color: #636E72;
      }

      /* 角色展示 */
      .character-showcase {
        background: linear-gradient(135deg, #F8F9FA, #E9ECEF);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 20px;
        text-align: center;
      }

      .showcase-placeholder {
        padding: 40px 20px;
        color: #95A5A6;
      }

      .placeholder-icon {
        font-size: 48px;
        display: block;
        margin-bottom: 10px;
      }

      .placeholder-text {
        font-size: 14px;
      }

      .character-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .avatar-emoji {
        font-size: 48px;
      }

      .character-name {
        font-size: 20px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .character-personality {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 15px;
      }

      .preview-btn {
        background: linear-gradient(135deg, #E91E63, #9C27B0);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 10px 25px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
      }

      .preview-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);
      }

      /* 语音控制 */
      .voice-controls {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .section-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      /* 台词列表 */
      .quotes-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 200px;
        overflow-y: auto;
      }

      .quote-item {
        background: #F8F9FA;
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .quote-item:hover {
        background: #E9ECEF;
        transform: translateX(5px);
      }

      .quote-mood {
        font-size: 20px;
        flex-shrink: 0;
      }

      .quote-text {
        flex: 1;
        font-size: 13px;
        color: #2D3436;
      }

      .play-quote-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: white;
        border: 1px solid #DDD;
        cursor: pointer;
        flex-shrink: 0;
        transition: all 0.3s ease;
      }

      .play-quote-btn:hover:not(:disabled) {
        background: #E91E63;
        border-color: #E91E63;
      }

      .play-quote-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* 语音设置 */
      .voice-settings {
        background: #F8F9FA;
        border-radius: 12px;
        padding: 15px;
      }

      .setting-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }

      .setting-row:last-child {
        margin-bottom: 0;
      }

      .setting-row label {
        font-size: 12px;
        font-weight: bold;
        color: #636E72;
        min-width: 50px;
      }

      .setting-row input[type="range"] {
        flex: 1;
        height: 6px;
        -webkit-appearance: none;
        background: #DDD;
        border-radius: 3px;
        outline: none;
      }

      .setting-row input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: #E91E63;
        border-radius: 50%;
        cursor: pointer;
      }

      .setting-row span {
        font-size: 12px;
        color: #636E72;
        min-width: 45px;
        text-align: right;
      }

      /* 滚动条样式 */
      .gallery-content::-webkit-scrollbar,
      .quotes-list::-webkit-scrollbar {
        width: 6px;
      }

      .gallery-content::-webkit-scrollbar-track,
      .quotes-list::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .gallery-content::-webkit-scrollbar-thumb,
      .quotes-list::-webkit-scrollbar-thumb {
        background: #E91E63;
        border-radius: 3px;
      }

      /* 响应式 */
      @media (max-width: 520px) {
        .zootopia-voice-gallery {
          left: 10px;
          bottom: 70px;
        }

        .voice-gallery-panel {
          width: calc(100vw - 20px);
          max-width: 400px;
        }

        .character-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initVoiceGallery() {
    injectStyles();

    const gallery = createVoiceGallery();
    document.body.appendChild(gallery);

    // 切换按钮
    document.getElementById('voiceGalleryToggle').onclick = togglePanel;
    document.getElementById('closeGalleryBtn').onclick = togglePanel;

    // 渲染角色网格
    renderCharacterGrid();

    // 语音控制事件
    document.getElementById('pitchControl').oninput = (e) => {
      document.getElementById('pitchValue').textContent = parseFloat(e.target.value).toFixed(1);
    };

    document.getElementById('rateControl').oninput = (e) => {
      document.getElementById('rateValue').textContent = parseFloat(e.target.value).toFixed(1);
    };

    document.getElementById('volumeControl').oninput = (e) => {
      document.getElementById('volumeValue').textContent = Math.round(e.target.value * 100) + '%';
    };

    // 加载语音列表
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        // 语音列表加载完成
      };
    }
  }

  // 导出全局函数
  window.zootopiaVoiceGallery = {
    show: () => {
      const panel = document.querySelector('.zootopia-voice-gallery');
      if (panel && !panel.classList.contains('open')) {
        togglePanel();
      }
    },
    hide: () => {
      const panel = document.querySelector('.zootopia-voice-gallery');
      if (panel && panel.classList.contains('open')) {
        togglePanel();
      }
    },
    speak: (text) => {
      speakQuote(text);
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVoiceGallery);
  } else {
    initVoiceGallery();
  }
})();
