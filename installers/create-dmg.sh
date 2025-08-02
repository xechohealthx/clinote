#!/bin/bash

echo "Creating Clinote Whisper Server DMG installer..."

# Check if create-dmg is installed
if ! command -v create-dmg &> /dev/null; then
    echo "Installing create-dmg..."
    brew install create-dmg
fi

# Create DMG
create-dmg \
    --volname "Clinote Whisper Server" \
    --volicon "../icons/icon-128.png" \
    --window-size 500 300 \
    --icon-size 96 \
    --icon "ClinoteWhisperServer.app" 130 100 \
    --app-drop-link 370 100 \
    --no-internet-enable \
    "Clinote-Whisper-Server.dmg" \
    "ClinoteWhisperServer.app"

echo "DMG created successfully: Clinote-Whisper-Server.dmg" 