#!/usr/bin/env python3
"""
Clinote Whisper Server - macOS App
A simple wrapper for the Whisper server
"""

import os
import sys
import subprocess
import threading
import time
import requests

def log(message):
    """Print log message"""
    print(f"[{time.strftime('%H:%M:%S')}] {message}")
    sys.stdout.flush()  # Force output to show immediately

def check_python():
    """Check if Python is available"""
    try:
        result = subprocess.run([sys.executable, "--version"], 
                     capture_output=True, check=True, text=True)
        log(f"✅ Python found: {result.stdout.strip()}")
        return True
    except Exception as e:
        log(f"❌ Python not found: {e}")
        return False

def start_server():
    """Start the Whisper server"""
    log("🎙️ Starting Clinote Whisper Server...")
    
    try:
        # Get the directory where the app is located
        if getattr(sys, 'frozen', False):
            # Running as compiled app
            app_dir = os.path.dirname(sys.executable)
            # Go up to Contents/Resources
            resources_dir = os.path.join(app_dir, "..", "Resources")
            log(f"📁 App directory: {app_dir}")
            log(f"📁 Resources directory: {resources_dir}")
        else:
            # Running as script
            resources_dir = os.path.join(os.path.dirname(__file__), "local-server")
            log(f"📁 Script directory: {os.path.dirname(__file__)}")
            log(f"📁 Resources directory: {resources_dir}")
        
        # Find whisper_server.py
        whisper_script = os.path.join(resources_dir, "whisper_server.py")
        log(f"🔍 Looking for whisper_server.py at: {whisper_script}")
        
        if not os.path.exists(whisper_script):
            log(f"❌ Could not find whisper_server.py at: {whisper_script}")
            # List contents of resources directory
            try:
                log(f"📂 Contents of {resources_dir}:")
                for item in os.listdir(resources_dir):
                    log(f"   - {item}")
            except Exception as e:
                log(f"❌ Could not list directory contents: {e}")
            return False
            
        log(f"✅ Found whisper_server.py at: {whisper_script}")
        
        # Check if we're in a virtual environment
        venv_dir = None
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            # We're in a virtual environment
            venv_dir = sys.prefix
            python_cmd = sys.executable
            log(f"🐍 Using virtual environment Python: {python_cmd}")
        else:
            # Use system Python
            python_cmd = sys.executable
            log(f"🐍 Using system Python: {python_cmd}")
        
        # Check if requirements.txt exists
        requirements_file = os.path.join(resources_dir, "requirements.txt")
        if os.path.exists(requirements_file):
            log(f"✅ Found requirements.txt at: {requirements_file}")
        else:
            log(f"⚠️  No requirements.txt found at: {requirements_file}")
        
        # Start the server
        log("🚀 Starting Whisper server...")
        log("📱 Server will be available at: http://localhost:11434")
        log("📱 Use the Clinote Chrome extension to transcribe")
        log("⏹️  Press Ctrl+C to stop the server")
        log("")
        
        # Run the server with full output
        log("🔄 Executing server command...")
        process = subprocess.Popen([python_cmd, whisper_script], 
                                  cwd=os.path.dirname(whisper_script),
                                  stdout=subprocess.PIPE,
                                  stderr=subprocess.STDOUT,
                                  text=True,
                                  bufsize=1,
                                  universal_newlines=True)
        
        log(f"✅ Server process started with PID: {process.pid}")
        
        # Monitor the output
        for line in process.stdout:
            print(line.strip())
            sys.stdout.flush()
        
        # Wait for the process to complete
        return_code = process.wait()
        log(f"⏹️  Server process ended with return code: {return_code}")
        
    except KeyboardInterrupt:
        log("⏹️ Server stopped by user")
    except Exception as e:
        log(f"❌ Error starting server: {e}")
        import traceback
        log(f"📋 Full error traceback:")
        traceback.print_exc()
        return False
    
    return True

def main():
    """Main function"""
    log("🎙️ Clinote Whisper Server")
    log("================================")
    log("")
    
    if not check_python():
        log("❌ Python check failed. Press Enter to exit...")
        input()
        return
    
    log("🚀 Auto-starting server...")
    log("")
    
    start_server()

if __name__ == "__main__":
    main() 