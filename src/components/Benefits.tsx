import React from 'react';
import { Clock, TrendingUp, Shield, Users, Award, Zap } from 'lucide-react';

const Benefits = () => {
  const stats = [
    { number: "2-3", unit: "hours saved", description: "per day on therapy notes" },
    { number: "99.9%", unit: "accuracy", description: "in mental health transcription" },
    { number: "50%", unit: "reduction", description: "in documentation time" },
    { number: "24/7", unit: "support", description: "for mental health professionals" }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Save 2-3 Hours Daily",
      description: "Revolutionary AI active listening reduces documentation time by 50% while dramatically improving accuracy and completeness of therapy notes.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Revolutionary Documentation Quality",
      description: "Advanced AI ensures consistent, complete SOAP notes with proper mental health terminology, coding, and clinical precision.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Maximum Compliance & Risk Reduction",
      description: "Complete, accurate documentation with AI precision helps protect against malpractice claims, audits, and compliance issues.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Enhanced Patient Care & Satisfaction",
      description: "Spend more time listening to patients instead of paperwork, dramatically improving satisfaction and therapeutic outcomes.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Award,
      title: "Maximize Revenue & Efficiency",
      description: "AI-powered accurate coding and complete documentation maximize reimbursement, reduce claim denials, and boost practice efficiency.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Zap,
      title: "Eliminate Burnout & Boost Satisfaction",
      description: "Revolutionary AI eliminates administrative burden to dramatically improve job satisfaction, work-life balance, and practice efficiency.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionize Your Mental Health Practice
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mental health professionals using Clinote's revolutionary AI active listening technology report dramatic improvements in efficiency, 
            accuracy, compliance, and job satisfaction. See the transformation for yourself.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.unit}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Revolutionize Your Practice?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of mental health professionals who have revolutionized their documentation workflow with AI active listening technology. 
              Try Clinote free for 7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;