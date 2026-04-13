/**
 * 疯狂动物城用户积分系统
 * Zootopia User Points System
 *
 * 用户活动和积分管理
 */

(function() {
  'use strict';

  const UserPointsConfig = {
    // 积分规则
    points: {
      comment: 10,           // 评论获得积分
      like: 5,               // 被点赞
      share: 15,             // 分享文章
      follow: 20,            // 关注
      checkin: 5,            // 每日签到
      read: 2,               // 阅读文章
      continuousCheckin: 10 // 连续签到奖励
    },

    // 等级
    levels: [
      { name: '新手市民', minPoints: 0, badge: '🐣' },
      { name: '实习警察', minPoints: 100, badge: '👮' },
      { name: '正式警员', minPoints: 500, badge: '👮‍♂️' },
      { name: '资深警员', minPoints: 1000, badge: '🎖️' },
      { name: '警长', minPoints: 2000, badge: '🏆' },
      { name: '局长', minPoints: 5000, badge: '👑' }
    ],

    // 通知
    showNotification: true,
    notifyLevelUp: true
  };

  /**
   * 用户积分管理器
   */
  const UserPoints = {
    userData: null,

    /**
     * 初始化
     */
    init: function() {
      this.loadUserData();
      this.createUserPanel();
    },

    /**
     * 加载用户数据
     */
    loadUserData: function() {
      try {
        const data = localStorage.getItem('zt_user_data');
        if (data) {
          this.userData = JSON.parse(data);
        } else {
          this.userData = this.createDefaultUser();
        }
      } catch (e) {
        this.userData = this.createDefaultUser();
      }
    },

    /**
     * 创建默认用户
     */
    createDefaultUser: function() {
      return {
        userId: this.generateUserId(),
        points: 0,
        level: 0,
        checkinStreak: 0,
        lastCheckin: null,
        lastCheckinDate: null,
        createdAt: Date.now(),
        activities: []
      };
    },

    /**
     * 生成用户ID
     */
    generateUserId: function() {
      let id = localStorage.getItem('zt_user_id');
      if (!id) {
        id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('zt_user_id', id);
      }
      return id;
    },

    /**
     * 创建用户面板
     */
    createUserPanel: function() {
      const panel = document.createElement('div');
      panel.className = 'zt-user-panel';
      panel.innerHTML = `
        <div class="zt-user-panel-header">
          <div class="zt-user-info">
            <div class="zt-user-badge">${this.getCurrentBadge()}</div>
            <div class="zt-user-details">
              <div class="zt-user-name">${this.getCurrentLevel()}</div>
              <div class="zt-user-points">${this.userData.points} 积分</div>
            </div>
          </div>
          <button class="zt-user-panel-toggle" aria-label="用户面板">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4 1.79-4 4-4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v6h8v-6c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>
        <div class="zt-user-panel-content">
          <div class="zt-user-stats">
            <div class="zt-stat-item">
              <span class="zt-stat-label">当前等级</span>
              <span class="zt-stat-value">${this.getCurrentLevel()}</span>
            </div>
            <div class="zt-stat-item">
              <span class="zt-stat-label">积分</span>
              <span class="zt-stat-value">${this.userData.points}</span>
            </div>
            <div class="zt-stat-item">
              <span class="zt-stat-label">连续签到</span>
              <span class="zt-stat-value">${this.userData.checkinStreak} 天</span>
            </div>
          </div>
          <div class="zt-user-progress">
            <div class="zt-progress-label">距离下一等级还需 ${this.getPointsToNextLevel()} 积分</div>
            <div class="zt-progress-bar">
              <div class="zt-progress-fill" style="width: ${this.getLevelProgress()}%"></div>
            </div>
          </div>
          <div class="zt-user-actions">
            <button class="zt-action-btn zt-checkin-btn">
              <span class="zt-action-icon">📅</span>
              <span class="zt-action-text">每日签到</span>
            </button>
            <button class="zt-action-btn zt-points-history">
              <span class="zt-action-icon">📊</span>
              <span class="zt-action-text">积分明细</span>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(panel);

      // 事件监听
      this.attachPanelEvents(panel);
    },

    /**
     * 附加面板事件
     */
    attachPanelEvents: function(panel) {
      // 切换面板
      const toggle = panel.querySelector('.zt-user-panel-toggle');
      toggle.addEventListener('click', () => {
        panel.classList.toggle('zt-user-panel-open');
      });

      // 点击外部关闭
      document.addEventListener('click', (e) => {
        if (!panel.contains(e.target)) {
          panel.classList.remove('zt-user-panel-open');
        }
      });

      // 签到按钮
      const checkinBtn = panel.querySelector('.zt-checkin-btn');
      checkinBtn.addEventListener('click', () => {
        this.performCheckin();
      });

      // 积分明细按钮
      const historyBtn = panel.querySelector('.zt-points-history');
      historyBtn.addEventListener('click', () => {
        this.showPointsHistory();
      });
    },

    /**
     * 执行签到
     */
    performCheckin: function() {
      const today = new Date().toDateString();

      if (this.userData.lastCheckinDate === today) {
        if (window.ztNotify) {
          ztNotify({
            type: 'warning',
            message: '今天已经签到过了',
            duration: 2000
          });
        }
        return;
      }

      // 计算连续签到
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (this.userData.lastCheckinDate === yesterday) {
        this.userData.checkinStreak++;
      } else {
        this.userData.checkinStreak = 1;
      }

      // 添加积分
      const basePoints = UserPointsConfig.points.checkin;
      const bonusPoints = this.userData.checkinStreak * UserPointsConfig.points.continuousCheckin;
      const totalPoints = basePoints + bonusPoints;

      this.addPoints(totalPoints, 'checkin', {
        streak: this.userData.checkinStreak,
        bonus: bonusPoints
      });

      this.userData.lastCheckin = Date.now();
      this.userData.lastCheckinDate = today;

      this.saveUserData();
      this.updateUserPanel();

      // 显示通知
      if (window.ztNotify) {
        let message = `签到成功！+${basePoints} 积分`;
        if (bonusPoints > 0) {
          message += ` (连续奖励 +${bonusPoints})`;
        }
        ztNotify({
          type: 'success',
          message: message,
          duration: 3000
        });
      }
    },

    /**
     * 添加积分
     */
    addPoints: function(points, type, metadata = {}) {
      this.userData.points += points;
      this.userData.activities.push({
        type,
        points,
        timestamp: Date.now(),
        metadata
      });

      // 检查等级提升
      this.checkLevelUp();

      this.saveUserData();
    },

    /**
     * 检查等级提升
     */
    checkLevelUp: function() {
      const oldLevel = this.userData.level;
      const newLevel = this.calculateLevel();

      if (newLevel > oldLevel) {
        this.userData.level = newLevel;

        if (UserPointsConfig.notifyLevelUp && window.ztNotify) {
          const level = UserPointsConfig.levels[newLevel];
          ztNotify({
            type: 'success',
            message: `恭喜升级到 ${level.name}！${level.badge}`,
            duration: 5000
          });
        }

        this.updateUserPanel();
      }
    },

    /**
     * 计算等级
     */
    calculateLevel: function() {
      for (let i = UserPointsConfig.levels.length - 1; i >= 0; i--) {
        if (this.userData.points >= UserPointsConfig.levels[i].minPoints) {
          return i;
        }
      }
      return 0;
    },

    /**
     * 获取当前等级
     */
    getCurrentLevel: function() {
      return UserPointsConfig.levels[this.userData.level]?.name || '新手市民';
    },

    /**
     * 获取当前徽章
     */
    getCurrentBadge: function() {
      return UserPointsConfig.levels[this.userData.level]?.badge || '🐣';
    },

    /**
     * 获取到下一等级所需积分
     */
    getPointsToNextLevel: function() {
      const nextLevel = this.userData.level + 1;
      const levelConfig = UserPointsConfig.levels[nextLevel];

      if (!levelConfig) return 0;

      return Math.max(0, levelConfig.minPoints - this.userData.points);
    },

    /**
     * 获取等级进度百分比
     */
    getLevelProgress: function() {
      const currentLevel = UserPointsConfig.levels[this.userData.level];
      const nextLevel = UserPointsConfig.levels[this.userData.level + 1];

      if (!currentLevel || !nextLevel) return 100;

      const range = nextLevel.minPoints - currentLevel.minPoints;
      const progress = this.userData.points - currentLevel.minPoints;

      return range > 0 ? Math.min(100, (progress / range) * 100) : 100;
    },

    /**
     * 保存用户数据
     */
    saveUserData: function() {
      try {
        localStorage.setItem('zt_user_data', JSON.stringify(this.userData));
      } catch (e) {
        console.warn('Failed to save user data:', e);
      }
    },

    /**
     * 更新用户面板
     */
    updateUserPanel: function() {
      const panel = document.querySelector('.zt-user-panel');
      if (!panel) return;

      // 更新显示
      panel.querySelector('.zt-user-badge').textContent = this.getCurrentBadge();
      panel.querySelector('.zt-user-name').textContent = this.getCurrentLevel();
      panel.querySelector('.zt-user-points').textContent = `${this.userData.points} 积分`;
      panel.querySelector('.zt-user-streak').textContent = `${this.userData.checkinStreak} 天`;
      panel.querySelector('.zt-progress-fill').style.width = `${this.getLevelProgress()}%`;
      panel.querySelector('.zt-progress-label').textContent = `距离下一等级还需 ${this.getPointsToNextLevel()} 积分`;
    },

    /**
     * 显示积分历史
     */
    showPointsHistory: function() {
      const activities = this.userData.activities.slice(-20); // 最近20条
      const reversed = [...activities].reverse();

      const modal = document.createElement('div');
      modal.className = 'zt-points-history-modal';
      modal.innerHTML = `
        <div class="zt-points-history-content">
          <div class="zt-points-history-header">
            <h3>积分明细</h3>
            <button class="zt-points-history-close" aria-label="关闭">×</button>
          </div>
          <div class="zt-points-history-list">
            ${reversed.map(activity => {
              const config = UserPointsConfig.points[activity.type];
              return `
                <div class="zt-history-item">
                  <span class="zt-history-icon">${this.getActivityIcon(activity.type)}</span>
                  <span class="zt-history-desc">${this.getActivityDescription(activity)}</span>
                  <span class="zt-history-points ${activity.points > 0 ? 'zt-points-positive' : 'zt-points-negative'}">
                    ${activity.points > 0 ? '+' : ''}${activity.points}
                  </span>
                  <span class="zt-history-time">${new Date(activity.timestamp).toLocaleString()}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // 关闭事件
      modal.querySelector('.zt-points-history-close').addEventListener('click', () => {
        modal.remove();
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });

      setTimeout(() => modal.classList.add('zt-history-visible'), 10);
    },

    /**
     * 获取活动图标
     */
    getActivityIcon: function(type) {
      const icons = {
        comment: '💬',
        like: '👍',
        share: '📤',
        follow: '➕',
        checkin: '✅',
        read: '📖',
        continuousCheckin: '🔥'
      };
      return icons[type] || '📌';
    },

    /**
     * 获取活动描述
     */
    getActivityDescription: function(activity) {
      const descriptions = {
        comment: '发表评论',
        like: '获得点赞',
        share: '分享文章',
        follow: '关注作者',
        checkin: '每日签到',
        read: '阅读文章',
        continuousCheckin: `连续签到${activity.metadata.streak}天奖励`
      };
      return descriptions[activity.type] || '未知活动';
    }
  };

  // 导出 API
  ZootopiaCore.userPoints = UserPoints;
  ZootopiaCore.userPointsConfig = UserPointsConfig;

  // 全局 API
  window.ztAddPoints = (points, type, metadata) => UserPoints.addPoints(points, type, metadata);
  window.ztPerformCheckin = () => UserPoints.performCheckin();
  window.ztGetUserStats = () => UserPoints.userData;

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    UserPoints.init();
  });

})();
