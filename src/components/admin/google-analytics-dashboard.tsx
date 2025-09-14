'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  TrendingUp,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface GoogleAnalyticsData {
  totalUsers: number;
  totalSessions: number;
  totalPageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; users: number }>;
  topCountries: Array<{ country: string; users: number; percentage: number }>;
  deviceCategories: Array<{ device: string; users: number; percentage: number }>;
  trafficSources: Array<{ source: string; users: number; percentage: number }>;
  realTimeUsers: number;
  lastUpdated: Date;
}

export function GoogleAnalyticsDashboard() {
  const [data, setData] = useState<GoogleAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration - in production, this would fetch from Google Analytics API
  const getMockData = (): GoogleAnalyticsData => {
    const now = new Date();
    const baseUsers = Math.floor(Math.random() * 500) + 200;
    const baseSessions = Math.floor(baseUsers * (1.2 + Math.random() * 0.6));
    const basePageViews = Math.floor(baseSessions * (2.5 + Math.random() * 1.5));
    
    return {
      totalUsers: baseUsers,
      totalSessions: baseSessions,
      totalPageViews: basePageViews,
      averageSessionDuration: Math.floor(120 + Math.random() * 300), // 2-7 minutes
      bounceRate: 20 + Math.random() * 40, // 20-60%
      topPages: [
        { page: '/', views: Math.floor(basePageViews * 0.4), users: Math.floor(baseUsers * 0.4) },
        { page: '/services', views: Math.floor(basePageViews * 0.25), users: Math.floor(baseUsers * 0.25) },
        { page: '/about', views: Math.floor(basePageViews * 0.15), users: Math.floor(baseUsers * 0.15) },
        { page: '/contact', views: Math.floor(basePageViews * 0.1), users: Math.floor(baseUsers * 0.1) },
        { page: '/blog', views: Math.floor(basePageViews * 0.1), users: Math.floor(baseUsers * 0.1) },
      ],
      topCountries: [
        { country: 'United States', users: Math.floor(baseUsers * 0.4), percentage: 40 },
        { country: 'India', users: Math.floor(baseUsers * 0.25), percentage: 25 },
        { country: 'United Kingdom', users: Math.floor(baseUsers * 0.15), percentage: 15 },
        { country: 'Canada', users: Math.floor(baseUsers * 0.1), percentage: 10 },
        { country: 'Germany', users: Math.floor(baseUsers * 0.1), percentage: 10 },
      ],
      deviceCategories: [
        { device: 'Desktop', users: Math.floor(baseUsers * 0.6), percentage: 60 },
        { device: 'Mobile', users: Math.floor(baseUsers * 0.35), percentage: 35 },
        { device: 'Tablet', users: Math.floor(baseUsers * 0.05), percentage: 5 },
      ],
      trafficSources: [
        { source: 'Organic Search', users: Math.floor(baseUsers * 0.4), percentage: 40 },
        { source: 'Direct', users: Math.floor(baseUsers * 0.3), percentage: 30 },
        { source: 'Social Media', users: Math.floor(baseUsers * 0.15), percentage: 15 },
        { source: 'Referral', users: Math.floor(baseUsers * 0.1), percentage: 10 },
        { source: 'Email', users: Math.floor(baseUsers * 0.05), percentage: 5 },
      ],
      realTimeUsers: Math.floor(Math.random() * 20) + 1,
      lastUpdated: now,
    };
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would fetch from Google Analytics API
      const mockData = getMockData();
      setData(mockData);
    } catch (err) {
      setError('Failed to load Google Analytics data');
      console.error('Error loading GA data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            Google Analytics
          </h2>
          <Button onClick={loadData} disabled={loading} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-slate-700 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            Google Analytics
          </h2>
          <Button onClick={loadData} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={loadData}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-400" />
            Google Analytics
          </h2>
          <p className="text-slate-400 mt-1">
            Live data from Google Analytics 4
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadData} disabled={loading} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://analytics.google.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open GA4
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{data.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Sessions</p>
                <p className="text-2xl font-bold text-white">{data.totalSessions.toLocaleString()}</p>
              </div>
              <MousePointer className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Page Views</p>
                <p className="text-2xl font-bold text-white">{data.totalPageViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg. Session</p>
                <p className="text-2xl font-bold text-white">
                  {Math.floor(data.averageSessionDuration / 60)}m {data.averageSessionDuration % 60}s
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Real-time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">{data.realTimeUsers} users online</span>
            </div>
            <div className="text-slate-400">
              Last updated: {data.lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                    #{index + 1}
                  </Badge>
                  <span className="text-white font-medium">{page.page}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{page.views.toLocaleString()} views</p>
                  <p className="text-slate-400 text-sm">{page.users.toLocaleString()} users</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Device Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.deviceCategories.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <span className="text-slate-300">{device.device}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12 text-right">
                      {device.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <span className="text-slate-300">{source.source}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12 text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
