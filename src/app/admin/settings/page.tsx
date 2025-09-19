'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  EyeOff,
  Palette,
  Bell,
  Shield,
  Database,
  Cloud,
  Zap,
  Monitor,
  Smartphone,
  Laptop
} from 'lucide-react';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts but TypeScript can't infer it here
import { db } from '@/lib/firebase';

interface SiteSettings {
  // General
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  
  // Contact
  contactEmail: string;
  contactPhone: string;
  address: string;
  
  // Social Media
  facebookUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  githubUrl: string;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  
  // Features
  maintenanceMode: boolean;
  analyticsEnabled: boolean;
  commentsEnabled: boolean;
  newsletterEnabled: boolean;
  
  // Appearance
  primaryColor: string;
  secondaryColor: string;
  
  // Performance
  cacheEnabled: boolean;
  cdnEnabled: boolean;
  compressionEnabled: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'Semixon',
  siteDescription: 'Leading semiconductor and embedded systems solutions provider',
  siteUrl: 'https://semixon.com',
  logoUrl: '/logo.png',
  faviconUrl: '/favicon.ico',
  contactEmail: 'info@semixon.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Tech Street, Silicon Valley, CA 94000',
  facebookUrl: 'https://facebook.com/semixon',
  linkedinUrl: 'https://linkedin.com/company/semixon',
  twitterUrl: 'https://twitter.com/semixon',
  githubUrl: 'https://github.com/semixon',
  metaTitle: 'Semixon - Semiconductor & Embedded Solutions',
  metaDescription: 'Leading provider of semiconductor and embedded systems solutions',
  metaKeywords: 'semiconductor, embedded systems, IC design, FPGA, IoT',
  maintenanceMode: false,
  analyticsEnabled: true,
  commentsEnabled: true,
  newsletterEnabled: true,
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  cacheEnabled: true,
  cdnEnabled: false,
  compressionEnabled: true,
};

export default function SiteSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // @ts-ignore - db is properly typed in firebase.ts
      const settingsRef = collection(db, 'siteSettings');
      const snapshot = await getDocs(settingsRef);
      
      if (!snapshot.empty) {
        const settingsData = snapshot.docs[0].data() as SiteSettings;
        setSettings(settingsData);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load settings. Using defaults.',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // @ts-ignore - db is properly typed in firebase.ts
      const settingsRef = doc(db, 'siteSettings', 'main');
      await setDoc(settingsRef, settings, { merge: true });
      
      toast({
        title: 'Settings Saved',
        description: 'Your site settings have been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
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
            {[...Array(6)].map((_, i) => (
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
              <Settings className="h-8 w-8 text-blue-400" />
              Site Settings
            </h1>
            <p className="text-slate-400 mt-2">
              Configure your website settings, appearance, and features
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSettings}
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={saveSettings}
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
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-blue-400" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="text-slate-300">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Enter site name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription" className="text-slate-300">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Enter site description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteUrl" className="text-slate-300">Site URL</Label>
                <Input
                  id="siteUrl"
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="text-slate-300">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={settings.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    placeholder="/logo.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl" className="text-slate-300">Favicon URL</Label>
                  <Input
                    id="faviconUrl"
                    value={settings.faviconUrl}
                    onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    placeholder="/favicon.ico"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-green-400" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-slate-300">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="info@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-slate-300">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-300">Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-purple-400" />
                Social Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl" className="text-slate-300">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="https://facebook.com/semixon"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl" className="text-slate-300">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="https://linkedin.com/company/example"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitterUrl" className="text-slate-300">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="https://twitter.com/example"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="githubUrl" className="text-slate-300">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={settings.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="https://github.com/example"
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Eye className="h-5 w-5 text-yellow-400" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle" className="text-slate-300">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Page title for search engines"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription" className="text-slate-300">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Description for search engines"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaKeywords" className="text-slate-300">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-5 w-5 text-orange-400" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">Maintenance Mode</Label>
                  <p className="text-sm text-slate-400">Enable to show maintenance page to visitors</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                />
              </div>
              
              <Separator className="bg-slate-700" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">Analytics</Label>
                  <p className="text-sm text-slate-400">Enable website analytics tracking</p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => handleInputChange('analyticsEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">Comments</Label>
                  <p className="text-sm text-slate-400">Allow comments on blog posts</p>
                </div>
                <Switch
                  checked={settings.commentsEnabled}
                  onCheckedChange={(checked) => handleInputChange('commentsEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">Newsletter</Label>
                  <p className="text-sm text-slate-400">Enable newsletter subscription</p>
                </div>
                <Switch
                  checked={settings.newsletterEnabled}
                  onCheckedChange={(checked) => handleInputChange('newsletterEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Palette className="h-5 w-5 text-pink-400" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-slate-300">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1 bg-slate-700 border-slate-600"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-slate-300">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1 bg-slate-700 border-slate-600"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      placeholder="#8b5cf6"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="h-5 w-5 text-cyan-400" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">Caching</Label>
                  <p className="text-sm text-slate-400">Enable page and asset caching</p>
                </div>
                <Switch
                  checked={settings.cacheEnabled}
                  onCheckedChange={(checked) => handleInputChange('cacheEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">CDN</Label>
                  <p className="text-sm text-slate-400">Use Content Delivery Network</p>
                </div>
                <Switch
                  checked={settings.cdnEnabled}
                  onCheckedChange={(checked) => handleInputChange('cdnEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-slate-300">Compression</Label>
                  <p className="text-sm text-slate-400">Enable gzip compression for assets</p>
                </div>
                <Switch
                  checked={settings.compressionEnabled}
                  onCheckedChange={(checked) => handleInputChange('compressionEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Database</p>
                  <p className="text-xs text-green-400">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Firebase</p>
                  <p className="text-xs text-green-400">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-slate-300">CDN</p>
                  <p className="text-xs text-yellow-400">{settings.cdnEnabled ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}