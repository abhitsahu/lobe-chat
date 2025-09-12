# 🚀 LobeChat Local Setup Guide

This guide will help you set up LobeChat locally with all necessary environment variables to run AI agents.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (recommended) or **bun** - [Install pnpm](https://pnpm.io/installation) or [Install bun](https://bun.sh/)
- **Git** - [Download here](https://git-scm.com/)

## 🛠️ Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/lobehub/lobe-chat.git
cd lobe-chat

# Install dependencies (choose one)
pnpm install
# OR
bun install
```

## 🔧 Step 2: Environment Configuration

### Create Environment File

```bash
# Copy the example environment file
cp env.example .env.local
```

### Essential Environment Variables

Open `.env.local` and configure the following variables:

#### 🤖 AI Provider Configuration

**OpenAI (Recommended for beginners):**

```bash
# Required - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional - Use custom proxy
OPENAI_PROXY_URL=https://api.openai.com/v1
```

**Alternative AI Providers:**

```bash
# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Google Gemini
GOOGLE_API_KEY=your-google-api-key-here

# Azure OpenAI
AZURE_API_KEY=your-azure-key-here
AZURE_API_VERSION=2024-02-15-preview
AZURE_ENDPOINT=https://your-resource.openai.azure.com/

# Ollama (Local AI)
OLLAMA_PROXY_URL=http://localhost:11434
```

#### 🔐 Access Control (Optional)

```bash
# Set a password to protect your instance
ACCESS_CODE=your-secure-password-here

# Or use multiple access codes
ACCESS_CODE=code1,code2,code3
```

#### 🗄️ Database Configuration

**For Development (PGLite - Browser Database):**

```bash
# No additional configuration needed
# PGLite runs in the browser automatically
```

**For Production (PostgreSQL):**

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/lobe_chat
```

#### 🌐 Application Configuration

```bash
# Your application URL (for server mode)
APP_URL=http://localhost:3000

# Enable authentication protection (optional)
ENABLE_AUTH_PROTECTION=0
```

## 🚀 Step 3: Run the Application

### Development Mode

```bash
# Start the development server
pnpm dev
# OR
bun run dev
```

The application will be available at: `http://localhost:3000`

### Production Mode

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤖 Step 4: Configure AI Agents

### Basic Setup

1. **Open the application** in your browser
2. **Go to Settings** (gear icon)
3. **Navigate to "Model Provider"**
4. **Select your AI provider** (e.g., OpenAI)
5. **Enter your API key** if not set in environment variables
6. **Choose a model** (e.g., GPT-4, GPT-3.5-turbo)

### Advanced Agent Configuration

#### Model List Control

```bash
# Control which models are available
OPENAI_MODEL_LIST=+gpt-4,-gpt-3.5-turbo,gpt-4-turbo=GPT-4 Turbo
```

#### Custom Agent Settings

```bash
# Set default agent configuration
DEFAULT_AGENT_CONFIG={"systemRole":"You are a helpful assistant"}

# Set system agent
SYSTEM_AGENT={"name":"System","description":"System assistant"}
```

## 🔌 Step 5: Enable Plugins and Tools

### Plugin Configuration

```bash
# Plugin index URL
PLUGINS_INDEX_URL=https://registry.npmmirror.com/@lobehub/plugins-index/v1/files/public

# Plugin settings
PLUGIN_SETTINGS={"enabled":true,"list":[]}
```

### Tools Configuration

```bash
# Tools configuration
TOOLS_CONFIG={"webSearch":{"enabled":true},"imageGeneration":{"enabled":true}}
```

## 🧪 Step 6: Testing Your Setup

### Test AI Chat

1. **Create a new chat session**
2. **Send a test message**: "Hello, can you help me?"
3. **Verify the AI responds** correctly

### Test Different Features

- **Voice Input/Output**: Test microphone and speaker functionality
- **Image Generation**: Try generating images with DALL-E
- **Web Search**: Test real-time web search capabilities
- **File Upload**: Upload documents for analysis

## 🐛 Troubleshooting

### Common Issues

#### 1. API Key Errors

```bash
# Check if your API key is valid
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.openai.com/v1/models
```

#### 2. Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
pnpm dev -- -p 3001
```

#### 3. Database Connection Issues

```bash
# For PostgreSQL, ensure the database is running
# Check connection string format
DATABASE_URL=postgresql://user:password@localhost:5432/database_name
```

#### 4. Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Debug Mode

Enable debug mode for detailed logging:

```bash
# Add to .env.local
DEBUG_MODE=1
```

## 📚 Additional Configuration

### Authentication (Optional)

```bash
# OIDC Configuration
OIDC_CLIENT_ID=your-client-id
OIDC_CLIENT_SECRET=your-client-secret
OIDC_ISSUER=https://your-issuer.com
```

### Knowledge Base (Optional)

```bash
# Knowledge base configuration
KNOWLEDGE_BASE_URL=https://your-kb-url.com
KNOWLEDGE_BASE_API_KEY=your-kb-api-key
```

### CDN Configuration (Optional)

```bash
# CDN settings
CDN_USE_GLOBAL=0
```

## 🎯 Quick Start Commands

```bash
# Complete setup in one go
git clone https://github.com/lobehub/lobe-chat.git
cd lobe-chat
cp env.example .env.local
# Edit .env.local with your API keys
pnpm install
pnpm dev
```

## 🔗 Useful Links

- **OpenAI API Keys**: <https://platform.openai.com/api-keys>
- **Anthropic API Keys**: <https://console.anthropic.com/>
- **Google AI Studio**: <https://aistudio.google.com/>
- **Azure OpenAI**: <https://portal.azure.com/>
- **Ollama**: <https://ollama.ai/>

## 📝 Environment Variables Reference

| Variable            | Required | Description       | Example                 |
| ------------------- | -------- | ----------------- | ----------------------- |
| `OPENAI_API_KEY`    | Yes\*    | OpenAI API key    | `sk-...`                |
| `ANTHROPIC_API_KEY` | No       | Anthropic API key | `sk-ant-...`            |
| `GOOGLE_API_KEY`    | No       | Google AI API key | `AI...`                 |
| `ACCESS_CODE`       | No       | Access password   | `my-password`           |
| `DATABASE_URL`      | No       | PostgreSQL URL    | `postgresql://...`      |
| `APP_URL`           | Yes      | Application URL   | `http://localhost:3000` |

\*At least one AI provider API key is required.

## 🎉 You're Ready!

Once you've completed these steps, you should have a fully functional LobeChat instance running locally with AI agents. You can now:

- Chat with AI models
- Use plugins and tools
- Generate images
- Process documents
- And much more!

For more advanced configuration and features, refer to the main documentation.
