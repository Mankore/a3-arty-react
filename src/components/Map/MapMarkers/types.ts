import { CRS, LatLng } from "leaflet";
import { Artillery, FireMode, MapInfo, ShellType } from "../../../utils/types";

export interface IMapMarkers {
  crs: CRS;
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  currentMap: MapInfo;
  topDown: boolean;
}

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface IMarkerInfo {
  latlng: LatLng;
  popupContent: React.ReactNode;
  coordinates?: Coordinates;
}
