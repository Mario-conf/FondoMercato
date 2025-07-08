'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LoadingScreen from '@/components/loading-screen';

interface User {
  name: string;
  email: string;
  password: string; // In a real app, this would be a hash
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  signup: (credentials: { email: string; password: string }) => void;
  updateUser: (data: { name: string; email: string }) => void;
  changePassword: (data: { currentPassword; newPassword }) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'fintrack_auth';
const ONBOARDING_KEY = 'fintrack_onboarding_complete';
const USERS_KEY = 'fintrack_users';
const CURRENT_USER_EMAIL_KEY = 'fintrack_current_user_email';

const getRegisteredUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    try {
      const users = window.localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Failed to get users from localStorage:', error);
      return [];
    }
  }
  return [];
};

const saveRegisteredUsers = (users: User[]) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users to localStorage:', error);
    }
  }
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashScreenVisible(false);
    }, 3000);

    try {
      const authStatus = window.localStorage.getItem(AUTH_KEY) === 'true';
      const onboardingStatus = window.localStorage.getItem(ONBOARDING_KEY) === 'true';
      setIsAuthenticated(authStatus);
      setOnboardingComplete(onboardingStatus);

      if (authStatus) {
        const userEmail = window.localStorage.getItem(CURRENT_USER_EMAIL_KEY);
        if (userEmail) {
          const users = getRegisteredUsers();
          const currentUser = users.find(u => u.email === userEmail);
          setUser(currentUser || null);
        }
      }
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    setIsAuthLoading(false);
    
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (isAuthLoading || isSplashScreenVisible) return;

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

  const login = ({ email, password }: { email: string; password: string }) => {
    const users = getRegisteredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      window.localStorage.setItem(AUTH_KEY, 'true');
      window.localStorage.setItem(CURRENT_USER_EMAIL_KEY, email);
      setIsAuthenticated(true);
      setUser(foundUser);
      const onboardingStatus = window.localStorage.getItem(ONBOARDING_KEY) === 'true';
      setOnboardingComplete(onboardingStatus);
      if (!onboardingStatus) {
        router.push('/onboarding');
      } else {
        router.push('/');
      }
    } else {
        throw new Error('Credenciales incorrectas o usuario no registrado.');
    }
  };
  
  const signup = ({ email, password }: { email: string; password: string }) => {
    const users = getRegisteredUsers();
    const userExists = users.some(u => u.email === email);

    if (userExists) {
      throw new Error('Este email ya está registrado.');
    }

    const name = email.split('@')[0];
    const newUser: User = { name, email, password };
    const newUsers = [...users, newUser];
    saveRegisteredUsers(newUsers);

    // Log the user in after signup
    window.localStorage.setItem(AUTH_KEY, 'true');
    window.localStorage.setItem(CURRENT_USER_EMAIL_KEY, email);
    window.localStorage.removeItem(ONBOARDING_KEY); // Ensure onboarding is triggered
    
    setIsAuthenticated(true);
    setUser(newUser);
    setOnboardingComplete(false);
    setIsSplashScreenVisible(false); // Skip splash screen after signup
    router.push('/onboarding');
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    window.localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
    window.localStorage.removeItem(ONBOARDING_KEY); // Also clear onboarding status on logout
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  const updateUser = (data: { name: string; email: string }) => {
    if (!user) throw new Error("No hay un usuario autenticado.");
    
    let users = getRegisteredUsers();
    
    if (data.email !== user.email && users.some(u => u.email === data.email)) {
      throw new Error("El nuevo email ya está en uso.");
    }
    
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex === -1) throw new Error("No se pudo encontrar el usuario para actualizar.");
    
    const updatedUser = { ...users[userIndex], name: data.name, email: data.email };
    users[userIndex] = updatedUser;
    
    saveRegisteredUsers(users);
    setUser(updatedUser);
    window.localStorage.setItem(CURRENT_USER_EMAIL_KEY, updatedUser.email);
  };

  const changePassword = ({ currentPassword, newPassword }: { currentPassword; newPassword }) => {
    if (!user) throw new Error("No hay un usuario autenticado.");
    if (user.password !== currentPassword) throw new Error("La contraseña actual es incorrecta.");
    
    let users = getRegisteredUsers();
    const userIndex = users.findIndex(u => u.email === user.email);

    if (userIndex === -1) throw new Error("No se pudo encontrar el usuario para actualizar.");
    
    const updatedUser = { ...users[userIndex], password: newPassword };
    users[userIndex] = updatedUser;
    
    saveRegisteredUsers(users);
    setUser(updatedUser);
  };
  
  const completeOnboarding = () => {
    window.localStorage.setItem(ONBOARDING_KEY, 'true');
    setOnboardingComplete(true);
    router.push('/');
  };

  const value = { isAuthenticated, user, login, logout, signup, updateUser, changePassword, completeOnboarding };

  if (isSplashScreenVisible) {
    return <LoadingScreen />;
  }

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
