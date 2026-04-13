/**
 * 疯狂动物城主题 - 彩蛋猎人系统
 * Zootopia Theme - Egg Hunter System
 * | 发现电影中的彩蛋和隐藏细节
 */

(function() {
  'use strict';

  // 疯狂动物城彩蛋数据库
  const zootopiaEggs = {
    movie1: {
      title: '疯狂动物城 (2016)',
      eggs: [
        {
          id: 'm1_001',
          category: '语言彩蛋',
          icon: '🎬',
          title: '"前情蹄要"',
          description: '开篇 recap 使用 "be-fur" 代替 "before"，中文翻译为 "前情蹄要"（蹄 = hoof）',
          location: '电影开场',
          difficulty: 1,
          found: false
        },
        {
          id: 'm1_002',
          category: '致敬彩蛋',
          icon: '🫓',
          title: '魔发奇缘',
          description: '朱迪被关押时使用的平底锅武器致敬了《长发公主》中的乐佩',
          location: '监狱场景',
          difficulty: 2,
          found: false
        },
        {
          id: 'm1_003',
          category: '角色细节',
          icon: '🐭',
          title: '小老鼠报童',
          description: '新闻中有老鼠报童的画面，致敬《蜘蛛侠》中的经典场景',
          location: '新闻场景',
          difficulty: 2,
          found: false
        },
        {
          id: 'm1_004',
          category: '电影致敬',
          icon: '🎥',
          title: '教父',
          description: '大先生及其团队完全致敬《教父》中的马头场景',
          location: '大先生出场',
          difficulty: 1,
          found: false
        },
        {
          id: 'm1_005',
          category: '品牌彩蛋',
          icon: '🍦',
          title: 'Pawpsicle',
          description: '尼克的 Pawpsicle 冰棍包装设计灵感来自真实的冰棍品牌',
          location: '多个场景',
          difficulty: 1,
          found: false
        },
        {
          id: 'm1_006',
          category: '角色名字',
          icon: '🦊',
          title: '尼克·王尔德',
          description: '尼克的名字致敬《汤姆·索亚历险记》中的角色',
          location: '全片',
          difficulty: 3,
          found: false
        },
        {
          id: 'm1_007',
          category: '场景细节',
          icon: '🚗',
          title: '汽车型号',
          description: '动物城的汽车都是根据动物体型设计的定制款',
          location: '全片',
          difficulty: 2,
          found: false
        },
        {
          id: 'm1_008',
          category: '品牌彩蛋',
          icon: '🍔',
          title: 'Bug Burga',
          description: '昆虫汉堡餐厅的logo和菜单都使用了昆虫元素',
          location: '餐厅场景',
          difficulty: 1,
          found: false
        },
        {
          id: 'm1_009',
          category: '角色细节',
          icon: '🐆',
          title: '豹警官的玩偶',
          description: '前台警官Benjamin桌上瞪羚GAZELLE的玩偶会换不同造型',
          location: 'ZPD前台',
          difficulty: 2,
          found: false
        },
        {
          id: 'm1_010',
          category: '音乐彩蛋',
          icon: '🎵',
          title: '"Try Everything"',
          description: 'Shakira（夏奇拉）不仅为Gazelle配音，还演唱了主题曲',
          location: '演唱会场景',
          difficulty: 1,
          found: false
        }
      ]
    },
    movie2: {
      title: '疯狂动物城2 (2024)',
      eggs: [
        {
          id: 'm2_001',
          category: '剧情伏笔',
          icon: '🪶',
          title: '羽毛的伏笔',
          description: '结尾的羽毛暗示了鸟类角色将在续集中出现',
          location: '电影结尾',
          difficulty: 3,
          found: false
        },
        {
          id: 'm2_002',
          category: '角色回归',
          icon: '🐢',
          title: '闪电的进化',
          description: '闪电在DMV工作变得更"高效"了（相对而言）',
          location: 'DMV场景',
          difficulty: 1,
          found: false
        },
        {
          id: 'm2_003',
          category: '新地区',
          icon: '🏝️',
          title: '新区域展示',
          description: '电影2展示了更多动物城的12个独特区域',
          location: '多个场景',
          difficulty: 1,
          found: false
        },
        {
          id: 'm2_004',
          category: '致敬彩蛋',
          icon: '🎥',
          title: '料理鼠王',
          description: '电影中有多处向《料理鼠王》致敬的细节',
          location: '隐藏场景',
          difficulty: 2,
          found: false
        },
        {
          id: 'm2_005',
          category: '致敬彩蛋',
          icon: '🏨',
          title: '鬼店',
          description: '某场景向《闪灵》的经典元素致敬',
          location: '酒店场景',
          difficulty: 2,
          found: false
        },
        {
          id: 'm2_006',
          category: '致敬彩蛋',
          icon: '🦋',
          title: '沉默的羔羊',
          description: '朱迪的调查过程致敬了《沉默的羔羊》',
          location: '调查场景',
          difficulty: 3,
          found: false
        },
        {
          id: 'm2_007',
          category: '科幻致敬',
          icon: '🚀',
          title: '星际争霸战',
          description: '向《Star Trek》致敬的元素出现在背景中',
          location: '隐藏细节',
          difficulty: 3,
          found: false
        },
        {
          id: 'm2_008',
          category: '角色发展',
          icon: '👮',
          title: '朱迪的晋升',
          description: '朱迪在ZPD中获得了更高的地位和新的职责',
          location: '剧情发展',
          difficulty: 1,
          found: false
        },
        {
          id: 'm2_009',
          category: '新角色',
          icon: '🦎',
          title: '爬行动物角色',
          description: '电影2引入了更多爬行动物作为重要角色',
          location: '新角色登场',
          difficulty: 1,
          found: false
        },
        {
          id: 'm2_010',
          category: '视觉细节',
          icon: '🎨',
          title: '升级的画面',
          description: '相比第一集，动画技术和细节表现更加精致',
          location: '全片',
          difficulty: 2,
          found: false
        }
      ]
    }
  };

  // 用户发现记录
  let userDiscoveries = {
    totalFound: 0,
    score: 0,
    achievements: [],
    history: []
  };

  // 难度等级颜色
  const difficultyColors = {
    1: '#2ECC71', // 容易 - 绿色
    2: '#F39C12', // 中等 - 橙色
    3: '#E74C3C'  // 困难 - 红色
  };

  // 分类图标
  const categoryIcons = {
    '语言彩蛋': '💬',
    '致敬彩蛋': '🎬',
    '角色细节': '🐾',
    '电影致敬': '🎥',
    '品牌彩蛋': '🏷️',
    '角色名字': '📝',
    '场景细节': '🔍',
    '音乐彩蛋': '🎵',
    '剧情伏笔': '📖',
    '新地区': '🗺️',
    '角色回归': '↩️',
    '新角色': '🆕',
    '视觉细节': '👁️',
    '科幻致敬': '🛸'
  };

  // 创建彩蛋猎人面板
  function createEggHunterPanel() {
    const panel = document.createElement('div');
    panel.className = 'zootopia-egg-hunter-panel';
    panel.innerHTML = `
      <div class="egg-hunter-toggle" id="eggHunterToggle">
        <span class="toggle-icon">🥚</span>
        <span class="toggle-text">彩蛋猎人</span>
        <span class="toggle-count" id="eggCount">0</span>
      </div>
      <div class="egg-hunter-content" id="eggHunterContent">
        <div class="egg-hunter-header">
          <div class="header-title">
            <span class="title-icon">🔍</span>
            <span class="title-text">疯狂动物城彩蛋猎人</span>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-label">已发现</span>
              <span class="stat-value" id="foundCount">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">总彩蛋</span>
              <span class="stat-value" id="totalCount">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">积分</span>
              <span class="stat-value" id="scoreValue">0</span>
            </div>
          </div>
        </div>

        <div class="egg-hunter-tabs">
          <button class="egg-tab active" data-movie="movie1">疯狂动物城1</button>
          <button class="egg-tab" data-movie="movie2">疯狂动物城2</button>
        </div>

        <div class="egg-list-container">
          <div class="egg-filter-bar">
            <select class="category-filter" id="categoryFilter">
              <option value="all">全部分类</option>
            </select>
            <select class="difficulty-filter" id="difficultyFilter">
              <option value="all">全部难度</option>
              <option value="1">容易 ⭐</option>
              <option value="2">中等 ⭐⭐</option>
              <option value="3">困难 ⭐⭐⭐</option>
            </select>
          </div>
          <div class="egg-list" id="eggList"></div>
        </div>

        <div class="egg-hunter-achievements">
          <h3>🏆 成就系统</h3>
          <div class="achievements-list" id="achievementsList"></div>
        </div>
      </div>
    `;

    return panel;
  }

  // 渲染彩蛋列表
  function renderEggList(movieKey, filters = {}) {
    const movieData = zootopiaEggs[movieKey];
    const eggList = document.getElementById('eggList');
    if (!eggList || !movieData) return;

    let eggs = [...movieData.eggs];

    // 应用筛选
    if (filters.category !== 'all') {
      eggs = eggs.filter(egg => egg.category === filters.category);
    }
    if (filters.difficulty !== 'all') {
      eggs = eggs.filter(egg => egg.difficulty === parseInt(filters.difficulty));
    }

    eggList.innerHTML = eggs.map(egg => `
      <div class="egg-item ${egg.found ? 'found' : ''}" data-id="${egg.id}">
        <div class="egg-item-header">
          <div class="egg-icon">${categoryIcons[egg.category] || '🥚'}</div>
          <div class="egg-info">
            <div class="egg-title">${egg.title}</div>
            <div class="egg-meta">
              <span class="egg-category">${egg.category}</span>
              <span class="egg-difficulty" style="color: ${difficultyColors[egg.difficulty]}">
                ${'⭐'.repeat(egg.difficulty)}
              </span>
            </div>
          </div>
          <div class="egg-status">
            ${egg.found ? '<span class="found-badge">✓ 已发现</span>' : '<span class="unfound-badge">?</span>'}
          </div>
        </div>
        ${egg.found ? `
          <div class="egg-details">
            <p class="egg-description">${egg.description}</p>
            <p class="egg-location">📍 ${egg.location}</p>
          </div>
        ` : '<div class="egg-hidden">发现此彩蛋以查看详情</div>'}
      </div>
    `).join('');

    // 添加点击事件
    eggList.querySelectorAll('.egg-item').forEach(item => {
      item.onclick = () => {
        const eggId = item.dataset.id;
        toggleEggFound(eggId, movieKey);
      };
    });
  }

  // 切换彩蛋发现状态
  function toggleEggFound(eggId, movieKey) {
    const movieData = zootopiaEggs[movieKey];
    const egg = movieData.eggs.find(e => e.id === eggId);

    if (!egg) return;

    if (!egg.found) {
      // 发现新彩蛋
      egg.found = true;
      userDiscoveries.totalFound++;
      userDiscoveries.score += egg.difficulty * 100;
      userDiscoveries.history.push({
        eggId: egg.id,
        title: egg.title,
        timestamp: new Date().toISOString()
      });

      showDiscoveryAnimation(egg);
      checkAchievements();
      saveProgress();
      updateStats();
      renderEggList(movieKey, getCurrentFilters());
    }
  }

  // 显示发现动画
  function showDiscoveryAnimation(egg) {
    const animation = document.createElement('div');
    animation.className = 'egg-discovery-animation';
    animation.innerHTML = `
      <div class="discovery-content">
        <div class="discovery-icon">${categoryIcons[egg.category] || '🥚'}</div>
        <div class="discovery-title">发现新彩蛋！</div>
        <div class="discovery-egg-name">${egg.title}</div>
        <div class="discovery-points">+${egg.difficulty * 100} 积分</div>
      </div>
    `;
    document.body.appendChild(animation);

    // 播放音效（如果启用）
    playDiscoverySound();

    setTimeout(() => {
      animation.style.animation = 'discoveryFadeOut 0.5s ease forwards';
      setTimeout(() => animation.remove(), 500);
    }, 2000);
  }

  // 播放发现音效
  function playDiscoverySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  // 检查成就
  function checkAchievements() {
    const achievements = [
      {
        id: 'first_egg',
        name: '初次发现',
        icon: '🐣',
        description: '发现第一个彩蛋',
        condition: () => userDiscoveries.totalFound >= 1
      },
      {
        id: 'egg_collector_5',
        name: '收藏家',
        icon: '🥚',
        description: '发现5个彩蛋',
        condition: () => userDiscoveries.totalFound >= 5
      },
      {
        id: 'egg_master_10',
        name: '彩蛋大师',
        icon: '🏆',
        description: '发现10个彩蛋',
        condition: () => userDiscoveries.totalFound >= 10
      },
      {
        id: 'score_1000',
        name: '千分达人',
        icon: '💯',
        description: '获得1000积分',
        condition: () => userDiscoveries.score >= 1000
      },
      {
        id: 'hardcore_hunter',
        name: '硬核猎人',
        icon: '🎯',
        description: '发现5个困难彩蛋',
        condition: () => {
          let hardEggs = 0;
          Object.values(zootopiaEggs).forEach(movie => {
            movie.eggs.forEach(egg => {
              if (egg.found && egg.difficulty === 3) hardEggs++;
            });
          });
          return hardEggs >= 5;
        }
      },
      {
        id: 'movie1_complete',
        name: '第一集专家',
        icon: '🎬',
        description: '发现《疯狂动物城1》所有彩蛋',
        condition: () => zootopiaEggs.movie1.eggs.every(egg => egg.found)
      }
    ];

    achievements.forEach(achievement => {
      if (!userDiscoveries.achievements.includes(achievement.id) && achievement.condition()) {
        userDiscoveries.achievements.push(achievement.id);
        showAchievementUnlocked(achievement);
      }
    });

    renderAchievements();
  }

  // 显示成就解锁
  function showAchievementUnlocked(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-text">
          <div class="achievement-title">成就解锁！</div>
          <div class="achievement-name">${achievement.name}</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'achievementSlideOut 0.5s ease forwards';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // 渲染成就列表
  function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;

    const achievements = [
      { id: 'first_egg', name: '初次发现', icon: '🐣', description: '发现第一个彩蛋' },
      { id: 'egg_collector_5', name: '收藏家', icon: '🥚', description: '发现5个彩蛋' },
      { id: 'egg_master_10', name: '彩蛋大师', icon: '🏆', description: '发现10个彩蛋' },
      { id: 'score_1000', name: '千分达人', icon: '💯', description: '获得1000积分' },
      { id: 'hardcore_hunter', name: '硬核猎人', icon: '🎯', description: '发现5个困难彩蛋' },
      { id: 'movie1_complete', name: '第一集专家', icon: '🎬', description: '完成第一集' }
    ];

    list.innerHTML = achievements.map(achievement => {
      const unlocked = userDiscoveries.achievements.includes(achievement.id);
      return `
        <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${unlocked ? achievement.icon : '🔒'}</div>
          <div class="achievement-info">
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
          </div>
          ${unlocked ? '<div class="achievement-status">✓</div>' : ''}
        </div>
      `;
    }).join('');
  }

  // 更新统计
  function updateStats() {
    const totalEggs = Object.values(zootopiaEggs).reduce((sum, movie) => sum + movie.eggs.length, 0);

    document.getElementById('foundCount').textContent = userDiscoveries.totalFound;
    document.getElementById('totalCount').textContent = totalEggs;
    document.getElementById('scoreValue').textContent = userDiscoveries.score;
    document.getElementById('eggCount').textContent = userDiscoveries.totalFound;
  }

  // 获取当前筛选条件
  function getCurrentFilters() {
    return {
      category: document.getElementById('categoryFilter')?.value || 'all',
      difficulty: document.getElementById('difficultyFilter')?.value || 'all'
    };
  }

  // 填充分类筛选
  function populateCategoryFilter() {
    const filter = document.getElementById('categoryFilter');
    if (!filter) return;

    const categories = new Set();
    Object.values(zootopiaEggs).forEach(movie => {
      movie.eggs.forEach(egg => categories.add(egg.category));
    });

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = `${categoryIcons[category] || ''} ${category}`;
      filter.appendChild(option);
    });
  }

  // 保存进度
  function saveProgress() {
    const saveData = {
      discoveries: userDiscoveries,
      eggs: zootopiaEggs
    };
    localStorage.setItem('zootopiaEggHunter', JSON.stringify(saveData));
  }

  // 加载进度
  function loadProgress() {
    const saved = localStorage.getItem('zootopiaEggHunter');
    if (saved) {
      const data = JSON.parse(saved);
      userDiscoveries = data.discoveries || userDiscoveries;

      // 恢复彩蛋发现状态
      Object.keys(data.eggs).forEach(movieKey => {
        if (zootopiaEggs[movieKey]) {
          zootopiaEggs[movieKey].eggs.forEach(egg => {
            const savedEgg = data.eggs[movieKey].eggs.find(e => e.id === egg.id);
            if (savedEgg && savedEgg.found) {
              egg.found = true;
            }
          });
        }
      });
    }
  }

  // 切换面板
  function togglePanel() {
    const panel = document.querySelector('.zootopia-egg-hunter-panel');
    const content = document.getElementById('eggHunterContent');

    panel.classList.toggle('open');
    content.classList.toggle('visible');
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#egg-hunter-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'egg-hunter-styles';
    styles.textContent = `
      /* 彩蛋猎人面板 */
      .zootopia-egg-hunter-panel {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 9999;
        font-family: 'Nunito', sans-serif;
      }

      /* 切换按钮 */
      .egg-hunter-toggle {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s ease;
      }

      .egg-hunter-toggle:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(155, 89, 182, 0.5);
      }

      .toggle-icon {
        font-size: 24px;
        animation: eggBounce 2s ease infinite;
      }

      @keyframes eggBounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
      }

      .toggle-text {
        font-weight: bold;
        font-size: 16px;
      }

      .toggle-count {
        background: rgba(255, 255, 255, 0.2);
        padding: 5px 12px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 14px;
      }

      /* 内容面板 */
      .egg-hunter-content {
        position: absolute;
        bottom: 100%;
        right: 0;
        width: 400px;
        max-height: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: none;
        flex-direction: column;
      }

      .egg-hunter-content.visible {
        display: flex;
        animation: panelSlideIn 0.3s ease;
      }

      @keyframes panelSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 面板头部 */
      .egg-hunter-header {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 20px;
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      }

      .title-icon {
        font-size: 28px;
      }

      .title-text {
        font-size: 18px;
        font-weight: bold;
      }

      .header-stats {
        display: flex;
        justify-content: space-around;
      }

      .stat-item {
        text-align: center;
      }

      .stat-label {
        display: block;
        font-size: 12px;
        opacity: 0.9;
      }

      .stat-value {
        display: block;
        font-size: 20px;
        font-weight: bold;
      }

      /* 标签页 */
      .egg-hunter-tabs {
        display: flex;
        border-bottom: 1px solid #ECF0F1;
      }

      .egg-tab {
        flex: 1;
        padding: 12px;
        border: none;
        background: #F8F9FA;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 600;
      }

      .egg-tab.active {
        background: white;
        color: #9B59B6;
        border-bottom: 3px solid #9B59B6;
      }

      .egg-tab:hover:not(.active) {
        background: #ECF0F1;
      }

      /* 筛选栏 */
      .egg-filter-bar {
        padding: 15px;
        display: flex;
        gap: 10px;
        border-bottom: 1px solid #ECF0F1;
      }

      .category-filter,
      .difficulty-filter {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #DDD;
        border-radius: 8px;
        font-size: 12px;
        cursor: pointer;
      }

      /* 彩蛋列表 */
      .egg-list-container {
        flex: 1;
        overflow-y: auto;
        max-height: 300px;
      }

      .egg-list {
        padding: 10px;
      }

      .egg-item {
        background: #F8F9FA;
        border-radius: 12px;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .egg-item:hover {
        transform: translateX(5px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .egg-item.found {
        background: linear-gradient(135deg, #E8F8F5, #D4EFDF);
      }

      .egg-item-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
      }

      .egg-icon {
        font-size: 32px;
        flex-shrink: 0;
      }

      .egg-info {
        flex: 1;
      }

      .egg-title {
        font-weight: bold;
        font-size: 14px;
        color: #2D3436;
        margin-bottom: 4px;
      }

      .egg-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
      }

      .egg-category {
        color: #636E72;
      }

      .egg-status {
        flex-shrink: 0;
      }

      .found-badge {
        background: #2ECC71;
        color: white;
        padding: 4px 10px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: bold;
      }

      .unfound-badge {
        background: #95A5A6;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }

      .egg-details {
        padding: 0 12px 12px 56px;
      }

      .egg-description {
        font-size: 13px;
        color: #2D3436;
        line-height: 1.5;
        margin-bottom: 8px;
      }

      .egg-location {
        font-size: 12px;
        color: #636E72;
      }

      .egg-hidden {
        padding: 8px 12px;
        margin: 0 12px 12px 56px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        font-size: 12px;
        color: #95A5A6;
        text-align: center;
      }

      /* 成就系统 */
      .egg-hunter-achievements {
        border-top: 1px solid #ECF0F1;
        padding: 15px;
        background: #F8F9FA;
      }

      .egg-hunter-achievements h3 {
        font-size: 14px;
        color: #2D3436;
        margin-bottom: 10px;
      }

      .achievements-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .achievement-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: white;
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      .achievement-item.locked {
        opacity: 0.6;
      }

      .achievement-item.unlocked {
        background: linear-gradient(135deg, #FFF9E6, #FFF3CD);
      }

      .achievement-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .achievement-info {
        flex: 1;
      }

      .achievement-name {
        font-weight: bold;
        font-size: 13px;
        color: #2D3436;
      }

      .achievement-desc {
        font-size: 11px;
        color: #636E72;
      }

      .achievement-status {
        color: #2ECC71;
        font-size: 16px;
      }

      /* 发现动画 */
      .egg-discovery-animation {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;
        animation: discoveryPopIn 0.5s ease;
      }

      @keyframes discoveryPopIn {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes discoveryFadeOut {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.2);
        }
      }

      .discovery-content {
        background: linear-gradient(135deg, #9B59B6, #8E44AD);
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(155, 89, 182, 0.5);
      }

      .discovery-icon {
        font-size: 64px;
        margin-bottom: 15px;
        animation: iconBounce 0.6s ease;
      }

      @keyframes iconBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }

      .discovery-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .discovery-egg-name {
        font-size: 18px;
        margin-bottom: 8px;
      }

      .discovery-points {
        font-size: 20px;
        font-weight: bold;
        color: #F1C40F;
      }

      /* 成就通知 */
      .achievement-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10002;
        animation: achievementSlideIn 0.5s ease;
      }

      @keyframes achievementSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes achievementSlideOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      .achievement-content {
        background: linear-gradient(135deg, #F1C40F, #F39C12);
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(241, 196, 15, 0.4);
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .achievement-icon {
        font-size: 36px;
      }

      .achievement-text {
        flex: 1;
      }

      .achievement-title {
        font-size: 14px;
        opacity: 0.9;
      }

      .achievement-name {
        font-size: 18px;
        font-weight: bold;
      }

      /* 滚动条样式 */
      .egg-list-container::-webkit-scrollbar {
        width: 6px;
      }

      .egg-list-container::-webkit-scrollbar-track {
        background: #F8F9FA;
      }

      .egg-list-container::-webkit-scrollbar-thumb {
        background: #9B59B6;
        border-radius: 3px;
      }

      /* 响应式 */
      @media (max-width: 480px) {
        .zootopia-egg-hunter-panel {
          right: 10px;
          bottom: 70px;
        }

        .egg-hunter-content {
          width: calc(100vw - 40px);
          max-width: 360px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化
  function initEggHunter() {
    loadProgress();
    injectStyles();

    const panel = createEggHunterPanel();
    document.body.appendChild(panel);

    // 切换按钮
    document.getElementById('eggHunterToggle').onclick = togglePanel;

    // 标签页切换
    let currentMovie = 'movie1';
    document.querySelectorAll('.egg-tab').forEach(tab => {
      tab.onclick = () => {
        document.querySelectorAll('.egg-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMovie = tab.dataset.movie;
        renderEggList(currentMovie, getCurrentFilters());
      };
    });

    // 筛选器
    populateCategoryFilter();
    document.getElementById('categoryFilter').onchange = () => {
      renderEggList(currentMovie, getCurrentFilters());
    };
    document.getElementById('difficultyFilter').onchange = () => {
      renderEggList(currentMovie, getCurrentFilters());
    };

    // 初始化显示
    updateStats();
    renderEggList(currentMovie);
    renderAchievements();
  }

  // 导出全局函数
  window.zootopiaEggHunter = {
    show: () => {
      const panel = document.querySelector('.zootopia-egg-hunter-panel');
      if (panel && !panel.classList.contains('open')) {
        togglePanel();
      }
    },
    hide: () => {
      const panel = document.querySelector('.zootopia-egg-hunter-panel');
      if (panel && panel.classList.contains('open')) {
        togglePanel();
      }
    },
    reset: () => {
      localStorage.removeItem('zootopiaEggHunter');
      location.reload();
    }
  };

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEggHunter);
  } else {
    initEggHunter();
  }
})();
