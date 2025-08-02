@echo off
echo Starting Clinote Whisper Server...

REM Check if virtual environment exists
if not exist "venv" (
    echo Virtual environment not found. Running installer...
    call install_dependencies.bat
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Start the server
echo Starting server on http://localhost:11434
echo Press Ctrl+C to stop the server
echo.
python whisper_server.py

pause 