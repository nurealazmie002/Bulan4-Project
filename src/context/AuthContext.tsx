import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadAppData, logoutTotal, saveTokenMeta } from '../utils/storage';
import { saveTokenSecure } from '../utils/keychain';
import { initApiKey } from '../api/apiClient';
import apiClient from '../api/apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, expiresInMins?: number) => Promise<void>;
  logout: () => Promise<void>;
  postLoginRedirect: string | null;
  setPostLoginRedirect: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [postLoginRedirect, setPostLoginRedirect] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      console.log('[Auth] Mulai Initializing...'); 
      
      try {
        console.log('[Auth] Cek API Key...');
        await initApiKey();
        
        console.log('🚀 [Auth] Load Data Parallel...');
        const data = await loadAppData();
        console.log('[Auth] Data Loaded:', data);

        if (data.token) {
          console.log('[Auth] Token Ditemukan -> Login');
          setIsAuthenticated(true);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        } else {
          console.log('[Auth] Token Tidak Ada -> Logout State');
          if (data.isExpired) await logoutTotal();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('[Auth] Init Error:', error);
      } finally {
        console.log(' [Auth] Selesai -> Stop Loading'); 
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const login = async (token: string, expiresInMins: number = 60) => {
    const success = await saveTokenSecure(token);
    if (success) {
      const expiredAt = Date.now() + expiresInMins * 60 * 1000;
      await saveTokenMeta(expiredAt);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    await logoutTotal();
    delete apiClient.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setPostLoginRedirect(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, postLoginRedirect, setPostLoginRedirect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);