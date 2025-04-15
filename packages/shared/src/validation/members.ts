import { z } from 'zod';

// Define the training programs as a string literal union
export const TrainingPrograms = {
  DCA: 'DCA',
  DCA_ADVANCE: 'DCA Advance',
  DLI_BASIC: 'DLI Basic',
  DLI_ADVANCE: 'DLI Advance',
  ENCOUNTER: 'Encounter',
  GLI: 'GLI',
} as const;

// Zod schema for member profiles
export const memberSchema = z.object({
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

  trainings_attended: z.array(
    z.enum([
      TrainingPrograms.DCA,
      TrainingPrograms.DCA_ADVANCE,
      TrainingPrograms.DLI_BASIC,
      TrainingPrograms.DLI_ADVANCE,
      TrainingPrograms.ENCOUNTER,
      TrainingPrograms.GLI
    ])
  ).optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

// Response schema for member data from the API
export const memberResponseSchema = memberSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export type MemberResponse = z.infer<typeof memberResponseSchema>; 