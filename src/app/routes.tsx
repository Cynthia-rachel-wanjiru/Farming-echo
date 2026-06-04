import { createBrowserRouter } from 'react-router';
import App from './App';
import { LandingPage } from './components/landing-page';
import { SignIn } from './components/sign-in';
import { Onboarding } from './components/onboarding';
import { RoleDashboard } from './components/role-dashboard';

/**
 * FarmEcho Application Routes
 * 
 * Route Structure:
 * / - Landing page
 * /auth/signin - Sign in page
 * /auth/signup - Onboarding/Sign up
 * /dashboard - Main dashboard (requires auth)
 * /dashboard/messaging - Echo messaging module
 * /dashboard/voting - Voting hub module
 * /dashboard/knowledge - Knowledge base module
 * /dashboard/market - Market intelligence module
 * /dashboard/profile - User profile module
 * /dashboard/help - Help & resources
 */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

// Route paths for easy reference
export const ROUTES = {
  HOME: '/',
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    MESSAGING: '/dashboard/messaging',
    VOTING: '/dashboard/voting',
    KNOWLEDGE: '/dashboard/knowledge',
    MARKET: '/dashboard/market',
    PROFILE: '/dashboard/profile',
    HELP: '/dashboard/help',
  },
  AI: {
    ASSISTANT: '/ai/assistant',
  },
} as const;

// Helper to get current module from pathname
export function getCurrentModule(pathname: string): string {
  if (pathname.startsWith('/auth/')) return 'auth';
  if (pathname.startsWith('/dashboard/messaging')) return 'messaging';
  if (pathname.startsWith('/dashboard/voting')) return 'voting';
  if (pathname.startsWith('/dashboard/knowledge')) return 'knowledge';
  if (pathname.startsWith('/dashboard/market')) return 'market';
  if (pathname.startsWith('/dashboard/profile')) return 'profile';
  if (pathname.startsWith('/dashboard/help')) return 'help';
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/ai/')) return 'ai';
  return 'home';
}

// Module labels for display
export const MODULE_LABELS = {
  en: {
    home: 'Home',
    auth: 'Authentication',
    dashboard: 'Dashboard',
    messaging: 'Echo Messaging',
    voting: 'Voting Hub',
    knowledge: 'Knowledge Base',
    market: 'Market Intelligence',
    profile: 'User Profile',
    help: 'Help & Resources',
    ai: 'AI Assistant',
  },
  sw: {
    home: 'Mwanzo',
    auth: 'Uthibitishaji',
    dashboard: 'Dashibodi',
    messaging: 'Sauti',
    voting: 'Kura',
    knowledge: 'Maarifa',
    market: 'Soko',
    profile: 'Wasifu',
    help: 'Msaada',
    ai: 'Msaidizi wa AI',
  },
};
