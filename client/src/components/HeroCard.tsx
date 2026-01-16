import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PetAvatar from '@/components/PetAvatar';
import { Pet } from '@shared/schema'; // Assuming Pet type is available
import { cn } from '@/lib/utils'; // Import cn

interface HeroCardProps {
  pet: Pet | null;
  status: 'ok' | 'warning' | 'alert' | 'loading';
  lastUpdate: string; // e.g., "Actualizado hace 18 segundos"
}

export default function HeroCard({ pet, status, lastUpdate }: HeroCardProps) {
  let statusMessage = '';
  let statusEmoji = '';
  let statusColor = '';

  switch (status) {
    case 'ok':
      statusMessage = 'Todo está bien';
      statusEmoji = '💙';
      statusColor = 'text-green-500';
      break;
    case 'warning':
      statusMessage = 'Algo a vigilar';
      statusEmoji = '🟡';
      statusColor = 'text-yellow-500';
      break;
    case 'alert':
      statusMessage = 'Requiere atención';
      statusEmoji = '🔴';
      statusColor = 'text-red-500';
      break;
    case 'loading':
    default:
      statusMessage = 'Cargando estado';
      statusEmoji = '⏳';
      statusColor = 'text-gray-500';
      break;
  }

  return (
    <Card className="flex flex-col items-center justify-center p-6 space-y-4">
      {pet ? (
        <>
          <PetAvatar name={pet.name} imageUrl={'/graficas/placeholder-pet.png'} size="lg" /> {/* Placeholder image for now */}
          <div className="text-center">
            <CardTitle className="text-4xl font-bold">{pet.name}</CardTitle>
            <p className={cn("text-lg font-semibold", statusColor)}>
              {statusMessage} {statusEmoji}
            </p>
            <p className="text-sm text-muted-foreground">{lastUpdate}</p>
          </div>
        </>
      ) : (
        <div className="text-center space-y-2">
          <PetAvatar name="Mascota" size="lg" />
          <CardTitle className="text-4xl font-bold">Sin Mascota</CardTitle>
          <p className="text-lg text-muted-foreground">No hay información disponible.</p>
        </div>
      )}
    </Card>
  );
}
