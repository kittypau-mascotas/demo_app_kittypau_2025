import { useQuery } from '@tanstack/react-query';
import { Pet, Device, SensorReading } from '@shared/schema'; // Assuming these types exist

interface DashboardSummary {
  pets: Pet[];
  devices: Device[];
  kpis: {
    totalActivePets: number;
    totalMealsToday: number;
    averageWaterLevel: string;
    pendingAlerts: string;
  };
  sensorReadings: SensorReading[];
  lastUpdate: string; // Time of last data refresh
  heroCardStatus: 'ok' | 'warning' | 'alert' | 'loading'; // Overall status for the HeroCard
}

const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await fetch('/api/dashboard/summary', {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard summary');
  }
  return response.json();
};

export const useDashboardSummary = () => {
  return useQuery<DashboardSummary, Error>({
    queryKey: ['dashboardSummary'],
    queryFn: fetchDashboardSummary,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 15 * 1000, // Refresh every 15 seconds
    refetchOnWindowFocus: true,
  });
};