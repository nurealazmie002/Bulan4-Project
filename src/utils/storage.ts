import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TOKEN: '@auth_token',
  USER: '@user_data',
  THEME: '@theme',
  NOTIFICATIONS: '@notifications',
  CART: '@cart',
};

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
    console.log('💾 Token saved');
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(KEYS.TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
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

export const logout = async () => {
  try {
    const keysToRemove = [KEYS.TOKEN, KEYS.USER, KEYS.CART];
    await AsyncStorage.multiRemove(keysToRemove);
    console.log('🗑️ All sensitive data removed');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};