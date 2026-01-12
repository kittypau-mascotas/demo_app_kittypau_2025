import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PetAvatar from '@/components/PetAvatar';
import AddPetModal from '@/components/AddPetModal';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Helper to calculate age
const calculateAge = (birthDate: string | null) => {
  if (!birthDate) return 'N/A';
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  return `${age} años`;
};

export default function Mascotas() {
  const { data: pets, isLoading, isError, error } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const response = await api.get('/api/pets');
      return response.data;
    },
  });

  return (
    <div className="space-y-6" data-testid="page-mascotas">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Mis Mascotas</h1>
        <AddPetModal />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-1/2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error al cargar las mascotas</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Ocurrió un error inesperado.'}
          </AlertDescription>
        </Alert>
      )}

      {pets && pets.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No tienes mascotas todavía</h3>
          <p className="text-muted-foreground mt-2">
            Haz clic en "Agregar Mascota" para empezar.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets?.map((pet: any) => (
          <Card key={pet.id} className="hover-elevate active-elevate-2" data-testid={`card-pet-${pet.id}`}>
            <CardHeader className="flex flex-col items-center space-y-4">
              <PetAvatar name={pet.name} size="responsive" />
              <CardTitle>{pet.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Especie:</span>
                <span className="font-semibold">{pet.species}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Raza:</span>
                <span className="font-semibold">{pet.breed || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Edad:</span>
                <span className="font-semibold">{calculateAge(pet.birthDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peso:</span>
                <span className="font-semibold">N/A</span>
              </div>
              <div className="pt-2">
                <Badge className={'status-active text-white'}>
                  Saludable
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
