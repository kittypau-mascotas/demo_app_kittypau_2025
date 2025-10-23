import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, WifiOff, Wifi } from 'lucide-react';

interface DeviceCardProps {
  name: string;
  type: string;
  status: 'active' | 'warning' | 'error';
  lastUpdate?: string;
  batteryLevel?: number;
  imageUrl?: string;
}

function DeviceStatus({ status }: { status: 'active' | 'warning' | 'error' }) {
  const statusConfig = {
    active: { label: 'Activo', className: 'bg-green-500 text-white hover:bg-green-600' },
    warning: { label: 'Advertencia', className: 'bg-yellow-500 text-foreground hover:bg-yellow-600' },
    error: { label: 'Error', className: 'bg-red-500 text-white hover:bg-red-600' },
  };

  return (
    <Badge className={`${statusConfig[status].className} gap-1.5`}>
      {status === 'active' ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      {statusConfig[status].label}
    </Badge>
  );
}

export default function DeviceCard({
  name,
  type,
  status,
  lastUpdate,
  batteryLevel,
  imageUrl,
}: DeviceCardProps) {
  return (
    <Card className="card-device hover:shadow-lg transition-all border-none">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center backdrop-blur-sm">
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="h-8 w-8 object-contain" />
              ) : (
                <span className="text-2xl">📱</span>
              )}
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{name}</h4>
              <p className="text-sm opacity-70">{type}</p>
            </div>
          </div>
          <DeviceStatus status={status} />
        </div>
        <div className="space-y-2">
          {lastUpdate && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Última actualización:</span> {lastUpdate}
            </p>
          )}
          {batteryLevel !== undefined && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Batería:</span> {batteryLevel}%
            </p>
          )}
        </div>
        <div className="flex gap-2 pt-4">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 hover-elevate border-neutral-700/50 hover:bg-neutral-800/50"
            data-testid="button-device-settings"
            onClick={() => console.log(`Settings for ${name}`)}
          >
            Configurar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 hover-elevate border-neutral-700/50 hover:bg-neutral-800/50"
            data-testid="button-device-view-data"
            onClick={() => console.log(`View data for ${name}`)}
          >
            Ver Datos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}