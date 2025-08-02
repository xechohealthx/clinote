# Clinote Local Mode System

A complete HIPAA-compliant, offline transcription system for the Clinote Chrome Extension.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Clinote       │    │   Local Whisper  │    │   Chrome        │
│   Extension     │◄──►│   Server         │    │   Extension     │
│                 │    │   (localhost:11434)│   │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### 1. Install Local Whisper Server

**Windows:**
```bash
# Download and run the Windows installer
# Or manually:
cd local-server
pip install -r requirements.txt
python whisper_server.py
```

**macOS:**
```bash
# Run the macOS installer script
chmod +x installers/macos-setup.sh
./installers/macos-setup.sh
```

### 2. Configure Clinote Extension

1. Open Clinote extension popup
2. Go to Settings
3. Select "Local Processing"
4. Verify server status shows "Online"
5. Save settings

### 3. Start Recording

- Click "Start Recording" in Clinote
- Speak into your microphone
- Click "Stop Recording"
- View transcribed and summarized notes

## 📁 File Structure

```
clinote-local-mode/
├── local-server/                 # Local Whisper Server
│   ├── whisper_server.py         # Main Flask server
│   ├── requirements.txt          # Python dependencies
│   └── README.md                # Server documentation
├── installers/                   # Installation scripts
│   ├── windows-setup.iss        # Windows installer
│   ├── install_dependencies.bat # Windows dependency installer
│   ├── start_server.bat         # Windows server launcher
│   └── macos-setup.sh           # macOS installer
├── background.js                 # Updated background script
├── popup.html                   # Updated popup UI
├── popup.js                     # Updated popup logic
├── popup.css                    # Updated popup styles
└── LOCAL_MODE_README.md         # This file
```

## 🔧 Technical Details

### Local Whisper Server

**Features:**
- Flask-based HTTP server on `localhost:11434`
- Uses `faster-whisper` for optimized transcription
- Supports multiple audio formats (WebM, WAV, MP3, MP4)
- Health check endpoints for monitoring
- Automatic model downloading and caching

**API Endpoints:**
- `GET /ping` - Health check
- `POST /transcribe` - Audio transcription
- `GET /status` - Server status
- `GET /models` - Available models

**Model Options:**
- `tiny` - Fastest, lowest accuracy
- `base` - Good balance (default)
- `small` - Better accuracy
- `medium` - High accuracy
- `large` - Best accuracy, slowest

### Chrome Extension Updates

**New Features:**
- Local mode toggle in settings
- Server status monitoring
- Download installer button
- Automatic local/cloud mode switching
- Error handling for offline server

**Updated Components:**
- `background.js` - Local API integration
- `popup.html` - Local mode UI
- `popup.js` - Local mode logic
- `popup.css` - Local mode styling

## 🔒 Security & Privacy

### HIPAA Compliance
- **100% Local Processing** - No data leaves your device
- **No Telemetry** - No external data collection
- **Temporary Storage** - Audio files deleted immediately
- **Localhost Only** - Server only accepts local connections

### Data Flow
1. **Audio Capture** → Chrome Extension
2. **Base64 Encoding** → Background Script
3. **HTTP Request** → Local Whisper Server
4. **Transcription** → Local Processing
5. **Results** → Chrome Extension
6. **Cleanup** → Temporary files deleted

## 🛠️ Installation Options

### Option 1: Automated Installers

**Windows:**
1. Download `clinote-whisper-windows-setup.exe`
2. Run installer as administrator
3. Follow installation wizard
4. Server starts automatically

**macOS:**
1. Download `clinote-whisper-macos.pkg`
2. Double-click to install
3. Server appears in Applications
4. Double-click to start

### Option 2: Manual Installation

**Prerequisites:**
- Python 3.8+
- 4GB+ RAM
- 2GB+ free disk space

**Steps:**
```bash
# Clone or download the local-server directory
cd local-server

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
python whisper_server.py
```

## 🔍 Troubleshooting

### Common Issues

**1. "Local Whisper server is not running"**
```bash
# Check if server is running
curl http://localhost:11434/ping

# Start server manually
cd local-server
python whisper_server.py
```

**2. "Model download failed"**
```bash
# Clear cache and retry
rm -rf ~/.cache/huggingface/
python whisper_server.py
```

**3. "Port 11434 already in use"**
```bash
# Find and kill process
lsof -i :11434  # macOS/Linux
netstat -ano | findstr 11434  # Windows
kill -9 <PID>
```

**4. "CUDA not available"**
- Edit `whisper_server.py`
- Change `device="cuda"` to `device="cpu"`
- Restart server

### Performance Optimization

**For Faster Processing:**
- Use `tiny` model: Edit `whisper_server.py`
- Close other applications
- Use SSD storage
- Increase RAM allocation

**For Better Accuracy:**
- Use `small` or `medium` model
- Ensure good audio quality
- Use external microphone
- Reduce background noise

## 🔄 Integration with Clinote

### Extension Configuration

1. **Open Clinote popup**
2. **Go to Settings**
3. **Select Processing Mode:**
   - **Local Processing** - Uses local server
   - **Cloud Processing** - Uses OpenAI APIs

### Local Mode Features

- **Server Status** - Real-time monitoring
- **Download Button** - Easy installer access
- **Error Handling** - Clear offline messages
- **Auto-switching** - Seamless mode changes

### Cloud Mode Features

- **API Key Management** - Secure storage
- **OpenAI Integration** - Cloud processing
- **Fallback Support** - Local mode backup

## 🚀 Future Enhancements

### Planned Features

1. **Local LLM Integration**
   - Ollama support for summarization
   - GPT4All integration
   - Phi-3 local models

2. **Advanced Installers**
   - Auto-startup configuration
   - System tray integration
   - Automatic updates

3. **Enhanced Security**
   - Certificate pinning
   - Encrypted local storage
   - Audit logging

4. **Performance Improvements**
   - GPU acceleration
   - Model quantization
   - Batch processing

## 📞 Support

### Getting Help

1. **Check Server Status** - Extension popup shows server status
2. **Review Logs** - Server console shows detailed errors
3. **Test Endpoints** - Use curl to test server directly
4. **Reinstall** - Run installer again if needed

### Debugging

**Server Logs:**
```bash
# Check server output
python whisper_server.py

# Test endpoints
curl http://localhost:11434/ping
curl http://localhost:11434/status
```

**Extension Logs:**
1. Open Chrome DevTools
2. Go to Extensions tab
3. Find Clinote extension
4. Click "background page"
5. Check Console for errors

## 📄 License

This local mode system is part of Clinote and follows the same license terms.

---

**Built for healthcare professionals who prioritize patient privacy and data security.** 🔒 