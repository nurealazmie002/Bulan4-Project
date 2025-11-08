import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const Tab = createBottomTabNavigator();

export default function ButtonTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor:"#FF7043", tabBarInactiveTintColor:"gray"}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color,}) => <FontAwesome name="home" size={20} color={color} /> }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color,}) => <FontAwesome name="user" size={20} color={color} /> }} />
    </Tab.Navigator>
  )
}
