'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, limit, where } from 'firebase/firestore';
// @ts-ignore
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { BlogPostForm } from '@/components/admin/blog-post-form';
import { BlogPostList } from '@/components/admin/blog-post-list';
import { BlogAnalytics } from '@/components/admin/blog-analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function BlogManagementPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    // @ts-ignore
    const postsQuery = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));

    // @ts-ignore
    const postsUnsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData: BlogPost[] = [];
      const categoriesSet = new Set<string>();
      const tagsSet = new Set<string>();
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const post = {
          ...data,
          id: doc.id,
          docId: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          publishedAt: data.publishedAt?.toDate(),
        } as BlogPost;
        
        postsData.push(post);
        
        // Collect categories and tags
        if (data.category) categoriesSet.add(data.category);
        if (data.tags) {
          data.tags.forEach((tag: string) => tagsSet.add(tag));
        }
      });
      
      setPosts(postsData);
      setCategories(Array.from(categoriesSet).sort());
      setAllTags(Array.from(tagsSet).sort());
      setLoading(false);
    });

    return () => {
      postsUnsubscribe();
    };
  }, []);

  const handleDuplicatePost = async (post: BlogPost) => {
    try {
      const duplicateData = {
        ...post,
        title: `${post.title} (Copy)`,
        slug: `${post.slug}-copy-${Date.now()}`,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: null,
        viewCount: 0,
        likeCount: 0
      };
      
      delete duplicateData.id;
      delete duplicateData.docId;
      
      // @ts-ignore
      await addDoc(collection(db, 'blogPosts'), duplicateData);
      toast({
        title: 'Post Duplicated!',
        description: `${post.title} has been duplicated successfully.`,
      });
    } catch (error) {
      console.error('Error duplicating post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to duplicate post. Please try again.',
      });
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    if (!post.docId) return;
    
    try {
      // @ts-ignore
      await updateDoc(doc(db, 'blogPosts', post.docId), {
        isFeatured: !post.isFeatured,
        updatedAt: new Date()
      });
      toast({
        title: 'Post Updated!',
        description: `Post ${post.isFeatured ? 'removed from' : 'added to'} featured.`,
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update post. Please try again.',
      });
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!post.docId) return;
    
    try {
      // @ts-ignore
      await deleteDoc(doc(db, 'blogPosts', post.docId));
      toast({
        title: 'Post Deleted!',
        description: `${post.title} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete post. Please try again.',
      });
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsPostFormOpen(true);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.author?.name && post.author.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'published' && post.status === 'published') ||
                      (activeTab === 'drafts' && post.status === 'draft') ||
                      (activeTab === 'featured' && post.isFeatured);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'views':
        return (b.viewCount || 0) - (a.viewCount || 0);
      case 'updated':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Manage your blog posts, categories, and content.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              All blog posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">
              Live posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'draft').length}</div>
            <p className="text-xs text-muted-foreground">
              Unpublished posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.isFeatured).length}</div>
            <p className="text-xs text-muted-foreground">
              Featured posts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Main Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Posts Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-4">
            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Posts ({posts.length})</TabsTrigger>
                <TabsTrigger value="published">Published ({posts.filter(p => p.status === 'published').length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({posts.filter(p => p.status === 'draft').length})</TabsTrigger>
                <TabsTrigger value="featured">Featured ({posts.filter(p => p.isFeatured).length})</TabsTrigger>
              </TabsList>
            </Tabs>

        <div className="space-y-4">
          {/* Filters and Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="title">Title A-Z</SelectItem>
                        <SelectItem value="views">Most Viewed</SelectItem>
                        <SelectItem value="updated">Recently Updated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      List
                    </Button>
                    <Button onClick={() => {
                      setSelectedPost(null);
                      setIsPostFormOpen(true);
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Quick filters:</span>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setActiveTab('published');
                    setStatusFilter('published');
                  }}>
                    Published only
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setActiveTab('featured');
                  }}>
                    Featured posts
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                    setActiveTab('all');
                  }}>
                    Clear all
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <BlogPostList 
            posts={filteredPosts}
            viewMode={viewMode}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onDuplicate={handleDuplicatePost}
            onToggleFeatured={handleToggleFeatured}
          />
            </div>
          </TabsContent>
        
        <TabsContent value="analytics">
          <BlogAnalytics />
        </TabsContent>
      </Tabs>
      </div>

      {/* Forms */}
      <BlogPostForm
        isOpen={isPostFormOpen}
        onClose={() => {
          setIsPostFormOpen(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
      />
    </div>
  );
}
