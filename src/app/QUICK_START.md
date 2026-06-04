# FarmEcho - Quick Start Commands

## Complete Setup (Copy & Paste)

```bash
# 1. Create new Vite + React + TypeScript project
npm create vite@latest farmecho -- --template react-ts
cd farmecho

# 2. Install all dependencies
npm install
npm install lucide-react
npm install -D tailwindcss@next postcss autoprefixer

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Create directory structure
mkdir -p src/components
mkdir -p src/assets
mkdir -p src/styles

# 5. Start dev server (after copying files)
npm run dev
```

## Files to Copy

### From this project → Your new project:

1. **Copy App.tsx:**
   - From: `/App.tsx`
   - To: `src/App.tsx`
   - ⚠️ **Update image imports:**
     ```tsx
     // Change this:
     import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png';
     
     // To this:
     import logo from './assets/logo.png';
     ```

2. **Copy all component files:**
   - From: `/components/*.tsx`
   - To: `src/components/*.tsx`
   - Files to copy:
     - `onboarding.tsx` ⚠️ (update image imports)
     - `echo-messaging.tsx`
     - `voting-hub.tsx`
     - `knowledge-base.tsx`
     - `market-dashboard.tsx`
     - `weather-widget.tsx`
     - `user-profile.tsx`

3. **Copy CSS:**
   - From: `/styles/globals.css`
   - To: `src/styles/globals.css`

4. **Save images to `src/assets/`:**
   - `logo.png` (FarmEcho circular logo)
   - `background.png` (Farmers in field aerial view)

5. **Create `src/main.tsx`:**
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

6. **Update `tailwind.config.js`:**
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

## Image Import Updates Required

### In `src/App.tsx`:
```tsx
// OLD:
import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png';

// NEW:
import logo from './assets/logo.png';
```

### In `src/components/onboarding.tsx`:
```tsx
// OLD:
import backgroundImage from 'figma:asset/4ff685ce06753bb8241b79c63a7aa3311c69db61.png';
import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png';

// NEW:
import backgroundImage from '../assets/background.png';
import logo from '../assets/logo.png';
```

## Final Checklist

- [ ] Created Vite project with React + TypeScript
- [ ] Installed lucide-react
- [ ] Installed Tailwind CSS v4
- [ ] Created `src/components/` folder
- [ ] Created `src/assets/` folder
- [ ] Created `src/styles/` folder
- [ ] Copied all 7 component files to `src/components/`
- [ ] Copied `App.tsx` to `src/App.tsx`
- [ ] Copied `globals.css` to `src/styles/globals.css`
- [ ] Created `src/main.tsx`
- [ ] Updated image imports in `App.tsx`
- [ ] Updated image imports in `onboarding.tsx`
- [ ] Saved logo.png to `src/assets/`
- [ ] Saved background.png to `src/assets/`
- [ ] Updated `tailwind.config.js`
- [ ] Run `npm run dev`

## Expected Result

When you run `npm run dev`, you should see:
1. FarmEcho onboarding screen with:
   - Beautiful background image of farmers
   - Circular FarmEcho logo
   - Language selection (English/Swahili)
2. After onboarding:
   - Dashboard with weather widget
   - Bottom navigation with 5 tabs
   - Echo messaging system
   - Voting hub
   - Knowledge base
   - Market dashboard
   - User profile

## Troubleshooting

**Images not showing?**
- Check files are in `src/assets/` folder
- Verify import paths match exactly
- Clear browser cache and reload

**Tailwind styles not working?**
- Make sure `globals.css` is imported in `main.tsx`
- Restart dev server after config changes

**TypeScript errors?**
- Run `npm install --save-dev @types/react @types/react-dom`
- Check all imports are correct

## Get the Images

You'll need to save these two images:

1. **logo.png** - The circular FarmEcho logo with wheat/grain and leaf design
2. **background.png** - Aerial view of farmers working in a lush green field

Save them both to `src/assets/` folder after creating your project.

---

🎉 You're ready to build FarmEcho in VS Code!
