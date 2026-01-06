import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add request interceptors for auth tokens if needed
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // Or wherever you store your token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export const apiService = {
  // Example: Fetch historical sensor data for a device
  getSensorReadings: async (deviceId: string, params?: { startDate?: string; endDate?: string; limit?: number }) => {
    try {
      const response = await apiClient.get(`/api/devices/${deviceId}/sensors`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor readings:', error);
      throw error;
    }
  },

  // Example: Fetch historical device health data
  getDeviceHealth: async (deviceId: string, params?: { startDate?: string; endDate?: string; limit?: number }) => {
    try {
      const response = await apiClient.get(`/api/devices/${deviceId}/health`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching device health:', error);
      throw error;
    }
  },

  // Add more API calls as needed
  // getUserProfile: async (userId: string) => { /* ... */ },
  // updateDeviceConfig: async (deviceId: string, config: object) => { /* ... */ },
};
