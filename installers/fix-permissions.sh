#!/bin/bash

echo "Fixing permissions for Clinote installer..."
echo

# Navigate to Downloads
cd ~/Downloads

# Find the installer file (handle multiple versions)
if [ -f "Clinote-Whisper-Installer.command" ]; then
    echo "Found: Clinote-Whisper-Installer.command"
    chmod +x "Clinote-Whisper-Installer.command"
    echo "✅ Permissions fixed!"
    echo "Now you can double-click the file or run: ./Clinote-Whisper-Installer.command"
elif [ -f "Clinote-Whisper-Installer (1).command" ]; then
    echo "Found: Clinote-Whisper-Installer (1).command"
    chmod +x "Clinote-Whisper-Installer (1).command"
    echo "✅ Permissions fixed!"
    echo "Now you can double-click the file or run: ./Clinote-Whisper-Installer\ \(1\).command"
else
    echo "❌ No Clinote installer found in Downloads folder"
    echo "Please download the installer first from the extension"
fi

echo
read -p "Press Enter to close..." 