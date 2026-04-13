# 疯狂动物城主题 - 主题自定义指南

**版本**: v2.7.0
**最后更新**: 2026-04-10
**优化轮次**: 第十轮

---

## 目录

- [色彩系统](#色彩系统)
- [字体系统](#字体系统)
- [间距系统](#间距系统)
- [组件定制](#组件定制)
- [动画定制](#动画定制)
- [响应式定制](#响应式定制)
- [深色模式](#深色模式)
- [高级定制](#高级定制)

---

## 色彩系统

### 主题色彩变量

疯狂动物城主题使用 CSS 自定义属性定义完整的色彩系统：

```css
:root {
  /* 主色系 - 撒哈拉广场金橙 */
  --zt-primary: #FF9F43;
  --zt-primary-light: #FFB976;
  --zt-primary-dark: #EE8A2D;
  --zt-primary-dim: rgba(255, 159, 67, 0.1);

  /* 副色系 - 极地镇冰蓝 */
  --zt-secondary: #0ABDE3;
  --zt-secondary-light: #4DD4ED;
  --zt-secondary-dark: #0097B5;
  --zt-secondary-dim: rgba(10, 189, 227, 0.1);

  /* 强调色 - 雨林区翠绿 */
  --zt-accent: #10AC84;
  --zt-accent-light: #38D9A9;
  --zt-accent-dark: #0E9A75;
  --zt-accent-dim: rgba(16, 172, 132, 0.1);
}
```

### 自定义主题色

在你的自定义 CSS 文件中覆盖变量：

```css
:root {
  /* 使用自定义品牌色 */
  --zt-primary: #YOUR_BRAND_COLOR;
  --zt-secondary: #YOUR_SECONDARY_COLOR;
  --zt-accent: #YOUR_ACCENT_COLOR;
}
```

### 角色色彩

主题包含疯狂动物城角色的专属色彩：

```css
:root {
  /* 朱迪勇敢橙 */
  --zt-judy-orange: #EE5A24;

  /* 尼克智慧紫 */
  --zt-nick-purple: #5F27CD;

  /* 闪电树懒黄 */
  --zt-flash-sloth: #F8B739;

  /* 羊副市长灰白 */
  --zt-bellweather-sheep: #EEF0F2;
}
```

### 功能色

```css
:root {
  --zt-success: #10AC84;  /* 成功 */
  --zt-warning: #F8B739;  /* 警告 */
  --zt-error: #EE5A24;    /* 错误 */
  --zt-info: #0ABDE3;     /* 信息 */
}
```

### 中性色

```css
:root {
  /* 文字色 */
  --zt-text-primary: #2D3436;
  --zt-text-secondary: #636E72;
  --zt-text-tertiary: #B2BEC3;

  /* 背景色 */
  --zt-bg-primary: #FFFFFF;
  --zt-bg-secondary: #F8F9FA;
  --zt-bg-tertiary: #E9ECEF;

  /* 边框色 */
  --zt-border-light: #E9ECEF;
  --zt-border-medium: #CED4DA;
  --zt-border-dark: #ADB5BD;
}
```

---

## 字体系统

### 字体族变量

```css
:root {
  --zt-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
                  'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --zt-font-serif: Georgia, 'Times New Roman', serif;
  --zt-font-mono: 'Consolas', 'Monaco', 'Courier New', monospace;
}
```

### 字号变量

```css
:root {
  --zt-text-xs: 12px;
  --zt-text-sm: 14px;
  --zt-text-base: 16px;
  --zt-text-lg: 18px;
  --zt-text-xl: 20px;
  --zt-text-2xl: 24px;
  --zt-text-3xl: 30px;
  --zt-text-4xl: 36px;
  --zt-text-5xl: 48px;
}
```

### 字重变量

```css
:root {
  --zt-font-light: 300;
  --zt-font-normal: 400;
  --zt-font-medium: 500;
  --zt-font-semibold: 600;
  --zt-font-bold: 700;
}
```

### 自定义字体

```css
/* 1. 引入 Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');

/* 2. 覆盖字体变量 */
:root {
  --zt-font-sans: 'YourFont', sans-serif;
}

/* 3. 使用自定义字体 */
body {
  font-family: var(--zt-font-sans);
}
```

---

## 间距系统

### 间距变量

```css
:root {
  --zt-space-xs: 4px;
  --zt-space-sm: 8px;
  --zt-space-md: 16px;
  --zt-space-lg: 24px;
  --zt-space-xl: 32px;
  --zt-space-2xl: 48px;
  --zt-space-3xl: 64px;
}
```

### 使用间距变量

```css
.my-component {
  padding: var(--zt-space-md) var(--zt-space-lg);
  margin-bottom: var(--zt-space-xl);
  gap: var(--zt-space-sm);
}
```

### 自定义间距

```css
:root {
  /* 调整间距系统以匹配设计规范 */
  --zt-space-xs: 2px;
  --zt-space-sm: 6px;
  --zt-space-md: 12px;
  --zt-space-lg: 18px;
  --zt-space-xl: 24px;
}
```

---

## 组件定制

### 按钮

#### 基础按钮

```html
<button class="zt-btn zt-btn-primary">主要按钮</button>
<button class="zt-btn zt-btn-secondary">次要按钮</button>
<button class="zt-btn zt-btn-outline">轮廓按钮</button>
```

#### 自定义按钮样式

```css
:root {
  /* 自定义按钮圆角 */
  --zt-radius-md: 8px; /* 默认 12px */
}

/* 自定义按钮悬停效果 */
.zt-btn-primary:hover {
  background: var(--zt-primary-dark);
  box-shadow: var(--zt-shadow-lg);
}
```

### 卡片

#### 基础卡片

```html
<div class="zt-card">
  <h3 class="zt-card__title">卡片标题</h3>
  <div class="zt-card__body">卡片内容</div>
</div>
```

#### 自定义卡片

```css
.zt-card {
  /* 自定义卡片样式 */
  border-radius: var(--zt-radius-xl);
  box-shadow: var(--zt-shadow-md);
  padding: var(--zt-space-lg);
}

.zt-card:hover {
  /* 悬浮效果 */
  transform: translateY(-8px);
  box-shadow: var(--zt-shadow-xl);
}
```

### 徽章

#### 基础徽章

```html
<span class="zt-badge">新</span>
<span class="zt-badge zt-badge--primary">重要</span>
```

#### 自定义徽章

```css
.zt-badge {
  background: var(--zt-primary-dim);
  color: var(--zt-primary);
  padding: var(--zt-space-xs) var(--zt-space-sm);
  border-radius: var(--zt-radius-full);
}

.zt-badge--primary {
  background: var(--zt-primary);
  color: var(--zt-text-inverse);
}
```

---

## 动画定制

### 动画速度变量

```css
:root {
  --zt-anim-fast: 200ms;
  --zt-anim-base: 300ms;
  --zt-anim-slow: 500ms;
  --zt-anim-slower: 800ms;
}
```

### 调整动画速度

```css
:root {
  /* 全局加速动画 */
  --zt-anim-fast: 150ms;
  --zt-anim-base: 200ms;
  --zt-anim-slow: 300ms;
  --zt-anim-slower: 500ms;
}
```

### 缓动函数变量

```css
:root {
  --zt-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --zt-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --zt-ease-elastic: cubic-bezier(0.5, 1.5, 0.5, 1);
}
```

### 禁用动画（无障碍）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 响应式定制

### 断点系统

主题使用标准断点：

```css
/* 移动端 */
@media (max-width: 640px) { /* ... */ }

/* 平板 */
@media (max-width: 768px) { /* ... */ }

/* 桌面端 */
@media (min-width: 1024px) { /* ... */ }

/* 大屏 */
@media (min-width: 1280px) { /* ... */ }
```

### 响应式间距

```css
:root {
  --zt-space-md: 16px;
}

@media (max-width: 768px) {
  :root {
    /* 移动端减小间距 */
    --zt-space-md: 12px;
  }
}
```

### 响应式字号

```css
:root {
  --zt-text-5xl: 48px;
}

@media (max-width: 640px) {
  :root {
    /* 移动端减小标题字号 */
    --zt-text-5xl: 36px;
    --zt-text-4xl: 30px;
  }
}
```

---

## 深色模式

### 深色模式变量

```css
[data-theme="dark"] {
  /* 文字色 */
  --zt-text-primary: #DFE6E9;
  --zt-text-secondary: #B2BEC3;
  --zt-text-tertiary: #636E72;

  /* 背景色 */
  --zt-bg-primary: #1A1A1A;
  --zt-bg-secondary: #2D3436;
  --zt-bg-tertiary: #3D4446;

  /* 边框色 */
  --zt-border-light: #3D4446;
  --zt-border-medium: #4D5456;
  --zt-border-dark: #5D6466;

  /* 阴影调整 */
  --zt-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
  --zt-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --zt-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.5);
}
```

### 切换深色模式

```javascript
// 使用 API 切换
ztSetReadingTheme('dark');
```

### 自定义深色模式

```css
[data-theme="dark"] {
  /* 自定义深色背景 */
  --zt-bg-primary: #0D1117;

  /* 自定义深色文字 */
  --zt-text-primary: #C9D1D9;

  /* 自定义深色边框 */
  --zt-border-light: #30363D;
}
```

---

## 高级定制

### 圆角系统

```css
:root {
  --zt-radius-xs: 4px;
  --zt-radius-sm: 8px;
  --zt-radius-md: 12px;
  --zt-radius-lg: 16px;
  --zt-radius-xl: 24px;
  --zt-radius-2xl: 32px;
  --zt-radius-full: 9999px;
}
```

### 阴影系统

```css
:root {
  --zt-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --zt-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
  --zt-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --zt-shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
  --zt-shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.15);
  --zt-shadow-2xl: 0 24px 48px rgba(0, 0, 0, 0.18);
}
```

### Z 轴层级系统

```css
:root {
  --zt-z-dropdown: 1000;
  --zt-z-sticky: 1020;
  --zt-z-fixed: 1030;
  --zt-z-modal-backdrop: 1040;
  --zt-z-modal: 1050;
  --zt-z-popover: 1060;
  --zt-z-tooltip: 1070;
  --zt-z-toast: 1080;
}
```

---

## 完整自定义示例

### 创建品牌主题

```css
/* custom-theme.css */
:root {
  /* 品牌色 */
  --zt-primary: #2563EB;      /* 蓝色 */
  --zt-secondary: #7C3AED;    /* 紫色 */
  --zt-accent: #059669;       /* 绿色 */

  /* 字体 */
  --zt-font-sans: 'Inter', system-ui, sans-serif;

  /* 间距 - 更紧凑 */
  --zt-space-sm: 6px;
  --zt-space-md: 12px;
  --zt-space-lg: 18px;

  /* 圆角 - 更圆润 */
  --zt-radius-md: 16px;
  --zt-radius-lg: 20px;

  /* 动画 - 更快速 */
  --zt-anim-fast: 150ms;
  --zt-anim-base: 250ms;
  --zt-anim-slow: 400ms;
}

/* 深色模式调整 */
[data-theme="dark"] {
  --zt-bg-primary: #0F172A;
  --zt-bg-secondary: #1E293B;
  --zt-text-primary: #F1F5F9;
}
```

### 使用自定义主题

```html
<!-- 在 _config.butterfly.yml 中注入 -->
<link rel="stylesheet" href="/css/custom-theme.css">
```

---

## 实用工具类

### 间距工具类

```html
<div class="zt-m-0">无外边距</div>
<div class="zt-m-4">大外边距</div>
<div class="zt-p-2">小内边距</div>
```

### 文字工具类

```html
<div class="zt-text-primary">主要文字</div>
<div class="zt-text-secondary">次要文字</div>
<div class="zt-text-xl">大字号</div>
<div class="zt-font-bold">粗体</div>
```

### 显示工具类

```html
<div class="zt-flex zt-items-center">Flex 居中</div>
<div class="zt-hidden">隐藏</div>
<div class="zt-block">块级</div>
```

---

**文档版本**: v2.7.0
**最后更新**: 2026-04-10

更多信息请参考:
- [API 参考文档](ZOOTOPIA-API-REFERENCE.md)
- [开发者指南](ZOOTOPIA-DEVELOPER-GUIDE.md)
- [部署指南](ZOOTOPIA-DEPLOYMENT.md)
- [故障排除指南](ZOOTOPIA-TROUBLESHOOTING.md)
