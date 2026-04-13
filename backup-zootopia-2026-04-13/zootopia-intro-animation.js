/**
 * 疯狂动物城主题 - 角色登场动画
 * Zootopia Theme - Character Intro Animation
 * | 页面加载时的角色登场动画效果
 */

(function() {
  'use strict';

  // 角色登场动画配置
  const introAnimations = {
    judy: {
      character: '🐰',
      name: '朱迪',
      quote: '欢迎来到疯狂动物城！',
      animation: 'bounce',
      duration: 2000,
      position: 'center'
    },
    nick: {
      character: '🦊',
      name: '尼克',
      quote: '嘿，新来的？让我带你转转...',
      animation: 'sly',
      duration: 2500,
      position: 'left'
    },
    flash: {
      character: '🐢',
      name: '闪电',
      quote: '你...好...',
      animation: 'slow',
      duration: 3000,
      position: 'right'
    },
    chief: {
      character: '🦁',
      name: '博戈局长',
      quote: '记住：效率！',
      animation: 'authoritative',
      duration: 2000,
      position: 'bottom'
    }
  };

  // 当前动画状态
  let animationQueue = [];
  let isPlaying = false;

  // 创建角色容器
  function createCharacterContainer(character, position) {
    const container = document.createElement('div');
    container.className = `character-intro character-${position}`;
    container.innerHTML = `
      <div class="character-avatar">${character.character}</div>
      <div class="character-bubble">
        <div class="bubble-text">${character.quote}</div>
        <div class="bubble-tail"></div>
      </div>
    `;

    return container;
  }

  // 播放动画
  function playAnimation(config, callback) {
    const container = createCharacterContainer(config, config.position);
    document.body.appendChild(container);

    // 设置动画
    container.style.animation = `intro${config.animation} ${config.duration}ms ease forwards`;

    // 动画结束后显示气泡
    setTimeout(() => {
      container.querySelector('.character-bubble').style.opacity = '1';
      container.querySelector('.character-bubble').style.transform = 'scale(1)';
    }, config.duration * 0.3);

    // 动画结束后移除
    setTimeout(() => {
      container.style.animation = `intro${config.animation}Out ${config.duration * 0.5}ms ease forwards`;
      setTimeout(() => {
        container.remove();
        if (callback) callback();
      }, config.duration * 0.5);
    }, config.duration * 0.7);
  }

  // 播放所有动画
  function playAllAnimations() {
    if (isPlaying) return;
    isPlaying = true;

    const animations = Object.values(introAnimations);
    let currentIndex = 0;

    function playNext() {
      if (currentIndex >= animations.length) {
        isPlaying = false;
        showContinueButton();
        return;
      }

      playAnimation(animations[currentIndex], () => {
        currentIndex++;
        setTimeout(playNext, 200);
      });
    }

    playNext();
  }

  // 显示继续按钮
  function showContinueButton() {
    const button = document.createElement('button');
    button.className = 'intro-continue-btn';
    button.innerHTML = '🚀 进入动物城';
    button.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 40px;
      background: linear-gradient(135deg, #2ECC71, #27AE60);
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      z-index: 10001;
      animation: buttonPulse 1s ease infinite;
      box-shadow: 0 10px 30px rgba(46, 204, 113, 0.4);
    `;

    button.onclick = () => {
      button.style.animation = 'buttonFadeOut 0.3s ease forwards';
      setTimeout(() => button.remove(), 300);

      // 显示完成提示
      showWelcomeToast();
    };

    document.body.appendChild(button);
  }

  // 显示欢迎提示
  function showWelcomeToast() {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = '🎉 已进入疯狂动物城！探索所有功能吧！';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      background: linear-gradient(135deg, #9B59B6, #8E44AD);
      color: white;
      border-radius: 25px;
      font-weight: bold;
      z-index: 10000;
      animation: toastSlideIn 0.5s ease;
      box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // 注入动画样式
  function injectStyles() {
    if (document.querySelector('#intro-animation-styles')) return;

    const const styles = document.createElement('style');
    styles.id = 'intro-animation-styles';
    styles.textContent = `
      /* 角色容器 */
      .character-intro {
        position: fixed;
        z-index: 10000;
        pointer-events: none;
      }

      .character-center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .character-left {
        top: 50%;
        left: 10%;
        transform: translate(-50%, -50%);
      }

      .character-right {
        top: 50%;
        right: 10%;
        transform: translate(50%, -50%);
      }

      .character-bottom {
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
      }

      /* 角色头像 */
      .character-avatar {
        font-size: 80px;
        filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.3));
        animation: avatarBounce 1s ease infinite;
      }

      /* 对话气泡 */
      .character-bubble {
        position: absolute;
        background: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
      }

      .character-center .character-bubble {
        top: -100px;
        left: 50%;
        transform: translateX(-50%);
      }

      .character-left .character-bubble {
        top: -80px;
        left: 100%;
        transform: translateX(0);
      }

      .character-right .character-bubble {
        top: -80px;
        right: 100%;
        transform: translateX(0);
      }

      .character-bottom .character-bubble {
        bottom: -80px;
        left: 50%;
        transform: translateX(-50%);
      }

      .bubble-text {
        font-size: 16px;
        color: #2D3436;
        font-weight: 500;
        text-align: center;
        line-height: 1.4;
      }

      .bubble-tail {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid white;
      }

      .character-center .bubble-tail {
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
      }

      .character-left .bubble-tail {
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
      }

      .character-right .bubble-tail {
        top: 50%;
        right: -10px;
        transform: translateY(-50%);
      }

      .character-bottom .bubble-tail {
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
      }

      /* 动画关键帧 */
      @keyframes introbounce {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        60% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframe introsly {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scaleX(-1);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scaleX(1);
        }
      }

      @keyframes introslow {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes introauthoritative {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes introbounceOut {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
      }

      @keyframes introslyOut {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scaleX(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scaleX(-1);
        }
      }

      @keyframes introslowOut {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
      }

      @keyframes introauthoritativeOut {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
      }

      @keyframes avatarBounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      @keyframes buttonPulse {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          transform: translate(-50%, -50%) scale(1.05);
        }
      }

      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      @keyframes toastFadeOut {
        from {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
      }

      /* 跳过按钮 */
      .skip-intro-btn {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 15px;
        font-size: 12px;
        cursor: pointer;
        z-index: 10002;
        backdrop-filter: blur(5px);
      }

      .skip-intro-btn:hover {
        background: rgba(0, 0, 0, 0.7);
      }

      /* 继续按钮样式在showContinueButton函数中定义 */
    `;

    document.head.appendChild(styles);
  }

  // 检查是否已播放过
  function hasPlayedIntro() {
    const lastPlayed = localStorage.getItem('zootopiaIntroLastPlayed');
    if (!lastPlayed) return false;

    const lastTime = new Date(lastPlayed);
    const now = new Date();
    const hoursDiff = (now - lastTime) / (1000 * 60 * 60);

    // 如果超过24小时，再次播放
    return hoursDiff < 24;
  }

  // 标记已播放
  function markIntroPlayed() {
    localStorage.setItem('zootopiaIntroLastPlayed', new Date().toISOString());
  }

  // 创建开场动画
  function createIntroAnimation() {
    // 创建跳过按钮
    const skipBtn = document.createElement('button');
    skipBtn.className = 'skip-intro-btn';
    skipBtn.textContent = '跳过介绍';
    skipBtn.onclick = () => {
      document.querySelectorAll('.character-intro').forEach(el => el.remove());
      skipBtn.remove();
      showWelcomeToast();
      markIntroPlayed();
    };
    document.body.appendChild(skipBtn);

    // 播放动画
    playAllAnimations();

    // 标记已播放
    markIntroPlayed();
  }

  // 初始化
  function initIntroAnimation() {
    injectStyles();

    // 检查是否需要播放
    const shouldPlay = !hasPlayedIntro();
    if (shouldPlay) {
      // 页面加载后稍作延迟再播放
      setTimeout(createIntroAnimation, 1000);
    }
  }

  // 导出全局函数
  window.zootopiaIntro = {
    play: () => createIntroAnimation(),
    skip: () => {
      document.querySelectorAll('.character-intro').forEach(el => el.remove());
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntroAnimation);
  } else {
    initIntroAnimation();
  }
})();
