import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_3OF56, Shell_3BK13 } from "../shells";

export const Arty_2S1_direct: Artillery = {
  Name: "2S1 Direct Fire",
  simulationStep: 0.05,
  minAngle: 3,
  maxAngle: 70,
  fireModes: [
    {
      name: "Full Charge",
      artilleryCharge: 1,
    },
    {
      name: "Reduced Charge",
      artilleryCharge: 0.81,
    },
    {
      name: "Charge 1",
      artilleryCharge: 0.71,
    },
    {
      name: "Charge 2",
      artilleryCharge: 0.6,
    },
    {
      name: "Charge 3",
      artilleryCharge: 0.48,
    },
    {
      name: "Charge 4",
      artilleryCharge: 0.4,
    },
  ],
  shellTypes: [Shell_3OF56, Shell_3BK13],
  isAirFriction: true,
  angleAdjustment: -0.14,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, Math.cos(angle) * 1.47, 1.85 + Math.sin(angle) * 1.47);
  },
};
