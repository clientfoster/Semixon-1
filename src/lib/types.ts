// Type definitions for the admin panel and site management

export interface SiteSettings {
  id?: string;
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SEOConfig {
  id?: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  robotsTxt?: string;
  sitemapUrl?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}


export interface PageContent {
  id?: string;
  page: string; // 'home', 'about', 'contact', etc.
  title: string;
  subtitle?: string;
  content: string;
  heroImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  featuredImage?: string;
  featuredImageAlt?: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  category?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  readingTime: number; // in minutes
  viewCount: number;
  likeCount: number;
  // Meta tags will be auto-generated from title and excerpt
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  docId?: string; // Firestore document ID
}


export interface BlogAuthor {
  id?: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  postCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  docId?: string; // Firestore document ID
}
