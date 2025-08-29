import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, FileText, CreditCard, Shield, Chrome, Users } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: Chrome,
      title: "Getting Started",
      color: "from-blue-500 to-blue-600",
      questions: [
        {
          question: "How do I install the Clinote Chrome extension?",
          answer: "Installing Clinote is simple! Visit the Chrome Web Store, search for 'Clinote', and click 'Add to Chrome'. Once installed, you'll see the Clinote icon in your browser toolbar. Click it to sign in with your Clinote account and start using the extension immediately."
        },
        {
          question: "What browsers are supported?",
          answer: "Clinote currently supports Google Chrome (version 90+) and is optimized for the best performance on Chrome. We're working on support for other browsers like Firefox and Safari in future updates."
        },
        {
          question: "Do I need to create an account to use Clinote?",
          answer: "Yes, you'll need to create a Clinote account to use the service. You can start with our 7-day free trial which includes up to 50 patient encounters. No credit card is required for the trial period."
        },
        {
          question: "How long does it take to set up Clinote?",
          answer: "Setup takes less than 5 minutes! Simply install the Chrome extension, create your account, and you're ready to start. No complex configuration or IT support required."
        }
      ]
    },
    {
      icon: FileText,
      title: "Using Clinote",
      color: "from-emerald-500 to-emerald-600",
      questions: [
        {
          question: "How do I start recording a patient encounter?",
          answer: "Click the Clinote extension icon in your browser toolbar, then click the 'Start Recording' button. The extension will begin capturing audio from your microphone. Make sure your microphone is enabled and working properly."
        },
        {
          question: "Can I edit the generated SOAP notes?",
          answer: "Absolutely! All generated SOAP notes can be edited before copying to your EMR. You can modify any section including the Chief Complaint, HPI, Assessment, and Plan. The notes are generated in real-time and can be reviewed and adjusted as needed."
        },
        {
          question: "How accurate is the transcription?",
          answer: "Clinote achieves 99.9% accuracy in medical transcription. Our AI is specifically trained on medical terminology and can recognize complex medical terms, drug names, and procedures. However, we always recommend reviewing the generated content before finalizing."
        },
        {
          question: "What if the AI doesn't understand something I said?",
          answer: "If the AI misses or misinterprets something, you can manually edit the generated note. The transcription appears in real-time, so you can see what's being captured and make corrections immediately. You can also pause and restart recording if needed."
        },
        {
          question: "How long can I record for?",
          answer: "Clinote can handle extended patient encounters of 15-30 minutes or longer. The system automatically segments long recordings and processes them efficiently. There's no time limit on individual recordings."
        }
      ]
    },
    {
      icon: Users,
      title: "EMR Integration",
      color: "from-purple-500 to-purple-600",
      questions: [
        {
          question: "Which EMR systems does Clinote work with?",
          answer: "Clinote works with any web-based EMR system including Epic, Cerner, Allscripts, NextGen, AthenaHealth, eClinicalWorks, and more. Since it's a Chrome extension, it integrates seamlessly with any web-based system."
        },
        {
          question: "Do I need to install any additional software?",
          answer: "No additional software is required! Clinote works entirely through the Chrome extension. There's no need for API integrations, complex setup, or IT support. Simply copy and paste the generated notes into your EMR."
        },
        {
          question: "How do I copy notes to my EMR?",
          answer: "After generating a SOAP note, you can copy individual sections (Chief Complaint, HPI, Assessment, Plan) or the entire note with one click. The notes are formatted to paste cleanly into most EMR systems. You can also customize the formatting if needed."
        },
        {
          question: "Will Clinote automatically populate my EMR?",
          answer: "Currently, Clinote uses a copy-and-paste approach for maximum compatibility and security. This ensures your EMR data remains secure and gives you full control over what gets added to patient records. We're working on direct API integrations for future releases."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Billing & Subscription",
      color: "from-yellow-500 to-yellow-600",
      questions: [
        {
          question: "What's included in the free trial?",
          answer: "The free trial includes full access to all Clinote features for 7 days, including up to 50 patient encounters, real-time transcription, SOAP note generation, and ICD-10 code suggestions. No credit card is required to start your trial."
        },
        {
          question: "How much does Clinote cost after the trial?",
          answer: "After your free trial, Clinote Pro costs $29.99 per month. This includes unlimited patient encounters, all AI features, Chrome extension access, and priority email support. Enterprise pricing is available for larger practices."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period. You'll continue to have access to all features until your billing period ends."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee. If you're not satisfied with Clinote within 30 days of your first paid subscription, contact our support team for a full refund. The free trial period is also completely free with no obligation."
        },
        {
          question: "Is there a setup or installation fee?",
          answer: "No setup or installation fees! Clinote is designed to be simple and affordable. The $29.99 monthly fee includes everything you need to get started immediately."
        }
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      color: "from-red-500 to-red-600",
      questions: [
        {
          question: "Is Clinote HIPAA compliant?",
          answer: "Yes, Clinote is fully HIPAA compliant. We implement all required administrative, physical, and technical safeguards including end-to-end encryption, secure data storage, audit logging, and Business Associate Agreements (BAAs) with covered entities."
        },
        {
          question: "Where is my patient data stored?",
          answer: "Clinote does not store any patient data at all. All patient conversations are processed in real-time through our secure AI system and immediately deleted after generating your SOAP notes. We use temporary, encrypted processing that ensures no patient information is ever stored on our servers or in our systems."
        },
        {
          question: "Who has access to my patient data?",
          answer: "No one has access to patient data because we don't store it. Patient conversations are processed in real-time and immediately deleted. Our AI system processes the audio temporarily to generate your notes, but no human personnel ever have access to patient information. This zero-storage approach provides maximum privacy and security."
        },
        {
          question: "How long do you keep my data?",
          answer: "We don't keep any patient data at all. All patient conversations are processed in real-time and immediately deleted after generating your SOAP notes. There's no data retention because there's no data storage. This eliminates any concerns about data retention policies or deletion requests."
        },
        {
          question: "What happens if there's a security breach?",
          answer: "Since we don't store any patient data, there's no patient information that could be compromised in a security breach. Our zero-storage approach means that even if there were a security incident, no patient data would be at risk. We maintain comprehensive security measures to protect our systems and infrastructure."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap((category, categoryIndex) =>
    category.questions.map((item, questionIndex) => ({
      ...item,
      category: category.title,
      categoryIcon: category.icon,
      categoryColor: category.color,
      globalIndex: categoryIndex * 100 + questionIndex
    }))
  );

  const filteredQuestions = allQuestions.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedFilteredQuestions = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about Clinote</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {searchTerm ? (
            // Search Results
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search Results ({filteredQuestions.length} found)
              </h2>
              <div className="space-y-4">
                {filteredQuestions.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleItem(item.globalIndex)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className={`w-8 h-8 bg-gradient-to-r ${item.categoryColor} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                          <item.categoryIcon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.question}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        </div>
                      </div>
                      {openItems.includes(item.globalIndex) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openItems.includes(item.globalIndex) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Categorized FAQ
            <div className="space-y-8">
              {groupedFilteredQuestions.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={categoryIndex}>
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                    </div>
                    <div className="space-y-4">
                      {category.questions.map((item, questionIndex) => (
                        <div key={questionIndex} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleItem(categoryIndex * 100 + questionIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <h3 className="font-semibold text-gray-900">{item.question}</h3>
                            {openItems.includes(categoryIndex * 100 + questionIndex) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {openItems.includes(categoryIndex * 100 + questionIndex) && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact Support */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
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
    </div>
  );
};

export default FAQ;
