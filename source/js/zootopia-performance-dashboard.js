/**
 * 疯狂动物城博客系统 - 性能监控仪表板
 * Zootopia Blog System - Performance Dashboard
 *
 * 版本: v3.5.0
 * 优化轮次: 第19轮
 * 最后更新: 2026-04-12
 *
 * 功能: 可视化性能数据监控
 */

(function() {
  'use strict';

  // 性能监控仪表板
  const PerformanceDashboard = {
    isMonitoring: false,
    updateInterval: null,
    container: null,

    // 显示仪表板
    show: function() {
      if (this.container) {
        this.hide();
      }

      this.container = document.createElement('div');
      this.container.id = 'zt-performance-dashboard';
      this.container.innerHTML = this.getTemplate();

      document.body.appendChild(this.container);
      this.startMonitoring();

      console.log('📊 性能监控仪表板已启动');
    },

    // 隐藏仪表板
    hide: function() {
      if (this.container) {
        this.container.remove();
        this.container = null;
      }

      this.stopMonitoring();
    },

    // 获取仪表板模板
    getTemplate: function() {
      return `
        <div class="zt-dashboard-overlay" onclick="ztHidePerformanceDashboard()"></div>
        <div class="zt-dashboard-panel">
          <div class="zt-dashboard-header">
            <div class="zt-dashboard-title">
              <span class="zt-dashboard-icon">⚡</span>
              <h2>性能监控仪表板</h2>
            </div>
            <button class="zt-dashboard-close" onclick="ztHidePerformanceDashboard()">✕</button>
          </div>

          <div class="zt-dashboard-content">
            <!-- 性能指标卡片 -->
            ${this.getMetricsSection()}

            <!-- 性能评分 -->
            ${this.getScoreSection()}

            <!-- 优化建议 -->
            ${this.getRecommendationsSection()}
          </div>

          <div class="zt-dashboard-footer">
            <div class="zt-dashboard-stats">
              <span>最后更新: ${new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      `;
    },

    // 获取性能指标部分
    getMetricsSection: function() {
      const report = this.getPerformanceReport();
      const metrics = report.metrics;

      return `
        <div class="zt-dashboard-section">
          <h3 class="zt-section-title">📊 Core Web Vitals</h3>
          <div class="zt-metrics-grid">
            ${this.createMetricCard('LCP', '首屏加载', metrics.LCP.value, 'ms', metrics.LCP.rating)}
            ${this.createMetricCard('FID', '首次输入', metrics.FID.value, 'ms', metrics.FID.rating)}
            ${this.createMetricCard('CLS', '布局偏移', metrics.CLS.value, '', metrics.CLS.rating)}
            ${this.createMetricCard('FCP', '首次绘制', metrics.FCP.value, 'ms', metrics.FCP.rating)}
            ${this.createMetricCard('TTFB', '首字节', metrics.TTFB.value, 'ms', metrics.TTFB.rating)}
          </div>
        </div>
      `;
    },

    // 创建指标卡片
    createMetricCard: function(name, label, value, unit, rating) {
      const ratingColors = {
        'good': '#26DE81',
        'needsImprovement': '#F8B739',
        'poor': '#EE5A24'
      };

      const ratingLabels = {
        'good': '优秀',
        'needsImprovement': '需改进',
        'poor': '较差'
      };

      return `
        <div class="zt-metric-card">
          <div class="zt-metric-header">
            <span class="zt-metric-name">${name}</span>
            <span class="zt-metric-rating" style="background-color: ${ratingColors[rating]}">
              ${ratingLabels[rating]}
            </span>
          </div>
          <div class="zt-metric-value">${value}<span class="zt-metric-unit">${unit}</span></div>
          <div class="zt-metric-label">${label}</div>
        </div>
      `;
    },

    // 获取评分部分
    getScoreSection: function() {
      const score = ztGetPerformanceScore();
      const average = score.average || 0;

      let grade, gradeColor, gradeEmoji;
      if (average >= 90) {
        grade = 'A+';
        gradeColor = '#26DE81';
        gradeEmoji = '🌟';
      } else if (average >= 80) {
        grade = 'A';
        gradeColor = '#3498DB';
        gradeEmoji = '✨';
      } else if (average >= 70) {
        grade = 'B';
        gradeColor = '#F8B739';
        gradeEmoji = '👍';
      } else if (average >= 60) {
        grade = 'C';
        gradeColor = '#EE5A24';
        gradeEmoji = '⚠️';
      } else {
        grade = 'D';
        gradeColor = '#6C757D';
        gradeEmoji = '❌';
      }

      return `
        <div class="zt-dashboard-section">
          <h3 class="zt-section-title">🎯 性能评分</h3>
          <div class="zt-score-card">
            <div class="zt-score-circle" style="border-color: ${gradeColor}">
              <div class="zt-score-content">
                <span class="zt-score-emoji">${gradeEmoji}</span>
                <span class="zt-score-value" style="color: ${gradeColor}">${grade}</span>
                <span class="zt-score-avg">${Math.round(average)}分</span>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // 获取优化建议部分
    getRecommendationsSection: function() {
      const recommendations = ztGetRecommendations();

      if (!recommendations || recommendations.length === 0) {
        return `
          <div class="zt-dashboard-section">
            <h3 class="zt-section-title">💡 优化建议</h3>
            <div class="zt-recommendations-empty">
              <span>✨ 太棒了！没有需要优化的项目</span>
            </div>
          </div>
        `;
      }

      return `
        <div class="zt-dashboard-section">
          <h3 class="zt-section-title">💡 优化建议</h3>
          <div class="zt-recommendations-list">
            ${recommendations.map(rec => `
              <div class="zt-recommendation-item zt-recommendation--${rec.priority}">
                <span class="zt-recommendation-priority">${rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'}</span>
                <span class="zt-recommendation-text">${rec.message}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // 获取性能报告
    getPerformanceReport: function() {
      if (typeof ztGetPerformanceReport === 'function') {
        return ztGetPerformanceReport();
      }

      // 默认报告
      return {
        metrics: {
          LCP: { value: '-', rating: 'unknown' },
          FID: { value: '-', rating: 'unknown' },
          CLS: { value: '-', rating: 'unknown' },
          FCP: { value: '-', rating: 'unknown' },
          TTFB: { value: '-', rating: 'unknown' }
        }
      };
    },

    // 开始监控
    startMonitoring: function() {
      this.isMonitoring = true;

      this.updateInterval = setInterval(() => {
        this.updateMetrics();
      }, 1000);
    },

    // 停止监控
    stopMonitoring: function() {
      this.isMonitoring = false;

      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    },

    // 更新指标
    updateMetrics: function() {
      if (!this.container) return;

      // 重新渲染整个面板
      const content = this.container.querySelector('.zt-dashboard-content');
      if (content) {
        content.innerHTML = `
          ${this.getMetricsSection()}
          ${this.getScoreSection()}
          ${this.getRecommendationsSection()}
        `;
      }

      // 更新时间戳
      const statsEl = this.container.querySelector('.zt-dashboard-stats span');
      if (statsEl) {
        statsEl.textContent = `最后更新: ${new Date().toLocaleTimeString()}`;
      }
    }
  };

  // 导出全局函数
  window.ztShowPerformanceDashboard = function() {
    PerformanceDashboard.show();
  };

  window.ztHidePerformanceDashboard = function() {
    PerformanceDashboard.hide();
  };

  // 键盘快捷键支持
  document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + P 打开/关闭性能仪表板
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      if (PerformanceDashboard.container) {
        ztHidePerformanceDashboard();
      } else {
        ztShowPerformanceDashboard();
      }
    }
  });

  // 初始化完成提示
  console.log('📊 性能监控仪表板已加载！');
  console.log('⌨️ 快捷键: Ctrl + Shift + P 打开/关闭仪表板');

})();
    // 采样配置
    sampling: {
      interval: 1000,      // 采样间隔（ms）
      historySize: 60,     // 历史记录数量
      fpsHistorySize: 120  // FPS 历史记录数量
    },

    // 阈值配置
    thresholds: {
      fps: {
        excellent: 55,
        good: 45,
        fair: 30,
        poor: 15
      },
      memory: {
        excellent: 100 * 1024 * 1024,   // 100MB
        good: 200 * 1024 * 1024,        // 200MB
        fair: 400 * 1024 * 1024,        // 400MB
        poor: 800 * 1024 * 1024         // 800MB
      },
      loadTime: {
        excellent: 1000,
        good: 2000,
        fair: 4000,
        poor: 8000
      }
    },

    // 仪表板配置
    dashboard: {
      autoShow: false,
      position: 'bottom-right',
      draggable: true,
      collapsible: true
    },

    // 图表配置
    charts: {
      lineColor: '#FF9F43',
      fillColor: 'rgba(255, 159, 67, 0.1)',
      gridColor: 'rgba(0, 0, 0, 0.1)',
      textColor: '#333'
    }
  };

  // ==================== 性能数据收集器 ====================
  const PerformanceCollector = {
    fps: 0,
    fpsHistory: [],
    memory: 0,
    memoryHistory: [],
    lastFrameTime: performance.now(),
    frameCount: 0,
    isCollecting: false,

    init: function() {
      this.startFPSCollection();
      this.startMemoryCollection();
      this.collectPageMetrics();
    },

    // FPS 收集
    startFPSCollection: function() {
      if (this.isCollecting) return;
      this.isCollecting = true;

      const measureFPS = (currentTime) => {
        this.frameCount++;

        if (currentTime >= this.lastFrameTime + 1000) {
          this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFrameTime));

          // 保存历史
          this.fpsHistory.push({
            time: currentTime,
            value: this.fps
          });

          // 限制历史长度
          if (this.fpsHistory.length > DashboardConfig.sampling.fpsHistorySize) {
            this.fpsHistory.shift();
          }

          this.frameCount = 0;
          this.lastFrameTime = currentTime;

          // 触发更新事件
          this.notifyUpdate('fps', this.fps);
        }

        requestAnimationFrame(measureFPS);
      };

      requestAnimationFrame(measureFPS);
    },

    // 内存收集
    startMemoryCollection: function() {
      if (!performance.memory) {
        console.warn('内存监控不可用');
        return;
      }

      setInterval(() => {
        this.memory = performance.memory.usedJSHeapSize;
        this.memoryHistory.push({
          time: Date.now(),
          value: this.memory
        });

        // 限制历史长度
        if (this.memoryHistory.length > DashboardConfig.sampling.historySize) {
          this.memoryHistory.shift();
        }

        this.notifyUpdate('memory', this.memory);
      }, DashboardConfig.sampling.interval);
    },

    // 收集页面指标
    collectPageMetrics: function() {
      if (!('PerformanceObserver' in window)) return;

      // 收集导航时序
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.pageMetrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          firstPaint: 0,
          firstContentfulPaint: 0
        };
      }

      // 收集绘制时序
      try {
        const paintEntries = performance.getEntriesByType('paint');
        paintEntries.forEach(entry => {
          if (entry.name === 'first-paint') {
            this.pageMetrics.firstPaint = entry.startTime;
          } else if (entry.name === 'first-contentful-paint') {
            this.pageMetrics.firstContentfulPaint = entry.startTime;
          }
        });
      } catch (e) {
        // 某些浏览器可能不支持
      }

      // 监听资源加载
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'resource') {
            this.analyzeResourceTiming(entry);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['resource', 'measure', 'navigation'] });
      } catch (e) {
        // 静默失败
      }
    },

    // 分析资源时序
    analyzeResourceTiming: function(entry) {
      if (!this.resourceMetrics) {
        this.resourceMetrics = {
          total: 0,
          byType: {},
          slowResources: []
        };
      }

      this.resourceMetrics.total++;

      const type = this.getResourceType(entry.name);
      if (!this.resourceMetrics.byType[type]) {
        this.resourceMetrics.byType[type] = { count: 0, totalDuration: 0 };
      }

      this.resourceMetrics.byType[type].count++;
      this.resourceMetrics.byType[type].totalDuration += entry.duration;

      // 记录慢资源
      if (entry.duration > 1000) {
        this.resourceMetrics.slowResources.push({
          name: entry.name,
          duration: entry.duration,
          type: type
        });
      }
    },

    // 获取资源类型
    getResourceType: function(url) {
      const extension = url.split('.').pop().toLowerCase();
      const typeMap = {
        'js': 'script',
        'css': 'stylesheet',
        'png': 'image',
        'jpg': 'image',
        'jpeg': 'image',
        'gif': 'image',
        'svg': 'image',
        'woff': 'font',
        'woff2': 'font',
        'ttf': 'font'
      };
      return typeMap[extension] || 'other';
    },

    // 通知更新
    notifyUpdate: function(type, value) {
      const event = new CustomEvent('zt-performance-update', {
        detail: { type, value }
      });
      window.dispatchEvent(event);
    },

    // 获取当前数据
    getData: function() {
      return {
        fps: {
          current: this.fps,
          history: [...this.fpsHistory],
          average: this.calculateAverage(this.fpsHistory.map(h => h.value))
        },
        memory: {
          current: this.memory,
          history: [...this.memoryHistory],
          average: this.calculateAverage(this.memoryHistory.map(h => h.value))
        },
        page: this.pageMetrics || {},
        resources: this.resourceMetrics || {}
      };
    },

    // 计算平均值
    calculateAverage: function(values) {
      if (values.length === 0) return 0;
      const sum = values.reduce((a, b) => a + b, 0);
      return Math.round(sum / values.length);
    }
  };

  // ==================== 性能分析器 ====================
  const PerformanceAnalyzer = {
    // 分析性能
    analyze: function(data) {
      return {
        fps: this.analyzeFPS(data.fps),
        memory: this.analyzeMemory(data.memory),
        page: this.analyzePageLoad(data.page),
        resources: this.analyzeResources(data.resources),
        overall: this.calculateOverallScore(data)
      };
    },

    // 分析 FPS
    analyzeFPS: function(fpsData) {
      const current = fpsData.current;
      const average = fpsData.average;
      const thresholds = DashboardConfig.thresholds.fps;

      let rating, color, suggestion;

      if (current >= thresholds.excellent) {
        rating = '优秀';
        color = '#10AC84';
        suggestion = '帧率表现优秀！';
      } else if (current >= thresholds.good) {
        rating = '良好';
        color = '#FF9F43';
        suggestion = '帧率表现良好，保持当前状态。';
      } else if (current >= thresholds.fair) {
        rating = '一般';
        color = '#EE5A24';
        suggestion = '帧率偏低，建议减少动画效果。';
      } else {
        rating = '较差';
        color = '#FF6B6B';
        suggestion = '帧率过低，建议立即优化！';
      }

      return {
        current,
        average,
        rating,
        color,
        suggestion
      };
    },

    // 分析内存
    analyzeMemory: function(memoryData) {
      const current = memoryData.current;
      const thresholds = DashboardConfig.thresholds.memory;

      // 格式化字节
      const formatBytes = (bytes) => {
        if (bytes < 1024 * 1024) {
          return (bytes / 1024).toFixed(2) + ' KB';
        }
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
      };

      let rating, color, suggestion;

      if (current <= thresholds.excellent) {
        rating = '优秀';
        color = '#10AC84';
        suggestion = '内存使用非常高效！';
      } else if (current <= thresholds.good) {
        rating = '良好';
        color = '#FF9F43';
        suggestion = '内存使用正常。';
      } else if (current <= thresholds.fair) {
        rating = '偏高';
        color = '#EE5A24';
        suggestion = '内存使用偏高，注意优化。';
      } else {
        rating = '过高';
        color = '#FF6B6B';
        suggestion = '内存使用过高，可能导致卡顿！';
      }

      return {
        current: formatBytes(current),
        currentRaw: current,
        rating,
        color,
        suggestion
      };
    },

    // 分析页面加载
    analyzePageLoad: function(pageData) {
      const loadTime = pageData.loadComplete || 0;
      const thresholds = DashboardConfig.thresholds.loadTime;

      let rating, color, suggestion;

      if (loadTime <= thresholds.excellent) {
        rating = '优秀';
        color = '#10AC84';
        suggestion = '页面加载速度极快！';
      } else if (loadTime <= thresholds.good) {
        rating = '良好';
        color = '#FF9F43';
        suggestion = '页面加载速度良好。';
      } else if (loadTime <= thresholds.fair) {
        rating = '一般';
        color = '#EE5A24';
        suggestion = '页面加载较慢，建议优化资源。';
      } else {
        rating = '较慢';
        color = '#FF6B6B';
        suggestion = '页面加载太慢，需要优化！';
      }

      return {
        loadTime: loadTime + 'ms',
        domReady: pageData.domContentLoaded + 'ms',
        firstPaint: pageData.firstPaint + 'ms',
        fcp: pageData.firstContentfulPaint + 'ms',
        rating,
        color,
        suggestion
      };
    },

    // 分析资源
    analyzeResources: function(resourceData) {
      if (!resourceData.total) {
        return {
          total: 0,
          byType: {},
          slowResources: [],
          suggestion: '暂无资源数据'
        };
      }

      const slowCount = resourceData.slowResources?.length || 0;

      let suggestion;
      if (slowCount === 0) {
        suggestion = '所有资源加载速度正常！';
      } else if (slowCount <= 3) {
        suggestion = `有 ${slowCount} 个资源加载较慢，建议优化。`;
      } else {
        suggestion = `有 ${slowCount} 个资源加载很慢，需要立即优化！`;
      }

      return {
        total: resourceData.total,
        byType: resourceData.byType,
        slowResources: resourceData.slowResources.slice(0, 5),
        suggestion
      };
    },

    // 计算总体评分
    calculateOverallScore: function(data) {
      let score = 100;

      // FPS 评分
      const fps = data.fps.current;
      if (fps < 30) score -= 30;
      else if (fps < 45) score -= 15;
      else if (fps < 55) score -= 5;

      // 内存评分
      const memory = data.memory.current;
      const thresholds = DashboardConfig.thresholds.memory;
      if (memory > thresholds.poor) score -= 25;
      else if (memory > thresholds.fair) score -= 15;
      else if (memory > thresholds.good) score -= 5;

      // 页面加载评分
      const loadTime = data.page.loadComplete || 0;
      const loadThresholds = DashboardConfig.thresholds.loadTime;
      if (loadTime > loadThresholds.poor) score -= 25;
      else if (loadTime > loadThresholds.fair) score -= 15;
      else if (loadTime > loadThresholds.good) score -= 5;

      // 资源加载评分
      const slowResources = data.resources.slowResources?.length || 0;
      if (slowResources > 10) score -= 20;
      else if (slowResources > 5) score -= 10;
      else if (slowResources > 0) score -= 5;

      score = Math.max(0, Math.min(100, score));

      let rating, color;
      if (score >= 90) {
        rating = '优秀';
        color = '#10AC84';
      } else if (score >= 70) {
        rating = '良好';
        color = '#FF9F43';
      } else if (score >= 50) {
        rating = '一般';
        color = '#EE5A24';
      } else {
        rating = '较差';
        color = '#FF6B6B';
      }

      return {
        score,
        rating,
        color,
        suggestion: this.getOverallSuggestion(score)
      };
    },

    // 获取总体建议
    getOverallSuggestion: function(score) {
      if (score >= 90) return '性能表现优秀，继续保持！';
      if (score >= 70) return '性能表现良好，仍有优化空间。';
      if (score >= 50) return '性能一般，建议进行优化。';
      return '性能较差，强烈建议优化！';
    }
  };

  // ==================== 仪表板 UI ====================
  const DashboardUI = {
    element: null,
    isVisible: false,

    create: function() {
      if (this.element) return this.element;

      const dashboard = document.createElement('div');
      dashboard.id = 'zt-performance-dashboard';
      dashboard.className = 'zt-performance-dashboard';
      dashboard.innerHTML = `
        <div class="zt-dashboard-header">
          <h3>📊 性能仪表板</h3>
          <button class="zt-dashboard-close" aria-label="关闭">×</button>
        </div>
        <div class="zt-dashboard-content">
          <div class="zt-dashboard-section">
            <h4>总体评分</h4>
            <div class="zt-score-display">
              <span class="zt-score-value">--</span>
              <span class="zt-score-rating">--</span>
            </div>
            <div class="zt-score-suggestion"></div>
          </div>
          <div class="zt-dashboard-section">
            <h4>FPS</h4>
            <div class="zt-metric">
              <span class="zt-metric-value">--</span>
              <span class="zt-metric-unit">帧/秒</span>
            </div>
            <canvas id="zt-fps-chart" class="zt-chart"></canvas>
          </div>
          <div class="zt-dashboard-section">
            <h4>内存</h4>
            <div class="zt-metric">
              <span class="zt-metric-value">--</span>
              <span class="zt-metric-unit">使用中</span>
            </div>
          </div>
          <div class="zt-dashboard-section">
            <h4>页面加载</h4>
            <div class="zt-metrics-grid">
              <div class="zt-metric-item">
                <span class="zt-metric-label">加载完成</span>
                <span class="zt-metric-value">--</span>
              </div>
              <div class="zt-metric-item">
                <span class="zt-metric-label">首屏绘制</span>
                <span class="zt-metric-value">--</span>
              </div>
            </div>
          </div>
        </div>
        <div class="zt-dashboard-footer">
          <button class="zt-dashboard-refresh">刷新数据</button>
          <button class="zt-dashboard-report">生成报告</button>
        </div>
      `;

      // 添加事件监听
      this.attachEventListeners(dashboard);

      document.body.appendChild(dashboard);
      this.element = dashboard;

      return dashboard;
    },

    attachEventListeners: function(dashboard) {
      // 关闭按钮
      dashboard.querySelector('.zt-dashboard-close').addEventListener('click', () => {
        this.hide();
      });

      // 刷新按钮
      dashboard.querySelector('.zt-dashboard-refresh').addEventListener('click', () => {
        this.update();
      });

      // 生成报告按钮
      dashboard.querySelector('.zt-dashboard-report').addEventListener('click', () => {
        this.generateReport();
      });
    },

    show: function() {
      if (!this.element) {
        this.create();
      }

      this.element.style.display = 'block';
      this.isVisible = true;
      this.update();
    },

    hide: function() {
      if (this.element) {
        this.element.style.display = 'none';
      }
      this.isVisible = false;
    },

    toggle: function() {
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
      }
    },

    update: function() {
      if (!this.element || !this.isVisible) return;

      const data = PerformanceCollector.getData();
      const analysis = PerformanceAnalyzer.analyze(data);

      // 更新总体评分
      this.updateScore(analysis.overall);

      // 更新 FPS
      this.updateFPS(analysis.fps, data.fps.history);

      // 更新内存
      this.updateMemory(analysis.memory);

      // 更新页面加载
      this.updatePageLoad(analysis.page);
    },

    updateScore: function(score) {
      const scoreValue = this.element.querySelector('.zt-score-value');
      const scoreRating = this.element.querySelector('.zt-score-rating');
      const scoreSuggestion = this.element.querySelector('.zt-score-suggestion');

      scoreValue.textContent = score.score;
      scoreValue.style.color = score.color;
      scoreRating.textContent = score.rating;
      scoreRating.style.color = score.color;
      scoreSuggestion.textContent = score.suggestion;
    },

    updateFPS: function(fps, history) {
      const value = this.element.querySelector('.zt-dashboard-section:nth-child(2) .zt-metric-value');
      value.textContent = fps.current;
      value.style.color = fps.color;

      // 绘制图表
      this.drawFPSChart(history);
    },

    updateMemory: function(memory) {
      const value = this.element.querySelector('.zt-dashboard-section:nth-child(3) .zt-metric-value');
      value.textContent = memory.current;
      value.style.color = memory.color;
    },

    updatePageLoad: function(page) {
      const loadComplete = this.element.querySelector('.zt-metrics-grid .zt-metric-item:nth-child(1) .zt-metric-value');
      const firstPaint = this.element.querySelector('.zt-metrics-grid .zt-metric-item:nth-child(2) .zt-metric-value');

      loadComplete.textContent = page.loadTime;
      firstPaint.textContent = page.fcp;
    },

    drawFPSChart: function(history) {
      const canvas = this.element.querySelector('#zt-fps-chart');
      if (!canvas || history.length === 0) return;

      const ctx = canvas.getContext('2d');
      const config = DashboardConfig.charts;

      // 设置画布大小
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = 100 * 2;
      ctx.scale(2, 2);

      const width = canvas.offsetWidth;
      const height = 100;

      // 清空画布
      ctx.clearRect(0, 0, width, height);

      // 绘制网格
      ctx.strokeStyle = config.gridColor;
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 绘制折线
      ctx.strokeStyle = config.lineColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const maxFPS = 60;
      const step = width / (history.length - 1);

      history.forEach((point, index) => {
        const x = index * step;
        const y = height - (point.value / maxFPS) * height;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // 填充区域
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = config.fillColor;
      ctx.fill();
    },

    generateReport: function() {
      const data = PerformanceCollector.getData();
      const analysis = PerformanceAnalyzer.analyze(data);

      const report = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        data,
        analysis
      };

      // 打印到控制台
      console.group('📊 性能报告');
      console.log('总体评分:', analysis.overall);
      console.log('FPS:', analysis.fps);
      console.log('内存:', analysis.memory);
      console.log('页面加载:', analysis.page);
      console.log('资源:', analysis.resources);
      console.groupEnd();

      // 显示通知
      if (window.ztNotify) {
        ztNotify({
          type: 'info',
          message: '性能报告已生成，请查看控制台',
          duration: 3000
        });
      }

      return report;
    }
  };

  // ==================== 性能仪表板主系统 ====================
  const PerformanceDashboard = {
    initialized: false,

    init: function() {
      if (this.initialized) return;

      // 初始化数据收集
      PerformanceCollector.init();

      // 创建 UI
      DashboardUI.create();

      this.initialized = true;
      console.log('📊 性能仪表板系统已就绪');
    },

    show: function() {
      if (!this.initialized) {
        this.init();
      }
      DashboardUI.show();
    },

    hide: function() {
      DashboardUI.hide();
    },

    toggle: function() {
      if (!this.initialized) {
        this.init();
      }
      DashboardUI.toggle();
    },

    getData: function() {
      return PerformanceCollector.getData();
    },

    getInsights: function() {
      const data = PerformanceCollector.getData();
      return PerformanceAnalyzer.analyze(data);
    },

    generateReport: function() {
      return DashboardUI.generateReport();
    }
  };

  // ==================== 导出 API ====================
  ZootopiaCore.performanceDashboard = PerformanceDashboard;
  ZootopiaCore.performanceCollector = PerformanceCollector;
  ZootopiaCore.performanceAnalyzer = PerformanceAnalyzer;
  ZootopiaCore.dashboardConfig = DashboardConfig;

  // ==================== 全局 API ====================
  // 显示性能仪表板
  window.ztShowPerformanceDashboard = () => PerformanceDashboard.show();

  // 隐藏性能仪表板
  window.ztHidePerformanceDashboard = () => PerformanceDashboard.hide();

  // 切换性能仪表板
  window.ztTogglePerformanceDashboard = () => PerformanceDashboard.toggle();

  // 获取性能数据
  window.ztGetPerformanceData = () => PerformanceDashboard.getData();

  // 获取性能洞察
  window.ztGetPerformanceInsights = () => PerformanceDashboard.getInsights();

  // 生成性能报告
  window.ztGeneratePerformanceReport = () => PerformanceDashboard.generateReport();

  // ==================== 自动初始化 ====================
  ZootopiaCore.dom.then(() => {
    PerformanceDashboard.init();
  });

})();
