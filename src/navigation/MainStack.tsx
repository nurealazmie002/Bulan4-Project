import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import ButtonTabNavigator from './ButtonTabNavigator';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AppContent" 
        component={ButtonTabNavigator} 
        options={({ navigation }) => ({ 
          headerShown: true,
          title: 'Mini E-Commerce App',
          headerStyle: { 
            backgroundColor: '#FF7043',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => {
                const drawerNav = navigation.getParent();
                if (drawerNav) {
                  drawerNav.dispatch(DrawerActions.openDrawer());
                }
              }}
              style={{ marginLeft: 15 }}
            >
              <FontAwesome name="bars" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })} 
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: true,
          title: 'Checkout',
          headerStyle: { backgroundColor: '#FF7043' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          title: 'Product Detail',
          headerStyle: { backgroundColor: '#FF7043' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}