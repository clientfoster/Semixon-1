'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'super-admin' | 'admin' | 'editor';
  fallbackPath?: string;
}

export function AuthGuard({ 
  children, 
  requiredRole, 
  fallbackPath = '/admin/login' 
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(fallbackPath);
        return;
      }

      if (!user.isActive) {
        router.push('/admin/login?error=account-deactivated');
        return;
      }

      if (requiredRole) {
        const roleHierarchy = {
          'editor': 1,
          'admin': 2,
          'super-admin': 3
        };

        const userRoleLevel = roleHierarchy[user.role];
        const requiredRoleLevel = roleHierarchy[requiredRole];

        if (userRoleLevel < requiredRoleLevel) {
          router.push('/admin?error=insufficient-permissions');
          return;
        }
      }
    }
  }, [user, loading, requiredRole, fallbackPath, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Authenticating</h3>
                <p className="text-sm text-slate-600">Please wait while we verify your credentials...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Shield className="h-8 w-8 text-slate-400" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Access Denied</h3>
                <p className="text-sm text-slate-600">You need to be logged in to access this page.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user.isActive) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Shield className="h-8 w-8 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Account Deactivated</h3>
                <p className="text-sm text-slate-600">Your account has been deactivated. Please contact a super admin.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requiredRole) {
    const roleHierarchy = {
      'editor': 1,
      'admin': 2,
      'super-admin': 3
    };

    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Shield className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Insufficient Permissions</h3>
                  <p className="text-sm text-slate-600">
                    You need {requiredRole} privileges to access this page.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
}
