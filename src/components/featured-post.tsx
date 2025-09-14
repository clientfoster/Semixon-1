'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { BlogPost } from '@/lib/types';

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };


  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-xl bg-white overflow-hidden">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-64 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge className="bg-amber-500 text-white border-0">
              <TrendingUp className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-2xl line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-slate-600 line-clamp-3 mb-6 text-lg leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{post.author?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 4} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardContent className="pt-0">
        <Button asChild size="lg" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Link href={`/blog/${post.slug}`}>
            Read Full Article
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
