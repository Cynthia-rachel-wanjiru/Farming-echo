# FarmEcho 🌾

> Digital network platform for Kenyan smallholder farmers facilitating real-time communication and collective decision-making.

![FarmEcho Platform](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

## 🌍 Live Demo

**[Visit FarmEcho Live Site](#)** _(Add your deployed URL here)_

---

## ✨ Features

- 🗣️ **Echo Messaging System** - Real-time communication for farmer communities
- 🗳️ **Collective Voting Hub** - Democratic decision-making with consensus tracking
- 📚 **Knowledge Base** - Community forums for sharing agricultural wisdom
- 📊 **Market Intelligence** - Live crop price data and market trends
- 🌤️ **Weather Integration** - Regional weather forecasts
- 👤 **Role-Based Profiles** - Individual Farmers, Cooperative Leaders, Agricultural Experts
- 🌐 **Bilingual Support** - Full English/Swahili language toggle
- 📱 **Mobile-First Design** - Optimized for smartphones and low-bandwidth
- ♿ **Accessible UI** - Large touch targets for varying digital literacy levels

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/farmecho.git
cd farmecho

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app!

---

## 🏗️ Project Structure

```
farmecho/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   ├── components/
│   │   ├── onboarding.tsx         # User onboarding flow
│   │   ├── echo-messaging.tsx     # Real-time messaging
│   │   ├── voting-hub.tsx         # Voting & consensus
│   │   ├── knowledge-base.tsx     # Forum discussions
│   │   ├── market-dashboard.tsx   # Market data
│   │   ├── weather-widget.tsx     # Weather forecasts
│   │   └── user-profile.tsx       # User profiles
│   ├── assets/
│   │   ├── logo.png              # FarmEcho logo
│   │   └── background.png        # Onboarding background
│   └── styles/
│       └── globals.css           # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 Design System

### Color Palette

```css
/* Agricultural Earth Tones */
--forest-green: #2D5016;
--secondary-green: #3D6B1F;
--soil-brown: #8B6F47;
--sky-blue: #4A90E2;
--cream: #F5F1E8;
```

### Key Design Principles

- 📱 Mobile-first responsive design
- 🎯 Large touch targets (min 44×44px)
- 🔤 Clear typography for varying literacy levels
- 🌐 Bilingual UI (English/Swahili)
- 🎨 Agricultural earth tone color scheme
- ♿ WCAG 2.1 accessibility standards

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Deploy
# 1. Go to vercel.com
# 2. Import your GitHub repository
# 3. Deploy (takes ~2 minutes)
```

### Deploy to Netlify

```bash
# Push to GitHub
git push origin main

# Deploy
# 1. Go to netlify.com
# 2. Import from Git
# 3. Deploy
```

See **[DEPLOY_PERSONAL.md](./DEPLOY_PERSONAL.md)** for detailed deployment instructions.

---

## 🛠️ Built With

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 6.0** - Build tool
- **Tailwind CSS 4.0** - Styling
- **Lucide React** - Icon library

---

## 📱 Supported Features by Region

| Region | Weather | Market Prices | Local Forums |
|--------|---------|---------------|--------------|
| Nairobi | ✅ | ✅ | ✅ |
| Kisumu | ✅ | ✅ | ✅ |
| Mombasa | ✅ | ✅ | ✅ |
| Nakuru | ✅ | ✅ | ✅ |
| Eldoret | ✅ | ✅ | ✅ |
| Trans-Nzoia | ✅ | ✅ | ✅ |

---

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built for Kenyan smallholder farmers
- Designed with input from cooperative leaders
- Inspired by the spirit of collective farming (Harambee!)

---

## 📧 Contact

**Project Maintainer:** [Your Name]
- Email: your-email@example.com
- GitHub: [@your-username](https://github.com/your-username)

---

## 🌟 Support

If you find FarmEcho helpful, please consider:
- ⭐ Starring this repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📖 Improving documentation

---

**Built with ❤️ for Kenyan farmers**

_Empowering communities through digital connectivity_
