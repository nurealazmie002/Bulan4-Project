import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { DrawerActions, useNavigation } from '@react-navigation/native'; 
import ButtonTabNavigator from './ButtonTabNavigator';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProtectedRoute from './ProtectedRoute';
import { useDeepLinkAction } from '../hooks/useDeepLinkAction';
import { useAuth } from '../context/AuthContext'; 

const Stack = createNativeStackNavigator();

const ProtectedCheckout = () => (
  <ProtectedRoute>
    <CheckoutScreen />
  </ProtectedRoute>
);

export default function MainStack() {
  useDeepLinkAction();

  const { postLoginRedirect, setPostLoginRedirect } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (postLoginRedirect) {
      const timer = setTimeout(() => {
        console.log(`🔀 Redirecting to: ${postLoginRedirect}`);
        
        navigation.navigate(postLoginRedirect as never);
        
        setPostLoginRedirect(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [postLoginRedirect, navigation, setPostLoginRedirect]);

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AppContent" 
        component={ButtonTabNavigator} 
        options={({ navigation }) => ({ 
          headerShown: true,
          title: 'Mini E-Commerce',
          headerStyle: { backgroundColor: '#FF7043' },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
              style={{ marginLeft: 15 }}
            >
              <FontAwesome name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })} 
      />
      
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ 
          title: 'Detail Produk', 
          headerStyle: { backgroundColor: '#FF7043' }, 
          headerTintColor: '#fff' 
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={ProtectedCheckout}
        options={{ 
          title: 'Checkout', 
          headerStyle: { backgroundColor: '#FF7043' }, 
          headerTintColor: '#fff' 
        }}
      />
    </Stack.Navigator>
  );
}