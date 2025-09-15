'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observeWebVitals = () => {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime);
            // Send to analytics if needed
          }
        }
      }).observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        // Send to analytics if needed
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          // Send to analytics if needed
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            console.log('CLS:', (entry as any).value);
            // Send to analytics if needed
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Monitor resource loading
    const observeResources = () => {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resource = entry as PerformanceResourceTiming;
            if (resource.duration > 1000) { // Resources taking more than 1s
              console.warn('Slow resource:', resource.name, resource.duration);
            }
          }
        }
      }).observe({ entryTypes: ['resource'] });
    };

    // Monitor long tasks
    const observeLongTasks = () => {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', entry.duration);
          // Send to analytics if needed
        }
      }).observe({ entryTypes: ['longtask'] });
    };

    // Initialize monitoring
    if ('PerformanceObserver' in window) {
      observeWebVitals();
      observeResources();
      observeLongTasks();
    }

    // Monitor page load performance
    const trackPageLoad = () => {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        console.log('Page Load Metrics:', {
          loadTime,
          domContentLoaded,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
        });
      });
    };

    trackPageLoad();
  }, []);

  return null;
}

