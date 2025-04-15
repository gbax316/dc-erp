import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Vow interface
export interface Vow {
  id: string;
  first_name: string;
  surname: string;
  phone_number: string;
  email: string;
  amount_vowed: number;
  dc_chapter: string;
  payment_date?: Date;
  payment_status: 'pending' | 'partially_paid' | 'paid';
  amount_paid?: number;
  notes?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// Vow form data interface
export interface VowFormData {
  first_name: string;
  surname: string;
  phone_number: string;
  email: string;
  amount_vowed: number;
  dc_chapter: string;
  payment_date?: Date;
  payment_status?: 'pending' | 'partially_paid' | 'paid';
  amount_paid?: number;
  notes?: string;
}

// Mock data for vows (for development until API is ready)
const mockVows: Vow[] = [
  {
    id: uuidv4(),
    first_name: 'John',
    surname: 'Doe',
    phone_number: '+2348012345678',
    email: 'john.doe@example.com',
    amount_vowed: 50000,
    dc_chapter: 'Wuye',
    payment_status: 'partially_paid',
    amount_paid: 25000,
    notes: 'Will complete payment next month',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    first_name: 'Jane',
    surname: 'Smith',
    phone_number: '+2348023456789',
    email: 'jane.smith@example.com',
    amount_vowed: 100000,
    dc_chapter: 'Abuja',
    payment_status: 'paid',
    amount_paid: 100000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const USE_MOCK = true; // Set to false when API is ready

// Create a new vow
export async function createVow(vowData: VowFormData): Promise<Vow> {
  if (USE_MOCK) {
    return mockCreateVow(vowData);
  }

  try {
    const response = await axios.post(`${API_URL}/api/vows`, vowData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error creating vow:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to create vow'
    );
  }
}

// Mock implementation for createVow
function mockCreateVow(vowData: VowFormData): Promise<Vow> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const newVow: Vow = {
          id: uuidv4(),
          ...vowData,
          payment_status: vowData.payment_status || 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        mockVows.push(newVow);
        resolve(newVow);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
}

// Get all vows
export async function getVows(): Promise<Vow[]> {
  if (USE_MOCK) {
    return mockGetVows();
  }

  try {
    const response = await axios.get(`${API_URL}/api/vows`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching vows:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch vows'
    );
  }
}

// Mock implementation for getVows
function mockGetVows(): Promise<Vow[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockVows]);
    }, 500);
  });
}

// Get a vow by ID
export async function getVow(id: string): Promise<Vow> {
  if (USE_MOCK) {
    return mockGetVow(id);
  }

  try {
    const response = await axios.get(`${API_URL}/api/vows/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error fetching vow ${id}:`, error);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch vow'
    );
  }
}

// Mock implementation for getVow
function mockGetVow(id: string): Promise<Vow> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const vow = mockVows.find(v => v.id === id);
      if (vow) {
        resolve({ ...vow });
      } else {
        reject(new Error('Vow not found'));
      }
    }, 500);
  });
}

// Update a vow
export async function updateVow(id: string, vowData: Partial<VowFormData>): Promise<Vow> {
  if (USE_MOCK) {
    return mockUpdateVow(id, vowData);
  }

  try {
    const response = await axios.patch(`${API_URL}/api/vows/${id}`, vowData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error(`Error updating vow ${id}:`, error);
    throw new Error(
      error.response?.data?.message || 'Failed to update vow'
    );
  }
}

// Mock implementation for updateVow
function mockUpdateVow(id: string, vowData: Partial<VowFormData>): Promise<Vow> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockVows.findIndex(v => v.id === id);
      
      if (index === -1) {
        reject(new Error('Vow not found'));
        return;
      }
      
      const updatedVow: Vow = {
        ...mockVows[index],
        ...vowData,
        updated_at: new Date().toISOString(),
      };
      
      mockVows[index] = updatedVow;
      resolve({ ...updatedVow });
    }, 500);
  });
} 