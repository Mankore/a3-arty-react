import { CRS, DragEndEventHandlerFn, LatLng } from "leaflet";
import { Artillery, FireMode, MapInfo, ShellType } from "../../../utils/types";

export interface IMapMarkers {
  crs: CRS;
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  currentMap: MapInfo;
  // topDown: boolean;
  heightAdjustment: number;
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
  bearing: number;
  apex: number;
  exitAngle: number;
}

export interface ITargetMarker {
  artilleryPosition: LatLng;
  markerPosition: LatLng;
  setTargets: (value: React.SetStateAction<LatLng[]>) => void;
  onDragEnd: DragEndEventHandlerFn | undefined;
  artilleryHeight: number;
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  currentMap: MapInfo;
  heightAdjustment: number;
}

export interface IArtilleryMarker {
  artilleryPosition: LatLng;
  onDragEnd: DragEndEventHandlerFn | undefined;
  currentMap: MapInfo;
  artilleryHeight: number;
  setArtilleryHeight: React.Dispatch<React.SetStateAction<number>>;
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
}

export interface ITriggerMarker {
  triggerPosition: LatLng;
}

export interface ITargetMarkerVisuals {
  artilleryPosition: LatLng;
  markerPosition: LatLng;
  setTargets: (value: React.SetStateAction<LatLng[]>) => void;
  onDragEnd: DragEndEventHandlerFn | undefined;
  popupContent: React.ReactNode;
}
