'use client';

import { useEffect } from 'react';
import { usePerformanceOptimization } from '@/hooks/use-performance';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
import { cookieManager } from '@/lib/cookies';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const { isOptimized } = usePerformanceOptimization();

  useEffect(() => {
    // Set cache version for cache busting
    const cacheVersion = process.env.NEXT_PUBLIC_CACHE_VERSION || '1.0.0';
    cookieManager.setCacheVersion(cacheVersion);

    // Initialize user preferences if not set
    const preferences = cookieManager.getUserPreferences();
    if (!preferences.theme) {
      cookieManager.setUserPreferences({
        theme: 'system',
        language: 'en',
        reducedMotion: false,
      });
    }

    // Preload critical resources
    const preloadResources = () => {
      const criticalResources = [
        { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
        { href: '/css/critical.css', as: 'style' },
      ];
      
      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) {
          link.type = resource.type;
        }
        if (resource.as === 'font') {
          link.setAttribute('crossorigin', 'anonymous');
        }
        document.head.appendChild(link);
      });
    };

    preloadResources();

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Add error handling
        img.onerror = () => {
          img.style.display = 'none';
        };
      });
    };

    optimizeImages();

    // Track performance metrics
    const trackPerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstPaint: 0,
            firstContentfulPaint: 0,
          };

          // Get paint metrics
          const paintEntries = performance.getEntriesByType('paint');
          paintEntries.forEach(entry => {
            if (entry.name === 'first-paint') {
              metrics.firstPaint = entry.startTime;
            } else if (entry.name === 'first-contentful-paint') {
              metrics.firstContentfulPaint = entry.startTime;
            }
          });

          // Store metrics in cookies
          cookieManager.setCookie('performanceMetrics', JSON.stringify(metrics), {
            expires: 1,
            path: '/',
          });
        }
      }
    };

    // Track performance after page load
    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
    }

    return () => {
      window.removeEventListener('load', trackPerformance);
    };
  }, []);

  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  );
}
