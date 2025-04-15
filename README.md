# DC-ERP Monorepo

This is a monorepo for the DC-ERP full-stack web application.

## Project Structure

- `apps/admin` - React + Tailwind + shadcn/ui Admin Web Application
- `apps/public` - Next.js + Tailwind Public Web Application (SSR enabled)
- `apps/backend` - NestJS Backend API
- `packages/shared` - Shared utilities and types

## Quick Start

To start the frontend application:

```bash
# Install dependencies
npm install

# Run the frontend app
npm run dev:frontend
```

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm (v10 or newer)
- Docker and Docker Compose (for containerized development)
- Firebase account (for Firestore)

### Quick Setup

We provide setup scripts to help you get started quickly:

**For Windows (PowerShell):**
```powershell
# Run the PowerShell setup script
./scripts/dev-setup.ps1
```

**For Unix/Linux/macOS:**
```bash
# Make the script executable
chmod +x ./scripts/dev-setup.sh

# Run the setup script
./scripts/dev-setup.sh
```

These scripts will:
1. Create `.env` files from examples
2. Install dependencies
3. Setup Git hooks with Husky
4. Optionally start Docker containers

### Manual Setup

If you prefer to set up manually:

1. Copy environment variables:
   ```bash
   cp .env.example .env
   cp apps/admin/.env.example apps/admin/.env
   cp apps/public/.env.example apps/public/.env
   cp apps/backend/.env.example apps/backend/.env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Husky for Git hooks:
   ```bash
   npx husky install
   ```

4. Start development:
   ```bash
   # Start all applications
   npm run dev
   
   # OR start specific applications
   npm run dev --filter=admin
   npm run dev --filter=public
   npm run dev --filter=backend
   ```

## Docker Development Environment

The project includes a complete Docker setup for development:

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Start specific services
docker-compose up backend postgres

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Accessing Services

- Admin Dashboard: [http://localhost:3000](http://localhost:3000)
- Public Website: [http://localhost:3002](http://localhost:3002)
- Backend API: [http://localhost:3001](http://localhost:3001)
- PostgreSQL: localhost:5432 (use your database client)

### Database

PostgreSQL is configured with:
- Default database: `dc_erp`
- Username: `postgres`
- Password: `postgres`

The initial schema is created automatically when the container starts using scripts in `docker/postgres/init`.

### Firebase Setup

To use Firestore:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Generate service account credentials for the backend
3. Configure Firebase Web SDK for admin and public apps
4. Add the credentials to your environment variables

## GitHub Actions

CI/CD pipelines are configured in `.github/workflows` for:
- Testing
- Building
- Deployment

## License

[MIT](LICENSE)