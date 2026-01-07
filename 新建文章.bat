@echo off
chcp 65001 >nul
echo ========================================
echo       Hexo 博客文章创建工具
echo ========================================
echo.
set /p title="请输入文章标题: "
echo.
echo 正在创建文章: %title%
hexo new "%title%"
echo.
echo ✓ 文章已创建!
echo 文件位置: source\_posts\%title%.md
echo.
echo 按任意键打开文章进行编辑...
pause >nul
start "" "source\_posts\%title%.md"
