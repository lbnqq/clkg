/**
 * 疯狂动物城主题 - 增强视觉效果系统
 * Zootopia Theme - Enhanced Visuals System
 * | 霓虹灯光、动态背景、粒子效果
 */

(function() {
  'use strict';

  // 动物城地区颜色主题
  const districtThemes = {
    sahara: {
      name: '撒哈拉广场',
      primaryColor: '#FF9F43',
      secondaryColor: '#F39C12',
      accentColor: '#E67E22',
      bgColor: 'linear-gradient(135deg, #FFF5E6 0%, #FFE5CC 100%)',
      pattern: 'desert'
    },
    tundratown: {
      name: '冰川镇',
      primaryColor: '#0ABDE3',
      secondaryColor: '#74B9FF',
      accentColor: '#0984E3',
      bgColor: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
      pattern: 'snow'
    },
    rainforest: {
      name: '雨林区',
      primaryColor: '#10AC84',
      secondaryColor: '#00D2D3',
      accentColor: '#26DE81',
      bgColor: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
      pattern: 'jungle'
    },
    downtown: {
      name: '市中心',
      primaryColor: '#5F27CD',
      secondaryColor: '#9B59B6',
      accentColor: '#8E44AD',
      bgColor: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
      pattern: 'city'
    },
    bunnyburrow: {
      name: '兔子洞',
      primaryColor: '#26DE81',
      secondaryColor: '#2ECC71',
      accentColor: '#A17F68',
      bgColor: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)',
      pattern: 'farm'
    }
  };

  // 当前主题
  let currentTheme = 'downtown';

  // 视觉效果配置
  const visualEffects = {
    neonLights: {
      enabled: true,
      intensity: 0.6
    },
    particles: {
      enabled: true,
      count: 50
    },
    floatingElements: {
      enabled: true,
      elements: ['🐰', '🦊', '🐢', '🦁']
    },
    lightRays: {
      enabled: true,
      angle: 45
    },
    cityLights: {
      enabled: true,
      density: 30
    }
  };

  // 创建霓虹灯效果
  function createNeonLights() {
    const neonContainer = document.createElement('div');
    neonContainer.className = 'neon-lights-container';
    neonContainer.innerHTML = `
      <div class="neon-sign neon-sign-1" style="--neon-color: ${districtThemes[currentTheme].primaryColor}">
        <div class="neon-text">ZOOTOPA</div>
        <div class="neon-glow"></div>
      </div>
      <div class="neon-sign neon-sign-2" style="--neon-color: ${districtThemes[currentTheme].secondaryColor}">
        <div class="neon-text">BLOG</div>
        <div class="neon-glow"></div>
      </div>
      <div class="neon-tube neon-tube-1"></div>
      <div class="neon-tube neon-tube-2"></div>
      <div class="neon-tube neon-tube-3"></div>
    `;
    return neonContainer;
  }

  // 创建粒子效果
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';

    for (let i = 0; i < visualEffects.particles.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 10}s;
        animation-duration: ${Math.random() * 10 + 10}s;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: ${districtThemes[currentTheme].primaryColor};
      `;
      particlesContainer.appendChild(particle);
    }

    return particlesContainer;
  }

  // 创建浮动元素
  function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements-container';

    visualEffects.floatingElements.elements.forEach((emoji, index) => {
      const floating = document.createElement('div');
      floating.className = 'floating-element';
      floating.innerHTML = emoji;
      floating.style.cssText = `
        left: ${Math.random() * 80 + 10}%;
        animation-delay: ${index * 2}s;
        animation-duration: ${Math.random() * 5 + 10}s;
      `;
      floatingContainer.appendChild(floating);
    });

    return floatingContainer;
  }

  // 创建光射线效果
  function createLightRays() {
    const raysContainer = document.createElement('div');
    raysContainer.className = 'light-rays-container';

    for (let i = 0; i < 5; i++) {
      const ray = document.createElement('div');
      ray.className = 'light-ray';
      ray.style.cssText = `
        transform: rotate(${visualEffects.lightRays.angle + i * 15}deg);
        animation-delay: ${i * 0.5}s;
      `;
      raysContainer.appendChild(ray);
    }

    return raysContainer;
  }

  // 创建城市灯光效果
  function createCityLights() {
    const lightsContainer = document.createElement('div');
    lightsContainer.className = 'city-lights-container';

    for (let i = 0; i < visualEffects.cityLights.density; i++) {
      const light = document.createElement('div');
      light.className = 'city-light';
      const colors = [
        districtThemes[currentTheme].primaryColor,
        districtThemes[currentTheme].secondaryColor,
        districtThemes[currentTheme].accentColor,
        '#FF6B6B', '#4ECDC4', '#45B7D1'
      ];
      light.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-delay: ${Math.random() * 3}s;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
      `;
      lightsContainer.appendChild(light);
    }

    return lightsContainer;
  }

  // 创建主题切换器
  function createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.innerHTML = `
      <button class="switcher-toggle" id="switcherToggle">
        <span class="toggle-icon">🎨</span>
      </button>
      <div class="switcher-panel" id="switcherPanel">
        <div class="panel-header">
          <span class="panel-title">选择地区主题</span>
          <button class="panel-close">×</button>
        </div>
        <div class="theme-options">
          ${Object.entries(districtThemes).map(([id, theme]) => `
            <button class="theme-option ${currentTheme === id ? 'active' : ''}" data-theme="${id}">
              <div class="theme-preview" style="background: ${theme.bgColor}"></div>
              <div class="theme-info">
                <div class="theme-name">${theme.name}</div>
                <div class="theme-colors">
                  <span class="color-dot" style="background: ${theme.primaryColor}"></span>
                  <span class="color-dot" style="background: ${theme.secondaryColor}"></span>
                  <span class="color-dot" style="background: ${theme.accentColor}"></span>
                </div>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    return switcher;
  }

  // 切换主题
  function switchTheme(themeId) {
    if (!districtThemes[themeId]) return;

    currentTheme = themeId;
    const theme = districtThemes[themeId];

    // 更新CSS变量
    document.documentElement.style.setProperty('--zootopia-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--zootopia-secondary', theme.secondaryColor);
    document.documentElement.style.setProperty('--zootopia-accent', theme.accentColor);
    document.documentElement.style.setProperty('--zootopia-bg', theme.bgColor);

    // 更新页面背景
    document.body.style.background = theme.bgColor;

    // 重新创建视觉效果
    refreshVisualEffects();

    // 保存选择
    localStorage.setItem('zootopiaTheme', themeId);

    // 触发主题切换事件
    window.dispatchEvent(new CustomEvent('zootopiaThemeChange', {
      detail: { theme: themeId, themeData: theme }
    }));
  }

  // 刷新视觉效果
  function refreshVisualEffects() {
    // 移除旧的效果
    const oldEffects = document.querySelectorAll('.neon-lights-container, .particles-container, .floating-elements-container, .light-rays-container, .city-lights-container');
    oldEffects.forEach(effect => effect.remove());

    // 添加新的效果
    if (visualEffects.neonLights.enabled) {
      document.body.appendChild(createNeonLights());
    }
    if (visualEffects.particles.enabled) {
      document.body.appendChild(createParticles());
    }
    if (visualEffects.floatingElements.enabled) {
      document.body.appendChild(createFloatingElements());
    }
    if (visualEffects.lightRays.enabled) {
      document.body.appendChild(createLightRays());
    }
    if (visualEffects.cityLights.enabled) {
      document.body.appendChild(createCityLights());
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#enhanced-visuals-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'enhanced-visuals-styles';
    styles.textContent = `
      /* 霓虹灯效果 */
      .neon-lights-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      }

      .neon-sign {
        position: absolute;
        font-size: 48px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 8px;
        animation: neonFlicker 3s infinite;
      }

      .neon-sign-1 {
        top: 10%;
        left: 5%;
        transform: rotate(-5deg);
      }

      .neon-sign-2 {
        top: 15%;
        right: 5%;
        transform: rotate(5deg);
      }

      .neon-text {
        color: var(--neon-color);
        text-shadow:
          0 0 5px var(--neon-color),
          0 0 10px var(--neon-color),
          0 0 20px var(--neon-color),
          0 0 40px var(--neon-color),
          0 0 80px var(--neon-color);
      }

      .neon-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120%;
        height: 120%;
        background: radial-gradient(ellipse at center, var(--neon-color) 0%, transparent 70%);
        opacity: 0.3;
        animation: glowPulse 2s ease infinite;
      }

      @keyframes neonFlicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
          opacity: 1;
        }
        20%, 24%, 55% {
          opacity: 0.8;
        }
      }

      @keyframes glowPulse {
        0%, 100% {
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.5;
          transform: translate(-50%, -50%) scale(1.1);
        }
      }

      .neon-tube {
        position: absolute;
        height: 3px;
        background: linear-gradient(90deg,
          transparent,
          var(--zootopia-primary),
          var(--zootopia-secondary),
          var(--zootopia-primary),
          transparent
        );
        box-shadow: 0 0 10px var(--zootopia-primary);
        animation: tubeGlow 3s ease infinite;
      }

      .neon-tube-1 {
        top: 30%;
        left: 0;
        right: 0;
        width: 100%;
      }

      .neon-tube-2 {
        top: 50%;
        left: 10%;
        width: 80%;
      }

      .neon-tube-3 {
        top: 70%;
        right: 15%;
        width: 70%;
      }

      @keyframes tubeGlow {
        0%, 100% {
          opacity: 0.6;
          box-shadow: 0 0 10px var(--zootopia-primary);
        }
        50% {
          opacity: 1;
          box-shadow: 0 0 20px var(--zootopia-primary), 0 0 30px var(--zootopia-secondary);
        }
      }

      /* 粒子效果 */
      .particles-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
      }

      .particle {
        position: absolute;
        background: var(--zootopia-primary);
        border-radius: 50%;
        opacity: 0.6;
        animation: particleFloat 15s linear infinite;
      }

      @keyframes particleFloat {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.6;
        }
        90% {
          opacity: 0.6;
        }
        100% {
          transform: translateY(-100vh) rotate(720deg);
          opacity: 0;
        }
      }

      /* 浮动元素 */
      .floating-elements-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1;
      }

      .floating-element {
        position: absolute;
        font-size: 32px;
        opacity: 0.3;
        animation: floatAround 12s ease-in-out infinite;
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
      }

      @keyframes floatAround {
        0%, 100% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(50px, -30px) rotate(90deg);
        }
        50% {
          transform: translate(0, -60px) rotate(180deg);
        }
        75% {
          transform: translate(-50px, -30px) rotate(270deg);
        }
      }

      /* 光射线 */
      .light-rays-container {
        position: fixed;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        pointer-events: none;
        z-index: 0;
      }

      .light-ray {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 2px;
        background: linear-gradient(90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transform-origin: left center;
        animation: rayRotate 20s linear infinite;
      }

      @keyframes rayRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* 城市灯光 */
      .city-lights-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 0;
      }

      .city-light {
        position: absolute;
        border-radius: 50%;
        animation: cityLightTwinkle 3s ease infinite;
      }

      @keyframes cityLightTwinkle {
        0%, 100% {
          opacity: 0.3;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.5);
        }
      }

      /* 主题切换器 */
      .theme-switcher {
        position: fixed;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        z-index: 9999;
      }

      .switcher-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .switcher-toggle:hover {
        transform: scale(1.1) rotate(15deg);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .switcher-panel {
        position: absolute;
        top: 50%;
        right: 80px;
        transform: translateY(-50%);
        width: 320px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .switcher-panel.active {
        opacity: 1;
        visibility: visible;
      }

      .panel-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 15px 20px;
        border-radius: 20px 20px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .panel-title {
        font-size: 14px;
        font-weight: bold;
      }

      .panel-close {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
      }

      .theme-options {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .theme-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        border: 2px solid transparent;
        border-radius: 15px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .theme-option:hover {
        border-color: #9B59B6;
        background: rgba(155, 89, 182, 0.1);
      }

      .theme-option.active {
        border-color: #9B59B6;
        background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1));
      }

      .theme-preview {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .theme-info {
        flex: 1;
      }

      .theme-name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .theme-colors {
        display: flex;
        gap: 5px;
      }

      .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      /* 背景过渡 */
      body {
        transition: background 0.5s ease;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .neon-sign {
          font-size: 32px;
        }

        .theme-switcher {
          right: 15px;
        }

        .switcher-panel {
          right: 85px;
          width: calc(100vw - 120px);
        }

        .floating-element {
          font-size: 24px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化视觉效果
  function initEnhancedVisuals() {
    injectStyles();

    // 加载保存的主题
    const savedTheme = localStorage.getItem('zootopiaTheme');
    if (savedTheme) {
      currentTheme = savedTheme;
    }

    // 应用主题
    switchTheme(currentTheme);

    // 创建主题切换器
    const switcher = createThemeSwitcher();
    document.body.appendChild(switcher);

    // 切换器按钮事件
    const toggleBtn = document.getElementById('switcherToggle');
    const panel = document.getElementById('switcherPanel');

    toggleBtn.onclick = () => {
      panel.classList.toggle('active');
    };

    // 关闭按钮
    document.querySelector('.panel-close').onclick = () => {
      panel.classList.remove('active');
    };

    // 主题选择事件
    document.querySelectorAll('.theme-option').forEach(option => {
      option.onclick = () => {
        const themeId = option.dataset.theme;
        switchTheme(themeId);
        document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');
      };
    });

    // 点击外部关闭面板
    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) {
        panel.classList.remove('active');
      }
    });

    // 监听主题变化事件
    window.addEventListener('zootopiaThemeChange', (e) => {
      console.log(`主题已切换到: ${e.detail.themeData.name}`);
    });
  }

  // 导出全局函数
  window.zootopiaVisuals = {
    switchTheme: switchTheme,
    getCurrentTheme: () => currentTheme,
    getThemeData: (themeId) => districtThemes[themeId],
    refreshEffects: refreshVisualEffects
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedVisuals);
  } else {
    initEnhancedVisuals();
  }
})();
