import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Verify2faDto {
  @ApiProperty({ description: 'Two-factor authentication code', example: '123456' })
  @IsString()
  @IsNotEmpty()
  twoFactorCode: string;
} 