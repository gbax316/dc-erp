import { v4 as uuidv4 } from 'uuid';
import { Church, ChurchFormValues } from '../church';

// Mock database of churches
let churches: Church[] = [
  {
    id: '1',
    church_name: 'Dominion City Wuye',
    address: '45 Wuye Market Road',
    state: 'FCT',
    city: 'Abuja',
    membership_strength: 1500,
    pastor_name: 'David Ogbueli',
    pastor_phone: '+2348012345678',
    pastor_email: 'pastor.wuye@dominioncity.org',
    admin_name: 'Sarah Johnson',
    admin_phone: '+2348023456789',
    admin_email: 'admin.wuye@dominioncity.org',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    church_name: 'Dominion City Abuja',
    address: '23 Constitution Avenue',
    state: 'FCT',
    city: 'Abuja',
    membership_strength: 1200,
    pastor_name: 'Michael Adeyemi',
    pastor_phone: '+2348034567890',
    pastor_email: 'pastor.abuja@dominioncity.org',
    admin_name: 'Daniel Okafor',
    admin_phone: '+2348045678901',
    admin_email: 'admin.abuja@dominioncity.org',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    church_name: 'Dominion City Enugu',
    address: '78 Independence Layout',
    state: 'Enugu',
    city: 'Enugu',
    membership_strength: 850,
    pastor_name: 'Emmanuel Nwosu',
    pastor_phone: '+2348056789012',
    pastor_email: 'pastor.enugu@dominioncity.org',
    admin_name: 'Chioma Eze',
    admin_phone: '+2348067890123',
    admin_email: 'admin.enugu@dominioncity.org',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Get all churches
const getChurches = async (): Promise<Church[]> => {
  return [...churches];
};

// Get a single church by ID
const getChurch = async (id: string): Promise<Church | null> => {
  const church = churches.find(c => c.id === id);
  return church || null;
};

// Create a new church
const createChurch = async (churchData: ChurchFormValues): Promise<Church> => {
  const newChurch: Church = {
    id: uuidv4(),
    ...churchData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  churches.push(newChurch);
  return newChurch;
};

// Update a church
const updateChurch = async (id: string, churchData: Partial<ChurchFormValues>): Promise<Church | null> => {
  const index = churches.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  const updatedChurch = {
    ...churches[index],
    ...churchData,
    updatedAt: new Date().toISOString(),
  };
  
  churches[index] = updatedChurch;
  return updatedChurch;
};

// Delete a church
const deleteChurch = async (id: string): Promise<boolean> => {
  const initialLength = churches.length;
  churches = churches.filter(c => c.id !== id);
  return churches.length < initialLength;
};

export default {
  getChurches,
  getChurch,
  createChurch,
  updateChurch,
  deleteChurch,
}; 