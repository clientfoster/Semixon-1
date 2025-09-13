
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Cloud, Zap, Target, TrendingUp, Shield, Settings } from 'lucide-react';

const capabilities = [
  {
    title: 'Cloud Architecture Design',
    description: 'Scalable and secure cloud infrastructure design and implementation',
    icon: Cloud,
    features: ['Multi-cloud strategies', 'Microservices architecture', 'Container orchestration', 'Serverless computing']
  },
  {
    title: 'Migration Services',
    description: 'Seamless migration from on-premises to cloud environments',
    icon: Zap,
    features: ['Application migration', 'Data migration', 'Database migration', 'Legacy system modernization']
  },
  {
    title: 'DevOps & Automation',
    description: 'CI/CD pipelines and infrastructure automation solutions',
    icon: Settings,
    features: ['CI/CD pipelines', 'Infrastructure as Code', 'Automated testing', 'Monitoring & alerting']
  },
  {
    title: 'Cloud Security',
    description: 'Comprehensive security solutions for cloud environments',
    icon: Shield,
    features: ['Identity & access management', 'Data encryption', 'Security monitoring', 'Compliance management']
  }
];

const benefits = [
  {
    title: 'Scalability',
    description: 'Elastic and scalable infrastructure that grows with your business',
    icon: TrendingUp
  },
  {
    title: 'Cost Optimization',
    description: 'Optimized cloud costs without compromising performance',
    icon: Target
  },
  {
    title: 'Reliability',
    description: 'High availability and disaster recovery solutions',
    icon: Shield
  }
];

export default function CloudArchitecturePage() {
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
              Cloud Architecture &
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                Engineering
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We design and build scalable, secure, and resilient cloud infrastructure on AWS, Google Cloud, and Azure, enabling you to innovate faster and operate more efficiently.
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
                  Scalable
                  <span className="block text-purple-600">Cloud Solutions</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Our cloud architecture expertise enables you to build resilient, scalable, and cost-effective cloud infrastructure that supports your business growth and innovation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Multi-cloud and hybrid cloud strategies</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Container orchestration and serverless computing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">DevOps automation and infrastructure as code</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Cloud className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">200+</h3>
                      <p className="text-slate-600">Cloud Projects</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Uptime</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">50%</h3>
                      <p className="text-slate-600">Cost Reduction</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">3x</h3>
                      <p className="text-slate-600">Faster Deployment</p>
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
                Our Cloud Capabilities
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From cloud architecture design to migration services, we deliver comprehensive cloud solutions that enable your digital transformation.
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
                <span className="block text-purple-600">Cloud Services</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our proven track record and deep expertise in cloud architecture make us the preferred partner for companies worldwide.
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
                Ready to Scale?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build Your
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                Cloud Infrastructure
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to transform your infrastructure? Our team of expert cloud architects is here to help you achieve your cloud goals.
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
