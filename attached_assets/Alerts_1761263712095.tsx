import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Info, XCircle, Check } from 'lucide-react';

export default function Alerts() {
  //todo: remove mock functionality
  const mockAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Batería Baja',
      description: 'El bebedero automático tiene batería baja (15%)',
      timestamp: 'Hace 30 minutos',
      device: 'Bebedero Automático',
    },
    {
      id: 2,
      type: 'error',
      title: 'Dispositivo Desconectado',
      description: 'El arenero inteligente no responde desde hace 2 horas',
      timestamp: 'Hace 2 horas',
      device: 'Arenero Inteligente',
    },
    {
      id: 3,
      type: 'info',
      title: 'Comida Baja',
      description: 'El comedero principal tiene menos del 20% de capacidad',
      timestamp: 'Hace 1 hora',
      device: 'Comedero Principal',
    },
    {
      id: 4,
      type: 'success',
      title: 'Mantenimiento Completado',
      description: 'El collar GPS ha sido actualizado correctamente',
      timestamp: 'Hace 15 minutos',
      device: 'Collar GPS',
    },
  ];

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          icon: AlertTriangle,
          className: 'status-warning',
          iconColor: 'text-orange-600',
        };
      case 'error':
        return {
          icon: XCircle,
          className: 'status-error text-white',
          iconColor: 'text-white',
        };
      case 'info':
        return {
          icon: Info,
          className: 'bg-blue-100 text-blue-900',
          iconColor: 'text-blue-600',
        };
      case 'success':
        return {
          icon: Check,
          className: 'status-active text-white',
          iconColor: 'text-white',
        };
      default:
        return {
          icon: Info,
          className: 'bg-gray-100 text-gray-900',
          iconColor: 'text-gray-600',
        };
    }
  };

  return (
    <div className="space-y-6" data-testid="page-alerts">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Alertas</h1>
        <Button variant="outline" data-testid="button-mark-all-read">
          Marcar todas como leídas
        </Button>
      </div>

      <div className="space-y-4">
        {mockAlerts.map((alert) => {
          const config = getAlertConfig(alert.type);
          const Icon = config.icon;

          return (
            <Card key={alert.id} className="hover-elevate" data-testid={`alert-${alert.id}`}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3">
                  <Badge className={config.className}>
                    <Icon className={`h-4 w-4 ${config.iconColor}`} />
                  </Badge>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" data-testid={`button-dismiss-${alert.id}`}>
                  Descartar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{alert.device}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
