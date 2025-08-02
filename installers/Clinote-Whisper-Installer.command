#!/bin/bash

# Change to the directory where this script is located
cd "$(dirname "$0")"

echo "========================================"
echo "   Clinote Whisper Server Installer"
echo "========================================"
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "Please install Python 3.8+ from https://python.org"
    echo "Then double-click this installer again."
    echo
    read -p "Press Enter to open Python download page..."
    open "https://python.org/downloads/"
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo

# Create installation directory
INSTALL_DIR="$HOME/Applications/ClinoteWhisperServer"
echo "Installing to: $INSTALL_DIR"

# Create directory if it doesn't exist
if [ ! -d "$INSTALL_DIR" ]; then
    mkdir -p "$INSTALL_DIR"
fi

# Copy server files
echo "📁 Copying server files..."
cp -r ../local-server/* "$INSTALL_DIR/"

# Create virtual environment
echo "🐍 Creating virtual environment..."
cd "$INSTALL_DIR"
python3 -m venv venv

# Activate virtual environment and install dependencies
echo "📦 Installing dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create launcher script
echo "🚀 Creating launcher script..."
cat > "$INSTALL_DIR/start_server.sh" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate
echo "Starting Clinote Whisper Server..."
echo "Server will be available at: http://localhost:11434"
echo "Press Ctrl+C to stop the server"
echo
python whisper_server.py
EOF

chmod +x "$INSTALL_DIR/start_server.sh"

# Create desktop shortcut
echo "🖥️  Creating desktop shortcut..."
cat > "$HOME/Desktop/Clinote Whisper Server.command" << EOF
#!/bin/bash
cd "$INSTALL_DIR"
./start_server.sh
EOF

chmod +x "$HOME/Desktop/Clinote Whisper Server.command"

echo
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo
echo "Clinote Whisper Server has been installed to: $INSTALL_DIR"
echo
echo "To start the server:"
echo "1. Double-click 'Clinote Whisper Server.command' on your desktop"
echo "2. Or run: $INSTALL_DIR/start_server.sh"
echo
echo "The server will be available at: http://localhost:11434"
echo
echo "✅ Installation completed successfully!"
echo
read -p "Press Enter to close this window..." 