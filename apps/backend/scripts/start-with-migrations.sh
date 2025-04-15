#!/bin/bash
# This script runs database migrations if needed, then starts the application

set -e

# Function for logging with timestamp
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting application with migration checks..."

# Check if database is ready
if [[ -n "$DB_HOST" && -n "$DB_PORT" ]]; then
  log "Waiting for database to be ready at $DB_HOST:$DB_PORT..."
  timeout=60
  counter=0
  until nc -z -v -w5 "$DB_HOST" "$DB_PORT"; do
    counter=$((counter+1))
    if [ $counter -ge $timeout ]; then
      log "ERROR: Failed to connect to database at $DB_HOST:$DB_PORT after $timeout attempts" >&2
      exit 1
    fi
    log "Database not ready yet. Waiting..."
    sleep 1
  done
  log "Database is ready!"
else
  log "DB_HOST or DB_PORT not set. Skipping database readiness check."
fi

# Check if migrations are needed
log "Checking for pending migrations..."
if ! npm run migration:run 2>/dev/null; then
  log "WARNING: Error running migrations. This might be because the database schema is already up to date."
else  
  log "Migrations completed successfully!"
fi

# Run seeding if environment variable is set and it's a fresh database
if [[ "$RUN_SEED" == "true" ]]; then
  log "Running database seed..."
  if ! npm run seed 2>/dev/null; then
    log "WARNING: Error running seed. This might be because the database is already seeded."
  else
    log "Seeding completed successfully!"
  fi
else
  log "Skipping database seed (RUN_SEED not set to 'true')"
fi

# Start the application
log "Starting application..."
exec node dist/main 