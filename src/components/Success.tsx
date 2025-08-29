import React from 'react';
import { CheckCircle, Download, Mail } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Clinote Pro!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your subscription has been successfully activated. You now have access to all Pro features including unlimited patient encounters and advanced AI transcription.
          </p>
          
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                  <span className="text-blue-800">Install the Chrome extension</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                  <span className="text-blue-800">Set up your EMR integration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                  <span className="text-blue-800">Start your first patient encounter</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Chrome Extension
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                View Setup Guide
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>You'll receive a welcome email with detailed setup instructions.</p>
              <p>Need help? Contact us at support@clinote.ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
