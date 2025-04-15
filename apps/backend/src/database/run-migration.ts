import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'dc_erp',
});

async function runMigration() {
  console.log('Running database migration...');
  
  try {
    // Read SQL file
    const sqlFilePath = path.join(__dirname, 'fix-firstName-null.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Get a client from the pool
    const client = await pool.connect();
    
    try {
      // Begin transaction
      await client.query('BEGIN');
      
      // Run the SQL
      await client.query(sql);
      
      // Commit transaction
      await client.query('COMMIT');
      
      console.log('Migration completed successfully');
    } catch (error) {
      // Rollback on error
      await client.query('ROLLBACK');
      console.error('Migration failed:', error);
      throw error;
    } finally {
      // Release client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Error in migration process:', error);
    process.exit(1);
  } finally {
    // Close pool
    await pool.end();
  }
}

// Run the migration
runMigration(); 