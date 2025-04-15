import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ChurchService } from './church.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('churches')
@Controller('church')
@ApiBearerAuth()
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN)
  @ApiOperation({ summary: 'Create a new church' })
  @ApiResponse({ 
    status: 201, 
    description: 'Church created successfully', 
    type: ApiResponseDto 
  })
  async create(@Body() createChurchDto: CreateChurchDto) {
    const church = await this.churchService.create(createChurchDto);
    return ApiResponseDto.success(church, 'Church created successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get church by ID' })
  @ApiParam({ name: 'id', description: 'Church ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Church retrieved successfully', 
    type: ApiResponseDto 
  })
  async findOne(@Param('id') id: string) {
    const church = await this.churchService.findOne(id);
    return ApiResponseDto.success(church, 'Church retrieved successfully');
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN)
  @ApiOperation({ summary: 'Update church information' })
  @ApiParam({ name: 'id', description: 'Church ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Church updated successfully', 
    type: ApiResponseDto 
  })
  async update(
    @Param('id') id: string,
    @Body() updateChurchDto: UpdateChurchDto,
  ) {
    const church = await this.churchService.update(id, updateChurchDto);
    return ApiResponseDto.success(church, 'Church updated successfully');
  }
} 