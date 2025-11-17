import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import MainStack from './src/navigation/MainStack';
import CustomDrawer from './src/navigation/CustomDrawer';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import LoginScreen from './src/screens/LoginScreen';
import LoginAPIScreen from './src/screens/LoginAPIScreen';
import { UserProvider } from './src/context/UserContext';
import { CartProvider } from './src/context/CartContext';
import { NetworkProvider } from './src/context/NetworkContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import OfflineBanner from './src/components/OfflineBanner';

enableScreens();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <CartProvider>
          <NetworkProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <OfflineBanner />
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
                    name="LoginAPI"
                    component={LoginAPIScreen}
                    options={{
                      title: 'Login API',
                      swipeEnabled: false,
                      drawerIcon: ({ color, size }) => (
                        <FontAwesome name="sign-in" size={size} color={color} />
                      ),
                    }}
                  />
                  <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                      title: 'Login Context',
                      swipeEnabled: false,
                      drawerIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                      ),
                    }}
                  />
                  <Drawer.Screen
                    name="Main"
                    component={MainStack}
                    options={{
                      title: 'Halaman Utama',
                      drawerIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                      ),
                    }}
                  />
                </Drawer.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </NetworkProvider>
        </CartProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}