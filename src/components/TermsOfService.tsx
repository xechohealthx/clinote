import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: August 17, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                Agreement to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") govern your use of Clinote's AI-powered medical documentation services, including our Chrome extension and related software ("Service"). By accessing or using our Service, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700">
                If you disagree with any part of these terms, then you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
                Description of Service
              </h2>
              <p className="text-gray-700 mb-4">
                Clinote provides an AI-powered Chrome extension that:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Transcribes patient-provider conversations in real-time</li>
                <li>Generates comprehensive SOAP notes and medical documentation</li>
                <li>Provides ICD-10 and CPT code suggestions</li>
                <li>Enables seamless integration with EMR systems</li>
                <li>Offers secure, HIPAA-compliant data processing</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                To use certain features of our Service, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription and Payment Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Free Trial</h3>
              <p className="text-gray-700 mb-4">
                We offer a 7-day free trial for new users. You may cancel your subscription at any time during the trial period without charge.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Paid Subscriptions</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Subscriptions are billed on a monthly basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We may change our pricing with 30 days' notice</li>
                <li>Failed payments may result in service suspension</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cancellation</h3>
              <p className="text-gray-700 mb-4">
                You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any commercial purpose without authorization</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Disclaimer</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-semibold">Important Medical Disclaimer</p>
                    <p className="text-yellow-700 text-sm">
                      Clinote is a documentation tool and does not provide medical advice, diagnosis, or treatment. All medical decisions should be made by qualified healthcare professionals. Our AI-generated content should be reviewed and verified by healthcare providers before use in patient care.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Compliance and Medical Data</h2>
              <p className="text-gray-700 mb-4">
                As a healthcare technology provider, we are committed to maintaining HIPAA compliance:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>We maintain appropriate administrative, physical, and technical safeguards</li>
                <li>We execute Business Associate Agreements (BAAs) with covered entities</li>
                <li>We conduct regular security assessments and audits</li>
                <li>We provide HIPAA training to all employees</li>
                <li>We maintain detailed audit logs of all PHI access</li>
              </ul>
              <p className="text-gray-700">
                You are responsible for ensuring your use of our Service complies with applicable healthcare regulations and your organization's policies.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are owned by Clinote and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                You retain ownership of your medical content and data. By using our Service, you grant us a limited license to process your data solely for the purpose of providing our services.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability and Updates</h2>
              <p className="text-gray-700 mb-4">
                We strive to maintain high service availability but do not guarantee uninterrupted access. We may:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Perform maintenance that may temporarily affect service availability</li>
                <li>Update the Service to improve functionality and security</li>
                <li>Modify or discontinue features with reasonable notice</li>
                <li>Suspend service for violations of these Terms</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, Clinote shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers and/or personal information</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
                <li>Any bugs, viruses, or other harmful code that may be transmitted through the Service</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to defend, indemnify, and hold harmless Clinote and its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party right</li>
                <li>Any claim that your content caused damage to a third party</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of San Francisco County, California.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> legal@clinote.ai</p>
                <p className="text-gray-700"><strong>Phone:</strong> 1-800-CLINOTE</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Healthcare Ave, Medical District, San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
