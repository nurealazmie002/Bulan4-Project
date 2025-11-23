import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import ErrorBoundary from './src/components/ErrorBoundary';
import OfflineBanner from './src/components/OfflineBanner';
import MainStack from './src/navigation/MainStack';
import CustomDrawer from './src/navigation/CustomDrawer';
import LoginAPIScreen from './src/screens/LoginAPIScreen';
import FavoriteProductsScreen from './src/screens/FavoriteProductScreen'; 
import linking from './src/utils/linking';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { CartProvider } from './src/context/CartContext';
import { NetworkProvider } from './src/context/NetworkContext';
import UploadScreen from './src/screens/UploadScreen';
enableScreens();

const Drawer = createDrawerNavigator();

function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FF7043" />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          isAuthenticated={isAuthenticated}
        />
      )}
      screenOptions={{
        headerShown: false,
        swipeEnabled: isAuthenticated,
        drawerStyle: { width: 280 },
        drawerActiveTintColor: '#FF7043',
        drawerInactiveTintColor: '#333',
      }}
    >
      {!isAuthenticated ? (
        <Drawer.Screen
          name="LoginAPI"
          component={LoginAPIScreen}
          options={{
            title: 'Login',
            drawerItemStyle: { display: 'none' }, 
          }}
        />
      ) : (
        <>
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

          <Drawer.Screen
            name="Favorites"
            component={FavoriteProductsScreen}
            options={{ 
              title: 'Produk Favorit',
              headerShown: true, 
              headerStyle: { backgroundColor: '#FF7043' },
              headerTintColor: '#fff',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="heart" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Upload"
            component={UploadScreen}
            options={{ 
              title: 'Upload Foto', 
              headerShown: true,   
              headerStyle: { backgroundColor: '#FF7043' },
              headerTintColor: '#fff',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="cloud-upload" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <NetworkProvider>
                <SafeAreaProvider>
                  <NavigationContainer 
                    linking={linking}
                    fallback={
                      <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#FF7043" />
                        <Text style={styles.loadingText}>Memproses Tautan...</Text>
                      </View>
                    }
                  >
                    <OfflineBanner />
                    <AppNavigator />
                  </NavigationContainer>
                </SafeAreaProvider>
            </NetworkProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  }
});