import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshsupersecretkey',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  bcryptSaltRounds: 10,
  passwordResetExpiry: 3600, // 1 hour in seconds
  emailVerificationExpiry: 86400, // 24 hours in seconds
})); 