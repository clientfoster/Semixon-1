// Google Analytics 4 (GA4) Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-1M36VKSMZ2';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for your site
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// Track user engagement
export const trackEngagement = (action: string, element?: string) => {
  trackEvent('engagement', {
    action: action,
    element: element || 'unknown',
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || 'unknown',
  });
};

// Track service page views
export const trackServiceView = (serviceName: string, category?: string) => {
  trackEvent('service_view', {
    service_name: serviceName,
    service_category: category || 'general',
  });
};

// Track contact form interactions
export const trackContactInteraction = (action: string, details?: string) => {
  trackEvent('contact_interaction', {
    action: action,
    details: details || '',
  });
};

// Track blog interactions
export const trackBlogInteraction = (action: string, postTitle?: string) => {
  trackEvent('blog_interaction', {
    action: action,
    post_title: postTitle || '',
  });
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
