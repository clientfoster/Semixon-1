'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { analyticsService, AnalyticsMetrics } from '@/lib/analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RealTimeAnalytics } from '@/components/admin/real-time-analytics';
import { PerformanceMetrics } from '@/components/admin/performance-metrics';

interface AnalyticsData extends AnalyticsMetrics {
  conversionRate: number;
  performance: {
    averageLoadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
  };
  userFlow: Array<{ step: string; users: number; dropoff: number }>;
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, refreshKey]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    
    try {
      const metrics = await analyticsService.getAnalyticsMetrics(timeRange as '24h' | '7d' | '30d' | '90d');
      
      // Add additional data not in metrics
      const data: AnalyticsData = {
        ...metrics,
        conversionRate: 2 + Math.random() * 5, // Mock conversion rate
        performance: {
          averageLoadTime: 1200 + Math.random() * 800,
          firstContentfulPaint: 800 + Math.random() * 400,
          largestContentfulPaint: 1200 + Math.random() * 600,
          cumulativeLayoutShift: Math.random() * 0.1,
        },
        userFlow: [
          { step: 'Homepage', users: metrics.totalPageViews, dropoff: 0 },
          { step: 'About Page', users: Math.floor(metrics.totalPageViews * 0.6), dropoff: 40 },
          { step: 'Services', users: Math.floor(metrics.totalPageViews * 0.4), dropoff: 20 },
          { step: 'Contact', users: Math.floor(metrics.totalPageViews * 0.25), dropoff: 15 },
        ],
      };
      
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!analyticsData) return;
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="space-y-6">
          <div className="h-8 bg-slate-800 rounded w-1/3 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
          <div className="h-96 bg-slate-800 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Analytics Data</h3>
            <p className="text-slate-400">Analytics data will appear here once users start visiting your site.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              Analytics Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
              Monitor your site performance and user behavior
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setRefreshKey(prev => prev + 1)}
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={exportData}
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Page Views</p>
                  <p className="text-3xl font-bold text-white">{analyticsData.totalPageViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-400" />
              </div>
              <div className="mt-2">
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Unique Visitors</p>
                  <p className="text-3xl font-bold text-white">{analyticsData.uniqueVisitors.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-2">
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Avg. Session</p>
                  <p className="text-3xl font-bold text-white">{Math.floor(analyticsData.averageSessionDuration / 60)}m</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="mt-2">
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Bounce Rate</p>
                  <p className="text-3xl font-bold text-white">{analyticsData.bounceRate.toFixed(1)}%</p>
                </div>
                <Target className="h-8 w-8 text-red-400" />
              </div>
              <div className="mt-2">
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Conversion</p>
                  <p className="text-3xl font-bold text-white">{analyticsData.conversionRate.toFixed(1)}%</p>
                </div>
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <div className="mt-2">
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Status */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              Real-time Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">{analyticsData.realTimeUsers} active users</span>
              </div>
              <div className="text-slate-400">
                Last updated: {analyticsData.lastUpdated.toDate().toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics */}
        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="realtime" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Real-time
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Performance
            </TabsTrigger>
            <TabsTrigger value="behavior" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              User Behavior
            </TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Devices & Sources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RealTimeAnalytics />
              <PerformanceMetrics />
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Page Load Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Average Load Time</span>
                      <span className="text-white font-medium">{analyticsData.performance.averageLoadTime.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">First Contentful Paint</span>
                      <span className="text-white font-medium">{analyticsData.performance.firstContentfulPaint.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Largest Contentful Paint</span>
                      <span className="text-white font-medium">{analyticsData.performance.largestContentfulPaint.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Cumulative Layout Shift</span>
                      <span className="text-white font-medium">{analyticsData.performance.cumulativeLayoutShift.toFixed(3)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-400 mb-2">92</div>
                    <p className="text-slate-400">Overall Performance Score</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Speed</span>
                        <span className="text-green-400">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Accessibility</span>
                        <span className="text-green-400">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Best Practices</span>
                        <span className="text-yellow-400">Needs Work</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPages.map((page, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{page.page}</p>
                          <p className="text-sm text-slate-400">{page.uniqueVisitors} unique visitors</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{page.views.toLocaleString()}</p>
                          <p className="text-sm text-slate-400">views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">User Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.userFlow.map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{step.step}</p>
                          <p className="text-sm text-slate-400">{step.users.toLocaleString()} users</p>
                        </div>
                        {step.dropoff > 0 && (
                          <div className="text-right">
                            <p className="text-red-400 text-sm">{step.dropoff}% dropoff</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.deviceTypes.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-slate-400" />}
                            {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-slate-400" />}
                            {device.device === 'Tablet' && <Monitor className="h-4 w-4 text-slate-400" />}
                            <span className="text-white font-medium">{device.device}</span>
                          </div>
                          <span className="text-slate-300">{device.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${device.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-slate-400">{device.count.toLocaleString()} sessions</p>
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
                    {analyticsData.referrers.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-slate-400" />
                            <span className="text-white font-medium">{source.source}</span>
                          </div>
                          <span className="text-slate-300">{source.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-slate-400">{source.visits.toLocaleString()} visits</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
