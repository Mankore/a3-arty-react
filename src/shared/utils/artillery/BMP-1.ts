import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_OG15, Shell_PG15 } from "../shells";

export const Arty_BMP_1: Artillery = {
  name: "BMP-1",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 20,
  fireModes: [
    {
      name: "Default",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_OG15, Shell_PG15],
  isAirFriction: true,
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (): Vector {
    return new Vector(0, 0, 0);
  },
};
