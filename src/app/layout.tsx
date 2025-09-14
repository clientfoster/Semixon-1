import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { MaintenanceBanner } from '@/components/maintenance-banner';
import { PerformanceProvider } from '@/components/performance-provider';
import { AnalyticsProvider } from '@/components/analytics-provider';

export const metadata: Metadata = {
  title: 'Semixion',
  description: 'A professional website for a semiconductor/engineering company.',
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
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
            <body className="font-body antialiased">
              <PerformanceProvider>
                <AnalyticsProvider>
                  <div className="relative flex min-h-screen flex-col bg-background">
                    <SiteHeader />
                    <MaintenanceBanner />
                    <main className="flex-1">{children}</main>
                    <SiteFooter />
                  </div>
                  <Toaster />
                </AnalyticsProvider>
              </PerformanceProvider>
            </body>
    </html>
  );
}

    