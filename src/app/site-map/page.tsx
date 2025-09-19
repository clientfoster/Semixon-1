import { Metadata } from 'next'
import Link from 'next/link'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
// @ts-ignore
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ExternalLink, Globe, FileText, Settings, Users, Briefcase, BookOpen } from 'lucide-react'

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: any;
  category?: string;
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
          title: data.title,
          excerpt: data.excerpt,
          publishedAt: data.publishedAt,
          category: data.category,
        });
      }
    });
    
    return posts.slice(0, 10); // Limit to 10 recent posts for the sitemap
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Site Map - Semixon',
  description: 'Complete sitemap of Semixon website. Find all our pages, services, industries, and resources.',
  robots: {
    index: true,
    follow: true,
  },
}

const sitemapData = {
  main: [
    { href: '/', label: 'Home', description: 'Semixon homepage with company overview' },
    { href: '/about', label: 'About Us', description: 'Learn about our company and mission' },
    { href: '/contact', label: 'Contact', description: 'Get in touch with our team' },
    { href: '/blog', label: 'Blog', description: 'Latest insights and industry news' },
    { href: '/products', label: 'Products', description: 'Our semiconductor products and solutions' },
  ],
  services: {
    'Semiconductors': [
      { href: '/services/analog-and-mixed-signal', label: 'Analog and Mixed-Signal' },
      { href: '/services/ate', label: 'ATE' },
      { href: '/services/bench-characterization', label: 'Bench Characterization' },
      { href: '/services/design-verification', label: 'Design Verification' },
      { href: '/services/dft', label: 'DFT' },
      { href: '/services/fpga-design', label: 'FPGA Design' },
      { href: '/services/in-house-silicon-validation-lab', label: 'In-House Silicon Validation Lab' },
      { href: '/services/physical-design', label: 'Physical Design' },
      { href: '/services/prototyping-and-emulation', label: 'Prototyping and Emulation' },
    ],
    'Embedded Systems': [
      { href: '/services/bare-metal-programming', label: 'Bare Metal Programming' },
      { href: '/services/board-support-package', label: 'Board Support Package' },
      { href: '/services/ci-cd', label: 'CI/CD' },
      { href: '/services/device-drivers', label: 'Device Drivers' },
      { href: '/services/diagnostics', label: 'Diagnostics' },
      { href: '/services/os-porting-and-customization', label: 'OS Porting and Customization' },
      { href: '/services/cyber-security', label: 'Cyber Security' },
      { href: '/services/verification-and-validation', label: 'Verification and Validation' },
    ],
    'Software Development': [
      { href: '/services/data-analytics-ai-and-machine-learning', label: 'Data Analytics, AI and Machine Learning' },
      { href: '/services/cloud-architecture-and-engineering', label: 'Cloud Architecture and Engineering' },
      { href: '/services/salesforce-implementation-and-support', label: 'Salesforce Implementation and Support' },
      { href: '/services/application-development-and-maintenance', label: 'Application Development and Maintenance' },
      { href: '/services/web-development', label: 'Web Development' },
      { href: '/services/quality-assurance', label: 'Quality Assurance' },
      { href: '/services/it-infrastructure', label: 'IT Infrastructure' },
      { href: '/services/engineering-and-technical-services', label: 'Engineering and Technical Services' },
    ],
    'Digital Marketing': [
      { href: '/services/digital-marketing', label: 'Digital Marketing' },
      { href: '/services/content-writing', label: 'Content Writing' },
      { href: '/services/branding-design', label: 'Branding & Design' },
      { href: '/services/quick-services', label: 'Quick Services' },
    ],
  },
  industries: [
    { href: '/industries/semiconductor', label: 'Semiconductor' },
    { href: '/industries/bfsi', label: 'BFSI' },
    { href: '/industries/insurance', label: 'Insurance' },
    { href: '/industries/retail', label: 'Retail' },
    { href: '/industries/automotive', label: 'Automotive' },
    { href: '/industries/telecom-and-network', label: 'Telecom and Network' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ],
}

export default async function SitemapPage() {
  // Get dynamic blog posts
  const blogPosts = await getBlogPosts();
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Site Map
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Navigate through all our pages, services, and resources. Find exactly what you're looking for.
            </p>
          </div>

          {/* Main Pages */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Main Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sitemapData.main.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {page.label}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {page.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {Object.entries(sitemapData.services).map(([category, services]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <Badge variant="secondary" className="mr-3">
                        {category}
                      </Badge>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {services.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className="group p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                              {service.label}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Industries */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                Industries We Serve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sitemapData.industries.map((industry) => (
                  <Link
                    key={industry.href}
                    href={industry.href}
                    className="group p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                        {industry.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Blog Posts */}
          {blogPosts.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                  Recent Blog Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          {post.category && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {post.category}
                            </Badge>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors ml-3 flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View All Blog Posts
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legal Pages */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                Legal & Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sitemapData.legal.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                        {page.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* XML Sitemap Link */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  XML Sitemap for Search Engines
                </h3>
                <p className="text-slate-600 mb-4">
                  For search engines and developers, access our XML sitemap
                </p>
                <Link
                  href="/sitemap.xml"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View XML Sitemap
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
