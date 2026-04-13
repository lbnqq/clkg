/**
 * 疯狂动物城主题 - 特效与动画
 * Zootopia Theme - Effects and Animations
 */

(function() {
  'use strict';

  // 创建爪印下雨特效
  function createPawprintRain() {
    const pawprints = ['🐾', '🐾', '🐾', '🐰', '🦊', '🦁', '🐯', '🦭'];
    const container = document.createElement('div');
    container.className = 'zootopia-pawprint-rain';
    container.id = 'pawprintRain';

    document.body.appendChild(container);

    // 定期添加爪印
    setInterval(() => {
      if (Math.random() < 0.1) { // 10% 概率
        const pawprint = document.createElement('div');
        pawprint.className = 'falling-pawprint';
        pawprint.textContent = pawprints[Math.floor(Math.random() * pawprints.length)];
        pawprint.style.cssText = `
          position: fixed;
          top: -50px;
          left: ${Math.random() * 100}vw;
          font-size: ${20 + Math.random() * 20}px;
          opacity: 0.6;
          pointer-events: none;
          z-index: 9999;
          animation: pawprintFall ${5 + Math.random() * 5}s linear forwards;
        `;

        container.appendChild(pawprint);

        // 动画结束后移除
        setTimeout(() => pawprint.remove(), 10000);
      }
    }, 500);
  }

  // 创建城市灯光效果
  function createCityLights() {
    const lightsContainer = document.createElement('div');
    lightsContainer.className = 'city-lights-overlay';
    lightsContainer.innerHTML = `
      <div class="city-light" style="top: 10%; left: 15%;"></div>
      <div class="city-light" style="top: 20%; left: 75%;"></div>
      <div class="city-light" style="top: 35%; left: 45%;"></div>
      <div class="city-light" style="top: 50%; left: 25%;"></div>
      <div class="city-light" style="top: 60%; left: 85%;"></div>
      <div class="city-light" style="top: 75%; left: 55%;"></div>
      <div class="city-light" style="top: 85%; left: 35%;"></div>
    `;

    lightsContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.3;
    `;

    document.body.appendChild(lightsContainer);
  }

  // 创建火车驶过效果
  function createTrainPassEffect() {
    const train = document.createElement('div');
    train.className = 'train-pass-effect';
    train.innerHTML = `
      <div class="train-engine">🚂</div>
      <div class="train-carriage">🚃</div>
      <div class="train-carriage">🚃</div>
    `;

    train.style.cssText = `
      position: fixed;
      top: ${20 + Math.random() * 60}%;
      left: -300px;
      font-size: 60px;
      z-index: 9998;
      pointer-events: none;
      display: flex;
      gap: 10px;
      filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
    `;

    document.body.appendChild(train);

    // 动画
    setTimeout(() => {
      train.style.transition = 'left 3s linear';
      train.style.left = '110vw';
    }, 100);

    // 清理
    setTimeout(() => train.remove(), 3500);

    // 每2-5分钟出现一次
    setTimeout(createTrainPassEffect, 120000 + Math.random() * 180000);
  }

  // 创建地区切换特效
  function createDistrictTransitionEffect(fromColor, toColor) {
    const overlay = document.createElement('div');
    overlay.className = 'district-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${fromColor};
      z-index: 99999;
      pointer-events: none;
      animation: districtTransition 1s ease-in-out;
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.style.background = toColor;
    }, 500);

    setTimeout(() => overlay.remove(), 1000);
  }

  // 创建烟花效果（庆祝时使用）
  function createFireworkEffect(x, y) {
    const colors = ['#FF9F43', '#0ABDE3', '#10AC84', '#5F27CD', '#EE5A24', '#FFD700'];
    const particles = 30;

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      const angle = (i / particles) * Math.PI * 2;
      const velocity = 2 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px ${color};
      `;

      document.body.appendChild(particle);

      // 动画
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity;
      let opacity = 1;

      const animate = () => {
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);

        particle.style.left = `${currentLeft + vx}px`;
        particle.style.top = `${currentTop + vy}px`;
        particle.style.opacity = opacity;

        vy += 0.05; // 重力
        opacity -= 0.02;

        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      requestAnimationFrame(animate);
    }
  }

  // 创建星星闪烁效果
  function createStarField() {
    const starField = document.createElement('div');
    starField.className = 'zootopia-starfield';
    starField.id = 'starfield';

    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.cssText = `
        position: fixed;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;

      starField.appendChild(star);
    }

    starField.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.5;
    `;

    document.body.appendChild(starField);
  }

  // 创建彩虹轨迹（鼠标移动）
  function createRainbowTrail() {
    let lastX = 0, lastY = 0;
    const colors = ['#FF9F43', '#0ABDE3', '#10AC84', '#5F27CD', '#EE5A24'];
    let colorIndex = 0;

    document.addEventListener('mousemove', (e) => {
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      if (distance > 50) {
        const dot = document.createElement('div');
        dot.className = 'rainbow-dot';
        dot.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: 10px;
          height: 10px;
          background: ${colors[colorIndex]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: dotFade 1s ease forwards;
        `;

        document.body.appendChild(dot);

        colorIndex = (colorIndex + 1) % colors.length;
        lastX = e.clientX;
        lastY = e.clientY;

        setTimeout(() => dot.remove(), 1000);
      }
    });
  }

  // 创建成就解锁效果
  function createAchievementUnlockEffect(title, description) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-unlock';
    achievement.innerHTML = `
      <div class="achievement-icon">🏆</div>
      <div class="achievement-content">
        <div class="achievement-title">${title}</div>
        <div class="achievement-desc">${description}</div>
      </div>
    `;

    achievement.style.cssText = `
      position: fixed;
      top: 100px;
      right: -400px;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
      z-index: 9999;
      display: flex;
      gap: 15px;
      animation: achievementSlide 0.5s ease forwards;
    `;

    document.body.appendChild(achievement);

    // 播放音效（可选）
    // const audio = new Audio('/sounds/achievement.mp3');
    // audio.play();

    setTimeout(() => {
      achievement.style.animation = 'achievementSlideOut 0.5s ease forwards';
      setTimeout(() => achievement.remove(), 500);
    }, 4000);
  }

  // 创建页面过渡动画
  function createPageTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = '<div class="transition-train">🚂</div>';

    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #FF9F43, #0ABDE3);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      animation: pageTransitionIn 0.5s ease forwards;
    `;

    return overlay;
  }

  // 注入样式
  function injectEffectStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      @keyframes pawprintFall {
        to {
          transform: translateY(110vh) rotate(360deg);
          opacity: 0;
        }
      }

      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }

      @keyframes dotFade {
        to {
          transform: scale(0);
          opacity: 0;
        }
      }

      @keyframes districtTransition {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }

      @keyframes achievementSlide {
        to { right: 20px; }
      }

      @keyframes achievementSlideOut {
        to { right: -400px; }
      }

      @keyframes pageTransitionIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes pageTransitionOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      .city-light {
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
        border-radius: 50%;
        animation: lightPulse 3s ease-in-out infinite;
      }

      @keyframes lightPulse {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.5); opacity: 0.6; }
      }

      .transition-train {
        font-size: 100px;
        animation: trainMove 1s ease-in-out infinite;
      }

      @keyframes trainMove {
        0%, 100% { transform: translateX(-20px); }
        50% { transform: translateX(20px); }
      }

      .achievement-icon {
        font-size: 48px;
        animation: achievementBounce 0.5s ease;
      }

      @keyframes achievementBounce {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      .achievement-content {
        color: white;
      }

      .achievement-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .achievement-desc {
        font-size: 14px;
        opacity: 0.9;
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化所有特效
  function initEffects() {
    injectEffectStyles();

    // 爪印雨
    createPawprintRain();

    // 城市灯光
    createCityLights();

    // 火车通过效果
    setTimeout(createTrainPassEffect, 5000);

    // 星空（仅在夜间或深色模式）
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      createStarField();
    }

    // 彩虹轨迹（仅在桌面端启用）
    if (window.innerWidth > 768) {
      // createRainbowTrail(); // 可选：可能会影响性能
    }

    // 监听页面切换
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        // 页面切换时的特效
        // const transition = createPageTransition();
        // document.body.appendChild(transition);
        // setTimeout(() => {
        //   transition.style.animation = 'pageTransitionOut 0.5s ease forwards';
        //   setTimeout(() => transition.remove(), 500);
        // }, 500);
      }
    }).observe(document, { subtree: true, childList: true });

    // 全局函数：创建烟花
    window.zootopiaFirework = (x, y) => createFireworkEffect(x, y);

    // 全局函数：解锁成就
    window.zootopiaAchievement = (title, description) => {
      createAchievementUnlockEffect(title, description);
    };

    // 全局函数：地区切换特效
    window.zootopiaDistrictTransition = (from, to) => {
      createDistrictTransitionEffect(from, to);
    };

    // 示例：首次访问解锁成就
    if (!localStorage.getItem('zootopia-first-visit')) {
      setTimeout(() => {
        window.zootopiaAchievement(
          '欢迎来到动物城！',
          '你已成功进入疯狂动物城主题博客'
        );
        localStorage.setItem('zootopia-first-visit', 'true');
      }, 2000);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEffects);
  } else {
    initEffects();
  }
})();
