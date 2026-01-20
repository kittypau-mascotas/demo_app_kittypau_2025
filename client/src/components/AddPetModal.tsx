import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { usePets } from "@/hooks/data/usePets";
import { Loader2 } from "lucide-react";

interface AddPetModalProps {
  onPetAdded: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddPetModal({ onPetAdded, isOpen, onOpenChange }: AddPetModalProps) {
  const { createPet, isCreating } = usePets();

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
    try {
      await createPet({ 
        name,
        species,
        breed, 
        birthDate: birthDate || undefined 
      });
      
      onPetAdded();
      resetForm();
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              disabled={isCreating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="species">Especie</Label>
            <Select value={species} onValueChange={setSpecies} required disabled={isCreating}>
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
              disabled={isCreating}
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
              disabled={isCreating}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating} data-testid="button-cancel">
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary" disabled={isCreating} data-testid="button-submit-pet">
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCreating ? 'Agregando...' : 'Agregar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
