'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { authAPI } from '@/lib/api';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from cookies
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('token');
      
      if (token) {
        try {
          const { data } = await authAPI.getProfile();
          setAuthState({
            user: data,
            token,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error) {
          Cookies.remove('token');
          setAuthState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { token, user } = await authAPI.login({ email, password });
      
      // Set token in cookie
      Cookies.set('token', token, { expires: 30 }); // 30 days
      
      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });
      
      router.push('/');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { token, user } = await authAPI.register({ name, email, password });
      
      // Set token in cookie
      Cookies.set('token', token, { expires: 30 }); // 30 days
      
      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });
      
      router.push('/');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push('/login');
  };

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const { data } = await authAPI.updateProfile(profileData);
      
      setAuthState(prev => ({
        ...prev,
        user: data,
        isLoading: false,
      }));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update profile');
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await authAPI.changePassword({ currentPassword, newPassword });
      setAuthState(prev => ({ ...prev, isLoading: false }));
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to change password');
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        error,
        clearError,
      }}
    >
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

export default AuthContext;
