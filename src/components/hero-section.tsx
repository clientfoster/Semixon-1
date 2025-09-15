'use client';

import { Button } from '@/components/ui/button';
import { LazyImage } from '@/components/lazy-image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

const getImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find(img => img.id === id);
};

export function HeroSection() {
  const heroImage = getImage('hero');

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {heroImage && (
        <LazyImage
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          dataAiHint={heroImage.imageHint}
        />
      )}
      
      {/* Professional overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/50 to-slate-800/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[70vh] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-8 animate-fade-in-up">
              <span className="inline-flex items-center px-4 py-2 bg-blue-600/10 backdrop-blur-sm border border-blue-400/20 rounded-full text-blue-200 text-sm font-medium">
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
  );
}

