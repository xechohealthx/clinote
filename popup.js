// Popup script for Clinote extension
class ClinotePopup {
  constructor() {
    this.settings = {};
    this.isRecording = false;
    
    this.initializePopup();
    this.loadSettings();
    this.setupEventListeners();
  }

  async initializePopup() {
    // Check current recording status
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_STATUS' }, (response) => {
          if (chrome.runtime.lastError) {
            // Content script not loaded or no response - this is normal
            console.log('Content script not ready or no status response');
            return;
          }
          if (response && response.isRecording) {
            this.updateRecordingState(true);
          }
        });
      }
    } catch (error) {
      console.log('Could not check recording status:', error);
    }
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get('clinoteSettings');
      this.settings = result.clinoteSettings || {};
      
      // Note: Users need to add their own API key in settings
      // No default API key is provided for security reasons
      
      this.populateForm();
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  populateForm() {
    // Processing mode
    const mode = this.settings.localMode !== false ? 'local' : 'cloud';
    const modeRadio = document.querySelector(`input[name="processing-mode"][value="${mode}"]`);
    if (modeRadio) {
      modeRadio.checked = true;
      this.toggleApiKeySection(mode === 'cloud');
      this.toggleLocalModeSection(mode === 'local');
      if (mode === 'local') {
        this.checkServerStatus();
      }
    }

    // API Key
    if (this.settings.apiKey) {
      document.getElementById('api-key').value = this.settings.apiKey;
    }

    // Specialty
    const specialtySelect = document.getElementById('specialty-select');
    if (this.settings.specialty) {
      specialtySelect.value = this.settings.specialty;
    }

    // Checkboxes
    document.getElementById('auto-insert').checked = this.settings.autoInsert !== false;
    document.getElementById('save-transcripts').checked = this.settings.saveTranscripts === true;
    document.getElementById('privacy-consent').checked = this.settings.privacyConsent === true;

    // Section preferences
    const includeSections = this.settings.includeSections || {
      chiefComplaint: true,
      hpi: true,
      ros: true,
      assessment: true,
      plan: true,
      medications: true,
      followUp: true,
      diagnosisCodes: true,
      cptCodes: true
    };

    document.getElementById('include-chief-complaint').checked = includeSections.chiefComplaint !== false;
    document.getElementById('include-hpi').checked = includeSections.hpi !== false;
    document.getElementById('include-ros').checked = includeSections.ros !== false;
    document.getElementById('include-assessment').checked = includeSections.assessment !== false;
    document.getElementById('include-plan').checked = includeSections.plan !== false;
    document.getElementById('include-medications').checked = includeSections.medications !== false;
    document.getElementById('include-followup').checked = includeSections.followUp !== false;
    document.getElementById('include-diagnosis-codes').checked = includeSections.diagnosisCodes !== false;
    document.getElementById('include-cpt-codes').checked = includeSections.cptCodes !== false;

    this.updateSaveButtonState();
  }

  setupEventListeners() {
    // Start/Stop transcription buttons
    document.getElementById('start-transcription').addEventListener('click', () => {
      this.showConsentModal();
    });

    document.getElementById('stop-transcription').addEventListener('click', () => {
      this.stopTranscription();
    });

    // New session button
    document.getElementById('new-session').addEventListener('click', () => {
      this.newSession();
    });

    // Settings toggle
    document.getElementById('settings-toggle').addEventListener('click', () => {
      this.toggleSettingsPanel();
    });

    // Processing mode radio buttons
    document.querySelectorAll('input[name="processing-mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const isLocalMode = e.target.value === 'local';
        this.toggleApiKeySection(!isLocalMode);
        this.toggleLocalModeSection(isLocalMode);
        this.updateSaveButtonState();
        if (isLocalMode) {
          this.checkServerStatus();
        }
      });
    });

    // Download installer button
    document.getElementById('download-installer').addEventListener('click', () => {
      this.downloadInstaller();
    });

    // Privacy consent checkbox
    document.getElementById('privacy-consent').addEventListener('change', () => {
      this.updateSaveButtonState();
    });

    // Save settings button
    document.getElementById('save-settings').addEventListener('click', () => {
      this.saveSettings();
    });

    // Form validation
    document.getElementById('api-key').addEventListener('input', () => {
      this.validateApiKey();
    });
  }

  toggleApiKeySection(show) {
    const section = document.getElementById('api-key-section');
    if (show) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  }

  validateApiKey() {
    const apiKeyInput = document.getElementById('api-key');
    const cloudMode = document.querySelector('input[name="processing-mode"][value="cloud"]').checked;
    
    if (cloudMode && apiKeyInput.value && !apiKeyInput.value.startsWith('sk-')) {
      apiKeyInput.style.borderColor = '#ef4444';
      return false;
    } else {
      apiKeyInput.style.borderColor = '#d1d5db';
      return true;
    }
  }

  updateSaveButtonState() {
    const saveBtn = document.getElementById('save-settings');
    const privacyConsent = document.getElementById('privacy-consent').checked;
    
    saveBtn.disabled = !privacyConsent;
    
    if (!privacyConsent) {
      saveBtn.textContent = 'Privacy Consent Required';
    } else {
      saveBtn.textContent = 'Save Settings';
    }
  }

  async startTranscription() {
    if (!document.getElementById('privacy-consent').checked) {
      this.showNotification('Please accept the privacy acknowledgment first.', 'error');
      return;
    }

    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs[0]) {
        this.showNotification('No active tab found', 'error');
        return;
      }

      // Check if we're on a supported page
      if (tabs[0].url.startsWith('chrome://') || tabs[0].url.startsWith('chrome-extension://')) {
        this.showNotification('Please navigate to a regular webpage to use Clinote', 'error');
        return;
      }

      this.showNotification('Starting recording...', 'info');

      chrome.runtime.sendMessage({ type: 'START_TRANSCRIPTION' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          this.showNotification('Extension communication error. Please reload the extension.', 'error');
          return;
        }
        if (response && response.success) {
          this.updateRecordingState(true);
          this.showNotification('Recording started successfully', 'success');
        } else if (response && response.error) {
          this.showNotification(`Failed to start recording: ${response.error}`, 'error');
        } else {
          this.showNotification('Failed to start recording', 'error');
        }
      });
    } catch (error) {
      console.error('Failed to start transcription:', error);
      this.showNotification('Error starting transcription', 'error');
    }
  }

  async stopTranscription() {
    try {
      chrome.runtime.sendMessage({ type: 'STOP_TRANSCRIPTION' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          this.showNotification('Extension communication error. Please reload the extension.', 'error');
          return;
        }
        if (response && response.success) {
          this.updateRecordingState(false);
          this.showNotification('Transcription stopped', 'success');
        } else if (response && response.error) {
          this.showNotification(`Failed to stop transcription: ${response.error}`, 'error');
        } else {
          this.showNotification('Failed to stop transcription', 'error');
        }
      });
    } catch (error) {
      console.error('Failed to stop transcription:', error);
      this.showNotification('Error stopping transcription', 'error');
    }
  }

  updateRecordingState(isRecording) {
    this.isRecording = isRecording;
    
    const startBtn = document.getElementById('start-transcription');
    const stopBtn = document.getElementById('stop-transcription');
    const statusText = document.getElementById('status-text');
    
    if (isRecording) {
      startBtn.disabled = true;
      stopBtn.disabled = false;
      startBtn.textContent = '🎤 Recording...';
      stopBtn.textContent = '⏹️ Stop Recording';
      statusText.textContent = 'Recording in progress...';
    } else {
      startBtn.disabled = false;
      stopBtn.disabled = true;
      startBtn.textContent = '🎤 Start Recording';
      stopBtn.textContent = '⏹️ Stop Recording';
      statusText.textContent = 'Ready to record';
    }
  }
  
  toggleSettingsPanel() {
    const settingsPanel = document.getElementById('settings-panel');
    const settingsToggle = document.getElementById('settings-toggle');
    
    if (settingsPanel.style.display === 'none') {
      settingsPanel.style.display = 'block';
      settingsToggle.textContent = '⚙️ Hide Settings';
    } else {
      settingsPanel.style.display = 'none';
      settingsToggle.textContent = '⚙️ Settings';
    }
  }
  
  async newSession() {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'NEW_SESSION' }, (response) => {
          if (chrome.runtime.lastError) {
            console.log('Content script not ready');
            return;
          }
          if (response && response.success) {
            this.showNotification('New patient session ready', 'success');
            this.updateRecordingState(false);
          }
        });
      }
    } catch (error) {
      console.error('Failed to start new session:', error);
      this.showNotification('Error starting new session', 'error');
    }
  }

  async saveSettings() {
    if (!this.validateApiKey()) {
      this.showNotification('Please enter a valid OpenAI API key', 'error');
      return;
    }

    const newSettings = {
      localMode: document.querySelector('input[name="processing-mode"][value="local"]').checked,
      apiKey: document.getElementById('api-key').value,
      specialty: document.getElementById('specialty-select').value,
      autoInsert: document.getElementById('auto-insert').checked,
      saveTranscripts: document.getElementById('save-transcripts').checked,
      privacyConsent: document.getElementById('privacy-consent').checked,
      includeSections: {
        chiefComplaint: document.getElementById('include-chief-complaint').checked,
        hpi: document.getElementById('include-hpi').checked,
        ros: document.getElementById('include-ros').checked,
        assessment: document.getElementById('include-assessment').checked,
        plan: document.getElementById('include-plan').checked,
        medications: document.getElementById('include-medications').checked,
        followUp: document.getElementById('include-followup').checked,
        diagnosisCodes: document.getElementById('include-diagnosis-codes').checked,
        cptCodes: document.getElementById('include-cpt-codes').checked
      }
    };

    try {
      chrome.runtime.sendMessage({ 
        type: 'UPDATE_SETTINGS', 
        settings: newSettings 
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
          this.showNotification('Extension communication error. Please reload the extension.', 'error');
          return;
        }
        if (response && response.success) {
          this.settings = { ...this.settings, ...newSettings };
          this.showNotification('Settings saved successfully', 'success');
        } else if (response && response.error) {
          this.showNotification(`Failed to save settings: ${response.error}`, 'error');
        } else {
          this.showNotification('Failed to save settings', 'error');
        }
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
      this.showNotification('Error saving settings', 'error');
    }
  }

  showConsentModal() {
    const modal = document.getElementById('consent-modal');
    const consentCheckbox = document.getElementById('explicit-consent');
    const startButton = document.getElementById('consent-start');
    const cancelButton = document.getElementById('consent-cancel');

    // Show modal
    modal.style.display = 'flex';

    // Handle checkbox change
    consentCheckbox.addEventListener('change', () => {
      startButton.disabled = !consentCheckbox.checked;
    });

    // Handle start button
    startButton.addEventListener('click', () => {
      if (consentCheckbox.checked) {
        this.hideConsentModal();
        this.startTranscription();
      }
    });

    // Handle cancel button
    cancelButton.addEventListener('click', () => {
      this.hideConsentModal();
    });

    // Handle clicking outside modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideConsentModal();
      }
    });
  }

  hideConsentModal() {
    const modal = document.getElementById('consent-modal');
    const consentCheckbox = document.getElementById('explicit-consent');
    
    // Reset modal state
    modal.style.display = 'none';
    consentCheckbox.checked = false;
    document.getElementById('consent-start').disabled = true;
  }

  toggleLocalModeSection(show) {
    const section = document.getElementById('local-mode-section');
    if (show) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  }

  async checkServerStatus() {
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    
    try {
      const response = await fetch('http://localhost:11434/ping', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.model_loaded) {
          statusIndicator.className = 'status-indicator online';
          statusText.textContent = 'Whisper Server: Online';
        } else {
          statusIndicator.className = 'status-indicator offline';
          statusText.textContent = 'Whisper Server: Model Loading';
        }
      } else {
        statusIndicator.className = 'status-indicator offline';
        statusText.textContent = 'Whisper Server: Offline';
      }
    } catch (error) {
      statusIndicator.className = 'status-indicator offline';
      statusText.textContent = 'Whisper Server: Offline';
    }
  }

  downloadInstaller() {
    const userAgent = navigator.userAgent;
    const baseUrl = 'https://github.com/xechohealthx/clinote/releases/latest/download';
    let downloadUrl = '';
    let filename = '';
    
    if (userAgent.includes('Windows')) {
      downloadUrl = `${baseUrl}/clinote-whisper-windows-setup.bat`;
      filename = 'clinote-whisper-windows-setup.bat';
    } else if (userAgent.includes('Mac')) {
      downloadUrl = `${baseUrl}/macos-install.sh`;
      filename = 'macos-install.sh';
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

For detailed instructions, visit: https://github.com/xechohealthx/clinote
    `;
    
    this.showNotification('Manual installation required. Check console for instructions.', 'info');
    console.log('=== Clinote Whisper Server Installation ===');
    console.log(instructions);
    console.log('=== End Instructions ===');
    
    // Open GitHub repository in new tab
    chrome.tabs.create({ url: 'https://github.com/xechohealthx/clinote' });
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      padding: 12px 16px;
      border-radius: 6px;
      color: white;
      font-weight: 500;
      font-size: 13px;
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
      ${type === 'success' ? 'background: #10b981;' : ''}
      ${type === 'error' ? 'background: #ef4444;' : ''}
      ${type === 'info' ? 'background: #3b82f6;' : ''}
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize popup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ClinotePopup());
} else {
  new ClinotePopup();
}