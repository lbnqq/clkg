@echo off
chcp 65001 >nul
echo ========================================
echo       Hexo 博客文章删除工具
echo ========================================
echo.
echo 当前文章列表:
echo.
dir /b "source\_posts\*.md" 2>nul
echo.
set /p filename="请输入要删除的文章文件名(含.md后缀): "
if exist "source\_posts\%filename%" (
    echo.
    echo 警告: 即将删除 %filename%
    set /p confirm="确认删除? (Y/N): "
    if /i "%confirm%"=="Y" (
        del "source\_posts\%filename%"
        echo.
        echo ✓ 文章已删除!
        echo 请运行"发布到GitHub.bat"来更新博客
    ) else (
        echo 已取消删除
    )
) else (
    echo 错误: 文件不存在!
)
echo.
pause
