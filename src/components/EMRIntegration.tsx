import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  FileText, 
  Shield,
  Zap,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const EMRIntegration = () => {
  const [selectedEMR, setSelectedEMR] = useState('epic');

  const emrSystems = [
    {
      id: 'epic',
      name: 'Epic',
      logo: '🏥',
      description: 'Epic EMR integration guide',
      color: 'from-blue-500 to-blue-600',
      status: 'Native Support'
    },
    {
      id: 'cerner',
      name: 'Cerner',
      logo: '⚡',
      description: 'Cerner EMR integration guide',
      color: 'from-emerald-500 to-emerald-600',
      status: 'Native Support'
    },
    {
      id: 'allscripts',
      name: 'Allscripts',
      logo: '📋',
      description: 'Allscripts EMR integration guide',
      color: 'from-purple-500 to-purple-600',
      status: 'Native Support'
    },
    {
      id: 'nextgen',
      name: 'NextGen',
      logo: '🔄',
      description: 'NextGen EMR integration guide',
      color: 'from-yellow-500 to-yellow-600',
      status: 'Native Support'
    },
    {
      id: 'athenahealth',
      name: 'AthenaHealth',
      logo: '🩺',
      description: 'AthenaHealth EMR integration guide',
      color: 'from-red-500 to-red-600',
      status: 'Native Support'
    },
    {
      id: 'eclinicalworks',
      name: 'eClinicalWorks',
      logo: '💻',
      description: 'eClinicalWorks EMR integration guide',
      color: 'from-indigo-500 to-indigo-600',
      status: 'Native Support'
    }
  ];

  const integrationGuides = {
    epic: {
      name: 'Epic EMR',
      steps: [
        {
          title: 'Access Epic in Chrome',
          description: 'Open Epic EMR in your Chrome browser and log in to your account.',
          tips: ['Make sure you\'re using the web version of Epic', 'Ensure you have proper permissions to edit notes']
        },
        {
          title: 'Navigate to Patient Encounter',
          description: 'Open the patient encounter where you want to add the SOAP note.',
          tips: ['Select the appropriate encounter type', 'Ensure the patient is properly selected']
        },
        {
          title: 'Generate Note with Clinote',
          description: 'Use Clinote to record and generate your SOAP note.',
          tips: ['Keep both Epic and Clinote open', 'Record in a quiet environment']
        },
        {
          title: 'Copy and Paste Sections',
          description: 'Copy individual sections (Chief Complaint, HPI, Assessment, Plan) from Clinote to Epic.',
          tips: ['Use Ctrl+C and Ctrl+V for copying', 'Paste into the appropriate Epic fields']
        },
        {
          title: 'Review and Save',
          description: 'Review the note in Epic and save the encounter.',
          tips: ['Double-check all information before saving', 'Ensure proper formatting in Epic']
        }
      ],
      tips: [
        'Epic works best with the web-based version',
        'Use the "Notes" section for SOAP documentation',
        'Copy sections individually for better formatting',
        'Save frequently to avoid losing work'
      ]
    },
    cerner: {
      name: 'Cerner EMR',
      steps: [
        {
          title: 'Open Cerner PowerChart',
          description: 'Launch Cerner PowerChart in Chrome and navigate to your patient.',
          tips: ['Use the web version of PowerChart', 'Ensure proper patient selection']
        },
        {
          title: 'Access Documentation',
          description: 'Navigate to the documentation section for your encounter.',
          tips: ['Select the appropriate encounter type', 'Open the notes editor']
        },
        {
          title: 'Record with Clinote',
          description: 'Use Clinote to record the patient encounter and generate notes.',
          tips: ['Keep both Cerner and Clinote active', 'Record clearly and at normal pace']
        },
        {
          title: 'Transfer Notes',
          description: 'Copy the generated SOAP note sections to Cerner.',
          tips: ['Paste into the appropriate Cerner fields', 'Maintain proper formatting']
        },
        {
          title: 'Finalize Documentation',
          description: 'Review and finalize the note in Cerner.',
          tips: ['Verify all information is correct', 'Save and sign the note']
        }
      ],
      tips: [
        'Cerner PowerChart web version is fully compatible',
        'Use the structured documentation templates',
        'Copy sections one at a time for best results',
        'Ensure proper note signing and completion'
      ]
    },
    allscripts: {
      name: 'Allscripts EMR',
      steps: [
        {
          title: 'Launch Allscripts TouchWorks',
          description: 'Open Allscripts TouchWorks in Chrome and access your patient.',
          tips: ['Use the web-based TouchWorks interface', 'Navigate to the patient chart']
        },
        {
          title: 'Open Encounter Documentation',
          description: 'Access the encounter documentation section.',
          tips: ['Select the appropriate encounter type', 'Open the notes editor']
        },
        {
          title: 'Generate SOAP Note',
          description: 'Use Clinote to record and generate the SOAP note.',
          tips: ['Keep both systems open', 'Record in a quiet environment']
        },
        {
          title: 'Copy to Allscripts',
          description: 'Copy the generated note sections to Allscripts.',
          tips: ['Paste into the appropriate fields', 'Maintain formatting']
        },
        {
          title: 'Complete Documentation',
          description: 'Review and complete the note in Allscripts.',
          tips: ['Verify accuracy of all information', 'Save and finalize the note']
        }
      ],
      tips: [
        'Allscripts TouchWorks web version is compatible',
        'Use the structured note templates',
        'Copy sections individually for best formatting',
        'Ensure proper note completion and signing'
      ]
    },
    nextgen: {
      name: 'NextGen EMR',
      steps: [
        {
          title: 'Access NextGen EMR',
          description: 'Open NextGen EMR in Chrome and navigate to your patient.',
          tips: ['Use the web-based NextGen interface', 'Ensure proper patient selection']
        },
        {
          title: 'Open Encounter',
          description: 'Navigate to the encounter documentation section.',
          tips: ['Select the appropriate encounter type', 'Open the notes section']
        },
        {
          title: 'Record Patient Encounter',
          description: 'Use Clinote to record and generate the SOAP note.',
          tips: ['Keep both NextGen and Clinote active', 'Record clearly']
        },
        {
          title: 'Transfer Notes',
          description: 'Copy the generated note sections to NextGen.',
          tips: ['Paste into the appropriate NextGen fields', 'Maintain formatting']
        },
        {
          title: 'Finalize Note',
          description: 'Review and finalize the note in NextGen.',
          tips: ['Verify all information', 'Save and complete the note']
        }
      ],
      tips: [
        'NextGen web version is fully compatible',
        'Use the structured documentation templates',
        'Copy sections one at a time',
        'Ensure proper note completion'
      ]
    },
    athenahealth: {
      name: 'AthenaHealth EMR',
      steps: [
        {
          title: 'Open AthenaClinicals',
          description: 'Launch AthenaClinicals in Chrome and access your patient.',
          tips: ['Use the web-based AthenaClinicals', 'Navigate to the patient chart']
        },
        {
          title: 'Access Encounter',
          description: 'Navigate to the encounter documentation section.',
          tips: ['Select the appropriate encounter type', 'Open the notes editor']
        },
        {
          title: 'Generate SOAP Note',
          description: 'Use Clinote to record and generate the SOAP note.',
          tips: ['Keep both systems open', 'Record in a quiet environment']
        },
        {
          title: 'Copy to AthenaHealth',
          description: 'Copy the generated note sections to AthenaHealth.',
          tips: ['Paste into the appropriate fields', 'Maintain formatting']
        },
        {
          title: 'Complete Documentation',
          description: 'Review and complete the note in AthenaHealth.',
          tips: ['Verify accuracy of all information', 'Save and finalize the note']
        }
      ],
      tips: [
        'AthenaClinicals web version is compatible',
        'Use the structured note templates',
        'Copy sections individually for best formatting',
        'Ensure proper note completion and signing'
      ]
    },
    eclinicalworks: {
      name: 'eClinicalWorks EMR',
      steps: [
        {
          title: 'Launch eClinicalWorks',
          description: 'Open eClinicalWorks in Chrome and navigate to your patient.',
          tips: ['Use the web-based eClinicalWorks', 'Ensure proper patient selection']
        },
        {
          title: 'Open Encounter Documentation',
          description: 'Access the encounter documentation section.',
          tips: ['Select the appropriate encounter type', 'Open the notes editor']
        },
        {
          title: 'Record with Clinote',
          description: 'Use Clinote to record the patient encounter and generate notes.',
          tips: ['Keep both eClinicalWorks and Clinote active', 'Record clearly']
        },
        {
          title: 'Transfer Notes',
          description: 'Copy the generated SOAP note sections to eClinicalWorks.',
          tips: ['Paste into the appropriate fields', 'Maintain formatting']
        },
        {
          title: 'Finalize Documentation',
          description: 'Review and finalize the note in eClinicalWorks.',
          tips: ['Verify all information is correct', 'Save and sign the note']
        }
      ],
      tips: [
        'eClinicalWorks web version is fully compatible',
        'Use the structured documentation templates',
        'Copy sections one at a time for best results',
        'Ensure proper note signing and completion'
      ]
    }
  };

  const selectedGuide = integrationGuides[selectedEMR as keyof typeof integrationGuides];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">EMR Integration Guide</h1>
          <p className="text-lg text-gray-600">Learn how to integrate Clinote with your EMR system</p>
        </div>

        {/* EMR Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your EMR System</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emrSystems.map((emr) => (
              <button
                key={emr.id}
                onClick={() => setSelectedEMR(emr.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedEMR === emr.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${emr.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {emr.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{emr.name}</h3>
                    <p className="text-sm text-gray-600">{emr.description}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                      {emr.status}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedGuide.name} Integration</h2>
            <p className="text-gray-600">
              Follow these steps to integrate Clinote with {selectedGuide.name}. The process is simple and takes just a few minutes.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-12">
            {selectedGuide.steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Pro Tips
                      </h4>
                      <ul className="space-y-1">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start text-sm text-blue-800">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Best Practices */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
              Best Practices for {selectedGuide.name}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedGuide.tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
              <div>
                <h4 className="text-yellow-800 font-semibold">Important Notes</h4>
                <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                  <li>• Clinote works with any web-based EMR system</li>
                  <li>• No additional software or API integration required</li>
                  <li>• Always review generated notes before finalizing</li>
                  <li>• Ensure proper patient consent for recording</li>
                  <li>• Maintain HIPAA compliance throughout the process</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Universal Integration */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Universal Integration Method</h2>
          <p className="text-gray-600 mb-6">
            Don't see your EMR system listed? Clinote works with any web-based EMR using our universal copy-and-paste method.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Generate Note</h3>
              <p className="text-gray-600 text-sm">Use Clinote to record and generate your SOAP note</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Copy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Copy Sections</h3>
              <p className="text-gray-600 text-sm">Copy individual sections or the entire note</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Paste to EMR</h3>
              <p className="text-gray-600 text-sm">Paste into your EMR's note fields</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Integration?</h3>
            <p className="text-gray-600 mb-6">
              Our support team can help you with specific EMR integration questions or troubleshooting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@clinote.ai"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Email Support
              </a>
              <a
                href="tel:4804660496"
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
              >
                Call (480) 466-0496
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMRIntegration;
