'use client';

import { useSiteSettings } from '@/hooks/use-site-settings';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function MaintenanceBanner() {
  const { settings } = useSiteSettings();
  const pathname = usePathname();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show if maintenance mode is off or banner is dismissed
  if (!settings.maintenanceMode || isDismissed) {
    return null;
  }

  // Don't show on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="bg-amber-500 border-b border-amber-600 text-amber-900 relative z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">
                {settings.maintenanceMessage || 'We are currently performing scheduled maintenance. Please check back soon.'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="text-amber-900 hover:bg-amber-600 hover:text-amber-900 h-8 w-8 p-0 flex-shrink-0"
            aria-label="Dismiss maintenance banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
