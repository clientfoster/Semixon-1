import { NextRequest, NextResponse } from 'next/server';
import { vercelAnalyticsService } from '@/lib/vercel-analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') as '24h' | '7d' | '30d' | '90d' || '7d';
    
    const metrics = await vercelAnalyticsService.getAnalyticsMetrics(timeRange);
    
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// This endpoint could be extended to integrate with Vercel's internal analytics API
// when deployed to Vercel with proper authentication
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties } = body;
    
    // Track custom events
    if (event) {
      vercelAnalyticsService.trackEvent(event, properties);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
