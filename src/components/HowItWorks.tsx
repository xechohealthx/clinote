import React from 'react';
import { Mic, Brain, Copy, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Mic,
      title: "AI Active Listening",
      description: "Revolutionary AI technology captures every detail of patient-provider conversations with medical-grade accuracy, ensuring nothing is missed.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "Intelligent Chart Generation",
      description: "Advanced AI instantly transforms conversations into comprehensive SOAP notes, ICD-10 codes, and treatment plans with clinical precision.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Copy,
      title: "Seamless EMR Integration",
      description: "No EMR integration required. A simple and secure Chrome extension that allows you to copy and paste directly into your EMR. No setup, complicated API configurations, or IT support needed. Get going immediately.",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionary AI Active Listening Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three revolutionary steps that transform patient conversations into comprehensive medical charts. 
            From listening to professional documentation in real-time.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 group-hover:border-blue-300 transition-colors z-10">
                    {index + 1}
                  </div>
                  
                  {/* Icon Container */}
                  <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  
                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Revolutionize Your Practice?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of healthcare providers who have already transformed their workflow with revolutionary AI active listening technology. 
              Try Clinote free for 7 days with no commitment.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;