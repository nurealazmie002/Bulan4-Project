import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import CustomDrawer from './src/navigation/CustomDrawer';
import FontAwesome from '@react-native-vector-icons/fontawesome';

enableScreens();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            swipeEnabled: true,
            drawerStyle: {
              width: 280,
            },
          }}
        >
          <Drawer.Screen
            name="Main"
            component={MainStack}
            options={{
              title: 'Halaman Utama',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="comments" size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
