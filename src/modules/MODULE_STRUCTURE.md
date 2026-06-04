# FarmEcho Module Structure

## Complete File Organization

### `/src/modules/ai/` - AI Module
Artificial Intelligence assistant and knowledge base

```
/src/modules/ai/
├── assistant/
│   └── ai-assistant.tsx          # AI chat interface component
├── knowledge/
│   └── farming-knowledge-base.ts # AI knowledge base and response logic
└── types/
    └── ai-types.ts               # TypeScript types for AI module
```

**Components:**
- `AIAssistant` - Main AI chat interface with purple/blue gradient
- `generateAIResponse()` - Function to generate farming advice responses

---

### `/src/modules/frontend/` - Frontend Module
All user-facing components and UI elements

#### `/src/modules/frontend/auth/` - Authentication
```
├── sign-in.tsx        # Sign-in component
└── onboarding.tsx     # New user onboarding flow
```

#### `/src/modules/frontend/dashboard/` - Dashboards
```
└── role-dashboard.tsx # Role-differentiated dashboards (Farmer/Leader/Expert)
```

#### `/src/modules/frontend/messaging/` - Echo Messaging
```
└── echo-messaging.tsx # WhatsApp-style messaging with AI integration
```

#### `/src/modules/frontend/market/` - Market Module
```
└── market-dashboard.tsx # Market intelligence & marketplace (3 tabs)
```

#### `/src/modules/frontend/voting/` - Voting & Decision Making
```
└── voting-hub.tsx # Collective voting and consensus tracking
```

#### `/src/modules/frontend/knowledge/` - Knowledge Base
```
└── knowledge-base.tsx # Forums and knowledge sharing
```

#### `/src/modules/frontend/profile/` - User Profile
```
└── user-profile.tsx # Profile management with photo upload
```

#### `/src/modules/frontend/help/` - Help & Support
```
└── help-resource-desk.tsx # Help center and resources
```

#### `/src/modules/frontend/shared/` - Shared Components
```
├── ui/                      # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── switch.tsx
│   ├── tabs.tsx
│   └── textarea.tsx
├── figma/                   # Figma-specific utilities
│   └── ImageWithFallback.tsx
└── weather-widget.tsx       # Reusable weather widget
```

#### `/src/modules/frontend/landing/` - Landing Page
```
└── landing-page.tsx # Public-facing landing page
```

---

### `/src/modules/backend/` - Backend Module
Server-side logic and database utilities

```
/src/modules/backend/
├── services/
│   └── api-service.ts    # API integration utilities
└── utils/
    └── supabase-utils.ts # Supabase helper functions
```

**Note:** Main backend logic is in `/supabase/functions/server/`
- `index.tsx` - Hono web server
- `kv_store.tsx` - Key-value store utilities (protected file)

---

## Migration Map

### Old Structure → New Structure

| Old Path | New Path |
|----------|----------|
| `/src/app/components/ai-assistant.tsx` | `/src/modules/ai/assistant/ai-assistant.tsx` |
| `/src/app/components/sign-in.tsx` | `/src/modules/frontend/auth/sign-in.tsx` |
| `/src/app/components/onboarding.tsx` | `/src/modules/frontend/auth/onboarding.tsx` |
| `/src/app/components/role-dashboard.tsx` | `/src/modules/frontend/dashboard/role-dashboard.tsx` |
| `/src/app/components/echo-messaging.tsx` | `/src/modules/frontend/messaging/echo-messaging.tsx` |
| `/src/app/components/market-dashboard.tsx` | `/src/modules/frontend/market/market-dashboard.tsx` |
| `/src/app/components/voting-hub.tsx` | `/src/modules/frontend/voting/voting-hub.tsx` |
| `/src/app/components/knowledge-base.tsx` | `/src/modules/frontend/knowledge/knowledge-base.tsx` |
| `/src/app/components/user-profile.tsx` | `/src/modules/frontend/profile/user-profile.tsx` |
| `/src/app/components/help-resource-desk.tsx` | `/src/modules/frontend/help/help-resource-desk.tsx` |
| `/src/app/components/weather-widget.tsx` | `/src/modules/frontend/shared/weather-widget.tsx` |
| `/src/app/components/landing-page.tsx` | `/src/modules/frontend/landing/landing-page.tsx` |
| `/src/app/components/ui/*` | `/src/modules/frontend/shared/ui/*` |
| `/src/app/components/figma/*` | `/src/modules/frontend/shared/figma/*` |

---

## Import Examples

### From App.tsx:
```typescript
// AI Module
import { AIAssistant } from './modules/ai/assistant/ai-assistant';

// Frontend - Auth
import { SignIn } from './modules/frontend/auth/sign-in';
import { Onboarding } from './modules/frontend/auth/onboarding';

// Frontend - Dashboard
import { RoleDashboard } from './modules/frontend/dashboard/role-dashboard';

// Frontend - Messaging
import { EchoMessaging } from './modules/frontend/messaging/echo-messaging';

// Frontend - Market
import { MarketDashboard } from './modules/frontend/market/market-dashboard';

// Frontend - Voting
import { VotingHub } from './modules/frontend/voting/voting-hub';

// Frontend - Knowledge
import { KnowledgeBase } from './modules/frontend/knowledge/knowledge-base';

// Frontend - Profile
import { UserProfile } from './modules/frontend/profile/user-profile';

// Frontend - Help
import { HelpResourceDesk } from './modules/frontend/help/help-resource-desk';

// Frontend - Shared
import { Button } from './modules/frontend/shared/ui/button';
import { WeatherWidget } from './modules/frontend/shared/weather-widget';

// Frontend - Landing
import { LandingPage } from './modules/frontend/landing/landing-page';
```

### From a component:
```typescript
// Relative imports within the same module
import { Button } from '../shared/ui/button';
import { generateAIResponse } from '../../ai/knowledge/farming-knowledge-base';
```

---

## Benefits of This Structure

### 1. **Clear Separation of Concerns**
   - AI logic isolated from UI components
   - Frontend components grouped by feature
   - Backend utilities separated

### 2. **Scalability**
   - Easy to add new features in their respective modules
   - Can grow AI module independently (e.g., add ML models)
   - Backend can be expanded without affecting frontend

### 3. **Maintainability**
   - Related code stays together
   - Easy to find and update components
   - Clear module boundaries

### 4. **Team Collaboration**
   - Different teams can work on different modules
   - AI team works in `/modules/ai/`
   - Frontend team works in `/modules/frontend/`
   - Backend team works in `/modules/backend/` and `/supabase/`

### 5. **Testing**
   - Each module can have its own test suite
   - AI knowledge base can be tested separately
   - UI components have their own tests

---

## Module Ownership

| Module | Purpose | Key Technologies |
|--------|---------|------------------|
| **AI** | Farming knowledge & assistance | Rule-based responses, future ML |
| **Frontend** | User interface & experience | React, Motion, Tailwind CSS |
| **Backend** | Data & business logic | Supabase, Hono, Edge Functions |

---

## Future Enhancements

### AI Module
- [ ] Add machine learning models for crop disease detection
- [ ] Integrate real-time weather API
- [ ] Add voice recognition for voice notes
- [ ] Multi-language expansion beyond English/Swahili

### Frontend Module
- [ ] Add mobile app (React Native)
- [ ] Offline-first capabilities for low bandwidth
- [ ] Advanced analytics dashboard
- [ ] Video tutorials and training

### Backend Module
- [ ] Real-time collaboration features
- [ ] Advanced reporting system
- [ ] Integration with government agricultural APIs
- [ ] Blockchain for supply chain tracking

---

*Last Updated: June 4, 2026*
