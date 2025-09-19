import { Metadata } from 'next';
import { generateMetadata as generateMeta } from '@/lib/meta-utils';
import { ContactPageClient } from './contact-client';

export const metadata: Metadata = generateMeta({
  title: 'Contact Semixon - Get in Touch with Our Semiconductor Experts',
  description: 'Contact Semixon for semiconductor engineering solutions, IC design services, and technical consultation. Our expert team is ready to help with your project requirements.',
  keywords: [
    'contact semixon',
    'semiconductor consultation',
    'engineering support',
    'technical inquiry',
    'project consultation',
    'IC design support',
    'semiconductor services'
  ],
  url: '/contact',
  type: 'website',
});

export default function ContactPage() {
  return <ContactPageClient />;
}