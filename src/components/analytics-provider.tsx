'use client';

import { createContext, useContext, useEffect } from 'react';
import { usePageTracking, useSessionTracking } from '@/hooks/use-analytics';

interface AnalyticsContextType {
  // Add any analytics context methods here if needed
}

const AnalyticsContext = createContext<AnalyticsContextType>({});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Initialize page tracking
  usePageTracking();
  
  // Initialize session tracking
  useSessionTracking();

  return (
    <AnalyticsContext.Provider value={{}}>
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
