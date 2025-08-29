import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Download = () => {
  console.log('Download component rendering...');
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Download Clinote Desktop App
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get started with your 7-day free trial. No credit card required.
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Platform</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">macOS</h3>
                  <p className="text-gray-600 mb-2">For Intel and Apple Silicon Mac computers</p>
                  <p className="text-sm text-gray-500 mb-4">File size: 123 MB</p>
                  <a 
                    href="/downloads/Clinote-1.1.0.dmg"
                    className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    download
                  >
                    Download for macOS
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Windows</h3>
                  <p className="text-gray-600 mb-2">For Windows 10 and 11</p>
                  <p className="text-sm text-gray-500 mb-4">File size: 98 MB</p>
                  <a 
                    href="/downloads/Clinote Setup 1.1.0.exe"
                    className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    download
                  >
                    Download for Windows
                  </a>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Linux</h3>
                  <p className="text-gray-600 mb-2">Universal Linux package</p>
                  <p className="text-sm text-gray-500 mb-4">File size: 131 MB</p>
                  <a 
                    href="/downloads/Clinote-1.1.0.AppImage"
                    className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    download
                  >
                    Download for Linux
                  </a>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Installation Instructions:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>macOS:</strong> Open the .dmg file and drag Clinote to your Applications folder</li>
                  <li>• <strong>Windows:</strong> Run the .exe installer and follow the setup wizard</li>
                  <li>• <strong>Linux:</strong> Make the AppImage executable and run it directly</li>
                </ul>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="text-sm font-semibold text-yellow-900 mb-2">macOS Security Note:</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  If you see "unidentified developer" when trying to open Clinote, follow these steps:
                </p>
                <ol className="text-sm text-yellow-800 space-y-1 ml-4">
                  <li>1. Go to <strong>System Preferences</strong> → <strong>Security & Privacy</strong></li>
                  <li>2. Click the <strong>General</strong> tab</li>
                  <li>3. Look for "Clinote was blocked from opening" message</li>
                  <li>4. Click <strong>"Open Anyway"</strong> or <strong>"Allow"</strong></li>
                  <li>5. Confirm by clicking <strong>"Open"</strong> in the dialog that appears</li>
                </ol>
                <p className="text-sm text-yellow-800 mt-3">
                  <strong>Alternative:</strong> Right-click the Clinote app → <strong>Open</strong> → <strong>Open</strong> to bypass Gatekeeper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Download;
