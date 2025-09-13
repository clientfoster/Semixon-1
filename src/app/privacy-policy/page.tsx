import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Semixion',
  description: 'Privacy Policy for Semixion - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                
                <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Information We Collect</h2>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Personal Information</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>Name and contact information (email address, phone number, mailing address)</li>
                    <li>Company information and job title</li>
                    <li>Information provided through contact forms, surveys, or service inquiries</li>
                    <li>Communication preferences and correspondence with us</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Technical Information</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We automatically collect certain technical information when you visit our website:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website and search terms used</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">2. How We Use Your Information</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>To provide and improve our services</li>
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To send you information about our products and services (with your consent)</li>
                    <li>To analyze website usage and improve user experience</li>
                    <li>To comply with legal obligations and protect our rights</li>
                    <li>To prevent fraud and ensure security</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Information Sharing and Disclosure</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>With your explicit consent</li>
                    <li>With service providers who assist us in operating our business</li>
                    <li>To comply with legal requirements or court orders</li>
                    <li>To protect our rights, property, or safety, or that of our users</li>
                    <li>In connection with a business transfer or acquisition</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Data Security</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">5. Cookies and Tracking Technologies</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">6. Your Rights and Choices</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate or incomplete information</li>
                    <li>Deletion of your personal information</li>
                    <li>Restriction of processing</li>
                    <li>Data portability</li>
                    <li>Objection to processing</li>
                    <li>Withdrawal of consent</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">7. Data Retention</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">8. International Data Transfers</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">9. Children's Privacy</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">10. Changes to This Privacy Policy</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. We encourage you to review this privacy policy periodically.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">11. Contact Us</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-2"><strong>Email:</strong> privacy@semixion.com</p>
                    <p className="text-slate-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                    <p className="text-slate-700"><strong>Address:</strong> 123 Technology Drive, Silicon Valley, CA 94000</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
