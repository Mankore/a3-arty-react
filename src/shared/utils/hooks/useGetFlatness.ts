import { backend, QUERY_KEY } from "../variables";
import { useQuery } from "@tanstack/react-query";
import { useMainSelector } from "../../../state/hooks";
import { selectBackendEnabled } from "../../../state/main/selectors";

interface GetFlatnessResponse {
  flatness: number;
}

interface Props {
  map: string;
  x: number;
  y: number;
  enabled?: boolean;
}

export const getFlatnessByCoordinates = async ({ map, x, y }: Props) => {
  const roundedX = Math.round(x / 10) * 10;
  const roundedY = Math.round(y / 10) * 10;
  const response = await fetch(
    `${backend.basepath}${
      backend.routes.flatness
    }/${map.toLowerCase()}/${roundedX}.${roundedY}`,
    {
      method: "GET",
      mode: "cors",
    },
  );

  if (!response || !response.ok)
    throw new Error(`Failed to fetch flatness for ${map} at (${x}, ${y})`);

  const json = await response.json();

  return json as GetFlatnessResponse;
};

export const useGetFlatness = ({ map, x, y, enabled }: Props) => {
  const isBackendEnabled = useMainSelector(selectBackendEnabled);

  return useQuery({
    queryKey: [QUERY_KEY.flatness, map, x, y, isBackendEnabled],
    queryFn: () => {
      if (!isBackendEnabled) return { flatness: 999 };
      return getFlatnessByCoordinates({ map, x, y });
    },
    enabled,
    retry: false,
  });
};
