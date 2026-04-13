/**
 * 疯狂动物城 Service Worker
 * Zootopia Service Worker - 离线缓存、资源管理、后台同步
 */

// 缓存版本
const CACHE_VERSION = 'v2.4.0';

// 缓存名称
const CACHE_NAMES = {
  core: `zootopia-core-${CACHE_VERSION}`,
  pages: `zootopia-pages-${CACHE_VERSION}`,
  assets: `zootopia-assets-${CACHE_VERSION}`,
  fonts: `zootopia-fonts-${CACHE_VERSION}`
};

// 需要预缓存的核心资源
const PRECACHE_CORE = [
  '/',
  '/css/zootopia-optimized.css',
  '/css/zootopia-components.css',
  '/css/zootopia-animations.css',
  '/js/zootopia-core.js',
  '/js/zootopia-main.js',
  '/js/zootopia-components.js',
  '/js/zootopia-animations.js',
  '/js/zootopia-responsive.js',
  '/img/zootopia/avatar.svg'
];

// 需要网络优先的资源
const NETWORK_FIRST = [
  '/api/',
  '/search',
  '/comments'
];

// 需要缓存优先的资源
const CACHE_FIRST = [
  '.css',
  '.js',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf'
];

// 安装事件
self.addEventListener('install', (event) => {
  console.log('🦊 Service Worker 安装中...');

  event.waitUntil(
    caches.open(CACHE_NAMES.core)
      .then((cache) => {
        console.log('📦 预缓存核心资源...');
        return cache.addAll(PRECACHE_CORE);
      })
      .then(() => {
        console.log('✅ Service Worker 安装完成');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker 安装失败:', error);
      })
  );
});

// 激活事件
self.addEventListener('activate', (event) => {
  console.log('🦊 Service Worker 激活中...');

  event.waitUntil(
    Promise.all([
      // 清除旧缓存
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return !Object.values(CACHE_NAMES).includes(cacheName);
            })
            .map((cacheName) => {
              console.log('🗑️ 清除旧缓存:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // 立即控制所有页面
      self.clients.claim()
    ])
      .then(() => {
        console.log('✅ Service Worker 激活完成');
      })
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源请求
  if (url.origin !== self.location.origin) {
    return;
  }

  // 跳过 Chrome 扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // 根据请求类型选择策略
  if (request.method !== 'GET') {
    return; // 只处理 GET 请求
  }

  // API 请求 - 网络优先
  if (NETWORK_FIRST.some(pattern => url.pathname.startsWith(pattern))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // 静态资源 - 缓存优先
  if (CACHE_FIRST.some(pattern => url.pathname.endsWith(pattern))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // 页面请求 - 网络优先，失败时返回缓存页面
  if (request.mode === 'navigate') {
    event.respondWith(pageStrategy(request));
    return;
  }

  // 其他请求 - 网络优先
  event.respondWith(networkFirstStrategy(request));
});

// ==================== 缓存策略 ====================

// 网络优先策略
async function networkFirstStrategy(request) {
  try {
    // 尝试从网络获取
    const networkResponse = await fetch(request);

    // 检查是否是有效响应
    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
      return networkResponse;
    }

    // 缓存响应
    const cache = await getCacheForRequest(request);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    // 网络失败，尝试从缓存获取
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('📴 从缓存加载:', request.url);
      return cachedResponse;
    }

    // 返回离线页面
    return getOfflineResponse(request);
  }
}

// 缓存优先策略
async function cacheFirstStrategy(request) {
  // 先从缓存获取
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  // 缓存中没有，从网络获取
  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const cache = await getCacheForRequest(request);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('❌ 资源加载失败:', request.url);
    return getOfflineResponse(request);
  }
}

// 页面策略
async function pageStrategy(request) {
  try {
    // 先尝试网络
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAMES.pages);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // 网络失败，从缓存获取
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      console.log('📴 从缓存加载页面:', request.url);
      return cachedResponse;
    }

    // 返回离线页面
    return caches.match('/offline.html');
  }
}

// ==================== 辅助函数 ====================

// 获取请求对应的缓存
async function getCacheForRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 根据资源类型返回对应缓存
  if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
    return caches.open(CACHE_NAMES.core);
  } else if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    return caches.open(CACHE_NAMES.assets);
  } else if (pathname.match(/\.(woff|woff2|ttf|otf)$/i)) {
    return caches.open(CACHE_NAMES.fonts);
  } else {
    return caches.open(CACHE_NAMES.pages);
  }
}

// 获取离线响应
function getOfflineResponse(request) {
  // 返回一个基本的离线响应
  return new Response(
    JSON.stringify({
      error: 'offline',
      message: '网络连接不可用',
      url: request.url
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// ==================== 消息处理 ====================

self.addEventListener('message', (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'CLEAR_CACHE':
      clearCache();
      break;

    case 'PRECACHE':
      precacheResources(data.urls);
      break;

    default:
      console.log('未知消息类型:', type);
  }
});

// 清除所有缓存
async function clearCache() {
  const cacheNames = await caches.keys();

  await Promise.all(
    cacheNames.map((cacheName) => caches.delete(cacheName))
  );

  console.log('🗑️ 所有缓存已清除');

  // 通知所有客户端
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'CACHE_CLEARED'
    });
  });
}

// 预缓存资源
async function precacheResources(urls) {
  if (!urls || urls.length === 0) return;

  const cache = await caches.open(CACHE_NAMES.pages);
  const results = await Promise.allSettled(
    urls.map((url) => cache.add(url))
  );

  const successCount = results.filter((r) => r.status === 'fulfilled').length;
  console.log(`📦 预缓存完成: ${successCount}/${urls.length}`);
}

// ==================== 后台同步 ====================

self.addEventListener('sync', (event) => {
  console.log('🔄 后台同步:', event.tag);

  if (event.tag === 'sync-form-data') {
    event.waitUntil(syncFormData());
  }
});

// 同步表单数据
async function syncFormData() {
  // 这里可以实现离线表单数据的同步逻辑
  console.log('📝 同步离线表单数据');
}

// ==================== 推送通知 ====================

self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || '/img/zootopia/icon-192.png',
    badge: data.badge || '/img/zootopia/badge-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
