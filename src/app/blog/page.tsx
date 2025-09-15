import { Metadata } from 'next';
import { collection, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
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
    const postsQuery = query(
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
          readTime: data.readTime || 5,
          status: data.status || 'published',
          views: data.views || 0,
          likes: data.likes || 0,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Semiconductor Engineering Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and innovations in semiconductor engineering, 
            IC design, and advanced manufacturing technologies.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {/* Client Component for Interactive Features */}
        <BlogPageClient initialPosts={regularPosts} />
      </div>
    </div>
  );
}