/**
 * 疯狂动物城优化动画队列系统
 * Zootopia Animation Queue Enhanced - 暂停、恢复、优先级管理
 */

(function() {
  'use strict';

  // ==================== 动画队列配置 ====================
  const AnimationQueueConfig = {
    // 队列配置
    maxConcurrent: 3,           // 最大并发动画数
    maxQueueSize: 50,          // 队列最大长度
    defaultDuration: 300,       // 默认动画时长
    defaultEasing: 'ease-out',  // 默认缓动函数

    // 优先级定义
    priorities: {
      critical: 1,    // 关键动画（用户交互反馈）
      high: 2,        // 高优先级（重要内容）
      normal: 3,      // 普通动画
      low: 4          // 低优先级（装饰性动画）
    },

    // 状态
    isPaused: false,
    isSuspended: false
  };

  // ==================== 动画队列 ====================
  const AnimationQueue = {
    queue: [],
    running: new Set(),
    paused: false,
    suspended: false,

    // 添加动画到队列
    add: function(animation) {
      // 检查队列是否已满
      if (this.queue.length >= AnimationQueueConfig.maxQueueSize) {
        console.warn('动画队列已满');
        return false;
      }

      // 设置默认优先级
      if (!animation.priority) {
        animation.priority = AnimationQueueConfig.priorities.normal;
      }

      // 设置默认时长和缓动
      if (!animation.duration) {
        animation.duration = AnimationQueueConfig.defaultDuration;
      }
      if (!animation.easing) {
        animation.easing = AnimationQueueConfig.defaultEasing;
      }

      // 添加到队列
      this.queue.push(animation);

      // 按优先级排序
      this.queue.sort((a, b) => a.priority - b.priority);

      // 尝试执行
      this.process();

      return animation.id || this.generateId();
    },

    // 处理队列
    process: function() {
      // 如果暂停或挂起，不处理
      if (this.paused || this.suspended) return;

      // 检查是否达到最大并发数
      while (this.running.size < AnimationQueueConfig.maxConcurrent &&
             this.queue.length > 0) {
        const animation = this.queue.shift();

        // 检查元素是否仍然存在
        if (!animation.element || !document.contains(animation.element)) {
          continue;
        }

        // 开始执行动画
        this.run(animation);
      }
    },

    // 运行动画
    run: function(animation) {
      const id = animation.id || this.generateId();
      this.running.add(id);

      // 应用动画
      this.applyAnimation(animation);

      // 动画完成后清理
      const duration = animation.duration || AnimationQueueConfig.defaultDuration;

      setTimeout(() => {
        this.running.delete(id);
        this.process();
      }, duration);
    },

    // 应用动画
    applyAnimation: function(animation) {
      const element = animation.element;
      const type = animation.type;
      const duration = animation.duration;
      const easing = animation.easing;

      // 检查减少动画偏好
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return;
      }

      // 应用动画类或样式
      element.style.transition = `all ${duration}ms ${easing}`;

      // 触发重排
      element.offsetHeight;

      // 添加动画类（如果有）
      if (type) {
        element.classList.add(`zt-animate-${type}`);
      }

      // 执行动画
      if (animation.onStart) {
        animation.onStart();
      }

      requestAnimationFrame(() => {
        element.classList.add('zt-animate-active');

        setTimeout(() => {
          element.classList.remove('zt-animate-active');

          if (type) {
            setTimeout(() => {
              element.classList.remove(`zt-animate-${type}`);
            }, duration);
          }

          if (animation.onComplete) {
            animation.onComplete();
          }
        }, 50);
      });
    },

    // 生成唯一ID
    generateId: function() {
      return `anim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 暂停队列
    pause: function() {
      this.paused = true;
      console.log('⏸️ 动画队列已暂停');
    },

    // 恢复队列
    resume: function() {
      this.paused = false;
      this.process();
      console.log('▶️ 动画队列已恢复');
    },

    // 挂起队列（清除所有等待中的动画）
    suspend: function() {
      this.suspended = true;
      this.queue = [];
      console.log('⏸️ 动画队列已挂起');
    },

    // 清空队列
    clear: function() {
      this.queue = [];
      console.log('🗑️ 动画队列已清空');
    },

    // 获取队列状态
    getStatus: function() {
      return {
        queue: this.queue.length,
        running: this.running.size,
        paused: this.paused,
        suspended: this.suspended,
        maxConcurrent: AnimationQueueConfig.maxConcurrent
      };
    },

    // 设置最大并发数
    setMaxConcurrent: function(count) {
      if (count > 0 && count <= 10) {
        AnimationQueueConfig.maxConcurrent = count;
      }
    },

    // 调整队列中动画的优先级
    reprioritize: function(priorityFn) {
      this.queue.forEach(anim => {
        const newPriority = priorityFn(anim);
        if (newPriority !== undefined) {
          anim.priority = newPriority;
        }
      });

      // 重新排序
      this.queue.sort((a, b) => a.priority - b.priority);
    }
  };

  // ==================== 动画预设增强 ====================
  const AnimationPresets = {
    // 动画预设
    presets: {
      // 基础动画
      fadeIn: {
        type: 'fadeIn',
        duration: 300,
        easing: 'ease-out'
      },
      fadeOut: {
        type: 'fadeOut',
        duration: 300,
        easing: 'ease-in'
      },
      slideUp: {
        type: 'slideUp',
        duration: 400,
        easing: 'ease-out'
      },
      slideDown: {
        type: 'slideDown',
        duration: 400,
        easing: 'ease-out'
      },
      scaleIn: {
        type: 'scaleIn',
        duration: 300,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      scaleOut: {
        type: 'scaleOut',
        duration: 300,
        easing: 'ease-in'
      },
      bounce: {
        type: 'bounce',
        duration: 600,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      },
      shake: {
        type: 'shake',
        duration: 500,
        easing: 'ease-in-out'
      },
      pulse: {
        type: 'pulse',
        duration: 600,
        easing: 'ease-in-out'
      },
      rotate: {
        type: 'rotate',
        duration: 400,
        easing: 'ease-in-out'
      },
      flip: {
        type: 'flip',
        duration: 600,
        easing: 'ease-in-out'
      },

      // 高级动画
      slideInLeft: {
        type: 'slideInLeft',
        duration: 400,
        easing: 'ease-out'
      },
      slideInRight: {
        type: 'slideInRight',
        duration: 400,
        easing: 'ease-out'
      },
      zoomIn: {
        type: 'zoomIn',
        duration: 300,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      zoomOut: {
        type: 'zoomOut',
        duration: 300,
        easing: 'ease-in'
      },

      // 特殊动画
      glow: {
        type: 'glow',
        duration: 1000,
        easing: 'ease-in-out'
      },
      shimmer: {
        type: 'shimmer',
        duration: 1500,
        easing: 'linear'
      },
      typewriter: {
        type: 'typewriter',
        duration: 1000,
        easing: 'steps-end'
      }
    },

    // 获取预设
    get: function(name) {
      return this.presets[name] || null;
    },

    // 执行预设动画
    apply: function(element, name, options = {}) {
      const preset = this.get(name);
      if (!preset) {
        console.warn(`动画预设不存在: ${name}`);
        return false;
      }

      const animation = {
        element,
        ...preset,
        ...options,
        priority: options.priority || AnimationQueueConfig.priorities.normal
      };

      return AnimationQueue.add(animation);
    }
  };

  // ==================== 动画控制器 ====================
  const AnimationController = {
    // 批量动画
    animateBatch: function(elements, type, options = {}) {
      const batchOptions = {
        ...options,
        priority: options.priority || AnimationQueueConfig.priorities.normal,
        stagger: options.stagger || 100
      };

      elements.forEach((element, index) => {
        setTimeout(() => {
          AnimationPresets.apply(element, type, {
            ...batchOptions,
            delay: index * batchOptions.stagger
          });
        }, index * batchOptions.stagger);
      },

    // 序列动画
    animateSequence: function(element, types, options = {}) {
      let delay = 0;

      types.forEach((type, index) => {
        setTimeout(() => {
          AnimationPresets.apply(element, type, {
            ...options,
            onComplete: index === types.length - 1 ? options.onComplete : null
          });
        }, delay);

        const preset = AnimationPresets.get(type);
        delay += preset ? preset.duration : AnimationQueueConfig.defaultDuration;
      });
    },

    // 链式动画
    animateChain: function(animations) {
      let chain = Promise.resolve();

      animations.forEach(anim => {
        chain = chain.then(() => {
          return new Promise(resolve => {
            const animation = {
              element: anim.element,
              type: anim.type,
              duration: anim.duration || AnimationQueueConfig.defaultDuration,
              easing: anim.easing || AnimationQueueConfig.defaultEasing,
              priority: AnimationQueueConfig.priorities.high
            };

            animation.onComplete = resolve;
            AnimationQueue.add(animation);
          });
        });
      });

      return chain;
    }
  };

  // ==================== 性能优化器 ====================
  const AnimationOptimizer = {
    // 优化动画性能
    optimize: function(element) {
      // 使用 GPU 加速
      element.style.willChange = 'transform, opacity';

      // 动画结束后移除
      element.addEventListener('transitionend', function() {
        element.style.willChange = '';
      }, { once: true });
    },

    // 批量优化
    optimizeBatch: function(elements) {
      elements.forEach(el => this.optimize(el));
    },

    // 防抖动画
    debounced: function(fn, delay = 100) {
      let timer = null;

      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    // 节流动画
    throttled: function(fn, limit = 100) {
      let inThrottle = false;

      return function(...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };

  // ==================== 滚动动画触发器 ====================
  const ScrollAnimationTrigger = {
    init: function() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const element = entry.target;

          if (entry.isIntersecting) {
            const animationType = element.dataset.ztAnimate;
            if (animationType) {
              AnimationPresets.apply(element, animationType);
            }

            // 只触发一次
            observer.unobserve(element);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.1
      });

      // 观察所有带动画标记的元素
      const animateElements = document.querySelectorAll('[data-zt-animate]');
      animateElements.forEach(el => observer.observe(el));
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.animationQueue = AnimationQueue;
  ZootopiaCore.animationPresets = AnimationPresets;
  ZootopiaCore.animationController = AnimationController;
  ZootopiaCore.animationOptimizer = AnimationOptimizer;
  ZootopiaCore.scrollTrigger = ScrollAnimationTrigger;
  ZootopiaCore.animationQueueConfig = AnimationQueueConfig;

  // ==================== 增强动画 API ====================
  // 暂停动画
  window.ztPauseAnimations = () => AnimationQueue.pause();

  // 恢复动画
  window.ztResumeAnimations = () => AnimationQueue.resume();

  // 清空动画队列
  window.ztClearAnimationQueue = () => AnimationQueue.clear();

  // 获取队列状态
  window.ztGetAnimationStatus = () => AnimationQueue.getStatus();

  // 设置最大并发动画数
  window.ztSetMaxAnimations = (count) => AnimationQueue.setMaxConcurrent(count);

  // 批量动画
  window.ztAnimateBatch = (elements, type) => AnimationController.animateBatch(elements, type);

  // 序列动画
  window.ztAnimateSequence = (element, types) => AnimationController.animateSequence(element, types);

  // 链式动画
  window.ztAnimateChain = (animations) => AnimationController.animateChain(animations);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    // 优化现有动画管理器
    if (ZootopiaCore.animation) {
      // 保留原有API，添加新功能
      const originalAnimate = ZootopiaCore.animation.animate;

      ZootopiaCore.animation.animate = function(element, type, options = {}) {
        // 检查是否暂停
        if (AnimationQueue.paused) {
          return;
        }

        // 优化性能
        AnimationOptimizer.optimize(element);

        // 使用新队列系统
        if (options.queue !== false) {
          AnimationPresets.apply(element, type, options);
        } else {
          return originalAnimate.call(this, element, type, options);
        }
      };
    }

    // 初始化滚动动画
    ScrollAnimationTrigger.init();

    console.log('✨ 优化动画队列系统已就绪');
  });

})();
