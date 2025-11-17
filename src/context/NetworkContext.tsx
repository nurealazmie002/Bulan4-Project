import React, { createContext, useContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkContextType {
  isOnline: boolean;
}

const NetworkContext = createContext<NetworkContextType>({ isOnline: true });

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isInternetReachable ?? true;
      
      if (!online && isOnline) {
        console.log('🔴 Koneksi terputus. Menggunakan mode offline.');
      } else if (online && !isOnline) {
        console.log('🟢 Koneksi pulih. Melanjutkan operasi.');
      }
      
      setIsOnline(online);
    });

    return () => unsubscribe();
  }, [isOnline]);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);