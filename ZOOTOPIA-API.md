# 疯狂动物城博客系统 - API完整文档

**版本**: v3.2.0
**更新日期**: 2026-04-11

本文档提供所有疯狂动物城博客系统的API接口详细说明。

---

## 📋 目录

- [用户系统 API](#用户系统-api)
- [交互系统 API](#交互系统-api)
- [工具系统 API](#工具系统-api)
- [搜索系统 API](#搜索系统-api)
- [主题系统 API](#主题系统-api)
- [性能系统 API](#性能系统-api)
- [SEO系统 API](#seo系统-api)
- [无障碍 API](#无障碍-api)
- [核心系统 API](#核心系统-api)

---

## 用户系统 API

### 积分管理

#### `ztAddPoints(points, type, metadata)`
添加用户积分。

**参数**:
- `points` (Number): 积分数量
- `type` (String): 积分类型 (comment/like/share/follow/checkin/read)
- `metadata` (Object): 额外元数据

**示例**:
```javascript
ztAddPoints(10, 'comment', { postId: '123' });
```

#### `ztPerformCheckin()`
执行每日签到。

**返回**: Promise<Object> - 签到结果

**示例**:
```javascript
ztPerformCheckin().then(result => {
  console.log('签到成功！', result);
});
```

#### `ztGetUserStats()`
获取用户统计信息。

**返回**: Object - 用户数据

**示例**:
```javascript
const stats = ztGetUserStats();
console.log('当前积分:', stats.points);
console.log('当前等级:', stats.level);
```

#### `ztGetCheckinStats()`
获取签到统计信息。

**返回**: Object - 签到数据

**示例**:
```javascript
const checkin = ztGetCheckinStats();
console.log('连续签到:', checkin.currentStreak);
console.log('总签到天数:', checkin.totalDays);
```

---

## 交互系统 API

### 动画效果

#### `ztAnimate(element, options)`
自定义动画效果。

**参数**:
- `element` (Element): DOM元素
- `options` (Object): 动画配置
  - `properties` (Object): CSS属性
  - `duration` (Number): 时长(ms)
  - `easing` (String): 缓动函数
  - `delay` (Number): 延迟(ms)

**返回**: Promise<void>

**示例**:
```javascript
ztAnimate(element, {
  properties: { transform: 'scale(1.2)' },
  duration: 300,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
});
```

#### `ztFadeIn(element, duration)`
淡入效果。

**参数**:
- `element` (Element): DOM元素
- `duration` (Number): 时长(ms)，默认300

**示例**:
```javascript
ztFadeIn(myElement, 500);
```

#### `ztFadeOut(element, duration)`
淡出效果。

**参数**:
- `element` (Element): DOM元素
- `duration` (Number): 时长(ms)，默认300

**示例**:
```javascript
ztFadeOut(myElement, 500);
```

#### `ztSlideIn(element, direction, duration)`
滑入效果。

**参数**:
- `element` (Element): DOM元素
- `direction` (String): 方向 (up/down/left/right)
- `duration` (Number): 时长(ms)，默认300

**示例**:
```javascript
ztSlideIn(myElement, 'up', 400);
```

#### `ztScale(element, scale, duration)`
缩放效果。

**参数**:
- `element` (Element): DOM元素
- `scale` (Number): 缩放比例
- `duration` (Number): 时长(ms)，默认150

**示例**:
```javascript
ztScale(myElement, 1.2, 200);
```

#### `ztBounce(element, duration)`
弹跳效果。

**参数**:
- `element` (Element): DOM元素
- `duration` (Number): 时长(ms)，默认500

**示例**:
```javascript
ztBounce(buttonElement);
```

#### `ztShake(element, duration)`
抖动效果。

**参数**:
- `element` (Element): DOM元素
- `duration` (Number): 时长(ms)，默认150

**示例**:
```javascript
ztShake(formElement);
```

---

## 工具系统 API

### 密码生成

#### `ztGeneratePassword(length, options)`
生成安全密码。

**参数**:
- `length` (Number): 密码长度，默认16
- `options` (Object): 配置选项
  - `lowercase` (Boolean): 包含小写字母，默认true
  - `uppercase` (Boolean): 包含大写字母，默认true
  - `numbers` (Boolean): 包含数字，默认true
  - `symbols` (Boolean): 包含符号，默认false
  - `excludeSimilar` (Boolean): 排除易混淆字符，默认true

**返回**: String - 生成的密码

**示例**:
```javascript
// 生成16位密码
const password = ztGeneratePassword(16, {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true
});

// 生成密码短语
const passphrase = ztGeneratePassphrase(4);
```

### 二维码生成

#### `ztGenerateQRCode(text, options)`
生成二维码URL。

**参数**:
- `text` (String): 二维码内容
- `options` (Object): 配置选项
  - `size` (Number): 尺寸，默认200
  - `margin` (Number): 边距，默认10

**返回**: String - 二维码图片URL

**示例**:
```javascript
const qrUrl = ztGenerateQRCode('https://example.com', {
  size: 300,
  margin: 10
});
```

### 颜色选择

#### `ztShowColorPicker(target, onColorSelect)`
显示颜色选择器。

**参数**:
- `target` (Element): 目标元素
- `onColorSelect` (Function): 颜色选择回调

**示例**:
```javascript
ztShowColorPicker(button, (color) => {
  console.log('选择的颜色:', color);
  button.style.backgroundColor = color;
});
```

### Markdown编辑器

#### `ztEnhanceMarkdownEditor(textarea)`
增强Markdown编辑器。

**参数**:
- `textarea` (Element): 文本框元素

**示例**:
```javascript
const textarea = document.querySelector('textarea[name="content"]');
ztEnhanceMarkdownEditor(textarea);
```

---

## 搜索系统 API

#### `ztSearch(query, options)`
执行搜索。

**参数**:
- `query` (String): 搜索关键词
- `options` (Object): 搜索配置
  - `fields` (Array): 搜索字段
  - `fuzzy` (Boolean): 模糊搜索
  - `limit` (Number): 结果限制

**返回**: Promise<Array> - 搜索结果

**示例**:
```javascript
ztSearch('疯狂动物城', {
  fields: ['title', 'content', 'tags'],
  fuzzy: true,
  limit: 10
}).then(results => {
  console.log('搜索结果:', results);
});
```

---

## 主题系统 API

#### `ztToggleTheme()`
切换主题（light/dark/auto）。

**示例**:
```javascript
ztToggleTheme();
```

#### `ztSetTheme(themeName)`
设置特定主题。

**参数**:
- `themeName` (String): 主题名称 (light/dark/auto)

**示例**:
```javascript
ztSetTheme('dark');
```

#### `ztGetTheme()`
获取当前主题。

**返回**: String - 当前主题名称

**示例**:
```javascript
const currentTheme = ztGetTheme();
console.log('当前主题:', currentTheme);
```

#### `ztGetColor(colorName)`
获取颜色变量值。

**参数**:
- `colorName` (String): 颜色名称

**返回**: String - 颜色值

**示例**:
```javascript
const primaryColor = ztGetColor('primary');
console.log('主色调:', primaryColor);
```

#### `ztSetColor(colorName, value)`
设置颜色变量值。

**参数**:
- `colorName` (String): 颜色名称
- `value` (String): 颜色值

**示例**:
```javascript
ztSetColor('primary', '#FF9F43');
```

---

## 性能系统 API

### 资源预加载

#### `ztPreload(url, options)`
预加载资源。

**参数**:
- `url` (String): 资源URL
- `options` (Object): 配置选项
  - `type` (String): 资源类型
  - `priority` (String): 优先级 (critical/high/normal/low)
  - `as` (String): 资源类型

**返回**: Promise<void>

**示例**:
```javascript
ztPreload('/images/hero.jpg', {
  type: 'image',
  priority: 'high'
});
```

#### `ztPrefetch(url)`
预取资源。

**参数**:
- `url` (String): 资源URL

**示例**:
```javascript
ztPrefetch('/next-page.html');
```

#### `ztPreloadBatch(resources, options)`
批量预加载资源。

**参数**:
- `resources` (Array): 资源URL数组
- `options` (Object): 配置选项
  - `concurrency` (Number): 并发数，默认3
  - `priority` (String): 优先级

**返回**: Promise<Array>

**示例**:
```javascript
ztPreloadBatch([
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg'
], { concurrency: 2 });
```

#### `ztGetCacheStats()`
获取缓存统计。

**返回**: Object - 缓存数据

**示例**:
```javascript
const stats = ztGetCacheStats();
console.log('缓存大小:', stats.size);
console.log('缓存项:', stats.entries);
```

#### `ztClearCache()`
清空缓存。

**示例**:
```javascript
ztClearCache();
```

### 性能监控

#### `ztGetPerformanceReport()`
获取性能报告。

**返回**: Object - 性能数据

**示例**:
```javascript
const report = ztGetPerformanceReport();
console.log('LCP:', report.coreWebVitals.LCP);
console.log('FID:', report.coreWebVitals.FID);
console.log('CLS:', report.coreWebVitals.CLS);
```

#### `ztGetPerformanceScore()`
获取性能评分。

**返回**: Object - 评分数据

**示例**:
```javascript
const score = ztGetPerformanceScore();
console.log('综合评分:', score.average);
console.log('各项评分:', score.individual);
```

#### `ztGetRecommendations()`
获取优化建议。

**返回**: Array - 建议列表

**示例**:
```javascript
const recommendations = ztGetRecommendations();
recommendations.forEach(rec => {
  console.log(rec.metric, '-', rec.message);
  rec.suggestions.forEach(s => console.log('  -', s));
});
```

---

## SEO系统 API

#### `ztGetSEOData()`
获取SEO数据。

**返回**: Object - SEO信息

**示例**:
```javascript
const seoData = ztGetSEOData();
console.log('标题:', seoData.title);
console.log('描述:', seoData.description);
console.log('关键词:', seoData.keywords);
```

#### `ztUpdateMeta()`
更新元标签。

**示例**:
```javascript
ztUpdateMeta();
```

---

## 无障碍 API

#### `ztAnnounce(message, priority)`
公告消息（屏幕阅读器）。

**参数**:
- `message` (String): 公告内容
- `priority` (String): 优先级 (polite/assertive)，默认polite

**示例**:
```javascript
ztAnnounce('页面加载完成');
ztAnnounce('操作成功', 'assertive');
```

#### `ztTrapFocus(element)`
陷阱焦点在元素内。

**参数**:
- `element` (Element): DOM元素

**示例**:
```javascript
// 打开模态框时使用
const modal = document.querySelector('.modal');
ztTrapFocus(modal);
```

#### `ztRestoreFocus()`
恢复之前的焦点。

**示例**:
```javascript
// 关闭模态框时使用
ztRestoreFocus();
```

---

## 核心系统 API

### 移动端

#### `ztIsMobile()`
检测是否为移动设备。

**返回**: Boolean

**示例**:
```javascript
if (ztIsMobile()) {
  console.log('移动设备');
}
```

#### `ztOptimizeMobile()`
优化移动端体验。

**示例**:
```javascript
if (ztIsMobile()) {
  ztOptimizeMobile();
}
```

### 评论互动

#### `ztGetCommentStats(commentId)`
获取评论统计。

**参数**:
- `commentId` (String): 评论ID

**返回**: Object - 评论统计

**示例**:
```javascript
const stats = ztGetCommentStats('comment-123');
console.log('总反应数:', stats.total);
console.log('反应明细:', stats.breakdown);
```

#### `ztGetAllCommentStats()`
获取所有评论统计。

**返回**: Object - 所有评论数据

**示例**:
```javascript
const allStats = ztGetAllCommentStats();
console.log('所有评论统计:', allStats);
```

---

## 🎯 快速参考

### 常用API速查

```javascript
// 用户系统
ztAddPoints(10, 'comment')
ztPerformCheckin()
ztGetUserStats()

// 动画效果
ztAnimate(element, options)
ztFadeIn(element, 300)
ztBounce(element)

// 工具
ztGeneratePassword(16)
ztGenerateQRCode('text')
ztShowColorPicker(target, callback)

// 主题
ztToggleTheme()
ztSetTheme('dark')
ztGetColor('primary')

// 性能
ztPreload('/image.jpg', { priority: 'high' })
ztGetPerformanceScore()
ztGetCacheStats()

// SEO
ztGetSEOData()
ztUpdateMeta()

// 无障碍
ztAnnounce('消息')
ztTrapFocus(element)
```

---

**API版本**: v3.2.0
**文档更新**: 2026-04-11

更多详情请参考各系统的源代码注释。
