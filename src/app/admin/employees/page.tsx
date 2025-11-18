'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts but TypeScript can't infer it here
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Download,
  QrCode
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { EmployeeForm } from '@/components/admin/employee-form';
import { EmployeeList } from '@/components/admin/employee-list';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  employeeId: string;
  imageUrl?: string;
  imageId: string;
  priority: number;
  dateOfJoining: Date;
  dateOfBirth: Date;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  qrData?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

export default function EmployeeManagementPage() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Use a simple query without composite index to avoid Firestore index requirements
    // @ts-ignore - db is properly typed in firebase.ts
    const employeesQuery = query(collection(db, 'employees'));
    const employeesUnsubscribe = onSnapshot(employeesQuery, (snapshot) => {
      const employeesData: Employee[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        employeesData.push({
          id: doc.id,
          ...data,
          priority: data.priority || 999,
          dateOfJoining: data.dateOfJoining?.toDate() || new Date(),
          dateOfBirth: data.dateOfBirth?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Employee);
      });
      // Sort by priority first, then by name as fallback
      employeesData.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.name.localeCompare(b.name);
      });
      setEmployees(employeesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching employees:', error);
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to load employees: ${error.message}`,
      });
    });

    return () => {
      employeesUnsubscribe();
    };
  }, [toast]);

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = async (employee: Employee) => {
    try {
      console.log('Deleting employee:', employee.id, employee.name);
      
      if (!employee.id) {
        throw new Error('Employee ID is missing');
      }
      
      // @ts-ignore - db is properly typed in firebase.ts
      await deleteDoc(doc(db, 'employees', employee.id));
      
      toast({
        title: 'Employee Deleted',
        description: `${employee.name} has been removed from the system.`,
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to delete employee: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const generateQRCode = async (employee: Employee) => {
    try {
      // Generate QR code data
      const qrData = JSON.stringify({
        id: employee.employeeId,
        name: employee.name,
        role: employee.role,
        department: employee.department,
        email: employee.email
      });
      
      // Update employee with QR data
      // @ts-ignore - db is properly typed in firebase.ts
      await updateDoc(doc(db, 'employees', employee.id), {
        qrData,
        updatedAt: new Date()
      });
      
      toast({
        title: 'QR Code Generated',
        description: `QR code has been generated for ${employee.name}.`,
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to generate QR code: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  const downloadIDCard = async (employee: Employee) => {
    try {
      // Prepare employee data for ID card generation
      const employeeData = {
        name: employee.name,
        role: employee.role,
        company: "Semixon Technologies",
        phone: employee.phone,
        email: employee.email,
        employee_id: employee.employeeId,
        photo_path: employee.imageUrl || '',
        qr_data: JSON.stringify({
          id: employee.employeeId,
          name: employee.name,
          role: employee.role,
          email: employee.email
        }),
        website: "www.semixon.com"
      };

      // Call the API to generate the ID card
      const response = await fetch('/api/generate-id-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeData,
          templateFront: '/templates/id-front.jpg', // You would need to provide these templates
          templateBack: '/templates/id-back.jpg'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Create instant downloads for both front and back ID cards
        const downloadFile = (base64Data: string, filename: string) => {
          const link = document.createElement('a');
          link.href = `data:image/jpeg;base64,${base64Data}`;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        // Download front and back ID cards instantly
        downloadFile(result.frontCardData, result.frontFileName);
        downloadFile(result.backCardData, result.backFileName);
        
        toast({
          title: 'ID Cards Downloaded!',
          description: `ID cards for ${employee.name} have been downloaded instantly.`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error downloading ID card:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to download ID card: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="space-y-8 p-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-slate-800 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800 rounded-xl border border-slate-700 animate-pulse"></div>
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="h-96 bg-slate-800 rounded-xl border border-slate-700 animate-pulse"></div>
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
              <Users className="h-8 w-8 text-blue-400" />
              Employee Management
            </h1>
            <p className="text-slate-400 mt-2">
              Manage your employees, generate ID cards, and handle employee data
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true);
                // Force re-fetch
                window.location.reload();
              }}
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="w-full max-w-md">
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Employees</p>
                  <p className="text-3xl font-bold text-white">{employees.length}</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Active Employees</p>
                  <p className="text-3xl font-bold text-white">
                    {employees.filter(e => e.isActive !== false).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">Departments</p>
                  <p className="text-3xl font-bold text-white">
                    {new Set(employees.map(e => e.department)).size}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">ID Cards Generated</p>
                  <p className="text-3xl font-bold text-white">
                    {employees.filter(e => e.qrData).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Download className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="grid" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="table" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              Table View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6">
            {filteredEmployees.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-12 text-center">
                  <div className="text-slate-400">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No employees found</p>
                    <p className="text-sm">Add your first employee to get started.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEmployees.map((employee) => {
                  // Prioritize imageUrl over imageId
                  const hasImageUrl = employee.imageUrl && employee.imageUrl.trim() !== '';
                  const employeeImage = !hasImageUrl ? PlaceHolderImages.find(img => img.id === employee.imageId) : null;
                  
                  return (
                    <Card key={employee.id} className="bg-slate-800 border-slate-700 text-center flex flex-col items-center pt-8 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                      <CardHeader className="p-0 relative">
                        {/* Priority Badge */}
                        <div className="absolute top-2 left-2 z-10">
                          <Badge 
                            variant="outline" 
                            className={`text-xs font-mono ${
                              (employee.priority || 999) <= 3 
                                ? 'bg-green-900/30 text-green-300 border-green-700' 
                                : (employee.priority || 999) <= 10 
                                ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700'
                                : 'bg-slate-700/50 text-slate-400 border-slate-600'
                            }`}
                          >
                            #{employee.priority || 999}
                          </Badge>
                        </div>
                        
                        <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full border-4 border-slate-600 outline-2 outline-blue-500/20">
                              {hasImageUrl ? (
                                <Image
                                  src={employee.imageUrl!}
                                  alt={`${employee.name}'s profile photo`}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 128px, 128px"
                                  onError={(e) => {
                                    // Fallback to placeholder image if URL fails
                                    const target = e.target as HTMLImageElement;
                                    const fallbackImage = PlaceHolderImages.find(img => img.id === employee.imageId);
                                    if (fallbackImage) {
                                      target.src = fallbackImage.imageUrl;
                                    }
                                  }}
                                />
                              ) : employeeImage ? (
                                <Image
                                  src={employeeImage.imageUrl}
                                  alt={employeeImage.description}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 128px, 128px"
                                  data-ai-hint={employeeImage.imageHint}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                                  {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                              )}
                        </div>
                        
                        {/* Action buttons - positioned absolutely */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-slate-800/80 hover:bg-slate-700 border border-slate-600">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem
                                onClick={() => handleEdit(employee)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => generateQRCode(employee)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <QrCode className="h-4 w-4 mr-2" />
                                Generate QR
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => downloadIDCard(employee)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-slate-700" />
                              <DropdownMenuItem
                                onClick={() => handleDelete(employee)}
                                className="text-red-400 hover:bg-red-900/20"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      <CardContent className="mt-4 w-full">
                        <h3 className="text-xl font-semibold text-white mb-1">{employee.name}</h3>
                        <p className="text-blue-400 font-medium mb-1">{employee.role}</p>
                        <p className="text-slate-400 text-sm mb-3">{employee.department}</p>
                        
                        <div className="space-y-2 text-sm text-slate-400 mb-4">
                          <div className="flex items-center justify-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span className="truncate">{employee.email}</span>
                          </div>
                          {employee.phone && (
                            <div className="flex items-center justify-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{employee.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>ID: {employee.employeeId}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-700">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(employee)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => generateQRCode(employee)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => downloadIDCard(employee)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="table">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-0">
                <EmployeeList employees={filteredEmployees} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Employee Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEmployee(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EmployeeForm 
                  onSuccess={() => {
                    console.log('Form success callback called');
                    setShowForm(false);
                    setEditingEmployee(null);
                    console.log('Form closed and editing employee cleared');
                  }}
                  editingEmployee={editingEmployee}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}