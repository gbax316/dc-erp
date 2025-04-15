// Common type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}