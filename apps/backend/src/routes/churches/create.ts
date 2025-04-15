import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Church } from '../../church/entities/church.entity';
import { User, UserRole } from '../../user/entities/user.entity';

/**
 * Create a new church
 * 
 * Access: SUPER_ADMIN, ADMIN, BRANCH_ADMIN
 */
export async function createChurch(req: Request, res: Response) {
  try {
    const user = req.user as User;
    
    // Check if user has permission to create churches
    if (![UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.BRANCH_ADMIN].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to create churches',
      });
    }
    
    const churchRepository = getRepository(Church);
    const churchData = req.body;
    
    // Create new church entity
    const church = churchRepository.create({
      ...churchData,
      // If user is branch admin, link them to this church
      // This will be used later for access control
      createdById: user.id,
    });
    
    // Save to database
    const savedChurch = await churchRepository.save(church);
    
    return res.status(201).json({
      success: true,
      data: savedChurch,
      message: 'Church created successfully',
    });
  } catch (error) {
    console.error('Error creating church:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create church',
      error: error.message,
    });
  }
} 