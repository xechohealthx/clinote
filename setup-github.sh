#!/bin/bash

# Clinote GitHub Setup Script
# This script helps you set up the GitHub repository for Clinote

echo "=== Clinote GitHub Setup ==="
echo

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "Error: GitHub username is required"
    exit 1
fi

echo
echo "Setting up GitHub repository for: $GITHUB_USERNAME"
echo

# Create repository structure
echo "Creating repository structure..."

# Create directories
mkdir -p chrome-extension
mkdir -p local-server
mkdir -p installers
mkdir -p docs
mkdir -p .github/workflows

# Move existing files to chrome-extension
echo "Moving Chrome extension files..."
mv manifest.json chrome-extension/ 2>/dev/null || echo "manifest.json already in place"
mv background.js chrome-extension/ 2>/dev/null || echo "background.js already in place"
mv content.js chrome-extension/ 2>/dev/null || echo "content.js already in place"
mv popup.html chrome-extension/ 2>/dev/null || echo "popup.html already in place"
mv popup.js chrome-extension/ 2>/dev/null || echo "popup.js already in place"
mv popup.css chrome-extension/ 2>/dev/null || echo "popup.css already in place"
mv content.css chrome-extension/ 2>/dev/null || echo "content.css already in place"

# Move local server files
echo "Moving local server files..."
mv local-server/* local-server/ 2>/dev/null || echo "Local server files already in place"

# Move installer files
echo "Moving installer files..."
mv installers/* installers/ 2>/dev/null || echo "Installer files already in place"

# Move documentation
echo "Moving documentation..."
mv LOCAL_MODE_README.md docs/ 2>/dev/null || echo "Documentation already in place"

# Create main README.md
echo "Creating main README.md..."
cat > README.md << EOF
# Clinote - HIPAA-Compliant Medical Transcription

A Chrome extension for medical professionals that provides real-time transcription and clinical note generation with local processing options for maximum privacy.

## Features

- 🎤 **Real-time transcription** using OpenAI Whisper or local processing
- 📝 **Clinical note generation** with structured medical documentation
- 🔒 **HIPAA-compliant** with local processing option
- 🏥 **Specialty templates** for different medical fields
- 💾 **EMR integration** with customizable sections
- ⚡ **One-click recording** and processing

## Quick Start

### Option 1: Cloud Processing
1. Install the Chrome extension
2. Add your OpenAI API key in settings
3. Start recording during patient consultations
4. Get instant clinical notes

### Option 2: Local Processing (Recommended for HIPAA)
1. Install the Chrome extension
2. Download and install the [Local Whisper Server](https://github.com/$GITHUB_USERNAME/clinote/releases/latest)
3. Select "Local Processing" in extension settings
4. Start recording with 100% local processing

## Installation

### Chrome Extension
1. Download the extension files from the \`chrome-extension\` folder
2. Open Chrome → Extensions → Developer mode
3. Click "Load unpacked" and select the extension folder

### Local Whisper Server
- **Windows**: Download \`clinote-whisper-windows-setup.exe\` from [Releases](https://github.com/$GITHUB_USERNAME/clinote/releases/latest)
- **macOS**: Download \`clinote-whisper-macos.pkg\` from [Releases](https://github.com/$GITHUB_USERNAME/clinote/releases/latest)
- **Manual**: Follow instructions in [LOCAL_MODE_README.md](docs/LOCAL_MODE_README.md)

## Privacy & Security

- **100% Local Processing**: No data leaves your device when using local mode
- **No Telemetry**: Zero external data collection
- **HIPAA Compliant**: Perfect for medical consultations
- **Open Source**: Transparent code for security review

## Documentation

- [Local Mode Setup](docs/LOCAL_MODE_README.md)
- [Installation Guide](docs/INSTALLATION.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/$GITHUB_USERNAME/clinote/issues)
- **Discussions**: [GitHub Discussions](https://github.com/$GITHUB_USERNAME/clinote/discussions)

---

Built for healthcare professionals who prioritize patient privacy and data security. 🔒
EOF

# Create LICENSE file
echo "Creating LICENSE file..."
cat > LICENSE << EOF
MIT License

Copyright (c) 2024 Clinote

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# Update popup.js with correct GitHub username
echo "Updating popup.js with GitHub username..."
sed -i.bak "s/yourusername/$GITHUB_USERNAME/g" chrome-extension/popup.js

# Create .gitignore
echo "Creating .gitignore..."
cat > .gitignore << EOF
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual environments
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Chrome extension
*.crx
*.pem

# Installers
*.exe
*.pkg
*.dmg

# Logs
*.log
EOF

# Initialize git repository
echo "Initializing git repository..."
git init
git add .
git commit -m "Initial Clinote release with local mode support"

echo
echo "=== Setup Complete ==="
echo
echo "Next steps:"
echo "1. Create GitHub repository at: https://github.com/$GITHUB_USERNAME/clinote"
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/clinote.git"
echo "   git push -u origin main"
echo "3. Build installers (see installers/build-installers.md)"
echo "4. Create GitHub release with installer files"
echo "5. Test the download button in the extension"
echo
echo "Repository structure created successfully!"
echo "GitHub username updated in popup.js"
echo 