import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Download = () => {
  console.log('Download component rendering...');
  
  // State to track which download is in progress
  const [downloading, setDownloading] = useState<string | null>(null);
  
  const handleDownload = (filename: string, url: string) => {
    setDownloading(filename);
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset the downloading state after a short delay
    setTimeout(() => {
      setDownloading(null);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Download Clinote Desktop App
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get started with your 7-day free trial. No credit card required.
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Downloads</h2>
              
              {/* Windows Downloads */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                  Windows (x64)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Recommended Installer</h4>
                        <p className="text-sm text-gray-600">Full setup with installer</p>
                      </div>
                      <span className="text-sm text-gray-500">98.5MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote Setup 1.1.0.exe', '/downloads/Clinote Setup 1.1.0.exe')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote Setup 1.1.0.exe'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote Setup 1.1.0.exe' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download Setup'
                      )}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Portable Version</h4>
                        <p className="text-sm text-gray-600">No installation required</p>
                      </div>
                      <span className="text-sm text-gray-500">98.3MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote 1.1.0.exe', '/downloads/Clinote 1.1.0.exe')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote 1.1.0.exe'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote 1.1.0.exe' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download Portable'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* macOS Downloads */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  macOS
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Intel Mac Installer</h4>
                        <p className="text-sm text-gray-600">Standard .dmg installer</p>
                      </div>
                      <span className="text-sm text-gray-500">123MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote-1.1.0.dmg', '/downloads/Clinote-1.1.0.dmg')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote-1.1.0.dmg'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote-1.1.0.dmg' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download .dmg'
                      )}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Apple Silicon</h4>
                        <p className="text-sm text-gray-600">M1/M2 Mac installer</p>
                      </div>
                      <span className="text-sm text-gray-500">119MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote-1.1.0-arm64.dmg', '/downloads/Clinote-1.1.0-arm64.dmg')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote-1.1.0-arm64.dmg'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote-1.1.0-arm64.dmg' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download ARM64'
                      )}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Intel Mac ZIP</h4>
                        <p className="text-sm text-gray-600">Compressed archive</p>
                      </div>
                      <span className="text-sm text-gray-500">120MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote-1.1.0-mac.zip', '/downloads/Clinote-1.1.0-mac.zip')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote-1.1.0-mac.zip'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote-1.1.0-mac.zip' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download ZIP'
                      )}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Apple Silicon ZIP</h4>
                        <p className="text-sm text-gray-600">M1/M2 compressed</p>
                      </div>
                      <span className="text-sm text-gray-500">116MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote-1.1.0-arm64-mac.zip', '/downloads/Clinote-1.1.0-arm64-mac.zip')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote-1.1.0-arm64-mac.zip'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote-1.1.0-arm64-mac.zip' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download ZIP'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Linux Downloads */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  Linux
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Universal AppImage</h4>
                        <p className="text-sm text-gray-600">Works on most distributions</p>
                      </div>
                      <span className="text-sm text-gray-500">132MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('Clinote-1.1.0.AppImage', '/downloads/Clinote-1.1.0.AppImage')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'Clinote-1.1.0.AppImage'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'Clinote-1.1.0.AppImage' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download AppImage'
                      )}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Ubuntu/Debian</h4>
                        <p className="text-sm text-gray-600">Native package</p>
                      </div>
                      <span className="text-sm text-gray-500">79MB</span>
                    </div>
                    <button 
                      onClick={() => handleDownload('clinote_1.1.0_amd64.deb', '/downloads/clinote_1.1.0_amd64.deb')}
                      disabled={downloading !== null}
                      className={`w-full inline-block text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-center flex items-center justify-center ${
                        downloading === 'clinote_1.1.0_amd64.deb'
                          ? 'bg-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {downloading === 'clinote_1.1.0_amd64.deb' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        'Download .deb'
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Installation Instructions:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Windows:</strong> Run the .exe installer and follow the setup wizard</li>
                  <li>• <strong>macOS:</strong> Open the .dmg file and drag Clinote to your Applications folder</li>
                  <li>• <strong>Linux AppImage:</strong> Make executable with <code>chmod +x</code> and run directly</li>
                  <li>• <strong>Linux .deb:</strong> Install with <code>sudo dpkg -i</code> or your package manager</li>
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
