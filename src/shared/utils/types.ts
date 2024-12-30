import { Vector } from "./vector";

export interface Artillery {
  name: string;
  simulationStep: number;
  minAngle: number;
  maxAngle: number;
  fireModes: FireMode[];
  shellTypes: ShellType[];
  isAirFriction: boolean;
  angleAdjustment: number;
  getBaseProjectileSpawnPoint(angle: number): Vector;
}

export interface FireMode {
  name: string;
  artilleryCharge: number;
}

export interface ShellType {
  airFriction: number;
  initSpeed: number;
  name: string;
  thrust?: number;
  thrustTime?: number;
}

export interface IMapBounds {
  x: number;
  y: number;
}

export interface MapInfo {
  name: string;
  mapExtent: Array<number>;
  mapOptions: {
    zoom: number;
    minZoom: number;
    maxZoom: number;
    tileSize: number;
  };
  mapBounds: IMapBounds;
}
