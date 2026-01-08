import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { ConsumptionEvent } from '@shared/schema';

export const useConsumptionEvents = (deviceId: number, params?: { startDate?: string; endDate?: string; limit?: number }) => {
  return useQuery<ConsumptionEvent[], Error>({
    queryKey: ['consumptionEvents', deviceId, params],
    queryFn: () => {
      if (!deviceId) {
        return Promise.resolve([]);
      }
      return apiService.getConsumptionEvents(deviceId, params);
    },
    enabled: !!deviceId,
  });
};