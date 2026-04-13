# 疯狂动物城主题 - 开发者指南

**版本**: v2.7.0
**最后更新**: 2026-04-10
**优化轮次**: 第十轮

---

## 目录

- [快速开始](#快速开始)
- [开发环境设置](#开发环境设置)
- [项目结构](#项目结构)
- [核心概念](#核心概念)
- [开发工作流](#开发工作流)
- [最佳实践](#最佳实践)
- [测试指南](#测试指南)
- [调试技巧](#调试技巧)
- [贡献指南](#贡献指南)

---

## 快速开始

### 安装依赖

```bash
cd my-blog
pnpm install
```

### 启动开发服务器

```bash
hexo server
# 访问 http://localhost:4000
```

### 创建新组件

```bash
# 在 source/js/ 目录创建新文件
touch source/js/my-component.js

# 添加对应样式
touch source/css/my-component.css
```

### 基本组件模板

```javascript
/**
 * 我的组件
 */
(function() {
  'use strict';

  const MyComponentConfig = {
    // 组件配置
  };

  const MyComponent = {
    init: function() {
      console.log('MyComponent initialized');
    },

    // 其他方法...
  };

  // 导出
  ZootopiaCore.myComponent = MyComponent;
  ZootopiaCore.myComponentConfig = MyComponentConfig;

  // 全局 API
  window.ztMyComponentMethod = () => {
    // 方法实现
  };

  // 自动初始化
  ZootopiaCore.dom.then(() => {
    MyComponent.init();
  });

})();
```

---

## 开发环境设置

### 推荐工具

- **编辑器**: VS Code
- **浏览器**: Chrome DevTools
- **Node.js**: v18+
- **包管理器**: pnpm

### VS Code 推荐扩展

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "stylelint.vscode-stylelint",
    "bradlc.vscode-tailwindcss",
    "christian-kohler.path-intellisense"
  ]
}
```

### VS Code 设置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true,
  "stylelint.autoFixOnSave": true,
  "files.associations": {
    "*.js": "javascript"
  }
}
```

---

## 项目结构

```
my-blog/
├── source/
│   ├── css/                      # 样式文件
│   │   ├── zootopia-theme.css            # 统一主题样式 (第十轮)
│   │   ├── zootopia-animations.css       # 统一动画样式 (第十轮)
│   │   ├── zootopia-micro-interactions.css  # 微交互样式 (第十轮)
│   │   ├── zootopia-optimized.css        # 优化样式
│   │   └── ...
│   ├── js/                       # JavaScript 文件
│   │   ├── zootopia-integrator.js        # 系统集成器 (第十轮)
│   │   ├── zootopia-ultimate-performance.js  # 性能优化 (第十轮)
│   │   ├── zootopia-reading-progress.js  # 阅读进度 (第九轮)
│   │   ├── zootopia-floating-toc.js      # 悬浮目录 (第九轮)
│   │   └── ...
│   └── img/                      # 图片资源
│       └── zootopia/             # 疯狂动物城主题图片
├── themes/
│   ├── butterfly/                # Butterfly 主题
│   └── next/                     # NexT 主题（备用）
├── _config.yml                   # Hexo 配置
├── _config.butterfly.yml         # Butterfly 主题配置
└── package.json
```

### 文件命名规范

- **样式文件**: `zootopia-{system}-{feature}.css`
- **脚本文件**: `zootopia-{system}-{feature}.js`
- **示例**:
  - `zootopia-theme.css` - 主题核心样式
  - `zootopia-animations.css` - 动画样式
  - `zootopia-integrator.js` - 系统集成器
  - `zootopia-reading-progress.js` - 阅读进度系统

---

## 核心概念

### 模块化架构

疯狂动物城主题采用 IIFE（立即调用函数表达式）模块模式：

```javascript
(function() {
  'use strict';

  // 私有变量和函数
  const privateVar = 'private';

  function privateFunction() {
    // ...
  }

  // 公开 API
  const PublicAPI = {
    method: function() { /* ... */ }
  };

  // 导出到核心对象
  ZootopiaCore.moduleName = PublicAPI;

  // 全局 API
  window.ztGlobalMethod = () => { /* ... */ };

})();
```

### 依赖管理

使用 `ZootopiaCore.dom` Promise 确保 DOM 就绪：

```javascript
ZootopiaCore.dom.then(() => {
  // DOM 已就绪，可以安全操作
  MyComponent.init();
});
```

### 系统通信

使用发布-订阅模式进行系统间通信：

```javascript
// 监听事件
ZootopiaCore.on('event:name', (data) => {
  console.log('Received:', data);
});

// 触发事件
ZootopiaCore.emit('event:name', { key: 'value' });
```

### 配置管理

所有配置存储在 `ZootopiaCore.config` 中：

```javascript
// 读取配置
const value = ZootopiaCore.getConfig('path.to.key');

// 设置配置
ZootopiaCore.setConfig('path.to.key', newValue);
```

---

## 开发工作流

### 1. 功能开发流程

```
规划 → 设计 → 实现 → 测试 → 优化 → 文档
```

#### 规划阶段

- 确定功能需求
- 评估技术可行性
- 确定与其他系统的集成点

#### 设计阶段

- 设计 API 接口
- 规划配置选项
- 定义事件和回调

#### 实现阶段

- 创建组件文件
- 实现核心功能
- 添加错误处理

#### 测试阶段

- 单元测试
- 集成测试
- 性能测试

#### 优化阶段

- 代码审查
- 性能优化
- 内存泄漏检测

#### 文档阶段

- API 文档
- 使用示例
- 更新 CHANGELOG

### 2. 创建新系统

```bash
# 1. 创建脚本文件
touch source/js/zootopia-new-system.js

# 2. 创建样式文件（如需要）
touch source/css/zootopia-new-system.css

# 3. 更新配置文件
# 编辑 _config.butterfly.yml，添加文件引用

# 4. 测试
hexo clean && hexo server
```

### 3. 代码审查清单

- [ ] 代码符合 ESLint 规范
- [ ] 使用 'use strict' 模式
- [ ] 变量命名清晰
- [ ] 函数有明确的单一职责
- [ ] 错误处理完善
- [ ] 性能优化合理
- [ ] 内存泄漏检查
- [ ] 浏览器兼容性
- [ ] 辅助功能支持
- [ ] 文档完整

---

## 最佳实践

### JavaScript

#### 1. 使用 IIFE 模式

```javascript
// ✅ 推荐
(function() {
  'use strict';

  const MyModule = { /* ... */ };

  ZootopiaCore.myModule = MyModule;
})();

// ❌ 避免
const MyModule = { /* ... */ };
window.myModule = MyModule;
```

#### 2. 避免全局变量污染

```javascript
// ✅ 推荐
window.ztSpecificMethod = () => { /* ... */ };

// ❌ 避免
window.myVar = 'value';
window.myHelper = () => { /* ... */ };
```

#### 3. 使用防抖和节流

```javascript
// ✅ 推荐 - 使用内置防抖
const handleResize = ztDebounce(() => {
  updateLayout();
}, 150);

window.addEventListener('resize', handleResize);

// ❌ 避免 - 直接绑定高频事件
window.addEventListener('resize', updateLayout);
```

#### 4. 内存管理

```javascript
// ✅ 推荐 - 注册清理函数
const MyComponent = {
  init: function() {
    this.timer = setInterval(() => { /* ... */ }, 1000);

    // 注册清理
    ztRegisterCleanup(() => {
      clearInterval(this.timer);
    });
  }
};

// ❌ 避免 - 不清理定时器
const MyComponent = {
  init: function() {
    setInterval(() => { /* ... */ }, 1000);
  }
};
```

### CSS

#### 1. 使用 CSS 自定义属性

```css
/* ✅ 推荐 */
:root {
  --zt-primary: #FF9F43;
  --zt-space-md: 16px;
}

.my-element {
  color: var(--zt-primary);
  padding: var(--zt-space-md);
}

/* ❌ 避免 */
.my-element {
  color: #FF9F43;
  padding: 16px;
}
```

#### 2. 使用语义化类名

```css
/* ✅ 推荐 */
.zt-card { /* ... */ }
.zt-card--featured { /* ... */ }
.zt-card__title { /* ... */ }
.zt-card__body { /* ... */ }

/* ❌ 避免 */
.card { /* ... */ }
.featured { /* ... */ }
.title { /* ... */ }
.content { /* ... */ }
```

#### 3. 性能优化

```css
/* ✅ 推荐 - GPU 加速 */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* ✅ 推荐 - 避免昂贵的属性 */
.optimized-element {
  /* 使用 transform 而不是 left/top */
  transform: translateX(100px);
}

/* ❌ 避免 */
.slow-element {
  left: 100px;
  top: 100px;
}
```

### API 设计

#### 1. 一致性

```javascript
// ✅ 推荐 - 命名一致
ztShowDialog()
ztShowTooltip()
ztShowNotification()

// ❌ 避免 - 不一致
displayDialog()
tooltipShow()
show_notification()
```

#### 2. 参数验证

```javascript
// ✅ 推荐
function ztSetTheme(theme) {
  const validThemes = ['light', 'dark', 'sepia', 'night'];
  if (!validThemes.includes(theme)) {
    throw new Error(`Invalid theme: ${theme}`);
  }
  // ...
}

// ❌ 避免
function ztSetTheme(theme) {
  // 没有验证
  document.body.className = theme;
}
```

#### 3. 错误处理

```javascript
// ✅ 推荐
async function ztLoadData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load data:', error);
    ztNotify({
      type: 'error',
      message: '加载数据失败'
    });
    throw error;
  }
}

// ❌ 避免
async function ztLoadData(url) {
  const response = await fetch(url);
  return await response.json();
}
```

---

## 测试指南

### 单元测试

```javascript
// 示例：测试工具函数
function testZtFormatDate() {
  const date = new Date('2026-04-10');
  const result = ztFormatDate(date, 'YYYY-MM-DD');
  console.assert(result === '2026-04-10', 'Date format failed');
}

testZtFormatDate();
```

### 集成测试

```javascript
// 测试系统集成
async function testSystemIntegration() {
  await ZootopiaInit();

  const status = ztGetSystemStatus();
  console.assert(status.integrator.status === 'initialized', 'Integrator not initialized');

  console.log('✅ System integration test passed');
}

testSystemIntegration();
```

### 性能测试

```javascript
// 测试动画性能
function testAnimationPerformance() {
  const start = performance.now();

  ztAnimate('.element', 'fade-in').then(() => {
    const duration = performance.now() - start;
    console.assert(duration < 500, `Animation too slow: ${duration}ms`);
    console.log(`✅ Animation performance: ${duration.toFixed(2)}ms`);
  });
}

testAnimationPerformance();
```

### 浏览器兼容性测试

支持的现代浏览器：
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

---

## 调试技巧

### 启用调试模式

```javascript
ZootopiaCore.setConfig('debug', true);
```

### 查看系统状态

```javascript
// 获取完整状态
console.table(ztGetSystemStatus());

// 查看性能指标
console.log(ztGetPerformanceReport());

// 检查内存使用
if (performance.memory) {
  console.log({
    used: (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB',
    total: (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + 'MB'
  });
}
```

### 追踪事件

```javascript
// 监听所有事件
ZootopiaCore.on('*', (event, data) => {
  console.log(`[Event] ${event}:`, data);
});
```

### 性能分析

```javascript
// 标记性能点
performance.mark('my-feature-start');

// 执行功能
doMyFeature();

performance.mark('my-feature-end');
performance.measure('my-feature', 'my-feature-start', 'my-feature-end');

const measure = performance.getEntriesByName('my-feature')[0];
console.log(`Duration: ${measure.duration}ms`);
```

---

## 贡献指南

### 提交代码

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

### 提交信息规范

```
type(scope): subject

body

footer
```

**类型**:
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建/工具

**示例**:
```
feat(reading): add reading progress indicator

- Implement progress bar at top of page
- Calculate reading percentage based on scroll position
- Add chapter detection and highlighting

Closes #123
```

### 代码审查标准

- 代码质量
- 性能影响
- 浏览器兼容性
- 辅助功能
- 文档完整性
- 测试覆盖

---

## 常见问题

### Q: 如何调试特定系统？

```javascript
// 获取系统状态
const status = ztGetSystemStatus();
console.log(status.systemName);

// 监听系统事件
ZootopiaCore.on('systemName:event', (data) => {
  console.log(data);
});
```

### Q: 如何自定义主题？

参考 [主题自定义指南](ZOOTOPIA-THEME-CUSTOMIZATION.md)

### Q: 如何优化性能？

参考 [性能优化指南](ZOOTOPIA-PERFORMANCE.md)

### Q: 如何处理浏览器兼容性？

```javascript
// 特性检测
if ('IntersectionObserver' in window) {
  // 使用 IntersectionObserver
} else {
  // 降级方案
}
```

---

**文档版本**: v2.7.0
**最后更新**: 2026-04-10

更多信息请参考:
- [API 参考文档](ZOOTOPIA-API-REFERENCE.md)
- [主题自定义指南](ZOOTOPIA-THEME-CUSTOMIZATION.md)
- [部署指南](ZOOTOPIA-DEPLOYMENT.md)
- [故障排除指南](ZOOTOPIA-TROUBLESHOOTING.md)
