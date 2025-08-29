import React from 'react';
import { Shield, Chrome, Server, Lock, CheckCircle, Zap } from 'lucide-react';

const TechnicalSpecs = () => {
  const specifications = [
    {
      icon: Chrome,
      title: "Desktop Application",
      details: [
        "Windows, macOS, Linux",
        "Native desktop performance",
        "Lightweight - < 50MB download",
        "Automatic updates",
        "Offline mode available"
      ]
    },
    {
      icon: Shield,
      title: "HIPAA Compliance",
      details: [
        "End-to-end encryption",
        "SOC 2 Type II certified",
        "Business Associate Agreement",
        "Audit logging",
        "Data residency options"
      ]
    },
    {
      icon: Server,
      title: "Cloud Infrastructure",
      details: [
        "99.9% uptime SLA",
        "Global CDN deployment",
        "Auto-scaling architecture",
        "Real-time processing",
        "Disaster recovery"
      ]
    },
    {
      icon: Lock,
      title: "Security Features",
      details: [
        "AES-256 encryption",
        "Zero-trust architecture",
        "Multi-factor authentication",
        "Role-based access control",
        "Regular security audits"
      ]
    }
  ];

  const integrations = [
    { name: "Epic", logo: "🏥", status: "Native" },
    { name: "Cerner", logo: "⚡", status: "Native" },
    { name: "Tebra", logo: "💊", status: "Native" },
    { name: "SimplePractice", logo: "🧠", status: "Native" },
    { name: "AthenaHealth", logo: "🩺", status: "Native" },
    { name: "eClinicalWorks", logo: "💻", status: "Native" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on secure, scalable infrastructure with the highest standards for 
            healthcare data protection and compliance.
          </p>
        </div>

        {/* Technical Specifications */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {specifications.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{spec.title}</h3>
                <ul className="space-y-2">
                  {spec.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* EMR Integrations */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Works with Leading EMR Systems
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {integrations.map((integration, index) => (
              <div key={index} className="text-center group flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {integration.logo}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{integration.name}</h4>
                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  {integration.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Don't see your EMR? Clinote works with any EMR system through copy-paste functionality.
            </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Request Integration →
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">{"< 2 seconds"}</h4>
            <p className="text-gray-600">Average processing time</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h4>
            <p className="text-gray-600">Transcription accuracy</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Server className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">99.9%</h4>
            <p className="text-gray-600">Service uptime</p>
          </div>
        </div>

        {/* Compliance Certifications */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Revolutionary Zero-Data Security</h3>
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">HIPAA</h4>
              <p className="text-sm opacity-90">Zero-storage compliant</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">SOC 2</h4>
              <p className="text-sm opacity-90">Type II certified</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">GDPR</h4>
              <p className="text-sm opacity-90">EU compliant</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">ISO 27001</h4>
              <p className="text-sm opacity-90">Certified secure</p>
            </div>
          </div>
          <p className="text-lg opacity-90 mb-4">
            Revolutionary zero-storage approach: No patient data is ever stored
          </p>
          <p className="text-base opacity-80">
            Real-time processing with immediate deletion eliminates all data breach risks
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;