import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import ActivityChart from '@/components/ActivityChart'; // Ensure these are correctly imported
import ConsumptionChart from '@/components/ConsumptionChart'; // Ensure these are correctly imported
import { useTelemetry } from '@/hooks/data/useTelemetry';
import { usePets } from '@/hooks/data/usePets';
import { useDevices } from '@/hooks/data/useDevices';
import { Pet, Device, SensorReading } from '@shared/schema';

// Helper for data transformation (copied from Dashboard.tsx and adapted)
interface ChartData {
  name: string;
  [deviceName: string]: number | string;
}

const transformConsumptionData = (sensorReadings: SensorReading[], devices: Device[], timeRange: string): ChartData[] => {
  if (!sensorReadings || sensorReadings.length === 0 || !devices || devices.length === 0) {
    return [];
  }

  const deviceMap = new Map<string, string>();
  devices.forEach(device => deviceMap.set(device.deviceId, device.name));

  const dailyConsumption = new Map<string, { [deviceName: string]: number }>();

  sensorReadings.forEach(reading => {
    if (reading.weightGrams === null || reading.weightGrams === undefined) {
        return;
    }
    const date = new Date(reading.ts);
    let dayKey: string;

    if (timeRange === 'day') {
      dayKey = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === 'week' || timeRange === 'month') {
      dayKey = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    } else { // 'year' or default
      dayKey = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }

    if (!dailyConsumption.has(dayKey)) {
      dailyConsumption.set(dayKey, {});
    }
    const consumptionForDay = dailyConsumption.get(dayKey)!;
    const deviceName = deviceMap.get(reading.deviceId) || `Device ${reading.deviceId}`;

    if (!consumptionForDay[deviceName]) {
      consumptionForDay[deviceName] = 0;
    }
    consumptionForDay[deviceName] += parseFloat(reading.weightGrams as any);
  });

  const result: ChartData[] = [];
  dailyConsumption.forEach((values, dayKey) => {
    result.push({ name: dayKey, ...values });
  });

  return result.sort((a,b) => a.name.localeCompare(b.name));
};

const transformSensorDataForActivityChart = (sensorReadings: SensorReading[], timeRange: string): ChartData[] => {
  if (!sensorReadings || sensorReadings.length === 0) return [];

  const dailyActivity = new Map<string, number>();

  sensorReadings.forEach((reading: SensorReading) => {
    const date = new Date(reading.ts);
    let dayKey: string;

    if (timeRange === 'day') {
      dayKey = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === 'week' || timeRange === 'month') {
      dayKey = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    } else { // 'year' or default
      dayKey = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }

    if (!dailyActivity.has(dayKey)) {
      dailyActivity.set(dayKey, 0);
    }
    dailyActivity.set(dayKey, dailyActivity.get(dayKey)! + 1);
  });

  const result: ChartData[] = [];
  dailyActivity.forEach((value, dayKey) => {
    result.push({ name: dayKey, Activity: value });
  });

  return result.sort((a,b) => a.name.localeCompare(b.name));
};


export default function Sensors() {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d' | 'custom'>('7d');

  const { data: pets, isLoading: isLoadingPets } = usePets();
  const { data: devices, isLoading: isLoadingDevices } = useDevices();

  const { data: telemetryData, isLoading: isLoadingTelemetry, isError: isErrorTelemetry } = useTelemetry({
    petId: selectedPetId,
    deviceId: selectedDeviceId,
    timeRange: selectedTimeRange,
  });

  const allPets = pets || [];
  const allDevices = devices || [];
  const sensorReadings = telemetryData?.sensorReadings || [];
  const relatedDevices = telemetryData?.devices || [];

  const consumptionChartData = useMemo(() => transformConsumptionData(sensorReadings, relatedDevices, selectedTimeRange), [sensorReadings, relatedDevices, selectedTimeRange]);
  const activityChartData = useMemo(() => transformSensorDataForActivityChart(sensorReadings, selectedTimeRange), [sensorReadings, selectedTimeRange]);

  const petOptions = useMemo(() => allPets.map(pet => ({ value: pet.id.toString(), label: pet.name })), [allPets]);
  const deviceOptions = useMemo(() => allDevices.map(device => ({ value: device.id.toString(), label: device.name })), [allDevices]);

  if (isLoadingPets || isLoadingDevices || isLoadingTelemetry) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (isErrorTelemetry) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto text-red-500">
        <h2 className="text-4xl font-bold titulo">Sensores</h2>
        <p className="text-lg">Error al cargar datos de telemetría. Inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      <h2 className="text-4xl font-bold titulo">Análisis de Telemetría</h2>

      <div className="flex flex-wrap items-center gap-4">
        {/* Time Range Selector */}
        <Select value={selectedTimeRange} onValueChange={(value: '24h' | '7d' | '30d' | 'custom') => setSelectedTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rango de Tiempo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Últimas 24h</SelectItem>
            <SelectItem value="7d">Últimos 7 días</SelectItem>
            <SelectItem value="30d">Últimos 30 días</SelectItem>
            {/* <SelectItem value="custom">Rango Personalizado</SelectItem> */}
          </SelectContent>
        </Select>

        {/* Pet Filter */}
        <Select onValueChange={(value) => setSelectedPetId(parseInt(value))} value={selectedPetId?.toString() || ''}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Mascota" />
          </SelectTrigger>
          <SelectContent>
            {petOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Device Filter */}
        <Select onValueChange={(value) => setSelectedDeviceId(parseInt(value))} value={selectedDeviceId?.toString() || ''}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Dispositivo" />
          </SelectTrigger>
          <SelectContent>
            {deviceOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={activityChartData} title="Actividad" unit="eventos" />
        <ConsumptionChart data={consumptionChartData} title="Consumo" unit="g" />
        {/* Potentially add more charts for temperature, humidity etc. */}
        {/* <Card className="h-[400px]"><CardHeader><CardTitle>Temperatura</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Gráfica de temperatura aquí.</p></CardContent></Card> */}
        {/* <Card className="h-[400px]"><CardHeader><CardTitle>Humedad</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Gráfica de humedad aquí.</p></CardContent></Card> */}
      </div>
    </div>
  );
}