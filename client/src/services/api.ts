import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // NECESARIO para Neon Auth (cookies)
});

// Manejo global de 401 (sesión expirada)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Sesión expirada. Redirigiendo a login.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  /* ======================
     🐾 PETS
     ====================== */
  getPets: async () => {
    const { data } = await apiClient.get('/api/pets');
    return data;
  },

  getPet: async (id: number) => {
    const { data } = await apiClient.get(`/api/pets/${id}`);
    return data;
  },

  /* ======================
     📟 DEVICES
     ====================== */
  getDevices: async () => {
    const { data } = await apiClient.get('/api/devices');
    return data;
  },

  getDevice: async (id: number) => {
    const { data } = await apiClient.get(`/api/devices/${id}`);
    return data;
  },

  /* ======================
     📡 IOT – SENSOR READINGS
     ====================== */
  getSensorReadings: async (
    deviceId: string,
    params?: {
      start_date?: string;
      end_date?: string;
      limit?: number;
    }
  ) => {
    try {
      const { data } = await apiClient.get(
        `/api/devices/${deviceId}/readings`,
        { params }
      );
      return data;
    } catch (error) {
      console.error('[API] Error fetching sensor readings', error);
      throw error;
    }
  },

  /* ======================
     ⚡ IOT – EVENTS
     ====================== */
  getDeviceEvents: async (
    deviceId: string,
    params?: {
      start_date?: string;
      end_date?: string;
      limit?: number;
    }
  ) => {
    try {
      const { data } = await apiClient.get(
        `/api/devices/${deviceId}/events`,
        { params }
      );
      return data;
    } catch (error) {
      console.error('[API] Error fetching device events', error);
      throw error;
    }
  },
};
