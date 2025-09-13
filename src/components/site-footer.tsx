'use client';

import Link from 'next/link';
import { Logo } from './icons';
import { usePathname } from 'next/navigation';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
             <Link href="/" className="flex items-center space-x-3 group mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Logo className="h-6 w-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">Semixion</span>
             </Link>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              Engineering the future of semiconductors through innovation, excellence, and cutting-edge technology solutions that power tomorrow's innovations.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer group">
                <span className="text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">f</span>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer group">
                <span className="text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">t</span>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer group">
                <span className="text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">in</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                About Us
              </Link></li>
              <li><Link href="/team" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Our Team
              </Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Contact
              </Link></li>
              <li><Link href="/ai-copy-suggester" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                AI Assistant
              </Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Services
              </Link></li>
              <li><Link href="/products" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Products
              </Link></li>
              <li><Link href="/industries" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Industries
              </Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-base">
              &copy; {currentYear} Semixion. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors duration-300 text-base">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-slate-400 hover:text-white transition-colors duration-300 text-base">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
