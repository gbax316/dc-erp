import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Try to load .env.local first (for local development overrides)
const localEnvPath = path.resolve(__dirname, '../../.env.local');
if (fs.existsSync(localEnvPath)) {
  console.log('Loading environment from .env.local');
  dotenv.config({ path: localEnvPath });
}

// Then load standard .env file
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// Configure TypeORM data source options
export const dataSourceOptions: DataSourceOptions = (() => {
  // Use DATABASE_URL if available and not empty
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== '') {
    console.log('Using DATABASE_URL for connection');
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [path.resolve(__dirname, '../**/*.entity{.ts,.js}')],
      migrations: [path.resolve(__dirname, '../migrations/*{.ts,.js}')],
      synchronize: false,
      logging: process.env.DB_LOGGING === 'true',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    } as DataSourceOptions;
  }

  // Otherwise use individual parameters
  console.log('Using individual parameters for DB connection');
  // Force localhost for local development, ignore postgres hostname which is for Docker
  const host = process.env.NODE_ENV === 'development' ? 'localhost' : (process.env.DB_HOST || 'localhost');
  console.log(`Using database host: ${host}`);
  
  return {
    type: 'postgres',
    host: host,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'dc_erp',
    entities: [path.resolve(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [path.resolve(__dirname, '../migrations/*{.ts,.js}')],
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
  } as DataSourceOptions;
})();

// Create and export the data source
const dataSource = new DataSource(dataSourceOptions);
export default dataSource; 