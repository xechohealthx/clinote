#!/usr/bin/env python3
"""
Clinote Local Whisper Server
A lightweight Flask server for local speech-to-text transcription using faster-whisper.
"""

import os
import base64
import tempfile
import logging
from flask import Flask, request, jsonify
from faster_whisper import WhisperModel
import torch

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Global model instance
whisper_model = None

def load_model():
    """Load the Whisper model on startup."""
    global whisper_model
    try:
        logger.info("Loading Whisper model...")
        # Use base model for speed, can be changed to 'small', 'medium', 'large'
        whisper_model = WhisperModel("base", device="cpu", compute_type="int8")
        logger.info("Whisper model loaded successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to load Whisper model: {e}")
        return False

def save_audio_file(audio_base64, audio_type):
    """Save base64 audio to temporary file."""
    try:
        # Decode base64 audio
        audio_data = base64.b64decode(audio_base64)
        
        # Determine file extension from MIME type
        if audio_type == "audio/webm":
            extension = ".webm"
        elif audio_type == "audio/wav":
            extension = ".wav"
        elif audio_type == "audio/mp3":
            extension = ".mp3"
        elif audio_type == "audio/mp4":
            extension = ".mp4"
        else:
            extension = ".webm"  # Default fallback
        
        # Create temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=extension)
        temp_file.write(audio_data)
        temp_file.close()
        
        return temp_file.name
    except Exception as e:
        logger.error(f"Failed to save audio file: {e}")
        return None

@app.route('/ping', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "ok",
        "model_loaded": whisper_model is not None,
        "service": "clinote-whisper-server"
    })

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    """Transcribe audio from base64 data."""
    try:
        # Validate request
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
        
        data = request.get_json()
        
        if not data or 'audioBase64' not in data:
            return jsonify({"error": "Missing audioBase64 in request"}), 400
        
        audio_base64 = data['audioBase64']
        audio_type = data.get('audioType', 'audio/webm')
        
        # Check if model is loaded
        if whisper_model is None:
            return jsonify({"error": "Whisper model not loaded"}), 503
        
        # Save audio to temporary file
        temp_file_path = save_audio_file(audio_base64, audio_type)
        if not temp_file_path:
            return jsonify({"error": "Failed to process audio data"}), 400
        
        try:
            # Transcribe audio
            logger.info(f"Transcribing audio file: {temp_file_path}")
            segments, info = whisper_model.transcribe(temp_file_path)
            
            # Combine all segments into full transcript
            transcript = " ".join([segment.text for segment in segments])
            
            logger.info(f"Transcription completed. Language: {info.language}, Duration: {info.duration:.2f}s")
            
            return jsonify({
                "transcript": transcript,
                "language": info.language,
                "duration": info.duration
            })
            
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_file_path)
            except:
                pass
                
    except Exception as e:
        logger.error(f"Transcription error: {e}")
        return jsonify({"error": f"Transcription failed: {str(e)}"}), 500

@app.route('/models', methods=['GET'])
def list_models():
    """List available models and current model info."""
    return jsonify({
        "current_model": "base",
        "available_models": ["tiny", "base", "small", "medium", "large"],
        "device": "cpu",
        "compute_type": "int8"
    })

@app.route('/status', methods=['GET'])
def server_status():
    """Detailed server status."""
    return jsonify({
        "status": "running",
        "model_loaded": whisper_model is not None,
        "model_name": "base" if whisper_model else None,
        "device": "cpu",
        "port": 11434,
        "service": "clinote-whisper-server"
    })

if __name__ == '__main__':
    # Load model on startup
    if not load_model():
        logger.error("Failed to load Whisper model. Exiting.")
        exit(1)
    
    # Run server
    logger.info("Starting Clinote Whisper Server on http://localhost:11434")
    app.run(host='0.0.0.0', port=11434, debug=False) 