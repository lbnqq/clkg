# 疯狂动物城博客系统 - 快速使用指南 v3.5

**版本**: v3.5.0
**更新日期**: 2026-04-12

---

## 🚀 5分钟快速上手

### 第一步: 基础配置

1. **复制快速启动配置**
```yaml
# 在 _config.butterfly.yml 中添加
inject:
  head:
    - <link rel="stylesheet" href="/css/zootopia-integrated.css">
    - <link rel="stylesheet" href="/css/zootopia-ui-components.css">

  bottom:
    # 核心系统
    - <script src="/js/zootopia-core.js"></script>
    - <script src="/js/zootopia-progressive-loader.js"></script>

    # UI组件
    - <script src="/js/zootopia-ui-components.js"></script>
```

2. **启动博客**
```bash
hexo clean && hexo server
```

---

## 💬 UI组件使用

### 1. 通知组件

```javascript
// 成功通知
ztNotify('保存成功！', 'success');

// 错误通知
ztNotify('操作失败，请重试', 'error');

// 警告通知
ztNotify('注意：此操作不可撤销', 'warning');

// 信息通知
ztNotify('正在处理...', 'info');
```

### 2. 确认对话框

```javascript
// 基础用法
ztConfirm('确定要删除吗？').then(confirmed => {
  if (confirmed) {
    // 用户点击了确认
    console.log('已删除');
  } else {
    // 用户点击了取消
    console.log('已取消');
  }
});

// 自定义选项
ztConfirm('确定要发布文章吗？', {
  title: '发布确认',
  confirmText: '发布',
  cancelText: '暂存'
}).then(confirmed => {
  if (confirmed) {
    publishPost();
  } else {
    saveDraft();
  }
});
```

### 3. 加载指示器

```javascript
// 显示加载
const loading = ztLoading.show('正在保存...');

// 执行操作
setTimeout(() => {
  // 操作完成后隐藏
  loading.hide();
}, 2000);

// 或者手动控制
ztLoading.show('加载中...');
setTimeout(() => {
  ztLoading.hide();
}, 2000);
```

### 4. 进度条

```javascript
// 创建进度条
const progress = ztProgressBar.create({
  position: 'top',
  showPercent: true
});

// 更新进度
progress.update(30, '正在上传...');
progress.update(60, '正在处理...');
progress.update(90, '即将完成...');

// 完成进度
progress.complete('完成！');

// 或手动隐藏
// progress.hide();
```

---

## ⚡ 性能监控

### 使用仪表板

**快捷键**: `Ctrl + Shift + P`

```javascript
// 显示仪表板
ztShowPerformanceDashboard();

// 隐藏仪表板
ztHidePerformanceDashboard();

// 刷新数据
ztRefreshDashboard();
```

### 查看性能数据

```javascript
// 获取性能报告
const report = ztGetPerformanceReport();
console.log('LCP:', report.metrics.LCP.value, 'ms');
console.log('FID:', report.metrics.FID.value, 'ms');

// 获取性能评分
const score = ztGetPerformanceScore();
console.log('平均分:', score.average);

// 获取优化建议
const recommendations = ztGetRecommendations();
recommendations.forEach(rec => {
  console.log(rec.priority, ':', rec.message);
});
```

---

## 📊 渐进式加载

### 查看加载进度

```javascript
// 获取加载进度
const progress = ztGetLoadProgress();
console.log(`已加载: ${progress.loaded}/${progress.total} (${progress.percent}%)`);

// 获取完整状态
const status = ztGetLoadStatus();
console.log('加载状态:', status);
```

### 按需加载功能

```javascript
// 按需加载主题特色（角色、游戏等）
ztLoadOnDemand('zootopia-theme-features.js').then(() => {
  console.log('主题特色已加载');
  // 使用主题特色功能
  const character = ztGetRandomCharacter();
  console.log('随机角色:', character);
});
```

---

## 🎭 主题特色功能

### 角色系统

```javascript
// 获取特定角色
const judy = ztGetCharacter('judy');
console.log(judy.name);        // "朱迪·霍普斯"
console.log(judy.quote);       // "Try Everything! 尝试一切！"

// 获取随机角色
const random = ztGetRandomCharacter();
console.log(random.name);

// 搜索角色
const results = ztGetCharacter('搜索关键词');
```

### ZPD罚单

```javascript
// 生成罚单
const ticket = ztGenerateZPDTicket({
  violation: '超速行驶',
  offender: '尼克·王尔德',
  fine: 200,
  location: '撒哈拉广场'
});

// 显示罚单
document.body.innerHTML = ztDisplayZPDTicket(ticket);
```

### 时间胶囊

```javascript
// 创建时间胶囊
const capsule = ztCreateTimeCapsule(
  '给未来的自己：坚持梦想！',
  '2027-01-01'
);
console.log('时间胶囊已创建:', capsule.id);
```

### 成就系统

```javascript
// 解锁成就
ztUnlockAchievement('first_comment');  // 首次评论
ztUnlockAchievement('points_100');     // 积分达人
ztUnlockAchievement('explorer');       // 城市探险家
```

---

## 🎨 常见使用场景

### 场景1: 表单提交

```javascript
// 表单提交函数
async function submitForm(formData) {
  // 显示加载
  const loading = ztLoading.show('正在提交...');

  try {
    // 提交表单
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    // 隐藏加载
    loading.hide();

    // 显示成功通知
    ztNotify('提交成功！', 'success');

  } catch (error) {
    loading.hide();
    ztNotify('提交失败：' + error.message, 'error');
  }
}
```

### 场景2: 删除确认

```javascript
// 删除文章
async function deletePost(postId) {
  // 确认对话框
  const confirmed = await ztConfirm(
    `确定要删除这篇文章吗？\n此操作不可撤销！`
  );

  if (confirmed) {
    const loading = ztLoading.show('正在删除...');

    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });

      loading.hide();
      ztNotify('文章已删除', 'success');

      // 刷新列表
      loadPosts();

    } catch (error) {
      loading.hide();
      ztNotify('删除失败', 'error');
    }
  }
}
```

### 场景3: 文件上传

```javascript
// 文件上传
async function uploadFile(file) {
  // 创建进度条
  const progress = ztProgressBar.create();

  try {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    // 监听上传进度
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        progress.update(percent, '上传中...');
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        progress.complete('上传成功！');
        ztNotify('文件上传成功', 'success');
      } else {
        progress.hide();
        ztNotify('上传失败', 'error');
      }
    };

    xhr.open('POST', '/api/upload');
    xhr.send(formData);

  } catch (error) {
    progress.hide();
    ztNotify('上传出错', 'error');
  }
}
```

### 场景4: 性能监控

```javascript
// 页面加载完成后显示性能
window.addEventListener('load', () => {
  setTimeout(() => {
    // 获取性能评分
    const score = ztGetPerformanceScore();

    // 如果分数较低，显示建议
    if (score.average < 70) {
      ztNotify(
        `性能评分: ${Math.round(score.average)}分，建议优化`,
        'warning'
      );

      // 自动显示仪表板
      setTimeout(() => {
        ztShowPerformanceDashboard();
      }, 1000);
    }
  }, 1000);
});
```

---

## ⌨️ 快捷键列表

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Shift + P` | 打开/关闭性能仪表板 |
| `Ctrl + K` | 打开搜索 |
| `Ctrl + /` | 聚焦搜索框 |

---

## 🐛 故障排除

### 问题1: UI组件不显示

**原因**: 样式文件未加载

**解决**:
```yaml
# 确保在 _config.butterfly.yml 中添加了样式
inject:
  head:
    - <link rel="stylesheet" href="/css/zootopia-ui-components.css">
```

### 问题2: 函数未定义

**原因**: 脚本加载顺序错误

**解决**:
```yaml
# 确保加载顺序正确
inject:
  bottom:
    - <script src="/js/zootopia-core.js"></script>
    - <script src="/js/zootopia-ui-components.js"></script>
```

### 问题3: 性能仪表板不显示

**原因**: 性能监控API未加载

**解决**:
```yaml
# 确保加载了性能监控系统
inject:
  bottom:
    - <script src="/js/zootopia-performance-monitor.js"></script>
    - <script src="/js/zootopia-performance-dashboard.js"></script>
```

---

## 📚 更多资源

- **完整API文档**: [ZOOTOPIA-API.md](ZOOTOPIA-API.md)
- **示例代码**: [ZOOTOPIA-EXAMPLES.md](ZOOTOPIA-EXAMPLES.md)
- **优化报告**: [OPTIMIZATION-ROUND-19-REPORT.md](OPTIMIZATION-ROUND-19-REPORT.md)

---

**"Try Everything! Anyone can be anything!"**
— Judy Hopps 🐰

**快速指南版本**: v3.5.0
**最后更新**: 2026-04-12

**让每一次点击都充满惊喜 🐰🦊** ✨
