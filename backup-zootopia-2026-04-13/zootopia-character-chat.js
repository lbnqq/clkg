/**
 * 疯狂动物城主题 - 角色互动对话系统
 * Zootopia Theme - Character Interactive Chat System
 * | 与动物城角色进行实时对话互动
 */

(function() {
  'use strict';

  // 角色对话配置
  const characters = {
    judy: {
      name: '朱迪·霍普斯',
      nameEn: 'Judy Hopps',
      avatar: '🐰',
      color: '#A17F68',
      personality: 'optimistic',
      greeting: '嘿！欢迎来到动物城！我是朱迪，有什么可以帮你的吗？',
      dialogues: {
        default: [
          '任何事情都是可能的！这是我的座右铭。',
          '你知道吗？我是从兔子洞来到大城市的第一个警官！',
          '你想听个胡萝卜农场的笑话吗？',
          '不管多小的梦想，都值得追求！',
          'Nick和我是最好的搭档，虽然他有时候很烦人。',
          'ZPD的工作虽然辛苦，但我很热爱！',
          '你知道我每天要吃多少根胡萝卜吗？'
        ],
        happy: [
          '今天真是美好的一天！☀️',
          '看到这么多朋友聚在一起，真开心！',
          'Try Everything！这是我的人生信条！',
          '我妈妈一定会喜欢你！'
        ],
        encouraging: [
          '别放弃！你一定可以做到的！',
          '相信自己，就像我相信自己一样！',
          '每次失败都是向成功迈进一步！'
        ]
      }
    },
    nick: {
      name: '尼克·王尔德',
      nameEn: 'Nick Wilde',
      avatar: '🦊',
      color: '#E67E22',
      personality: 'sly',
      greeting: '哟，新手。叫我Nick就好。想学点"生意经"吗？',
      dialogues: {
        default: [
          '这叫hustle，甜心。',
          '生活就是个大型con game，你要学会玩。',
          '我卖过2000根Pawpsicle，一天之内。',
          'Judy？她就是个理想主义的兔子，不过...还挺可爱的。',
          '你知道狐狸的坏名声是怎么来的吗？',
          '我有我的原则...虽然不多。',
          '在这个城市，要么聪明，要么饿死。'
        ],
        sarcastic: [
          '哇，真是个"聪明"的主意...',
          '我见过更糟的...好吧，其实没有。',
          '如果你觉得这能行的话，谁会拦你呢？'
        ],
        friendly: [
          '嘿，今天心情不错啊。',
          '来根Pawpsicle吗？我可以给你打个折。',
          '你比看起来要聪明嘛。'
        ]
      }
    },
    flash: {
      name: '闪电',
      nameEn: 'Flash',
      avatar: '🐢',
      color: '#27AE60',
      personality: 'slow',
      greeting: '你........................好........................很........................高........................兴........................见........................到........................你',
      dialogues: {
        default: [
          '我........................不........................急........................你........................先........................说',
          '这........................是........................个........................好........................问........................题',
          '让........................我........................想........................想........................',
          '今........................天........................天........................气........................真........................好',
          '我........................很........................喜........................欢........................这........................个........................地........................方'
        ],
        excited: [
          '哇........................！........................太........................棒........................了',
          '这........................是........................我........................今........................天........................听........................到........................的........................最........................好........................的........................消........................息'
        ]
      }
    },
    chief: {
      name: '博戈局长',
      nameEn: 'Chief Bogo',
      avatar: '🦁',
      color: '#2C3E50',
      personality: 'serious',
      greeting: '效率。我现在只想看到效率。你有什么事？',
      dialogues: {
        default: [
          '48小时！我给你48小时破案！',
          '我不想听借口，我要结果。',
          'ZPD不是慈善机构。',
          '朱迪？她...还算是个合格的警官。',
          '迟到？在我的部门不允许迟到。',
          '交给你了。别让我失望。'
        ],
        strict: [
          '这是命令，不是建议。',
          '警徽代表责任，不是特权。',
          '全力以赴，或者离开。'
        ],
        approving: [
          '做得不错...继续保持。',
          '你今天的表现还算满意。',
          '也许...你真的有潜力。'
        ]
      }
    },
    gazelle: {
      name: '羚羊',
      nameEn: 'Gazelle',
      avatar: '🦌',
      color: '#FF9F43',
      personality: 'energetic',
      greeting: '嘿！欢迎来到我的演唱会！你想跟我一起跳舞吗？🎵',
      dialogues: {
        default: [
          'Try Everything！这是我们动物城的 anthem！',
          '音乐能连接所有的动物，你说是吗？',
          '我的粉丝们真是太棒了！',
          '跳舞让一切变得更美好！',
          '你听到了吗？那是最美的旋律！',
          '让我们一起狂欢吧！'
        ],
        inspiring: [
          '相信你的梦想，它们会实现的！',
          '每个人都可以成为英雄！',
          '用音乐改变世界！'
        ]
      }
    },
    bellwether: {
      name: '贝尔沃瑟',
      nameEn: 'Bellwether',
      avatar: '🐑',
      color: '#95A5A6',
      personality: 'deceptive',
      greeting: '哦，你好！我是副市长贝尔沃瑟。有什么我可以帮小市民的吗？😊',
      dialogues: {
        default: [
          '我们要让小动物们团结起来！',
          '狮子市长总是那么...忙。',
          '其实真正的工作都是我在做。',
          '你相信我们能够改变这个城市，对吗？',
          '团结就是力量！',
          '大家都这么信任我，我很感动。'
        ]
      }
    }
  };

  // 用户聊天历史
  let chatHistory = JSON.parse(localStorage.getItem('zootopiaChatHistory')) || {};
  let currentCharacter = 'judy';
  let chatCount = 0;

  // 创建聊天界面
  function createChatInterface() {
    const chat = document.createElement('div');
    chat.className = 'zootopia-character-chat';
    chat.innerHTML = `
      <button class="chat-toggle" title="角色对话">
        <span class="toggle-icon">💬</span>
        <span class="chat-badge">6</span>
      </button>
      <div class="chat-panel">
        <div class="chat-header">
          <div class="character-select">
            ${Object.values(characters).map(char => `
              <button class="character-option ${char.nameEn === 'Judy Hopps' ? 'active' : ''}"
                      data-character="${char.nameEn}"
                      style="--char-color: ${char.color}">
                <span class="char-avatar">${char.avatar}</span>
              </button>
            `).join('')}
          </div>
          <button class="chat-close">×</button>
        </div>

        <div class="chat-messages" id="chatMessages">
          <div class="message character-message">
            <div class="message-avatar">${characters.judy.avatar}</div>
            <div class="message-content">
              <div class="message-sender">朱迪·霍普斯</div>
              <div class="message-text">${characters.judy.greeting}</div>
              <div class="message-time">${getCurrentTime()}</div>
            </div>
          </div>
        </div>

        <div class="quick-replies" id="quickReplies">
          <button class="reply-btn" data-reply="hello">👋 打个招呼</button>
          <button class="reply-btn" data-reply="how_are_you">😊 最近怎么样？</button>
          <button class="reply-btn" data-reply="tell_story">📖 讲个故事</button>
          <button class="reply-btn" data-reply="ask_advice">💡 给点建议</button>
        </div>

        <div class="chat-input-area">
          <input type="text" class="chat-input" id="chatInput" placeholder="和角色聊聊天...">
          <button class="send-btn" id="sendBtn">
            <span>发送</span>
          </button>
        </div>
      </div>
    `;

    return chat;
  }

  // 获取当前时间
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  // 切换角色
  function switchCharacter(characterName) {
    const charKey = characterName.replace(/\s/g, '').toLowerCase();
    const character = characters[charKey];
    if (!character) return;

    currentCharacter = charKey;

    // 更新选中状态
    document.querySelectorAll('.character-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.character === characterName);
    });

    // 添加角色切换消息
    addMessage({
      type: 'system',
      content: `已切换到 ${character.avatar} ${character.name}`
    });

    // 添加角色问候
    setTimeout(() => {
      addMessage({
        type: 'character',
        character: character,
        content: character.greeting
      });
    }, 500);

    // 保存当前角色
    localStorage.setItem('zootopiaCurrentCharacter', charKey);
  }

  // 添加消息
  function addMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `message ${message.type}-message`;

    if (message.type === 'user') {
      messageEl.innerHTML = `
        <div class="message-content user-content">
          <div class="message-text">${escapeHtml(message.content)}</div>
          <div class="message-time">${getCurrentTime()}</div>
        </div>
      `;
    } else if (message.type === 'character') {
      messageEl.innerHTML = `
        <div class="message-avatar" style="background: ${message.character.color}">
          ${message.character.avatar}
        </div>
        <div class="message-content">
          <div class="message-sender">${message.character.name}</div>
          <div class="message-text">${message.content}</div>
          <div class="message-time">${getCurrentTime()}</div>
        </div>
      `;
    } else if (message.type === 'system') {
      messageEl.innerHTML = `
        <div class="system-message">${message.content}</div>
      `;
    }

    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 保存到历史
    saveToHistory(message);
  }

  // HTML转义
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 获取角色回复
  function getCharacterReply(userMessage, character) {
    const msg = userMessage.toLowerCase();
    const dialogues = character.dialogues;

    // 根据关键词匹配回复
    if (msg.includes('你好') || msg.includes('嗨') || msg.includes('hello') || msg.includes('hi')) {
      return dialogues.happy?.[Math.floor(Math.random() * (dialogues.happy?.length || 1))] || dialogues.default[0];
    }
    if (msg.includes('加油') || msg.includes('鼓励') || msg.includes('困难')) {
      return dialogues.encouraging?.[Math.floor(Math.random() * (dialogues.encouraging?.length || 1))] || dialogues.default[1];
    }
    if (msg.includes('故事') || msg.includes('经历') || msg.includes('talk')) {
      return dialogues.default?.[Math.floor(Math.random() * dialogues.default.length)];
    }
    if (msg.includes('建议') || msg.includes('帮助') || msg.includes('help')) {
      return dialogues.inspiring?.[Math.floor(Math.random() * (dialogues.inspiring?.length || 1))] || dialogues.default[2];
    }

    // 默认随机回复
    return dialogues.default?.[Math.floor(Math.random() * dialogues.default.length)] || '让我想想...';
  }

  // 发送消息
  function sendMessage(message) {
    if (!message.trim()) return;

    // 添加用户消息
    addMessage({
      type: 'user',
      content: message
    });

    // 获取角色回复
    const character = characters[currentCharacter];
    const reply = getCharacterReply(message, character);

    // 模拟思考延迟
    const thinkingTime = character.nameEn === 'Flash' ? 3000 : 1000;

    setTimeout(() => {
      addMessage({
        type: 'character',
        character: character,
        content: reply
      });

      // 增加聊天计数
      chatCount++;
      if (chatCount % 5 === 0 && window.zootopiaAddXP) {
        window.zootopiaAddXP(15, '角色对话');
      }
    }, thinkingTime);
  }

  // 保存到历史
  function saveToHistory(message) {
    const date = new Date().toDateString();
    if (!chatHistory[date]) {
      chatHistory[date] = [];
    }
    chatHistory[date].push({
      ...message,
      timestamp: Date.now()
    });
    localStorage.setItem('zootopiaChatHistory', JSON.stringify(chatHistory));
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#character-chat-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'character-chat-styles';
    styles.textContent = `
      /* 聊天界面 */
      .zootopia-character-chat {
        position: fixed;
        bottom: 200px;
        right: 30px;
        z-index: 9996;
      }

      .chat-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        box-shadow: 0 5px 20px rgba(155, 89, 182, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .chat-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(155, 89, 182, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .chat-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 22px;
        height: 22px;
        background: #E74C3C;
        border-radius: 50%;
        font-size: 12px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border: 2px solid white;
      }

      .chat-panel {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 400px;
        height: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        flex-direction: column;
        animation: chatSlideUp 0.3s ease;
        overflow: hidden;
      }

      .chat-panel.show {
        display: flex;
      }

      @keyframes chatSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 聊天头部 */
      .chat-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 20px 20px 0 0;
      }

      .character-select {
        display: flex;
        gap: 8px;
        flex: 1;
        overflow-x: auto;
        padding: 5px;
      }

      .character-option {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 3px solid transparent;
        background: rgba(255, 255, 255, 0.2);
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .character-option:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .character-option.active {
        border-color: var(--char-color);
        background: white;
        transform: scale(1.1);
      }

      .chat-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        flex-shrink: 0;
      }

      .chat-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* 消息区域 */
      .chat-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #F8F9FA;
      }

      .message {
        display: flex;
        gap: 10px;
        animation: messageFadeIn 0.3s ease;
      }

      @keyframes messageFadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .message.character-message {
        align-self: flex-start;
      }

      .message.user-message {
        flex-direction: row-reverse;
        align-self: flex-end;
      }

      .message-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        flex-shrink: 0;
        background: #A17F68;
        color: white;
      }

      .message-content {
        max-width: 70%;
      }

      .user-content {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 12px 15px;
        border-radius: 15px 15px 0 15px;
      }

      .message-sender {
        font-size: 12px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 4px;
      }

      .message-text {
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
      }

      .message-time {
        font-size: 11px;
        opacity: 0.7;
        margin-top: 5px;
      }

      .system-message {
        align-self: center;
        background: rgba(0, 0, 0, 0.05);
        padding: 8px 15px;
        border-radius: 15px;
        font-size: 12px;
        color: #636E72;
      }

      /* 快速回复 */
      .quick-replies {
        padding: 10px 15px;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .reply-btn {
        padding: 8px 15px;
        background: rgba(155, 89, 182, 0.1);
        border: 1px solid rgba(155, 89, 182, 0.3);
        border-radius: 20px;
        font-size: 12px;
        color: #9B59B6;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.3s ease;
      }

      .reply-btn:hover {
        background: rgba(155, 89, 182, 0.2);
        transform: scale(1.05);
      }

      /* 输入区域 */
      .chat-input-area {
        padding: 15px;
        display: flex;
        gap: 10px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .chat-input {
        flex: 1;
        padding: 12px 15px;
        border: 2px solid rgba(155, 89, 182, 0.3);
        border-radius: 25px;
        font-size: 14px;
        outline: none;
        transition: all 0.3s ease;
      }

      .chat-input:focus {
        border-color: #9B59B6;
        box-shadow: 0 0 0 3px rgba(155, 89, 182, 0.1);
      }

      .send-btn {
        padding: 12px 20px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        border-radius: 25px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      .send-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-character-chat {
          right: 15px;
        }

        .chat-panel {
          width: calc(100vw - 60px);
          height: 70vh;
        }

        .character-select {
          justify-content: flex-start;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化聊天系统
  function initCharacterChat() {
    injectStyles();

    const chat = createChatInterface();
    document.body.appendChild(chat);

    const panel = chat.querySelector('.chat-panel');
    const toggle = chat.querySelector('.chat-toggle');
    const closeBtn = chat.querySelector('.chat-close');
    const input = chat.querySelector('#chatInput');
    const sendBtn = chat.querySelector('#sendBtn');
    const messagesContainer = chat.querySelector('#chatMessages');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
      if (panel.classList.contains('show')) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.focus();
      }
    };

    // 关闭按钮
    closeBtn.onclick = () => {
      panel.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!chat.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 角色切换
    chat.querySelectorAll('.character-option').forEach(opt => {
      opt.onclick = () => {
        switchCharacter(opt.dataset.character);
      };
    });

    // 快速回复
    chat.querySelectorAll('.reply-btn').forEach(btn => {
      btn.onclick = () => {
        const replyMap = {
          'hello': '你好！很高兴认识你！',
          'how_are_you': '你最近怎么样？',
          'tell_story': '能给我讲个故事吗？',
          'ask_advice': '能给我一些建议吗？'
        };
        sendMessage(replyMap[btn.dataset.reply]);
      };
    });

    // 发送消息
    sendBtn.onclick = () => {
      sendMessage(input.value);
      input.value = '';
    };

    // 回车发送
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage(input.value);
        input.value = '';
      }
    });

    // 恢复上次选择的角色
    const lastChar = localStorage.getItem('zootopiaCurrentCharacter');
    if (lastChar && characters[lastChar]) {
      const charName = characters[lastChar].nameEn;
      switchCharacter(charName);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacterChat);
  } else {
    initCharacterChat();
  }
})();
