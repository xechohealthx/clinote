import React, { useState } from 'react';
import { Check, Star, Crown, Building, Loader } from 'lucide-react';
import { StripeService } from '../services/stripe';

const Pricing = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planName: string, priceId?: string) => {
    if (planName === 'Enterprise') {
      // For enterprise, redirect to contact form or open email
      window.location.href = 'mailto:sales@clinote.ai?subject=Enterprise%20Inquiry';
      return;
    }

    if (!priceId) {
      console.error('Price ID not found for plan:', planName);
      return;
    }

    setLoading(planName);
    
    try {
      const sessionId = await StripeService.createCheckoutSession({
        priceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/pricing`,
        customerEmail: '', // Will be collected during checkout
      });

      await StripeService.redirectToCheckout(sessionId);
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert('There was an error starting the checkout process. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: "Free Trial",
      price: "0",
      period: "7 days",
      description: "Perfect for trying out Clinote",
      features: [
        "Full access to all features",
        "Up to 50 patient encounters",
        "Real-time transcription",
        "SOAP note generation",
        "Basic support",
        "No credit card required"
      ],
      icon: Star,
      color: "from-gray-500 to-gray-600",
      popular: false,
      cta: "Start Free Trial",
      priceId: undefined
    },
    {
      name: "Pro",
      price: "29.99",
      period: "per month",
      description: "For individual healthcare providers",
      features: [
        "Unlimited patient encounters",
        "Real-time AI transcription",
        "Complete SOAP note generation",
        "ICD-10 & CPT code integration",
        "Chrome extension access",
        "HIPAA compliant storage",
        "Priority email support",
        "EMR integration guides"
      ],
      icon: Crown,
      color: "from-blue-500 to-emerald-500",
      popular: true,
      cta: "Choose Pro",
      priceId: "price_1RwvALHTgRKxNqc2HX2O3MXt"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "per practice",
      description: "For medical practices and clinics",
      features: [
        "Everything in Pro",
        "Multi-provider accounts",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom training sessions",
        "24/7 phone support",
        "SLA guarantees"
      ],
      icon: Building,
      color: "from-purple-500 to-purple-600",
      popular: false,
      cta: "Contact Sales",
      priceId: undefined
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your practice. All plans include our core AI transcription 
            and SOAP note generation features.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSubscribe(plan.name, plan.priceId)}
                    disabled={loading === plan.name}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${loading === plan.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading === plan.name ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Large healthcare organizations with specific requirements can work with our team 
              to create a customized Clinote deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Contact Enterprise Sales
              </button>
              <a 
                href="/roi-calculator"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300 inline-block"
              >
                View ROI Calculator
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;