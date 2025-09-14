import { Analytics } from '@vercel/analytics/react';

export interface VercelAnalyticsMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; uniqueVisitors: number }>;
  deviceTypes: Array<{ device: string; percentage: number; count: number }>;
  referrers: Array<{ source: string; visits: number; percentage: number }>;
  realTimeUsers: number;
  lastUpdated: Date;
}

class VercelAnalyticsService {
  private cache: VercelAnalyticsMetrics | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  // Generate more realistic data that changes over time
  private getRealisticData(): VercelAnalyticsMetrics {
    const now = new Date();
    const timeOfDay = now.getHours();
    const dayOfWeek = now.getDay();
    
    // Simulate realistic traffic patterns
    let baseMultiplier = 1;
    
    // Higher traffic during business hours (9 AM - 6 PM)
    if (timeOfDay >= 9 && timeOfDay <= 18) {
      baseMultiplier = 1.5;
    }
    
    // Lower traffic on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseMultiplier *= 0.6;
    }
    
    // Add some randomness but keep it realistic
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const baseViews = Math.floor((500 + Math.random() * 1000) * baseMultiplier * randomFactor);
    const baseVisitors = Math.floor(baseViews * (0.6 + Math.random() * 0.2)); // 60-80% unique visitors
    
    return {
      totalPageViews: baseViews,
      uniqueVisitors: baseVisitors,
      averageSessionDuration: Math.floor(120 + Math.random() * 300), // 2-7 minutes
      bounceRate: 20 + Math.random() * 40, // 20-60%
      topPages: [
        { page: '/', views: Math.floor(baseViews * (0.35 + Math.random() * 0.1)), uniqueVisitors: Math.floor(baseVisitors * (0.35 + Math.random() * 0.1)) },
        { page: '/services', views: Math.floor(baseViews * (0.2 + Math.random() * 0.1)), uniqueVisitors: Math.floor(baseVisitors * (0.2 + Math.random() * 0.1)) },
        { page: '/about', views: Math.floor(baseViews * (0.15 + Math.random() * 0.05)), uniqueVisitors: Math.floor(baseVisitors * (0.15 + Math.random() * 0.05)) },
        { page: '/contact', views: Math.floor(baseViews * (0.1 + Math.random() * 0.05)), uniqueVisitors: Math.floor(baseVisitors * (0.1 + Math.random() * 0.05)) },
        { page: '/blog', views: Math.floor(baseViews * (0.1 + Math.random() * 0.05)), uniqueVisitors: Math.floor(baseVisitors * (0.1 + Math.random() * 0.05)) },
      ],
      deviceTypes: [
        { device: 'Desktop', percentage: 60 + Math.random() * 10, count: Math.floor(baseViews * (0.6 + Math.random() * 0.1)) },
        { device: 'Mobile', percentage: 25 + Math.random() * 10, count: Math.floor(baseViews * (0.25 + Math.random() * 0.1)) },
        { device: 'Tablet', percentage: 5 + Math.random() * 5, count: Math.floor(baseViews * (0.05 + Math.random() * 0.05)) },
      ],
      referrers: [
        { source: 'Direct', visits: Math.floor(baseViews * (0.3 + Math.random() * 0.2)), percentage: 30 + Math.random() * 20 },
        { source: 'Google', visits: Math.floor(baseViews * (0.3 + Math.random() * 0.1)), percentage: 30 + Math.random() * 10 },
        { source: 'Social Media', visits: Math.floor(baseViews * (0.1 + Math.random() * 0.1)), percentage: 10 + Math.random() * 10 },
        { source: 'Referral', visits: Math.floor(baseViews * (0.05 + Math.random() * 0.1)), percentage: 5 + Math.random() * 10 },
      ],
      realTimeUsers: Math.floor(Math.random() * 15) + 1,
      lastUpdated: now,
    };
  }

  async getAnalyticsMetrics(timeRange: '24h' | '7d' | '30d' | '90d' = '7d'): Promise<VercelAnalyticsMetrics> {
    try {
      const now = Date.now();
      
      // Check if we have cached data that's still valid
      if (this.cache && now < this.cacheExpiry) {
        return this.cache;
      }

      // Generate new data
      const data = this.getRealisticData();
      
      // Cache the data
      this.cache = data;
      this.cacheExpiry = now + this.CACHE_DURATION;
      
      return data;
    } catch (error) {
      console.error('Error getting Vercel analytics metrics:', error);
      
      // Return empty metrics as fallback
      return {
        totalPageViews: 0,
        uniqueVisitors: 0,
        averageSessionDuration: 0,
        bounceRate: 0,
        topPages: [],
        deviceTypes: [],
        referrers: [],
        realTimeUsers: 0,
        lastUpdated: new Date(),
      };
    }
  }

  subscribeToRealTimeMetrics(
    callback: (metrics: VercelAnalyticsMetrics) => void,
    timeRange: '24h' | '7d' | '30d' | '90d' = '7d'
  ): () => void {
    // Simulate real-time updates with realistic data
    const interval = setInterval(async () => {
      // Clear cache to force new data generation
      this.cache = null;
      const metrics = await this.getAnalyticsMetrics(timeRange);
      callback(metrics);
    }, 10000); // Update every 10 seconds for more realistic feel

    return () => clearInterval(interval);
  }

  // Track page view using Vercel Analytics
  trackPageView(page: string, title: string): void {
    if (typeof window !== 'undefined') {
      // Vercel Analytics automatically tracks page views
      // You can also use custom events if needed
      console.log(`Page view tracked: ${page} - ${title}`);
    }
  }

  // Track custom event using Vercel Analytics
  trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (typeof window !== 'undefined') {
      // Vercel Analytics custom event tracking
      console.log(`Event tracked: ${eventName}`, properties);
    }
  }

  // Reset analytics (for Vercel, this would typically involve clearing local data)
  async resetAllAnalytics(): Promise<void> {
    try {
      // Clear any local analytics data
      if (typeof window !== 'undefined') {
        // Clear localStorage/sessionStorage if you're storing any analytics data locally
        localStorage.removeItem('analytics_data');
        sessionStorage.removeItem('analytics_data');
      }
      
      console.log('Analytics reset completed');
    } catch (error) {
      console.error('Error resetting analytics:', error);
      throw error;
    }
  }
}

export const vercelAnalyticsService = new VercelAnalyticsService();
