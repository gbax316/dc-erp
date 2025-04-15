import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    description: 'Page number (zero-based)',
    default: 0,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  page?: number = 0;

  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;
} 