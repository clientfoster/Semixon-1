import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Car, Cpu, Shield, Zap, Target, TrendingUp } from 'lucide-react';

const services = [
  {
    title: 'ADAS & Autonomous Driving',
    description: 'Advanced driver assistance systems and autonomous vehicle technology',
    icon: Car,
    features: ['Sensor fusion', 'Computer vision', 'Machine learning', 'Safety systems']
  },
  {
    title: 'Connected Vehicle Solutions',
    description: 'IoT and connectivity solutions for modern vehicles',
    icon: Cpu,
    features: ['V2X communication', 'Telematics', 'Infotainment systems', 'OTA updates']
  },
  {
    title: 'Electric Vehicle Technology',
    description: 'Power management and battery systems for electric vehicles',
    icon: Zap,
    features: ['Battery management', 'Power electronics', 'Charging systems', 'Energy optimization']
  },
  {
    title: 'Safety & Security',
    description: 'Comprehensive safety and cybersecurity solutions',
    icon: Shield,
    features: ['Functional safety', 'Cybersecurity', 'Risk assessment', 'Compliance']
  }
];

const benefits = [
  {
    title: 'Faster Innovation',
    description: 'Accelerate your automotive technology development with our proven methodologies',
    icon: TrendingUp
  },
  {
    title: 'Safety First',
    description: 'Ensure the highest safety standards with our comprehensive safety engineering',
    icon: Shield
  },
  {
    title: 'Future-Ready',
    description: 'Build solutions that are ready for the future of mobility',
    icon: Target
  }
];

export default function AutomotiveIndustryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full text-red-200 text-sm font-medium">
                Automotive Industry
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Driving the Future of
              <span className="block bg-gradient-to-r from-red-400 via-red-300 to-red-200 bg-clip-text text-transparent">
                Mobility
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We provide cutting-edge automotive solutions for connected vehicles, autonomous driving, and electric mobility, enabling the next generation of transportation.
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
                  Automotive Innovation
                  <span className="block text-red-600">at Scale</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  The automotive industry is undergoing a massive transformation with electric vehicles, autonomous driving, and connected car technologies. Our expertise spans the entire automotive value chain.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Electric vehicle technology and battery management systems</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Advanced driver assistance systems and autonomous driving</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Connected vehicle solutions and V2X communication</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Car className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">100+</h3>
                      <p className="text-slate-600">Vehicles Enhanced</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">40%</h3>
                      <p className="text-slate-600">Faster Development</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">50%</h3>
                      <p className="text-slate-600">Energy Efficiency</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Safety Rating</p>
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
                Our Automotive Services
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From electric vehicles to autonomous driving, we provide comprehensive automotive solutions that accelerate innovation and ensure safety.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.title} className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
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
                            <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
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
                <span className="block text-red-600">Automotive Solutions</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our deep automotive expertise and proven track record make us the preferred partner for automotive companies worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full text-red-200 text-sm font-medium">
                Ready to Transform Mobility?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build the Future of
              <span className="block bg-gradient-to-r from-red-400 via-red-300 to-red-200 bg-clip-text text-transparent">
                Transportation
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to revolutionize the automotive industry? Our team of expert engineers is here to help you achieve your vision and stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
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