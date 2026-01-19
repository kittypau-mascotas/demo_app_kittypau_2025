import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId'); 
  if (userId) {
    config.headers['x-user-id'] = userId;
  }
  return config;
});

export const authService = {
  register: async (data: any) => {
    const response = await api.post('/auth/register', data);
    if (response.data.user?.id) {
      localStorage.setItem('userId', response.data.user.id);
    }
    return response.data;
  },
  login: async (data: any) => {
    const response = await api.post('/auth/login', data);
    if (response.data.user?.id) {
      localStorage.setItem('userId', response.data.user.id);
    }
    return response.data;
  },
  resetPassword: async (data: any) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};

export const petsService = {
  getAll: async () => (await api.get('/pets')).data,
  create: async (data: any) => (await api.post('/pets', data)).data,
};

export const devicesService = {
  getAll: async () => (await api.get('/devices')).data,
  create: async (data: any) => (await api.post('/devices', data)).data,
};

export default api;