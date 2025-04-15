import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Reset token received by email', example: 'abcd1234' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ 
    description: 'New password', 
    example: 'NewSecurePassword123!',
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;

  @ApiProperty({ description: 'Confirm new password', example: 'NewSecurePassword123!' })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
} 