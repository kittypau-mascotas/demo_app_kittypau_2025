import StatWidget from '@/components/StatWidget';
import DeviceCard from '@/components/DeviceCard';
import ActivityChart from '@/components/ActivityChart';
import ConsumptionChart from '@/components/ConsumptionChart';
import PetAvatar from '@/components/PetAvatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Home, AlertTriangle, Heart, Fish, Droplets, LogOut, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { SensorReading, Device, Pet } from '@shared/schema'; // Keep Pet, Device, SensorReading types
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import HeroCard from '@/components/HeroCard'; // Import HeroCard
import AddPetModal from '@/components/AddPetModal';
import LinkDeviceModal from '@/components/LinkDeviceModal';
import { useDashboardSummary } from '@/hooks/useDashboardSummary'; // Import the new hook

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
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showLinkDeviceModal, setShowLinkDeviceModal] = useState(false);

  const {
    data: dashboardSummary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
    refetch: refetchDashboardSummary,
  } = useDashboardSummary();

  const pets = dashboardSummary?.pets;
  const devices = dashboardSummary?.devices;
  const sensorReadings = dashboardSummary?.sensorReadings;
  const kpis = dashboardSummary?.kpis;
  const lastUpdate = dashboardSummary?.lastUpdate || "N/A";
  const heroCardStatus = dashboardSummary?.heroCardStatus || "loading";

  // Transformed data for charts - these functions will remain for now, but use data from summary
  const timeRange = 'week'; // Default for dashboard charts
  const consumptionChartData = useMemo(() => transformConsumptionData(sensorReadings || [], devices || [], timeRange), [sensorReadings, devices, timeRange]);
  const activityChartData = useMemo(() => transformSensorDataForActivityChart(sensorReadings || [], timeRange), [sensorReadings, timeRange]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  if (isLoadingSummary) {
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

  if (isErrorSummary) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto text-red-500">
        <h2 className="text-4xl font-bold titulo">Dashboard</h2>
        <p className="text-lg">Error al cargar datos del dashboard. Inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
                  <div className="flex justify-between items-start mb-8">
                    <HeroCard
                      pet={pets && pets.length > 0 ? pets[0] : null} // Display info for the first pet for now
                      status={heroCardStatus}
                      lastUpdate={lastUpdate}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                    </Button>
                  </div>      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatWidget
          title="Mascotas Activas"
          value={kpis?.totalActivePets.toString() || 'N/A'}
          description="Todas saludables"
          icon={Heart}
          statusVariant="ok"
        />
        <StatWidget
          title="Comidas Hoy"
          value={kpis?.totalMealsToday.toString() || 'N/A'}
          description="¡Cuán llenita ha estado su pancita hoy!"
          icon={Fish}
          statusVariant="default"
        />
        <StatWidget
          title="Nivel Promedio Agua"
          value={kpis?.averageWaterLevel || 'N/A'}
          description="Sed de la aventura: su último nivel de agua."
          icon={Droplets}
          statusVariant="ok"
        />
        <StatWidget
          title="Alertas Pendientes"
          value={kpis?.pendingAlerts || 'N/A'}
          description="Algo requiere tu atención, ¡revisa pronto!"
          icon={AlertTriangle}
          statusVariant="alert"
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
            <div className="col-span-full text-center space-y-4 py-8">
              <p className="text-muted-foreground">¡Oh! Parece que aún no tienes compañeros peludos. ¡Añade tu primera mascota!</p>
              <Button onClick={() => setShowAddPetModal(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" /> Agregar Mascota
              </Button>
            </div>
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
            <div className="col-span-full text-center space-y-4 py-8">
              <p className="text-muted-foreground">¿Sin huellitas tecnológicas aún? ¡Vincula tu primer dispositivo para empezar a cuidarlos!</p>
              <Button onClick={() => setShowLinkDeviceModal(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" /> Vincular Dispositivo
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddPetModal 
        onPetAdded={() => {
          refetchDashboardSummary(); // Refresh all dashboard data
          setShowAddPetModal(false); // Close modal after adding
        }}
        isOpen={showAddPetModal}
        onOpenChange={setShowAddPetModal}
      />

      <LinkDeviceModal
        petId={pets && pets.length > 0 ? pets[0].id : null} // Assuming we link to the first pet for simplicity, or add logic to select pet
        onDeviceLinked={() => {
          refetchDevices(); // Refresh device list
          setShowLinkDeviceModal(false); // Close modal after linking
        }}
        isOpen={showLinkDeviceModal}
        onOpenChange={setShowLinkDeviceModal}
      />
    </div>
  );
}