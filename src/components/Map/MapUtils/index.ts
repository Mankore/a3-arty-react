import { CRS, LatLng, Point } from "leaflet";

export const latLngToArmaCoords = (
  latLng: LatLng,
  maxZoom: number,
  mapExtent: number[],
  crs: CRS = CRS.Simple
) => {
  const point = crs.latLngToPoint(latLng, maxZoom);
  const coords = new Point(point.x, Math.abs(mapExtent[1]) - point.y);
  return coords;
};
