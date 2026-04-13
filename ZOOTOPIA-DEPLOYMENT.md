# 疯狂动物城主题 - 部署指南

**版本**: v2.7.0
**最后更新**: 2026-04-10
**优化轮次**: 第十轮

---

## 目录

- [部署前准备](#部署前准备)
- [本地构建](#本地构建)
- [GitHub Pages 部署](#github-pages-部署)
- [Vercel 部署](#vercel-部署)
- [Netlify 部署](#netlify-部署)
- [自托管部署](#自托管部署)
- [CI/CD 配置](#cicd-配置)
- [性能优化](#性能优化)
- [故障排除](#故障排除)

---

## 部署前准备

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

### 安装依赖

```bash
cd my-blog
pnpm install
```

### 配置检查

确保以下配置正确：

1. **Hexo 配置** (_config.yml)
```yaml
url: https://your-username.github.io  # 修改为你的 URL
root: /
permalink: :year/:month/:day/:title/
```

2. **主题配置** (_config.butterfly.yml)
```yaml
# 检查所有路径和 URL 是否正确
```

---

## 本地构建

### 完整构建

```bash
# 清理、生成、部署
hexo clean && hexo generate && hexo deploy
```

### 仅生成静态文件

```bash
hexo generate
# 输出在 public/ 目录
```

### 本地预览构建结果

```bash
# 生成后启动服务器
hexo generate && hexo server --prefix public
```

### 构建优化

```javascript
// 在 _config.yml 中优化构建
minify:
  html:
    enable: true
    exclude:
  css:
    enable: true
    exclude:
      - '*.min.css'
  js:
    enable: true
    exclude:
      - '*.min.js'
```

---

## GitHub Pages 部署

### 方法 1: 使用 Hexo 部署

1. **配置部署**

```yaml
# _config.yml
deploy:
  type: git
  repo: git@github.com:username/username.github.io.git
  branch: gh-pages
  message: "Deploy: {{ now('YYYY-MM-DD HH:mm:ss') }}"
```

2. **安装部署插件**

```bash
pnpm add hexo-deployer-git --save-dev
```

3. **执行部署**

```bash
hexo clean && hexo generate && hexo deploy
```

### 方法 2: 使用 GitHub Actions

1. **创建工作流**

```yaml
# .github/workflows/deploy.yml
name: Deploy Blog

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8

    - name: Install dependencies
      run: pnpm install

    - name: Generate
      run: pnpm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
        publish_branch: gh-pages
```

2. **推送到 GitHub**

```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push origin main
```

### 自定义域名

1. **创建 CNAME 文件**

```bash
echo "yourdomain.com" > source/CNAME
```

2. **配置 DNS**

在域名提供商添加 CNAME 记录：
```
CNAME your-username.github.io
```

---

## Vercel 部署

### 方法 1: 通过 Vercel CLI

1. **安装 Vercel CLI**

```bash
pnpm add -g vercel
```

2. **登录**

```bash
vercel login
```

3. **部署**

```bash
vercel --prod
```

### 方法 2: 通过 Vercel Dashboard

1. **导入项目**

访问 [vercel.com](https://vercel.com) → Import Project

2. **配置构建设置**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "installCommand": "pnpm install"
}
```

3. **环境变量**

无需特殊环境变量

### vercel.json 配置

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "public"
      }
    }
  ],
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/:path*"
    }
  ]
}
```

### 自定义域名

1. 在 Vercel Dashboard → Settings → Domains
2. 添加你的域名
3. 配置 DNS 记录

---

## Netlify 部署

### 方法 1: 通过 Netlify CLI

1. **安装 Netlify CLI**

```bash
pnpm add -g netlify-cli
```

2. **登录**

```bash
netlify login
```

3. **初始化**

```bash
netlify init
```

4. **部署**

```bash
netlify deploy --prod
```

### 方法 2: 通过 Git 集成

1. **在 Netlify 中导入 Git 仓库**

2. **配置构建设置**

```
Build command: npm run build
Publish directory: public
```

3. **环境变量**

```bash
NODE_VERSION=18
```

### netlify.toml 配置

```toml
[build]
  command = "npm run build"
  publish = "public"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 自托管部署

### 使用 Nginx

1. **构建网站**

```bash
hexo generate
```

2. **配置 Nginx**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/my-blog/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

3. **部署**

```bash
# 复制文件到服务器
scp -r public/* user@server:/var/www/my-blog/public/

# 重启 Nginx
sudo systemctl restart nginx
```

### 使用 Docker

1. **创建 Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

FROM nginx:alpine
COPY --from=0 /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

2. **构建镜像**

```bash
docker build -t my-blog .
```

3. **运行容器**

```bash
docker run -d -p 80:80 --name my-blog my-blog
```

---

## CI/CD 配置

### GitHub Actions 完整配置

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install pnpm
      uses: pnpm/action-setup@v2

    - name: Install dependencies
      run: pnpm install

    - name: Lint
      run: pnpm run lint
      continue-on-error: true

  build:
    needs: test
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install pnpm
      uses: pnpm/action-setup@v2

    - name: Install dependencies
      run: pnpm install

    - name: Generate
      run: pnpm run build

    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: public
        path: public/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Download artifacts
      uses: actions/download-artifact@v3
      with:
        name: public
        path: public/

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

---

## 性能优化

### 构建优化

```yaml
# _config.yml
minify:
  html:
    enable: true
    removeComments: true
    removeCommentsFromCDATA: true
    collapseWhitespace: true
  css:
    enable: true
  js:
    enable: true
    mangle: true
```

### 图片优化

使用 Hexo 插件：

```bash
pnpm add hexo-filter-image --save-dev
```

```yaml
# _config.yml
filter_image:
  enable: true
  svgo:
    enable: true
  webp:
    enable: true
  jpg:
    quality: 80
  png:
    quality: 80
```

### CDN 配置

```yaml
# _config.yml
# 使用 CDN 加速静态资源
cdn:
  enable: true
  provider: jsdelivr
  url: https://cdn.jsdelivr.net/npm/your-repo@latest
```

---

## 故障排除

### 部署失败

1. **检查依赖**
```bash
rm -rf node_modules
pnpm install
```

2. **清理缓存**
```bash
hexo clean
rm -rf .deploy_git/
```

3. **检查构建日志**
```bash
hexo generate --debug
```

### 页面空白

1. **检查 JavaScript 控制台错误**
2. **验证所有资源文件是否正确加载**
3. **检查 CDN 链接是否有效**

### 样式丢失

1. **确认 CSS 文件路径正确**
2. **检查 inject 配置**
3. **验证 CSS 文件是否成功部署**

---

## 监控和维护

### 性能监控

使用 PageSpeed Insights 或 Lighthouse：

```bash
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

### 自动化检查

```yaml
# .github/workflows/monitor.yml
name: Performance Monitor

on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 0:00

jobs:
  monitor:
    runs-on: ubuntu-latest

    steps:
    - name: Check performance
      run: |
        curl -s https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yourdomain.com | jq '.lighthouseResult.categories.performance.score'
```

---

**文档版本**: v2.7.0
**最后更新**: 2026-04-10

更多信息请参考:
- [API 参考文档](ZOOTOPIA-API-REFERENCE.md)
- [开发者指南](ZOOTOPIA-DEVELOPER-GUIDE.md)
- [主题自定义指南](ZOOTOPIA-THEME-CUSTOMIZATION.md)
- [故障排除指南](ZOOTOPIA-TROUBLESHOOTING.md)
