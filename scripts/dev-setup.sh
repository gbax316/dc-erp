#!/bin/bash

# Development environment setup script for DC-ERP

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up DC-ERP development environment...${NC}"

# Create .env files from examples if they don't exist
create_env_file() {
  if [ ! -f "$1" ]; then
    if [ -f "$1.example" ]; then
      cp "$1.example" "$1"
      echo -e "${GREEN}✅ Created $1 from example${NC}"
    else
      echo -e "${RED}❌ $1.example not found${NC}"
    fi
  else
    echo -e "${YELLOW}ℹ️ $1 already exists, skipping${NC}"
  fi
}

echo -e "${YELLOW}📄 Creating .env files from examples...${NC}"
create_env_file ".env"
create_env_file "apps/admin/.env"
create_env_file "apps/public/.env"
create_env_file "apps/backend/.env"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Set up husky
echo -e "${YELLOW}🐶 Setting up Husky...${NC}"
npx husky install
chmod +x .husky/pre-commit

# Ask if user wants to start Docker environment
echo -e "${YELLOW}🐳 Do you want to start the Docker development environment? (y/n)${NC}"
read -r start_docker

if [ "$start_docker" = "y" ] || [ "$start_docker" = "Y" ]; then
  echo -e "${YELLOW}🐳 Starting Docker containers...${NC}"
  docker-compose up -d
  
  echo -e "${GREEN}✅ Docker containers started!${NC}"
  echo -e "${YELLOW}ℹ️ Services available at:${NC}"
  echo -e "  - Admin: http://localhost:3000"
  echo -e "  - Public: http://localhost:3002"
  echo -e "  - Backend API: http://localhost:3001"
  echo -e "  - PostgreSQL: localhost:5432"
else
  echo -e "${YELLOW}ℹ️ Skipping Docker setup${NC}"
  echo -e "${YELLOW}ℹ️ You can start the development servers manually with:${NC}"
  echo -e "  - All apps: npm run dev"
  echo -e "  - Admin only: npm run dev --filter=admin"
  echo -e "  - Public only: npm run dev --filter=public"
  echo -e "  - Backend only: npm run dev --filter=backend"
fi

echo -e "${GREEN}✅ Setup complete!${NC}" 