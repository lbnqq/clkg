/**
 * 疯狂动物城时间胶囊系统（增强版）
 * Zootopia Time Capsule Enhanced - 记录访问历史、显示怀旧内容、时光倒流
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const TimeCapsuleConfig = {
    // 存储键
    storageKeys: {
      visits: 'zt_time_capsule_visits',
      milestones: 'zt_time_capsule_milestones',
      memories: 'zt_time_capsule_memories'
    },

    // 记录配置
    tracking: {
      enabled: true,
      trackVisits: true,
      trackMilestones: true,
      trackTimeOnPage: true
    },

    // 怀旧配置
    nostalgia: {
      enabled: true,
      showWelcomeBack: true,
      showTimeAgo: true,
      showVisitCount: true
    },

    // 里程碑
    milestones: {
      firstVisit: 'first_visit',
      returnAfter: {
        oneDay: 86400000,
        oneWeek: 604800000,
        oneMonth: 2592000000
      }
    }
  };

  // ==================== 访问记录管理器 ====================
  const VisitTracker = {
    visits: [],
    currentVisit: null,
    startTime: null,

    init: function() {
      this.loadVisits();
      this.startCurrentVisit();
      this.cleanupOldVisits();
    },

    // 加载访问记录
    loadVisits: function() {
      try {
        const data = localStorage.getItem(TimeCapsuleConfig.storageKeys.visits);
        this.visits = data ? JSON.parse(data) : [];
      } catch (e) {
        this.visits = [];
      }
    },

    // 保存访问记录
    saveVisits: function() {
      try {
        localStorage.setItem(
          TimeCapsuleConfig.storageKeys.visits,
          JSON.stringify(this.visits)
        );
      } catch (e) {
        console.warn('保存访问记录失败:', e);
      }
    },

    // 开始当前访问
    startCurrentVisit: function() {
      this.startTime = Date.now();

      this.currentVisit = {
        id: this.generateId(),
        timestamp: this.startTime,
        url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        duration: 0
      };

      this.visits.push(this.currentVisit);
      this.saveVisits();
    },

    // 结束当前访问
    endCurrentVisit: function() {
      if (!this.currentVisit) return;

      this.currentVisit.duration = Date.now() - this.startTime;
      this.saveVisits();
    },

    // 生成唯一ID
    generateId: function() {
      return `visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 清理旧记录（保留最近 100 条）
    cleanupOldVisits: function() {
      if (this.visits.length > 100) {
        this.visits = this.visits.slice(-100);
        this.saveVisits();
      }
    },

    // 获取访问统计
    getStats: function() {
      const now = Date.now();
      const oneDayAgo = now - 86400000;
      const oneWeekAgo = now - 604800000;

      return {
        total: this.visits.length,
        today: this.visits.filter(v => v.timestamp > oneDayAgo).length,
        thisWeek: this.visits.filter(v => v.timestamp > oneWeekAgo).length,
        firstVisit: this.visits[0]?.timestamp || null,
        lastVisit: this.visits[this.visits.length - 2]?.timestamp || null
      };
    },

    // 检查是否是首次访问
    isFirstVisit: function() {
      return this.visits.length === 1;
    },

    // 检查是否是回访
    isReturnVisit: function() {
      return this.visits.length > 1;
    },

    // 获取距离上次访问的时间
    getTimeSinceLastVisit: function() {
      if (this.visits.length < 2) return null;

      const lastVisit = this.visits[this.visits.length - 2];
      return Date.now() - lastVisit.timestamp;
    }
  };

  // ==================== 里程碑管理器 ====================
  const MilestoneTracker = {
    milestones: [],

    init: function() {
      this.loadMilestones();
      this.checkMilestones();
    },

    // 加载里程碑
    loadMilestones: function() {
      try {
        const data = localStorage.getItem(TimeCapsuleConfig.storageKeys.milestones);
        this.milestones = data ? JSON.parse(data) : [];
      } catch (e) {
        this.milestones = [];
      }
    },

    // 保存里程碑
    saveMilestones: function() {
      try {
        localStorage.setItem(
          TimeCapsuleConfig.storageKeys.milestones,
          JSON.stringify(this.milestones)
        );
      } catch (e) {
        console.warn('保存里程碑失败:', e);
      }
    },

    // 检查里程碑
    checkMilestones: function() {
      const stats = VisitTracker.getStats();
      const now = Date.now();

      // 首次访问
      if (VisitTracker.isFirstVisit()) {
        this.addMilestone({
          type: 'first_visit',
          title: '🎉 首次访问',
          message: '欢迎来到疯狂动物城！',
          timestamp: now
        });
      }

      // 回访里程碑
      if (VisitTracker.isReturnVisit()) {
        const timeSinceLast = VisitTracker.getTimeSinceLastVisit();

        if (timeSinceLast > TimeCapsuleConfig.milestones.returnAfter.oneWeek) {
          this.addMilestone({
            type: 'return_visit',
            title: '👋 欢迎回来',
            message: `你已离开超过一周，我们想念你！`,
            timestamp: now
          });
        } else if (timeSinceLast > TimeCapsuleConfig.milestones.returnAfter.oneDay) {
          this.addMilestone({
            type: 'return_visit',
            title: '👋 很快又见面了',
            message: '很高兴再次见到你！',
            timestamp: now
          });
        }
      }

      // 访问次数里程碑
      if (stats.total === 10) {
        this.addMilestone({
          type: 'visit_count',
          title: '🎊 10次访问',
          message: '你已经是疯狂动物城的常客了！',
          timestamp: now
        });
      } else if (stats.total === 50) {
        this.addMilestone({
          type: 'visit_count',
          title: '🏆 50次访问',
          message: '你是真正的动物城粉丝！',
          timestamp: now
        });
      }
    },

    // 添加里程碑
    addMilestone: function(milestone) {
      // 检查是否已存在
      const exists = this.milestones.some(m =>
        m.type === milestone.type &&
        Date.now() - m.timestamp < 86400000 // 24小时内不重复
      );

      if (!exists) {
        milestone.id = this.generateId();
        this.milestones.push(milestone);
        this.saveMilestones();
        this.showMilestone(milestone);
      }
    },

    // 生成唯一ID
    generateId: function() {
      return `milestone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 显示里程碑
    showMilestone: function(milestone) {
      // 使用通知系统显示
      if (window.ztNotify) {
        ztNotify({
          type: 'success',
          title: milestone.title,
          message: milestone.message,
          duration: 5000
        });
      }
    }
  };

  // ==================== 怀旧组件 ====================
  const NostalgiaComponents = {
    // 显示欢迎回来消息
    showWelcomeBack: function() {
      if (!TimeCapsuleConfig.nostalgia.showWelcomeBack) return;
      if (!VisitTracker.isReturnVisit()) return;

      const stats = VisitTracker.getStats();
      const timeSinceLast = VisitTracker.getTimeSinceLastVisit();
      const timeAgo = this.formatTimeAgo(timeSinceLast);

      const message = `欢迎回来！你上一次访问是在 ${timeAgo}，这是你的第 ${stats.total} 次访问。`;

      // 创建欢迎横幅
      const banner = document.createElement('div');
      banner.className = 'zt-welcome-back-banner';
      banner.innerHTML = `
        <div class="zt-welcome-back-content">
          <span class="zt-welcome-back-icon">👋</span>
          <span class="zt-welcome-back-message">${message}</span>
          <button class="zt-welcome-back-close">×</button>
        </div>
      `;

      // 添加样式
      this.addStyles();

      document.body.appendChild(banner);

      // 绑定关闭事件
      const closeBtn = banner.querySelector('.zt-welcome-back-close');
      closeBtn.addEventListener('click', () => {
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 300);
      });

      // 自动消失
      setTimeout(() => {
        if (banner.parentNode) {
          banner.style.opacity = '0';
          setTimeout(() => banner.remove(), 300);
        }
      }, 10000);
    },

    // 显示访问统计
    showVisitStats: function() {
      if (!TimeCapsuleConfig.nostalgia.showVisitCount) return;

      const stats = VisitTracker.getStats();
      const statsWidget = document.createElement('div');
      statsWidget.className = 'zt-visit-stats-widget';
      statsWidget.innerHTML = `
        <div class="zt-visit-stats-header">
          <span>📊 访问统计</span>
          <button class="zt-visit-stats-close">×</button>
        </div>
        <div class="zt-visit-stats-content">
          <div class="zt-visit-stat">
            <span class="zt-visit-stat-label">总访问</span>
            <span class="zt-visit-stat-value">${stats.total}</span>
          </div>
          <div class="zt-visit-stat">
            <span class="zt-visit-stat-label">今天</span>
            <span class="zt-visit-stat-value">${stats.today}</span>
          </div>
          <div class="zt-visit-stat">
            <span class="zt-visit-stat-label">本周</span>
            <span class="zt-visit-stat-value">${stats.thisWeek}</span>
          </div>
        </div>
      `;

      document.body.appendChild(statsWidget);

      // 绑定事件
      const closeBtn = statsWidget.querySelector('.zt-visit-stats-close');
      closeBtn.addEventListener('click', () => {
        statsWidget.remove();
      });
    },

    // 显示时间胶囊
    showTimeCapsule: function() {
      const memories = this.getMemories();

      if (memories.length === 0) return;

      const capsule = document.createElement('div');
      capsule.className = 'zt-time-capsule';
      capsule.innerHTML = `
        <div class="zt-time-capsule-header">
          <span>🕰️ 时间胶囊</span>
          <button class="zt-time-capsule-close">×</button>
        </div>
        <div class="zt-time-capsule-content">
          ${memories.slice(0, 5).map(memory => `
            <div class="zt-capsule-memory">
              <div class="zt-capsule-memory-date">${this.formatDate(memory.timestamp)}</div>
              <div class="zt-capsule-memory-title">${memory.title}</div>
              ${memory.message ? `<div class="zt-capsule-memory-message">${memory.message}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;

      document.body.appendChild(capsule);

      // 绑定事件
      const closeBtn = capsule.querySelector('.zt-time-capsule-close');
      closeBtn.addEventListener('click', () => {
        capsule.remove();
      });
    },

    // 获取回忆
    getMemories: function() {
      try {
        const data = localStorage.getItem(TimeCapsuleConfig.storageKeys.memories);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    },

    // 格式化时间差
    formatTimeAgo: function(milliseconds) {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} 天前`;
      } else if (hours > 0) {
        return `${hours} 小时前`;
      } else if (minutes > 0) {
        return `${minutes} 分钟前`;
      } else {
        return '刚刚';
      }
    },

    // 格式化日期
    formatDate: function(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;

      // 如果是今天
      if (diff < 86400000 && date.getDate() === now.getDate()) {
        return '今天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      }

      // 如果是昨天
      if (diff < 172800000) {
        return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      }

      // 其他情况
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    },

    // 添加样式
    addStyles: function() {
      if (document.querySelector('#zt-time-capsule-styles-enhanced')) return;

      const style = document.createElement('style');
      style.id = 'zt-time-capsule-styles-enhanced';
      style.textContent = `
        /* ==================== 欢迎回来横幅 ==================== */
        .zt-welcome-back-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #FF9F43 0%, #EE5A24 100%);
          color: white;
          padding: 12px 20px;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: zt-slide-down 300ms ease-out;
        }

        @keyframes zt-slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .zt-welcome-back-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
        }

        .zt-welcome-back-icon {
          font-size: 24px;
        }

        .zt-welcome-back-message {
          flex: 1;
          text-align: center;
          font-weight: 500;
        }

        .zt-welcome-back-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0 8px;
          opacity: 0.8;
          transition: opacity 150ms ease-out;
        }

        .zt-welcome-back-close:hover {
          opacity: 1;
        }

        /* ==================== 访问统计组件 ==================== */
        .zt-visit-stats-widget {
          position: fixed;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          background: var(--zt-surface, #1a1a2e);
          border: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
          border-radius: 16px;
          padding: 20px;
          z-index: 999;
          box-shadow: 0 8px 32px var(--zt-shadow, rgba(0, 0, 0, 0.1));
          color: var(--zt-text, #ffffff);
          min-width: 200px;
        }

        .zt-visit-stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .zt-visit-stats-close {
          background: none;
          border: none;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
          font-size: 20px;
          cursor: pointer;
          padding: 0;
        }

        .zt-visit-stats-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .zt-visit-stat {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
        }

        .zt-visit-stat:last-child {
          border-bottom: none;
        }

        .zt-visit-stat-label {
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
        }

        .zt-visit-stat-value {
          font-weight: 600;
          color: var(--zt-primary, #FF9F43);
        }

        /* ==================== 时间胶囊 ==================== */
        .zt-time-capsule {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: var(--zt-surface, #1a1a2e);
          border: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
          border-radius: 16px;
          padding: 20px;
          z-index: 999;
          box-shadow: 0 8px 32px var(--zt-shadow, rgba(0, 0, 0, 0.1));
          color: var(--zt-text, #ffffff);
          max-width: 320px;
          max-height: 400px;
          overflow-y: auto;
        }

        .zt-time-capsule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .zt-time-capsule-close {
          background: none;
          border: none;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
          font-size: 20px;
          cursor: pointer;
          padding: 0;
        }

        .zt-time-capsule-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .zt-capsule-memory {
          padding: 12px;
          background: var(--zt-background, #ffffff);
          border-radius: 8px;
          border: 1px solid var(--zt-border, rgba(255, 255, 255, 0.1));
        }

        .zt-capsule-memory-date {
          font-size: 11px;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
          margin-bottom: 4px;
        }

        .zt-capsule-memory-title {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .zt-capsule-memory-message {
          font-size: 12px;
          color: var(--zt-text-secondary, rgba(255, 255, 255, 0.6));
        }

        /* ==================== 响应式 ==================== */
        @media (max-width: 768px) {
          .zt-visit-stats-widget {
            right: 10px;
            top: auto;
            bottom: 80px;
            transform: none;
          }

          .zt-time-capsule {
            left: 10px;
            right: 10px;
            bottom: 10px;
            max-width: none;
          }

          .zt-welcome-back-banner {
            padding: 10px 15px;
          }

          .zt-welcome-back-message {
            font-size: 14px;
          }
        }
      `;

      document.head.appendChild(style);
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.timeCapsuleEnhanced = {
    visits: VisitTracker,
    milestones: MilestoneTracker,
    nostalgia: NostalgiaComponents
  };
  ZootopiaCore.timeCapsuleConfigEnhanced = TimeCapsuleConfig;

  // ==================== 全局 API ====================
  // 获取访问统计
  window.ztGetVisitStats = () => VisitTracker.getStats();

  // 显示时间胶囊
  window.ztShowTimeCapsuleEnhanced = () => NostalgiaComponents.showTimeCapsule();

  // 添加回忆
  window.ztAddMemoryEnhanced = (title, message) => {
    const memory = {
      id: Date.now(),
      timestamp: Date.now(),
      title,
      message
    };

    try {
      const memories = NostalgiaComponents.getMemories();
      memories.push(memory);
      localStorage.setItem(
        TimeCapsuleConfig.storageKeys.memories,
        JSON.stringify(memories)
      );
    } catch (e) {
      console.error('保存回忆失败:', e);
    }
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    if (TimeCapsuleConfig.tracking.enabled) {
      VisitTracker.init();
      MilestoneTracker.init();

      // 显示欢迎消息
      setTimeout(() => {
        NostalgiaComponents.showWelcomeBack();
      }, 1000);
    }

    console.log('🕰️ 时间胶囊系统（增强版）已就绪');
  });

  // ==================== 页面离开时保存 ====================
  window.addEventListener('beforeunload', () => {
    if (TimeCapsuleConfig.tracking.enabled) {
      VisitTracker.endCurrentVisit();
    }
  });

  // ==================== 定期更新时长 ====================
  setInterval(() => {
    if (TimeCapsuleConfig.tracking.trackTimeOnPage && VisitTracker.currentVisit) {
      VisitTracker.currentVisit.duration = Date.now() - VisitTracker.startTime;
      VisitTracker.saveVisits();
    }
  }, 60000); // 每分钟更新一次

})();
