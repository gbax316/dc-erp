FROM node:18-alpine as build

WORKDIR /app

# Copy both package.json files
COPY package*.json ./
COPY apps/admin-dashboard/package*.json ./apps/admin-dashboard/

# Install global dependencies 
RUN npm install -g vite

# Install dependencies
RUN npm install --workspace=admin-dashboard

# Copy application code
COPY apps/admin-dashboard/ ./apps/admin-dashboard/

# Build the app
RUN cd apps/admin-dashboard && npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built files to nginx server
COPY --from=build /app/apps/admin-dashboard/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/admin-dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 