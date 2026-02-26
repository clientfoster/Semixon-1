'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

function isValidIndianPhone(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }

  return false;
}

function normalizeIndianPhone(value: string) {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }

  return value;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || isValidIndianPhone(value), {
      message: 'Please enter a valid Indian phone number.',
    }),
  company: z.string().optional(),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  communicationConsent: z.literal(true, {
    errorMap: () => ({ message: 'This consent is required.' }),
  }),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
      communicationConsent: false,
    },
  });

  const { formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: values.name,
        email: values.email,
        phone: values.phone ? normalizeIndianPhone(values.phone) : '',
        company: values.company || '',
        subject: values.subject,
        message: values.message,
        status: 'new' as const,
        priority: 'medium' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you shortly.',
      });
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Full Name</FormLabel>
              <FormControl>
                <Input className="bg-white text-black placeholder:text-slate-500" placeholder="John Doe" {...field} />
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
              <FormLabel className="text-slate-700">Email Address</FormLabel>
              <FormControl>
                <Input className="bg-white text-black placeholder:text-slate-500" type="email" placeholder="john.doe@example.com" {...field} />
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
              <FormLabel className="text-slate-700">Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input className="bg-white text-black placeholder:text-slate-500" placeholder="+91 XXXXX XXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Company (Optional)</FormLabel>
              <FormControl>
                <Input className="bg-white text-black placeholder:text-slate-500" placeholder="Your Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Subject</FormLabel>
              <FormControl>
                <Input className="bg-white text-black placeholder:text-slate-500" placeholder="What is this about?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700">Your Message</FormLabel>
              <FormControl>
                <Textarea className="bg-white text-black placeholder:text-slate-500" placeholder="How can we help you?" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="communicationConsent"
          render={({ field }) => (
            <FormItem className="rounded-md border border-slate-200 bg-white p-3">
              <div className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-0.5 border-slate-500 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal leading-6 text-slate-800">
                  You agree to receive communication messages via RCS, SMS, WhatsApp, Voice Call & Email.
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
