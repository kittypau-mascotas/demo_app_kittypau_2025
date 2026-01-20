import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Pet } from "@/lib/api";

export function usePets() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ["pets"],
    queryFn: api.pets.list,
  });

  const createMutation = useMutation({
    mutationFn: api.pets.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  return {
    ...query,
    createPet: createMutation.mutateAsync,
    isCreating: createMutation.isPending
  };
}