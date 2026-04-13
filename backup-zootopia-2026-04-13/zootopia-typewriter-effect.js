/**
 * 疯狂动物城主题 - 打字机特效增强
 * Zootopia Theme - Typewriter Effect
 * 模拟动物城打字机效果的文字输入特效
 */

(function() {
  'use strict';

  // 打字机效果配置
  const typewriterConfig = {
    typingSpeed: 100,    // 打字速度（毫秒）
    deleteSpeed: 50,    // 删除速度（毫秒）
    pauseTime: 2000,     // 停顿时间（毫秒）
    cursorBlink: true,   // 光标闪烁
    soundEffect: true    // 音效
  };

  // 动物城风格的句子数组
  const zootopiaPhrases = [
    "Try Everything! 🐰",
    "It's called a hustle, sweetheart! 🦊",
    "欢迎来到疯狂动物城！🏙️",
    "任何人都可以成就任何事！✨",
    "改变从你开始！💪",
    "在动物城，你可以成为任何你想成为的人！🌟",
    "ZPD：为动物城服务！👮",
    "Gazelle演唱会开始了！🎵",
    "甜甜圈的诱惑！🍩",
    "胡萝卜是兔子的最爱！🥕",
    "慢一点...再慢一点...🐢",
    "你有48小时！🦁",
    "冰棍大促销！🍦",
    "沙漠的阳光真刺眼！☀️",
    "雨林的清新空气！🌴"
  ];

  // 创建打字机特效元素
  function createTypewriterEffect() {
    const effectContainer = document.createElement('div');
    effectContainer.className = 'typewriter-effect-container';

    const typewriter = document.createElement('div');
    typewriter.className = 'zootopia-typewriter';
    typewriter.innerHTML = `
      <span class="typewriter-text" id="typewriterText"></span>
      <span class="typewriter-cursor">|</span>
    `;

    effectContainer.appendChild(typewriter);
    return effectContainer;
  }

  // 当前显示的短语索引
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typewriterTimeout = null;

  // 打字机动画函数
  function typeWriter() {
    const typewriterText = document.getElementById('typewriterText');
    if (!typewriterText) return;

    const currentPhrase = zootopiaPhrases[currentPhraseIndex];

    if (isDeleting) {
      // 删除字符
      typewriterText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % zootopiaPhrases.length;
        typewriterTimeout = setTimeout(typeWriter, 500);
      } else {
        typewriterTimeout = setTimeout(typeWriter, typewriterConfig.deleteSpeed);
      }
    } else {
      // 输入字符
      typewriterText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typewriterTimeout = setTimeout(typeWriter, typewriterConfig.pauseTime);
      } else {
        typewriterTimeout = setTimeout(typeWriter, typewriterConfig.typingSpeed);
      }
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#typewriter-effect-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'typewriter-effect-styles';
    styles.textContent = `
      /* 打字机特效容器 */
      .typewriter-effect-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9998;
        pointer-events: none;
        animation: typewriterFadeIn 0.5s ease;
      }

      @keyframes typewriterFadeIn {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      .zootopia-typewriter {
        padding: 30px 50px;
        background: linear-gradient(135deg, rgba(255, 159, 67, 0.95), rgba(238, 90, 36, 0.95));
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(255, 159, 67, 0.5);
        backdrop-filter: blur(10px);
      }

      .typewriter-text {
        font-size: 24px;
        font-weight: bold;
        color: white;
        font-family: 'Courier New', monospace;
        letter-spacing: 2px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }

      .typewriter-cursor {
        display: inline-block;
        width: 3px;
        height: 28px;
        background: white;
        margin-left: 5px;
        animation: cursorBlink 1s infinite;
        vertical-align: middle;
      }

      @keyframes cursorBlink {
        0%, 50% {
          opacity: 1;
        }
        51%, 100% {
          opacity: 0;
        }
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .typewriter-text {
          font-size: 18px;
        }

        .zootopia-typewriter {
          padding: 20px 30px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化打字机特效
  function initTypewriterEffect() {
    injectStyles();

    const effect = createTypewriterEffect();
    document.body.appendChild(effect);

    // 开始打字机效果
    typeWriter();

    // 显示一段时间后自动隐藏
    setTimeout(() => {
      clearTimeout(typewriterTimeout);
      effect.style.animation = 'typewriterFadeOut 0.5s ease forwards';
      setTimeout(() => {
        if (effect.parentElement) {
          effect.remove();
        }
      }, 500);
    }, 15000); // 15秒后隐藏
  }

  // 页面加载完成后显示打字机效果
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initTypewriterEffect, 2000);
    });
  } else {
    setTimeout(initTypewriterEffect, 2000);
  }

  // 导出显示函数
  window.showTypewriterEffect = initTypewriterEffect;
})();
