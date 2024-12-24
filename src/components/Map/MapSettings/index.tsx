import Leaflet, { CRS } from "leaflet";
import { useMap } from "react-leaflet";
import { increaseMapZoomBy } from "../../../utils/variables";

interface IMapSettings {
  crs: CRS;
  mapExtent: number[];
}

// Used to set maxBounds for different maps
export const MapSettings = ({ crs, mapExtent }: IMapSettings) => {
  const map = useMap();

  const maxZoom = map.getMaxZoom();
  const point1 = Leaflet.point(Math.abs(mapExtent[0]), Math.abs(mapExtent[1]));
  const point2 = Leaflet.point(Math.abs(mapExtent[2]), Math.abs(mapExtent[3]));
  const latlng1 = crs.pointToLatLng(point1, maxZoom - increaseMapZoomBy);
  const latlng2 = crs.pointToLatLng(point2, maxZoom - increaseMapZoomBy);
  const bounds = Leaflet.latLngBounds(latlng1, latlng2);
  map.setMaxBounds(bounds);
  return <></>;
};
