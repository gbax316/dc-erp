import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { z } from 'zod';

// Type for form data (what comes from the form)
export type ServiceReportFormData = {
  date: Date;
  service_type: string;
  attendance_total: number;
  male: number;
  female: number;
  children: number;
  first_timers: number;
  new_converts: number;
  
  // Tithes
  tithesCash: number;
  tithesTransfer: number;
  tithesPOS: number;
  
  // Offerings
  offeringsCash: number;
  offeringsTransfer: number;
  offeringsPOS: number;
  
  // Special Seeds
  specialSeedsCash: number;
  specialSeedsTransfer: number;
  specialSeedsPOS: number;
  
  // Project Offering
  projectOfferingCash: number;
  projectOfferingTransfer: number;
  projectOfferingPOS: number;
  
  // Previous Week Transfers (Sunday-only)
  previousWeekTithesTransfer?: number;
  previousWeekOfferingsTransfer?: number;
  previousWeekSeedsTransfer?: number;
  previousWeekProjectTransfer?: number;
  
  // Calculated totals
  total_earnings: number;
  remittance_due: number;
};

export type ServiceReportResponse = ServiceReportFormData & {
  id: string;
  church_id: string;
  submitted_by_user_id: string;
  created_at: string;
  updated_at: string;
};

// Mock data for service reports (for development until API is ready)
const mockServiceReports: ServiceReportResponse[] = [
  {
    id: uuidv4(),
    church_id: '1',
    service_type: 'Sunday Service',
    date: new Date('2023-09-10'),
    male: 150,
    female: 180,
    children: 90,
    attendance_total: 420,
    first_timers: 15,
    new_converts: 8,
    
    // Tithes by payment method
    tithesCash: 250000,
    tithesTransfer: 600000,
    tithesPOS: 0,
    
    // Offerings by payment method
    offeringsCash: 120000,
    offeringsTransfer: 350000,
    offeringsPOS: 0,
    
    // Special Seeds by payment method
    specialSeedsCash: 0,
    specialSeedsTransfer: 100000,
    specialSeedsPOS: 0,
    
    // Project Offerings by payment method
    projectOfferingCash: 0,
    projectOfferingTransfer: 0,
    projectOfferingPOS: 0,
    
    // Previous Week Transfers
    previousWeekTithesTransfer: 800000,
    previousWeekOfferingsTransfer: 450000,
    previousWeekSeedsTransfer: 100000,
    previousWeekProjectTransfer: 0,
    
    // Calculated totals
    total_earnings: 2770000,
    remittance_due: 1385000,
    
    submitted_by_user_id: 'user-123',
    created_at: new Date('2023-09-10T18:30:00').toISOString(),
    updated_at: new Date('2023-09-10T18:30:00').toISOString()
  },
  {
    id: uuidv4(),
    church_id: '1',
    service_type: 'Midweek Service',
    date: new Date('2023-09-13'),
    male: 85,
    female: 110,
    children: 45,
    attendance_total: 240,
    first_timers: 3,
    new_converts: 2,
    
    // Tithes by payment method
    tithesCash: 50000,
    tithesTransfer: 150000,
    tithesPOS: 0,
    
    // Offerings by payment method
    offeringsCash: 35000,
    offeringsTransfer: 85000,
    offeringsPOS: 0,
    
    // Special Seeds by payment method
    specialSeedsCash: 0,
    specialSeedsTransfer: 0,
    specialSeedsPOS: 0,
    
    // Project Offerings by payment method
    projectOfferingCash: 0,
    projectOfferingTransfer: 0,
    projectOfferingPOS: 0,
    
    // Calculated totals
    total_earnings: 320000,
    remittance_due: 160000,
    
    submitted_by_user_id: 'user-123',
    created_at: new Date('2023-09-13T21:00:00').toISOString(),
    updated_at: new Date('2023-09-13T21:00:00').toISOString()
  }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_MOCK = true; // Set to false when API is ready

// Mock create service report function
const mockCreateServiceReport = async (data: ServiceReportFormData): Promise<ServiceReportResponse> => {
  const newReport: ServiceReportResponse = {
    id: uuidv4(),
    church_id: '1', // In a real app, this would come from the user's context/selection
    ...data,
    submitted_by_user_id: 'user-123', // In a real app, this would be the current user's ID
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockServiceReports.push(newReport);
  return newReport;
};

// Get all service reports
export async function getServiceReports(): Promise<ServiceReportResponse[]> {
  if (USE_MOCK) {
    return mockServiceReports;
  }

  try {
    const response = await axios.get(`${API_URL}/api/service-reports`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching service reports:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch service reports'
    );
  }
}

// Get service report by ID
export async function getServiceReportById(id: string): Promise<ServiceReportResponse | undefined> {
  if (USE_MOCK) {
    return mockServiceReports.find(report => report.id === id);
  }

  try {
    const response = await axios.get(`${API_URL}/api/service-reports/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error fetching service report with ID ${id}:`, error);
    throw new Error(
      error.response?.data?.message || `Failed to fetch service report with ID ${id}`
    );
  }
}

// Create a new service report
export async function createServiceReport(data: ServiceReportFormData): Promise<ServiceReportResponse> {
  if (USE_MOCK) {
    return mockCreateServiceReport(data);
  }

  try {
    const response = await axios.post(`${API_URL}/api/service-reports`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error creating service report:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to create service report'
    );
  }
}

// Update a service report
export async function updateServiceReport(id: string, data: Partial<ServiceReportFormData>): Promise<ServiceReportResponse> {
  if (USE_MOCK) {
    const reportIndex = mockServiceReports.findIndex(report => report.id === id);
    if (reportIndex === -1) {
      throw new Error(`Service report with ID ${id} not found`);
    }
    
    mockServiceReports[reportIndex] = {
      ...mockServiceReports[reportIndex],
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return mockServiceReports[reportIndex];
  }

  try {
    const response = await axios.put(`${API_URL}/api/service-reports/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error updating service report with ID ${id}:`, error);
    throw new Error(
      error.response?.data?.message || `Failed to update service report with ID ${id}`
    );
  }
}

// Delete a service report
export async function deleteServiceReport(id: string): Promise<void> {
  if (USE_MOCK) {
    const reportIndex = mockServiceReports.findIndex(report => report.id === id);
    if (reportIndex === -1) {
      throw new Error(`Service report with ID ${id} not found`);
    }
    
    mockServiceReports.splice(reportIndex, 1);
    return;
  }

  try {
    await axios.delete(`${API_URL}/api/service-reports/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error: any) {
    console.error(`Error deleting service report with ID ${id}:`, error);
    throw new Error(
      error.response?.data?.message || `Failed to delete service report with ID ${id}`
    );
  }
} 