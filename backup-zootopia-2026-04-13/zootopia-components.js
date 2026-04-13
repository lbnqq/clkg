/**
 * 疯狂动物城 UI 组件模块
 * Zootopia UI Components - 常用组件集合
 */

(function() {
  'use strict';

  // ==================== 角色卡片组件 ====================
  const CharacterCard = {
    template: function(character) {
      const data = ZootopiaCore.characters[character] || character;
      return `
        <div class="zt-character-card" data-character="${character}">
          <div class="zt-card-header" style="background: ${data.color}">
            <span class="zt-card-emoji">${data.emoji}</span>
            <h3 class="zt-card-name">${data.name}</h3>
          </div>
          <div class="zt-card-body">
            <p class="zt-card-species">${data.species}</p>
            <blockquote class="zt-card-quote">"${data.quote}"</blockquote>
            <div class="zt-card-stats">
              ${Object.entries(data.stats || {}).map(([key, value]) => `
                <div class="zt-stat">
                  <span class="zt-stat-label">${key}</span>
                  <div class="zt-stat-bar">
                    <div class="zt-stat-fill" style="width: ${value}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    },

    init: function() {
      // 自动初始化所有角色卡片
      document.querySelectorAll('[data-zt-character-card]').forEach(el => {
        const character = el.getAttribute('data-zt-character-card');
        el.innerHTML = this.template(character);
      });

      // 添加卡片翻转动画
      ZootopiaCore.events.delegate(document, '.zt-character-card', 'click', function() {
        this.classList.toggle('zt-flipped');
      });
    }
  };

  // ==================== 对话气泡组件 ====================
  const DialogueBubble = {
    create: function(character, message, options = {}) {
      const data = ZootopiaCore.characters[character];
      if (!data) return null;

      const bubble = ZootopiaCore.utils.createElement('div', 'zt-dialogue-bubble');
      bubble.setAttribute('data-character', character);

      bubble.innerHTML = `
        <div class="zt-bubble-avatar">${data.emoji}</div>
        <div class="zt-bubble-content">
          <span class="zt-bubble-name">${data.name}</span>
          <p class="zt-bubble-message">${message}</p>
        </div>
      `;

      // 添加样式类
      if (options.position === 'right') {
        bubble.classList.add('zt-bubble-right');
      }

      // 添加动画
      bubble.style.animation = `zt-bubbleIn ${ZootopiaCore.config.animation.normal}ms ${ZootopiaCore.config.easing.easeOut}`;

      return bubble;
    },

    show: function(character, message, container, options = {}) {
      const bubble = this.create(character, message, options);
      if (!bubble) return;

      const target = container || document.querySelector('.zt-dialogue-container') || document.body;
      target.appendChild(bubble);

      // 自动隐藏
      if (options.autoHide !== false) {
        setTimeout(() => {
          bubble.classList.add('zt-bubble-out');
          setTimeout(() => bubble.remove(), 300);
        }, options.duration || 3000);
      }

      return bubble;
    },

    init: function() {
      // 自动初始化对话容器
      document.querySelectorAll('[data-zt-dialogue]').forEach(el => {
        const character = el.getAttribute('data-zt-character');
        const message = el.getAttribute('data-zt-message');
        this.show(character, message, el);
      });
    }
  };

  // ==================== 徽章系统组件 ====================
  const BadgeSystem = {
    badges: {
      zpd: { name: 'ZPD 徽章', icon: '🏅', color: '#FFD700' },
      pawpsicle: { name: 'Pawpsicle 大师', icon: '🍦', color: '#74b9ff' },
      explorer: { name: '探险家', icon: '🗺️', color: '#10AC84' },
      collector: { name: '收藏家', icon: '🎴', color: '#FF6B35' },
      trainer: { name: '训练师', icon: '💪', color: '#9C85C6' }
    },

    create: function(badgeId, count = 1) {
      const badge = this.badges[badgeId];
      if (!badge) return null;

      const el = ZootopiaCore.utils.createElement('div', 'zt-badge');
      el.setAttribute('data-badge', badgeId);
      el.innerHTML = `
        <span class="zt-badge-icon">${badge.icon}</span>
        <span class="zt-badge-count">${count}</span>
      `;
      el.style.setProperty('--zt-badge-color', badge.color);

      return el;
    },

    update: function(badgeId, count) {
      const badge = document.querySelector(`[data-badge="${badgeId}"]`);
      if (badge) {
        const countEl = badge.querySelector('.zt-badge-count');
        if (countEl) {
          // 数字动画
          const current = parseInt(countEl.textContent) || 0;
          this.animateCount(countEl, current, count);
        }
      }
    },

    animateCount: function(element, from, to) {
      const duration = 500;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(from + (to - from) * easeOut);

        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    },

    init: function() {
      // 初始化 Pawpsicle 计数器
      let pawpsicles = parseInt(localStorage.getItem('zt_pawpsicles') || '0');

      const counter = ZootopiaCore.utils.createElement('div', 'zt-pawpsicle-counter');
      counter.innerHTML = `
        <span class="zt-counter-icon">🍦</span>
        <span class="zt-counter-count">${pawpsicles}</span>
      `;

      // 添加点击事件
      ZootopiaCore.events.on(counter, 'click', () => {
        pawpsicles++;
        localStorage.setItem('zt_pawpsicles', pawpsicles);
        this.animateCount(counter.querySelector('.zt-counter-count'), pawpsicles - 1, pawpsicles);

        // 触发获得 Pawpsicle 动画
        ZootopiaCore.animation.create(counter, [
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)' },
          { transform: 'scale(1)' }
        ], { duration: 200 });
      });

      // 添加到页面
      const body = document.querySelector('body');
      if (body && !document.querySelector('.zt-pawpsicle-counter')) {
        body.appendChild(counter);
      }
    }
  };

  // ==================== 天气组件 ====================
  const WeatherWidget = {
    getWeather: function(district) {
      const districtData = ZootopiaCore.districts.find(d => d.id === district);
      if (!districtData) return null;

      return {
        district: districtData.nameZh,
        temp: districtData.temp,
        icon: districtData.emoji,
        condition: this.getCondition(district)
      };
    },

    getCondition: function(district) {
      const conditions = {
        sahara: '晴朗炎热',
        tundratown: '寒冷有雪',
        rainforest: '湿润多雨',
        downtown: '多云',
        bunnyburrow: '温暖舒适'
      };
      return conditions[district] || '未知';
    },

    create: function(district = 'sahara') {
      const weather = this.getWeather(district);
      if (!weather) return null;

      const widget = ZootopiaCore.utils.createElement('div', 'zt-weather-widget');
      widget.innerHTML = `
        <div class="zt-weather-header">
          <span class="zt-weather-icon">${weather.icon}</span>
          <span class="zt-weather-district">${weather.district}</span>
        </div>
        <div class="zt-weather-body">
          <span class="zt-weather-temp">${weather.temp}</span>
          <span class="zt-weather-condition">${weather.condition}</span>
        </div>
      `;

      return widget;
    },

    init: function() {
      // 自动初始化天气组件
      document.querySelectorAll('[data-zt-weather]').forEach(el => {
        const district = el.getAttribute('data-zt-weather') || 'sahara';
        const widget = this.create(district);
        if (widget) {
          el.appendChild(widget);
        }
      });

      // 添加全局天气更新（每5分钟）
      setInterval(() => {
        document.querySelectorAll('.zt-weather-widget').forEach(widget => {
          widget.classList.add('zt-weather-updating');
          setTimeout(() => {
            widget.classList.remove('zt-weather-updating');
          }, 1000);
        });
      }, 300000);
    }
  };

  // ==================== 任务板组件 ====================
  const TaskBoard = {
    tasks: [
      { id: 1, title: '寻找失踪的水獭', priority: 'high', status: 'completed' },
      { id: 2, title: 'Pawpsicles 调查', priority: 'medium', status: 'in_progress' },
      { id: 3, title: '夜行族袭击案', priority: 'high', status: 'active' }
    ],

    create: function() {
      const board = ZootopiaCore.utils.createElement('div', 'zt-task-board');
      board.innerHTML = `
        <div class="zt-board-header">
          <h3>📋 ZPD 任务板</h3>
        </div>
        <div class="zt-board-body">
          ${this.tasks.map(task => this.createTaskItem(task)).join('')}
        </div>
      `;
      return board;
    },

    createTaskItem: function(task) {
      const priorityIcons = {
        high: '🔴',
        medium: '🟡',
        low: '🟢'
      };

      const statusLabels = {
        completed: '已完成',
        in_progress: '进行中',
        active: '待处理'
      };

      return `
        <div class="zt-task-item zt-task-${task.status}">
          <div class="zt-task-priority">${priorityIcons[task.priority]}</div>
          <div class="zt-task-content">
            <span class="zt-task-title">${task.title}</span>
            <span class="zt-task-status">${statusLabels[task.status]}</span>
          </div>
        </div>
      `;
    },

    init: function() {
      // 自动初始化任务板
      document.querySelectorAll('[data-zt-task-board]').forEach(el => {
        el.appendChild(this.create());
      });
    }
  };

  // ==================== 导出组件 API ====================
  ZootopiaCore.components = {
    CharacterCard,
    DialogueBubble,
    BadgeSystem,
    WeatherWidget,
    TaskBoard
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    CharacterCard.init();
    DialogueBubble.init();
    BadgeSystem.init();
    WeatherWidget.init();
    TaskBoard.init();

    console.log('🎨 Zootopia 组件模块已加载');
  });

})();
