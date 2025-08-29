import React, { useState } from 'react';
import { Play, Pause, Mic, FileText, Copy, Check } from 'lucide-react';

const Demo = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [copiedSection, setCopiedSection] = useState('');

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setShowNote(true);
      }, 2000);
    } else {
      setShowNote(false);
    }
  };

  const handleCopy = (section: string) => {
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  const sampleNote = {
    chiefComplaint: "Chest pain with radiation to left arm, onset 2 hours ago",
    hpi: "45-year-old male presents with sudden onset chest pain that began approximately 2 hours ago while at rest. Pain is described as crushing, 8/10 severity, radiating to left arm. Associated with shortness of breath and diaphoresis. No relieving factors identified.",
    assessment: "Acute coronary syndrome, rule out myocardial infarction",
    plan: "Obtain 12-lead EKG stat, cardiac enzymes, chest X-ray. Initiate cardiac monitoring. Administer aspirin 325mg, sublingual nitroglycerin PRN.",
    icd10: "I20.9 - Angina pectoris, unspecified",
    cpt: "99213 - Office visit, established patient, low complexity"
  };

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See Clinote in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience how Clinote transforms patient conversations into professional medical documentation. 
            Try our interactive demo below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Recording Interface */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Chrome Extension Interface
            </h3>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-500">Clinote v2.1</span>
              </div>
              
              <div className="text-center py-8">
                <button
                  onClick={handleRecordingToggle}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 transform hover:scale-110 ${
                    isRecording 
                      ? 'bg-red-500 animate-pulse' 
                      : 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:shadow-lg'
                  }`}
                >
                  {isRecording ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
                
                <p className="mt-4 text-lg font-medium text-gray-700">
                  {isRecording ? 'Recording...' : 'Click to Start Recording'}
                </p>
                
                {isRecording && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Mic className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-600">Live Transcription</span>
                    </div>
                    <div className="text-sm text-gray-600 text-left">
                      <p className="mb-2">"Patient presents with chest pain..."</p>
                      <p className="mb-2">"Pain started about 2 hours ago..."</p>
                      <p>"Radiating to the left arm..."</p>
                    </div>
                    <div className="flex justify-center mt-3 space-x-1">
                      <div className="w-2 h-8 bg-blue-400 rounded animate-pulse"></div>
                      <div className="w-2 h-12 bg-blue-500 rounded animate-pulse animation-delay-100"></div>
                      <div className="w-2 h-10 bg-blue-600 rounded animate-pulse animation-delay-200"></div>
                      <div className="w-2 h-6 bg-blue-400 rounded animate-pulse animation-delay-300"></div>
                    </div>
                  </div>
                )}
                
                {showNote && (
                  <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-2">
                      <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-sm font-medium text-emerald-600">SOAP Note Generated</span>
                    </div>
                    <p className="text-sm text-gray-600">Professional medical note ready for EMR</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generated SOAP Note */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Generated Medical Note
            </h3>
            
            {showNote ? (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Chief Complaint</h4>
                    <button
                      onClick={() => handleCopy('cc')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copiedSection === 'cc' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{sampleNote.chiefComplaint}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">History of Present Illness</h4>
                    <button
                      onClick={() => handleCopy('hpi')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copiedSection === 'hpi' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{sampleNote.hpi}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Assessment</h4>
                    <button
                      onClick={() => handleCopy('assessment')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copiedSection === 'assessment' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{sampleNote.assessment}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Plan</h4>
                    <button
                      onClick={() => handleCopy('plan')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copiedSection === 'plan' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm">{sampleNote.plan}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-1">ICD-10 Code</h5>
                    <p className="text-blue-700 text-sm">{sampleNote.icd10}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h5 className="font-medium text-emerald-900 mb-1">CPT Code</h5>
                    <p className="text-emerald-700 text-sm">{sampleNote.cpt}</p>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                  Copy Complete Note to EMR
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Start recording to see the generated SOAP note</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;