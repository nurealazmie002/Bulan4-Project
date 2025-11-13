import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BerandaScreen from '../screens/BerandaScreen';
import HomeScreen from '../screens/HomeScreen';
import StatistikScreen from '../screens/StatistikScreen';
import TentangScreen from '../screens/TentangScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const TopTab = createMaterialTopTabNavigator();

export default function ButtonTabNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF7043',
        tabBarInactiveTintColor: '#757575',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF7043',
          height: 3,
        },
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
          minWidth: 90,
        },
      }}
    >
      <TopTab.Screen
        name="Beranda"
        component={BerandaScreen}
        options={{
          title: '🏠 Beranda',
        }}
      />
      <TopTab.Screen
        name="Produk"
        component={HomeScreen}
        options={{
          title: '🛍️ Produk',
        }}
      />
      <TopTab.Screen
        name="Statistik"
        component={StatistikScreen}
        options={{
          title: '📊 Statistik',
        }}
      />
      <TopTab.Screen
        name="Tentang"
        component={TentangScreen}
        options={{
                 title: 'ℹ️ Tentang',
        }}
      />
    </TopTab.Navigator>
  );
}