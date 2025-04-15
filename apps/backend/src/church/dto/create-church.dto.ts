import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsUrl, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateChurchDto {
  @ApiProperty({ description: 'Church name', example: 'First Baptist Church' })
  @IsString()
  @IsNotEmpty()
  church_name: string;

  @ApiProperty({ description: 'Church address', example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Church city', example: 'Springfield' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'Church state/province', example: 'IL' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Church postal code', example: '62701' })
  @IsString()
  @IsOptional()
  postalCode?: string;

  @ApiProperty({ description: 'Church country', example: 'USA' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'Membership strength', example: 500, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  membership_strength?: number;

  @ApiProperty({ description: 'Pastor name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  pastor_name: string;

  @ApiProperty({ description: 'Pastor phone number', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  pastor_phone: string;

  @ApiProperty({ description: 'Pastor email address', example: 'pastor@church.org' })
  @IsEmail()
  @IsNotEmpty()
  pastor_email: string;

  @ApiProperty({ description: 'Admin name', example: 'Jane Smith' })
  @IsString()
  @IsNotEmpty()
  admin_name: string;

  @ApiProperty({ description: 'Admin phone number', example: '+1987654321' })
  @IsString()
  @IsNotEmpty()
  admin_phone: string;

  @ApiProperty({ description: 'Admin email address', example: 'admin@church.org' })
  @IsEmail()
  @IsNotEmpty()
  admin_email: string;

  @ApiProperty({ description: 'Church phone number', example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Church email address', example: 'info@church.org', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Church website URL', example: 'https://church.org', required: false })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'Church logo URL', required: false })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({ description: 'Church description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'When the church was founded', example: '1950-01-01', required: false })
  @IsDateString()
  @IsOptional()
  foundedDate?: string;

  @ApiProperty({ description: 'Church denomination/affiliation', example: 'Baptist', required: false })
  @IsString()
  @IsOptional()
  denomination?: string;
} 