import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Church, createChurch, updateChurch } from '@/services/church';
import { churchSchema, ChurchFormValues } from '@/lib/validations/church';
import { cn } from '@/lib/utils';

interface ChurchFormProps {
  initialData?: Church;
  onSuccess?: () => void;
}

export function ChurchForm({ initialData, onSuccess }: ChurchFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!initialData;
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ChurchFormValues>({
    resolver: zodResolver(churchSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      address: initialData.address,
      city: initialData.city,
      state: initialData.state,
      country: initialData.country,
      phone: initialData.phone,
      email: initialData.email,
      website: initialData.website || '',
      pastor: initialData.pastor || '',
      foundedDate: initialData.foundedDate || '',
      status: initialData.status,
      logoUrl: initialData.logoUrl || '',
    } : {
      status: 'active',
    }
  });
  
  const onSubmit = async (data: ChurchFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (isEditMode && initialData) {
        await updateChurch(initialData.id, data);
      } else {
        await createChurch(data);
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/churches');
      }
      
      reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Church form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Church Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register('name')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.name ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.email ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            {...register('phone')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.phone ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium">
            Website
          </label>
          <input
            id="website"
            {...register('website')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.website ? "border-red-500" : "border-gray-300"
            )}
            placeholder="https://www.example.com"
          />
          {errors.website && (
            <p className="text-sm text-red-500">{errors.website.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            {...register('address')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.address ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            {...register('city')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.city ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State <span className="text-red-500">*</span>
          </label>
          <input
            id="state"
            {...register('state')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.state ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            {...register('country')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.country ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.country && (
            <p className="text-sm text-red-500">{errors.country.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="pastor" className="text-sm font-medium">
            Senior Pastor
          </label>
          <input
            id="pastor"
            {...register('pastor')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.pastor ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.pastor && (
            <p className="text-sm text-red-500">{errors.pastor.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="foundedDate" className="text-sm font-medium">
            Founded Date
          </label>
          <input
            id="foundedDate"
            type="date"
            {...register('foundedDate')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.foundedDate ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.foundedDate && (
            <p className="text-sm text-red-500">{errors.foundedDate.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register('status')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.status ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="logoUrl" className="text-sm font-medium">
            Logo URL
          </label>
          <input
            id="logoUrl"
            {...register('logoUrl')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.logoUrl ? "border-red-500" : "border-gray-300"
            )}
            placeholder="https://example.com/your-logo.png"
          />
          {errors.logoUrl && (
            <p className="text-sm text-red-500">{errors.logoUrl.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/churches')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Church' : 'Create Church'}
        </button>
      </div>
    </form>
  );
} 