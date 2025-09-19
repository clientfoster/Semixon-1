'use client';

import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
// @ts-ignore
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Save, 
  RefreshCw, 
  Plus, 
  Edit2, 
  Trash2, 
  Clock, 
  Calendar,
  MapPin,
  Award,
  Users,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AboutContent {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  heroImage?: string;
  updatedAt: Date;
}

interface JourneyItem {
  id?: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
  type: 'milestone' | 'achievement' | 'expansion' | 'innovation';
  isHighlight: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const journeyIcons = {
  milestone: Clock,
  achievement: Award,
  expansion: MapPin,
  innovation: Target
};

const journeyColors = {
  milestone: 'bg-blue-500',
  achievement: 'bg-green-500', 
  expansion: 'bg-purple-500',
  innovation: 'bg-orange-500'
};

export default function AboutManagementPage() {
  const { toast } = useToast();
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'About Semixon',
    subtitle: 'Pioneering the next generation of semiconductor technology through innovation, expertise, and a commitment to excellence.',
    content: '',
    heroImage: '',
    updatedAt: new Date()
  });
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showJourneyDialog, setShowJourneyDialog] = useState(false);
  const [editingJourneyItem, setEditingJourneyItem] = useState<JourneyItem | null>(null);
  const [journeyFormData, setJourneyFormData] = useState<Partial<JourneyItem>>({
    year: '',
    title: '',
    description: '',
    type: 'milestone',
    isHighlight: false,
    order: 0
  });

  useEffect(() => {
    // Load about content
    // @ts-ignore
    const aboutUnsubscribe = onSnapshot(doc(db, 'pageContent', 'about'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setAboutContent({
          id: doc.id,
          title: data.title || 'About Semixon',
          subtitle: data.subtitle || 'Pioneering the next generation of semiconductor technology through innovation, expertise, and a commitment to excellence.',
          content: data.content || '',
          heroImage: data.heroImage || '',
          updatedAt: data.updatedAt?.toDate() || new Date()
        });
      }
      setLoading(false);
    });

    // Load journey items
    // @ts-ignore
    const journeyUnsubscribe = onSnapshot(collection(db, 'journey'), (snapshot) => {
      const items: JourneyItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          year: data.year || '',
          title: data.title || '',
          description: data.description || '',
          type: data.type || 'milestone',
          isHighlight: data.isHighlight || false,
          order: data.order || 0,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        });
      });
      // Sort by order, then by year
      items.sort((a, b) => a.order - b.order || parseInt(a.year) - parseInt(b.year));
      setJourneyItems(items);
    });

    return () => {
      aboutUnsubscribe();
      journeyUnsubscribe();
    };
  }, []);

  const saveAboutContent = async () => {
    setSaving(true);
    try {
      // @ts-ignore
      await setDoc(doc(db, 'pageContent', 'about'), {
        ...aboutContent,
        updatedAt: new Date()
      }, { merge: true });
      
      toast({
        title: 'Content Saved',
        description: 'About page content has been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving about content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save about content. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAboutInputChange = (field: keyof AboutContent, value: string) => {
    setAboutContent(prev => ({ ...prev, [field]: value }));
  };

  const openJourneyDialog = (item?: JourneyItem) => {
    if (item) {
      setEditingJourneyItem(item);
      setJourneyFormData({
        year: item.year,
        title: item.title,
        description: item.description,
        type: item.type,
        isHighlight: item.isHighlight,
        order: item.order
      });
    } else {
      setEditingJourneyItem(null);
      setJourneyFormData({
        year: '',
        title: '',
        description: '',
        type: 'milestone',
        isHighlight: false,
        order: journeyItems.length
      });
    }
    setShowJourneyDialog(true);
  };

  const saveJourneyItem = async () => {
    try {
      const journeyData = {
        year: journeyFormData.year,
        title: journeyFormData.title,
        description: journeyFormData.description,
        type: journeyFormData.type,
        isHighlight: journeyFormData.isHighlight,
        order: journeyFormData.order,
        updatedAt: new Date(),
        ...(editingJourneyItem ? {} : { createdAt: new Date() })
      };

      if (editingJourneyItem && editingJourneyItem.id) {
        // @ts-ignore
        await updateDoc(doc(db, 'journey', editingJourneyItem.id), journeyData);
        toast({
          title: 'Journey Item Updated',
          description: 'Journey timeline item has been updated successfully.',
        });
      } else {
        // @ts-ignore
        await addDoc(collection(db, 'journey'), journeyData);
        toast({
          title: 'Journey Item Added',
          description: 'New journey timeline item has been added successfully.',
        });
      }
      
      setShowJourneyDialog(false);
      setJourneyFormData({
        year: '',
        title: '',
        description: '',
        type: 'milestone',
        isHighlight: false,
        order: 0
      });
    } catch (error) {
      console.error('Error saving journey item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save journey item. Please try again.',
      });
    }
  };

  const deleteJourneyItem = async (id: string) => {
    try {
      // @ts-ignore
      await deleteDoc(doc(db, 'journey', id));
      toast({
        title: 'Journey Item Deleted',
        description: 'Journey timeline item has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting journey item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete journey item. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="space-y-8 p-6">
          <div className="space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-slate-800 rounded-xl border border-slate-700 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-400" />
              About Page Management
            </h1>
            <p className="text-slate-400 mt-2">
              Manage about page content and company journey timeline
            </p>
          </div>
          <Button
            onClick={saveAboutContent}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Content
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* About Content */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-blue-400" />
                About Page Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-300">Page Title</Label>
                <Input
                  id="title"
                  value={aboutContent.title}
                  onChange={(e) => handleAboutInputChange('title', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="About Semixon"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-slate-300">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={aboutContent.subtitle}
                  onChange={(e) => handleAboutInputChange('subtitle', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-slate-300">Main Content</Label>
                <Textarea
                  id="content"
                  value={aboutContent.content}
                  onChange={(e) => handleAboutInputChange('content', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Main about content (HTML supported)"
                  rows={8}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heroImage" className="text-slate-300">Hero Image URL</Label>
                <Input
                  id="heroImage"
                  value={aboutContent.heroImage || ''}
                  onChange={(e) => handleAboutInputChange('heroImage', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Journey Timeline Management */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-green-400" />
                  Company Journey Timeline
                </CardTitle>
                <Button
                  onClick={() => openJourneyDialog()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Timeline Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {journeyItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No journey items yet</p>
                    <p className="text-sm text-slate-500 mt-1">Add timeline items to showcase your company's journey</p>
                  </div>
                ) : (
                  journeyItems.map((item, index) => {
                    const IconComponent = journeyIcons[item.type];
                    const colorClass = journeyColors[item.type];
                    
                    return (
                      <div key={item.id} className="p-4 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-white">{item.year}</span>
                              <Badge variant={item.isHighlight ? 'default' : 'secondary'} className="text-xs">
                                {item.type}
                              </Badge>
                              {item.isHighlight && (
                                <Badge className="bg-yellow-500 text-black text-xs">Highlight</Badge>
                              )}
                            </div>
                            <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openJourneyDialog(item)}
                              className="text-slate-400 hover:text-white hover:bg-slate-700"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => item.id && deleteJourneyItem(item.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journey Item Dialog */}
        <Dialog open={showJourneyDialog} onOpenChange={setShowJourneyDialog}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>
                {editingJourneyItem ? 'Edit Journey Item' : 'Add Journey Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="journey-year" className="text-slate-300">Year</Label>
                  <Input
                    id="journey-year"
                    value={journeyFormData.year}
                    onChange={(e) => setJourneyFormData(prev => ({ ...prev, year: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="journey-type" className="text-slate-300">Type</Label>
                  <Select value={journeyFormData.type} onValueChange={(value) => setJourneyFormData(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                      <SelectItem value="expansion">Expansion</SelectItem>
                      <SelectItem value="innovation">Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="journey-title" className="text-slate-300">Title</Label>
                <Input
                  id="journey-title"
                  value={journeyFormData.title}
                  onChange={(e) => setJourneyFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Journey milestone title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="journey-description" className="text-slate-300">Description</Label>
                <Textarea
                  id="journey-description"
                  value={journeyFormData.description}
                  onChange={(e) => setJourneyFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Describe this milestone..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="journey-order" className="text-slate-300">Display Order</Label>
                  <Input
                    id="journey-order"
                    type="number"
                    value={journeyFormData.order}
                    onChange={(e) => setJourneyFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-8">
                  <input
                    type="checkbox"
                    id="journey-highlight"
                    checked={journeyFormData.isHighlight}
                    onChange={(e) => setJourneyFormData(prev => ({ ...prev, isHighlight: e.target.checked }))}
                    className="rounded border-slate-600 bg-slate-700"
                  />
                  <Label htmlFor="journey-highlight" className="text-slate-300">Highlight Item</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowJourneyDialog(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                Cancel
              </Button>
              <Button onClick={saveJourneyItem} className="bg-blue-600 hover:bg-blue-700 text-white">
                {editingJourneyItem ? 'Update Item' : 'Add Item'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}