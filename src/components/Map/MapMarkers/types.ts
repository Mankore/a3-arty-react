import { CRS, DragEndEventHandlerFn, LatLng } from "leaflet";
import { FireMode, MapInfo, ShellType } from "@/utils/types";

export interface IMapMarkers {
  crs: CRS;
}

export interface Coordinates {
  x: number;
  y: number;
  z: number | undefined;
}

export interface IMarkerInfo {
  latlng: LatLng;
  popupContent: React.ReactNode;
  coordinates?: Coordinates;
}

export interface IMarkerPopup {
  coordinates: Coordinates;
  flatness?: number;
}

export interface ITargetPopup extends IMarkerPopup {
  tof: number;
  shell: ShellType;
  fireMode: FireMode;
  range: number;
  currentAngle: number;
  azimuth: number;
  apex: number;
  exitAngle: number;
}

export interface ITargetMarker {
  artilleryPosition: LatLng;
  markerPosition: LatLng;
  onDragEnd: DragEndEventHandlerFn | undefined;
  artilleryHeight: number;
}

export interface IArtilleryMarker {
  artilleryPosition: LatLng;
  onDragEnd: DragEndEventHandlerFn | undefined;
  currentMap: MapInfo;
  artilleryHeight: number;
  setArtilleryHeight: React.Dispatch<React.SetStateAction<number>>;
}

export interface ITriggerMarker {
  triggerPosition: LatLng;
}

export interface ITargetMarkerVisuals {
  artilleryPosition: LatLng;
  markerPosition: LatLng;
  onDragEnd: DragEndEventHandlerFn | undefined;
  popupContent: React.ReactNode;
}
