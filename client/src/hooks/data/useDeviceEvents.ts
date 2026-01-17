import { useQuery } from '@tanstack/react-query';
import { DeviceEvent } from '@shared/schema';

const fetchDeviceEvents = async (deviceId: number): Promise<DeviceEvent[]> => {
  const response = await fetch(`/api/devices/${deviceId}/events`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch device events');
  }
  return response.json();
};

export const useDeviceEvents = (deviceId: number | null) => {
  return useQuery<DeviceEvent[], Error>({
    queryKey: ['deviceEvents', deviceId],
    queryFn: () => fetchDeviceEvents(deviceId as number),
    enabled: deviceId !== null, // Only run the query if deviceId is not null
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
};
