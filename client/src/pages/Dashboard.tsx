import StatWidget from '@/components/StatWidget';
import DeviceCard from '@/components/DeviceCard';
import ActivityChart from '@/components/ActivityChart';
import ConsumptionChart from '@/components/ConsumptionChart';
import PetAvatar from '@/components/PetAvatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Home, AlertTriangle, Heart, Fish, Droplets } from 'lucide-react';
import { usePets } from '@/hooks/data/usePets'; // Import usePets hook
import { useDevices } from '@/hooks/data/useDevices'; // Import useDevices hook
import { Skeleton } from '@/components/ui/skeleton'; // Assuming a Skeleton component exists for loading states

export default function Dashboard() {
  const { data: pets, isLoading: isLoadingPets, isError: isErrorPets } = usePets();
  const { data: devices, isLoading: isLoadingDevices, isError: isErrorDevices } = useDevices();

  const totalActivePets = pets?.length || 0;
  // Placeholder for these stats until dedicated APIs are implemented
  const totalMealsToday = "N/A";
  const averageWaterLevel = "N/A";
  const pendingAlerts = "N/A";

  if (isLoadingPets || isLoadingDevices) {
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

  if (isErrorPets || isErrorDevices) {
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
          value={totalMealsToday}
          description="Datos no disponibles"
          icon={Fish}
          variant="data"
        />
        <StatWidget
          title="Nivel Promedio Agua"
          value={averageWaterLevel}
          description="Datos no disponibles"
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
                <PetAvatar name={pet.name} imageUrl={pet.avatarUrl || '/placeholder-pet.png'} size="responsive" />
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
        <ActivityChart />
        <ConsumptionChart />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Dispositivos Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {devices?.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              type={device.type || 'Dispositivo'}
              status={device.status as any} // Cast status as it's a string, DeviceCard expects specific literals
              lastUpdate={device.lastUpdate ? new Date(device.lastUpdate).toLocaleString() : 'N/A'}
              batteryLevel={device.batteryLevel || 0}
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