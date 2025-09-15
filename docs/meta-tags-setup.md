# Dynamic Meta Tags Setup Guide

This guide explains how to use the automatic meta tag generation system for pages and blog posts in your Semixion website.

## Overview

The meta tag system automatically generates SEO-optimized meta tags including:
- Page titles and descriptions
- Open Graph tags for social media sharing
- Twitter Card tags
- JSON-LD structured data
- Keywords and canonical URLs

## Files Created

### Core Utility (`src/lib/meta-utils.ts`)
- `generateMetadata()` - Main function for generating meta tags
- `generateBlogMeta()` - Specialized for blog posts
- `generateServiceMeta()` - Specialized for service pages
- `generateIndustryMeta()` - Specialized for industry pages

## Usage Examples

### 1. Basic Page Metadata

```typescript
import { Metadata } from 'next';
import { generateMetadata as generateMeta } from '@/lib/meta-utils';

export const metadata: Metadata = generateMeta({
  title: 'Your Page Title',
  description: 'Your page description',
  keywords: ['keyword1', 'keyword2'],
  url: '/your-page',
  type: 'website',
});
```

### 2. Blog Post Metadata

```typescript
import { generateBlogMeta } from '@/lib/meta-utils';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Semixion',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogMeta({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    slug: post.slug,
    publishedAt: post.publishedAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags,
    category: post.category,
    author: post.author,
    featuredImage: post.featuredImage,
  });
}
```

### 3. Service Page Metadata

```typescript
import { generateServiceMeta } from '@/lib/meta-utils';

export const metadata: Metadata = generateServiceMeta({
  title: 'Your Service Title',
  description: 'Your service description',
  slug: 'your-service-slug',
  category: 'Service Category',
  features: ['Feature 1', 'Feature 2'],
  image: '/service-image.jpg'
});
```

### 4. Industry Page Metadata

```typescript
import { generateIndustryMeta } from '@/lib/meta-utils';

export const metadata: Metadata = generateIndustryMeta({
  title: 'Industry Solutions',
  description: 'Solutions for this industry',
  slug: 'industry-slug',
  applications: ['Application 1', 'Application 2'],
  image: '/industry-image.jpg'
});
```

## Meta Data Interface

```typescript
interface MetaData {
  title: string;                    // Page title
  description: string;              // Page description
  keywords?: string[];              // SEO keywords
  image?: string;                   // Social media image
  url?: string;                     // Canonical URL
  type?: 'website' | 'article' | 'product'; // Page type
  publishedTime?: string;           // Publication date (ISO string)
  modifiedTime?: string;            // Last modified date (ISO string)
  author?: string;                  // Author name
  section?: string;                 // Article section/category
  tags?: string[];                  // Article tags
}
```

## Generated Meta Tags

The system automatically generates:

### Basic SEO Tags
- `<title>` - Page title
- `<meta name="description">` - Page description
- `<meta name="keywords">` - SEO keywords
- `<meta name="author">` - Author information
- `<link rel="canonical">` - Canonical URL

### Open Graph Tags
- `og:type` - Content type
- `og:title` - Page title
- `og:description` - Page description
- `og:url` - Page URL
- `og:image` - Social media image
- `og:site_name` - Site name
- `og:locale` - Language/locale

### Twitter Card Tags
- `twitter:card` - Card type (summary_large_image)
- `twitter:title` - Page title
- `twitter:description` - Page description
- `twitter:image` - Social media image
- `twitter:creator` - Twitter handle

### JSON-LD Structured Data
- Schema.org markup for better search engine understanding
- Article markup for blog posts
- Organization markup for company pages

## Default Keywords

The system includes default semiconductor-related keywords:
- semiconductor engineering
- IC design
- wafer fabrication
- reliability testing
- semiconductor solutions
- engineering services
- chip design
- semiconductor manufacturing
- ASIC design
- FPGA design
- mixed signal design
- analog design
- digital design

## Site Configuration

Default site configuration in `meta-utils.ts`:
```typescript
const siteConfig = {
  name: 'Semixion',
  description: 'Leading Semiconductor Engineering Solutions',
  url: 'https://semixion.com',
  logo: 'https://semixion.com/logo.png',
  twitter: '@semixion',
  facebook: 'https://www.facebook.com/semixion',
  linkedin: 'https://www.linkedin.com/company/semixion'
};
```

## Implementation Status

### ✅ Completed Pages
- **Blog Pages**: Dynamic metadata for individual blog posts and blog listing
- **Services Page**: Main services page with comprehensive metadata
- **About Page**: Company information with SEO-optimized metadata
- **Contact Page**: Contact information with relevant keywords
- **Service Detail Pages**: Example implementation for analog-and-mixed-signal

### 🔄 Next Steps
1. Apply metadata to all remaining service pages
2. Add metadata to industry pages
3. Add metadata to product pages
4. Test social media sharing previews
5. Validate structured data with Google's Rich Results Test

## Testing Your Meta Tags

### 1. View Page Source
Check the `<head>` section to see generated meta tags.

### 2. Social Media Testing
- **Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. SEO Testing
- **Google Rich Results Test**: [Rich Results Test](https://search.google.com/test/rich-results)
- **Schema Markup Validator**: [Schema.org Validator](https://validator.schema.org/)

## Best Practices

1. **Unique Titles**: Each page should have a unique, descriptive title
2. **Compelling Descriptions**: Write descriptions that encourage clicks (150-160 characters)
3. **Relevant Keywords**: Use keywords naturally in titles and descriptions
4. **High-Quality Images**: Use clear, relevant images for social sharing
5. **Consistent Branding**: Maintain consistent site name and branding
6. **Mobile-Friendly**: Ensure meta tags work well on mobile devices

## Troubleshooting

### Common Issues
1. **Missing Metadata**: Ensure you're exporting the `metadata` constant
2. **Type Errors**: Check that you're importing the correct types from Next.js
3. **Image Issues**: Verify image URLs are accessible
4. **Client Components**: Use server components for metadata generation

### Debug Tips
1. Check browser developer tools for meta tags
2. Use Next.js development mode to see metadata generation
3. Test with different page types (website, article, product)
4. Validate JSON-LD structured data

This system provides comprehensive SEO optimization for your semiconductor engineering website, ensuring better search engine visibility and social media sharing.

