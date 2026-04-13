# 🐰🦊 疯狂动物城 Zootopia 主题使用指南

## ✨ 主题概述

本博客采用基于《疯狂动物城》(Zootopia) 设计风格的自定义主题，融合了电影中的经典色彩、角色和元素。

## 📁 完整文件结构

```
source/
├── css/
│   ├── zootopia.styl              # 基础主题样式
│   ├── zootopia-enhanced.styl     # 增强样式（动画、特效）
│   └── zootopia-extra.styl        # 额外装饰（Pawpsicles、罚单等）
├── js/
│   ├── zootopia.js                # 核心交互脚本
│   └── zootopia-extra.js          # 额外交互（计数器、徽章）
└── img/
    ├── favicon.svg                # 网站图标
    └── zootopia/
        ├── zpd-badge.svg          # ZPD 徽章
        ├── district-icons.svg     # 地区图标
        ├── judy-nick.svg          # 角色头像
        └── avatar.svg             # 博客头像

_posts/
├── 欢迎来到疯狂动物城.md          # 欢迎文章
├── 疯狂动物城-Pawpsicles-大冒险.md # Pawpsicles 故事
└── ZPD-训练营第一天.md            # ZPD 训练日记
```

## 🎨 色彩系统

| 区域 | 色值 | 应用场景 |
|------|------|----------|
| **Sahara Square** | `#FF9F43` | 主按钮、链接、强调色 |
| **Tundratown** | `#0ABDE3` | 分页、目录、导航 |
| **Rainforest** | `#10AC84` | 引用、边框、标签 |
| **Downtown** | `#5F27CD` | 特殊链接、装饰 |
| **Judy's Orange** | `#EE5A24` | 悬停、点击反馈 |
| **ZPD Gold** | `#FFD700` | 徽章、星星装饰 |

## 📁 文件结构

```
source/
├── css/
│   ├── zootopia.styl              # 基础主题样式
│   └── zootopia-enhanced.styl     # 增强样式
├── js/
│   └── zootopia.js                # 交互脚本
└── img/
    ├── favicon.svg                # 网站图标
    └── zootopia/
        ├── zpd-badge.svg          # ZPD 徽章
        ├── district-icons.svg     # 地区图标
        ├── judy-nick.svg          # 角色头像
        └── avatar.svg             # 博客头像
```

## 🚀 预览主题

```bash
cd my-blog
hexo clean
hexo generate
hexo server
```

访问 http://localhost:4000

## 🎮 功能说明

### 核心功能

#### 1. 地区切换器
侧边栏提供 5 种地区主题切换：
- 🏜️ **Sahara Square** - 温暖金橙色
- ❄️ **Tundratown** - 清爽冰蓝色
- 🌴 **Rainforest** - 生机翠绿色
- 🏙️ **Downtown** - 神秘紫色
- 🥕 **Bunnyburrow** - 田园绿色

#### 2. 点击特效
点击页面任意位置会随机弹出动物城经典台词（15+ 种）：
- "Try Everything! 🐰"
- "Nice try, sweetheart! 🦊"
- "It's called a hustle! 💼"
- "Anyone can be anything! ✨"

#### 3. ZPD 徽章
页面右上角浮动的 ZPD 徽章，带有动画效果

#### 4. 动物城火车
页面底部有动态火车动画，载着各种可爱动物

#### 5. 欢迎横幅
首次访问时会显示欢迎横幅（只显示一次）

### 额外功能

#### 6. Pawpsicles 计数器 🍦
- 左下角显示已售出的 Pawpsicles 数量
- 每次点击页面增加计数
- 数据保存在 localStorage

#### 7. 树懒时钟 🦥
- 右下角显示 Flash 风格的时钟
- 更新速度很慢（每分钟一次）

#### 8. 徽章收集系统 🎖️
- 点击右下角徽章按钮查看
- 根据 Pawpsicles 销量解锁徽章：
  - 1+ : Junior Officer 🏅
  - 5+ : Traffic Cop 👮
  - 10+: Detective 🔍
  - 20+: ZPD Hero 🌟

#### 9. Donut 计时器 🍩
- 右上角 Donut Break 提醒
- 点击会显示 Judy 对话

#### 10. 火车到站公告 🚂
- 随机显示火车到站信息
- 每5分钟有30%概率触发

## 🛠️ 自定义配置

### 修改配色

编辑 `_config.butterfly.yml` 中的 `theme_color` 部分：

```yaml
theme_color:
  enable: true
  main: "#FF9F43"              # 主色
  paginator: "#0ABDE3"         # 分页色
  button_hover: "#EE5A24"      # 悬停色
  # ... 更多配置
```

### 修改点击文字

编辑 `source/js/zootopia-extra.js` 中的 `zootopiaQuotes` 数组：

```javascript
const zootopiaQuotes = [
  { character: 'Judy', quote: '你的台词', emoji: '🐰' },
  { character: 'Nick', quote: '你的台词', emoji: '🦊' },
  // 添加更多...
];
```

### 添加自定义地区

在 `source/js/zootopia.js` 的 `districts` 数组中添加：

```javascript
{
  name: 'Your District',
  emoji: '🎯',
  colors: ['#Color1', '#Color2']
}
```

### 自定义徽章

编辑 `source/js/zootopia-extra.js` 中的 `badges` 数组：

```javascript
const badges = [
  { name: '你的徽章', icon: '🏆', unlocked: count >= 1 },
  // 添加更多...
];
```

## 📝 文章写作指南

### Front Matter 模板

```yaml
---
title: 文章标题
date: 2026-04-07
tags: [Zootopia, 主题]
categories: 疯狂动物城
cover: https://your-cover-image.jpg
top_img: https://your-top-image.jpg
---
```

### 可用的 HTML 类

#### 角色对话气泡
```html
<div class="character-bubble judy">朱迪说的话</div>
<div class="character-bubble nick">尼克说的话</div>
```

#### Judy 罚单
```html
<div class="judy-ticket">
  罚单内容
</div>
```

#### 火车站横幅
```html
<div class="train-station-banner">
  横幅内容
</div>
```

#### 城市徽章
```html
<div class="city-badge">徽章文字</div>
```

#### Donut 时间标记
```html
<div class="donut-time-badge">Donut Break!</div>
```

#### 徽章集合
```html
<div class="badge-collection">
  <div class="badge-item">
    <div class="badge-item-icon">🏆</div>
    <div class="badge-item-name">徽章名</div>
  </div>
</div>
```

#### 城市地图装饰
```html
<div class="city-map-decoration">
  地图内容
</div>
```

#### 动画效果类
```html
<span class="tail-wag">🦊</span>  <!-- 尾巴摇摆 -->
<span class="bunny-hop">🐰</span> <!-- 兔子跳跃 -->
<span class="fox-wink">🦊</span>  <!-- 狐狸眨眼 -->
```

## 🎯 建议的封面图片

使用 Unsplash 上的以下类型图片：
- 城市天际线
- 温暖阳光
- 自然风光
- 现代建筑

## 🌟 部署

```bash
# 生成并部署
hexo clean
hexo generate
hexo deploy
```

## 📚 相关资源

- [Zootopia Official Site](https://movies.disney.com/zootopia)
- [Hexo Butterfly Theme](https://butterfly.js.org/)
- [Unsplash](https://unsplash.com)

---

**Try Everything! 任何人都可以成就任何事** 🐰🦊
