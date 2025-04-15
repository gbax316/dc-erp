import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Form, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createChurch, churchSchema, type ChurchFormValues } from '@/services/church';
import { cn } from '@/lib/utils';

interface ChurchRegistrationFormProps {
  onSuccess?: () => void;
}

export function ChurchRegistrationForm({ onSuccess }: ChurchRegistrationFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<ChurchFormValues>({
    resolver: zodResolver(churchSchema),
    defaultValues: {
      church_name: '',
      address: '',
      state: '',
      membership_strength: undefined,
      pastor_name: '',
      pastor_phone: '',
      pastor_email: '',
      admin_name: '',
      admin_phone: '',
      admin_email: '',
    }
  });
  
  const onSubmit = async (data: ChurchFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await createChurch(data);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/churches');
      }
      
      form.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Church registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form 
      form={form} 
      onSubmit={onSubmit} 
      className="space-y-8 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Church Registration</h2>
        <p className="text-gray-600">Please fill out the form to register a new church</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Church Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Church Information</h3>
        </div>
        
        <FormItem 
          name="church_name" 
          label="Church Name" 
          required
        >
          <Input 
            placeholder="Enter church name" 
            className={cn(
              form.formState.errors.church_name ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="address" 
          label="Address" 
          required
        >
          <Input 
            placeholder="Enter church address" 
            className={cn(
              form.formState.errors.address ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="state" 
          label="State" 
          required
        >
          <Input 
            placeholder="Enter state" 
            className={cn(
              form.formState.errors.state ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="membership_strength" 
          label="Membership Strength"
        >
          <Input 
            type="number" 
            placeholder="Enter membership strength" 
            className={cn(
              form.formState.errors.membership_strength ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Pastor Information */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Pastor Information</h3>
        </div>
        
        <FormItem 
          name="pastor_name" 
          label="Pastor Name" 
          required
        >
          <Input 
            placeholder="Enter pastor name" 
            className={cn(
              form.formState.errors.pastor_name ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="pastor_phone" 
          label="Pastor Phone" 
          required
        >
          <Input 
            placeholder="Enter pastor phone" 
            className={cn(
              form.formState.errors.pastor_phone ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="pastor_email" 
          label="Pastor Email" 
          required
        >
          <Input 
            type="email" 
            placeholder="Enter pastor email" 
            className={cn(
              form.formState.errors.pastor_email ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Admin Information */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Admin Information</h3>
        </div>
        
        <FormItem 
          name="admin_name" 
          label="Admin Name" 
          required
        >
          <Input 
            placeholder="Enter admin name" 
            className={cn(
              form.formState.errors.admin_name ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="admin_phone" 
          label="Admin Phone" 
          required
        >
          <Input 
            placeholder="Enter admin phone" 
            className={cn(
              form.formState.errors.admin_phone ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="admin_email" 
          label="Admin Email" 
          required
        >
          <Input 
            type="email" 
            placeholder="Enter admin email" 
            className={cn(
              form.formState.errors.admin_email ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <Button 
          type="button" 
          onClick={() => navigate('/churches')} 
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Register Church'}
        </Button>
      </div>
    </Form>
  );
} 