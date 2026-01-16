import React, { useState } from 'react';
import { useParams, Redirect, useLocation } from 'wouter';
import { usePet } from '@/hooks/data/usePet';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { PawPrint, Edit, Trash2, Save, X } from 'lucide-react';
import PetAvatar from '@/components/PetAvatar';

export default function PetDetail() {
  const params = useParams();
  const petId = params.id ? parseInt(params.id) : null;
  const { session } = useAuth();
  const { data: pet, isLoading, isError, error, refetch } = usePet(petId);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedSpecies, setEditedSpecies] = useState('');
  const [editedBreed, setEditedBreed] = useState('');
  const [editedBirthDate, setEditedBirthDate] = useState('');

  React.useEffect(() => {
    if (pet) {
      setEditedName(pet.name);
      setEditedSpecies(pet.species || '');
      setEditedBreed(pet.breed || '');
      setEditedBirthDate(pet.birthDate ? new Date(pet.birthDate).toISOString().split('T')[0] : '');
    }
  }, [pet]);

  const handleUpdatePet = async () => {
    if (!petId) return;

    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.id}`, // Assuming token-based auth or similar
        },
        credentials: 'include',
        body: JSON.stringify({
          name: editedName,
          species: editedSpecies,
          breed: editedBreed,
          birthDate: editedBirthDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la mascota.');
      }

      toast({ title: '¡Mascota actualizada!', description: `Los datos de ${editedName} han sido guardados.` });
      refetch(); // Refetch pet data
      setIsEditing(false);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'No se pudo actualizar la mascota.',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePet = async () => {
    if (!petId || !window.confirm(`¿Estás seguro de que quieres eliminar a ${pet?.name}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.user?.id}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar la mascota.');
      }

      toast({ title: '¡Mascota eliminada!', description: `${pet?.name} ha sido eliminada.` });
      setLocation('/mascotas'); // Redirect to pets list
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'No se pudo eliminar la mascota.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <Skeleton className="h-48 w-48 rounded-full mb-4" />
        <Skeleton className="h-8 w-1/3 mb-2" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500 p-4">Error al cargar la mascota: {error?.message}</div>;
  }

  if (!pet) {
    return <div className="text-center text-gray-500 p-4">Mascota no encontrada.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="mx-auto max-w-xl w-full">
        <CardHeader className="flex flex-col items-center text-center">
          <PetAvatar name={pet.name} imageUrl={pet.photoUrl || '/graficas/placeholder-pet.png'} size="responsive" />
          <CardTitle className="text-4xl font-bold mt-4">{pet.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {pet.species} {pet.breed ? `(${pet.breed})` : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}><X className="h-4 w-4 mr-2" /> Cancelar</Button>
                <Button className="btn-primary" onClick={handleUpdatePet}><Save className="h-4 w-4 mr-2" /> Guardar</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(true)}><Edit className="h-4 w-4 mr-2" /> Editar</Button>
                <Button variant="destructive" onClick={handleDeletePet}><Trash2 className="h-4 w-4 mr-2" /> Eliminar</Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              {isEditing ? (
                <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{pet.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              {isEditing ? (
                <Input id="species" value={editedSpecies} onChange={(e) => setEditedSpecies(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{pet.species}</p>
              )}
            </div>
            <div>
              <Label htmlFor="breed">Raza</Label>
              {isEditing ? (
                <Input id="breed" value={editedBreed} onChange={(e) => setEditedBreed(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{pet.breed || 'N/A'}</p>
              )}
            </div>
            <div>
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              {isEditing ? (
                <Input id="birthDate" type="date" value={editedBirthDate} onChange={(e) => setEditedBirthDate(e.target.value)} />
              ) : (
                <p className="text-lg font-semibold">{pet.birthDate ? new Date(pet.birthDate).toLocaleDateString() : 'N/A'}</p>
              )}
            </div>
            {/* Add more pet details here, e.g., weight, photoUrl if not handled by avatar */}
          </div>

          <hr className="my-4" />

          {/* Section for charts or associated devices will go here */}
          <CardTitle className="text-2xl">Actividad y Salud</CardTitle>
          <p className="text-muted-foreground">Gráficas de actividad y consumo irán aquí.</p>
          {/* Placeholder for charts */}
          <div className="h-64 w-full bg-muted flex items-center justify-center rounded-md">
            <span>Gráficos de la mascota</span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
