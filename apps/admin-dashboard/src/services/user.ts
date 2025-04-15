import axios from 'axios';
import { API_URL } from '@/lib/constants';
import { User, UserRole } from '@/lib/types';

// Create axios instance
const userApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all users (admin only)
export async function getUsers() {
  try {
    const response = await userApi.get('/users');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Get a user by ID
export async function getUser(id: string) {
  try {
    const response = await userApi.get(`/users/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
}

// Create a new user
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'isActive'> & { password: string }) {
  try {
    const response = await userApi.post('/users', userData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update a user
export async function updateUser(id: string, userData: Partial<User>) {
  try {
    const response = await userApi.put(`/users/${id}`, userData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    const response = await userApi.delete(`/users/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
}

// Change user's role
export async function changeUserRole(id: string, newRole: UserRole) {
  try {
    const response = await userApi.patch(`/users/${id}/role`, { role: newRole });
    return response.data.data;
  } catch (error) {
    console.error(`Error changing role for user ID ${id}:`, error);
    throw error;
  }
}

// Activate or deactivate a user
export async function setUserStatus(id: string, isActive: boolean) {
  try {
    const response = await userApi.patch(`/users/${id}/status`, { isActive });
    return response.data.data;
  } catch (error) {
    console.error(`Error updating status for user ID ${id}:`, error);
    throw error;
  }
}

// Reset user password (admin function)
export async function resetUserPassword(id: string) {
  try {
    const response = await userApi.post(`/users/${id}/reset-password`);
    return response.data.data;
  } catch (error) {
    console.error(`Error resetting password for user ID ${id}:`, error);
    throw error;
  }
}

// Change own password
export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    const response = await userApi.post('/auth/change-password', {
      oldPassword,
      newPassword
    });
    return response.data.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
} 