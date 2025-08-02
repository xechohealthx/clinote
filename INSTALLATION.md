# Clinote Extension Installation Guide

## Quick Installation (Developer Mode)

### Step 1: Download Extension Files
1. Download all extension files to a local folder
2. Ensure all files are in the same directory:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `content.css`
   - `popup.html`
   - `popup.css`
   - `popup.js`

### Step 2: Enable Chrome Developer Mode
1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Toggle "Developer mode" ON (top right corner)

### Step 3: Load the Extension
1. Click "Load unpacked" button
2. Select the extension folder
3. Click "Select Folder"
4. Clinote should appear in your extensions list

### Step 4: Pin the Extension
1. Click the puzzle piece icon in Chrome toolbar
2. Find "Clinote" in the extensions menu
3. Click the pin icon to keep it visible

## Initial Setup

### Step 1: Open Extension Settings
1. Click the Clinote icon in your toolbar
2. The settings popup will open

### Step 2: Choose Processing Mode

#### Option A: Local Processing (Recommended)
- Select "Local Processing" radio button
- No API key required
- Maximum privacy protection
- May have slightly lower accuracy

#### Option B: Cloud Processing
- Select "Cloud Processing" radio button
- Requires OpenAI API key
- Higher accuracy transcription
- Data sent to OpenAI servers

### Step 3: Get OpenAI API Key (if using Cloud Mode)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Paste into extension settings

### Step 4: Select Medical Specialty
Choose your specialty from dropdown:
- Primary Care
- Psychiatry  
- Cardiology
- Dermatology
- Pediatrics

### Step 5: Configure Settings
- ✅ **Auto-insert summaries**: Automatically paste generated notes
- ✅ **Save anonymized transcripts**: Store for quality review (optional)

### Step 6: Privacy Acknowledgment
- ✅ Check "Privacy Acknowledgment" box
- This confirms you understand privacy implications
- Click "Save Settings"

## First Use

### Starting Your First Session
1. Open your telemedicine platform (Zoom, Teams, etc.)
2. Click Clinote extension icon
3. Click "Start Transcription"
4. Grant microphone permissions when prompted
5. Floating window will appear with live transcript

### During the Session
- Monitor live transcript in floating window
- Watch AI summaries generate automatically
- Drag window to comfortable position
- Use minimize button if needed

### Ending the Session
1. Click "Stop Recording" in popup or floating window
2. Review generated clinical summary
3. Edit summary if needed using "Edit Summary"
4. Click "Insert into Field" to paste into EMR/notes

## Troubleshooting

### Extension Won't Load
- Ensure all files are in the same folder
- Check that `manifest.json` is present
- Try refreshing the extensions page
- Check Chrome developer console for errors

### No Audio Captured
- Grant microphone permissions
- Ensure audio is playing in browser tab
- Try refreshing the page
- Check that correct tab is active

### Transcription Not Working
- Verify API key is correct (cloud mode)
- Check internet connection
- Try switching processing modes
- Look for error messages in popup

### Can't Insert Text
- Click directly in target text field first
- Try copying and pasting manually
- Check if field accepts text input
- Use "Edit Summary" for manual insertion

## Privacy Best Practices

### For Maximum Privacy
1. Use **Local Processing** mode
2. Disable **Save anonymized transcripts**
3. Clear browser data regularly
4. Use in private/incognito browsing
5. Don't enter API keys unnecessarily

### HIPAA Compliance
- Obtain patient consent before recording
- Follow organizational policies
- Use secure networks only
- Log out of systems when done
- Keep extension updated

## Support

### Getting Help
- Check this installation guide
- Review troubleshooting section
- Check Chrome developer tools console
- Contact your IT administrator

### Reporting Issues
When reporting problems, include:
- Chrome version
- Extension version
- Error messages (if any)
- Steps to reproduce issue
- Operating system

## Updates

### Updating the Extension
1. Download new version files
2. Replace old files in extension folder
3. Go to `chrome://extensions/`
4. Click refresh icon on Clinote extension
5. Restart Chrome if needed

### Version Notes
- Always backup settings before updating
- Check changelog for new features
- Test functionality after updates
- Report any issues promptly

---

**Need Help?** Contact your healthcare IT support team or refer to the full documentation.