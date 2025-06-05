import { QUERY_KEY } from "../variables";
import { useQuery } from "@tanstack/react-query";
import { getHeightByCoordinates } from "./useGetHeight";

/*
  Ping backend with default map / coords to check connectivity
*/
export const usePingBackend = () => {
  return useQuery({
    queryKey: [QUERY_KEY.ping],
    queryFn: () => getHeightByCoordinates({ map: "altis", x: 10, y: 10 }),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
