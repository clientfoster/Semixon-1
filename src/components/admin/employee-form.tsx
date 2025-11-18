'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
// @ts-ignore - db is properly typed in firebase.ts
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Download, QrCode } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  department: z.string().min(2, { message: 'Department must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  employeeId: z.string().min(1, { message: 'Employee ID cannot be empty.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }).optional().or(z.literal('')),
  imageId: z.string().min(1, { message: 'Image ID cannot be empty.' }),
  priority: z.number().min(1, { message: 'Priority must be at least 1.' }).max(999, { message: 'Priority must be less than 1000.' }),
  dateOfJoining: z.date({ required_error: "Date of joining is required." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  emergencyContact: z.object({
    name: z.string().min(2, { message: 'Emergency contact name is required.' }),
    phone: z.string().min(10, { message: 'Emergency contact phone is required.' }),
    relationship: z.string().min(2, { message: 'Relationship is required.' }),
  }),
});

interface EmployeeFormProps {
  onSuccess?: () => void;
  editingEmployee?: any;
}

export function EmployeeForm({ onSuccess, editingEmployee }: EmployeeFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editingEmployee?.name || '',
      role: editingEmployee?.role || '',
      department: editingEmployee?.department || '',
      email: editingEmployee?.email || '',
      phone: editingEmployee?.phone || '',
      employeeId: editingEmployee?.employeeId || '',
      imageUrl: editingEmployee?.imageUrl || '',
      imageId: editingEmployee?.imageId || '',
      priority: editingEmployee?.priority || 999,
      dateOfJoining: editingEmployee?.dateOfJoining ? new Date(editingEmployee.dateOfJoining) : new Date(),
      dateOfBirth: editingEmployee?.dateOfBirth ? new Date(editingEmployee.dateOfBirth) : new Date(),
      address: editingEmployee?.address || '',
      emergencyContact: {
        name: editingEmployee?.emergencyContact?.name || '',
        phone: editingEmployee?.emergencyContact?.phone || '',
        relationship: editingEmployee?.emergencyContact?.relationship || '',
      },
    },
  });

  const { formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted with values:', values);
      
      const employeeData = {
        name: values.name,
        role: values.role,
        department: values.department,
        email: values.email,
        phone: values.phone,
        employeeId: values.employeeId,
        imageUrl: values.imageUrl || '',
        imageId: values.imageId,
        priority: values.priority,
        dateOfJoining: values.dateOfJoining,
        dateOfBirth: values.dateOfBirth,
        address: values.address,
        emergencyContact: values.emergencyContact,
        updatedAt: new Date(),
      };
      
      console.log('Employee data to save:', employeeData);

      if (editingEmployee) {
        // Update existing employee
        const { updateDoc, doc } = await import('firebase/firestore');
        // @ts-ignore - db is properly typed in firebase.ts
        await updateDoc(doc(db, 'employees', editingEmployee.id), employeeData);
        toast({
          title: 'Employee Updated!',
          description: `${values.name} has been successfully updated.`,
        });
      } else {
        // Add new employee
        // @ts-ignore - db is properly typed in firebase.ts
        await addDoc(collection(db, 'employees'), {
          ...employeeData,
          createdAt: new Date(),
          isActive: true,
        });
        toast({
          title: 'Employee Added!',
          description: `${values.name} has been successfully added.`,
        });
      }
      
      form.reset();
      console.log('Form reset completed');
      onSuccess?.();
      console.log('onSuccess callback called');
    } catch (error) {
      console.error('Error saving document: ', error);
      console.error('Error details:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: `Failed to ${editingEmployee ? 'update' : 'add'} employee: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
      });
    }
  }

  const generateIDCard = async () => {
    try {
      const values = form.getValues();
      
      // Prepare employee data for ID card generation
      const employeeData = {
        name: values.name,
        role: values.role,
        company: "Semixon Technologies",
        phone: values.phone,
        email: values.email,
        employee_id: values.employeeId,
        photo_path: values.imageUrl || '',
        qr_data: JSON.stringify({
          id: values.employeeId,
          name: values.name,
          role: values.role,
          email: values.email
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
          description: `ID cards for ${values.name} have been downloaded instantly.`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error generating ID card:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to generate ID card: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="p-4 bg-slate-800 rounded-lg text-xs">
            <p>Form errors: {JSON.stringify(form.formState.errors)}</p>
            <p>Form values: {JSON.stringify(form.getValues())}</p>
            <p>Is valid: {form.formState.isValid ? 'Yes' : 'No'}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="jane@semixon.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+1 (555) 123-4567" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-slate-700 border-slate-600 text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="123 Main Street, City, State, ZIP" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="emergencyContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+1 (555) 123-4567" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContact.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Father, Mother, Spouse, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Employment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee ID</FormLabel>
                      <FormControl>
                        <Input placeholder="EMP-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role/Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateOfJoining"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Joining</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-slate-700 border-slate-600 text-white",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Priority</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="1"
                          min="1"
                          max="999"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 999)}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Lower numbers appear first (1 = highest priority, 999 = lowest)
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Profile Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="url"
                          placeholder="https://example.com/profile-photo.jpg" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Enter a direct URL to a profile photo. This will override the Image ID field.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="imageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image ID (Fallback)</FormLabel>
                      <FormControl>
                        <Input placeholder="team-1" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Used if no image URL is provided
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            onClick={generateIDCard}
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={formState.isSubmitting}
          >
            <QrCode className="h-4 w-4 mr-2" />
            Generate ID Card
          </Button>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting 
              ? (editingEmployee ? 'Updating...' : 'Adding...') 
              : (editingEmployee ? 'Update Employee' : 'Add Employee')
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}