import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 7000,
});

apiClient.interceptors.request.use((config) => {
  config.headers['X-Client-Platform'] = 'React-Native';
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.config.url?.includes('/auth/login')) {
      return {
        ...response,
        data: { success: true, token: 'simulated_token_xyz' },
      };
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default apiClient;