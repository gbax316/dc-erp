import { MembershipStatus } from '../dto/create-member.dto';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  churchId: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  status?: MembershipStatus;
  joinDate?: string;
  ministries?: string[];
  profilePicture?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  isBaptized?: boolean;
  baptismDate?: string;
  createdAt: string;
  updatedAt: string;
} 