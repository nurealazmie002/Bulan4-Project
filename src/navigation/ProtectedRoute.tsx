import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, setPostLoginRedirect } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log(` Protected Route Hit: ${route.name}`);
      
      setPostLoginRedirect(route.name); 
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginAPI' as never }],
      });
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <ActivityIndicator size="large" color="#FF7043" />;
  if (!isAuthenticated) return null; 

  return <>{children}</>;
}