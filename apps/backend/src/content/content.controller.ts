import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiResponseDto, PaginatedResponseDto } from '../common/dto/api-response.dto';
import { UserRole } from '../user/entities/user.entity';

@ApiTags('content')
@Controller('content')
@ApiBearerAuth()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('sermons')
  @ApiOperation({ summary: 'Get sermons for a church' })
  @ApiQuery({ name: 'churchId', required: true, description: 'Church ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (ISO format)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (ISO format)' })
  @ApiQuery({ name: 'speaker', required: false, description: 'Speaker name' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items to return', type: Number })
  async getSermons(
    @Query('churchId') churchId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('speaker') speaker?: string,
    @Query('limit') limit?: number,
  ) {
    const sermons = await this.contentService.getSermons(churchId, {
      startDate,
      endDate,
      speaker,
      limit,
    });
    
    return ApiResponseDto.success(sermons, 'Sermons retrieved successfully');
  }

  @Get('devotionals')
  @ApiOperation({ summary: 'Get devotionals for a church' })
  @ApiQuery({ name: 'churchId', required: true, description: 'Church ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (ISO format)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (ISO format)' })
  @ApiQuery({ name: 'author', required: false, description: 'Author name' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items to return', type: Number })
  async getDevotionals(
    @Query('churchId') churchId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('author') author?: string,
    @Query('limit') limit?: number,
  ) {
    const devotionals = await this.contentService.getDevotionals(churchId, {
      startDate,
      endDate,
      author,
      limit,
    });
    
    return ApiResponseDto.success(devotionals, 'Devotionals retrieved successfully');
  }

  @Get('blogs')
  @ApiOperation({ summary: 'Get blogs for a church' })
  @ApiQuery({ name: 'churchId', required: true, description: 'Church ID' })
  @ApiQuery({ name: 'category', required: false, description: 'Blog category' })
  @ApiQuery({ name: 'author', required: false, description: 'Author name' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items to return', type: Number })
  async getBlogs(
    @Query('churchId') churchId: string,
    @Query('category') category?: string,
    @Query('author') author?: string,
    @Query('limit') limit?: number,
  ) {
    const blogs = await this.contentService.getBlogs(churchId, {
      category,
      author,
      limit,
    });
    
    return ApiResponseDto.success(blogs, 'Blogs retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get content item by ID' })
  @ApiParam({ name: 'id', description: 'Content ID' })
  async getContentItem(@Param('id') id: string) {
    const content = await this.contentService.getContentItem(id);
    return ApiResponseDto.success(content, 'Content retrieved successfully');
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.DATA_ENTRY)
  @ApiOperation({ summary: 'Create new content' })
  async createContent(@Body() contentData: any) {
    const content = await this.contentService.createContent(contentData);
    return ApiResponseDto.success(content, 'Content created successfully');
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.DATA_ENTRY)
  @ApiOperation({ summary: 'Update content' })
  @ApiParam({ name: 'id', description: 'Content ID' })
  async updateContent(
    @Param('id') id: string,
    @Body() contentData: any,
  ) {
    const content = await this.contentService.updateContent(id, contentData);
    return ApiResponseDto.success(content, 'Content updated successfully');
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN)
  @ApiOperation({ summary: 'Delete content' })
  @ApiParam({ name: 'id', description: 'Content ID' })
  async deleteContent(@Param('id') id: string) {
    await this.contentService.deleteContent(id);
    return ApiResponseDto.success(null, 'Content deleted successfully');
  }
} 