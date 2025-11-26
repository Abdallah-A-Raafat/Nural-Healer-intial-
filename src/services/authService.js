import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    // TEMP: Allow login with test credentials for local testing
    // Patient test account
    if (
      credentials.email === 'patient@test.com' &&
      credentials.password === 'Patient123'
    ) {
      return {
        user: {
          id: 'patient-user-001',
          firstName: 'Sarah',
          lastName: 'Patient',
          email: 'patient@test.com',
          accountType: 'patient',
        },
        token: 'fake-jwt-token-patient',
        accountType: 'patient',
      };
    }
    // Doctor test account
    if (
      credentials.email === 'doctor@test.com' &&
      credentials.password === 'Doctor123'
    ) {
      return {
        user: {
          id: 'doctor-user-001',
          firstName: 'John',
          lastName: 'Doctor',
          email: 'doctor@test.com',
          accountType: 'doctor',
        },
        token: 'fake-jwt-token-doctor',
        accountType: 'doctor',
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
