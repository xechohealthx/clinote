import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  FileText, 
  Video, 
  Users,
  Send,
  CheckCircle
} from 'lucide-react';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "(480) 466-0496",
      availability: "Mon-Fri, 8AM-6PM MST",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses via email",
      contact: "support@clinote.ai",
      availability: "24/7 response within 4 hours",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant support during business hours",
      contact: "Available on website",
      availability: "Mon-Fri, 8AM-6PM MST",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const helpTopics = [
    {
      icon: FileText,
      title: "Setup & Installation",
      description: "Get started with Clinote Chrome extension",
      link: "/setup-guide"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step guides and best practices",
      link: "/video-tutorials"
    },
    {
      icon: Users,
      title: "EMR Integration",
      description: "Connect with your existing EMR system",
      link: "/emr-integration"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Common questions and answers",
      link: "/faq"
    }
  ];

  return (
    <section id="support" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            We're Here to Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated support team is ready to assist you with any questions about Clinote. 
            Get help with setup, troubleshooting, or learn how to maximize your productivity.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${channel.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">{channel.contact}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {channel.availability}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                <p className="text-gray-600">We'll get back to you within 4 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing & Subscription">Billing & Subscription</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="EMR Integration">EMR Integration</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Help Resources */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Help Resources</h3>
              <div className="space-y-4">
                {helpTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <a
                      key={index}
                      href={topic.link}
                      className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-sm text-gray-600">{topic.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="mb-6 opacity-90">
                For urgent technical issues or questions about your subscription, 
                our support team is available during business hours.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>(480) 466-0496</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>support@clinote.ai</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>Mon-Fri, 8AM-6PM MST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
