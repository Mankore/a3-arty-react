import { CRS, LatLng, Point } from "leaflet";
import { IMapBounds } from "../../../utils/types";
import { isBackendAvailable, backend } from "../../../utils/variables";

export const latLngToArmaCoords = (
  latLng: LatLng,
  maxZoom: number,
  mapExtent: number[],
  mapBounds: IMapBounds,
  crs: CRS = CRS.Simple
) => {
  const point = crs.latLngToPoint(latLng, maxZoom);
  const coords = new Point(point.x, Math.abs(mapExtent[1]) - point.y);

  const xPercent = coords.x / Math.abs(mapExtent[2]);
  const yPercent = coords.y / Math.abs(mapExtent[1]);

  const armaX = Math.round(mapBounds.x * xPercent);
  const armaY = Math.round(mapBounds.y * yPercent);

  return new Point(armaX, armaY);
};

export async function fetchHeightByCoordinates(mapName: string, x: number, y: number) {
  const defaultValue = 0;
  const roundedX = Math.round(x / 10) * 10;
  const roundedY = Math.round(y / 10) * 10;
  let height = defaultValue;
  if (isBackendAvailable) {
    const json = await fetch(
      `${backend.basepath}${
        backend.routes.coordinates
      }/${mapName.toLowerCase()}/${roundedX}.${roundedY}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .catch(() => console.warn("Couldn't fetch height, setting height to 0"));
    height = json ? json.z : defaultValue;
  }

  return height;
}

export async function fetchFlatnessByCoordinates(mapName: string, x: number, y: number) {
  const defaultValue = 999;
  const roundedX = Math.round(x / 10) * 10;
  const roundedY = Math.round(y / 10) * 10;
  let flatness = defaultValue;
  if (isBackendAvailable) {
    const json = await fetch(
      `${backend.basepath}${
        backend.routes.flatness
      }/${mapName.toLowerCase()}/${roundedX}.${roundedY}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .catch(() => console.warn("Couldn't fetch flatness, setting flatness to 999"));
    flatness = json ? json.flatness : defaultValue;
  }

  return flatness;
}
