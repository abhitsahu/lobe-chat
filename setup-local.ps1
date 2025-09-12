# LobeChat Local Setup Script for Windows
# This script automates the setup process for running LobeChat locally

Write-Host "🚀 LobeChat Local Setup Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Function to print colored output
function Write-Status {
    param($Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "Please run this script from the LobeChat root directory"
    exit 1
}

# Check for required tools
Write-Info "Checking prerequisites..."

# Check Node.js
try {
    $nodeVersion = node -v
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js not found"
    }
    Write-Status "Node.js $nodeVersion is installed"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
}

# Check for package manager
$packageManager = $null
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $packageManager = "pnpm"
    Write-Status "pnpm is available"
} elseif (Get-Command bun -ErrorAction SilentlyContinue) {
    $packageManager = "bun"
    Write-Status "bun is available"
} elseif (Get-Command npm -ErrorAction SilentlyContinue) {
    $packageManager = "npm"
    Write-Warning "Using npm (pnpm or bun recommended)"
} else {
    Write-Error "No package manager found. Please install pnpm, bun, or npm."
    exit 1
}

# Install dependencies
Write-Info "Installing dependencies with $packageManager..."
& $packageManager install
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install dependencies"
    exit 1
}
Write-Status "Dependencies installed"

# Create environment file
Write-Info "Setting up environment configuration..."

if (-not (Test-Path ".env.local")) {
    Copy-Item "env.example" ".env.local"
    Write-Status "Created .env.local from env.example"
} else {
    Write-Warning ".env.local already exists, skipping creation"
}

# Interactive setup
Write-Host ""
Write-Info "Let's configure your environment variables:"
Write-Host ""

# OpenAI API Key
$openaiKey = Read-Host "Enter your OpenAI API key (or press Enter to skip)"
if ($openaiKey) {
    $content = Get-Content ".env.local"
    $content = $content -replace "OPENAI_API_KEY=.*", "OPENAI_API_KEY=$openaiKey"
    if ($content -notmatch "OPENAI_API_KEY=") {
        $content += "OPENAI_API_KEY=$openaiKey"
    }
    $content | Set-Content ".env.local"
    Write-Status "OpenAI API key configured"
}

# Access Code
$accessCode = Read-Host "Enter an access code for security (or press Enter to skip)"
if ($accessCode) {
    $content = Get-Content ".env.local"
    $content = $content -replace "ACCESS_CODE=.*", "ACCESS_CODE=$accessCode"
    if ($content -notmatch "ACCESS_CODE=") {
        $content += "ACCESS_CODE=$accessCode"
    }
    $content | Set-Content ".env.local"
    Write-Status "Access code configured"
}

# App URL
$content = Get-Content ".env.local"
$content = $content -replace "APP_URL=.*", "APP_URL=http://localhost:3000"
if ($content -notmatch "APP_URL=") {
    $content += "APP_URL=http://localhost:3000"
}
$content | Set-Content ".env.local"
Write-Status "App URL configured"

# Generate database migrations
Write-Info "Setting up database..."
& $packageManager run db:generate
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Database migration generation failed, but continuing..."
}
Write-Status "Database setup completed"

# Build the application
Write-Info "Building the application..."
& $packageManager run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed. Please check the error messages above."
    exit 1
}
Write-Status "Application built successfully"

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host ""
Write-Info "Your LobeChat instance is ready to run!"
Write-Host ""
Write-Host "To start the development server:"
Write-Host "  $packageManager dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the production server:"
Write-Host "  $packageManager start" -ForegroundColor Cyan
Write-Host ""
Write-Host "The application will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Warning "Don't forget to:"
Write-Host "  1. Add your AI provider API keys to .env.local"
Write-Host "  2. Configure any additional settings you need"
Write-Host "  3. Test the application with a simple chat message"
Write-Host ""
Write-Info "For more configuration options, see LOCAL_SETUP_GUIDE.md"
Write-Host ""
Write-Host "Happy chatting! 🤖" -ForegroundColor Green
