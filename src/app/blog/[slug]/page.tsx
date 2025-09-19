import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { collection, getDocs, query, where, limit as firestoreLimit, orderBy } from 'firebase/firestore';
// @ts-ignore
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  User, 
  Clock,
  ArrowLeft,
  Eye,
  Tag,
  ArrowRight
} from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { BlogPostCard } from '@/components/blog-post-card';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { PostActions } from '@/components/post-actions';
import { generateBlogMeta } from '@/lib/meta-utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postsQuery = query(
      // @ts-ignore
      collection(db, 'blogPosts'),
      where('slug', '==', slug),
      firestoreLimit(1)
    );
    
    const snapshot = await getDocs(postsQuery);
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
    return {
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
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(category: string, currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    // Simplified query to avoid composite index requirement
    const postsQuery = query(
      // @ts-ignore
      collection(db, 'blogPosts'),
      orderBy('publishedAt', 'desc'),
      firestoreLimit(20) // Get more posts to filter on client side
    );
    
    const snapshot = await getDocs(postsQuery);
    const posts: BlogPost[] = [];
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      
      // Filter by category and status on client side to avoid index requirement
      if (data.category === category && data.status === 'published' && data.slug !== currentSlug) {
        const post: BlogPost = {
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
          readingTime: data.readingTime || data.readTime || 5,
          status: data.status || 'published',
          viewCount: data.views || 0,
          likeCount: data.likes || 0,
          isFeatured: data.isFeatured || false,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        };
        
        posts.push(post);
      }
    });
    
    return posts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Semixon',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateBlogMeta({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    slug: post.slug,
    publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    tags: post.tags,
    category: post.category,
    author: post.author?.name || 'Unknown',
    featuredImage: post.featuredImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category || '', slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative h-64 md:h-80 lg:h-96">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {post.author?.name || 'Unknown Author'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readingTime} min read
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    {post.viewCount} views
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Separator className="my-8" />

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <MarkdownRenderer content={post.content} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <PostActions 
                    likeCount={post.likeCount}
                    postTitle={post.title}
                    postUrl={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${post.slug}`}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    Related Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <BlogPostCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Newsletter Signup */}
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </div>
  );
}