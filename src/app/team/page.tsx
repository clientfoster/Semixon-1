'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeamRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to show the loading animation
    const timer = setTimeout(() => {
      router.replace('/about#team-section');
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Redirecting to Our Team</h2>
        <p className="text-slate-500">Taking you to the team section...</p>
      </div>
    </div>
  );
}