import { getCatByIdAction } from "@/core/actions/cat/get-cat-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useCat = (id: string) => {
  const catQuery = useQuery({
    queryKey: ['cat', id],
    queryFn: () => getCatByIdAction(id),
    staleTime: 1000 * 60 * 60 * 24, //24 hours 
  });

  return {
    catQuery,
  };
}