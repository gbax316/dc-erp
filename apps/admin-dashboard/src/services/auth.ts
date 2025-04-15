import axios from 'axios';
import { API_URL } from '@/lib/constants';

// Mock user storage
const MOCK_USERS_KEY = 'dc-erp-mock-users';

// Initialize with some mock users if storage is empty
const initMockUsers = () => {
  const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
  if (!existingUsers) {
    const initialUsers = [
      {
        id: '1',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'super.admin@example.com',
        password: 'admin123',
        role: 'super_admin',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        firstName: 'Church',
        lastName: 'Admin',
        email: 'church@example.com',
        password: 'church123',
        role: 'church_admin',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        firstName: 'Staff',
        lastName: 'User',
        email: 'staff@example.com',
        password: 'staff123',
        role: 'staff',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(initialUsers));
  }
};

// Call init function immediately
initMockUsers();

// Get mock users from localStorage
const getMockUsers = () => {
  const users = localStorage.getItem(MOCK_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save mock users to localStorage
const saveMockUsers = (users: any[]) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

// Configure real API client (for when a backend becomes available)
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock login function
export async function loginUser(email: string, password: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getMockUsers();
  const user = users.find((u: any) => 
    u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Create mock access token (in real app, this would come from the server)
  const accessToken = `mock_token_${Date.now()}_${user.id}`;
  
  // Don't include password in the returned user object
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    accessToken,
    user: userWithoutPassword
  };
}

// Mock register function
export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  churchId?: string;
}) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getMockUsers();
  
  // Check if email already exists
  const existingUser = users.find((u: any) => 
    u.email.toLowerCase() === userData.email.toLowerCase()
  );
  
  if (existingUser) {
    throw new Error('A user with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    role: userData.role || 'user',
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  // Add to mock database
  users.push(newUser);
  saveMockUsers(users);
  
  // Don't include password in the returned user
  const { password: _, ...userWithoutPassword } = newUser;
  
  return {
    user: userWithoutPassword
  };
}

// Mock get current user function
export async function getCurrentUser() {
  // In a real implementation, this would validate the token with the server
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  // Extract user ID from mock token
  const tokenParts = token.split('_');
  const userId = tokenParts[tokenParts.length - 1];
  
  const users = getMockUsers();
  const user = users.find((u: any) => u.id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Don't include password in the returned user
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
}

// Mock password reset request (just log success in mock implementation)
export async function requestPasswordReset(email: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const users = getMockUsers();
  const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('No account found with this email');
  }
  
  // In a real implementation, this would send an email
  console.log(`Password reset requested for ${email}`);
  
  return { success: true };
}

// Mock password reset (simplified for mock implementation)
export async function resetPassword(token: string, newPassword: string) {
  // Simplified mock implementation - would normally validate token
  return { success: true };
}

// Logout - client side only
export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Mock email verification
export async function verifyEmail(token: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock implementation - would normally validate token
  return { success: true };
} 