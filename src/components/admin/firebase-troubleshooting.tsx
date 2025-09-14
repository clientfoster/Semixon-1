'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  RefreshCw,
  Wifi,
  Settings,
  Shield
} from 'lucide-react';

export function FirebaseTroubleshooting() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const troubleshootingSteps = [
    {
      id: 'network',
      title: 'Network Connectivity',
      icon: <Wifi className="h-4 w-4" />,
      steps: [
        'Check your internet connection',
        'Try accessing other websites to verify connectivity',
        'Disable VPN or proxy if active',
        'Check firewall settings'
      ]
    },
    {
      id: 'firebase',
      title: 'Firebase Configuration',
      icon: <Settings className="h-4 w-4" />,
      steps: [
        'Verify Firebase project is active',
        'Check API keys are correct',
        'Ensure project has Firestore enabled',
        'Verify billing is set up if using production'
      ]
    },
    {
      id: 'security',
      title: 'Security Rules',
      icon: <Shield className="h-4 w-4" />,
      steps: [
        'Check Firestore security rules',
        'Ensure rules allow read/write access',
        'Test with temporary open rules',
        'Review recent rule changes'
      ]
    }
  ];

  const quickFixes = [
    {
      title: 'Refresh Page',
      description: 'Sometimes a simple page refresh resolves temporary connection issues',
      action: () => window.location.reload()
    },
    {
      title: 'Check Firebase Status',
      description: 'Visit Firebase status page to check for service outages',
      action: () => window.open('https://status.firebase.google.com/', '_blank')
    },
    {
      title: 'Clear Browser Cache',
      description: 'Clear browser cache and cookies for this site',
      action: () => {
        if (confirm('Clear browser cache? This will reload the page.')) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
        }
      }
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Firebase Troubleshooting Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            If you're experiencing Firestore connection issues, follow these troubleshooting steps to resolve the problem.
          </AlertDescription>
        </Alert>

        {/* Quick Fixes */}
        <div>
          <h4 className="font-medium mb-3">Quick Fixes</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickFixes.map((fix, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start"
                onClick={fix.action}
              >
                <span className="font-medium text-sm">{fix.title}</span>
                <span className="text-xs text-muted-foreground text-left mt-1">
                  {fix.description}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Detailed Troubleshooting */}
        <div>
          <h4 className="font-medium mb-3">Detailed Troubleshooting</h4>
          <div className="space-y-3">
            {troubleshootingSteps.map((section) => (
              <div key={section.id} className="border rounded-lg">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto"
                  onClick={() => setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )}
                >
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <Badge variant="outline">
                    {expandedSection === section.id ? 'Hide' : 'Show'}
                  </Badge>
                </Button>
                
                {expandedSection === section.id && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {section.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Additional Resources</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://firebase.google.com/docs/firestore', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Firestore Docs
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://firebase.google.com/support', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Firebase Support
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://console.firebase.google.com/', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Firebase Console
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
