'use client';

import { createContext, useContext, useEffect } from 'react';
import { vercelAnalyticsService } from '@/lib/vercel-analytics';

interface AnalyticsContextType {
  trackPageView: (page: string, title: string) => void;
  trackEvent: (eventName: string, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackPageView: () => {},
  trackEvent: () => {},
});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track initial page view
    if (typeof window !== 'undefined') {
      vercelAnalyticsService.trackPageView(window.location.pathname, document.title);
    }
  }, []);

  const trackPageView = (page: string, title: string) => {
    vercelAnalyticsService.trackPageView(page, title);
  };

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    vercelAnalyticsService.trackEvent(eventName, properties);
  };

  return (
    <AnalyticsContext.Provider value={{ trackPageView, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
}
