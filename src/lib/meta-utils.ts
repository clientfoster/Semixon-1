import { Metadata } from 'next';

export interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const defaultKeywords = [
  'semiconductor engineering',
  'IC design',
  'wafer fabrication',
  'reliability testing',
  'semiconductor solutions',
  'engineering services',
  'chip design',
  'semiconductor manufacturing',
  'ASIC design',
  'FPGA design',
  'mixed signal design',
  'analog design',
  'digital design'
];

const siteConfig = {
  name: 'Semixon',
  description: 'Leading Semiconductor Engineering Solutions',
  url: 'https://semixon.com',
  logo: 'https://semixon.com/logo.png',
  twitter: '@semixon',
  facebook: 'https://www.facebook.com/semixon',
  linkedin: 'https://www.linkedin.com/company/semixon'
};

export function generateMetadata(data: MetaData): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = 'Semixon Team',
    section,
    tags = []
  } = data;

  const fullTitle = title.includes('Semixon') ? title : `${title} | Semixon`;
  const fullDescription = description || siteConfig.description;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const fullImage = image || `${siteConfig.url}/hero.jpeg`;
  const allKeywords = [...defaultKeywords, ...keywords, ...tags].join(', ');

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: 'Semixon',
    publisher: 'Semixon',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url || '/',
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Add article-specific meta tags
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
      authors: [author],
      section: section,
      tags: tags,
    };
  }

  // Add JSON-LD structured data
  const jsonLd = generateJsonLd(data, fullTitle, fullDescription, fullUrl, fullImage);
  metadata.other = {
    'application/ld+json': JSON.stringify(jsonLd),
  };

  return metadata;
}

function generateJsonLd(
  data: MetaData,
  title: string,
  description: string,
  url: string,
  image: string
) {
  const baseJsonLd = {
    '@context': 'https://schema.org',
    '@type': data.type === 'article' ? 'Article' : data.type === 'product' ? 'Product' : 'WebPage',
    headline: title,
    description: description,
    url: url,
    image: image,
    author: {
      '@type': 'Organization',
      name: 'Semixon',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Semixon',
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo,
      },
    },
    datePublished: data.publishedTime || new Date().toISOString(),
    dateModified: data.modifiedTime || new Date().toISOString(),
  };

  if (data.type === 'article') {
    return {
      ...baseJsonLd,
      '@type': 'Article',
      articleSection: data.section,
      keywords: data.tags?.join(', '),
      wordCount: description.split(' ').length,
    };
  }

  if (data.type === 'product') {
    return {
      ...baseJsonLd,
      '@type': 'Product',
      brand: {
        '@type': 'Organization',
        name: 'Semixon',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'Semixon',
        url: siteConfig.url,
      },
    };
  }

  return baseJsonLd;
}

// Utility function for blog posts
export function generateBlogMeta(blogPost: {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  author?: string;
  featuredImage?: string;
}): Metadata {
  return generateMetadata({
    title: blogPost.title,
    description: blogPost.excerpt,
    keywords: blogPost.tags || [],
    image: blogPost.featuredImage,
    url: `/blog/${blogPost.slug}`,
    type: 'article',
    publishedTime: blogPost.publishedAt,
    modifiedTime: blogPost.updatedAt,
    author: blogPost.author || 'Semixon Team',
    section: blogPost.category,
    tags: blogPost.tags || [],
  });
}

// Utility function for service pages
export function generateServiceMeta(service: {
  title: string;
  description: string;
  slug: string;
  category?: string;
  features?: string[];
  image?: string;
}): Metadata {
  const keywords = [
    service.title.toLowerCase(),
    service.category?.toLowerCase() || '',
    'semiconductor services',
    'engineering solutions',
    ...(service.features || []).map(f => f.toLowerCase())
  ].filter(Boolean);

  return generateMetadata({
    title: service.title,
    description: service.description,
    keywords,
    image: service.image,
    url: `/services/${service.slug}`,
    type: 'website',
  });
}

// Utility function for industry pages
export function generateIndustryMeta(industry: {
  title: string;
  description: string;
  slug: string;
  applications?: string[];
  image?: string;
}): Metadata {
  const keywords = [
    industry.title.toLowerCase(),
    'semiconductor solutions',
    'industry applications',
    ...(industry.applications || []).map(a => a.toLowerCase())
  ].filter(Boolean);

  return generateMetadata({
    title: industry.title,
    description: industry.description,
    keywords,
    image: industry.image,
    url: `/industries/${industry.slug}`,
    type: 'website',
  });
}

// Utility function for product pages
export function generateProductMeta(product: {
  title: string;
  description: string;
  slug: string;
  features?: string[];
  category?: string;
  image?: string;
}): Metadata {
  const keywords = [
    product.title.toLowerCase(),
    product.category?.toLowerCase() || '',
    'semiconductor products',
    'engineering solutions',
    ...(product.features || []).map(f => f.toLowerCase())
  ].filter(Boolean);

  return generateMetadata({
    title: product.title,
    description: product.description,
    keywords,
    image: product.image,
    url: `/products/${product.slug}`,
    type: 'product',
  });
}

