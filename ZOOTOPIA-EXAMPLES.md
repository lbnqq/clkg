# 疯狂动物城博客系统 - 示例代码

**版本**: v3.3.0
**更新日期**: 2026-04-12

本文档提供了疯狂动物城博客系统的常用代码示例，帮助您快速上手。

---

## 📖 目录

1. [用户互动系统](#用户互动系统)
2. [交互动画系统](#交互动画系统)
3. [实用工具系统](#实用工具系统)
4. [主题切换系统](#主题切换系统)
5. [性能监控系统](#性能监控系统)
6. [资源预加载系统](#资源预加载系统)
7. [完整示例](#完整示例)

---

## 用户互动系统

### 1. 添加积分

```javascript
// 基础用法
ztAddPoints(10, 'comment');

// 带额外信息
ztAddPoints(50, 'share', {
  reason: '分享文章到社交媒体',
  postId: 'post-123'
});

// 获取用户统计
const stats = ztGetUserStats();
console.log('当前积分:', stats.points);
console.log('当前等级:', stats.level.name);
console.log('积分进度:', stats.progress);
```

### 2. 每日签到

```javascript
// 执行签到
const result = ztPerformCheckin();

if (result.success) {
  console.log('签到成功！获得积分:', result.points);
  console.log('连续签到:', result.streak, '天');

  if (result.milestone) {
    console.log('里程碑奖励:', result.milestone);
  }
} else {
  console.log('签到失败:', result.message);
}

// 获取签到统计
const checkinStats = ztGetCheckinStats();
console.log('总签到天数:', checkinStats.totalDays);
console.log('当前连续:', checkinStats.currentStreak);
```

### 3. 评论表情反应

表情反应系统会自动为评论添加反应按钮，无需手动调用。如需自定义：

```html
<!-- 手动添加表情反应按钮 -->
<div class="zt-comment-reactions" data-comment-id="comment-123">
  <button class="zt-reaction-btn" data-reaction="like">👍</button>
  <button class="zt-reaction-btn" data-reaction="love">❤️</button>
  <button class="zt-reaction-btn" data-reaction="laugh">😄</button>
  <button class="zt-reaction-btn" data-reaction="surprised">😮</button>
  <button class="zt-reaction-btn" data-reaction="angry">😡</button>
  <button class="zt-reaction-btn" data-reaction="sad">😢</button>
</div>
```

---

## 交互动画系统

### 1. 基础动画

```javascript
// 淡入效果
ztFadeIn(element, 500);

// 淡出效果
ztFadeOut(element, 500);

// 滑入效果
ztSlideIn(element, 'left', 600);
ztSlideIn(element, 'right', 600);
ztSlideIn(element, 'top', 600);
ztSlideIn(element, 'bottom', 600);
```

### 2. 弹性和抖动

```javascript
// 弹跳效果
ztBounce(element, 400);

// 抖动效果
ztShake(element, 300);

// 缩放效果
ztScale(element, 1.2, 300);
```

### 3. 自定义动画

```javascript
// 使用 animate 函数
ztAnimate(element, {
  opacity: 0,
  transform: 'translateY(-20px)'
}, 300);

// 多个属性
ztAnimate(element, {
  opacity: 1,
  transform: 'scale(1) rotate(0deg)',
  backgroundColor: '#FF9F43'
}, 500);
```

### 4. 动画序列

```javascript
// 链式动画
ztFadeIn(element1, 300).then(() => {
  return ztSlideIn(element2, 'left', 300);
}).then(() => {
  return ztBounce(element3, 400);
});

// 使用 Promise.all 并行执行
Promise.all([
  ztFadeIn(element1, 300),
  ztSlideIn(element2, 'left', 300),
  ztScale(element3, 1.2, 300)
]).then(() => {
  console.log('所有动画完成');
});
```

---

## 实用工具系统

### 1. 密码生成器

```javascript
// 生成16位安全密码
const password = ztGeneratePassword(16, {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: true
});

console.log('生成密码:', password);

// 生成简单密码
const simple = ztGeneratePassword(12, {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: false
});

// 生成密码短语
const passphrase = ztGeneratePassphrase(4);
console.log('密码短语:', passphrase);
```

### 2. 二维码生成

```javascript
// 生成二维码
const qrUrl = ztGenerateQRCode('https://example.com', {
  size: 300,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
});

// 显示二维码
document.querySelector('#qr-container').innerHTML =
  `<img src="${qrUrl}" alt="QR Code">`;

// 下载二维码
const link = document.createElement('a');
link.href = qrUrl;
link.download = 'qrcode.png';
link.click();
```

### 3. 颜色选择器

```javascript
// 显示颜色选择器
const button = document.querySelector('#color-button');
ztShowColorPicker(button, (color) => {
  console.log('选择的颜色:', color.hex);
  console.log('RGB值:', color.rgb);
  console.log('HSL值:', color.hsl);

  // 应用颜色
  element.style.backgroundColor = color.hex;
});

// 获取当前主题颜色
const primaryColor = ztGetColor('primary');
const secondaryColor = ztGetColor('secondary');

// 设置自定义颜色
ztSetColor('primary', '#FF0000');
ztSetColor('secondary', '#00FF00');
```

---

## 主题切换系统

### 1. 主题切换

```javascript
// 切换明暗主题
ztToggleTheme();

// 设置特定主题
ztSetTheme('light');
ztSetTheme('dark');
ztSetTheme('auto');  // 跟随系统

// 获取当前主题
const currentTheme = ztGetTheme();
console.log('当前主题:', currentTheme);
```

### 2. 应用预设主题

```javascript
// 撒哈拉广场主题
ztApplyPreset('sahara');

// 冰川镇主题
ztApplyPreset('tundratown');

// 雨林区主题
ztApplyPreset('rainforest');

// 自定义主题
ztSetThemeColors({
  primary: '#FF9F43',
  secondary: '#0ABDE3',
  accent: '#10AC84',
  background: '#FFFFFF',
  text: '#333333'
});
```

### 3. 监听主题变化

```javascript
// 监听主题变化事件
window.addEventListener('themechange', (e) => {
  console.log('主题已切换到:', e.detail.theme);

  // 执行主题变化后的操作
  if (e.detail.theme === 'dark') {
    // 深色主题特定操作
  }
});
```

---

## 性能监控系统

### 1. 获取性能报告

```javascript
// 获取完整性能报告
const report = ztGetPerformanceReport();

console.log('性能指标:');
console.log('- LCP (首屏加载):', report.metrics.LCP.value, 'ms');
console.log('- FID (首次输入):', report.metrics.FID.value, 'ms');
console.log('- CLS (布局偏移):', report.metrics.CLS.value);
console.log('- FCP (首次绘制):', report.metrics.FCP.value, 'ms');
console.log('- TTFB (首字节):', report.metrics.TTFB.value, 'ms');

console.log('性能评分:', report.score);
console.log('优化建议:', report.recommendations);
```

### 2. 获取性能评分

```javascript
// 获取性能评分
const score = ztGetPerformanceScore();

console.log('平均评分:', score.average);
console.log('LCP评分:', score.LCP);
console.log('FID评分:', score.FID);
console.log('CLS评分:', score.CLS);

// 获取优化建议
const recommendations = ztGetRecommendations();
recommendations.forEach(rec => {
  console.log('[', rec.priority, ']', rec.message);
});
```

### 3. 监控性能变化

```javascript
// 监听性能数据更新
if (window.ZootopiaCore) {
  ZootopiaCore.on('performance', (data) => {
    console.log('性能数据更新:', data);

    // 根据性能数据调整策略
    if (data.score.average < 80) {
      console.warn('性能评分较低，建议优化');
    }
  });
}
```

---

## 资源预加载系统

### 1. 预加载资源

```javascript
// 预加载单个资源
ztPreload('/images/large-image.jpg', {
  type: 'image',
  priority: 'high'
});

// 预取页面
ztPrefetch('/next-page/');

// 批量预加载
ztPreloadBatch([
  { url: '/images/img1.jpg', type: 'image' },
  { url: '/images/img2.jpg', type: 'image' },
  { url: '/js/script.js', type: 'script' }
], {
  priority: 'normal',
  concurrent: 3
});
```

### 2. 缓存管理

```javascript
// 获取缓存统计
const cacheStats = ztGetCacheStats();
console.log('缓存命中率:', cacheStats.hitRate);
console.log('缓存大小:', cacheStats.size);
console.log('缓存条目数:', cacheStats.entries);

// 清空缓存
ztClearCache();

// 清除特定缓存
ztClearCache('/images/old-image.jpg');
```

---

## 系统健康检查

### 1. 检查系统状态

```javascript
// 运行完整系统检查
const report = ztSystemCheck();

// 或者使用便捷函数
ztSystemCheck();  // 在控制台显示详细报告

// 获取系统报告对象
const systemReport = ztGetSystemReport();
console.log('系统健康状态:', systemReport.summary.overallHealth);
console.log('活跃系统数:', systemReport.summary.activeSystems);
console.log('可用 API 数:', systemReport.summary.availableAPIs);
```

---

## 完整示例

### 示例 1: 博客文章互动

```javascript
// 文章页面初始化
document.addEventListener('DOMContentLoaded', function() {
  const article = document.querySelector('.article-content');

  // 淡入文章内容
  ztFadeIn(article, 500);

  // 监听阅读进度
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 文章进入视口，添加阅读积分
        ztAddPoints(5, 'read', {
          postId: article.dataset.postId
        });
        observer.disconnect();
      }
    });
  });

  observer.observe(article);
});

// 分享按钮点击
document.querySelectorAll('.share-button').forEach(btn => {
  btn.addEventListener('click', function() {
    const platform = this.dataset.platform;

    // 添加分享积分
    ztAddPoints(15, 'share', {
      platform: platform,
      postId: article.dataset.postId
    });

    // 显示分享成功动画
    ztBounce(this, 400);

    // 执行分享
    // ...
  });
});
```

### 示例 2: 主题切换器

```javascript
// 创建主题切换按钮
const themeButton = document.createElement('button');
themeButton.innerHTML = '🌓';
themeButton.title = '切换主题';
themeButton.className = 'theme-toggle';
themeButton.addEventListener('click', function() {
  ztToggleTheme();

  // 按钮动画
  ztShake(this, 300);

  // 显示当前主题
  const currentTheme = ztGetTheme();
  console.log('已切换到:', currentTheme);
});

document.body.appendChild(themeButton);
```

### 示例 3: 实用工具面板

```html
<div class="utility-panel">
  <h3>实用工具</h3>

  <button onclick="generatePassword()">生成密码</button>
  <button onclick="generateQRCode()">生成二维码</button>
  <button onclick="pickColor()">选择颜色</button>

  <div id="password-result"></div>
  <div id="qrcode-result"></div>
  <div id="color-result"></div>
</div>

<script>
function generatePassword() {
  const password = ztGeneratePassword(16, {
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
  });

  const result = document.querySelector('#password-result');
  result.innerHTML = `<input type="text" value="${password}" readonly>`;
  ztFadeIn(result, 300);
}

function generateQRCode() {
  const url = prompt('请输入URL:');
  if (!url) return;

  const qrUrl = ztGenerateQRCode(url, { size: 300 });
  const result = document.querySelector('#qrcode-result');
  result.innerHTML = `<img src="${qrUrl}" alt="QR Code">`;
  ztSlideIn(result, 'top', 300);
}

function pickColor() {
  const btn = event.target;
  ztShowColorPicker(btn, (color) => {
    const result = document.querySelector('#color-result');
    result.style.backgroundColor = color.hex;
    result.innerHTML = `<span>颜色: ${color.hex}</span>`;
    ztScale(result, 1.05, 200);
  });
}
</script>
```

---

## 开发建议

### 1. 性能优化

```javascript
// 使用防抖和节流
const optimizedScroll = ztThrottle(() => {
  // 滚动处理逻辑
}, 100);

const optimizedInput = ztDebounce((e) => {
  // 输入处理逻辑
}, 300);
```

### 2. 错误处理

```javascript
// 所有 API 调用都应该有错误处理
try {
  ztAddPoints(10, 'custom');
} catch (error) {
  console.error('积分添加失败:', error);
  // 显示用户友好的错误消息
}
```

### 3. 调试模式

```javascript
// 启用调试模式
if (window.ZootopiaCore) {
  ZootopiaCore.config.debug = true;
}

// 运行系统检查
ztSystemCheck();

// 查看性能报告
console.table(ztGetPerformanceReport());
```

---

## 更多资源

- **API 完整文档**: [ZOOTOPIA-API.md](ZOOTOPIA-API.md)
- **快速指南**: [ZOOTOPIA-GUIDE.md](ZOOTOPIA-GUIDE.md)
- **主题使用**: [ZOOTOPIA-THEME.md](ZOOTOPIA-THEME.md)
- **组件指南**: [ZOOTOPIA-COMPONENTS.md](ZOOTOPIA-COMPONENTS.md)

---

**示例代码版本**: v3.3.0
**最后更新**: 2026-04-12

**"Try Everything! Anyone can be anything!"** 🐰🦊
