/**
 * 疯狂动物城主题 - 页面加载动画和欢迎系统
 * Zootopia Theme - Page Loading Animation and Welcome System
 */

(function() {
  'use strict';

  // 角色欢迎语录
  const welcomeQuotes = {
    judy: {
      character: 'Judy Hopps',
      emoji: '🐰',
      quotes: [
        { text: "欢迎来到动物城博客！Try Everything!", action: "explore" },
        { text: "这里记录了我和Nick的冒险故事！", action: "read" },
        { text: "准备好探索了吗？任何人都可以成就任何事！", action: "start" }
      ]
    },
    nick: {
      character: 'Nick Wilde',
      emoji: '🦊',
      quotes: [
        { text: "Yo, 这里是疯狂动物城主题博客，甜心。", action: "browse" },
        { text: "我正在卖Pawpsicle，要来一根吗？只要$2！", action: "shop" },
        { text: "It's called a hustle, sweetheart. 享受你的浏览！", action: "enjoy" }
      ]
    },
    flash: {
      character: 'Flash',
      emoji: '🦥',
      quotes: [
        { text: "你................................好..................................", action: "wait" },
        { text: "欢................................迎", action: "hello" },
        { text: "博................................客", action: "blog" }
      ]
    }
  };

  // 创建全屏加载动画
  function createLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'zootopia-loading-screen';
    loading.id = 'zootopiaLoading';
    loading.innerHTML = `
      <div class="loading-content">
        <div class="loading-train">
          <span class="train-car">🚂</span>
          <span class="train-car">🚃</span>
          <span class="train-car">🚃</span>
          <span class="train-car">🚃</span>
          <span class="train-car">🚃</span>
        </div>
        <div class="loading-text">前往动物城...</div>
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-text">0%</div>
        </div>
        <div class="loading-districts">
          <span class="district-district" style="background: #FF9F43;">🏜️</span>
          <span class="district-district" style="background: #0ABDE3;">❄️</span>
          <span class="district-district" style="background: #10AC84;">🌴</span>
          <span class="district-district" style="background: #5F27CD;">🏙️</span>
          <span class="district-district" style="background: #26DE81;">🥕</span>
          <span class="district-district" style="background: #EE5A24;">🐭</span>
        </div>
      </div>
      `;

    loading.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #FF9F43, #0ABDE3);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    document.body.appendChild(loading);

    // 模拟加载进度
    let progress = 0;
    const progressFill = loading.querySelector('.progress-fill');
    const progressText = loading.querySelector('.progress-text');

    const loadInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
      }
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.floor(progress)}%`;
    }, 200);

    // 页面加载完成后隐藏
    window.addEventListener('load', () => {
      setTimeout(() => {
        loading.style.opacity = '0';
        loading.style.visibility = 'hidden';
        setTimeout(() => {
          loading.remove();
          showWelcomeMessage();
        }, 500);
      }, 1500);
    });
  }

  // 显示欢迎消息
  function showWelcomeMessage() {
    // 检查是否首次访问
    const visited = localStorage.getItem('zootopia-visited');
    if (!visited || Math.random() < 0.3) { // 30%概率显示
      const characters = ['judy', 'nick', 'flash'];
      const character = characters[Math.floor(Math.random() * characters.length)];
      const quote = welcomeQuotes[character].quotes[Math.floor(Math.random() * 3)];

      const welcome = document.createElement('div');
      welcome.className = 'zootopia-welcome-message';
      welcome.innerHTML = `
        <div class="welcome-avatar">${quote.emoji}</div>
        <div class="welcome-character">${welcomeQuotes[character].character}</div>
        <div class="welcome-quote">"${quote.text}"</div>
        <div class="welcome-actions">
          <button class="welcome-btn action-btn" onclick="this.closest('.zootopia-welcome-message').remove()">开始探索</button>
          <button class="welcome-btn close-btn" onclick="this.closest('.zootopia-welcome-message').remove()">稍后再说</button>
        </div>
        <button class="welcome-close" onclick="this.closest('.zootopia-welcome-message').remove()">×</button>
      `;

      welcome.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        max-width: 500px;
        text-align: center;
        animation: welcomePop 0.5s ease;
      `;

      document.body.appendChild(welcome);

      // 保存访问记录
      localStorage.setItem('zootopia-visited', 'true');

      // 自动消失（15秒后）
      setTimeout(() => {
        if (welcome.parentNode) {
          welcome.style.animation = 'welcomeFadeOut 0.5s ease forwards';
          setTimeout(() => welcome.remove(), 500);
        }
      }, 15000);
    }
  }

  // 创建滚动触发动画
  function createScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');

          // 为不同元素添加不同的动画类
          if (entry.target.classList.contains('post-card')) {
            entry.target.classList.add('slide-up');
          } else if (entry.target.classList.contains('pagination')) {
            entry.target.classList.add('fade-in');
          } else if (entry.target.querySelector('h1, h2, h3')) {
            entry.target.classList.add('title-reveal');
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 观察所有文章卡片
    document.querySelectorAll('.post-card, .pagination, .card-widget').forEach(el => {
      observer.observe(el);
    });
  }

  // 创建鼠标跟随效果
  function createCursorTrail() {
    // 仅在桌面端启用
    if (window.innerWidth < 768) return;

    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #FF9F43, #0ABDE3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(dot);
      trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;
    let currentIndex = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 动画循环
    function animateTrail() {
      const dot = trail[currentIndex];
      dot.style.left = `${mouseX - 4}px`;
      dot.style.top = `${mouseY - 4}px`;
      dot.style.opacity = '0.6';

      currentIndex = (currentIndex + 1) % trailLength;

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

  // 创建页面加载时的烟花效果
  function createWelcomeFirework() {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'welcome-firework';
      firework.innerHTML = '<div class="firework-explosion"></div>';

      firework.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9998;
        pointer-events: none;
      `;

      document.body.appendChild(firework);

      setTimeout(() => firework.remove(), 3000);
    }, 2000);
  }

  // 创建地区主题切换快捷键提示
  function createKeyboardHints() {
    const hints = document.createElement('div');
    hints.className = 'keyboard-hints';
    hints.innerHTML = `
      <div class="hints-header">⌨️ 快捷键</div>
      <div class="hints-list">
        <div class="hint-item"><kbd>Ctrl+G</kbd> 游戏中心</div>
        <div class="hint-item"><kbd>Ctrl+H</kbd> 切换主题</div>
        <div class="hint-item"><kbd>Ctrl+T</kbd> 返回顶部</div>
      </div>
      <button class="hints-close" onclick="this.parentElement.remove()">×</button>
    `;

    hints.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      z-index: 9996;
      font-size: 14px;
      animation: hintsSlide 0.5s ease;
    `;

    // 5秒后自动隐藏
    setTimeout(() => {
      if (document.body.contains(hints)) {
        hints.style.animation = 'hintsFadeOut 0.5s ease forwards';
        setTimeout(() => hints.remove(), 500);
      }
    }, 10000);

    document.body.appendChild(hints);
  }

  // 创建阅读时间估算
  function createReadingTime() {
    const articles = document.querySelectorAll('.post-content');
    articles.forEach(article => {
      const text = article.innerText;
      const words = text.split(/\s+/).length;
      const readingTime = Math.ceil(words / 200); // 假设每分钟200字

      const timeBadge = document.createElement('div');
      timeBadge.className = 'reading-time-badge';
      timeBadge.textContent = `⏱️ 阅读时间: ${readingTime} 分钟`;
      timeBadge.style.cssText = `
        display: inline-block;
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 15px;
      `;

      const title = article.querySelector('h1, h2, h3');
      if (title && title.parentNode) {
        title.parentNode.insertBefore(timeBadge, title.nextSibling);
      }
    });
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#page-animations-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'page-animations-styles';
    styles.textContent = `
      /* 欢迎消息动画 */
      @keyframes welcomePop {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.05);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }

      @keyframes welcomeFadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      /* 加载屏幕样式 */
      .loading-content {
        text-align: center;
        color: white;
        z-index: 10;
      }

      .loading-train {
        font-size: 60px;
        margin-bottom: 30px;
        display: flex;
        gap: 10px;
        animation: trainMove 1s ease-in-out infinite;
      }

      @keyframes trainMove {
        0%, 100% {
          transform: translateX(-10px);
        }
        50% {
          transform: translateX(10px);
        }
      }

      .loading-text {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }

      .loading-progress {
        width: 300px;
        height: 10px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        overflow: hidden;
        margin: 0 auto;
      }

      .progress-bar {
        height: 100%;
        width: 0%;
        background: white;
        border-radius: 10px;
        transition: width 0.2s ease;
      }

      .progress-text {
        margin-top: 10px;
        font-size: 16px;
      }

      .loading-districts {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 30px;
      }

      .district-district {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        animation: districtBounce 2s ease-in-out infinite;
      }

      @keyframes districtBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      /* 欢迎消息样式 */
      .welcome-avatar {
        font-size: 60px;
        margin-bottom: 15px;
        animation: avatarFloat 2s ease-in-out infinite;
      }

      @keyframes avatarFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }

      .welcome-character {
        font-size: 18px;
        font-weight: bold;
        color: #FF9F43;
        margin-bottom: 10px;
      }

      .welcome-quote {
        font-size: 16px;
        color: #555;
        font-style: italic;
        margin-bottom: 20px;
        line-height: 1.6;
        padding: 0 20px;
      }

      .welcome-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-bottom: 15px;
      }

      .welcome-btn {
        padding: 10px 25px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .action-btn {
        background: linear-gradient(135deg, #FF9F43, #EE5A24);
        color: white;
      }

      .action-btn:hover {
        background: linear-gradient(135deg, #EE5A24, #FF9F43);
        transform: scale(1.05);
      }

      .close-btn {
        background: #95A5A6;
        color: white;
      }

      .close-btn:hover {
        background: #7F8C8D;
      }

      .welcome-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        color: #999;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }

      /* 滚动动画 */
      .animate-in {
        animation: fadeInUp 0.6s ease forwards;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .slide-up {
        animation: slideUp 0.6s ease forwards;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fade-in {
        animation: fadeIn 0.8s ease forwards;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .title-reveal h1,
      .title-reveal h2,
      .title-reveal h3 {
        animation: titleReveal 0.8s ease forwards;
      }

      @keyframes titleReveal {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* 烟花效果 */
      .welcome-firework {
        animation: fireworkFade 3s ease forwards;
      }

      @keyframes fireworkFade {
        0% { opacity: 0; }
        10% { opacity: 1; }
        100% { opacity: 0; }
      }

      .firework-explosion::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #FF9F43, transparent);
        border-radius: 50%;
        animation: explode 2s ease-out infinite;
      }

      @keyframes explode {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(20);
          opacity: 0;
        }
      }

      /* 快捷键提示 */
      @keyframes hintsSlide {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes hintsFadeOut {
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }

      .hints-header {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .hints-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .hint-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;
        font-size: 13px;
      }

      .hint-item kbd {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        padding: 2px 6px;
        font-family: monospace;
      }

      .hints-close {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-size: 20px;
        cursor: pointer;
        padding: 0;
      }

      .hints-close:hover {
        color: white;
      }
    `;

    document.head.appendChild(styles);
  }

  // 创建页面装饰元素
  function createPageDecorations() {
    // 添加角落装饰
    const corners = document.createElement('div');
    corners.className = 'page-corner-decorations';
    corners.innerHTML = `
      <div class="corner corner-tl">🐾</div>
      <div class="corner corner-tr">🐾</div>
      <div class="corner corner-bl">🐾</div>
      <div class="corner corner-br">🐾</div>
    `;

    corners.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `;

    document.body.appendChild(corners);

    const cornerStyle = document.createElement('style');
    cornerStyle.textContent = `
      .corner {
        position: fixed;
        font-size: 30px;
        opacity: 0.2;
        z-index: 0;
      }

      .corner-tl { top: 20px; left: 20px; }
      .corner-tr { top: 20px; right: 20px; }
      .corner-bl { bottom: 20px; left: 20px; }
      .corner-br { bottom: 20px; right: 20px; }

      @media (max-width: 768px) {
        .corner { font-size: 20px; }
      }
    `;
    document.head.appendChild(cornerStyle);
  }

  // 初始化所有功能
  function initAll() {
    injectStyles();

    // 页面加载动画（首次访问）
    if (!sessionStorage.getItem('zootopia-loaded')) {
      createLoadingScreen();
      sessionStorage.setItem('zootopia-loaded', 'true');
    } else {
      // 非首次访问，只显示欢迎消息
      setTimeout(showWelcomeMessage, 1000);
    }

    // 滚动动画
    createScrollAnimations();

    // 鼠标轨迹（仅桌面端）
    if (window.innerWidth > 768) {
      createCursorTrail();
    }

    // 页面加载烟花
    createWelcomeFirework();

    // 快捷键提示（首次访问）
    if (!localStorage.getItem('zootopia-hints-shown')) {
      setTimeout(createKeyboardHints, 3000);
      localStorage.setItem('zootopia-hints-shown', 'true');
    }

    // 阅读时间估算
    setTimeout(createReadingTime, 2000);

    // 页面装饰
    createPageDecorations();

    // 绑定快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl+G - 游戏中心
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        const gameBtn = document.querySelector('.zootopia-game-button');
        if (gameBtn) gameBtn.click();
      }

      // Ctrl+H - 切换主题（随机）
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        const districts = ['#FF9F43', '#0ABDE3', '#10AC84', '#5F27CD'];
        const randomColor = districts[Math.floor(Math.random() * districts.length)];
        document.body.style.setProperty('--theme-color', randomColor);
        showToast('🎨', `主题色已切换！`);
      }

      // Ctrl+T 或 Ctrl+Home - 返回顶部
      if (e.ctrlKey && (e.key === 't' || e.key === 'Home')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
