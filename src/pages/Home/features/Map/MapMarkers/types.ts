import { CRS, DragEndEventHandlerFn, LatLng } from "leaflet";
import { FireMode, MapInfo, ShellType } from "@/shared/utils/types";
import { AngleSolution } from "@/shared/utils/ballistics/types";

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
  shell: ShellType;
  fireMode: FireMode;
  range: number;
  azimuth: number;
  solution: AngleSolution;
}

export interface ITargetMarker {
  artilleryPosition: LatLng | undefined;
  markerPosition: LatLng;
  onDragEnd: DragEndEventHandlerFn | undefined;
}

export interface IArtilleryMarker {
  currentMap: MapInfo;
}

export interface ITriggerMarker {
  triggerPosition: LatLng;
}

export interface ITargetMarkerVisuals {
  markerPosition: LatLng;
  onDragEnd: DragEndEventHandlerFn | undefined;
  popupContent: React.ReactNode;
}
