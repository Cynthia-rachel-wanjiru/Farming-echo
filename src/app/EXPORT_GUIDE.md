# FarmEcho - VS Code Export Guide

This guide will help you set up the FarmEcho application in VS Code.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- VS Code editor

## Setup Instructions

### 1. Create a New React + Vite Project

```bash
npm create vite@latest farmecho -- --template react-ts
cd farmecho
```

### 2. Install Dependencies

```bash
npm install
npm install lucide-react
npm install -D tailwindcss@next postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind CSS (v4)

Replace the contents of `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. File Structure

Create the following directory structure in your `src` folder:

```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── onboarding.tsx
│   ├── echo-messaging.tsx
│   ├── voting-hub.tsx
│   ├── knowledge-base.tsx
│   ├── market-dashboard.tsx
│   ├── weather-widget.tsx
│   └── user-profile.tsx
├── assets/
│   ├── logo.png          (FarmEcho logo)
│   └── background.png    (Onboarding background)
└── styles/
    └── globals.css
```

### 5. Copy Component Files

Copy all the component files from this project to your new project:
- Copy `/App.tsx` → `src/App.tsx`
- Copy all files from `/components/` → `src/components/`
- Copy `/styles/globals.css` → `src/styles/globals.css`

### 6. Update Import Paths for Images

In the code, replace:
- `import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png'` 
  with 
  `import logo from './assets/logo.png'`

- `import backgroundImage from 'figma:asset/4ff685ce06753bb8241b79c63a7aa3311c69db61.png'`
  with
  `import backgroundImage from '../assets/background.png'`

### 7. Update main.tsx

Replace the contents of `src/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 8. Add Image Assets

Save the following images to `src/assets/`:
- **logo.png** - The FarmEcho circular logo (wheat/grain with leaves)
- **background.png** - The aerial view of farmers in the field

### 9. Run the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Project Features

- ✅ Bilingual support (English/Swahili)
- ✅ Mobile-first responsive design
- ✅ Real-time Echo messaging system
- ✅ Collective voting hub with consensus tracking
- ✅ Knowledge base forums
- ✅ Market intelligence dashboard
- ✅ Weather integration
- ✅ Role-based user profiles (Farmers, Leaders, Experts)
- ✅ Support for cooperative and independent farmers

## Troubleshooting

### Issue: Images not loading
- Make sure image files are in `src/assets/` folder
- Check import paths are correct
- Clear cache and restart dev server

### Issue: Tailwind classes not working
- Ensure `globals.css` is imported in `main.tsx`
- Check `tailwind.config.js` content paths include all component files
- Restart dev server after config changes

### Issue: TypeScript errors
- Run `npm install --save-dev @types/react @types/react-dom`
- Check all import paths are correct

## Color Palette Reference

- Deep Forest Green: `#2D5016`
- Secondary Green: `#3D6B1F`, `#4A7C28`
- Soil Brown: `#8B6F47`
- Sky Blue: `#4A90E2`
- Cream Background: `#F5F1E8`, `#E8E4D9`

## Support

For questions or issues, refer to the component documentation in each file.

---

Built with ❤️ for Kenyan smallholder farmers
