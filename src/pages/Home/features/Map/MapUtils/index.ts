import { CRS, LatLng, Point } from "leaflet";
import { IMapBounds } from "@/shared/utils/types";

export const latLngToArmaCoords = (
  latLng: LatLng | undefined,
  maxZoom: number,
  mapExtent: number[],
  mapBounds: IMapBounds,
  crs: CRS = CRS.Simple,
) => {
  if (!latLng) return new Point(0, 0);
  const point = crs.latLngToPoint(latLng, maxZoom);
  const coords = new Point(point.x, Math.abs(mapExtent[1]) - point.y);

  const xPercent = coords.x / Math.abs(mapExtent[2]);
  const yPercent = coords.y / Math.abs(mapExtent[1]);

  const armaX = Math.round(mapBounds.x * xPercent);
  const armaY = Math.round(mapBounds.y * yPercent);

  return new Point(armaX, armaY);
};
