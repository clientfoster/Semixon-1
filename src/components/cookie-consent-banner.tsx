'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, Settings, X, CheckCircle, AlertCircle } from 'lucide-react';
import { cookieManager } from '@/lib/cookies';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    performance: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = cookieManager.hasConsent();
    if (hasConsent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    cookieManager.setConsent(true);
    setShowBanner(false);
    
    // Set all preferences to true
    const allPreferences = {
      essential: true,
      analytics: true,
      performance: true,
      marketing: true,
    };
    
    cookieManager.setUserPreferences({
      cookiePreferences: allPreferences,
    });
    
    // Initialize analytics
    cookieManager.trackPageView();
  };

  const handleRejectAll = () => {
    cookieManager.setConsent(false);
    setShowBanner(false);
    
    // Clear non-essential cookies
    cookieManager.clearNonEssentialCookies();
  };

  const handleSavePreferences = () => {
    cookieManager.setConsent(true);
    setShowBanner(false);
    setShowPreferences(false);
    
    cookieManager.setUserPreferences({
      cookiePreferences: preferences,
    });
    
    if (preferences.analytics) {
      cookieManager.trackPageView();
    }
  };

  const handleCustomize = () => {
    setShowPreferences(true);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700">
        <Card className="max-w-4xl mx-auto bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white mb-2">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  We use cookies to improve site performance, analyze usage, and personalize content. 
                  Essential cookies are required for the site to function properly. You can customize 
                  your preferences or accept all cookies.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept All
                  </Button>
                  
                  <Button
                    onClick={handleCustomize}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                  
                  <Button
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="text-slate-400 hover:text-slate-300 hover:bg-slate-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cookie Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Choose which types of cookies you want to allow. You can change these settings at any time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white font-medium">Essential Cookies</Label>
                <p className="text-sm text-slate-400">
                  Required for the website to function properly. Cannot be disabled.
                </p>
              </div>
              <Switch
                checked={preferences.essential}
                disabled
                className="opacity-50"
              />
            </div>

            <Separator className="bg-slate-700" />

            {/* Performance Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white font-medium">Performance Cookies</Label>
                <p className="text-sm text-slate-400">
                  Help us improve site speed and optimize your experience.
                </p>
              </div>
              <Switch
                checked={preferences.performance}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, performance: checked }))
                }
              />
            </div>

            <Separator className="bg-slate-700" />

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white font-medium">Analytics Cookies</Label>
                <p className="text-sm text-slate-400">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            <Separator className="bg-slate-700" />

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white font-medium">Marketing Cookies</Label>
                <p className="text-sm text-slate-400">
                  Used to deliver personalized advertisements and track campaign performance.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              onClick={() => setShowPreferences(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowSettings(true)}
        variant="ghost"
        size="sm"
        className="text-slate-400 hover:text-slate-300"
      >
        <Cookie className="h-4 w-4 mr-2" />
        Cookie Settings
      </Button>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Cookie Settings
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage your cookie preferences and view information about the cookies we use.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Current Cookie Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${cookieManager.hasConsent() ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-slate-300">
                    Cookies: {cookieManager.hasConsent() ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-300">
                    Cache Version: {cookieManager.getCacheVersion() || 'Not set'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Performance Data</h4>
              <div className="space-y-2 text-sm">
                <div className="text-slate-300">
                  Last Visit: {cookieManager.getLastVisit()?.toLocaleString() || 'Never'}
                </div>
                <div className="text-slate-300">
                  Page Load Time: {cookieManager.getPageLoadTime()?.toFixed(2)}ms
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                cookieManager.clearNonEssentialCookies();
                setShowSettings(false);
              }}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Clear Non-Essential Cookies
            </Button>
            <Button
              onClick={() => setShowSettings(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
