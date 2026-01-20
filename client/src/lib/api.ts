const BASE_URL = import.meta.env.VITE_API_URL || '';

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  photoUrl?: string;
  birthDate?: string;
  createdAt: string;
}

export interface Device {
  id: number;
  serialNumber: string;
  alias?: string;
  petId?: number | null;
  status: 'online' | 'offline';
  lastSeen?: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw new Error('Sesión expirada');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
  }

  if (response.status === 204) return null as T;

  return response.json();
}

export const api = {
  pets: {
    list: () => request<Pet[]>('/api/pets'),
    get: (id: number) => request<Pet>(`/api/pets/${id}`),
    create: (data: Omit<Pet, 'id' | 'createdAt'>) => 
      request<Pet>('/api/pets', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Pet>) => 
      request<Pet>(`/api/pets/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: number) => 
      request<void>(`/api/pets/${id}`, { method: 'DELETE' }),
    activate: (id: number) => 
      request<void>(`/api/pets/${id}/activate`, { method: 'POST', body: JSON.stringify({ activePetId: id }) }),
  },
  devices: {
    list: () => request<Device[]>('/api/devices'),
    link: (data: { serialNumber: string; alias?: string; petId?: number }) => 
      request<Device>('/api/devices/link', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<Device>) => 
      request<Device>(`/api/devices/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    unlink: (id: number) => 
      request<void>(`/api/devices/${id}`, { method: 'DELETE' }),
  },
  telemetry: {
    list: (deviceId: string, options?: { startDate?: string; endDate?: string; limit?: number }) => {
      const params = new URLSearchParams({ deviceId });
      if (options?.startDate) params.append('start_date', options.startDate);
      if (options?.endDate) params.append('end_date', options.endDate);
      if (options?.limit) params.append('limit', options.limit.toString());
      return request<any[]>(`/api/telemetry?${params.toString()}`);
    },
  },
};