import { loginAction } from "@/core/actions/login/login.actions";
import { useQuery } from "@tanstack/react-query";

export const useCats = () => {
  const getAnimalsQuery = useQuery({
    queryKey: ['cats', 'getAnimals'],
    queryFn: loginAction,
    staleTime: 1000 * 60 * 60 * 24, //24 hours 
  });

  return {
    getAnimalsQuery,
  };
}