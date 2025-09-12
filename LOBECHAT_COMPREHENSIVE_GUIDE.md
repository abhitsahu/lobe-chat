# 🤯 LobeChat - Complete User & Developer Guide

## Table of Contents

1. [What is LobeChat?](#what-is-lobechat)
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [Environment Setup](#environment-setup)
5. [Project Structure](#project-structure)
6. [Development Workflow](#development-workflow)
7. [Architecture Overview](#architecture-overview)
8. [Adding New Features](#adding-new-features)
9. [Testing Guide](#testing-guide)
10. [Internationalization](#internationalization)
11. [State Management](#state-management)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## What is LobeChat?

**LobeChat** is an open-source, modern AI chat application built with Next.js. Think of it as your own personal ChatGPT that you can customize and deploy anywhere!

### 🎯 Main Purpose

- **AI Chat Interface**: Talk to various AI models (OpenAI, Claude, Gemini, etc.)
- **Multi-Modal Support**: Text, images, voice, and more
- **Plugin System**: Extend functionality with custom tools
- **Agent Marketplace**: Share and discover AI assistants
- **Self-Hosted**: Complete control over your data

### 🌟 Why Choose LobeChat?

- ✅ **Free & Open Source** - No hidden costs
- ✅ **One-Click Deployment** - Deploy in under 1 minute
- ✅ **Privacy First** - Your data stays with you
- ✅ **Highly Customizable** - Modify everything to your needs
- ✅ **Modern Tech Stack** - Built with latest technologies

---

## Key Features

### 🤖 AI Capabilities

- **Multi-AI Providers**: OpenAI, Claude, Gemini, Perplexity, Bedrock, Azure, Mistral, Ollama
- **Local LLM Support**: Run models on your own hardware
- **Vision Recognition**: Upload and analyze images
- **Voice Features**: Text-to-Speech (TTS) and Speech-to-Text (STT)
- **Text-to-Image**: Generate images from text descriptions

### 🔧 Advanced Features

- **Plugin System**: Function calling and custom tools
- **Agent Market**: Create and share AI assistants
- **Knowledge Base**: Upload files for AI to reference
- **Branching Conversations**: Explore different conversation paths
- **Artifacts**: Interactive whiteboard for complex tasks
- **Multi-User Support**: Team collaboration features

### 🎨 User Experience

- **Beautiful UI**: Modern, clean interface
- **Dark/Light Themes**: Automatic system detection
- **Mobile Friendly**: Works on all devices
- **PWA Support**: Install as a native app
- **Multi-Language**: 20+ languages supported

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Git**
- **Package Manager**: pnpm (recommended) or bun

### Quick Start (3 Steps)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/lobehub/lobe-chat.git
cd lobe-chat
```

#### Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using bun
bun install
```

#### Step 3: Start Development Server

```bash
# Using pnpm
pnpm dev

# Or using bun
bun dev
```

🎉 **That's it!** Open <http://localhost:3010> in your browser.

---

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

```bash
# OpenAI API Key (Required)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Custom OpenAI Proxy
OPENAI_PROXY_URL=https://api.chatanywhere.cn

# Optional: Access Code (Password Protection)
ACCESS_CODE=your-secure-password

# Optional: Model List Control
OPENAI_MODEL_LIST=+gpt-4,-gpt-3.5-turbo
```

### Environment Variables Explained

| Variable            | Required | Description            | Example                       |
| ------------------- | -------- | ---------------------- | ----------------------------- |
| `OPENAI_API_KEY`    | ✅ Yes   | Your OpenAI API key    | `sk-xxxxxx...xxxxxx`          |
| `OPENAI_PROXY_URL`  | ❌ No    | Custom API endpoint    | `https://api.chatanywhere.cn` |
| `ACCESS_CODE`       | ❌ No    | Password protection    | `mySecurePassword123`         |
| `OPENAI_MODEL_LIST` | ❌ No    | Control visible models | `+gpt-4,-gpt-3.5-turbo`       |

---

## Project Structure

```
lobe-chat/
├── src/                    # Main source code
│   ├── app/               # Next.js app router pages
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-specific modules
│   ├── store/             # State management (Zustand)
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── locales/           # Internationalization files
├── packages/              # Shared packages
│   ├── database/          # Database schemas & migrations
│   ├── model-runtime/     # AI model integrations
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Shared utilities
├── docs/                  # Documentation
├── apps/                  # Additional applications
│   └── desktop/           # Electron desktop app
└── public/                # Static assets
```

### Key Directories Explained

#### 📁 `src/app/` - Application Pages

- Contains all your application pages
- Uses Next.js App Router
- Organized by features and routes

#### 📁 `src/features/` - Feature Modules

- Each feature has its own folder
- Contains components, stores, and logic
- Example: `AgentSetting/`, `Chat/`, `Plugin/`

#### 📁 `src/store/` - State Management

- Global state using Zustand
- Organized by feature slices
- Example: `agent/`, `chat/`, `session/`

#### 📁 `packages/` - Shared Code

- Reusable packages across the project
- Database models, utilities, types
- Can be published as npm packages

---

## Development Workflow

### Daily Development Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm type-check

# Lint code
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "✨ feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

### Code Style Guidelines

- **TypeScript**: Use strict typing
- **React**: Functional components with hooks
- **Styling**: antd-style for CSS-in-JS
- **State**: Zustand for state management
- **Testing**: Vitest for unit tests

---

## Architecture Overview

### 🏗️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React 19      │    │ • TRPC          │    │ • Drizzle ORM   │
│ • Zustand       │    │ • Edge Runtime  │    │ • PGLite (WASM) │
│ • Ant Design    │    │ • Auth.js       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🔄 Data Flow

1. **User Interaction** → React Component
2. **State Update** → Zustand Store
3. **API Call** → TRPC Service
4. **Database** → Drizzle ORM
5. **Response** → Back to UI

### 🧩 Key Components

#### Frontend Layer

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **Zustand**: Lightweight state management
- **Ant Design**: UI component library
- **TypeScript**: Type-safe development

#### Backend Layer

- **TRPC**: Type-safe API layer
- **Edge Runtime**: Fast serverless functions
- **Auth.js**: Authentication system
- **Drizzle ORM**: Database operations

#### Database Layer

- **PostgreSQL**: Production database
- **PGLite**: Browser-based database (WASM)
- **Migrations**: Schema versioning

---

## Adding New Features

### 🚀 Step-by-Step Guide

Let's say you want to add a "Custom Greeting" feature:

#### Step 1: Define Data Structure

```typescript
// src/types/greeting.ts
export interface GreetingConfig {
  message: string;
  enabled: boolean;
}
```

#### Step 2: Update Database Schema

```typescript
// src/database/schemas/greeting.ts
export const greetings = pgTable('greetings', {
  id: text('id').primaryKey(),
  message: text('message'),
  enabled: boolean('enabled').default(false),
  ...timestamps,
});
```

#### Step 3: Create Migration

```bash
pnpm db:generate
```

#### Step 4: Create Store

```typescript
// src/store/greeting/index.ts
export const useGreetingStore = create<GreetingState>((set) => ({
  message: '',
  enabled: false,
  setMessage: (message) => set({ message }),
  setEnabled: (enabled) => set({ enabled }),
}));
```

#### Step 5: Create Component

```typescript
// src/features/Greeting/GreetingSettings.tsx
export const GreetingSettings = () => {
  const { message, enabled, setMessage, setEnabled } = useGreetingStore();

  return (
    <div>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter greeting message"
      />
      <Switch
        checked={enabled}
        onChange={setEnabled}
      />
    </div>
  );
};
```

#### Step 6: Add to UI

```typescript
// src/app/settings/page.tsx
import { GreetingSettings } from '@/features/Greeting/GreetingSettings';

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <GreetingSettings />
    </div>
  );
}
```

#### Step 7: Write Tests

```typescript
// src/features/Greeting/GreetingSettings.test.tsx
import { render, screen } from '@testing-library/react';
import { GreetingSettings } from './GreetingSettings';

test('renders greeting settings', () => {
  render(<GreetingSettings />);
  expect(screen.getByPlaceholderText('Enter greeting message')).toBeInTheDocument();
});
```

---

## Testing Guide

### 🧪 Testing Strategy

LobeChat uses **Vitest** for testing with the following approach:

#### Unit Tests

- Test individual functions and components
- Fast execution
- High coverage

#### Integration Tests

- Test feature interactions
- API endpoints
- Database operations

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test src/features/Greeting/GreetingSettings.test.tsx

# Run with coverage
pnpm test:coverage

# Update snapshots
pnpm test:update
```

### Writing Tests

#### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { GreetingSettings } from './GreetingSettings';

describe('GreetingSettings', () => {
  test('updates message when input changes', () => {
    render(<GreetingSettings />);

    const input = screen.getByPlaceholderText('Enter greeting message');
    fireEvent.change(input, { target: { value: 'Hello World' } });

    expect(input.value).toBe('Hello World');
  });
});
```

#### Store Testing

```typescript
import { useGreetingStore } from '@/store/greeting';

describe('GreetingStore', () => {
  test('sets message correctly', () => {
    const { result } = renderHook(() => useGreetingStore());

    act(() => {
      result.current.setMessage('Test Message');
    });

    expect(result.current.message).toBe('Test Message');
  });
});
```

---

## Internationalization

### 🌍 Multi-Language Support

LobeChat supports 20+ languages using `i18next` and `lobe-i18n`.

#### Adding New Language

1. **Update Configuration**

```javascript
// .i18nrc.js
module.exports = {
  outputLocales: [
    'en-US',
    'zh-CN',
    'es-ES',
    'fr-FR',
    'de-DE',
    'ja-JP',
    'ko-KR',
    'vi-VN', // Add new language
  ],
};
```

2. **Generate Translation Files**

```bash
pnpm i18n
```

3. **Add Translations**

```typescript
// src/locales/default/greeting.ts
export default {
  title: 'Greeting Settings',
  message: 'Enter your greeting message',
  enabled: 'Enable greeting',
};
```

#### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

export const GreetingSettings = () => {
  const { t } = useTranslation('greeting');

  return (
    <div>
      <h2>{t('title')}</h2>
      <Input placeholder={t('message')} />
      <Switch label={t('enabled')} />
    </div>
  );
};
```

---

## State Management

### 🗃️ Zustand Store Pattern

LobeChat uses Zustand for state management with a slice-based architecture.

#### Store Structure

```
src/store/
├── index.ts              # Main store exports
├── session/              # Session management
│   ├── index.ts
│   ├── initialState.ts
│   ├── selectors.ts
│   └── slices/
│       ├── agent/
│       └── chat/
└── greeting/             # Feature store
    ├── index.ts
    ├── initialState.ts
    ├── selectors.ts
    └── actions.ts
```

#### Creating a Store

```typescript
// src/store/greeting/index.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createGreetingSlice } from './actions';
import { initialState } from './initialState';

export const useGreetingStore = create<GreetingStore>()(
  devtools(
    (...args) => ({
      ...initialState,
      ...createGreetingSlice(...args),
    }),
    { name: 'greeting-store' },
  ),
);
```

#### Using Selectors

```typescript
// src/store/greeting/selectors.ts
export const greetingSelectors = {
  message: (state: GreetingState) => state.message,
  enabled: (state: GreetingState) => state.enabled,
  isConfigured: (state: GreetingState) => state.enabled && state.message.length > 0,
};
```

#### Using in Components

```typescript
import { useGreetingStore } from '@/store/greeting';
import { greetingSelectors } from '@/store/greeting/selectors';

export const GreetingComponent = () => {
  const message = useGreetingStore(greetingSelectors.message);
  const setMessage = useGreetingStore(state => state.setMessage);

  return <div>{message}</div>;
};
```

---

## Deployment

### 🚀 Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### 2. Docker

```bash
# Build Docker image
docker build -t lobe-chat .

# Run container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your-key \
  lobe-chat
```

#### 3. Self-Hosting

```bash
# Build application
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production

```bash
# Required
OPENAI_API_KEY=sk-your-key

# Optional
DATABASE_URL=postgresql://user:pass@host:port/db
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-domain.com
```

---

## Troubleshooting

### 🐛 Common Issues

#### Issue: "Could not find stylelint-config-recommended"

**Solution:**

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Issue: Database connection errors

**Solution:**

```bash
# Check environment variables
echo $DATABASE_URL

# Run migrations
pnpm db:migrate
```

#### Issue: Build failures

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
pnpm build
```

#### Issue: TypeScript errors

**Solution:**

```bash
# Type check
pnpm type-check

# Fix auto-fixable issues
pnpm lint
```

### 🔍 Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
DEBUG=lobe-chat:* pnpm dev
```

### 📞 Getting Help

- **GitHub Issues**: [Report bugs](https://github.com/lobehub/lobe-chat/issues)
- **Discord**: [Community support](https://discord.gg/lobehub)
- **Documentation**: [Full docs](https://lobehub.com/docs)

---

## 🎉 Conclusion

LobeChat is a powerful, flexible AI chat application that you can customize and deploy anywhere. Whether you're a developer looking to build AI applications or a user wanting a private ChatGPT alternative, LobeChat has you covered.

### Next Steps

1. **Explore the codebase** - Start with `src/app/` to see the main pages
2. **Try the features** - Test different AI models and plugins
3. **Customize** - Modify the UI and add your own features
4. **Deploy** - Share your customized version with others

### Resources

- **Official Website**: <https://lobehub.com>
- **GitHub Repository**: <https://github.com/lobehub/lobe-chat>
- **Documentation**: <https://lobehub.com/docs>
- **Community**: <https://discord.gg/lobehub>

Happy coding! 🚀
