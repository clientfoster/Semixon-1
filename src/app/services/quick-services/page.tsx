import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, DollarSign, Star, CheckCircle, Zap, Users, Target } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quick Services - Affordable Fiverr-style Gigs | Semixion',
  description: 'Affordable quick services including logo design, copywriting, video editing, and more. Fast delivery, professional quality, and budget-friendly pricing.',
  keywords: [
    'quick services',
    'affordable design',
    'logo design',
    'copywriting',
    'video editing',
    'fiverr style',
    'budget services',
    'fast delivery'
  ],
};

const quickServices = [
  {
    title: 'Logo Design',
    price: '$50',
    delivery: '3 days',
    description: 'Professional logo design with 3 concepts and unlimited revisions.',
    features: ['3 Logo Concepts', 'Unlimited Revisions', 'High-Resolution Files', 'Source Files', 'Brand Guidelines'],
    popular: true
  },
  {
    title: 'Copywriting',
    price: '$30',
    delivery: '2 days',
    description: 'Engaging copy for your website, marketing materials, or social media.',
    features: ['500 Words', 'SEO Optimized', '2 Revisions', 'Multiple Formats', 'Call-to-Action'],
    popular: false
  },
  {
    title: 'Video Editing',
    price: '$75',
    delivery: '5 days',
    description: 'Professional video editing with transitions, effects, and color correction.',
    features: ['Up to 5 Minutes', 'Transitions & Effects', 'Color Correction', 'Audio Sync', 'Multiple Formats'],
    popular: true
  },
  {
    title: 'Social Media Graphics',
    price: '$25',
    delivery: '2 days',
    description: 'Eye-catching graphics for your social media posts and stories.',
    features: ['5 Graphics', 'Custom Sizes', 'High Resolution', 'Source Files', 'Brand Colors'],
    popular: false
  },
  {
    title: 'Business Card Design',
    price: '$35',
    delivery: '2 days',
    description: 'Professional business card design with front and back layouts.',
    features: ['Front & Back Design', 'Print-Ready Files', '3 Concepts', 'Unlimited Revisions', 'Multiple Formats'],
    popular: false
  },
  {
    title: 'Website Content',
    price: '$60',
    delivery: '4 days',
    description: 'Complete website content including homepage, about, and service pages.',
    features: ['5 Pages', 'SEO Optimized', 'Call-to-Actions', '2 Revisions', 'Content Strategy'],
    popular: true
  }
];

const benefits = [
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Quick turnaround times to meet your urgent project needs.'
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Budget-friendly services without compromising on quality.'
  },
  {
    icon: Star,
    title: 'Professional Quality',
    description: 'High-quality work delivered by experienced professionals.'
  },
  {
    icon: CheckCircle,
    title: 'Satisfaction Guaranteed',
    description: 'Unlimited revisions until you\'re completely satisfied.'
  }
];

const process = [
  {
    step: '1',
    title: 'Choose Your Service',
    description: 'Select from our range of quick services and place your order.'
  },
  {
    step: '2',
    title: 'Provide Details',
    description: 'Share your requirements, brand guidelines, and any specific preferences.'
  },
  {
    step: '3',
    title: 'Review & Revise',
    description: 'Review the initial work and request revisions if needed.'
  },
  {
    step: '4',
    title: 'Get Final Files',
    description: 'Receive your final files in all required formats.'
  }
];

export default function QuickServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-4 py-2 text-sm font-medium">
                Quick Services
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Affordable <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">Quick Services</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Get professional work done quickly and affordably. Our Fiverr-style gigs offer fast delivery, 
              high quality, and budget-friendly pricing for all your design and content needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="#services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Our Quick Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Fast, affordable, and professional services that deliver exactly what you need, when you need it.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Quick Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Professional services delivered quickly and affordably. Choose from our range of popular gigs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickServices.map((service, index) => (
                <Card key={index} className={`group bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">{service.price}</div>
                        <div className="text-sm text-slate-500">Delivery: {service.delivery}</div>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href="/contact" className="flex items-center justify-center">
                        Order Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                How It Works
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Simple, straightforward process to get your project completed quickly and professionally.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Choose your service, place your order, and get professional work delivered quickly. 
              Contact us today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">Ask Questions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
