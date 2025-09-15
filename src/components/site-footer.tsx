'use client';

import Link from 'next/link';
import { Logo } from './icons';
import { usePathname } from 'next/navigation';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { CookieSettingsButton } from '@/components/cookie-consent-banner';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { settings, getFormattedAddress, getCompanyName } = useSiteSettings();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
             <Link href="/" className="flex items-center space-x-3 group mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Logo className="h-6 w-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{settings.siteName}</span>
             </Link>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
              {settings.siteDescription}
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
              <li><Link href="/about#team-section" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Our Team
              </Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Contact
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
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-slate-300 text-base">
                <span className="font-semibold">Phone:</span><br />
                {settings.phone}
              </li>
              <li className="text-slate-300 text-base">
                <span className="font-semibold">Email:</span><br />
                {settings.email}
              </li>
              <li className="text-slate-300 text-base">
                <span className="font-semibold">Address:</span><br />
                {getFormattedAddress()}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Privacy Policy
              </Link></li>
              <li><Link href="/terms-of-service" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Terms of Service
              </Link></li>
              <li><Link href="/sitemap" className="text-slate-300 hover:text-white transition-colors duration-300 text-base">
                Sitemap
              </Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-slate-400 text-base">
                &copy; {currentYear} {getCompanyName()}. All rights reserved.
              </p>
              <CookieSettingsButton />
            </div>
            <p className="text-slate-400 text-sm">
              Site developed by{' '}
              <button
                onClick={() => window.open('https://anandverse.space', '_blank')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 underline decoration-blue-400 hover:decoration-blue-300 underline-offset-2 hover:underline-offset-4"
                aria-label="Visit AnansVerse Web Services website"
              >
                AnansVerse Web Services
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
