import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

export interface SensorReading {
  id: string;
  device_id: string;
  temperature?: number;
  humidity?: number;
  weight?: number;
  created_at: string;
}

interface UseSensorReadingsOptions {
  deviceId?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
}

export const useSensorReadings = ({
  deviceId,
  start_date,
  end_date,
  limit = 100,
}: UseSensorReadingsOptions) => {
  return useQuery<SensorReading[]>({
    queryKey: ['sensorReadings', deviceId, start_date, end_date],
    enabled: Boolean(deviceId),
    queryFn: async () => {
      if (!deviceId) return [];

      return apiService.getSensorReadings(deviceId, {
        start_date,
        end_date,
        limit,
      });
    },
    staleTime: 10_000,
    refetchInterval: 15_000,
  });
};
