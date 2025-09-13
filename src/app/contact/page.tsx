import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin, HelpCircle, Clock, HeadphonesIcon, Users, Building2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <div>
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-blue-900/80 via-blue-700/70 to-blue-900/80">
        <div className="absolute inset-0 bg-royal-pattern opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              We're here to help. Whether you have a question about our products, services, or want to discuss a new project, our team is ready to answer all your questions.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="font-headline text-3xl font-semibold text-primary">Send us a Message</h2>
            <p className="text-muted-foreground mt-2 mb-6">Fill out the form and we'll get back to you shortly.</p>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <h2 className="font-headline text-3xl font-semibold text-primary">Contact Information</h2>
            <p className="text-muted-foreground text-lg">
              Find us at our headquarters or reach out via phone or email.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Our Office</h3>
                  <p className="text-muted-foreground">
                    Plot No: 205, 2nd Floor, No 1, Sapthagiri Arcade,<br />
                    Hoodi Village, ITPL Main Rd,<br />
                    Mahadevapura, Bengaluru, Karnataka 560048
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">info@semixion.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">+91 9618055526</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Get quick answers to common questions about our services, timelines, and collaboration process.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* FAQ Item 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    What is your typical project timeline?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Project timelines vary based on complexity and scope. Most projects range from 3-12 months, with detailed timelines provided during initial consultation.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <HeadphonesIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Do you offer support after project completion?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes, we provide comprehensive post-project support including maintenance, updates, and technical assistance as part of our service packages.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Can you work with our existing team?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Absolutely! We excel at collaborating with client teams and can integrate seamlessly with your existing development processes and tools.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                  <Building2 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    What industries do you specialize in?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    We serve automotive, aerospace, healthcare, consumer electronics, industrial, and energy sectors with specialized expertise in each domain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Help CTA */}
          <div className="text-center mt-16">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-slate-200">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-slate-600 mb-6">
                Can't find the answer you're looking for? Our team is here to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@semixion.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </a>
                <a 
                  href="tel:+919618055526"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    