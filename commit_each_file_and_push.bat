@echo off
setlocal DisableDelayedExpansion

:: 1. Navigate safely to the repository directory
pushd "%~dp0" || (
    echo [ERROR] Failed to navigate to script directory.
    pause
    exit /b 1
)

:: 2. Verify that this is a valid Git repository
git rev-parse --show-toplevel >nul 2>&1 || (
    echo [ERROR] Current directory is not a Git repository.
    popd
    pause
    exit /b 1
)

echo ========================================================
echo   HABESHA KAMIS - INDIVIDUAL FILE COMMIT & PUSH SCRIPT
echo ========================================================
echo.

:: 3. Process every uncommitted or untracked file one by one
for /f "usebackq tokens=1,* delims= " %%A in (`git status --porcelain`) do (
    set "STATUS=%%A"
    set "FILEPATH=%%B"
    
    setlocal EnableDelayedExpansion
    
    :: Handle renamed files ("old -> new")
    echo !FILEPATH! | find "->" >nul
    if !errorlevel! equ 0 (
        for /f "tokens=2 delims=>" %%R in ("!FILEPATH!") do (
            set "TARGET=%%R"
            for /f "tokens=* delims= " %%T in ("!TARGET!") do set "FILEPATH=%%T"
        )
    )

    :: Remove any quotes around the path
    set "FILEPATH=!FILEPATH:"=!"

    if defined FILEPATH (
        echo ----------------------------------------------------
        echo [STAGING]    !FILEPATH!
        git add "!FILEPATH!"
        
        if !errorlevel! equ 0 (
            echo [COMMITTING] update !FILEPATH!
            git commit -m "update !FILEPATH!"
        ) else (
            echo [WARNING] Could not stage !FILEPATH!
        )
    )
    endlocal
)

echo.
echo ========================================================
echo   Pushing all individual commits to remote repository...
echo ========================================================
echo.

git push
if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] All files committed individually and pushed!
) else (
    echo.
    echo [NOTICE] Git push completed with notes (or no remote configured).
)

popd
echo.
echo Done!
pause
