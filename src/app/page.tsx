import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/lazy-image';
import { HeroSection } from '@/components/hero-section';
import { MobileOptimizedServices, MobileOptimizedIndustries } from '@/components/mobile-optimized-sections';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Summary */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
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
                At Semixon, we are pioneers in semiconductor technology. Our mission is to drive innovation and deliver excellence through our state-of-the-art products and expert engineering services. We are committed to building a sustainable future with technology that empowers progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/about" className="flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                  <Link href="/about#team-section">Our Team</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <LazyImage
                  src="/about.jpeg"
                  alt="A team of engineers collaborating in a modern office"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  quality={85}
                  placeholder="blur"
                  dataAiHint="engineers collaborating"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Section */}
      <MobileOptimizedServices />

      {/* Industries We Serve */}
      <MobileOptimizedIndustries />


      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium">
                Ready to Transform Your Vision?
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Innovate With Us?
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
              Let's discuss how Semixon can help you achieve your technological goals. 
              Get in touch with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Link href="/contact">Contact Our Experts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

    