import { z } from 'zod';

export const churchSchema = z.object({
  name: z.string().min(2, { message: 'Church name must be at least 2 characters' }),
  address: z.string().min(5, { message: 'Please enter a valid address' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
  phone: z.string().min(7, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  website: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  pastor: z.string().optional().or(z.literal('')),
  foundedDate: z.string().optional().or(z.literal('')),
  status: z.enum(['active', 'inactive']),
  logoUrl: z.string().url().optional().or(z.literal('')),
});

export type ChurchFormValues = z.infer<typeof churchSchema>;