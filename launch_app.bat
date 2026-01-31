@echo off
echo ==========================================
echo   RuralClinic AI - Launch System
echo ==========================================

echo [1/2] Starting Backend (FastAPI)...
start "RuralClinic Backend" cmd /k "python -m uvicorn backend.main:app --reload --reload-dir backend --port 8000"

echo [2/2] Starting Frontend (Next.js)...
cd frontend
echo Installing dependencies (if needed)...
call npm install
call npm install lucide-react framer-motion clsx tailwind-merge

echo Launching Next.js...
npm run dev

pause
