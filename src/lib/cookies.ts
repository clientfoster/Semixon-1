/**
 * Cookie utility functions for performance optimization and user experience
 */

export interface CookieOptions {
  expires?: Date | number;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export interface PerformanceCookies {
  cacheVersion: string;
  lastVisit: string;
  pageLoadTime: number;
  userPreferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    reducedMotion: boolean;
  };
  analytics: {
    sessionId: string;
    pageViews: number;
    lastActivity: string;
  };
}

export class CookieManager {
  private static instance: CookieManager;
  private cookieConsent: boolean | null = null;

  private constructor() {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      this.cookieConsent = this.getCookie('cookieConsent') === 'true';
    }
  }

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  /**
   * Set a cookie with options
   */
  public setCookie(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof window === 'undefined') return;
    
    if (!this.hasConsent() && !this.isEssentialCookie(name)) {
      return;
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
    }

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    if (options.httpOnly) {
      cookieString += '; httponly';
    }

    document.cookie = cookieString;
  }

  /**
   * Get a cookie value
   */
  public getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null;
    
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  }

  /**
   * Delete a cookie
   */
  public deleteCookie(name: string, path: string = '/'): void {
    this.setCookie(name, '', {
      expires: new Date(0),
      path,
    });
  }

  /**
   * Check if user has given cookie consent
   */
  public hasConsent(): boolean {
    return this.cookieConsent === true;
  }

  /**
   * Set cookie consent
   */
  public setConsent(consent: boolean): void {
    this.cookieConsent = consent;
    this.setCookie('cookieConsent', consent.toString(), {
      expires: 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
  }

  /**
   * Check if cookie is essential (doesn't require consent)
   */
  private isEssentialCookie(name: string): boolean {
    const essentialCookies = [
      'cookieConsent',
      'sessionId',
      'csrfToken',
      'userPreferences',
      'cacheVersion',
    ];
    return essentialCookies.includes(name);
  }

  /**
   * Performance optimization methods
   */
  public setCacheVersion(version: string): void {
    this.setCookie('cacheVersion', version, {
      expires: 365,
      path: '/',
      sameSite: 'lax',
    });
  }

  public getCacheVersion(): string | null {
    return this.getCookie('cacheVersion');
  }

  public setLastVisit(): void {
    this.setCookie('lastVisit', new Date().toISOString(), {
      expires: 30,
      path: '/',
      sameSite: 'lax',
    });
  }

  public getLastVisit(): Date | null {
    const lastVisit = this.getCookie('lastVisit');
    return lastVisit ? new Date(lastVisit) : null;
  }

  public setPageLoadTime(loadTime: number): void {
    this.setCookie('pageLoadTime', loadTime.toString(), {
      expires: 1,
      path: '/',
      sameSite: 'lax',
    });
  }

  public getPageLoadTime(): number | null {
    const loadTime = this.getCookie('pageLoadTime');
    return loadTime ? parseFloat(loadTime) : null;
  }

  /**
   * User preferences
   */
  public setUserPreferences(preferences: Partial<PerformanceCookies['userPreferences']>): void {
    const current = this.getUserPreferences();
    const updated = { ...current, ...preferences };
    
    this.setCookie('userPreferences', JSON.stringify(updated), {
      expires: 365,
      path: '/',
      sameSite: 'lax',
    });
  }

  public getUserPreferences(): PerformanceCookies['userPreferences'] {
    const preferences = this.getCookie('userPreferences');
    if (preferences) {
      try {
        return JSON.parse(preferences);
      } catch {
        // Return defaults if parsing fails
      }
    }
    
    return {
      theme: 'system',
      language: 'en',
      reducedMotion: false,
    };
  }

  /**
   * Analytics cookies
   */
  public setAnalyticsData(data: Partial<PerformanceCookies['analytics']>): void {
    if (!this.hasConsent()) return;

    const current = this.getAnalyticsData();
    const updated = { ...current, ...data };
    
    this.setCookie('analytics', JSON.stringify(updated), {
      expires: 30,
      path: '/',
      sameSite: 'lax',
    });
  }

  public getAnalyticsData(): PerformanceCookies['analytics'] {
    const analytics = this.getCookie('analytics');
    if (analytics) {
      try {
        return JSON.parse(analytics);
      } catch {
        // Return defaults if parsing fails
      }
    }
    
    return {
      sessionId: this.generateSessionId(),
      pageViews: 0,
      lastActivity: new Date().toISOString(),
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Performance monitoring
   */
  public trackPageView(): void {
    if (!this.hasConsent()) return;

    const analytics = this.getAnalyticsData();
    analytics.pageViews += 1;
    analytics.lastActivity = new Date().toISOString();
    
    this.setAnalyticsData(analytics);
  }

  public trackPerformance(metrics: {
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint?: number;
  }): void {
    if (!this.hasConsent()) return;

    const performanceData = {
      loadTime: metrics.loadTime,
      domContentLoaded: metrics.domContentLoaded,
      firstContentfulPaint: metrics.firstContentfulPaint,
      timestamp: new Date().toISOString(),
    };

    this.setCookie('performanceMetrics', JSON.stringify(performanceData), {
      expires: 1,
      path: '/',
      sameSite: 'lax',
    });
  }

  /**
   * Cache management
   */
  public setCachedData(key: string, data: any, ttl: number = 3600): void {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000, // Convert to milliseconds
    };

    this.setCookie(`cache_${key}`, JSON.stringify(cacheData), {
      expires: new Date(Date.now() + ttl * 1000),
      path: '/',
      sameSite: 'lax',
    });
  }

  public getCachedData(key: string): any | null {
    const cached = this.getCookie(`cache_${key}`);
    if (!cached) return null;

    try {
      const cacheData = JSON.parse(cached);
      const now = Date.now();
      
      if (now - cacheData.timestamp > cacheData.ttl) {
        this.deleteCookie(`cache_${key}`);
        return null;
      }
      
      return cacheData.data;
    } catch {
      return null;
    }
  }

  /**
   * Clear all non-essential cookies
   */
  public clearNonEssentialCookies(): void {
    if (typeof window === 'undefined') return;
    
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (!this.isEssentialCookie(name)) {
        this.deleteCookie(name);
      }
    });
  }

  /**
   * Get all cookies as an object
   */
  public getAllCookies(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    
    const cookies: Record<string, string> = {};
    const cookieArray = document.cookie.split(';');

    cookieArray.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });

    return cookies;
  }
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance();

// Performance optimization hooks
export const usePerformanceOptimization = () => {
  const optimizeImages = () => {
    if (typeof window === 'undefined') return;
    
    const lastOptimization = cookieManager.getCookie('lastImageOptimization');
    const now = Date.now();
    
    if (!lastOptimization || now - parseInt(lastOptimization) > 24 * 60 * 60 * 1000) {
      // Optimize images based on user preferences
      const preferences = cookieManager.getUserPreferences();
      
      if (preferences.reducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
      }
      
      cookieManager.setCookie('lastImageOptimization', now.toString(), {
        expires: 1,
        path: '/',
      });
    }
  };

  const preloadCriticalResources = () => {
    if (typeof window === 'undefined') return;
    
    const preloaded = cookieManager.getCookie('criticalResourcesPreloaded');
    
    if (!preloaded) {
      // Preload critical CSS and fonts
      const criticalResources = [
        '/fonts/inter.woff2',
        '/css/critical.css',
      ];
      
      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'font';
        if (resource.endsWith('.woff2')) {
          link.setAttribute('crossorigin', 'anonymous');
        }
        document.head.appendChild(link);
      });
      
      cookieManager.setCookie('criticalResourcesPreloaded', 'true', {
        expires: 7,
        path: '/',
      });
    }
  };

  return {
    optimizeImages,
    preloadCriticalResources,
  };
};
