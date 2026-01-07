@echo off
chcp 65001 >nul
echo ========================================
echo       启动本地预览服务器
echo ========================================
echo.
echo 服务器地址: http://localhost:4000/cykg.github.io/
echo.
echo 按 Ctrl+C 可以停止服务器
echo.
hexo server
