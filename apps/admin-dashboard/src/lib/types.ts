// User role types
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'ADMIN',
  BRANCH_ADMIN = 'branch_admin',
  STAFF = 'STAFF',
  FINANCIAL_CONTROLLER = 'financial_controller',
  UNIT_LEADER = 'unit_leader',
  DATA_ENTRY = 'data_entry',
  MEMBER = 'MEMBER'
}

// Church related types
export interface Church {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  pastor?: string;
  foundedDate?: string;
  status: 'active' | 'inactive';
  logoUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

// Member related types
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
}

// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  churchId?: string;
  profileImageUrl?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Event related types
export interface Event {
  id: string;
  churchId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  status: 'scheduled' | 'canceled' | 'completed';
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

// Finance related types
export interface Transaction {
  id: string;
  churchId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Donation {
  id: string;
  churchId: string;
  donorId?: string;
  donorName?: string;
  amount: number;
  method: 'cash' | 'check' | 'card' | 'online' | 'other';
  category: string;
  date: string;
  isAnonymous: boolean;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const RoleHierarchy: Record<string, number> = {
  'super_admin': 50,
  'ADMIN': 40,
  'branch_admin': 30,
  'STAFF': 20,
  'MEMBER': 10
};

export interface Role {
  id: string;
  name: string;
  description: string;
  level: number;
  permissions: string[];
}

export const RoleDefinitions: Role[] = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full access to all features across all churches',
    level: RoleHierarchy['super_admin'],
    permissions: ['*']
  },
  {
    id: 'ADMIN',
    name: 'Admin',
    description: 'Administrative access to a specific church',
    level: RoleHierarchy['ADMIN'],
    permissions: [
      'churches.view',
      'churches.edit',
      'members.view',
      'members.edit',
      'finance.view',
      'finance.edit',
      'events.view',
      'events.edit',
      'media.view',
      'media.edit',
      'users.view',
      'users.edit'
    ]
  },
  {
    id: 'branch_admin',
    name: 'Church Admin',
    description: 'Access to manage a specific church',
    level: RoleHierarchy['branch_admin'],
    permissions: [
      'churches.view',
      'churches.edit',
      'members.view',
      'members.edit',
      'finance.view',
      'finance.edit',
      'events.view',
      'events.edit',
      'media.view',
      'media.edit',
      'users.view',
      'users.edit'
    ]
  },
  {
    id: 'STAFF',
    name: 'Staff',
    description: 'Access to manage church operations',
    level: RoleHierarchy['STAFF'],
    permissions: [
      'churches.view',
      'members.view',
      'members.edit',
      'events.view',
      'events.edit',
      'media.view',
      'media.edit',
      'finance.view'
    ]
  },
  {
    id: 'MEMBER',
    name: 'User',
    description: 'Regular user with limited access',
    level: RoleHierarchy['MEMBER'],
    permissions: [
      'churches.view',
      'members.view',
      'events.view',
      'media.view'
    ]
  }
]; 