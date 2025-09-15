'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LazyImage } from '@/components/lazy-image';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck } from 'lucide-react';

export function MobileOptimizedServices() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Core Engineering Services
            </h2>
            <p className="max-w-2xl mx-auto text-base text-slate-600 leading-relaxed">
              We provide comprehensive specialized services to meet the complex needs of the semiconductor industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-200">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">IC Design</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-slate-600 leading-relaxed text-sm">
                  Custom integrated circuit design services, from concept to GDSII, delivering cutting-edge solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-200">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Wafer Fabrication</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-slate-600 leading-relaxed text-sm">
                  High-quality wafer processing using advanced process nodes for optimal performance.
                </p>
              </CardContent>
            </Card>
            <Card className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-200">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Reliability Testing</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-slate-600 leading-relaxed text-sm">
                  Comprehensive testing and qualification services with industry-leading standards.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
              <Link href="/services" className="flex items-center">
                Explore All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MobileOptimizedIndustries() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                Industries We Serve
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powering Innovation Across Industries
            </h2>
            <p className="max-w-2xl mx-auto text-base text-slate-600 leading-relaxed">
              Our semiconductor solutions drive technological advancement across diverse industries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Automotive', icon: '🚗' },
              { name: 'BFSI', icon: '🏦' },
              { name: 'Insurance', icon: '🛡️' },
              { name: 'Retail', icon: '🛒' },
              { name: 'Semiconductor', icon: '🔬' },
              { name: 'Telecom', icon: '📡' }
            ].map((industry) => (
              <div key={industry.name} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-all duration-200 group-hover:scale-105">
                  {industry.icon}
                </div>
                <h3 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

