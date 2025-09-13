
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Zap, Target, TrendingUp, CheckCircle, Settings } from 'lucide-react';

const capabilities = [
  {
    title: 'Test Automation',
    description: 'Comprehensive automated testing solutions for web and mobile applications',
    icon: Settings,
    features: ['Selenium automation', 'Cypress testing', 'Playwright automation', 'API testing']
  },
  {
    title: 'Manual Testing',
    description: 'Expert manual testing and exploratory testing services',
    icon: CheckCircle,
    features: ['Functional testing', 'Usability testing', 'Exploratory testing', 'User acceptance testing']
  },
  {
    title: 'Performance Testing',
    description: 'Performance and load testing to ensure scalability',
    icon: Zap,
    features: ['Load testing', 'Stress testing', 'Performance monitoring', 'Scalability testing']
  },
  {
    title: 'Security Testing',
    description: 'Comprehensive security testing and vulnerability assessment',
    icon: Shield,
    features: ['Penetration testing', 'Security scanning', 'Vulnerability assessment', 'Compliance testing']
  }
];

const benefits = [
  {
    title: 'Risk Mitigation',
    description: 'Identify and fix issues before they reach production',
    icon: Shield
  },
  {
    title: 'Quality Assurance',
    description: 'Ensure your software meets the highest quality standards',
    icon: CheckCircle
  },
  {
    title: 'Cost Reduction',
    description: 'Reduce development costs by catching issues early',
    icon: Target
  }
];

export default function QualityAssurancePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-purple-200 text-sm font-medium">
                Software Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Quality
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                Assurance
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Our comprehensive Quality Assurance (QA) and testing services ensure that your software is reliable, functional, secure, and delivers an excellent user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Delivering
                  <span className="block text-purple-600">Flawless Software</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Our dedicated QA team works to catch defects early in the development cycle, reducing risk and ensuring a high-quality product launch with comprehensive testing services.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Comprehensive test automation and manual testing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Performance and security testing services</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Seamless integration with development teams</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">300+</h3>
                      <p className="text-slate-600">Projects Tested</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Bug Detection</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">70%</h3>
                      <p className="text-slate-600">Faster Testing</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">100%</h3>
                      <p className="text-slate-600">Quality Assurance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our QA Capabilities
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From test automation to security testing, we deliver comprehensive QA solutions that ensure your software meets the highest quality standards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((capability) => {
                const IconComponent = capability.icon;
                return (
                  <Card key={capability.title} className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                        {capability.title}
                      </CardTitle>
                      <p className="text-slate-600 leading-relaxed">
                        {capability.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {capability.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-slate-600">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Our
                <span className="block text-purple-600">QA Services</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our proven track record and deep expertise in quality assurance make us the preferred partner for companies worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-purple-200 text-sm font-medium">
                Ready to Ensure Quality?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                Flawless Software
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to ensure your software quality? Our team of expert QA engineers is here to help you achieve your quality goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/services" className="flex items-center">
                  View All Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
