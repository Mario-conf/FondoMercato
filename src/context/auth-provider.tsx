'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LoadingScreen from '@/components/loading-screen';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  signup: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'fondo_mercato_auth';
const ONBOARDING_KEY = 'fondo_mercato_onboarding_complete';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 3-second cosmetic splash screen timer
    const splashTimer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);

    // This effect runs on the client to check auth status from localStorage
    try {
      const authStatus = window.localStorage.getItem(AUTH_KEY) === 'true';
      const onboardingStatus = window.localStorage.getItem(ONBOARDING_KEY) === 'true';
      setIsAuthenticated(authStatus);
      setOnboardingComplete(onboardingStatus);
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    // Mark the auth check as complete
    setIsAuthLoading(false);
    
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    // Wait until auth is loaded to perform redirects
    if (isAuthLoading) return;
    
    // But don't redirect away from the splash screen while it's visible
    if (isSplashScreenVisible) return;

    const publicRoutes = ['/login', '/signup'];
    const isOnboardingRoute = pathname === '/onboarding';

    if (!isAuthenticated && !publicRoutes.includes(pathname) && !isOnboardingRoute) {
      router.push('/login');
    } else if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push('/');
    } else if (isAuthenticated && !onboardingComplete && !isOnboardingRoute) {
      router.push('/onboarding');
    }
  }, [isAuthenticated, onboardingComplete, isAuthLoading, isSplashScreenVisible, pathname, router]);

  const login = () => {
    window.localStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
    const onboardingStatus = window.localStorage.getItem(ONBOARDING_KEY) === 'true';
    setOnboardingComplete(onboardingStatus);
    if (!onboardingStatus) {
        router.push('/onboarding');
    } else {
        router.push('/');
    }
  };
  
  const signup = () => {
    window.localStorage.setItem(AUTH_KEY, 'true');
    window.localStorage.removeItem(ONBOARDING_KEY);
    setIsAuthenticated(true);
    setOnboardingComplete(false);
    router.push('/onboarding');
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    router.push('/login');
  };
  
  const completeOnboarding = () => {
    window.localStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboardingComplete(true);
    router.push('/');
  };

  const value = { isAuthenticated, login, logout, signup, completeOnboarding };

  // Show splash screen if it's not done yet.
  if (isSplashScreenVisible) {
    return <LoadingScreen />;
  }

  // After splash screen, if auth is still loading for any reason,
  // return null to prevent flicker, unless we are on a public auth page.
  const isAuthPage = ['/login', '/signup', '/onboarding'].includes(pathname);
  if (isAuthLoading && !isAuthPage) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
