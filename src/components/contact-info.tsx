'use client';

import { useSiteSettings } from '@/hooks/use-site-settings';

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className = '' }: ContactInfoProps) {
  const { settings, getFormattedAddress, getCompanyName } = useSiteSettings();

  return (
    <div className={`bg-slate-50 rounded-lg p-6 ${className}`}>
      <p className="text-slate-700 mb-2"><strong>Email:</strong> {settings.email}</p>
      <p className="text-slate-700 mb-2"><strong>Phone:</strong> {settings.phone}</p>
      <p className="text-slate-700"><strong>Address:</strong> {getFormattedAddress()}</p>
    </div>
  );
}
