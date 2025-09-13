import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Wifi, Cpu, Shield, BarChart3, Target, TrendingUp } from 'lucide-react';

const services = [
  {
    title: '5G Network Infrastructure',
    description: 'Advanced 5G network design, deployment, and optimization solutions',
    icon: Wifi,
    features: ['5G core network', 'RAN optimization', 'Network slicing', 'Edge computing']
  },
  {
    title: 'IoT & Connected Devices',
    description: 'Comprehensive IoT solutions and device management platforms',
    icon: Cpu,
    features: ['Device connectivity', 'Data management', 'Real-time monitoring', 'Predictive maintenance']
  },
  {
    title: 'Network Security',
    description: 'Advanced cybersecurity solutions for telecommunications networks',
    icon: Shield,
    features: ['Threat detection', 'Network monitoring', 'Data protection', 'Compliance management']
  },
  {
    title: 'Network Analytics',
    description: 'Data-driven insights and performance optimization for networks',
    icon: BarChart3,
    features: ['Performance monitoring', 'Traffic analysis', 'Capacity planning', 'Quality assurance']
  }
];

const benefits = [
  {
    title: 'Enhanced Performance',
    description: 'Optimize network performance and reduce latency with advanced solutions',
    icon: TrendingUp
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Build networks that can scale with growing demand and new technologies',
    icon: Target
  },
  {
    title: 'Future-Ready Technology',
    description: 'Implement cutting-edge solutions that are ready for tomorrow\'s challenges',
    icon: Wifi
  }
];

export default function TelecomIndustryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-indigo-600/20 backdrop-blur-sm border border-indigo-400/30 rounded-full text-indigo-200 text-sm font-medium">
                Telecom & Network Industry
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Connecting the World with
              <span className="block bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 bg-clip-text text-transparent">
                Advanced Networks
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We provide cutting-edge telecommunications and networking solutions, enabling 5G deployment, IoT connectivity, and next-generation network infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Telecommunications
                  <span className="block text-indigo-600">Innovation</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  The telecommunications industry is at the forefront of digital transformation with 5G, IoT, and edge computing reshaping how we connect and communicate.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">5G network infrastructure and edge computing solutions</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">IoT connectivity and device management platforms</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Advanced network security and monitoring solutions</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Wifi className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">1000+</h3>
                      <p className="text-slate-600">Networks Deployed</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">50%</h3>
                      <p className="text-slate-600">Faster Deployment</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Reliability</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">100%</h3>
                      <p className="text-slate-600">Security</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Telecom Solutions
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From 5G infrastructure to IoT connectivity, we provide comprehensive telecommunications solutions that enable next-generation networks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.title} className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                        {service.title}
                      </CardTitle>
                      <p className="text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-slate-600">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
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
                Why Choose Us for
                <span className="block text-indigo-600">Telecom Solutions</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our deep understanding of telecommunications and proven track record make us the preferred partner for telecom companies worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-indigo-600/20 backdrop-blur-sm border border-indigo-400/30 rounded-full text-indigo-200 text-sm font-medium">
                Ready to Transform Telecom?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build the Future of
              <span className="block bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 bg-clip-text text-transparent">
                Telecommunications
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to revolutionize your telecommunications infrastructure? Our team of expert engineers is here to help you achieve your vision and stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/services" className="flex items-center">
                  View Our Services
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