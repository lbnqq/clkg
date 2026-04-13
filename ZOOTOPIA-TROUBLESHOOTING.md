# 疯狂动物城主题 - 故障排除指南

**版本**: v2.7.0
**最后更新**: 2026-04-10
**优化轮次**: 第十轮

---

## 目录

- [常见问题](#常见问题)
- [JavaScript 问题](#javascript-问题)
- [CSS 问题](#css-问题)
- [性能问题](#性能问题)
- [部署问题](#部署问题)
- [浏览器兼容性](#浏览器兼容性)
- [获取帮助](#获取帮助)

---

## 常见问题

### Q: 页面显示空白

**症状**: 访问网站时页面完全空白

**可能原因**:
1. JavaScript 执行错误
2. CSS 文件未加载
3. 主题配置错误

**解决方案**:

1. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 标签页是否有错误
   - 记录错误信息

2. **验证资源加载**
   ```javascript
   // 在控制台运行
   typeof ZootopiaCore  // 应该返回 "object"
   ```

3. **检查配置文件**
   ```yaml
   # _config.butterfly.yml
   inject:
     head:
       # 确保路径正确
       - <link rel="stylesheet" href="/css/zootopia-theme.css">
   ```

### Q: 样式未生效

**症状**: 页面内容显示但样式混乱

**解决方案**:

1. **清除浏览器缓存**
   - Ctrl+Shift+Delete (Windows)
   - Cmd+Shift+Delete (Mac)

2. **检查 CSS 文件**
   - 确认文件存在于 `source/css/` 目录
   - 检查文件权限

3. **验证 inject 配置**
   ```yaml
   # 确保正确加载样式
   inject:
     head:
       - <link rel="stylesheet" href="/css/zootopia-theme.css">
   ```

### Q: 动画不流畅

**症状**: 页面动画卡顿或掉帧

**解决方案**:

1. **启用 GPU 加速**
   ```css
   .animated-element {
     will-change: transform, opacity;
     transform: translateZ(0);
   }
   ```

2. **减少动画元素**
   ```javascript
   // 降低动画复杂度
   ZootopiaCore.setConfig('animations.enabled', false);
   ```

3. **检查性能**
   ```javascript
   const report = ztGetPerformanceReport();
   console.log(report.summary);
   ```

---

## JavaScript 问题

### TypeError: ZootopiaCore is undefined

**原因**: 核心脚本未加载或加载顺序错误

**解决方案**:

1. **检查脚本加载顺序**
   ```yaml
   # _config.butterfly.yml
   inject:
     bottom:
       # 确保 zootopia.js 最先加载
       - <script src="/js/zootopia.js"></script>
       - <script src="/js/zootopia-integrator.js"></script>
   ```

2. **验证文件存在**
   ```bash
   ls source/js/zootopia.js
   ls source/js/zootopia-integrator.js
   ```

### ReferenceError: ztFunction is not defined

**原因**: 调用了不存在的 API 函数

**解决方案**:

1. **检查 API 文档**
   - 确认函数名称拼写正确
   - 验证函数版本支持

2. **查看可用 API**
   ```javascript
   console.log(Object.keys(window).filter(k => k.startsWith('zt')));
   ```

### Uncaught TypeError: Cannot read property 'x' of undefined

**原因**: 访问未定义对象的属性

**解决方案**:

1. **添加空值检查**
   ```javascript
   // ❌ 不安全
   const value = object.property.nested;

   // ✅ 安全
   const value = object?.property?.nested;
   ```

2. **检查对象初始化**
   ```javascript
   // 确保对象已初始化
   if (ZootopiaCore && ZootopiaCore.config) {
     const value = ZootopiaCore.config.key;
   }
   ```

---

## CSS 问题

### 样式冲突

**症状**: 自定义样式被主题样式覆盖

**解决方案**:

1. **提高选择器优先级**
   ```css
   /* ❌ 优先级低 */
   .my-class {
     color: red;
   }

   /* ✅ 优先级高 */
   .zt-card .my-class {
     color: red !important; /* 慎用 !important */
   }
   ```

2. **使用主题变量**
   ```css
   /* 使用主题变量而不是硬编码 */
   .my-element {
     color: var(--zt-primary);
   }
   ```

### 响应式布局问题

**症状**: 移动端显示异常

**解决方案**:

1. **检查视口设置**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

2. **使用响应式类**
   ```css
   @media (max-width: 768px) {
     .my-element {
       font-size: var(--zt-text-base);
     }
   }
   ```

### 深色模式问题

**症状**: 深色模式下颜色显示错误

**解决方案**:

1. **定义深色模式变量**
   ```css
   [data-theme="dark"] {
     --zt-text-primary: #DFE6E9;
     --zt-bg-primary: #1A1A1A;
   }
   ```

2. **确保所有颜色都使用变量**
   ```css
   /* ❌ 不推荐 */
   .element {
     color: #000000;  /* 深色模式下不可见 */
   }

   /* ✅ 推荐 */
   .element {
     color: var(--zt-text-primary);  /* 自动适配 */
   }
   ```

---

## 性能问题

### 页面加载缓慢

**症状**: 首屏加载时间过长

**解决方案**:

1. **优化图片**
   ```bash
   # 使用图片压缩工具
   # tinypng.com 或 squoosh.app
   ```

2. **启用代码分割**
   ```javascript
   // 注册懒加载的代码块
   ztRegisterChunk('heavy-component', {
     load: () => import('./heavy-component.js')
   });
   ```

3. **使用 CDN**
   ```yaml
   # _config.yml
   cdn:
     enable: true
     provider: jsdelivr
   ```

### 内存占用过高

**症状**: 浏览器占用大量内存

**解决方案**:

1. **清理内存**
   ```javascript
   // 手动触发清理
   ztCleanupMemory();
   ```

2. **检查内存泄漏**
   ```javascript
   // 追踪对象引用
   ztTrackMemory(myObject, 'Component state');

   // 查看内存使用
   console.log(ztGetPerformanceReport());
   ```

3. **优化事件监听器**
   ```javascript
   // 使用事件委托
   document.addEventListener('click', (e) => {
     if (e.target.matches('.my-button')) {
       handleClick(e);
     }
   });
   ```

### 动画掉帧

**症状**: 动画不流畅，帧率低于 60fps

**解决方案**:

1. **使用 GPU 加速**
   ```css
   .animated {
     transform: translateZ(0);
     will-change: transform;
   }
   ```

2. **减少重绘**
   ```css
   /* 避免动画以下属性 */
   /* ❌ width, height, padding, margin */
   /* ✅ transform, opacity */
   ```

3. **降低动画复杂度**
   ```css
   :root {
     --zt-anim-base: 200ms;  /* 缩短动画时间 */
   }
   ```

---

## 部署问题

### GitHub Pages 部署失败

**症状**: `hexo deploy` 命令失败

**解决方案**:

1. **检查 Git 配置**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. **验证部署配置**
   ```yaml
   # _config.yml
   deploy:
     type: git
     repo: git@github.com:username/username.github.io.git
     branch: gh-pages
   ```

3. **清理缓存**
   ```bash
   hexo clean
   rm -rf .deploy_git/
   hexo deploy
   ```

### Vercel 构建失败

**症状**: Vercel 构建报错

**解决方案**:

1. **检查构建命令**
   ```json
   {
     "buildCommand": "pnpm run build",
     "outputDirectory": "public"
   }
   ```

2. **验证 package.json**
   ```json
   {
     "scripts": {
       "build": "hexo generate"
     }
   }
   ```

3. **查看构建日志**
   - 访问 Vercel Dashboard
   - 查看具体错误信息

### 自定义域名不工作

**症状**: 自定义域名无法访问

**解决方案**:

1. **创建 CNAME 文件**
   ```bash
   echo "yourdomain.com" > source/CNAME
   ```

2. **配置 DNS**
   ```
   类型: CNAME
   名称: @
   值: your-username.github.io
   ```

3. **等待 DNS 传播**
   - 通常需要 24-48 小时
   - 使用 `dig yourdomain.com` 检查

---

## 浏览器兼容性

### IE11 不支持

**症状**: 网站在 IE11 中无法正常工作

**解决方案**:

本主题不支持 IE11，建议：
1. 使用现代浏览器
2. 添加浏览器升级提示

```html
<!--[if IE]>
  <div class="ie-warning">
    请使用现代浏览器访问此网站
  </div>
<![endif]-->
```

### Safari 特定问题

**症状**: 功能在 Safari 中异常

**解决方案**:

1. **检查前缀**
   ```css
   .element {
     -webkit-transform: translateX(100px);
             transform: translateX(100px);
   }
   ```

2. **Safari 特定修复**
   ```css
   /* 修复 Safari 滚动问题 */
   .scroll-container {
     -webkit-overflow-scrolling: touch;
   }
   ```

### 移动浏览器问题

**症状**: 移动端显示或交互异常

**解决方案**:

1. **添加视口元标签**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   ```

2. **禁用双击缩放**
   ```css
   * {
     touch-action: manipulation;
   }
   ```

---

## 调试技巧

### 启用调试模式

```javascript
// 启用详细日志
ZootopiaCore.setConfig('debug', true);
```

### 检查系统状态

```javascript
// 获取完整状态
console.table(ztGetSystemStatus());
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
performance.mark('start');

// 执行操作
doSomething();

performance.mark('end');
performance.measure('operation', 'start', 'end');

const measure = performance.getEntriesByName('operation')[0];
console.log(`Duration: ${measure.duration}ms`);
```

---

## 获取帮助

### 报告问题

报告问题时请提供：

1. **环境信息**
   ```javascript
   console.log({
     userAgent: navigator.userAgent,
     zootopiaVersion: ZootopiaCore.version,
     systemStatus: ztGetSystemStatus()
   });
   ```

2. **错误信息**
   - 完整的错误堆栈
   - 控制台截图

3. **复现步骤**
   - 详细的操作步骤
   - 预期结果
   - 实际结果

### 文档资源

- [API 参考文档](ZOOTOPIA-API-REFERENCE.md)
- [开发者指南](ZOOTOPIA-DEVELOPER-GUIDE.md)
- [主题自定义指南](ZOOTOPIA-THEME-CUSTOMIZATION.md)
- [部署指南](ZOOTOPIA-DEPLOYMENT.md)

### 社区支持

- GitHub Issues: [提交问题](https://github.com/your-repo/issues)
- 讨论区: [参与讨论](https://github.com/your-repo/discussions)

---

**文档版本**: v2.7.0
**最后更新**: 2026-04-10

更多信息请参考:
- [API 参考文档](ZOOTOPIA-API-REFERENCE.md)
- [开发者指南](ZOOTOPIA-DEVELOPER-GUIDE.md)
- [主题自定义指南](ZOOTOPIA-THEME-CUSTOMIZATION.md)
- [部署指南](ZOOTOPIA-DEPLOYMENT.md)
