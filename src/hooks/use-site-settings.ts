'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface SiteSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  siteTagline: string;
  logoUrl: string;
  faviconUrl: string;
  siteUrl: string;
  
  // Contact Information
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Social Media
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  
  // SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  twitterCardImage: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  
  // Features & Options
  enableBlog: boolean;
  enableNewsletter: boolean;
  enableContactForm: boolean;
  enableLiveChat: boolean;
  enableDarkMode: boolean;
  
  // Maintenance
  maintenanceMode: boolean;
  maintenanceMessage: string;
  
  // Performance
  enableCaching: boolean;
  enableCompression: boolean;
  enableCDN: boolean;
  
  // Security
  enableHTTPS: boolean;
  enableCSP: boolean;
  enableHSTS: boolean;
  
  // Timestamps
  updatedAt: Date;
}

const defaultSettings: SiteSettings = {
  // General Settings
  siteName: 'Semixon',
  siteDescription: 'Pioneering the next generation of semiconductor technology through innovation, expertise, and a commitment to excellence.',
  siteTagline: 'Innovating Tomorrow\'s Technology Today',
  logoUrl: '',
  faviconUrl: '',
  siteUrl: 'https://semixon.com',
  
  // Contact Information
  companyName: 'Semixon Technologies',
  email: 'info@semixon.com',
  phone: '+91 9618055526',
  address: 'Plot No: 205, 2nd Floor, Sapthagiri Arcade, Hoodi Village, ITPL Main Rd, Mahadevapura',
  city: 'Bengaluru',
  state: 'Karnataka',
  zipCode: '560048',
  country: 'India',
  
  // Social Media
  facebookUrl: '',
  twitterUrl: '',
  linkedinUrl: 'https://linkedin.com/company/semixon',
  instagramUrl: '',
  youtubeUrl: '',
  githubUrl: '',
  
  // SEO Settings
  metaTitle: 'Semixon - Advanced Semiconductor Solutions',
  metaDescription: 'Leading semiconductor technology company providing innovative solutions for chip manufacturers, embedded systems, and software development.',
  metaKeywords: 'semiconductor, chip design, embedded systems, technology, innovation',
  ogImageUrl: '',
  twitterCardImage: '',
  googleAnalyticsId: '',
  googleTagManagerId: '',
  
  // Features & Options
  enableBlog: false,
  enableNewsletter: true,
  enableContactForm: true,
  enableLiveChat: false,
  enableDarkMode: true,
  
  // Maintenance
  maintenanceMode: false,
  maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
  
  // Performance
  enableCaching: true,
  enableCompression: true,
  enableCDN: false,
  
  // Security
  enableHTTPS: true,
  enableCSP: true,
  enableHSTS: true,
  
  // Timestamps
  updatedAt: new Date(),
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const settingsRef = doc(db, 'siteSettings', 'main');
      const unsubscribe = onSnapshot(settingsRef, 
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setSettings({
              ...defaultSettings,
              ...data,
              updatedAt: data.updatedAt?.toDate() || new Date(),
            });
          } else {
            // Use default settings if no document exists
            setSettings(defaultSettings);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error loading site settings:', err);
          setError('Failed to load site settings');
          setLoading(false);
          // Use default settings on error
          setSettings(defaultSettings);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up site settings listener:', err);
      setError('Failed to initialize site settings');
      setLoading(false);
      // Use default settings on error
      setSettings(defaultSettings);
    }
  }, []);

  // Helper function to get formatted address
  const getFormattedAddress = () => {
    const parts = [
      settings.address,
      settings.city,
      settings.state,
      settings.zipCode,
      settings.country
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(', ');
  };

  // Helper function to get full company name
  const getCompanyName = () => {
    return settings.companyName || settings.siteName;
  };

  return {
    settings,
    loading,
    error,
    getFormattedAddress,
    getCompanyName,
  };
}
