import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsDateString, IsUUID, IsEnum, IsBoolean, IsPhoneNumber } from 'class-validator';

export enum MembershipStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

export class CreateMemberDto {
  @ApiProperty({ description: 'First name of member', example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of member', example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Phone number', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Church ID the member belongs to', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  @IsNotEmpty()
  churchId: string;

  @ApiProperty({ description: 'Date of birth', example: '1990-01-01', required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ description: 'Home address', example: '123 Main St', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'City', example: 'Springfield', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'State/Province', example: 'IL', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ description: 'Postal code', example: '62701', required: false })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty({ description: 'Country', example: 'USA', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'Membership status', enum: MembershipStatus, default: MembershipStatus.PENDING })
  @IsEnum(MembershipStatus)
  @IsOptional()
  status?: MembershipStatus;

  @ApiProperty({ description: 'Date joined the church', example: '2020-01-01', required: false })
  @IsDateString()
  @IsOptional()
  joinDate?: string;

  @ApiProperty({ description: 'Ministry/Department participation', example: ['Choir', 'Sunday School'], required: false, type: [String] })
  @IsOptional()
  ministries?: string[];

  @ApiProperty({ description: 'Profile picture URL', required: false })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsString()
  @IsOptional()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsString()
  @IsOptional()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Additional notes', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ description: 'Is baptized', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isBaptized?: boolean;

  @ApiProperty({ description: 'Baptism date', example: '2020-01-01', required: false })
  @IsDateString()
  @IsOptional()
  baptismDate?: string;
} 