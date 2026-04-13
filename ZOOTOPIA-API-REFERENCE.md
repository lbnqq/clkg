# 疯狂动物城主题 - API 参考文档

**版本**: v2.7.0
**最后更新**: 2026-04-10
**优化轮次**: 第十轮

---

## 目录

- [系统核心 API](#系统核心-api)
- [动画系统 API](#动画系统-api)
- [交互系统 API](#交互系统-api)
- [阅读体验 API](#阅读体验-api)
- [性能优化 API](#性能优化-api)
- [辅助功能 API](#辅助功能-api)
- [工具函数 API](#工具函数-api)

---

## 系统核心 API

### ZootopiaInit()

**描述**: 初始化所有疯狂动物城主题系统

**参数**: 无

**返回值**: `Promise<void>`

**示例**:
```javascript
await ZootopiaInit();
```

---

### ztGetSystemStatus()

**描述**: 获取所有子系统的状态

**参数**: 无

**返回值**: `Object` - 系统状态对象

**示例**:
```javascript
const status = ztGetSystemStatus();
console.log(status);
// {
//   integrator: { status: 'initialized', version: '1.0.0' },
//   theme: { status: 'active' },
//   animations: { status: 'active' },
//   ...
// }
```

---

### ztOptimize()

**描述**: 运行系统优化

**参数**:
- `options` (Object): 优化选项
  - `aggressive` (Boolean): 是否使用激进优化
  - `target` (String): 优化目标 ('performance', 'memory', 'balanced')

**返回值**: `Promise<Object>` - 优化结果

**示例**:
```javascript
const result = await ztOptimize({
  aggressive: true,
  target: 'performance'
});
```

---

### ztHealthCheck()

**描述**: 运行系统健康检查

**参数**: 无

**返回值**: `Promise<Object>` - 健康检查结果

**示例**:
```javascript
const health = await ztHealthCheck();
console.log(health);
// {
//   localStorage: { status: 'ok' },
//   sessionStorage: { status: 'ok' },
//   intersectionObserver: { status: 'ok' },
//   ...
// }
```

---

### ztGetPerformanceReport()

**描述**: 获取性能报告

**参数**: 无

**返回值**: `Object` - 性能报告对象

**示例**:
```javascript
const report = ztGetPerformanceReport();
console.log(report.summary);
// {
//   averageChunkLoad: 45,
//   averageLazyLoad: 120,
//   averageMemory: 85,
//   averageRender: 14
// }
```

---

### ztShowHelp()

**描述**: 显示系统帮助信息

**参数**:
- `system` (String, 可选): 指定系统名称

**返回值**: `void`

**示例**:
```javascript
ztShowHelp(); // 显示所有帮助
ztShowHelp('theme'); // 显示主题系统帮助
```

---

## 动画系统 API

### ztAnimate()

**描述**: 对元素应用动画

**参数**:
- `element` (Element|String): DOM 元素或选择器
- `animation` (String): 动画名称
- `options` (Object, 可选): 动画选项
  - `duration` (Number): 动画时长 (ms)
  - `delay` (Number): 动画延迟 (ms)
  - `easing` (String): 缓动函数

**返回值**: `Promise<void>`

**示例**:
```javascript
// 淡入动画
await ztAnimate('.my-element', 'fade-in', {
  duration: 300,
  delay: 100
});

// 弹跳动画
await ztAnimate('#hero', 'bounce', {
  duration: 500,
  easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
});
```

---

### ztAddAnimation()

**描述**: 添加自定义动画

**参数**:
- `name` (String): 动画名称
- `keyframes` (Array): 关键帧数组

**返回值**: `void`

**示例**:
```javascript
ztAddAnimation('custom-slide', [
  { transform: 'translateX(-100%)', offset: 0 },
  { transform: 'translateX(0)', offset: 1 }
]);
```

---

### ztSetAnimationSpeed()

**描述**: 设置全局动画速度

**参数**:
- `speed` (Number): 速度倍数 (0.5 - 2)

**返回值**: `void`

**示例**:
```javascript
ztSetAnimationSpeed(1.5); // 加速 50%
```

---

## 交互系统 API

### ztShowDialog()

**描述**: 显示对话框

**参数**:
- `options` (Object): 对话框选项
  - `title` (String): 标题
  - `message` (String): 消息内容
  - `type` (String): 类型 ('info', 'success', 'warning', 'error')
  - `buttons` (Array): 按钮数组
  - `closable` (Boolean): 是否可关闭

**返回值**: `Promise<String>` - 点击的按钮 ID

**示例**:
```javascript
const result = await ztShowDialog({
  title: '确认删除',
  message: '确定要删除这个项目吗？',
  type: 'warning',
  buttons: [
    { id: 'cancel', text: '取消', type: 'secondary' },
    { id: 'confirm', text: '确认', type: 'primary' }
  ]
});
```

---

### ztNotify()

**描述**: 显示通知消息

**参数**:
- `options` (Object): 通知选项
  - `type` (String): 类型 ('info', 'success', 'warning', 'error')
  - `message` (String): 消息内容
  - `duration` (Number): 显示时长 (ms)
  - `position` (String): 位置 ('top', 'bottom', 'top-left', 'top-right', etc.)

**返回值**: `void`

**示例**:
```javascript
ztNotify({
  type: 'success',
  message: '操作成功！',
  duration: 3000,
  position: 'top-right'
});
```

---

### ztShowTooltip()

**描述**: 显示工具提示

**参数**:
- `element` (Element): 目标元素
- `content` (String): 提示内容
- `options` (Object, 可选): 选项
  - `position` (String): 位置
  - `trigger` (String): 触发方式 ('hover', 'click', 'focus')

**返回值**: `void`

**示例**:
```javascript
ztShowTooltip(button, '点击查看详情', {
  position: 'top',
  trigger: 'hover'
});
```

---

## 阅读体验 API

### ztShowReadingProgress()

**描述**: 显示阅读进度条

**参数**: 无

**返回值**: `void`

**示例**:
```javascript
ztShowReadingProgress();
```

---

### ztGetReadingProgress()

**描述**: 获取当前阅读进度

**参数**: 无

**返回值**: `Number` - 进度百分比 (0-100)

**示例**:
```javascript
const progress = ztGetReadingProgress();
console.log(`已阅读 ${progress}%`);
```

---

### ztGetChapters()

**描述**: 获取文章章节列表

**参数**: 无

**返回值**: `Array<Chapter>` - 章节数组

**示例**:
```javascript
const chapters = ztGetChapters();
chapters.forEach(chapter => {
  console.log(chapter.title, chapter.id);
});
```

---

### ztNavigateToChapter()

**描述**: 跳转到指定章节

**参数**:
- `chapterId` (String): 章节 ID

**返回值**: `void`

**示例**:
```javascript
ztNavigateToChapter('zt-heading-1');
```

---

### ztEnableReadingMode()

**描述**: 启用阅读模式

**参数**: 无

**返回值**: `void`

**示例**:
```javascript
ztEnableReadingMode();
```

---

### ztSetReadingTheme()

**描述**: 设置阅读模式主题

**参数**:
- `theme` (String): 主题名称 ('light', 'dark', 'sepia', 'night')

**返回值**: `void`

**示例**:
```javascript
ztSetReadingTheme('sepia');
```

---

### ztOpenLightbox()

**描述**: 打开图片灯箱

**参数**:
- `srcOrIndex` (String|Number): 图片 URL 或索引

**返回值**: `void`

**示例**:
```javascript
// 使用 URL
ztOpenLightbox('/images/photo.jpg');

// 使用索引（多图模式）
ztOpenLightbox(2);
```

---

### ztNextImage()

**描述**: 切换到下一张图片

**参数**: 无

**返回值**: `void`

**示例**:
```javascript
ztNextImage();
```

---

## 性能优化 API

### ztRegisterChunk()

**描述**: 注册代码块

**参数**:
- `name` (String): 代码块名称
- `config` (Object): 配置对象
  - `size` (Number): 大小 (bytes)
  - `priority` (String): 优先级 ('high', 'low', 'auto')
  - `dependencies` (Array): 依赖项
  - `load` (Function): 加载函数

**返回值**: `Object` - 代码块对象

**示例**:
```javascript
ztRegisterChunk('my-component', {
  size: 10240,
  priority: 'high',
  dependencies: [],
  load: () => import('./my-component.js')
});
```

---

### ztLazyLoad()

**描述**: 懒加载代码块

**参数**:
- `chunkName` (String): 代码块名称

**返回值**: `Promise<any>` - 加载的模块

**示例**:
```javascript
const component = await ztLazyLoad('my-component');
component.init();
```

---

### ztPreloadChunks()

**描述**: 预加载多个代码块

**参数**:
- `chunkNames` (Array<String>): 代码块名称数组

**返回值**: `Promise<void>`

**示例**:
```javascript
await ztPreloadChunks(['comp1', 'comp2', 'comp3']);
```

---

### ztTrackMemory()

**描述**: 追踪对象内存引用

**参数**:
- `object` (Object): 要追踪的对象
- `context` (String): 上下文描述

**返回值**: `void`

**示例**:
```javascript
const data = fetchData();
ztTrackMemory(data, 'API response data');
```

---

### ztCleanupMemory()

**描述**: 执行内存清理

**参数**: 无

**返回值**: `void`

**示例**:
```javascript
ztCleanupMemory();
```

---

### ztDebounce()

**描述**: 创建防抖函数

**参数**:
- `fn` (Function): 原函数
- `delay` (Number): 延迟时间 (ms)

**返回值**: `Function` - 防抖后的函数

**示例**:
```javascript
const handleSearch = ztDebounce((query) => {
  searchAPI(query);
}, 300);
```

---

### ztThrottle()

**描述**: 创建节流函数

**参数**:
- `fn` (Function): 原函数
- `limit` (Number): 限制时间 (ms)

**返回值**: `Function` - 节流后的函数

**示例**:
```javascript
const handleScroll = ztThrottle(() => {
  updateScrollPosition();
}, 100);
```

---

## 辅助功能 API

### ztEnableA11yMode()

**描述**: 启用辅助功能模式

**参数**: 无

**返回值**: `void`

**示例**:
```javascript
ztEnableA11yMode();
```

---

### ztAnnounceToScreenReader()

**描述**: 向屏幕阅读器宣布消息

**参数**:
- `message` (String): 消息内容
- `priority` (String): 优先级 ('polite', 'assertive')

**返回值**: `void`

**示例**:
```javascript
ztAnnounceToScreenReader('操作已完成', 'polite');
```

---

### ztToggleHighContrast()

**描述**: 切换高对比度模式

**参数**: 无

**返回值**: `void`

**示例**:
```javascript
ztToggleHighContrast();
```

---

## 工具函数 API

### ztStorage.get()

**描述**: 从存储中获取值

**参数**:
- `key` (String): 键名
- `storage` (String, 可选): 存储类型 ('local', 'session', 默认 'local')

**返回值**: `any` - 存储的值

**示例**:
```javascript
const user = ztStorage.get('user');
const settings = ztStorage.get('settings', 'local');
```

---

### ztStorage.set()

**描述**: 向存储中设置值

**参数**:
- `key` (String): 键名
- `value` (any): 值
- `storage` (String, 可选): 存储类型 ('local', 'session', 默认 'local')
- `ttl` (Number, 可选): 过期时间 (ms)

**返回值**: `void`

**示例**:
```javascript
ztStorage.set('user', { name: 'John' });
ztStorage.set('cache', data, 'local', 3600000); // 1小时过期
```

---

### ztStorage.remove()

**描述**: 从存储中移除值

**参数**:
- `key` (String): 键名
- `storage` (String, 可选): 存储类型

**返回值**: `void`

**示例**:
```javascript
ztStorage.remove('user');
```

---

### ztFormatDate()

**描述**: 格式化日期

**参数**:
- `date` (Date|String|Number): 日期
- `format` (String): 格式字符串
- `locale` (String, 可选): 区域设置

**返回值**: `String` - 格式化后的日期字符串

**示例**:
```javascript
ztFormatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');
// '2026-04-10 14:30:00'

ztFormatDate(new Date(), 'MM月DD日', 'zh-CN');
// '04月10日'
```

---

### ztThrottle()

**描述**: 节流函数（见性能优化 API）

---

### ztDebounce()

**描述**: 防抖函数（见性能优化 API）

---

## 事件系统

### ZootopiaCore.on()

**描述**: 监听事件

**参数**:
- `event` (String): 事件名称
- `handler` (Function): 处理函数

**返回值**: `Function` - 取消监听函数

**示例**:
```javascript
const unsubscribe = ZootopiaCore.on('theme:change', (theme) => {
  console.log('Theme changed to:', theme);
});

// 取消监听
unsubscribe();
```

---

### ZootopiaCore.emit()

**描述**: 触发事件

**参数**:
- `event` (String): 事件名称
- `data` (any): 事件数据

**返回值**: `void`

**示例**:
```javascript
ZootopiaCore.emit('theme:change', 'dark');
```

---

## 配置 API

### ZootopiaCore.getConfig()

**描述**: 获取配置值

**参数**:
- `key` (String): 配置键（支持点号分隔的路径）

**返回值**: `any` - 配置值

**示例**:
```javascript
const theme = ZootopiaCore.getConfig('theme.mode');
const maxSize = ZootopiaCore.getConfig('lazyLoad.maxSize');
```

---

### ZootopiaCore.setConfig()

**描述**: 设置配置值

**参数**:
- `key` (String): 配置键
- `value` (any): 配置值

**返回值**: `void`

**示例**:
```javascript
ZootopiaCore.setConfig('theme.mode', 'dark');
ZootopiaCore.setConfig('animations.speed', 1.5);
```

---

## 类型定义

### Chapter

```typescript
interface Chapter {
  id: string;
  title: string;
  level: number;
  element: HTMLElement;
  children: Chapter[];
}
```

### DialogButton

```typescript
interface DialogButton {
  id: string;
  text: string;
  type?: 'primary' | 'secondary' | 'danger';
  action?: () => void | Promise<void>;
}
```

### NotificationOptions

```typescript
interface NotificationOptions {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
```

### PerformanceReport

```typescript
interface PerformanceReport {
  summary: {
    averageChunkLoad: number;
    averageLazyLoad: number;
    averageMemory: number;
    averageRender: number;
    totalChunks: number;
    totalLazyLoads: number;
  };
  details: {
    chunkLoads: Array<{name, duration, size, timestamp}>;
    lazyLoads: Array<{type, duration, timestamp}>;
    memorySnapshots: Array<{used, total, limit, timestamp}>;
    renderTimes: Array<{duration, timestamp}>;
  };
  recommendations: string[];
}
```

---

## 事件列表

### 主题事件

| 事件名 | 描述 | 数据 |
|--------|------|------|
| `theme:change` | 主题改变 | `{ theme: string }` |
| `theme:dark` | 切换到深色模式 | 无 |
| `theme:light` | 切换到浅色模式 | 无 |

### 动画事件

| 事件名 | 描述 | 数据 |
|--------|------|------|
| `animation:start` | 动画开始 | `{ element, animation }` |
| `animation:end` | 动画结束 | `{ element, animation }` |

### 性能事件

| 事件名 | 描述 | 数据 |
|--------|------|------|
| `performance:warning` | 性能警告 | `{ type, value, target }` |
| `memory:leak` | 检测到内存泄漏 | `{ usage, threshold }` |

---

## 常见用法示例

### 页面加载时初始化

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  await ZootopiaInit();

  // 显示阅读进度
  ztShowReadingProgress();

  // 启用懒加载
  ztEnableLazyLoad();
});
```

### 监听主题变化

```javascript
ZootopiaCore.on('theme:change', ({ theme }) => {
  console.log('主题已切换到:', theme);

  // 根据主题执行相应操作
  if (theme === 'dark') {
    // 深色模式特定逻辑
  }
});
```

### 自定义动画

```javascript
// 添加自定义动画
ztAddAnimation('my-fade', [
  { opacity: 0, transform: 'translateY(20px)', offset: 0 },
  { opacity: 1, transform: 'translateY(0)', offset: 1 }
]);

// 应用自定义动画
await ztAnimate('.element', 'my-fade', {
  duration: 500,
  delay: 100
});
```

### 性能监控

```javascript
// 获取性能报告
const report = ztGetPerformanceReport();

console.log('平均代码块加载时间:', report.summary.averageChunkLoad, 'ms');
console.log('平均内存使用:', report.summary.averageMemory, 'MB');

// 查看优化建议
if (report.recommendations.length > 0) {
  console.log('优化建议:');
  report.recommendations.forEach(rec => console.log('-', rec));
}
```

---

**文档版本**: v2.7.0
**最后更新**: 2026-04-10

更多信息请参考:
- [开发者指南](ZOOTOPIA-DEVELOPER-GUIDE.md)
- [主题自定义指南](ZOOTOPIA-THEME-CUSTOMIZATION.md)
- [部署指南](ZOOTOPIA-DEPLOYMENT.md)
- [故障排除指南](ZOOTOPIA-TROUBLESHOOTING.md)
