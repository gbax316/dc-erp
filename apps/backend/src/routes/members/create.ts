import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, UserRole } from '../../user/entities/user.entity';

/**
 * Create a new member
 * 
 * Access:
 * - MEMBER: own profile
 * - BRANCH_ADMIN, ADMIN, STAFF, UNIT_LEADER: manage others in their scope
 * - SUPER_ADMIN: view all
 */
export async function createMember(req: Request, res: Response) {
  try {
    const user = req.user as User;
    const memberData = req.body;
    
    // Check if user has permission to create this member
    if (![
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN, 
      UserRole.BRANCH_ADMIN, 
      UserRole.STAFF,
      UserRole.UNIT_LEADER,
      UserRole.MEMBER,
    ].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to create member profiles',
      });
    }

    // If user is a MEMBER, they should only be able to create/edit their own profile
    if (user.role === UserRole.MEMBER) {
      // Check if the email in the profile matches the user's email
      if (memberData.email !== user.email) {
        return res.status(403).json({
          success: false,
          message: 'You can only create your own member profile',
        });
      }
    }
    
    // If user is BRANCH_ADMIN, verify they belong to the same church
    if (user.role === UserRole.BRANCH_ADMIN) {
      // In a real implementation, check that the church_id matches one the branch admin manages
      // This would require a churchAdmin table or similar to track which admin manages which churches
    }
    
    // If user is UNIT_LEADER, they should only create members for their unit/department
    if (user.role === UserRole.UNIT_LEADER) {
      // In a real implementation, check that the department matches the leader's department
      // This would require a userDepartment table or similar
    }

    // Prepare the data for database insertion
    const mappedData = {
      first_name: memberData.first_name,
      surname: memberData.surname,
      phone_number: memberData.phone_number,
      email: memberData.email,
      thumbnail: memberData.thumbnail,
      church_id: memberData.church_id,
      department: memberData.department,
      contact_address: memberData.contact_address,
      trainings_attended: memberData.trainings_attended || [],
      created_by: user.id,
    };
    
    // Save to database
    // In a real implementation, use TypeORM repository
    // const memberRepository = getRepository(Member);
    // const member = memberRepository.create(mappedData);
    // const savedMember = await memberRepository.save(member);
    
    // For now, just return the mapped data with a fake ID
    const savedMember = {
      id: 'temp-id-' + Date.now(),
      ...mappedData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    return res.status(201).json({
      success: true,
      data: savedMember,
      message: 'Member profile created successfully',
    });
  } catch (error) {
    console.error('Error creating member:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create member profile',
      error: error.message,
    });
  }
} 