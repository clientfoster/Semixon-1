'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';
import { testFirestoreConnection, createTestDocument } from '@/lib/firebase-utils';

interface ConnectionStatusProps {
  className?: string;
}

export function ConnectionStatus({ className }: ConnectionStatusProps) {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error' | 'offline'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const checkConnection = async () => {
    setStatus('checking');
    setErrorMessage('');
    
    try {
      // Test read operation
      const readTest = await testFirestoreConnection();
      if (!readTest.success) {
        setStatus('error');
        setErrorMessage(readTest.error || 'Read test failed');
        return;
      }

      // Test write operation
      const writeTest = await createTestDocument();
      if (!writeTest.success) {
        setStatus('error');
        setErrorMessage(writeTest.error || 'Write test failed');
        return;
      }

      setStatus('connected');
      setLastChecked(new Date());
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Connection test failed');
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'offline':
        return <WifiOff className="h-4 w-4 text-gray-500" />;
      case 'checking':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'offline':
        return <Badge variant="secondary">Offline</Badge>;
      case 'checking':
        return <Badge variant="outline">Checking...</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Database Connection
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm">
            {status === 'connected' && 'Firestore connection is healthy'}
            {status === 'error' && 'Connection issues detected'}
            {status === 'offline' && 'No internet connection'}
            {status === 'checking' && 'Testing connection...'}
          </span>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={checkConnection}
            disabled={status === 'checking'}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${status === 'checking' ? 'animate-spin' : ''}`} />
            Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
