import { z } from 'zod';

// Payment methods
export const PaymentMethods = ['Cash', 'Transfer', 'POS'] as const;

// Service types
export const ServiceTypes = [
  'Sunday Service',
  'Midweek Service',
  'Bible Study',
  'Prayer Meeting',
  'Special Service',
  'Other Service'
] as const;

// Schema for payment entry
export const paymentEntrySchema = z.object({
  method: z.enum(PaymentMethods),
  amount: z.coerce.number().nonnegative({
    message: 'Amount must be a positive number or zero'
  }),
});

export type PaymentEntry = z.infer<typeof paymentEntrySchema>;

// Previous week transfers schema (only for Sunday Service)
export const previousWeekTransfersSchema = z.object({
  total_tithes_transfer: z.coerce.number().nonnegative({
    message: 'Amount must be a positive number or zero'
  }),
  total_offerings_transfer: z.coerce.number().nonnegative({
    message: 'Amount must be a positive number or zero'
  }),
  total_seeds_transfer: z.coerce.number().nonnegative({
    message: 'Amount must be a positive number or zero'
  }),
  total_project_transfer: z.coerce.number().nonnegative({
    message: 'Amount must be a positive number or zero'
  }),
});

export type PreviousWeekTransfers = z.infer<typeof previousWeekTransfersSchema>;

// Primary schema with camelCase for Prisma model
export const ServiceReportSchema = z.object({
  date: z.string(),
  serviceType: z.enum(ServiceTypes),
  attendanceTotal: z.number().min(0),
  male: z.number().min(0),
  female: z.number().min(0),
  children: z.number().min(0),
  firstTimers: z.number().min(0),
  newConverts: z.number().min(0),

  tithesCash: z.number().min(0),
  tithesTransfer: z.number().min(0),
  tithesPOS: z.number().min(0),

  offeringsCash: z.number().min(0),
  offeringsTransfer: z.number().min(0),
  offeringsPOS: z.number().min(0),

  specialSeedsCash: z.number().min(0),
  specialSeedsTransfer: z.number().min(0),
  specialSeedsPOS: z.number().min(0),

  projectOfferingCash: z.number().min(0),
  projectOfferingTransfer: z.number().min(0),
  projectOfferingPOS: z.number().min(0),

  // Optional transfers for Sunday services
  previousWeekTithesTransfer: z.number().optional(),
  previousWeekOfferingsTransfer: z.number().optional(),
  previousWeekSeedsTransfer: z.number().optional(),
  previousWeekProjectTransfer: z.number().optional(),

  totalEarnings: z.number().min(0),        // auto-calculated
  remittanceDue: z.number().min(0),        // auto-calculated
});

// Add validations
export const ServiceReportSchemaWithValidations = ServiceReportSchema
.refine(
  (data) => {
    // Validate that attendance figures sum correctly
    const sum = data.male + data.female + data.children;
    return sum === data.attendanceTotal;
  },
  {
    message: "Male, female, and children should add up to the total attendance",
    path: ["attendanceTotal"],
  }
)
.refine(
  (data) => {
    if (data.serviceType === 'Sunday Service') {
      return (
        data.previousWeekTithesTransfer !== undefined &&
        data.previousWeekOfferingsTransfer !== undefined &&
        data.previousWeekSeedsTransfer !== undefined &&
        data.previousWeekProjectTransfer !== undefined
      );
    }
    return true;
  },
  {
    message: "Previous week transfers are required for Sunday Service reports",
    path: ["previousWeekTithesTransfer"],
  });

// Type for the form values
export type ServiceReportFormValues = z.infer<typeof ServiceReportSchemaWithValidations>;

// API response schema - includes ID and timestamps
export const ServiceReportResponseSchema = ServiceReportSchema.extend({
  id: z.string(),
  churchId: z.string(),
  submittedByUserId: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export type ServiceReportResponse = z.infer<typeof ServiceReportResponseSchema>; 