import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: 'DC-ERP API',
  port: parseInt(process.env.PORT || '3001', 10),
  environment: process.env.NODE_ENV || 'development',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3002'],
})); 