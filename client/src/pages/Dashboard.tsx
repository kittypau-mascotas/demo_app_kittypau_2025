import StatWidget from '@/components/StatWidget';
import DeviceCard from '@/components/DeviceCard';
import ActivityChart from '@/components/ActivityChart';
import ConsumptionChart from '@/components/ConsumptionChart';
import PetAvatar from '@/components/PetAvatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Home, AlertTriangle, Heart, Fish, Droplets } from 'lucide-react';
import { usePets } from '@/hooks/data/usePets';
import { useDevices } from '@/hooks/data/useDevices';
import { useSensorReadings } from '@/hooks/data/useSensorReadings'; // Import useSensorReadings
import { Skeleton } from '@/components/ui/skeleton';
import { SensorReading, Device } from '@shared/schema';
import { useMemo } from 'react';

// Helper to transform raw consumption events into chart-friendly format for ConsumptionChart
interface ChartData {
  name: string; // Day of the week or date
  [deviceName: string]: number | string; // Dynamic keys for device consumption
}
const transformConsumptionData = (events: any[], devices: Device[], timeRange: string): ChartData[] => { // Cambiar a any[]
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
    } else { // 'year' or default
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

// Helper to transform sensor readings for ActivityChart
const transformSensorDataForActivityChart = (readings: any[], timeRange: string): ChartData[] => {
  if (!readings || readings.length === 0) return [];

  const dailyActivity = new Map<string, number>();

  readings.forEach((readingItem: any) => { // Cambiar a any para el elemento
    const reading = readingItem as SensorReading; // Forzar el tipo aquí
    const date = new Date(reading.ts); // Usar reading.ts
    let dayKey: string;

    if (timeRange === 'day') {
      dayKey = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === 'week' || timeRange === 'month') {
      dayKey = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
    } else { // 'year' or default
      dayKey = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    }

    // For activity, we can count events or sum a specific value if available
    // For now, let's just count readings as "activity"
    if (!dailyActivity.has(dayKey)) {
      dailyActivity.set(dayKey, 0);
    }
    dailyActivity.set(dayKey, dailyActivity.get(dayKey)! + 1);
  });

  const result: ChartData[] = [];
  dailyActivity.forEach((value, dayKey) => {
    result.push({ name: dayKey, Activity: value }); // Assuming 'Activity' is the dataKey
  });

  return result.sort((a,b) => a.name.localeCompare(b.name));
};


export default function Dashboard() {
  const { data: pets, isLoading: isLoadingPets, isError: isErrorPets } = usePets();
  const { data: devices, isLoading: isLoadingDevices, isError: isErrorDevices } = useDevices();
  
  const firstDeviceId = devices && devices.length > 0 ? devices[0].deviceId : undefined;

  const { data: sensorReadings, isLoading: isLoadingSensorReadings, isError: isErrorSensorReadings } = useSensorReadings({ deviceId: firstDeviceId }); // Modificar el parámetro

  // Aggregate data for StatWidgets
  const totalActivePets = pets?.length || 0;
  const totalMealsToday = 0; // Poner un valor por defecto o calcular de otra forma
  
  const averageWaterLevel = useMemo(() => {
    // Assuming a 'water' sensor type and averaging its last values
    const waterReadings = sensorReadings?.filter(reading => (reading as unknown as SensorReading).humidityPercent !== null && (reading as unknown as SensorReading).humidityPercent !== undefined); // Filtrar por humedad
    if (waterReadings && waterReadings.length > 0) {
      // Sumar los valores de humedad (recordar que son strings)
      const sum = waterReadings.reduce((acc, curr) => acc + parseFloat((curr as unknown as SensorReading).humidityPercent || '0'), 0);
      return `${(sum / waterReadings.length).toFixed(1)}%`;
    }
    return "N/A";
  }, [sensorReadings]);
  
  // Placeholder for alerts
  const pendingAlerts = "N/A";

  // Transformed data for charts
  const timeRange = 'week'; // Default for dashboard charts
  const consumptionChartData = useMemo(() => transformConsumptionData([], devices || [], timeRange), [devices, timeRange]); // Pasar array vacío
  const activityChartData = useMemo(() => transformSensorDataForActivityChart(sensorReadings || [] as unknown as SensorReading[], timeRange), [sensorReadings, timeRange]);


  if (isLoadingPets || isLoadingDevices || isLoadingSensorReadings) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  if (isErrorPets || isErrorDevices || isErrorSensorReadings) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto text-red-500">
        <h2 className="text-4xl font-bold titulo">Dashboard</h2>
        <p className="text-lg">Error al cargar datos del dashboard. Inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold titulo">Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Resumen del estado de tus mascotas
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatWidget
          title="Mascotas Activas"
          value={totalActivePets.toString()}
          description="Todas saludables"
          icon={Heart}
          variant="info"
        />
        <StatWidget
          title="Comidas Hoy"
          value={totalMealsToday.toString()}
          description="Consumos registrados hoy"
          icon={Fish}
          variant="data"
        />
        <StatWidget
          title="Nivel Promedio Agua"
          value={averageWaterLevel}
          description="Última lectura del sensor"
          icon={Droplets}
          variant="info"
        />
        <StatWidget
          title="Alertas Pendientes"
          value={pendingAlerts}
          description="Datos no disponibles"
          icon={AlertTriangle}
          variant="device"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Tus Mascotas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {pets?.map((pet) => (
            <Card key={pet.id} className="card-info border-0 hover-elevate">
              <CardHeader className="flex flex-col items-center text-center">
                <PetAvatar name={pet.name} imageUrl={'/placeholder-pet.png'} size="responsive" />
                <div className="mt-4">
                  <CardTitle>{pet.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{pet.species || 'Desconocida'}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Última actividad:</span>
                  <span className="text-sm font-semibold">N/A</span> {/* Placeholder */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Fish className="h-4 w-4" /> Comida:
                  </span>
                  <span className="text-sm font-semibold">N/A</span> {/* Placeholder */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Droplets className="h-4 w-4" /> Agua:
                  </span>
                  <span className="text-sm font-semibold">N/A</span> {/* Placeholder */}
                </div>
              </CardContent>
            </Card>
          ))}
          {pets?.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center">No tienes mascotas registradas.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={activityChartData} />
        <ConsumptionChart data={consumptionChartData} />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Dispositivos Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {devices?.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              type={device.deviceType || 'Dispositivo'} // Modificado a device.deviceType
              status={device.status as any} // Cast status as it's a string, DeviceCard expects specific literals
              lastUpdate={device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'N/A'} // Modificado a device.lastSeen
              batteryLevel={0} // Asumiendo que no hay batteryLevel, ponemos 0
              // imageUrl={device.imageUrl} // Assuming Device has an imageUrl
            />
          ))}
          {devices?.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center">No tienes dispositivos registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}