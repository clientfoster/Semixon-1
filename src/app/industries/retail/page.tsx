import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Smartphone, ShoppingCart, BarChart3, Shield, Target, TrendingUp } from 'lucide-react';

const services = [
  {
    title: 'E-commerce Platforms',
    description: 'Modern online shopping platforms and mobile commerce solutions',
    icon: Smartphone,
    features: ['Mobile commerce apps', 'Online storefronts', 'Payment integration', 'Inventory management']
  },
  {
    title: 'Point of Sale Systems',
    description: 'Advanced POS systems and payment processing solutions',
    icon: ShoppingCart,
    features: ['Cloud-based POS', 'Payment processing', 'Inventory tracking', 'Customer management']
  },
  {
    title: 'Retail Analytics',
    description: 'Data-driven insights and business intelligence for retail operations',
    icon: BarChart3,
    features: ['Sales analytics', 'Customer behavior analysis', 'Inventory optimization', 'Performance metrics']
  },
  {
    title: 'Security & Fraud Prevention',
    description: 'Comprehensive security solutions for retail operations',
    icon: Shield,
    features: ['Payment security', 'Fraud detection', 'Data protection', 'Compliance management']
  }
];

const benefits = [
  {
    title: 'Increased Sales',
    description: 'Boost revenue with optimized customer experience and targeted marketing',
    icon: TrendingUp
  },
  {
    title: 'Operational Efficiency',
    description: 'Streamline operations and reduce costs with automated solutions',
    icon: Target
  },
  {
    title: 'Customer Satisfaction',
    description: 'Enhance customer experience with seamless digital solutions',
    icon: Smartphone
  }
];

export default function RetailIndustryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-orange-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-full text-orange-200 text-sm font-medium">
                Retail Industry
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Revolutionizing
              <span className="block bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">
                Retail Technology
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We provide cutting-edge technology solutions for retail businesses, enabling digital transformation, enhanced customer experiences, and optimized operations.
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
                  Retail Digital
                  <span className="block text-orange-600">Transformation</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  The retail industry is rapidly evolving with e-commerce, omnichannel experiences, and data-driven insights reshaping how businesses connect with customers and manage operations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Omnichannel commerce and unified customer experiences</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Advanced analytics and personalization technologies</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Supply chain optimization and inventory management</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">1000+</h3>
                      <p className="text-slate-600">E-commerce Sites</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">40%</h3>
                      <p className="text-slate-600">Sales Increase</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">60%</h3>
                      <p className="text-slate-600">Cost Reduction</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">99.9%</h3>
                      <p className="text-slate-600">Uptime</p>
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
                Our Retail Solutions
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From e-commerce platforms to analytics solutions, we provide comprehensive technology that transforms retail operations and drives growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.title} className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6">
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
                            <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
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
                <span className="block text-orange-600">Retail Solutions</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our deep understanding of retail operations and proven track record make us the preferred partner for retail businesses worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-full text-orange-200 text-sm font-medium">
                Ready to Transform Retail?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Build the Future of
              <span className="block bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">
                Retail Technology
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to revolutionize your retail operations? Our team of expert engineers is here to help you achieve your vision and stay ahead of the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
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