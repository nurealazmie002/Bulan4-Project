import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveTokenSecure, getTokenSecure, resetTokenSecure } from './keychain';

const KEYS = {
  THEME: '@theme',
  NOTIFICATIONS: '@notifications',
  CART: '@cart',
  USER: '@user_data',
};

export const loadAppData = async () => {
  try {
    const [token, theme, notifications] = await Promise.all([
      getTokenSecure(), 
      AsyncStorage.getItem(KEYS.THEME), 
      AsyncStorage.getItem(KEYS.NOTIFICATIONS),
    ]);

    console.log('📦 App data loaded:', {
      hasToken: !!token,
      theme,
      notifications,
    });

    return {
      token,
      theme: theme || 'light',
      notifications: notifications || 'enabled',
    };
  } catch (error: any) {
    console.error('❌ Error loading app data:', error);
    
    if (error.message === 'SECURITY_CHANGED') {
      throw error;
    }
    
    return {
      token: null,
      theme: 'light',
      notifications: 'enabled',
    };
  }
};

export const saveTheme = async (theme: string) => {
  try {
    await AsyncStorage.setItem(KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const saveCart = async (cart: any[]) => {
  try {
    const cartString = JSON.stringify(cart);
    await AsyncStorage.setItem(KEYS.CART, cartString);
  } catch (error: any) {
    console.error('Error saving cart:', error);
  }
};

export const getCart = async (): Promise<any[]> => {
  try {
    const cartString = await AsyncStorage.getItem(KEYS.CART);
    return cartString ? JSON.parse(cartString) : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const mergeCartItem = async (itemId: string, quantity: number) => {
  try {
    const cartString = await AsyncStorage.getItem(KEYS.CART);
    const cart = cartString ? JSON.parse(cartString) : [];
    
    const existingIndex = cart.findIndex((item: any) => item.id === itemId);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity = quantity;
    }
    
    await saveCart(cart);
  } catch (error) {
    console.error('Error merging cart item:', error);
  }
};

export const logoutTotal = async () => {
  try {
    const keysToRemove = [KEYS.CART, KEYS.USER];
    await AsyncStorage.multiRemove(keysToRemove);
    
    await resetTokenSecure();
    
    console.log('✅ All secure data cleared');
  } catch (error) {
    console.error('❌ Error during logout:', error);
  }
};