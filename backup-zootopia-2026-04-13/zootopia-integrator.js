/**
 * 疯狂动物城系统整合器
 * Zootopia System Integrator - 统一管理所有子系统
 */

(function() {
  'use strict';

  // ==================== 系统注册表 ====================
  const SystemRegistry = {
    systems: new Map(),
    dependencies: new Map(),
    status: new Map(),

    // 注册系统
    register: function(name, config) {
      const system = {
        name: name,
        version: config.version || '1.0.0',
        enabled: config.enabled !== false,
        priority: config.priority || 5,
        dependencies: config.dependencies || [],
        init: config.init,
        status: 'pending'
      };

      this.systems.set(name, system);

      // 记录依赖
      if (system.dependencies.length > 0) {
        this.dependencies.set(name, system.dependencies);
      }

      console.log(`📦 系统已注册: ${name} v${system.version}`);
    },

    // 获取系统
    get: function(name) {
      return this.systems.get(name);
    },

    // 获取所有系统
    getAll: function() {
      return Array.from(this.systems.values());
    },

    // 获取启用的系统
    getEnabled: function() {
      return this.getAll().filter(system => system.enabled);
    },

    // 获取系统状态
    getStatus: function(name) {
      return this.status.get(name) || 'unknown';
    },

    // 更新系统状态
    setStatus: function(name, status) {
      this.status.set(name, status);
    }
  };

  // ==================== 初始化管理器 ====================
  const InitManager = {
    queue: [],
    initialized: new Set(),
    failed: [],

    // 规划初始化顺序
    plan: function() {
      const systems = SystemRegistry.getEnabled();

      // 按优先级排序
      systems.sort((a, b) => a.priority - b.priority);

      // 构建依赖图
      const graph = this.buildDependencyGraph(systems);

      // 拓扑排序（检测循环依赖）
      const ordered = this.topologicalSort(graph);

      this.queue = ordered;

      console.log(`📋 初始化计划: ${ordered.join(' → ')}`);
    },

    buildDependencyGraph: function(systems) {
      const graph = {};

      systems.forEach(system => {
        graph[system.name] = system.dependencies || [];
      });

      return graph;
    },

    topologicalSort: function(graph) {
      const sorted = [];
      const visited = new Set();
      const temp = new Set();

      const visit = (node) => {
        if (temp.has(node)) {
          throw new Error(`检测到循环依赖: ${node}`);
        }
        if (visited.has(node)) return;

        temp.add(node);
        visited.add(node);

        (graph[node] || []).forEach(dep => {
          if (SystemRegistry.get(dep)?.enabled) {
            visit(dep);
          }
        });

        sorted.push(node);
        temp.delete(node);
      };

      Object.keys(graph).forEach(node => {
        if (SystemRegistry.get(node)?.enabled) {
          visit(node);
        }
      });

      return sorted;
    },

    // 执行初始化
    execute: async function() {
      if (this.queue.length === 0) {
        this.plan();
      }

      console.log(`🚀 开始初始化 ${this.queue.length} 个系统...`);

      for (const systemName of this.queue) {
        const system = SystemRegistry.get(systemName);
        if (!system) continue;

        try {
          SystemRegistry.setStatus(systemName, 'initializing');

          if (system.init && typeof system.init === 'function') {
            await system.init();
          }

          SystemRegistry.setStatus(systemName, 'ready');
          this.initialized.add(systemName);

          console.log(`✅ ${systemName} 已就绪`);
        } catch (error) {
          SystemRegistry.setStatus(systemName, 'failed');
          this.failed.push({ name: systemName, error });

          console.error(`❌ ${systemName} 初始化失败:`, error);
        }
      }

      this.report();
    },

    // 报告初始化结果
    report: function() {
      const total = this.queue.length;
      const success = this.initialized.size;
      const failed = this.failed.length;

      console.group('📊 系统初始化报告');
      console.log(`总计: ${total} 个`);
      console.log(`成功: ${success} 个 ✅`);
      console.log(`失败: ${failed.length} 个 ❌`);

      if (failed.length > 0) {
        console.group('失败的系统');
        failed.forEach(({ name, error }) => {
          console.error(`${name}:`, error);
        });
        console.groupEnd();
      }

      console.groupEnd();

      // 显示进度百分比
      const percentage = Math.round((success / total) * 100);
      console.log(`初始化完成度: ${percentage}%`);
    }
  };

  // ==================== 系统通信器 ====================
  const SystemCommunicator = {
    channels: new Map(),
    listeners: new Map(),

    // 创建频道
    createChannel: function(name) {
      if (!this.channels.has(name)) {
        this.channels.set(name, []);
      }
      return this.channels.get(name);
    },

    // 订阅频道
    subscribe: function(channel, callback) {
      if (!this.listeners.has(channel)) {
        this.listeners.set(channel, []);
      }
      this.listeners.get(channel).push(callback);
    },

    // 发布消息
    publish: function(channel, message) {
      // 记录到日志
      console.log(`📡 [${channel}]`, message);

      // 通知订阅者
      const listeners = this.listeners.get(channel) || [];
      listeners.forEach(callback => {
        try {
          callback(message);
        } catch (e) {
          console.error(`频道 ${channel} 监听器错误:`, e);
        }
      });

      // 系统间通信
      this.notifySystems(channel, message);
    },

    // 通知相关系统
    notifySystems: function(channel, message) {
      SystemRegistry.getEnabled().forEach(system => {
        if (system.onMessage && typeof system.onMessage === 'function') {
          try {
            system.onMessage(channel, message);
          } catch (e) {
            console.error(`系统 ${system.name} 消息处理错误:`, e);
          }
        }
      });
    }
  };

  // ==================== 配置管理器 ====================
  const ConfigManager = {
    globalConfig: {},

    init: function() {
      this.loadGlobalConfig();
      this.setupConfigWatcher();
    },

    loadGlobalConfig: function() {
      try {
        const saved = localStorage.getItem('zt_global_config');
        if (saved) {
          this.globalConfig = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('加载全局配置失败，使用默认配置');
      }
    },

    saveGlobalConfig: function() {
      try {
        localStorage.setItem('zt_global_config', JSON.stringify(this.globalConfig));
      } catch (e) {
        console.warn('保存全局配置失败:', e);
      }
    },

    setupConfigWatcher: function() {
      // 监听配置变化
      window.addEventListener('zt-config-changed', (e) => {
        this.mergeConfig(e.detail.config);
      });
    },

    mergeConfig: function(newConfig) {
      Object.assign(this.globalConfig, newConfig);
      this.saveGlobalConfig();
      SystemCommunicator.publish('config-updated', this.globalConfig);
    },

    get: function(key) {
      return this.globalConfig[key];
    },

    set: function(key, value) {
      this.globalConfig[key] = value;
      this.saveGlobalConfig();

      SystemCommunicator.publish('config-changed', {
        key,
        value
      });
    }
  };

  // ==================== 性能监控器 ====================
  const PerformanceMonitor = {
    metrics: {
      init: [],
      ready: []
    },

    startMeasure: function(name) {
      const start = performance.now();
      this.metrics[name] = this.metrics[name] || [];
      this.metrics[name].push({ start, end: null });
    },

    endMeasure: function(name) {
      const end = performance.now();
      const records = this.metrics[name];

      if (records && records.length > 0) {
        const last = records[records.length - 1];
        if (last && !last.end) {
          last.end = end;

          const duration = end - last.start;
          console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
        }
      }
    },

    measure: async function(name, fn) {
      this.startMeasure(name);
      const result = await fn();
      this.endMeasure(name);
      return result;
    },

    getMetrics: function() {
      const metrics = {};

      Object.entries(this.metrics).forEach(([name, records]) => {
        const completed = records.filter(r => r.end !== null);
        const durations = completed.map(r => r.end - r.start);

        metrics[name] = {
          count: completed.length,
          total: durations.reduce((a, b) => a + b, 0),
          average: durations.reduce((a, b) => a + b, 0) / durations.length,
          min: Math.min(...durations),
          max: Math.max(...durations)
        };
      });

      return metrics;
    },

    report: function() {
      console.group('📊 性能监控报告');
      const metrics = this.getMetrics();

      Object.entries(metrics).forEach(([name, data]) => {
        console.log(`${name}:`, data);
      });

      console.groupEnd();
    }
  };

  // ==================== 系统健康检查器 ====================
  const HealthChecker = {
    checks: [],

    registerCheck: function(name, checkFn) {
      this.checks.push({ name, check: checkFn });
    },

    runAllChecks: async function() {
      console.log('🏥 开始系统健康检查...');

      const results = [];

      for (const check of this.checks) {
        try {
          const result = await check.check();
          results.push({
            name: check.name,
            status: result.success ? 'pass' : 'fail',
            result: result
          });

          if (!result.success) {
            console.warn(`⚠️ ${check.name}: ${result.message}`);
          }
        } catch (error) {
          results.push({
            name: check.name,
            status: 'error',
            error: error
          });
          console.error(`❌ ${check.name} 检查出错:`, error);
        }
      }

      this.report(results);
      return results;
    },

    report: function(results) {
      const passed = results.filter(r => r.status === 'pass').length;
      const failed = results.filter(r => r.status === 'fail').length;
      const errors = results.filter(r => r.status === 'error').length;

      console.group('🏥 系统健康检查报告');
      console.log(`总计: ${results.length} 项检查`);
      console.log(`通过: ${passed} 项 ✅`);
      console.log(`失败: ${failed} 项 ⚠️`);
      console.log(`错误: ${errors} 项 ❌`);

      if (failed > 0) {
        console.group('失败的检查');
        results.filter(r => r.status === 'fail').forEach(r => {
          console.warn(`- ${r.name}: ${r.result.message}`);
        });
        console.groupEnd();
      }

      if (errors > 0) {
        console.group('出错的检查');
        results.filter(r => r.status === 'error').forEach(r => {
          console.error(`- ${r.name}: ${r.error.message}`);
        });
        console.groupEnd();
      }

      console.groupEnd();

      const healthScore = Math.round(((results.length - failed - errors) / results.length) * 100);
      console.log(`健康评分: ${healthScore}%`);
    }
  };

  // ==================== 系统整合器主系统 ====================
  const SystemIntegrator = {
    initialized: false,

    init: function() {
      if (this.initialized) return;

      console.log('🔧 疯狂动物城系统整合器初始化...');

      // 注册所有子系统
      this.registerAllSystems();

      // 初始化配置管理器
      ConfigManager.init();

      // 注册健康检查
      this.setupHealthChecks();

      // 监听性能
      this.setupPerformanceMonitoring();

      // 创建全局快捷键
      this.setupGlobalShortcuts();

      this.initialized = true;
      console.log('✅ 系统整合器已就绪');
    },

    registerAllSystems: function() {
      // 核心系统
      this.registerSystem('core', {
        priority: 1,
        dependencies: []
      });

      // 基础功能系统
      this.registerSystem('components', {
        priority: 2,
        dependencies: ['core']
      });

      this.registerSystem('animations', {
        priority: 2,
        dependencies: ['core']
      });

      this.registerSystem('responsive', {
        priority: 2,
        dependencies: ['core']
      });

      // 功能系统
      this.registerSystem('games', {
        priority: 3,
        dependencies: ['core']
      });

      this.registerSystem('social', {
        priority: 3,
        dependencies: ['core']
      });

      this.registerSystem('music', {
        priority: 3,
        dependencies: ['core']
      });

      this.registerSystem('search', {
        priority: 3,
        dependencies: ['core']
      });

      // 数据系统
      this.registerSystem('storage', {
        priority: 2,
        dependencies: ['core']
      });

      // 用户体验系统
      this.registerSystem('loader', {
        priority: 2,
        dependencies: ['core']
      });

      this.registerSystem('notification', {
        priority: 3,
        dependencies: ['loader']
      });

      this.registerSystem('transitions', {
        priority: 3,
        dependencies: ['loader']
      });

      this.registerSystem('mobile', {
        priority: 3,
        dependencies: ['responsive']
      });

      // 智能系统
      this.registerSystem('preloader', {
        priority: 4,
        dependencies: ['core']
      });

      this.registerSystem('settings', {
        priority: 4,
        dependencies: ['storage']
      });

      this.registerSystem('error-boundary', {
        priority: 2,
        dependencies: ['core']
      });

      this.registerSystem('animation-queue', {
        priority: 4,
        dependencies: ['animations']
      });

      // 可靠性系统
      this.registerSystem('offline', {
        priority: 5,
        dependencies: ['core']
      });

      this.registerSystem('accessibility', {
        priority: 5,
        dependencies: ['core']
      });

      this.registerSystem('performance-dashboard', {
        priority: 5,
        dependencies: ['performance']
      });

      // 阅读体验系统
      this.registerSystem('reading-progress', {
        priority: 4,
        dependencies: ['core']
      });

      this.registerSystem('toc', {
        priority: 4,
        dependencies: ['reading-progress']
      });

      this.registerSystem('lightbox', {
        priority: 4,
        dependencies: ['core']
      });

      this.registerSystem('reading-mode', {
        priority: 4,
        dependencies: ['core']
      });

      this.registerSystem('code-enhancement', {
        priority: 5,
        dependencies: ['core']
      });
    },

    registerSystem: function(name, config) {
      // 获取系统的初始化函数
      const initFn = this.getSystemInit(name);
      if (initFn) {
        config.init = initFn;
      }

      SystemRegistry.register(name, config);
    },

    getSystemInit: function(systemName) {
      // 从 ZootopiaCore 获取初始化函数
      const systemMap = {
        'core': () => {
          // Core 系统已初始化
          return Promise.resolve();
        },
        'components': () => {
          if (ZootopiaCore.components) {
            return Promise.resolve();
          }
          return this.lazyLoad('/js/zootopia-components.js');
        },
        'animations': () => {
          if (ZootopiaCore.animation) {
            return Promise.resolve();
          }
          return this.lazyLoad('/js/zootopia-animations.js');
        },
        // ... 其他系统
      };

      return systemMap[systemName];
    },

    lazyLoad: function(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },

    setupHealthChecks: function() {
      // 注册基础检查
      HealthChecker.registerCheck('LocalStorage', async () => {
        try {
          localStorage.setItem('zt-test', 'test');
          localStorage.removeItem('zt-test');
          return { success: true };
        } catch (e) {
          return {
            success: false,
            message: 'LocalStorage 不可用'
          };
        }
      });

      HealthChecker.registerCheck('SessionStorage', async () => {
        try {
          sessionStorage.setItem('zt-test', 'test');
          sessionStorage.removeItem('zt-test');
          return { success: true };
        } catch (e) {
          return {
            success: false,
            message: 'SessionStorage 不可用'
          };
        }
      });

      HealthChecker.registerCheck('IntersectionObserver', async () => {
        if ('IntersectionObserver' in window) {
          return { success: true };
        }
        return {
          success: false,
          message: 'IntersectionObserver 不支持'
        };
      });

      HealthChecker.registerCheck('Fetch', async () => {
        if ('fetch' in window) {
          return { success: true };
        }
        return {
          success: false,
          message: 'Fetch API 不支持'
        };
      });

      HealthChecker.registerCheck('ServiceWorker', async () => {
        if ('serviceWorker' in navigator) {
          return { success: true };
        }
        return {
          success: false,
          message: 'ServiceWorker 不支持'
        };
      });
    },

    setupPerformanceMonitoring: function() {
      // 页面加载性能
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.reportPagePerformance();
        }, 1000);
      });

      // 定期报告
      setInterval(() => {
        this.reportMemoryUsage();
      }, 30000); // 每30秒
    },

    reportPagePerformance: function() {
      if (!('performance' in window)) return;

      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;

      console.log('📄 页面加载性能:', pageLoadTime + 'ms');

      if (pageLoadTime < 1000) {
        console.log('✅ 加载速度优秀');
      } else if (pageLoadTime < 2000) {
        console.log('⚠️ 加载速度良好');
      } else {
        console.log('❌ 加载速度需优化');
      }
    },

    reportMemoryUsage: function() {
      if (!performance.memory) return;

      const usedMB = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
      const totalMB = (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
      const percentage = ((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100).toFixed(1);

      if (percentage > 80) {
        console.warn(`⚠️ 内存使用: ${usedMB}MB / ${totalMB}MB (${percentage}%)`);
      }
    },

    setupGlobalShortcuts: function() {
      // Ctrl/Cmd + Shift + H: 显示帮助
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
          e.preventDefault();
          this.showHelp();
        }
      });

      // F1: 帮助
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F1') {
          e.preventDefault();
          this.showHelp();
        }
      });
    },

    showHelp: function() {
      const systems = SystemRegistry.getAll();
      const enabled = SystemRegistry.getEnabled();

      console.group('🦊 疯狂动物城博客系统帮助');
      console.log('版本:', ZootopiaCore.version);
      console.log(`已注册系统: ${systems.length} 个`);
      console.log(`已启用: ${enabled.length} 个`);
      console.log('');

      console.log('快捷键:');
      console.log('Ctrl/Cmd + Shift + H - 显示此帮助');
      console.log('F1 - 显示此帮助');
      console.log('Ctrl/Cmd + K - 搜索');
      console.log('Alt + M - 切换主题');
      console.log('');

      console.log('全局命令:');
      console.log('ztHealthCheck() - 运行健康检查');
      console.log('ztGetSystemStatus() - 获取系统状态');
      console.log('ztOptimize() - 运行优化');
      console.log('');

      console.log('API 前缀: zt');
      console.log('例如: ztOpenSearch(), ztToggleTheme()');
      console.groupEnd();

      if (window.ztNotify) {
        ztNotify({
          type: 'info',
          message: '帮助信息已输出到控制台',
          duration: 3000
        });
      }
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.integrator = SystemIntegrator;
  ZootopiaCore.registry = SystemRegistry;
  ZootopiaCore.initManager = InitManager;
  ZootopiaCore.communicator = SystemCommunicator;
  ZootopiaCore.configManager = ConfigManager;
  ZootopiaCore.performanceMonitor = PerformanceMonitor;
  ZootopiaCore.healthChecker = HealthChecker;

  // ==================== 全局 API ====================
  // 初始化所有系统
  window.ZootopiaInit = async () => {
    await SystemIntegrator.init();
    await InitManager.execute();
  };

  // 获取系统状态
  window.ztGetSystemStatus = () => {
    const systems = SystemRegistry.getAll();
    return systems.map(system => ({
      name: system.name,
      version: system.version,
      enabled: system.enabled,
      status: SystemRegistry.getStatus(system.name)
    }));
  };

  // 运行优化
  window.ztOptimize = async () => {
    console.log('🔧 开始系统优化...');
    // 优化逻辑
    SystemCommunicator.publish('optimize-request', {});
  };

  // 运行健康检查
  window.ztHealthCheck = async () => {
    return await HealthChecker.runAllChecks();
  };

  // 获取性能报告
  window.ztGetPerformanceReport = () => {
    return PerformanceMonitor.getMetrics();
  };

  // 显示帮助
  window.ztShowHelp = () => {
    SystemIntegrator.showHelp();
  };

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    SystemIntegrator.init();
  });

})();
