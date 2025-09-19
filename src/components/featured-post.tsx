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
  TrendingUp,
  Eye
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
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm overflow-hidden relative">
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"></div>
      <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-80 overflow-hidden rounded-t-xl">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-4 py-2 text-sm font-semibold">
                <TrendingUp className="h-4 w-4 mr-2" />
                Featured Article
              </Badge>
            </div>
            
            {/* Floating stats */}
            <div className="absolute bottom-6 right-6 flex gap-3">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.viewCount || 0}</span>
                </div>
              </div>
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-8">

          <div className="space-y-6">
            {/* Category Badge */}
            {post.category && (
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-3 py-1 text-xs font-medium">
                {post.category}
              </Badge>
            )}
            
            {/* Title */}
            <h2 className="text-3xl font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-slate-300 line-clamp-3 text-lg leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{typeof post.author === 'string' ? post.author : post.author?.name}</span>
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
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 4 && (
                  <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                    +{post.tags.length - 4} more
                  </Badge>
                )}
              </div>
            )}
            
            {/* Read More Button */}
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-3 font-semibold group/btn">
              <Link href={`/blog/${post.slug}`}>
                Read Full Article
                <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
