# Zootopia API 快速参考

v2.1.0 | 2026-04-10

---

## 核心 API

### ZootopiaCore 对象

```javascript
window.ZootopiaCore
├── config          // 配置对象
├── characters      // 角色数据库
├── districts       // 地区数据库
├── utils           // 工具函数
├── events          // 事件管理器
├── modules         // 模块管理器
├── dom             // DOM 就绪管理器
└── animation       // 动画管理器
```

---

## 工具函数 (Utils)

```javascript
// 防抖
ZootopiaCore.utils.debounce(fn, delay)

// 节流
ZootopiaCore.utils.throttle(fn, limit)

// 随机数
ZootopiaCore.utils.random(min, max)

// 创建元素
ZootopiaCore.utils.createElement(tag, className, content)

// 数组乱序
ZootopiaCore.utils.shuffle(array)
```

---

## 事件管理 (Events)

```javascript
// 添加监听
ZootopiaCore.events.on(element, event, handler, options)

// 一次性监听
ZootopiaCore.events.once(element, event, handler)

// 移除监听
ZootopiaCore.events.off(element, event, handler)

// 事件委托
ZootopiaCore.events.delegate(parent, selector, event, handler)
```

---

## 动画系统 (Animation)

```javascript
// 单个动画
ZootopiaCore.animation.animate(element, type, options)

// 批量动画
ZootopiaCore.animation.animateBatch(elements, type, delay)

// 序列动画
ZootopiaCore.animation.animateSequence(element, types)
```

### 可用动画类型

```
fadeIn, slideUp, slideDown, slideLeft, slideRight
scaleIn, bounce, shake, pulse, rotate, flip
```

---

## 角色数据库 (Characters)

```javascript
// 获取所有角色
ZootopiaCore.characters.getAll()

// 根据ID获取
ZootopiaCore.characters.getById('judy')

// 根据物种获取
ZootopiaCore.characters.getBySpecies('兔子')

// 搜索角色
ZootopiaCore.characters.search('关键词')

// 随机角色
ZootopiaCore.characters.getRandom()
```

---

## 组件 API

```javascript
// 角色卡片
ZootopiaCore.components.CharacterCard.template('judy')

// 对话气泡
ZootopiaCore.components.DialogueBubble.show('judy', '消息', container)

// 徽章系统
ZootopiaCore.components.BadgeSystem.update('pawpsicle', 10)

// 天气组件
ZootopiaCore.components.WeatherWidget.show('sahara', container)

// 任务板
ZootopiaCore.components.TaskBoard.create(container)
```

---

## 游戏系统 (Games)

```javascript
// 启动游戏
ZootopiaCore.games.startGame('guess')    // 猜角色
ZootopiaCore.games.startGame('memory')   // 记忆卡片
ZootopiaCore.games.startGame('catch')    // 接Pawpsicle
ZootopiaCore.games.startGame('quiz')     // 知识问答

// 结束游戏
ZootopiaCore.games.endGame()

// 获取统计
ZootopiaCore.games.getStats()
```

---

## 音乐系统 (Music)

```javascript
// 获取播放器
const player = ZootopiaCore.music.getPlayer()

// 播放控制
player.playTrack(index)
player.pause()
player.next()
player.prev()

// 音量控制
player.setVolume(0.5)
player.toggleMute()

// 播放模式
player.switchMode()  // loop → shuffle → repeat
```

---

## 社交系统 (Social)

```javascript
// 分享按钮
ZootopiaCore.social.share('weibo', url, title)
ZootopiaCore.social.share('wechat', url, title)

// Toast 通知
ZootopiaCore.social.showToast(message, duration)

// 表情反应
ZootopiaCore.social.reactions.create(container, options)

// 评论组件
ZootopiaCore.social.comments.create(container, options)
```

---

## 响应式系统 (Responsive)

```javascript
// 设备检测
ZootopiaCore.responsive.device.isMobile
ZootopiaCore.responsive.device.isTablet
ZootopiaCore.responsive.device.isDesktop

// 当前断点
window.ztGetBreakpoint()  // mobile | tablet | desktop | large

// 屏幕方向
window.ztGetOrientation()  // portrait | landscape
```

---

## 全局快捷函数

```javascript
// 性能
ztGetPerformanceReport()
ztShowPerformanceWidget()
ztEnableMonitoring()

// 兼容性
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
```

---

## 配置选项

```javascript
// 主题色
ZootopiaCore.config.colors.primary    // '#FF9F43'
ZootopiaCore.config.colors.secondary  // '#0ABDE3'
ZootopiaCore.config.colors.accent     // '#10AC84'

// 动画时长
ZootopiaCore.config.animation.fast    // 150ms
ZootopiaCore.config.animation.normal  // 300ms
ZootopiaCore.config.animation.slow    // 500ms

// 性能设置
ZootopiaCore.config.performance.maxConcurrentAnimations  // 3
ZootopiaCore.config.performance.lazyLoadThreshold        // 200ms
```

---

## 数据属性 (HTML)

```html
<!-- 角色 -->
<div data-zt-character-card="judy"></div>

<!-- 对话 -->
<div data-zt-dialogue
     data-zt-character="judy"
     data-zt-message="Try Everything!">
</div>

<!-- 天气 -->
<div data-zt-weather="sahara"></div>

<!-- 动画 -->
<div data-zt-animate="fadeIn" data-zt-delay="200"></div>

<!-- 游戏 -->
<div data-zt-game="guess">开始猜角色</div>

<!-- 分享 -->
<div data-zt-share="weibo">分享到微博</div>

<!-- 音乐 -->
<div data-zt-music-player></div>

<!-- 表情反应 -->
<div data-zt-emoji-reactions></div>

<!-- 评论 -->
<div data-zt-comments></div>
```

---

## 本地存储

| 键名 | 用途 |
|-----|------|
| `zt_gameStats` | 游戏统计 |
| `zt_pawpsicles` | Pawpsicle 数量 |
| `zt_emojiReactions` | 表情反应 |
| `zt_comments` | 评论数据 |
| `zt_musicVolume` | 音乐音量 |
| `zt_musicMode` | 播放模式 |
| `zt_highScores` | 最高分 |
| `zt_debug` | 调试开关 |

---

*快速参考 v2.1.0 | 完整文档见 [ZOOTOPIA-DEV-GUIDE.md](ZOOTOPIA-DEV-GUIDE.md)*
