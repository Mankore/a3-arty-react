import { CRS, DragEndEventHandlerFn, LatLng } from "leaflet";
import { Artillery, FireMode, MapInfo, ShellType } from "../../../utils/types";

export interface IMapMarkers {
  crs: CRS;
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  currentMap: MapInfo;
  topDown: boolean;
  heightAdjustment: number;
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

export interface IMarkerPopup {
  coordinates: Coordinates;
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
  artilleryPosition: IMarkerInfo;
  markerPosition: IMarkerInfo;
  setTargets: (value: React.SetStateAction<IMarkerInfo[]>) => void;
  onDragEnd: DragEndEventHandlerFn | undefined;
}

export interface IArtilleryMarker {
  artilleryPosition: IMarkerInfo;
  onDragEnd: DragEndEventHandlerFn | undefined;
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  currentMap: MapInfo;
}
