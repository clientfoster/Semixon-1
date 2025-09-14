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
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Save,
  Eye,
  Search,
  AlertCircle
} from 'lucide-react';

// Existing industries data
const existingIndustries = [
  {
    id: 'semiconductor',
    name: 'Semiconductor',
    href: '/industries/semiconductor',
    icon: 'Building2',
    description: 'Advanced semiconductor solutions for chip manufacturers and fabless companies',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-blue-600',
    isActive: true
  },
  {
    id: 'bfsi',
    name: 'BFSI',
    href: '/industries/bfsi',
    icon: 'CreditCard',
    description: 'Secure financial technology solutions for banking and financial services',
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-green-600',
    isActive: true
  },
  {
    id: 'insurance',
    name: 'Insurance',
    href: '/industries/insurance',
    icon: 'Shield',
    description: 'Risk management and data analytics solutions for insurance companies',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-purple-600',
    isActive: true
  },
  {
    id: 'retail',
    name: 'Retail',
    href: '/industries/retail',
    icon: 'Smartphone',
    description: 'E-commerce and digital transformation solutions for retail businesses',
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-orange-600',
    isActive: true
  },
  {
    id: 'automotive',
    name: 'Automotive',
    href: '/industries/automotive',
    icon: 'Car',
    description: 'Connected vehicle and autonomous driving technology solutions',
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-red-600',
    isActive: true
  },
  {
    id: 'telecom-and-network',
    name: 'Telecom and Network',
    href: '/industries/telecom-and-network',
    icon: 'Wifi',
    description: '5G, IoT, and network infrastructure solutions for telecommunications',
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    isActive: true
  }
];

export interface Industry {
  id?: string;
  name: string;
  href: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function IndustriesManagementPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [filteredIndustries, setFilteredIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'industries'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const industriesData: Industry[] = [];
      snapshot.forEach((doc) => {
        industriesData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Industry);
      });
      setIndustries(industriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let filtered = industries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(industry =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        industry.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIndustries(filtered);
  }, [industries, searchTerm]);

  const saveAllExistingIndustries = async () => {
    setSaving(true);
    try {
      let savedCount = 0;
      let skippedCount = 0;

      for (const industry of existingIndustries) {
        // Check if industry already exists
        const exists = industries.find(i => i.id === industry.id);
        if (!exists) {
          await addDoc(collection(db, 'industries'), {
            ...industry,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          savedCount++;
        } else {
          skippedCount++;
        }
      }

      toast({
        title: 'Industries Import Complete!',
        description: `Successfully imported ${savedCount} industries. ${skippedCount} already existed.`,
      });
    } catch (error) {
      console.error('Error importing industries:', error);
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description: 'Failed to import industries. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const saveIndustry = async (industryData: Industry) => {
    try {
      if (selectedIndustry) {
        await updateDoc(doc(db, 'industries', selectedIndustry.id!), {
          ...industryData,
          updatedAt: new Date(),
        });
        toast({
          title: 'Industry Updated!',
          description: `${industryData.name} has been updated successfully.`,
        });
      } else {
        await addDoc(collection(db, 'industries'), {
          ...industryData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        toast({
          title: 'Industry Created!',
          description: `${industryData.name} has been created successfully.`,
        });
      }
      setIsDialogOpen(false);
      setSelectedIndustry(null);
    } catch (error) {
      console.error('Error saving industry:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save industry. Please try again.',
      });
    }
  };

  const deleteIndustry = async (industryId: string) => {
    try {
      await deleteDoc(doc(db, 'industries', industryId));
      toast({
        title: 'Industry Deleted!',
        description: 'Industry has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting industry:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete industry.',
      });
    }
  };

  const editIndustry = (industry: Industry) => {
    setSelectedIndustry(industry);
    setIsDialogOpen(true);
  };

  const createNewIndustry = () => {
    setSelectedIndustry(null);
    setIsDialogOpen(true);
  };

  const getIndustryBadgeVariant = (isActive: boolean) => {
    return isActive ? 'default' : 'secondary';
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
          <h1 className="text-3xl font-bold">Industries Management</h1>
          <p className="text-muted-foreground">
            Manage your industry solutions and import existing industries to Firestore.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveAllExistingIndustries} disabled={saving}>
            <Upload className="h-4 w-4 mr-2" />
            {saving ? 'Importing...' : `Import All Industries (${existingIndustries.length})`}
          </Button>
          <Button onClick={createNewIndustry}>
            <Plus className="h-4 w-4 mr-2" />
            New Industry
          </Button>
        </div>
      </div>

      {/* Import Status */}
      {industries.length === 0 && (
        <Card className="border-slate-200 bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-slate-600" />
              <div>
                <h3 className="font-medium text-slate-900">No industries found in database</h3>
                <p className="text-sm text-slate-700">
                  Click "Import All Industries" to add all {existingIndustries.length} existing industries to Firestore.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Industries List */}
      <div className="grid gap-4">
        {filteredIndustries.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No industries found</h3>
                <p className="text-muted-foreground">
                  {industries.length === 0 
                    ? "Import existing industries or create new ones to get started."
                    : "No industries match your current search."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredIndustries.map((industry) => (
            <Card key={industry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{industry.name}</h3>
                      <Badge variant={getIndustryBadgeVariant(industry.isActive)}>
                        {industry.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">
                        {industry.icon}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {industry.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ID: {industry.id}</span>
                      <span>Path: {industry.href}</span>
                      <span>Color: {industry.color}</span>
                    </div>

                    <div className="flex gap-2">
                      <div className={`w-4 h-4 rounded ${industry.bgColor}`}></div>
                      <span className="text-xs text-muted-foreground">
                        {industry.bgColor} / {industry.textColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editIndustry(industry)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={industry.href} target="_blank">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteIndustry(industry.id!)}
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

      {/* Industry Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedIndustry ? 'Edit Industry' : 'Create New Industry'}
            </DialogTitle>
          </DialogHeader>
          
          <IndustryForm 
            industry={selectedIndustry}
            onSave={saveIndustry}
            onCancel={() => {
              setIsDialogOpen(false);
              setSelectedIndustry(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Industry Form Component
function IndustryForm({ 
  industry, 
  onSave, 
  onCancel 
}: { 
  industry: Industry | null;
  onSave: (industry: Industry) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Industry>({
    name: '',
    href: '',
    icon: 'Building2',
    description: '',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-blue-600',
    isActive: true,
  });

  useEffect(() => {
    if (industry) {
      setFormData(industry);
    } else {
      setFormData({
        name: '',
        href: '',
        icon: 'Building2',
        description: '',
        color: 'from-blue-500 to-blue-700',
        bgColor: 'bg-slate-50',
        textColor: 'text-blue-600',
        isActive: true,
      });
    }
  }, [industry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      return;
    }
    onSave(formData);
  };

  const generateHref = (name: string) => {
    return `/industries/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
  };

  const generateId = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const iconOptions = [
    'Building2', 'CreditCard', 'Shield', 'Smartphone', 'Car', 'Wifi',
    'Factory', 'Banknote', 'Heart', 'ShoppingBag', 'Truck', 'Cpu'
  ];

  const colorOptions = [
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
    { value: 'from-slate-500 to-slate-700', bg: 'bg-slate-50', text: 'text-slate-600' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Industry Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              setFormData(prev => ({
                ...prev,
                name,
                id: generateId(name),
                href: generateHref(name)
              }));
            }}
            placeholder="Enter industry name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Select 
            value={formData.icon} 
            onValueChange={(value) => 
              setFormData(prev => ({ ...prev, icon: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>{icon}</SelectItem>
              ))}
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
          placeholder="Enter industry description"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="href">URL Path</Label>
          <Input
            id="href"
            value={formData.href}
            onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
            placeholder="/industries/industry-name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color Theme</Label>
          <Select 
            value={formData.color} 
            onValueChange={(value) => {
              const colorOption = colorOptions.find(opt => opt.value === value);
              if (colorOption) {
                setFormData(prev => ({ 
                  ...prev, 
                  color: value,
                  bgColor: colorOption.bg,
                  textColor: colorOption.text
                }));
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${color.bg}`}></div>
                    <span>{color.value}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          {industry ? 'Update Industry' : 'Create Industry'}
        </Button>
      </div>
    </form>
  );
}
