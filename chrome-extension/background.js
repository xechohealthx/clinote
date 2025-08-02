// Background service worker for Clinote extension
class ClinoteBackground {
  constructor() {
    this.isRecording = false;
    this.transcriptionChunks = [];
    this.initializeExtension();
  }

  initializeExtension() {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('Clinote extension installed');
      this.setDefaultSettings();
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });

    chrome.tabs.onActivated.addListener(() => {
      this.updateExtensionState();
    });
  }

  async setDefaultSettings() {
    const defaultSettings = {
      apiKey: '',
      localMode: true,
      specialty: 'primary-care',
      saveTranscripts: false,
      privacyConsent: false,
      autoInsert: true
    };

    await chrome.storage.sync.set({ clinoteSettings: defaultSettings });
  }

  async handleMessage(message, sender, sendResponse) {
    console.log('Background received message:', message.type, 'from sender:', sender);
    try {
      switch (message.type) {
        case 'START_TRANSCRIPTION':
          // Get the active tab if sender is not available
          const activeTab = sender?.tab || await this.getActiveTab();
          if (activeTab?.id) {
            await this.startTranscription(activeTab.id);
            sendResponse({ success: true });
          } else {
            sendResponse({ error: 'No active tab found' });
          }
          break;

        case 'STOP_TRANSCRIPTION':
          // Get the active tab if sender is not available
          const stopTab = sender?.tab || await this.getActiveTab();
          if (stopTab?.id) {
            await this.stopTranscription(stopTab.id);
            sendResponse({ success: true });
          } else {
            sendResponse({ error: 'No active tab found' });
          }
          break;

        case 'PROCESS_TRANSCRIPT':
          try {
            const summary = await this.processTranscript(message.transcript, message.specialty);
            sendResponse({ summary });
          } catch (error) {
            console.error('Error processing transcript:', error);
            sendResponse({ error: error.message });
          }
          break;

        case 'GET_SETTINGS':
          try {
            const settings = await this.getSettings();
            sendResponse({ settings });
          } catch (error) {
            console.error('Error getting settings:', error);
            sendResponse({ error: error.message });
          }
          break;

        case 'UPDATE_SETTINGS':
          try {
            await this.updateSettings(message.settings);
            sendResponse({ success: true });
          } catch (error) {
            console.error('Error updating settings:', error);
            sendResponse({ error: error.message });
          }
          break;

        case 'CONTENT_SCRIPT_LOADED':
          console.log('Content script loaded on tab:', sender.tab?.id);
          
          // Test if content script is responding
          try {
            await chrome.tabs.sendMessage(sender.tab.id, { type: 'TEST_MESSAGE' });
            console.log('Content script is responding to messages');
          } catch (error) {
            console.error('Content script not responding to test message:', error);
          }
          
          sendResponse({ success: true });
          break;
          
        case 'TRANSCRIBE_AUDIO':
          try {
            console.log('Background received TRANSCRIBE_AUDIO request');
            const settings = await this.getSettings();
            
            if (!settings.apiKey) {
              sendResponse({ error: 'OpenAI API key not configured' });
              return;
            }
            
            const transcript = await this.callWhisperAPI(message.audioBase64, settings.apiKey, message.audioType);
            console.log('Background Whisper API transcript:', transcript);
            sendResponse({ transcript });
          } catch (error) {
            console.error('Background transcription error:', error);
            sendResponse({ error: error.message });
          }
          break;
          


        default:
          sendResponse({ error: 'Unknown message type' });
      }
    } catch (error) {
      console.error('Background script error:', error);
      sendResponse({ error: error.message || 'Unknown error occurred' });
    }
  }

  async startTranscription(tabId) {
    this.isRecording = true;
    
    try {
      console.log('Starting transcription for tab:', tabId);
      
      // First check if content script is loaded
      try {
        const pingResponse = await chrome.tabs.sendMessage(tabId, { type: 'PING' });
        if (!pingResponse || !pingResponse.success) {
          throw new Error('Content script not responding to ping');
        }
        console.log('Content script is responsive');
      } catch (pingError) {
        console.log('Content script not responding to ping, attempting to inject...');
        
        // Try to inject content script
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
          });
          console.log('Content script injected successfully');
          
          // Wait a moment for script to initialize
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (injectionError) {
          console.error('Failed to inject content script:', injectionError);
          throw new Error('Failed to load content script - please refresh the page and try again');
        }
      }
      
      // Send message to content script to start audio capture
      console.log('Sending START_AUDIO_CAPTURE message to tab:', tabId);
      try {
        await chrome.tabs.sendMessage(tabId, { type: 'START_AUDIO_CAPTURE' });
        console.log('Message sent successfully');
      } catch (error) {
        console.error('Failed to send message to content script:', error);
        throw new Error('Content script not responding');
      }

      // Update extension badge
      chrome.action.setBadgeText({ text: '●', tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#ef4444', tabId });
      
      console.log('Transcription started successfully');
    } catch (error) {
      console.error('Error starting transcription:', error);
      this.isRecording = false;
      throw new Error('Failed to start transcription');
    }
  }

  async stopTranscription(tabId) {
    this.isRecording = false;
    
    try {
      console.log('Stopping transcription for tab:', tabId);
      
      // Clear badge
      chrome.action.setBadgeText({ text: '', tabId });
      
      // Signal content script to stop
      console.log('Sending STOP_AUDIO_CAPTURE message to tab:', tabId);
      try {
        await chrome.tabs.sendMessage(tabId, { type: 'STOP_AUDIO_CAPTURE' });
        console.log('Stop message sent successfully');
      } catch (error) {
        console.error('Failed to send stop message to content script:', error);
      }
      
      console.log('Transcription stopped successfully');
    } catch (error) {
      console.error('Error stopping transcription:', error);
    }
  }

  async processTranscript(transcript, specialty) {
    const settings = await this.getSettings();
    
    if (settings.localMode) {
      return this.processLocally(transcript, specialty);
    } else {
      return this.processWithOpenAI(transcript, specialty, settings.apiKey);
    }
  }

  async processLocally(transcript, specialty) {
    // Simplified local processing (would integrate with local models in production)
    const template = this.getSpecialtyTemplate(specialty);
    
    return {
      chiefComplaint: this.extractSection(transcript, 'chief complaint'),
      hpi: this.extractSection(transcript, 'history of present illness'),
      ros: this.extractSection(transcript, 'review of systems'),
      assessment: this.extractSection(transcript, 'assessment'),
      plan: this.extractSection(transcript, 'plan'),
      medications: this.extractSection(transcript, 'medications'),
      followUp: this.extractSection(transcript, 'follow up')
    };
  }

  async processWithOpenAI(transcript, specialty, apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API key required for cloud processing');
    }

    const template = this.getSpecialtyTemplate(specialty);
    const prompt = `
      You are a medical transcription assistant. Analyze this medical conversation transcript and extract clinically relevant information.
      
      ${template}
      
      Transcript: ${transcript}
      
      Please return a JSON object with the following structure:
      {
        "chiefComplaint": "Primary reason for visit",
        "hpi": "Comprehensive History of Present Illness including: 1) Detailed timeline of symptoms (onset, progression, duration), 2) Specific patient quotes and descriptions, 3) Severity assessment with patient's own words, 4) Associated symptoms and their relationship to main complaint, 5) Aggravating and alleviating factors, 6) Previous episodes or similar symptoms, 7) Impact on daily activities and quality of life, 8) Patient's understanding and concerns about their condition, 9) Relevant social and environmental factors, 10) Treatment attempts and their effectiveness",
        "ros": "Review of Systems - comprehensive review of relevant body systems",
        "assessment": "Detailed clinical assessment including: 1) Primary diagnosis with rationale, 2) Differential diagnoses considered, 3) Clinical reasoning and findings that support the diagnosis, 4) Severity assessment, 5) Risk factors identified, 6) Complications or comorbidities noted",
        "plan": "Comprehensive treatment plan including: 1) Immediate interventions, 2) Medications (new prescriptions, dosage changes, discontinuations), 3) Diagnostic testing ordered, 4) Referrals to specialists, 5) Lifestyle modifications, 6) Patient education provided, 7) Follow-up schedule",
        "medications": "Detailed medication management including current medications, new prescriptions, dosage changes, side effects discussed, and patient instructions",
        "followUp": "Specific follow-up instructions including timeline, what to monitor, when to return, and red flag symptoms to watch for",
        "diagnosisCodes": [{"code": "ICD-10 code 1", "name": "Diagnosis name 1"}, {"code": "ICD-10 code 2", "name": "Diagnosis name 2"}],
        "cptCodes": [{"code": "CPT code 1", "name": "CPT description 1"}, {"code": "CPT code 2", "name": "CPT description 2"}]
      }
      
      For the HPI section, include specific patient quotes and descriptions in quotation marks when the patient describes their symptoms, pain, or concerns. Use the patient's own words to describe severity, timing, and impact on their life.
      
      For diagnosis codes, provide relevant ICD-10 codes with their corresponding diagnosis names in the format: {"code": "ICD-10 code", "name": "Diagnosis name"}. Include the most specific and relevant codes based on the clinical assessment.
      
      For CPT codes, provide relevant Current Procedural Terminology codes with their descriptions in the format: {"code": "CPT code", "name": "CPT description"}. Include codes for office visits, procedures, diagnostic tests, and other services discussed. Common codes include:
      - 99213-99215: Office visits (established patient)
      - 99203-99205: Office visits (new patient)
      - 93000: ECG/EKG
      - 71045: Chest X-ray
      - 76700: Ultrasound
      - 80048: Basic metabolic panel
      - 85025: Complete blood count
      - 81002: Urinalysis
      - 99406-99407: Smoking cessation counseling
      - 99495-99496: Care management services
      
      Make the assessment and plan detailed and comprehensive as a medical provider would document.
      If any section cannot be determined from the transcript, use "Not specified" as the value.
      Ensure the response is valid JSON format.
    `;

    try {
      console.log('Making OpenAI API call...');
      console.log('API Key present:', !!apiKey);
      console.log('API Key length:', apiKey ? apiKey.length : 0);
      console.log('Prompt length:', prompt.length);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { 
              role: 'system', 
              content: 'You are a medical transcription assistant. Always respond with valid JSON format for clinical summaries.' 
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });
      
      console.log('OpenAI API response status:', response.status);
      console.log('OpenAI API response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('OpenAI API response data:', data);
      const content = data.choices[0].message.content;
      console.log('OpenAI API response content:', content);
      
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log('JSON match found, parsing...');
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('Parsed JSON:', parsed);
        return parsed;
      } else {
        console.log('No JSON match found, using fallback parsing');
        // Fallback parsing
        return this.parseClinicalSummary(content);
      }
    } catch (error) {
      console.error('OpenAI processing error:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      return {
        chiefComplaint: 'Error processing transcript',
        hpi: `API Error: ${error.message}`,
        ros: 'Not specified',
        assessment: 'Not specified',
        plan: 'Not specified',
        medications: 'Not specified',
        followUp: 'Not specified',
        diagnosisCodes: [],
        cptCodes: []
      };
    }
  }

  parseClinicalSummary(content) {
    // Fallback parsing if JSON extraction fails
    const sections = {
      chiefComplaint: this.extractSection(content, 'chief complaint'),
      hpi: this.extractSection(content, 'history of present illness'),
      ros: this.extractSection(content, 'review of systems'),
      assessment: this.extractSection(content, 'assessment'),
      plan: this.extractSection(content, 'plan'),
      medications: this.extractSection(content, 'medications'),
      followUp: this.extractSection(content, 'follow up')
    };
    
    return sections;
  }

  getSpecialtyTemplate(specialty) {
    const templates = {
      'primary-care': `
        Primary Care Focus:
        - Comprehensive physical examination findings
        - Vital signs and basic measurements
        - Preventive care recommendations (vaccinations, screenings)
        - Chronic disease management (diabetes, hypertension, etc.)
        - Lifestyle counseling (diet, exercise, smoking cessation)
        - Referral decisions and follow-up planning
        - Assessment should include risk stratification and preventive recommendations
        - Treatment plan should address both acute and chronic conditions
      `,
      'psychiatry': `
        Psychiatry Focus:
        - Mental status examination (appearance, behavior, mood, affect, thought process, cognition)
        - Psychiatric history including previous episodes and treatments
        - Current psychiatric medications and their effectiveness
        - Risk assessment (suicidal/homicidal ideation, self-harm)
        - Substance use history and current use
        - Social support systems and stressors
        - Differential diagnosis including mood, anxiety, psychotic, and personality disorders
        - Treatment plan should include medication management, therapy recommendations, and safety planning
      `,
      'cardiology': `
        Cardiology Focus:
        - Cardiovascular symptoms (chest pain, dyspnea, palpitations, edema)
        - Cardiac risk factors and family history
        - Physical examination with focus on cardiovascular system
        - Current cardiac medications and their effectiveness
        - Previous cardiac procedures and tests
        - Assessment should include cardiac risk stratification
        - Treatment plan should address immediate cardiac concerns and long-term management
        - Recommendations for diagnostic testing (ECG, echocardiogram, stress test)
      `,
      'dermatology': `
        Dermatology Focus:
        - Detailed description of skin lesions (location, size, color, texture, borders)
        - Dermatological history including previous skin conditions
        - Family history of skin conditions
        - Current skin care routine and products used
        - Sun exposure history and protection practices
        - Assessment should include differential diagnosis of skin conditions
        - Treatment plan should specify topical vs systemic treatments
        - Recommendations for skin biopsies or specialist referral
      `,
      'pediatrics': `
        Pediatrics Focus:
        - Age-appropriate developmental milestones
        - Growth parameters (height, weight, head circumference)
        - Immunization status and schedule
        - Family history and social determinants of health
        - School performance and behavioral concerns
        - Assessment should consider age-specific normal ranges
        - Treatment plan should include parental education and anticipatory guidance
        - Recommendations for developmental screening and specialist referrals
      `,
      'orthopedics': `
        Orthopedics Focus:
        - Detailed musculoskeletal examination
        - Mechanism of injury and timeline
        - Functional limitations and impact on daily activities
        - Previous injuries and treatments
        - Imaging studies and their findings
        - Assessment should include differential diagnosis of musculoskeletal conditions
        - Treatment plan should address pain management, rehabilitation, and surgical options
        - Recommendations for physical therapy, bracing, or surgical intervention
      `,
      'neurology': `
        Neurology Focus:
        - Neurological examination (mental status, cranial nerves, motor, sensory, reflexes)
        - Neurological symptoms (headache, seizures, weakness, numbness, coordination)
        - Previous neurological conditions and treatments
        - Family history of neurological disorders
        - Assessment should include localization of neurological deficits
        - Treatment plan should address symptom management and disease progression
        - Recommendations for neuroimaging and specialist consultation
      `,
      'emergency-medicine': `
        Emergency Medicine Focus:
        - Acute presentation and chief complaint
        - Vital signs and hemodynamic stability
        - Trauma assessment if applicable
        - Rapid assessment of life-threatening conditions
        - Pain management and immediate interventions
        - Assessment should prioritize ruling out emergent conditions
        - Treatment plan should address immediate stabilization and disposition
        - Recommendations for admission, discharge, or transfer
      `
    };
    
    return templates[specialty] || templates['primary-care'];
  }

  extractSection(transcript, section) {
    // Simplified extraction logic (would use NLP in production)
    const lines = transcript.toLowerCase().split('\n');
    const sectionLines = lines.filter(line => 
      line.includes(section.toLowerCase()) || 
      line.includes(section.replace(/\s+/g, ''))
    );
    
    return sectionLines.join(' ').trim() || 'Not specified';
  }

  async getSettings() {
    const result = await chrome.storage.sync.get('clinoteSettings');
    return result.clinoteSettings || {};
  }

  async updateSettings(newSettings) {
    const currentSettings = await this.getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    await chrome.storage.sync.set({ clinoteSettings: updatedSettings });
  }

  updateExtensionState() {
    // Update extension state when tab changes
    if (!this.isRecording) {
      chrome.action.setBadgeText({ text: '' });
    }
  }

  async getActiveTab() {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      return tabs[0] || null;
    } catch (error) {
      console.error('Error getting active tab:', error);
      return null;
    }
  }
  
  async callWhisperAPI(audioBase64, apiKey, originalAudioType) {
    console.log('Background calling Whisper API...');
    console.log('Audio data length:', audioBase64.length);
    console.log('Original audio type:', originalAudioType);
    
    try {
      // Get settings to determine if using local mode
      const settings = await this.getSettings();
      const isLocalMode = settings.localMode === true;
      
      if (isLocalMode) {
        return await this.callLocalWhisperAPI(audioBase64, originalAudioType);
      } else {
        return await this.callOpenAIWhisperAPI(audioBase64, apiKey, originalAudioType);
      }
    } catch (error) {
      console.error('Background Whisper API error:', error);
      throw error;
    }
  }

  async callLocalWhisperAPI(audioBase64, originalAudioType) {
    try {
      console.log('Calling local Whisper server...');
      
      // First check if local server is running
      const pingResponse = await fetch('http://localhost:11434/ping', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!pingResponse.ok) {
        throw new Error('Local Whisper server is not running. Please install and start Clinote Whisper Server.');
      }
      
      const pingData = await pingResponse.json();
      console.log('Local server ping response:', pingData);
      
      if (!pingData.model_loaded) {
        throw new Error('Local Whisper server model is not loaded. Please restart the server.');
      }
      
      // Send transcription request to local server
      const response = await fetch('http://localhost:11434/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          audioBase64: audioBase64,
          audioType: originalAudioType
        })
      });
      
      console.log('Local Whisper API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Local Whisper API error response:', errorText);
        throw new Error(`Local Whisper API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Local Whisper API response data:', data);
      
      return data.transcript;
    } catch (error) {
      console.error('Local Whisper API call failed:', error);
      throw error;
    }
  }

  async callOpenAIWhisperAPI(audioBase64, apiKey, originalAudioType) {
    console.log('Calling OpenAI Whisper API...');
    console.log('API Key present:', !!apiKey);
    
    try {
      // Convert base64 to blob
      const byteCharacters = atob(audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      
      // Use the original audio type if provided, otherwise detect
      let audioType = originalAudioType || 'audio/webm';
      console.log('Using audio type:', audioType);
      
      const audioBlob = new Blob([byteArray], { type: audioType });
      
      console.log('Audio blob size:', audioBlob.size, 'bytes');
      
      // Check if the blob is actually valid
      if (audioBlob.size === 0) {
        throw new Error('Audio blob is empty');
      }
      
      // Try to read the first few bytes to see what we're actually getting
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const header = uint8Array.slice(0, 8);
      const headerHex = Array.from(header).map(b => b.toString(16).padStart(2, '0')).join('');
      console.log('Audio file header (hex):', headerHex);
      console.log('Audio file size (bytes):', uint8Array.length);
      
      // Try to create a simple test audio file if the original fails
      let testAudioBlob = audioBlob;
      if (audioBlob.size < 1000) {
        console.log('Audio blob too small, creating test audio');
        // Create a simple test audio (this is just for debugging)
        const testAudioData = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45]);
        testAudioBlob = new Blob([testAudioData], { type: 'audio/wav' });
        console.log('Created test WAV blob, size:', testAudioBlob.size);
      }
      
      const formData = new FormData();
      
      // Determine file extension based on MIME type
      let fileExtension = 'webm';
      if (audioBlob.type.includes('mp4')) {
        fileExtension = 'm4a';
      } else if (audioBlob.type.includes('ogg')) {
        fileExtension = 'oga';
      } else if (audioBlob.type.includes('wav')) {
        fileExtension = 'wav';
      }
      
      console.log('Audio blob type:', audioBlob.type);
      console.log('Using file extension:', fileExtension);
      console.log('Audio blob size before sending:', audioBlob.size);
      
      formData.append('file', audioBlob, `audio.${fileExtension}`);
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'text');
      
      console.log('Sending request to Whisper API from background...');
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        body: formData
      });
      
      console.log('Whisper API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Whisper API error details:', errorData);
        console.error('Response status:', response.status);
        console.error('Response status text:', response.statusText);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(`Whisper API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }
      
      const transcript = await response.text();
      console.log('Whisper API transcript received:', transcript);
      return transcript.trim();
    } catch (error) {
      console.error('OpenAI Whisper API call failed:', error);
      throw error;
    }
  }
  

}

// Initialize background script
new ClinoteBackground();