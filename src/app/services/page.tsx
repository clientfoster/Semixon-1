import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cpu, Code, Database, Shield, Zap, Settings, Target, Star, Clock } from 'lucide-react';
import { generateMetadata as generateMeta } from '@/lib/meta-utils';

const serviceCategories = [
  {
    name: 'Semiconductors',
    icon: Cpu,
    description: 'Advanced semiconductor design and development services',
    color: 'from-blue-500 to-blue-700',
    count: 9,
    features: ['IC Design', 'Testing', 'Verification', 'Fabrication']
  },
  {
    name: 'Embedded',
    icon: Settings,
    description: 'Embedded systems engineering and optimization',
    color: 'from-green-500 to-green-700',
    count: 8,
    features: ['Firmware', 'Drivers', 'Security', 'Optimization']
  },
  {
    name: 'Software',
    icon: Code,
    description: 'Software development and digital solutions',
    color: 'from-purple-500 to-purple-700',
    count: 8,
    features: ['Web Development', 'Cloud', 'AI/ML', 'Analytics']
  },
  {
    name: 'Digital Marketing',
    icon: Target,
    description: 'Digital marketing and branding services',
    color: 'from-orange-500 to-orange-700',
    count: 4,
    features: ['SEO', 'Content', 'Design', 'Quick Services']
  }
];


const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We analyze your requirements and create a detailed project plan tailored to your needs.'
  },
  {
    step: '02',
    title: 'Design & Development',
    description: 'Our expert team designs and develops solutions using cutting-edge technologies and best practices.'
  },
  {
    step: '03',
    title: 'Testing & Quality Assurance',
    description: 'Rigorous testing ensures your solution meets the highest quality standards and performance requirements.'
  },
  {
    step: '04',
    title: 'Deployment & Support',
    description: 'We deploy your solution and provide ongoing support to ensure continued success and optimization.'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Semiconductors': return Cpu;
    case 'Embedded': return Settings;
    case 'Software': return Code;
    case 'Digital Marketing': return Target;
    default: return Database;
  }
};

export const metadata: Metadata = generateMeta({
  title: 'Semiconductor Engineering Services',
  description: 'Comprehensive semiconductor engineering services including IC design, wafer fabrication, reliability testing, embedded systems, and software development. Expert solutions for your semiconductor needs.',
  keywords: [
    'semiconductor services',
    'IC design services',
    'wafer fabrication',
    'reliability testing',
    'embedded systems',
    'software development',
    'engineering solutions',
    'ASIC design',
    'FPGA design',
    'mixed signal design'
  ],
  url: '/services',
  type: 'website',
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute inset-0 animate-float" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8 animate-fade-in-up">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-6 py-3 text-base font-medium animate-glow-pulse">
                <Star className="w-4 h-4 mr-2 animate-bounce-gentle" />
                Comprehensive Engineering Solutions
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up animation-delay-200">
              Engineering Excellence
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent animate-gradient-x">
                Redefined
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
              From semiconductor design to digital marketing, we deliver comprehensive solutions that drive innovation, 
              accelerate growth, and ensure your success in today's competitive market.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-600">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 micro-hover micro-press">
                <Link href="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-xl font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 micro-hover micro-press">
                <Link href="#services" className="flex items-center">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Service Categories */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Service Categories
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
                We offer comprehensive solutions across four key areas, each designed to meet the unique challenges 
                of modern technology development and business growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {serviceCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={category.name} className={`group bg-white border border-slate-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden animate-fade-in-up animation-delay-${(index + 1) * 200}`}>
                    <CardHeader className="text-center pb-6 pt-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-all duration-500 shadow-lg animate-glow-pulse`}>
                        <IconComponent className="w-10 h-10 text-white group-hover:animate-wiggle" />
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <Badge className="bg-slate-100 text-slate-700 px-3 py-1 text-sm font-semibold micro-hover">
                          {category.count} Services
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                      </CardTitle>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {category.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-300 text-slate-600 micro-hover micro-glow">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-24">
              {serviceCategories.map((category) => {
                const IconComponent = getCategoryIcon(category.name);
                const categoryServices = services.filter(service => service.category === category.name);
                
                return (
                  <div key={category.name} className="scroll-mt-24">
                    <div className="text-center mb-16">
                      <div className={`w-24 h-24 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl`}>
                        <IconComponent className="w-12 h-12 text-white" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {category.name} Services
                      </h2>
                      <p className="text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1 max-w-32"></div>
                        <Badge className="bg-slate-100 text-slate-700 px-4 py-2 text-sm font-semibold">
                          {categoryServices.length} Services Available
                        </Badge>
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1 max-w-32"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryServices.map((service, index) => (
                        <Card key={service.id} className="group bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <Badge variant="outline" className="text-xs border-slate-300 text-slate-500">
                                #{String(index + 1).padStart(2, '0')}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                              {service.description}
                            </p>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                              <Link href={service.href} className="flex items-center justify-center">
                                Learn More
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Process
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                We follow a proven methodology that ensures successful project delivery and maximum value for your investment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500 shadow-xl">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-slate-300 transform translate-x-4"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-6 py-3 text-base font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Ready to Get Started?
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build Something
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Extraordinary Together
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Ready to transform your ideas into reality? Our team of expert engineers and digital specialists 
              is here to help you achieve your goals with cutting-edge technology and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Get a Free Quote
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 text-xl font-semibold rounded-xl backdrop-blur-sm transition-all duration-300">
                <Link href="/about" className="flex items-center">
                  Learn About Us
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}