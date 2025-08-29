import React from 'react';
import { 
  ArrowLeft, 
  Monitor, 
  Download, 
  CheckCircle, 
  Play, 
  Settings, 
  Mic, 
  FileText,
  Users,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';

const SetupGuide = () => {
  const setupSteps = [
    {
      icon: Monitor,
      title: "Download & Install Desktop App",
      description: "Install Clinote on your computer",
      steps: [
        "Download the app for your platform",
        "Run the installer",
        "Follow the installation wizard",
        "Launch Clinote from your desktop"
      ],
      tips: [
        "Choose the correct version for your operating system",
        "Allow the app through your firewall if prompted",
        "The app will appear in your applications folder"
      ]
    },
    {
      icon: Users,
      title: "Create Your Account",
      description: "Set up your Clinote account",
      steps: [
        "Launch the Clinote desktop app",
        "Click 'Sign Up' or 'Create Account'",
        "Enter your email and create a password",
        "Verify your email address"
      ],
      tips: [
        "Use your work email for better organization",
        "Choose a strong password",
        "Check your spam folder for verification email"
      ]
    },
    {
      icon: Mic,
      title: "Configure Microphone",
      description: "Set up audio recording",
      steps: [
        "Allow microphone access when prompted",
        "Test your microphone in the extension",
        "Adjust volume levels if needed",
        "Ensure clear audio quality"
      ],
      tips: [
        "Use a good quality microphone for best results",
        "Test in a quiet environment",
        "Speak clearly and at normal volume"
      ]
    },
    {
      icon: FileText,
      title: "Connect to EMR",
      description: "Prepare for note integration",
      steps: [
        "Open your EMR system in your browser",
        "Navigate to a patient encounter",
        "Ensure you can access the notes section",
        "Test the copy-paste functionality"
      ],
      tips: [
        "The desktop app works with any web-based EMR",
        "Keep both Clinote and EMR open",
        "Practice with a test patient first"
      ]
    }
  ];

  const systemRequirements = [
    {
      icon: Monitor,
      title: "System Requirements",
      items: [
        "Windows 10/11, macOS 10.15+, or Linux",
        "4GB RAM minimum",
        "500MB free disk space",
        "Internet connection required"
      ]
    },
    {
      icon: Mic,
      title: "Audio Requirements",
      items: [
        "Working microphone or headset",
        "Stable internet connection",
        "Quiet recording environment",
        "Clear speech patterns"
      ]
    },
    {
      icon: Shield,
      title: "Security Requirements",
      items: [
        "HIPAA-compliant network",
        "Secure internet connection",
        "Updated browser security",
        "No VPN conflicts"
      ]
    }
  ];

  const troubleshooting = [
    {
      problem: "App won't launch",
      solution: "Check if your system meets the minimum requirements. Try restarting your computer and launching the app again."
    },
    {
      problem: "Microphone not working",
      solution: "Check your system's microphone permissions and ensure the app has access to your microphone."
    },
    {
      problem: "Recording quality is poor",
      solution: "Use a better microphone, reduce background noise, and speak clearly at normal volume."
    },
    {
      problem: "App crashes or freezes",
      solution: "Restart the app, check for updates, or reinstall if the problem persists."
    },
    {
      problem: "Can't copy notes to EMR",
      solution: "Make sure your EMR is web-based and you have proper permissions to edit patient notes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Setup & Installation Guide</h1>
          <p className="text-lg text-gray-600">Get Clinote up and running in less than 5 minutes</p>
        </div>

        <div className="space-y-8">
          {/* Quick Start */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>
            <p className="text-lg opacity-90 mb-6">
              Follow these simple steps to get started with Clinote. The entire setup process takes less than 5 minutes.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">1</div>
                <div>Download App</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">2</div>
                <div>Create Account</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">3</div>
                <div>Start Recording</div>
              </div>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Detailed Setup Steps</h2>
            <div className="space-y-8">
              {setupSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
                            Step {index + 1}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                              Steps to Follow
                            </h4>
                            <ol className="space-y-2">
                              {step.steps.map((item, stepIndex) => (
                                <li key={stepIndex} className="flex items-start">
                                  <span className="bg-gray-100 text-gray-600 text-sm font-semibold w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                    {stepIndex + 1}
                                  </span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Settings className="w-4 h-4 text-blue-500 mr-2" />
                              Pro Tips
                            </h4>
                            <ul className="space-y-2">
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-700 text-sm">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">System Requirements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {systemRequirements.map((requirement, index) => {
                const Icon = requirement.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{requirement.title}</h3>
                    <ul className="space-y-2">
                      {requirement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Troubleshooting</h2>
            <div className="space-y-4">
              {troubleshooting.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.problem}</h4>
                  <p className="text-gray-700">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Tutorial */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <Play className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Watch Video Tutorial</h2>
              <p className="text-gray-600 mb-6">
                Prefer to learn visually? Watch our step-by-step video guide that walks you through the entire setup process.
              </p>
            </div>
            
            {/* Embedded YouTube Video */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/g92v8bP8dKo?si=qg0PGjxBjktGSRF9"
                  title="Clinote Desktop App Setup Tutorial"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Learn how to install and set up the Clinote desktop app in just a few minutes
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Start Your First Recording</h3>
                <p className="text-gray-600 mb-4">
                  Once setup is complete, you're ready to start your first patient encounter recording.
                </p>
                <a
                  href="#demo"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Try the Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you encounter any issues during setup, our support team is here to help.
                </p>
                <a
                  href="mailto:support@clinote.ai"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
