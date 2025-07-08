'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs only on the client
    try {
      const authStatus = window.localStorage.getItem(AUTH_KEY) === 'true';
      const onboardingStatus = window.localStorage.getItem(ONBOARDING_KEY) === 'true';
      setIsAuthenticated(authStatus);
      setOnboardingComplete(onboardingStatus);
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ['/login', '/signup'];
    const isOnboardingRoute = pathname === '/onboarding';

    if (!isAuthenticated && !publicRoutes.includes(pathname) && !isOnboardingRoute) {
      router.push('/login');
    } else if (isAuthenticated && publicRoutes.includes(pathname)) {
      router.push('/');
    } else if (isAuthenticated && !onboardingComplete && !isOnboardingRoute) {
      router.push('/onboarding');
    }
  }, [isAuthenticated, onboardingComplete, isLoading, pathname, router]);

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

  if (isLoading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
  }

  const isAuthPage = ['/login', '/signup', '/onboarding'].includes(pathname);
  
  if (!isAuthenticated && !isAuthPage) {
    return null; // Don't render anything while redirecting
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
