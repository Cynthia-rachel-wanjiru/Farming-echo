# FarmEcho - Online Deployment Guide

## 🌐 Deploy FarmEcho Online (Free Hosting)

This guide will help you deploy FarmEcho to the internet using your personal account.

---

## Option 1: Vercel (RECOMMENDED - Easiest & Fastest)

### Prerequisites
- Personal GitHub account
- Personal email address

### Step 1: Push Code to GitHub (Personal Account)

```bash
# 1. Create new repository on GitHub
# Go to: https://github.com/new
# Use your PERSONAL GitHub account
# Repository name: farmecho
# Make it Public or Private (your choice)

# 2. On your computer, navigate to project folder
cd farmecho

# 3. Configure git with your personal email
git config user.email "your-personal-email@gmail.com"
git config user.name "Your Name"

# 4. Initialize git and push
git init
git add .
git commit -m "Initial FarmEcho commit"
git branch -M main
git remote add origin https://github.com/YOUR-PERSONAL-USERNAME/farmecho.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:** https://vercel.com
2. **Sign up with your PERSONAL GitHub account**
3. **Import Project:**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your `farmecho` repository
4. **Configure:**
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Click "Deploy"**
6. **Done!** Your site will be live at: `https://farmecho-yourname.vercel.app`

### Update Settings (If needed)
```bash
# Create vercel.json in your project root
```

---

## Option 2: Netlify (Also Very Easy)

### Step 1: Push to GitHub (Same as above)
Follow Step 1 from Option 1

### Step 2: Deploy to Netlify

1. **Go to Netlify:** https://netlify.com
2. **Sign up with your PERSONAL GitHub account**
3. **Add New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Authorize with your personal account
   - Select `farmecho` repository
4. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Click "Deploy site"**
6. **Done!** Your site will be live at: `https://farmecho-random.netlify.app`

### Custom Domain (Optional)
- Click "Domain settings"
- Add custom domain or use free `.netlify.app` subdomain

---

## Option 3: GitHub Pages (Completely Free)

### Step 1: Update Vite Config

Add to `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/farmecho/', // Your repo name
  // ... rest of config
})
```

### Step 2: Add GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Step 3: Enable GitHub Pages

1. Push code to GitHub (personal account)
2. Go to repository Settings
3. Pages → Source → "gh-pages" branch
4. Your site will be at: `https://YOUR-USERNAME.github.io/farmecho/`

---

## Option 4: Railway (Backend Ready)

1. **Go to Railway:** https://railway.app
2. **Sign in with personal GitHub**
3. **New Project** → "Deploy from GitHub repo"
4. **Select** your farmecho repository
5. **Environment Variables:** (if needed later)
6. **Deploy!**

---

## Complete Deployment Checklist

### ✅ Before Deployment

- [ ] All code is working locally
- [ ] Images are saved in `src/assets/` folder
- [ ] All image imports updated (no `figma:asset` imports)
- [ ] `package.json` has all dependencies
- [ ] Git is configured with personal email

### ✅ GitHub Setup (Personal Account)

```bash
# Switch to personal GitHub account
# Sign out of work GitHub in browser
# Sign in with personal email

# Configure git locally
git config --global user.email "your-personal@email.com"
git config --global user.name "Your Personal Name"

# Verify
git config --global user.email  # Should show personal email
```

### ✅ After Deployment

- [ ] Site loads correctly
- [ ] Images display properly
- [ ] All navigation works
- [ ] Mobile responsive
- [ ] Test onboarding flow
- [ ] Test all features

---

## Environment Variables (For Future Backend)

When you add Supabase or APIs later:

### Vercel/Netlify Dashboard:
1. Go to Project Settings
2. Environment Variables
3. Add variables:
   ```
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_KEY=your-key
   ```

---

## Sharing Your Live Site

After deployment, share:
- **Vercel:** `https://farmecho.vercel.app`
- **Netlify:** `https://farmecho.netlify.app`
- **GitHub Pages:** `https://yourusername.github.io/farmecho`

---

## Troubleshooting

### Images Not Loading on Live Site?
```typescript
// Use relative imports, not absolute
import logo from './assets/logo.png'  // ✅ Correct
import logo from '/assets/logo.png'   // ❌ May fail
```

### 404 on Page Refresh?
Add `_redirects` file (Netlify) or `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Build Fails?
- Check all dependencies in `package.json`
- Ensure no TypeScript errors
- Check build logs in deployment platform

---

## Custom Domain (Optional)

### After Site is Live:

**Vercel:**
1. Settings → Domains
2. Add your domain
3. Update DNS records

**Netlify:**
1. Domain settings
2. Add custom domain
3. Configure DNS

---

## 🎉 Recommended Flow

1. **Set up project locally** (follow QUICK_START.md)
2. **Test everything** works on `localhost`
3. **Create personal GitHub account** (if you don't have one)
4. **Push to GitHub** with personal credentials
5. **Deploy to Vercel** (takes 2 minutes)
6. **Share your live site!**

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages:** https://pages.github.com

Your FarmEcho site will be live and accessible worldwide! 🌍
