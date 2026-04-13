# 疯狂动物城博客系统 - 快速使用指南

**版本**: v3.2.0
**更新日期**: 2026-04-11

欢迎使用疯狂动物城博客系统！本指南将帮助您快速上手。

---

## 🚀 快速开始

### 1. 系统要求

- **Hexo**: 静态站点生成器
- **Butterfly 主题**: 基于Butterfly主题定制
- **现代浏览器**: Chrome、Firefox、Safari、Edge

### 2. 安装步骤

```bash
# 进入项目目录
cd my-blog

# 安装依赖
pnpm install

# 启动本地服务器
hexo server

# 访问博客
# 打开浏览器访问 http://localhost:4000
```

### 3. 核心文件结构

```
my-blog/
├── source/
│   ├── js/              # JavaScript系统
│   │   ├── zootopia-core.js           # 核心系统（必需）
│   │   ├── zootopia-microinteractions.js  # 微交互
│   │   ├── zootopia-user-points.js        # 用户积分
│   │   ├── zootopia-checkin.js           # 每日签到
│   │   └── ... (共21个系统)
│   │
│   └── css/             # 样式文件
│       ├── zootopia.css               # 基础样式
│       ├── zootopia-animations.css    # 动画样式
│       └── ... (共7个文件)
│
├── _config.yml              # Hexo主配置
├── _config.butterfly.yml    # Butterfly主题配置
└── package.json
```

---

## ⚙️ 基础配置

### 主题颜色配置

编辑 `_config.butterfly.yml`:

```yaml
theme_color:
  enable: true
  primary: '#FF9F43'      # 金橙色 - 撒哈拉广场
  secondary: '#0ABDE3'    # 冰蓝色 - 冰川镇
  accent: '#10AC84'      # 翠绿色 - 雨林区
```

### 启用/禁用功能

所有系统都可以独立配置，在 `_config.butterfly.yml` 的 `inject` 部分：

```yaml
inject:
  bottom:
    # 核心系统（必需）
    - <script src="/js/zootopia-core.js"></script>

    # 按需启用其他系统
    - <script src="/js/zootopia-user-points.js"></script>
    - <script src="/js/zootopia-checkin.js"></script>
    # ... 添加或注释掉不需要的系统
```

---

## 🎨 使用主题功能

### 1. 评论表情反应

系统会自动为所有评论添加表情反应功能：

- 👍 赞
- ❤️ 喜爱
- 😄 好笑
- 😮 惊讶
- 😡 生气
- 😢 难过

**使用方式**:
1. 点击任意表情按钮即可添加反应
2. 再次点击可取消反应
3. 系统自动统计和保存

### 2. 用户积分系统

**积分获取方式**:
- 发表评论: +10积分
- 被点赞: +5积分
- 分享文章: +15积分
- 每日签到: +5积分

**等级系统**:
- 🐣 新手市民 (0积分)
- 👮 实习警察 (100积分)
- 👮‍♂️ 正式警员 (500积分)
- 🎖️ 资深警员 (1000积分)
- 🏆 警长 (2000积分)
- 👑 局长 (5000积分)

### 3. 每日签到

- 点击签到按钮获取积分
- 连续签到有额外奖励
- 7天、30天、100天、365天里程碑奖励

### 4. 主题切换

- 使用 `ztToggleTheme()` 切换明暗主题
- 支持自动跟随系统主题
- 可视化主题切换器（如果启用）

---

## 🔧 实用工具

### 密码生成器

```javascript
// 生成16位安全密码
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

```javascript
// 生成二维码
const qrUrl = ztGenerateQRCode('https://example.com', {
  size: 300
});

// 显示二维码
document.querySelector('#qr-container').innerHTML =
  `<img src="${qrUrl}" alt="QR Code">`;
```

### 颜色选择器

```javascript
ztShowColorPicker(button, (color) => {
  console.log('选择的颜色:', color);
  // 使用颜色...
});
```

---

## ⌨️ 键盘快捷键

### 全局快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + K` | 打开搜索 |
| `Ctrl + /` | 搜索框聚焦 |
| `Ctrl + Shift + D` | 调试模式 |
| `Ctrl + Shift + I` | 系统信息 |
| `Esc` | 关闭模态框 |

### 导航快捷键

| 快捷键 | 功能 |
|--------|------|
| `g + h` | 返回首页 |
| `g + g` | 跳到顶部 |
| `Shift + g` | 跳到底部 |
| `j / k` | 下/上滚动 |

### 阅读快捷键

| 快捷键 | 功能 |
|--------|------|
| `r` | 阅读模式 |
| `d` | 深色模式 |
| `t` | 目录 |
| `n / p` | 下一/上一章 |

---

## 📱 移动端使用

### 触摸手势

- **滑动**: 上下左右滑动导航
- **点击**: 标准点击操作
- **长按**: 显示上下文菜单

### 移动端导航

- **返回顶部**: 右下角浮动按钮
- **底部导航**: 快速访问主要页面
- **触摸反馈**: 波纹效果反馈

---

## 🎯 自定义开发

### 调用API

```javascript
// 添加积分
ztAddPoints(10, 'custom', { reason: '活动完成' });

// 动画效果
ztFadeIn(element, 500);

// 主题切换
ztSetTheme('dark');

// 获取性能
const score = ztGetPerformanceScore();
console.log('性能评分:', score.average);
```

### 监听事件

```javascript
// 监听主题变化
window.addEventListener('themechange', (e) => {
  console.log('主题已切换到:', e.detail.theme);
});

// 监听性能数据
ZootopiaCore.on('performance', (data) => {
  console.log('性能数据:', data);
});
```

### 自定义主题

```javascript
// 使用预设主题
ztApplyPreset('sahara');  // 撒哈拉广场
ztApplyPreset('tundratown');  // 冰川镇
ztApplyPreset('rainforest');  // 雨林区

// 自定义颜色
ztSetColor('primary', '#FF0000');
ztSetColor('secondary', '#00FF00');
ztSetColor('accent', '#0000FF');
```

---

## 🐛 故障排除

### 常见问题

**Q: 某些功能不工作？**
A: 检查浏览器控制台是否有错误，确保JavaScript已启用。

**Q: 主题切换不生效？**
A: 清除浏览器缓存，或检查 `_config.butterfly.yml` 配置。

**Q: 积分不保存？**
A: 检查浏览器的localStorage是否启用。

**Q: 性能问题？**
A: 使用 `ztGetPerformanceReport()` 检查性能指标。

### 调试模式

按 `Ctrl + Shift + D` 打开调试模式，查看系统信息：

```javascript
// 查看核心系统信息
ZootopiaCore.debug();

// 查看系统信息
console.table(ZootopiaCore.getInfo());

// 查看性能报告
console.log(ztGetPerformanceReport());
```

---

## 📚 更多资源

### 文档

- **API完整文档**: [ZOOTOPIA-API.md](ZOOTOPIA-API.md)
- **主题使用指南**: [ZOOTOPIA-THEME.md](ZOOTOPIA-THEME.md)
- **元素完整清单**: [ZOOTOPIA-ELEMENTS.md](ZOOTOPIA-ELEMENTS.md)
- **组件使用指南**: [ZOOTOPIA-COMPONENTS.md](ZOOTOPIA-COMPONENTS.md)
- **优化报告**: [OPTIMIZATION-ROUND-15-REPORT.md](OPTIMIZATION-ROUND-15-REPORT.md)

### 技术支持

如遇问题，请：
1. 查看浏览器控制台错误信息
2. 检查相关文档
3. 确认配置文件正确

---

## 🎉 享受使用

**"Try Everything! Anyone can be anything!"**
— Judy Hopps 🐰

祝您使用愉快！✨

---

**快速指南版本**: v3.2.0
**最后更新**: 2026-04-11
