@echo off
setlocal enabledelayedexpansion
cd /d C:\continer\work\code\for Profile\Habsha-Kamis_E-commerce_Platform

for /f "delims=" %%f in ('git status --porcelain') do (
    set "line=%%f"
    set "file=!line:~3!"
    git add "!file!"
    git commit -m "update !file!"
)

echo Done!
pause