import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { DCChapters, Countries, Currencies, vowSchema } from 'shared';
import { z } from 'zod';

import { Form, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createVow, VowFormData } from '@/services/vow';
import { cn } from '@/lib/utils';

// Create a simplified schema for the form (omitting admin-only fields)
const vowFormSchema = vowSchema.omit({
  payment_date: true,
  payment_status: true,
  amount_paid: true,
  notes: true,
});

type FormValues = z.infer<typeof vowFormSchema>;

interface VowsFormProps {
  onSuccess?: () => void;
  isEmbedded?: boolean; // For embedding in other apps/pages
}

export function VowsForm({ onSuccess, isEmbedded = false }: VowsFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showStateField, setShowStateField] = useState(true);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(vowFormSchema),
    defaultValues: {
      first_name: '',
      surname: '',
      phone_number: '',
      email: '',
      amount_vowed: 0,
      currency: 'NGN',
      country: 'Nigeria',
      state: '',
      dc_chapter: undefined,
    }
  });
  
  // Watch for country changes to show/hide state field
  const selectedCountry = form.watch('country');
  
  useEffect(() => {
    setShowStateField(selectedCountry === 'Nigeria');
  }, [selectedCountry]);
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      
      // Convert form data to vow data format
      const vowData: VowFormData = {
        ...data,
        payment_status: 'pending',
      };
      
      await createVow(vowData);
      
      setSuccess('Your vow has been successfully submitted!');
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      } else if (!isEmbedded) {
        // Only navigate if not embedded and no custom success handler
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Vow submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Currency symbol mapping
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'NGN': return '₦';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '₦';
    }
  };
  
  // Get the appropriate currency symbol
  const currencySymbol = getCurrencySymbol(form.watch('currency'));
  
  return (
    <Form 
      form={form} 
      onSubmit={onSubmit} 
      className={cn(
        "space-y-6",
        isEmbedded ? "w-full" : "max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md"
      )}
    >
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-500 p-3 rounded-md">
          {success}
        </div>
      )}
      
      {!isEmbedded && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Make a Vow</h2>
          <p className="text-gray-600">Please fill out the form to make a vow</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <FormItem 
          name="first_name" 
          label="First Name" 
          required
        >
          <Input 
            placeholder="Enter first name" 
            className={cn(
              form.formState.errors.first_name ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="surname" 
          label="Surname" 
          required
        >
          <Input 
            placeholder="Enter surname" 
            className={cn(
              form.formState.errors.surname ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="phone_number" 
          label="Phone Number" 
          required
        >
          <Input 
            placeholder="Enter phone number" 
            className={cn(
              form.formState.errors.phone_number ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="email" 
          label="Email Address" 
          required
        >
          <Input 
            type="email" 
            placeholder="Enter email address" 
            className={cn(
              form.formState.errors.email ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Currency and Amount */}
        <FormItem 
          name="currency" 
          label="Currency" 
          required
        >
          <select
            {...form.register('currency')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              form.formState.errors.currency ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select currency</option>
            {Object.entries(Currencies).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </FormItem>
        
        <FormItem 
          name="amount_vowed" 
          label={`Amount Vowed (${currencySymbol})`} 
          required
        >
          <Input 
            type="number" 
            placeholder="Enter amount" 
            className={cn(
              form.formState.errors.amount_vowed ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Location Information */}
        <FormItem 
          name="country" 
          label="Country" 
          required
        >
          <select
            {...form.register('country')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              form.formState.errors.country ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select country</option>
            {Countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </FormItem>
        
        {showStateField && (
          <FormItem 
            name="state" 
            label="State" 
            required={selectedCountry === 'Nigeria'}
          >
            <Input 
              placeholder="Enter state" 
              className={cn(
                form.formState.errors.state ? "border-red-500" : "border-gray-300"
              )}
            />
          </FormItem>
        )}
        
        <FormItem 
          name="dc_chapter" 
          label="DC Chapter" 
          required
          className={cn(!showStateField && 'md:col-span-2')}
        >
          <select
            {...form.register('dc_chapter')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              form.formState.errors.dc_chapter ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select a chapter</option>
            {DCChapters.map((chapter) => (
              <option key={chapter} value={chapter}>
                {chapter}
              </option>
            ))}
          </select>
        </FormItem>
      </div>
      
      <div className="flex justify-end space-x-4 mt-4">
        {!isEmbedded && (
          <Button 
            type="button" 
            onClick={() => navigate('/')} 
            variant="outline"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Vow'}
        </Button>
      </div>
    </Form>
  );
} 