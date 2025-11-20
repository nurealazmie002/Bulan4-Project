import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductListCategory from '../components/ProductListCategory';

const Tab = createMaterialTopTabNavigator();

export default function ProdukScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF7043', 
        tabBarInactiveTintColor: '#757575', 
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          textTransform: 'capitalize', 
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF7043', 
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          elevation: 4, 
          shadowOpacity: 0.1,
        },
        tabBarScrollEnabled: true, 
        tabBarItemStyle: { width: 120 }, 
      }}
    >
      <Tab.Screen name="Semua">
        {() => <ProductListCategory category="all" />}
      </Tab.Screen>

      <Tab.Screen name="HP">
        {() => <ProductListCategory category="smartphones" />}
      </Tab.Screen>

      <Tab.Screen name="Laptop">
        {() => <ProductListCategory category="laptops" />}
      </Tab.Screen>

      <Tab.Screen name="Parfum">
        {() => <ProductListCategory category="fragrances" />}
      </Tab.Screen>
      
      <Tab.Screen name="Skincare">
        {() => <ProductListCategory category="skincare" />}
      </Tab.Screen>

       <Tab.Screen name="Sembako">
        {() => <ProductListCategory category="groceries" />}
      </Tab.Screen>

    </Tab.Navigator>
  );
}