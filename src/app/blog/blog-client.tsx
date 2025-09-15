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
    const cats = [...new Set(posts.map(post => post.category).filter(Boolean))];
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
          return b.publishedAt.getTime() - a.publishedAt.getTime();
        case 'oldest':
          return a.publishedAt.getTime() - b.publishedAt.getTime();
        case 'most-viewed':
          return b.views - a.views;
        case 'most-liked':
          return b.likes - a.likes;
        case 'reading-time':
          return a.readTime - b.readTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchTerm, sortBy, selectedCategory, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="most-viewed">Most Viewed</SelectItem>
                <SelectItem value="most-liked">Most Liked</SelectItem>
                <SelectItem value="reading-time">Reading Time</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tag Filter */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Showing {filteredAndSortedPosts.length} of {posts.length} posts
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">Filters Applied</span>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No posts found
              </h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More Button */}
      {filteredAndSortedPosts.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            Load More Posts
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

