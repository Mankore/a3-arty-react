import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_155mm_AMOS } from "../shells";

export const Arty_2S9_Sochor: Artillery = {
  name: "2S9 Sochor",
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
  angleAdjustment: 0.14,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, 0, 0);
  },
};
