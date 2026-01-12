import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface LinkDeviceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  petId: string | null;
  onDeviceLinked: () => void;
}

interface Device {
  id: string;
  name: string;
  deviceId: string;
}

export default function LinkDeviceModal({ isOpen, onOpenChange, petId, onDeviceLinked }: LinkDeviceModalProps) {
  const { toast } = useToast();
  const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [devicesLoading, setDevicesLoading] = useState(true);
  const [devicesError, setDevicesError] = useState<Error | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchDevices = async () => {
        setDevicesLoading(true);
        setDevicesError(null);
        try {
          const response = await fetch('/api/devices', { credentials: 'include' });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error ${response.status}`);
          }
          const data = await response.json();
          setAvailableDevices(data);
        } catch (err) {
          setDevicesError(err instanceof Error ? err : new Error('Failed to fetch devices.'));
          toast({
            title: 'Error al cargar dispositivos',
            description: devicesError?.message || 'No se pudieron cargar los dispositivos disponibles.',
            variant: 'destructive',
          });
        } finally {
          setDevicesLoading(false);
        }
      };
      fetchDevices();
    } else {
      // Reset state when modal closes
      setSelectedDeviceId(null);
      setAvailableDevices([]);
    }
  }, [isOpen, toast, devicesError]);

  const handleLinkDevice = async () => {
    if (!petId) {
      toast({
        title: 'Error',
        description: 'No se ha seleccionado una mascota.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ deviceId: selectedDeviceId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      toast({
        title: 'Dispositivo vinculado',
        description: 'El dispositivo ha sido vinculado exitosamente a la mascota.',
      });
      onOpenChange(false);
      onDeviceLinked(); // Refresh pets list
    } catch (error) {
      toast({
        title: 'Error al vincular dispositivo',
        description: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular Dispositivo a Mascota</DialogTitle>
          <DialogDescription>
            Selecciona un dispositivo para vincular a tu mascota.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="device-select">Dispositivo</Label>
            <Select onValueChange={setSelectedDeviceId} value={selectedDeviceId || ''} disabled={isLoading || devicesLoading}>
              <SelectTrigger id="device-select">
                <SelectValue placeholder="Selecciona un dispositivo" />
              </SelectTrigger>
              <SelectContent>
                {devicesLoading && <SelectItem value="loading" disabled>Cargando dispositivos...</SelectItem>}
                {devicesError && <SelectItem value="error" disabled>Error al cargar</SelectItem>}
                {!devicesLoading && availableDevices.length === 0 && <SelectItem value="no-devices" disabled>No hay dispositivos disponibles</SelectItem>}
                {availableDevices.map((device) => (
                  <SelectItem key={device.id} value={device.id}>
                    {device.name} ({device.deviceId})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleLinkDevice} disabled={isLoading || !selectedDeviceId}>
            {isLoading ? 'Vinculando...' : 'Vincular'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
