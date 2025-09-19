import { Metadata } from 'next';
import { AboutPageClient } from './about-client';

export const metadata: Metadata = {
  title: 'About Semixon - Leading Semiconductor Engineering Solutions',
  description: 'Learn about Semixon\'s journey in semiconductor engineering, our expert team, and our commitment to delivering cutting-edge IC design, wafer fabrication, and reliability testing solutions.',
  keywords: [
    'about semixon',
    'semiconductor company',
    'engineering team',
    'company history',
    'semiconductor expertise',
    'IC design company',
    'wafer fabrication',
    'reliability testing'
  ],
  openGraph: {
    title: 'About Semixon - Leading Semiconductor Engineering Solutions',
    description: 'Learn about Semixon\'s journey in semiconductor engineering, our expert team, and our commitment to delivering cutting-edge IC design, wafer fabrication, and reliability testing solutions.',
    type: 'website',
    url: '/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}

    