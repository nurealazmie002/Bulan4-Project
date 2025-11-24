import * as Keychain from 'react-native-keychain';

const SERVICES = {
  USER_TOKEN: 'com.ecom:userToken', 
  API_KEY: 'com.ecom:apiKey',       
};


export const saveTokenSecure = async (token: string): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword('user_auth', token, {
      service: SERVICES.USER_TOKEN,
    });
    console.log('🔐 Token User tersimpan aman');
    return true;
  } catch (error) {
    console.error('Gagal simpan token user:', error);
    return false;
  }
};

export const getTokenSecure = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICES.USER_TOKEN,
    });
    
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Gagal ambil token user:', error);
    return null;
  }
};

export const resetTokenSecure = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICES.USER_TOKEN,
    });
    console.log('🗑️ Token User dihapus');
  } catch (error) {
    console.error('Gagal reset token user:', error);
  }
};


export const saveApiKey = async (apiKey: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('api_client', apiKey, {
      service: SERVICES.API_KEY,
    });
    console.log('🔑 API Key tersimpan');
  } catch (error) {
    console.error('Error saving API Key:', error);
  }
};

export const getApiKey = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICES.API_KEY,
    });
    
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.error('Error loading API Key:', error);
    return null;
  }
};

export const resetApiKey = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICES.API_KEY,
    });
    console.log('API Key removed');
  } catch (error) {
    console.error('Error resetting API Key:', error);
  }
};