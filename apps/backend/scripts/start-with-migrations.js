// Load environment variables first
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const { spawn, exec } = require('child_process');
const net = require('net');
const fs = require('fs');

// Function for logging with timestamp
function log(message) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`[${timestamp}] ${message}`);
}

log("Starting application with migration checks...");
log(`Database settings: HOST=${process.env.DB_HOST}, PORT=${process.env.DB_PORT}`);

// Check if database is ready
const checkDbAndStart = () => {
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT;

  if (dbHost && dbPort) {
    log(`Waiting for database to be ready at ${dbHost}:${dbPort}...`);
    
    let timeout = 60;
    let counter = 0;
    
    const checkDbConnection = () => {
      const client = new net.Socket();
      
      client.on('connect', () => {
        log("Database is ready!");
        client.destroy();
        // Skip migrations due to TypeORM issues and start the app
        log("Skipping migrations due to TypeORM issues");
        startApp();
      });
      
      client.on('error', (err) => {
        counter++;
        if (counter >= timeout) {
          log(`ERROR: Failed to connect to database at ${dbHost}:${dbPort} after ${timeout} attempts`);
          process.exit(1);
        }
        log("Database not ready yet. Waiting...");
        setTimeout(checkDbConnection, 1000);
      });
      
      client.connect(dbPort, dbHost);
    };
    
    checkDbConnection();
  } else {
    log("DB_HOST or DB_PORT not set. Skipping database readiness check.");
    startApp();
  }
};

// Start the application
const startApp = () => {
  log("Starting application...");
  
  const app = spawn('npm', ['run', 'start:dev'], { stdio: 'inherit', shell: true });
  
  app.on('close', (code) => {
    if (code !== 0) {
      log(`Application exited with code ${code}`);
      process.exit(code);
    }
  });
};

// Start the process
checkDbAndStart(); 