/**
 * 疯狂动物城 Zootopia 终极交互脚本
 * Ultimate Zootopia Interactive Scripts
 */

(function() {
  'use strict';

  // 角色数据库
  const characterDatabase = {
    judy: {
      name: 'Judy Hopps',
      species: 'Rabbit',
      emoji: '🐰',
      color: '#9C85C6',
      stats: { bravery: 95, speed: 88, determination: 100 },
      quote: 'Try Everything! Anyone can be anything!',
      badge: '814'
    },
    nick: {
      name: 'Nick Wilde',
      species: 'Fox',
      emoji: '🦊',
      color: '#FF6B35',
      stats: { cunning: 92, charm: 88, loyalty: 85 },
      quote: 'It\'s called a hustle, sweetheart!',
      badge: '待定'
    },
    bogo: {
      name: 'Chief Bogo',
      species: 'Cape Buffalo',
      emoji: '🦬',
      color: '#5D4E37',
      stats: { authority: 95, experience: 90, strictness: 85 },
      quote: 'You have 48 hours!',
      badge: '001'
    },
    flash: {
      name: 'Flash',
      species: 'Sloth',
      emoji: '🦥',
      color: '#8B7355',
      stats: { speed: 5, friendliness: 95, patience: 100 },
      quote: '......................',
      badge: 'DMV-001'
    },
    clawhauser: {
      name: 'Benjamin Clawhauser',
      species: 'Cheetah',
      emoji: '🦆',
      color: '#FFB347',
      stats: { enthusiasm: 100, gazelleLove: 100, efficiency: 75 },
      quote: 'Did you see Gazelle\'s new video?',
      badge: '前台'
    }
  };

  // 任务数据库
  const missionDatabase = [
    {
      id: 1,
      title: '寻找失踪的水獭',
      priority: 'high',
      district: 'Meadowlands',
      officer: 'Judy Hopps',
      status: 'completed',
      reward: '🏆 成就解锁'
    },
    {
      id: 2,
      title: 'Pawpsicles 调查',
      priority: 'medium',
      district: 'Downtown',
      officer: 'Judy Hopps & Nick Wilde',
      status: 'in_progress',
      reward: '🦊 Nick 加入团队'
    },
    {
      id: 3,
      title: '夜行族袭击案',
      priority: 'high',
      district: '全城',
      officer: 'ZPD 特别小组',
      status: 'active',
      reward: '🌟 城市英雄'
    },
    {
      id: 4,
      title: '交通违规处理',
      priority: 'low',
      district: 'Sahara Square',
      officer: 'Judy Hopps',
      status: 'completed',
      reward: '🎫 200 张罚单'
    }
  ];

  // 天气数据
  const weatherData = [
    { district: 'Sahara Square', icon: '☀️', temp: '38°C', condition: '晴朗' },
    { district: 'Tundratown', icon: '❄️', temp: '-15°C', condition: '寒冷' },
    { district: 'Rainforest', icon: '🌧️', temp: '28°C', condition: '多雨' },
    { district: 'Downtown', icon: '🌤️', temp: '22°C', condition: '多云' },
    { district: 'Bunnyburrow', icon: '🌾', temp: '20°C', condition: '舒适' },
    { district: 'Little Rodentia', icon: '🧀', temp: '24°C', condition: '奶酪香' }
  ];

  // 创建角色卡牌
  function createCharacterCard(characterId) {
    const char = characterDatabase[characterId];
    if (!char) return null;

    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
      <div class="character-card-header">
        <div class="character-avatar">${char.emoji}</div>
        <div class="character-name">${char.name}</div>
        <div class="character-species">${char.species} • Badge #${char.badge}</div>
      </div>
      <div class="character-quote">"${char.quote}"</div>
      <div class="character-stats">
        ${Object.entries(char.stats).map(([key, value]) => `
          <div class="character-stat">
            <div class="character-stat-value">${value}</div>
            <div class="character-stat-label">${key}</div>
          </div>
        `).join('')}
      </div>
    `;
    return card;
  }

  // 创建任务板
  function createMissionBoard() {
    const board = document.createElement('div');
    board.className = 'mission-board';
    board.innerHTML = `
      <div class="board-header">📋 ZPD MISSION BOARD</div>
      ${missionDatabase.map(mission => `
        <div class="mission-item" data-priority="${mission.priority}">
          <span class="mission-priority ${mission.priority}">${mission.priority.toUpperCase()}</span>
          <div class="mission-title">${mission.title}</div>
          <div class="mission-details">
            📍 ${mission.district} | 👮 ${mission.officer}
          </div>
          <div class="mission-status">状态: ${getStatusText(mission.status)}</div>
          <div class="mission-reward">🎁 ${mission.reward}</div>
        </div>
      `).join('')}
    `;
    return board;
  }

  function getStatusText(status) {
    const statusMap = {
      'completed': '✅ 已完成',
      'in_progress': '🔄 进行中',
      'active': '🚨 活跃'
    };
    return statusMap[status] || status;
  }

  // 创建天气预报
  function createWeatherForecast() {
    const forecast = document.createElement('div');
    forecast.className = 'weather-forecast';
    forecast.innerHTML = weatherData.map(weather => `
      <div class="weather-item">
        <div class="weather-icon">${weather.icon}</div>
        <div class="weather-district">${weather.district}</div>
        <div class="weather-temp">${weather.temp}</div>
        <div class="weather-condition">${weather.condition}</div>
      </div>
    `).join('');
    return forecast;
  }

  // 创建时间线
  function createTimeline() {
    const events = [
      { year: '2016', event: 'Judy 从警察学院毕业', icon: '🎓' },
      { year: '2016', event: 'Judy 被分配到停车场执勤', icon: '🚗' },
      { year: '2016', event: 'Judy 和 Nick 组队', icon: '🤝' },
      { year: '2016', event: '夜行族案件侦破', icon: '🦊🐰' },
      { year: '2016', event: 'Nick 加入 ZPD', icon: '👮' }
    ];

    const timeline = document.createElement('div');
    timeline.className = 'zootopia-timeline';
    timeline.innerHTML = events.map(event => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-year">${event.year}</div>
        <div class="timeline-event">${event.icon} ${event.event}</div>
      </div>
    `).join('');
    return timeline;
  }

  // 创建成就墙
  function createAchievementWall() {
    const achievements = [
      { icon: '🏅', name: '初级警官', desc: '完成 ZPD 训练' },
      { icon: '🎯', name: '神枪手', desc: '射击训练满分' },
      { icon: '🦊', name: '狐狸朋友', desc: '与 Nick 成为搭档' },
      { icon: '🔍', name: '大侦探', desc: '侦破夜行族案件' },
      { icon: '🌟', name: '城市英雄', desc: '拯救动物城' },
      { icon: '🍦', name: 'Pawpsicles 大师', desc: '了解所有冰棍知识' },
      { icon: '🚗', name: '停车专家', desc: '开出200张罚单' },
      { icon: '🦥', name: '耐心大师', desc: '与 Flash 完成对话' }
    ];

    const wall = document.createElement('div');
    wall.className = 'achievement-wall';
    wall.innerHTML = `
      <div class="wall-title">🏆 Zootopia Achievement Hall</div>
      <div class="achievement-grid">
        ${achievements.map(ach => `
          <div class="achievement-item">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-name">${ach.name}</div>
            <div class="achievement-desc">${ach.desc}</div>
          </div>
        `).join('')}
      </div>
    `;
    return wall;
  }

  // 创建地区信息卡片
  function createDistrictInfoCards() {
    const districts = [
      { name: 'Sahara Square', emoji: '🏜️', color: '#FF9F43', desc: '温暖的沙漠区域，适合喜欢阳光的动物' },
      { name: 'Tundratown', emoji: '❄️', color: '#0ABDE3', desc: '寒冷的冰雪区域，北极动物的天堂' },
      { name: 'Rainforest', emoji: '🌴', color: '#10AC84', desc: '郁郁葱葱的热带雨林，充满生机' },
      { name: 'Downtown', emoji: '🏙️', color: '#5F27CD', desc: '繁华的市中心，霓虹灯闪烁' }
    ];

    const container = document.createElement('div');
    container.className = 'district-info-cards';
    container.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    `;

    container.innerHTML = districts.map(district => `
      <div class="district-info-card" style="
        background: white;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border-top: 4px solid ${district.color};
      ">
        <div style="font-size: 48px; text-align: center; margin-bottom: 15px;">${district.emoji}</div>
        <div style="font-size: 20px; font-weight: bold; color: ${district.color}; text-align: center; margin-bottom: 10px;">
          ${district.name}
        </div>
        <div style="font-size: 14px; color: #666; text-align: center;">
          ${district.desc}
        </div>
      </div>
    `).join('');

    // 添加悬停效果
    container.querySelectorAll('.district-info-card').forEach(card => {
      card.onmouseenter = () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
      };
      card.onmouseleave = () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      };
    });

    return container;
  }

  // 快速插入函数（用于文章中）
  window.ZootopiaElements = {
    insertCharacterCard: function(characterId, container) {
      const card = createCharacterCard(characterId);
      if (card && container) {
        container.appendChild(card);
      }
    },

    insertMissionBoard: function(container) {
      const board = createMissionBoard();
      if (board && container) {
        container.appendChild(board);
      }
    },

    insertWeather: function(container) {
      const weather = createWeatherForecast();
      if (weather && container) {
        container.appendChild(weather);
      }
    },

    insertTimeline: function(container) {
      const timeline = createTimeline();
      if (timeline && container) {
        container.appendChild(timeline);
      }
    },

    insertAchievements: function(container) {
      const wall = createAchievementWall();
      if (wall && container) {
        container.appendChild(wall);
      }
    },

    insertDistrictCards: function(container) {
      const cards = createDistrictInfoCards();
      if (cards && container) {
        container.appendChild(cards);
      }
    }
  };

  // 自动检测并插入元素（如果存在特定class）
  function autoInsertElements() {
    // 检查是否有 zootopia-character-card class
    document.querySelectorAll('.zootopia-character-card').forEach(el => {
      const charId = el.dataset.character || 'judy';
      const card = createCharacterCard(charId);
      if (card) {
        el.parentNode.replaceChild(card, el);
      }
    });

    // 检查是否有 zootopia-mission-board class
    document.querySelectorAll('.zootopia-mission-board').forEach(el => {
      const board = createMissionBoard();
      if (board) {
        el.parentNode.replaceChild(board, el);
      }
    });

    // 检查是否有 zootopia-weather class
    document.querySelectorAll('.zootopia-weather').forEach(el => {
      const weather = createWeatherForecast();
      if (weather) {
        el.parentNode.replaceChild(weather, el);
      }
    });

    // 检查是否有 zootopia-timeline class
    document.querySelectorAll('.zootopia-timeline-auto').forEach(el => {
      const timeline = createTimeline();
      if (timeline) {
        el.parentNode.replaceChild(timeline, el);
      }
    });

    // 检查是否有 zootopia-achievements class
    document.querySelectorAll('.zootopia-achievements').forEach(el => {
      const wall = createAchievementWall();
      if (wall) {
        el.parentNode.replaceChild(wall, el);
      }
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInsertElements);
  } else {
    autoInsertElements();
  }

  // 添加调试信息
  console.log('🐰🦊 Zootopia Ultimate Theme Loaded!');
  console.log('可用函数:', Object.keys(window.ZootopiaElements));
})();
