import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing-page';
import { Onboarding } from './components/onboarding';
import { SignIn } from './components/sign-in';
import { RoleDashboard } from './components/role-dashboard';
import logo from 'figma:asset/f071fbeb1656a03851eee645d222a7d311cf60d6.png';

export type UserRole = 'farmer' | 'leader' | 'expert';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  cooperative: string;
  region: string;
  language: 'en' | 'sw';
  phone: string;
  password?: string; // Store password for demo purposes
  profilePicture?: string; // Optional profile picture URL
}

type AppView = 'landing' | 'signin' | 'signup' | 'app';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Update browser URL when view changes
  useEffect(() => {
    const path = view === 'landing' ? '/' :
                 view === 'signin' ? '/auth/signin' :
                 view === 'signup' ? '/auth/signup' :
                 '/dashboard';
    
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    // Update document title
    const titles: { [key: string]: string } = {
      landing: 'FarmEcho - Connect. Learn. Grow.',
      signin: 'Sign In - FarmEcho',
      signup: 'Sign Up - FarmEcho',
      app: 'Dashboard - FarmEcho',
    };
    document.title = titles[view] || 'FarmEcho';
  }, [view]);

  // Listen to browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') setView('landing');
      else if (path === '/auth/signin') setView('signin');
      else if (path === '/auth/signup') setView('signup');
      else if (path.startsWith('/dashboard')) setView('app');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleUserReady = (user: User) => {
    setCurrentUser(user);
    setView('app');
  };

  const handleGoHome = () => {
    setView('landing');
    setCurrentUser(null);
  };

  if (view === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setView('signup')}
        onSignIn={() => setView('signin')}
      />
    );
  }

  if (view === 'signin') {
    return (
      <SignIn
        onSignIn={handleUserReady}
        onBack={() => setView('landing')}
        onSignUp={() => setView('signup')}
      />
    );
  }

  if (view === 'signup') {
    return (
      <Onboarding
        onComplete={handleUserReady}
        onSignIn={() => setView('signin')}
      />
    );
  }

  if (view === 'app' && currentUser) {
    return (
      <RoleDashboard
        user={currentUser}
        language={currentUser.language}
        onGoHome={handleGoHome}
        onLanguageChange={(newLang) => {
          setCurrentUser({ ...currentUser, language: newLang });
        }}
      />
    );
  }

  return null;
}
