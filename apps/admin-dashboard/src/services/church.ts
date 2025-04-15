import axios from 'axios';
import { z } from 'zod';
import mockChurchService from './mocks/churchService';

// Define Church type based on the form values
export interface Church {
  id: string;
  church_name: string;
  address: string;
  state: string;
  city?: string;
  membership_strength?: number;
  pastor_name: string;
  pastor_phone: string;
  pastor_email: string;
  admin_name: string;
  admin_phone: string;
  admin_email: string;
  createdAt: string;
  updatedAt: string;
}

// Type for the form values
export interface ChurchFormValues {
  church_name: string;
  address: string;
  state: string;
  membership_strength?: number;
  pastor_name: string;
  pastor_phone: string;
  pastor_email: string;
  admin_name: string;
  admin_phone: string;
  admin_email: string;
}

// Schema for validating church data
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
  
  membership_strength: z.coerce.number()
    .int()
    .positive({ message: 'Membership strength must be a positive number' })
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Determine if we should use mock or real API
const USE_MOCK = true; // Set to false to use real API

// Create a new church
export async function createChurch(data: ChurchFormValues): Promise<Church> {
  if (USE_MOCK) {
    return mockChurchService.createChurch(data);
  }

  try {
    const response = await axios.post(`${API_URL}/api/church`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error creating church:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to create church'
    );
  }
}

// Get all churches
export async function getChurches(): Promise<Church[]> {
  if (USE_MOCK) {
    return mockChurchService.getChurches();
  }

  try {
    const response = await axios.get(`${API_URL}/api/church`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching churches:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch churches'
    );
  }
}

// Get a single church by ID
export async function getChurch(id: string): Promise<Church> {
  if (USE_MOCK) {
    const church = await mockChurchService.getChurch(id);
    if (!church) {
      throw new Error(`Church with id ${id} not found`);
    }
    return church;
  }

  try {
    const response = await axios.get(`${API_URL}/api/church/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error fetching church ${id}:`, error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch church'
    );
  }
}

// Update an existing church
export async function updateChurch(id: string, data: Partial<ChurchFormValues>): Promise<Church> {
  if (USE_MOCK) {
    const church = await mockChurchService.updateChurch(id, data);
    if (!church) {
      throw new Error(`Church with id ${id} not found`);
    }
    return church;
  }

  try {
    const response = await axios.patch(`${API_URL}/api/church/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error updating church ${id}:`, error);
    throw new Error(
      error.response?.data?.message || 'Failed to update church'
    );
  }
}

// Delete a church (using mock implementation)
export async function deleteChurch(id: string) {
  try {
    const result = await mockChurchService.deleteChurch(id);
    if (!result) {
      throw new Error('Church not found');
    }
    return { success: true };
  } catch (error) {
    console.error(`Error deleting church with ID ${id}:`, error);
    throw error;
  }
}

// Get members of a church (using mock implementation)
export async function getChurchMembers(churchId: string) {
  try {
    // For now, return empty array since we don't have mock members implementation
    return [];
  } catch (error) {
    console.error(`Error fetching members for church ID ${churchId}:`, error);
    throw error;
  }
}

// Get church events (using mock implementation)
export async function getChurchEvents(churchId: string) {
  try {
    // For now, return empty array since we don't have mock events implementation
    return [];
  } catch (error) {
    console.error(`Error fetching events for church ID ${churchId}:`, error);
    throw error;
  }
} 