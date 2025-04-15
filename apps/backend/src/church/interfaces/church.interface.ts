export interface Church {
  id: string;
  church_name: string;
  address: string;
  city?: string;
  state: string;
  postalCode?: string;
  country?: string;
  membership_strength?: number;
  pastor_name: string;
  pastor_phone: string;
  pastor_email: string;
  admin_name: string;
  admin_phone: string;
  admin_email: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  description?: string;
  foundedDate?: string;
  denomination?: string;
  createdAt: string;
  updatedAt: string;
} 