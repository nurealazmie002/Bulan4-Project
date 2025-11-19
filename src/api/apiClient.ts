import axios from 'axios';
import { getApiKey, saveApiKey } from '../utils/keychain';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 7000,
});

export const initApiKey = async () => {
  const existingKey = await getApiKey();
  
  if (!existingKey) {
    await saveApiKey('API_KEY_SECRET_XYZ');
    console.log('API Key initialized in Keychain');
  }
};

apiClient.interceptors.request.use(
  async (config) => {
    config.headers['X-Client-Platform'] = 'React-Native';
    
    const apiKey = await getApiKey();
    
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey;
      console.log('API Key added to request');
    } else {
      console.error('API Key not found in Keychain');
      return Promise.reject({
        response: {
          status: 401,
          data: { message: 'API Key not found' },
        },
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.config.url?.includes('/auth/login')) {
      return {
        ...response,
        data: { success: true, token: response.data.token || 'simulated_token_xyz' },
      };
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;