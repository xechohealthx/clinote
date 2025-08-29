import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Users } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: August 17, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 mb-4">
                Clinote ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered medical documentation Chrome extension and related services.
              </p>
              <p className="text-gray-700">
                As a healthcare technology company, we understand the sensitive nature of medical information and are fully committed to maintaining the highest standards of privacy and security in compliance with HIPAA regulations and other applicable laws.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Name and contact information (email address, phone number)</li>
                <li>Professional credentials and medical license information</li>
                <li>Practice information and EMR system details</li>
                <li>Account credentials and subscription information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Medical Information (PHI)</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Patient conversations processed in real-time (not stored)</li>
                <li>Generated SOAP notes and medical documentation (temporary processing only)</li>
                <li>ICD-10 and CPT codes (processed but not retained)</li>
                <li>Treatment plans and clinical notes (immediately deleted after generation)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Browser type and version</li>
                <li>Device information and IP address</li>
                <li>Usage analytics and performance data</li>
                <li>Extension interaction logs</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-600" />
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide and maintain our AI transcription and documentation services</li>
                <li>Process and generate medical notes, SOAP notes, and diagnosis codes</li>
                <li>Improve our AI models and service accuracy</li>
                <li>Provide customer support and technical assistance</li>
                <li>Send important service updates and notifications</li>
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Prevent fraud and ensure service security</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-600" />
                Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal or medical information to third parties, except in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our service, conducting business, or servicing you</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Compliance</h2>
              <p className="text-gray-700 mb-4">
                Clinote is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) and maintains strict security measures to protect your patients' Protected Health Information (PHI). We:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Implement appropriate administrative, physical, and technical safeguards</li>
                <li>Conduct regular security assessments and audits</li>
                <li>Provide HIPAA training to all employees</li>
                <li>Maintain detailed audit logs of all PHI access</li>
                <li>Execute Business Associate Agreements (BAAs) with covered entities</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure cloud storage with multiple layers of protection</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication requirements</li>
                <li>24/7 monitoring and threat detection</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Zero Data Retention</h2>
              <p className="text-gray-700 mb-4">
                Clinote employs a revolutionary zero-storage approach. We do not retain any patient data at all. All patient conversations are processed in real-time and immediately deleted after generating your SOAP notes. This eliminates all data retention concerns and provides maximum privacy protection.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> privacy@clinote.ai</p>
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

export default PrivacyPolicy;
