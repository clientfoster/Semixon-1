'use client';

import { useState, useEffect } from 'react';
import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
// @ts-ignore
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Save, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { generateMetaTitle, generateMetaDescription, calculateReadingTime, generateSlug, extractExcerptFromContent } from '@/lib/blog-utils';

interface BlogPostFormProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost | null;
}

export function BlogPostForm({ isOpen, onClose, post }: BlogPostFormProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    featuredImageAlt: '',
    author: {
      name: '',
      email: '',
      avatar: '',
      bio: ''
    },
    tags: [],
    category: '',
    status: 'draft',
    isFeatured: false,
    readingTime: 0,
    viewCount: 0,
    likeCount: 0
  });
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        tags: post.tags || []
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        featuredImageAlt: '',
        author: {
          name: '',
          email: '',
          avatar: '',
          bio: ''
        },
        tags: [],
        category: '',
        status: 'draft',
        isFeatured: false,
        readingTime: 0,
        viewCount: 0,
        likeCount: 0
      });
    }
  }, [post, isOpen]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !post) {
      const slug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, post]);

  // Auto-generate excerpt from content if not provided
  useEffect(() => {
    if (formData.content && !formData.excerpt && !post) {
      const excerpt = extractExcerptFromContent(formData.content);
      setFormData(prev => ({ ...prev, excerpt }));
    }
  }, [formData.content, formData.excerpt, post]);

  // Calculate reading time
  useEffect(() => {
    if (formData.content) {
      const readingTime = calculateReadingTime(formData.content);
      setFormData(prev => ({ ...prev, readingTime }));
    }
  }, [formData.content]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuthorChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      author: {
        ...prev.author!,
        [field]: value
      }
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const postData = {
        ...formData,
        createdAt: post ? post.createdAt : new Date(),
        updatedAt: new Date(),
        publishedAt: formData.status === 'published' && !post?.publishedAt ? new Date() : post?.publishedAt
      };

      if (post && post.docId) {
        // @ts-ignore
        await updateDoc(doc(db, 'blogPosts', post.docId), postData);
        toast({
          title: 'Post Updated!',
          description: `${formData.title} has been updated successfully.`,
        });
      } else {
        // @ts-ignore
        await addDoc(collection(db, 'blogPosts'), postData);
        toast({
          title: 'Post Created!',
          description: `${formData.title} has been created successfully.`,
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save post. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="post-url-slug"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of the post"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Blog category (e.g., Technology, Industry)"
                />
              </div>


              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Author Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Author Information</h3>
              
              <div>
                <Label htmlFor="authorName">Author Name *</Label>
                <Input
                  id="authorName"
                  value={formData.author?.name || ''}
                  onChange={(e) => handleAuthorChange('name', e.target.value)}
                  placeholder="Author name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="authorEmail">Author Email *</Label>
                <Input
                  id="authorEmail"
                  type="email"
                  value={formData.author?.email || ''}
                  onChange={(e) => handleAuthorChange('email', e.target.value)}
                  placeholder="author@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="authorAvatar">Author Avatar URL</Label>
                <Input
                  id="authorAvatar"
                  value={formData.author?.avatar || ''}
                  onChange={(e) => handleAuthorChange('avatar', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <Label htmlFor="authorBio">Author Bio</Label>
                <Textarea
                  id="authorBio"
                  value={formData.author?.bio || ''}
                  onChange={(e) => handleAuthorChange('bio', e.target.value)}
                  placeholder="Brief author biography"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your blog post content here..."
              rows={12}
              required
            />
            <p className="text-sm text-muted-foreground mt-2">
              Reading time: {formData.readingTime} minutes
            </p>
          </div>

          {/* Featured Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage || ''}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="featuredImageAlt">Featured Image Alt Text</Label>
              <Input
                id="featuredImageAlt"
                value={formData.featuredImageAlt || ''}
                onChange={(e) => handleInputChange('featuredImageAlt', e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>
          </div>

          {/* Status and Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured || false}
                  onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
              </div>
            </div>

            {/* Auto-generated Meta Info */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Auto-generated Meta Tags</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Meta Title:</span>
                    <span className="ml-2 text-slate-600">
                      {formData.title ? generateMetaTitle(formData.title) : 'Will be generated from title'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Meta Description:</span>
                    <span className="ml-2 text-slate-600">
                      {formData.excerpt ? generateMetaDescription(formData.excerpt) : 'Will be generated from excerpt'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
