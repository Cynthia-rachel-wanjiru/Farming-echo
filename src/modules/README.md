# FarmEcho Modules

This directory contains the organized module structure for the FarmEcho platform.

## Structure

```
/src/modules/
├── frontend/          # All frontend components and UI
│   ├── auth/         # Authentication components (Sign-in, Onboarding)
│   ├── dashboard/    # Dashboard components (Role-based dashboards)
│   ├── messaging/    # Echo messaging system
│   ├── market/       # Market intelligence and marketplace
│   ├── voting/       # Voting and decision-making hub
│   ├── knowledge/    # Knowledge base and forums
│   ├── profile/      # User profile management
│   ├── help/         # Help and resource desk
│   ├── shared/       # Shared UI components
│   └── landing/      # Landing page
├── ai/               # AI Assistant and knowledge base
│   ├── assistant/    # AI chat interface
│   ├── knowledge/    # AI knowledge base and responses
│   └── types/        # AI-related TypeScript types
└── backend/          # Backend services (currently minimal)
    └── services/     # API services and utilities
```

## Module Guidelines

### Frontend Modules
- Each feature has its own folder
- Components are organized by feature
- Shared components go in `/frontend/shared/`
- All components use TypeScript

### AI Modules
- AI assistant interface and logic
- Knowledge base and response generation
- Separated from main frontend for clarity

### Backend Modules
- Currently uses Supabase Edge Functions
- API integrations and services
- Database utilities (KV store)

## Import Paths

When importing from modules, use relative paths:
```typescript
// From App.tsx
import { SignIn } from './modules/frontend/auth/sign-in';
import { AIAssistant } from './modules/ai/assistant/ai-assistant';
```
