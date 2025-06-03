import { Artillery } from "../types";
import { Vector } from "../vector";
import {
  Shell_MAAWS_HE44,
  Shell_MAAWS_HEAT55,
  Shell_MAAWS_HEAT75,
} from "../shells";

export const Arty_MAAWS_Vanilla: Artillery = {
  name: "MAAWS Mk4 Mod 0 (Vanilla)",
  simulationStep: 0.05,
  minAngle: 0,
  maxAngle: 80,
  fireModes: [
    {
      name: "Default",
      artilleryCharge: 1,
    },
  ],
  shellTypes: [Shell_MAAWS_HE44, Shell_MAAWS_HEAT55, Shell_MAAWS_HEAT75],
  isAirFriction: false,
  angleAdjustment: 0,
  getBaseProjectileSpawnPoint: function (): Vector {
    return new Vector(0, 0, 0);
  },
};
