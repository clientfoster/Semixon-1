
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, Lock, Eye, Settings, Target, TrendingUp, Clock } from 'lucide-react';

const capabilities = [
  {
    title: 'Secure Boot & Firmware Updates',
    description: 'Cryptographic chain-of-trust implementation',
    icon: Lock,
    features: ['Authentic firmware validation', 'Cryptographic signatures', 'Secure update mechanisms', 'Tamper detection']
  },
  {
    title: 'Hardware Security Integration',
    description: 'Hardware-based security solutions',
    icon: Shield,
    features: ['Hardware Security Modules (HSMs)', 'Trusted Execution Environments (TEEs)', 'TrustZone implementation', 'Secure enclaves']
  },
  {
    title: 'Threat Modeling & Penetration Testing',
    description: 'Proactive security assessment',
    icon: Eye,
    features: ['Vulnerability assessment', 'Penetration testing', 'Risk analysis', 'Security recommendations']
  },
  {
    title: 'System Hardening',
    description: 'Attack surface reduction',
    icon: Settings,
    features: ['Service hardening', 'Access control policies', 'Secure configurations', 'Compliance frameworks']
  }
];

const benefits = [
  {
    title: 'Defense in Depth',
    description: 'Multi-layered security architecture',
    icon: Shield
  },
  {
    title: 'Proactive Security',
    description: 'Built-in security from the ground up',
    icon: Eye
  },
  {
    title: 'Compliance Ready',
    description: 'Meet industry security standards',
    icon: Target
  }
];

export default function CyberSecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                Security Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Embedded
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Cyber Security
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We help you build secure embedded systems from the ground up, protecting your devices, your data, and your customers from emerging threats.
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
                  Security
                  <span className="block text-blue-600">by Design</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  In an increasingly connected world, security cannot be an afterthought. Our embedded security experts work with you throughout the product lifecycle to identify threats and implement robust countermeasures.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Defense-in-depth strategy across all system layers</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Hardware, firmware, and software level protection</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Proactive threat identification and mitigation</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">100+</h3>
                      <p className="text-slate-600">Security Audits</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Security Score</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">50+</h3>
                      <p className="text-slate-600">Threat Models</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Target className="w-8 h-8 text-white" />
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
                Our Security Capabilities
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From secure boot implementation to comprehensive threat modeling, we provide end-to-end security solutions for embedded systems.
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
                <span className="block text-blue-600">Security Services</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our comprehensive security approach ensures your embedded systems are protected against current and emerging threats.
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
                Ready to Secure?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Secure Your
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Embedded System
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to build security into your embedded system from the ground up? Our security experts are here to help you protect your devices and data.
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
