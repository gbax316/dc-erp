import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiResponseDto, PaginatedResponseDto } from '../common/dto/api-response.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully',
    type: ApiResponseDto
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto<User>> {
    const user = await this.userService.create(createUserDto);
    return ApiResponseDto.createSuccess(user, 'User created successfully');
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Get all users (paginated)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns paginated users',
    type: PaginatedResponseDto,
    isArray: false
  })
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponseDto<User>> {
    const { page, limit } = paginationDto;
    const result = await this.userService.findAll({ page, limit });
    
    const response: PaginatedResponseDto<User> = PaginatedResponseDto.createPaginatedSuccess(
      result.items,
      result.total,
      result.page,
      result.limit,
      'Users retrieved successfully'
    );
    
    return response;
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the user',
    type: ApiResponseDto
  })
  async findOne(@Param('id') id: string): Promise<ApiResponseDto<User>> {
    const user = await this.userService.findOne(id);
    return ApiResponseDto.createSuccess(user, 'User retrieved successfully');
  }

  @Get('profile/me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the current user profile',
    type: ApiResponseDto
  })
  async getProfile(@CurrentUser() user: User): Promise<ApiResponseDto<User>> {
    return ApiResponseDto.createSuccess(user, 'Profile retrieved successfully');
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'User updated successfully',
    type: ApiResponseDto
  })
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ApiResponseDto<User>> {
    const user = await this.userService.update(id, updateUserDto);
    return ApiResponseDto.createSuccess(user, 'User updated successfully');
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'User deleted successfully',
    type: ApiResponseDto
  })
  async remove(@Param('id') id: string): Promise<ApiResponseDto<null>> {
    await this.userService.remove(id);
    return ApiResponseDto.createSuccess(null, 'User deleted successfully');
  }
} 