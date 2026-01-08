import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Pet } from '@shared/schema'; // Import the Pet type from shared schema

export const usePets = () => {
  const { user } = useAuth();
  const householdId = user?.householdId;

  return useQuery<Pet[], Error>({
    queryKey: ['pets', householdId],
    queryFn: () => {
      if (!householdId) {
        // Return an empty array or throw an error if householdId is not available
        // React Query's `enabled` option can also prevent this query from running
        return Promise.resolve([]);
      }
      return apiService.getPets(householdId);
    },
    enabled: !!householdId, // Only run the query if householdId is available
  });
};