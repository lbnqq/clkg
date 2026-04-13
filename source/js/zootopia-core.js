/**
 * 疯狂动物城核心模块
 * Zootopia Core Module - 共享功能和数据
 */

(function(window) {
  'use strict';

  // ==================== 配置管理 ====================
  const ZootopiaConfig = {
    // 动画配置
    animation: {
      fast: 200,    // 快速动画
      normal: 300,  // 正常动画
      slow: 500,    // 慢速动画
      slower: 800   // 更慢动画
    },

    // 主题颜色
    colors: {
      sahara: '#FF9F43',
      tundratown: '#0ABDE3',
      rainforest: '#10AC84',
      downtown: '#5F27CD',
      bunnyburrow: '#26DE81',
      judy: '#9C85C6',
      nick: '#FF6B35'
    },

    // 性能配置
    performance: {
      lazyLoad: true,           // 启用懒加载
      debounceDelay: 150,       // 防抖延迟
      throttleDelay: 100,       // 节流延迟
      maxConcurrentAnimations: 5 // 最大并发动画数
    }
  };

  // ==================== 角色数据库（单例） ====================
  const CharacterDatabase = {
    judy: {
      name: 'Judy Hopps',
      nameZh: '朱迪·霍普斯',
      species: 'Rabbit',
      emoji: '🐰',
      color: '#9C85C6',
      stats: { bravery: 95, speed: 88, determination: 100 },
      quote: 'Try Everything! Anyone can be anything!',
      quoteZh: '尝试一切！任何人都可以成为任何样子！',
      badge: '814'
    },
    nick: {
      name: 'Nick Wilde',
      nameZh: '尼克·王尔德',
      species: 'Fox',
      emoji: '🦊',
      color: '#FF6B35',
      stats: { cunning: 92, charm: 88, loyalty: 85 },
      quote: 'It\'s called a hustle, sweetheart!',
      quoteZh: '这叫诈骗，亲爱的！',
      badge: '待定'
    },
    bogo: {
      name: 'Chief Bogo',
      nameZh: '博戈局长',
      species: 'Cape Buffalo',
      emoji: '🦬',
      color: '#5D4E37',
      stats: { authority: 95, experience: 90, strictness: 85 },
      quote: 'You have 48 hours!',
      quoteZh: '你只有48小时！',
      badge: '001'
    },
    flash: {
      name: 'Flash',
      nameZh: '闪电',
      species: 'Sloth',
      emoji: '🦥',
      color: '#8B7355',
      stats: { speed: 5, friendliness: 95, patience: 100 },
      quote: '......................',
      quoteZh: '......................',
      badge: 'DMV-001'
    },
    clawhauser: {
      name: 'Benjamin Clawhauser',
      nameZh: '本杰明·克劳豪瑟',
      species: 'Cheetah',
      emoji: '🦆',
      color: '#FFB347',
      stats: { enthusiasm: 100, gazelleLove: 100, efficiency: 75 },
      quote: 'Did you see Gazelle\'s new video?',
      quoteZh: '你看到夏奇羊的新视频了吗？',
      badge: '前台'
    }
  };

  // ==================== 地区数据库（单例） ====================
  const DistrictDatabase = [
    { id: 'sahara', name: 'Sahara Square', nameZh: '撒哈拉广场', emoji: '🏜️', colors: ['#FF9F43', '#EE5A24'], temp: '38°C' },
    { id: 'tundratown', name: 'Tundratown', nameZh: '冰川镇', emoji: '❄️', colors: ['#0ABDE3', '#48DBFB'], temp: '-5°C' },
    { id: 'rainforest', name: 'Rainforest District', nameZh: '雨林区', emoji: '🌴', colors: ['#10AC84', '#1DD1A1'], temp: '28°C' },
    { id: 'downtown', name: 'Downtown', nameZh: '市中心', emoji: '🏙️', colors: ['#5F27CD', '#341F97'], temp: '22°C' },
    { id: 'bunnyburrow', name: 'Bunnyburrow', nameZh: '兔窝镇', emoji: '🥕', colors: ['#26DE81', '#20BF6B'], temp: '20°C' }
  ];

  // ==================== 社区数据库（第28轮新增） ====================
  const CommunityDatabase = {
    stats: {
      totalVisitors: 0,
      totalMessages: 0,
      lastVisit: null
    }
  };

  // ==================== 工具函数 ====================
  const Utils = {
    // 防抖函数
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || ZootopiaConfig.performance.debounceDelay);
      };
    },

    // 节流函数
    throttle: function(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit || ZootopiaConfig.performance.throttleDelay);
        }
      };
    },

    // 随机选择
    random: function(array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    // 随机范围
    randomRange: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // 创建元素
    createElement: function(tag, className, innerHTML) {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (innerHTML) el.innerHTML = innerHTML;
      return el;
    },

    // 安全查询
    querySelector: function(selector) {
      return document.querySelector(selector);
    },

    // 批量查询
    querySelectorAll: function(selector) {
      return document.querySelectorAll(selector);
    },

    // 添加类
    addClass: function(element, className) {
      if (element) element.classList.add(className);
    },

    // 移除类
    removeClass: function(element, className) {
      if (element) element.classList.remove(className);
    },

    // 切换类
    toggleClass: function(element, className) {
      if (element) element.classList.toggle(className);
    }
  };

  // ==================== 事件管理器（统一事件处理） ====================
  const EventManager = {
    listeners: new Map(),

    // 添加事件监听（带命名空间）
    on: function(element, event, handler, options = {}) {
      if (!element) return;

      const key = `${element}_${event}`;
      if (!this.listeners.has(key)) {
        this.listeners.set(key, []);
      }
      this.listeners.get(key).push(handler);

      element.addEventListener(event, handler, options);
    },

    // 移除事件监听
    off: function(element, event, handler) {
      if (!element) return;

      const key = `${element}_${event}`;
      if (this.listeners.has(key)) {
        const handlers = this.listeners.get(key);
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
      element.removeEventListener(event, handler);
    },

    // 一次性事件
    once: function(element, event, handler) {
      const wrappedHandler = function(e) {
        handler(e);
        element.removeEventListener(event, wrappedHandler);
      };
      element.addEventListener(event, wrappedHandler);
    },

    // 委托事件
    delegate: function(element, selector, event, handler) {
      element.addEventListener(event, function(e) {
        const target = e.target.closest(selector);
        if (target && element.contains(target)) {
          handler.call(target, e);
        }
      });
    }
  };

  // ==================== 模块管理器（懒加载） ====================
  const ModuleManager = {
    loadedModules: new Set(),
    pendingModules: new Map(),

    // 注册模块
    register: function(name, initFn, dependencies = []) {
      this.pendingModules.set(name, { initFn, dependencies });
    },

    // 加载模块
    load: function(name) {
      if (this.loadedModules.has(name)) {
        return Promise.resolve();
      }

      const module = this.pendingModules.get(name);
      if (!module) {
        return Promise.reject(new Error(`模块 ${name} 未注册`));
      }

      // 先加载依赖
      const depPromises = module.dependencies.map(dep => this.load(dep));

      return Promise.all(depPromises).then(() => {
        if (!this.loadedModules.has(name)) {
          module.initFn();
          this.loadedModules.add(name);
        }
      });
    },

    // 批量加载
    loadBatch: function(names) {
      return Promise.all(names.map(name => this.load(name)));
    }
  };

  // ==================== DOM 就绪管理器 ====================
  const DOMReady = {
    isReady: false,
    callbacks: [],

    init: function() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.ready());
      } else {
        // DOM 已就绪
        setTimeout(() => this.ready(), 0);
      }
    },

    ready: function() {
      if (this.isReady) return;
      this.isReady = true;

      // 执行所有回调
      this.callbacks.forEach(fn => fn());
      this.callbacks = [];
    },

    // 添加就绪回调
    then: function(callback) {
      if (this.isReady) {
        callback();
      } else {
        this.callbacks.push(callback);
      }
    }
  };

  // 初始化 DOM 就绪管理器
  DOMReady.init();

  // ==================== 动画管理器 ====================
  const AnimationManager = {
    activeAnimations: 0,
    animationQueue: [],

    // 创建动画
    create: function(element, keyframes, options = {}) {
      if (this.activeAnimations >= ZootopiaConfig.performance.maxConcurrentAnimations) {
        // 动画队列已满，加入队列
        return new Promise(resolve => {
          this.animationQueue.push({ element, keyframes, options, resolve });
        });
      }

      this.activeAnimations++;
      const animation = element.animate(keyframes, {
        duration: options.duration || ZootopiaConfig.animation.normal,
        easing: options.easing || 'ease-out',
        ...options
      });

      animation.onfinish = () => {
        this.activeAnimations--;
        this.processQueue();
      };

      return animation.finished;
    },

    // 处理队列
    processQueue: function() {
      if (this.animationQueue.length > 0 &&
          this.activeAnimations < ZootopiaConfig.performance.maxConcurrentAnimations) {
        const next = this.animationQueue.shift();
        this.create(next.element, next.keyframes, next.options).then(next.resolve);
      }
    }
  };

  // ==================== 社区数据模块（第28轮新增） ====================
  const CommunityModule = {
    storageKeyMessages: 'zootopia_community_messages',
    storageKeyVisitors: 'zootopia_community_visitors',
    storageKeyStats: 'zootopia_community_stats',
    storageKeyCurrentUser: 'zootopia_community_current_user',

    // 生成唯一ID
    generateId: function() {
      return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // 格式化时间
    formatTime: function(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;

      if (diff < 60000) return '刚刚';
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
      if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';

      return date.getFullYear() + '-' +
             String(date.getMonth() + 1).padStart(2, '0') + '-' +
             String(date.getDate()).padStart(2, '0') + ' ' +
             String(date.getHours()).padStart(2, '0') + ':' +
             String(date.getMinutes()).padStart(2, '0');
    },

    // 本地存储操作
    storage: {
      get: function(key, defaultValue) {
        try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
          return defaultValue;
        }
      },
      set: function(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (e) {
          return false;
        }
      }
    },

    // 清理过期消息
    cleanOldMessages: function(maxAgeDays = 30) {
      const messages = this.storage.get(this.storageKeyMessages, []);
      const expiryTime = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);
      const filtered = messages.filter(m => m.timestamp > expiryTime);

      if (filtered.length !== messages.length) {
        this.storage.set(this.storageKeyMessages, filtered);
      }
      return filtered.length;
    },

    // 获取统计数据
    getStats: function() {
      this.cleanOldMessages(30);
      const stats = this.storage.get(this.storageKeyStats, {
        totalVisitors: 0,
        totalMessages: 0,
        lastVisit: null
      });

      const messages = this.storage.get(this.storageKeyMessages, []);
      return {
        totalVisitors: stats.totalVisitors,
        totalMessages: stats.totalMessages,
        lastVisit: stats.lastVisit,
        messages: Math.min(messages.length, 50)
      };
    },

    // 更新访客统计
    updateVisitor: function(visitorName) {
      const stats = this.storage.get(this.storageKeyStats, {
        totalVisitors: 0,
        totalMessages: 0,
        lastVisit: null
      });

      stats.totalVisitors++;
      stats.lastVisit = Date.now();
      this.storage.set(this.storageKeyStats, stats);

      const visitor = {
        name: visitorName,
        lastSeen: Date.now(),
        sessionId: this.generateId()
      };
      this.storage.set(this.storageKeyCurrentUser, visitor);

      return visitor;
    },

    // 获取留言列表
    getMessages: function(limit = 50) {
      const messages = this.storage.get(this.storageKeyMessages, []);
      return messages
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
    },

    // 添加留言
    addMessage: function(content, author, replyTo = null) {
      if (!content || !content.trim()) {
        return { success: false, error: '内容不能为空' };
      }

      if (content.length > 500) {
        return { success: false, error: '内容过长' };
      }

      const messages = this.storage.get(this.storageKeyMessages, []);
      const stats = this.storage.get(this.storageKeyStats, {
        totalVisitors: 0,
        totalMessages: 0,
        lastVisit: null
      });

      // 检查今日发言次数
      const today = new Date().toDateString();
      const todayCount = messages.filter(m => {
        const msgDate = new Date(m.timestamp).toDateString();
        return m.author === author && msgDate === today;
      }).length;

      if (todayCount >= 5) {
        return { success: false, error: '今日发言次数已达上限' };
      }

      const newMessage = {
        id: this.generateId(),
        content: content.trim().substring(0, 500),
        author: author,
        timestamp: Date.now(),
        replyTo: replyTo,
        reactions: {
          like: 0,
          heart: 0,
          laugh: 0,
          excite: 0,
          support: 0,
          cool: 0
        }
      };

      messages.unshift(newMessage);
      this.storage.set(this.storageKeyMessages, messages);
      stats.totalMessages++;
      this.storage.set(this.storageKeyStats, stats);

      return { success: true, message: newMessage };
    },

    // 添加反应
    addReaction: function(messageId, reactionType) {
      const messages = this.storage.get(this.storageKeyMessages, []);
      const message = messages.find(m => m.id === messageId);

      if (!message) {
        return { success: false, error: '消息不存在' };
      }

      if (!message.reactions[reactionType]) {
        return { success: false, error: '无效的反应类型' };
      }

      message.reactions[reactionType]++;
      this.storage.set(this.storageKeyMessages, messages);

      return { success: true, reactions: message.reactions };
    }
  };

  // ==================== 导出 API ====================
  window.ZootopiaCore = {
    config: ZootopiaConfig,
    characters: CharacterDatabase,
    districts: DistrictDatabase,
    community: CommunityModule,
    utils: Utils,
    events: EventManager,
    modules: ModuleManager,
    dom: DOMReady,
    animation: AnimationManager
  };

  // ==================== 自动初始化标记 ====================
  window.ZootopiaCore.version = '2.0.0';
  window.ZootopiaCore.loaded = true;

  console.log('🐰🦊 Zootopia Core v2.0.0 已加载 - 优化版');

})(window);
