import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    // TEMP: Allow login with test credentials for local testing
    if (
      credentials.email === 'test@example.com' &&
      credentials.password === 'test1234'
    ) {
      return {
        user: {
          id: 'test-user',
          name: 'Test User',
          email: 'test@example.com',
        },
        token: 'fake-jwt-token',
      };
    }
    // Otherwise, use the real API
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
