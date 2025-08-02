# Building and Hosting Clinote Whisper Server Installers

## Option 1: GitHub Releases (Recommended)

### Step 1: Build the Installers

**Windows Installer:**
1. Download [Inno Setup](https://jrsoftware.org/isinfo.php)
2. Open `windows-setup.iss` in Inno Setup Compiler
3. Build → Compile (creates `clinote-whisper-windows-setup.exe`)

**macOS Package:**
```bash
# Create a proper .pkg file
cd installers
chmod +x macos-setup.sh
# Package the installer (requires macOS)
pkgbuild --root ../local-server --identifier com.clinote.whisperserver --version 1.0.0 --install-location /Applications/ClinoteWhisperServer clinote-whisper-macos.pkg
```

### Step 2: Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `Clinote Whisper Server v1.0.0`
5. Upload files:
   - `clinote-whisper-windows-setup.exe`
   - `clinote-whisper-macos.pkg`
6. Publish release

### Step 3: Update Download URLs

Update `popup.js` with actual GitHub URLs:

```javascript
downloadInstaller() {
  const userAgent = navigator.userAgent;
  let downloadUrl = '';
  
  if (userAgent.includes('Windows')) {
    downloadUrl = 'https://github.com/yourusername/clinote/releases/latest/download/clinote-whisper-windows-setup.exe';
  } else if (userAgent.includes('Mac')) {
    downloadUrl = 'https://github.com/yourusername/clinote/releases/latest/download/clinote-whisper-macos.pkg';
  } else {
    downloadUrl = 'https://github.com/yourusername/clinote/releases/latest';
  }
  
  chrome.tabs.create({ url: downloadUrl });
  this.showNotification('Opening download page...', 'info');
}
```

## Option 2: Simple File Hosting

### Using Netlify (Free)

1. Create a `public` folder with installers
2. Deploy to Netlify
3. Update URLs to: `https://your-site.netlify.app/windows-setup.exe`

### Using AWS S3 (Low Cost)

1. Upload installers to S3 bucket
2. Make files public
3. Update URLs to: `https://your-bucket.s3.amazonaws.com/windows-setup.exe`

## Option 3: Your Own Domain

### Using GitHub Pages

1. Create `docs` folder in repository
2. Add installers to `docs/downloads/`
3. Enable GitHub Pages
4. URLs become: `https://yourusername.github.io/clinote/downloads/windows-setup.exe`

## Option 4: Direct Download (Simplest)

### Update popup.js for Direct Downloads

```javascript
downloadInstaller() {
  const userAgent = navigator.userAgent;
  let downloadUrl = '';
  let filename = '';
  
  if (userAgent.includes('Windows')) {
    downloadUrl = 'https://your-domain.com/downloads/clinote-whisper-windows-setup.exe';
    filename = 'clinote-whisper-windows-setup.exe';
  } else if (userAgent.includes('Mac')) {
    downloadUrl = 'https://your-domain.com/downloads/clinote-whisper-macos.pkg';
    filename = 'clinote-whisper-macos.pkg';
  } else {
    // Show instructions for manual download
    this.showNotification('Please visit clinote.app/download for your OS', 'info');
    return;
  }
  
  // Trigger download
  chrome.downloads.download({
    url: downloadUrl,
    filename: filename,
    saveAs: true
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      this.showNotification('Download failed. Please visit clinote.app/download', 'error');
    } else {
      this.showNotification('Download started!', 'success');
    }
  });
}
```

## Option 5: Manual Installation Instructions

### Update popup.js for Manual Instructions

```javascript
downloadInstaller() {
  const userAgent = navigator.userAgent;
  let instructions = '';
  
  if (userAgent.includes('Windows')) {
    instructions = `
1. Download Python 3.11 from python.org
2. Download the local-server folder
3. Open Command Prompt in the folder
4. Run: pip install -r requirements.txt
5. Run: python whisper_server.py
    `;
  } else if (userAgent.includes('Mac')) {
    instructions = `
1. Install Homebrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. Run: brew install python@3.11
3. Download the local-server folder
4. Open Terminal in the folder
5. Run: pip3 install -r requirements.txt
6. Run: python3 whisper_server.py
    `;
  }
  
  // Show instructions in a modal or notification
  this.showNotification('Manual installation required. Check console for instructions.', 'info');
  console.log('Manual Installation Instructions:', instructions);
}
```

## Recommended Approach

**For Development/Testing:**
- Use Option 5 (Manual Instructions) initially
- Add console logging for easy setup

**For Production:**
- Use GitHub Releases (Option 1)
- Provides versioning, changelog, and reliable hosting
- Free and professional

**For Enterprise:**
- Use your own domain with proper SSL
- Implement download analytics
- Add automatic updates

## Security Considerations

1. **Code Signing** - Sign installers with your certificate
2. **Checksums** - Provide SHA256 hashes for verification
3. **HTTPS Only** - Never serve installers over HTTP
4. **Virus Scanning** - Scan uploads before distribution

## Example Implementation

Here's a complete working version for GitHub Releases:

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