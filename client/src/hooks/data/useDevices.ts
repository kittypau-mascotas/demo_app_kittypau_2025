import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Device } from '@shared/schema'; // Import the Device type from shared schema

export const useDevices = () => {
  const { user } = useAuth();
  const householdId = user?.householdId;

  return useQuery<Device[], Error>({
    queryKey: ['devices', householdId],
    queryFn: () => {
      if (!householdId) {
        return Promise.resolve([]);
      }
      return apiService.getDevices(householdId);
    },
    enabled: !!householdId, // Only run the query if householdId is available
  });
};
