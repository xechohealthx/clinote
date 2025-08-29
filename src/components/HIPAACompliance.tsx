import React from 'react';
import { ArrowLeft, Shield, Lock, CheckCircle, Users, FileText, AlertTriangle } from 'lucide-react';

const HIPAACompliance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HIPAA Compliance</h1>
          <p className="text-lg text-gray-600">Committed to protecting your patients' privacy and data security</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-semibold">HIPAA Compliant</p>
                    <p className="text-green-700 text-sm">
                      Clinote is fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) and maintains the highest standards of data security and privacy protection for healthcare providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Our HIPAA Commitment
              </h2>
              <p className="text-gray-700 mb-4">
                As a healthcare technology provider, Clinote understands the critical importance of protecting patient privacy and maintaining the confidentiality of Protected Health Information (PHI). We are committed to full compliance with HIPAA regulations and have implemented comprehensive safeguards to ensure the security of your patients' data.
              </p>
              <p className="text-gray-700">
                Our HIPAA compliance program is designed to meet and exceed the requirements of the HIPAA Privacy Rule, Security Rule, and Breach Notification Rule, ensuring that your practice can confidently use our AI-powered documentation tools while maintaining full regulatory compliance.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                Administrative Safeguards
              </h2>
              <p className="text-gray-700 mb-4">We implement comprehensive administrative safeguards to protect PHI:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security Management Process</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Regular risk assessments and security evaluations</li>
                <li>Comprehensive security policies and procedures</li>
                <li>Incident response and breach notification protocols</li>
                <li>Continuous monitoring and threat detection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Workforce Training and Management</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Mandatory HIPAA training for all employees</li>
                <li>Background checks and security clearances</li>
                <li>Role-based access controls and permissions</li>
                <li>Regular security awareness training</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Associate Management</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Business Associate Agreements (BAAs) with all covered entities</li>
                <li>Vendor security assessments and monitoring</li>
                <li>Contractual obligations for HIPAA compliance</li>
                <li>Regular vendor compliance audits</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Physical Safeguards</h2>
              <p className="text-gray-700 mb-4">We maintain strict physical security measures:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Facility Access Controls</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Multi-factor authentication for facility access</li>
                <li>Video surveillance and security personnel</li>
                <li>Environmental controls and fire suppression</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Workstation and Device Security</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Secure workstation configurations</li>
                <li>Device encryption and access controls</li>
                <li>Secure disposal of hardware and media</li>
                <li>Inventory tracking and asset management</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Safeguards</h2>
              <p className="text-gray-700 mb-4">We implement state-of-the-art technical security measures:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Access Control</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Unique user identification and authentication</li>
                <li>Multi-factor authentication (MFA)</li>
                <li>Automatic session timeout and logout</li>
                <li>Role-based access controls (RBAC)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Transmission Security</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>End-to-end encryption (AES-256)</li>
                <li>Secure HTTPS/TLS protocols</li>
                <li>Encrypted data transmission</li>
                <li>Secure API communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Protection</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Real-time processing with immediate deletion</li>
                <li>Zero data storage eliminates retention risks</li>
                <li>Temporary encrypted processing only</li>
                <li>No patient data ever stored on servers</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-blue-600" />
                Business Associate Agreements (BAAs)
              </h2>
              <p className="text-gray-700 mb-4">
                Clinote executes Business Associate Agreements (BAAs) with all covered entities and healthcare providers. Our BAA includes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Detailed obligations for PHI protection</li>
                <li>Permitted uses and disclosures of PHI</li>
                <li>Security and privacy safeguards</li>
                <li>Breach notification requirements</li>
                <li>Termination and data return provisions</li>
                <li>Audit and inspection rights</li>
              </ul>
              <p className="text-gray-700">
                We provide our BAA to all customers upon request and maintain executed agreements on file for compliance purposes.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit and Monitoring</h2>
              <p className="text-gray-700 mb-4">We maintain comprehensive audit and monitoring systems:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Access Logging</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Detailed audit logs of all PHI access</li>
                <li>User activity monitoring and tracking</li>
                <li>System access and modification logs</li>
                <li>Retention of audit logs for 6+ years</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security Monitoring</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>24/7 security monitoring and alerting</li>
                <li>Intrusion detection and prevention</li>
                <li>Anomaly detection and threat analysis</li>
                <li>Regular security assessments and penetration testing</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Incident Response and Breach Notification</h2>
              <p className="text-gray-700 mb-4">
                We maintain comprehensive incident response procedures:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Immediate incident detection and response</li>
                <li>Breach assessment and risk analysis</li>
                <li>Timely notification to affected parties</li>
                <li>Regulatory reporting as required</li>
                <li>Remediation and prevention measures</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Zero Data Storage Approach</h2>
              <p className="text-gray-700 mb-4">
                Clinote employs a revolutionary zero-storage approach to patient data:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>No patient data is ever stored on our servers</li>
                <li>All conversations are processed in real-time and immediately deleted</li>
                <li>Zero data retention eliminates storage and disposal concerns</li>
                <li>Maximum privacy protection through temporary processing only</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance Certifications</h2>
              <p className="text-gray-700 mb-4">
                Clinote maintains various compliance certifications and undergoes regular assessments:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>HIPAA compliance audits and assessments</li>
                <li>SOC 2 Type II compliance</li>
                <li>Regular penetration testing and security assessments</li>
                <li>Third-party security audits</li>
                <li>Ongoing compliance monitoring and updates</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibilities</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-blue-800 font-semibold">Important Notice</p>
                    <p className="text-blue-700 text-sm">
                      While Clinote maintains HIPAA compliance, healthcare providers are responsible for ensuring their use of our service complies with their organization's policies and applicable regulations.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">As a healthcare provider using Clinote, you should:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Review and approve all AI-generated content before use</li>
                <li>Ensure proper patient consent for recording</li>
                <li>Maintain appropriate access controls for your account</li>
                <li>Report any security concerns immediately</li>
                <li>Comply with your organization's HIPAA policies</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Our Compliance Team</h2>
              <p className="text-gray-700 mb-4">
                For questions about our HIPAA compliance or to request a Business Associate Agreement, please contact our compliance team:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700"><strong>Email:</strong> compliance@clinote.ai</p>
                <p className="text-gray-700"><strong>Phone:</strong> 1-800-CLINOTE</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Healthcare Ave, Medical District, San Francisco, CA 94105</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
              <p className="text-gray-700 mb-4">
                For more information about HIPAA compliance and our security measures:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li><a href="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a></li>
                <li><a href="/security" className="text-blue-600 hover:text-blue-700">Security Information</a></li>
                <li><a href="/terms-of-service" className="text-blue-600 hover:text-blue-700">Terms of Service</a></li>
                <li>HIPAA Compliance Documentation (available upon request)</li>
                <li>Security Assessment Reports (available under NDA)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIPAACompliance;
