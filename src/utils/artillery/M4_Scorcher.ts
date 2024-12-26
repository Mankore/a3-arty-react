import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_155mm_AMOS } from "../shells";

export const Artillery_M4_Scorcher: Artillery = {
  name: "M4 Scorcher",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 80,
  fireModes: [
    {
      name: "Semi (close)",
      artilleryCharge: 0.19,
    },
    {
      name: "Semi (medium)",
      artilleryCharge: 0.3,
    },
    {
      name: "Semi (far)",
      artilleryCharge: 0.48,
    },
    {
      name: "Semi (further)",
      artilleryCharge: 0.8,
    },
    {
      name: "Semi (extreme)",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_155mm_AMOS],
  isAirFriction: false,
  angleAdjustment: -1.48,
  getBaseProjectileSpawnPoint: function (): Vector {
    return new Vector(0, 0, 0);
  },
};
