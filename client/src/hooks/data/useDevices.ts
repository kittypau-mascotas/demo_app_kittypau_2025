import type { Device } from '@shared/types';

// Mock data para simular la respuesta de la API
const mockDevices: Device[] = [
  {
    id: 'KPCL0033',
    name: 'KPCL0033',
    deviceType: 'Feeder',
    status: 'online',
    lastSeen: new Date().toISOString(),
    batteryLevel: 85,
  },
  {
    id: 'KPCL0034',
    name: 'Mi Plato Gato 2',
    deviceType: 'Feeder',
    status: 'offline',
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    batteryLevel: 20,
  },
];


export function useDevices(): { data: Device[]; isLoading: boolean; isError: boolean } {
  // Aquí iría la lógica de fetching (p.ej. con SWR o React Query)
  // Por ahora, devolvemos datos mockeados.
  return { data: mockDevices, isLoading: false, isError: false };
}

