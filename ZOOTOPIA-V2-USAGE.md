# 疯狂动物城 v2.1 使用指南

**版本**: v2.1.0
**更新日期**: 2026-04-10

---

## 🚀 快速开始

### 1. 基础组件使用

#### 角色卡片

```html
<!-- 自动渲染角色卡片 -->
<div data-zt-character-card="judy"></div>
<div data-zt-character-card="nick"></div>
```

#### 对话气泡

```html
<!-- 显示角色对话 -->
<div data-zt-dialogue
     data-zt-character="judy"
     data-zt-message="Try Everything!">
</div>
```

#### 天气组件

```html
<!-- 显示指定地区天气 -->
<div data-zt-weather="sahara"></div>
<div data-zt-weather="tundratown"></div>
```

#### 任务板

```html
<!-- 显示 ZPD 任务板 -->
<div data-zt-task-board></div>
```

---

### 2. 社交功能使用

#### 分享按钮

```html
<!-- 创建分享按钮组 -->
<div id="share-buttons"></div>

<script>
  const shareBtns = ztCreateShareButtons();
  document.getElementById('share-buttons').appendChild(shareBtns);
</script>
```

#### 表情反应

```html
<!-- 创建表情反应 -->
<div id="emoji-reactions"></div>

<script>
  const reactions = ztCreateEmojiReactions({
    emojis: ['👍', '❤️', '😂', '🎉']
  });
  document.getElementById('emoji-reactions').appendChild(reactions);
</script>
```

#### 评论组件

```html
<!-- 创建评论组件 -->
<div id="comments"></div>

<script>
  const comments = ztCreateCommentWidget();
  document.getElementById('comments').appendChild(comments);
</script>
```

---

### 3. 游戏系统使用

#### 启动游戏

```html
<!-- 点击右下角 🎮 按钮打开游戏菜单 -->

<!-- 或直接启动特定游戏 -->
<div data-zt-game="guess">开始猜角色游戏</div>
<div data-zt-game="memory">开始记忆卡片</div>
<div data-zt-game="catch">开始接Pawpsicle</div>
```

#### 游戏控制

```javascript
// 获取游戏管理器
const gameManager = ZootopiaCore.games;

// 启动游戏
gameManager.startGame('guess');  // 猜角色
gameManager.startGame('memory'); // 记忆卡片
gameManager.startGame('catch');   // 接Pawpsicle
gameManager.startGame('quiz');    // 知识问答

// 结束当前游戏
gameManager.endGame();
```

---

### 4. 音乐播放器使用

#### 自动初始化

```html
<!-- 页面中添加此标记，自动初始化播放器 -->
<div data-zt-music-player></div>
```

#### 手动控制

```javascript
// 使用快捷方法控制音乐
ztMusic.play(0);     // 播放第1首
ztMusic.pause();    // 暂停
ztMusic.next();     // 下一首
ztMusic.prev();     // 上一首
```

#### 高级控制

```javascript
// 获取播放器实例
const player = ZootopiaCore.music.getPlayer();

// 播放特定曲目
player.playTrack(0);

// 调整音量 (0-1)
player.setVolume(0.5);

// 切换播放模式
player.switchMode(); // loop → shuffle → repeat

// 展开/收起播放器
player.togglePlayer();
```

---

### 5. 动画效果使用

#### HTML 属性触发

```html
<!-- 滚动触发动画 -->
<div data-zt-animate="fadeIn">淡入效果</div>
<div data-zt-animate="slideUp">向上滑入</div>
<div data-zt-animate="scaleIn">放大显示</div>

<!-- 延迟触发 -->
<div data-zt-animate="bounce" data-zt-delay="200">延迟200ms</div>
```

#### JavaScript API

```javascript
// 执行动画
ztAnimate(element, 'fadeIn');
ztAnimate(element, 'bounce');
ztAnimate(element, 'shake');

// 粒子效果
ztParticles(x, y, 10);  // 在坐标处创建10个粒子
```

#### 鼠标交互

```html
<!-- 点击波纹效果 -->
<button data-zt-ripple>点击有波纹</button>
```

---

### 6. 响应式功能

#### 设备检测

```javascript
// 检测设备类型
if (ztIsMobile()) {
  console.log('移动设备');
}

if (ztIsTouch()) {
  console.log('支持触摸');
}

// 获取当前断点
const breakpoint = ztGetBreakpoint();
console.log('当前断点:', breakpoint);
// mobile | tablet | desktop | large

// 获取屏幕方向
const orientation = ztGetOrientation();
console.log('屏幕方向:', orientation);
// portrait | landscape
```

#### 触摸手势

```html
<!-- 滑动手势 -->
<div data-zt-swipe
     data-zt-swipeleft="console.log('左滑')"
     data-zt-swiperight="console.log('右滑')"
     data-zt-tap="console.log('点击')">
</div>
```

---

## 📝 文章示例

### 完整示例文章

```markdown
---
title: 欢迎来到疯狂动物城 v2.1
date: 2026-04-10
tags: [疯狂动物城, 更新]
categories: 动物城
---

## 角色介绍

### 朱迪·霍普斯

<div data-zt-character-card="judy"></div>

### 尼克·王尔德

<div data-zt-character-card="nick"></div>

## 对话演示

<div data-zt-dialogue data-zt-character="judy" data-zt-message="Try Everything!"></div>

<div data-zt-dialogue data-zt-character="nick" data-zt-message="这叫诈骗，亲爱的！"></div>

## 地区天气

### 撒哈拉广场

<div data-zt-weather="sahara"></div>

### 冰川镇

<div data-zt-weather="tundratown"></div>

## 互动游戏

点击右下角 🎮 按钮开始游戏！

## 社交分享

<div data-zt-share="weibo">分享到微博</div>
<div data-zt-share="wechat">分享到微信</div>

---

**喜欢这篇文章吗？快来试试疯狂动物城的精彩功能吧！**
```

---

## 🎨 高级用法

### 自定义组件

```javascript
// 创建自定义角色卡片
const card = ZootopiaCore.components.CharacterCard;
const customCard = card.template('judy');
document.body.appendChild(customCard);

// 显示对话气泡
const dialogue = ZootopiaCore.components.DialogueBubble;
dialogue.show('nick', '你好！', document.body);

// 更新徽章数量
const badges = ZootopiaCore.components.BadgeSystem;
badges.update('pawpsicle', 10);
```

### 自定义动画

```javascript
// 动画管理器
const animator = ZootopiaCore.animator;

// 执行单个动画
animator.animate(element, 'fadeIn', { duration: 500 });

// 批量动画（带延迟）
animator.animateBatch(elements, 'scaleIn', 100);

// 序列动画
animator.animateSequence(element, ['fadeIn', 'slideUp', 'bounce']);
```

### 游戏自定义

```javascript
// 创建自定义游戏
class CustomGame {
  init() {
    // 游戏初始化逻辑
  }

  destroy() {
    // 清理逻辑
  }
}

// 注册游戏
ZootopiaCore.modules.register('customGame', () => {
  const game = new CustomGame();
  game.init();
});
```

---

## 🔧 配置选项

### 主题色配置

```javascript
// 在 _config.butterfly.yml 中配置
theme_color:
  enable: true
  main: "#FF9F43"
  paginator: "#0ABDE3"
  button_hover: "#EE5A24"
```

### 动画配置

```javascript
// 修改动画时长
ZootopiaCore.config.animation.fast = 150;
ZootopiaCore.config.animation.normal = 300;
ZootopiaCore.config.animation.slow = 500;
```

### 性能配置

```javascript
// 修改并发动画数
ZootopiaCore.config.performance.maxConcurrentAnimations = 3;
```

---

## 📊 数据存储

### 本地存储

所有系统使用 localStorage 持久化数据：

- `zt_gameStats` - 游戏统计
- `zt_pawpsicles` - Pawpsicle 收集数
- `zt_emojiReactions` - 表情反应
- `zt_comments` - 评论数据

### 清除数据

```javascript
// 清除所有数据
localStorage.clear();

// 清除特定数据
localStorage.removeItem('zt_gameStats');
localStorage.removeItem('zt_pawpsicles');
```

---

## 🐛 故障排除

### 常见问题

**Q: 游戏按钮不显示？**
A: 确保 `zootopia-games-system.js` 已加载

**Q: 音乐无法播放？**
A: 浏览器可能阻止自动播放，需要用户交互

**Q: 动画不流畅？**
A: 检查是否启用了"减少动画"偏好设置

**Q: 触摸手势不工作？**
A: 确保在触摸设备上测试，检查 `zootopia-responsive.js` 已加载

### 调试模式

```javascript
// 启用调试日志
localStorage.setItem('zt_debug', 'true');

// 查看核心API
console.log(ZootopiaCore);
```

---

## 📚 相关文档

- [CLAUDE.md](CLAUDE.md) - 项目文档
- [FINAL-OPTIMIZATION-REPORT.md](FINAL-OPTIMIZATION-report.md) - 最终优化报告
- [ZOOTOPIA-COMPONENTS.md](ZOOTOPIA-COMPONENTS.md) - 组件详细文档

---

**祝您使用愉快！🐰🦊**
