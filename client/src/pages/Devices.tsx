import { Button } from '@/components/ui/button';
import DeviceCard from '@/components/DeviceCard';
import { Plus } from 'lucide-react';
import { useLocation } from 'wouter';
import { useDevices } from '@/hooks/data/useDevices';
import { usePets } from '@/hooks/data/usePets'; // Import usePets
import { Skeleton } from '@/components/ui/skeleton';

export default function Devices() {
  const [, setLocation] = useLocation();
  const { data: devices, isLoading, isError } = useDevices();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Error al cargar dispositivos</h2>
        <p className="text-muted-foreground">Por favor, intenta recargar la página.</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Recargar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="page-devices">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Dispositivos</h1>

        <Button
          className="btn-primary"
          onClick={() => setLocation('/devices/add')}
          data-testid="button-add-device"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Dispositivo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices?.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No tienes dispositivos registrados. ¡Agrega uno nuevo!
          </div>
        )}
        {devices?.map((device) => {
          const associatedPet = pets?.find(pet => pet.deviceId === device.id);
          const associatedPetName = associatedPet ? associatedPet.name : undefined;

          return (
            <DeviceCard 
              key={device.id} 
              id={device.id} // Pass the id prop
              name={device.name}
              type={device.deviceType}
              status={device.status as DeviceCardProps['status']} // Cast status for type compatibility
              lastUpdate={device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'N/A'}
              batteryLevel={device.batteryLevel}
              associatedPetName={associatedPetName} // Pass associated pet name
              // Add imageUrl if available
            />
          );
        })}
      </div>
    </div>
  );
}
