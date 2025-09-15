'use client';

import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin, HelpCircle, Clock, HeadphonesIcon, Users, Building2 } from 'lucide-react';
import { useSiteSettings } from '@/hooks/use-site-settings';

export function ContactPageClient() {
  const { settings, getFormattedAddress, getCompanyName } = useSiteSettings();
  
  return (
    <div>
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-blue-900/80 via-blue-700/70 to-blue-900/80">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/hero.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-700/80 to-blue-900/90"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Ready to discuss your semiconductor engineering needs? 
              Our expert team is here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-blue-100">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Mail className="h-5 w-5" />
                <span>info@semixion.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-slate-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-slate-600 mb-8">
                  We're here to help with your semiconductor engineering needs. 
                  Reach out to us through any of the channels below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
                      <p className="text-slate-600 mb-2">+1 (555) 123-4567</p>
                      <p className="text-sm text-slate-500">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                      <p className="text-slate-600 mb-2">info@semixion.com</p>
                      <p className="text-sm text-slate-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Office</h3>
                      <p className="text-slate-600 mb-2">
                        {getFormattedAddress()}
                      </p>
                      <p className="text-sm text-slate-500">Visit us by appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Why Choose Us?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm text-blue-100">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-blue-100">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-blue-100">Expert Engineers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-100">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-slate-600">
                Quick answers to common questions about our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    How quickly can you start my project?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Most projects can begin within 1-2 weeks after initial consultation and requirements gathering.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Do you work with startups?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Yes! We work with companies of all sizes, from startups to Fortune 500 companies.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    What industries do you serve?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    We serve automotive, aerospace, medical devices, consumer electronics, and more.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Do you provide ongoing support?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Yes, we offer comprehensive support and maintenance services for all our projects.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Can you help with existing designs?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Absolutely! We can review, optimize, and enhance your existing semiconductor designs.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">
                    What's your typical project timeline?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Project timelines vary based on complexity, typically ranging from 3-12 months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

