'use client';

import { AuthProvider } from '@/contexts/auth-context';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-900">
        {children}
      </div>
    </AuthProvider>
  );
}
