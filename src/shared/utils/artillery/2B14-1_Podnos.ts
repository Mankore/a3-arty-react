import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_3VO18 } from "../shells";

export const Arty_2B14: Artillery = {
  name: "2B14-1 Podnos",
  simulationStep: 0.05,
  minAngle: 40,
  maxAngle: 85,
  fireModes: [
    {
      name: "Semi (close)",
      artilleryCharge: 0.35,
    },
    {
      name: "Semi (medium)",
      artilleryCharge: 0.7,
    },
    {
      name: "Semi (far)",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_3VO18],
  isAirFriction: false,
  angleAdjustment: -0.17,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, Math.cos(angle) * 0.92, 1 + Math.sin(angle) * 0.92);
  },
};
