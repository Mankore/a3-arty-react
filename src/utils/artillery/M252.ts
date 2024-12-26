import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_M821 } from "../shells";

export const Arty_M252: Artillery = {
  name: "M252",
  simulationStep: 0.05,
  minAngle: 45,
  maxAngle: 85.2,
  fireModes: [
    {
      name: "Charge 0",
      artilleryCharge: 0.2,
    },
    {
      name: "Charge 1",
      artilleryCharge: 0.4,
    },
    {
      name: "Charge 2",
      artilleryCharge: 0.6,
    },
    {
      name: "Charge 3",
      artilleryCharge: 0.8,
    },
    {
      name: "Charge 4",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_M821],
  isAirFriction: false,
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, Math.cos(angle) * 0.92, 1 + Math.sin(angle) * 0.92);
  },
};
