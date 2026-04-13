/**
 * 疯狂动物城主入口文件（优化版）
 * Zootopia Main Entry - 统一初始化和懒加载
 */

(function() {
  'use strict';

  // ==================== 模块定义 ====================

  // 欢迎横幅模块
  const WelcomeBanner = {
    init: function() {
      if (document.querySelector('.zootopia-welcome-banner')) return;

      const banner = ZootopiaCore.utils.createElement('div', 'zootopia-welcome-banner');
      const character = ZootopiaCore.utils.random(Object.values(ZootopiaCore.characters));
      const greetings = [
        `Hi! I'm ${character.name} ${character.emoji}`,
        `${character.emoji} Welcome to Zootopia!`,
        `Try Everything! ${character.emoji}`
      ];

      banner.innerHTML = `
        <div class="banner-content">
          <span class="zootopia-logo">🦁 ZOOTOPIA</span>
          <p class="banner-text">${ZootopiaCore.utils.random(greetings)}</p>
          <button class="banner-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
      `;

      const header = ZootopiaCore.utils.querySelector('#page-header');
      if (header) {
        header.appendChild(banner);
        // 添加淡入动画
        ZootopiaCore.animation.create(banner, [
          { opacity: 0, transform: 'translateY(-20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 500 });
      }
    }
  };

  // ZPD 徽章模块
  const ZPDBadge = {
    init: function() {
      if (document.querySelector('.zpd-badge-float')) return;

      const badge = ZootopiaCore.utils.createElement('div', 'zpd-badge-float');
      badge.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="badgeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFD700"/>
              <stop offset="50%" style="stop-color:#FFA500"/>
              <stop offset="100%" style="stop-color:#FFD700"/>
            </linearGradient>
          </defs>
          <polygon points="50,5 85,27 85,72 50,95 15,72 15,27"
                   fill="url(#badgeGold)" stroke="#B8860B" stroke-width="2"/>
          <polygon points="50,15 75,32 75,67 50,85 25,67 25,32"
                   fill="#1E3A5F" stroke="#FFD700" stroke-width="1"/>
          <text x="50" y="45" text-anchor="middle" fill="#FFD700"
                font-size="10" font-weight="bold">ZPD</text>
          <path d="M 35 55 Q 50 75 65 55"
                fill="none" stroke="#FFD700" stroke-width="2"/>
          <circle cx="50" cy="62" r="3" fill="#FFD700"/>
        </svg>
      `;

      badge.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
        cursor: pointer;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
      `;

      // 添加浮动动画
      ZootopiaCore.animation.create(badge, [
        { transform: 'translateY(0px) rotate(0deg)' },
        { transform: 'translateY(-10px) rotate(5deg)' },
        { transform: 'translateY(0px) rotate(0deg)' }
      ], {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });

      const header = ZootopiaCore.utils.querySelector('#page-header');
      if (header) {
        header.appendChild(badge);

        // 点击徽章效果
        ZootopiaCore.events.on(badge, 'click', function() {
          const pawpsicles = parseInt(document.querySelector('.pawpsicle-count')?.textContent || '0');
          alert(`🏅 ZPD 徽章\n当前 Pawpsicles: ${pawpsicles}\n警官编号: ${ZootopiaCore.characters.judy.badge}`);
        });
      }
    }
  };

  // 地区切换器模块
  const DistrictSwitcher = {
    init: function() {
      if (document.querySelector('.district-switcher')) return;

      const switcher = ZootopiaCore.utils.createElement('div', 'district-switcher');
      const buttons = ZootopiaCore.districts.map(district => `
        <button class="district-btn" data-district="${district.id}"
                data-colors="${district.colors.join(',')}">
          ${district.emoji} ${district.nameZh}
        </button>
      `).join('');

      switcher.innerHTML = `
        <div class="switcher-content">
          <span class="switcher-title">🏙️ 选择地区</span>
          <div class="district-buttons">${buttons}</div>
        </div>
      `;

      const body = ZootopiaCore.utils.querySelector('body');
      if (body) {
        body.appendChild(switcher);

        // 委托点击事件
        ZootopiaCore.events.delegate(switcher, '.district-btn', 'click', function(e) {
          const district = this.getAttribute('data-district');
          const colors = this.getAttribute('data-colors').split(',');
          changeTheme(district, colors);
        });
      }
    }
  };

  // 主题切换函数
  function changeTheme(districtId, colors) {
    document.documentElement.style.setProperty('--theme-color', colors[0]);
    document.documentElement.style.setProperty('--theme-color-hover', colors[1]);

    // 触发主题变更事件
    window.dispatchEvent(new CustomEvent('zootopia:themeChange', {
      detail: { district: districtId, colors: colors }
    }));
  }

  // ==================== 懒加载模块配置 ====================

  // 定义需要懒加载的模块
  const lazyModules = {
    'games': {
      init: () => console.log('🎮 游戏模块已加载'),
      dependencies: []
    },
    'social': {
      init: () => console.log('💬 社交模块已加载'),
      dependencies: []
    },
    'music': {
      init: () => console.log('🎵 音乐模块已加载'),
      dependencies: []
    }
  };

  // 注册所有模块
  Object.entries(lazyModules).forEach(([name, module]) => {
    ZootopiaCore.modules.register(name, module.init, module.dependencies);
  });

  // ==================== 初始化 ====================

  ZootopiaCore.dom.then(function() {
    console.log('🚀 疯狂动物城主题初始化开始...');

    // 立即加载核心模块
    WelcomeBanner.init();
    ZPDBadge.init();
    DistrictSwitcher.init();

    console.log('✅ 核心模块已加载');

    // 检测用户交互后加载其他模块
    let userInteracted = false;
    const loadAdditionalModules = ZootopiaCore.utils.throttle(function() {
      if (!userInteracted) {
        userInteracted = true;
        console.log('👤 检测到用户交互，加载额外模块...');

        // 延迟加载非关键模块
        setTimeout(() => {
          ZootopiaCore.modules.loadBatch(['games', 'social']);
        }, 1000);
      }
    }, 2000);

    // 监听用户交互
    ZootopiaCore.events.on(document, 'scroll', loadAdditionalModules, { passive: true });
    ZootopiaCore.events.on(document, 'click', loadAdditionalModules);

    console.log('✨ 疯狂动物城主题初始化完成！');
  });

})();
