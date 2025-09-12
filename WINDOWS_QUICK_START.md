# 🪟 Windows Quick Start Guide for LobeChat

This guide will help you set up LobeChat on Windows with AI agents in just a few minutes.

## 🚀 Quick Setup (5 minutes)

### Step 1: Prerequisites

Make sure you have these installed:

- **Node.js** (v18+) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **PowerShell** (usually pre-installed on Windows)

### Step 2: Clone and Install

```powershell
# Open PowerShell as Administrator
# Clone the repository
git clone https://github.com/lobehub/lobe-chat.git
cd lobe-chat

# Install dependencies
npm install
# OR if you have pnpm: pnpm install
# OR if you have bun: bun install
```

### Step 3: Configure Environment

```powershell
# Copy the environment file
copy env.example .env.local

# Edit the environment file
notepad .env.local
```

### Step 4: Add Your AI API Key

In the `.env.local` file, add your API key:

```bash
# For OpenAI (most popular)
OPENAI_API_KEY=sk-your-openai-api-key-here

# For Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# For Google Gemini
GOOGLE_API_KEY=your-google-api-key-here

# For Ollama (free, local AI)
OLLAMA_PROXY_URL=http://localhost:11434
```

### Step 5: Run the Application

```powershell
# Start development server
npm run dev
# OR: pnpm dev
# OR: bun run dev
```

Visit: `http://localhost:3000`

## 🤖 Getting AI API Keys

### OpenAI (Recommended)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up/Login
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Anthropic Claude

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up/Login
3. Go to API Keys
4. Create new key (starts with `sk-ant-`)

### Google Gemini

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with Google
3. Get API key from the dashboard

### Ollama (Free Local AI)

1. Download [Ollama](https://ollama.ai/)
2. Install and run Ollama
3. Pull a model: `ollama pull llama2`
4. No API key needed!

## 🔧 Automated Setup (Windows)

Use our PowerShell script for automated setup:

```powershell
# Run the setup script
.\setup-local.ps1
```

This script will:

- Check prerequisites
- Install dependencies
- Create environment file
- Configure basic settings
- Build the application

## 🐛 Troubleshooting

### Common Issues

#### 1. "node is not recognized"

- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart PowerShell after installation

#### 2. "npm is not recognized"

- Node.js includes npm, reinstall Node.js
- Or install pnpm: `npm install -g pnpm`

#### 3. Port 3000 already in use

```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
npm run dev -- -p 3001
```

#### 4. Build errors

```powershell
# Clear cache and reinstall
rmdir /s node_modules
del package-lock.json
npm install
npm run dev
```

#### 5. Permission errors

- Run PowerShell as Administrator
- Or use Command Prompt as Administrator

## 🎯 Quick Test

1. **Start the app**: `npm run dev`
2. **Open browser**: Go to `http://localhost:3000`
3. **Send a message**: "Hello, can you help me?"
4. **Check response**: AI should respond

## 📱 Features to Try

- **Chat with AI**: Ask questions, get help
- **Voice Input**: Click microphone icon
- **Image Generation**: Ask for images
- **File Upload**: Upload documents
- **Web Search**: Enable in settings

## 🔐 Security

### Set Access Code (Optional)

```bash
# In .env.local
ACCESS_CODE=your-secure-password
```

### Enable Authentication (Optional)

```bash
# In .env.local
ENABLE_AUTH_PROTECTION=1
```

## 📚 Next Steps

1. **Explore Settings**: Click gear icon in the app
2. **Try Different Models**: Switch between AI providers
3. **Enable Plugins**: Add web search, image generation
4. **Customize Agents**: Create your own AI assistants
5. **Read Documentation**: Check `LOCAL_SETUP_GUIDE.md`

## 🆘 Need Help?

- **GitHub Issues**: [Report problems](https://github.com/lobehub/lobe-chat/issues)
- **Discord**: [Join community](https://discord.gg/lobehub)
- **Documentation**: Check the main README.md

## 🎉 You're Ready!

Your LobeChat instance is now running locally with AI agents! Start chatting and exploring the features.

Happy chatting! 🤖✨
