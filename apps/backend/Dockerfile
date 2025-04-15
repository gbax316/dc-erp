FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
RUN npm install --prefix apps/backend

# Copy application code
COPY apps/backend/ ./apps/backend/

# Install build dependencies and build the app
RUN cd apps/backend && npm run build

# Install production dependencies and utilities
RUN apk add --no-cache bash netcat-openbsd

# No need to make the script executable, we'll use a different approach
# RUN chmod +x ./apps/backend/scripts/wait-for-it.sh

EXPOSE 4000

WORKDIR /app/apps/backend

# Simple command to just start the application
CMD ["node", "dist/main"] 