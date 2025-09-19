import { Metadata } from 'next';
import { collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
// @ts-ignore
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  Clock,
  TrendingUp,
  Filter,
  ArrowRight
} from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { BlogPostCard } from '@/components/blog-post-card';
import { FeaturedPost } from '@/components/featured-post';
import { generateMetadata as generateMeta } from '@/lib/meta-utils';
import { BlogPageClient } from './blog-client';

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Simplified query to avoid composite index requirement
    // @ts-ignore
    const postsQuery = query(
      // @ts-ignore
      collection(db, 'blogPosts'),
      orderBy('publishedAt', 'desc')
    );
    
    const snapshot = await getDocs(postsQuery);
    const posts: BlogPost[] = [];
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      
      // Filter published posts on the client side to avoid index requirement
      if (data.status === 'published') {
        posts.push({
          id: doc.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          featuredImage: data.featuredImage,
          author: data.author,
          publishedAt: data.publishedAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
          tags: data.tags || [],
          category: data.category,
          readingTime: data.readTime || 5,
          status: data.status || 'published',
          viewCount: data.views || 0,
          likeCount: data.likes || 0,
          isFeatured: data.isFeatured || false,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        });
      }
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export const metadata: Metadata = generateMeta({
  title: 'Blog - Semiconductor Engineering Insights',
  description: 'Stay updated with the latest insights, trends, and innovations in semiconductor engineering, IC design, and advanced manufacturing technologies.',
  keywords: [
    'semiconductor blog',
    'IC design insights',
    'engineering trends',
    'technology news',
    'semiconductor industry',
    'chip design',
    'manufacturing updates'
  ],
  url: '/blog',
  type: 'website',
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Semiconductor
              </span>
              <br />
              <span className="text-white">Engineering Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
              Discover the latest insights, innovations, and trends shaping the future of 
              semiconductor technology and microelectronics engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-blue-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{posts.filter(p => p.status === 'published').length} Articles Published</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Article
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <BlogPageClient initialPosts={regularPosts} />
        </div>
      </section>
    </div>
  );
}