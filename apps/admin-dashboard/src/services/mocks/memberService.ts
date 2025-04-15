import { v4 as uuidv4 } from 'uuid';

// Member interface for mock service
export interface Member {
  id: string;
  churchId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  joinDate?: string;
  status: 'active' | 'inactive';
  role?: string;
  department?: string;
  ministryInvolvement?: string[];
  baptismDate?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt?: string;
  trainings_attended?: string[];
  contact_address?: string;
}

// Mock data
const mockMembers: Member[] = [
  {
    id: '1',
    churchId: '1', // This should match an existing church ID
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    country: 'USA',
    gender: 'male',
    dateOfBirth: '1985-06-15',
    joinDate: '2020-03-10',
    status: 'active',
    role: 'Elder',
    department: 'Worship',
    ministryInvolvement: ['Worship', 'Outreach'],
    baptismDate: '2010-05-22',
    profileImageUrl: 'https://example.com/profiles/john.jpg',
    createdAt: new Date('2020-03-10').toISOString(),
    updatedAt: new Date('2022-01-15').toISOString(),
    trainings_attended: ['DCA', 'DLI Basic', 'Encounter']
  },
  {
    id: '2',
    churchId: '1', // This should match an existing church ID
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave',
    city: 'Springfield',
    state: 'IL',
    country: 'USA',
    gender: 'female',
    dateOfBirth: '1990-11-22',
    joinDate: '2019-07-15',
    status: 'active',
    role: 'Deacon',
    department: 'Children',
    ministryInvolvement: ['Children', 'Hospitality'],
    baptismDate: '2015-08-30',
    profileImageUrl: 'https://example.com/profiles/jane.jpg',
    createdAt: new Date('2019-07-15').toISOString(),
    updatedAt: new Date('2021-12-10').toISOString(),
    trainings_attended: ['DCA', 'DCA Advance', 'GLI']
  }
];

// Helper function to get members from localStorage or use default mock data
const getStoredMembers = (): Member[] => {
  try {
    const storedMembers = localStorage.getItem('dc-erp-mock-members');
    if (storedMembers) {
      return JSON.parse(storedMembers);
    }
  } catch (error) {
    console.error('Error retrieving members from localStorage:', error);
  }
  
  // If nothing in localStorage or error occurred, initialize with default mock
  localStorage.setItem('dc-erp-mock-members', JSON.stringify(mockMembers));
  return [...mockMembers];
};

// Helper function to store members in localStorage
const storeMembers = (members: Member[]): void => {
  try {
    localStorage.setItem('dc-erp-mock-members', JSON.stringify(members));
  } catch (error) {
    console.error('Error storing members in localStorage:', error);
  }
};

// Initialize members in localStorage if not already present
const initMockMembers = (): void => {
  const existingMembers = localStorage.getItem('dc-erp-mock-members');
  if (!existingMembers) {
    localStorage.setItem('dc-erp-mock-members', JSON.stringify(mockMembers));
  }
};

// Initialize the mock data
initMockMembers();

// Mock member service
const memberService = {
  // Get all members
  getMembers: async (): Promise<Member[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const members = getStoredMembers();
        resolve(members);
      }, 500);
    });
  },
  
  // Get members by church ID
  getMembersByChurch: async (churchId: string): Promise<Member[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const members = getStoredMembers();
        const filteredMembers = members.filter(m => m.churchId === churchId);
        resolve(filteredMembers);
      }, 500);
    });
  },
  
  // Get a member by ID
  getMember: async (id: string): Promise<Member | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const members = getStoredMembers();
        const member = members.find(m => m.id === id);
        resolve(member || null);
      }, 500);
    });
  },
  
  // Create a new member
  createMember: async (data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const members = getStoredMembers();
          
          // Check for duplicate email - email is required in the Member interface
          const emailToCheck = data.email.toLowerCase();
          const emailExists = members.some(m => m.email.toLowerCase() === emailToCheck);
          if (emailExists) {
            throw new Error('A member with this email already exists');
          }
          
          const newMember: Member = {
            ...data,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          members.push(newMember);
          storeMembers(members);
          resolve(newMember);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  },
  
  // Update a member
  updateMember: async (id: string, data: Partial<Omit<Member, 'id' | 'createdAt'>>): Promise<Member | null> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const members = getStoredMembers();
          const index = members.findIndex(m => m.id === id);
          
          if (index === -1) {
            resolve(null);
            return;
          }
          
          // Check for duplicate email if changing email
          if (data.email) {
            const emailToCheck = data.email.toLowerCase(); 
            const emailExists = members.some(m => 
              m.id !== id && m.email.toLowerCase() === emailToCheck
            );
            if (emailExists) {
              throw new Error('A member with this email already exists');
            }
          }
          
          const updatedMember: Member = {
            ...members[index],
            ...data,
            updatedAt: new Date().toISOString()
          };
          
          members[index] = updatedMember;
          storeMembers(members);
          resolve(updatedMember);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  },
  
  // Delete a member
  deleteMember: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const members = getStoredMembers();
        const index = members.findIndex(m => m.id === id);
        
        if (index === -1) {
          resolve(false);
          return;
        }
        
        members.splice(index, 1);
        storeMembers(members);
        resolve(true);
      }, 500);
    });
  },
  
  // Search members
  searchMembers: async (query: string): Promise<Member[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const members = getStoredMembers();
        if (!query) {
          resolve(members);
          return;
        }
        
        const lowercaseQuery = query.toLowerCase();
        const filteredMembers = members.filter(m => 
          m.firstName.toLowerCase().includes(lowercaseQuery) ||
          m.lastName.toLowerCase().includes(lowercaseQuery) ||
          m.email.toLowerCase().includes(lowercaseQuery) ||
          (m.phone && m.phone.includes(query))
        );
        
        resolve(filteredMembers);
      }, 500);
    });
  }
};

export default memberService; 