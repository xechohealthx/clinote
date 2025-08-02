# Clinote Extension Testing Guide

## 🚀 Quick Start

### 1. Install the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" and select this folder
4. The Clinote icon should appear in your extensions toolbar

### 2. Configure Settings
1. Click the Clinote extension icon
2. Your OpenAI API key is already pre-configured
3. Select your medical specialty (Primary Care, Psychiatry, etc.)
4. Check "Privacy Acknowledgment"
5. Click "Save Settings"

### 3. Test the Extension
1. Open `test-page.html` in Chrome
2. Click the Clinote extension icon
3. Click "Start Transcription"
4. Grant microphone permissions when prompted
5. Speak into your microphone or play audio
6. Watch the floating UI appear with live transcription

## 🧪 Testing Features

### Audio Transcription
- **Real-time transcription** using OpenAI Whisper API
- **Live transcript display** in floating UI
- **Error handling** with user-friendly messages

### Clinical Summary Generation
- **AI-powered analysis** using GPT-4o
- **Specialty-specific templates** for different medical fields
- **Structured output** with Chief Complaint, HPI, Assessment, Plan, etc.

### Text Field Insertion
- **Auto-detection** of text areas, textareas, and contenteditable elements
- **Manual insertion** via "Insert into Field" button
- **Formatted output** with proper clinical note structure

## 🔧 Troubleshooting

### Common Issues

**Extension Not Loading**
- Check that all files are in the same folder
- Verify `manifest.json` is present and valid
- Try refreshing the extensions page

**Audio Not Capturing**
- Ensure microphone permissions are granted
- Check that audio is playing in the browser tab
- Try refreshing the page and restarting transcription

**API Errors**
- Verify your OpenAI API key is valid
- Check internet connection
- Look for error messages in the floating UI

**Transcription Not Working**
- Check browser console for error messages
- Verify API key is configured in extension settings
- Try switching between local/cloud processing modes

### Debug Information

**Check Extension Status**
- Open `test-page.html` and click "Check Status"
- Look for success/error messages
- Check browser console for detailed logs

**API Key Validation**
- The extension automatically configures your API key
- Check extension popup to verify settings
- Test API connectivity through the test page

## 📊 Expected Behavior

### Successful Test Results
1. **Extension loads** without errors
2. **Settings save** with API key configured
3. **Transcription starts** when clicking "Start Transcription"
4. **Floating UI appears** with live transcript
5. **Clinical summaries generate** automatically
6. **Text insertion works** in various field types

### Performance Notes
- **First transcription** may take 2-3 seconds
- **Summary generation** occurs every 500 characters
- **API rate limits** may apply with heavy usage
- **Audio quality** affects transcription accuracy

## 🔒 Privacy & Security

### Data Handling
- **No PHI storage** unless explicitly enabled
- **API keys stored locally** in Chrome's secure storage
- **Audio processed in memory** only during active sessions
- **User control** over all data handling

### HIPAA Compliance
- **Privacy-first design** with local processing option
- **Secure transmission** via HTTPS
- **No persistent storage** of patient data
- **Audit trail** for compliance reporting

## 🚀 Next Steps

After successful testing:

1. **Deploy to production** with proper API key management
2. **Add comprehensive logging** for monitoring
3. **Implement rate limiting** for API calls
4. **Add user analytics** (privacy-compliant)
5. **Create automated testing** suite
6. **Optimize performance** for real-world usage

## 📞 Support

For issues or questions:
- Check browser console for error messages
- Review this testing guide
- Test with different audio sources
- Verify API key and internet connectivity

---

**Happy Testing! 🎉** 