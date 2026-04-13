/**
 * 疯狂动物城性能监控系统
 * Zootopia Performance Monitor
 *
 * Core Web Vitals追踪，性能分析，优化建议
 */

(function() {
  'use strict';

  const PerformanceConfig = {
    // Core Web Vitals
    coreWebVitals: {
      enabled: true,
      thresholds: {
        LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
        FID: { good: 100, needsImprovement: 300 },   // First Input Delay
        CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
        FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
        TTFB: { good: 800, needsImprovement: 1800 }  // Time to First Byte
      }
    },

    // 资源监控
    resourceTiming: {
      enabled: true,
      threshold: 5000 // 5秒
    },

    // 导航时机
    navigationTiming: {
      enabled: true
    },

    // 性能报告
    reporting: {
      enabled: true,
      endpoint: null, // 发送到分析端点
      samplingRate: 1.0 // 采样率
    },

    // 控制台输出
    consoleOutput: true
  };

  /**
   * 性能监控管理器
   */
  const PerformanceMonitor = {
    metrics: {},
    observers: [],

    /**
     * 初始化
     */
    init: function() {
      if (PerformanceConfig.coreWebVitals.enabled) {
        this.setupCoreWebVitals();
      }

      if (PerformanceConfig.resourceTiming.enabled) {
        this.setupResourceTiming();
      }

      if (PerformanceConfig.navigationTiming.enabled) {
        this.setupNavigationTiming();
      }

      // 页面卸载时报告
      window.addEventListener('beforeunload', () => {
        this.reportMetrics();
      });

      // 可见性变化时报告
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.reportMetrics();
        }
      });
    },

    /**
     * 设置Core Web Vitals
     */
    setupCoreWebVitals: function() {
      // LCP - Largest Contentful Paint
      this.observeLCP();

      // FID - First Input Delay
      this.observeFID();

      // CLS - Cumulative Layout Shift
      this.observeCLS();

      // FCP - First Contentful Paint
      this.observeFCP();

      // TTFB - Time to First Byte
      this.observeTTFB();
    },

    /**
     * 观察LCP
     */
    observeLCP: function() {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
          this.evaluateMetric('LCP', this.metrics.LCP);
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('LCP观察失败:', e);
      }
    },

    /**
     * 观察FID
     */
    observeFID: function() {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            this.metrics.FID = entry.processingStart - entry.startTime;
            this.evaluateMetric('FID', this.metrics.FID);
          });
        });

        observer.observe({ entryTypes: ['first-input'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('FID观察失败:', e);
      }
    },

    /**
     * 观察CLS
     */
    observeCLS: function() {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.metrics.CLS = clsValue;
              this.evaluateMetric('CLS', clsValue);
            }
          });
        });

        observer.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('CLS观察失败:', e);
      }
    },

    /**
     * 观察FCP
     */
    observeFCP: function() {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            this.metrics.FCP = fcpEntry.startTime;
            this.evaluateMetric('FCP', this.metrics.FCP);
          }
        });

        observer.observe({ entryTypes: ['paint'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('FCP观察失败:', e);
      }
    },

    /**
     * 观察TTFB
     */
    observeTTFB: function() {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.TTFB = navigation.responseStart - navigation.requestStart;
        this.evaluateMetric('TTFB', this.metrics.TTFB);
      }
    },

    /**
     * 评估指标
     */
    evaluateMetric: function(name, value) {
      const thresholds = PerformanceConfig.coreWebVitals.thresholds[name];
      if (!thresholds) return;

      let rating;
      if (value <= thresholds.good) {
        rating = 'good';
      } else if (value <= thresholds.needsImprovement) {
        rating = 'needs-improvement';
      } else {
        rating = 'poor';
      }

      this.metrics[name + 'Rating'] = rating;

      if (PerformanceConfig.consoleOutput) {
        const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
        console.log(`[Performance] ${name}: ${Math.round(value)}ms ${emoji}`);
      }
    },

    /**
     * 设置资源时机
     */
    setupResourceTiming: function() {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.duration > PerformanceConfig.resourceTiming.threshold) {
              if (PerformanceConfig.consoleOutput) {
                console.warn(`[Performance] 慢资源: ${entry.name} (${Math.round(entry.duration)}ms)`);
              }
            }
          });
        });

        observer.observe({ entryTypes: ['resource'] });
        this.observers.push(observer);
      } catch (e) {
        console.warn('资源时机观察失败:', e);
      }
    },

    /**
     * 设置导航时机
     */
    setupNavigationTiming: function() {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (!navigation) return;

      this.metrics.navigation = {
        // DNS查询
        dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        // TCP连接
        tcpConnection: navigation.connectEnd - navigation.connectStart,
        // 请求响应
        requestResponse: navigation.responseEnd - navigation.requestStart,
        // DOM加载
        domLoading: navigation.domComplete - navigation.domLoading,
        // 完整加载
        pageLoad: navigation.loadEventEnd - navigation.navigationStart
      };

      if (PerformanceConfig.consoleOutput) {
        console.log('[Performance] 导航时机:', this.metrics.navigation);
      }
    },

    /**
     * 获取性能报告
     */
    getReport: function() {
      const report = {
        // Core Web Vitals
        coreWebVitals: {
          LCP: {
            value: this.metrics.LCP,
            rating: this.metrics.LCPRating
          },
          FID: {
            value: this.metrics.FID,
            rating: this.metrics.FIDRating
          },
          CLS: {
            value: this.metrics.CLS,
            rating: this.metrics.CLSRating
          },
          FCP: {
            value: this.metrics.FCP,
            rating: this.metrics.FCPRating
          },
          TTFB: {
            value: this.metrics.TTFB,
            rating: this.metrics.TTFBRating
          }
        },

        // 导航时机
        navigation: this.metrics.navigation,

        // 资源统计
        resources: this.getResourceStats(),

        // 内存信息
        memory: this.getMemoryInfo(),

        // 时间戳
        timestamp: Date.now(),
        url: window.location.href
      };

      return report;
    },

    /**
     * 获取资源统计
     */
    getResourceStats: function() {
      const resources = performance.getEntriesByType('resource');
      const stats = {
        total: resources.length,
        byType: {},
        totalSize: 0,
        slowResources: []
      };

      resources.forEach(resource => {
        // 按类型统计
        const type = resource.initiatorType;
        if (!stats.byType[type]) {
          stats.byType[type] = {
            count: 0,
            totalDuration: 0,
            totalSize: 0
          };
        }

        stats.byType[type].count++;
        stats.byType[type].totalDuration += resource.duration || 0;
        stats.byType[type].totalSize += resource.transferSize || 0;

        // 总大小
        stats.totalSize += resource.transferSize || 0;

        // 慢资源
        if (resource.duration > PerformanceConfig.resourceTiming.threshold) {
          stats.slowResources.push({
            name: resource.name,
            type: type,
            duration: resource.duration,
            size: resource.transferSize
          });
        }
      });

      return stats;
    },

    /**
     * 获取内存信息
     */
    getMemoryInfo: function() {
      if (performance.memory) {
        return {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          usagePercentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
        };
      }
      return null;
    },

    /**
     * 报告指标
     */
    reportMetrics: function() {
      const report = this.getReport();

      // 发送到分析端点
      if (PerformanceConfig.reporting.endpoint && Math.random() < PerformanceConfig.reporting.samplingRate) {
        this.sendReport(report);
      }

      // 保存到本地存储
      this.saveReport(report);
    },

    /**
     * 发送报告
     */
    sendReport: function(report) {
      if (!PerformanceConfig.reporting.endpoint) return;

      const data = JSON.stringify(report);
      const blob = new Blob([data], { type: 'application/json' });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(PerformanceConfig.reporting.endpoint, blob);
      } else {
        fetch(PerformanceConfig.reporting.endpoint, {
          method: 'POST',
          body: blob,
          keepalive: true
        }).catch(err => {
          console.warn('性能报告发送失败:', err);
        });
      }
    },

    /**
     * 保存报告
     */
    saveReport: function(report) {
      try {
        const reports = JSON.parse(localStorage.getItem('zt_performance_reports') || '[]');
        reports.push(report);

        // 只保留最近100条报告
        if (reports.length > 100) {
          reports.shift();
        }

        localStorage.setItem('zt_performance_reports', JSON.stringify(reports));
      } catch (e) {
        console.warn('性能报告保存失败:', e);
      }
    },

    /**
     * 获取历史报告
     */
    getReports: function() {
      try {
        return JSON.parse(localStorage.getItem('zt_performance_reports') || '[]');
      } catch (e) {
        return [];
      }
    },

    /**
     * 获取性能评分
     */
    getScore: function() {
      const scores = {
        LCP: this.getMetricScore('LCP', this.metrics.LCP),
        FID: this.getMetricScore('FID', this.metrics.FID),
        CLS: this.getMetricScore('CLS', this.metrics.CLS),
        FCP: this.getMetricScore('FCP', this.metrics.FCP),
        TTFB: this.getMetricScore('TTFB', this.metrics.TTFB)
      };

      const average = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;

      return {
        individual: scores,
        average: Math.round(average)
      };
    },

    /**
     * 获取指标评分
     */
    getMetricScore: function(name, value) {
      const thresholds = PerformanceConfig.coreWebVitals.thresholds[name];
      if (!thresholds || !value) return 100;

      if (value <= thresholds.good) return 100;
      if (value <= thresholds.needsImprovement) return 50;
      return 0;
    },

    /**
     * 生成优化建议
     */
    getRecommendations: function() {
      const recommendations = [];

      // LCP建议
      if (this.metrics.LCPRating === 'poor') {
        recommendations.push({
          metric: 'LCP',
          severity: 'high',
          message: '最大内容绘制时间过长',
          suggestions: [
            '优化图片加载（使用WebP、添加尺寸）',
            '移除阻塞渲染的JavaScript',
            '使用预加载关键资源'
          ]
        });
      }

      // FID建议
      if (this.metrics.FIDRating === 'poor') {
        recommendations.push({
          metric: 'FID',
          severity: 'high',
          message: '首次输入延迟过长',
          suggestions: [
            '减少JavaScript执行时间',
            '分割长任务',
            '使用Web Workers处理复杂计算'
          ]
        });
      }

      // CLS建议
      if (this.metrics.CLSRating === 'poor') {
        recommendations.push({
          metric: 'CLS',
          severity: 'medium',
          message: '累积布局偏移过大',
          suggestions: [
            '为图片和视频预留空间',
            '避免在现有内容上方插入内容',
            '使用CSS transform代替动画'
          ]
        });
      }

      return recommendations;
    }
  };

  // 导出 API
  ZootopiaCore.performanceMonitor = PerformanceMonitor;
  ZootopiaCore.performanceConfig = PerformanceConfig;

  // 全局 API
  window.ztGetPerformanceReport = () => PerformanceMonitor.getReport();
  window.ztGetPerformanceScore = () => PerformanceMonitor.getScore();
  window.ztGetRecommendations = () => PerformanceMonitor.getRecommendations();

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    PerformanceMonitor.init();
    console.log('📊 性能监控系统已就绪');
  });

})();
