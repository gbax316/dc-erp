// Local development starter script that sets key environment variables
const { spawn } = require('child_process');
const path = require('path');

// Environment setup for local development
process.env.NODE_ENV = 'development';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USERNAME = 'postgres';
process.env.DB_PASSWORD = 'postgres';
process.env.DB_NAME = 'dc_erp';
process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/dc_erp';

console.log('Starting NestJS in development mode with local database settings');
console.log(`Database: ${process.env.DATABASE_URL}`);

// Start NestJS in development mode
const nestProcess = spawn('npx', ['nest', 'start', '--watch'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

nestProcess.on('close', (code) => {
  console.log(`NestJS process exited with code ${code}`);
}); 