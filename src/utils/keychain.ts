import * as Keychain from 'react-native-keychain';

const SERVICES = {
  USER_TOKEN: 'com.ecom:userToken',
  API_KEY: 'com.ecom:apiKey',
};

export const saveTokenSecure = async (token: string): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword('user', token, {
      service: SERVICES.USER_TOKEN,
    });
    console.log('Token saved to Keychain');
    return true;
  } catch (error) {
    console.error('Error saving token to Keychain:', error);
    return false;
  }
};

export const getTokenSecure = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICES.USER_TOKEN,
    });
    
    if (credentials) {
      console.log('Token loaded from Keychain');
      return credentials.password;
    }
    
    console.log('No token found in Keychain');
    return null;
  } catch (error: any) {
    console.error('Error loading token from Keychain:', error);
    
    if (error.message?.includes('access denied')) {
      await resetTokenSecure();
      throw new Error('SECURITY_CHANGED');
    }
    
    return null;
  }
};

export const resetTokenSecure = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICES.USER_TOKEN,
    });
    console.log('Token removed from Keychain');
  } catch (error) {
    console.error('Error resetting token:', error);
  }
};

export const saveApiKey = async (apiKey: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('api_client', apiKey, {
      service: SERVICES.API_KEY,
    });
    console.log('API Key saved to Keychain');
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