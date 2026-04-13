/**
 * 疯狂动物城主题 - DMV树懒体验系统
 * Zootopia Theme - DMV Sloth Experience System
 * | 还原DMV树懒的慢动作体验
 */

(function() {
  'use strict';

  // DMV场景数据
  const dmvData = {
    name: '动物城哺乳动物车辆管理局',
    shortName: 'DMV',
    slothName: '闪电',
    slothEmoji: '🐢',
    themeColor: '#27AE60',
    bgPattern: 'dmv-pattern',
    messages: {
      loading: [
        '正...在...加...载...',
        '请...稍...等...',
        '马...上...就...好...',
        '感...谢...耐...心...',
        '我...很...快...的...'
      ],
      welcome: [
        '欢...迎...来...到...D...M...V...',
        '我...是...闪...电...',
        '今...天...天...气...真...好...',
        '请...问...有...什...么...可...以...帮...您...',
        '我...马...上...处...理...'
      ],
      typing: [
        '正...在...输...入...',
        '一...个...字...一...个...字...',
        '快...完...成...了...',
        '只...剩...一...点...点...',
        '请...不...要...急...'
      ],
      complete: [
        '完...成...了...！',
        '成...功...！',
        '做...好...了...',
        '搞...定...！',
        '这...就...是...我...'
      ]
    }
  };

  // 打字效果配置
  const typingConfig = {
    baseDelay: 500,        // 基础延迟（毫秒）
    characterDelay: 800,   // 每个字符延迟
    punctuationDelay: 1500, // 标点符号延迟
    blinkSpeed: 2000       // 光标闪烁速度
  };

  // 当前状态
  let isTyping = false;
  let currentTypingElement = null;
  let typingInterval = null;

  // 创建DMV加载屏幕
  function createDMVLoader() {
    const loader = document.createElement('div');
    loader.className = 'dmv-sloth-loader';
    loader.id = 'dmvLoader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="dmv-header">
          <div class="dmv-logo">
            <span class="logo-emoji">${dmvData.slothEmoji}</span>
            <div class="logo-text">
              <div class="dmv-title">${dmvData.shortName}</div>
              <div class="dmv-fullname">${dmvData.name}</div>
            </div>
          </div>
        </div>

        <div class="sloth-character">
          <div class="sloth-avatar">
            <span class="avatar-emoji">${dmvData.slothEmoji}</span>
            <div class="avatar-blink"></div>
          </div>
          <div class="sloth-name">${dmvData.slothName}</div>
          <div class="sloth-badge">效率第一员工 ⭐</div>
        </div>

        <div class="dmv-message">
          <div class="message-bubble">
            <span class="message-text" id="loaderMessage"></span>
            <span class="message-cursor">|</span>
          </div>
        </div>

        <div class="dmv-progress">
          <div class="progress-label">
            <span>处理进度</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
          </div>
        </div>

        <div class="dmv-tip">
          <span class="tip-icon">💡</span>
          <span class="tip-text">小贴士：动物城DMV是全城最...高效...的部门</span>
        </div>
      </div>

      <div class="dmv-background">
        <div class="bg-pattern"></div>
        <div class="bg-leaves">
          <div class="leaf leaf-1">🌿</div>
          <div class="leaf leaf-2">🍃</div>
          <div class="leaf leaf-3">🌱</div>
        </div>
      </div>
    `;

    return loader;
  }

  // 树懒打字效果
  function slothTyping(element, text, callback) {
    if (isTyping) return;

    isTyping = true;
    currentTypingElement = element;
    let index = 0;
    let displayText = '';

    // 清空元素
    element.textContent = '';

    // 开始打字
    function typeCharacter() {
      if (index < text.length) {
        const char = text[index];
        displayText += char;
        element.textContent = displayText;
        index++;

        // 计算延迟时间
        let delay = typingConfig.characterDelay;
        if (['，', '。', '！', '？', '、', '…'].includes(char)) {
          delay = typingConfig.punctuationDelay;
        } else if (char === '…') {
          delay = typingConfig.punctuationDelay * 1.5;
        }

        typingInterval = setTimeout(typeCharacter, delay);
      } else {
        // 打字完成
        isTyping = false;
        if (callback) callback();
      }
    }

    typeCharacter();
  }

  // 模拟慢速加载
  function simulateSlowLoading(callback, progressElement) {
    let progress = 0;
    const totalSteps = 10;
    let currentStep = 0;

    function updateProgress() {
      if (currentStep >= totalSteps) {
        progress = 100;
        updateProgressDisplay(100);
        setTimeout(callback, 2000);
        return;
      }

      // 随机增加进度（每次1-5%）
      const increment = Math.floor(Math.random() * 5) + 1;
      progress = Math.min(100, progress + increment);
      currentStep++;

      updateProgressDisplay(progress);

      // 随机延迟（2-5秒）
      const delay = (Math.floor(Math.random() * 3) + 2) * 1000;
      setTimeout(updateProgress, delay);
    }

    function updateProgressDisplay(percent) {
      if (progressElement) {
        const fill = progressElement.querySelector('#progressFill');
        const label = progressElement.querySelector('#progressPercent');
        if (fill) fill.style.width = percent + '%';
        if (label) label.textContent = percent + '%';
      }
    }

    updateProgress();
  }

  // 显示DMV加载器
  function showDMVLoader(callback) {
    const existingLoader = document.getElementById('dmvLoader');
    if (existingLoader) {
      existingLoader.remove();
    }

    const loader = createDMVLoader();
    document.body.appendChild(loader);

    const messageElement = document.getElementById('loaderMessage');
    const loadingMessage = dmvData.messages.loading[Math.floor(Math.random() * dmvData.messages.loading.length)];

    // 开始打字效果
    setTimeout(() => {
      slothTyping(messageElement, loadingMessage, () => {
        // 开始进度条
        setTimeout(() => {
          simulateSlowLoading(() => {
            // 加载完成
            const completeMessage = dmvData.messages.complete[Math.floor(Math.random() * dmvData.messages.complete.length)];
            slothTyping(messageElement, completeMessage, () => {
              setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                  loader.remove();
                  if (callback) callback();
                }, 500);
              }, 1000);
            });
          }, loader);
        }, 1000);
      });
    }, 500);
  }

  // 创建DMV交互按钮
  function createDMVButton() {
    const button = document.createElement('button');
    button.className = 'dmv-experience-btn';
    button.innerHTML = `
      <span class="btn-emoji">${dmvData.slothEmoji}</span>
      <span class="btn-text">体验DMV速度</span>
    `;
    button.style.cssText = `
      position: fixed;
      bottom: 150px;
      right: 20px;
      background: linear-gradient(135deg, ${dmvData.themeColor}, #1E8449);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 15px 25px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
      font-family: 'Nunito', sans-serif;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 9999;
      transition: all 0.3s ease;
    `;

    button.onmouseover = () => {
      button.style.transform = 'translateY(-3px) scale(1.05)';
      button.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.5)';
    };

    button.onmouseout = () => {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
    };

    button.onclick = () => {
      showDMVLoader(() => {
        // 体验完成
      });
    };

    return button;
  }

  // 创建DMV文本转换器（将正常文本转换为树懒风格）
  function slothTextConverter(text) {
    // 在每个字符之间添加...
    return text.split('').join('…');
  }

  // 创建可点击的DMV印章
  function createDMVStamp() {
    const stamp = document.createElement('div');
    stamp.className = 'dmv-stamp';
    stamp.innerHTML = `
      <div class="stamp-inner">
        <div class="stamp-text">DMV</div>
        <div class="stamp-subtext">已处理</div>
        <div class="stamp-date">${new Date().toLocaleDateString()}</div>
      </div>
    `;
    return stamp;
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#dmv-experience-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'dmv-experience-styles';
    styles.textContent = `
      /* DMV加载器 */
      .dmv-sloth-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Nunito', sans-serif;
      }

      .dmv-sloth-loader.fade-out {
        animation: dmvFadeOut 0.5s ease forwards;
      }

      @keyframes dmvFadeOut {
        to {
          opacity: 0;
          transform: scale(0.9);
        }
      }

      /* 背景 */
      .dmv-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1E8449 0%, #27AE60 50%, #2ECC71 100%);
      }

      .bg-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        background-image: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      .bg-leaves {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .leaf {
        position: absolute;
        font-size: 40px;
        opacity: 0.3;
        animation: leafFloat 10s ease-in-out infinite;
      }

      .leaf-1 {
        top: 10%;
        left: 10%;
        animation-delay: 0s;
      }

      .leaf-2 {
        top: 60%;
        right: 15%;
        animation-delay: 3s;
      }

      .leaf-3 {
        bottom: 20%;
        left: 20%;
        animation-delay: 6s;
      }

      @keyframes leafFloat {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(10deg);
        }
      }

      /* 加载器内容 */
      .loader-content {
        position: relative;
        background: white;
        border-radius: 30px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      /* DMV头部 */
      .dmv-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .dmv-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 10px;
      }

      .logo-emoji {
        font-size: 64px;
        animation: logoSway 3s ease-in-out infinite;
      }

      @keyframes logoSway {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }

      .logo-text {
        text-align: left;
      }

      .dmv-title {
        font-size: 32px;
        font-weight: bold;
        color: ${dmvData.themeColor};
      }

      .dmv-fullname {
        font-size: 12px;
        color: #636E72;
      }

      /* 树懒角色 */
      .sloth-character {
        text-align: center;
        margin-bottom: 30px;
      }

      .sloth-avatar {
        position: relative;
        display: inline-block;
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, #F39C12, #E67E22);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        box-shadow: 0 8px 25px rgba(243, 156, 18, 0.3);
      }

      .avatar-emoji {
        font-size: 64px;
      }

      .avatar-blink {
        position: absolute;
        top: 35%;
        left: 55%;
        width: 8px;
        height: 8px;
        background: #2D3436;
        border-radius: 50%;
        animation: slothBlink 4s ease-in-out infinite;
      }

      @keyframes slothBlink {
        0%, 45%, 55%, 100% {
          transform: scaleY(1);
        }
        50% {
          transform: scaleY(0.1);
        }
      }

      .sloth-name {
        font-size: 24px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 5px;
      }

      .sloth-badge {
        display: inline-block;
        background: linear-gradient(135deg, #F1C40F, #F39C12);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
      }

      /* 消息气泡 */
      .dmv-message {
        margin-bottom: 30px;
      }

      .message-bubble {
        background: #ECF0F1;
        border-radius: 20px;
        padding: 20px;
        min-height: 60px;
        display: flex;
        align-items: center;
        position: relative;
      }

      .message-bubble::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 30px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #ECF0F1;
      }

      .message-text {
        font-size: 16px;
        color: #2D3436;
        line-height: 1.6;
      }

      .message-cursor {
        color: ${dmvData.themeColor};
        animation: cursorBlink ${typingConfig.blinkSpeed}ms ease-in-out infinite;
        margin-left: 2px;
      }

      @keyframes cursorBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }

      /* 进度条 */
      .dmv-progress {
        margin-bottom: 20px;
      }

      .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .progress-bar {
        height: 10px;
        background: #ECF0F1;
        border-radius: 5px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, ${dmvData.themeColor}, #2ECC71);
        border-radius: 5px;
        transition: width 0.5s ease;
        width: 0%;
      }

      /* 提示 */
      .dmv-tip {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background: #FFF9E6;
        border-radius: 15px;
        font-size: 12px;
        color: #636E72;
      }

      .tip-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .tip-text {
        flex: 1;
      }

      /* DMV印章 */
      .dmv-stamp {
        position: absolute;
        width: 100px;
        height: 100px;
        border: 3px solid #C0392B;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-15deg);
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .dmv-stamp.visible {
        opacity: 0.8;
        animation: stampIn 0.5s ease;
      }

      @keyframes stampIn {
        from {
          transform: rotate(-15deg) scale(2);
          opacity: 0;
        }
        to {
          transform: rotate(-15deg) scale(1);
          opacity: 0.8;
        }
      }

      .stamp-inner {
        text-align: center;
        color: #C0392B;
      }

      .stamp-text {
        font-size: 20px;
        font-weight: bold;
      }

      .stamp-subtext {
        font-size: 10px;
      }

      .stamp-date {
        font-size: 8px;
        margin-top: 5px;
      }

      /* 响应式 */
      @media (max-width: 600px) {
        .loader-content {
          padding: 30px 20px;
        }

        .dmv-title {
          font-size: 24px;
        }

        .logo-emoji {
          font-size: 48px;
        }

        .sloth-avatar {
          width: 100px;
          height: 100px;
        }

        .avatar-emoji {
          font-size: 48px;
        }

        .message-text {
          font-size: 14px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initDMVExperience() {
    injectStyles();

    // 添加DMV体验按钮
    const button = createDMVButton();
    document.body.appendChild(button);

    // 导出全局函数
    window.dmvExperience = {
      showLoader: showDMVLoader,
      convertText: slothTextConverter,
      createStamp: createDMVStamp
    };

    // 可选：页面首次加载时显示DMV加载器
    const hasSeenLoader = localStorage.getItem('dmvLoaderSeen');
    if (!hasSeenLoader) {
      setTimeout(() => {
        showDMVLoader(() => {
          localStorage.setItem('dmvLoaderSeen', 'true');
        });
      }, 1000);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDMVExperience);
  } else {
    initDMVExperience();
  }
})();
