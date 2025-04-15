import { z } from 'zod';

export const memberSchema = z.object({
  churchId: z.string().min(1, { message: 'Church is required' }),
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(7, { message: 'Please enter a valid phone number' }).optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dateOfBirth: z.string().optional().or(z.literal('')),
  joinDate: z.string().optional().or(z.literal('')),
  status: z.enum(['active', 'inactive']),
  role: z.string().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  ministryInvolvement: z.array(z.string()).optional(),
  baptismDate: z.string().optional().or(z.literal('')),
});

export type MemberFormValues = z.infer<typeof memberSchema>; 