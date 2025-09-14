'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Eye, Clock, Zap } from 'lucide-react';
import { analyticsService, AnalyticsMetrics } from '@/lib/analytics';

interface RealTimeData extends AnalyticsMetrics {
  recentActivity: Array<{ action: string; timestamp: string; user: string }>;
}

export function RealTimeAnalytics() {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (isLive) {
      // Subscribe to real-time updates
      unsubscribe = analyticsService.subscribeToRealTimeMetrics((metrics) => {
        const realTimeData: RealTimeData = {
          ...metrics,
          recentActivity: [
            { action: 'Page View', timestamp: new Date().toISOString(), user: 'User 1234' },
            { action: 'Click', timestamp: new Date(Date.now() - 30000).toISOString(), user: 'User 5678' },
            { action: 'Form Submit', timestamp: new Date(Date.now() - 60000).toISOString(), user: 'User 9012' },
            { action: 'Download', timestamp: new Date(Date.now() - 90000).toISOString(), user: 'User 3456' },
            { action: 'Page View', timestamp: new Date(Date.now() - 120000).toISOString(), user: 'User 7890' },
          ],
        };
        setData(realTimeData);
      }, '24h');
    } else {
      // Load data once when not live
      analyticsService.getAnalyticsMetrics('24h').then((metrics) => {
        const realTimeData: RealTimeData = {
          ...metrics,
          recentActivity: [
            { action: 'Page View', timestamp: new Date().toISOString(), user: 'User 1234' },
            { action: 'Click', timestamp: new Date(Date.now() - 30000).toISOString(), user: 'User 5678' },
            { action: 'Form Submit', timestamp: new Date(Date.now() - 60000).toISOString(), user: 'User 9012' },
            { action: 'Download', timestamp: new Date(Date.now() - 90000).toISOString(), user: 'User 3456' },
            { action: 'Page View', timestamp: new Date(Date.now() - 120000).toISOString(), user: 'User 7890' },
          ],
        };
        setData(realTimeData);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isLive]);

  if (!data) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-700 rounded"></div>
              <div className="h-3 bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Status */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400" />
            Live Analytics
            <Badge 
              className={`ml-auto ${isLive ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-red-900/30 text-red-300 border-red-700'}`}
            >
              {isLive ? 'LIVE' : 'PAUSED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.realTimeUsers}</div>
              <div className="text-sm text-slate-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.totalPageViews.toLocaleString()}</div>
              <div className="text-sm text-slate-400">Page Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{Math.floor(data.averageSessionDuration / 60)}m</div>
              <div className="text-sm text-slate-400">Avg. Session</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.bounceRate.toFixed(1)}%</div>
              <div className="text-sm text-slate-400">Bounce Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-400" />
            Top Pages (Live)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{page.page}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">{page.views.toLocaleString()}</span>
                  <div className="w-16 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(page.views / Math.max(...data.topPages.map(p => p.views))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentActivity.length > 0 ? (
              data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-slate-400 text-xs">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-slate-400 text-xs">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400">No recent activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
