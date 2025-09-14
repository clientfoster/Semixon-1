# Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your Semixion website.

## ✅ Google Analytics Already Configured!

Your Google Analytics 4 (GA4) is already set up with tracking ID: `G-1M36VKSMZ2`

### What's Already Done:
- ✅ GA4 tracking code installed in the website head
- ✅ Event tracking configured for user interactions
- ✅ Admin dashboard created for viewing analytics
- ✅ Custom events set up for forms, navigation, and engagement

### To View Your Analytics:
1. **Live Data**: Visit your website and navigate around
2. **Admin Dashboard**: Go to `/admin/analytics-ga` in your admin panel
3. **Google Analytics**: Visit [analytics.google.com](https://analytics.google.com) to see detailed reports

## Step 3: Configure Environment Variables (Optional)

Your GA4 tracking ID `G-1M36VKSMZ2` is already configured in the code. If you want to override it, create a `.env.local` file in your project root and add:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-1M36VKSMZ2
```

**Note:** The tracking ID is already set in the code, so this step is optional.

## Step 4: Deploy and Test

1. Deploy your application to Vercel
2. Visit your website and navigate around
3. Check Google Analytics Real-time reports to see data coming in

## Step 5: Access Analytics Dashboard

1. Go to your admin panel: `https://yourdomain.com/admin/analytics-ga`
2. View the Google Analytics dashboard with live data
3. Click "Open GA4" to access the full Google Analytics interface

## Features Included

### Automatic Tracking
- **Page Views**: Automatically tracked on all pages
- **User Sessions**: Tracked with session duration
- **Device Information**: Desktop, mobile, tablet usage
- **Geographic Data**: Country and city information
- **Traffic Sources**: Organic search, direct, social media, etc.

### Custom Event Tracking
- **Form Submissions**: Contact form interactions
- **Button Clicks**: Navigation and CTA button clicks
- **Service Views**: When users view specific services
- **Blog Interactions**: Blog post views and interactions
- **User Engagement**: Various user interaction events

### Admin Dashboard
- **Real-time Users**: Live user count
- **Key Metrics**: Users, sessions, page views, bounce rate
- **Top Pages**: Most visited pages
- **Device Categories**: Desktop vs mobile usage
- **Traffic Sources**: Where your traffic comes from
- **Geographic Data**: Top countries and regions

## Troubleshooting

### No Data Appearing
1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the Measurement ID format (G-XXXXXXXXXX)
3. Wait 24-48 hours for data to appear in GA4
4. Check Real-time reports in GA4 for immediate data

### Development vs Production
- Analytics only loads in production by default
- To test in development, set `NEXT_PUBLIC_GA_ID` in your `.env.local`
- Use the admin dashboard to view simulated data during development

### Privacy Compliance
- Google Analytics is GDPR compliant
- Users can opt out using browser settings
- Consider adding a cookie consent banner for full compliance

## Advanced Configuration

### Custom Events
You can add custom event tracking anywhere in your code:

```typescript
import { trackEvent, trackButtonClick } from '@/lib/google-analytics';

// Track custom events
trackEvent('custom_event', {
  event_category: 'engagement',
  event_label: 'special_action'
});

// Track button clicks
trackButtonClick('cta_button', 'homepage');
```

### Enhanced Ecommerce (Optional)
For ecommerce tracking, you can extend the analytics configuration to include:
- Product views
- Add to cart events
- Purchase completions
- Revenue tracking

## Support

If you need help with Google Analytics setup:
1. Check the [Google Analytics Help Center](https://support.google.com/analytics/)
2. Review the [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
3. Contact your development team for technical assistance
