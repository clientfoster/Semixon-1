'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function BlogPostCardSkeleton() {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm overflow-hidden relative">
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"></div>
      <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-r from-slate-700/50 to-slate-600/50 animate-pulse rounded-t-xl"></div>
        
        <div className="p-6 space-y-4">
          {/* Badge placeholder */}
          <div className="w-20 h-6 bg-gradient-to-r from-slate-600/50 to-slate-500/50 animate-pulse rounded-full"></div>
          
          {/* Title placeholder */}
          <div className="space-y-2">
            <div className="h-6 bg-gradient-to-r from-slate-600/50 to-slate-500/50 animate-pulse rounded w-full"></div>
            <div className="h-6 bg-gradient-to-r from-slate-600/50 to-slate-500/50 animate-pulse rounded w-3/4"></div>
          </div>
          
          {/* Excerpt placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-full"></div>
            <div className="h-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-5/6"></div>
            <div className="h-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-4/6"></div>
          </div>
          
          {/* Meta info placeholder */}
          <div className="flex gap-3">
            <div className="h-3 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-16"></div>
            <div className="h-3 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-20"></div>
            <div className="h-3 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-12"></div>
          </div>
          
          {/* Tags placeholder */}
          <div className="flex gap-2">
            <div className="h-5 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-12"></div>
            <div className="h-5 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-16"></div>
            <div className="h-5 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-14"></div>
          </div>
          
          {/* Button placeholder */}
          <div className="h-10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse rounded border border-blue-500/30"></div>
        </div>
      </div>
    </Card>
  );
}

export function FeaturedPostSkeleton() {
  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm overflow-hidden relative">
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"></div>
      <div className="absolute inset-[1px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-xl"></div>
      
      <div className="relative z-10">
        {/* Featured Image placeholder */}
        <div className="relative h-80 bg-gradient-to-r from-slate-700/50 to-slate-600/50 animate-pulse rounded-t-xl">
          <div className="absolute top-6 left-6">
            <div className="h-8 w-32 bg-gradient-to-r from-amber-500/50 to-orange-500/50 animate-pulse rounded-full"></div>
          </div>
          <div className="absolute bottom-6 right-6 flex gap-3">
            <div className="h-8 w-12 bg-black/50 backdrop-blur-sm rounded-lg animate-pulse"></div>
            <div className="h-8 w-16 bg-black/50 backdrop-blur-sm rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          {/* Category badge placeholder */}
          <div className="w-24 h-6 bg-gradient-to-r from-blue-500/50 to-purple-500/50 animate-pulse rounded-full"></div>
          
          {/* Title placeholder */}
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-slate-600/50 to-slate-500/50 animate-pulse rounded w-full"></div>
            <div className="h-8 bg-gradient-to-r from-slate-600/50 to-slate-500/50 animate-pulse rounded w-4/5"></div>
          </div>
          
          {/* Excerpt placeholder */}
          <div className="space-y-2">
            <div className="h-5 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-full"></div>
            <div className="h-5 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-5/6"></div>
            <div className="h-5 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-3/4"></div>
          </div>
          
          {/* Meta info placeholder */}
          <div className="flex flex-wrap gap-4">
            <div className="h-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-20"></div>
            <div className="h-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-24"></div>
            <div className="h-4 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-16"></div>
          </div>
          
          {/* Tags placeholder */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-16"></div>
            <div className="h-6 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-20"></div>
            <div className="h-6 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-18"></div>
            <div className="h-6 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-14"></div>
          </div>
          
          {/* Button placeholder */}
          <div className="h-12 bg-gradient-to-r from-blue-600/50 to-purple-600/50 animate-pulse rounded"></div>
        </div>
      </div>
    </Card>
  );
}

export function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <div className="h-16 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-3/4 mx-auto"></div>
            <div className="h-12 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-1/2 mx-auto"></div>
            <div className="h-6 bg-gradient-to-r from-slate-600/20 to-slate-500/20 animate-pulse rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Featured Post Skeleton */}
        <div className="mb-16">
          <div className="h-8 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-48 mb-8"></div>
          <FeaturedPostSkeleton />
        </div>
        
        {/* Posts Grid Skeleton */}
        <div className="mb-12">
          <div className="h-8 bg-gradient-to-r from-slate-600/30 to-slate-500/30 animate-pulse rounded w-32 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogPostCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}