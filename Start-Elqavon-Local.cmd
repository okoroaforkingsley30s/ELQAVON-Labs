@echo off
cd /d "%~dp0"
docker version >nul 2>&1 || (echo Docker Desktop is not running.& pause & exit /b 1)
npx supabase start
start "ELQAVON Website" cmd /k npm run dev
timeout /t 3 >nul
start http://localhost:5173
