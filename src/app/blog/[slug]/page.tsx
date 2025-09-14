'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, limit, orderBy } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts but TypeScript can't infer it here
import { db } from '@/lib/firebase';
import { useParams } from 'next/navigation';
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
  Share2,
  Heart,
  Eye,
  Tag,
  ArrowRight
} from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { BlogPostCard } from '@/components/blog-post-card';
import { Skeleton } from '@/components/ui/skeleton';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { generateMetaTitle, generateMetaDescription } from '@/lib/blog-utils';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let relatedUnsubscribe: (() => void) | undefined;

    const setupListeners = () => {
      try {
        const postsQuery = query(
          // @ts-ignore - db is properly typed in firebase.ts
          collection(db, 'blogPosts'),
          where('slug', '==', slug),
          limit(1)
        );

        unsubscribe = onSnapshot(postsQuery, 
          (snapshot) => {
            if (snapshot.empty) {
              setNotFound(true);
              setLoading(false);
              return;
            }

            const postData = snapshot.docs[0].data() as BlogPost;
            
            // Check if post is published
            if (postData.status !== 'published') {
              setNotFound(true);
              setLoading(false);
              return;
            }

            setPost({
              ...postData,
              id: snapshot.docs[0].id,
              docId: snapshot.docs[0].id,
              createdAt: (postData.createdAt as any)?.toDate?.() || new Date(),
              updatedAt: (postData.updatedAt as any)?.toDate?.() || new Date(),
              publishedAt: (postData.publishedAt as any)?.toDate?.(),
            });

            // Fetch related posts (by tags or just recent posts)
            const relatedQuery = query(
              // @ts-ignore - db is properly typed in firebase.ts
              collection(db, 'blogPosts'),
              orderBy('createdAt', 'desc'),
              limit(10)
            );

            relatedUnsubscribe = onSnapshot(relatedQuery, 
              (relatedSnapshot) => {
                const relatedData: BlogPost[] = [];
                relatedSnapshot.forEach((doc) => {
                  const data = doc.data();
                  // Exclude the current post and only include published posts
                  if (doc.id !== snapshot.docs[0].id && data.status === 'published') {
                    relatedData.push({
                      ...data,
                      id: doc.id,
                      docId: doc.id,
                      createdAt: (data.createdAt as any)?.toDate?.() || new Date(),
                      updatedAt: (data.updatedAt as any)?.toDate?.() || new Date(),
                      publishedAt: (data.publishedAt as any)?.toDate?.(),
                    } as BlogPost);
                  }
                });
                setRelatedPosts(relatedData.slice(0, 3));
              },
              (error) => {
                console.error('Error loading related posts:', error);
              }
            );

            setLoading(false);
          },
          (error) => {
            console.error('Error loading post:', error);
            setNotFound(true);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error setting up listeners:', error);
        setNotFound(true);
        setLoading(false);
      }
    };

    // Add a small delay to prevent race conditions
    const timeoutId = setTimeout(setupListeners, 100);

    return () => {
      clearTimeout(timeoutId);
      if (unsubscribe) unsubscribe();
      if (relatedUnsubscribe) relatedUnsubscribe();
    };
  }, [slug]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Back Button */}
        <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button 
              asChild 
              variant="ghost" 
              className="hover:bg-slate-100 transition-colors duration-200 group text-black"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Blog</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-12 w-full mb-4" />
              <div className="flex gap-4 mb-8">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button 
            asChild 
            variant="ghost" 
            className="hover:bg-slate-100 transition-colors duration-200 group text-black"
          >
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Blog</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              {post.isFeatured && (
                <Badge variant="outline" className="border-amber-400 text-amber-600">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readingTime} min read</span>
              </div>
              {post.viewCount > 0 && (
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span>{post.viewCount.toLocaleString()} views</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                {post.likeCount} Likes
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="mb-12">
            <MarkdownRenderer content={post.content} />
          </div>

          <Separator className="my-12" />


          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Floating Back Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button 
          asChild 
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-black hover:bg-gray-800 text-white"
        >
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
