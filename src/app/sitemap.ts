import { MetadataRoute } from 'next'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
// @ts-ignore
import { db } from '@/lib/firebase'

interface BlogPost {
  slug: string;
  status: string;
  publishedAt?: any;
  updatedAt?: any;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsQuery = query(
      // @ts-ignore
      collection(db, 'blogPosts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    
    const snapshot = await getDocs(postsQuery);
    const posts: BlogPost[] = [];
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.slug && data.status === 'published') {
        posts.push({
          slug: data.slug,
          status: data.status,
          publishedAt: data.publishedAt,
          updatedAt: data.updatedAt,
        });
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Return empty array if Firebase fails to ensure sitemap still works
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://semixon.com'
  const currentDate = new Date().toISOString()
  
  // Get dynamic blog posts with error handling
  let blogPosts: BlogPost[] = [];
  try {
    blogPosts = await getBlogPosts();
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
    // Continue with empty blog posts array
  }
  
  // Ensure we have a proper date format for Google
  const formatDate = (date: any) => {
    try {
      if (!date) return currentDate;
      const dateObject = date.toDate ? date.toDate() : new Date(date);
      return dateObject.toISOString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return currentDate;
    }
  };

  // Static pages with proper Google Search Console optimization
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/site-map`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  // Service pages
  const servicePages = [
    'analog-and-mixed-signal',
    'ate',
    'bench-characterization',
    'design-verification',
    'dft',
    'fpga-design',
    'in-house-silicon-validation-lab',
    'physical-design',
    'prototyping-and-emulation',
    'bare-metal-programming',
    'board-support-package',
    'ci-cd',
    'device-drivers',
    'diagnostics',
    'os-porting-and-customization',
    'cyber-security',
    'verification-and-validation',
    'data-analytics-ai-and-machine-learning',
    'cloud-architecture-and-engineering',
    'salesforce-implementation-and-support',
    'application-development-and-maintenance',
    'web-development',
    'quality-assurance',
    'it-infrastructure',
    'engineering-and-technical-services',
    'digital-marketing',
    'content-writing',
    'branding-design',
    'quick-services',
  ]

  const servicePagesSitemap = servicePages.map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Industry pages
  const industryPages = [
    'semiconductor',
    'bfsi',
    'insurance',
    'retail',
    'automotive',
    'telecom-and-network',
  ]

  const industryPagesSitemap = industryPages.map((industry) => ({
    url: `${baseUrl}/industries/${industry}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic blog posts with validation
  const blogPostsSitemap = blogPosts
    .filter(post => post.slug && typeof post.slug === 'string' && post.slug.trim() !== '')
    .map((post) => ({
      url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: formatDate(post.updatedAt || post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  return [
    ...staticPages,
    ...servicePagesSitemap,
    ...industryPagesSitemap,
    ...blogPostsSitemap,
  ]
}
