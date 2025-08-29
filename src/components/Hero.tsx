import React from 'react';
import { Play, Mic, FileText, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <Mic className="w-4 h-4 mr-2" />
                Revolutionary AI Active Listening Technology
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI That Listens & Charts
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent"> While You Practice Mental Health</span>
              <span className="text-blue-600"> in Real-Time</span>
            </h1>
            
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Built by Providers for Providers
              </span>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Revolutionary AI active listening technology that captures every detail of patient-therapist conversations and automatically generates comprehensive mental health notes, SOAP notes, ICD-10 codes, and suggested CPT codes to maximize your billing in real-time. <span className="font-semibold text-blue-600">No patient identifiers, no data saved, secure, compliant, and safe.</span> Transform 2-3 hours of behavioral health documentation into minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/download" className="group bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Download & Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#demo" 
                className="group flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </a>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Desktop App
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Real-time Processing
              </div>
            </div>
          </div>
          
          {/* Right Column - Animated Demo */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-500">Clinote Desktop</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Mic className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-600">Recording Active</span>
                    <div className="ml-auto flex space-x-1">
                      <div className="w-2 h-4 bg-blue-400 rounded animate-pulse"></div>
                      <div className="w-2 h-6 bg-blue-500 rounded animate-pulse animation-delay-100"></div>
                      <div className="w-2 h-8 bg-blue-600 rounded animate-pulse animation-delay-200"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">"Patient presents with symptoms of depression and anxiety..."</p>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                    <span className="text-sm font-medium text-emerald-600">SOAP Note Generated</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded p-2">
                      <span className="text-xs font-medium text-gray-500">Chief Complaint:</span>
                      <p className="text-sm">Depression and anxiety symptoms</p>
                    </div>
                    <div className="bg-white rounded p-2">
                      <span className="text-xs font-medium text-gray-500">ICD-10:</span>
                      <p className="text-sm">F32.1 - Major depressive disorder, moderate</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                  Copy to EMR
                </button>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-bounce animation-delay-1000">
              <Mic className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;