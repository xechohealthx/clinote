import React from 'react';
import { ArrowLeft, Shield, Lock, Server, Eye, Zap, CheckCircle } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security</h1>
          <p className="text-lg text-gray-600">Enterprise-grade security for healthcare data protection</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <Shield className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-blue-800 font-semibold">Revolutionary Zero-Data Security</p>
                    <p className="text-blue-700 text-sm">
                      Clinote's revolutionary approach eliminates data storage entirely. No patient data is ever stored, providing maximum security and privacy protection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                Zero-Data Security
              </h2>
              <p className="text-gray-700 mb-4">
                Our revolutionary approach eliminates data storage entirely:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Real-time processing with immediate deletion</li>
                <li>No patient data ever stored on servers</li>
                <li>Temporary encrypted processing only</li>
                <li>Zero data breach risk for patient information</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Server className="w-6 h-6 mr-2 text-blue-600" />
                Infrastructure Security
              </h2>
              <p className="text-gray-700 mb-4">
                Our cloud infrastructure is built with security as the foundation:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>AWS/GCP enterprise-grade cloud infrastructure</li>
                <li>Multi-region redundancy and disaster recovery</li>
                <li>VPC isolation and network segmentation</li>
                <li>24/7 monitored data centers with biometric access</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-600" />
                Access Control
              </h2>
              <p className="text-gray-700 mb-4">
                We implement strict access controls:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Required Multi-Factor Authentication (MFA)</li>
                <li>Role-Based Access Control (RBAC)</li>
                <li>Automatic session timeout and logout</li>
                <li>Regular access reviews and audits</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Network Security</h2>
              <p className="text-gray-700 mb-4">
                Our network is protected by multiple layers:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Next-generation firewalls and DDoS protection</li>
                <li>Web application firewalls (WAF)</li>
                <li>24/7 network monitoring and threat detection</li>
                <li>Intrusion detection and prevention systems</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance and Certifications</h2>
              <p className="text-gray-700 mb-4">
                We maintain various security certifications:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>HIPAA compliance with full safeguards</li>
                <li>SOC 2 Type II certification</li>
                <li>ISO 27001 Information Security Management</li>
                <li>Regular penetration testing and security audits</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Security Team</h2>
              <p className="text-gray-700 mb-4">
                For security-related questions or to report concerns:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Security Email:</strong> security@clinote.ai</p>
                <p className="text-gray-700"><strong>Security Hotline:</strong> 1-800-CLINOTE</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Healthcare Ave, Medical District, San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
