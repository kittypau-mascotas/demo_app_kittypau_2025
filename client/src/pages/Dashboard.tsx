import { useEffect, useState } from 'react';
import { petsService, devicesService } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [pets, setPets] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const { toast } = useToast();
  
  // Estados de formularios
  const [petName, setPetName] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const loadData = async () => {
    try {
      const [petsData, devicesData] = await Promise.all([
        petsService.getAll(),
        devicesService.getAll()
      ]);
      setPets(petsData);
      setDevices(devicesData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <h1 className="text-3xl font-bold">Panel de Control (Prueba CRUD)</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Mis Mascotas</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddPet} className="flex gap-2">
              <Input placeholder="Nombre mascota" value={petName} onChange={e => setPetName(e.target.value)} required />
              <Button type="submit">Agregar</Button>
            </form>
            <div className="space-y-2">
              {pets.map((pet) => (
                <div key={pet.id} className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center">
                  <span className="font-medium">{pet.name}</span>
                  <span className="text-xs text-gray-500">{pet.species}</span>
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
  );
}