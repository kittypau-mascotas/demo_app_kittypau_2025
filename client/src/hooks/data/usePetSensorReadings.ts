import { useQuery } from '@tanstack/react-query';
import { SensorReading, Device } from '@shared/schema';

interface PetSensorReadings {
    sensorReadings: SensorReading[];
    devices: Device[]; // Needed for chart transformations
}

const fetchPetSensorReadings = async (petId: number, timeRange: string): Promise<PetSensorReadings> => {
  const params = new URLSearchParams();
  params.append('timeRange', timeRange);
  const response = await fetch(`/api/pets/${petId}/sensor-readings?${params.toString()}`, { // Assuming this endpoint
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pet sensor readings');
  }
  return response.json();
};

export const usePetSensorReadings = (petId: number | null, timeRange: '24h' | '7d' | '30d' | 'custom' = '7d') => {
  return useQuery<PetSensorReadings, Error>({
    queryKey: ['petSensorReadings', petId, timeRange],
    queryFn: () => fetchPetSensorReadings(petId as number, timeRange),
    enabled: petId !== null, // Only run the query if petId is not null
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 15 * 1000, // Refresh every 15 seconds
  });
};
