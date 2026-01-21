import React, { useState, useMemo } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { api, Pet } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityChart } from '@/components/ActivityChart';
import { ConsumptionChart } from '@/components/ConsumptionChart';
import { StatWidget } from '@/components/StatWidget';
import { Activity, Utensils, Weight, HeartPulse } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTelemetry } from '@/hooks/data/useTelemetry';

export default function PetDetail() {
  const [, params] = useRoute('/mascotas/:id');
  const petId = params?.id ? parseInt(params.id) : null;
  const [timeRange, setTimeRange] = useState<'24h' | '7d'>('7d');

  const { data: pet, isLoading: isLoadingPet } = useQuery({
    queryKey: ['pet', petId],
    queryFn: () => api.pets.get(petId!),
    enabled: !!petId,
  });

  const { data: telemetry, isLoading: isLoadingTelemetry } = useTelemetry({
    petId: petId,
    timeRange: timeRange
  });

  // Transform data for charts
  const activityData = useMemo(() => {
    if (!telemetry?.sensorReadings) return [];
    // Simple aggregation for demo - in real app this logic might be more complex or server-side
    return telemetry.sensorReadings.map(r => ({
      name: format(new Date(r.ts), 'HH:mm'),
      value: r.lightLux || 0 // Using lightLux as a placeholder for activityLevel
    })).slice(-20); // Last 20 readings
  }, [telemetry]);

  const consumptionData = useMemo(() => {
    if (!telemetry?.sensorReadings) return [];
    return telemetry.sensorReadings.map(r => ({
      name: format(new Date(r.ts), 'dd/MM'),
      value: r.weightGrams || 0
    })).slice(-7); // Last 7 readings
  }, [telemetry]);

  if (isLoadingPet || isLoadingTelemetry) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (!pet) return <div>Mascota no encontrada</div>;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/10 bg-muted">
              {pet.photoUrl ? (
                <img src={pet.photoUrl} alt={pet.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                  {pet.name[0]}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-500 border-2 border-background" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-display">{pet.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              {pet.species} • {pet.breed || 'Raza desconocida'} • {pet.age} años
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Editar Perfil</Button>
          <Button>Configurar Dispositivo</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatWidget
          title="Nivel de Actividad"
          value="Alta"
          description="+12% vs semana anterior"
          icon={Activity}
          statusVariant="ok"
        />
        <StatWidget
          title="Consumo Diario"
          value="245g"
          description="Promedio últimos 7 días"
          icon={Utensils}
          statusVariant="default"
        />
        <StatWidget
          title="Peso Actual"
          value={`${pet.weight || '--'} kg`}
          description="Actualizado hace 2h"
          icon={Weight}
          statusVariant="default"
        />
        <StatWidget
          title="Salud General"
          value="Excelente"
          description="Sin anomalías detectadas"
          icon={HeartPulse}
          statusVariant="ok"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityChart data={activityData} title="Actividad Diaria" />
        <ConsumptionChart data={consumptionData} title="Historial de Consumo" />
      </div>
    </div>
  );
}