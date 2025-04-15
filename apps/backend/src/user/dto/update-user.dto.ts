import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty({ description: 'User\'s email address', example: 'user@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'User\'s first name', example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: 'User\'s last name', example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: 'User\'s password', example: 'Password123!', required: false })
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiProperty({ description: 'User\'s role', enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ description: 'User\'s phone number', example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'User\'s profile picture URL', required: false })
  @IsString()
  @IsOptional()
  profilePicture?: string;
} 