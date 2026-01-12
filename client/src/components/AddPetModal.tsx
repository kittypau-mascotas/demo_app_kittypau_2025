import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function AddPetModal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const resetForm = () => {
    setName('');
    setSpecies('');
    setBreed('');
    setBirthDate('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, species, breed, birthDate }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      toast({
        title: '¡Mascota agregada!',
        description: `${name} ha sido agregado a tu lista de mascotas.`,
      });

      // Invalidate the pets query to refetch the list
      await queryClient.invalidateQueries({ queryKey: ['pets'] });

      setOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Error al agregar mascota',
        description: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary" data-testid="button-add-pet">
          <Plus className="h-4 w-4 mr-2" />
          Agregar Mascota
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="modal-add-pet">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Mascota</DialogTitle>
          <DialogDescription>Ingresa los datos de tu mascota</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Bandida"
              data-testid="input-pet-name"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="species">Especie</Label>
            <Select value={species} onValueChange={setSpecies} required disabled={isLoading}>
              <SelectTrigger id="species" data-testid="select-pet-species">
                <SelectValue placeholder="Selecciona la especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gato">Gato</SelectItem>
                <SelectItem value="Perro">Perro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="breed">Raza</Label>
            <Input
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              placeholder="Ej: Siamés"
              data-testid="input-pet-breed"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              data-testid="input-pet-birthdate"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading} data-testid="button-cancel">
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary" disabled={isLoading} data-testid="button-submit-pet">
              {isLoading ? 'Agregando...' : 'Agregar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
