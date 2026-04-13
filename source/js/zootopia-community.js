/**
 * 疯狂动物城 - 社区互动面板
 * Zootopia Community Panel - 第28轮优化新增
 * Version: 1.0.0
 *
 * 轻量级社区功能，支持：
 * - 访客留言板
 * - 在线访客显示
 * - 引用回复系统
 * - 心情反应
 * - 社区统计
 */

(function(window) {
    'use strict';

    // ==================== 配置管理 ====================
    const CommunityConfig = {
        storage: {
            messages: 'zootopia_community_messages',
            visitors: 'zootopia_community_visitors',
            stats: 'zootopia_community_stats',
            currentUser: 'zootopia_community_current_user'
        },
        limits: {
            maxMessagesPerVisit: 5,
            maxMessageLength: 500,
            messageExpiryDays: 30,
            maxVisibleMessages: 50
        },
        ui: {
            autoShowNewMessage: true,
            notificationDuration: 5000,
            refreshInterval: 30000
        }
    };

    // ==================== 工具函数 ====================
    const Utils = {
        // 生成唯一ID
        generateId: function() {
            return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        // 格式化时间
        formatTime: function(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();
            const diff = now - date;

            // 少于1分钟
            if (diff < 60000) {
                return '刚刚';
            }
            // 少于1小时
            if (diff < 3600000) {
                const minutes = Math.floor(diff / 60000);
                return minutes + '分钟前';
            }
            // 少于24小时
            if (diff < 86400000) {
                const hours = Math.floor(diff / 3600000);
                return hours + '小时前';
            }
            // 少于7天
            if (diff < 604800000) {
                const days = Math.floor(diff / 86400000);
                return days + '天前';
            }
            // 超过7天显示具体日期
            return date.getFullYear() + '-' +
                   String(date.getMonth() + 1).padStart(2, '0') + '-' +
                   String(date.getDate()).padStart(2, '0') + ' ' +
                   String(date.getHours()).padStart(2, '0') + ':' +
                   String(date.getMinutes()).padStart(2, '0');
        },

        // 截断文本
        truncateText: function(text, maxLength) {
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength - 3) + '...';
        },

        // 转义HTML
        escapeHtml: function(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        // 本地存储操作
        storage: {
            get: function(key, defaultValue) {
                try {
                    const value = localStorage.getItem(key);
                    return value ? JSON.parse(value) : defaultValue;
                } catch (e) {
                    console.warn('LocalStorage read error:', e);
                    return defaultValue;
                }
            },
            set: function(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (e) {
                    console.warn('LocalStorage write error:', e);
                    return false;
                }
            }
        },

        // 防抖函数
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // ==================== 数据结构 ====================
    const DataManager = {
        // 获取消息列表
        getMessages: function() {
            const messages = Utils.storage.get(CommunityConfig.storage.messages, []);
            // 按时间倒序排序，限制数量
            return messages
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, CommunityConfig.limits.maxVisibleMessages);
        },

        // 添加消息
        addMessage: function(content, author, replyTo = null) {
            if (!content || !content.trim()) {
                return { success: false, error: '内容不能为空' };
            }

            if (content.length > CommunityConfig.limits.maxMessageLength) {
                return { success: false, error: '内容过长' };
            }

            const messages = Utils.storage.get(CommunityConfig.storage.messages, []);
            const stats = Utils.storage.get(CommunityConfig.storage.stats, {
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

            if (todayCount >= CommunityConfig.limits.maxMessagesPerVisit) {
                return { success: false, error: '今日发言次数已达上限' };
            }

            const newMessage = {
                id: Utils.generateId(),
                content: Utils.truncateText(content.trim(), CommunityConfig.limits.maxMessageLength),
                author: Utils.escapeHtml(author),
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
            Utils.storage.set(CommunityConfig.storage.messages, messages);

            // 更新统计
            stats.totalMessages++;
            Utils.storage.set(CommunityConfig.storage.stats, stats);

            return { success: true, message: newMessage };
        },

        // 更新消息反应
        addReaction: function(messageId, reactionType) {
            const messages = Utils.storage.get(CommunityConfig.storage.messages, []);
            const message = messages.find(m => m.id === messageId);

            if (!message) {
                return { success: false, error: '消息不存在' };
            }

            if (!message.reactions[reactionType]) {
                return { success: false, error: '无效的反应类型' };
            }

            message.reactions[reactionType]++;
            Utils.storage.set(CommunityConfig.storage.messages, messages);

            return { success: true, reactions: message.reactions };
        },

        // 获取统计数据
        getStats: function() {
            const stats = Utils.storage.get(CommunityConfig.storage.stats, {
                totalVisitors: 0,
                totalMessages: 0,
                lastVisit: null
            });

            // 清理过期消息
            this.cleanOldMessages();

            return {
                ...stats,
                messages: this.getMessages().length
            };
        },

        // 更新访客信息
        updateVisitor: function(visitorName) {
            const stats = Utils.storage.get(CommunityConfig.storage.stats, {
                totalVisitors: 0,
                totalMessages: 0,
                lastVisit: null
            });

            stats.totalVisitors++;
            stats.lastVisit = Date.now();
            Utils.storage.set(CommunityConfig.storage.stats, stats);

            // 记录当前访客
            const visitor = {
                name: Utils.escapeHtml(visitorName),
                lastSeen: Date.now(),
                sessionId: Utils.generateId()
            };
            Utils.storage.set(CommunityConfig.storage.currentUser, visitor);

            return visitor;
        },

        // 清理过期消息
        cleanOldMessages: function() {
            const messages = Utils.storage.get(CommunityConfig.storage.messages, []);
            const expiryTime = Date.now() - (CommunityConfig.limits.messageExpiryDays * 24 * 60 * 60 * 1000);

            const filtered = messages.filter(m => m.timestamp > expiryTime);

            if (filtered.length !== messages.length) {
                Utils.storage.set(CommunityConfig.storage.messages, filtered);
            }

            return filtered.length;
        }
    };

    // ==================== UI 渲染器 ====================
    const UIRenderer = {
        // 表情映射
        reactionEmojis: {
            like: '👍',
            heart: '❤️',
            laugh: '😄',
            excite: '🎉',
            support: '🙌',
            cool: '😎'
        },

        reactionLabels: {
            like: '赞',
            heart: '喜欢',
            laugh: '好笑',
            excite: '兴奋',
            support: '支持',
            cool: '酷'
        },

        // 创建基础容器
        createContainer: function() {
            const container = document.createElement('div');
            container.id = 'zootopia-community-panel';
            container.className = 'zootopia-community-panel';
            return container;
        },

        // 渲染统计面板
        renderStats: function(stats) {
            const panel = document.createElement('div');
            panel.className = 'community-panel-header';

            panel.innerHTML = `
                <div class="community-stats">
                    <div class="stat-item">
                        <div class="stat-icon">👥</div>
                        <div class="stat-value">${stats.totalVisitors}</div>
                        <div class="stat-label">社区访客</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">💬</div>
                        <div class="stat-value">${stats.totalMessages}</div>
                        <div class="stat-label">留言总数</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🔔</div>
                        <div class="stat-value">${stats.lastVisit ? '活跃' : '欢迎'}</div>
                        <div class="stat-label">社区状态</div>
                    </div>
                </div>
            `;

            return panel;
        },

        // 渲染留言表单
        renderMessageForm: function() {
            const form = document.createElement('div');
            form.className = 'community-message-form';

            form.innerHTML = `
                <div class="form-header">
                    <h4>💬 发表留言</h4>
                    <div class="form-hint">分享你的想法，让社区听到你的声音 🦊</div>
                </div>
                <div class="form-body">
                    <div class="form-row">
                        <input type="text" id="community-author" placeholder="你的昵称（必填）" maxlength="20" class="form-input" />
                    </div>
                    <div class="form-row">
                        <textarea id="community-content" placeholder="你想说什么？支持引用回复...（最多500字）" maxlength="500" rows="3" class="form-textarea"></textarea>
                        <div class="char-count"><span id="char-counter">0</span>/500</div>
                    </div>
                    <div class="form-actions">
                        <button type="button" id="community-submit" class="btn-primary">发布留言</button>
                        <button type="button" id="community-cancel-reply" class="btn-secondary" style="display:none;">取消回复</button>
                    </div>
                </div>
            `;

            return form;
        },

        // 渲染单条留言
        renderMessage: function(message, replyTo = null) {
            const div = document.createElement('div');
            div.className = 'community-message';
            div.dataset.id = message.id;

            const replyHtml = message.replyTo ? `
                <div class="message-reply-to">
                    回复 <strong>${message.replyTo.author}</strong>：${Utils.truncateText(message.replyTo.content, 50)}
                </div>
            ` : '';

            const reactionsHtml = Object.entries(message.reactions)
                .filter(([_, count]) => count > 0)
                .map(([type, count]) => `
                    <button class="reaction-btn ${type}" data-type="${type}">
                        ${this.reactionEmojis[type]} <span class="count">${count}</span>
                    </button>
                `).join('');

            div.innerHTML = `
                <div class="message-header">
                    <div class="message-author">
                        <span class="avatar-icon">${this.getAvatarIcon(message.author)}</span>
                        <span class="author-name">${message.author}</span>
                    </div>
                    <div class="message-time">${Utils.formatTime(message.timestamp)}</div>
                </div>
                ${replyHtml}
                <div class="message-content">${Utils.escapeHtml(message.content)}</div>
                <div class="message-actions">
                    <button class="action-btn reply-btn" data-author="${message.author}">
                        💬 回复
                    </button>
                    <div class="reactions-container">
                        ${reactionsHtml}
                        <button class="action-btn more-reactions-btn">➕</button>
                    </div>
                    <div class="reaction-picker" style="display:none;">
                        ${Object.entries(this.reactionEmojis).map(([type, emoji]) => `
                            <button class="reaction-picker-btn ${type}" data-type="${type}">${emoji} ${this.reactionLabels[type]}</button>
                        `).join('')}
                    </div>
                </div>
            `;

            return div;
        },

        // 获取头像图标（基于用户名生成）
        getAvatarIcon: function(author) {
            const iconMap = {
                '朱迪': '🐰',
                '尼克': '🦊',
                '闪电': '🦥',
                'Bogo': '🦁',
                '克拉豪斯': '🐆',
                '绵羊副市长': '🐑'
            };

            for (let name in iconMap) {
                if (author.includes(name)) {
                    return iconMap[name];
                }
            }

            // 默认根据首字符选择
            const firstChar = author.charAt(0);
            if (/[朱祝周赵张王李]/.test(firstChar)) {
                return '🐰';
            } else if (/[尼牛汪胡姚]/.test(firstChar)) {
                return '🦊';
            } else if (/[闪吴]/.test(firstChar)) {
                return '🦥';
            } else if (/[旁季]/.test(firstChar)) {
                return '🦁';
            } else if (/[克柯]/.test(firstChar)) {
                return '🐆';
            }
            return '👤';
        },

        // 渲染留言列表
        renderMessageList: function(messages) {
            const list = document.createElement('div');
            list.className = 'community-message-list';

            if (messages.length === 0) {
                list.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">🦊</div>
                        <div class="empty-text">还没有留言，来做第一个发言的人吧！</div>
                        <div class="empty-hint">💡 试试点击留言，使用不同的表情反应</div>
                    </div>
                `;
            } else {
                messages.forEach(message => {
                    const msgEl = this.renderMessage(message);
                    list.appendChild(msgEl);
                });
            }

            return list;
        },

        // 渲染整个面板
        render: function() {
            const container = this.createContainer();
            const stats = DataManager.getStats();

            container.innerHTML = `
                <div class="community-panel-header">
                    <div class="panel-title">🐾 Zootopia 社区</div>
                </div>
            `;

            container.appendChild(this.renderStats(stats));
            container.appendChild(this.renderMessageForm());
            container.appendChild(this.renderMessageList(DataManager.getMessages()));

            return container;
        }
    };

    // ==================== 事件处理器 ====================
    const EventHandler = {
        init: function(container) {
            const form = container.querySelector('.community-message-form');
            const authorInput = container.querySelector('#community-author');
            const contentInput = container.querySelector('#community-content');
            const submitBtn = container.querySelector('#community-submit');
            const cancelReplyBtn = container.querySelector('#community-cancel-reply');
            const charCounter = container.querySelector('#char-counter');

            let currentReplyTo = null;

            // 字符计数
            contentInput.addEventListener('input', function() {
                const count = this.value.length;
                charCounter.textContent = count;

                if (count > CommunityConfig.limits.maxMessageLength * 0.9) {
                    charCounter.style.color = '#e74c3c';
                } else if (count > CommunityConfig.limits.maxMessageLength * 0.7) {
                    charCounter.style.color = '#f39c12';
                } else {
                    charCounter.style.color = '';
                }
            });

            // 提交留言
            submitBtn.addEventListener('click', function() {
                const author = authorInput.value.trim();
                const content = contentInput.value.trim();

                if (!author) {
                    this.showNotification('请输入你的昵称', 'error');
                    authorInput.focus();
                    return;
                }

                const result = DataManager.addMessage(content, author, currentReplyTo);

                if (result.success) {
                    authorInput.value = '';
                    contentInput.value = '';
                    charCounter.textContent = '0';
                    cancelReplyBtn.style.display = 'none';

                    if (currentReplyTo) {
                        currentReplyTo = null;
                        this.showNotification('回复成功！', 'success');
                    } else {
                        this.showNotification('留言发布成功！', 'success');
                    }

                    // 重新加载留言列表
                    this.refreshMessageList(container);
                } else {
                    this.showNotification(result.error, 'error');
                }
            }.bind(this));

            // 取消回复
            cancelReplyBtn.addEventListener('click', function() {
                currentReplyTo = null;
                cancelReplyBtn.style.display = 'none';
                contentInput.placeholder = '你想说什么？支持引用回复...（最多500字）';
            });

            // 消息列表事件委托
            container.querySelector('.community-message-list').addEventListener('click', function(e) {
                const target = e.target;

                // 回复按钮
                if (target.classList.contains('reply-btn')) {
                    e.preventDefault();
                    const author = target.dataset.author;
                    contentInput.focus();
                    contentInput.placeholder = `回复 ${author}：`;
                    cancelReplyBtn.style.display = 'inline-block';

                    currentReplyTo = {
                        author: author,
                        content: target.parentElement.parentElement.querySelector('.message-content').textContent
                    };
                }

                // 表情反应按钮
                if (target.closest('.reaction-btn')) {
                    const btn = target.closest('.reaction-btn');
                    const type = btn.dataset.type;
                    const messageId = btn.closest('.community-message').dataset.id;

                    DataManager.addReaction(messageId, type);
                    this.refreshMessageList(container);
                    this.showNotification('反应已添加！', 'success');
                }

                // 更多表情按钮
                if (target.classList.contains('more-reactions-btn')) {
                    const picker = target.nextElementSibling;
                    picker.style.display = picker.style.display === 'none' ? 'flex' : 'none';
                }

                // 表情选择器
                if (target.classList.contains('reaction-picker-btn')) {
                    const type = target.dataset.type;
                    const messageEl = target.closest('.community-message');
                    const messageId = messageEl.dataset.id;

                    DataManager.addReaction(messageId, type);
                    this.refreshMessageList(container);
                    this.showNotification(`已添加 ${UIRenderer.reactionEmojis[type]} ${UIRenderer.reactionLabels[type]}`, 'success');
                }
            }.bind(this));

            // 自动聚焦昵称输入框
            authorInput.focus();
        },

        refreshMessageList: function(container) {
            const listContainer = container.querySelector('.community-message-list');
            const newList = UIRenderer.renderMessageList(DataManager.getMessages());

            listContainer.replaceWith(newList);

            // 重新绑定事件
            this.init(container);
        },

        showNotification: function(message, type = 'info') {
            // 创建通知元素
            const notification = document.createElement('div');
            notification.className = 'community-notification ' + type;
            notification.textContent = message;

            document.body.appendChild(notification);

            // 动画进入
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });

            // 自动移除
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, CommunityConfig.ui.notificationDuration);
        },

        // 刷新统计信息
        refreshStats: function(container) {
            const stats = DataManager.getStats();
            const statsEl = container.querySelector('.community-stats');

            if (statsEl) {
                statsEl.innerHTML = `
                    <div class="stat-item">
                        <div class="stat-icon">👥</div>
                        <div class="stat-value">${stats.totalVisitors}</div>
                        <div class="stat-label">社区访客</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">💬</div>
                        <div class="stat-value">${stats.totalMessages}</div>
                        <div class="stat-label">留言总数</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🔔</div>
                        <div class="stat-value">${stats.lastVisit ? '活跃' : '欢迎'}</div>
                        <div class="stat-label">社区状态</div>
                    </div>
                `;
            }
        }
    };

    // ==================== 主控制器 ====================
    const CommunityPanel = {
        instance: null,
        initialized: false,

        init: function() {
            if (this.initialized) return;

            // 生成或获取访客ID
            const visitorName = this.getOrCreateVisitorName();
            DataManager.updateVisitor(visitorName);

            // 创建并插入面板
            const container = UIRenderer.render();
            this.insertPanel(container);

            // 初始化事件
            EventHandler.init(container);

            // 定期刷新统计
            setInterval(() => {
                EventHandler.refreshStats(container);
            }, CommunityConfig.ui.refreshInterval);

            // 监听新消息通知
            this.setupMessageNotification(container);

            this.initialized = true;
            this.instance = container;

            console.log('Zootopia Community Panel initialized');
        },

        getOrCreateVisitorName: function() {
            const userInfo = Utils.storage.get(CommunityConfig.storage.currentUser, null);
            if (userInfo && userInfo.name) {
                return userInfo.name;
            }

            // 生成随机昵称
            const prefixes = ['Zootopia_', 'Animal_', 'City_', 'Zoo_', 'Wild_'];
            const suffixes = ['Visitor', 'Fan', 'Explorer', 'Traveler', 'Citizen'];
            const randomNum = Math.floor(Math.random() * 1000);

            return prefixes[Math.floor(Math.random() * prefixes.length)] +
                   suffixes[Math.floor(Math.random() * suffixes.length)] +
                   randomNum;
        },

        insertPanel: function(container) {
            // 查找插入位置（侧边栏底部或页面主体）
            const sidebar = document.querySelector('.sidebar, .aside, .sidebar-inner');
            const mainContent = document.querySelector('.main, .content, .posts-expand');

            if (sidebar) {
                sidebar.appendChild(container);
            } else if (mainContent) {
                mainContent.insertBefore(container, mainContent.firstChild);
            } else {
                document.body.appendChild(container);
            }
        },

        setupMessageNotification: function(container) {
            // 监听storage变化以通知其他标签页
            window.addEventListener('storage', (e) => {
                if (e.key === CommunityConfig.storage.messages) {
                    EventHandler.refreshMessageList(container);
                    EventHandler.showNotification('有新留言发表！', 'info');
                }
            });
        }
    };

    // ==================== API 导出 ====================
    window.ZootopiaCommunity = {
        init: function() {
            CommunityPanel.init();
        },
        showPanel: function() {
            if (CommunityPanel.instance) {
                CommunityPanel.instance.style.display = 'block';
            } else {
                CommunityPanel.init();
            }
        },
        hidePanel: function() {
            if (CommunityPanel.instance) {
                CommunityPanel.instance.style.display = 'none';
            }
        },
        addMessage: DataManager.addMessage,
        getMessages: DataManager.getMessages,
        getStats: DataManager.getStats,
        refresh: function() {
            if (CommunityPanel.instance) {
                EventHandler.refreshMessageList(CommunityPanel.instance);
                EventHandler.refreshStats(CommunityPanel.instance);
            }
        }
    };

    // 自动初始化（延迟加载）
    if (document.readyState === 'complete') {
        setTimeout(() => CommunityPanel.init(), 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => CommunityPanel.init(), 1000);
        });
    }

})(window);
