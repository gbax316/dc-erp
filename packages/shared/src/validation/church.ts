import { z } from 'zod';

// Church registration schema
export const churchSchema = z.object({
  church_name: z.string()
    .min(2, { message: 'Church name must be at least 2 characters long' })
    .max(100, { message: 'Church name must be less than 100 characters' }),
  
  address: z.string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .max(200, { message: 'Address must be less than 200 characters' }),
  
  state: z.string()
    .min(2, { message: 'State must be at least 2 characters long' })
    .max(50, { message: 'State must be less than 50 characters' }),
  
  membership_strength: z.number()
    .int()
    .positive({ message: 'Membership strength must be a positive number' })
    .or(z.string().regex(/^\d+$/).transform(Number))
    .optional(),
  
  pastor_name: z.string()
    .min(2, { message: 'Pastor name must be at least 2 characters long' })
    .max(100, { message: 'Pastor name must be less than 100 characters' }),
  
  pastor_phone: z.string()
    .regex(/^[+]?[0-9\s-]+$/, { message: 'Please enter a valid phone number' })
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  
  pastor_email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  
  admin_name: z.string()
    .min(2, { message: 'Admin name must be at least 2 characters long' })
    .max(100, { message: 'Admin name must be less than 100 characters' }),
  
  admin_phone: z.string()
    .regex(/^[+]?[0-9\s-]+$/, { message: 'Please enter a valid phone number' })
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  
  admin_email: z.string()
    .email({ message: 'Please enter a valid email address' }),
});

export type ChurchFormValues = z.infer<typeof churchSchema>;

// Response schema for church data from the API
export const churchResponseSchema = churchSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export type ChurchResponse = z.infer<typeof churchResponseSchema>; 