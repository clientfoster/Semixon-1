import { Metadata } from 'next';
import { ContactInfo } from '@/components/contact-info';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Semixon',
  description: 'Terms & Conditions for Semixon - Read our terms and conditions for using our services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Please read these terms and conditions carefully before using our services.
            </p>
            <p className="text-sm text-slate-400 mt-4">
              Last updated: November 18 2025
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
                
                <div className="mb-8">
                  <p className="text-slate-600 leading-relaxed mb-4">
                    For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean SEMIXON TECHNOLOGIES PRIVATE LIMITED, whose registered/operational office is H.NO- 6-3-200/A PREM NAGAR Banjara Hills Hyderabad Khairatabad Telangana 500034 Banjara Hills TELANGANA 500034 . "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Your use of the website and/or purchase from us are governed by following Terms and Conditions:
                  </p>
                  
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>The content of the pages of this website is subject to change without notice.</li>
                    <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                    <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
                    <li>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                    <li>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                    <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
                    <li>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
                    <li>You may not create a link to our website from another website or document without SEMIXON TECHNOLOGIES PRIVATE LIMITED's prior written consent.</li>
                    <li>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India .</li>
                    <li>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Terms</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The following additional terms and conditions apply to your use of our services:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                    <li>These additional terms form part of our agreement with you and are supplemental to the main Terms and Conditions above.</li>
                    <li>In the event of any conflict between these additional terms and the main Terms and Conditions, these additional terms shall prevail.</li>
                    <li>We reserve the right to update these additional terms at any time without prior notice.</li>
                    <li>Your continued use of our services after any changes to these additional terms constitutes your acceptance of the modified terms.</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}