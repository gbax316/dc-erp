import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z } from 'zod';

// Define Countries with Dominion City Presence
const Countries = [
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

// Define DC Chapters
const DCChapters = [
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

// Define Currencies
const Currencies = {
  NGN: 'Nigerian Naira (₦)',
  USD: 'US Dollar ($)',
  GBP: 'British Pound (£)',
  EUR: 'Euro (€)'
} as const;

// Form schema
const vowFormSchema = z.object({
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
});

type FormValues = z.infer<typeof vowFormSchema>;

// API URL - using Next.js environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function PublicVowsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showStateField, setShowStateField] = useState(true);
  
  // Using type assertion to bypass TypeScript resolver compatibility issues
  const form = useForm({
    resolver: zodResolver(vowFormSchema) as any,
    defaultValues: {
      first_name: '',
      surname: '',
      phone_number: '',
      email: '',
      amount_vowed: 0,
      currency: 'NGN',
      country: 'Nigeria',
      state: '',
      dc_chapter: undefined,
    }
  });
  
  // Watch for country changes to show/hide state field
  const selectedCountry = form.watch('country');
  const selectedCurrency = form.watch('currency');
  
  useEffect(() => {
    setShowStateField(selectedCountry === 'Nigeria');
  }, [selectedCountry]);
  
  // Currency symbol mapping
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'NGN': return '₦';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '₦';
    }
  };
  
  const currencySymbol = getCurrencySymbol(selectedCurrency);
  
  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      
      // Send to API
      await axios.post(`${API_URL}/api/vows`, {
        ...data,
        payment_status: 'pending',
      });
      
      setSuccess('Your vow has been successfully submitted! Thank you for your commitment.');
      form.reset();
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred while submitting your vow. Please try again later.');
      console.error('Vow submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Make a Vow</h2>
      <p className="text-gray-600 mb-6 text-center">Please fill out the form to make a vow</p>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-500 p-3 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="first_name">
              First Name *
            </label>
            <input
              id="first_name"
              type="text"
              {...form.register('first_name')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter first name"
            />
            {form.formState.errors.first_name && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.first_name.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="surname">
              Surname *
            </label>
            <input
              id="surname"
              type="text"
              {...form.register('surname')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.surname ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter surname"
            />
            {form.formState.errors.surname && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.surname.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone_number">
              Phone Number *
            </label>
            <input
              id="phone_number"
              type="text"
              {...form.register('phone_number')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.phone_number ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter phone number"
            />
            {form.formState.errors.phone_number && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.phone_number.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              {...form.register('email')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          {/* Location Information */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="country">
              Country *
            </label>
            <select
              id="country"
              {...form.register('country')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.country ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select country</option>
              {Countries.map((country: string) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {form.formState.errors.country && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.country.message}</p>
            )}
          </div>
          
          {showStateField && (
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="state">
                State *
              </label>
              <input
                id="state"
                type="text"
                {...form.register('state')}
                className={`w-full px-3 py-2 border rounded-md ${
                  form.formState.errors.state ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter state"
              />
              {form.formState.errors.state && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.state.message}</p>
              )}
            </div>
          )}
          
          <div className={showStateField ? "" : "sm:col-span-2"}>
            <label className="block text-sm font-medium mb-1" htmlFor="dc_chapter">
              DC Chapter *
            </label>
            <select
              id="dc_chapter"
              {...form.register('dc_chapter')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.dc_chapter ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a chapter</option>
              {DCChapters.map((chapter: string) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
            {form.formState.errors.dc_chapter && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.dc_chapter.message}</p>
            )}
          </div>
          
          {/* Currency and Amount */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="currency">
              Currency *
            </label>
            <select
              id="currency"
              {...form.register('currency')}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.currency ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select currency</option>
              {Object.entries(Currencies).map(([code, label]: [string, string]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            {form.formState.errors.currency && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.currency.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="amount_vowed">
              Amount Vowed ({currencySymbol}) *
            </label>
            <input
              id="amount_vowed"
              type="number"
              {...form.register('amount_vowed', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-md ${
                form.formState.errors.amount_vowed ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter amount"
            />
            {form.formState.errors.amount_vowed && (
              <p className="mt-1 text-sm text-red-500">{form.formState.errors.amount_vowed.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Vow'}
          </button>
        </div>
      </form>
    </div>
  );
} 