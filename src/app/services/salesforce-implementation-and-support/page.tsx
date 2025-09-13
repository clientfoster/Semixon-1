
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Zap, Target, TrendingUp, Shield, Settings } from 'lucide-react';

const capabilities = [
  {
    title: 'Salesforce Implementation',
    description: 'Complete Salesforce platform implementation from discovery to go-live',
    icon: Users,
    features: ['Sales Cloud setup', 'Service Cloud configuration', 'Marketing Cloud integration', 'Custom app development']
  },
  {
    title: 'Custom Development',
    description: 'Custom Salesforce applications and components development',
    icon: Settings,
    features: ['Apex development', 'Lightning Web Components', 'Visualforce pages', 'Custom objects & fields']
  },
  {
    title: 'Data Migration & Integration',
    description: 'Seamless data migration and third-party system integration',
    icon: Zap,
    features: ['Data migration', 'API integrations', 'Third-party connectors', 'Data cleansing']
  },
  {
    title: 'Managed Services',
    description: 'Ongoing Salesforce administration and support services',
    icon: Shield,
    features: ['User management', 'Security configuration', 'Performance optimization', 'Training & support']
  }
];

const benefits = [
  {
    title: 'Increased Productivity',
    description: 'Streamlined processes and automated workflows for better efficiency',
    icon: TrendingUp
  },
  {
    title: 'Better Customer Insights',
    description: '360-degree customer view with integrated data and analytics',
    icon: Target
  },
  {
    title: 'Scalable Solutions',
    description: 'Flexible platform that grows with your business needs',
    icon: Shield
  }
];

export default function SalesforceImplementationPage() {
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
              Salesforce Implementation
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                & Support
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We help you unlock the full potential of the Salesforce platform with expert implementation, customization, and ongoing support services tailored to your business needs.
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
                  Maximizing Your
                  <span className="block text-purple-600">CRM Investment</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Our certified Salesforce consultants help you transform your sales, service, and marketing operations with customized solutions that drive efficiency and provide a 360-degree view of your customers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Complete platform implementation and customization</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Custom development and third-party integrations</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-slate-600">Ongoing support and optimization services</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">150+</h3>
                      <p className="text-slate-600">Implementations</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">98%</h3>
                      <p className="text-slate-600">User Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">40%</h3>
                      <p className="text-slate-600">Efficiency Gain</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <TrendingUp className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">2x</h3>
                      <p className="text-slate-600">ROI Improvement</p>
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
                Our Salesforce Capabilities
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                From implementation to ongoing support, we deliver comprehensive Salesforce solutions that maximize your CRM investment.
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
                <span className="block text-purple-600">Salesforce Services</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Our proven track record and deep expertise in Salesforce make us the preferred partner for companies worldwide.
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
                Ready to Transform?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let's Maximize Your
              <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                Salesforce Investment
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Ready to unlock the full potential of Salesforce? Our team of certified consultants is here to help you achieve your CRM goals.
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
