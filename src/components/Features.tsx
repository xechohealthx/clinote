import React from 'react';
import { 
  Mic, 
  FileText, 
  Code, 
  Shield, 
  Chrome, 
  Copy, 
  Clock, 
  Zap,
  CheckCircle,
  Brain
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Mic,
      title: "Revolutionary AI Active Listening",
      description: "Advanced AI technology captures every detail of therapy sessions with 99.9% accuracy",
      color: "from-blue-500 to-blue-600",
      benefits: ["Mental health terminology recognition", "Multiple speaker identification", "Noise cancellation"]
    },
    {
      icon: FileText,
      title: "Intelligent Mental Health Note Generation",
      description: "AI automatically structures comprehensive therapy notes into Chief Complaint, HPI, Assessment, and Treatment with clinical precision",
      color: "from-emerald-500 to-emerald-600",
      benefits: ["Professional formatting", "Complete documentation", "Customizable templates"]
    },
    {
      icon: Code,
      title: "Smart Mental Health Code Integration",
      description: "AI generates accurate ICD-10 and CPT codes for mental health conditions automatically, ensuring compliance and optimal billing",
      color: "from-purple-500 to-purple-600",
      benefits: ["ICD-10 mental health codes", "CPT therapy codes", "Billing optimization"]
    },
    {
      icon: Shield,
      title: "Enterprise-Grade HIPAA Compliance",
      description: "Bank-level security with encrypted data handling and secure cloud processing for maximum patient privacy",
      color: "from-red-500 to-red-600",
      benefits: ["End-to-end encryption", "Secure data storage", "Audit trails"]
    },
    {
      icon: Chrome,
      title: "Cross-Platform Desktop App",
      description: "Native desktop application for Windows, macOS, and Linux with seamless EMR integration",
      color: "from-yellow-500 to-yellow-600",
      benefits: ["Windows, macOS, Linux", "Easy installation", "Automatic updates"]
    },
    {
      icon: Copy,
      title: "Seamless EMR Integration",
      description: "Direct integration with your EMR system. Copy-paste functionality with intelligent formatting that works with any EMR platform. No complex setup or IT support required.",
      color: "from-indigo-500 to-indigo-600",
      benefits: ["Section-wise copying", "Format preservation", "Universal EMR support"]
    },
    {
      icon: Clock,
      title: "Intelligent Session Management",
      description: "Handles extended patient encounters (15-30 minutes) efficiently with smart segmentation and continuous processing",
      color: "from-teal-500 to-teal-600",
      benefits: ["Long session support", "Smart breaks", "Continuous recording"]
    },
    {
      icon: Brain,
      title: "Advanced Mental Health AI Intelligence",
      description: "Revolutionary mental health AI that understands therapeutic context and provides intelligent suggestions for optimal care",
      color: "from-pink-500 to-pink-600",
      benefits: ["Context awareness", "Therapeutic insights", "Quality suggestions"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionary Features That Transform Mental Health Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to revolutionize your mental health documentation workflow with AI active listening technology. 
            Built specifically for mental health professionals who demand efficiency, accuracy, and compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note Types Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built-in Mental Health Note Templates
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your preferred note type and save it as a favorite. Clinote automatically generates structured notes in your chosen format.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">SOAP Notes</h4>
              <p className="text-sm text-gray-600 mb-3">Subjective, Objective, Assessment, Plan</p>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Most Popular</span>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">DAP Notes</h4>
              <p className="text-sm text-gray-600 mb-3">Data, Assessment, Plan</p>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Simplified</span>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">BIRP Notes</h4>
              <p className="text-sm text-gray-600 mb-3">Behavior, Intervention, Response, Plan</p>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Community MH</span>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">GIRP Notes</h4>
              <p className="text-sm text-gray-600 mb-3">Goal, Intervention, Response, Plan</p>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Goal-Oriented</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Progress Notes</h4>
                  <p className="text-sm text-gray-600">Clinical notes for insurance & billing</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Session content & interventions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Client response & progress
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-red-500 mr-2" />
                  Plan for next session
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Treatment Plans</h4>
                  <p className="text-sm text-gray-600">Formalized goals & objectives</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                  Diagnoses & measurable goals
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                  Interventions & strategies
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                  Insurance compliance (90-day updates)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">Customizable & Flexible</h4>
              <p className="text-gray-600 mb-4">
                Save your preferred note type as a favorite and switch between formats as needed. 
                Perfect for therapists who work with different populations or agencies.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white px-3 py-1 rounded-full text-gray-700">Crisis Notes</span>
                <span className="bg-white px-3 py-1 rounded-full text-gray-700">Psychotherapy Notes</span>
                <span className="bg-white px-3 py-1 rounded-full text-gray-700">Critical Incident</span>
                <span className="bg-white px-3 py-1 rounded-full text-gray-700">Safety Planning</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-4">
              Experience Revolutionary AI Technology Free for 7 Days
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              No credit card required. Cancel anytime. Start revolutionizing your mental health documentation with AI active listening technology today.
            </p>
            <a href="/download" className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-block">
              Download & Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;