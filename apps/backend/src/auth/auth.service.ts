import { Injectable, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User, UserRole } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    
    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if 2FA is enabled for the user
    if (user.twoFactorEnabled) {
      // If 2FA is enabled and no code is provided, request the code
      if (!loginDto.twoFactorCode) {
        return {
          requiresTwoFactor: true,
          message: 'Please enter your two-factor authentication code',
        };
      }

      // Verify the provided 2FA code
      const isCodeValid = authenticator.verify({
        token: loginDto.twoFactorCode,
        secret: user.twoFactorSecret,
      });

      if (!isCodeValid) {
        throw new UnauthorizedException('Invalid two-factor authentication code');
      }
    }

    // Update last login timestamp
    await this.userService.updateLastLogin(user.id);

    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.userService.findByEmail(registerDto.email);
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const newUser = await this.userService.create({
      ...registerDto,
      role: UserRole.DATA_ENTRY, // Default role for self-registration
    });

    // Generate tokens
    return this.generateTokens(newUser);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // Don't reveal that email doesn't exist for security reasons
      return { message: 'If your email exists in our system, you will receive a password reset link shortly' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = await bcrypt.hash(resetToken, 10);

    // Set token expiration (1 hour from now)
    const resetPasswordExpires = new Date();
    resetPasswordExpires.setHours(resetPasswordExpires.getHours() + 1);

    // Save token to user
    await this.userService.updateResetToken(user.id, resetPasswordToken, resetPasswordExpires);

    // TODO: Send email with reset token
    // For now, just return the token for testing purposes
    return { 
      message: 'If your email exists in our system, you will receive a password reset link shortly',
      resetToken, // Only for development, should be removed in production
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password, confirmPassword } = resetPasswordDto;
    
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Find user with valid reset token
    const user = await this.userService.findByResetToken(token);
    
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    // Check if token is expired
    if (user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Reset token has expired');
    }

    // Update password and clear reset token
    await this.userService.resetPassword(user.id, password);
    
    return { message: 'Password has been reset successfully' };
  }

  async generateTwoFactorSecret(userId: string) {
    // Get user
    const user = await this.userService.findOne(userId);
    
    // Generate secret
    const secret = authenticator.generateSecret();
    
    // Store secret
    await this.userService.setTwoFactorSecret(userId, secret);
    
    // Generate QR code
    const appName = this.configService.get<string>('app.name') || 'DC-ERP';
    const otpauthUrl = authenticator.keyuri(user.email, appName, secret);
    const qrCodeDataUrl = await toDataURL(otpauthUrl);
    
    return {
      secret,
      qrCodeDataUrl,
    };
  }

  async enableTwoFactor(userId: string, twoFactorCode: string) {
    const user = await this.userService.findOne(userId);
    
    // Verify the provided code
    const isCodeValid = authenticator.verify({
      token: twoFactorCode,
      secret: user.twoFactorSecret,
    });
    
    if (!isCodeValid) {
      throw new UnauthorizedException('Invalid two-factor authentication code');
    }
    
    // Enable 2FA
    await this.userService.enableTwoFactor(userId);
    
    return { message: 'Two-factor authentication has been enabled' };
  }

  async disableTwoFactor(userId: string) {
    await this.userService.disableTwoFactor(userId);
    return { message: 'Two-factor authentication has been disabled' };
  }

  private generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('auth.jwtSecret'),
        expiresIn: this.configService.get<string>('auth.jwtExpiresIn'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('auth.jwtRefreshSecret') || this.configService.get<string>('auth.jwtSecret'),
        expiresIn: this.configService.get<string>('auth.refreshTokenExpiry'),
      }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    };
  }
} 