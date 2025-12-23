import { getCatsAction } from "@/core/actions/cat/get-cats-.actions";
import { useQuery } from "@tanstack/react-query";

export const useCats = () => {
  const getAnimalsQuery = useQuery({
    queryKey: ['cats', 'getAnimals'],
    queryFn: getCatsAction,
    staleTime: 1000 * 60 * 60 * 24, //24 hours 
  });

  return {
    getAnimalsQuery,
  };
}