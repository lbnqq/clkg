/**
 * 疯狂动物城主题 - 角色日常对话系统
 * Zootopia Theme - Character Daily Dialogue System
 * | 角色之间的日常互动和对话
 */

(function() {
  'use strict';

  // 角色对话数据库
  const characterDialogues = {
    // 朱迪和尼克的对话
    judy_nick: {
      name: '朱迪 & 尼克',
      emoji: '🐰🦊',
      dialogues: [
        {
          id: 'jn_001',
          scene: '早安问候',
          mood: 'friendly',
          dialogues: [
            { character: '朱迪', text: '早上好，尼克！今天又是新的一天！' },
            { character: '尼克', text: '早啊，萝卜...哦不，朱迪。你总是这么有精神。' },
            { character: '朱迪', text: '当然！ZPD工作等着我呢！你呢？' },
            { character: '尼克', text: '我？我得先去买杯咖啡...你是要胡萝卜汁吗？' }
          ]
        },
        {
          id: 'jn_002',
          scene: '午餐时间',
          mood: 'casual',
          dialogues: [
            { character: '朱迪', text: '午餐吃什么？我想吃沙拉。' },
            { character: '尼克', text: '沙拉？又是沙拉？' },
            { character: '朱迪', text: '这是健康的！你呢？' },
            { character: '尼克', text: '嗯...我觉得Bug Burga的蝉汉堡不错。' }
          ]
        },
        {
          id: 'jn_003',
          scene: '工作讨论',
          mood: 'serious',
          dialogues: [
            { character: '朱迪', text: '博戈局长又给我们新任务了。' },
            { character: '尼克', text: '这次是什么？' },
            { character: '朱迪', text: '调查雨林区的一起案件。' },
            { character: '尼克', text: '雨林区...希望你带了雨伞。' }
          ]
        },
        {
          id: 'jn_004',
          scene: '下班路上',
          mood: 'relaxed',
          dialogues: [
            { character: '尼克', text: '终于下班了！' },
            { character: '朱迪', text: '今天真是漫长的一天...' },
            { character: '尼克', text: '要一起去吃个Pawpsicle吗？' },
            { character: '朱迪', text: '当然！我请客！' }
          ]
        },
        {
          id: 'jn_005',
          scene: '周末休闲',
          mood: 'happy',
          dialogues: [
            { character: '朱迪', text: '周末终于到了！有什么计划？' },
            { character: '尼克', text: '我...可能要睡一整天。' },
            { character: '朱迪', text: '什么？这太浪费时间了！' },
            { character: '尼克', text: '这是狐类的...战略性休息。' }
          ]
        }
      ],

      // 朱迪和博戈局长的对话
      judy_bogo: {
        name: '朱迪 & 博戈局长',
        emoji: '🐰🦁',
        dialogues: [
          {
            id: 'jb_001',
            scene: '工作汇报',
            mood: 'professional',
            dialogues: [
              { character: '博戈局长', text: '霍普斯警官，报告情况。' },
              { character: '朱迪', text: '是，局长！昨天处理了3起案件。' },
              { character: '博戈局长', text: '效率...可以。继续保持。' },
              { character: '朱迪', text: '谢谢局长！我会努力的！' }
            ]
          },
          {
            id: 'jb_002',
            scene: '任务分配',
            mood: 'serious',
            dialogues: [
              { character: '博戈局长', text: '有个新任务给你。' },
              { character: '朱迪', text: '什么任务，局长？' },
              { character: '博戈局长', text: '调查撒哈拉广场的...奇怪事件。' },
              { character: '朱迪', text: '明白！我会处理好的！' }
            ]
          }
        ],

        // 尼克和闪电的对话
        nick_flash: {
          name: '尼克 & 闪电',
          emoji: '🦊🐢',
          dialogues: [
            {
              id: 'nf_001',
              scene: 'DMV办事',
              mood: 'funny',
              dialogues: [
                { character: '尼克', text: '嗨，闪电。我需要...办理手续。' },
                { character: '闪电', text: '你...好...尼...克...' },
                { character: '尼克', text: '能不能...快一点？' },
                { character: '闪电', text: '我...已...经...很...快...了...' },
                { character: '尼克', text: '😅 深呼吸，尼克，深呼吸...' }
              ]
            }
          ],

          // Gazelle和粉丝的对话
          gazelle_fans: {
            name: 'Gazelle & 粉丝',
            emoji: '🦌🐯',
            dialogues: [
              {
                id: 'gf_001',
                scene: '演唱会后台',
                mood: 'excited',
                dialogues: [
                  { character: '老虎伴舞', text: 'Gazelle小姐！今晚的演唱会太棒了！' },
                  { character: 'Gazelle', text: '谢谢你们！没有你们就没有我！' },
                  { character: '老虎伴舞', text: '粉丝们都爱你！' },
                  { character: 'Gazelle', text: '我也爱他们！Try Everything！' }
                ]
              }
            ]
          },

          // 朱迪和家人的对话
          judy_family: {
            name: '朱迪 & 家人',
            emoji: '🐰🐰🐰',
            dialogues: [
              {
                id: 'jf_001',
                scene: '家庭通话',
                mood: 'warm',
                dialogues: [
                  { character: '朱迪妈妈', text: '朱迪，工作怎么样？' },
                  { character: '朱迪', text: '很好，妈妈！我现在是正式警官了！' },
                  { character: '朱迪爸爸', text: '我们真为你骄傲！' },
                  { character: '朱迪', text: '谢谢爸爸！我会保护动物城的！' }
                ]
              }
            ]
          },

          // 本杰明警官和朱迪的对话
          benjamin_judy: {
            name: '本杰明 & 朱迪',
            emoji: '🐆🐰',
            dialogues: [
              {
                id: 'bj_001',
                scene: '前台值班',
                mood: 'enthusiastic',
                dialogues: [
                  { character: '本杰明', text: '朱迪警官！你看Gazelle的新歌了吗？' },
                  { character: '朱迪', text: '还没呢，我很忙的。' },
                  { character: '本杰明', text: '你一定要听！太好听了！' },
                  { character: '朱迪', text: '好吧，我会找时间听的。' },
                  { character: '本杰明', text: '耶！我就知道你会喜欢的！' }
                ]
              }
            ]
          }
        }
      };

  // 随机对话触发器
  const randomDialogues = [
    { characters: ['朱迪', '尼克'], text: '朱迪：尼克，你的领带歪了。尼克：这是...时尚。' },
    { characters: ['朱迪', '尼克'], text: '尼克：你说兔子真的不能当警察吗？朱迪：我已经证明了！' },
    { characters: ['尼克', '本杰明'], text: '本杰明：你喜欢Gazelle吗？尼克：她...还不错。' },
    { characters: ['闪电'], text: '欢...迎...来...到...D...M...V...' },
    { characters: ['博戈局长'], text: '效率！效率！效率！' },
    { characters: ['Gazelle'], text: 'Try Everything！不要放弃！' }
  ];

  // 当前状态
  let dialogueState = {
    isActive: false,
    currentDialogue: null,
    dialogueIndex: 0,
    charIndex: 0,
    panel: null
  };

  // 创建对话面板
  function createDialoguePanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-dialogue-system';
    panel.innerHTML = `
      <!-- 随机对话通知 -->
      <div class="dialogue-notification" id="dialogueNotification">
        <div class="notification-content" id="notificationContent"></div>
      </div>

      <!-- 对话播放器 -->
      <div class="dialogue-player" id="dialoguePlayer" style="display: none;">
        <div class="player-header">
          <div class="player-title" id="playerTitle"></div>
          <button class="close-player" id="closePlayerBtn">×</button>
        </div>
        <div class="player-scene">
          <div class="scene-label" id="sceneLabel"></div>
        </div>
        <div class="player-dialogues" id="playerDialogues"></div>
        <div class="player-controls">
          <button class="control-btn prev-btn" id="prevDialogueBtn" title="上一句">◀</button>
          <button class="control-btn play-btn" id="playDialogueBtn" title="播放">▶️</button>
          <button class="control-btn next-btn" id="nextDialogueBtn" title="下一句">▶</button>
          <button class="control-btn replay-btn" id="replayBtn" title="重播">🔄</button>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="dialogue-toggle" id="dialogueToggle">
        <span class="toggle-icon">💬</span>
        <span class="toggle-text">角色对话</span>
      </div>
    `;

    return panel;
  }

  // 显示随机对话通知
  function showRandomNotification() {
    if (dialogueState.isActive) return;

    const dialogue = randomDialogues[Math.floor(Math.random() * randomDialogues.length)];
    const notification = document.getElementById('dialogueNotification');
    const content = document.getElementById('notificationContent');

    if (!notification || !content) return;

    content.innerHTML = `
      <div class="notification-characters">${dialogue.characters.join(' & ')}</div>
      <div class="notification-text">${dialogue.text}</div>
      <div class="notification-time">${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</div>
    `;

    notification.classList.add('show');

    // 自动隐藏
    setTimeout(() => {
      notification.classList.remove('show');
    }, 5000);

    // 可点击查看完整对话
    notification.onclick = () => {
      showDialoguePlayer(dialogue);
    };
  }

  // 显示对话播放器
  function showDialoguePlayer(dialogue) {
    const player = document.getElementById('dialoguePlayer');
    const title = document.getElementById('playerTitle');
    const sceneLabel = document.getElementById('sceneLabel');
    const dialoguesContainer = document.getElementById('playerDialogues');

    if (!player) return;

    player.style.display = 'block';
    dialogueState.isActive = true;

    title.textContent = `${dialogue.emoji} ${dialogue.name}`;
    sceneLabel.textContent = `📍 ${dialogue.scene}`;

    // 渲染对话
    dialoguesContainer.innerHTML = dialogue.dialogues.map((d, index) => `
      <div class="dialogue-bubble ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="bubble-character">${d.character}</div>
        <div class="bubble-text">${d.text}</div>
      </div>
    `).join('');
  }

  // 播放对话
  function playDialogue() {
    const bubbles = document.querySelectorAll('.dialogue-bubble');
    if (bubbles.length === 0) return;

    // 移除所有激活状态
    bubbles.forEach(b => b.classList.remove('active', 'speaking'));

    dialogueState.dialogueIndex = 0;
    playNextBubble();
  }

  // 播放下一个气泡
  function playNextBubble() {
    const bubbles = document.querySelectorAll('.dialogue-bubble');
    if (dialogueState.dialogueIndex >= bubbles.length) {
      // 对话播放完成
      dialogueState.dialogueIndex = 0;
      bubbles.forEach(b => b.classList.remove('active', 'speaking'));
      return;
    }

    const currentBubble = bubbles[dialogueState.dialogueIndex];
    currentBubble.classList.add('active', 'speaking');

    // 播放声音（可选）
    // playCharacterSound(currentBubble.dataset.character);

    // 3秒后播放下一个
    setTimeout(() => {
      currentBubble.classList.remove('speaking');
      dialogueState.dialogueIndex++;
      playNextBubble();
    }, 3000);
  }

  // 切换面板
  function togglePanel() {
    const system = document.querySelector('.zootopia-dialogue-system');
    const player = document.getElementById('dialoguePlayer');

    system.classList.toggle('expanded');
    player.style.display = player.style.display === 'none' ? 'block' : 'none';
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#dialogue-system-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'dialogue-system-styles';
    styles.textContent = `
      /* 对话系统容器 */
      .zootopia-dialogue-system {
        position: fixed;
        bottom: 420px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 随机对话通知 */
      .dialogue-notification {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 350px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
        transition: all 0.3s ease;
      }

      .dialogue-notification.show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .notification-content {
        padding: 15px;
      }

      .notification-characters {
        font-size: 12px;
        font-weight: bold;
        color: #E91E63;
        margin-bottom: 8px;
      }

      .notification-text {
        font-size: 14px;
        color: #2D3436;
        line-height: 1.5;
        margin-bottom: 8px;
      }

      .notification-time {
        font-size: 11px;
        color: #95A5A6;
        text-align: right;
      }

      /* 对话播放器 */
      .dialogue-player {
        width: 400px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }

      .player-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .player-title {
        font-size: 16px;
        font-weight: bold;
      }

      .close-player {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .player-scene {
        padding: 10px 20px;
        background: #F8F9FA;
      }

      .scene-label {
        font-size: 12px;
        color: #636E72;
        text-align: center;
      }

      .player-dialogues {
        padding: 20px;
        max-height: 300px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .dialogue-bubble {
        display: flex;
        gap: 10px;
        opacity: 0.3;
        transition: all 0.3s ease;
      }

      .dialogue-bubble.active {
        opacity: 1;
      }

      .dialogue-bubble.speaking {
        animation: speakingPulse 0.5s ease infinite;
      }

      @keyframes speakingPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }

      .bubble-character {
        font-size: 24px;
        flex-shrink: 0;
      }

      .bubble-text {
        background: #ECF0F1;
        padding: 12px 15px;
        border-radius: 15px;
        font-size: 13px;
        color: #2D3436;
        line-height: 1.5;
        max-width: 280px;
      }

      .player-controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 15px 20px;
        border-top: 1px solid #ECF0F1;
      }

      .control-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #F8F9FA;
        border: none;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .control-btn:hover {
        background: #ECF0F1;
        transform: scale(1.1);
      }

      .play-btn {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        font-size: 20px;
      }

      /* 控制按钮 */
      .dialogue-toggle {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .dialogue-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(155, 89, 182, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: chatBounce 2s ease infinite;
      }

      @keyframes chatBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 14px;
      }

      /* 滚动条 */
      .player-dialogues::-webkit-scrollbar {
        width: 4px;
      }

      .player-dialogues::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .player-dialogues::-webkit-scrollbar-thumb {
        background: #9B59B6;
        border-radius: 2px;
      }

      /* 响应式 */
      @media (max-width: 450px) {
        .zootopia-dialogue-system {
          right: 10px;
          bottom: 400px;
        }

        .dialogue-notification {
          width: calc(100vw - 40px);
        }

        .dialogue-player {
          width: calc(100vw - 20px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initDialogueSystem() {
    injectStyles();

    const system = createDialoguePanel();
    document.body.appendChild(system);

    // 切换按钮
    document.getElementById('dialogueToggle').onclick = togglePanel;
    document.getElementById('closePlayerBtn').onclick = () => {
      const player = document.getElementById('dialoguePlayer');
      player.style.display = 'none';
      dialogueState.isActive = false;
    };

    // 控制按钮
    document.getElementById('playDialogueBtn')?.addEventListener('click', playDialogue);

    // 定时显示随机对话
    setInterval(() => {
      if (Math.random() > 0.7) { // 30%概率
        showRandomNotification();
      }
    }, 30000); // 每30秒检查一次

    // 导出全局函数
    window.zootopiaDialogue = {
      show: (dialogueId) => {
        // 根据ID查找并显示对话
        // 实现省略...
      },
      play: playDialogue,
      showRandom: showRandomNotification
    };
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDialogueSystem);
  } else {
    initDialogueSystem();
  }
})();
