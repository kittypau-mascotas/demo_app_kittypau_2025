import { useQuery } from '@tanstack/react-query';
import { Pet } from '@shared/schema';

const fetchPetById = async (petId: number): Promise<Pet> => {
  const response = await fetch(`/api/pets/${petId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch pet');
  }
  return response.json();
};

export const usePet = (petId: number | null) => {
  return useQuery<Pet, Error>({
    queryKey: ['pet', petId],
    queryFn: () => fetchPetById(petId as number),
    enabled: petId !== null, // Only run the query if petId is not null
  });
};
