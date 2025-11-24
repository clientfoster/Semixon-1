'use client';

import Link from 'next/link';
import { Logo } from './icons';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github, Mail, ExternalLink } from 'lucide-react';
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
            <div className="flex space-x-3">
              {/* Facebook Button */}
              {settings.facebookUrl && (
                <button
                  onClick={() => window.open(settings.facebookUrl, '_blank')}
                  className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-blue-600 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-600/25"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </button>
              )}

              {/* Twitter Button */}
              {settings.twitterUrl && (
                <button
                  onClick={() => window.open(settings.twitterUrl, '_blank')}
                  className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-blue-400 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </button>
              )}

              {/* LinkedIn Button */}
              {settings.linkedinUrl && (
                <button
                  onClick={() => window.open(settings.linkedinUrl, '_blank')}
                  className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-blue-700 rounded-lg border border-slate-700 hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-700/25"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </button>
              )}

              {/* Instagram Button */}
              {settings.instagramUrl && (
                <button
                  onClick={() => window.open(settings.instagramUrl, '_blank')}
                  className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-pink-600 rounded-lg border border-slate-700 hover:border-pink-500 transition-all duration-300 shadow-lg hover:shadow-pink-600/25"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </button>
              )}

              {/* YouTube Button */}
              {settings.youtubeUrl && (
                <button
                  onClick={() => window.open(settings.youtubeUrl, '_blank')}
                  className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-red-600 rounded-lg border border-slate-700 hover:border-red-500 transition-all duration-300 shadow-lg hover:shadow-red-600/25"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </button>
              )}

              {/* GitHub Button */}
              {settings.githubUrl && (
                <button
                  onClick={() => window.open(settings.githubUrl, '_blank')}
                  className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-gray-700 rounded-lg border border-slate-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-gray-700/25"
                  aria-label="Check out our GitHub"
                >
                  <Github className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                </button>
              )}

              {/* Email Button */}
              <button
                onClick={() => window.open(`mailto:${settings.email}`, '_blank')}
                className="group flex items-center justify-center w-11 h-11 bg-slate-800 hover:bg-green-600 rounded-lg border border-slate-700 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-green-600/25"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
              </button>
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
                onClick={() => window.open('https://semixon.com', '_blank')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 underline decoration-blue-400 hover:decoration-blue-300 underline-offset-2 hover:underline-offset-4"
                aria-label="Visit Semixon Technologies website"
              >
                Semixon Technologies Web Services
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
