/**
 * 疯狂动物城 - 季节性主题系统
 * Version: 1.0.0
 *
 * 根据季节自动切换主题装饰，为网站增添疯狂动物城的季节氛围
 *
 * 功能:
 * - 自动检测季节
 * - 动态装饰效果
 * - 节日特别模式
 * - 性能优化（轻量级）
 */

(function($) {
    'use strict';

    // ========================================
    // 季节配置
    // ========================================

    const SEASONS = {
        spring: {
            name: '春季',
            months: [3, 4, 5],
            theme: {
                primary: '#FF9F43',   // 阳光金橙
                accent: '#FF6B6B',    // 樱花粉
                decoration: '🌸',      // 樱花
                effect: 'falling-petals'
            },
            messages: [
                '春天来了！🌸 撒哈拉广场的花开了！',
                'Try Everything - 春天版！🐰',
                '万物复苏，动物城充满活力！✨'
            ]
        },
        summer: {
            name: '夏季',
            months: [6, 7, 8],
            theme: {
                primary: '#FF9F43',   // 阳光金橙
                accent: '#54A0FF',    // 天空蓝
                decoration: '☀️',      // 太阳
                effect: 'sunshine'
            },
            messages: [
                '夏天到了！☀️ 雨林区的虫鸣音乐节！',
                'Try Everything - 夏天版！🦊',
                '热带风情，动物城狂欢一夏！🌴'
            ]
        },
        autumn: {
            name: '秋季',
            months: [9, 10, 11],
            theme: {
                primary: '#EE5A24',   // 秋叶橙
                accent: '#FFA502',    // 金黄色
                decoration: '🍂',      // 落叶
                effect: 'falling-leaves'
            },
            messages: [
                '秋天来了！🍂 镇康镇的第一场雪！',
                'Try Everything - 秋天版！🦊',
                '金秋时节，收获的季节！🌾'
            ]
        },
        winter: {
            name: '冬季',
            months: [12, 1, 2],
            theme: {
                primary: '#0ABDE3',   // 冰蓝色
                accent: '#FFFFFF',    // 雪白色
                decoration: '❄️',      // 雪花
                effect: 'falling-snow'
            },
            messages: [
                '冬天来了！❄️ 镇康镇的滑雪季！',
                'Try Everything - 冬天版！🐰',
                '冰雪奇缘，动物城童话世界！⛄'
            ]
        }
    };

    // ========================================
    // 节日特别模式
    // ========================================

    const SPECIAL_EVENTS = {
        '01-01': { name: '新年', icon: '🎊', theme: 'spring' },
        '02-14': { name: '情人节', icon: '💝', theme: 'spring' },
        '04-01': { name: '愚人节', icon: '🎭', theme: 'spring' },
        '04-15': { name: '疯狂动物城日', icon: '🐰🦊', theme: 'spring', isMajor: true },
        '05-01': { name: '劳动节', icon: '💪', theme: 'spring' },
        '06-01': { name: '儿童节', icon: '🎈', theme: 'summer' },
        '07-04': { name: '美国独立日', icon: '🇺🇸', theme: 'summer' },
        '10-31': { name: '万圣节', icon: '🎃', theme: 'autumn' },
        '12-25': { name: '圣诞节', icon: '🎄', theme: 'winter' }
    };

    // ========================================
    // 核心功能
    // ========================================

    let currentSeason = null;
    let currentEvent = null;
    let animationFrame = null;
    let particles = [];

    /**
     * 获取当前季节
     */
    function getCurrentSeason() {
        const month = new Date().getMonth() + 1;

        for (const [key, season] of Object.entries(SEASONS)) {
            if (season.months.includes(month)) {
                return key;
            }
        }
        return 'spring'; // 默认春季
    }

    /**
     * 获取当前节日
     */
    function getCurrentEvent() {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateKey = `${month}-${day}`;

        return SPECIAL_EVENTS[dateKey] || null;
    }

    /**
     * 应用季节主题
     */
    function applySeasonTheme(seasonKey) {
        const season = SEASONS[seasonKey];
        if (!season) return;

        // 更新CSS变量
        document.documentElement.style.setProperty('--zt-season-primary', season.theme.primary);
        document.documentElement.style.setProperty('--zt-season-accent', season.theme.accent);

        // 添加装饰元素
        addSeasonalDecoration(season);

        // 显示季节消息
        showSeasonalMessage(season);

        currentSeason = seasonKey;
    }

    /**
     * 添加季节装饰
     */
    function addSeasonalDecoration(season) {
        // 移除旧装饰
        removeSeasonalDecoration();

        // 创建装饰容器
        const container = document.createElement('div');
        container.className = 'zt-seasonal-decoration';
        container.id = 'zt-seasonal-decoration';

        // 添加季节图标
        const icon = document.createElement('div');
        icon.className = 'zt-season-icon';
        icon.innerHTML = season.theme.decoration;
        container.appendChild(icon);

        // 添加效果容器
        const effects = document.createElement('div');
        effects.className = 'zt-seasonal-effects';
        effects.id = 'zt-seasonal-effects';
        container.appendChild(effects);

        document.body.appendChild(container);

        // 启动效果
        startSeasonalEffect(season.theme.effect);
    }

    /**
     * 移除季节装饰
     */
    function removeSeasonalDecoration() {
        const old = document.getElementById('zt-seasonal-decoration');
        if (old) {
            old.remove();
        }

        // 停止动画
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        particles = [];
    }

    /**
     * 启动季节效果
     */
    function startSeasonalEffect(effectType) {
        const effectsContainer = document.getElementById('zt-seasonal-effects');
        if (!effectsContainer) return;

        // 根据效果类型创建不同的动画
        switch (effectType) {
            case 'falling-petals':
            case 'falling-leaves':
            case 'falling-snow':
                startFallingEffect(effectType, effectsContainer);
                break;
            case 'sunshine':
                startSunshineEffect(effectsContainer);
                break;
        }
    }

    /**
     * 飘落效果（樱花、雪花、落叶）
     */
    function startFallingEffect(type, container) {
        const emojis = {
            'falling-petals': ['🌸', '🌺', '💮'],
            'falling-leaves': ['🍂', '🍁', '🍃'],
            'falling-snow': ['❄️', '❅', '❆']
        };

        const items = emojis[type] || ['❄️'];

        // 创建飘落元素
        function createParticle() {
            if (particles.length >= 15) return; // 限制数量

            const particle = document.createElement('div');
            particle.className = 'zt-seasonal-particle';
            particle.textContent = items[Math.floor(Math.random() * items.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.fontSize = (Math.random() * 10 + 14) + 'px';
            particle.style.opacity = Math.random() * 0.5 + 0.5;

            container.appendChild(particle);
            particles.push(particle);

            // 动画结束后移除
            setTimeout(() => {
                particle.remove();
                particles = particles.filter(p => p !== particle);
            }, 7000);
        }

        // 定期创建新粒子
        const interval = setInterval(() => {
            if (document.getElementById('zt-seasonal-effects')) {
                createParticle();
            } else {
                clearInterval(interval);
            }
        }, 800);

        // 保存间隔以便清理
        container.dataset.interval = interval;
    }

    /**
     * 阳光效果
     */
    function startSunshineEffect(container) {
        const sun = document.createElement('div');
        sun.className = 'zt-sunshine';
        sun.innerHTML = '☀️';
        container.appendChild(sun);

        // 添加光晕
        const glow = document.createElement('div');
        glow.className = 'zt-sun-glow';
        container.appendChild(glow);
    }

    /**
     * 显示季节消息
     */
    function showSeasonalMessage(season) {
        // 随机选择一条消息
        const message = season.messages[Math.floor(Math.random() * season.messages.length)];

        // 3秒后显示
        setTimeout(() => {
            if (window.ztNotify) {
                window.ztNotify(message, 'info', {
                    duration: 4000,
                    icon: season.theme.decoration
                });
            }
        }, 3000);
    }

    /**
     * 应用节日主题
     */
    function applyEventTheme(event) {
        if (!event) return;

        // 创建节日横幅
        const banner = document.createElement('div');
        banner.className = 'zt-event-banner';
        banner.id = 'zt-event-banner';

        const isMajor = event.isMajor;
        banner.innerHTML = `
            <div class="zt-event-content">
                <span class="zt-event-icon">${event.icon}</span>
                <span class="zt-event-name">${event.name}</span>
                ${isMajor ? '<span class="zt-event-badge">特别庆祝</span>' : ''}
                <button class="zt-event-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(banner);

        // 10秒后自动消失
        setTimeout(() => {
            const banner = document.getElementById('zt-event-banner');
            if (banner) banner.remove();
        }, 10000);

        currentEvent = event;
    }

    /**
     * 初始化季节系统
     */
    function initSeasonalSystem() {
        // 获取当前季节和节日
        const season = getCurrentSeason();
        const event = getCurrentEvent();

        // 应用节日主题（优先）
        if (event) {
            applyEventTheme(event);
        }

        // 应用季节主题
        applySeasonTheme(season);

        // 监听配置变更
        if (window.ztAddConfigChangeListener) {
            window.ztAddConfigChangeListener('season', (newSeason) => {
                applySeasonTheme(newSeason);
            });
        }
    }

    // ========================================
    // 公共API
    // ========================================

    window.ZtSeasonal = {
        /**
         * 获取当前季节
         */
        getCurrentSeason: () => currentSeason,

        /**
         * 获取所有季节配置
         */
        getSeasons: () => SEASONS,

        /**
         * 手动切换季节
         */
        setSeason: (seasonKey) => {
            if (SEASONS[seasonKey]) {
                applySeasonTheme(seasonKey);
            }
        },

        /**
         * 获取节日信息
         */
        getCurrentEvent: () => currentEvent,

        /**
         * 显示节日横幅
         */
        showEventBanner: (eventData) => {
            applyEventTheme(eventData);
        },

        /**
         * 刷新季节系统
         */
        refresh: () => {
            removeSeasonalDecoration();
            initSeasonalSystem();
        }
    };

    // ========================================
    // 自动初始化
    // ========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSeasonalSystem);
    } else {
        initSeasonalSystem();
    }

    // 暴露到全局
    window.ztGetSeason = () => window.ZtSeasonal.getCurrentSeason();
    window.ztSetSeason = (season) => window.ZtSeasonal.setSeason(season);

    console.log('🌸 疯狂动物城季节性主题系统已启动 - 当前季节:', currentSeason);

})(jQuery);
