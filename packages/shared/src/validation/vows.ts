import { z } from 'zod';

// Nigerian States
export const NigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
] as const;

// Countries with Dominion City Presence
export const Countries = [
  'Nigeria',
  'United Kingdom',
  'United States',
  'Canada',
  'South Africa',
  'Ghana',
  'Australia',
  'Germany',
  'France',
  'Other'
] as const;

// Major DC Chapters
export const DCChapters = [
  'Wuye',
  'Abuja',
  'Enugu',
  'Lagos',
  'Port Harcourt',
  'Kaduna',
  'Ibadan',
  'Benin',
  'Calabar',
  'London',
  'Manchester',
  'New York',
  'Toronto',
  'Johannesburg',
  'Accra',
  'Other'
] as const;

// Currencies
export const Currencies = {
  NGN: 'Nigerian Naira (₦)',
  USD: 'US Dollar ($)',
  GBP: 'British Pound (£)',
  EUR: 'Euro (€)'
} as const;

// Zod schema for vows
export const vowSchema = z.object({
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
  
  currency: z.enum(['NGN', 'USD', 'GBP', 'EUR'], {
    errorMap: () => ({ message: 'Please select a valid currency' }),
  }).default('NGN'),
  
  amount_vowed: z.coerce.number()
    .positive({ message: 'Amount must be a positive number' })
    .int({ message: 'Amount must be a whole number' }),
  
  country: z.enum(Countries, {
    errorMap: () => ({ message: 'Please select a valid country' }),
  }).default('Nigeria'),
  
  state: z.string().optional(),
  
  dc_chapter: z.enum(DCChapters, {
    errorMap: () => ({ message: 'Please select a valid chapter' }),
  }),
  
  payment_date: z.date().optional(),
  payment_status: z.enum(['pending', 'partially_paid', 'paid']).default('pending'),
  amount_paid: z.coerce.number().nonnegative().optional(),
  notes: z.string().max(500).optional(),
});

export type VowFormValues = z.infer<typeof vowSchema>;

// API response schema
export const vowResponseSchema = vowSchema.extend({
  id: z.string().uuid(),
  user_id: z.string().uuid().optional(),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
});

export type VowResponse = z.infer<typeof vowResponseSchema>; 