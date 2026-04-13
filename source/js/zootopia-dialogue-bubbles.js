/**
 * 疯狂动物城 - 角色对话气泡系统
 * Version: 1.0.0
 *
 * 轻量级对话系统
 */

(function() {
    'use strict';

    // ========================================
    // 角色对话配置
    // ========================================

    const CHARACTERS = {
        judy: {
            name: '朱迪',
            emoji: '🐰',
            color: '#EE5A24',
            dialogues: [
                'Try Everything! 尝试一切！',
                '绝不放弃！💪',
                '我知道你能行！',
                '每一天都是新的开始！',
                '让世界变得更美好！',
                '兔子也能当警官！',
                '相信你的直觉！',
                '加油，不要放弃！'
            ]
        },
        nick: {
            name: '尼克',
            emoji: '🦊',
            color: '#A0522D',
            dialogues: [
                '你知道你爱我了~',
                '淡定，淡定...',
                '聪明如我，不用想也知道',
                '生活嘛，就是要有Style',
                '这事儿包在我身上',
                '相信我，我是专业的',
                '别担心，有我在',
                '慢慢来，急什么'
            ]
        },
        flash: {
            name: '闪电',
            emoji: '🦥',
            color: '#2E86C1',
            dialogues: [
                '你...好...啊...',
                '我...马...上...好...',
                '请...稍...等...',
                '不...要...着...急...',
                '我...在...努...力...',
                '慢...活...出...细...致...',
                '快...乐...需...要...等...待...'
            ],
            speed: 'slow'
        },
        chief_bogo: {
            name: '旁克局长',
            emoji: '🦁',
            color: '#1F618D',
            dialogues: [
                '生命不会给你想要的，它只给你应得的',
                '这就是你要的？那就去争取',
                '别让我失望',
                '这就是我的期待',
                '行动胜于雄辩',
                '专注你的职责'
            ]
        },
        clawhauser: {
            name: '克拉豪斯',
            emoji: '🐆',
            color: '#9B59B6',
            dialogues: [
                '噢！那是夏奇拉！🎵',
                'Have you tried smiling today?',
                '今天也要保持好心情哦~',
                '你知道吗？微笑会传染的',
                '来听听夏奇拉的新歌吧！',
                '音乐让世界更美好~'
            ]
        },
        bellwether: {
            name: '绵羊副市长',
            emoji: '🐑',
            color: '#95A5A6',
            dialogues: [
                '小羊也有狼的野心',
                '每个人都有自己的价值',
                '不要被外表欺骗',
                '团结就是力量',
                '相信自己的能力'
            ]
        }
    };

    // ========================================
    // 对话触发器
    // ========================================

    const TRIGGERS = {
        // 页面加载问候
        onPageLoad: {
            enabled: true,
            characters: ['judy', 'nick'],
            delay: 2000
        },

        // 阅读进度
        onReadingProgress: [
            { progress: 25, character: 'judy', dialogue: 0 },
            { progress: 50, character: 'nick', dialogue: 1 },
            { progress: 75, character: 'clawhauser', dialogue: 2 },
            { progress: 100, character: 'judy', dialogue: 3 }
        ],

        // 页面停留时间
        onTimeSpent: [
            { time: 30, character: 'nick', dialogue: 2 },      // 30秒
            { time: 60, character: 'judy', dialogue: 4 },      // 1分钟
            { time: 120, character: 'clawhauser', dialogue: 5 } // 2分钟
        ],

        // 滚动事件
        onScroll: {
            enabled: true,
            cooldown: 30000, // 30秒冷却
            characters: ['flash', 'chief_bogo', 'bellwether']
        },

        // 页面离开
        onPageLeave: {
            enabled: true,
            character: 'judy',
            dialogue: 7
        }
    };

    // ========================================
    // 状态管理
    // ========================================

    const State = {
        triggered: new Set(),
        scrollCooldown: false,
        readingMilestones: new Set(),
        timeMilestones: new Set()
    };

    // ========================================
    // UI管理器
    // ========================================

    const UIManager = {
        // 创建对话气泡
        createBubble(character, dialogue, options = {}) {
            const config = CHARACTERS[character];
            if (!config) return null;

            const bubble = document.createElement('div');
            bubble.className = `zt-dialogue-bubble ${options.position || 'bottom-right'}`;

            const isSlow = config.speed === 'slow';
            const delay = isSlow ? 100 : 0;

            bubble.innerHTML = `
                <div class="zt-bubble-character" style="background: ${config.color}">
                    <span class="zt-bubble-emoji">${config.emoji}</span>
                    <span class="zt-bubble-name">${config.name}</span>
                </div>
                <div class="zt-bubble-message">${dialogue}</div>
                <button class="zt-bubble-close" aria-label="关闭">×</button>
            `;

            document.body.appendChild(bubble);

            // 关闭按钮
            const closeBtn = bubble.querySelector('.zt-bubble-close');
            closeBtn.addEventListener('click', () => this.removeBubble(bubble));

            // 自动关闭
            const autoClose = options.autoClose !== false;
            if (autoClose) {
                const duration = isSlow ? 8000 : 5000;
                setTimeout(() => this.removeBubble(bubble), duration);
            }

            // 动画
            requestAnimationFrame(() => {
                bubble.classList.add('zt-show');
            });

            return bubble;
        },

        // 移除气泡
        removeBubble(bubble) {
            if (!bubble || !bubble.parentNode) return;
            bubble.classList.remove('zt-show');
            bubble.classList.add('zt-hide');
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 300);
        },

        // 清除所有气泡
        clearAllBubbles() {
            const bubbles = document.querySelectorAll('.zt-dialogue-bubble');
            bubbles.forEach(bubble => this.removeBubble(bubble));
        },

        // 显示随机对话
        showRandomDialogue(character, options = {}) {
            const config = CHARACTERS[character];
            if (!config) return;

            const dialogues = config.dialogues;
            const randomIndex = Math.floor(Math.random() * dialogues.length);
            const dialogue = dialogues[randomIndex];

            return this.createBubble(character, dialogue, options);
        }
    };

    // ========================================
    // 触发器管理器
    // ========================================

    const TriggerManager = {
        // 页面加载触发
        onPageLoad() {
            if (!TRIGGERS.onPageLoad.enabled) return;

            setTimeout(() => {
                const characters = TRIGGERS.onPageLoad.characters;
                const character = characters[Math.floor(Math.random() * characters.length)];
                UIManager.showRandomDialogue(character, {
                    position: 'bottom-right'
                });
            }, TRIGGERS.onPageLoad.delay);
        },

        // 滚动触发
        onScroll() {
            if (!TRIGGERS.onScroll.enabled) return;
            if (State.scrollCooldown) return;

            State.scrollCooldown = true;
            setTimeout(() => {
                State.scrollCooldown = false;
            }, TRIGGERS.onScroll.cooldown);

            const characters = TRIGGERS.onScroll.characters;
            const character = characters[Math.floor(Math.random() * characters.length)];
            UIManager.showRandomDialogue(character, {
                position: 'top-right'
            });
        },

        // 阅读进度触发
        onReadingProgress(progress) {
            TRIGGERS.onReadingProgress.forEach(milestone => {
                if (progress >= milestone.progress && !State.readingMilestones.has(milestone.progress)) {
                    State.readingMilestones.add(milestone.progress);
                    const config = CHARACTERS[milestone.character];
                    if (config && config.dialogues[milestone.dialogue]) {
                        UIManager.createBubble(
                            milestone.character,
                            config.dialogues[milestone.dialogue],
                            { position: 'bottom-left' }
                        );
                    }
                }
            });
        },

        // 停留时间触发
        onTimeSpent(seconds) {
            TRIGGERS.onTimeSpent.forEach(milestone => {
                if (seconds >= milestone.time && !State.timeMilestones.has(milestone.time)) {
                    State.timeMilestones.add(milestone.time);
                    const config = CHARACTERS[milestone.character];
                    if (config && config.dialogues[milestone.dialogue]) {
                        UIManager.createBubble(
                            milestone.character,
                            config.dialogues[milestone.dialogue],
                            { position: 'top-left' }
                        );
                    }
                }
            });
        },

        // 页面离开触发
        onPageLeave() {
            if (!TRIGGERS.onPageLeave.enabled) return;
            const config = CHARACTERS[TRIGGERS.onPageLeave.character];
            if (config && config.dialogues[TRIGGERS.onPageLeave.dialogue]) {
                UIManager.createBubble(
                    TRIGGERS.onPageLeave.character,
                    config.dialogues[TRIGGERS.onPageLeave.dialogue],
                    {
                        position: 'center',
                        autoClose: false
                    }
                );
            }
        }
    };

    // ========================================
    // 阅读进度追踪
    // ========================================

    const ReadingTracker = {
        startTime: Date.now(),
        timerInterval: null,

        init() {
            // 追踪停留时间
            this.timerInterval = setInterval(() => {
                const seconds = Math.floor((Date.now() - this.startTime) / 1000);
                TriggerManager.onTimeSpent(seconds);
            }, 1000);

            // 追踪阅读进度
            window.addEventListener('scroll', this.throttle(() => {
                const progress = this.getScrollProgress();
                TriggerManager.onReadingProgress(progress);

                // 滚动触发对话
                if (Math.random() < 0.05) { // 5%概率
                    TriggerManager.onScroll();
                }
            }, 500));

            // 页面离开
            document.addEventListener('mouseout', (e) => {
                if (e.clientY <= 0) {
                    TriggerManager.onPageLeave();
                }
            });
        },

        getScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            return Math.round((scrollTop / scrollHeight) * 100);
        },

        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // ========================================
    // 全局API
    // ========================================

    // 显示角色对话
    window.ztShowDialogue = function(character, dialogue, options = {}) {
        if (typeof dialogue === 'string') {
            return UIManager.createBubble(character, dialogue, options);
        } else {
            return UIManager.showRandomDialogue(character, options);
        }
    };

    // 显示随机对话
    window.ztShowRandomDialogue = function(character, options = {}) {
        return UIManager.showRandomDialogue(character, options);
    };

    // 清除所有对话
    window.ztClearDialogues = function() {
        UIManager.clearAllBubbles();
    };

    // 获取角色列表
    window.ztGetCharacters = function() {
        return Object.keys(CHARACTERS);
    };

    // 获取角色对话
    window.ztGetCharacterDialogues = function(character) {
        return CHARACTERS[character]?.dialogues || [];
    };

    // 高级API
    window.ZTDialogue = {
        // 显示对话
        show: (character, dialogue, options) => ztShowDialogue(character, dialogue, options),

        // 显示随机对话
        showRandom: (character, options) => ztShowRandomDialogue(character, options),

        // 清除所有
        clear: () => ztClearDialogues(),

        // 获取角色
        getCharacters: () => Object.keys(CHARACTERS),

        // 获取对话
        getDialogues: (character) => CHARACTERS[character]?.dialogues || [],

        // 获取配置
        getConfig: () => ({ CHARACTERS, TRIGGERS })
    };

    // ========================================
    // 初始化
    // ========================================

    function init() {
        // 页面加载对话
        TriggerManager.onPageLoad();

        // 启动阅读追踪
        ReadingTracker.init();

        // 控制台欢迎信息
        console.log('%c💬 疯狂动物城 - 角色对话系统', 'color: #EE5A24; font-size: 16px; font-weight: bold');
        console.log('使用 ztShowDialogue(character, dialogue) 显示对话');
        console.log('使用 ztShowRandomDialogue(character) 显示随机对话');
        console.log('可用角色:', Object.keys(CHARACTERS).join(', '));
    }

    // DOM加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
