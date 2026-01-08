import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { SensorReading } from '@shared/schema';

// Fetch sensor readings for a specific device
const getSensorReadings = async (deviceId: number): Promise<SensorReading[]> => {
  // If deviceId is not valid, return empty array to avoid 404 errors in query
  if (!deviceId) return [];
  const response = await apiService.getSensorReadings(deviceId);
  return response;
};

export const useSensorReadings = (deviceId: number) => {
  return useQuery({
    queryKey: ['sensorReadings', deviceId],
    queryFn: () => getSensorReadings(deviceId),
    enabled: !!deviceId, // Only run the query if deviceId is available
  });
};
