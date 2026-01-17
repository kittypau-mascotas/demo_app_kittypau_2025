import { useQuery } from '@tanstack/react-query';
import { SensorReading, Device } from '@shared/schema';

interface PetSensorReadings {
    sensorReadings: SensorReading[];
    devices: Device[]; // Needed for chart transformations
}

const fetchPetSensorReadings = async (petId: number): Promise<PetSensorReadings> => {
  const response = await fetch(`/api/pets/${petId}/sensor-readings`, { // Assuming this endpoint
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pet sensor readings');
  }
  return response.json();
};

export const usePetSensorReadings = (petId: number | null) => {
  return useQuery<PetSensorReadings, Error>({
    queryKey: ['petSensorReadings', petId],
    queryFn: () => fetchPetSensorReadings(petId as number),
    enabled: petId !== null, // Only run the query if petId is not null
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 15 * 1000, // Refresh every 15 seconds
  });
};
