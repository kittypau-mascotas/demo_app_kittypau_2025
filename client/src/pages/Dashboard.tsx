import { useEffect, useState, useMemo } from 'react';
import { petsService, devicesService, dashboardService } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import PetAvatar from '@/components/PetAvatar';
import Navbar from '@/components/Navbar';
import ActivityChart from '@/components/ActivityChart';

// Función auxiliar para procesar los eventos para el gráfico
const transformEventsToChartData = (events: any[]): { name: string; Activity: number }[] => {
  if (!events || events.length === 0) return [];

  const activityByDay = new Map<string, number>();

  // Procesar los últimos 7 días
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  events
    .filter(e => new Date(e.ts) > sevenDaysAgo)
    .forEach(event => {
      const day = new Date(event.ts).toLocaleDateString('es-ES', { weekday: 'short' });
      activityByDay.set(day, (activityByDay.get(day) || 0) + 1);
    });
  
  const sortedDays = [];
  for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      sortedDays.push(d.toLocaleDateString('es-ES', { weekday: 'short' }));
  }
  
  const uniqueSortedDays = [...new Set(sortedDays)];

  return uniqueSortedDays.map(day => ({
    name: day,
    Activity: activityByDay.get(day) || 0,
  }));
};

export default function Dashboard() {
  const [pets, setPets] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const { toast } = useToast();
  
  // Estados de formularios
  const [petName, setPetName] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const loadData = async () => {
    try {
      const [petsData, devicesData, eventsData] = await Promise.all([
        petsService.getAll(),
        devicesService.getAll(),
        dashboardService.getRecentEvents(),
      ]);
      setPets(petsData);
      setDevices(devicesData);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activityChartData = useMemo(() => transformEventsToChartData(events), [events]);

  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await petsService.create({ name: petName, species: 'cat', breed: 'unknown', weight: 0, birthDate: new Date().toISOString() });
      toast({ title: 'Mascota agregada' });
      setPetName('');
      loadData();
    } catch (error) {
      toast({ title: 'Error al agregar mascota', variant: 'destructive' });
    }
  };

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await devicesService.create({ name: deviceName, type: 'feeder' });
      toast({ title: 'Dispositivo agregado' });
      setDeviceName('');
      loadData();
    } catch (error) {
      toast({ title: 'Error al agregar dispositivo', variant: 'destructive' });
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar title="Panel de Control (Prueba CRUD)" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityChart data={activityChartData} title="Actividad Reciente (Últimos 7 días)" unit="eventos" />
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>Mis Mascotas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddPet} className="flex gap-2">
                <Input placeholder="Nombre mascota" value={petName} onChange={e => setPetName(e.target.value)} required />
                <Button type="submit">Agregar</Button>
              </form>
              <div className="space-y-2">
                {pets.map((pet) => (
                  <div key={pet.id} className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center gap-3">
                    <PetAvatar name={pet.name} imageUrl={pet.photoUrl || '/graficas/placeholder-pet.png'} className="h-10 w-10" />
                    <div>
                      <p className="font-medium leading-none">{pet.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{pet.species}</p>
                    </div>
                  </div>
                ))}
                {pets.length === 0 && <p className="text-gray-500 text-center py-4">No hay mascotas registradas</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Mis Dispositivos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddDevice} className="flex gap-2">
                <Input placeholder="Nombre dispositivo" value={deviceName} onChange={e => setDeviceName(e.target.value)} required />
                <Button type="submit">Agregar</Button>
              </form>
              <div className="space-y-2">
                {devices.map((dev) => (
                  <div key={dev.id} className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center">
                    <span className="font-medium">{dev.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${dev.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {dev.status || 'offline'}
                    </span>
                  </div>
                ))}
                {devices.length === 0 && <p className="text-gray-500 text-center py-4">No hay dispositivos registrados</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}