# FarmEcho 🌾

> A comprehensive digital network platform for Kenyan smallholder farmers — facilitating real-time communication, collective decision-making, and market intelligence.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)



 Features

| Module | Description |
------
|  **Echo Messaging** | Real-time community communication |
|  **Voting Hub** | Democratic decision-making with consensus tracking |
|  **Knowledge Base** | Community forums for sharing agricultural wisdom |
|  **Market Intelligence** | Live crop price data and market trends |
|  **Weather Integration** | Regional weather forecasts for Kenyan counties |
| **Role-Based Profiles** | Individual Farmers, Cooperative Leaders, Agricultural Experts |
| **Bilingual Support** | Full English / Swahili language toggle |
| **AI Farming Assistant** | Centralized farming knowledge base powered by AI |
| **Mobile-First Design** | Optimized for smartphones and low-bandwidth connections |

---

🏗️ Project Structure

```
farmecho/
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main application entry component
│   │   ├── routes.tsx           # Semantic URL routing config
│   │   └── components/          # Feature components
│   │       ├── landing-page.tsx
│   │       ├── sign-in.tsx
│   │       ├── onboarding.tsx
│   │       ├── role-dashboard.tsx
│   │       ├── echo-messaging.tsx
│   │       ├── voting-hub.tsx
│   │       ├── knowledge-base.tsx
│   │       ├── market-dashboard.tsx
│   │       └── user-profile.tsx
│   ├── modules/                 # Modular architecture
│   │   ├── ai/                  # AI assistant & knowledge base
│   │   ├── ARCHITECTURE.md
│   │   └── MODULE_STRUCTURE.md
│   └── styles/
│       ├── theme.css            # Design tokens & color palette
│       └── fonts.css            # Apercu font imports
├── supabase/
│   └── functions/server/        # Hono edge function backend
├── package.json
├── vite.config.ts
└── pnpm-lock.yaml
```

---

## 🛣️ URL Routes

| Path | Screen |
|---|---|
| `/` | Landing page |
| `/auth/signin` | Sign in |
| `/auth/signup` | Onboarding / Sign up |
| `/dashboard` | Main dashboard (Market module loads first for farmers) |
| `/dashboard/messaging` | Echo messaging |
| `/dashboard/voting` | Voting hub |
| `/dashboard/knowledge` | Knowledge base |
| `/dashboard/market` | Market intelligence |
| `/dashboard/profile` | User profile |

---

## Design System

### Color Palette

```css
--forest-green:    #2D5016   /* Primary brand green */
--secondary-green: #3D6B1F   /* Secondary actions */
--soil-brown:      #8B6F47   /* Accent / earth tone */
--sky-blue:        #4A90E2   /* Links and highlights */
--cream:           #F5F1E8   /* Background surface */
```

### Design Principles

- Mobile-first, responsive layout
- Large touch targets (≥ 44×44 px) for varying digital literacy
- Apercu font throughout the entire platform
- WCAG 2.1 accessible contrast ratios
- Bilingual UI (English / Swahili) with a single toggle

---

## Running Farm Echo

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended)

```bash
# Install pnpm if you don't have it
npm install -g pnpm
```

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/farmecho.git
cd farmecho

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Open http://localhost:5173/ in your browser.

### Environment Variables

The backend runs on Supabase Edge Functions. To connect the full backend locally, create a `.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, then:
# 1. Go to vercel.com → New Project
# 2. Import your GitHub repository
# 3. Set environment variables (from .env above)
# 4. Deploy — live in ~2 minutes
```

### Netlify

```bash
# Push to GitHub, then:
# 1. Go to netlify.com → Add new site → Import from Git
# 2. Build command: pnpm build
# 3. Publish directory: dist
# 4. Set environment variables
# 5. Deploy
```

See [`src/app/DEPLOY_PERSONAL.md`](src/app/DEPLOY_PERSONAL.md) for a detailed step-by-step guide.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18.3 + TypeScript 5.6 |
| Styling | Tailwind CSS 4.0 + custom CSS tokens |
| Build Tool | Vite 6.0 |
| Routing | React Router 7 |
| Icons | Lucide React |
| Charts | Recharts |
| Backend | Supabase Edge Functions (Hono) |
| Database | Supabase Postgres (KV store) |
| Package Manager | pnpm |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

Built for Kenyan smallholder farmers. Inspired by the spirit of *Harambee* — pulling together as a community.

---

**Built with ❤️ for Kenyan farmers** | *Empowering communities through digital connectivity*
