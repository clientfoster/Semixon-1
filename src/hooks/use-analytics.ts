'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsService } from '@/lib/analytics';

export function useAnalytics() {
  const pathname = usePathname();

  const trackPageView = useCallback((page: string, title: string, sessionId: string, userId?: string) => {
    analyticsService.trackPageView(page, title, sessionId, userId);
  }, []);

  const trackEvent = useCallback((
    eventType: 'page_view' | 'click' | 'scroll' | 'form_submit' | 'download' | 'custom',
    eventName: string,
    page: string,
    sessionId: string,
    userId?: string,
    properties?: Record<string, any>
  ) => {
    analyticsService.trackEvent(eventType, eventName, page, sessionId, userId, properties);
  }, []);

  const trackClick = useCallback((element: string, page: string, sessionId: string, userId?: string) => {
    analyticsService.trackEvent('click', `click_${element}`, page, sessionId, userId, {
      element,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackFormSubmit = useCallback((formName: string, page: string, sessionId: string, userId?: string) => {
    analyticsService.trackEvent('form_submit', `form_submit_${formName}`, page, sessionId, userId, {
      formName,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackDownload = useCallback((fileName: string, page: string, sessionId: string, userId?: string) => {
    analyticsService.trackEvent('download', `download_${fileName}`, page, sessionId, userId, {
      fileName,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackClick,
    trackFormSubmit,
    trackDownload,
  };
}

export function usePageTracking() {
  const pathname = usePathname();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Generate or get session ID
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }

    // Track page view
    const title = document.title || pathname;
    trackPageView(pathname, title, sessionId);

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackPageView(pathname, title, sessionId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        analyticsService.trackEvent('scroll', 'scroll_depth', pathname, sessionId, undefined, {
          scrollDepth: maxScrollDepth,
          timestamp: new Date().toISOString(),
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track clicks on important elements
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const element = target.tagName.toLowerCase();
      const className = target.className;
      const id = target.id;
      
      // Track clicks on buttons, links, and forms
      if (['button', 'a', 'input', 'select', 'textarea'].includes(element)) {
        analyticsService.trackEvent('click', 'element_click', pathname, sessionId, undefined, {
          element,
          className,
          id,
          text: target.textContent?.slice(0, 50),
          timestamp: new Date().toISOString(),
        });
      }
    };

    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, trackPageView]);
}

export function useSessionTracking() {
  useEffect(() => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }

    // Track session start
    analyticsService.updateSession(sessionId, window.location.pathname);

    // Track session end when page unloads
    const handleBeforeUnload = () => {
      analyticsService.endSession(sessionId);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Update session activity every 30 seconds
    const activityInterval = setInterval(() => {
      analyticsService.updateSession(sessionId, window.location.pathname);
    }, 30000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(activityInterval);
      analyticsService.endSession(sessionId);
    };
  }, []);
}
