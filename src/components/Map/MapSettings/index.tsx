import Leaflet from "leaflet";
import { useMap } from "react-leaflet";

// Set to be editable for different maps
const mapExtent = [0.0, -7781.0, 7801.0, 0.0];
const crs = Leaflet.CRS.Simple;

export const MapSettings = () => {
  const map = useMap();

  const maxZoom = map.getMaxZoom();
  const point1 = Leaflet.point(Math.abs(mapExtent[0]), Math.abs(mapExtent[1]));
  const point2 = Leaflet.point(Math.abs(mapExtent[2]), Math.abs(mapExtent[3]));
  const latlng1 = crs.pointToLatLng(point1, maxZoom);
  const latlng2 = crs.pointToLatLng(point2, maxZoom);
  const bounds = Leaflet.latLngBounds(latlng1, latlng2);
  map.setMaxBounds(bounds);
  return <></>;
};
