# Analytics Setup Guide

This guide will help you set up the Firestore analytics system for your Semixion website.

## Required Firestore Indexes

The analytics system requires the following Firestore indexes to be created. You can create them through the Firebase Console or using the Firebase CLI.

### 1. Page Views Index
**Collection:** `pageViews`
**Fields:**
- `timestamp` (Ascending)
- `__name__` (Ascending)

**Console URL:** [Create Page Views Index](https://console.firebase.google.com/v1/r/project/studio-262487200-a8a7e/firestore/indexes?create_composite=Cldwcm9qZWN0cy9zdHVkaW8tMjYyNDg3MjAwLWE4YTdlL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9wYWdlVmlld3MvaW5kZXhlcy9fEAEaDAoIdGltZXN0YW1wEAEaDAoIX19uYW1lX18QARoMCgh0aW1lc3RhbXAQARoMCghfX25hbWVfXxAB)

### 2. Sessions Index
**Collection:** `sessions`
**Fields:**
- `startTime` (Ascending)
- `__name__` (Ascending)

**Console URL:** [Create Sessions Index](https://console.firebase.google.com/v1/r/project/studio-262487200-a8a7e/firestore/indexes?create_composite=Cldwcm9qZWN0cy9zdHVkaW8tMjYyNDg3MjAwLWE4YTdlL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9zZXNzaW9ucy9pbmRleGVzL18QARoMCghzdGFydFRpbWUQARoMCghfX25hbWVfXxAB)

### 3. Sessions Last Activity Index
**Collection:** `sessions`
**Fields:**
- `lastActivity` (Ascending)
- `__name__` (Ascending)

**Console URL:** [Create Sessions Last Activity Index](https://console.firebase.google.com/v1/r/project/studio-262487200-a8a7e/firestore/indexes?create_composite=Cldwcm9qZWN0cy9zdHVkaW8tMjYyNDg3MjAwLWE4YTdlL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9zZXNzaW9ucy9pbmRleGVzL18QARoMCgxsYXN0QWN0aXZpdHkQARoMCghfX25hbWVfXxAB)

## Firestore Security Rules

Add these rules to your `firestore.rules` file:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to analytics collections
    match /pageViews/{document} {
      allow read, write: if true; // Public access for analytics
    }
    
    match /sessions/{document} {
      allow read, write: if true; // Public access for analytics
    }
    
    match /analyticsEvents/{document} {
      allow read, write: if true; // Public access for analytics
    }
    
    // Restrict other collections as needed
    match /{document=**} {
      allow read, write: if false; // Default deny
    }
  }
}
```

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Testing the Analytics

1. **Visit your website** - This will automatically start tracking page views
2. **Check the admin panel** - Go to `/admin/analytics` to see the dashboard
3. **Verify data in Firestore** - Check the `pageViews` and `sessions` collections

## Features

- ✅ **Real-time page view tracking**
- ✅ **User session management**
- ✅ **Device type detection**
- ✅ **Traffic source analysis**
- ✅ **Performance metrics**
- ✅ **Real-time dashboard updates**
- ✅ **Data export functionality**

## Troubleshooting

### Index Creation Errors
If you see "The query requires an index" errors:
1. Click the provided console URL to create the index
2. Wait for the index to build (can take a few minutes)
3. Refresh your analytics dashboard

### No Data Showing
If the analytics dashboard shows no data:
1. Check that Firestore rules allow read/write access
2. Verify your Firebase configuration
3. Check the browser console for errors
4. Ensure you've visited some pages to generate data

### Performance Issues
- The system uses in-memory filtering to avoid complex composite indexes
- Large datasets may take a few seconds to load
- Consider implementing pagination for very high-traffic sites

## Data Privacy

The analytics system respects user privacy:
- No personally identifiable information is stored
- Session IDs are randomly generated
- Users can opt out via cookie consent
- Data is stored securely in Firestore
