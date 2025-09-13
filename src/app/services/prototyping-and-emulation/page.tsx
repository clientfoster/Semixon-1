
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Cpu, Zap, Settings, Target, TrendingUp, Shield, Clock } from 'lucide-react';

const capabilities = [
  {
    title: 'FPGA Prototyping',
    description: 'High-speed FPGA-based prototyping solutions',
    icon: Cpu,
    features: ['Custom FPGA board design', 'Off-the-shelf FPGA solutions', 'High-speed prototype creation', 'Real-time validation capabilities']
  },
  {
    title: 'Hardware Emulation',
    description: 'Advanced hardware emulation platforms',
    icon: Zap,
    features: ['Palladium and Zebu platforms', 'Maximum capacity emulation', 'Enhanced debug visibility', 'High-performance validation']
  },
  {
    title: 'Virtual Prototyping',
    description: 'Transaction-level modeling and simulation',
    icon: Settings,
    features: ['Transaction-Level Models (TLM)', 'Early software development', 'Architectural exploration', 'System-level modeling']
  },
  {
    title: 'System Integration',
    description: 'End-to-end system validation',
    icon: Target,
    features: ['Real-world peripheral testing', 'Interface validation', 'Software-hardware integration', 'Performance optimization']
  }
];

const benefits = [
  {
    title: 'Shift-Left Development',
    description: 'Start software development up to 12 months earlier',
    icon: TrendingUp
  },
  {
    title: 'Faster Bug Detection',
    description: 'Uncover complex bugs impossible to find in simulation',
    icon: Target
  },
  {
    title: 'Risk Reduction',
    description: 'High confidence in design before tape-out',
    icon: Shield
  }
];

export default function PrototypingEmulationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                Pre-Silicon Validation Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Prototyping and
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Emulation
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Accelerate your software development and system-level validation with our advanced FPGA-based prototyping and emulation services, enabling early bug detection and massive verification speed-up.
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
                  Pre-Silicon Validation
                  <span className="block text-blue-600">at Speed</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Software simulation is too slow for comprehensive system-level testing. Our prototyping and emulation solutions allow you to run real-world software and firmware on your design months before silicon is available.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">At-speed or near-at-speed validation capabilities</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Early hardware/software integration bug detection</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Large-scale FPGA and hardware emulator mapping</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Cpu className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">1000x</h3>
                      <p className="text-slate-600">Faster Than Simulation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">12</h3>
                      <p className="text-slate-600">Months Earlier</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">50+</h3>
                      <p className="text-slate-600">Projects Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">100%</h3>
                      <p className="text-slate-600">Success Rate</p>
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
                Our Prototyping & Emulation Capabilities
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From FPGA prototyping to virtual modeling, we provide comprehensive pre-silicon validation solutions that accelerate your development timeline.
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
                <span className="block text-blue-600">Prototyping Services</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our advanced prototyping and emulation solutions enable faster development cycles and reduce project risk through early validation.
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
                Ready to Prototype?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Accelerate Your
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                Development Timeline
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to accelerate your software development with advanced prototyping? Our emulation experts are here to help you validate your design early and reduce project risk.
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
