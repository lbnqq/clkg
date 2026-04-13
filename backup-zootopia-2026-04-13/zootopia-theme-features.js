/**
 * 疯狂动物城博客系统 - 主题特色功能包
 * Zootopia Blog System - Theme Features Pack
 *
 * 版本: v3.4.0
 * 优化轮次: 第18轮
 * 最后更新: 2026-04-12
 *
 * 说明: 整合所有疯狂动物城主题特色功能
 *       包括角色系统、地区系统、游戏系统等
 *       可选加载，不影响核心功能
 */

(function() {
  'use strict';

  // ==================== 角色系统 ====================
  const ZootopiaCharacters = {
    // 角色数据
    characters: {
      judy: {
        name: '朱迪·霍普斯',
        nameEn: 'Judy Hopps',
        species: '兔子',
        role: '警察',
        badge: '👮‍♀️',
        color: '#9B59B6',
        quote: 'Try Everything! 尝试一切！',
        location: '撒哈拉广场'
      },
      nick: {
        name: '尼克·王尔德',
        nameEn: 'Nick Wilde',
        species: '狐狸',
        role: '骗子/警察',
        badge: '🦊',
        color: '#E67E22',
        quote: 'You know you love me. 你知道你爱我。',
        location: '雨林区'
      },
      flash: {
        name: '闪电',
        nameEn: 'Flash',
        species: '树懒',
        role: 'DMV员工',
        badge: '🦥',
        color: '#27AE60',
        quote: '......',
        location: '市政厅'
      },
      chiefbogo: {
        name: '博戈局长',
        nameEn: 'Chief Bogo',
        species: '水牛',
        role: '警察局长',
        badge: '🐂',
        color: '#34495E',
        quote: 'Life isn\'t some cartoon musical. 生活不是卡通音乐剧。',
        location: '警察局'
      },
      bellwether: {
        name: '贝尔沃瑟',
        nameEn: 'Bellwether',
        species: '绵羊',
        role: '副市长',
        badge: '🐑',
        color: '#ECF0F1',
        quote: 'Don\'t let them see that they get to you. 别让他们看到你受影响。',
        location: '市政厅'
      },
      clawhauser: {
        name: '克劳斯豪瑟',
        nameEn: 'Clawhauser',
        species: '猎豹',
        role: '前台接待',
        badge: '🐆',
        color: '#F39C12',
        quote: 'I love Gazelle! 我 love 盖泽尔！',
        location: '警察局'
      }
    },

    // 获取所有角色
    getAll: function() {
      return this.characters;
    },

    // 获取特定角色
    getById: function(id) {
      return this.characters[id] || null;
    },

    // 搜索角色
    search: function(query) {
      const results = [];
      const q = query.toLowerCase();

      for (const id in this.characters) {
        const char = this.characters[id];
        if (char.name.toLowerCase().includes(q) ||
            char.nameEn.toLowerCase().includes(q) ||
            char.species.includes(q)) {
          results.push({ id, ...char });
        }
      }

      return results;
    },

    // 获取随机角色
    getRandom: function() {
      const ids = Object.keys(this.characters);
      const randomId = ids[Math.floor(Math.random() * ids.length)];
      return this.getById(randomId);
    }
  };

  // ==================== 地区系统 ====================
  const ZootopiaDistricts = {
    // 地区数据
    districts: {
      sahara: {
        name: '撒哈拉广场',
        nameEn: 'Sahara Square',
        theme: 'desert',
        color: '#F39C12',
        temperature: 'hot',
        description: '永远的阳光，永远的热浪'
      },
      tundratown: {
        name: '冰川镇',
        nameEn: 'Tundratown',
        theme: 'snow',
        color: '#3498DB',
        temperature: 'cold',
        description: '冰封的世界，温暖的社区'
      },
      rainforest: {
        name: '雨林区',
        nameEn: 'Rainforest District',
        theme: 'jungle',
        color: '#27AE60',
        temperature: 'humid',
        description: '自然与现代的完美融合'
      },
      downtown: {
        name: '市中心',
        nameEn: 'Downtown Zootopia',
        theme: 'urban',
        color: '#9B59B6',
        temperature: 'moderate',
        description: '城市的脉搏，梦想的中心'
      },
      littlerodentia: {
        name: '小型啮齿动物镇',
        nameEn: 'Little Rodentia',
        theme: 'miniature',
        color: '#E74C3C',
        temperature: 'mild',
        description: '小尺寸，大梦想'
      },
      savanna: {
        name: '稀树草原中心',
        nameEn: 'Savanna Central',
        theme: 'grassland',
        color: '#F1C40F',
        temperature: 'warm',
        description: '城市的中心，交通的枢纽'
      }
    },

    // 获取所有地区
    getAll: function() {
      return this.districts;
    },

    // 获取特定地区
    getById: function(id) {
      return this.districts[id] || null;
    },

    // 按主题搜索
    getByTheme: function(theme) {
      const results = [];
      for (const id in this.districts) {
        if (this.districts[id].theme === theme) {
          results.push({ id, ...this.districts[id] });
        }
      }
      return results;
    }
  };

  // ==================== 游戏系统 ====================
  const ZootopiaGames = {
    // Pawpsicle 接取游戏
    pawpsicleCatch: {
      start: function() {
        console.log('🍦 Pawpsicle 接取游戏开始！');
        // 游戏逻辑
      }
    },

    // 角色猜谜游戏
    characterQuiz: {
      start: function() {
        console.log('🎭 角色猜谜游戏开始！');
        // 游戏逻辑
      }
    },

    // 记忆卡片游戏
    memoryGame: {
      start: function() {
        console.log('🃏 记忆卡片游戏开始！');
        // 游戏逻辑
      }
    }
  };

  // ==================== ZPD 罚单系统 ====================
  const ZPDTicket = {
    // 生成罚单
    generate: function(options) {
      const defaults = {
        violation: '超速行驶',
        offender: '未知',
        officer: '朱迪·霍普斯',
        fine: 150,
        location: '撒哈拉广场',
        date: new Date().toLocaleDateString('zh-CN')
      };

      const ticket = { ...defaults, ...options };
      return ticket;
    },

    // 显示罚单
    display: function(ticket) {
      const html = `
        <div class="zpd-ticket" style="border: 3px solid #3498DB; padding: 20px; margin: 20px auto; max-width: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="text-align: center; margin-bottom: 15px;">
            <h2 style="margin: 0; font-size: 24px;">🚔 ZPD 罚单</h2>
            <p style="margin: 5px 0; font-size: 14px;">Zootopia Police Department</p>
          </div>
          <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px;">
            <p><strong>违规行为:</strong> ${ticket.violation}</p>
            <p><strong>违规者:</strong> ${ticket.offender}</p>
            <p><strong>开单警官:</strong> ${ticket.officer}</p>
            <p><strong>罚款金额:</strong> $${ticket.fine}</p>
            <p><strong>违章地点:</strong> ${ticket.location}</p>
            <p><strong>开单日期:</strong> ${ticket.date}</p>
          </div>
          <div style="text-align: center; margin-top: 15px; font-size: 12px; opacity: 0.8;">
            🐰🦊 任何人都可以成为任何样子
          </div>
        </div>
      `;
      return html;
    }
  };

  // ==================== 时间胶囊系统 ====================
  const TimeCapsule = {
    // 创建时间胶囊
    create: function(message, futureDate) {
      const capsule = {
        id: Date.now(),
        message: message,
        createDate: new Date().toISOString(),
        openDate: futureDate,
        status: 'sealed'
      };

      // 保存到 localStorage
      const capsules = JSON.parse(localStorage.getItem('zt-capsules') || '[]');
      capsules.push(capsule);
      localStorage.setItem('zt-capsules', JSON.stringify(capsules));

      return capsule;
    },

    // 获取所有胶囊
    getAll: function() {
      return JSON.parse(localStorage.getItem('zt-capsules') || '[]');
    },

    // 检查可以打开的胶囊
    checkOpenable: function() {
      const now = new Date();
      const capsules = this.getAll();
      return capsules.filter(c => new Date(c.openDate) <= now && c.status === 'sealed');
    }
  };

  // ==================== 成就系统 ====================
  const AchievementSystem = {
    achievements: {
      first_comment: { name: '初次发声', icon: '💬', description: '发表第一条评论' },
      points_100: { name: '积分达人', icon: '⭐', description: '获得100积分' },
      checkin_7: { name: '坚持签到', icon: '📅', description: '连续签到7天' },
      explorer: { name: '城市探险家', icon: '🗺️', description: '访问所有地区' }
    },

    // 解锁成就
    unlock: function(achievementId) {
      const unlocked = JSON.parse(localStorage.getItem('zt-achievements') || '[]');
      if (!unlocked.includes(achievementId)) {
        unlocked.push(achievementId);
        localStorage.setItem('zt-achievements', JSON.stringify(unlocked));

        const achievement = this.achievements[achievementId];
        this.showNotification(achievement);
      }
    },

    // 显示成就通知
    showNotification: function(achievement) {
      const notification = document.createElement('div');
      notification.className = 'zt-achievement-notification';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
      `;
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">${achievement.icon}</span>
          <div>
            <div style="font-weight: bold;">成就解锁！</div>
            <div style="font-size: 14px;">${achievement.name}</div>
            <div style="font-size: 12px; opacity: 0.9;">${achievement.description}</div>
          </div>
        </div>
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    }
  };

  // ==================== 导出全局对象 ====================
  window.ZootopiaThemeFeatures = {
    characters: ZootopiaCharacters,
    districts: ZootopiaDistricts,
    games: ZootopiaGames,
    zpdTicket: ZPDTicket,
    timeCapsule: TimeCapsule,
    achievements: AchievementSystem
  };

  // 添加全局快捷函数
  window.ztGetCharacter = function(id) {
    return ZootopiaCharacters.getById(id);
  };

  window.ztGetRandomCharacter = function() {
    return ZootopiaCharacters.getRandom();
  };

  window.ztGetDistrict = function(id) {
    return ZootopiaDistricts.getById(id);
  };

  window.ztGenerateZPDTicket = function(options) {
    return ZPDTicket.generate(options);
  };

  window.ztDisplayZPDTicket = function(ticket) {
    return ZPDTicket.display(ticket);
  };

  window.ztCreateTimeCapsule = function(message, futureDate) {
    return TimeCapsule.create(message, futureDate);
  };

  window.ztUnlockAchievement = function(achievementId) {
    return AchievementSystem.unlock(achievementId);
  };

  // 初始化完成提示
  if (window.console && window.console.log) {
    console.log('🎉 疯狂动物城主题特色功能包已加载！');
    console.log('🐰 使用 ztGetCharacter("judy") 查看角色');
    console.log('🦊 使用 ztGetRandomCharacter() 获取随机角色');
    console.log('🗺️ 使用 ztGetDistrict("sahara") 查看地区');
    console.log('🚔 使用 ztGenerateZPDTicket() 生成ZPD罚单');
    console.log('⏰ 使用 ztCreateTimeCapsule() 创建时间胶囊');
    console.log('🏆 使用 ztUnlockAchievement() 解锁成就');
  }

})();
