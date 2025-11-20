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
      await initApiKey();
      const data = await loadAppData();

      if (data.token) {
        setIsAuthenticated(true);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      } else {
        if (data.isExpired) await logoutTotal(); 
        setIsAuthenticated(false);
      }
      setIsLoading(false);
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