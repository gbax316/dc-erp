import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/auth-provider';
import { createUser, updateUser } from '@/services/user';
import { getChurches } from '@/services/church';
import { User, UserRole, RoleDefinitions } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  FormField,
  Input,
  Select,
  Checkbox,
  Button,
  Card,
  CardContent
} from '@/components/ui';

// User form validation schema
const userSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.enum(['super_admin', 'admin', 'manager', 'member', 'guest'] as const),
  churchId: z.string().optional(),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .optional(),
  confirmPassword: z.string().optional(),
  isActive: z.boolean().optional(),
}).refine((data: any) => {
  // If password is provided, confirmPassword must match
  if (data.password) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const { hasRole } = useAuth();
  const isSuperAdmin = hasRole(UserRole.SUPER_ADMIN);
  const isEditMode = !!user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [churches, setChurches] = useState<{id: string; name: string}[]>([]);
  
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
  
  // Ensure the user role is compatible with the schema's expected values
  const safeUserRole = user?.role as UserFormValues['role'] | undefined;
  
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: user ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: safeUserRole || 'member',
      churchId: user.churchId || '',
      isActive: user.isActive ?? true,
    } : {
      firstName: '',
      lastName: '',
      email: '',
      role: 'member',
      churchId: '',
      isActive: true,
    }
  });
  
  const selectedRole = watch('role');
  
  const onSubmit = async (data: UserFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (isEditMode && user) {
        await updateUser(user.id, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role as UserRole,
          churchId: data.churchId || undefined,
          isActive: data.isActive,
        });
      } else {
        // For new users, password is required
        if (!data.password) {
          setError('password', { 
            type: 'manual', 
            message: 'Password is required for new users' 
          });
          setIsSubmitting(false);
          return;
        }
        
        await createUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role as UserRole,
          churchId: data.churchId || undefined,
        });
      }
      
      onSuccess();
      
      if (!isEditMode) {
        reset();
      }
    } catch (error: any) {
      setError('root', { 
        type: 'manual', 
        message: error?.message || 'An unknown error occurred' 
      });
      console.error('User form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root?.message && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {errors.root.message}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              id="firstName"
              label="First Name"
              error={!!errors.firstName}
              errorMessage={errors.firstName?.message}
              required
            >
              <Input {...register('firstName')} />
            </FormField>
            
            <FormField
              id="lastName"
              label="Last Name"
              error={!!errors.lastName}
              errorMessage={errors.lastName?.message}
              required
            >
              <Input {...register('lastName')} />
            </FormField>
          </div>
          
          <FormField
            id="email"
            label="Email"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            required
          >
            <Input 
              type="email"
              {...register('email')} 
              disabled={isEditMode}
            />
            {isEditMode && (
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed after user creation.
              </p>
            )}
          </FormField>
          
          <FormField
            id="role"
            label="Role"
            error={!!errors.role}
            errorMessage={errors.role?.message}
            required
          >
            <Select 
              {...register('role')}
              options={RoleDefinitions.map(role => ({
                value: role.id,
                label: role.name
              }))}
            />
            <p className="text-xs text-gray-500 mt-1">
              Role determines what actions the user can perform in the system.
            </p>
          </FormField>
          
          {/* Church selection only shown for non-super-admin users */}
          {selectedRole !== 'super_admin' && (
            <FormField
              id="churchId"
              label="Church"
              error={!!errors.churchId}
              errorMessage={errors.churchId?.message}
            >
              <Select 
                {...register('churchId')}
                options={[
                  { value: "", label: "-- Select Church --" },
                  ...churches.map(church => ({
                    value: church.id,
                    label: church.name
                  }))
                ]}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave blank for users with access to all churches.
              </p>
            </FormField>
          )}
          
          {/* Password fields only shown for new users */}
          {!isEditMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="password"
                label="Password"
                error={!!errors.password}
                errorMessage={errors.password?.message}
                required
              >
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </FormField>
              
              <FormField
                id="confirmPassword"
                label="Confirm Password"
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                required
              >
                <Input 
                  type={showPassword ? "text" : "password"}
                  {...register('confirmPassword')}
                />
              </FormField>
            </div>
          )}
          
          <FormField
            id="isActive"
          >
            <Checkbox 
              label="Active Account"
              {...register('isActive')}
            />
            <p className="text-xs text-gray-500 mt-1">
              Inactive users cannot log in to the system.
            </p>
          </FormField>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 