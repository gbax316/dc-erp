# Development environment setup script for DC-ERP (PowerShell version)

# Color codes for output
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Red = [System.ConsoleColor]::Red

Write-Host "🚀 Setting up DC-ERP development environment..." -ForegroundColor $Green

# Create .env files from examples if they don't exist
function Create-EnvFile {
    param (
        [string]$FilePath
    )

    if (-not (Test-Path $FilePath)) {
        $ExamplePath = "$FilePath.example"
        if (Test-Path $ExamplePath) {
            Copy-Item -Path $ExamplePath -Destination $FilePath
            Write-Host "✅ Created $FilePath from example" -ForegroundColor $Green
        } else {
            Write-Host "❌ $ExamplePath not found" -ForegroundColor $Red
        }
    } else {
        Write-Host "ℹ️ $FilePath already exists, skipping" -ForegroundColor $Yellow
    }
}

Write-Host "📄 Creating .env files from examples..." -ForegroundColor $Yellow
Create-EnvFile ".env"
Create-EnvFile "apps/admin/.env"
Create-EnvFile "apps/public/.env"
Create-EnvFile "apps/backend/.env"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor $Yellow
npm install

# Set up husky
Write-Host "🐶 Setting up Husky..." -ForegroundColor $Yellow
npx husky install

# Ask if user wants to start Docker environment
Write-Host "🐳 Do you want to start the Docker development environment? (y/n)" -ForegroundColor $Yellow
$startDocker = Read-Host

if ($startDocker -eq "y" -or $startDocker -eq "Y") {
    Write-Host "🐳 Starting Docker containers..." -ForegroundColor $Yellow
    docker-compose up -d
  
    Write-Host "✅ Docker containers started!" -ForegroundColor $Green
    Write-Host "ℹ️ Services available at:" -ForegroundColor $Yellow
    Write-Host "  - Admin: http://localhost:3000"
    Write-Host "  - Public: http://localhost:3002"
    Write-Host "  - Backend API: http://localhost:3001"
    Write-Host "  - PostgreSQL: localhost:5432"
} else {
    Write-Host "ℹ️ Skipping Docker setup" -ForegroundColor $Yellow
    Write-Host "ℹ️ You can start the development servers manually with:" -ForegroundColor $Yellow
    Write-Host "  - All apps: npm run dev"
    Write-Host "  - Admin only: npm run dev --filter=admin"
    Write-Host "  - Public only: npm run dev --filter=public"
    Write-Host "  - Backend only: npm run dev --filter=backend"
}

Write-Host "✅ Setup complete!" -ForegroundColor $Green 