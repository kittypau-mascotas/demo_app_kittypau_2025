import { useQuery } from '@tanstack/react-query';
import { Device } from '@shared/schema';

const fetchDeviceById = async (deviceId: number): Promise<Device> => {
  const response = await fetch(`/api/devices/${deviceId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch device');
  }
  return response.json();
};

export const useDevice = (deviceId: number | null) => {
  return useQuery<Device, Error>({
    queryKey: ['device', deviceId],
    queryFn: () => fetchDeviceById(deviceId as number),
    enabled: deviceId !== null, // Only run the query if deviceId is not null
  });
};
