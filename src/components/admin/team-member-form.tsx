'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters.' }),
  linkedinUrl: z.string().url({ message: 'Please enter a valid LinkedIn URL.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }).optional().or(z.literal('')),
  imageId: z.string().min(1, { message: 'Image ID cannot be empty.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  priority: z.number().min(1, { message: 'Priority must be at least 1.' }).max(999, { message: 'Priority must be less than 1000.' }),
});

interface TeamMemberFormProps {
  onSuccess?: () => void;
  editingMember?: any;
}

export function TeamMemberForm({ onSuccess, editingMember }: TeamMemberFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editingMember?.name || '',
      role: editingMember?.role || '',
      linkedinUrl: editingMember?.linkedinUrl || 'https://linkedin.com/in/',
      imageUrl: editingMember?.imageUrl || '',
      imageId: editingMember?.imageId || '',
      email: editingMember?.email || '',
      priority: editingMember?.priority || 999,
    },
  });

  const { formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted with values:', values);
      
      const memberData = {
        name: values.name,
        role: values.role,
        linkedinUrl: values.linkedinUrl,
        imageUrl: values.imageUrl || '',
        imageId: values.imageId,
        email: values.email,
        priority: values.priority,
        updatedAt: new Date(),
      };
      
      console.log('Member data to save:', memberData);

      if (editingMember) {
        // Update existing member
        const { updateDoc, doc } = await import('firebase/firestore');
        // @ts-ignore - db is properly typed in firebase.ts
        await updateDoc(doc(db, 'team', editingMember.id), memberData);
        toast({
          title: 'Team Member Updated!',
          description: `${values.name} has been successfully updated.`,
        });
      } else {
        // Add new member
        // @ts-ignore - db is properly typed in firebase.ts
        await addDoc(collection(db, 'team'), {
          ...memberData,
          createdAt: new Date(),
          isActive: true,
        });
        toast({
          title: 'Team Member Added!',
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
        description: `Failed to ${editingMember ? 'update' : 'add'} team member: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
      });
    }
  }

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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Chief Executive Officer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/janedoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <p className="text-xs text-muted-foreground">
                Enter a direct URL to a profile photo. This will override the Image ID field.
              </p>
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
                  placeholder="john@semixon.com" 
                  {...field} 
                />
              </FormControl>
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
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first (1 = highest priority, 999 = lowest)
              </p>
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
              <p className="text-xs text-muted-foreground">
                Used if no image URL is provided
              </p>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting 
            ? (editingMember ? 'Updating...' : 'Adding...') 
            : (editingMember ? 'Update Team Member' : 'Add Team Member')
          }
        </Button>
      </form>
    </Form>
  );
}
