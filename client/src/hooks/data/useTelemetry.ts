import { useQuery } from '@tanstack/react-query';
import { SensorReading, Device } from '@shared/schema';

interface TelemetryFilters {
  petId?: number | null;
  deviceId?: number | null;
  timeRange?: '24h' | '7d' | '30d' | 'custom';
  metric?: 'activity' | 'consumption' | 'temperature' | 'humidity';
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
}

interface TelemetryData {
    sensorReadings: SensorReading[];
    devices: Device[]; // Devices related to the telemetry data fetched
}

const fetchTelemetry = async (filters: TelemetryFilters): Promise<TelemetryData> => {
  const params = new URLSearchParams();
  if (filters.petId) params.append('petId', filters.petId.toString());
  if (filters.deviceId) params.append('deviceId', filters.deviceId.toString());
  if (filters.timeRange) params.append('timeRange', filters.timeRange);
  if (filters.metric) params.append('metric', filters.metric);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);

  const response = await fetch(`/api/telemetry?${params.toString()}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch telemetry data');
  }
  return response.json();
};

export const useTelemetry = (filters: TelemetryFilters) => {
  return useQuery<TelemetryData, Error>({
    queryKey: ['telemetry', filters],
    queryFn: () => fetchTelemetry(filters),
    // Query is enabled only if there's enough info to make a meaningful query,
    // e.g., if a petId or deviceId is selected, or a valid time range is set.
    // For now, let's enable it by default and rely on filters.
    enabled: true, 
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 15 * 1000, // Refresh every 15 seconds
  });
};
