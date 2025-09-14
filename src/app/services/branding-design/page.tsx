import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Palette, PenTool, Image, Layers, Target, Users, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Branding & Design Services | Semixion',
  description: 'Professional branding and design services including logo design, brand identity, graphic design, and visual communication for semiconductor and engineering companies.',
  keywords: [
    'branding design',
    'logo design',
    'brand identity',
    'graphic design',
    'visual design',
    'brand strategy',
    'marketing materials',
    'corporate identity'
  ],
};

const services = [
  {
    icon: PenTool,
    title: 'Logo Design',
    description: 'Memorable and professional logos that represent your brand and make a lasting impression.',
    features: ['Brand Analysis', 'Concept Development', 'Multiple Variations', 'File Formats', 'Brand Guidelines']
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Complete brand identity packages including colors, typography, and visual guidelines.',
    features: ['Color Palette', 'Typography System', 'Brand Guidelines', 'Style Guide', 'Brand Assets']
  },
  {
    icon: Image,
    title: 'Graphic Design',
    description: 'Professional graphic design for marketing materials, presentations, and digital assets.',
    features: ['Marketing Materials', 'Business Cards', 'Brochures', 'Presentations', 'Digital Graphics']
  },
  {
    icon: Layers,
    title: 'Visual Communication',
    description: 'Clear and effective visual communication that conveys your message and engages your audience.',
    features: ['Infographics', 'Data Visualization', 'Icon Design', 'Illustrations', 'Visual Storytelling']
  }
];

const designTypes = [
  {
    icon: Target,
    title: 'Strategic Design',
    description: 'Design solutions that align with your business goals and target audience.'
  },
  {
    icon: Users,
    title: 'User-Focused',
    description: 'Designs that resonate with your target audience and drive engagement.'
  },
  {
    icon: Zap,
    title: 'Modern & Professional',
    description: 'Contemporary design that reflects your brand\'s professionalism and innovation.'
  },
  {
    icon: PenTool,
    title: 'Custom Solutions',
    description: 'Tailored design solutions that are unique to your brand and industry.'
  }
];

const deliverables = [
  'Logo Design & Variations',
  'Brand Color Palette',
  'Typography Guidelines',
  'Business Card Design',
  'Letterhead & Stationery',
  'Marketing Brochures',
  'Social Media Graphics',
  'Presentation Templates',
  'Website Design Elements',
  'Brand Style Guide'
];

export default function BrandingDesignPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-blue-600/20 text-blue-200 border-blue-400/30 px-4 py-2 text-sm font-medium">
                Branding & Design Services
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Professional <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">Branding & Design</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Create a strong visual identity that sets your business apart. Professional branding and design 
              services that build trust, recognition, and engagement with your target audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Brand
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">View Portfolio</Link>
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
                  Build a Strong Visual Identity
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Your brand is more than just a logo – it's the visual representation of your company's values, 
                  mission, and personality. Our design team creates cohesive brand identities that resonate with 
                  your target audience and differentiate you from competitors.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  From logo design to complete brand guidelines, we help you establish a professional visual 
                  presence that builds trust and drives business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/contact" className="flex items-center">
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                    <Link href="/contact">Free Brand Audit</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Design Deliverables</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {deliverables.slice(0, 6).map((deliverable, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <div className="text-sm font-semibold text-slate-900">{deliverable}</div>
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
                Our Design Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                Comprehensive branding and design solutions that create a cohesive visual identity 
                and strengthen your brand presence.
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

      {/* Design Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Our Design Approach
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                We combine creativity with strategy to deliver design solutions that not only look great 
                but also drive business results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designTypes.map((type, index) => (
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
              Ready to Build Your Brand?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Let's create a visual identity that represents your brand and drives your business forward. 
              Contact our design team today to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact" className="flex items-center">
                  Start Your Brand
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/contact">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
