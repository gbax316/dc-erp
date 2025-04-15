FROM node:18-alpine

WORKDIR /app

# Copy both package.json files
COPY package*.json ./
COPY apps/admin/package*.json ./apps/admin/

# Install global dependencies
RUN npm install -g vite

# Install dependencies
RUN npm install --workspace=admin

# Copy application code
COPY apps/admin/ ./apps/admin/

# Build the app
RUN cd apps/admin && npm run build

# Install serve to serve static content
RUN npm install -g serve

EXPOSE 3000

WORKDIR /app/apps/admin

CMD ["serve", "-s", "dist", "-l", "3000"] 