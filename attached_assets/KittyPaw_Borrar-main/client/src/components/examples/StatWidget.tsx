import StatWidget from '../StatWidget';
import { Activity, Home, AlertTriangle, Users } from 'lucide-react';

export default function StatWidgetExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <StatWidget
        title="Mascotas Activas"
        value="3"
        description="Todas saludables"
        icon={Activity}
        variant="data"
      />
      <StatWidget
        title="Dispositivos"
        value="5"
        description="4 activos, 1 inactivo"
        icon={Home}
        variant="device"
        trend={{ value: 12, isPositive: true }}
      />
      <StatWidget
        title="Alertas"
        value="2"
        description="Requieren atención"
        icon={AlertTriangle}
        variant="info"
      />
      <StatWidget
        title="Usuarios"
        value="1"
        description="Plan Plus"
        icon={Users}
        variant="data"
      />
    </div>
  );
}
