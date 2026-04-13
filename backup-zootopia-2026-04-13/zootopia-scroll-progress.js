/**
 * 疯狂动物城主题 - 滚动进度系统
 * Zootopia Theme - Scroll Progress System
 * | 动物城风格的阅读进度指示器
 */

(function() {
  'use strict';

  // 动物城地区进度条样式
  const districtProgressStyles = {
    sahara: {
      name: '撒哈拉广场',
      colors: ['#FF9F43', '#F39C12', '#E67E22'],
      icon: '🏜️'
    },
    tundratown: {
      name: '冰川镇',
      colors: ['#0ABDE3', '#74B9FF', '#0984E3'],
      icon: '❄️'
    },
    rainforest: {
      name: '雨林区',
      colors: ['#10AC84', '#00D2D3', '#26DE81'],
      icon: '🌴'
    },
    downtown: {
      name: '市中心',
      colors: ['#5F27CD', '#9B59B6', '#8E44AD'],
      icon: '🏙️'
    },
    bunnyburrow: {
      name: '兔子洞',
      colors: ['#26DE81', '#2ECC71', '#A17F68'],
      icon: '🥕'
    }
  };

  // 当前选择的样式
  let currentStyle = 'downtown';

  // 滚动数据
  let scrollData = {
    scrollDistance: 0,
    maxScroll: 0,
    readingProgress: 0,
    sectionsReached: [],
    lastSection: null
  };

  // 创建滚动进度条
  function createScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'zootopia-scroll-progress';
    progress.innerHTML = `
      <div class="progress-bar-container">
        <div class="progress-bar" id="progressBar">
          <div class="progress-fill" id="progressFill"></div>
          <div class="progress-glow" id="progressGlow"></div>
        </div>
        <div class="progress-indicator" id="progressIndicator">
          <span class="indicator-icon" id="indicatorIcon">🏙️</span>
          <span class="indicator-text" id="indicatorText">0%</span>
        </div>
        <div class="progress-sections" id="progressSections">
          <!-- 章节标记将动态生成 -->
        </div>
      </div>

      <button class="progress-toggle" id="progressToggle" title="切换样式">
        <span class="toggle-icon">🎨</span>
      </button>

      <button class="scroll-top" id="scrollTop" title="返回顶部">
        <span class="top-icon">⬆️</span>
      </button>
    `;

    return progress;
  }

  // 更新进度
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));

    scrollData.scrollDistance = scrollTop;
    scrollData.maxScroll = docHeight;
    scrollData.readingProgress = scrollPercent;

    const progressFill = document.getElementById('progressFill');
    const progressGlow = document.getElementById('progressGlow');
    const progressIndicator = document.getElementById('progressIndicator');
    const indicatorText = document.getElementById('indicatorText');

    if (progressFill) {
      progressFill.style.width = `${scrollPercent}%`;
    }

    if (progressGlow) {
      progressGlow.style.left = `${scrollPercent}%`;
    }

    if (indicatorText) {
      indicatorText.textContent = `${Math.round(scrollPercent)}%`;
    }

    // 检测章节
    detectSections();
  }

  // 检测文章章节
  function detectSections() {
    const headings = document.querySelectorAll('h1, h2, h3');
    const sections = [];

    headings.forEach((heading, index) => {
      const rect = heading.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > 0;

      if (isVisible) {
        const sectionId = `section_${index}`;
        if (!scrollData.sectionsReached.includes(sectionId)) {
          scrollData.sectionsReached.push(sectionId);
          scrollData.lastSection = heading.textContent;
        }
      }
    });
  }

  // 切换进度条样式
  function switchProgressStyle(style) {
    currentStyle = style;
    const styleConfig = districtProgressStyles[style];

    if (!styleConfig) return;

    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const progressIndicator = document.getElementById('progressIndicator');
    const indicatorIcon = document.getElementById('indicatorIcon');

    if (progressBar) {
      progressBar.style.background = `linear-gradient(90deg, ${styleConfig.colors.join(', ')})`;
    }

    if (progressFill) {
      progressFill.style.background = `linear-gradient(90deg, ${styleConfig.colors[0]}, ${styleConfig.colors[1]})`;
    }

    if (progressIndicator) {
      progressIndicator.style.background = styleConfig.colors[0];
    }

    if (indicatorIcon) {
      indicatorIcon.textContent = styleConfig.icon;
    }

    // 保存选择
    localStorage.setItem('zootopiaProgressStyle', style);
  }

  // 显示样式选择面板
  function showStylePanel() {
    // 移除现有面板
    const existingPanel = document.querySelector('.progress-style-panel');
    if (existingPanel) existingPanel.remove();

    const panel = document.createElement('div');
    panel.className = 'progress-style-panel';
    panel.innerHTML = `
      <div class="style-panel-header">
        <span class="panel-title">🎨 选择进度条样式</span>
        <button class="panel-close">×</button>
      </div>
      <div class="style-options">
        ${Object.entries(districtProgressStyles).map(([key, style]) => `
          <button class="style-option" data-style="${key}" onclick="switchProgressStyle('${key}')">
            <span class="style-icon">${style.icon}</span>
            <span class="style-name">${style.name}</span>
            <div class="style-colors">
              ${style.colors.map(color => `<span class="color-dot" style="background: ${color}"></span>`).join('')}
            </div>
          </button>
        `).join('')}
      </div>
    `;

    document.body.appendChild(panel);

    // 关闭按钮
    panel.querySelector('.panel-close').onclick = () => {
      panel.remove();
    };

    // 点击外部关闭
    setTimeout(() => {
      document.addEventListener('click', function closePanel(e) {
        if (!panel.contains(e.target)) {
          panel.remove();
          document.removeEventListener('click', closePanel);
        }
      });
    }, 100);
  }

  // 返回顶部
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // 生成章节标记
  function generateSectionMarkers() {
    const headings = document.querySelectorAll('h1, h2, h3');
    const sectionsContainer = document.getElementById('progressSections');

    if (!sectionsContainer || headings.length === 0) return;

    sectionsContainer.innerHTML = headings.map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const indent = (level - 1) * 10;
      const isH1 = level === 1;
      const isH2 = level === 2;

      return `
        <div class="section-marker ${isH1 ? 'major' : ''} ${isH2 ? 'minor' : ''}" data-section="${index}" style="margin-left: ${indent}px" onclick="scrollToSection(${index})">
          <span class="marker-dot"></span>
        </div>
      `;
    }).join('');
  }

  // 滚动到指定章节
  function scrollToSection(index) {
    const headings = document.querySelectorAll('h1, h2, h3');
    if (headings[index]) {
      headings[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#scroll-progress-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'scroll-progress-styles';
    styles.textContent = `
      /* 滚动进度容器 */
      .zootopia-scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        pointer-events: none;
      }

      /* 进度条 */
      .progress-bar-container {
        position: relative;
        width: 100%;
        height: 4px;
        background: rgba(95, 39, 205, 0.2);
      }

      .progress-bar {
        position: relative;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #5F27CD, #9B59B6, #8E44AD);
        overflow: hidden;
      }

      .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #FF9F43, #F39C12);
        transition: width 0.3s ease;
        border-radius: 0 2px 2px 0;
      }

      .progress-glow {
        position: absolute;
        top: -3px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
        border-radius: 50%;
        transform: translateX(-50%);
        transition: left 0.3s ease;
        filter: blur(2px);
      }

      /* 进度指示器 */
      .progress-indicator {
        position: absolute;
        top: 10px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 15px;
        background: #5F27CD;
        color: white;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(95, 39, 205, 0.3);
        transition: background 0.3s ease;
      }

      .indicator-icon {
        font-size: 16px;
      }

      /* 章节标记 */
      .progress-sections {
        position: absolute;
        top: 4px;
        left: 20px;
        display: flex;
        gap: 5px;
      }

      .section-marker {
        width: 8px;
        height: 8px;
        background: rgba(95, 39, 205, 0.3);
        border-radius: 50%;
        cursor: pointer;
        pointer-events: auto;
        transition: all 0.3s ease;
      }

      .section-marker.major {
        width: 12px;
        height: 12px;
        background: rgba(95, 39, 205, 0.6);
      }

      .section-marker.minor {
        width: 10px;
        height: 10px;
        background: rgba(95, 39, 205, 0.4);
      }

      .section-marker.visited {
        background: #9B59B6;
      }

      .section-marker.current {
        background: #FF9F43;
        box-shadow: 0 0 10px rgba(255, 159, 67, 0.5);
        transform: scale(1.3);
      }

      /* 控制按钮 */
      .progress-toggle,
      .scroll-top {
        position: fixed;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        pointer-events: auto;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .progress-toggle {
        top: 80px;
        right: 30px;
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
      }

      .progress-toggle:hover {
        transform: scale(1.1) rotate(15deg);
      }

      .scroll-top {
        bottom: 100px;
        right: 30px;
        background: linear-gradient(135deg, #2ECC71, #27AE60);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
      }

      .scroll-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .scroll-top:hover {
        transform: translateY(-5px);
      }

      .toggle-icon,
      .top-icon {
        font-size: 20px;
      }

      /* 样式选择面板 */
      .progress-style-panel {
        position: fixed;
        top: 130px;
        right: 30px;
        width: 280px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        animation: panelSlideIn 0.3s ease;
      }

      @keyframes panelSlideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .style-panel-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 15px 15px 0 0;
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
        opacity: 0.8;
      }

      .panel-close:hover {
        opacity: 1;
      }

      .style-options {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .style-option {
        padding: 12px 15px;
        border: 2px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .style-option:hover {
        border-color: #9B59B6;
        background: rgba(155, 89, 182, 0.1);
        transform: scale(1.02);
      }

      .style-option.active {
        border-color: #9B59B6;
        background: linear-gradient(135deg, rgba(155, 89, 182, 0.1), rgba(142, 68, 173, 0.1));
      }

      .style-icon {
        font-size: 24px;
      }

      .style-name {
        flex: 1;
        font-size: 13px;
        font-weight: bold;
        color: #2D3436;
      }

      .style-colors {
        display: flex;
        gap: 3px;
      }

      .color-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .progress-indicator {
          top: auto;
          bottom: 60px;
          right: 10px;
          font-size: 10px;
          padding: 6px 10px;
        }

        .progress-toggle {
          top: auto;
          bottom: 160px;
          right: 15px;
        }

        .scroll-top {
          bottom: 100px;
          right: 15px;
        }

        .progress-style-panel {
          top: auto;
          bottom: 220px;
          right: 15px;
          width: calc(100vw - 60px);
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化滚动进度
  function initScrollProgress() {
    injectStyles();

    const progress = createScrollProgress();
    document.body.appendChild(progress);

    // 恢复保存的样式
    const savedStyle = localStorage.getItem('zootopiaProgressStyle');
    if (savedStyle) {
      currentStyle = savedStyle;
      switchProgressStyle(currentStyle);
    }

    // 监听滚动
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });

    // 样式切换按钮
    document.getElementById('progressToggle').onclick = (e) => {
      e.stopPropagation();
      showStylePanel();
    };

    // 返回顶部按钮
    const scrollTopBtn = document.getElementById('scrollTop');
    scrollTopBtn.onclick = scrollToTop;

    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    // 延迟生成章节标记（等待内容加载）
    setTimeout(() => {
      generateSectionMarkers();
    }, 2000);
  }

  // 导出全局函数
  window.switchProgressStyle = switchProgressStyle;
  window.scrollToSection = scrollToSection;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollProgress);
  } else {
    initScrollProgress();
  }
})();
