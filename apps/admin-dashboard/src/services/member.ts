import mockMemberService from './mocks/memberService';

// Member interface
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

// Member form data interface
export interface MemberFormData {
  first_name: string;
  surname: string;
  phone_number: string;
  email: string;
  thumbnail?: string;
  church_id: string;
  department?: string;
  contact_address?: string;
  trainings_attended?: string[];
}

// Get all members (using mock implementation)
export async function getMembers() {
  try {
    const members = await mockMemberService.getMembers();
    return members;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
}

// Get members by church ID (using mock implementation)
export async function getMembersByChurch(churchId: string) {
  try {
    const members = await mockMemberService.getMembersByChurch(churchId);
    return members;
  } catch (error) {
    console.error(`Error fetching members for church ID ${churchId}:`, error);
    throw error;
  }
}

// Get a member by ID (using mock implementation)
export async function getMember(id: string) {
  try {
    const member = await mockMemberService.getMember(id);
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  } catch (error) {
    console.error(`Error fetching member with ID ${id}:`, error);
    throw error;
  }
}

// Create a new member (using mock implementation)
export async function createMember(memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    // Ensure required fields are present
    const formattedData = {
      ...memberData,
      status: memberData.status || 'active',
      ministryInvolvement: memberData.ministryInvolvement || []
    };
    
    const newMember = await mockMemberService.createMember(formattedData);
    return newMember;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
}

// Create a member from form data
export async function createMemberFromForm(formData: MemberFormData): Promise<Member> {
  try {
    // Map form data to Member interface
    const memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: formData.first_name,
      lastName: formData.surname,
      email: formData.email,
      phone: formData.phone_number,
      address: formData.contact_address,
      churchId: formData.church_id,
      department: formData.department,
      profileImageUrl: formData.thumbnail,
      ministryInvolvement: formData.trainings_attended,
      status: 'active',
      trainings_attended: formData.trainings_attended,
      contact_address: formData.contact_address
    };
    
    const newMember = await mockMemberService.createMember(memberData);
    return newMember;
  } catch (error) {
    console.error('Error creating member from form:', error);
    throw error;
  }
}

// Update a member (using mock implementation)
export async function updateMember(id: string, memberData: Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const updatedMember = await mockMemberService.updateMember(id, memberData);
    if (!updatedMember) {
      throw new Error('Member not found');
    }
    return updatedMember;
  } catch (error) {
    console.error(`Error updating member with ID ${id}:`, error);
    throw error;
  }
}

// Delete a member (using mock implementation)
export async function deleteMember(id: string) {
  try {
    const result = await mockMemberService.deleteMember(id);
    if (!result) {
      throw new Error('Member not found');
    }
    return { success: true };
  } catch (error) {
    console.error(`Error deleting member with ID ${id}:`, error);
    throw error;
  }
}

// Search members (using mock implementation)
export async function searchMembers(query: string) {
  try {
    const members = await mockMemberService.searchMembers(query);
    return members;
  } catch (error) {
    console.error(`Error searching members with query "${query}":`, error);
    throw error;
  }
}

// Get current member profile
export async function getMemberProfile() {
  try {
    // In a real app, this would get the current user's ID from auth context/state
    // For development, we'll use the first mock member if no ID is stored
    const memberId = localStorage.getItem('currentMemberId') || '1';
    
    const member = await getMember(memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    
    return member;
  } catch (error) {
    console.error('Error fetching member profile:', error);
    throw new Error('Failed to load member profile. Please check your authentication status.');
  }
} 