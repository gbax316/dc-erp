FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/public/package*.json ./apps/public/

# Install dependencies
RUN npm install --workspace=public

# Copy application code
COPY apps/public/ ./apps/public/

# Set environment variables for Next.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the app
WORKDIR /app/apps/public
RUN npm run build

# Set up for production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["npm", "start"] 