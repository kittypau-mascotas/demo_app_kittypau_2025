import React, { useState } from 'react';
import { usePets } from '@/hooks/data/usePets';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PetAvatar from '@/components/PetAvatar';
import { Plus, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import AddPetModal from '@/components/AddPetModal';

export default function Mascotas() {
  const { data: pets, isLoading, isError, refetch } = usePets();
  const [showAddPetModal, setShowAddPetModal] = useState(false);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto text-red-500">
      <h2 className="text-4xl font-bold titulo">Tus Mascotas</h2>
      <p className="text-lg">Error al cargar la lista de mascotas.</p>
    </div>;
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold titulo">Tus Mascotas</h2>
        <Button className="btn-primary" onClick={() => setShowAddPetModal(true)}>
          <Plus className="h-4 w-4 mr-2" /> Añadir Mascota
        </Button>
      </div>

      {pets && pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {pets.map(pet => (
            <Link key={pet.id} href={`/mascotas/${pet.id}`}>
              <Card className="flex flex-col items-center p-6 space-y-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <PetAvatar name={pet.name} imageUrl={pet.photoUrl || '/graficas/placeholder-pet.png'} size="lg" />
                <CardTitle className="text-2xl">{pet.name}</CardTitle>
                <CardDescription>{pet.species} {pet.breed ? `(${pet.breed})` : ''}</CardDescription>
                <Button variant="ghost" className="text-primary">
                  Ver Detalles <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="col-span-full text-center p-8 space-y-4">
          <CardTitle className="text-2xl">¡Parece que aún no tienes mascotas! 🐾</CardTitle>
          <CardDescription>Añade tu primera mascota para empezar a cuidarla.</CardDescription>
          <Button className="btn-primary" onClick={() => setShowAddPetModal(true)}>
            <Plus className="h-4 w-4 mr-2" /> Añadir Mascota
          </Button>
        </Card>
      )}

      <AddPetModal 
        isOpen={showAddPetModal} 
        onOpenChange={setShowAddPetModal} 
        onPetAdded={() => {
          refetch(); // Refetch pets list
          setShowAddPetModal(false);
        }} 
      />
    </div>
  );
}
