import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import BerandaScreen from '../screens/BerandaScreen';
import ProdukScreen from '../screens/ProdukScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductListAPIScreen from '../screens/ProductListAPIScreen';
import CartScreen from '../screens/CartScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';
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
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="shopping-cart" size={size} color={color} />
              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: 'Keranjang',
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
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});