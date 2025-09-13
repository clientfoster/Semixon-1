import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { services } from '@/lib/data';

const getImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find(img => img.id === id);
};

export default function Home() {
  const heroImage = getImage('hero');
  const aboutImage = getImage('about-summary');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-30"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        
        {/* Professional overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-800/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center min-h-[70vh] py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="mb-8 animate-fade-in-up">
                <span className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  Innovation in Every Circuit
                </span>
              </div>
              
              {/* Main Headline */}
              <div className="mb-8 animate-fade-in-up delay-200">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-4">
                  Engineering the
                  <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                    Future of Semiconductors
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <div className="mb-12 animate-fade-in-up delay-400">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Semixion delivers cutting-edge solutions and products for the most demanding technological challenges, 
                  powering innovation across industries worldwide with precision and excellence.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-600">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/services" className="flex items-center">
                    Explore Our Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                  <Link href="/contact" className="flex items-center">
                    Get In Touch
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-slate-400 text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-slate-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    About Us
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  Pioneering Semiconductor Excellence
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  At Semixion, we are pioneers in semiconductor technology. Our mission is to drive innovation and deliver excellence through our state-of-the-art products and expert engineering services. We are committed to building a sustainable future with technology that empowers progress.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <Link href="/about" className="flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                    <Link href="/team">Our Team</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  {aboutImage && (
                    <Image
                      src={aboutImage.imageUrl}
                      alt={aboutImage.description}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      data-ai-hint={aboutImage.imageHint}
                    />
                  )}
                </div>
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-slate-900">15+</div>
                  <div className="text-sm text-slate-600 font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  Our Services
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Core Engineering Services
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                We provide a comprehensive range of specialized services to meet the complex needs of the semiconductor industry, 
                from design to production with unmatched precision and innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <Cpu className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">IC Design</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 leading-relaxed">
                    Custom integrated circuit design services, from concept to GDSII, delivering cutting-edge solutions for your most challenging requirements with precision and innovation.
                  </p>
                </CardContent>
              </Card>
              <Card className="group bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Wafer Fabrication</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 leading-relaxed">
                    High-quality wafer processing and fabrication using advanced process nodes, ensuring optimal performance and reliability for your most demanding applications.
                  </p>
                </CardContent>
              </Card>
              <Card className="group bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900">Reliability Testing</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-slate-600 leading-relaxed">
                    Comprehensive testing and qualification services to ensure product longevity and performance under extreme conditions with industry-leading standards.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/services" className="flex items-center">
                  Explore All Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
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
                Ready to Transform Your Vision?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Innovate With Us?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Let's discuss how Semixion can help you achieve your technological goals. 
              Get in touch with our experts today and discover the future of semiconductor technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/contact">Contact Our Experts</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg backdrop-blur-sm transition-all duration-300">
                <Link href="/ai-copy-suggester">AI Content Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    