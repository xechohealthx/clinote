import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users, 
  FileText, 
  Settings, 
  Zap, 
  Star,
  BookOpen,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const VideoTutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videoCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      description: 'Essential tutorials for new users'
    },
    {
      id: 'basic-features',
      title: 'Basic Features',
      icon: FileText,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Core functionality and features'
    },
    {
      id: 'advanced-features',
      title: 'Advanced Features',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      description: 'Power user tips and tricks'
    },
    {
      id: 'emr-integration',
      title: 'EMR Integration',
      icon: Users,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Working with your EMR system'
    }
  ];

  const tutorials = [
    {
      id: 'setup-installation',
      title: 'Complete Setup & Installation',
      description: 'Step-by-step guide to installing Clinote and creating your account',
      duration: '5:32',
      category: 'getting-started',
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 'first-recording',
      title: 'Your First Patient Recording',
      description: 'Learn how to start your first patient encounter recording',
      duration: '8:15',
      category: 'getting-started',
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'microphone-setup',
      title: 'Microphone Setup & Optimization',
      description: 'Configure your microphone for the best recording quality',
      duration: '6:48',
      category: 'getting-started',
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'soap-notes',
      title: 'Understanding SOAP Notes',
      description: 'Learn how Clinote generates and structures SOAP notes',
      duration: '12:24',
      category: 'basic-features',
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'editing-notes',
      title: 'Editing & Customizing Notes',
      description: 'How to edit and customize generated medical notes',
      duration: '10:17',
      category: 'basic-features',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'icd10-codes',
      title: 'ICD-10 Code Integration',
      description: 'Understanding and using ICD-10 codes in your notes',
      duration: '9:42',
      category: 'basic-features',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'epic-integration',
      title: 'Working with Epic EMR',
      description: 'Specific tips for integrating with Epic EMR systems',
      duration: '11:33',
      category: 'emr-integration',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'cerner-integration',
      title: 'Working with Cerner EMR',
      description: 'Specific tips for integrating with Cerner EMR systems',
      duration: '10:55',
      category: 'emr-integration',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'custom-templates',
      title: 'Creating Custom Templates',
      description: 'Build custom note templates for your practice',
      duration: '15:28',
      category: 'advanced-features',
      difficulty: 'Advanced',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'batch-processing',
      title: 'Batch Processing & Efficiency',
      description: 'Tips for processing multiple encounters efficiently',
      duration: '13:45',
      category: 'advanced-features',
      difficulty: 'Advanced',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'troubleshooting',
      title: 'Common Issues & Troubleshooting',
      description: 'Solutions for common problems and technical issues',
      duration: '14:12',
      category: 'advanced-features',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'best-practices',
      title: 'Best Practices for Medical Documentation',
      description: 'Professional tips for optimal medical documentation',
      duration: '16:38',
      category: 'advanced-features',
      difficulty: 'Advanced',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Tutorials</h1>
          <p className="text-lg text-gray-600">Learn Clinote with our comprehensive video guides</p>
        </div>

        {/* Featured Tutorial */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white">
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold">Featured Tutorial</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">Complete Setup & Installation</h3>
                <p className="text-lg opacity-90 mb-4">
                  Get started with Clinote in under 6 minutes. This comprehensive guide covers everything you need to know to install, configure, and start using Clinote for your first patient encounter.
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>5:32</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Beginner</span>
                  </div>
                </div>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Now
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Setup Tutorial"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-blue-600 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Tutorials
            </button>
            {videoCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-blue-600 ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {tutorial.duration}
                </div>
                {tutorial.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {tutorial.duration}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Tutorial
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Learning Path</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">Complete Setup & Installation</h3>
                <p className="text-gray-600 text-sm">Get Clinote installed and configured</p>
              </div>
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">Your First Patient Recording</h3>
                <p className="text-gray-600 text-sm">Learn to start your first encounter</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">Understanding SOAP Notes</h3>
                <p className="text-gray-600 text-sm">Learn how notes are generated</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">EMR Integration</h3>
                <p className="text-gray-600 text-sm">Connect with your EMR system</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with a Tutorial?</h3>
            <p className="text-gray-600 mb-6">
              If you have questions about any tutorial or need additional guidance, our support team is here to help.
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

export default VideoTutorials;
