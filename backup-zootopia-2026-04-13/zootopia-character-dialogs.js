/**
 * 疯狂动物城主题 - 角色随机对话系统
 * Zootopia Theme - Character Random Dialog System
 * Judy、Nick 等角色随机出现并说经典台词
 */

(function() {
  'use strict';

  // 角色对话数据
  const characterDialogs = {
    judy: {
      name: 'Judy Hopps',
      nameCn: '朱迪·霍普斯',
      emoji: '🐰',
      color: '#A17F68',
      bgColor: 'linear-gradient(135deg, #FFE4C4, #FFDAB9)',
      dialogs: [
        'Try Everything! 任何人都可以成就任何事！',
        '我是ZPD第一位兔子警官！',
        '改变从你开始！',
        '梦想不会逃跑，会逃跑的永远都是自己',
        '不管多么困难，我都不会放弃！',
        '你可以做到的，相信自己！',
        '为了梦想，加油！',
        '现实可能很残酷，但你不能放弃！',
        '从小我家人就说兔子不该当警察...',
        '看着我，然后相信我！',
        '甜的是爪子冰棍，不是你！',
        '我们都要在这个城市找到自己的位置',
        '知道吗，我也曾害怕过',
        '但我知道我不能放弃',
        '这就是我要做的！'
      ]
    },
    nick: {
      name: 'Nick Wilde',
      nameCn: '尼克·王尔德',
      emoji: '🦊',
      color: '#E67E22',
      bgColor: 'linear-gradient(135deg, #FFE4B5, #FFD700)',
      dialogs: [
        "It's called a hustle, sweetheart!",
        '你知道吗...这叫 hustlin\'',
        '让我教你怎样做买卖',
        '狡猾是我的生存之道',
        '听着，甜心，这个Pawpsicle只要$2',
        '你知道这个怎么做生意吗？',
        '我是个商人，不是慈善家',
        '相信我，我有我的办法',
        '别那样看着我',
        '聪明人从不说自己的聪明',
        '你知道我的故事吗？',
        '小时候我想加入童子军...',
        '从那以后我学会了...',
        '如果他们不想让我成为...',
        '那我就成为那样的狐狸',
        '你知道吗，你不是唯一被欺负过的',
        '但我们要证明他们都错了'
      ]
    },
    flash: {
      name: 'Flash',
      nameCn: '闪电',
      emoji: '🐢',
      color: '#27AE60',
      bgColor: 'linear-gradient(135deg, #D5F4E6, #A8E6CF)',
      dialogs: [
        '我....................................很............................................高....................................兴....................................认....................................识....................................你....................................',
        '你................................................好',
        '谢....................................谢',
        '再....................................见',
        '回....................................见',
        '慢....................................点....................................说....................................',
        '不....................................急....................................',
        '我....................................们....................................是....................................朋....................................友....................................'
      ],
      slowMode: true  // 逐字显示模式
    },
    bogo: {
      name: 'Chief Bogo',
      nameCn: '博戈局长',
      emoji: '🦬',
      color: '#2C3E50',
      bgColor: 'linear-gradient(135deg, #34495E, #2C3E50)',
      dialogs: [
        '你有48小时！',
        '生命不是卡通音乐剧！',
        '这不是一个请求',
        '效率！我要看到效率！',
        'Hopps，你又在搞什么？',
        '这就是你写的报告？',
        '别让我失望',
        '记住，你在代表ZPD',
        '做好你的本职工作',
        '我不需要借口，只要结果',
        '这是一个警告',
        '如果你搞砸了...'
      ]
    },
    clawhauser: {
      name: 'Benjamin Clawhauser',
      nameCn: '本杰明·克劳泽瑟',
      emoji: '🦆',
      color: '#3498DB',
      bgColor: 'linear-gradient(135deg, #EBF5FB, #D6EAF8)',
      dialogs: [
        'Gazelle的新歌太棒了！',
        '你听到了吗？新来的警官！',
        '欢迎欢迎！',
        '我的甜甜圈呢？',
        '你知道吗，Gazelle演唱会...',
        '这歌词太感人了！',
        '警官，你的制服真帅！',
        '等等，我先听完这首歌！',
        '你知道吗，Gazelle今天发了新单曲！',
        '你在找什么？我可以帮忙！',
        '前台就是我的天下！',
        '这个电话...让我查查'
      ]
    },
    bellwether: {
      name: 'Dawn Bellwether',
      nameCn: '道恩·绵羊',
      emoji: '🐑',
      color: '#95A5A6',
      bgColor: 'linear-gradient(135deg, #F5F5F5, #E0E0E0)',
      dialogs: [
        '我是副市长，我有很重要的事情要做！',
        'Mayor Lionheart 总是很忙...',
        '小动物们应该团结起来！',
        '你知道吗，我也是从小人物做起的',
        '大动物总是欺负我们',
        '但这会改变的！',
        '我们会夺回属于我们的！',
        '警察真是太粗鲁了！',
        '我有一个梦想...'
      ]
    },
    yax: {
      name: 'Yax',
      nameCn: '雅克斯',
      emoji: '🦛',
      color: '#8B4513',
      bgColor: 'linear-gradient(135deg, #DEB887, #D2691E)',
      dialogs: [
        '欢迎来到自然主义俱乐部！',
        '我们都不穿衣服，感觉很自然',
        '你知道那个司机是谁吗？',
        '他说他叫...嗯...',
        '让我们一起寻找内心的平静',
        '放下世俗的束缚',
        '回归自然...',
        '那个司机开着一辆...嗯...',
        '我感觉他想起来了...',
        '我的记忆有时候不太好'
      ]
    },
    finnick: {
      name: 'Finnick',
      nameCn: '芬尼克',
      emoji: '🦊',
      color: '#C0392B',
      bgColor: 'linear-gradient(135deg, #E74C3C, #C0392B)',
      dialogs: [
        '你叫谁宝宝？！',
        '我就穿尿不湿，怎么着？',
        'Nick是我的搭档',
        '别以为我小就好欺负',
        '哼！',
        'Nick说我们是合伙人',
        '你买不买Pawpsicle？',
        '这可是独家生意！'
      ]
    }
  };

  // 显示过的对话记录
  let shownDialogs = JSON.parse(localStorage.getItem('zootopiaShownDialogs')) || {};

  // 初始化显示记录
  for (const char in characterDialogs) {
    if (!shownDialogs[char]) {
      shownDialogs[char] = [];
    }
  }

  // 检查是否应该显示对话
  function shouldShowDialog() {
    // 10%的概率显示
    return Math.random() < 0.1;
  }

  // 随机选择一个角色
  function selectRandomCharacter() {
    const characters = Object.keys(characterDialogs);
    return characters[Math.floor(Math.random() * characters.length)];
  }

  // 获取角色未显示过的对话
  function getUnseenDialog(characterKey) {
    const character = characterDialogs[characterKey];
    const seen = shownDialogs[characterKey] || [];

    // 找出未显示的对话
    const unseen = character.dialogs.filter((_, index) => !seen.includes(index));

    // 如果所有对话都显示过了，重置
    if (unseen.length === 0) {
      shownDialogs[characterKey] = [];
      return character.dialogs[Math.floor(Math.random() * character.dialogs.length)];
    }

    // 随机选择一个未显示的对话
    const dialogIndex = character.dialogs.indexOf(unseen[Math.floor(Math.random() * unseen.length)]);
    shownDialogs[characterKey].push(dialogIndex);

    // 保存到本地存储
    localStorage.setItem('zootopiaShownDialogs', JSON.stringify(shownDialogs));

    return { text: character.dialogs[dialogIndex], index: dialogIndex };
  }

  // 创建角色对话框
  function createCharacterBubble(characterKey, dialog) {
    const character = characterDialogs[characterKey];

    const bubble = document.createElement('div');
    bubble.className = 'zootopia-character-dialog';
    bubble.style.background = character.bgColor;
    bubble.style.color = character.color;

    bubble.innerHTML = `
      <div class="dialog-close">×</div>
      <div class="dialog-character">
        <span class="character-avatar">${character.emoji}</span>
        <div class="character-info">
          <div class="character-name">${character.nameCn}</div>
          <div class="character-name-en">${character.name}</div>
        </div>
      </div>
      <div class="dialog-text-container">
        <div class="dialog-icon">💬</div>
        <div class="dialog-text" ${character.slowMode ? 'data-slow-mode="true"' : ''}>${dialog.text}</div>
      </div>
      <div class="dialog-actions">
        <button class="dialog-btn dialog-btn-like">👍 有用</button>
        <button class="dialog-btn dialog-btn-share">📤 分享</button>
        <button class="dialog-btn dialog-btn-close">关闭</button>
      </div>
    `;

    // 慢速打字模式
    if (character.slowMode) {
      const textElement = bubble.querySelector('.dialog-text');
      const fullText = dialog.text;
      textElement.textContent = '';
      let index = 0;

      const typeNext = () => {
        if (index < fullText.length) {
          textElement.textContent += fullText[index];
          index++;
          setTimeout(typeNext, 100);
        }
      };

      setTimeout(typeNext, 500);
    }

    // 关闭按钮
    const closeBtn = bubble.querySelector('.dialog-close');
    const closeActionBtn = bubble.querySelector('.dialog-btn-close');
    closeBtn.onclick = () => bubble.remove();
    closeActionBtn.onclick = () => bubble.remove();

    // 点赞按钮
    const likeBtn = bubble.querySelector('.dialog-btn-like');
    likeBtn.onclick = () => {
      likeBtn.textContent = '❤️ 已喜欢';
      likeBtn.disabled = true;
      showToast('👍', '你点赞了这条对话！');
    };

    // 分享按钮
    const shareBtn = bubble.querySelector('.dialog-btn-share');
    shareBtn.onclick = () => {
      const shareText = `${character.emoji} ${character.nameCn}: ${dialog.text}`;
      if (navigator.share) {
        navigator.share({
          title: '疯狂动物城角色对话',
          text: shareText
        });
      } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(shareText).then(() => {
          showToast('📋', '已复制到剪贴板！');
        });
      }
    };

    // 点击外部关闭
    setTimeout(() => {
      const outsideClick = (e) => {
        if (!bubble.contains(e.target)) {
          bubble.remove();
          document.removeEventListener('click', outsideClick);
        }
      };
      document.addEventListener('click', outsideClick);
    }, 100);

    return bubble;
  }

  // 显示提示
  function showToast(icon, text) {
    const oldToast = document.querySelector('.zootopia-dialog-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'zootopia-dialog-toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-text">${text}</span>
    `;

    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(135deg, #FF9F43, #EE5A24);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(255, 159, 67, 0.4);
      z-index: 10001;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: toastSlideIn 0.5s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // 显示角色对话
  function showCharacterDialog() {
    if (!shouldShowDialog()) return;

    // 检查是否已经有对话框显示
    if (document.querySelector('.zootopia-character-dialog')) return;

    const characterKey = selectRandomCharacter();
    const dialog = getUnseenDialog(characterKey);

    const bubble = createCharacterBubble(characterKey, dialog);

    // 随机位置（但保持在可见区域）
    const padding = 20;
    const maxWidth = window.innerWidth - 400;
    const maxHeight = window.innerHeight - 300;

    const x = padding + Math.random() * Math.max(0, maxWidth - padding);
    const y = 100 + Math.random() * Math.max(0, maxHeight - 100);

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    document.body.appendChild(bubble);

    // 播放出现音效（可选）
    playCharacterSound(characterKey);
  }

  // 播放角色音效（模拟）
  function playCharacterSound(characterKey) {
    // 这里可以添加实际音效
    // 目前只做控制台日志
    console.log(`🎵 播放 ${characterKey} 的音效`);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#character-dialogs-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'character-dialogs-styles';
    styles.textContent = `
      /* 角色对话框 */
      .zootopia-character-dialog {
        position: fixed;
        width: 350px;
        max-width: calc(100vw - 40px);
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        padding: 20px;
        animation: dialogPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes dialogPop {
        0% {
          opacity: 0;
          transform: scale(0) rotate(-10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      .dialog-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.3s;
        color: inherit;
      }

      .dialog-close:hover {
        opacity: 1;
      }

      .dialog-character {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 2px dashed rgba(0, 0, 0, 0.1);
      }

      .character-avatar {
        font-size: 48px;
        line-height: 1;
      }

      .character-info {
        flex: 1;
      }

      .character-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 3px;
      }

      .character-name-en {
        font-size: 12px;
        opacity: 0.7;
      }

      .dialog-text-container {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }

      .dialog-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .dialog-text {
        flex: 1;
        font-size: 16px;
        line-height: 1.6;
        background: rgba(255, 255, 255, 0.5);
        padding: 10px 15px;
        border-radius: 10px;
      }

      .dialog-actions {
        display: flex;
        gap: 8px;
      }

      .dialog-btn {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.8);
        color: inherit;
      }

      .dialog-btn:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .dialog-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* 提示框动画 */
      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toastFadeOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-character-dialog {
          width: calc(100vw - 40px);
          max-width: none;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化对话系统
  function initCharacterDialogs() {
    injectStyles();

    // 页面加载后可能显示
    setTimeout(() => {
      if (Math.random() < 0.3) {
        showCharacterDialog();
      }
    }, 5000);

    // 定期检查是否显示
    setInterval(showCharacterDialog, 60000);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacterDialogs);
  } else {
    initCharacterDialogs();
  }

  // 导出显示函数
  window.showZootopiaCharacter = (character) => {
    const charKey = character || selectRandomCharacter();
    const dialog = getUnseenDialog(charKey);
    const bubble = createCharacterBubble(charKey, dialog);

    bubble.style.left = '50%';
    bubble.style.top = '50%';
    bubble.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(bubble);
  };
})();
