/**
 * 疯狂动物城博客系统 - 用户引导系统
 * Zootopia Blog System - User Onboarding System
 *
 * 版本: v3.6.0
 * 优化轮次: 第20轮
 * 最后更新: 2026-04-12
 *
 * 功能: 首次访问用户的引导流程
 */

(function() {
  'use strict';

  // 用户引导配置
  const OnboardingConfig = {
    // 是否已完成引导
    completedKey: 'zt-onboarding-complete',
    // 用户选择的角色
    selectedCharacterKey: 'zt-selected-character',
    // 用户选择的地区
    selectedDistrictKey: 'zt-selected-district',

    // 可选角色
    characters: [
      {
        id: 'judy',
        name: '朱迪·霍普斯',
        emoji: '🐰',
        quote: 'Try Everything! 尝试一切！',
        traits: ['勇敢', '乐观', '坚持']
      },
      {
        id: 'nick',
        name: '尼克·王尔德',
        emoji: '🦊',
        quote: '你知道你爱我',
        traits: ['聪明', '机智', '善良']
      },
      {
        id: 'flash',
        name: '闪电',
        emoji: '🦥',
        quote: '......',
        traits: ['耐心', '友好', '可靠']
      }
    ],

    // 可选地区主题
    districts: [
      {
        id: 'sahara',
        name: '撒哈拉广场',
        emoji: '☀️',
        description: '金色的阳光，永远的热情',
        color: '#FF9F43'
      },
      {
        id: 'tundratown',
        name: '冰川镇',
        emoji: '❄️',
        description: '冰雪的世界，温暖的心',
        color: '#0ABDE3'
      },
      {
        id: 'rainforest',
        name: '雨林区',
        emoji: '🌴',
        description: '自然与现代的完美融合',
        color: '#10AC84'
      }
    ]
  };

  // 用户引导系统
  const UserOnboarding = {
    currentStep: 0,
    overlay: null,
    userChoices: {},

    // 检查是否需要引导
    checkOnboarding: function() {
      const completed = localStorage.getItem(OnboardingConfig.completedKey);
      if (completed) {
        console.log('✅ 用户已完成引导');
        return false;
      }
      return true;
    },

    // 开始引导
    start: function() {
      if (!this.checkOnboarding()) {
        return;
      }

      console.log('🎬 开始用户引导...');
      this.showWelcome();
    },

    // 显示欢迎界面
    showWelcome: function() {
      const overlay = this.createOverlay();
      overlay.innerHTML = `
        <div class="zt-onboarding-welcome">
          <div class="zt-onboarding-emoji">🎉</div>
          <h1 class="zt-onboarding-title">欢迎来到疯狂动物城！</h1>
          <p class="zt-onboarding-subtitle">任何人都可以成为任何样子</p>
          <p class="zt-onboarding-description">
            在你开始探索之前，让我们来认识一下你，<br>
            为你定制最棒的博客体验！
          </p>
          <button class="zt-btn zt-btn--primary zt-onboarding-start">
            开始旅程 →
          </button>
        </div>
      `;

      overlay.querySelector('.zt-onboarding-start').onclick = () => {
        this.showCharacterSelection();
      };
    },

    // 显示角色选择
    showCharacterSelection: function() {
      this.updateOverlay(`
        <div class="zt-onboarding-step">
          <div class="zt-onboarding-progress">
            <div class="zt-progress-dot active"></div>
            <div class="zt-progress-line"></div>
            <div class="zt-progress-dot"></div>
            <div class="zt-progress-line"></div>
            <div class="zt-progress-dot"></div>
          </div>

          <h2 class="zt-onboarding-title">选择你的角色代表 🐰🦊</h2>
          <p class="zt-onboarding-description">谁最能代表你的性格？</p>

          <div class="zt-character-grid">
            ${OnboardingConfig.characters.map(char => `
              <div class="zt-character-option" data-character="${char.id}">
                <div class="zt-character-emoji">${char.emoji}</div>
                <div class="zt-character-name">${char.name}</div>
                <div class="zt-character-quote">${char.quote}</div>
                <div class="zt-character-traits">
                  ${char.traits.map(trait => `<span class="zt-trait-tag">${trait}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `);

      // 绑定角色选择事件
      this.overlay.querySelectorAll('.zt-character-option').forEach(option => {
        option.onclick = () => {
          const characterId = option.dataset.character;
          this.selectCharacter(characterId);
        };
      });
    },

    // 选择角色
    selectCharacter: function(characterId) {
      const character = OnboardingConfig.characters.find(c => c.id === characterId);
      this.userChoices.character = character;

      // 保存选择
      localStorage.setItem(OnboardingConfig.selectedCharacterKey, JSON.stringify(character));

      // 显示选择动画
      this.showCharacterSelected(character);
    },

    // 显示角色选择确认
    showCharacterSelected: function(character) {
      this.updateOverlay(`
        <div class="zt-onboarding-confirm">
          <div class="zt-confirm-emoji">${character.emoji}</div>
          <h2 class="zt-confirm-title">太棒了！</h2>
          <p class="zt-confirm-message">
            你选择了 <strong>${character.name}</strong><br>
            "${character.quote}"
          </p>
          <div class="zt-confirm-traits">
            ${character.traits.map(trait => `<span class="zt-trait-badge">${trait}</span>`).join('')}
          </div>
          <button class="zt-btn zt-btn--primary zt-confirm-continue">
            继续 →
          </button>
        </div>
      `);

      this.overlay.querySelector('.zt-confirm-continue').onclick = () => {
        this.showDistrictSelection();
      };
    },

    // 显示地区选择
    showDistrictSelection: function() {
      this.updateOverlay(`
        <div class="zt-onboarding-step">
          <div class="zt-onboarding-progress">
            <div class="zt-progress-dot completed"></div>
            <div class="zt-progress-line active"></div>
            <div class="zt-progress-dot active"></div>
            <div class="zt-progress-line"></div>
            <div class="zt-progress-dot"></div>
          </div>

          <h2 class="zt-onboarding-title">选择你的主题地区 🗺️</h2>
          <p class="zt-onboarding-description">选择最喜欢的地区，定制你的主题</p>

          <div class="zt-district-grid">
            ${OnboardingConfig.districts.map(district => `
              <div class="zt-district-option" data-district="${district.id}" style="border-color: ${district.color}">
                <div class="zt-district-emoji">${district.emoji}</div>
                <div class="zt-district-name">${district.name}</div>
                <div class="zt-district-description">${district.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `);

      // 绑定地区选择事件
      this.overlay.querySelectorAll('.zt-district-option').forEach(option => {
        option.onclick = () => {
          const districtId = option.dataset.district;
          this.selectDistrict(districtId);
        };
      });
    },

    // 选择地区
    selectDistrict: function(districtId) {
      const district = OnboardingConfig.districts.find(d => d.id === districtId);
      this.userChoices.district = district;

      // 保存选择
      localStorage.setItem(OnboardingConfig.selectedDistrictKey, JSON.stringify(district));

      // 应用主题
      if (typeof ztApplyPreset === 'function') {
        ztApplyPreset(district.id);
      }

      // 显示确认
      this.showDistrictSelected(district);
    },

    // 显示地区选择确认
    showDistrictSelected: function(district) {
      this.updateOverlay(`
        <div class="zt-onboarding-confirm">
          <div class="zt-confirm-emoji">${district.emoji}</div>
          <h2 class="zt-confirm-title">完美选择！</h2>
          <p class="zt-confirm-message">
            <strong>${district.name}</strong> 主题已应用<br>
            ${district.description}
          </p>
          <div class="zt-theme-preview" style="background-color: ${district.color}">
            主题预览
          </div>
          <button class="zt-btn zt-btn--primary zt-confirm-continue">
            完成 →
          </button>
        </div>
      `);

      this.overlay.querySelector('.zt-confirm-continue').onclick = () => {
        this.showCompletion();
      };
    },

    // 显示完成界面
    showCompletion: function() {
      const character = this.userChoices.character;
      const district = this.userChoices.district;

      this.updateOverlay(`
        <div class="zt-onboarding-complete">
          <div class="zt-complete-emoji">🎉</div>
          <h1 class="zt-complete-title">欢迎加入疯狂动物城！</h1>

          <div class="zt-complete-summary">
            <div class="zt-summary-item">
              <div class="zt-summary-label">你的角色</div>
              <div class="zt-summary-value">${character.emoji} ${character.name}</div>
            </div>
            <div class="zt-summary-item">
              <div class="zt-summary-label">你的地区</div>
              <div class="zt-summary-value">${district.emoji} ${district.name}</div>
            </div>
          </div>

          <div class="zt-complete-rewards">
            <h3>🎁 新手奖励已发放</h3>
            <ul class="zt-rewards-list">
              <li>✅ 新手市民徽章</li>
              <li>✅ 50积分</li>
              <li>✅ 完成引导成就</li>
            </ul>
          </div>

          <div class="zt-complete-next">
            <h3>接下来你可以：</h3>
            <ul class="zt-next-list">
              <li>📝 发表你的第一条评论</li>
              <li>🔍 探索文章内容</li>
              <li>🎮 玩转小游戏</li>
              <li>🏆 收集更多成就</li>
            </ul>
          </div>

          <button class="zt-btn zt-btn--primary zt-complete-finish">
            开始探索 →
          </button>
        </div>
      `);

      // 发放奖励
      this.giveRewards();

      // 标记引导完成
      localStorage.setItem(OnboardingConfig.completedKey, 'true');

      // 完成按钮
      this.overlay.querySelector('.zt-complete-finish').onclick = () => {
        this.hide();
      };
    },

    // 发放奖励
    giveRewards: function() {
      // 添加积分
      if (typeof ztAddPoints === 'function') {
        ztAddPoints(50, 'onboarding', {
          reason: '完成新手引导'
        });
      }

      // 解锁成就
      if (typeof ztUnlockAchievement === 'function') {
        ztUnlockAchievement('new_citizen');
      }

      // 显示通知
      if (typeof ztNotify === 'function') {
        ztNotify('欢迎加入疯狂动物城！获得50积分', 'success');
      }
    },

    // 创建遮罩层
    createOverlay: function() {
      if (this.overlay) {
        this.overlay.remove();
      }

      this.overlay = document.createElement('div');
      this.overlay.id = 'zt-onboarding-overlay';
      this.overlay.className = 'zt-onboarding-overlay';
      document.body.appendChild(this.overlay);

      return this.overlay;
    },

    // 更新遮罩层内容
    updateOverlay: function(html) {
      if (!this.overlay) {
        this.createOverlay();
      }
      this.overlay.innerHTML = html;
    },

    // 隐藏引导
    hide: function() {
      if (this.overlay) {
        this.overlay.classList.add('zt-onboarding-overlay--hide');
        setTimeout(() => {
          this.overlay.remove();
          this.overlay = null;
        }, 300);
      }
    },

    // 获取用户选择
    getUserChoices: function() {
      return this.userChoices;
    }
  };

  // 导出全局对象
  window.ZootopiaOnboarding = UserOnboarding;

  // 导出便捷函数
  window.ztStartOnboarding = function() {
    UserOnboarding.start();
  };

  window.ztResetOnboarding = function() {
    localStorage.removeItem(OnboardingConfig.completedKey);
    localStorage.removeItem(OnboardingConfig.selectedCharacterKey);
    localStorage.removeItem(OnboardingConfig.selectedDistrictKey);
    console.log('🔄 用户引导已重置');
  };

  // 页面加载后自动启动（如果需要）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // 延迟3秒启动，让用户先看看页面
      setTimeout(() => {
        UserOnboarding.start();
      }, 3000);
    });
  } else {
    setTimeout(() => {
      UserOnboarding.start();
    }, 3000);
  }

  // 初始化完成提示
  console.log('🎬 用户引导系统已加载！');
  console.log('💡 使用 ztStartOnboarding() 手动启动引导');
  console.log('🔄 使用 ztResetOnboarding() 重置引导');

})();
