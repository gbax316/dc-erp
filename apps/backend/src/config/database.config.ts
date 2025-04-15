import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  // Use DATABASE_URL if available
  if (process.env.DATABASE_URL) {
    // Parse DATABASE_URL
    const databaseUrl = new URL(process.env.DATABASE_URL);
    
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: databaseUrl.hostname,
      port: parseInt(databaseUrl.port, 10) || 5432,
      username: databaseUrl.username,
      password: databaseUrl.password,
      name: databaseUrl.pathname.substring(1), // Remove leading slash
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };
  }
  
  // Fall back to individual environment variables
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'dc_erp',
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
  };
}); 