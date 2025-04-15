FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

# Install dependencies
RUN npm install --workspace=frontend

# Copy application code
COPY apps/frontend/ ./apps/frontend/

# Set environment variables for Next.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the app
WORKDIR /app/apps/frontend
RUN npm run build

# Set up for production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["npm", "start"] 