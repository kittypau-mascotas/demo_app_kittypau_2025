export interface Device {
  id: string;
  name: string;
  deviceType: string;
  status: 'online' | 'offline' | 'error';
  lastSeen: string | null;
  batteryLevel?: number;
}
