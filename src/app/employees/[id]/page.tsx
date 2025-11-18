'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts but TypeScript can't infer it here
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  User, 
  Building, 
  Download,
  QrCode
} from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  employeeId: string;
  imageUrl?: string;
  imageId: string;
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

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // @ts-ignore - db is properly typed in firebase.ts
        const employeesQuery = query(collection(db, 'employees'), where('employeeId', '==', params.id));
        const querySnapshot = await getDocs(employeesQuery);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setEmployee({
            id: doc.id,
            ...data,
            dateOfJoining: data.dateOfJoining?.toDate() || new Date(),
            dateOfBirth: data.dateOfBirth?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as EmployeeProfile);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEmployee();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading employee profile...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return notFound();
  }

  // Prioritize imageUrl over imageId
  const hasImageUrl = employee.imageUrl && employee.imageUrl.trim() !== '';
  const employeeImage = !hasImageUrl ? PlaceHolderImages.find(img => img.id === employee.imageId) : null;

  const downloadIDCard = () => {
    // In a real implementation, this would trigger the ID card generation process
    alert(`ID card for ${employee.name} would be downloaded here.`);
  };

  const generateQRCode = () => {
    // In a real implementation, this would generate a QR code
    alert(`QR code for ${employee.name} would be generated here.`);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            ← Back to Team
          </Button>
          <div className="flex gap-2">
            <Button 
              onClick={generateQRCode}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR
            </Button>
            <Button 
              onClick={downloadIDCard}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download ID
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative h-32 w-32 rounded-full border-4 border-slate-800 overflow-hidden bg-slate-700">
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
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl">
                    {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <CardHeader className="pt-20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">{employee.name}</h1>
                <p className="text-xl text-blue-400">{employee.role}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                    {employee.department}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                    ID: {employee.employeeId}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`${
                    employee.isActive 
                      ? 'bg-green-900/30 text-green-300 border-green-700' 
                      : 'bg-red-900/30 text-red-300 border-red-700'
                  }`}
                >
                  {employee.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Date of Birth</p>
                        <p className="text-white">
                          {employee.dateOfBirth ? format(new Date(employee.dateOfBirth), 'MMMM d, yyyy') : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Email</p>
                        <p className="text-white">{employee.email}</p>
                      </div>
                    </div>
                    
                    {employee.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-400">Phone</p>
                          <p className="text-white">{employee.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400">Address</p>
                        <p className="text-white whitespace-pre-line">{employee.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Emergency Contact
                  </h2>
                  <div className="space-y-4 bg-slate-700/30 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-400">Name</p>
                      <p className="text-white">{employee.emergencyContact.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-400">Phone</p>
                      <p className="text-white">{employee.emergencyContact.phone}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-400">Relationship</p>
                      <p className="text-white">{employee.emergencyContact.relationship}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-400" />
                    Employment Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Date of Joining</p>
                        <p className="text-white">
                          {employee.dateOfJoining ? format(new Date(employee.dateOfJoining), 'MMMM d, yyyy') : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Department</p>
                        <p className="text-white">{employee.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-400">Employee ID</p>
                        <p className="text-white font-mono">{employee.employeeId}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {employee.qrData && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <QrCode className="h-5 w-5 text-blue-400" />
                      Employee QR Code
                    </h2>
                    <div className="bg-white p-4 rounded-lg flex items-center justify-center">
                      {/* In a real implementation, this would display the actual QR code */}
                      <div className="bg-slate-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center">
                        <span className="text-slate-500">QR Code</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2 text-center">
                      Scan this QR code for quick access to employee information
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}