import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://semixion.com'
  const currentDate = new Date().toISOString()
  
  // Ensure we have a proper date format for Google
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0] // YYYY-MM-DD format
  }

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
      url: `${baseUrl}/sitemap`,
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

  // Admin pages (lower priority)
  const adminPages = [
    'admin',
    'admin/login',
    'admin/analytics',
    'admin/blog',
    'admin/content',
    'admin/industries',
    'admin/messages',
    'admin/products',
    'admin/seo',
    'admin/services',
    'admin/settings',
    'admin/setup',
    'admin/team',
    'admin/themes',
    'admin/users',
  ]

  const adminPagesSitemap = adminPages.map((admin) => ({
    url: `${baseUrl}/${admin}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.2,
  }))

  return [
    ...staticPages,
    ...servicePagesSitemap,
    ...industryPagesSitemap,
    ...adminPagesSitemap,
  ]
}
