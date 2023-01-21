import { Vector } from "./vector";

export interface Artillery {
  Name: string;
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
}