import DeviceStatus from '@/components/DeviceStatus';
import { useDevices } from '@/hooks/data/useDevices'; // Import useDevices
import { useSensorReadings } from '@/hooks/data/useSensorReadings'; // Import useSensorReadings
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state
import { Device, SensorReading } from '@shared/schema';
import { useMemo } from 'react'; // Import useMemo

interface DeviceStatusPropsTransformed {
  deviceName: string;
  temperature?: number;
  humidity?: number;
  battery?: number;
  lastUpdate: string;
}

const transformSensorData = (devices: Device[], allSensorReadings: any[]): DeviceStatusPropsTransformed[] => {
  if (!devices || devices.length === 0) return [];

  const deviceLatestReadings: { [deviceId: string]: { // deviceId es string
    temperatureCelsius?: string | null,
    humidityPercent?: string | null,
    lightLux?: number | null,
    weightGrams?: string | null,
    lastUpdate: Date,
  }} = {};

  // Group and find latest reading for each type and device
  allSensorReadings.forEach((readingItem: any) => { // Cambiar a any para el elemento
    const reading = readingItem as SensorReading; // Forzar el tipo aquí
    const deviceId = reading.deviceId; // deviceId es string
    const readingTimestamp = new Date(reading.ts);

    if (!deviceLatestReadings[deviceId]) {
      deviceLatestReadings[deviceId] = { lastUpdate: new Date(0) }; // Initialize with a very old date
    }

    // Update if this reading is newer
    if (readingTimestamp > deviceLatestReadings[deviceId].lastUpdate) {
      deviceLatestReadings[deviceId] = {
        lastUpdate: readingTimestamp,
        temperatureCelsius: reading.temperatureCelsius,
        humidityPercent: reading.humidityPercent,
        lightLux: reading.lightLux,
        weightGrams: reading.weightGrams,
      };
    }
  });

  return devices.map(device => {
    const latest = deviceLatestReadings[device.deviceId]; // Usar device.deviceId
    return {
      deviceName: device.name,
      temperature: latest?.temperatureCelsius ? parseFloat(latest.temperatureCelsius) : undefined,
      humidity: latest?.humidityPercent ? parseFloat(latest.humidityPercent) : undefined,
      lastUpdate: latest ? latest.lastUpdate.toLocaleString() : 'N/A',
      battery: undefined, // No tenemos batteryLevel en el esquema, se puede dejar como undefined o 0
    };
  });
};


export default function Sensors() {
  const { data: devices, isLoading: isLoadingDevices, isError: isErrorDevices } = useDevices();
  const firstDeviceId = devices && devices.length > 0 ? devices[0].deviceId : undefined; // Usar deviceId (string)

  // For this simplified example, we'll fetch all sensor readings for the first device
  // In a real app, you'd fetch for all devices in the household or specific ones.
  const { data: sensorReadings, isLoading: isLoadingSensorReadings, isError: isErrorSensorReadings } = useSensorReadings({ deviceId: firstDeviceId });

  const transformedSensorData = useMemo(() => transformSensorData(devices || [], sensorReadings || [] as unknown as SensorReading[]), [devices, sensorReadings]);

  if (isLoadingDevices || isLoadingSensorReadings) {
    return (
      <div className="space-y-6" data-testid="page-sensors">
        <Skeleton className="h-10 w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[150px]" />
        </div>
      </div>
    );
  }

  if (isErrorDevices || isErrorSensorReadings) {
    return (
      <div className="space-y-6 text-red-500" data-testid="page-sensors">
        <h1 className="titulo text-3xl">Sensores</h1>
        <p>Error al cargar los datos de los sensores.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="page-sensors">
      <h1 className="titulo text-3xl">Sensores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transformedSensorData.map((sensor) => (
          <DeviceStatus key={sensor.deviceName} {...sensor} />
        ))}
        {transformedSensorData.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center">No hay datos de sensores disponibles.</p>
        )}
      </div>
    </div>
  );
}
