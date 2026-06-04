# FarmEcho Architecture Overview

## 🏗️ Three-Tier Modular Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (Mobile-First, Bilingual)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND MODULE 🎨                          │
│  /src/modules/frontend/                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │    Auth      │ │  Dashboard   │ │  Messaging   │            │
│  │ Sign-in      │ │ Role-based   │ │ WhatsApp UI  │            │
│  │ Onboarding   │ │ Analytics    │ │ Real-time    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │   Market     │ │   Voting     │ │  Knowledge   │            │
│  │ Intelligence │ │ Collective   │ │ Forums       │            │
│  │ Marketplace  │ │ Decisions    │ │ Resources    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │   Profile    │ │     Help     │ │    Shared    │            │
│  │ Photo Upload │ │ Resource     │ │ UI Kit       │            │
│  │ Settings     │ │ Desk         │ │ Components   │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
┌───────────────────────────┐ ┌───────────────────────────┐
│     AI MODULE 🤖          │ │   BACKEND MODULE ⚙️       │
│  /src/modules/ai/         │ │  /src/modules/backend/    │
│  ┌─────────────────────┐  │ │  /supabase/functions/     │
│  │   AI Assistant      │  │ │  ┌─────────────────────┐  │
│  │   Chat Interface    │  │ │  │  Hono Web Server    │  │
│  │   Purple/Blue UI    │  │ │  │  API Routes         │  │
│  └─────────────────────┘  │ │  │  Authentication     │  │
│           │               │ │  └─────────────────────┘  │
│           ▼               │ │           │               │
│  ┌─────────────────────┐  │ │           ▼               │
│  │ Knowledge Base      │  │ │  ┌─────────────────────┐  │
│  │ Farming Expertise   │  │ │  │  Supabase Services  │  │
│  │ ├─ Maize           │  │ │  │  ├─ Auth            │  │
│  │ ├─ Irrigation      │  │ │  │  ├─ Storage         │  │
│  │ ├─ Pest Control    │  │ │  │  ├─ Database        │  │
│  │ ├─ Fertilizer      │  │ │  │  └─ KV Store        │  │
│  │ ├─ Market Prices   │  │ │  └─────────────────────┘  │
│  │ └─ Weather         │  │ │                           │
│  └─────────────────────┘  │ └───────────────────────────┘
└───────────────────────────┘

```

## 📊 Data Flow

### Example: User Asks AI a Question

```
1. USER ACTION
   ↓
   User types "When should I plant maize?" in Echo messaging

2. FRONTEND (Messaging)
   /src/app/components/echo-messaging.tsx
   ↓
   Detects AI contact, captures message

3. AI MODULE (Knowledge Base)
   /src/modules/ai/knowledge/farming-knowledge-base.ts
   ↓
   generateAIResponse("When should I plant maize?", "en")
   ↓
   Matches query to "maize" knowledge
   ↓
   Returns comprehensive maize growing guide

4. FRONTEND (Display)
   ↓
   Shows AI response in purple/blue gradient bubble
   ↓
   User sees farming advice with emojis and formatting
```

### Example: User Views Market Prices

```
1. USER ACTION
   ↓
   User clicks on Market tab

2. FRONTEND (Market Dashboard)
   /src/modules/frontend/market/market-dashboard.tsx
   ↓
   Loads marketplace, intelligence, and price history tabs

3. BACKEND (API)
   /supabase/functions/server/index.tsx
   ↓
   Fetches market data from database

4. DISPLAY
   ↓
   Shows real-time crop prices with trends
```

## 🔄 Module Interactions

### AI ↔ Frontend
- **Frontend** calls AI for responses
- **AI** returns formatted text with farming knowledge
- **No backend** needed for basic AI (rule-based system)

### Frontend ↔ Backend
- **Frontend** sends user actions (messages, votes, uploads)
- **Backend** processes, stores in database
- **Backend** returns data for display
- **Real-time** updates via Supabase subscriptions

### Backend ↔ Database
- **Supabase** provides auth, storage, database
- **KV Store** for key-value data
- **Edge Functions** for server logic
- **Secure** service role for admin operations

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.tsx (Root)
├─ LandingPage (Public)
│  └─ Hero, Features, Testimonials
│
├─ SignIn (Auth)
│  └─ Bilingual form
│
├─ Onboarding (Auth)
│  └─ Multi-step wizard
│
├─ RoleDashboard (Main)
│  ├─ Navigation Bar (Auto-hide)
│  ├─ Stats Cards
│  ├─ Quick Actions
│  └─ Role-specific content
│
├─ EchoMessaging (Communication)
│  ├─ Sidebar (Contacts list)
│  ├─ Chat Area (Messages)
│  └─ AI Integration
│
├─ MarketDashboard (Commerce)
│  ├─ Tab 1: Marketplace (Buy/Sell)
│  ├─ Tab 2: Intelligence (Prices)
│  └─ Tab 3: History (Charts)
│
├─ VotingHub (Governance)
│  ├─ Active Proposals
│  ├─ Voting Interface
│  └─ Results Display
│
├─ KnowledgeBase (Learning)
│  ├─ Forums
│  ├─ Q&A
│  └─ Resources
│
├─ UserProfile (Account)
│  ├─ Photo Upload
│  ├─ Profile Edit
│  └─ Settings
│
└─ HelpResourceDesk (Support)
   ├─ FAQ
   ├─ Guides
   └─ Contact
```

## 🤖 AI Architecture

### Rule-Based System (Current)

```
User Query
    ↓
Text Preprocessing
    ↓
Keyword Matching
    ├─ "maize" / "mahindi" → Maize Guide
    ├─ "water" / "irrigat" → Irrigation Tips
    ├─ "pest" / "wadudu" → Pest Control
    ├─ "fertilizer" → Fertilizer Guide
    ├─ "price" / "market" → Market Prices
    └─ "weather" / "rain" → Weather Tips
    ↓
Response Formatting
    ↓
Bilingual Output (EN/SW)
    ↓
Return to User
```

### Future: ML-Enhanced System

```
User Query
    ↓
Natural Language Processing
    ├─ Intent Classification
    ├─ Entity Recognition
    └─ Context Understanding
    ↓
Knowledge Retrieval
    ├─ Vector Database Search
    ├─ RAG (Retrieval-Augmented Generation)
    └─ External API Calls
    ↓
Response Generation
    ├─ LLM (Large Language Model)
    ├─ Fact Checking
    └─ Bilingual Translation
    ↓
Quality Assurance
    ↓
Return to User
```

## ⚙️ Backend Architecture

### Supabase Edge Functions

```
/supabase/functions/server/
    ↓
index.tsx (Hono Server)
    ├─ CORS Middleware
    ├─ Logger
    └─ Route Handlers
        ├─ /make-server-56370ef4/auth
        ├─ /make-server-56370ef4/messages
        ├─ /make-server-56370ef4/market
        ├─ /make-server-56370ef4/voting
        └─ /make-server-56370ef4/storage
```

### Database Schema (Conceptual)

```
users
├─ id (UUID)
├─ name (TEXT)
├─ email (TEXT)
├─ role (ENUM: farmer, leader, expert)
├─ cooperative (TEXT)
└─ avatar_url (TEXT)

kv_store_56370ef4
├─ key (TEXT PRIMARY KEY)
├─ value (JSONB)
└─ updated_at (TIMESTAMP)

messages (Future)
├─ id (UUID)
├─ sender_id (UUID → users.id)
├─ recipient_id (UUID → users.id)
├─ content (TEXT)
├─ type (ENUM: text, voice, image)
└─ created_at (TIMESTAMP)

votes (Future)
├─ id (UUID)
├─ proposal_id (UUID)
├─ user_id (UUID → users.id)
├─ choice (TEXT)
└─ created_at (TIMESTAMP)
```

## 🎯 Design Patterns

### 1. **Separation of Concerns**
- **UI** (Components) separate from **Logic** (Knowledge Base)
- **Presentation** separate from **Data**

### 2. **Reusability**
- Shared UI components (Button, Card, Input)
- Common utilities (generateAIResponse)
- Modular features

### 3. **Scalability**
- Feature-based folder structure
- Independent modules
- Easy to add new features

### 4. **Maintainability**
- Clear naming conventions
- Comprehensive documentation
- Type safety with TypeScript

## 🌍 Internationalization (i18n)

### Current Approach

```typescript
const translations = {
  en: {
    title: 'FarmEcho',
    subtitle: 'Connect. Learn. Grow.',
    // ...
  },
  sw: {
    title: 'FarmEcho',
    subtitle: 'Unganisha. Jifunze. Kua.',
    // ...
  }
};

const t = translations[language];
```

### Future: Centralized i18n

```
/src/modules/shared/i18n/
├─ en.json
├─ sw.json
└─ i18n.ts (Translation utility)
```

## 🔒 Security Architecture

### Frontend Security
- ✅ No secrets in frontend code
- ✅ Supabase Anon Key (public, safe)
- ✅ Row-level security on database

### Backend Security
- ✅ Service Role Key (server-side only)
- ✅ JWT token validation
- ✅ CORS protection
- ✅ Input validation

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1024px (Adaptive)
- **Desktop**: > 1024px (2-3 columns)

### Mobile-First Features
- Large touch targets (48px minimum)
- Voice note support
- Offline-ready (Progressive Web App)
- Low-bandwidth optimizations

## 🚀 Performance Optimizations

### Frontend
- Lazy loading components
- Virtualized lists for large datasets
- Image optimization
- Code splitting by route

### Backend
- Edge functions (low latency)
- Database indexes
- Caching with KV store
- CDN for static assets

---

*Architecture designed for scalability, maintainability, and rural connectivity*
