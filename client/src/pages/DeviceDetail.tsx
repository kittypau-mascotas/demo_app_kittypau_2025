import React, { useState } from 'react';
import { useParams, Redirect, useLocation } from 'wouter';
import { useDevice } from '@/hooks/data/useDevice';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Save, X, Wifi, WifiOff, Clock } from 'lucide-react'; // Add Clock icon
import { DeviceCardProps } from '@/components/DeviceCard'; // For status types
import { usePets } from '@/hooks/data/usePets'; // To get pet data for associated pet
import { logger } from '@/lib/logger'; // Import logger
import { useDeviceEvents } from '@/hooks/data/useDeviceEvents'; // Import useDeviceEvents

export default function DeviceDetail() {
  const params = useParams();
  const deviceId = params.id ? parseInt(params.id) : null;
  const { session } = useAuth();
  const { data: device, isLoading, isError, error, refetch } = useDevice(deviceId);
  const { data: pets, isLoading: isLoadingPets } = usePets(); // Fetch all pets to find associated one
  const { data: deviceEvents, isLoading: isLoadingDeviceEvents, isError: isErrorDeviceEvents } = useDeviceEvents(deviceId); // Fetch device events
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedType, setEditedType] = useState('');
  const [editedFirmware, setEditedFirmware] = useState('');

  React.useEffect(() => {
    if (device) {
      setEditedName(device.name);
      setEditedType(device.deviceType || '');
      setEditedFirmware(device.firmwareVersion || '');
    }
  }, [device]);

  const associatedPet = pets?.find(pet => pet.deviceId === device?.id); // Find associated pet
  const associatedPetName = associatedPet ? associatedPet.name : 'N/A';

  const handleUpdateDevice = async () => {
    if (!deviceId) return;

    try {
      const response = await fetch(`/api/devices/${deviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.id}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          name: editedName,
          deviceType: editedType,
          firmwareVersion: editedFirmware,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el dispositivo.');
      }

      toast({ title: '¡Dispositivo actualizado!', description: `Los datos de ${editedName} han sido guardados.` });
      refetch(); // Refetch device data
      setIsEditing(false);
    } catch (err: any) {
      logger.error('Failed to update device:', { context: 'DeviceDetail Page', payload: err });
      toast({
        title: 'Error',
        description: err.message || 'No se pudo actualizar el dispositivo.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteDevice = async () => {
    if (!deviceId || !window.confirm(`¿Estás seguro de que quieres eliminar ${device?.name}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/devices/${deviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.user?.id}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el dispositivo.');
      }

      toast({ title: '¡Dispositivo eliminado!', description: `${device?.name} ha sido eliminado.` });
      setLocation('/devices'); // Redirect to devices list
    } catch (err: any) {
      logger.error('Failed to delete device:', { context: 'DeviceDetail Page', payload: err });
      toast({
        title: 'Error',
        description: err.message || 'No se pudo eliminar el dispositivo.',
        variant: 'destructive',
      });
    }
  };

  const getStatusDisplay = (status: DeviceCardProps['status'] | undefined) => {
    switch (status) {
      case 'active': return <span className="text-green-500 flex items-center gap-1"><Wifi className="h-4 w-4" /> Activo</span>;
      case 'offline': return <span className="text-gray-500 flex items-center gap-1"><WifiOff className="h-4 w-4" /> Offline</span>;
      case 'warning': return <span className="text-yellow-500 flex items-center gap-1"><Wifi className="h-4 w-4" /> Advertencia</span>;
      case 'error': return <span className="text-red-500 flex items-center gap-1"><WifiOff className="h-4 w-4" /> Error</span>;
      default: return <span className="text-gray-500">Desconocido</span>;
    }
  };

  if (isLoading || isLoadingPets || isLoadingDeviceEvents) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <Skeleton className="h-32 w-32 rounded-lg mb-4" />
        <Skeleton className="h-8 w-1/3 mb-2" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    );
  }

  if (isError || isErrorDeviceEvents) {
    return <div className="text-center text-red-500 p-4">Error al cargar el dispositivo: {error?.message || (isErrorDeviceEvents as any)?.message}</div>;
  }

  if (!device) {
    return <div className="text-center text-gray-500 p-4">Dispositivo no encontrado.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-lg bg-primary/20 flex items-center justify-center text-4xl text-primary mb-4">
            📱
          </div>
          <CardTitle className="text-4xl font-bold">{device.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {device.deviceType} | {getStatusDisplay(device.status as DeviceCardProps['status'])}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}><X className="h-4 w-4 mr-2" /> Cancelar</Button>
                <Button className="btn-primary" onClick={handleUpdateDevice}><Save className="h-4 w-4 mr-2" /> Guardar</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)}><Edit className="h-4 w-4 mr-2" /> Editar</Button>
                <Button variant="destructive" onClick={handleDeleteDevice}><Trash2 className="h-4 w-4 mr-2" /> Eliminar</Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              {isEditing ? (
                <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{device.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              {isEditing ? (
                <Input id="type" value={editedType} onChange={(e) => setEditedType(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{device.deviceType}</p>
              )}
            </div>
            <div>
              <Label htmlFor="firmware">Versión de Firmware</Label>
              {isEditing ? (
                <Input id="firmware" value={editedFirmware} onChange={(e) => setEditedFirmware(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{device.firmwareVersion || 'N/A'}</p>
              )}
            </div>
            <div>
              <Label>Mascota Asociada</Label>
              <p className="text-lg font-semibold">{associatedPetName}</p>
            </div>
            <div>
              <Label>Última Señal</Label>
              <p className="text-lg font-semibold">{device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'N/A'}</p>
            </div>
            <div>
              <Label>Nivel de Batería</Label>
              <p className="text-lg font-semibold">{device.batteryLevel ? `${device.batteryLevel}%` : 'N/A'}</p>
            </div>
          </div>

          <hr className="my-4" />

          <CardTitle className="text-2xl">Historial de Conexión y Datos</CardTitle>
          {deviceEvents && deviceEvents.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {deviceEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(event.ts).toLocaleString()} - {event.eventType}</span>
                  {event.payload && <span className="text-xs text-muted-foreground">({JSON.stringify(event.payload)})</span>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No hay eventos de conexión recientes.</p>
          )}

          {/* Placeholder for charts if any will be added later */}
          <p className="text-muted-foreground mt-4">Aquí se mostrarán gráficas de telemetría del dispositivo.</p>
          <div className="h-64 w-full bg-muted flex items-center justify-center rounded-md">
            <span>Gráficos del dispositivo</span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}