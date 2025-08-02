# GitHub Releases Setup for Clinote

## Step 1: Create GitHub Repository

### 1.1 Create New Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Repository name: `clinote`
4. Description: `HIPAA-compliant medical transcription Chrome extension with local processing`
5. Make it **Public** (for free hosting)
6. Check "Add a README file"
7. Click "Create repository"

### 1.2 Clone Repository Locally
```bash
git clone https://github.com/yourusername/clinote.git
cd clinote
```

## Step 2: Organize Repository Structure

### 2.1 Create Repository Structure
```
clinote/
├── chrome-extension/          # Chrome extension files
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   └── content.css
├── local-server/             # Local Whisper server
│   ├── whisper_server.py
│   ├── requirements.txt
│   └── README.md
├── installers/               # Installer scripts
│   ├── windows-setup.iss
│   ├── install_dependencies.bat
│   ├── start_server.bat
│   ├── macos-setup.sh
│   └── build-installers.md
├── docs/                     # Documentation
│   ├── LOCAL_MODE_README.md
│   └── INSTALLATION.md
├── .github/                  # GitHub workflows
│   └── workflows/
│       └── build-installers.yml
├── README.md                 # Main README
└── LICENSE                   # License file
```

### 2.2 Create Main README.md
```markdown
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
2. Download and install the [Local Whisper Server](https://github.com/yourusername/clinote/releases/latest)
3. Select "Local Processing" in extension settings
4. Start recording with 100% local processing

## Installation

### Chrome Extension
1. Download the extension files
2. Open Chrome → Extensions → Developer mode
3. Click "Load unpacked" and select the extension folder

### Local Whisper Server
- **Windows**: Download `clinote-whisper-windows-setup.exe` from [Releases](https://github.com/yourusername/clinote/releases/latest)
- **macOS**: Download `clinote-whisper-macos.pkg` from [Releases](https://github.com/yourusername/clinote/releases/latest)
- **Manual**: Follow instructions in [LOCAL_MODE_README.md](docs/LOCAL_MODE_README.md)

## Privacy & Security

- **100% Local Processing**: No data leaves your device when using local mode
- **No Telemetry**: Zero external data collection
- **HIPAA Compliant**: Perfect for medical consultations
- **Open Source**: Transparent code for security review

## Documentation

- [Local Mode Setup](docs/LOCAL_MODE_README.md)
- [Installation Guide](docs/INSTALLATION.md)
- [API Documentation](docs/API.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/clinote/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/clinote/discussions)
- **Email**: support@clinote.app

---

Built for healthcare professionals who prioritize patient privacy and data security. 🔒
```

## Step 3: Build Installers

### 3.1 Windows Installer

**Prerequisites:**
- Download [Inno Setup](https://jrsoftware.org/isinfo.php)
- Install Inno Setup Compiler

**Build Steps:**
1. Open `installers/windows-setup.iss` in Inno Setup Compiler
2. Update the AppPublisher and AppPublisherURL in the script
3. Build → Compile
4. The installer will be created as `clinote-whisper-windows-setup.exe`

### 3.2 macOS Package

**Prerequisites:**
- macOS system (or macOS VM)
- Xcode Command Line Tools

**Build Steps:**
```bash
cd installers

# Create the package
pkgbuild --root ../local-server \
         --identifier com.clinote.whisperserver \
         --version 1.0.0 \
         --install-location /Applications/ClinoteWhisperServer \
         clinote-whisper-macos.pkg
```

## Step 4: Create GitHub Release

### 4.1 Prepare Release Files
1. **Windows installer**: `clinote-whisper-windows-setup.exe`
2. **macOS package**: `clinote-whisper-macos.pkg`
3. **Source code**: Zip the entire repository

### 4.2 Create Release
1. Go to your GitHub repository
2. Click "Releases" in the right sidebar
3. Click "Create a new release"
4. **Tag version**: `v1.0.0`
5. **Release title**: `Clinote Whisper Server v1.0.0`
6. **Description**:
   ```
   Initial release of Clinote Whisper Server for local transcription processing.
   
   ## What's New
   - Local Whisper server for HIPAA-compliant transcription
   - Windows and macOS installers
   - Flask-based HTTP server on localhost:11434
   - Support for multiple audio formats
   
   ## Installation
   - **Windows**: Run clinote-whisper-windows-setup.exe
   - **macOS**: Double-click clinote-whisper-macos.pkg
   - **Manual**: See LOCAL_MODE_README.md for instructions
   
   ## Features
   - 100% local processing
   - No data leaves your device
   - HIPAA compliant
   - Real-time transcription
   - Multiple audio format support
   ```
7. **Upload files**: Drag and drop the installer files
8. Click "Publish release"

## Step 5: Update Extension Code

### 5.1 Update popup.js with GitHub URLs

```javascript
downloadInstaller() {
  const userAgent = navigator.userAgent;
  const baseUrl = 'https://github.com/yourusername/clinote/releases/latest/download';
  let downloadUrl = '';
  let filename = '';
  
  if (userAgent.includes('Windows')) {
    downloadUrl = `${baseUrl}/clinote-whisper-windows-setup.exe`;
    filename = 'clinote-whisper-windows-setup.exe';
  } else if (userAgent.includes('Mac')) {
    downloadUrl = `${baseUrl}/clinote-whisper-macos.pkg`;
    filename = 'clinote-whisper-macos.pkg';
  } else {
    // Fallback to manual instructions
    this.showManualInstallInstructions();
    return;
  }
  
  // Use Chrome downloads API for better UX
  chrome.downloads.download({
    url: downloadUrl,
    filename: filename,
    saveAs: true
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      console.error('Download failed:', chrome.runtime.lastError);
      this.showManualInstallInstructions();
    } else {
      this.showNotification('Download started! Check your Downloads folder.', 'success');
    }
  });
}

showManualInstallInstructions() {
  const instructions = `
Manual Installation Required:

1. Download the local-server folder from GitHub
2. Install Python 3.8+ from python.org
3. Open terminal/command prompt in the folder
4. Run: pip install -r requirements.txt
5. Run: python whisper_server.py
6. Server will be available at http://localhost:11434

For detailed instructions, visit: https://github.com/yourusername/clinote
  `;
  
  this.showNotification('Manual installation required. Check console for instructions.', 'info');
  console.log(instructions);
}
```

### 5.2 Update manifest.json to include downloads permission

```json
{
  "permissions": [
    "activeTab",
    "tabs",
    "storage",
    "scripting",
    "<all_urls>",
    "downloads"
  ]
}
```

## Step 6: Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial Clinote release with local mode support"

# Push to GitHub
git push origin main
```

## Step 7: Test the Integration

1. **Reload the extension** in Chrome
2. **Open popup** and go to Settings
3. **Select "Local Processing"**
4. **Click "Download Whisper Server"**
5. **Verify download starts** or manual instructions appear

## Step 8: Create GitHub Actions (Optional)

### 8.1 Create .github/workflows/build-installers.yml

```yaml
name: Build Installers

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build Windows Installer
      run: |
        # Download Inno Setup
        # Build installer
        # Upload artifact

  build-macos:
    runs-on: macos-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build macOS Package
      run: |
        # Build .pkg file
        # Upload artifact

  create-release:
    needs: [build-windows, build-macos]
    runs-on: ubuntu-latest
    steps:
    - name: Create Release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Clinote Whisper Server ${{ github.ref_name }}
        body: |
          Automated release of Clinote Whisper Server
          
          ## Downloads
          - Windows: `clinote-whisper-windows-setup.exe`
          - macOS: `clinote-whisper-macos.pkg`
        draft: false
        prerelease: false
```

## Troubleshooting

### Common Issues

1. **"Download failed"**
   - Check GitHub repository URL is correct
   - Verify release files are uploaded
   - Check file permissions

2. **"Permission denied"**
   - Add `downloads` permission to manifest.json
   - Check Chrome extension permissions

3. **"File not found"**
   - Verify installer files are in GitHub release
   - Check file names match exactly

### Testing Checklist

- [ ] GitHub repository created
- [ ] Release files uploaded
- [ ] Extension code updated with correct URLs
- [ ] Downloads permission added to manifest
- [ ] Extension reloaded in Chrome
- [ ] Download button tested
- [ ] Manual instructions work as fallback

## Next Steps

1. **Create the repository** following Step 1
2. **Build installers** using Step 3
3. **Create GitHub release** following Step 4
4. **Update extension code** with your repository URLs
5. **Test the integration** using Step 7

Once complete, users will be able to click "Download Whisper Server" and get the appropriate installer for their OS! 🎉 