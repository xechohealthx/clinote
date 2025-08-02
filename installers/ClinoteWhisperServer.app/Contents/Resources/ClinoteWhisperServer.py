#!/usr/bin/env python3
"""
Clinote Whisper Server - macOS App
A simple GUI wrapper for the Whisper server
"""

import os
import sys
import subprocess
import tkinter as tk
from tkinter import messagebox, scrolledtext
import threading
import time
import requests

class ClinoteWhisperApp:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Clinote Whisper Server")
        self.root.geometry("600x400")
        self.root.resizable(True, True)
        
        # Set app icon if available
        try:
            icon_path = os.path.join(os.path.dirname(__file__), "ClinoteWhisperServer.app/Contents/Resources/AppIcon.icns")
            if os.path.exists(icon_path):
                self.root.iconbitmap(icon_path)
        except:
            pass
        
        self.server_process = None
        self.server_running = False
        
        self.setup_ui()
        self.check_python()
        
    def setup_ui(self):
        # Main frame
        main_frame = tk.Frame(self.root, padx=20, pady=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Title
        title_label = tk.Label(main_frame, text="🎙️ Clinote Whisper Server", 
                              font=("Arial", 18, "bold"))
        title_label.pack(pady=(0, 10))
        
        # Status frame
        status_frame = tk.Frame(main_frame)
        status_frame.pack(fill=tk.X, pady=10)
        
        self.status_label = tk.Label(status_frame, text="Status: Initializing...", 
                                    font=("Arial", 12))
        self.status_label.pack(side=tk.LEFT)
        
        # Buttons frame
        button_frame = tk.Frame(main_frame)
        button_frame.pack(fill=tk.X, pady=10)
        
        self.start_button = tk.Button(button_frame, text="Start Server", 
                                     command=self.start_server, 
                                     bg="#4CAF50", fg="white", 
                                     font=("Arial", 12, "bold"),
                                     padx=20, pady=10)
        self.start_button.pack(side=tk.LEFT, padx=(0, 10))
        
        self.stop_button = tk.Button(button_frame, text="Stop Server", 
                                    command=self.stop_server,
                                    bg="#f44336", fg="white",
                                    font=("Arial", 12, "bold"),
                                    padx=20, pady=10,
                                    state=tk.DISABLED)
        self.stop_button.pack(side=tk.LEFT)
        
        # Log frame
        log_frame = tk.Frame(main_frame)
        log_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        log_label = tk.Label(log_frame, text="Server Log:", font=("Arial", 12, "bold"))
        log_label.pack(anchor=tk.W)
        
        self.log_text = scrolledtext.ScrolledText(log_frame, height=10, 
                                                 font=("Courier", 10))
        self.log_text.pack(fill=tk.BOTH, expand=True)
        
        # Info frame
        info_frame = tk.Frame(main_frame)
        info_frame.pack(fill=tk.X, pady=10)
        
        info_text = """Server will be available at: http://localhost:11434
Use the Clinote Chrome extension to transcribe audio."""
        
        info_label = tk.Label(info_frame, text=info_text, 
                             font=("Arial", 10), justify=tk.LEFT)
        info_label.pack()
        
    def log(self, message):
        """Add message to log"""
        self.log_text.insert(tk.END, f"{message}\n")
        self.log_text.see(tk.END)
        self.root.update()
        
    def check_python(self):
        """Check if Python is available"""
        try:
            result = subprocess.run([sys.executable, "--version"], 
                                  capture_output=True, text=True)
            if result.returncode == 0:
                self.log(f"✅ Python found: {result.stdout.strip()}")
                self.status_label.config(text="Status: Ready to start")
                return True
            else:
                self.log("❌ Python not found")
                self.status_label.config(text="Status: Python not found")
                return False
        except Exception as e:
            self.log(f"❌ Error checking Python: {e}")
            self.status_label.config(text="Status: Error")
            return False
            
    def start_server(self):
        """Start the Whisper server"""
        if self.server_running:
            return
            
        self.log("🚀 Starting Clinote Whisper Server...")
        self.status_label.config(text="Status: Starting...")
        self.start_button.config(state=tk.DISABLED)
        
        # Start server in background thread
        thread = threading.Thread(target=self._run_server)
        thread.daemon = True
        thread.start()
        
    def _run_server(self):
        """Run the server in background"""
        try:
            # Get the app directory
            app_dir = os.path.dirname(os.path.abspath(__file__))
            install_dir = os.path.expanduser("~/Applications/ClinoteWhisperServer")
            
            # Create installation directory if needed
            if not os.path.exists(install_dir):
                os.makedirs(install_dir)
                self.log(f"📁 Created installation directory: {install_dir}")
                
            # Copy server files if needed
            local_server_dir = os.path.join(app_dir, "local-server")
            if os.path.exists(local_server_dir):
                import shutil
                for item in os.listdir(local_server_dir):
                    src = os.path.join(local_server_dir, item)
                    dst = os.path.join(install_dir, item)
                    if os.path.isdir(src):
                        shutil.copytree(src, dst, dirs_exist_ok=True)
                    else:
                        shutil.copy2(src, dst)
                self.log("📁 Copied server files")
            
            # Change to installation directory
            os.chdir(install_dir)
            self.log(f"📂 Working directory: {install_dir}")
            
            # Create virtual environment if needed
            venv_dir = os.path.join(install_dir, "venv")
            if not os.path.exists(venv_dir):
                self.log("🐍 Creating virtual environment...")
                subprocess.run([sys.executable, "-m", "venv", "venv"], 
                             check=True, capture_output=True)
                self.log("✅ Virtual environment created")
            
            # Activate virtual environment and install dependencies
            if os.path.exists("requirements.txt"):
                self.log("📦 Installing dependencies...")
                if os.name == 'nt':  # Windows
                    pip_cmd = os.path.join(venv_dir, "Scripts", "pip")
                else:  # macOS/Linux
                    pip_cmd = os.path.join(venv_dir, "bin", "pip")
                
                subprocess.run([pip_cmd, "install", "--upgrade", "pip"], 
                             check=True, capture_output=True)
                subprocess.run([pip_cmd, "install", "-r", "requirements.txt"], 
                             check=True, capture_output=True)
                self.log("✅ Dependencies installed")
            
            # Start the server
            self.log("🎙️ Loading Whisper model...")
            if os.name == 'nt':  # Windows
                python_cmd = os.path.join(venv_dir, "Scripts", "python")
            else:  # macOS/Linux
                python_cmd = os.path.join(venv_dir, "bin", "python")
            
            self.server_process = subprocess.Popen([python_cmd, "whisper_server.py"],
                                                 stdout=subprocess.PIPE,
                                                 stderr=subprocess.STDOUT,
                                                 text=True,
                                                 bufsize=1,
                                                 universal_newlines=True)
            
            self.server_running = True
            self.log("✅ Server started successfully!")
            self.log("📱 Use the Clinote Chrome extension to transcribe")
            
            # Update UI
            self.root.after(0, self._update_ui_running)
            
            # Monitor server output
            for line in self.server_process.stdout:
                self.log(line.strip())
                
        except Exception as e:
            self.log(f"❌ Error starting server: {e}")
            self.root.after(0, self._update_ui_error)
            
    def _update_ui_running(self):
        """Update UI when server is running"""
        self.status_label.config(text="Status: Server Running")
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        
        # Start monitoring server status
        self._check_server_status()
        
    def _update_ui_error(self):
        """Update UI when there's an error"""
        self.status_label.config(text="Status: Error")
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        
    def _check_server_status(self):
        """Check if server is responding"""
        if not self.server_running:
            return
            
        try:
            response = requests.get("http://localhost:11434/ping", timeout=1)
            if response.status_code == 200:
                data = response.json()
                if data.get("model_loaded"):
                    self.status_label.config(text="Status: Server Running (Model Ready)")
                else:
                    self.status_label.config(text="Status: Server Running (Loading Model)")
            else:
                self.status_label.config(text="Status: Server Running (No Response)")
        except:
            self.status_label.config(text="Status: Server Running (No Response)")
            
        # Check again in 5 seconds
        self.root.after(5000, self._check_server_status)
        
    def stop_server(self):
        """Stop the Whisper server"""
        if not self.server_running or not self.server_process:
            return
            
        self.log("⏹️ Stopping server...")
        self.server_process.terminate()
        
        try:
            self.server_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            self.server_process.kill()
            
        self.server_running = False
        self.server_process = None
        
        self.log("✅ Server stopped")
        self.status_label.config(text="Status: Stopped")
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        
    def on_closing(self):
        """Handle app closing"""
        if self.server_running:
            if messagebox.askokcancel("Quit", "Server is running. Stop server and quit?"):
                self.stop_server()
                self.root.destroy()
        else:
            self.root.destroy()
            
    def run(self):
        """Run the app"""
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        self.root.mainloop()

if __name__ == "__main__":
    app = ClinoteWhisperApp()
    app.run() 