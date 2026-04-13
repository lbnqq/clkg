/**
 * 疯狂动物城主题 - 头部背景装饰增强
 * Zootopia Theme - Header Background Decorations
 */

(function() {
  'use strict';

  // 创建头部背景装饰容器
  function createHeaderDecorations() {
    const header = document.querySelector('#page-header');
    if (!header) return;

    // 创建装饰容器
    const decorations = document.createElement('div');
    decorations.className = 'zootopia-header-decorations';
    decorations.innerHTML = `
      <!-- 浮动爪印 -->
      <div class="floating-paw paw-1">🐾</div>
      <div class="floating-paw paw-2">🐾</div>
      <div class="floating-paw paw-3">🐾</div>
      <div class="floating-paw paw-4">🐾</div>
      <div class="floating-paw paw-5">🐾</div>
      <div class="floating-paw paw-6">🐾</div>

      <!-- 地区图标 -->
      <div class="district-icon saharai-icon">🏜️</div>
      <div class="district-icon tundra-icon">❄️</div>
      <div class="district-icon rainforest-icon">🌴</div>
      <div class="district-icon downtown-icon">🏙️</div>

      <!-- 星星装饰 -->
      <div class="header-star star-1">⭐</div>
      <div class="header-star star-2">✨</div>
      <div class="header-star star-3">💫</div>
      <div class="header-star star-4">⭐</div>

      <!-- 气泡装饰 -->
      <div class="header-bubble bubble-1"></div>
      <div class="header-bubble bubble-2"></div>
      <div class="header-bubble bubble-3"></div>

      <!-- 火车烟雾 -->
      <div class="train-smoke smoke-1"></div>
      <div class="train-smoke smoke-2"></div>
      <div class="train-smoke smoke-3"></div>

      <!-- 光线效果 -->
      <div class="light-ray ray-1"></div>
      <div class="light-ray ray-2"></div>
      <div class="light-ray ray-3"></div>

      <!-- 角色剪影 -->
      <div class="character-silhouette judy-silhouette">🐰</div>
      <div class="character-silhouette nick-silhouette">🦊</div>

      <!-- 火车 -->
      <div class="header-train">
        <span class="train-engine">🚂</span>
        <span class="train-car">🚃</span>
        <span class="train-car">🚃</span>
      </div>
    `;

    header.appendChild(decorations);

    // 注入样式
    injectHeaderStyles();
  }

  // 注入头部装饰样式
  function injectHeaderStyles() {
    if (document.querySelector('#header-decoration-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'header-decoration-styles';
    styles.textContent = `
      /* === 浮动爪印 === */
      .floating-paw {
        position: absolute;
        font-size: 20px;
        opacity: 0.3;
        pointer-events: none;
        z-index: 3;
        animation: pawFloat 15s ease-in-out infinite;
      }

      .paw-1 { top: 10%; left: 5%; animation-delay: 0s; }
      .paw-2 { top: 20%; right: 10%; animation-delay: 3s; }
      .paw-3 { top: 60%; left: 8%; animation-delay: 6s; }
      .paw-4 { top: 70%; right: 5%; animation-delay: 9s; }
      .paw-5 { top: 40%; left: 15%; animation-delay: 12s; }
      .paw-6 { top: 50%; right: 15%; animation-delay: 2s; }

      @keyframes pawFloat {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-30px) rotate(10deg);
          opacity: 0.5;
        }
      }

      /* === 地区图标 === */
      .district-icon {
        position: absolute;
        font-size: 40px;
        opacity: 0.4;
        pointer-events: none;
        z-index: 3;
        animation: iconBounce 4s ease-in-out infinite;
      }

      .saharai-icon { top: 15%; left: 25%; animation-delay: 0s; }
      .tundra-icon { top: 25%; right: 20%; animation-delay: 1s; }
      .rainforest-icon { bottom: 30%; left: 20%; animation-delay: 2s; }
      .downtown-icon { bottom: 20%; right: 25%; animation-delay: 3s; }

      @keyframes iconBounce {
        0%, 100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-20px) scale(1.1);
        }
      }

      /* === 星星装饰 === */
      .header-star {
        position: absolute;
        font-size: 24px;
        opacity: 0.6;
        pointer-events: none;
        z-index: 3;
        animation: starTwinkle 2s ease-in-out infinite;
      }

      .star-1 { top: 10%; left: 40%; animation-delay: 0s; }
      .star-2 { top: 20%; right: 35%; animation-delay: 0.5s; }
      .star-3 { bottom: 35%; left: 45%; animation-delay: 1s; }
      .star-4 { bottom: 25%; right: 40%; animation-delay: 1.5s; }

      @keyframes starTwinkle {
        0%, 100% {
          opacity: 0.3;
          transform: scale(0.8);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.2);
        }
      }

      /* === 气泡装饰 === */
      .header-bubble {
        position: absolute;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2;
        animation: bubbleRise 8s ease-in-out infinite;
      }

      .bubble-1 { width: 60px; height: 60px; bottom: 20%; left: 10%; animation-delay: 0s; }
      .bubble-2 { width: 80px; height: 80px; bottom: 30%; right: 15%; animation-delay: 3s; }
      .bubble-3 { width: 50px; height: 50px; bottom: 15%; left: 30%; animation-delay: 6s; }

      @keyframes bubbleRise {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-100px) scale(1.2);
          opacity: 0.5;
        }
      }

      /* === 火车烟雾 === */
      .train-smoke {
        position: absolute;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2;
        animation: smokeFloat 5s ease-out infinite;
      }

      .smoke-1 { bottom: 30%; left: 20%; animation-delay: 0s; }
      .smoke-2 { bottom: 25%; left: 22%; animation-delay: 2s; }
      .smoke-3 { bottom: 20%; left: 18%; animation-delay: 4s; }

      @keyframes smokeFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.4;
        }
        100% {
          transform: translateY(-200px) scale(3);
          opacity: 0;
        }
      }

      /* === 光线效果 === */
      .light-ray {
        position: absolute;
        width: 3px;
        height: 200px;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent);
        pointer-events: none;
        z-index: 1;
        transform-origin: top center;
        animation: rayRotate 20s linear infinite;
      }

      .ray-1 { top: 0; left: 30%; animation-delay: 0s; transform: rotate(15deg); }
      .ray-2 { top: 0; left: 50%; animation-delay: 7s; transform: rotate(-10deg); }
      .ray-3 { top: 0; left: 70%; animation-delay: 14s; transform: rotate(25deg); }

      @keyframes rayRotate {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.6;
        }
      }

      /* === 角色剪影 === */
      .character-silhouette {
        position: absolute;
        font-size: 60px;
        opacity: 0.5;
        pointer-events: none;
        z-index: 3;
        animation: characterPeek 10s ease-in-out infinite;
      }

      .judy-silhouette { bottom: 20%; left: 5%; animation-delay: 0s; }
      .nick-silhouette { bottom: 25%; right: 5%; animation-delay: 5s; }

      @keyframes characterPeek {
        0%, 100% {
          transform: translateY(0);
          opacity: 0.5;
        }
        50% {
          transform: translateY(-20px);
          opacity: 0.7;
        }
      }

      /* === 火车 === */
      .header-train {
        position: absolute;
        bottom: 15%;
        left: -200px;
        font-size: 50px;
        display: flex;
        gap: 10px;
        z-index: 4;
        pointer-events: none;
        animation: trainRide 30s linear infinite;
        filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
      }

      @keyframes trainRide {
        0% {
          left: -200px;
        }
        45%, 55% {
          left: 55%;
        }
        100% {
          left: 110%;
        }
      }

      /* === 额外的背景装饰 === */
      #page-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
          radial-gradient(circle at 20% 30%, rgba(255, 159, 67, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(10, 189, 227, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(16, 172, 132, 0.1) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
      }

      /* === 标题区域增强 === */
      #page-title {
        position: relative;
        z-index: 10;
      }

      #page-title::before {
        content: '🐾';
        position: absolute;
        top: -30px;
        left: 20px;
        font-size: 30px;
        animation: titlePawBounce 2s ease-in-out infinite;
      }

      #page-title::after {
        content: '🐾';
        position: absolute;
        top: -30px;
        right: 20px;
        font-size: 30px;
        animation: titlePawBounce 2s ease-in-out infinite 1s;
      }

      @keyframes titlePawBounce {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-10px) rotate(10deg);
        }
      }

      /* === 博客标题装饰 === */
      .blog-title {
        position: relative;
        display: inline-block;
      }

      .blog-title::before {
        content: '🌟';
        position: absolute;
        left: -40px;
        top: 50%;
        transform: translateY(-50%);
        animation: starSpin 3s linear infinite;
      }

      .blog-title::after {
        content: '🌟';
        position: absolute;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
        animation: starSpin 3s linear infinite reverse;
      }

      @keyframes starSpin {
        0% {
          transform: translateY(-50%) rotate(0deg);
        }
        100% {
          transform: translateY(-50%) rotate(360deg);
        }
      }

      /* === 响应式调整 === */
      @media (max-width: 768px) {
        .floating-paw { font-size: 15px; }
        .district-icon { font-size: 30px; }
        .header-star { font-size: 18px; }
        .character-silhouette { font-size: 40px; }
        .header-train { font-size: 35px; }
      }
    `;

    document.head.appendChild(styles);
  }

  // 为首页添加额外的装饰
  function enhanceIndexHeader() {
    const isIndex = document.body.classList.contains('home') ||
                     location.pathname === '/' ||
                     location.pathname === '/index.html';

    if (!isIndex) return;

    const header = document.querySelector('#page-header');
    if (!header) return;

    // 添加首页专属装饰
    const indexDecorations = document.createElement('div');
    indexDecorations.className = 'zootopia-index-decorations';
    indexDecorations.innerHTML = `
      <!-- 角色欢迎 -->
      <div class="welcome-message">
        <span class="welcome-emoji">🐰</span>
        <span class="welcome-text">欢迎来到动物城！</span>
        <span class="welcome-emoji">🦊</span>
      </div>

      <!-- 城市灯光效果 -->
      <div class="city-lights">
        <div class="city-light light-1"></div>
        <div class="city-light light-2"></div>
        <div class="city-light light-3"></div>
        <div class="city-light light-4"></div>
        <div class="city-light light-5"></div>
      </div>

      <!-- 烟花效果 -->
      <div class="firework-container">
        <div class="firework firework-1"></div>
        <div class="firework firework-2"></div>
      </div>
    `;

    header.appendChild(indexDecorations);

    // 添加首页装饰样式
    const indexStyles = document.createElement('style');
    indexStyles.textContent = `
      /* === 欢迎消息 === */
      .welcome-message {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 28px;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        z-index: 10;
        animation: welcomeSlide 3s ease-out;
      }

      .welcome-emoji {
        font-size: 40px;
        animation: emojiBounce 1s ease-in-out infinite alternate;
      }

      @keyframes emojiBounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
      }

      @keyframes welcomeSlide {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      /* === 城市灯光 === */
      .city-lights {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
      }

      .city-light {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #FFD700;
        border-radius: 50%;
        box-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        animation: lightFlicker 2s ease-in-out infinite;
      }

      .light-1 { top: 30%; left: 15%; animation-delay: 0s; }
      .light-2 { top: 40%; right: 20%; animation-delay: 0.5s; }
      .light-3 { top: 60%; left: 25%; animation-delay: 1s; }
      .light-4 { top: 70%; right: 30%; animation-delay: 1.5s; }
      .light-5 { top: 50%; left: 45%; animation-delay: 2s; }

      @keyframes lightFlicker {
        0%, 100% {
          opacity: 0.5;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.5);
        }
      }

      /* === 烟花效果 === */
      .firework-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
      }

      .firework {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        animation: fireworkExplode 4s ease-out infinite;
      }

      .firework-1 {
        top: 30%;
        right: 20%;
        background: #FF9F43;
        box-shadow: 0 0 10px #FF9F43;
        animation-delay: 0s;
      }

      .firework-2 {
        top: 40%;
        left: 15%;
        background: #0ABDE3;
        box-shadow: 0 0 10px #0ABDE3;
        animation-delay: 2s;
      }

      @keyframes fireworkExplode {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        50% {
          transform: scale(20);
          opacity: 0.8;
        }
        100% {
          transform: scale(30);
          opacity: 0;
        }
      }
    `;

    document.head.appendChild(indexStyles);
  }

  // 初始化头部装饰
  function initHeaderDecorations() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(createHeaderDecorations, 100);
        setTimeout(enhanceIndexHeader, 200);
      });
    } else {
      setTimeout(createHeaderDecorations, 100);
      setTimeout(enhanceIndexHeader, 200);
    }
  }

  // 启动
  initHeaderDecorations();
})();
