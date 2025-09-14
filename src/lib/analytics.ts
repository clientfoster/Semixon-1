import { db } from './firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp,
  increment,
  Timestamp,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';

export interface PageView {
  id?: string;
  page: string;
  title: string;
  timestamp: Timestamp;
  userId?: string;
  sessionId: string;
  userAgent: string;
  referrer: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  country?: string;
  city?: string;
}

export interface UserSession {
  id?: string;
  sessionId: string;
  userId?: string;
  startTime: Timestamp;
  lastActivity: Timestamp;
  pageViews: number;
  duration: number; // in seconds
  isActive: boolean;
  entryPage: string;
  exitPage?: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  country?: string;
  city?: string;
}

export interface AnalyticsEvent {
  id?: string;
  eventType: 'page_view' | 'click' | 'scroll' | 'form_submit' | 'download' | 'custom';
  eventName: string;
  page: string;
  sessionId: string;
  userId?: string;
  timestamp: Timestamp;
  properties?: Record<string, any>;
}

export interface AnalyticsMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; uniqueVisitors: number }>;
  deviceTypes: Array<{ device: string; percentage: number; count: number }>;
  referrers: Array<{ source: string; visits: number; percentage: number }>;
  realTimeUsers: number;
  lastUpdated: Timestamp;
}

class AnalyticsService {
  private getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  private getReferrer(referrer: string): string {
    if (!referrer) return 'Direct';
    if (referrer.includes('google')) return 'Google';
    if (referrer.includes('facebook') || referrer.includes('twitter') || referrer.includes('linkedin')) return 'Social Media';
    return 'Referral';
  }

  private isAdminPage(page: string): boolean {
    // List of admin pages and patterns to exclude from analytics
    const adminPatterns = [
      '/admin',
      '/admin/',
      '/admin/analytics',
      '/admin/settings',
      '/admin/team',
      '/admin/products',
      '/admin/services',
      '/admin/industries',
      '/admin/messages',
      '/admin/blog',
      '/admin/about',
      '/super-admin',
      '/super-admin/',
    ];
    
    return adminPatterns.some(pattern => page.startsWith(pattern));
  }

  async trackPageView(page: string, title: string, sessionId: string, userId?: string): Promise<void> {
    try {
      const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
      const referrer = typeof window !== 'undefined' ? document.referrer : '';
      
      const pageView: Omit<PageView, 'id'> = {
        page,
        title,
        timestamp: serverTimestamp() as Timestamp,
        userId,
        sessionId,
        userAgent,
        referrer,
        deviceType: this.getDeviceType(userAgent),
        browser: this.getBrowser(userAgent),
      };

      await addDoc(collection(db, 'pageViews'), pageView);

      // Update or create session
      await this.updateSession(sessionId, page, userId);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  async updateSession(sessionId: string, currentPage: string, userId?: string): Promise<void> {
    try {
      const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
      const deviceType = this.getDeviceType(userAgent);
      const browser = this.getBrowser(userAgent);

      const sessionRef = doc(db, 'sessions', sessionId);
      const sessionDoc = await getDoc(sessionRef);

      if (sessionDoc.exists()) {
        // Update existing session
        await updateDoc(sessionRef, {
          lastActivity: serverTimestamp(),
          pageViews: increment(1),
          isActive: true,
          exitPage: currentPage,
        });
      } else {
        // Create new session
        const newSession: Omit<UserSession, 'id'> = {
          sessionId,
          userId,
          startTime: serverTimestamp() as Timestamp,
          lastActivity: serverTimestamp() as Timestamp,
          pageViews: 1,
          duration: 0,
          isActive: true,
          entryPage: currentPage,
          deviceType,
          browser,
        };

        await addDoc(collection(db, 'sessions'), newSession);
      }
    } catch (error) {
      console.error('Error updating session:', error);
    }
  }

  async trackEvent(
    eventType: AnalyticsEvent['eventType'],
    eventName: string,
    page: string,
    sessionId: string,
    userId?: string,
    properties?: Record<string, any>
  ): Promise<void> {
    try {
      const event: Omit<AnalyticsEvent, 'id'> = {
        eventType,
        eventName,
        page,
        sessionId,
        userId,
        timestamp: serverTimestamp() as Timestamp,
        properties,
      };

      await addDoc(collection(db, 'analyticsEvents'), event);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  async getAnalyticsMetrics(timeRange: '24h' | '7d' | '30d' | '90d' = '7d'): Promise<AnalyticsMetrics> {
    try {
      const now = new Date();
      const timeRanges = {
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
        '90d': 90 * 24 * 60 * 60 * 1000,
      };

      const startTime = new Date(now.getTime() - timeRanges[timeRange]);
      const startTimestamp = Timestamp.fromDate(startTime);

      // Get page views
      const pageViewsQuery = query(
        collection(db, 'pageViews'),
        where('timestamp', '>=', startTimestamp),
        orderBy('timestamp', 'desc')
      );
      const pageViewsSnapshot = await getDocs(pageViewsQuery);
      const pageViews = pageViewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PageView));

      // Get sessions
      const sessionsQuery = query(
        collection(db, 'sessions'),
        where('startTime', '>=', startTimestamp),
        orderBy('startTime', 'desc')
      );
      const sessionsSnapshot = await getDocs(sessionsQuery);
      const sessions = sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserSession));

      // Get active sessions (last 5 minutes) - simplified query to avoid composite index
      const activeTime = new Date(now.getTime() - 5 * 60 * 1000);
      const activeTimestamp = Timestamp.fromDate(activeTime);
      
      let activeSessions: UserSession[] = [];
      try {
        // First get all sessions with recent activity, then filter by isActive in memory
        const recentSessionsQuery = query(
          collection(db, 'sessions'),
          where('lastActivity', '>=', activeTimestamp),
          orderBy('lastActivity', 'desc')
        );
        const recentSessionsSnapshot = await getDocs(recentSessionsQuery);
        const recentSessions = recentSessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserSession));
        
        // Filter active sessions in memory to avoid composite index requirement
        activeSessions = recentSessions.filter(session => session.isActive === true);
      } catch (error) {
        console.warn('Could not fetch active sessions, using fallback:', error);
        // Fallback: estimate active users based on recent sessions
        activeSessions = sessions.filter(session => {
          const sessionTime = session.lastActivity.toMillis();
          return sessionTime > activeTime.getTime() && session.isActive;
        });
      }

      // Calculate metrics
      const totalPageViews = pageViews.length;
      const uniqueVisitors = new Set(pageViews.map(pv => pv.sessionId)).size;
      const averageSessionDuration = sessions.reduce((acc, session) => acc + session.duration, 0) / sessions.length || 0;
      
      // Calculate bounce rate (sessions with only 1 page view)
      const bounceSessions = sessions.filter(session => session.pageViews === 1).length;
      const bounceRate = sessions.length > 0 ? (bounceSessions / sessions.length) * 100 : 0;

      // Top pages
      const pageViewCounts = pageViews.reduce((acc, pv) => {
        acc[pv.page] = (acc[pv.page] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const topPages = Object.entries(pageViewCounts)
        .map(([page, views]) => ({
          page,
          views,
          uniqueVisitors: new Set(pageViews.filter(pv => pv.page === page).map(pv => pv.sessionId)).size,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      // Device types
      const deviceCounts = pageViews.reduce((acc, pv) => {
        acc[pv.deviceType] = (acc[pv.deviceType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const deviceTypes = Object.entries(deviceCounts).map(([device, count]) => ({
        device: device.charAt(0).toUpperCase() + device.slice(1),
        percentage: totalPageViews > 0 ? (count / totalPageViews) * 100 : 0,
        count,
      }));

      // Referrers
      const referrerCounts = pageViews.reduce((acc, pv) => {
        const referrer = this.getReferrer(pv.referrer);
        acc[referrer] = (acc[referrer] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const referrers = Object.entries(referrerCounts).map(([source, visits]) => ({
        source,
        visits,
        percentage: totalPageViews > 0 ? (visits / totalPageViews) * 100 : 0,
      }));

      return {
        totalPageViews,
        uniqueVisitors,
        averageSessionDuration,
        bounceRate,
        topPages,
        deviceTypes,
        referrers,
        realTimeUsers: activeSessions.length,
        lastUpdated: Timestamp.now(),
      };
    } catch (error) {
      console.error('Error getting analytics metrics:', error);
      
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
        lastUpdated: Timestamp.now(),
      };
    }
  }

  subscribeToRealTimeMetrics(
    callback: (metrics: AnalyticsMetrics) => void,
    timeRange: '24h' | '7d' | '30d' | '90d' = '7d'
  ): () => void {
    const now = new Date();
    const timeRanges = {
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
    };

    const startTime = new Date(now.getTime() - timeRanges[timeRange]);
    const startTimestamp = Timestamp.fromDate(startTime);

    // Subscribe to page views
    const pageViewsQuery = query(
      collection(db, 'pageViews'),
      where('timestamp', '>=', startTimestamp),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(pageViewsQuery, async () => {
      try {
        const metrics = await this.getAnalyticsMetrics(timeRange);
        callback(metrics);
      } catch (error) {
        console.error('Error in real-time metrics subscription:', error);
      }
    });

    return unsubscribe;
  }

  async endSession(sessionId: string): Promise<void> {
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      const sessionDoc = await getDoc(sessionRef);

      if (sessionDoc.exists()) {
        const sessionData = sessionDoc.data() as UserSession;
        const duration = Math.floor((Date.now() - sessionData.startTime.toMillis()) / 1000);

        await updateDoc(sessionRef, {
          isActive: false,
          duration,
          lastActivity: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }

  async resetAllAnalytics(): Promise<void> {
    try {
      const batch = writeBatch(db);

      // Get all page views and delete them
      const pageViewsSnapshot = await getDocs(collection(db, 'pageViews'));
      pageViewsSnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      // Get all sessions and delete them
      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      sessionsSnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      // Get all analytics events and delete them
      const eventsSnapshot = await getDocs(collection(db, 'analyticsEvents'));
      eventsSnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });

      // Commit the batch
      await batch.commit();
    } catch (error) {
      console.error('Error resetting analytics:', error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
