'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  Eye
} from 'lucide-react';
import { BlogPost } from '@/lib/types';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };


  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-3">
          {post.isFeatured && (
            <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-slate-600 line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author?.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* View Count */}
        {post.viewCount > 0 && (
          <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
            <Eye className="h-4 w-4" />
            <span>{post.viewCount.toLocaleString()} views</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            Read More
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
