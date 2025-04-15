import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Member, createMember, updateMember } from '@/services/member';
import { getChurches } from '@/services/church';
import { memberSchema, MemberFormValues } from '@/lib/validations/member';
import { cn } from '@/lib/utils';

interface MemberFormProps {
  initialData?: Member;
  churchId?: string;
  onSuccess?: () => void;
}

export function MemberForm({ initialData, churchId, onSuccess }: MemberFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [churches, setChurches] = useState<{id: string; name: string}[]>([]);
  
  const isEditMode = !!initialData;
  
  // Fetch churches for dropdown
  useEffect(() => {
    const fetchChurches = async () => {
      try {
        const churchesData = await getChurches();
        setChurches(churchesData.map((church: any) => ({
          id: church.id,
          name: church.name,
        })));
      } catch (error) {
        console.error('Error fetching churches:', error);
      }
    };
    
    fetchChurches();
  }, []);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    setValue
  } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData ? {
      churchId: initialData.churchId,
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      email: initialData.email,
      phone: initialData.phone || '',
      address: initialData.address || '',
      city: initialData.city || '',
      state: initialData.state || '',
      country: initialData.country || '',
      gender: initialData.gender,
      dateOfBirth: initialData.dateOfBirth || '',
      joinDate: initialData.joinDate || '',
      status: initialData.status,
      role: initialData.role || '',
      department: initialData.department || '',
      ministryInvolvement: initialData.ministryInvolvement || [],
      baptismDate: initialData.baptismDate || '',
    } : {
      churchId: churchId || '',
      status: 'active',
      ministryInvolvement: [],
    }
  });
  
  // Set churchId if provided via props
  useEffect(() => {
    if (churchId && !isEditMode) {
      setValue('churchId', churchId);
    }
  }, [churchId, isEditMode, setValue]);
  
  const onSubmit = async (data: MemberFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (isEditMode && initialData) {
        await updateMember(initialData.id, data);
      } else {
        await createMember(data);
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(churchId ? `/churches/${churchId}/members` : '/members');
      }
      
      reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Member form submission error:', error);
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
          <label htmlFor="churchId" className="text-sm font-medium">
            Church <span className="text-red-500">*</span>
          </label>
          <select
            id="churchId"
            {...register('churchId')}
            disabled={!!churchId}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.churchId ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select a church</option>
            {churches.map((church) => (
              <option key={church.id} value={church.id}>
                {church.name}
              </option>
            ))}
          </select>
          {errors.churchId && (
            <p className="text-sm text-red-500">{errors.churchId.message}</p>
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
          <label htmlFor="firstName" className="text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            {...register('firstName')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.firstName ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            {...register('lastName')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.lastName ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
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
            Phone
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
          <label htmlFor="gender" className="text-sm font-medium">
            Gender
          </label>
          <select
            id="gender"
            {...register('gender')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.gender ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dateOfBirth" className="text-sm font-medium">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="joinDate" className="text-sm font-medium">
            Join Date
          </label>
          <input
            id="joinDate"
            type="date"
            {...register('joinDate')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.joinDate ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.joinDate && (
            <p className="text-sm text-red-500">{errors.joinDate.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="baptismDate" className="text-sm font-medium">
            Baptism Date
          </label>
          <input
            id="baptismDate"
            type="date"
            {...register('baptismDate')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.baptismDate ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.baptismDate && (
            <p className="text-sm text-red-500">{errors.baptismDate.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Address
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
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
            State
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
            Country
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <input
            id="role"
            {...register('role')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.role ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">
            Department
          </label>
          <input
            id="department"
            {...register('department')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.department ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.department && (
            <p className="text-sm text-red-500">{errors.department.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(churchId ? `/churches/${churchId}/members` : '/members')}
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
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );
} 