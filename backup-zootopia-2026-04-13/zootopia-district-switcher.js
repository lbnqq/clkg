/**
 * 疯狂动物城主题 - 地区主题切换器
 * Zootopia Theme - District Theme Switcher
 * 允许用户切换不同地区的配色方案
 */

(function() {
  'use strict';

  // 动物城七大地区主题配置
  const districts = {
    sahara: {
      name: '撒哈拉广场',
      nameEn: 'Sahara Square',
      icon: '🏜️',
      emoji: '☀️',
      colors: {
        primary: '#FF9F43',
        secondary: '#FDCB6E',
        accent: '#EE5A24',
        background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE4C4 100%)',
        text: '#2D3436',
        card: 'rgba(255, 159, 67, 0.1)'
      },
      description: '阳光沙滩，沙漠绿洲',
      temperature: '35°C',
      attractions: ['日光浴沙滩', '骆驼俱乐部', '沙漠水疗']
    },
    tundratown: {
      name: '冰川镇',
      nameEn: 'Tundratown',
      icon: '❄️',
      emoji: '🐧',
      colors: {
        primary: '#0ABDE3',
        secondary: '#48DBFB',
        accent: '#2E86DE',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        text: '#2C3E50',
        card: 'rgba(10, 189, 227, 0.1)'
      },
      description: '冰雪世界，企鹅天堂',
      temperature: '-15°C',
      attractions: ['冰雪滑道', '企鹅冰雕展', '极光观测台']
    },
    rainforest: {
      name: '雨林区',
      nameEn: 'Rainforest District',
      icon: '🌴',
      emoji: '🦎',
      colors: {
        primary: '#10AC84',
        secondary: '#55E6C1',
        accent: '#00D2D3',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
        text: '#1E3A29',
        card: 'rgba(16, 172, 132, 0.1)'
      },
      description: '热带雨林，自然氧吧',
      temperature: '28°C',
      attractions: ['树冠步道', '雨林咖啡厅', '生物多样性馆']
    },
    downtown: {
      name: '市中心',
      nameEn: 'Downtown',
      icon: '🏙️',
      emoji: '🦁',
      colors: {
        primary: '#5F27CD',
        secondary: '#A29BFE',
        accent: '#341F97',
        background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
        text: '#2D3436',
        card: 'rgba(95, 39, 205, 0.1)'
      },
      description: '繁华都市，商业中心',
      temperature: '22°C',
      attractions: ['市政厅', 'ZPD总部', 'Gazelle剧院']
    },
    bunnyburrow: {
      name: '兔窝镇',
      nameEn: 'Bunnyburrow',
      icon: '🥕',
      emoji: '🐰',
      colors: {
        primary: '#26DE81',
        secondary: '#20BF6B',
        accent: '#0FB9B1',
        background: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)',
        text: '#1B5E20',
        card: 'rgba(38, 222, 129, 0.1)'
      },
      description: '田园风光，胡萝卜之乡',
      temperature: '20°C',
      attractions: ['胡萝卜农场', '霍普斯家', '集市广场']
    },
    littlerodentia: {
      name: '小啮齿镇',
      nameEn: 'Little Rodentia',
      icon: '🐭',
      emoji: '🧀',
      colors: {
        primary: '#EE5A24',
        secondary: '#FF9F43',
        accent: '#D63031',
        background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
        text: '#2D3436',
        card: 'rgba(238, 90, 36, 0.1)'
      },
      description: '迷你城市，温馨家园',
      temperature: '24°C',
      attractions: ['奶酪工厂', '迷你摩天轮', '鼠式建筑群']
    },
    meadowlands: {
      name: '草甸镇',
      nameEn: 'Meadowlands',
      icon: '🌾',
      emoji: '🦌',
      colors: {
        primary: '#2ED573',
        secondary: '#7BED9F',
        accent: '#1E90FF',
        background: 'linear-gradient(135deg, #F0FFF4 0%, #E0F2F1 100%)',
        text: '#2D3436',
        card: 'rgba(46, 213, 115, 0.1)'
      },
      description: '清新草原，自然风光',
      temperature: '23°C',
      attractions: ['草原牧场', '鹿角森林', '野花谷']
    }
  };

  // 当前选中的地区
  let currentDistrict = localStorage.getItem('zootopiaDistrict') || 'sahara';

  // 创建地区切换器UI
  function createDistrictSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'zootopia-district-switcher';
    switcher.innerHTML = `
      <button class="district-toggle-btn" title="切换地区主题">
        <span class="toggle-icon">${districts[currentDistrict].icon}</span>
        <span class="toggle-text">${districts[currentDistrict].name}</span>
      </button>
      <div class="district-panel">
        <div class="district-panel-header">
          <h3>🌆 选择地区主题</h3>
          <p>每个地区都有独特的色彩和氛围</p>
        </div>
        <div class="district-list">
          ${Object.entries(districts).map(([key, district]) => `
            <div class="district-item ${key === currentDistrict ? 'active' : ''}" data-district="${key}">
              <div class="district-icon">${district.icon}</div>
              <div class="district-info">
                <div class="district-name">${district.name}</div>
                <div class="district-name-en">${district.nameEn}</div>
                <div class="district-desc">${district.description}</div>
                <div class="district-stats">
                  <span class="stat-item">
                    <span class="stat-icon">🌡️</span>
                    <span class="stat-value">${district.temperature}</span>
                  </span>
                  <span class="stat-item">
                    <span class="stat-icon">🎯</span>
                    <span class="stat-value">${district.attractions.length} 景点</span>
                  </span>
                </div>
              </div>
              <div class="district-preview" style="background: ${district.background}"></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    return switcher;
  }

  // 应用地区主题
  function applyDistrictTheme(districtKey) {
    const district = districts[districtKey];
    if (!district) return;

    const root = document.documentElement;

    // 设置CSS变量
    root.style.setProperty('--zootopia-primary', district.colors.primary);
    root.style.setProperty('--zootopia-secondary', district.colors.secondary);
    root.style.setProperty('--zootopia-accent', district.colors.accent);
    root.style.setProperty('--zootopia-bg', district.colors.background);
    root.style.setProperty('--zootopia-text', district.colors.text);
    root.style.setProperty('--zootopia-card', district.colors.card);

    // 更新页面背景
    document.body.style.background = district.colors.background;
    document.body.style.transition = 'background 0.5s ease';

    // 更新按钮显示
    const toggleBtn = document.querySelector('.district-toggle-btn');
    if (toggleBtn) {
      toggleBtn.querySelector('.toggle-icon').textContent = district.icon;
      toggleBtn.querySelector('.toggle-text').textContent = district.name;
    }

    // 更新活动状态
    document.querySelectorAll('.district-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.district === districtKey) {
        item.classList.add('active');
      }
    });

    // 显示地区欢迎消息
    showDistrictWelcome(district);

    // 保存到本地存储
    localStorage.setItem('zootopiaDistrict', districtKey);
    currentDistrict = districtKey;
  }

  // 显示地区欢迎消息
  function showDistrictWelcome(district) {
    const messages = {
      sahara: [
        `欢迎来到${district.name}！☀️ 准备好享受阳光了吗？`,
        `${district.name}的阳光正好！🏖️`,
        `噢！${district.name}的沙子真暖和！🐪`
      ],
      tundratown: [
        `欢迎来到${district.name}！❄️ 穿上外套！`,
        `${district.name}的冰雕很美！🐧`,
        `呼！${district.name}好冷！🥶`
      ],
      rainforest: [
        `欢迎来到${district.name}！🌴 呼吸新鲜空气！`,
        `${district.name}的树冠真壮观！🦎`,
        `雨林的气息！🌿`
      ],
      downtown: [
        `欢迎来到${district.name}！🏙️ 城市不夜城！`,
        `${district.name}真繁华！🦁`,
        `ZPD总部就在这！👮`
      ],
      bunnyburrow: [
        `欢迎来到${district.name}！🐰 这里的胡萝卜最棒！`,
        `${district.name}的田园风光！🥕`,
        `Judy的家乡！🏡`
      ],
      littlerodentia: [
        `欢迎来到${district.name}！🐭 小心脚下！`,
        `${district.name}的奶酪世界！🧀`,
        `迷你城市的魅力！⛲`
      ],
      meadowlands: [
        `欢迎来到${district.name}！🌾 草原的清香！`,
        `${district.name}的野花真美！🦌`,
        `自然与和谐！🌿`
      ]
    };

    const randomMessage = messages[districtKey][Math.floor(Math.random() * 3)];
    showToast(district.icon, randomMessage);
  }

  // 显示提示框
  function showToast(icon, text) {
    const oldToast = document.querySelector('.zootopia-district-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'zootopia-district-toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${text}</span>
      <button class="toast-close">×</button>
    `;

    document.body.appendChild(toast);

    // 关闭按钮
    toast.querySelector('.toast-close').onclick = () => toast.remove();

    // 自动消失
    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.5s ease forwards';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // 注入样式
  function injectStyles() {
    if (document.querySelector('#district-switcher-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'district-switcher-styles';
    styles.textContent = `
      /* 地区切换器按钮 */
      .zootopia-district-switcher {
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 9995;
      }

      .district-toggle-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        background: linear-gradient(135deg, var(--zootopia-primary, #FF9F43), var(--zootopia-secondary, #FDCB6E));
        border: none;
        border-radius: 25px;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }

      .district-toggle-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      }

      .toggle-icon {
        font-size: 24px;
      }

      /* 地区面板 */
      .district-panel {
        position: absolute;
        bottom: 70px;
        left: 0;
        width: 380px;
        max-height: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        display: none;
        animation: panelSlideUp 0.3s ease;
      }

      .district-panel.show {
        display: block;
      }

      @keyframes panelSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .district-panel-header {
        background: linear-gradient(135deg, var(--zootopia-primary, #FF9F43), var(--zootopia-secondary, #FDCB6E));
        color: white;
        padding: 20px;
        text-align: center;
      }

      .district-panel-header h3 {
        margin: 0 0 5px 0;
        font-size: 18px;
      }

      .district-panel-header p {
        margin: 0;
        font-size: 12px;
        opacity: 0.9;
      }

      /* 地区列表 */
      .district-list {
        max-height: 450px;
        overflow-y: auto;
        padding: 10px;
      }

      .district-list::-webkit-scrollbar {
        width: 6px;
      }

      .district-list::-webkit-scrollbar-thumb {
        background: var(--zootopia-primary, #FF9F43);
        border-radius: 3px;
      }

      .district-item {
        display: flex;
        gap: 15px;
        padding: 15px;
        margin: 10px 0;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }

      .district-item:hover {
        background: var(--zootopia-card, rgba(255, 159, 67, 0.1));
        transform: translateX(5px);
      }

      .district-item.active {
        border-color: var(--zootopia-primary, #FF9F43);
        background: var(--zootopia-card, rgba(255, 159, 67, 0.1));
      }

      .district-icon {
        font-size: 40px;
        flex-shrink: 0;
      }

      .district-info {
        flex: 1;
      }

      .district-name {
        font-size: 16px;
        font-weight: bold;
        color: #2D3436;
        margin-bottom: 2px;
      }

      .district-name-en {
        font-size: 12px;
        color: #636E72;
        margin-bottom: 5px;
      }

      .district-desc {
        font-size: 13px;
        color: #636E72;
        margin-bottom: 8px;
      }

      .district-stats {
        display: flex;
        gap: 15px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        color: #636E72;
      }

      .stat-icon {
        font-size: 14px;
      }

      .stat-value {
        font-weight: 600;
      }

      .district-preview {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        flex-shrink: 0;
        border: 2px solid rgba(0, 0, 0, 0.1);
      }

      /* 提示框 */
      .zootopia-district-toast {
        position: fixed;
        top: 100px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px 25px;
        background: linear-gradient(135deg, var(--zootopia-primary, #FF9F43), var(--zootopia-accent, #EE5A24));
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: toastSlideIn 0.5s ease;
      }

      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toastFadeOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      .toast-icon {
        font-size: 24px;
      }

      .toast-message {
        font-size: 14px;
        font-weight: 500;
      }

      .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .toast-close:hover {
        opacity: 1;
      }

      /* 响应式 */
      @media (max-width: 768px) {
        .district-panel {
          width: calc(100vw - 80px);
          max-width: 350px;
        }

        .zootopia-district-switcher {
          bottom: 20px;
          left: 20px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  // 初始化地区切换器
  function initDistrictSwitcher() {
    injectStyles();

    // 添加切换器
    const switcher = createDistrictSwitcher();
    document.body.appendChild(switcher);

    // 切换面板显示
    const toggleBtn = switcher.querySelector('.district-toggle-btn');
    const panel = switcher.querySelector('.district-panel');

    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      panel.classList.toggle('show');
    };

    // 点击外部关闭面板
    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) {
        panel.classList.remove('show');
      }
    });

    // 地区选择事件
    switcher.querySelectorAll('.district-item').forEach(item => {
      item.onclick = () => {
        const districtKey = item.dataset.district;
        applyDistrictTheme(districtKey);
        setTimeout(() => {
          panel.classList.remove('show');
        }, 500);
      };
    });

    // 应用初始主题
    applyDistrictTheme(currentDistrict);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDistrictSwitcher);
  } else {
    initDistrictSwitcher();
  }

  // 导出切换函数供全局使用
  window.zootopiaSwitchDistrict = applyDistrictTheme;
})();
