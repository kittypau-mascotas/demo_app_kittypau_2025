import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Battery, Thermometer, Droplets } from 'lucide-react';

interface DeviceStatusProps {
  deviceName: string;
  temperature?: number;
  humidity?: number;
  battery?: number;
  lastUpdate?: string;
}

export default function DeviceStatus({
  deviceName,
  temperature,
  humidity,
  battery,
  lastUpdate,
}: DeviceStatusProps) {
  return (
    <Card data-testid="card-device-status">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {deviceName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {temperature !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Temperatura</span>
            </div>
            <Badge variant="outline">{temperature}°C</Badge>
          </div>
        )}
        {humidity !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Humedad</span>
            </div>
            <Badge variant="outline">{humidity}%</Badge>
          </div>
        )}
        {battery !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Batería</span>
            </div>
            <Badge variant="outline">{battery}%</Badge>
          </div>
        )}
        {lastUpdate && (
          <p className="text-xs text-muted-foreground pt-2">
            Última actualización: {lastUpdate}
          </p>
        )}
      </CardContent>
    </Card>
  );
}