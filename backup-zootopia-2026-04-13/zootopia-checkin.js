/**
 * 疯狂动物城每日签到系统
 * Zootopia Daily Check-in System
 *
 * 每日签到奖励和连续签到追踪
 */

(function() {
  'use strict';

  const CheckinConfig = {
    // 签到奖励
    baseReward: 5,
    streakBonus: 2,         // 每连续签到一天额外奖励
    maxStreakBonus: 20,    // 最大连续奖励

    // 签到时间窗口
    startTime: '00:00',
    endTime: '23:59',

    // 奖励
    milestoneRewards: [
      { days: 7, reward: 50, badge: '🌟' },
      { days: 30, reward: 200, badge: '🏆' },
      { days: 100, reward: 1000, badge: '💎' },
      { days: 365, reward: 5000, badge: '👑' }
    ],

    // 通知
    showReminder: true,
    reminderTime: '20:00'
  };

  /**
   * 签到管理器
   */
  const DailyCheckin = {
    checkinData: null,

    /**
     * 初始化
     */
    init: function() {
      this.loadCheckinData();
      this.createCheckinWidget();
      this.setupReminder();
    },

    /**
     * 加载签到数据
     */
    loadCheckinData: function() {
      try {
        const stored = localStorage.getItem('zt_checkin_data');
        if (stored) {
          this.checkinData = JSON.parse(stored);
        } else {
          this.checkinData = {
            userId: this.getUserId(),
            totalDays: 0,
            currentStreak: 0,
            longestStreak: 0,
            lastCheckin: null,
            history: []
          };
        }
      } catch (e) {
        console.warn('Failed to load checkin data:', e);
        this.checkinData = this.createDefaultData();
      }
    },

    /**
     * 创建默认数据
     */
    createDefaultData: function() {
      return {
        userId: this.getUserId(),
        totalDays: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastCheckin: null,
        history: []
      };
    },

    /**
     * 获取用户ID
     */
    getUserId: function() {
      return localStorage.getItem('zt_user_id') || 'user_' + Date.now();
    },

    /**
     * 创建签到组件
     */
    createCheckinWidget: function() {
      const widget = document.createElement('div');
      widget.className = 'zt-checkin-widget';
      widget.innerHTML = `
        <div class="zt-checkin-status">
          <div class="zt-checkin-info">
            <span class="zt-checkin-title">每日签到</span>
            <span class="zt-checkin-streak">连续 ${this.checkinData.currentStreak} 天</span>
          </div>
          <button class="zt-checkin-btn ${this.hasCheckedToday() ? 'zt-checked' : ''}" ${this.hasCheckedToday() ? 'disabled' : ''}>
            <span class="zt-checkin-icon">${this.hasCheckedToday() ? '✓' : '📅'}</span>
            <span class="zt-checkin-text">${this.hasCheckedToday() ? '已签到' : '签到'}</span>
          </button>
        </div>
        ${this.renderRewards()}
      `;

      // 插入到页面（可以在侧边栏或其他位置）
      const target = document.querySelector('.sidebar, .widget-area, aside');
      if (target) {
        target.insertBefore(widget, target.firstChild);
      }

      // 附加事件
      const btn = widget.querySelector('.zt-checkin-btn');
      btn.addEventListener('click', () => {
        this.performCheckin();
      });

      this.widget = widget;
    },

    /**
     * 渲染奖励
     */
    renderRewards: function() {
      const rewards = CheckinConfig.milestoneRewards;
      const progress = this.checkinData.currentStreak;

      return `
        <div class="zt-checkin-rewards">
          <div class="zt-rewards-title">签到奖励</div>
          <div class="zt-rewards-list">
            ${rewards.map((reward, index) => {
              const achieved = progress >= reward.days;
              const progress = Math.min(100, (progress / reward.days) * 100);

              return `
                <div class="zt-reward-item ${achieved ? 'zt-reward-achieved' : ''}" data-reward="${reward.days}">
                  <div class="zt-reward-badge">${reward.badge}</div>
                  <div class="zt-reward-info">
                    <div class="zt-reward-desc">连续 ${reward.days} 天</div>
                    <div class="zt-reward-bonus">${reward.reward} 积分</div>
                    <div class="zt-reward-progress">
                      <div class="zt-reward-progress-bar" style="width: ${progress}%"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    },

    /**
     * 检查今天是否已签到
     */
    hasCheckedToday: function() {
      if (!this.checkinData.lastCheckin) return false;
      const lastDate = new Date(this.checkinData.lastCheckin).toDateString();
      const today = new Date().toDateString();
      return lastDate === today;
    },

    /**
     * 执行签到
     */
    performCheckin: function() {
      if (this.hasCheckedToday()) {
        if (window.ztNotify) {
          ztNotify({
            type: 'warning',
            message: '今天已经签到过了',
            duration: 2000
          });
        }
        return;
      }

      const today = new Date().toDateString();

      // 计算连续签到
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (this.checkinData.lastCheckin &&
          new Date(this.checkinData.lastCheckin).toDateString() === yesterday) {
        this.checkinData.currentStreak++;
      } else {
        this.checkinData.currentStreak = 1;
      }

      // 更新最长连续
      if (this.checkinData.currentStreak > this.checkinData.longestStreak) {
        this.checkinData.longestStreak = this.checkinData.currentStreak;
      }

      // 计算奖励
      const baseReward = CheckinConfig.baseReward;
      const streakBonus = Math.min(
        CheckinConfig.maxStreakBonus,
        this.checkinData.currentStreak * CheckinConfig.streakBonus
      );
      const totalReward = baseReward + streakBonus;

      // 添加到历史
      this.checkinData.totalDays++;
      this.checkinData.lastCheckin = Date.now();
      this.checkinData.history.push({
        date: today,
        streak: this.checkinData.currentStreak,
        reward: totalReward
      });

      // 保存
      this.saveCheckinData();

      // 更新UI
      this.updateWidget();

      // 添加积分
      if (window.ztAddPoints) {
        ztAddPoints(totalReward, 'checkin', {
          streak: this.checkinData.currentStreak,
          bonus: streakBonus
        });
      }

      // 显示通知
      let message = `签到成功！+${totalReward} 积分`;
      if (streakBonus > 0) {
        message += ` (连续奖励 +${streakBonus})`;
      }

      if (window.ztNotify) {
        ztNotify({
          type: 'success',
          message: message,
          duration: 3000
        });
      }
    },

    /**
     * 更新签到组件
     */
    updateWidget: function() {
      if (!this.widget) return;

      this.widget.outerHTML = this.widget.outerHTML.replace('zt-checkin-widget', '');
      this.createCheckinWidget();
    },

    /**
     * 保存签到数据
     */
    saveCheckinData: function() {
      try {
        localStorage.setItem('zt_checkin_data', JSON.stringify(this.checkinData));
      } catch (e) {
        console.warn('Failed to save checkin data:', e);
      }
    },

    /**
     * 设置提醒
     */
    setupReminder: function() {
      if (!CheckinConfig.showReminder) return;

      // 检查提醒时间
      const checkReminder = () => {
        const now = new Date();
        const [hour, minute] = CheckinConfig.reminderTime.split(':').map(Number);

        if (now.getHours() === hour && now.getMinutes() === minute && !this.hasCheckedToday()) {
          if (window.ztNotify) {
            ztNotify({
              type: 'info',
              message: '别忘了今天签到哦！📅',
              duration: 5000
            });
          }
        }
      };

      // 每分钟检查一次
      setInterval(checkReminder, 60000);
    },

    /**
     * 获取签到统计
     */
    getStats: function() {
      return {
        totalDays: this.checkinData.totalDays,
        currentStreak: this.checkinData.currentStreak,
        longestStreak: this.checkinData.longestStreak,
        lastCheckin: this.checkinData.lastCheckin,
        recentHistory: this.checkinData.history.slice(-7)
      };
    }
  };

  // 导出 API
  ZootopiaCore.dailyCheckin = DailyCheckin;
  ZootopiaCore.checkinConfig = CheckinConfig;

  // 全局 API
  window.ztPerformCheckin = () => DailyCheckin.performCheckin();
  window.ztGetCheckinStats = () => DailyCheckin.getStats();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    DailyCheckin.init();
  });

})();
