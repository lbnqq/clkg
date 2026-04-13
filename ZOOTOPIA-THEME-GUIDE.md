# 🎨 疯狂动物城主题 - 完整使用手册

> "在这里，任何人都可以成就任何事！" - Judy Hopps

---

## 📚 目录

1. [主题概述](#主题概述)
2. [文件结构](#文件结构)
3. [配置说明](#配置说明)
4. [组件使用](#组件使用)
5. [文章模板](#文章模板)
6. [常见问题](#常见问题)

---

## 🎭 主题概述

疯狂动物城主题是一个基于 Hexo + Butterfly 的自定义主题，包含以下特色：

### ✨ 核心特性

- 🎨 **7种地区主题色** - Sahara, Tundratown, Rainforest, Downtown, Bunnyburrow, Little Rodentia, Meadowlands
- 👥 **5个角色系统** - Judy, Nick, Flash, Bogo, Clawhauser
- 🎮 **30+ HTML组件** - 对话气泡、罚单、横幅、徽章、天气...
- ⚡ **6个交互脚本** - 特效、动画、互动功能
- 📄 **12篇主题文章** - 完整的动物城内容

### 🎯 设计理念

- 多样性与包容性（不同体型动物和谐共处）
- 色彩丰富（每个区域有独特配色）
- 互动性强（角色对话、小游戏、收集系统）
- 响应式设计（适配各种设备）

---

## 📁 文件结构

```
my-blog/
├── source/
│   ├── css/                          # 样式文件
│   │   ├── zootopia.css              # 基础主题样式
│   │   ├── zootopia-enhanced.css     # 增强样式和动画
│   │   ├── zootopia-extra.css        # 额外装饰样式
│   │   ├── zootopia-ultimate.css     # 终极样式
│   │   ├── zootopia-advanced.css     # 高级组件样式
│   │   ├── zootopia-header.css       # 头部横幅样式
│   │   └── zootopia-decorations.css  # 页面装饰样式
│   │
│   ├── js/                           # 脚本文件
│   │   ├── zootopia.js               # 核心交互
│   │   ├── zootopia-extra.js         # 额外交互
│   │   ├── zootopia-ultimate.js      # 终极交互
│   │   ├── zootopia-advanced.js      # 高级功能
│   │   ├── zootopia-immersive.js     # 沉浸式体验
│   │   └── zootopia-effects.js       # 特效动画
│   │
│   ├── img/zootopia/                 # 图片资源
│   │   ├── header-banner.svg         # 首页横幅
│   │   ├── page-banner.svg           # 默认横幅
│   │   ├── archive-banner.svg        # 归档横幅
│   │   ├── category-banner.svg       # 分类横幅
│   │   ├── tag-banner.svg            # 标签横幅
│   │   ├── avatar.svg                # 博客头像
│   │   ├── judy-nick.svg             # 角色头像
│   │   ├── district-icons.svg        # 地区图标
│   │   ├── district-seals.svg        # 地区徽章
│   │   ├── zpd-badge.svg             # ZPD徽章
│   │   ├── zpd-sticker.svg           # ZPD贴纸
│   │   └── newspaper.svg             # 报纸图标
│   │
│   ├── _posts/                       # 博客文章
│   │   ├── 欢迎来到疯狂动物城.md
│   │   ├── 疯狂动物城-Pawpsicles-大冒险.md
│   │   ├── ZPD-训练营第一天.md
│   │   ├── 动物城角色档案.md
│   │   ├── 动物城天气预报.md
│   │   ├── 疯狂动物城主题功能演示.md
│   │   ├── 疯狂动物城经典场景回顾.md
│   │   ├── 动物城完全生存指南.md
│   │   ├── 动物城美食指南-Nick的秘方.md
│   │   ├── ZPD每日工作日志.md
│   │   ├── 动物城地铁完全攻略.md
│   │   ├── Gazelle演唱会全记录.md
│   │   └── 动物城最佳拍照地点.md
│   │
│   └── 404.md                        # 自定义404页面
│
├── _config.yml                       # Hexo主配置
└── _config.butterfly.yml             # Butterfly主题配置
```

---

## ⚙️ 配置说明

### 主题色配置 (_config.butterfly.yml)

```yaml
theme_color:
  enable: true
  main: "#FF9F43"              # 主色 - Sahara金橙
  paginator: "#0ABDE3"         # 分页色 - Tundra冰蓝
  button_hover: "#EE5A24"      # 按钮悬停 - Judy橙
  text_selection: "#10AC84"    # 文字选择 - Rainforest绿
  link_color: "#5F27CD"        # 链接色 - Downtown紫
```

### 头部横幅配置

```yaml
index_img: /img/zootopia/header-banner.svg
default_top_img: /img/zootopia/page-banner.svg
archive_img: /img/zootopia/archive-banner.svg
category_img: /img/zootopia/category-banner.svg
tag_img: /img/zootopia/tag-banner.svg
```

### 脚本注入配置

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/css/zootopia.css">
    - <link rel="stylesheet" href="/css/zootopia-enhanced.css">
    - <link rel="stylesheet" href="/css/zootopia-extra.css">
    - <link rel="stylesheet" href="/css/zootopia-ultimate.css">
    - <link rel="stylesheet" href="/css/zootopia-advanced.css">
    - <link rel="stylesheet" href="/css/zootopia-header.css">
    - <link rel="stylesheet" href="/css/zootopia-decorations.css">
  bottom:
    - <script src="/js/zootopia.js"></script>
    - <script src="/js/zootopia-extra.js"></script>
    - <script src="/js/zootopia-ultimate.js"></script>
    - <script src="/js/zootopia-advanced.js"></script>
    - <script src="/js/zootopia-immersive.js"></script>
    - <script src="/js/zootopia-effects.js"></script>
```

---

## 🎨 组件使用

### 角色对话气泡

```html
<div class="character-bubble judy" data-character="Judy Hopps">
  Try Everything! 任何人都可以成就任何事！
</div>

<div class="character-bubble nick" data-character="Nick Wilde">
  It's called a hustle, sweetheart!
</div>
```

**可用角色：** `judy`, `nick`, `flash`, `bogo`, `clawhauser`

### ZPD罚单

```html
<div class="judy-ticket">
  <h3>⚠️ 违规通知</h3>
  <ul>
    <li>违规行为描述</li>
    <li>罚款金额: $50</li>
  </ul>
</div>
```

### 火车站横幅

```html
<div class="train-station-banner">
  <h3>🚂 前往撒哈拉广场</h3>
  <p>Sahara Line - 约25分钟车程</p>
</div>
```

### 夜城地区卡片

```html
<div class="night-city-district">
  <h3>🏙️ Downtown</h3>
  <p>繁华都市中心，商业区</p>
</div>
```

### 徽章集合

```html
<div class="badge-collection">
  <div class="badge-item">
    <div class="badge-item-icon">🐰</div>
    <div class="badge-item-name">Judy</div>
  </div>
  <div class="badge-item">
    <div class="badge-item-icon">🦊</div>
    <div class="badge-item-name">Nick</div>
  </div>
</div>
```

### 地铁站信息

```html
<div class="metro-station">
  <div class="metro-line">🟡 Sahara Line - 撒哈拉广场</div>
  <div class="metro-line">🔵 Tundra Line - 冰川镇</div>
  <div class="metro-line">🟢 Rainforest Line - 雨林区</div>
</div>
```

### 报纸样式

```html
<div class="zootopia-newspaper">
  <div class="newspaper-headline">📰 ZOOTOPIA DAILY NEWS</div>
  <div class="newspaper-date">2026年4月7日</div>
  <div class="newspaper-content">
    <p>新闻内容...</p>
  </div>
</div>
```

### 证书样式

```html
<div class="zootopia-certificate">
  <div class="certificate-title">🏆 荣誉证书</div>
  <div class="certificate-recipient">
    授予 [姓名]<br>
    以表彰 [成就]
  </div>
  <div class="certificate-badge">🎖️</div>
  <div class="certificate-footer">签发信息</div>
</div>
```

### 进度条

```html
<div class="zootopia-progress">
  <div class="zootopia-progress-bar">
    <div class="zootopia-progress-fill" style="width: 75%;"></div>
  </div>
  <div class="zootopia-progress-text">完成度: 75%</div>
</div>
```

### 翻转卡片

```html
<div class="zootopia-flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <div class="flip-card-icon">🎴</div>
      <div class="flip-card-title">正面标题</div>
      <div class="flip-card-desc">翻转查看背面</div>
    </div>
    <div class="flip-card-back">
      <div class="flip-card-icon">🎊</div>
      <div class="flip-card-title">背面标题</div>
      <div class="flip-card-desc">背面内容</div>
    </div>
  </div>
</div>
```

### 时间线卡片

```html
<div class="zootopia-timeline-card">
  <div class="timeline-card-date">2026-04-07</div>
  <div class="timeline-card-title">事件标题</div>
  <div class="timeline-card-content">事件描述内容</div>
</div>
```

### 城市徽章

```html
<div class="city-badge">🏙️ 动物城 - 在这里，一切皆有可能！</div>
```

---

## 📝 文章模板

### 标准文章模板

```markdown
---
title: 文章标题
date: 2026-04-07 12:00:00
tags: [Zootopia, 标签1, 标签2]
categories: 疯狂动物城
cover: https://images.unsplash.com/xxx?w=800
top_img: https://images.unsplash.com/xxx?w=1200
---

## 文章引言

> 引言内容 - 角色名言

---

## 正文内容

### 小节标题

<div class="character-bubble judy" data-character="Judy Hopps">
  角色对话内容
</div>

### 更多内容

使用各种组件丰富文章内容...

---

## 结语

<div class="city-badge">🌟 结束语</div>

**相关文章**:
- [相关文章1](/链接/)
- [相关文章2](/链接/)

---

*最后更新: 2026-04-07*
```

---

## 🎯 地区主题色参考

| 地区 | 英文名 | 颜色代码 | 适用场景 |
|------|--------|----------|----------|
| 🏜️ 撒哈拉广场 | Sahara Square | #FF9F43 | 热情、活力 |
| ❄️ 冰川镇 | Tundratown | #0ABDE3 | 冷静、清新 |
| 🌴 雨林区 | Rainforest District | #10AC84 | 自然、生长 |
| 🏙️ 市中心 | Downtown | #5F27CD | 商务、专业 |
| 🥕 兔子洞 | Bunnyburrow | #26DE81 | 家园、温馨 |
| 🐭 小鼠镇 | Little Rodentia | #EE5A24 | 精致、可爱 |
| 🌿 草地区 | Meadowlands | #FFFFFF | 纯净、开阔 |

---

## 📞 常见问题

### Q: 如何更换主题色？

A: 修改 `_config.butterfly.yml` 中的 `theme_color` 部分，然后运行 `hexo clean && hexo generate`

### Q: 如何添加新组件？

A: 在 `zootopia-ultimate.css` 中添加样式，在文章中使用对应的 HTML 类名

### Q: 如何禁用某些特效？

A: 删除或注释掉对应的 CSS/JS 文件引用

### Q: 如何自定义角色台词？

A: 编辑 `zootopia-immersive.js` 中的 `characterInteractions` 对象

### Q: 如何添加新文章？

A: 使用 `hexo new "文章标题"` 或运行 `新建文章.bat`

---

## 🚀 快速命令

```bash
# 创建新文章
hexo new "文章标题"

# 启动本地服务器
hexo server -p 4001

# 清理缓存
hexo clean

# 生成静态文件
hexo generate

# 部署到GitHub
hexo deploy

# 完整发布流程
hexo clean && hexo generate && hexo deploy
```

---

## 📚 更多资源

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Butterfly 主题文档](https://butterfly.js.org/)
- [疯狂动物城电影官网](https://movies.disney.com/zootopia)

---

<div class="city-badge">🎨 疯狂动物城主题 - Try Everything!</div>

*最后更新: 2026-04-07*
*版本: v2.0 Complete*
