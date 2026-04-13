/**
 * 疯狂动物城动画系统
 * Zootopia Animation System - 高性能动画管理
 */

(function() {
  'use strict';

  // ==================== 动画配置 ====================
  const AnimationConfig = {
    // 预设动画
    presets: {
      fadeIn: {
        keyframes: [
          { opacity: 0 },
          { opacity: 1 }
        ],
        options: { duration: 300, easing: 'ease-out' }
      },
      slideUp: {
        keyframes: [
          { transform: 'translateY(20px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 }
        ],
        options: { duration: 300, easing: 'ease-out' }
      },
      slideDown: {
        keyframes: [
          { transform: 'translateY(-20px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 }
        ],
        options: { duration: 300, easing: 'ease-out' }
      },
      slideLeft: {
        keyframes: [
          { transform: 'translateX(20px)', opacity: 0 },
          { transform: 'translateX(0)', opacity: 1 }
        ],
        options: { duration: 300, easing: 'ease-out' }
      },
      slideRight: {
        keyframes: [
          { transform: 'translateX(-20px)', opacity: 0 },
          { transform: 'translateX(0)', opacity: 1 }
        ],
        options: { duration: 300, easing: 'ease-out' }
      },
      scaleIn: {
        keyframes: [
          { transform: 'scale(0.8)', opacity: 0 },
          { transform: 'scale(1)', opacity: 1 }
        ],
        options: { duration: 300, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }
      },
      bounce: {
        keyframes: [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-10px)' },
          { transform: 'translateY(0)' }
        ],
        options: { duration: 300, easing: 'ease-in-out' }
      },
      shake: {
        keyframes: [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(0)' }
        ],
        options: { duration: 400, easing: 'ease-in-out' }
      },
      pulse: {
        keyframes: [
          { transform: 'scale(1)' },
          { transform: 'scale(1.05)' },
          { transform: 'scale(1)' }
        ],
        options: { duration: 300, easing: 'ease-in-out' }
      },
      rotate: {
        keyframes: [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(360deg)' }
        ],
        options: { duration: 600, easing: 'ease-in-out' }
      },
      flip: {
        keyframes: [
          { transform: 'rotateY(0deg)' },
          { transform: 'rotateY(90deg)', opacity: 0.5 },
          { transform: 'rotateY(0deg)' }
        ],
        options: { duration: 600, easing: 'ease-in-out' }
      }
    },

    // 动画队列配置
    queue: {
      maxSize: 50,
      maxConcurrent: 5,
      priority: {
        high: 1,
        normal: 2,
        low: 3
      }
    }
  };

  // ==================== 动画管理器 ====================
  const Animator = {
    activeCount: 0,
    queue: [],
    isProcessing: false,

    // 执行动画
    animate: function(element, presetName, customOptions = {}) {
      const preset = AnimationConfig.presets[presetName];
      if (!preset) {
        console.warn(`动画预设 "${presetName}" 不存在`);
        return Promise.reject(new Error('Unknown preset'));
      }

      const options = { ...preset.options, ...customOptions };

      return this.addToQueue(() => {
        return new Promise((resolve, reject) => {
          try {
            // 添加 will-change 提示浏览器优化
            element.style.willChange = 'transform, opacity';

            const animation = element.animate(preset.keyframes, options);

            animation.onfinish = () => {
              this.activeCount--;
              element.style.willChange = '';
              this.processQueue();
              resolve(animation);
            };

            animation.oncancel = () => {
              this.activeCount--;
              element.style.willChange = '';
              this.processQueue();
              reject(new Error('Animation cancelled'));
            };

            this.activeCount++;
          } catch (error) {
            this.activeCount--;
            this.processQueue();
            reject(error);
          }
        });
      }, customOptions.priority || 'normal');
    },

    // 添加到队列
    addToQueue: function(fn, priority = 'normal') {
      return new Promise((resolve, reject) => {
        this.queue.push({
          fn,
          priority: AnimationConfig.queue.priority[priority] || 2,
          resolve,
          reject
        });

        // 按优先级排序
        this.queue.sort((a, b) => a.priority - b.priority);

        this.processQueue();
      });
    },

    // 处理队列
    processQueue: function() {
      if (this.isProcessing || this.queue.length === 0) return;

      this.isProcessing = true;

      while (this.queue.length > 0 && this.activeCount < AnimationConfig.queue.maxConcurrent) {
        const item = this.queue.shift();
        item.fn()
          .then(item.resolve)
          .catch(item.reject);
      }

      this.isProcessing = false;
    },

    // 批量动画
    animateBatch: function(elements, presetName, stagger = 100) {
      const promises = elements.map((element, index) => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.animate(element, presetName).then(resolve);
          }, index * stagger);
        });
      });

      return Promise.all(promises);
    },

    // 序列动画
    animateSequence: function(element, presetNames, options = {}) {
      let promise = Promise.resolve();

      presetNames.forEach(presetName => {
        promise = promise.then(() => this.animate(element, presetName, options));
      });

      return promise;
    }
  };

  // ==================== 滚动动画 ====================
  const ScrollAnimator = {
    observer: null,
    animatedElements: new WeakSet(),

    init: function() {
      // 使用 Intersection Observer API
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
              this.animateOnScroll(entry.target);
              this.animatedElements.add(entry.target);
            }
          });
        },
        {
          rootMargin: '0px 0px -100px 0px',
          threshold: 0.1
        }
      );

      // 自动观察带有 data-zt-animate 属性的元素
      this.observeElements();
    },

    observeElements: function() {
      document.querySelectorAll('[data-zt-animate]').forEach(el => {
        this.observer.observe(el);
      });
    },

    animateOnScroll: function(element) {
      const presetName = element.getAttribute('data-zt-animate') || 'fadeIn';
      const delay = parseInt(element.getAttribute('data-zt-delay') || '0');

      setTimeout(() => {
        Animator.animate(element, presetName);
      }, delay);
    },

    observe: function(element) {
      if (this.observer) {
        this.observer.observe(element);
      }
    },

    unobserve: function(element) {
      if (this.observer) {
        this.observer.unobserve(element);
      }
    }
  };

  // ==================== 鼠标动画 ====================
  const MouseAnimator = {
    ripple: function(element, event) {
      const ripple = document.createElement('span');
      ripple.className = 'zt-mouse-ripple';

      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      element.appendChild(ripple);

      Animator.animate(ripple, 'scaleIn').then(() => {
        ripple.remove();
      });
    },

    follow: function(element) {
      let cursor = null;

      element.addEventListener('mouseenter', () => {
        cursor = document.createElement('div');
        cursor.className = 'zt-mouse-follow';
        document.body.appendChild(cursor);
      });

      element.addEventListener('mousemove', (e) => {
        if (cursor) {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        }
      });

      element.addEventListener('mouseleave', () => {
        if (cursor) {
          cursor.remove();
          cursor = null;
        }
      });
    }
  };

  // ==================== 粒子效果 ====================
  const ParticleSystem = {
    createParticle: function(x, y, options = {}) {
      const particle = document.createElement('div');
      particle.className = 'zt-particle';

      const defaults = {
        size: Math.random() * 10 + 5,
        color: ZootopiaCore.utils.random([
          ZootopiaCore.config.colors.sahara,
          ZootopiaCore.config.colors.tundratown,
          ZootopiaCore.config.colors.rainforest
        ]),
        velocityX: (Math.random() - 0.5) * 200,
        velocityY: (Math.random() - 0.5) * 200 - 100,
        life: 1000
      };

      const config = { ...defaults, ...options };

      particle.style.cssText = `
        position: fixed;
        width: ${config.size}px;
        height: ${config.size}px;
        background: ${config.color};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9999;
      `;

      document.body.appendChild(particle);

      // 动画
      const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        {
          transform: `translate(${config.velocityX}px, ${config.velocityY}px) scale(0)`,
          opacity: 0
        }
      ], {
        duration: config.life,
        easing: 'ease-out'
      });

      animation.onfinish = () => particle.remove();
    },

    burst: function(x, y, count = 10) {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          this.createParticle(x, y);
        }, i * 20);
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.animator = Animator;
  ZootopiaCore.scrollAnimator = ScrollAnimator;
  ZootopiaCore.mouseAnimator = MouseAnimator;
  ZootopiaCore.particles = ParticleSystem;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(function() {
    ScrollAnimator.init();

    // 全局点击波纹效果
    ZootopiaCore.events.delegate(document, '[data-zt-ripple]', 'click', function(e) {
      MouseAnimator.ripple(this, e);
    });

    console.log('✨ Zootopia 动画系统已加载');
  });

  // ==================== 工具函数 ====================
  // 快捷方法
  window.ztAnimate = function(element, presetName, options) {
    return Animator.animate(element, presetName, options);
  };

  window.ztParticles = function(x, y, count) {
    ParticleSystem.burst(x, y, count);
  };

})();
