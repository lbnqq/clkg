/**
 * 疯狂动物城离线支持系统
 * Zootopia Offline Support - Service Worker、离线缓存、网络检测
 */

(function() {
  'use strict';

  // ==================== 配置 ====================
  const OfflineConfig = {
    // Service Worker 配置
    sw: {
      enabled: true,
      filename: 'sw.js',
      scope: '/',
      updateInterval: 3600000 // 1小时检查更新
    },

    // 缓存策略
    cache: {
      version: 'v2.4.0',
      core: 'zootopia-core-v2.4.0',      // 核心资源
      pages: 'zootopia-pages-v2.4.0',    // 页面
      assets: 'zootopia-assets-v2.4.0',   // 静态资源
      maxAge: 7 * 24 * 60 * 60 * 1000    // 7天过期
    },

    // 离线提示
    notification: {
      show: true,
      duration: 5000,
      position: 'top',
      messages: {
        offline: '🦊 您已离线，部分功能可能受限',
        online: '🐰 网络已恢复',
        cached: '✅ 页面已缓存，可离线访问',
        updated: '🔄 内容已更新'
      }
    },

    // 预缓存资源
    precache: {
      pages: ['/', '/about', '/archives'],
      assets: [
        '/css/zootopia-optimized.css',
        '/js/zootopia-core.js',
        '/js/zootopia-main.js',
        '/img/zootopia/avatar.svg'
      ]
    }
  };

  // ==================== 网络状态检测 ====================
  const NetworkMonitor = {
    isOnline: true,
    wasOffline: false,
    listeners: new Set(),

    init: function() {
      // 初始检测
      this.isOnline = navigator.onLine;

      // 监听网络变化
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());

      // 定期检测（针对某些浏览器不触发事件的情况）
      setInterval(() => {
        const currentStatus = navigator.onLine;
        if (currentStatus !== this.isOnline) {
          this.isOnline = currentStatus;
          if (currentStatus) {
            this.handleOnline();
          } else {
            this.handleOffline();
          }
        }
      }, 30000);

      // 初始化 UI
      this.updateUI();
    },

    handleOnline: function() {
      this.isOnline = true;

      if (this.wasOffline) {
        this.showNotification(OfflineConfig.notification.messages.online, 'success');
        this.wasOffline = false;

        // 同步本地数据
        this.syncData();
      }

      this.updateUI();
      this.notifyListeners('online');
    },

    handleOffline: function() {
      this.isOnline = false;
      this.wasOffline = true;

      this.showNotification(OfflineConfig.notification.messages.offline, 'warning');
      this.updateUI();
      this.notifyListeners('offline');
    },

    updateUI: function() {
      // 更新 body class
      if (this.isOnline) {
        document.body.classList.remove('zt-offline');
        document.body.classList.add('zt-online');
      } else {
        document.body.classList.remove('zt-online');
        document.body.classList.add('zt-offline');
      }

      // 更新离线指示器
      this.updateIndicator();
    },

    updateIndicator: function() {
      let indicator = document.getElementById('zt-offline-indicator');

      if (!this.isOnline) {
        if (!indicator) {
          indicator = document.createElement('div');
          indicator.id = 'zt-offline-indicator';
          indicator.className = 'zt-offline-indicator';
          indicator.innerHTML = `
            <div class="zt-offline-icon">🦊</div>
            <div class="zt-offline-text">离线模式</div>
          `;
          document.body.appendChild(indicator);
        }
        indicator.style.display = 'flex';
      } else if (indicator) {
        indicator.style.display = 'none';
      }
    },

    showNotification: function(message, type) {
      if (!OfflineConfig.notification.show) return;

      if (window.ztNotify) {
        ztNotify({
          type: type,
          message: message,
          duration: OfflineConfig.notification.duration
        });
      } else {
        // 降级方案
        console.log(`[离线提示] ${message}`);
      }
    },

    syncData: function() {
      // 触发数据同步事件
      const event = new CustomEvent('zt-offline-sync', {
        detail: { timestamp: Date.now() }
      });
      window.dispatchEvent(event);
    },

    // 监听网络状态变化
    onChange: function(callback) {
      this.listeners.add(callback);
      return () => this.listeners.delete(callback);
    },

    notifyListeners: function(status) {
      this.listeners.forEach(callback => {
        try {
          callback(status);
        } catch (e) {
          console.error('网络状态监听器错误:', e);
        }
      });
    },

    getStatus: function() {
      return {
        online: this.isOnline,
        wasOffline: this.wasOffline,
        effectiveType: navigator.connection?.effectiveType || 'unknown',
        downlink: navigator.connection?.downlink || null,
        rtt: navigator.connection?.rtt || null
      };
    }
  };

  // ==================== Service Worker 管理 ====================
  const ServiceWorkerManager = {
    registration: null,
    isSupported: 'serviceWorker' in navigator,

    init: function() {
      if (!this.isSupported) {
        console.warn('Service Worker 不支持');
        return;
      }

      // 注册 Service Worker
      this.register();

      // 监听更新
      this.setupUpdateListener();
    },

    register: function() {
      if (!OfflineConfig.sw.enabled) return;

      navigator.serviceWorker.register(OfflineConfig.sw.filename, {
        scope: OfflineConfig.sw.scope
      })
        .then(registration => {
          this.registration = registration;
          console.log('✅ Service Worker 已注册');

          // 检查更新
          this.checkForUpdates();
        })
        .catch(error => {
          console.error('❌ Service Worker 注册失败:', error);
        });
    },

    setupUpdateListener: function() {
      // 监听 Service Worker 更新
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      // 定期检查更新
      setInterval(() => {
        this.checkForUpdates();
      }, OfflineConfig.sw.updateInterval);
    },

    checkForUpdates: function() {
      if (!this.registration) return;

      this.registration.update().catch(error => {
        // 静默失败
      });
    },

    update: function() {
      if (!this.registration) {
        console.warn('Service Worker 未注册');
        return Promise.reject(new Error('未注册'));
      }

      // 通知等待中的 Service Worker
      if (this.registration.waiting) {
        this.registration.waiting.postMessage('skipWaiting');
        return Promise.resolve();
      }

      return this.registration.update();
    },

    getMessageClient: function() {
      return new Promise((resolve, reject) => {
        if (this.registration && this.registration.active) {
          resolve(this.registration.active);
        } else {
          navigator.serviceWorker.ready.then(resolve).catch(reject);
        }
      });
    },

    // 发送消息到 Service Worker
    postMessage: function(message) {
      return this.getMessageClient().then(client => {
        client.postMessage(message);
      });
    },

    // 清除缓存
    clearCache: function() {
      return this.postMessage({
        type: 'CLEAR_CACHE',
        version: OfflineConfig.cache.version
      });
    },

    // 预缓存资源
    precache: function(urls) {
      return this.postMessage({
        type: 'PRECACHE',
        urls: urls
      });
    }
  };

  // ==================== 缓存管理 ====================
  const CacheManager = {
    // 获取缓存大小
    getCacheSize: function() {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        return navigator.storage.estimate().then(estimate => {
          return {
            usage: estimate.usage || 0,
            quota: estimate.quota || 0,
            percentage: estimate.quota ? ((estimate.usage / estimate.quota) * 100).toFixed(2) : 0
          };
        });
      }
      return Promise.resolve({
        usage: 0,
        quota: 0,
        percentage: 0
      });
    },

    // 清除旧缓存
    clearOldCaches: function() {
      if (!window.caches) return Promise.resolve();

      return caches.keys().then(cacheNames => {
        const currentCaches = [
          OfflineConfig.cache.core,
          OfflineConfig.cache.pages,
          OfflineConfig.cache.assets
        ];

        return Promise.all(
          cacheNames
            .filter(name => !currentCaches.includes(name))
            .map(name => caches.delete(name))
        );
      });
    },

    // 缓存当前页面
    cacheCurrentPage: function() {
      if (!window.caches) return Promise.resolve();

      const url = window.location.href;

      return caches.open(OfflineConfig.cache.pages).then(cache => {
        return cache.match(url).then(response => {
          if (!response) {
            return cache.add(url);
          }
        });
      });
    }
  };

  // ==================== 离线降级方案 ====================
  const GracefulDegradation = {
    // 检查功能可用性
    checkFeatures: function() {
      const features = {
        serviceWorker: 'serviceWorker' in navigator,
        cache: 'caches' in window,
        storage: 'localStorage' in window,
        indexedDB: 'indexedDB' in window,
        online: navigator.onLine
      };

      this.applyFallbacks(features);
      return features;
    },

    // 应用降级方案
    applyFallbacks: function(features) {
      // Service Worker 不支持时的降级
      if (!features.serviceWorker) {
        console.warn('⚠️ Service Worker 不支持，使用 LocalStorage 降级方案');
        this.enableLocalStorageFallback();
      }

      // 离线时的降级
      if (!features.online) {
        this.enableOfflineMode();
      }
    },

    // LocalStorage 降级方案
    enableLocalStorageFallback: function() {
      // 使用 LocalStorage 存储关键数据
      try {
        const cacheData = {
          timestamp: Date.now(),
          url: window.location.href,
          title: document.title
        };

        localStorage.setItem('zt_offline_fallback', JSON.stringify(cacheData));
      } catch (e) {
        console.warn('LocalStorage 不可用');
      }
    },

    // 启用离线模式
    enableOfflineMode: function() {
      // 禁用需要网络的功能
      const networkDependent = [
        'zt-search',
        'zt-share',
        'zt-comments'
      ];

      networkDependent.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.classList.add('zt-offline-disabled');
          element.setAttribute('aria-disabled', 'true');
        }
      });

      // 显示离线提示
      this.showOfflineBanner();
    },

    showOfflineBanner: function() {
      let banner = document.getElementById('zt-offline-banner');

      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'zt-offline-banner';
        banner.className = 'zt-offline-banner';
        banner.innerHTML = `
          <div class="zt-offline-banner-content">
            <span class="zt-offline-banner-icon">🦊</span>
            <span class="zt-offline-banner-text">离线模式 - 部分功能可能受限</span>
            <button class="zt-offline-banner-close" aria-label="关闭">×</button>
          </div>
        `;

        const closeBtn = banner.querySelector('.zt-offline-banner-close');
        closeBtn.addEventListener('click', () => {
          banner.style.display = 'none';
        });

        document.body.appendChild(banner);
      }

      banner.style.display = 'flex';
    }
  };

  // ==================== 后台同步 ====================
  const BackgroundSync = {
    // 注册同步事件
    register: function(tag) {
      if (!ServiceWorkerManager.registration) return;

      ServiceWorkerManager.registration.sync.register(tag)
        .then(() => console.log(`✅ 后台同步已注册: ${tag}`))
        .catch(error => console.warn(`⚠️ 后台同步注册失败: ${tag}`, error));
    },

    // 同步表单数据
    syncFormData: function(data) {
      // 存储到 IndexedDB
      return this.storeData('form-data', data).then(() => {
        // 注册后台同步
        this.register('sync-form-data');
      });
    },

    // 存储数据到 IndexedDB
    storeData: function(store, data) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('ZootopiaOfflineDB', 1);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction([store], 'readwrite');
          const objectStore = transaction.objectStore(store);
          objectStore.add(data);
          transaction.oncomplete = () => resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
          }
        };
      });
    }
  };

  // ==================== 离线支持主系统 ====================
  const OfflineSupport = {
    initialized: false,

    init: function() {
      if (this.initialized) return;

      // 初始化各个模块
      NetworkMonitor.init();
      GracefulDegradation.checkFeatures();

      if (ServiceWorkerManager.isSupported) {
        ServiceWorkerManager.init();
      }

      // 监听 DOM 准备好
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
      } else {
        this.onDOMReady();
      }

      this.initialized = true;
      console.log('📴 离线支持系统已就绪');
    },

    onDOMReady: function() {
      // 预缓存当前页面
      CacheManager.cacheCurrentPage();

      // 监听链接点击，预缓存
      this.setupLinkPrefetch();

      // 页面隐藏时预缓存
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          CacheManager.cacheCurrentPage();
        }
      });
    },

    setupLinkPrefetch: function() {
      // 监听内部链接点击
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;

        const href = link.getAttribute('href');

        // 只处理内部链接
        if (href.startsWith('/') || href.startsWith(window.location.origin)) {
          if (ServiceWorkerManager.isSupported) {
            // 通知 Service Worker 预缓存
            ServiceWorkerManager.postMessage({
              type: 'PRECACHE',
              urls: [href]
            });
          }
        }
      });
    },

    // 获取状态
    getStatus: function() {
      return {
        network: NetworkMonitor.getStatus(),
        serviceWorker: {
          supported: ServiceWorkerManager.isSupported,
          registered: !!ServiceWorkerManager.registration,
          controlled: !!navigator.serviceWorker.controller
        },
        cache: CacheManager.getCacheSize()
      };
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.offlineSupport = OfflineSupport;
  ZootopiaCore.networkMonitor = NetworkMonitor;
  ZootopiaCore.serviceWorker = ServiceWorkerManager;
  ZootopiaCore.cacheManager = CacheManager;
  ZootopiaCore.offlineConfig = OfflineConfig;

  // ==================== 全局 API ====================
  // 获取离线状态
  window.ztGetOfflineStatus = () => OfflineSupport.getStatus();

  // 获取网络状态
  window.ztGetNetworkStatus = () => NetworkMonitor.getStatus();

  // 检查是否在线
  window.ztIsOnline = () => NetworkMonitor.isOnline;

  // 更新 Service Worker
  window.ztUpdateServiceWorker = () => ServiceWorkerManager.update();

  // 清除缓存
  window.ztClearOfflineCache = () => ServiceWorkerManager.clearCache();

  // 获取缓存大小
  window.ztGetCacheSize = () => CacheManager.getCacheSize();

  // 预缓存资源
  window.ztPrecacheResources = (urls) => ServiceWorkerManager.precache(urls);

  // 监听网络状态变化
  window.ztOnNetworkChange = (callback) => NetworkMonitor.onChange(callback);

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    OfflineSupport.init();
  });

})();
