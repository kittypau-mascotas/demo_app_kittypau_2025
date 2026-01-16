import { Button } from '@/components/ui/button';
import DeviceCard from '@/components/DeviceCard';
import { Plus } from 'lucide-react';
import { useLocation } from 'wouter';

type DeviceStatus = 'active' | 'warning' | 'error';

interface MockDevice {
  name: string;
  type: string;
  status: DeviceStatus;
  lastUpdate: string;
  batteryLevel: number;
  imageUrl?: string;
}

export default function Devices() {
  const [, setLocation] = useLocation();

  // TODO: reemplazar por fetch a /api/devices
  const mockDevices: MockDevice[] = [
    {
      name: 'Comedero Principal',
      type: 'Dispensador de Comida',
      status: 'active',
      lastUpdate: 'Hace 5 minutos',
      batteryLevel: 85,
      imageUrl: '/images/device-placeholder.png',
    },
    {
      name: 'Arenero Inteligente',
      type: 'Monitor de Arenero',
      status: 'warning',
      lastUpdate: 'Hace 2 horas',
      batteryLevel: 45,
    },
    {
      name: 'Bebedero Automático',
      type: 'Dispensador de Agua',
      status: 'error',
      lastUpdate: 'Hace 1 día',
      batteryLevel: 15,
    },
    {
      name: 'Cámara de Vigilancia',
      type: 'Cámara IoT',
      status: 'active',
      lastUpdate: 'Hace 10 minutos',
      batteryLevel: 90,
    },
    {
      name: 'Collar GPS',
      type: 'Rastreador',
      status: 'active',
      lastUpdate: 'Hace 1 minuto',
      batteryLevel: 70,
    },
  ];

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
        {mockDevices.map((device) => (
          <DeviceCard key={device.name} {...device} />
        ))}
      </div>
    </div>
  );
}
