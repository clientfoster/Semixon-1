import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Globe, Smartphone, Database, Shield, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Web Development Services | Semixon',
  description: 'Professional web development services including frontend, backend, full-stack development, and modern web applications for semiconductor and engineering companies.',
  keywords: [
    'web development',
    'frontend development',
    'backend development',
    'full-stack development',
    'web applications',
    'responsive design',
    'modern web technologies',
    'semiconductor web solutions'
  ],
};

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
];

const services = [
  {
    icon: Globe,
    title: 'Frontend Development',
    description: 'Modern, responsive user interfaces built with the latest web technologies for optimal user experience.',
    features: ['Responsive Design', 'Progressive Web Apps', 'Component Architecture', 'Performance Optimization']
  },
  {
    icon: Database,
    title: 'Backend Development',
    description: 'Robust server-side applications and APIs designed for scalability and reliability.',
    features: ['RESTful APIs', 'Microservices Architecture', 'Database Design', 'Security Implementation']
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Web applications optimized for mobile devices with seamless cross-platform compatibility.',
    features: ['Mobile Optimization', 'Touch-Friendly Interfaces', 'Cross-Platform Testing', 'Performance Tuning']
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security measures and compliance standards for sensitive business applications.',
    features: ['Data Encryption', 'Authentication Systems', 'GDPR Compliance', 'Security Audits']
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized web applications that load quickly and provide smooth user experiences.'
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces designed with your users in mind for maximum engagement.'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Maintainable, scalable codebase following industry best practices and standards.'
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    description: 'Applications that work seamlessly across all devices and browsers.'
  }
];

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-4 py-2 text-sm font-medium">
                Software Services
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Professional <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">Web Development</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Build modern, scalable web applications that drive your business forward. 
              From concept to deployment, we deliver cutting-edge web solutions tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/services" className="flex items-center">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Modern Web Solutions for Modern Businesses
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  In today's digital landscape, having a robust web presence is crucial for business success. 
                  Our web development services combine cutting-edge technologies with industry best practices 
                  to deliver applications that not only meet your current needs but scale with your growth.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Whether you need a simple corporate website, a complex e-commerce platform, or a custom 
                  web application, our team of experienced developers has the expertise to bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/contact" className="flex items-center">
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                    <Link href="/contact">Schedule Consultation</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {technologies.slice(0, 8).map((tech, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-sm font-semibold text-slate-900">{tech.name}</div>
                        <div className="text-xs text-slate-500">{tech.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Web Development Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Comprehensive web development solutions tailored to your business requirements, 
                from simple websites to complex enterprise applications.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="group bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="p-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 mb-4">{service.title}</CardTitle>
                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-slate-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Our Web Development Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                We deliver web solutions that combine technical excellence with business value, 
                ensuring your digital presence drives real results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Technologies We Work With
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                We stay current with the latest web technologies and frameworks to deliver 
                modern, efficient, and scalable web applications.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm font-semibold text-slate-900 mb-1">{tech.name}</div>
                  <div className="text-xs text-slate-500">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Build Your Web Solution?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Let's discuss your web development needs and create a solution that drives your business forward. 
              Contact our team today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
