import ConsumptionChart from '@/components/ConsumptionChart';
import DurationChart from '@/components/DurationChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { useDevices } from '@/hooks/data/useDevices';
import { useConsumptionEvents } from '@/hooks/data/useConsumptionEvents';
import { Skeleton } from '@/components/ui/skeleton';
import { ConsumptionEvent, Device } from '@shared/schema';

interface ChartData {
  name: string; // Day of the week or date
  [deviceName: string]: number | string; // Dynamic keys for device consumption
}

// Helper to transform raw consumption events into chart-friendly format for ConsumptionChart
const transformConsumptionData = (events: ConsumptionEvent[], devices: Device[], timeRange: string): ChartData[] => {
  if (!events || events.length === 0 || !devices || devices.length === 0) {
    return [];
  }

  const deviceMap = new Map<number, string>();
  devices.forEach(device => deviceMap.set(device.id as number, device.name));

  const dailyConsumption = new Map<string, { [deviceName: string]: number }>();

  events.forEach(event => {
    const date = new Date(event.timestamp);
    let dayKey: string;

    if (timeRange === 'day') {
      dayKey = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === 'week' || timeRange === 'month') {
      dayKey = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    } else {
      dayKey = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }

    if (!dailyConsumption.has(dayKey)) {
      dailyConsumption.set(dayKey, {});
    }
    const consumptionForDay = dailyConsumption.get(dayKey)!;
    const deviceName = deviceMap.get(event.deviceId) || `Device ${event.deviceId}`;

    if (!consumptionForDay[deviceName]) {
      consumptionForDay[deviceName] = 0;
    }
    consumptionForDay[deviceName] += event.amountGrams;
  });

  const result: ChartData[] = [];
  dailyConsumption.forEach((values, dayKey) => {
    result.push({ name: dayKey, ...values });
  });

  return result.sort((a,b) => a.name.localeCompare(b.name));
};

// Helper to transform aggregated chart data for DurationChart
const transformForDurationChart = (chartData: ChartData[]): { name: string; value: number }[] => {
  if (!chartData || chartData.length === 0) {
    return [];
  }

  return chartData.map(item => {
    let totalConsumption = 0;
    for (const key in item) {
      if (key !== 'name' && typeof item[key] === 'number') {
        totalConsumption += item[key] as number;
      }
    }
    return { name: item.name as string, value: totalConsumption };
  });
};


export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  const { data: devices, isLoading: isLoadingDevices, isError: isErrorDevices } = useDevices();
  const deviceIds = useMemo(() => devices?.map(d => d.id as number) || [], [devices]);
  const firstDeviceId = deviceIds.length > 0 ? deviceIds[0] : undefined;

  const { data: consumptionEvents, isLoading: isLoadingConsumptionEvents, isError: isErrorConsumptionEvents } = useConsumptionEvents(firstDeviceId as number, { /* params for date range based on timeRange state */ });

  const chartData = useMemo(() => transformConsumptionData(consumptionEvents || [], devices || [], timeRange), [consumptionEvents, devices, timeRange]);
  const durationChartData = useMemo(() => transformForDurationChart(chartData), [chartData]);

  if (isLoadingDevices || isLoadingConsumptionEvents) {
    return (
      <div className="space-y-6" data-testid="page-analytics">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <Skeleton className="h-[300px]" />
      </div>
    );
  }

  if (isErrorDevices || isErrorConsumptionEvents) {
    return (
      <div className="space-y-6 text-red-500" data-testid="page-analytics">
        <h1 className="titulo text-3xl">Analíticas</h1>
        <p>Error al cargar los datos de analíticas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="page-analytics">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Analíticas</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]" data-testid="select-time-range">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hoy</SelectItem>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mes</SelectItem>
            <SelectItem value="year">Este Año</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConsumptionChart data={chartData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DurationChart data={durationChartData} />
      </div>
    </div>
  );
}
