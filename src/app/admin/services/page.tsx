'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { services as existingServices } from '@/lib/data';

export interface Service {
  id?: string;
  title: string;
  category: 'Semiconductors' | 'Embedded' | 'Software' | 'Digital Marketing';
  description: string;
  imageId: string;
  imageUrl?: string; // Direct image URL
  href: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  docId?: string; // Firestore document ID
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('title'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const servicesData: Service[] = [];
      snapshot.forEach((doc) => {
        servicesData.push({
          docId: doc.id, // Store Firestore document ID
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Service);
      });
      setServices(servicesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(service => service.category === categoryFilter);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, categoryFilter]);

  const saveAllExistingServices = async () => {
    setSaving(true);
    try {
      let savedCount = 0;
      let skippedCount = 0;

      for (const service of existingServices) {
        // Check if service already exists
        const exists = services.find(s => s.id === service.id);
        if (!exists) {
          await addDoc(collection(db, 'services'), {
            ...service,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          savedCount++;
        } else {
          skippedCount++;
        }
      }

      toast({
        title: 'Services Import Complete!',
        description: `Successfully imported ${savedCount} services. ${skippedCount} already existed.`,
      });
    } catch (error) {
      console.error('Error importing services:', error);
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description: 'Failed to import services. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const saveService = async (serviceData: Service) => {
    try {
      if (selectedService && selectedService.docId) {
        // Update existing service using the Firestore document ID
        await updateDoc(doc(db, 'services', selectedService.docId), {
          ...serviceData,
          updatedAt: new Date(),
        });
        toast({
          title: 'Service Updated!',
          description: `${serviceData.title} has been updated successfully.`,
        });
      } else {
        // Create new service
        await addDoc(collection(db, 'services'), {
          ...serviceData,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        toast({
          title: 'Service Created!',
          description: `${serviceData.title} has been created successfully.`,
        });
      }
      setIsDialogOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save service. Please try again.',
      });
    }
  };

  const deleteService = async (serviceDocId: string) => {
    try {
      await deleteDoc(doc(db, 'services', serviceDocId));
      toast({
        title: 'Service Deleted!',
        description: 'Service has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete service.',
      });
    }
  };

  const editService = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const createNewService = () => {
    setSelectedService(null);
    setIsDialogOpen(true);
  };

  const getCategoryBadgeVariant = (category: Service['category']) => {
    switch (category) {
      case 'Semiconductors': return 'default';
      case 'Embedded': return 'secondary';
      case 'Software': return 'outline';
      case 'Digital Marketing': return 'destructive';
      default: return 'secondary';
    }
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
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">
            Manage your service offerings and import existing services to Firestore.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveAllExistingServices} disabled={saving}>
            <Upload className="h-4 w-4 mr-2" />
            {saving ? 'Importing...' : `Import All Services (${existingServices.length})`}
          </Button>
          <Button onClick={createNewService}>
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </div>
      </div>

      {/* Import Status */}
      {services.length === 0 && (
        <Card className="border-slate-200 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-slate-600" />
              <div>
                <h3 className="font-medium text-slate-900">No services found in database</h3>
                <p className="text-sm text-slate-700">
                  Click "Import All Services" to add all {existingServices.length} existing services to Firestore.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Semiconductors">Semiconductors</SelectItem>
                <SelectItem value="Embedded">Embedded</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid gap-4">
        {filteredServices.length === 0 ? (
    <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No services found</h3>
                <p className="text-muted-foreground">
                  {services.length === 0 
                    ? "Import existing services or create new ones to get started."
                    : "No services match your current filters."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      <Badge variant={getCategoryBadgeVariant(service.category)}>
                        {service.category}
                      </Badge>
                      <Badge variant={service.isActive ? 'default' : 'secondary'}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {service.id}</span>
                      <span>Path: {service.href}</span>
                      <span>Image: {service.imageUrl ? 'URL provided' : service.imageId}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editService(service)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={service.href} target="_blank">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteService(service.docId!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
      </CardContent>
    </Card>
          ))
        )}
      </div>

      {/* Service Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? 'Edit Service' : 'Create New Service'}
            </DialogTitle>
          </DialogHeader>
          
          <ServiceForm 
            service={selectedService}
            onSave={saveService}
            onCancel={() => {
              setIsDialogOpen(false);
              setSelectedService(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Service Form Component
function ServiceForm({ 
  service, 
  onSave, 
  onCancel 
}: { 
  service: Service | null;
  onSave: (service: Service) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Service>({
    title: '',
    category: 'Semiconductors',
    description: '',
    imageId: '',
    imageUrl: '',
    href: '',
    isActive: true,
  });

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        title: '',
        category: 'Semiconductors',
        description: '',
        imageId: '',
        imageUrl: '',
        href: '',
        isActive: true,
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      return;
    }
    onSave(formData);
  };

  const generateHref = (title: string) => {
    return `/services/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
  };

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Service Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              setFormData(prev => ({
                ...prev,
                title,
                id: generateId(title),
                href: generateHref(title)
              }));
            }}
            placeholder="Enter service title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value: Service['category']) => 
              setFormData(prev => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semiconductors">Semiconductors</SelectItem>
              <SelectItem value="Embedded">Embedded</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter service description"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-muted-foreground">
          Enter a direct URL to an image. This will override the Image ID field.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="imageId">Image ID (Fallback)</Label>
          <Input
            id="imageId"
            value={formData.imageId}
            onChange={(e) => setFormData(prev => ({ ...prev, imageId: e.target.value }))}
            placeholder="service-1, product-1, etc."
          />
          <p className="text-xs text-muted-foreground">
            Used if no image URL is provided
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="href">URL Path</Label>
          <Input
            id="href"
            value={formData.href}
            onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
            placeholder="/services/service-name"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {service ? 'Update Service' : 'Create Service'}
        </Button>
      </div>
    </form>
  );
}