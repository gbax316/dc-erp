import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { ServiceReportSchema } from '@dc/shared/src/validation/serviceReport';

import { Form, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { createServiceReport, ServiceReportFormData } from '@/services/serviceReport';
import { useAuth } from '@/context/auth-provider';

// Define ServiceTypes constants directly to avoid import issues
const ServiceTypes = [
  'Sunday Service',
  'Midweek Service',
  'Bible Study',
  'Prayer Meeting',
  'Special Service',
  'Other Service'
] as const;

// Define our form schema using the imported ServiceReportFormData
interface FormValues extends Omit<ServiceReportFormData, 'date'> {
  date: Date;
}

interface ServiceReportFormProps {
  onSuccess?: () => void;
}

// Format currency as Naira
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

export function ServiceReportForm({ onSuccess }: ServiceReportFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [remittanceDue, setRemittanceDue] = useState<number>(0);

  const form = useForm<FormValues>({
    defaultValues: {
      date: new Date(),
      service_type: '',
      attendance_total: 0,
      male: 0,
      female: 0,
      children: 0,
      first_timers: 0,
      new_converts: 0,
      
      // Tithes
      tithesCash: 0,
      tithesTransfer: 0,
      tithesPOS: 0,
      
      // Offerings
      offeringsCash: 0,
      offeringsTransfer: 0,
      offeringsPOS: 0,
      
      // Special Seeds
      specialSeedsCash: 0,
      specialSeedsTransfer: 0,
      specialSeedsPOS: 0,
      
      // Project Offering
      projectOfferingCash: 0,
      projectOfferingTransfer: 0,
      projectOfferingPOS: 0,
      
      // Previous Week Transfers
      previousWeekTithesTransfer: 0,
      previousWeekOfferingsTransfer: 0,
      previousWeekSeedsTransfer: 0,
      previousWeekProjectTransfer: 0,
      
      // Calculated totals
      total_earnings: 0,
      remittance_due: 0,
    },
  });

  // Watch inputs for dynamic rendering and calculations
  const serviceType = form.watch('service_type');
  const maleCount = form.watch('male') || 0;
  const femaleCount = form.watch('female') || 0;
  const childrenCount = form.watch('children') || 0;
  
  // Watch all payment fields
  const tithesCash = form.watch('tithesCash') || 0;
  const tithesTransfer = form.watch('tithesTransfer') || 0;
  const tithesPOS = form.watch('tithesPOS') || 0;
  
  const offeringsCash = form.watch('offeringsCash') || 0;
  const offeringsTransfer = form.watch('offeringsTransfer') || 0;
  const offeringsPOS = form.watch('offeringsPOS') || 0;
  
  const specialSeedsCash = form.watch('specialSeedsCash') || 0;
  const specialSeedsTransfer = form.watch('specialSeedsTransfer') || 0;
  const specialSeedsPOS = form.watch('specialSeedsPOS') || 0;
  
  const projectOfferingCash = form.watch('projectOfferingCash') || 0;
  const projectOfferingTransfer = form.watch('projectOfferingTransfer') || 0;
  const projectOfferingPOS = form.watch('projectOfferingPOS') || 0;
  
  const previousWeekTithesTransfer = form.watch('previousWeekTithesTransfer') || 0;
  const previousWeekOfferingsTransfer = form.watch('previousWeekOfferingsTransfer') || 0;
  const previousWeekSeedsTransfer = form.watch('previousWeekSeedsTransfer') || 0;
  const previousWeekProjectTransfer = form.watch('previousWeekProjectTransfer') || 0;

  // Update the total attendance when individual categories change
  const updateTotalAttendance = () => {
    const total = maleCount + femaleCount + childrenCount;
    form.setValue('attendance_total', total);
  };

  // Calculate total for tithes
  const calculateTithesTotal = (): number => {
    return Number(tithesCash) + Number(tithesTransfer) + Number(tithesPOS);
  };

  // Calculate total for offerings
  const calculateOfferingsTotal = (): number => {
    return Number(offeringsCash) + Number(offeringsTransfer) + Number(offeringsPOS);
  };

  // Calculate total for special seeds
  const calculateSpecialSeedsTotal = (): number => {
    return Number(specialSeedsCash) + Number(specialSeedsTransfer) + Number(specialSeedsPOS);
  };

  // Calculate total for project offerings
  const calculateProjectOfferingTotal = (): number => {
    return Number(projectOfferingCash) + Number(projectOfferingTransfer) + Number(projectOfferingPOS);
  };

  // Calculate total from previous week transfers
  const calculatePreviousWeekTotal = (): number => {
    return Number(previousWeekTithesTransfer) +
           Number(previousWeekOfferingsTransfer) +
           Number(previousWeekSeedsTransfer) +
           Number(previousWeekProjectTransfer);
  };

  // Calculate total earnings and remittance
  const calculateTotals = () => {
    const tithesTotal = calculateTithesTotal();
    const offeringsTotal = calculateOfferingsTotal();
    const specialSeedsTotal = calculateSpecialSeedsTotal();
    const projectOfferingTotal = calculateProjectOfferingTotal();
    const previousWeekTotal = calculatePreviousWeekTotal();

    const total = tithesTotal + offeringsTotal + specialSeedsTotal + projectOfferingTotal + previousWeekTotal;
    const remittance = total * 0.5; // 50% remittance
    
    setTotalEarnings(total);
    setRemittanceDue(remittance);
    
    // Update form values
    form.setValue('total_earnings', total);
    form.setValue('remittance_due', remittance);
    
    return { total, remittance };
  };

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Calculate totals
      updateTotalAttendance();
      const { total, remittance } = calculateTotals();
      
      // Ensure the calculated values are included
      const submitData = {
        ...values,
        total_earnings: total,
        remittance_due: remittance,
        // Keep the date as a Date object for the API
        date: values.date
      };
      
      await createServiceReport(submitData);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/service-reports');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the service report');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update calculations when relevant fields change
  useEffect(() => {
    updateTotalAttendance();
  }, [maleCount, femaleCount, childrenCount]);

  // Update earnings calculations when payment fields change
  useEffect(() => {
    calculateTotals();
  }, [
    tithesCash, tithesTransfer, tithesPOS,
    offeringsCash, offeringsTransfer, offeringsPOS,
    specialSeedsCash, specialSeedsTransfer, specialSeedsPOS,
    projectOfferingCash, projectOfferingTransfer, projectOfferingPOS,
    previousWeekTithesTransfer, previousWeekOfferingsTransfer,
    previousWeekSeedsTransfer, previousWeekProjectTransfer
  ]);

  // Determine if user can see remittance information based on role
  const canViewRemittance = () => {
    if (!user || !user.role) return false;
    return ['branch_admin', 'admin', 'super_admin'].includes(user.role.toLowerCase());
  };

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
        <h2 className="text-2xl font-bold mb-2">Service Report</h2>
        <p className="text-gray-600">Please fill out the form to submit a service report</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Service Information</h3>
        </div>
        
        {/* Date Picker */}
        <FormItem 
          name="date" 
          label="Service Date" 
          required
        >
          <Controller
            control={form.control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                      form.formState.errors.date ? "border-red-500" : "border-gray-300"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Select a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </FormItem>
        
        {/* Service Type */}
        <FormItem 
          name="service_type" 
          label="Service Type" 
          required
        >
          <select
            {...form.register('service_type')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              form.formState.errors.service_type ? "border-red-500" : "border-gray-300"
            )}
            onChange={(e) => {
              form.setValue('service_type', e.target.value as any);
              setSelectedServiceType(e.target.value);
            }}
          >
            <option value="">Select service type</option>
            {ServiceTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormItem>
        
        {/* Attendance Information */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Attendance Metrics</h3>
        </div>
        
        <FormItem 
          name="male" 
          label="Male" 
          required
        >
          <Input 
            type="number" 
            placeholder="Enter male count" 
            className={cn(
              form.formState.errors.male ? "border-red-500" : "border-gray-300"
            )}
            onChange={(e) => {
              form.setValue('male', parseInt(e.target.value) || 0);
              updateTotalAttendance();
            }}
          />
        </FormItem>
        
        <FormItem 
          name="female" 
          label="Female" 
          required
        >
          <Input 
            type="number" 
            placeholder="Enter female count" 
            className={cn(
              form.formState.errors.female ? "border-red-500" : "border-gray-300"
            )}
            onChange={(e) => {
              form.setValue('female', parseInt(e.target.value) || 0);
              updateTotalAttendance();
            }}
          />
        </FormItem>
        
        <FormItem 
          name="children" 
          label="Children" 
          required
        >
          <Input 
            type="number" 
            placeholder="Enter children count" 
            className={cn(
              form.formState.errors.children ? "border-red-500" : "border-gray-300"
            )}
            onChange={(e) => {
              form.setValue('children', parseInt(e.target.value) || 0);
              updateTotalAttendance();
            }}
          />
        </FormItem>
        
        <FormItem 
          name="attendance_total" 
          label="Total Attendance" 
          required
        >
          <Input 
            type="number" 
            placeholder="Total attendance" 
            className={cn(
              form.formState.errors.attendance_total ? "border-red-500" : "border-gray-300"
            )}
            readOnly
            value={maleCount + femaleCount + childrenCount}
          />
        </FormItem>
        
        <FormItem 
          name="first_timers" 
          label="First Timers" 
          required
        >
          <Input 
            type="number" 
            placeholder="Enter first timers count" 
            className={cn(
              form.formState.errors.first_timers ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        <FormItem 
          name="new_converts" 
          label="New Converts" 
          required
        >
          <Input 
            type="number" 
            placeholder="Enter new converts count" 
            className={cn(
              form.formState.errors.new_converts ? "border-red-500" : "border-gray-300"
            )}
          />
        </FormItem>
        
        {/* Financial Information */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Financial Information</h3>
        </div>
        
        {/* Tithes */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-gray-700 mb-3">Tithes</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="tithesCash" label="Cash">
              <Input
                type="number"
                placeholder="Amount in Cash"
                className={cn(
                  form.formState.errors.tithesCash ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('tithesCash', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="tithesTransfer" label="Transfer">
              <Input
                type="number"
                placeholder="Amount via Transfer"
                className={cn(
                  form.formState.errors.tithesTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('tithesTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="tithesPOS" label="POS">
              <Input
                type="number"
                placeholder="Amount via POS"
                className={cn(
                  form.formState.errors.tithesPOS ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('tithesPOS', { valueAsNumber: true })}
              />
            </FormItem>
          </div>
        </div>
        
        {/* Offerings */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-gray-700 mb-3">Offerings</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="offeringsCash" label="Cash">
              <Input
                type="number"
                placeholder="Amount in Cash"
                className={cn(
                  form.formState.errors.offeringsCash ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('offeringsCash', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="offeringsTransfer" label="Transfer">
              <Input
                type="number"
                placeholder="Amount via Transfer"
                className={cn(
                  form.formState.errors.offeringsTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('offeringsTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="offeringsPOS" label="POS">
              <Input
                type="number"
                placeholder="Amount via POS"
                className={cn(
                  form.formState.errors.offeringsPOS ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('offeringsPOS', { valueAsNumber: true })}
              />
            </FormItem>
          </div>
        </div>
        
        {/* Special Seeds */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-gray-700 mb-3">Special Seeds (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="specialSeedsCash" label="Cash">
              <Input
                type="number"
                placeholder="Amount in Cash"
                className={cn(
                  form.formState.errors.specialSeedsCash ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('specialSeedsCash', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="specialSeedsTransfer" label="Transfer">
              <Input
                type="number"
                placeholder="Amount via Transfer"
                className={cn(
                  form.formState.errors.specialSeedsTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('specialSeedsTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="specialSeedsPOS" label="POS">
              <Input
                type="number"
                placeholder="Amount via POS"
                className={cn(
                  form.formState.errors.specialSeedsPOS ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('specialSeedsPOS', { valueAsNumber: true })}
              />
            </FormItem>
          </div>
        </div>
        
        {/* Project Offering */}
        <div className="md:col-span-2">
          <h4 className="font-medium text-gray-700 mb-3">Project Offering (Optional)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormItem name="projectOfferingCash" label="Cash">
              <Input
                type="number"
                placeholder="Amount in Cash"
                className={cn(
                  form.formState.errors.projectOfferingCash ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('projectOfferingCash', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="projectOfferingTransfer" label="Transfer">
              <Input
                type="number"
                placeholder="Amount via Transfer"
                className={cn(
                  form.formState.errors.projectOfferingTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('projectOfferingTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem name="projectOfferingPOS" label="POS">
              <Input
                type="number"
                placeholder="Amount via POS"
                className={cn(
                  form.formState.errors.projectOfferingPOS ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('projectOfferingPOS', { valueAsNumber: true })}
              />
            </FormItem>
          </div>
        </div>
        
        {/* Previous Week Transfers - Only for Sunday Service */}
        {serviceType === 'Sunday Service' && (
          <>
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Previous Week Transfers</h3>
            </div>
            
            <FormItem 
              name="previousWeekTithesTransfer" 
              label="Tithes Transfer" 
              required
            >
              <Input 
                type="number" 
                placeholder="Enter tithes transfer amount" 
                className={cn(
                  form.formState.errors.previousWeekTithesTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('previousWeekTithesTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem 
              name="previousWeekOfferingsTransfer" 
              label="Offerings Transfer" 
              required
            >
              <Input 
                type="number" 
                placeholder="Enter offerings transfer amount" 
                className={cn(
                  form.formState.errors.previousWeekOfferingsTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('previousWeekOfferingsTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem 
              name="previousWeekSeedsTransfer" 
              label="Seeds Transfer" 
              required
            >
              <Input 
                type="number" 
                placeholder="Enter seeds transfer amount" 
                className={cn(
                  form.formState.errors.previousWeekSeedsTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('previousWeekSeedsTransfer', { valueAsNumber: true })}
              />
            </FormItem>
            
            <FormItem 
              name="previousWeekProjectTransfer" 
              label="Project Transfer" 
              required
            >
              <Input 
                type="number" 
                placeholder="Enter project transfer amount" 
                className={cn(
                  form.formState.errors.previousWeekProjectTransfer ? "border-red-500" : "border-gray-300"
                )}
                {...form.register('previousWeekProjectTransfer', { valueAsNumber: true })}
              />
            </FormItem>
          </>
        )}
        
        {/* Hidden fields for calculated values */}
        <input type="hidden" {...form.register('total_earnings')} />
        <input type="hidden" {...form.register('remittance_due')} />
      </div>
      
      {/* Financial Summary Section */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</p>
          </div>
          
          {canViewRemittance() && (
            <div className="bg-white p-4 rounded-md border border-blue-200 bg-blue-50">
              <p className="text-sm text-blue-500 mb-1">Remittance Due (50%)</p>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(remittanceDue)}</p>
            </div>
          )}
        </div>
        
        {/* Breakdown of Totals */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-2">Breakdown</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <p className="text-xs text-gray-500">Tithes</p>
              <p className="font-medium">{formatCurrency(calculateTithesTotal())}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Offerings</p>
              <p className="font-medium">{formatCurrency(calculateOfferingsTotal())}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Special Seeds</p>
              <p className="font-medium">{formatCurrency(calculateSpecialSeedsTotal())}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Project Offering</p>
              <p className="font-medium">{formatCurrency(calculateProjectOfferingTotal())}</p>
            </div>
            {serviceType === 'Sunday Service' && (
              <div className="md:col-span-4 mt-2">
                <p className="text-xs text-gray-500">Previous Week Transfers</p>
                <p className="font-medium">{formatCurrency(calculatePreviousWeekTotal())}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <Button 
          type="button" 
          onClick={() => navigate('/service-reports')} 
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </div>
    </Form>
  );
} 