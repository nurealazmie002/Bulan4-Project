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
            <View>
              <FontAwesome name="shopping-cart" size={size} color={color} />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalItems}</Text>
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
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});