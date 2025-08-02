#!/bin/bash

# Clinote Whisper Server macOS Installer
# This script installs the Clinote Whisper Server on macOS

set -e

echo "=== Clinote Whisper Server macOS Installer ==="
echo

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew is not installed. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo "Homebrew installed successfully!"
    echo
fi

# Install Python if not already installed
if ! command -v python3 &> /dev/null; then
    echo "Installing Python 3..."
    brew install python@3.11
    echo "Python 3 installed successfully!"
    echo
fi

# Create installation directory
INSTALL_DIR="$HOME/Applications/ClinoteWhisperServer"
echo "Installing to: $INSTALL_DIR"

# Create directory if it doesn't exist
mkdir -p "$INSTALL_DIR"

# Copy server files
echo "Copying server files..."
cp -r ../local-server/* "$INSTALL_DIR/"

# Create virtual environment
echo "Creating virtual environment..."
cd "$INSTALL_DIR"
python3 -m venv venv

# Activate virtual environment and install dependencies
echo "Installing dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create launcher script
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

# Create desktop application
cat > "$INSTALL_DIR/ClinoteWhisperServer.app/Contents/MacOS/ClinoteWhisperServer" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")/../../../ClinoteWhisperServer"
source venv/bin/activate
python whisper_server.py
EOF

# Create Info.plist for the app
mkdir -p "$INSTALL_DIR/ClinoteWhisperServer.app/Contents"
cat > "$INSTALL_DIR/ClinoteWhisperServer.app/Contents/Info.plist" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>ClinoteWhisperServer</string>
    <key>CFBundleIdentifier</key>
    <string>com.clinote.whisperserver</string>
    <key>CFBundleName</key>
    <string>Clinote Whisper Server</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.15</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
EOF

chmod +x "$INSTALL_DIR/ClinoteWhisperServer.app/Contents/MacOS/ClinoteWhisperServer"

# Create uninstaller
cat > "$INSTALL_DIR/uninstall.sh" << 'EOF'
#!/bin/bash
echo "Uninstalling Clinote Whisper Server..."
rm -rf "$HOME/Applications/ClinoteWhisperServer"
echo "Clinote Whisper Server has been uninstalled."
EOF

chmod +x "$INSTALL_DIR/uninstall.sh"

echo
echo "=== Installation Complete ==="
echo
echo "Clinote Whisper Server has been installed to: $INSTALL_DIR"
echo
echo "To start the server:"
echo "  cd $INSTALL_DIR"
echo "  ./start_server.sh"
echo
echo "Or double-click ClinoteWhisperServer.app in Finder"
echo
echo "To uninstall:"
echo "  $INSTALL_DIR/uninstall.sh"
echo
echo "The server will be available at: http://localhost:11434"
echo 