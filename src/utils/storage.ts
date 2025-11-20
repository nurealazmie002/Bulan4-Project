import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveTokenSecure, getTokenSecure, resetTokenSecure } from './keychain';

const KEYS = {
  THEME: '@theme',
  CART: '@cart',
  WISHLIST: '@wishlist',
  WISHLIST_META: '@wishlist_meta',
  TOKEN_META: '@token_meta', 
  CACHE_PREFIX: '@cache_prod_',
};

interface CachePayload {
  value: any;
  expiry: number;
}

const safeJsonParse = <T>(jsonString: string | null, fallback: T): T => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('⚠️ Storage Corrupt Detected. Returning fallback.', error);
    return fallback;
  }
};

export const saveTokenMeta = async (expiredAt: number) => {
  await AsyncStorage.setItem(KEYS.TOKEN_META, JSON.stringify({ expiredAt }));
};

export const checkTokenExpiry = async (): Promise<boolean> => {
  const json = await AsyncStorage.getItem(KEYS.TOKEN_META);
  const meta = safeJsonParse(json, { expiredAt: 0 });
  if (meta.expiredAt === 0) return false; 
  return Date.now() > meta.expiredAt;
};

export const saveWishlist = async (ids: string[], count: number) => {
  const data = JSON.stringify(ids);
  const meta = JSON.stringify({ count, updatedAt: Date.now() });
  await AsyncStorage.multiSet([[KEYS.WISHLIST, data], [KEYS.WISHLIST_META, meta]]);
};

export const getWishlist = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(KEYS.WISHLIST);
  return safeJsonParse(json, []);
};

export const cacheProduct = async (id: string, data: any, ttlMs: number = 300000) => {
  const payload: CachePayload = {
    value: data,
    expiry: Date.now() + ttlMs
  };
  await AsyncStorage.setItem(`${KEYS.CACHE_PREFIX}${id}`, JSON.stringify(payload));
};

export const getCachedProduct = async (id: string) => {
  const cacheKey = `${KEYS.CACHE_PREFIX}${id}`;
  const json = await AsyncStorage.getItem(cacheKey);
  
  const cached = safeJsonParse<CachePayload | null>(json, null);

  if (!cached) return null;

  if (Date.now() > cached.expiry) {
    console.log(`Cache expired for product ${id}`);
    AsyncStorage.removeItem(cacheKey); 
    return null;
  }

  console.log(`Serving from cache: Product ${id}`);
  return cached.value;
};

export const logoutTotal = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keysRemove = keys.filter(k => k !== KEYS.THEME);
    await AsyncStorage.multiRemove(keysRemove);
    await resetTokenSecure();
    console.log('Storage Cleared');
  } catch (e) { console.error(e); }
};

export const loadAppData = async () => {
  try {
    const [token, isExpired, cartJson, wishlistJson] = await Promise.all([
      getTokenSecure(),
      checkTokenExpiry(),
      AsyncStorage.getItem(KEYS.CART),
      AsyncStorage.getItem(KEYS.WISHLIST),
    ]);

    return {
      token: isExpired ? null : token,
      isExpired,
      cart: safeJsonParse(cartJson, []),
      wishlist: safeJsonParse(wishlistJson, [])
    };
  } catch (error) {
    console.error('Load failed', error);
    return { token: null, isExpired: false, cart: [], wishlist: [] };
  }
};

export const saveCart = async (cart: any) => AsyncStorage.setItem(KEYS.CART, JSON.stringify(cart));
export const getCart = async () => safeJsonParse(await AsyncStorage.getItem(KEYS.CART), []);