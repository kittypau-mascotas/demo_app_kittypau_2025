import StatWidget from '@/components/StatWidget';
import DeviceCard from '@/components/DeviceCard';
import ActivityChart from '@/components/ActivityChart';
import ConsumptionChart from '@/components/ConsumptionChart';
import PetAvatar from '@/components/PetAvatar';
import { BrandCarousel } from '@/components/BrandCarousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Home, AlertTriangle, Heart, Fish, Droplets } from 'lucide-react';
import catAvatar from '@assets/generated_images/Orange_cat_avatar_7c8d31d8.png';
import dogAvatar from '@assets/generated_images/Golden_dog_avatar_cfd73a5f.png';

export default function Dashboard() {
  // Mock data - en producción vendría del backend
  const mockPets = [
    {
      id: 1,
      name: 'Luna',
      type: 'Gato',
      lastActivity: 'Hace 15 min',
      foodLevel: '75%',
      waterLevel: '60%',
      imageUrl: catAvatar,
    },
    {
      id: 2,
      name: 'Max',
      type: 'Perro',
      lastActivity: 'Hace 5 min',
      foodLevel: '45%',
      waterLevel: '80%',
      imageUrl: dogAvatar,
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-2">
          <h2 className="text-4xl font-bold titulo">Dashboard</h2>
          <p className="text-lg text-muted-foreground">
            Resumen del estado de tus mascotas
          </p>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <BrandCarousel />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatWidget
          title="Mascotas Activas"
          value="2"
          description="Todas saludables"
          icon={Heart}
          variant="info"
        />
        <StatWidget
          title="Comidas Hoy"
          value="6"
          description="3 por mascota"
          icon={Fish}
          variant="data"
        />
        <StatWidget
          title="Nivel Promedio Agua"
          value="70%"
          description="Buena hidratación"
          icon={Droplets}
          variant="info"
        />
        <StatWidget
          title="Alertas Pendientes"
          value="1"
          description="Rellenar comedero"
          icon={AlertTriangle}
          variant="device"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Tus Mascotas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {mockPets.map((pet) => (
            <Card key={pet.id} className="card-info border-0 hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <PetAvatar name={pet.name} imageUrl={pet.imageUrl} size="md" />
                  <div>
                    <CardTitle>{pet.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pet.type}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Última actividad:</span>
                  <span className="text-sm font-semibold">{pet.lastActivity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Fish className="h-4 w-4" /> Comida:
                  </span>
                  <span className="text-sm font-semibold">{pet.foodLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Droplets className="h-4 w-4" /> Agua:
                  </span>
                  <span className="text-sm font-semibold">{pet.waterLevel}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <ConsumptionChart />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Dispositivos Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <DeviceCard
            name="Comedero Principal"
            type="Dispensador de Comida"
            status="active"
            lastUpdate="Hace 5 minutos"
            batteryLevel={85}
          />
          <DeviceCard
            name="Arenero Automático"
            type="Monitor de Arenero"
            status="active"
            lastUpdate="Hace 10 minutos"
            batteryLevel={92}
          />
        </div>
      </div>
    </div>
  );
}