import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PetAvatar from '@/components/PetAvatar';
import AddPetModal from '@/components/AddPetModal';
import { Badge } from '@/components/ui/badge';

export default function Mascotas() {
  //todo: remove mock functionality
  const mockPets = [
    {
      id: 1,
      name: 'Bandida',
      type: 'Gato',
      breed: 'Siamés',
      age: 3,
      weight: '4.2 kg',
      imageUrl: '/bandida.jpg',
      status: 'Saludable',
    },
    {
      id: 2,
      name: 'Bruno',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: 5,
      weight: '28 kg',
      imageUrl: '/bruno.jpg',
      status: 'Saludable',
    },
    {
      id: 3,
      name: 'Bella',
      type: 'Gato',
      breed: 'Persa',
      age: 2,
      weight: '3.8 kg',
      status: 'Checkup pendiente',
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-mascotas">
      <div className="flex items-center justify-between">
        <h1 className="titulo text-3xl">Mis Mascotas</h1>
        <AddPetModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPets.map((pet) => (
          <Card key={pet.id} className="hover-elevate active-elevate-2" data-testid={`card-pet-${pet.id}`}>
            <CardHeader className="flex flex-col items-center space-y-4">
              <PetAvatar name={pet.name} imageUrl={pet.imageUrl} size="responsive" />
              <CardTitle>{pet.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tipo:</span>
                <span className="font-semibold">{pet.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Raza:</span>
                <span className="font-semibold">{pet.breed}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Edad:</span>
                <span className="font-semibold">{pet.age} años</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Peso:</span>
                <span className="font-semibold">{pet.weight}</span>
              </div>
              <div className="pt-2">
                <Badge className={pet.status === 'Saludable' ? 'status-active text-white' : 'status-warning'}>
                  {pet.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
