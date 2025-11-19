import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { loadAppData, logoutTotal } from '../utils/storage';
import { saveTokenSecure } from '../utils/keychain';
import { initApiKey } from '../api/apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app...');
        
        await initApiKey();
        
        const appData = await loadAppData();
        
        if (appData.token) {
          setIsAuthenticated(true);
          console.log('User authenticated from Keychain');
          console.log('Theme:', appData.theme);
          console.log('Notifications:', appData.notifications);
        } else {
          setIsAuthenticated(false);
          console.log('❌ User not authenticated');
        }
      } catch (error: any) {
        console.error('❌ App initialization error:', error);
        
        if (error.message === 'SECURITY_CHANGED') {
          Alert.alert(
            'Keamanan Perangkat Diubah',
            'Mohon login ulang untuk melanjutkan.',
            [{ text: 'OK' }]
          );
        }
        
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const login = async (token: string) => {
    try {
      console.log('Saving token to Keychain...');
      const saved = await saveTokenSecure(token);
      
      if (saved) {
        setIsAuthenticated(true);
        console.log('Login successful');
      } else {
        throw new Error('Failed to save token');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('🔴 Logout started...');
      
      await logoutTotal();
      
      setIsAuthenticated(false);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);