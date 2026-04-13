/**
 * 疯狂动物城图片灯箱系统
 * Zootopia Lightbox - 优雅的图片查看体验
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const LightboxConfig = {
    // 灯箱配置
    lightbox: {
      closeOnOverlayClick: true,    // 点击背景关闭
      closeOnEscape: true,           // ESC 键关闭
      showCaptions: true,           // 显示图片说明
      showCounter: true,            // 显示图片计数
      showThumbnails: true,          // 显示缩略图
      thumbnailPosition: 'bottom',  // 缩略图位置
      animationDuration: 300,       // 动画时长
      zIndex: 10000
    },

    // 控件配置
    controls: {
      showZoom: true,               // 显示缩放控件
      showRotate: true,             // 显示旋转控件
      showDownload: true,           // 显示下载按钮
      showFullscreen: true,         // 显示全屏按钮
      showInfo: true                // 显示信息按钮
    },

    // 缩放配置
    zoom: {
      min: 0.5,                    // 最小缩放
      max: 3,                      // 最大缩放
      step: 0.25,                  // 缩放步长
      wheelZoom: true,              // 滚轮缩放
      pinchZoom: true               // 触捏缩放
    },

    // 旋转配置
    rotate: {
      steps: [0, 90, 180, 270],    // 旋转角度
      smooth: true                 // 平滑旋转
    },

    // 手势配置
    gestures: {
      swipe: true,                 // 滑动切换
      pinch: true,                 // 双指缩放
      doubleTap: true,             // 双击缩放
      drag: true                   // 拖拽平移
    }
  };

  // ==================== 图片集合管理器 ====================
  const ImageCollection = {
    images: [],
    currentIndex: 0,

    init: function() {
      this.scanImages();
      this.setupClickHandlers();
    },

    scanImages: function() {
      // 扫描文章中的所有图片
      const articleSelectors = [
        'article img',
        '.post-content img',
        '.entry-content img',
        '[itemprop="articleBody"] img'
      ];

      for (const selector of articleSelectors) {
        const images = document.querySelectorAll(selector);
        if (images.length > 0) {
          this.images = Array.from(images).map((img, index) => ({
            element: img,
            src: img.src,
            alt: img.alt || '',
            title: img.title || img.alt || '',
            caption: this.getCaption(img),
            index: index
          }));
          break;
        }
      }

      // 添加灯箱标记
      this.images.forEach(item => {
        item.element.classList.add('zt-lightbox-enabled');
        item.element.setAttribute('data-zt-lightbox-index', item.index);
      });
    },

    getCaption: function(img) {
      // 尝试从不同的地方获取说明
      const figure = img.closest('figure');
      if (figure) {
        const figcaption = figure.querySelector('figcaption');
        if (figcaption) {
          return figcaption.textContent.trim();
        }
      }

      const parent = img.parentElement;
      if (parent && (parent.classList.contains('wp-caption-text') ||
                     parent.classList.contains('caption'))) {
        return parent.textContent.trim();
      }

      return img.alt || '';
    },

    setupClickHandlers: function() {
      this.images.forEach(item => {
        item.element.addEventListener('click', (e) => {
          e.preventDefault();
          Lightbox.open(item.index);
        });

        // 添加可访问性
        item.element.setAttribute('role', 'button');
        item.element.setAttribute('aria-label', `查看图片：${item.title}`);
        item.element.style.cursor = 'pointer';
      });
    },

    getImage: function(index) {
      return this.images[index] || null;
    },

    getNextIndex: function() {
      return (this.currentIndex + 1) % this.images.length;
    },

    getPrevIndex: function() {
      return (this.currentIndex - 1 + this.images.length) % this.images.length;
    },

    hasNext: function() {
      return this.currentIndex < this.images.length - 1;
    },

    hasPrev: function() {
      return this.currentIndex > 0;
    }
  };

  // ==================== 灯箱 UI ====================
  const LightboxUI = {
    element: null,
    imageElement: null,
    transform: { scale: 1, rotate: 0, translateX: 0, translateY: 0 },

    create: function() {
      if (this.element) return this.element;

      const lightbox = document.createElement('div');
      lightbox.className = 'zt-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', '图片查看器');
      lightbox.innerHTML = `
        <div class="zt-lightbox-overlay"></div>
        <div class="zt-lightbox-container">
          <button class="zt-lightbox-close" aria-label="关闭">×</button>

          <div class="zt-lightbox-content">
            <div class="zt-lightbox-image-wrapper">
              <img class="zt-lightbox-image" src="" alt="">
            </div>

            ${LightboxConfig.lightbox.showCaptions ? `
              <div class="zt-lightbox-caption"></div>
            ` : ''}
          </div>

          <div class="zt-lightbox-controls">
            ${LightboxConfig.controls.showZoom ? `
              <button class="zt-lightbox-zoom-in" aria-label="放大">+</button>
              <button class="zt-lightbox-zoom-out" aria-label="缩小">-</button>
              <button class="zt-lightbox-zoom-reset" aria-label="重置">⟲</button>
            ` : ''}

            ${LightboxConfig.controls.showRotate ? `
              <button class="zt-lightbox-rotate-left" aria-label="左旋转">↺</button>
              <button class="zt-lightbox-rotate-right" aria-label="右旋转">↻</button>
            ` : ''}

            ${LightboxConfig.controls.showFullscreen ? `
              <button class="zt-lightbox-fullscreen" aria-label="全屏">⛶</button>
            ` : ''}

            ${LightboxConfig.controls.showDownload ? `
              <button class="zt-lightbox-download" aria-label="下载">⬇</button>
            ` : ''}
          </div>

          <div class="zt-lightbox-nav">
            <button class="zt-lightbox-prev" aria-label="上一张">
              <span class="zt-nav-icon">◀</span>
            </button>
            <button class="zt-lightbox-next" aria-label="下一张">
              <span class="zt-nav-icon">▶</span>
            </button>
          </div>

          ${LightboxConfig.lightbox.showCounter ? `
            <div class="zt-lightbox-counter"></div>
          ` : ''}
        </div>
      `;

      document.body.appendChild(lightbox);
      this.element = lightbox;

      this.imageElement = lightbox.querySelector('.zt-lightbox-image');
      this.attachEvents();
      this.resetTransform();

      return lightbox;
    },

    attachEvents: function() {
      // 点击背景关闭
      if (LightboxConfig.lightbox.closeOnOverlayClick) {
        const overlay = this.element.querySelector('.zt-lightbox-overlay');
        overlay.addEventListener('click', () => Lightbox.close());
      }

      // 关闭按钮
      this.element.querySelector('.zt-lightbox-close').addEventListener('click', () => {
        Lightbox.close();
      });

      // ESC 键关闭
      if (LightboxConfig.lightbox.closeOnEscape) {
        this.handleEscape = (e) => {
          if (e.key === 'Escape') {
            Lightbox.close();
          }
        };
        document.addEventListener('keydown', this.handleEscape);
      }

      // 导航按钮
      this.element.querySelector('.zt-lightbox-prev').addEventListener('click', () => {
        Lightbox.prev();
      });

      this.element.querySelector('.zt-lightbox-next').addEventListener('click', () => {
        Lightbox.next();
      });

      // 缩放控件
      if (LightboxConfig.controls.showZoom) {
        this.element.querySelector('.zt-lightbox-zoom-in').addEventListener('click', () => {
          this.zoomIn();
        });

        this.element.querySelector('.zt-lightbox-zoom-out').addEventListener('click', () => {
          this.zoomOut();
        });

        this.element.querySelector('.zt-lightbox-zoom-reset').addEventListener('click', () => {
          this.resetZoom();
        });

        // 滚轮缩放
        if (LightboxConfig.zoom.wheelZoom) {
          this.imageElement.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
              this.zoomIn();
            } else {
              this.zoomOut();
            }
          }, { passive: false });
        }
      }

      // 旋转控件
      if (LightboxConfig.controls.showRotate) {
        this.element.querySelector('.zt-lightbox-rotate-left').addEventListener('click', () => {
          this.rotate(-90);
        });

        this.element.querySelector('.zt-lightbox-rotate-right').addEventListener('click', () => {
          this.rotate(90);
        });
      }

      // 全屏
      if (LightboxConfig.controls.showFullscreen) {
        this.element.querySelector('.zt-lightbox-fullscreen').addEventListener('click', () => {
          this.toggleFullscreen();
        });
      }

      // 下载
      if (LightboxConfig.controls.showDownload) {
        this.element.querySelector('.zt-lightbox-download').addEventListener('click', () => {
          this.download();
        });
      }

      // 拖拽
      if (LightboxConfig.gestures.drag) {
        this.setupDrag();
      }

      // 双击缩放
      if (LightboxConfig.gestures.doubleTap) {
        let lastTap = 0;
        this.imageElement.addEventListener('click', (e) => {
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;

          if (tapLength < 300 && tapLength > 0) {
            if (this.transform.scale === 1) {
              this.zoomIn();
            } else {
              this.resetZoom();
            }
          }

          lastTap = currentTime;
        });
      }

      // 键盘导航
      document.addEventListener('keydown', (e) => {
        if (!this.element.classList.contains('zt-lightbox-open')) return;

        switch (e.key) {
          case 'ArrowLeft':
            Lightbox.prev();
            break;
          case 'ArrowRight':
            Lightbox.next();
            break;
          case '+':
          case '=':
            this.zoomIn();
            break;
          case '-':
            this.zoomOut();
            break;
          case '0':
            this.resetZoom();
            break;
        }
      });

      // 触摸手势
      if (LightboxConfig.gestures.swipe || LightboxConfig.gestures.pinch) {
        this.setupTouchGestures();
      }
    },

    setupDrag: function() {
      let isDragging = false;
      let startX, startY;

      const onMouseDown = (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.clientX - this.transform.translateX;
        startY = e.clientY - this.transform.translateY;
        this.imageElement.style.cursor = 'grabbing';
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        this.transform.translateX = e.clientX - startX;
        this.transform.translateY = e.clientY - startY;
        this.applyTransform();
      };

      const onMouseUp = () => {
        isDragging = false;
        this.imageElement.style.cursor = 'grab';
      };

      this.imageElement.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    setupTouchGestures: function() {
      let touchStartX, touchStartY;
      let initialDistance = 0;

      this.imageElement.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        } else if (e.touches.length === 2 && LightboxConfig.gestures.pinch) {
          initialDistance = this.getDistance(e.touches);
        }
      });

      this.imageElement.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && LightboxConfig.gestures.drag) {
          const deltaX = e.touches[0].clientX - touchStartX;
          const deltaY = e.touches[0].clientY - touchStartY;

          this.transform.translateX += deltaX;
          this.transform.translateY += deltaY;

          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;

          this.applyTransform();
        } else if (e.touches.length === 2 && LightboxConfig.gestures.pinch) {
          const currentDistance = this.getDistance(e.touches);
          const scale = currentDistance / initialDistance;

          this.transform.scale = Math.max(LightboxConfig.zoom.min,
            Math.min(LightboxConfig.zoom.max, scale));
          this.applyTransform();
        }
      });

      // 滑动切换
      if (LightboxConfig.gestures.swipe) {
        let swipeStartX = 0;

        this.element.addEventListener('touchstart', (e) => {
          swipeStartX = e.touches[0].clientX;
        });

        this.element.addEventListener('touchend', (e) => {
          const swipeEndX = e.changedTouches[0].clientX;
          const diff = swipeStartX - swipeEndX;

          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              Lightbox.next();
            } else {
              Lightbox.prev();
            }
          }
        });
      }
    },

    getDistance: function(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    },

    loadImage: function(src) {
      return new Promise((resolve, reject) => {
        this.imageElement.style.opacity = '0';

        const img = new Image();
        img.onload = () => {
          this.imageElement.src = src;
          setTimeout(() => {
            this.imageElement.style.opacity = '1';
            resolve();
          }, 50);
        };
        img.onerror = reject;
        img.src = src;
      });
    },

    updateCaption: function(caption) {
      const captionElement = this.element.querySelector('.zt-lightbox-caption');
      if (captionElement) {
        captionElement.textContent = caption;
        captionElement.style.display = caption ? 'block' : 'none';
      }
    },

    updateCounter: function() {
      const counterElement = this.element.querySelector('.zt-lightbox-counter');
      if (counterElement) {
        const current = ImageCollection.currentIndex + 1;
        const total = ImageCollection.images.length;
        counterElement.textContent = `${current} / ${total}`;
      }
    },

    updateNavButtons: function() {
      const prevBtn = this.element.querySelector('.zt-lightbox-prev');
      const nextBtn = this.element.querySelector('.zt-lightbox-next');

      if (prevBtn) {
        prevBtn.style.display = ImageCollection.hasPrev() ? 'block' : 'none';
      }

      if (nextBtn) {
        nextBtn.style.display = ImageCollection.hasNext() ? 'block' : 'none';
      }
    },

    // 缩放方法
    zoomIn: function() {
      const newScale = Math.min(
        LightboxConfig.zoom.max,
        this.transform.scale + LightboxConfig.zoom.step
      );
      this.transform.scale = newScale;
      this.applyTransform();
    },

    zoomOut: function() {
      const newScale = Math.max(
        LightboxConfig.zoom.min,
        this.transform.scale - LightboxConfig.zoom.step
      );
      this.transform.scale = newScale;
      this.applyTransform();
    },

    resetZoom: function() {
      this.transform.scale = 1;
      this.applyTransform();
    },

    // 旋转方法
    rotate: function(degrees) {
      this.transform.rotate += degrees;
      this.applyTransform();
    },

    resetTransform: function() {
      this.transform = { scale: 1, rotate: 0, translateX: 0, translateY: 0 };
      this.applyTransform();
    },

    applyTransform: function() {
      const { scale, rotate, translateX, translateY } = this.transform;
      this.imageElement.style.transform = `
        scale(${scale})
        rotate(${rotate}deg)
        translate(${translateX}px, ${translateY}px)
      `;
    },

    toggleFullscreen: function() {
      if (!document.fullscreenElement) {
        this.element.requestFullscreen().catch(err => {
          console.log('全屏失败:', err);
        });
      } else {
        document.exitFullscreen();
      }
    },

    download: function() {
      const link = document.createElement('a');
      link.href = this.imageElement.src;
      link.download = this.imageElement.alt || 'image';
      link.click();
    },

    show: function() {
      this.element.classList.add('zt-lightbox-open');
      document.body.style.overflow = 'hidden';
    },

    hide: function() {
      this.element.classList.remove('zt-lightbox-open');
      document.body.style.overflow = '';

      // 清理事件监听
      if (this.handleEscape) {
        document.removeEventListener('keydown', this.handleEscape);
      }

      this.resetTransform();
    }
  };

  // ==================== 灯箱主系统 ====================
  const Lightbox = {
    isOpen: false,

    open: function(index) {
      if (typeof index === 'string') {
        // 如果传入的是图片 URL
        this.openByUrl(index);
        return;
      }

      const image = ImageCollection.getImage(index);
      if (!image) {
        console.warn('图片不存在:', index);
        return;
      }

      ImageCollection.currentIndex = index;

      // 创建 UI
      LightboxUI.create();

      // 加载图片
      LightboxUI.loadImage(image.src).then(() => {
        LightboxUI.updateCaption(image.caption);
        LightboxUI.updateCounter();
        LightboxUI.updateNavButtons();
        LightboxUI.show();
        this.isOpen = true;

        // 播报打开状态（可访问性）
        if (window.ztAnnounceToScreenReader) {
          ztAnnounceToScreenReader(
            `图片查看器已打开，${image.title}，${ImageCollection.images.length}张中的${index + 1}张`,
            'polite'
          );
        }
      }).catch(() => {
        console.error('图片加载失败:', image.src);
        if (window.ztNotify) {
          ztNotify({
            type: 'error',
            message: '图片加载失败',
            duration: 3000
          });
        }
      });
    },

    openByUrl: function(url) {
      LightboxUI.create();

      LightboxUI.loadImage(url).then(() => {
        LightboxUI.show();
        this.isOpen = true;
      }).catch(() => {
        console.error('图片加载失败:', url);
      });
    },

    close: function() {
      if (!this.isOpen) return;

      LightboxUI.hide();
      this.isOpen = false;

      // 播报关闭状态（可访问性）
      if (window.ztAnnounceToScreenReader) {
        ztAnnounceToScreenReader('图片查看器已关闭', 'polite');
      }
    },

    next: function() {
      if (!ImageCollection.hasNext()) return;

      const nextIndex = ImageCollection.getNextIndex();
      this.open(nextIndex);
    },

    prev: function() {
      if (!ImageCollection.hasPrev()) return;

      const prevIndex = ImageCollection.getPrevIndex();
      this.open(prevIndex);
    },

    toggle: function() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open(0);
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.lightbox = Lightbox;
  ZootopiaCore.lightboxUI = LightboxUI;
  ZootopiaCore.imageCollection = ImageCollection;
  ZootopiaCore.lightboxConfig = LightboxConfig;

  // ==================== 全局 API ====================
  // 打开灯箱
  window.ztOpenLightbox = (srcOrIndex) => Lightbox.open(srcOrIndex);

  // 关闭灯箱
  window.ztCloseLightbox = () => Lightbox.close();

  // 下一张图片
  window.ztNextImage = () => Lightbox.next();

  // 上一张图片
  window.ztPrevImage = () => Lightbox.prev();

  // 切换灯箱
  window.ztToggleLightbox = () => Lightbox.toggle();

  // 检查灯箱是否打开
  window.ztIsLightboxOpen = () => Lightbox.isOpen;

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    ImageCollection.init();
    console.log('🖼️ 图片灯箱系统已就绪');
  });

})();
