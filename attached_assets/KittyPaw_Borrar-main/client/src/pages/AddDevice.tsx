import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { QrCode } from 'lucide-react';

export default function AddDevice() {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add device triggered', { deviceName, deviceType, serialNumber });
    toast({ title: 'Dispositivo agregado', description: `${deviceName} ha sido agregado exitosamente.` });
    setLocation('/devices');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-testid="page-add-device">
      <h1 className="titulo text-3xl">Agregar Dispositivo</h1>

      <Card>
        <CardHeader>
          <CardTitle>Configuración del Dispositivo</CardTitle>
          <CardDescription>Ingresa los detalles de tu nuevo dispositivo IoT</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deviceName">Nombre del Dispositivo</Label>
              <Input
                id="deviceName"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="Ej: Comedero Principal"
                data-testid="input-device-name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceType">Tipo de Dispositivo</Label>
              <Select value={deviceType} onValueChange={setDeviceType} required>
                <SelectTrigger id="deviceType" data-testid="select-device-type">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feeder">Dispensador de Comida</SelectItem>
                  <SelectItem value="litterbox">Monitor de Arenero</SelectItem>
                  <SelectItem value="water">Dispensador de Agua</SelectItem>
                  <SelectItem value="camera">Cámara IoT</SelectItem>
                  <SelectItem value="tracker">Rastreador GPS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Número de Serie</Label>
              <Input
                id="serialNumber"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Ej: KP-123456789"
                data-testid="input-serial-number"
                required
              />
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <QrCode className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Escanea el código QR del dispositivo para vincularlo automáticamente
              </p>
              <Button type="button" variant="outline" className="mt-4" data-testid="button-scan-qr">
                Escanear QR
              </Button>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/devices')}
                data-testid="button-cancel"
              >
                Cancelar
              </Button>
              <Button type="submit" className="btn-primary" data-testid="button-submit-device">
                Agregar Dispositivo
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
