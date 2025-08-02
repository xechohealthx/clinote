#!/bin/bash

echo "Building Clinote Whisper Server macOS App..."

# Install py2app if not already installed
pip install py2app

# Clean previous builds
rm -rf build dist

# Build the app
python setup.py py2app

echo "App built successfully!"
echo "App location: dist/ClinoteWhisperServer.app" 