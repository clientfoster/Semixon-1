import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, TrendingUp, Users, BarChart3, Search, Share2, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Marketing Services | Semixon',
  description: 'Comprehensive digital marketing services including SEO, social media marketing, PPC advertising, and content marketing for semiconductor and engineering companies.',
  keywords: [
    'digital marketing',
    'SEO services',
    'social media marketing',
    'PPC advertising',
    'content marketing',
    'online marketing',
    'marketing strategy',
    'lead generation'
  ],
};

const services = [
  {
    icon: Search,
    title: 'Search Engine Optimization (SEO)',
    description: 'Improve your website\'s visibility in search results and drive organic traffic to your business.',
    features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Local SEO', 'Link Building']
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Build your brand presence across social platforms and engage with your target audience.',
    features: ['Content Strategy', 'Community Management', 'Paid Social Ads', 'Influencer Marketing', 'Analytics & Reporting']
  },
  {
    icon: Target,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Drive immediate traffic and leads through targeted online advertising campaigns.',
    features: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Campaign Optimization', 'Conversion Tracking']
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Nurture leads and retain customers through strategic email marketing campaigns.',
    features: ['Email Automation', 'List Building', 'A/B Testing', 'Personalization', 'Performance Analytics']
  }
];

const strategies = [
  {
    icon: BarChart3,
    title: 'Data-Driven Approach',
    description: 'We use analytics and data insights to optimize your marketing campaigns for maximum ROI.'
  },
  {
    icon: Users,
    title: 'Targeted Audience',
    description: 'Precise targeting ensures your marketing efforts reach the right people at the right time.'
  },
  {
    icon: TrendingUp,
    title: 'Measurable Results',
    description: 'Track and measure every aspect of your digital marketing performance with detailed reporting.'
  },
  {
    icon: Target,
    title: 'ROI Focused',
    description: 'Every strategy is designed to deliver measurable returns on your marketing investment.'
  }
];

const industries = [
  'Semiconductor Companies',
  'Engineering Firms',
  'Technology Startups',
  'Manufacturing',
  'B2B Services',
  'Professional Services'
];

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-4 py-2 text-sm font-medium">
                Digital Marketing Services
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Grow Your Business with <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">Digital Marketing</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Drive more leads, increase brand awareness, and boost your online presence with our comprehensive 
              digital marketing services tailored for semiconductor and engineering companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Campaign
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">Free Marketing Audit</Link>
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
                  Strategic Digital Marketing for Tech Companies
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  In today's competitive digital landscape, having a strong online presence is crucial for business growth. 
                  Our digital marketing services are specifically designed for semiconductor and engineering companies, 
                  helping you reach your target audience and generate qualified leads.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  We understand the unique challenges of marketing technical products and services. Our team combines 
                  industry expertise with proven digital marketing strategies to deliver measurable results that drive 
                  your business forward.
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
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Industries We Serve</h3>
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
                Our Digital Marketing Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Comprehensive digital marketing solutions designed to increase your online visibility, 
                generate leads, and drive business growth.
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

      {/* Strategy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Marketing Approach
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                We use proven strategies and cutting-edge tools to deliver digital marketing 
                campaigns that drive real business results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {strategies.map((strategy, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                    <strategy.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{strategy.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{strategy.description}</p>
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Let's create a digital marketing strategy that drives real results for your business. 
              Contact our team today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Campaign
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">Get Free Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
