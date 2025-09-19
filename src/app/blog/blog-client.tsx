'use client';

import { useState, useMemo } from 'react';
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

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(post => post.category).filter((cat): cat is string => Boolean(cat)))];
    return cats.sort();
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      const matchesTag = selectedTag === 'all' || (post.tags && post.tags.includes(selectedTag));
      
      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0);
        case 'oldest':
          return (a.publishedAt?.getTime() || 0) - (b.publishedAt?.getTime() || 0);
        case 'most-viewed':
          return (b.viewCount || 0) - (a.viewCount || 0);
        case 'most-liked':
          return (b.likeCount || 0) - (a.likeCount || 0);
        case 'reading-time':
          return (a.readingTime || 0) - (b.readingTime || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchTerm, sortBy, selectedCategory, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Filter & Search</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="newest" className="text-white hover:bg-slate-700">Newest First</SelectItem>
              <SelectItem value="oldest" className="text-white hover:bg-slate-700">Oldest First</SelectItem>
              <SelectItem value="most-viewed" className="text-white hover:bg-slate-700">Most Viewed</SelectItem>
              <SelectItem value="most-liked" className="text-white hover:bg-slate-700">Most Liked</SelectItem>
              <SelectItem value="reading-time" className="text-white hover:bg-slate-700">Reading Time</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white hover:bg-slate-700">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tag Filter */}
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white hover:bg-slate-700">All Tags</SelectItem>
              {tags.map(tag => (
                <SelectItem key={tag} value={tag} className="text-white hover:bg-slate-700">
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-200 text-sm font-medium">
              Showing {filteredAndSortedPosts.length} of {posts.length} articles
            </span>
          </div>
          {(searchTerm || selectedCategory !== 'all' || selectedTag !== 'all') && (
            <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
              <Filter className="h-3 w-3 mr-1" />
              Filtered
            </Badge>
          )}
        </div>
        
        {(searchTerm || selectedCategory !== 'all' || selectedTag !== 'all') && (
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedTag('all');
            }}
            variant="outline"
            size="sm"
            className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Posts Grid */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Latest Articles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No articles found
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We couldn't find any articles matching your criteria. 
              Try adjusting your search terms or filters to discover more content.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 py-3"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Load More Section */}
      {filteredAndSortedPosts.length > 0 && filteredAndSortedPosts.length >= 9 && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <p className="text-slate-400">Want to see more articles?</p>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-slate-600 text-white hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-500/50 transition-all duration-300 group"
            >
              Load More Articles
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

