import { Artillery } from "../types";
import { Vector } from "../vector";
import { Rocket_CUP_Grad } from "../shells";

export const Arty_RM70: Artillery = {
  name: "RM70",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 85,
  fireModes: [
    {
      name: "Close",
      artilleryCharge: 0.42,
    },
    {
      name: "Medium",
      artilleryCharge: 0.45,
    },
    {
      name: "Far",
      artilleryCharge: 0.5,
    },
    {
      name: "Full",
      artilleryCharge: 0.57,
    },
  ],
  shellTypes: [Rocket_CUP_Grad],
  isAirFriction: false,
  angleAdjustment: -0.02171,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, Math.cos(angle) * 2.5, 2.71 + Math.sin(angle) * 2.5);
  },
};
