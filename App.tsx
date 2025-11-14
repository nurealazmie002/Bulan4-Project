import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import CustomDrawer from './src/navigation/CustomDrawer';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import LoginScreen from './src/screens/LoginScreen';
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
          <Drawer.Screen name="Login" component={LoginScreen} options={{ swipeEnabled: false }} />
          <Drawer.Screen name="beranda" component={MainStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
