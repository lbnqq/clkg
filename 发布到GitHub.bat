@echo off
chcp 65001 >nul
echo ========================================
echo       发布博客到 GitHub Pages
echo ========================================
echo.
echo 正在清理缓存...
hexo clean
echo.
echo 正在生成静态文件...
hexo generate
echo.
echo 正在部署到 GitHub...
hexo deploy
echo.
echo ========================================
echo       ✓ 发布成功!
echo ========================================
echo.
echo 访问你的博客: https://lbnqq.github.io/cykg.github.io/
echo.
pause
