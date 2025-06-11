import { Artillery } from "../types";
import { Vector } from "../vector";
import { Shell_82mm_AMOS } from "../shells";

/**
 * MK6 Mortar Artillery Configuration
 * Behaves strangely in-game
 * Angle of the shell when being fired does not match optics, angle does not change lineraly
 * So angle adjustment cannot be used
 */
export const Arty_MK6: Artillery = {
  name: "MK6 Mortar",
  simulationStep: 0.05,
  minAngle: 45,
  maxAngle: 88,
  fireModes: [
    {
      name: "Semi (close)",
      artilleryCharge: 0.35,
    },
    {
      name: "Semi (medium)",
      artilleryCharge: 0.7,
    },
    {
      name: "Semi (far)",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_82mm_AMOS],
  isAirFriction: false,
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (): Vector {
    return new Vector(0, 0.92, 0.68);
  },
};
