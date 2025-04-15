import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', example: 'Password123!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Two-factor authentication code', example: '123456', required: false })
  @IsString()
  @IsOptional()
  twoFactorCode?: string;
} 