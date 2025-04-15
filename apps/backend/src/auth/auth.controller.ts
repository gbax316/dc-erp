import { Controller, Post, Body, UseGuards, Get, Param, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Verify2faDto } from './dto/verify-2fa.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User, UserRole } from '../user/entities/user.entity';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful', 
    type: ApiResponseDto 
  })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return ApiResponseDto.createSuccess(result, 'Login successful');
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'Registration successful', 
    type: ApiResponseDto 
  })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return ApiResponseDto.createSuccess(result, 'Registration successful');
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 200,
    description: 'Password reset requested',
    type: ApiResponseDto
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return ApiResponseDto.createSuccess(result, 'Password reset requested');
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful',
    type: ApiResponseDto
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return ApiResponseDto.createSuccess(result, 'Password reset successful');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'Profile retrieved successfully', 
    type: ApiResponseDto 
  })
  getProfile(@CurrentUser() user: User) {
    return ApiResponseDto.createSuccess(user, 'Profile retrieved successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/generate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate 2FA secret and QR code' })
  @ApiResponse({
    status: 200,
    description: '2FA secret generated',
    type: ApiResponseDto
  })
  async generateTwoFactorSecret(@CurrentUser() user: User) {
    const result = await this.authService.generateTwoFactorSecret(user.id);
    return ApiResponseDto.createSuccess(result, '2FA secret generated');
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enable 2FA for current user' })
  @ApiResponse({
    status: 200,
    description: '2FA enabled',
    type: ApiResponseDto
  })
  async enableTwoFactor(
    @CurrentUser() user: User,
    @Body() verifyDto: Verify2faDto
  ) {
    const result = await this.authService.enableTwoFactor(user.id, verifyDto.twoFactorCode);
    return ApiResponseDto.createSuccess(result, '2FA enabled successfully');
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/disable')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Disable 2FA for current user' })
  @ApiResponse({
    status: 200,
    description: '2FA disabled',
    type: ApiResponseDto
  })
  async disableTwoFactor(@CurrentUser() user: User) {
    const result = await this.authService.disableTwoFactor(user.id);
    return ApiResponseDto.createSuccess(result, '2FA disabled successfully');
  }
} 