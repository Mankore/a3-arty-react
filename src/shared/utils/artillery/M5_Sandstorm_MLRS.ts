import { Artillery } from "../types";
import { Vector } from "../vector";
import { Rocket_Sandstorm_230 } from "../shells";

export const Arty_M5_Sandstorm_MLRS: Artillery = {
  name: "M5 Sandstorm MLRS",
  simulationStep: 0.05,
  minAngle: 5,
  maxAngle: 66,
  fireModes: [
    {
      name: "1000m-1300m",
      artilleryCharge: 0.135,
    },
    {
      name: "1300m-1700m",
      artilleryCharge: 0.153,
    },
    {
      name: "1700m-2200m",
      artilleryCharge: 0.175,
    },
    {
      name: "2200m-2900m",
      artilleryCharge: 0.2,
    },
    {
      name: "2900m-3800m",
      artilleryCharge: 0.228,
    },
    {
      name: "3800m-5000m",
      artilleryCharge: 0.261,
    },
    {
      name: "5000m-6600m",
      artilleryCharge: 0.3,
    },
    {
      name: "6600m-8500m",
      artilleryCharge: 0.341,
    },
    {
      name: "8500m-11000m",
      artilleryCharge: 0.388,
    },
    {
      name: "11000m-14000m",
      artilleryCharge: 0.44,
    },
    {
      name: "14000m-18000m",
      artilleryCharge: 0.495,
    },
    {
      name: "18000m-23000m",
      artilleryCharge: 0.56,
    },
    {
      name: "23000m-30000m",
      artilleryCharge: 0.639,
    },
    {
      name: "30000m-40000m",
      artilleryCharge: 0.74,
    },
    {
      name: "40000m-52000m",
      artilleryCharge: 0.842,
    },
    {
      name: "52000m-67000m",
      artilleryCharge: 0.96,
    },
  ],
  shellTypes: [Rocket_Sandstorm_230],
  isAirFriction: false,
  angleAdjustment: -1.275,
  getBaseProjectileSpawnPoint: function (): Vector {
    return new Vector(0, -1.5, 2.8);
  },
};
