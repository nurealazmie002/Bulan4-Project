import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BerandaScreen from '../screens/BerandaScreen';
import ProdukScreen from '../screens/ProdukScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductListAPIScreen from '../screens/ProductListAPIScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import CartScreen from '../screens/CartScreen';

const BottomTab = createBottomTabNavigator();

export default function ButtonTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF7043',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 8, paddingTop: 8 },
        headerShown: false,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <BottomTab.Screen
        name="Beranda"
        component={BerandaScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="API Products"
        component={ProductListAPIScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="cloud" size={size} color={color} />,
          tabBarLabel: 'API Produk',
        }}
      />
      <BottomTab.Screen
        name="Produk"
        component={ProdukScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-bag" size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
          tabBarLabel: 'Profil',
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-cart" size={size} color={color} />,
          tabBarLabel: 'Keranjang',
        }}
      />
    </BottomTab.Navigator>
  );
}