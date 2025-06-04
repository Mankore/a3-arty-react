import { Artillery } from "../types";
import { Vector } from "../vector";
import {
  Shell_FFV441_HE_RHS,
  Shell_FFV502_HEDP_RHS,
  Shell_FFV751_HEAT_RHS,
} from "../shells";

export const Arty_MAAWS_RHS: Artillery = {
  name: "M3 MAAWS (RHS)",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 80,
  fireModes: [
    {
      name: "Default",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [
    Shell_FFV441_HE_RHS,
    Shell_FFV502_HEDP_RHS,
    Shell_FFV751_HEAT_RHS,
  ],
  isAirFriction: false,
  // Switching back from vanilla laser designator, elevation is reduced by -0,36
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (angle: number): Vector {
    return new Vector(
      0.17,
      Math.cos(angle) * 0.59,
      1.5 + Math.sin(angle) * 0.59,
    );
  },
};
