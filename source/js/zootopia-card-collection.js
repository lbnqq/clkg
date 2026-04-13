/**
 * 疯狂动物城 - 角色卡牌收集系统
 * Version: 1.0.0
 *
 * 轻量级卡牌收集系统
 */

(function() {
    'use strict';

    // ========================================
    // 卡牌数据
    // ========================================

    const CARDS = {
        // 主角卡牌（传奇）
        judy: {
            id: 'judy',
            name: '朱迪·霍普斯',
            englishName: 'Judy Hopps',
            emoji: '🐰',
            rarity: 'legendary',
            role: 'ZPD警官',
            district: '兔子洞',
            stats: {
                speed: 95,
                courage: 100,
                kindness: 90,
                intelligence: 85
            },
            quote: 'Try Everything! 尝试一切！',
            description: '来自兔子洞的第一位兔子警官，用勇气和智慧打破了物种偏见。',
            unlockCondition: '访问网站3天'
        },
        nick: {
            id: 'nick',
            name: '尼克·王尔德',
            englishName: 'Nick Wilde',
            emoji: '🦊',
            rarity: 'legendary',
            role: 'ZPD辅警',
            district: '无固定',
            stats: {
                speed: 85,
                courage: 80,
                kindness: 75,
                intelligence: 95
            },
            quote: '你知道你爱我了。',
            description: '聪明的狐狸骗子，在朱迪的影响下成为了一名优秀的ZPD辅警。',
            unlockCondition: '评论5次'
        },
        flash: {
            id: 'flash',
            name: '闪电',
            englishName: 'Flash',
            emoji: '🦥',
            rarity: 'epic',
            role: 'DMV职员',
            district: '市政厅',
            stats: {
                speed: 10,
                courage: 70,
                kindness: 95,
                intelligence: 75
            },
            quote: '你...好...啊...',
            description: '世界上最慢的树懒，但工作非常认真负责。',
            unlockCondition: '阅读10篇文章'
        },

        // 史诗卡牌
        chief_bogo: {
            id: 'chief_bogo',
            name: '旁克·局长',
            englishName: 'Chief Bogo',
            emoji: '🦁',
            rarity: 'epic',
            role: 'ZPD局长',
            district: '冰川镇',
            stats: {
                speed: 70,
                courage: 90,
                kindness: 60,
                intelligence: 85
            },
            quote: '生命不会给你想要的，它只给你应得的。',
            description: '严厉但公正的ZPD局长，水牛，曾经对朱迪充满怀疑。',
            unlockCondition: '访问网站7天'
        },
        bellwether: {
            id: 'bellwether',
            name: '绵羊副市长',
            englishName: 'Dawn Bellwether',
            emoji: '🐑',
            rarity: 'epic',
            role: '副市长',
            district: '市政厅',
            stats: {
                speed: 60,
                courage: 50,
                kindness: 40,
                intelligence: 90
            },
            quote: '小羊也有狼的野心。',
            description: '看似温和的副市长，暗中策划了夜嚎者危机。',
            unlockCondition: '收集5张卡牌'
        },
        finnick: {
            id: 'finnick',
            name: '芬尼克',
            englishName: 'Finnick',
            emoji: '🦈',
            rarity: 'epic',
            role: '骗子搭档',
            district: '沙漠区',
            stats: {
                speed: 75,
                courage: 85,
                kindness: 50,
                intelligence: 80
            },
            quote: '你欠我的！',
            description: '尼克的搭档，穿着大象婴儿服的小骗子。',
            unlockCondition: '分享3篇文章'
        },

        // 稀有卡牌
        clawhauser: {
            id: 'clawhauser',
            name: '克拉豪斯',
            englishName: 'Benjamin Clawhauser',
            emoji: '🐆',
            rarity: 'rare',
            role: 'ZPD前台',
            district: '市中区',
            stats: {
                speed: 65,
                courage: 60,
                kindness: 95,
                intelligence: 70
            },
            quote: '噢！那是夏奇拉！',
            description: '热爱夏奇拉的ZPD前台，水豹，非常友善。',
            unlockCondition: '签到3次'
        },
        yak: {
            id: 'yak',
            name: '牦牛老板',
            englishName: 'Yax',
            emoji: '🦬',
            rarity: 'rare',
            role: '俱乐部老板',
            district: '草地中心',
            stats: {
                speed: 50,
                courage: 70,
                kindness: 90,
                intelligence: 60
            },
            quote: '这就是自然法则，兄弟。',
            description: '裸体主义者俱乐部的老板，牦牛，非常放松。',
            unlockCondition: '收藏5篇文章'
        },
        manchas: {
            id: 'manchas',
            name: '曼查斯',
            englishName: 'Manchas',
            emoji: '🐆',
            rarity: 'rare',
            role: '司机',
            district: '雨林区',
            stats: {
                speed: 80,
                courage: 60,
                kindness: 85,
                intelligence: 75
            },
            quote: '我在晚上不是我自己...',
            description: '曾经温和的美洲豹司机，被夜嚎者植物袭击后野性大发。',
            unlockCondition: '访问雨林区专题'
        },

        // 普通卡牌
        gazelle: {
            id: 'gazelle',
            name: '夏奇拉',
            englishName: 'Gazelle',
            emoji: '🦌',
            rarity: 'common',
            role: '流行歌手',
            district: '撒哈拉广场',
            stats: {
                speed: 85,
                courage: 70,
                kindness: 85,
                intelligence: 65
            },
            quote: 'Try Everything!',
            description: '动物城最受欢迎的流行歌手，瞪羚。',
            unlockCondition: '初始卡牌'
        },
        mayor: {
            id: 'mayor',
            name: '狮子市长',
            englishName: 'Mayor Lionheart',
            emoji: '🦁',
            rarity: 'common',
            role: '市长',
            district: '市政厅',
            stats: {
                speed: 70,
                courage: 75,
                kindness: 55,
                intelligence: 80
            },
            quote: '为了动物城的利益！',
            description: '关心自身形象的狮子市长，狮子。',
            unlockCondition: '初始卡牌'
        },
        Duke: {
            id: 'duke',
            name: '威斯顿公爵',
            englishName: 'Duke Weaselton',
            emoji: '🦦',
            rarity: 'common',
            role: '小偷',
            district: '无固定',
            stats: {
                speed: 75,
                courage: 40,
                kindness: 30,
                intelligence: 60
            },
            quote: '我什么都没偷！',
            description: '经常偷窃的小贼，鼬，特别喜欢偷洋葱。',
            unlockCondition: '初始卡牌'
        }
    };

    // 稀有度配置
    const RARITY_CONFIG = {
        legendary: {
            name: '传奇',
            color: '#FFD700',
            gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            stars: 5,
            borderColor: '#FFD700'
        },
        epic: {
            name: '史诗',
            color: '#9B59B6',
            gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
            stars: 4,
            borderColor: '#9B59B6'
        },
        rare: {
            name: '稀有',
            color: '#3498DB',
            gradient: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
            stars: 3,
            borderColor: '#3498DB'
        },
        common: {
            name: '普通',
            color: '#95A5A6',
            gradient: 'linear-gradient(135deg, #95A5A6 0%, #7F8C8D 100%)',
            stars: 2,
            borderColor: '#95A5A6'
        }
    };

    // ========================================
    // 收藏管理器
    // ========================================

    const CardCollection = {
        storageKey: 'zt_card_collection',

        // 初始化收藏
        init() {
            if (!localStorage.getItem(this.storageKey)) {
                // 初始收藏：3张普通卡牌
                const initialCards = ['gazelle', 'mayor', 'duke'];
                const collection = {
                    cards: initialCards,
                    lastUpdate: Date.now(),
                    totalCards: Object.keys(CARDS).length,
                    unlocked: initialCards.length
                };
                this.save(collection);
            }
        },

        // 获取收藏
        getCollection() {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        },

        // 保存收藏
        save(collection) {
            localStorage.setItem(this.storageKey, JSON.stringify(collection));
        },

        // 检查是否拥有卡牌
        hasCard(cardId) {
            const collection = this.getCollection();
            return collection && collection.cards.includes(cardId);
        },

        // 添加卡牌
        addCard(cardId) {
            const collection = this.getCollection();
            if (!collection.cards.includes(cardId)) {
                collection.cards.push(cardId);
                collection.unlocked = collection.cards.length;
                collection.lastUpdate = Date.now();
                this.save(collection);
                return true;
            }
            return false;
        },

        // 获取收集进度
        getProgress() {
            const collection = this.getCollection();
            return {
                unlocked: collection.unlocked,
                total: collection.totalCards,
                percentage: Math.round((collection.unlocked / collection.totalCards) * 100)
            };
        },

        // 获取统计
        getStats() {
            const collection = this.getCollection();
            const stats = {
                legendary: 0,
                epic: 0,
                rare: 0,
                common: 0
            };

            collection.cards.forEach(cardId => {
                const card = CARDS[cardId];
                if (card) {
                    stats[card.rarity]++;
                }
            });

            return stats;
        }
    };

    // ========================================
    // UI管理器
    // ========================================

    const UIManager = {
        // 创建卡牌元素
        createCardElement(cardId, size = 'normal') {
            const card = CARDS[cardId];
            if (!card) return null;

            const rarity = RARITY_CONFIG[card.rarity];
            const owned = CardCollection.hasCard(cardId);

            const cardEl = document.createElement('div');
            cardEl.className = `zt-card zt-card-${size} ${owned ? 'zt-card-owned' : 'zt-card-locked'}`;
            cardEl.dataset.cardId = cardId;

            const starsHTML = '★'.repeat(rarity.stars) + '☆'.repeat(5 - rarity.stars);

            cardEl.innerHTML = `
                <div class="zt-card-inner" style="background: ${rarity.gradient}; border-color: ${rarity.borderColor}">
                    <div class="zt-card-header">
                        <span class="zt-card-rarity">${rarity.name}</span>
                        <span class="zt-card-stars">${starsHTML}</span>
                    </div>
                    <div class="zt-card-emoji">${card.emoji}</div>
                    <div class="zt-card-info">
                        <div class="zt-card-name">${card.name}</div>
                        <div class="zt-card-role">${card.role}</div>
                    </div>
                    ${!owned ? `<div class="zt-card-lock">🔒 ${card.unlockCondition}</div>` : ''}
                </div>
            `;

            cardEl.addEventListener('click', () => this.showCardDetail(cardId));

            return cardEl;
        },

        // 显示卡牌详情
        showCardDetail(cardId) {
            const card = CARDS[cardId];
            if (!card) return;

            const rarity = RARITY_CONFIG[card.rarity];
            const owned = CardCollection.hasCard(cardId);

            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'zt-card-modal';

            const statsBars = Object.entries(card.stats)
                .map(([key, value]) => {
                    const labels = {
                        speed: '速度',
                        courage: '勇气',
                        kindness: '友善',
                        intelligence: '智慧'
                    };
                    return `
                        <div class="zt-stat-row">
                            <span class="zt-stat-label">${labels[key]}</span>
                            <div class="zt-stat-bar">
                                <div class="zt-stat-fill" style="width: ${value}%"></div>
                            </div>
                            <span class="zt-stat-value">${value}</span>
                        </div>
                    `;
                }).join('');

            modal.innerHTML = `
                <div class="zt-card-modal-content">
                    <div class="zt-card-modal-header">
                        <h2>卡牌详情</h2>
                        <button class="zt-card-modal-close">&times;</button>
                    </div>
                    <div class="zt-card-modal-body">
                        <div class="zt-detail-card" style="background: ${rarity.gradient}; border-color: ${rarity.borderColor}">
                            <div class="zt-detail-emoji">${card.emoji}</div>
                            <div class="zt-detail-name">${card.name}</div>
                            <div class="zt-detail-english">${card.englishName}</div>
                            <div class="zt-detail-rarity">${rarity.name}</div>
                        </div>
                        <div class="zt-detail-info">
                            <div class="zt-detail-section">
                                <h3>基本信息</h3>
                                <p><strong>角色：</strong>${card.role}</p>
                                <p><strong>地区：</strong>${card.district}</p>
                                <p><strong>状态：</strong>${owned ? '<span class="zt-owned">已拥有</span>' : '<span class="zt-locked">未解锁</span>'}</p>
                            </div>
                            <div class="zt-detail-section">
                                <h3>属性值</h3>
                                ${statsBars}
                            </div>
                            <div class="zt-detail-section">
                                <h3>台词</h3>
                                <p class="zt-quote">"${card.quote}"</p>
                            </div>
                            <div class="zt-detail-section">
                                <h3>描述</h3>
                                <p>${card.description}</p>
                            </div>
                            ${!owned ? `<div class="zt-detail-section"><p class="zt-unlock-hint">解锁条件：${card.unlockCondition}</p></div>` : ''}
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 关闭事件
            modal.querySelector('.zt-card-modal-close').addEventListener('click', () => {
                modal.remove();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            // 动画
            requestAnimationFrame(() => {
                modal.classList.add('zt-show');
            });
        },

        // 显示卡牌收藏簿
        showCollection() {
            const modal = document.createElement('div');
            modal.className = 'zt-card-modal';

            const collection = CardCollection.getCollection();
            const progress = CardCollection.getProgress();
            const stats = CardCollection.getStats();

            // 按稀有度分组
            const cardsByRarity = {
                legendary: [],
                epic: [],
                rare: [],
                common: []
            };

            Object.keys(CARDS).forEach(cardId => {
                cardsByRarity[CARDS[cardId].rarity].push(cardId);
            });

            const cardsHTML = Object.entries(RARITY_CONFIG)
                .map(([rarity, config]) => {
                    const cardIds = cardsByRarity[rarity];
                    if (cardIds.length === 0) return '';

                    const cards = cardIds.map(id => this.createCardElement(id, 'small')).map(el => el.outerHTML).join('');

                    return `
                        <div class="zt-collection-section">
                            <h3 style="color: ${config.color}">${config.name}卡牌 (${stats[rarity]}/${cardIds.length})</h3>
                            <div class="zt-card-grid">
                                ${cards}
                            </div>
                        </div>
                    `;
                }).join('');

            const statsHTML = Object.entries(RARITY_CONFIG)
                .map(([rarity, config]) => `
                    <div class="zt-stat-badge" style="background: ${config.gradient}">
                        <span class="zt-stat-name">${config.name}</span>
                        <span class="zt-stat-count">${stats[rarity]}</span>
                    </div>
                `).join('');

            modal.innerHTML = `
                <div class="zt-card-modal-content zt-collection-modal">
                    <div class="zt-card-modal-header">
                        <h2>🃏 我的卡牌收藏</h2>
                        <button class="zt-card-modal-close">&times;</button>
                    </div>
                    <div class="zt-card-modal-body">
                        <div class="zt-collection-summary">
                            <div class="zt-progress-section">
                                <div class="zt-progress-bar">
                                    <div class="zt-progress-fill" style="width: ${progress.percentage}%"></div>
                                </div>
                                <div class="zt-progress-text">${progress.unlocked}/${progress.total} (${progress.percentage}%)</div>
                            </div>
                            <div class="zt-stats-grid">
                                ${statsHTML}
                            </div>
                        </div>
                        ${cardsHTML}
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // 绑定事件
            modal.querySelectorAll('.zt-card').forEach(el => {
                el.addEventListener('click', () => {
                    this.showCardDetail(el.dataset.cardId);
                });
            });

            modal.querySelector('.zt-card-modal-close').addEventListener('click', () => {
                modal.remove();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            requestAnimationFrame(() => {
                modal.classList.add('zt-show');
            });
        }
    };

    // ========================================
    // 全局API
    // ========================================

    // 显示收藏簿
    window.ztShowCardCollection = function() {
        UIManager.showCollection();
    };

    // 检查卡牌
    window.ztHasCard = function(cardId) {
        return CardCollection.hasCard(cardId);
    };

    // 获取卡牌信息
    window.ztGetCard = function(cardId) {
        return CARDS[cardId] || null;
    };

    // 获取收集进度
    window.ztGetCollectionProgress = function() {
        return CardCollection.getProgress();
    };

    // 解锁卡牌（内部使用）
    window._ztUnlockCard = function(cardId) {
        return CardCollection.addCard(cardId);
    };

    // 高级API
    window.ZTCards = {
        // 显示收藏簿
        showCollection: () => UIManager.showCollection(),

        // 检查卡牌
        has: (cardId) => CardCollection.hasCard(cardId),

        // 获取卡牌
        get: (cardId) => CARDS[cardId],

        // 获取所有卡牌
        getAll: () => CARDS,

        // 获取收集进度
        getProgress: () => CardCollection.getProgress(),

        // 获取统计
        getStats: () => CardCollection.getStats(),

        // 添加卡牌
        add: (cardId) => CardCollection.addCard(cardId),

        // 显示卡牌详情
        showDetail: (cardId) => UIManager.showCardDetail(cardId)
    };

    // ========================================
    // 初始化
    // ========================================

    function init() {
        // 初始化收藏
        CardCollection.init();

        // 创建浮动按钮
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'zt-cards-floating-btn';
        floatingBtn.innerHTML = '🃏';
        floatingBtn.title = '查看卡牌收藏';
        floatingBtn.addEventListener('click', () => UIManager.showCollection());
        document.body.appendChild(floatingBtn);

        // 控制台欢迎信息
        console.log('%c🃏 疯狂动物城 - 卡牌收藏系统', 'color: #FFD700; font-size: 16px; font-weight: bold');
        console.log('使用 ztShowCardCollection() 查看收藏簿');
        console.log('使用 ztGetCard(cardId) 获取卡牌信息');
    }

    // DOM加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
