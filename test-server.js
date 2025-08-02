#!/usr/bin/env node

/**
 * Simple test script to check if Clinote Whisper Server is running
 * Usage: node test-server.js
 */

const http = require('http');

function testServer() {
  console.log('🔍 Testing Clinote Whisper Server...');
  console.log('📍 Checking http://localhost:11434/ping');
  console.log('');

  const options = {
    hostname: 'localhost',
    port: 11434,
    path: '/ping',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('✅ Server Status:');
        console.log(`   Status: ${response.status}`);
        console.log(`   Model Loaded: ${response.model_loaded ? '✅ Yes' : '❌ No'}`);
        console.log(`   Service: ${response.service}`);
        console.log('');
        
        if (response.model_loaded) {
          console.log('🎉 Whisper Server is running and ready!');
          console.log('📱 You can now use the Clinote Chrome extension');
        } else {
          console.log('⏳ Whisper Server is running but model is still loading...');
          console.log('   This is normal on first startup');
        }
      } catch (error) {
        console.log('❌ Invalid response from server');
        console.log('Response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Server is not running');
    console.log('');
    console.log('To start the server:');
    console.log('1. Install the Clinote Whisper Server');
    console.log('2. Open the app from Applications');
    console.log('3. Wait for the model to load');
    console.log('');
    console.log('Or run manually:');
    console.log('   cd ~/Applications/ClinoteWhisperServer');
    console.log('   source venv/bin/activate');
    console.log('   python whisper_server.py');
  });

  req.on('timeout', () => {
    console.log('⏰ Request timed out');
    console.log('Server might be starting up...');
  });

  req.end();
}

testServer(); 