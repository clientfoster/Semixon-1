'use client';

import { useForm, useFieldArray } from 'react-hook-form';
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
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PlusCircle, Trash } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  specs: z.array(z.object({
    value: z.string().min(1, { message: 'Specification cannot be empty.' })
  })).min(1, { message: 'Please add at least one specification.' }),
});

export function ProductForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      specs: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'specs',
  });
  
  const { formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addDoc(collection(db, 'products'), {
        name: values.name,
        specs: values.specs.map(spec => spec.value),
      });
      toast({
        title: 'Product Added!',
        description: `${values.name} has been successfully added.`,
      });
      form.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to add product. Please try again.',
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
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="QuantumCore Q-1 Processor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel>Specifications</FormLabel>
          <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`specs.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder={`Specification ${index + 1}`} {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Specification
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
