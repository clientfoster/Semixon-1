import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PenTool, FileText, Search, Users, Target, BookOpen, Globe } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Content Writing Services | Semixion',
  description: 'Professional content writing services including technical writing, blog posts, web content, and marketing copy for semiconductor and engineering companies.',
  keywords: [
    'content writing',
    'technical writing',
    'blog writing',
    'web content',
    'marketing copy',
    'SEO content',
    'copywriting',
    'content marketing'
  ],
};

const services = [
  {
    icon: FileText,
    title: 'Technical Writing',
    description: 'Clear, accurate technical documentation and content for complex engineering and semiconductor topics.',
    features: ['Technical Documentation', 'User Manuals', 'API Documentation', 'Process Guides', 'Technical Blog Posts']
  },
  {
    icon: BookOpen,
    title: 'Blog Content',
    description: 'Engaging blog posts that establish thought leadership and drive organic traffic to your website.',
    features: ['Industry Insights', 'Technical Articles', 'Case Studies', 'How-To Guides', 'News & Updates']
  },
  {
    icon: Globe,
    title: 'Web Content',
    description: 'Compelling website copy that converts visitors into customers and improves your search rankings.',
    features: ['Homepage Copy', 'Service Pages', 'About Pages', 'Product Descriptions', 'Landing Pages']
  },
  {
    icon: Target,
    title: 'Marketing Copy',
    description: 'Persuasive marketing materials that drive engagement and generate leads for your business.',
    features: ['Email Campaigns', 'Social Media Posts', 'Ad Copy', 'Sales Materials', 'Press Releases']
  }
];

const contentTypes = [
  {
    icon: PenTool,
    title: 'SEO-Optimized Content',
    description: 'Content that ranks well in search engines and drives organic traffic to your website.'
  },
  {
    icon: Users,
    title: 'Audience-Focused',
    description: 'Content tailored to your specific target audience and their needs.'
  },
  {
    icon: Search,
    title: 'Research-Driven',
    description: 'Well-researched content that provides value and establishes credibility.'
  },
  {
    icon: FileText,
    title: 'Professional Quality',
    description: 'High-quality writing that reflects your brand\'s professionalism and expertise.'
  }
];

const industries = [
  'Semiconductor Technology',
  'Engineering Services',
  'Manufacturing',
  'B2B Technology',
  'Professional Services',
  'Technical Consulting'
];

export default function ContentWritingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-4 py-2 text-sm font-medium">
                Content Writing Services
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Professional <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">Content Writing</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
              High-quality content that engages your audience, drives traffic, and converts visitors into customers. 
              Specialized writing services for semiconductor and engineering companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">Get Free Quote</Link>
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
                  Content That Converts and Engages
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Great content is the foundation of successful digital marketing. Our professional writers 
                  understand the technical nature of your industry and can translate complex concepts into 
                  engaging, accessible content that resonates with your target audience.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Whether you need technical documentation, marketing copy, or thought leadership content, 
                  we deliver high-quality writing that drives results and builds your brand authority.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/contact" className="flex items-center">
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                    <Link href="/contact">View Portfolio</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Industries We Write For</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {industries.map((industry, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <div className="text-sm font-semibold text-slate-900">{industry}</div>
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
                Our Content Writing Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Comprehensive content writing solutions designed to engage your audience, 
                improve your SEO, and drive business growth.
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

      {/* Content Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Our Content Writing
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                We deliver content that not only looks great but also drives real business results 
                through strategic writing and SEO optimization.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contentTypes.map((type, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                    <type.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{type.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{type.description}</p>
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
              Ready to Create Amazing Content?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Let's work together to create content that engages your audience and drives your business forward. 
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
                <Link href="/contact">Get Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
