@echo off
echo ========================================
echo    Starting KingMailer
echo ========================================
echo.

echo Starting Email Backend (Node.js)...
start "Email Backend" cmd /k "cd email-backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Inbox Backend (Python)...
start "Inbox Backend" cmd /k "cd inbox-backend && python main.py"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo    KingMailer Started!
echo ========================================
echo.
echo Email Backend: http://localhost:3000
echo Inbox Backend: http://localhost:8000
echo Frontend: Open frontend/index.html in browser
echo.
echo Press any key to open the frontend...
pause >nul

start "" "frontend/index.html"
