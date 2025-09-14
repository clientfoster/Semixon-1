'use client';

import { useEffect, useCallback, useState } from 'react';
import { cookieManager } from '@/lib/cookies';

export function usePerformanceOptimization() {
  const [isOptimized, setIsOptimized] = useState(false);

  // Track page load performance
  const trackPageLoad = useCallback(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    
    const trackLoad = () => {
      const loadTime = performance.now() - startTime;
      cookieManager.setPageLoadTime(loadTime);
      
      // Track performance metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      cookieManager.trackPerformance({
        loadTime,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: fcp ? fcp.startTime : undefined,
      });
    };

    if (document.readyState === 'complete') {
      trackLoad();
    } else {
      window.addEventListener('load', trackLoad);
    }

    return () => {
      window.removeEventListener('load', trackLoad);
    };
  }, []);

  // Optimize images based on user preferences
  const optimizeImages = useCallback(() => {
    const preferences = cookieManager.getUserPreferences();
    
    if (preferences.reducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    }

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const preloaded = cookieManager.getCookie('criticalResourcesPreloaded');
    
    if (!preloaded) {
      const criticalResources = [
        { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
        { href: '/css/critical.css', as: 'style' },
        { href: '/api/team', as: 'fetch' },
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
      
      cookieManager.setCookie('criticalResourcesPreloaded', 'true', {
        expires: 7,
        path: '/',
      });
    }
  }, []);

  // Cache API responses
  const cacheApiResponse = useCallback(async (url: string, data: any, ttl: number = 3600) => {
    if (cookieManager.hasConsent()) {
      cookieManager.setCachedData(`api_${url}`, data, ttl);
    }
  }, []);

  const getCachedApiResponse = useCallback((url: string) => {
    return cookieManager.getCachedData(`api_${url}`);
  }, []);

  // Track user interactions
  const trackInteraction = useCallback((action: string, element: string) => {
    if (!cookieManager.hasConsent()) return;

    const interactions = JSON.parse(cookieManager.getCookie('userInteractions') || '[]');
    interactions.push({
      action,
      element,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 100 interactions
    if (interactions.length > 100) {
      interactions.splice(0, interactions.length - 100);
    }

    cookieManager.setCookie('userInteractions', JSON.stringify(interactions), {
      expires: 7,
      path: '/',
    });
  }, []);

  // Optimize theme loading
  const optimizeTheme = useCallback(() => {
    const preferences = cookieManager.getUserPreferences();
    const savedTheme = cookieManager.getCookie('theme');
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (preferences.theme !== 'system') {
      document.documentElement.setAttribute('data-theme', preferences.theme);
    }
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    const cleanup = trackPageLoad();
    optimizeImages();
    preloadCriticalResources();
    optimizeTheme();
    
    setIsOptimized(true);
    
    return cleanup;
  }, [trackPageLoad, optimizeImages, preloadCriticalResources, optimizeTheme]);

  // Track page views
  useEffect(() => {
    if (cookieManager.hasConsent()) {
      cookieManager.trackPageView();
      cookieManager.setLastVisit();
    }
  }, []);

  return {
    isOptimized,
    trackInteraction,
    cacheApiResponse,
    getCachedApiResponse,
    optimizeImages,
    preloadCriticalResources,
  };
}

export function useCachedData<T>(key: string, fetcher: () => Promise<T>, ttl: number = 3600) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Try to get cached data first
        const cached = cookieManager.getCachedData(key);
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }

        // Fetch fresh data
        const freshData = await fetcher();
        setData(freshData);
        
        // Cache the data
        cookieManager.cacheApiResponse(key, freshData, ttl);
        
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, fetcher, ttl]);

  return { data, loading, error };
}

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (!cookieManager.hasConsent()) return;

    const analytics = cookieManager.getAnalyticsData();
    const events = JSON.parse(cookieManager.getCookie('analyticsEvents') || '[]');
    
    events.push({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: analytics.sessionId,
    });

    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }

    cookieManager.setCookie('analyticsEvents', JSON.stringify(events), {
      expires: 30,
      path: '/',
    });
  }, []);

  const trackPageView = useCallback((page: string) => {
    if (!cookieManager.hasConsent()) return;

    cookieManager.trackPageView();
    trackEvent('page_view', { page });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
  };
}
