import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { EventService } from './event.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiResponseDto, PaginatedResponseDto } from '../common/dto/api-response.dto';
import { UserRole } from '../user/entities/user.entity';

@ApiTags('events')
@Controller('events')
@ApiBearerAuth()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ summary: 'Get events for a church' })
  @ApiQuery({ name: 'churchId', required: true, description: 'Church ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (ISO format)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (ISO format)' })
  @ApiQuery({ name: 'category', required: false, description: 'Event category' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items to return', type: Number })
  async getEvents(
    @Query('churchId') churchId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: number,
  ) {
    const events = await this.eventService.getEvents(churchId, {
      startDate,
      endDate,
      category,
      limit,
    });
    
    return ApiResponseDto.success(events, 'Events retrieved successfully');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  async getEvent(@Param('id') id: string) {
    const event = await this.eventService.getEvent(id);
    return ApiResponseDto.success(event, 'Event retrieved successfully');
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.DATA_ENTRY)
  @ApiOperation({ summary: 'Create new event' })
  async createEvent(@Body() eventData: any) {
    const event = await this.eventService.createEvent(eventData);
    return ApiResponseDto.success(event, 'Event created successfully');
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN, UserRole.DATA_ENTRY)
  @ApiOperation({ summary: 'Update event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  async updateEvent(
    @Param('id') id: string,
    @Body() eventData: any,
  ) {
    const event = await this.eventService.updateEvent(id, eventData);
    return ApiResponseDto.success(event, 'Event updated successfully');
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.BRANCH_ADMIN)
  @ApiOperation({ summary: 'Delete event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  async deleteEvent(@Param('id') id: string) {
    await this.eventService.deleteEvent(id);
    return ApiResponseDto.success(null, 'Event deleted successfully');
  }

  @Get(':id/attendees')
  @ApiOperation({ summary: 'Get event attendees' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  async getEventAttendees(@Param('id') id: string) {
    const attendees = await this.eventService.getEventAttendees(id);
    return ApiResponseDto.success(attendees, 'Event attendees retrieved successfully');
  }

  @Post(':id/attendees')
  @ApiOperation({ summary: 'Register attendee for event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  async registerAttendee(
    @Param('id') id: string,
    @Body() attendeeData: any,
  ) {
    const result = await this.eventService.registerAttendee(id, attendeeData);
    return ApiResponseDto.success(result, 'Attendee registered successfully');
  }
} 