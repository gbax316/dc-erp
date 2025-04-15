import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationOptions, PaginatedResult } from '../common/interfaces/pagination.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with this email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(options: PaginationOptions): Promise<PaginatedResult<User>> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: options.page * options.limit,
      take: options.limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items: users,
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // If trying to update email, check if it's already in use
    if (updateUserDto.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email is already in use');
      }
    }

    const user = await this.findOne(id);
    const updatedUser = this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Two-factor authentication
  async setTwoFactorSecret(userId: string, secret: string): Promise<User> {
    const user = await this.findOne(userId);
    user.twoFactorSecret = secret;
    return this.userRepository.save(user);
  }

  async enableTwoFactor(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    user.twoFactorEnabled = true;
    return this.userRepository.save(user);
  }

  async disableTwoFactor(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    return this.userRepository.save(user);
  }

  // Password reset
  async updateResetToken(userId: string, token: string, expires: Date): Promise<User> {
    const user = await this.findOne(userId);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    return this.userRepository.save(user);
  }

  async findByResetToken(token: string): Promise<User | null> {
    // Need to check if token hash matches
    const users = await this.userRepository.find();
    
    for (const user of users) {
      if (user.resetPasswordToken && await bcrypt.compare(token, user.resetPasswordToken)) {
        return user;
      }
    }
    
    return null;
  }

  async resetPassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.findOne(userId);
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    return this.userRepository.save(user);
  }

  // Login tracking
  async updateLastLogin(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    user.lastLoginAt = new Date();
    return this.userRepository.save(user);
  }
} 