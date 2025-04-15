export interface Church {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  website?: string;
  logoUrl?: string;
  pastor?: string;
  foundedDate?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
} 