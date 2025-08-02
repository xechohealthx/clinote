# Clinote Local Whisper Server

A lightweight Flask server for local speech-to-text transcription using faster-whisper. This server enables HIPAA-compliant, offline transcription for the Clinote Chrome Extension.

## Features

- **100% Local Processing**: No data leaves your machine
- **HIPAA Compliant**: Perfect for medical consultations
- **Fast Transcription**: Uses optimized faster-whisper library
- **Multiple Audio Formats**: Supports WebM, WAV, MP3, MP4
- **Health Monitoring**: Built-in health check endpoints
- **Easy Installation**: Simple Python setup

## Requirements

- Python 3.8 or higher
- 4GB+ RAM (8GB recommended)
- 2GB+ free disk space for model files

## Installation

### Option 1: Quick Start (Recommended)

1. **Clone or download** this directory
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the server**:
   ```bash
   python whisper_server.py
   ```

### Option 2: Virtual Environment (Recommended for Production)

```bash
# Create virtual environment
python -m venv clinote-whisper
source clinote-whisper/bin/activate  # On Windows: clinote-whisper\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python whisper_server.py
```

## Usage

### Starting the Server

```bash
python whisper_server.py
```

The server will:
1. Download the Whisper model (first run only)
2. Load the model into memory
3. Start listening on `http://localhost:11434`

### API Endpoints

#### Health Check
```bash
GET http://localhost:11434/ping
```
Response:
```json
{
  "status": "ok",
  "model_loaded": true,
  "service": "clinote-whisper-server"
}
```

#### Transcribe Audio
```bash
POST http://localhost:11434/transcribe
Content-Type: application/json

{
  "audioBase64": "UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT...",
  "audioType": "audio/webm"
}
```

Response:
```json
{
  "transcript": "Patient reports chest pain for the past three days...",
  "language": "en",
  "duration": 45.2
}
```

#### Server Status
```bash
GET http://localhost:11434/status
```

#### Available Models
```bash
GET http://localhost:11434/models
```

## Configuration

### Model Selection

Edit `whisper_server.py` to change the model:

```python
# For faster processing (lower accuracy)
whisper_model = WhisperModel("tiny", device="cpu", compute_type="int8")

# For better accuracy (slower processing)
whisper_model = WhisperModel("small", device="cpu", compute_type="int8")

# For best accuracy (slowest processing)
whisper_model = WhisperModel("medium", device="cpu", compute_type="int8")
```

### GPU Acceleration (Optional)

If you have a CUDA-capable GPU:

```python
whisper_model = WhisperModel("base", device="cuda", compute_type="float16")
```

### Port Configuration

Change the port in `whisper_server.py`:

```python
app.run(host='0.0.0.0', port=11434, debug=False)
```

## Troubleshooting

### Common Issues

1. **"No module named 'faster_whisper'"**
   ```bash
   pip install faster-whisper
   ```

2. **"CUDA not available"**
   - Use `device="cpu"` instead of `device="cuda"`
   - Install CUDA toolkit if you want GPU acceleration

3. **"Port 11434 already in use"**
   - Change the port in the code
   - Or kill the process using the port:
     ```bash
     # Windows
     netstat -ano | findstr 11434
     taskkill /PID <PID>
     
     # macOS/Linux
     lsof -i :11434
     kill -9 <PID>
     ```

4. **"Model download failed"**
   - Check internet connection
   - Try downloading manually from Hugging Face
   - Clear cache: `rm -rf ~/.cache/huggingface/`

### Performance Tips

- **Use SSD storage** for faster model loading
- **Close other applications** to free up RAM
- **Use 'tiny' model** for fastest processing
- **Use 'base' model** for good balance of speed/accuracy

## Security

- **Local Only**: Server only accepts connections from localhost
- **No Data Storage**: Audio files are deleted immediately after processing
- **No Telemetry**: No data is sent to external services
- **HIPAA Compliant**: Perfect for medical applications

## Integration with Clinote

This server is designed to work seamlessly with the Clinote Chrome Extension. When you select "Local Processing" in Clinote:

1. Clinote checks if the server is running (`/ping`)
2. If available, sends audio for transcription (`/transcribe`)
3. Receives transcript and processes it locally

## License

This project is part of Clinote and follows the same license terms.

## Support

For issues with the local server:
1. Check the console output for error messages
2. Verify the server is running: `curl http://localhost:11434/ping`
3. Check the logs for detailed error information 