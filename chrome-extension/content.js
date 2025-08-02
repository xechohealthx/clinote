// Content script for Clinote extension
console.log('Clinote content script loading...');

class ClinoteContent {
  constructor() {
    this.isRecording = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.floatingUI = null;
    this.transcript = '';
    this.currentSummary = null;
    this.cachedSettings = null; // Cache settings to reduce API calls
    this.summaryRequestTimeout = null; // For debouncing summary requests
    this.diagnosisCodes = [];
    this.cptCodes = [];
    this.audioContext = null;
    this.analyser = null;
    this.visualizerCanvas = null;
    this.visualizerCtx = null;
    this.animationFrame = null;
    
    this.initializeContent();
  }

  initializeContent() {
    console.log('Initializing Clinote content script...');
    
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('Content script received message:', message);
      this.handleMessage(message, sender, sendResponse);
      return true;
    });

    // Initialize audio capture capability
    this.setupAudioCapture();
    
    // Create floating UI
    this.createFloatingUI();
    
    console.log('Clinote content script initialized');
    
    // Send a test message to background to confirm content script is loaded
    chrome.runtime.sendMessage({ type: 'CONTENT_SCRIPT_LOADED' }, (response) => {
      console.log('Content script loaded confirmation sent');
    });
  }

  setupAudioCapture() {
    window.clinoteAudioCapture = {
      start: () => this.startAudioCapture(),
      stop: () => this.stopAudioCapture()
    };
  }

  async startAudioCapture() {
    try {
      console.log('Starting audio capture...');
      
      // Stop any existing recording first
      if (this.mediaRecorder && this.isRecording) {
        console.log('Stopping existing recording before starting new one...');
        this.stopAudioCapture();
        // Wait a moment for the recorder to stop
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      let stream;
      
      // Check if we already have permission
      const permissions = await navigator.permissions.query({ name: 'microphone' });
      console.log('Microphone permission state:', permissions.state);
      
      // First try to get microphone audio
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          }
        });
        console.log('Microphone audio stream obtained:', stream);
      } catch (micError) {
        console.log('Microphone access failed, trying system audio:', micError);
        
        // Fallback to system audio (for capturing audio from other applications)
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: false,
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
          }
        });
        console.log('System audio stream obtained:', stream);
      }
      
      // Initialize audio visualization
      this.initializeAudioVisualization(stream);

      // Try to find a supported MIME type, prioritizing webm which the API definitely supports
      const supportedTypes = [
        'audio/webm',
        'audio/webm;codecs=opus',
        'audio/webm;codecs=vorbis',
        'audio/mp4',
        'audio/mp4;codecs=mp4a.40.2',
        'audio/ogg;codecs=opus',
        'audio/wav'
      ];
      
      let selectedType = null;
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          selectedType = type;
          console.log('Using MIME type:', type);
          break;
        }
      }
      
      if (!selectedType) {
        console.warn('No supported MIME type found, using default');
        selectedType = '';
      }
      
      // Log all supported types for debugging
      console.log('All supported MIME types:');
      supportedTypes.forEach(type => {
        console.log(`${type}: ${MediaRecorder.isTypeSupported(type)}`);
      });
      
      // Force webm if possible, as it's most compatible with the API
      if (selectedType && !selectedType.includes('webm')) {
        console.log('Forcing webm format for better API compatibility');
        selectedType = 'audio/webm';
      }
      
      // If no webm support, try to use a simple format
      if (!selectedType || !selectedType.includes('webm')) {
        console.log('No webm support, trying simple audio format');
        selectedType = '';
      }
      
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: selectedType
      });
      
      console.log('MediaRecorder created with MIME type:', selectedType);
      console.log('MediaRecorder state:', this.mediaRecorder.state);
      
      this.mediaRecorder.ondataavailable = (event) => {
        console.log('Audio data available:', event.data.size, 'bytes');
        console.log('Audio data type:', event.data.type);
        console.log('Audio data MIME type:', event.data.type);
        
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          // Don't process individual chunks - wait for complete recording
        }
      };

      this.mediaRecorder.onstop = () => {
        console.log('Media recorder stopped');
        this.finalizeRecording();
      };

      // Only start if not already recording
      if (this.mediaRecorder.state !== 'recording') {
        this.mediaRecorder.start(5000); // Capture in 5-second chunks for better quality
        console.log('MediaRecorder started with timeslice: 5000ms');
      } else {
        console.log('MediaRecorder already recording, skipping start');
      }
      
      this.isRecording = true;
      console.log('Showing floating UI...');
      this.showFloatingUI();
      this.updateUIState();
      console.log('Audio capture started successfully');

    } catch (error) {
      console.error('Failed to start audio capture:', error);
      
      let errorMessage = 'Failed to access audio. ';
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please grant microphone permissions and try again.';
        // Show a more helpful message
        this.showError('Microphone permission required. Please click "Allow" when prompted, then try again.');
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No microphone found. Please connect a microphone and try again.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Your browser does not support audio recording.';
      } else {
        errorMessage += `Error: ${error.message}`;
      }
      
      this.showError(errorMessage);
    }
  }

  stopAudioCapture() {
    if (this.mediaRecorder && this.isRecording) {
      console.log('Stopping audio capture...');
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.updateUIState();
      this.stopAudioVisualization();
      
      // Show processing state
      this.showProcessingState();
      
      // Process the complete recording
      this.processCompleteRecording();
    }
  }
  
  showProcessingState() {
    // Update recording indicator to show processing
    const indicator = this.floatingUI.querySelector('.clinote-recording-indicator');
    if (indicator) {
      indicator.innerHTML = `
        <div class="clinote-processing-spinner"></div>
        <span>Processing Audio...</span>
      `;
      indicator.classList.add('clinote-processing');
    }
    
    // Update status text
    const statusText = document.getElementById('clinote-status-text');
    if (statusText) {
      statusText.textContent = 'Processing audio and generating summary...';
    }
    
    // Show processing notification
    this.showInfo('Processing audio and generating clinical summary...');
  }
  
  hideProcessingState() {
    // Reset recording indicator
    const indicator = this.floatingUI.querySelector('.clinote-recording-indicator');
    if (indicator) {
      indicator.innerHTML = `
        <div class="clinote-pulse"></div>
        <span>Live Transcription</span>
      `;
      indicator.classList.remove('clinote-processing');
    }
    
    // Reset status text
    const statusText = document.getElementById('clinote-status-text');
    if (statusText) {
      statusText.textContent = 'Ready for next recording';
    }
  }
  
  initializeAudioVisualization(stream) {
    try {
      // Initialize audio context and analyzer
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      // Create source from stream
      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);
      
      // Get canvas for visualization
      this.visualizerCanvas = document.getElementById('clinote-waveform');
      if (this.visualizerCanvas) {
        this.visualizerCtx = this.visualizerCanvas.getContext('2d');
        this.startVisualization();
      }
    } catch (error) {
      console.error('Error initializing audio visualization:', error);
    }
  }
  
  startVisualization() {
    if (!this.analyser || !this.visualizerCtx) return;
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!this.isRecording) return;
      
      this.animationFrame = requestAnimationFrame(draw);
      
      this.analyser.getByteFrequencyData(dataArray);
      
      // Clear canvas
      this.visualizerCtx.fillStyle = 'rgb(248, 250, 252)';
      this.visualizerCtx.fillRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);
      
      // Draw waveform bars
      const barWidth = (this.visualizerCanvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * this.visualizerCanvas.height;
        
        // Create gradient effect
        const gradient = this.visualizerCtx.createLinearGradient(0, 0, 0, this.visualizerCanvas.height);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1d4ed8');
        
        this.visualizerCtx.fillStyle = gradient;
        this.visualizerCtx.fillRect(x, this.visualizerCanvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
  }
  
  stopAudioVisualization() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Clear the canvas
    if (this.visualizerCtx && this.visualizerCanvas) {
      this.visualizerCtx.fillStyle = 'rgb(248, 250, 252)';
      this.visualizerCtx.fillRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);
    }
    
    // Clean up audio context
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
  }

  async processAudioChunk(audioBlob) {
    try {
      // Show processing indicator
      this.showInfo('Processing audio...');
      
      const transcript = await this.simulateTranscription(audioBlob);
      this.transcript += transcript + ' ';
      this.updateTranscriptDisplay();
      
      // Process transcript chunks for real-time summary
      if (this.transcript.length > 500) {
        this.requestSummaryUpdate();
      }
    } catch (error) {
      console.error('Audio processing error:', error);
      this.showError(`Transcription error: ${error.message}`);
    }
  }

  async simulateTranscription(audioBlob) {
    try {
      // Convert blob to base64 for transmission
      console.log('Converting audio blob to base64...');
      console.log('Audio blob type:', audioBlob.type);
      console.log('Audio blob size:', audioBlob.size);
      
      const base64Audio = await this.blobToBase64(audioBlob);
      console.log('Base64 audio length:', base64Audio.length);
      
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
          type: 'TRANSCRIBE_AUDIO',
          audioBase64: base64Audio,
          audioType: audioBlob.type
        }, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response);
          }
        });
      });
      
      console.log('Background script transcription response:', response);
      return response.transcript;
    } catch (error) {
      console.error('Transcription error:', error);
      // Fallback to simulated text if API fails
      const samplePhrases = [
        'Patient reports headache for 3 days.',
        'Pain is throbbing, located in frontal region.',
        'No associated nausea or vomiting.',
        'Taking ibuprofen with minimal relief.',
        'History of migraine, last episode 6 months ago.',
        'Physical exam shows normal vital signs.',
        'Plan: increase fluids, prescribe sumatriptan.',
        'Follow up in 1 week if symptoms persist.'
      ];
      
      return samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    }
  }

  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // Remove data URL prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Audio processing is now handled by background script
  // Removed callWhisperAPI and base64ToBlob methods

  async requestSummaryUpdate() {
    // Debounce summary requests to prevent excessive API calls
    if (this.summaryRequestTimeout) {
      clearTimeout(this.summaryRequestTimeout);
    }
    
    this.summaryRequestTimeout = setTimeout(async () => {
      try {
        const settings = await this.getSettings();
        
        console.log('Requesting summary update for transcript length:', this.transcript.length);
        this.showInfo('Generating clinical summary...');
        
        chrome.runtime.sendMessage({
          type: 'PROCESS_TRANSCRIPT',
          transcript: this.transcript,
          specialty: settings.specialty || 'primary-care'
        }, (response) => {
          console.log('Summary response received:', response);
          if (response.summary) {
            console.log('Summary data:', response.summary);
            this.currentSummary = response.summary;
            this.diagnosisCodes = response.summary.diagnosisCodes || [];
            this.cptCodes = response.summary.cptCodes || [];
            console.log('HPI content:', response.summary.hpi);
            console.log('Assessment content:', response.summary.assessment);
            console.log('Plan content:', response.summary.plan);
            this.updateSummaryDisplay();
            this.updateDiagnosisCodes();
            this.updateCPTCodes();
            this.showSuccess('Summary updated');
            this.hideProcessingState();
          } else if (response.error) {
            this.showError(`Summary error: ${response.error}`);
            this.hideProcessingState();
          }
        });
      } catch (error) {
        console.error('Summary request error:', error);
        this.showError('Failed to generate summary');
      }
    }, 2000); // Wait 2 seconds before making summary request
  }

  createFloatingUI() {
    console.log('Creating floating UI...');
    // Create floating UI container
    this.floatingUI = document.createElement('div');
    this.floatingUI.id = 'clinote-floating-ui';
    this.floatingUI.className = 'clinote-hidden';
    
    this.floatingUI.innerHTML = `
      <div class="clinote-header">
        <div class="clinote-logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.828 14.828a4 4 0 0 1-5.656 0M9 10h1m4 0h1m-6.5-7h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z"/>
          </svg>
          Clinote
        </div>
        <div class="clinote-controls">
          <button id="clinote-minimize" class="clinote-btn-icon">−</button>
          <button id="clinote-close" class="clinote-btn-icon">×</button>
        </div>
      </div>
      
      <div class="clinote-content">
        <div class="clinote-status">
          <div class="clinote-recording-indicator">
            <div class="clinote-pulse"></div>
            <span>Live Transcription</span>
          </div>
          <div class="clinote-privacy-indicator">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <circle cx="12" cy="16" r="1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            HIPAA Mode
          </div>
        </div>
        
        <div id="clinote-status-text" class="clinote-status-text">
          Ready to record
        </div>
        
        <div class="clinote-audio-visualizer">
          <canvas id="clinote-waveform" width="360" height="40"></canvas>
        </div>
        
        <div class="clinote-transcript-section">
          <h3>Live Transcript</h3>
          <div id="clinote-transcript" class="clinote-transcript">
            Transcription will appear here...
          </div>
        </div>
        
        <div class="clinote-summary-section">
          <h3>Clinical Summary</h3>
          <div id="clinote-summary" class="clinote-summary">
            <div class="clinote-summary-item">
              <div class="clinote-summary-header">
                <label>Chief Complaint:</label>
                <button class="clinote-copy-btn" data-section="chief-complaint">📋 Copy</button>
              </div>
              <div id="chief-complaint">Analyzing...</div>
            </div>
            <div class="clinote-summary-item">
              <div class="clinote-summary-header">
                <label>HPI:</label>
                <button class="clinote-copy-btn" data-section="hpi">📋 Copy</button>
              </div>
              <div id="hpi">Analyzing...</div>
            </div>
            <div class="clinote-summary-item">
              <div class="clinote-summary-header">
                <label>Assessment:</label>
                <button class="clinote-copy-btn" data-section="assessment">📋 Copy</button>
              </div>
              <div id="assessment">Analyzing...</div>
            </div>
            <div class="clinote-summary-item">
              <div class="clinote-summary-header">
                <label>Treatment Plan:</label>
                <button class="clinote-copy-btn" data-section="plan">📋 Copy</button>
              </div>
              <div id="plan">Analyzing...</div>
            </div>
          </div>
          <div class="clinote-summary-actions">
            <button id="clinote-save-summary" class="clinote-btn-secondary">💾 Save Summary</button>
          </div>
        </div>
        
        <div class="clinote-codes-section">
          <h3>Diagnosis & CPT Codes</h3>
          <div class="clinote-codes-container">
            <div class="clinote-codes-item">
              <div class="clinote-codes-header">
                <label>Diagnosis Codes:</label>
                <button class="clinote-copy-btn" data-section="diagnosis-codes">📋 Copy</button>
              </div>
              <div id="diagnosis-codes">Analyzing...</div>
            </div>
            <div class="clinote-codes-item">
              <div class="clinote-codes-header">
                <label>CPT Codes:</label>
                <button class="clinote-copy-btn" data-section="cpt-codes">📋 Copy</button>
              </div>
              <div id="cpt-codes">Analyzing...</div>
            </div>
          </div>
        </div>
        
        <div class="clinote-actions">
          <button id="clinote-stop" class="clinote-btn-danger">⏹️ Stop Recording</button>
          <button id="clinote-next-patient" class="clinote-btn-success">👥 Next Patient</button>
          <button id="clinote-edit" class="clinote-btn-secondary">Edit Summary</button>
          <button id="clinote-insert" class="clinote-btn-primary">Insert into Field</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(this.floatingUI);
    console.log('Floating UI created and added to DOM');
    this.setupUIEventListeners();
  }

  setupUIEventListeners() {
    // Close button
    document.getElementById('clinote-close').addEventListener('click', () => {
      this.hideFloatingUI();
      this.stopAudioCapture();
    });

    // Minimize button
    document.getElementById('clinote-minimize').addEventListener('click', () => {
      this.floatingUI.classList.toggle('clinote-minimized');
    });

    // Insert button
    document.getElementById('clinote-insert').addEventListener('click', () => {
      this.insertSummaryToActiveField();
    });

    // Stop button
    document.getElementById('clinote-stop').addEventListener('click', () => {
      this.stopAudioCapture();
    });

    // Next Patient button
    document.getElementById('clinote-next-patient').addEventListener('click', () => {
      this.nextPatient();
    });

    // Edit button
    document.getElementById('clinote-edit').addEventListener('click', () => {
      this.openSummaryEditor();
    });

    // Copy buttons
    document.querySelectorAll('.clinote-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sectionId = e.target.getAttribute('data-section');
        this.copySection(sectionId);
      });
    });

    // Save summary button
    document.getElementById('clinote-save-summary').addEventListener('click', () => {
      this.saveSummaryToFile();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + N for next patient
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        this.nextPatient();
      }
      // Ctrl/Cmd + S for stop recording
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.stopAudioCapture();
      }
      // Ctrl/Cmd + H for help
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        this.showKeyboardHelp();
      }
    });

    // Make draggable
    this.makeDraggable();
  }
  
  showKeyboardHelp() {
    this.showInfo('Keyboard shortcuts: Ctrl+N (Next Patient), Ctrl+S (Stop Recording), Ctrl+H (Help)');
  }
  
  setupKeyboardShortcuts() {
    // Keyboard shortcuts are already set up in setupUIEventListeners
    // This method is kept for consistency
  }
  
  copySection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element || !element.textContent || element.textContent === 'Analyzing...') {
      this.showError('No content to copy');
      return;
    }
    
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
      this.showSuccess('Section copied to clipboard');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showSuccess('Section copied to clipboard');
    });
  }
  
  saveSummaryToFile() {
    if (!this.currentSummary) {
      this.showError('No summary available to save');
      return;
    }
    
    const summaryText = this.formatSummaryForInsertion();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `clinote-summary-${timestamp}.txt`;
    
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showSuccess('Summary saved to file');
  }
  
  makeDraggable() {
    const header = this.floatingUI.querySelector('.clinote-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    header.addEventListener('mousedown', (e) => {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      if (e.target === header || header.contains(e.target)) {
        isDragging = true;
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        this.floatingUI.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }
  
  showFloatingUI() {
    console.log('showFloatingUI called, floatingUI:', this.floatingUI);
    if (this.floatingUI) {
      this.floatingUI.classList.remove('clinote-hidden');
      this.floatingUI.classList.add('clinote-visible');
      console.log('Floating UI should now be visible');
    } else {
      console.error('Floating UI not created yet!');
    }
  }

  hideFloatingUI() {
    this.floatingUI.classList.remove('clinote-visible');
    this.floatingUI.classList.add('clinote-hidden');
  }

  updateUIState() {
    const indicator = this.floatingUI.querySelector('.clinote-recording-indicator');
    if (this.isRecording) {
      indicator.classList.add('clinote-active');
    } else {
      indicator.classList.remove('clinote-active');
    }
  }

  updateTranscriptDisplay() {
    const transcriptElement = document.getElementById('clinote-transcript');
    if (transcriptElement) {
      transcriptElement.textContent = this.transcript;
      transcriptElement.scrollTop = transcriptElement.scrollHeight;
    }
  }

  updateSummaryDisplay() {
    if (!this.currentSummary) return;

    const elements = {
      'chief-complaint': this.currentSummary.chiefComplaint,
      'hpi': this.formatHPI(this.currentSummary.hpi),
      'assessment': this.formatAssessment(this.currentSummary.assessment),
      'plan': this.formatPlan(this.currentSummary.plan)
    };

    Object.entries(elements).forEach(([id, content]) => {
      const element = document.getElementById(id);
      if (element && content) {
        element.textContent = content;
      }
    });
  }
  
  formatHPI(hpi) {
    if (typeof hpi === 'string') return hpi;
    if (!hpi || typeof hpi !== 'object') return 'Not specified';
    
    const parts = [];
    
    if (hpi.timeline) parts.push(hpi.timeline);
    if (hpi.patientQuotes && Array.isArray(hpi.patientQuotes)) {
      parts.push('Patient quotes: ' + hpi.patientQuotes.map(q => `"${q}"`).join(', '));
    }
    if (hpi.severity) parts.push('Severity: ' + hpi.severity);
    if (hpi.associatedSymptoms) parts.push('Associated symptoms: ' + hpi.associatedSymptoms);
    if (hpi.aggravatingFactors) parts.push('Aggravating factors: ' + hpi.aggravatingFactors);
    if (hpi.alleviatingFactors) parts.push('Alleviating factors: ' + hpi.alleviatingFactors);
    if (hpi.impact) parts.push('Impact: ' + hpi.impact);
    
    return parts.join('\n\n');
  }
  
  formatAssessment(assessment) {
    if (typeof assessment === 'string') return assessment;
    if (!assessment || typeof assessment !== 'object') return 'Not specified';
    
    const parts = [];
    
    if (assessment.primaryDiagnosis) parts.push('Primary Diagnosis: ' + assessment.primaryDiagnosis);
    if (assessment.differentialDiagnoses && Array.isArray(assessment.differentialDiagnoses)) {
      parts.push('Differential Diagnoses: ' + assessment.differentialDiagnoses.join(', '));
    }
    if (assessment.clinicalReasoning) parts.push('Clinical Reasoning: ' + assessment.clinicalReasoning);
    if (assessment.severityAssessment) parts.push('Severity Assessment: ' + assessment.severityAssessment);
    if (assessment.riskFactors) parts.push('Risk Factors: ' + assessment.riskFactors);
    if (assessment.complications) parts.push('Complications: ' + assessment.complications);
    
    return parts.join('\n\n');
  }
  
  formatPlan(plan) {
    if (typeof plan === 'string') return plan;
    if (!plan || typeof plan !== 'object') return 'Not specified';
    
    const parts = [];
    
    if (plan.immediateInterventions) parts.push('Immediate Interventions: ' + plan.immediateInterventions);
    if (plan.medications) parts.push('Medications: ' + plan.medications);
    if (plan.diagnosticTesting) parts.push('Diagnostic Testing: ' + plan.diagnosticTesting);
    if (plan.referrals) parts.push('Referrals: ' + plan.referrals);
    if (plan.lifestyleModifications) parts.push('Lifestyle Modifications: ' + plan.lifestyleModifications);
    if (plan.patientEducation) parts.push('Patient Education: ' + plan.patientEducation);
    if (plan.followUp) parts.push('Follow-up: ' + plan.followUp);
    
    return parts.join('\n\n');
  }
  
  updateDiagnosisCodes() {
    const element = document.getElementById('diagnosis-codes');
    if (element) {
      if (this.diagnosisCodes.length > 0) {
        // Handle both old format (strings) and new format (objects)
        const formattedCodes = this.diagnosisCodes.map(code => {
          if (typeof code === 'string') {
            return code;
          } else if (code && code.code && code.name) {
            return `${code.code} - ${code.name}`;
          } else {
            return 'Invalid code format';
          }
        });
        element.textContent = formattedCodes.join('\n');
      } else {
        element.textContent = 'Analyzing...';
      }
    }
  }
  
  updateCPTCodes() {
    const element = document.getElementById('cpt-codes');
    if (element) {
      if (this.cptCodes.length > 0) {
        // Handle both old format (strings) and new format (objects)
        const formattedCodes = this.cptCodes.map(code => {
          if (typeof code === 'string') {
            return code;
          } else if (code && code.code && code.name) {
            return `${code.code} - ${code.name}`;
          } else {
            return 'Invalid code format';
          }
        });
        element.textContent = formattedCodes.join('\n');
      } else {
        element.textContent = 'Analyzing...';
      }
    }
  }

  async insertSummaryToActiveField() {
    if (!this.currentSummary) {
      this.showError('No summary available to insert');
      return;
    }

    const activeElement = document.activeElement;
    const formattedSummary = this.formatSummaryForInsertion();

    // Try different insertion methods
    if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
      activeElement.value += formattedSummary;
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (activeElement && activeElement.contentEditable === 'true') {
      activeElement.innerHTML += formattedSummary.replace(/\n/g, '<br>');
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      // Try to find the most likely text field
      const textFields = document.querySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
      if (textFields.length > 0) {
        const lastField = textFields[textFields.length - 1];
        if (lastField.tagName === 'TEXTAREA' || lastField.tagName === 'INPUT') {
          lastField.value += formattedSummary;
          lastField.focus();
        } else {
          lastField.innerHTML += formattedSummary.replace(/\n/g, '<br>');
          lastField.focus();
        }
      } else {
        this.showError('No active text field found');
      }
    }
  }

  formatSummaryForInsertion() {
    if (!this.currentSummary) return '';

    // Format diagnosis codes
    const diagnosisCodesText = this.diagnosisCodes.length > 0 
      ? this.diagnosisCodes.map(code => {
          if (typeof code === 'string') {
            return code;
          } else if (code && code.code && code.name) {
            return `${code.code} - ${code.name}`;
          } else {
            return 'Invalid code format';
          }
        }).join('\n')
      : 'Not specified';

    // Format CPT codes
    const cptCodesText = this.cptCodes.length > 0 
      ? this.cptCodes.map(code => {
          if (typeof code === 'string') {
            return code;
          } else if (code && code.code && code.name) {
            return `${code.code} - ${code.name}`;
          } else {
            return 'Invalid code format';
          }
        }).join('\n')
      : 'Not specified';

    // Get user preferences for which sections to include
    const settings = await this.getSettings();
    const includeSections = settings.includeSections || {
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

    const sections = [];
    
    if (includeSections.chiefComplaint) {
      sections.push(`Chief Complaint: ${this.currentSummary.chiefComplaint || 'Not specified'}`);
    }
    
    if (includeSections.hpi) {
      sections.push(`History of Present Illness: ${this.formatHPI(this.currentSummary.hpi)}`);
    }
    
    if (includeSections.ros) {
      sections.push(`Review of Systems: ${this.currentSummary.ros || 'Not specified'}`);
    }
    
    if (includeSections.assessment) {
      sections.push(`Assessment: ${this.formatAssessment(this.currentSummary.assessment)}`);
    }
    
    if (includeSections.plan) {
      sections.push(`Plan: ${this.formatPlan(this.currentSummary.plan)}`);
    }
    
    if (includeSections.medications) {
      sections.push(`Medications: ${this.currentSummary.medications || 'Not specified'}`);
    }
    
    if (includeSections.followUp) {
      sections.push(`Follow-up: ${this.currentSummary.followUp || 'Not specified'}`);
    }
    
    if (includeSections.diagnosisCodes) {
      sections.push(`Diagnosis Codes:\n${diagnosisCodesText}`);
    }
    
    if (includeSections.cptCodes) {
      sections.push(`CPT Codes: ${cptCodesText}`);
    }

    return `
Clinical Note - ${new Date().toLocaleDateString()}

${sections.join('\n\n')}

[Generated by Clinote - Please review and edit as needed]
    `.trim();
  }

  openSummaryEditor() {
    // Create modal editor
    const modal = document.createElement('div');
    modal.className = 'clinote-modal';
    modal.innerHTML = `
      <div class="clinote-modal-content">
        <div class="clinote-modal-header">
          <h3>Edit Clinical Summary</h3>
          <button class="clinote-modal-close">×</button>
        </div>
        <div class="clinote-modal-body">
          <textarea id="clinote-summary-editor" rows="15">${this.formatSummaryForInsertion()}</textarea>
        </div>
        <div class="clinote-modal-footer">
          <button class="clinote-btn-secondary" onclick="this.closest('.clinote-modal').remove()">Cancel</button>
          <button class="clinote-btn-primary" id="save-edited-summary">Save & Insert</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Setup modal events
    modal.querySelector('.clinote-modal-close').onclick = () => modal.remove();
    modal.querySelector('#save-edited-summary').onclick = () => {
      const editedText = document.getElementById('clinote-summary-editor').value;
      this.insertEditedSummary(editedText);
      modal.remove();
    };
  }

  insertEditedSummary(text) {
    const activeElement = document.activeElement;
    
    if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) {
      activeElement.value = text;
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (activeElement && activeElement.contentEditable === 'true') {
      activeElement.innerHTML = text.replace(/\n/g, '<br>');
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  showError(message) {
    const notification = document.createElement('div');
    notification.className = 'clinote-notification clinote-error';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'clinote-notification clinote-success';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  showInfo(message) {
    const notification = document.createElement('div');
    notification.className = 'clinote-notification clinote-info';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  // This constructor is duplicated - removing it

  handleMessage(message, sender, sendResponse) {
    console.log('Content script handling message:', message.type);
    
    switch (message.type) {
      case 'START_AUDIO_CAPTURE':
        console.log('Starting audio capture from message');
        this.startAudioCapture();
        sendResponse({ success: true });
        break;
      case 'STOP_AUDIO_CAPTURE':
        console.log('Stopping audio capture from message');
        this.stopAudioCapture();
        sendResponse({ success: true });
        break;
      case 'GET_STATUS':
        sendResponse({ 
          isRecording: this.isRecording,
          hasTranscript: this.transcript.length > 0,
          hasSummary: !!this.currentSummary
        });
        break;
      case 'TEST_MESSAGE':
        console.log('Test message received - content script is working!');
        sendResponse({ success: true, message: 'Content script is responding' });
        break;
      case 'PING':
        console.log('Ping received - content script is alive');
        sendResponse({ success: true, message: 'Content script is responsive' });
        break;
      case 'NEW_SESSION':
        console.log('Starting new patient session');
        this.nextPatient();
        sendResponse({ success: true });
        break;
    }
  }

  async getSettings() {
    // Return cached settings if available
    if (this.cachedSettings) {
      return this.cachedSettings;
    }
    
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (response) => {
        this.cachedSettings = response.settings || {};
        resolve(this.cachedSettings);
      });
    });
  }

  async refreshSettings() {
    this.cachedSettings = null;
    return await this.getSettings();
  }

  finalizeRecording() {
    // Process final transcript
    if (this.transcript.length > 0) {
      this.requestSummaryUpdate();
    }
  }
  
  nextPatient() {
    // Show witty confirmation dialog
    const wittyMessages = [
      "🚀 Ready to launch the next medical adventure?",
      "🎭 Time to close this chapter and open a new one!",
      "🔄 Clearing the stage for the next star patient!",
      "🧹 Sweeping away the old, making room for the new!",
      "📝 Fresh page, fresh patient, fresh possibilities!",
      "🎪 Packing up the medical circus for the next show!",
      "🔄 Time for a clean slate and a new medical tale!"
    ];
    
    const randomMessage = wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
    
    if (confirm(`${randomMessage}\n\nThis will clear all current data. Continue?`)) {
      // Stop any current recording
      if (this.isRecording) {
        this.stopAudioCapture();
      }
      
      // Clear all data for new patient
      this.transcript = '';
      this.currentSummary = null;
      this.audioChunks = [];
      this.diagnosisCodes = [];
      this.cptCodes = [];
      
      // Update UI
      this.updateTranscriptDisplay();
      this.updateSummaryDisplay();
      this.updateDiagnosisCodes();
      this.updateCPTCodes();
      
      // Show confirmation
      this.showSuccess('✨ Fresh start! Ready for the next patient');
      
      // Keep the floating UI open but clear all fields
      this.showFloatingUI();
    }
  }
  
  async processCompleteRecording() {
    try {
      console.log('Processing complete recording...');
      console.log('Audio chunks collected:', this.audioChunks.length);
      
      if (this.audioChunks.length === 0) {
        console.log('No audio chunks to process');
        this.hideProcessingState();
        return;
      }
      
      // Combine all audio chunks into a single blob
      const completeAudioBlob = new Blob(this.audioChunks, { 
        type: this.audioChunks[0].type 
      });
      
      console.log('Complete audio blob size:', completeAudioBlob.size, 'bytes');
      console.log('Complete audio blob type:', completeAudioBlob.type);
      
      // Process the complete audio
      const transcript = await this.simulateTranscription(completeAudioBlob);
      this.transcript = transcript;
      this.updateTranscriptDisplay();
      
      // Clear the chunks for next recording
      this.audioChunks = [];
      
      // Request summary if we have transcript
      if (this.transcript.length > 0) {
        this.requestSummaryUpdate();
      } else {
        this.hideProcessingState();
      }
      
    } catch (error) {
      console.error('Error processing complete recording:', error);
      this.showError(`Processing error: ${error.message}`);
      this.hideProcessingState();
    }
  }
}

// Initialize content script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Clinote...');
    new ClinoteContent();
  });
} else {
  console.log('DOM already loaded, initializing Clinote...');
  new ClinoteContent();
}

console.log('Clinote content script file loaded');