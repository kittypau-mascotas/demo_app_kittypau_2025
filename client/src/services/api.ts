import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
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
  // --- Pet API Calls ---
  // Protected by requireNeonAuth
  getPets: async (householdId?: number) => {
    try {
      const response = await apiClient.get('/api/pets', {
        params: householdId ? { householdId } : {},
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  },

  getPet: async (id: number) => {
    try {
      const response = await apiClient.get(`/api/pets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pet with ID ${id}:`, error);
      throw error;
    }
  },

  // --- Device API Calls ---
  // Protected by requireNeonAuth
  getDevices: async (householdId?: number) => {
    try {
      const response = await apiClient.get('/api/devices', {
        params: householdId ? { householdId } : {},
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  },

  getDevice: async (id: number) => {
    try {
      const response = await apiClient.get(`/api/devices/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching device with ID ${id}:`, error);
      throw error;
    }
  },

  // --- Telemetry API Calls ---
  // Protected by requireNeonAuth
  getSensorReadings: async (deviceId: number, params?: { startDate?: string; endDate?: string; limit?: number }) => {
    try {
      const response = await apiClient.get('/api/sensor-readings', {
        params: { deviceId, ...params },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor readings:', error);
      throw error;
    }
  },

  getConsumptionEvents: async (deviceId: number, params?: { startDate?: string; endDate?: string; limit?: number }) => {
    try {
      const response = await apiClient.get('/api/consumption-events', {
        params: { deviceId, ...params },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching consumption events:', error);
      throw error;
    }
  },

  // Add more API calls as needed
  // getUserProfile: async (userId: string) => { /* ... */ },
  // updateDeviceConfig: async (deviceId: string, config: object) => { /* ... */ },
};
