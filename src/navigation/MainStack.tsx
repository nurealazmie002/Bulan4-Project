import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { DrawerActions } from '@react-navigation/native';  
import ButtonTabNavigator from './ButtonTabNavigator';

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
          headerStyle: { backgroundColor: '#FF7043' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
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
    </Stack.Navigator>
  );
}
