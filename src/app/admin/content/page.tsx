'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, onSnapshot, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Eye, 
  Edit,
  Globe,
  Lock,
  Calendar,
  Image
} from 'lucide-react';
import type { PageContent } from '@/lib/types';

const contentSchema = z.object({
  page: z.string().min(1, 'Page identifier is required'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  heroImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean(),
});

type ContentForm = z.infer<typeof contentSchema>;

const pageOptions = [
  { value: 'home', label: 'Home Page' },
  { value: 'about', label: 'About Page' },
  { value: 'contact', label: 'Contact Page' },
  { value: 'services', label: 'Services Page' },
  { value: 'products', label: 'Products Page' },
  { value: 'team', label: 'Team Page' },
  { value: 'privacy', label: 'Privacy Policy' },
  { value: 'terms', label: 'Terms of Service' },
];

export default function ContentManagementPage() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedContent, setSelectedContent] = useState<PageContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContentForm>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      page: '',
      title: '',
      subtitle: '',
      content: '',
      heroImage: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: false,
    },
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pageContent'), (snapshot) => {
      const contentsData: PageContent[] = [];
      snapshot.forEach((doc) => {
        contentsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as PageContent);
      });
      setContents(contentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: ContentForm) => {
    setSaving(true);
    try {
      const contentData: PageContent = {
        ...data,
        createdAt: selectedContent?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      if (selectedContent) {
        await setDoc(doc(db, 'pageContent', selectedContent.id!), contentData);
        toast({
          title: 'Content Updated!',
          description: `${data.title} has been updated successfully.`,
        });
      } else {
        await addDoc(collection(db, 'pageContent'), contentData);
        toast({
          title: 'Content Created!',
          description: `${data.title} has been created successfully.`,
        });
      }

      setIsDialogOpen(false);
      setSelectedContent(null);
      form.reset();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save content. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const editContent = (content: PageContent) => {
    setSelectedContent(content);
    form.reset({
      page: content.page,
      title: content.title,
      subtitle: content.subtitle || '',
      content: content.content,
      heroImage: content.heroImage || '',
      metaTitle: content.metaTitle || '',
      metaDescription: content.metaDescription || '',
      isPublished: content.isPublished,
    });
    setIsDialogOpen(true);
  };

  const createNewContent = () => {
    setSelectedContent(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const getPageLabel = (page: string) => {
    return pageOptions.find(option => option.value === page)?.label || page;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">
            Manage page content and SEO metadata across your website.
          </p>
        </div>
        <Button onClick={createNewContent}>
          <Plus className="h-4 w-4 mr-2" />
          New Content
        </Button>
      </div>

      <div className="grid gap-4">
        {contents.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No content found</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first page content to get started.
                </p>
                <Button onClick={createNewContent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Content
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          contents.map((content) => (
            <Card key={content.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{content.title}</h3>
                      <Badge variant={content.isPublished ? 'default' : 'secondary'}>
                        {content.isPublished ? (
                          <>
                            <Globe className="h-3 w-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3 mr-1" />
                            Draft
                          </>
                        )}
                      </Badge>
                      <Badge variant="outline">
                        {getPageLabel(content.page)}
                      </Badge>
                    </div>
                    
                    {content.subtitle && (
                      <p className="text-muted-foreground">{content.subtitle}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created: {formatDate(content.createdAt)}
                      </div>
                      {content.updatedAt.getTime() !== content.createdAt.getTime() && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Updated: {formatDate(content.updatedAt)}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-muted-foreground line-clamp-3">
                        {content.content}
                      </p>
                    </div>

                    {(content.metaTitle || content.metaDescription) && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">SEO Metadata</h4>
                        {content.metaTitle && (
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Meta Title:</strong> {content.metaTitle}
                          </p>
                        )}
                        {content.metaDescription && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Meta Description:</strong> {content.metaDescription}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editContent(content)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {content.isPublished && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={`/${content.page}`} target="_blank">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContent ? 'Edit Content' : 'Create New Content'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="page">Page</Label>
                    <select
                      id="page"
                      {...form.register('page')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a page</option>
                      {pageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.page && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.page.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <Input
                      id="heroImage"
                      {...form.register('heroImage')}
                      placeholder="https://example.com/hero-image.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...form.register('title')}
                    placeholder="Page title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                  <Input
                    id="subtitle"
                    {...form.register('subtitle')}
                    placeholder="Page subtitle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    {...form.register('content')}
                    placeholder="Page content (supports HTML)"
                    rows={12}
                  />
                  {form.formState.errors.content && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.content.message}
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    {...form.register('metaTitle')}
                    placeholder="SEO title for search engines"
                    maxLength={60}
                  />
                  <p className="text-sm text-muted-foreground">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    {...form.register('metaDescription')}
                    placeholder="SEO description for search engines"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-muted-foreground">
                    Recommended: 150-160 characters
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublished"
                    checked={form.watch('isPublished')}
                    onCheckedChange={(checked) => form.setValue('isPublished', checked)}
                  />
                  <Label htmlFor="isPublished">Published</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Published content will be visible on the website.
                </p>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : selectedContent ? 'Update Content' : 'Create Content'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
