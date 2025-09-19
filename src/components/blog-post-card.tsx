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
    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm overflow-hidden relative hover:scale-[1.02]">
      {/* Subtle gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
      <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            
            {/* Floating category badge */}
            {post.category && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-3 py-1 text-xs font-medium">
                  {post.category}
                </Badge>
              </div>
            )}
            
            {/* View count overlay */}
            {post.viewCount && post.viewCount > 0 && (
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-xs flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.viewCount}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Featured badge */}
          {post.isFeatured && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1 text-xs font-medium">
              ⭐ Featured
            </Badge>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-slate-300 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{typeof post.author === 'string' ? post.author : post.author?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} min</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          {/* Read More Button */}
          <Button asChild className="w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600 hover:to-purple-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-transparent transition-all duration-300 group/btn">
            <Link href={`/blog/${post.slug}`}>
              Read More
              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
