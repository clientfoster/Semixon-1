
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, Database, Shield, TrendingUp, Users } from 'lucide-react';

const capabilities = [
  {
    title: 'Full-Stack Web Development',
    description: 'Modern frontend and backend development',
    icon: Code,
    features: ['React, Angular, Vue.js', 'Node.js, Python, Java, .NET', 'RESTful APIs', 'Microservices architecture']
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile solutions',
    icon: Smartphone,
    features: ['iOS and Android native apps', 'React Native development', 'Flutter applications', 'Progressive Web Apps']
  },
  {
    title: 'Database Solutions',
    description: 'Scalable data management systems',
    icon: Database,
    features: ['SQL and NoSQL databases', 'Data migration services', 'Performance optimization', 'Backup and recovery']
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security implementation',
    icon: Shield,
    features: ['Security audits', 'Compliance frameworks', 'Data encryption', 'Access control systems']
  }
];

const benefits = [
  {
    title: 'Faster Time to Market',
    description: 'Accelerate development with agile methodologies',
    icon: TrendingUp
  },
  {
    title: 'Scalable Solutions',
    description: 'Build applications that grow with your business',
    icon: TrendingUp
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock maintenance and support',
    icon: Users
  }
];

export default function ApplicationDevelopmentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                Software Development Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Application Development
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                and Maintenance
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We provide end-to-end application development services to build, deploy, and maintain robust, scalable, and secure software solutions that meet your business objectives.
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
                  Building and Supporting
                  <span className="block text-blue-600">Your Business Software</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  From customer-facing web and mobile apps to internal enterprise systems, we design and build software that works. Our team follows agile methodologies to deliver high-quality applications quickly and efficiently.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Agile development methodologies for faster delivery</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Comprehensive maintenance and support services</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Legacy system modernization and migration</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">500+</h3>
                      <p className="text-slate-600">Applications Built</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Uptime Guarantee</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">50+</h3>
                      <p className="text-slate-600">Enterprise Clients</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">24/7</h3>
                      <p className="text-slate-600">Security Monitoring</p>
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
                Our Development Capabilities
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From concept to deployment, we provide comprehensive development services that deliver robust, scalable, and secure applications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((capability) => {
                const IconComponent = capability.icon;
                return (
                  <Card key={capability.title} className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
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
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
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
                <span className="block text-blue-600">Development Services</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our proven track record and comprehensive approach make us the preferred partner for application development and maintenance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                Ready to Build?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build Your
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Application
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to transform your ideas into powerful applications? Our development team is here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
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
