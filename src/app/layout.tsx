import type { Metadata } from 'next';
import './globals-optimized.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { MaintenanceBanner } from '@/components/maintenance-banner';
import { PerformanceProvider } from '@/components/performance-provider';
import { PerformanceMonitor } from '@/components/performance-monitor';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: {
    default: 'Semixon - Leading Semiconductor Engineering Solutions',
    template: '%s | Semixon'
  },
  description: 'Semixon delivers cutting-edge semiconductor engineering solutions, IC design, wafer fabrication, and reliability testing services. Powering innovation across industries worldwide with precision and excellence.',
  keywords: [
    'semiconductor engineering',
    'IC design',
    'wafer fabrication',
    'reliability testing',
    'semiconductor solutions',
    'engineering services',
    'chip design',
    'semiconductor manufacturing',
    'ASIC design',
    'FPGA design',
    'mixed signal design',
    'analog design',
    'digital design'
  ],
  authors: [{ name: 'Semixon Team' }],
  creator: 'Semixon',
  publisher: 'Semixon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://Semixon.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://Semixon.com',
    title: 'Semixon - Leading Semiconductor Engineering Solutions',
    description: 'Semixon delivers cutting-edge semiconductor engineering solutions, IC design, wafer fabrication, and reliability testing services. Powering innovation across industries worldwide.',
    siteName: 'Semixon',
    images: [
      {
        url: '/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Semixon - Semiconductor Engineering Excellence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semixon - Leading Semiconductor Engineering Solutions',
    description: 'Semixon delivers cutting-edge semiconductor engineering solutions, IC design, wafer fabrication, and reliability testing services.',
    images: ['/hero.jpeg'],
    creator: '@Semixon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </noscript>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1870924429992767" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Semixon",
              "description": "Leading semiconductor engineering solutions provider specializing in IC design, wafer fabrication, and reliability testing services.",
              "url": "https://Semixon.com",
              "logo": "https://Semixon.com/logo.png",
              "image": "https://Semixon.com/hero.jpeg",
              "foundingDate": "2024",
              "industry": "Semiconductor Engineering",
              "services": [
                "IC Design",
                "Wafer Fabrication", 
                "Reliability Testing",
                "ASIC Design",
                "FPGA Design",
                "Mixed Signal Design",
                "Analog Design",
                "Digital Design"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://Semixon.com/contact"
              },
              "sameAs": [
                "https://www.linkedin.com/company/Semixon",
                "https://twitter.com/Semixon"
              ]
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Force dark theme permanently
              document.documentElement.classList.add('dark');
              // Remove any theme-related localStorage entries
              if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('theme');
              }
            `,
          }}
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1M36VKSMZ2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1M36VKSMZ2');
            `,
          }}
        />
      </head>
            <body className="font-body antialiased">
              <PerformanceProvider>
                <PerformanceMonitor />
                <div className="relative flex min-h-screen flex-col bg-background">
                  <SiteHeader />
                  <MaintenanceBanner />
                  <main className="flex-1">{children}</main>
                  <SiteFooter />
                </div>
                <Toaster />
              </PerformanceProvider>
              <SpeedInsights />
              {/* Debug - Remove after testing */}
              {process.env.NODE_ENV === 'development' && (
                <script
                  dangerouslySetInnerHTML={{
                    __html: `console.log('Speed Insights & Google Analytics loaded');`
                  }}
                />
              )}
            </body>
    </html>
  );
}

    