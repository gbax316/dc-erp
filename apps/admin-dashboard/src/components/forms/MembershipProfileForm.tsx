import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Form, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import { createMemberFromForm, MemberFormData } from '@/services/member';
import { getChurches, Church } from '@/services/church';
import { cn } from '@/lib/utils';

// Training programs for the multi-select
const TrainingPrograms = {
  DCA: 'DCA',
  DCA_ADVANCE: 'DCA Advance',
  DLI_BASIC: 'DLI Basic',
  DLI_ADVANCE: 'DLI Advance',
  ENCOUNTER: 'Encounter',
  GLI: 'GLI',
} as const;

// Zod schema for member profiles
const memberSchema = z.object({
  first_name: z.string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(50, { message: 'First name must be less than 50 characters' }),
  
  surname: z.string()
    .min(2, { message: 'Surname must be at least 2 characters long' })
    .max(50, { message: 'Surname must be less than 50 characters' }),
  
  phone_number: z.string()
    .regex(/^[+]?[0-9\s-]+$/, { message: 'Please enter a valid phone number' })
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  
  thumbnail: z.string().url({ message: 'Please enter a valid URL for the thumbnail' }).optional(),
  
  church_id: z.string()
    .min(1, { message: 'Please select a church' }),
  
  department: z.string()
    .min(2, { message: 'Department must be at least 2 characters long' })
    .max(100, { message: 'Department must be less than 100 characters' })
    .optional(),
  
  contact_address: z.string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .max(200, { message: 'Address must be less than 200 characters' })
    .optional(),

  trainings_attended: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof memberSchema>;

interface MembershipProfileFormProps {
  userId?: string;
  onSuccess?: () => void;
}

export function MembershipProfileForm({ userId, onSuccess }: MembershipProfileFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [churches, setChurches] = useState<Church[]>([]);
  
  useEffect(() => {
    // Fetch list of churches for the dropdown
    const loadChurches = async () => {
      try {
        const churchList = await getChurches();
        setChurches(churchList);
      } catch (err) {
        console.error('Failed to load churches:', err);
        setError('Failed to load churches. Please try again later.');
      }
    };
    
    loadChurches();
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      first_name: '',
      surname: '',
      phone_number: '',
      email: '',
      thumbnail: '',
      church_id: '',
      department: '',
      contact_address: '',
      trainings_attended: [],
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Convert form data to member data format expected by the API
      const memberData: MemberFormData = {
        first_name: data.first_name,
        surname: data.surname,
        email: data.email,
        phone_number: data.phone_number,
        contact_address: data.contact_address,
        church_id: data.church_id,
        department: data.department,
        thumbnail: data.thumbnail,
        trainings_attended: data.trainings_attended,
      };
      
      await createMemberFromForm(memberData);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/members');
      }
      
      form.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      console.error('Member registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const trainingPrograms = Object.values(TrainingPrograms);
  
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
        <h2 className="text-2xl font-bold mb-2">Membership Profile</h2>
        <p className="text-gray-600">Please fill out your membership details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h3>
        </div>
        
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
        
        <FormItem 
          name="contact_address" 
          label="Contact Address"
          className="md:col-span-2"
        >
          <Input 
            placeholder="Enter contact address" 
            className={cn(
              form.formState.errors.contact_address ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="thumbnail" 
          label="Profile Picture URL"
        >
          <Input 
            placeholder="Enter profile picture URL" 
            className={cn(
              form.formState.errors.thumbnail ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Church Information */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Church Information</h3>
        </div>
        
        <FormItem 
          name="church_id" 
          label="Church" 
          required
        >
          <select
            {...form.register('church_id')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              form.formState.errors.church_id ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select a church</option>
            {churches.map((church) => (
              <option key={church.id} value={church.id}>
                {church.church_name}
              </option>
            ))}
          </select>
        </FormItem>
        
        <FormItem 
          name="department" 
          label="Department"
        >
          <Input 
            placeholder="Enter department" 
            className={cn(
              form.formState.errors.department ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Trainings Attended */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Trainings Attended</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <Controller
              control={form.control}
              name="trainings_attended"
              render={({ field }) => (
                <>
                  {trainingPrograms.map((program) => (
                    <div key={program} className="flex items-center space-x-2">
                      <input
                        id={`training-${program}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={field.value?.includes(program) || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const updatedValue = isChecked
                            ? [...(field.value || []), program]
                            : (field.value || []).filter((val) => val !== program);
                          field.onChange(updatedValue);
                        }}
                      />
                      <label
                        htmlFor={`training-${program}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {program}
                      </label>
                    </div>
                  ))}
                </>
              )}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <Button 
          type="button" 
          onClick={() => navigate('/members')} 
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Save Profile'}
        </Button>
      </div>
    </Form>
  );
} 