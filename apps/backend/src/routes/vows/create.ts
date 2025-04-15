import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateRandomPassword } from '@/utils/auth';
import { sendEmail } from '@/utils/email';
import { createRoute } from '@/lib/createRoute';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User, UserRole } from '../../user/entities/user.entity';
import bcrypt from 'bcrypt';
import { hash } from 'bcrypt';

/**
 * Create a new vow and handle user creation/attachment
 * 
 * Access:
 * - GUEST, MEMBER, DATA_ENTRY: submit
 * - BRANCH_ADMIN, ADMIN, SUPER_ADMIN: review/manage
 */
export const POST = createRoute(async (req) => {
  const body = createVowSchema.parse(req.body);

  // Search for existing user
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: body.email },
        { phone: body.phone },
        {
          AND: [
            { firstName: body.firstName },
            { lastName: body.surname },
          ],
        },
      ],
    },
  });

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
  } else {
    // Generate and hash temporary password
    const tempPassword = generateRandomPassword();
    const hashedPassword = await hash(tempPassword, 10);

    // Create new user with MEMBER role
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        phone: body.phone,
        firstName: body.firstName,
        lastName: body.surname,
        password: hashedPassword,
        role: 'MEMBER',
      },
    });

    userId = newUser.id;

    // Send welcome email with credentials
    await sendEmail({
      to: body.email,
      subject: 'Welcome to Dominion City',
      html: `
        <p>Hello ${body.firstName},</p>
        <p>Your account has been created:</p>
        <p><strong>Username:</strong> ${body.email}</p>
        <p><strong>Password:</strong> ${tempPassword}</p>
        <p><a href="${process.env.APP_URL}/login">Login Here</a></p>
      `,
    });
  }

  // Create the vow record
  const vow = await prisma.vow.create({
    data: {
      userId,
      firstName: body.firstName,
      surname: body.surname,
      phone: body.phone,
      email: body.email,
      amount: body.amount,
      chapter: body.dcChapter,
      status: 'PENDING',
      createdAt: new Date()
    }
  });

  return {
    success: true,
    data: {
      vow: {
        id: vow.id,
        amount: vow.amount,
        status: vow.status,
        firstName: vow.firstName,
        surname: vow.surname,
        email: vow.email
      }
    }
  };
});

const createVowSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  amount: z.number().positive('Amount must be positive'),
  dcChapter: z.string().min(1, 'DC Chapter is required')
});

export async function createVow(req: Request, res: Response) {
  try {
    const vowData = req.body;
    let userId = null;
    
    // Check if user is authenticated
    if (req.user) {
      const user = req.user as User;
      userId = user.id;
      
      // Check if authenticated user has permission for vow management
      const hasManagementPermission = [
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.BRANCH_ADMIN,
      ].includes(user.role);
      
      // If user has management permissions, they can create vows for others
      // Otherwise, ensure the vow email matches the authenticated user's email
      if (!hasManagementPermission && vowData.email !== user.email) {
        return res.status(403).json({
          success: false,
          message: 'You can only make vows using your own email address',
        });
      }
    } else {
      // For unauthenticated users (guests), check if a user with the provided email exists
      try {
        const userRepository = getRepository(User);
        const existingUser = await userRepository.findOne({ where: { email: vowData.email } });
        
        if (existingUser) {
          // If user exists, attach the vow to this user
          userId = existingUser.id;
        } else {
          // Create a new user with MEMBER role
          const newUser = userRepository.create({
            email: vowData.email,
            firstName: vowData.first_name,
            lastName: vowData.surname,
            phone: vowData.phone_number,
            role: UserRole.MEMBER,
            // Set a random password that the user will need to reset
            password: Math.random().toString(36).slice(-10),
            isEmailVerified: false,
          });
          
          const savedUser = await userRepository.save(newUser);
          userId = savedUser.id;
          
          // TODO: Send email to user to verify email and set password
        }
      } catch (error) {
        console.error('Error finding/creating user:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to process user information',
          error: error.message,
        });
      }
    }
    
    // Prepare the vow data for database insertion
    const vow = {
      first_name: vowData.first_name,
      surname: vowData.surname,
      email: vowData.email,
      phone_number: vowData.phone_number,
      currency: vowData.currency || 'NGN',
      amount_vowed: vowData.amount_vowed,
      dc_chapter: vowData.dc_chapter,
      country: vowData.country || 'Nigeria',
      state: vowData.state,
      payment_status: 'pending',
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // In a real implementation, save to database
    // const vowRepository = getRepository(Vow);
    // const createdVow = vowRepository.create(vow);
    // const savedVow = await vowRepository.save(createdVow);
    
    // For now, just return success with mock ID
    const mockVow = {
      id: 'vow-' + Date.now(),
      ...vow,
    };
    
    return res.status(201).json({
      success: true,
      data: mockVow,
      message: 'Vow created successfully',
    });
    
  } catch (error) {
    console.error('Error creating vow:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create vow',
      error: error.message,
    });
  }
} 