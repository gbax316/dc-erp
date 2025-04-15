import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('members')
@Controller('member')
@ApiBearerAuth()
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.DATA_ENTRY)
  @ApiOperation({ summary: 'Create a new church member' })
  @ApiResponse({ 
    status: 201, 
    description: 'Member created successfully', 
    type: ApiResponseDto 
  })
  async create(@Body() createMemberDto: CreateMemberDto) {
    const member = await this.membersService.create(createMemberDto);
    return ApiResponseDto.success(member, 'Member created successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get member by ID' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Member retrieved successfully', 
    type: ApiResponseDto 
  })
  async findOne(@Param('id') id: string) {
    const member = await this.membersService.findOne(id);
    return ApiResponseDto.success(member, 'Member retrieved successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get members by church ID' })
  @ApiQuery({ name: 'churchId', required: true, description: 'Church ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Members retrieved successfully', 
    type: ApiResponseDto 
  })
  async findByChurch(@Query('churchId') churchId: string) {
    const members = await this.membersService.findByChurch(churchId);
    return ApiResponseDto.success(members, 'Members retrieved successfully');
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.DATA_ENTRY)
  @ApiOperation({ summary: 'Update member information' })
  @ApiParam({ name: 'id', description: 'Member ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Member updated successfully', 
    type: ApiResponseDto 
  })
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const member = await this.membersService.update(id, updateMemberDto);
    return ApiResponseDto.success(member, 'Member updated successfully');
  }
} 