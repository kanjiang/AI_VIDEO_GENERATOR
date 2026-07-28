@echo off
cd /d "%~dp0"

:: Check if port 3000 is already in use
netstat -ano | findstr ":3000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting dev server...
    start /min cmd /c "cd /d "%~dp0" && npm run dev"
    timeout /t 12 /nobreak >nul
)

start "" "http://localhost:3000/shot-browser"
