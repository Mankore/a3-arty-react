import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_53OF546, Shell_BR540_AP, Shell_BP540_HEAT } from "../shells";

// Different charges have no effect here
// Calculate with Full Charge only for accurate results
export const Arty_2S3M1_direct: Artillery = {
  name: "2S3M1 Direct Fire",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 66.5,
  fireModes: [
    {
      name: "Full Charge",
      artilleryCharge: 1,
    },
    {
      name: "Charge 1",
      artilleryCharge: 0.92,
    },
    {
      name: "Charge 2",
      artilleryCharge: 0.78,
    },
    {
      name: "Charge 3",
      artilleryCharge: 0.64,
    },
    {
      name: "Charge 4",
      artilleryCharge: 0.58,
    },
    {
      name: "Charge 5",
      artilleryCharge: 0.51,
    },
    {
      name: "Charge 6",
      artilleryCharge: 0.43,
    },
  ],
  shellTypes: [Shell_53OF546, Shell_BR540_AP, Shell_BP540_HEAT],
  isAirFriction: true,
  angleAdjustment: -0.2282,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(0, Math.cos(angle) * 1.88, 1.96 + Math.sin(angle) * 1.88);
  },
};
