/**
 * 疯狂动物城评论表情反应系统
 * Zootopia Comment Reactions
 *
 * 评论点赞和表情反应功能
 */

(function() {
  'use strict';

  const CommentReactionsConfig = {
    // 表情反应
    reactions: {
      like: { emoji: '👍', label: '赞', color: '#10AC84' },
      love: { emoji: '❤️', label: '喜爱', color: '#EE5A24' },
      laugh: { emoji: '😄', label: '好笑', color: '#F8B739' },
      surprised: { emoji: '😮', label: '惊讶', color: '#0ABDE3' },
      angry: { emoji: '😡', label: '生气', color: '#EE5A24' },
      sad: { emoji: '😢', label: '难过', color: '#5F27CD' }
    },

    // 功能设置
    allowMultiple: false,    // 是否允许多选
    showCount: true,         // 显示反应数量
    animate: true,           // 动画效果
    persist: true,           // 持久化到localStorage
    notifyAuthor: false      // 通知作者（需要后端支持）
  };

  /**
   * 评论反应管理器
   */
  const CommentReactions = {
    reactionsData: new Map(),

    /**
     * 初始化
     */
    init: function() {
      this.loadReactions();
      this.attachToComments();
      this.setupGlobalListeners();
    },

    /**
     * 加载反应数据
     */
    loadReactions: function() {
      try {
        const stored = localStorage.getItem('zt_comment_reactions');
        if (stored) {
          const data = JSON.parse(stored);
          Object.entries(data).forEach(([commentId, reactions]) => {
            this.reactionsData.set(commentId, reactions);
          });
        }
      } catch (e) {
        console.warn('Failed to load reactions:', e);
      }
    },

    /**
     * 保存反应数据
     */
    saveReactions: function() {
      try {
        const data = Object.fromEntries(this.reactionsData);
        localStorage.setItem('zt_comment_reactions', JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to save reactions:', e);
      }
    },

    /**
     * 附加到评论
     */
    attachToComments: function() {
      // 查找所有评论
      const comments = document.querySelectorAll('.comment-item, .comment-list li, article.comment');

      comments.forEach((comment, index) => {
        const commentId = comment.id || comment.dataset.id || `comment-${index}`;
        this.createReactionBar(comment, commentId);
      });
    },

    /**
     * 创建反应栏
     */
    createReactionBar: function(comment, commentId) {
      // 检查是否已存在
      if (comment.querySelector('.zt-comment-reactions')) {
        return;
      }

      // 获取用户当前反应
      const userReaction = this.getUserReaction(commentId);

      // 创建反应栏
      const reactionBar = document.createElement('div');
      reactionBar.className = 'zt-comment-reactions';
      reactionBar.dataset.commentId = commentId;
      reactionBar.innerHTML = `
        <div class="zt-reaction-buttons">
          ${Object.entries(CommentReactionsConfig.reactions).map(([key, config]) => {
            const isSelected = userReaction === key;
            const count = this.getReactionCount(commentId, key);

            return `
              <button
                class="zt-reaction-btn ${isSelected ? 'zt-reaction-selected' : ''}"
                data-reaction="${key}"
                title="${config.label}"
                aria-label="${config.label}"
              >
                <span class="zt-reaction-emoji">${config.emoji}</span>
                ${CommentReactionsConfig.showCount ? `<span class="zt-reaction-count">${count > 0 ? count : ''}</span>` : ''}
              </button>
            `;
          }).join('')}
        </div>
        ${CommentReactionsConfig.showCount ? `<div class="zt-reaction-total">共 ${this.getTotalReactions(commentId)} 个反应</div>` : ''}
      `;

      // 插入到评论内容后面
      const content = comment.querySelector('.comment-content, .comment-body, .comment-text');
      if (content) {
        content.parentNode.insertBefore(reactionBar, content.nextSibling);
      } else {
        comment.appendChild(reactionBar);
      }

      // 附加事件
      this.attachReactionEvents(reactionBar, commentId);
    },

    /**
     * 附加反应事件
     */
    attachReactionEvents: function(reactionBar, commentId) {
      reactionBar.querySelectorAll('.zt-reaction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const reaction = btn.dataset.reaction;
          this.toggleReaction(commentId, reaction);
        });

        // 悬停效果
        btn.addEventListener('mouseenter', () => {
          btn.classList.add('zt-reaction-hover');
        });

        btn.addEventListener('mouseleave', () => {
          btn.classList.remove('zt-reaction-hover');
        });
      });
    },

    /**
     * 切换反应
     */
    toggleReaction: function(commentId, reaction) {
      const reactions = this.reactionsData.get(commentId) || {};
      const userOldReaction = reactions.userReaction;

      if (userOldReaction === reaction) {
        // 取消反应
        delete reactions.userReaction;
        reactions[reaction] = (reactions[reaction] || 0) - 1;
      } else {
        // 移除旧反应
        if (userOldReaction) {
          reactions[userOldReaction] = (reactions[userOldReaction] || 0) - 1;
        }
        // 添加新反应
        reactions.userReaction = reaction;
        reactions[reaction] = (reactions[reaction] || 0) + 1;
      }

      // 确保数量不为负
      Object.keys(reactions).forEach(key => {
        if (key !== 'userReaction' && reactions[key] < 0) {
          reactions[key] = 0;
        }
      });

      this.reactionsData.set(commentId, reactions);
      this.saveReactions();
      this.updateReactionBar(commentId);

      // 显示反馈
      if (window.ztNotify) {
        const action = userOldReaction === reaction ? '取消' : '添加';
        const reactionConfig = CommentReactionsConfig.reactions[reaction];
        ztNotify({
          type: 'success',
          message: `${action}${reactionConfig.label}反应`,
          duration: 1500
        });
      }
    },

    /**
     * 更新反应栏
     */
    updateReactionBar: function(commentId) {
      const comment = document.querySelector(`[data-comment-id="${commentId}"]`) ||
                     document.querySelector(`#${commentId}`) ||
                     document.querySelectorAll('.comment-item, .comment-list li')[commentId];

      if (!comment) return;

      const oldBar = comment.querySelector('.zt-comment-reactions');
      if (!oldBar) return;

      // 重新创建
      oldBar.remove();
      this.createReactionBar(comment, commentId);
    },

    /**
     * 获取用户反应
     */
    getUserReaction: function(commentId) {
      const reactions = this.reactionsData.get(commentId);
      return reactions ? reactions.userReaction : null;
    },

    /**
     * 获取反应数量
     */
    getReactionCount: function(commentId, reaction) {
      const reactions = this.reactionsData.get(commentId);
      return reactions && reactions[reaction] ? reactions[reaction] : 0;
    },

    /**
     * 获取总反应数
     */
    getTotalReactions: function(commentId) {
      const reactions = this.reactionsData.get(commentId);
      if (!reactions) return 0;

      let total = 0;
      Object.entries(reactions).forEach(([key, value]) => {
        if (key !== 'userReaction' && typeof value === 'number') {
          total += value;
        }
      });

      return total;
    },

    /**
     * 设置全局监听器
     */
    setupGlobalListeners: function() {
      // 监听动态添加的评论
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const comments = node.querySelectorAll ? node.querySelectorAll('.comment-item, .comment-list li') : [];
              comments.forEach(comment => {
                const commentId = comment.id || comment.dataset.id;
                if (commentId && !comment.querySelector('.zt-comment-reactions')) {
                  this.createReactionBar(comment, commentId);
                }
              });
            }
          });
        });
      });

      // 观察评论列表
      const commentList = document.querySelector('.comment-list, #comments');
      if (commentList) {
        observer.observe(commentList, {
          childList: true,
          subtree: true
        });
      }
    },

    /**
     * 获取评论统计
     */
    getCommentStats: function(commentId) {
      const reactions = this.reactionsData.get(commentId);
      if (!reactions) return null;

      const stats = {
        total: 0,
        breakdown: {}
      };

      Object.entries(CommentReactionsConfig.reactions).forEach(([key, config]) => {
        const count = reactions[key] || 0;
        if (count > 0) {
          stats.breakdown[key] = {
            emoji: config.emoji,
            label: config.label,
            count: count
          };
          stats.total += count;
        }
      });

      return stats;
    },

    /**
     * 获取所有评论统计
     */
    getAllStats: function() {
      const stats = {};

      this.reactionsData.forEach((reactions, commentId) => {
        stats[commentId] = this.getCommentStats(commentId);
      });

      return stats;
    }
  };

  // 导出 API
  ZootopiaCore.commentReactions = CommentReactions;
  ZootopiaCore.reactionsConfig = CommentReactionsConfig;

  // 全局 API
  window.ztGetCommentStats = (commentId) => CommentReactions.getCommentStats(commentId);
  window.ztGetAllCommentStats = () => CommentReactions.getAllStats();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    CommentReactions.init();
  });

})();
