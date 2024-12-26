import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_3BK14, Shell_3BM26, Shell_3BM46, Shell_3OF26 } from "../shells";

export const Arty_T_72: Artillery = {
  name: "T-72B3",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 20,
  fireModes: [
    {
      name: "Default",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_3BM46, Shell_3OF26, Shell_3BM26, Shell_3BK14],
  isAirFriction: true,
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (): Vector {
    return new Vector(0, 0, 0);
  },
};
