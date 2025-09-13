import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Semixion',
  description: 'Terms of Service for Semixion - Read our terms and conditions for using our services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Please read these terms and conditions carefully before using our services.
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
                
                <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Acceptance of Terms</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    By accessing and using Semixion's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Description of Service</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Semixion provides semiconductor and engineering services including but not limited to:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>Semiconductor design and development</li>
                    <li>Embedded systems engineering</li>
                    <li>Software development and maintenance</li>
                    <li>Technical consulting services</li>
                    <li>Quality assurance and testing</li>
                    <li>Project management and support</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">3. Use License</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials on Semixion's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">4. User Accounts</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">5. Prohibited Uses</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    You may not use our service:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>For any obscene or immoral purpose</li>
                    <li>To interfere with or circumvent the security features of the service</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">6. Intellectual Property Rights</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The service and its original content, features, and functionality are and will remain the exclusive property of Semixion and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">7. Service Availability</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We reserve the right to withdraw or amend our service, and any service or material we provide via the service, in our sole discretion without notice. We will not be liable if, for any reason, all or any part of the service is unavailable at any time or for any period.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">8. Disclaimer</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>Excludes all representations and warranties relating to this website and its contents</li>
                    <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">9. Limitation of Liability</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    In no event shall Semixion, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">10. Indemnification</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    You agree to defend, indemnify, and hold harmless Semixion and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">11. Termination</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">12. Governing Law</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">13. Changes to Terms</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">14. Severability</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-6">15. Contact Information</h2>
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-slate-50 rounded-lg p-6">
                    <p className="text-slate-700 mb-2"><strong>Email:</strong> info@semixion.com</p>
                    <p className="text-slate-700 mb-2"><strong>Phone:</strong> +91 9618055526</p>
                    <p className="text-slate-700"><strong>Address:</strong> Plot No: 205, 2nd Floor, No 1, Sapthagiri Arcade, Hoodi Village, ITPL Main Rd, Mahadevapura, Bengaluru, Karnataka 560048</p>
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
