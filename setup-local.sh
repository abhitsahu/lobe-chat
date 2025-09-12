#!/bin/bash

# LobeChat Local Setup Script
# This script automates the setup process for running LobeChat locally

set -e

echo "🚀 LobeChat Local Setup Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
  echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

print_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  print_error "Please run this script from the LobeChat root directory"
  exit 1
fi

# Check for required tools
print_info "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
  print_error "Node.js is not installed. Please install Node.js v18 or higher."
  exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  print_error "Node.js version $NODE_VERSION is too old. Please install Node.js v18 or higher."
  exit 1
fi
print_status "Node.js $(node -v) is installed"

# Check for package manager
if command -v pnpm &> /dev/null; then
  PACKAGE_MANAGER="pnpm"
  print_status "pnpm is available"
elif command -v bun &> /dev/null; then
  PACKAGE_MANAGER="bun"
  print_status "bun is available"
elif command -v npm &> /dev/null; then
  PACKAGE_MANAGER="npm"
  print_warning "Using npm (pnpm or bun recommended)"
else
  print_error "No package manager found. Please install pnpm, bun, or npm."
  exit 1
fi

# Install dependencies
print_info "Installing dependencies with $PACKAGE_MANAGER..."
$PACKAGE_MANAGER install
print_status "Dependencies installed"

# Create environment file
print_info "Setting up environment configuration..."

if [ ! -f ".env.local" ]; then
  cp env.example .env.local
  print_status "Created .env.local from env.example"
else
  print_warning ".env.local already exists, skipping creation"
fi

# Interactive setup
echo ""
print_info "Let's configure your environment variables:"
echo ""

# OpenAI API Key
read -p "Enter your OpenAI API key (or press Enter to skip): " OPENAI_KEY
if [ ! -z "$OPENAI_KEY" ]; then
  # Update .env.local with OpenAI key
  if grep -q "OPENAI_API_KEY=" .env.local; then
    sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$OPENAI_KEY/" .env.local
  else
    echo "OPENAI_API_KEY=$OPENAI_KEY" >> .env.local
  fi
  print_status "OpenAI API key configured"
fi

# Access Code
read -p "Enter an access code for security (or press Enter to skip): " ACCESS_CODE
if [ ! -z "$ACCESS_CODE" ]; then
  if grep -q "ACCESS_CODE=" .env.local; then
    sed -i.bak "s/ACCESS_CODE=.*/ACCESS_CODE=$ACCESS_CODE/" .env.local
  else
    echo "ACCESS_CODE=$ACCESS_CODE" >> .env.local
  fi
  print_status "Access code configured"
fi

# App URL
if grep -q "APP_URL=" .env.local; then
  sed -i.bak "s|APP_URL=.*|APP_URL=http://localhost:3000|" .env.local
else
  echo "APP_URL=http://localhost:3000" >> .env.local
fi
print_status "App URL configured"

# Clean up backup files
rm -f .env.local.bak

# Generate database migrations
print_info "Setting up database..."
$PACKAGE_MANAGER run db:generate
print_status "Database migrations generated"

# Build the application
print_info "Building the application..."
$PACKAGE_MANAGER run build
print_status "Application built successfully"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
print_info "Your LobeChat instance is ready to run!"
echo ""
echo "To start the development server:"
echo "  $PACKAGE_MANAGER dev"
echo ""
echo "To start the production server:"
echo "  $PACKAGE_MANAGER start"
echo ""
echo "The application will be available at: http://localhost:3000"
echo ""
print_warning "Don't forget to:"
echo "  1. Add your AI provider API keys to .env.local"
echo "  2. Configure any additional settings you need"
echo "  3. Test the application with a simple chat message"
echo ""
print_info "For more configuration options, see LOCAL_SETUP_GUIDE.md"
echo ""
echo "Happy chatting! 🤖"
