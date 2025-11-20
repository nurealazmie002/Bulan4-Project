import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import BerandaScreen from '../screens/BerandaScreen';
import ProdukScreen from '../screens/ProdukScreen'; 
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useCart } from '../context/CartContext';

const BottomTab = createBottomTabNavigator();

export default function ButtonTabNavigator() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF7043',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { 
          backgroundColor: '#fff', 
          height: 60, 
          paddingBottom: 8, 
          paddingTop: 8,
          elevation: 8,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        headerShown: false, 
      }}
    >
      <BottomTab.Screen
        name="Beranda"
        component={BerandaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Produk"
        component={ProdukScreen}
        options={{
          tabBarLabel: 'Katalog',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="shopping-cart" size={size} color={color} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});