import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_3_WOF_27 } from "../shells";

export const Arty_2S3M1: Artillery = {
  name: "2S3M1",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 66.5,
  fireModes: [
    {
      name: "Full Charge",
      artilleryCharge: 0.634,
    },
    {
      name: "Charge 1",
      artilleryCharge: 0.54,
    },
    {
      name: "Charge 2",
      artilleryCharge: 0.47,
    },
    {
      name: "Charge 3",
      artilleryCharge: 0.4,
    },
    {
      name: "Charge 4",
      artilleryCharge: 0.346,
    },
    {
      name: "Charge 5",
      artilleryCharge: 0.298,
    },
    {
      name: "Charge 6",
      artilleryCharge: 0.256,
    },
  ],
  shellTypes: [Shell_3_WOF_27],
  isAirFriction: false,
  angleAdjustment: -0.2349,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, Math.cos(angle) * 1.88, 1.96 + Math.sin(angle) * 1.88);
  },
};
