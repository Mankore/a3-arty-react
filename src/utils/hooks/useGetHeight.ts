import { backend, QUERY_KEY } from "../variables";
import { useQuery } from "@tanstack/react-query";
import { useMainSelector } from "../../state/hooks";
import { selectBackendEnabled } from "../../state/main/selectors";

interface GetHeightResponse {
  x: number;
  y: number;
  z: number;
}

interface Props {
  map: string;
  x: number;
  y: number;
  enabled?: boolean;
}

export const getHeightByCoordinates = async ({ map, x, y }: Props) => {
  const roundedX = Math.round(x / 10) * 10;
  const roundedY = Math.round(y / 10) * 10;
  const response = await fetch(
    `${backend.basepath}${
      backend.routes.coordinates
    }/${map.toLowerCase()}/${roundedX}.${roundedY}`,
    {
      method: "GET",
      mode: "cors",
    },
  );

  if (!response || !response.ok)
    throw new Error(`Failed to fetch height for ${map} at (${x}, ${y})`);

  const json = await response.json();

  return json as GetHeightResponse;
};

export const useGetHeight = ({ map, x, y, enabled }: Props) => {
  const isBackendEnabled = useMainSelector(selectBackendEnabled);

  return useQuery({
    queryKey: [QUERY_KEY.coordinates, map, x, y, isBackendEnabled],
    queryFn: () => {
      if (!isBackendEnabled) return { z: 0 };
      return getHeightByCoordinates({ map, x, y });
    },
    enabled,
    retry: false,
  });
};
