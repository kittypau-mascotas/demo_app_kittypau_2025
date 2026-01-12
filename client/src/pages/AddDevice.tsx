import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddDevice() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [name, setName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [mqttTopic, setMqttTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, deviceType, mqttTopic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      toast({
        title: '¡Dispositivo agregado!',
        description: `${name} ha sido agregado a tu lista de dispositivos.`,
      });

      setLocation('/devices'); // Redirect to devices page
    } catch (error) {
      toast({
        title: 'Error al agregar dispositivo',
        description: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="page-add-device">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => setLocation('/devices')}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="titulo text-3xl ml-4">Agregar Nuevo Dispositivo</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos del Dispositivo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Comedero Principal"
                data-testid="input-device-name"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deviceType">Tipo de Dispositivo</Label>
              <Input
                id="deviceType"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                placeholder="Ej: Dispensador de Comida"
                data-testid="input-device-type"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mqttTopic">Tema MQTT</Label>
              <Input
                id="mqttTopic"
                value={mqttTopic}
                onChange={(e) => setMqttTopic(e.target.value)}
                placeholder="Ej: kittypaw/feeders/ABC123"
                data-testid="input-mqtt-topic"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setLocation('/devices')} disabled={isLoading} data-testid="button-cancel">
                Cancelar
              </Button>
              <Button type="submit" className="btn-primary" disabled={isLoading} data-testid="button-submit-device">
                {isLoading ? 'Agregando...' : 'Agregar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}