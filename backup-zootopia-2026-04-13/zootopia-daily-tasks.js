/**
 * 疯狂动物城主题 - ZPD每日任务系统
 * Zootopia Theme - ZPD Daily Tasks System
 * | 完成每日任务获取经验值和奖励
 */

(function() {
  'use strict';

  // 任务配置
  const dailyTasks = [
    {
      id: 'visit_station',
      name: '巡视警察局',
      description: '访问动物城警察局总部',
      icon: '🚔',
      xp: 20,
      completed: false
    },
    {
      id: 'help_citizen',
      name: '帮助市民',
      description: '在评论区回复一条消息',
      icon: '🤝',
      xp: 30,
      completed: false
    },
    {
      id: 'patrol_district',
      name: '巡逻辖区',
      description: '浏览3个不同的页面',
      icon: '🏙️',
      xp: 25,
      completed: false,
      progress: 0,
      target: 3
    },
    {
      id: 'collect_clues',
      name: '收集线索',
      description: '收集5个Pawpsicle',
      icon: '🔍',
      xp: 50,
      completed: false,
      progress: 0,
      target: 5
    },
    {
      id: 'solve_case',
      name: '破案',
      description: '完成一次问答游戏',
      icon: '📋',
      xp: 100,
      completed: false
    },
    {
      id: 'train_partner',
      name: '训练搭档',
      description: '与角色对话3次',
      icon: '💬',
      xp: 40,
      completed: false,
      progress: 0,
      target: 3
    },
    {
      id: 'write_report',
      name: '撰写报告',
      description: '阅读一篇完整文章',
      icon: '📝',
      xp: 35,
      completed: false
    },
    {
      id: 'team_up',
      name: '团队合作',
      description: '访问文章页面',
      icon: '👥',
      xp: 15,
      completed: false
    }
  ];

  // 成就系统
  const achievements = [
    { id: 'rookie', name: '新手警官', icon: '🎖️', requirement: '完成第一个每日任务', unlocked: false },
    { id: 'dedicated', name: '敬业警官', icon: '⭐', requirement: '连续3天完成所有任务', unlocked: false },
    { id: 'elite', name: '精英警官', icon: '🏆', requirement: '累计完成50个任务', unlocked: false },
    { id: 'legend', name: '传奇警官', icon: '👑', requirement: '连续7天完成所有任务', unlocked: false },
    { id: 'speedster', name: '闪电侠', icon: '⚡', requirement: '在1小时内完成所有任务', unlocked: false },
    { id: 'perfectionist', name: '完美主义者', icon: '💯', requirement: '连续30天完成所有任务', unlocked: false }
  ];

  // 用户数据
  let taskData = JSON.parse(localStorage.getItem('zootopiaTaskData')) || {
    tasks: {},
    achievements: [],
    streak: 0,
    lastCompletedDate: null,
    totalCompleted: 0,
    startTime: null
  };

  // 获取今天的日期
  function getTodayKey() {
    return new Date().toDateString();
  }

  // 初始化今日任务
  function initTodayTasks() {
    const today = getTodayKey();

    if (!taskData.tasks[today]) {
      taskData.tasks[today] = JSON.parse(JSON.stringify(dailyTasks));
      taskData.startTime[today] = Date.now();
      saveTaskData();
    }

    return taskData.tasks[today];
  }

  // 保存任务数据
  function saveTaskData() {
    localStorage.setItem('zootopiaTaskData', JSON.stringify(taskData));
  }

  // 创建任务面板
  function createTaskPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-task-panel';
    panel.innerHTML = `
      <button class="task-toggle" title="每日任务">
        <span class="toggle-icon">📋</span>
        <span class="task-progress-badge" id="taskProgressBadge">0/8</span>
      </button>
      <div class="task-content">
        <div class="task-header">
          <div class="header-left">
            <span class="header-icon">🚔</span>
            <div class="header-text">
              <div class="header-title">ZPD 每日任务</div>
              <div class="header-subtitle">完成任务获取经验值</div>
            </div>
          </div>
          <div class="header-right">
            <div class="streak-info">
              <span class="streak-icon">🔥</span>
              <span class="streak-count">${taskData.streak}天</span>
            </div>
            <button class="task-close">×</button>
          </div>
        </div>

        <div class="task-timer" id="taskTimer">
          <span class="timer-icon">⏰</span>
          <span class="timer-text">任务将在明天刷新</span>
        </div>

        <div class="tasks-list" id="tasksList">
          <!-- 任务列表将动态生成 -->
        </div>

        <div class="task-achievements">
          <div class="achievements-title">
            <span>🏅 成就</span>
            <span class="achievements-count">${taskData.achievements.length}/${achievements.length}</span>
          </div>
          <div class="achievements-list" id="achievementsList">
            <!-- 成就列表将动态生成 -->
          </div>
        </div>

        <div class="task-rewards">
          <div class="rewards-title">🎁 今日奖励</div>
          <div class="rewards-list">
            <div class="reward-item">
              <span class="reward-icon">⭐</span>
              <span class="reward-text">总计 ${calculateTotalXP()} XP</span>
            </div>
            <div class="reward-item">
              <span class="reward-icon">🎖️</span>
              <span class="reward-text">完成所有任务解锁成就</span>
            </div>
          </div>
        </div>
      </div>
    `;

    return panel;
  }

  // 计算总经验值
  function calculateTotalXP() {
    const today = getTodayKey();
    const todayTasks = taskData.tasks[today] || [];
    return todayTasks.reduce((sum, task) => sum + (task.completed ? task.xp : 0), 0);
  }

  // 渲染任务列表
  function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    if (!tasksList) return;

    const todayTasks = initTodayTasks();
    const completedCount = todayTasks.filter(t => t.completed).length;

    // 更新进度徽章
    const progressBadge = document.getElementById('taskProgressBadge');
    if (progressBadge) {
      progressBadge.textContent = `${completedCount}/${todayTasks.length}`;
    }

    tasksList.innerHTML = todayTasks.map(task => {
      const progressPercent = task.target
        ? Math.min(100, (task.progress / task.target) * 100)
        : (task.completed ? 100 : 0);

      return `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
          <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask('${task.id}')">
            ${task.completed ? '✓' : ''}
          </div>
          <div class="task-icon">${task.icon}</div>
          <div class="task-info">
            <div class="task-name">${task.name}</div>
            <div class="task-description">${task.description}</div>
            ${task.target ? `
              <div class="task-progress-bar">
                <div class="task-progress-fill" style="width: ${progressPercent}%"></div>
                <span class="task-progress-text">${task.progress}/${task.target}</span>
              </div>
            ` : ''}
          </div>
          <div class="task-xp">+${task.xp} XP</div>
        </div>
      `;
    }).join('');
  }

  // 渲染成就列表
  function renderAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    if (!achievementsList) return;

    achievementsList.innerHTML = achievements.map(achievement => {
      const unlocked = taskData.achievements.includes(achievement.id);
      return `
        <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}" title="${achievement.requirement}">
          <span class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</span>
          <span class="achievement-name">${achievement.name}</span>
        </div>
      `;
    }).join('');

    // 更新成就计数
    const countEl = document.querySelector('.achievements-count');
    if (countEl) {
      countEl.textContent = `${taskData.achievements.length}/${achievements.length}`;
    }
  }

  // 切换任务状态
  function toggleTask(taskId) {
    const today = getTodayKey();
    const todayTasks = taskData.tasks[today];
    if (!todayTasks) return;

    const task = todayTasks.find(t => t.id === taskId);
    if (!task) return;

    if (!task.completed) {
      // 完成任务
      if (task.target && task.progress < task.target) {
        // 需要进度的任务不能手动完成
        return;
      }
      task.completed = true;

      // 显示完成动画
      showTaskComplete(task);

      // 添加经验值
      if (window.zootopiaAddXP) {
        window.zootopiaAddXP(task.xp, `完成任务: ${task.name}`);
      }

      taskData.totalCompleted++;

      // 检查成就解锁
      checkAchievements();
    }

    saveTaskData();
    renderTasks();
    renderAchievements();
  }

  // 更新任务进度
  function updateTaskProgress(taskId, increment = 1) {
    const today = getTodayKey();
    const todayTasks = taskData.tasks[today];
    if (!todayTasks) return;

    const task = todayTasks.find(t => t.id === taskId);
    if (!task || !task.target || task.completed) return;

    task.progress = Math.min(task.target, task.progress + increment);

    // 检查是否完成
    if (task.progress >= task.target) {
      task.completed = true;
      showTaskComplete(task);

      if (window.zootopiaAddXP) {
        window.zootopiaAddXP(task.xp, `完成任务: ${task.name}`);
      }

      taskData.totalCompleted++;
      checkAchievements();
    }

    saveTaskData();
    renderTasks();
  }

  // 显示任务完成动画
  function showTaskComplete(task) {
    const notification = document.createElement('div');
    notification.className = 'task-complete-notification';
    notification.innerHTML = `
      <div class="complete-animation">
        <div class="complete-icon">${task.icon}</div>
        <div class="complete-title">任务完成！</div>
        <div class="complete-task">${task.name}</div>
        <div class="complete-reward">+${task.xp} XP</div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // 检查成就解锁
  function checkAchievements() {
    const today = getTodayKey();
    const todayTasks = taskData.tasks[today];
    if (!todayTasks) return;

    const allCompleted = todayTasks.every(t => t.completed);
    const todayDate = new Date().toDateString();

    // 新手警官
    if (!taskData.achievements.includes('rookie') && taskData.totalCompleted >= 1) {
      unlockAchievement('rookie');
    }

    // 敬业警官（连续3天）
    if (allCompleted && !taskData.achievements.includes('dedicated') && taskData.streak >= 3) {
      unlockAchievement('dedicated');
    }

    // 精英警官（累计50个）
    if (!taskData.achievements.includes('elite') && taskData.totalCompleted >= 50) {
      unlockAchievement('elite');
    }

    // 传奇警官（连续7天）
    if (allCompleted && !taskData.achievements.includes('legend') && taskData.streak >= 7) {
      unlockAchievement('legend');
    }

    // 检查每日完成并更新连续天数
    if (allCompleted && taskData.lastCompletedDate !== todayDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (taskData.lastCompletedDate === yesterday.toDateString()) {
        taskData.streak++;
      } else if (taskData.lastCompletedDate !== todayDate) {
        taskData.streak = 1;
      }

      taskData.lastCompletedDate = todayDate;
      saveTaskData();
    }
  }

  // 解锁成就
  function unlockAchievement(achievementId) {
    if (taskData.achievements.includes(achievementId)) return;

    taskData.achievements.push(achievementId);
    saveTaskData();

    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      showAchievementUnlocked(achievement);

      if (window.zootopiaAddXP) {
        window.zootopiaAddXP(200, `解锁成就: ${achievement.name}`);
      }
    }
  }

  // 显示成就解锁通知
  function showAchievementUnlocked(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-unlock-notification';
    notification.innerHTML = `
      <div class="unlock-animation">
        <div class="unlock-icon">🏅</div>
        <div class="unlock-title">成就解锁！</div>
        <div class="unlock-achievement">${achievement.icon} ${achievement.name}</div>
        <div class="unlock-reward">+200 XP</div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  }

  // 自动任务检测
  function setupAutoTaskDetection() {
    // 页面访问检测
    let pagesVisited = new Set();
    const checkPageVisit = () => {
      const path = window.location.pathname;
      if (!pagesVisited.has(path)) {
        pagesVisited.add(path);
        updateTaskProgress('patrol_district');
        updateTaskProgress('team_up');

        // 文章页面
        if (path.includes('/20') || path.includes('/posts/')) {
          updateTaskProgress('write_report');
        }
      }
    };

    // 初始检查
    checkPageVisit();

    // 页面滚动检测（完成阅读）
    let readDetected = false;
    window.addEventListener('scroll', () => {
      if (!readDetected && (window.scrollY > document.body.scrollHeight * 0.8)) {
        readDetected = true;
        updateTaskProgress('write_report');
      }
    });

    // Pawpsicle收集检测（监听自定义事件）
    window.addEventListener('pawpsicleCollected', () => {
      updateTaskProgress('collect_clues');
    });

    // 游戏完成检测
    window.addEventListener('quizGameCompleted', () => {
      toggleTask('solve_case');
    });

    // 角色对话检测
    let chatCount = 0;
    window.addEventListener('characterMessage', () => {
      chatCount++;
      if (chatCount >= 3) {
        updateTaskProgress('train_partner');
      }
    });
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#daily-task-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'daily-task-styles';
    styles.textContent = `
      /* 任务面板 */
      .zootopia-task-panel {
        position: fixed;
        top: 430px;
        right: 30px;
        z-index: 9997;
      }

      .task-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3498DB, #2980B9);
        border: none;
        box-shadow: 0 5px 20px rgba(52, 152, 219, 0.5);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .task-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(52, 152, 219, 0.6);
      }

      .toggle-icon {
        font-size: 28px;
      }

      .task-progress-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #E74C3C;
        color: white;
        font-size: 11px;
        font-weight: bold;
        padding: 3px 6px;
        border-radius: 10px;
        border: 2px solid white;
      }

      .task-content {
        position: absolute;
        top: 0;
        right: 80px;
        width: 380px;
        max-height: 80vh;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        display: none;
        animation: taskSlideIn 0.3s ease;
        overflow: hidden;
      }

      .task-content.show {
        display: block;
      }

      @keyframes taskSlideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* 任务头部 */
      .task-header {
        background: linear-gradient(135deg, #3498DB, #2980B9);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header-icon {
        font-size: 32px;
      }

      .header-text {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .header-title {
        font-size: 16px;
        font-weight: bold;
      }

      .header-subtitle {
        font-size: 12px;
        opacity: 0.9;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .streak-info {
        display: flex;
        align-items: center;
        gap: 5px;
        background: rgba(255, 255, 255, 0.2);
        padding: 8px 12px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: bold;
      }

      .task-close {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      /* 计时器 */
      .task-timer {
        background: rgba(52, 152, 219, 0.1);
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #3498DB;
      }

      .timer-icon {
        font-size: 18px;
      }

      /* 任务列表 */
      .tasks-list {
        padding: 15px;
        max-height: 300px;
        overflow-y: auto;
      }

      .task-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        margin-bottom: 10px;
        background: #F8F9FA;
        border-radius: 12px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .task-item:hover {
        background: rgba(52, 152, 219, 0.05);
        border-color: rgba(52, 152, 219, 0.2);
      }

      .task-item.completed {
        opacity: 0.7;
        background: rgba(46, 204, 113, 0.1);
        border-color: #2ECC71;
      }

      .task-checkbox {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid #3498DB;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        transition: all 0.3s ease;
        font-weight: bold;
        color: white;
      }

      .task-checkbox:hover {
        transform: scale(1.1);
      }

      .task-checkbox.checked {
        background: #2ECC71;
        border-color: #2ECC71;
      }

      .task-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .task-info {
        flex: 1;
        min-width: 0;
      }

      .task-name {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 3px;
      }

      .task-description {
        font-size: 12px;
        color: #636E72;
      }

      .task-progress-bar {
        position: relative;
        height: 6px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        margin-top: 8px;
        overflow: hidden;
      }

      .task-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #3498DB, #2ECC71);
        border-radius: 3px;
        transition: width 0.5s ease;
      }

      .task-progress-text {
        position: absolute;
        top: -15px;
        right: 0;
        font-size: 10px;
        color: #636E72;
      }

      .task-xp {
        font-size: 12px;
        font-weight: bold;
        color: #F39C12;
        white-space: nowrap;
      }

      /* 成就 */
      .task-achievements {
        padding: 15px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .achievements-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
      }

      .achievements-count {
        font-size: 12px;
        color: #636E72;
      }

      .achievements-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .achievement-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #F8F9FA;
        border-radius: 20px;
        font-size: 12px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .achievement-item.unlocked {
        background: linear-gradient(135deg, rgba(241, 196, 15, 0.2), rgba(243, 156, 18, 0.2));
        border-color: #F1C40F;
      }

      .achievement-item.locked {
        opacity: 0.6;
      }

      .achievement-item:hover {
        transform: scale(1.05);
      }

      .achievement-icon {
        font-size: 18px;
      }

      /* 奖励 */
      .task-rewards {
        padding: 15px;
        background: linear-gradient(135deg, rgba(241, 196, 15, 0.1), rgba(243, 156, 18, 0.1));
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      .rewards-title {
        font-size: 14px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .rewards-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .reward-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        color: #636E72;
      }

      .reward-icon {
        font-size: 16px;
      }

      /* 完成通知 */
      .task-complete-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: popIn 0.5s ease;
      }

      .achievement-unlock-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10010;
        animation: popIn 0.5s ease;
      }

      @keyframes popIn {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }

      .complete-animation,
      .unlock-animation {
        background: white;
        border-radius: 20px;
        padding: 30px 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 280px;
      }

      .complete-icon,
      .unlock-icon {
        font-size: 64px;
        margin-bottom: 15px;
        animation: bounce 1s ease infinite;
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }

      .complete-title,
      .unlock-title {
        font-size: 20px;
        font-weight: bold;
        color: #2ECC71;
        margin-bottom: 10px;
      }

      .unlock-title {
        color: #F1C40F;
      }

      .complete-task,
      .unlock-achievement {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 15px;
      }

      .complete-reward,
      .unlock-reward {
        font-size: 18px;
        font-weight: bold;
        color: #F39C12;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .zootopia-task-panel {
          top: auto;
          bottom: 280px;
          right: 15px;
        }

        .task-content {
          width: calc(100vw - 60px);
          right: 0;
        }

        .tasks-list {
          max-height: 200px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化任务系统
  function initTaskSystem() {
    injectStyles();

    const panel = createTaskPanel();
    document.body.appendChild(panel);

    const content = panel.querySelector('.task-content');
    const toggle = panel.querySelector('.task-toggle');
    const close = panel.querySelector('.task-close');

    // 切换面板
    toggle.onclick = (e) => {
      e.stopPropagation();
      content.classList.toggle('show');
      if (content.classList.contains('show')) {
        renderTasks();
        renderAchievements();
      }
    };

    // 关闭按钮
    close.onclick = () => {
      content.classList.remove('show');
    };

    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) {
        content.classList.remove('show');
      }
    });

    // 初始化今日任务
    initTodayTasks();
    renderTasks();
    renderAchievements();

    // 设置自动检测
    setupAutoTaskDetection();
  }

  // 导出全局函数
  window.toggleTask = toggleTask;
  window.updateTaskProgress = updateTaskProgress;

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTaskSystem);
  } else {
    initTaskSystem();
  }
})();
