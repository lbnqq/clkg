# 疯狂动物城 v2.1.1 快速开始

**版本**: v2.1.1
**更新日期**: 2026-04-10

---

## 🚀 5 分钟快速上手

### 1. 验证安装

```bash
# 1. 进入项目目录
cd my-blog

# 2. 启动本地服务器
hexo server

# 3. 打开浏览器访问
http://localhost:4000
```

### 2. 运行健康检查

打开浏览器控制台（F12），运行：

```javascript
// 运行系统健康检查
ztHealthCheck()
```

你应该看到类似这样的输出：

```
🏥 疯狂动物城系统健康检查
📋 核心功能
✅ ZootopiaCore 对象存在 (0.05ms)
✅ 版本号 (0.02ms)
...

📊 检查完成: 18/18 通过 (100%)
```

### 3. 测试核心功能

```javascript
// 1. 测试角色数据库
const judy = ZootopiaCore.characters.getById('judy');
console.log(judy.name); // "朱迪·霍普斯"

// 2. 测试动画
ztAnimate(document.body, 'bounce');

// 3. 测试粒子效果
ztParticles(window.innerWidth / 2, window.innerHeight / 2, 10);

// 4. 显示性能监控
ztShowPerformanceWidget(); // 按 Ctrl+Shift+P 切换
```

---

## 📚 常用功能

### 角色卡片

```html
<!-- 自动渲染角色卡片 -->
<div data-zt-character-card="judy"></div>
<div data-zt-character-card="nick"></div>
```

### 对话气泡

```html
<div data-zt-dialogue
     data-zt-character="judy"
     data-zt-message="Try Everything!">
</div>
```

### 游戏系统

```javascript
// 点击右下角 🎮 按钮
// 或使用 API
ZootopiaCore.games.startGame('guess');  // 猜角色
ZootopiaCore.games.startGame('memory'); // 记忆卡片
```

### 音乐播放器

```javascript
// 控制音乐
ztMusic.play(0);  // 播放第一首
ztMusic.pause();  // 暂停
ztMusic.next();   // 下一首
```

---

## 🔧 开发者工具

### 性能监控

```javascript
// 启用性能监控
localStorage.setItem('zt_enable_monitoring', 'true');
location.reload();

// 显示监控面板
ztShowPerformanceWidget();

// 导出性能报告
const report = ztGetPerformanceReport();
console.log(report);
```

### 浏览器兼容性检查

```javascript
// 检查兼容性
const result = ztCheckCompatibility();

// 获取浏览器信息
const info = ztGetBrowserInfo();
console.log(info);
```

### 模块按需加载

```javascript
// 按需加载游戏模块
document.addEventListener('click', function handler() {
  ztLoadGames();
  this.removeEventListener('click', handler);
}, { once: true });
```

---

## 📖 文档导航

| 文档 | 用途 | 适合人群 |
|------|------|---------|
| [ZOOTOPIA-V2-USAGE.md](ZOOTOPIA-V2-USAGE.md) | 使用指南和示例 | 所有用户 |
| [ZOOTOPIA-DEV-GUIDE.md](ZOOTOPIA-DEV-GUIDE.md) | 完整开发者指南 | 开发者 |
| [ZOOTOPIA-API-QUICK-REF.md](ZOOTOPIA-API-QUICK-REF.md) | API 快速参考 | 开发者 |
| [FINAL-OPTIMIZATION-REPORT.md](FINAL-OPTIMIZATION-REPORT.md) | 优化报告 | 技术团队 |

---

## 🎯 常见任务

### 添加新角色

编辑 `source/js/zootopia-core.js`:

```javascript
const CharacterDatabase = {
  // ... 现有角色
  'my-character': {
    id: 'my-character',
    name: '我的角色',
    species: '狐狸',
    personality: ['聪明', '幽默'],
    quote: '我的经典台词',
    color: '#FF6B6B',
    badge: 'my-badge'
  }
};
```

### 创建自定义动画

在 CSS 文件中添加：

```css
@keyframes myAnimation {
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}
```

然后使用：

```javascript
ztAnimate(element, 'myAnimation');
```

### 自定义主题色

编辑 `_config.butterfly.yml`:

```yaml
theme_color:
  enable: true
  main: "#FF9F43"      # 主色
  paginator: "#0ABDE3" # 分页色
  button_hover: "#EE5A24" # 按钮悬停色
  text_selection: "#00BCD4" # 文本选择色
  link_bg: "#FF9F43"   # 链接背景
  link_color: "#fff"   # 链接文字
```

---

## 🐛 故障排除

### 游戏无法启动

```javascript
// 检查游戏系统是否加载
console.log(ZootopiaCore.games);

// 检查游戏容器
console.log(document.querySelector('.zt-game-container'));
```

### 动画不流畅

```javascript
// 检查并发动画数
console.log(ZootopiaCore.config.performance.maxConcurrentAnimations);

// 减少并发数
ZootopiaCore.config.performance.maxConcurrentAnimations = 2;
```

### 本地存储问题

```javascript
// 检查存储可用性
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('✅ 本地存储可用');
} catch (e) {
  console.warn('❌ 本地存储不可用:', e);
}
```

---

## 🎨 快速示例

### 创建欢迎横幅

```html
<div id="welcome-banner" style="display:none;"></div>

<script>
ZootopiaCore.dom.then(() => {
  const banner = ZootopiaCore.components.WelcomeBanner;
  banner.create(document.getElementById('welcome-banner'));
  banner.show();
});
</script>
```

### 创建徽章系统

```html
<div class="zt-badges">
  <div class="zt-badge" data-zt-badge="pawpsicle">
    <span class="zt-badge-icon">🍦</span>
    <span class="zt-badge-count">0</span>
  </div>
</div>

<script>
ZootopiaCore.components.BadgeSystem.update('pawpsicle', 10);
</script>
```

### 创建任务板

```html
<div id="task-board"></div>

<script>
ZootopiaCore.dom.then(() => {
  ZootopiaCore.components.TaskBoard.create(
    document.getElementById('task-board')
  );
});
</script>
```

---

## ⌨️ 快捷键

| 快捷键 | 功能 |
|-------|------|
| `Ctrl + Shift + P` | 显示/隐藏性能监控 |
| `F12` | 打开开发者控制台 |

---

## 🌐 全局函数速查

```javascript
// 健康检查
ztHealthCheck()

// 性能相关
ztGetPerformanceReport()
ztShowPerformanceWidget()
ztEnableMonitoring()

// 兼容性相关
ztCheckCompatibility()
ztGetBrowserInfo()

// 模块加载
ztLoadGames()
ztLoadSocial()
ztLoadMusic()

// 动画
ztAnimate(element, type)
ztParticles(x, y, count)

// 音乐
ztMusic.play(0)
ztMusic.pause()
ztMusic.next()
ztMusic.prev()

// 响应式
ztIsMobile()
ztGetBreakpoint()
ztGetOrientation()
```

---

## 📞 获取帮助

1. 查看文档：[ZOOTOPIA-DEV-GUIDE.md](ZOOTOPIA-DEV-GUIDE.md)
2. 运行健康检查：`ztHealthCheck()`
3. 查看控制台错误信息
4. 检查浏览器兼容性：`ztGetBrowserInfo()`

---

*快速开始指南 v2.1.1 | 最后更新: 2026-04-10*
