@echo off
title Clinote Whisper Server Installer
color 0A

echo ========================================
echo    Clinote Whisper Server Installer
echo ========================================
echo.

echo Installing Clinote Whisper Server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    echo Then run this installer again.
    echo.
    echo Opening Python download page...
    start https://python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python found: 
python --version
echo.

REM Create installation directory
set INSTALL_DIR=%USERPROFILE%\Applications\ClinoteWhisperServer
echo Installing to: %INSTALL_DIR%

REM Create directory if it doesn't exist
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"

REM Copy server files
echo 📁 Copying server files...
xcopy /E /I /Y "local-server" "%INSTALL_DIR%"

REM Create virtual environment
echo 🐍 Creating virtual environment...
cd /d "%INSTALL_DIR%"
python -m venv venv

REM Activate virtual environment and install dependencies
echo 📦 Installing dependencies...
call venv\Scripts\activate.bat
pip install --upgrade pip
pip install -r requirements.txt

REM Create launcher script
echo 🚀 Creating launcher script...
echo @echo off > "%INSTALL_DIR%\start_server.bat"
echo title Clinote Whisper Server >> "%INSTALL_DIR%\start_server.bat"
echo color 0B >> "%INSTALL_DIR%\start_server.bat"
echo cd /d "%INSTALL_DIR%" >> "%INSTALL_DIR%\start_server.bat"
echo call venv\Scripts\activate.bat >> "%INSTALL_DIR%\start_server.bat"
echo echo ======================================== >> "%INSTALL_DIR%\start_server.bat"
echo echo    Clinote Whisper Server >> "%INSTALL_DIR%\start_server.bat"
echo echo ======================================== >> "%INSTALL_DIR%\start_server.bat"
echo echo. >> "%INSTALL_DIR%\start_server.bat"
echo echo Starting Clinote Whisper Server... >> "%INSTALL_DIR%\start_server.bat"
echo echo Server will be available at: http://localhost:11434 >> "%INSTALL_DIR%\start_server.bat"
echo echo Press Ctrl+C to stop the server >> "%INSTALL_DIR%\start_server.bat"
echo echo. >> "%INSTALL_DIR%\start_server.bat"
echo python whisper_server.py >> "%INSTALL_DIR%\start_server.bat"
echo pause >> "%INSTALL_DIR%\start_server.bat"

REM Create desktop shortcut
echo 🖥️  Creating desktop shortcut...
echo @echo off > "%USERPROFILE%\Desktop\Clinote Whisper Server.bat"
echo cd /d "%INSTALL_DIR%" >> "%USERPROFILE%\Desktop\Clinote Whisper Server.bat"
echo call start_server.bat >> "%USERPROFILE%\Desktop\Clinote Whisper Server.bat"

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Clinote Whisper Server has been installed to: %INSTALL_DIR%
echo.
echo To start the server:
echo 1. Double-click "Clinote Whisper Server.bat" on your desktop
echo 2. Or run: %INSTALL_DIR%\start_server.bat
echo.
echo The server will be available at: http://localhost:11434
echo.
echo ✅ Installation completed successfully!
echo.
pause 