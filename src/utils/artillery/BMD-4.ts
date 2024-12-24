import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_3UOF17 } from "../shells";

export const Arty_BMD_4: Artillery = {
  name: "BMD-4",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 60,
  fireModes: [
    {
      name: "Default",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_3UOF17],
  isAirFriction: true,
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, 0, 0);
  },
};
