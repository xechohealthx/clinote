import React from 'react';
import { Clock, AlertTriangle, FileX, TrendingDown } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: Clock,
      title: "Hours Lost on Mental Health Documentation",
      description: "Mental health professionals spend 2-3 hours daily on therapy notes, SOAP notes, and progress reports, reducing patient care time and increasing burnout"
    },
    {
      icon: AlertTriangle,
      title: "Critical Clinical Details Lost",
      description: "Vital patient symptoms, mood changes, and therapeutic insights slip through the cracks when therapists must choose between listening and documenting"
    },
    {
      icon: FileX,
      title: "Inconsistent & Incomplete Mental Health Notes",
      description: "Manual note-taking leads to missing SOAP notes, incorrect ICD-10 codes for mental health conditions, and compliance risks"
    },
    {
      icon: TrendingDown,
      title: "Mental Health Provider Burnout",
      description: "Administrative burden steals time from patient care, reducing job satisfaction and therapeutic effectiveness"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Mental Health Documentation Crisis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mental health professionals are drowning in paperwork, forced to choose between listening to patients and documenting therapy sessions. This crisis affects provider satisfaction, patient outcomes, and therapeutic effectiveness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{problem.title}</h3>
                <p className="text-gray-600 text-sm">{problem.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Clinote Revolutionizes Mental Health Documentation</h3>
          <p className="text-lg opacity-90 mb-6">
            Revolutionary AI active listening technology transforms therapy conversations into comprehensive mental health notes automatically, saving hours while dramatically improving documentation quality, compliance, and therapeutic effectiveness.
          </p>
          <a 
            href="#demo" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
};

export default Problem;