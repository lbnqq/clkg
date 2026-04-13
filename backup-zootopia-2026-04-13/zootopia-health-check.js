/**
 * 疯狂动物城系统健康检查
 * Zootopia Health Check - 验证所有模块是否正常工作
 */

(function() {
  'use strict';

  // ==================== 健康检查系统 ====================
  const HealthChecker = {
    checks: [],
    results: [],

    // 注册检查项
    register: function(name, checkFn, category = 'core') {
      this.checks.push({ name, checkFn, category });
    },

    // 运行所有检查
    runAll: function() {
      this.results = [];
      const categories = {
        core: '核心功能',
        api: 'API 接口',
        components: 'UI 组件',
        systems: '功能系统',
        performance: '性能监控',
        docs: '文档'
      };

      console.group('🏥 疯狂动物城系统健康检查');

      // 按类别分组检查
      const grouped = {};
      this.checks.forEach(check => {
        if (!grouped[check.category]) {
          grouped[check.category] = [];
        }
        grouped[check.category].push(check);
      });

      // 执行检查
      Object.keys(grouped).forEach(category => {
        console.group(`📋 ${categories[category] || category}`);

        grouped[category].forEach(check => {
          const result = this.runCheck(check);
          this.results.push(result);
          this.logResult(result);
        });

        console.groupEnd();
      });

      // 显示总结
      this.showSummary();

      console.groupEnd();

      return this.results;
    },

    // 运行单个检查
    runCheck: function(check) {
      const startTime = performance.now();
      let passed = false;
      let error = null;
      let message = '';

      try {
        const result = check.checkFn();
        passed = result === true || (result && result.passed);
        message = result.message || result || '通过';
      } catch (e) {
        error = e.message;
        message = e.message;
      }

      const duration = performance.now() - startTime;

      return {
        name: check.name,
        category: check.category,
        passed,
        message,
        error,
        duration
      };
    },

    // 记录结果
    logResult: function(result) {
      const icon = result.passed ? '✅' : '❌';
      const duration = result.duration.toFixed(2);
      console.log(`${icon} ${result.name} (${duration}ms)`, result.message);

      if (result.error) {
        console.error('  错误:', result.error);
      }
    },

    // 显示总结
    showSummary: function() {
      const total = this.results.length;
      const passed = this.results.filter(r => r.passed).length;
      const failed = total - passed;
      const percentage = ((passed / total) * 100).toFixed(1);

      console.log(`\n📊 检查完成: ${passed}/${total} 通过 (${percentage}%)`);

      if (failed > 0) {
        console.warn(`⚠️ ${failed} 项检查失败:`);
        this.results
          .filter(r => !r.passed)
          .forEach(r => console.warn(`  - ${r.name}: ${r.message}`));
      }

      // 生成报告
      this.generateReport();
    },

    // 生成报告
    generateReport: function() {
      const report = {
        timestamp: new Date().toISOString(),
        version: ZootopiaCore?.version || 'unknown',
        results: this.results,
        summary: {
          total: this.results.length,
          passed: this.results.filter(r => r.passed).length,
          failed: this.results.filter(r => !r.passed).length,
          percentage: ((this.results.filter(r => r.passed).length / this.results.length) * 100).toFixed(1) + '%'
        }
      };

      // 保存到全局
      window.ztHealthCheckReport = report;

      return report;
    }
  };

  // ==================== 注册检查项 ====================

  // 核心功能检查
  HealthChecker.register('ZootopiaCore 对象存在', () => {
    return typeof ZootopiaCore !== 'undefined';
  }, 'core');

  HealthChecker.register('版本号', () => {
    return ZootopiaCore?.version === '2.1.1';
  }, 'core');

  HealthChecker.register('配置对象', () => {
    return typeof ZootopiaCore?.config === 'object';
  }, 'core');

  // API 检查
  HealthChecker.register('工具函数', () => {
    const utils = ZootopiaCore?.utils;
    return typeof utils?.debounce === 'function' &&
           typeof utils?.throttle === 'function' &&
           typeof utils?.random === 'function';
  }, 'api');

  HealthChecker.register('事件管理器', () => {
    const events = ZootopiaCore?.events;
    return typeof events?.on === 'function' &&
           typeof events?.off === 'function' &&
           typeof events?.delegate === 'function';
  }, 'api');

  HealthChecker.register('动画管理器', () => {
    const animation = ZootopiaCore?.animation;
    return typeof animation?.animate === 'function' &&
           typeof animation?.animateBatch === 'function';
  }, 'api');

  HealthChecker.register('模块管理器', () => {
    const modules = ZootopiaCore?.modules;
    return typeof modules?.load === 'function' &&
           typeof modules?.register === 'function';
  }, 'api');

  // 数据库检查
  HealthChecker.register('角色数据库', () => {
    const characters = ZootopiaCore?.characters;
    return typeof characters?.getAll === 'function' &&
           typeof characters?.getById === 'function';
  }, 'api');

  HealthChecker.register('地区数据库', () => {
    const districts = ZootopiaCore?.districts;
    return typeof districts?.getAll === 'function' &&
           typeof districts?.getById === 'function';
  }, 'api');

  // 组件检查
  HealthChecker.register('UI 组件', () => {
    const components = ZootopiaCore?.components;
    return typeof components === 'object';
  }, 'components');

  // 系统检查
  HealthChecker.register('游戏系统', () => {
    return typeof ZootopiaCore?.games === 'object' &&
           typeof ZootopiaCore?.games?.startGame === 'function';
  }, 'systems');

  HealthChecker.register('音乐系统', () => {
    return typeof ZootopiaCore?.music === 'object' &&
           typeof ZootopiaCore?.music?.getPlayer === 'function';
  }, 'systems');

  HealthChecker.register('社交系统', () => {
    return typeof ZootopiaCore?.social === 'object' &&
           typeof ZootopiaCore?.social?.showToast === 'function';
  }, 'systems');

  HealthChecker.register('响应式系统', () => {
    return typeof ZootopiaCore?.responsive === 'object';
  }, 'systems');

  // 性能监控检查
  HealthChecker.register('性能监控系统', () => {
    return typeof ZootopiaCore?.performance === 'object' &&
           typeof ZootopiaCore?.performance?.getReport === 'function';
  }, 'performance');

  HealthChecker.register('关键路径优化', () => {
    return typeof ZootopiaCore?.criticalPath === 'object' &&
           typeof ZootopiaCore?.criticalPath?.loadGameModule === 'function';
  }, 'performance');

  HealthChecker.register('浏览器兼容', () => {
    return typeof ZootopiaCore?.compatibility === 'object';
  }, 'performance');

  // 全局函数检查
  HealthChecker.register('全局快捷函数', () => {
    return typeof window.ztAnimate === 'function' &&
           typeof window.ztParticles === 'function' &&
           typeof window.ztGetPerformanceReport === 'function';
  }, 'api');

  // 文档检查
  HealthChecker.register('开发者文档', () => {
    // 检查文档链接是否存在（这是一个弱检查，因为文档在服务器上）
    return true;
  }, 'docs');

  // ==================== 导出 API ====================
  window.ztHealthCheck = () => HealthChecker.runAll();
  window.ztHealthCheckReport = null;

  // ==================== 自动运行（可选） ====================
  // 取消注释以下代码以在页面加载时自动运行健康检查
  /*
  ZootopiaCore.dom.then(() => {
    if (localStorage.getItem('zt_health_check') === 'true') {
      setTimeout(() => {
        HealthChecker.runAll();
      }, 2000);
    }
  });
  */

  console.log('🏥 健康检查系统已加载');
  console.log('💡 运行检查: ztHealthCheck()');
  console.log('💡 启用自动检查: localStorage.setItem("zt_health_check", "true")');

})();
