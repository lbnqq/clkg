/**
 * 疯狂动物城博客系统 - 系统状态监控
 * Zootopia Blog System - System Status Monitor
 *
 * 版本: v3.3.0
 * 优化轮次: 第17轮
 * 最后更新: 2026-04-12
 *
 * 功能: 检查所有核心系统的状态，生成健康报告
 */

(function() {
  'use strict';

  // 系统配置
  const SystemMonitorConfig = {
    // 系统列表
    systems: [
      // 核心层
      { id: 'core', name: '统一核心', file: 'zootopia-core.js', essential: true },
      { id: 'loader', name: '智能加载器', file: 'zootopia-loader.js', essential: true },

      // 交互层
      { id: 'microinteractions', name: '微交互动画', file: 'zootopia-microinteractions.js', essential: false },
      { id: 'comment-reactions', name: '评论表情反应', file: 'zootopia-comment-reactions.js', essential: false },

      // 功能层
      { id: 'user-points', name: '用户积分系统', file: 'zootopia-user-points.js', essential: false },
      { id: 'checkin', name: '每日签到系统', file: 'zootopia-checkin.js', essential: false },
      { id: 'utility-tools', name: '实用工具集', file: 'zootopia-utility-tools.js', essential: false },
      { id: 'search-advanced', name: '高级搜索', file: 'zootopia-search-advanced.js', essential: false },
      { id: 'reading-history', name: '阅读历史', file: 'zootopia-reading-history.js', essential: false },
      { id: 'post-enhancement', name: '文章增强', file: 'zootopia-post-enhancement.js', essential: false },
      { id: 'share-enhancement', name: '分享增强', file: 'zootopia-share-enhancement.js', essential: false },
      { id: 'keyboard-shortcuts', name: '键盘快捷键', file: 'zootopia-keyboard-shortcuts.js', essential: false },
      { id: 'search-suggestions', name: '搜索建议', file: 'zootopia-search-suggestions.js', essential: false },
      { id: 'theme-switcher', name: '主题切换器', file: 'zootopia-theme-switcher.js', essential: false },

      // 优化层
      { id: 'resource-loader', name: '资源预加载', file: 'zootopia-resource-loader.js', essential: false },
      { id: 'media-optimizer', name: '媒体优化', file: 'zootopia-media-optimizer.js', essential: false },
      { id: 'performance-monitor', name: '性能监控', file: 'zootopia-performance-monitor.js', essential: false },

      // 移动层
      { id: 'mobile-optimizer', name: '移动端优化', file: 'zootopia-mobile-optimizer.js', essential: false },

      // 增强层
      { id: 'seo-optimizer', name: 'SEO优化', file: 'zootopia-seo-optimizer.js', essential: false },
      { id: 'accessibility', name: '无障碍增强', file: 'zootopia-accessibility.js', essential: false }
    ],

    // API 检查列表
    apiChecks: [
      { name: 'ztAddPoints', api: 'ztAddPoints' },
      { name: 'ztPerformCheckin', api: 'ztPerformCheckin' },
      { name: 'ztGeneratePassword', api: 'ztGeneratePassword' },
      { name: 'ztGenerateQRCode', api: 'ztGenerateQRCode' },
      { name: 'ztShowColorPicker', api: 'ztShowColorPicker' },
      { name: 'ztFadeIn', api: 'ztFadeIn' },
      { name: 'ztFadeOut', api: 'ztFadeOut' },
      { name: 'ztSlideIn', api: 'ztSlideIn' },
      { name: 'ztBounce', api: 'ztBounce' },
      { name: 'ztToggleTheme', api: 'ztToggleTheme' },
      { name: 'ztPreload', api: 'ztPreload' },
      { name: 'ztPrefetch', api: 'ztPrefetch' },
      { name: 'ztGetCacheStats', api: 'ztGetCacheStats' },
      { name: 'ztGetPerformanceReport', api: 'ztGetPerformanceReport' },
      { name: 'ztGetPerformanceScore', api: 'ztGetPerformanceScore' },
      { name: 'ztGetRecommendations', api: 'ztGetRecommendations' },
      { name: 'ztGetSEOData', api: 'ztGetSEOData' },
      { name: 'ztAnnounce', api: 'ztAnnounce' },
      { name: 'ztTrapFocus', api: 'ztTrapFocus' },
      { name: 'ztRestoreFocus', api: 'ztRestoreFocus' }
    ]
  };

  // 系统监控器
  const SystemMonitor = {
    results: {
      systems: [],
      apis: [],
      summary: {}
    },

    // 检查系统状态
    checkSystems: function() {
      const results = [];

      SystemMonitorConfig.systems.forEach(system => {
        const status = this.checkSystem(system);
        results.push({
          id: system.id,
          name: system.name,
          file: system.file,
          essential: system.essential,
          status: status,
          timestamp: new Date().toISOString()
        });
      });

      this.results.systems = results;
      return results;
    },

    // 检查单个系统
    checkSystem: function(system) {
      // 检查脚本是否加载
      const scripts = document.querySelectorAll('script[src*="' + system.file + '"]');
      if (scripts.length === 0) {
        return 'not_loaded';
      }

      // 检查相关 API 是否可用
      const apiName = this.getSystemAPI(system.id);
      if (apiName && typeof window[apiName] === 'function') {
        return 'active';
      } else if (apiName) {
        return 'loaded_no_api';
      }

      return 'loaded';
    },

    // 获取系统对应的 API
    getSystemAPI: function(systemId) {
      const apiMap = {
        'user-points': 'ztAddPoints',
        'checkin': 'ztPerformCheckin',
        'utility-tools': 'ztGeneratePassword',
        'microinteractions': 'ztFadeIn',
        'theme-switcher': 'ztToggleTheme',
        'resource-loader': 'ztPreload',
        'performance-monitor': 'ztGetPerformanceReport',
        'seo-optimizer': 'ztGetSEOData',
        'accessibility': 'ztAnnounce'
      };
      return apiMap[systemId] || null;
    },

    // 检查 API 状态
    checkAPIs: function() {
      const results = [];

      SystemMonitorConfig.apiChecks.forEach(check => {
        results.push({
          name: check.name,
          available: typeof window[check.api] === 'function',
          type: typeof window[check.api]
        });
      });

      this.results.apis = results;
      return results;
    },

    // 生成摘要
    generateSummary: function() {
      const systems = this.results.systems;
      const apis = this.results.apis;

      const summary = {
        totalSystems: systems.length,
        activeSystems: systems.filter(s => s.status === 'active').length,
        loadedSystems: systems.filter(s => s.status.startsWith('loaded')).length,
        essentialSystems: systems.filter(s => s.essential).length,
        essentialActive: systems.filter(s => s.essential && s.status === 'active').length,
        totalAPIs: apis.length,
        availableAPIs: apis.filter(a => a.available).length,
        overallHealth: 'unknown',
        timestamp: new Date().toISOString()
      };

      // 计算整体健康状态
      if (summary.essentialActive === summary.essentialSystems) {
        summary.overallHealth = 'excellent';
      } else if (summary.essentialActive >= summary.essentialSystems * 0.8) {
        summary.overallHealth = 'good';
      } else if (summary.essentialActive >= summary.essentialSystems * 0.5) {
        summary.overallHealth = 'fair';
      } else {
        summary.overallHealth = 'poor';
      }

      this.results.summary = summary;
      return summary;
    },

    // 获取完整报告
    getReport: function() {
      this.checkSystems();
      this.checkAPIs();
      this.generateSummary();

      return {
        summary: this.results.summary,
        systems: this.results.systems,
        apis: this.results.apis,
        recommendations: this.generateRecommendations()
      };
    },

    // 生成建议
    generateRecommendations: function() {
      const recommendations = [];
      const systems = this.results.systems;
      const apis = this.results.apis;

      // 检查未加载的核心系统
      systems.forEach(system => {
        if (system.essential && system.status === 'not_loaded') {
          recommendations.push({
            type: 'critical',
            message: `核心系统 "${system.name}" 未加载，请检查 _config.butterfly.yml 中的配置`
          });
        }
      });

      // 检查 API 可用性
      const unavailableAPIs = apis.filter(a => !a.available);
      if (unavailableAPIs.length > 0) {
        recommendations.push({
          type: 'warning',
          message: `${unavailableAPIs.length} 个 API 不可用: ${unavailableAPIs.map(a => a.name).join(', ')}`
        });
      }

      // 性能建议
      const inactiveSystems = systems.filter(s => s.status === 'loaded_no_api');
      if (inactiveSystems.length > 0) {
        recommendations.push({
          type: 'info',
          message: `${inactiveSystems.length} 个系统已加载但 API 不可用，可能需要检查依赖关系`
        });
      }

      return recommendations;
    },

    // 显示控制台报告
    consoleReport: function() {
      const report = this.getReport();

      console.group('🏥 疯狂动物城博客系统 - 健康检查报告');

      console.group('📊 摘要');
      console.log('整体健康状态:', this.getHealthIcon(report.summary.overallHealth), report.summary.overallHealth);
      console.log('核心系统:', `${report.summary.essentialActive}/${report.summary.essentialSystems}`);
      console.log('总系统数:', `${report.summary.activeSystems}/${report.summary.totalSystems}`);
      console.log('API 可用:', `${report.summary.availableAPIs}/${report.summary.totalAPIs}`);
      console.groupEnd();

      console.group('🔧 系统状态');
      report.systems.forEach(system => {
        const icon = this.getStatusIcon(system.status);
        const essential = system.essential ? ' [必需]' : '';
        console.log(`${icon} ${system.name}${essential}: ${system.status}`);
      });
      console.groupEnd();

      console.group('🔌 API 状态');
      report.apis.forEach(api => {
        const icon = api.available ? '✅' : '❌';
        console.log(`${icon} ${api.name}: ${api.available ? '可用' : '不可用'}`);
      });
      console.groupEnd();

      if (report.recommendations.length > 0) {
        console.group('💡 建议');
        report.recommendations.forEach(rec => {
          const icon = rec.type === 'critical' ? '🚨' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`${icon} [${rec.type.toUpperCase()}] ${rec.message}`);
        });
        console.groupEnd();
      }

      console.groupEnd();

      return report;
    },

    // 获取健康状态图标
    getHealthIcon: function(status) {
      const icons = {
        'excellent': '🌟',
        'good': '✨',
        'fair': '⚠️',
        'poor': '❌',
        'unknown': '❓'
      };
      return icons[status] || '❓';
    },

    // 获取状态图标
    getStatusIcon: function(status) {
      const icons = {
        'active': '🟢',
        'loaded': '🟡',
        'loaded_no_api': '🟠',
        'not_loaded': '🔴'
      };
      return icons[status] || '⚪';
    }
  };

  // 导出全局函数
  window.ztSystemMonitor = SystemMonitor;

  // 便捷函数
  window.ztSystemCheck = function() {
    return SystemMonitor.consoleReport();
  };

  window.ztGetSystemReport = function() {
    return SystemMonitor.getReport();
  };

  // 自动运行（可选）
  if (window.ZootopiaCore && ZootopiaCore.config && ZootopiaCore.config.debug) {
    console.log('🏥 系统监控已加载，使用 ztSystemCheck() 查看系统状态');
  }

})();
