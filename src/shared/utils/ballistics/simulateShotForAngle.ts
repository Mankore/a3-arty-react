import { Artillery, ShellType } from "../types";
import { Vector } from "../vector";
import { toDegrees, toRadians } from "./helpers";
import { GRAVITY } from "./variables";

/**
 * Simulates a shot for a given angle
 */
export function simulateShotForAngle(
  muzzleVelocity: number,
  angle: number,
  artillery: Artillery,
  shell: ShellType,
  altDiff: number = 0,
) {
  const deltaT = artillery.simulationStep;
  const gravV = new Vector(0, 0, -GRAVITY);
  let radians = toRadians(angle);
  let speed = new Vector(
    0,
    Math.cos(radians) * muzzleVelocity,
    Math.sin(radians) * muzzleVelocity,
  );
  let currentPos = artillery.getBaseProjectileSpawnPoint(radians);

  let deltaV = new Vector(0, 0, 0);
  let tof = 0;
  let apex = 0;

  while (currentPos.z >= altDiff || speed.z > 0) {
    currentPos = currentPos.add(speed.scaleBy(deltaT));
    deltaV = artillery.isAirFriction
      ? speed.scaleBy(speed.length() * shell.airFriction).add(gravV)
      : gravV;

    if (shell.thrust && shell.thrustTime && !artillery.isAirFriction) {
      const airFrictionRocketMultiplier = -0.002;
      deltaV.scaleBy(1 / airFrictionRocketMultiplier);
    }

    speed = speed.add(deltaV.scaleBy(deltaT));
    tof += deltaT;

    if (apex < currentPos.z) apex = currentPos.z;

    radians = Math.atan2(speed.z, speed.y);
  }

  const vzRatio = (altDiff - currentPos.z) / speed.z;
  const pyCorrection = Math.abs(speed.y * vzRatio);
  currentPos.y -= pyCorrection;

  if (apex < altDiff) {
    currentPos.y = 0;
    tof = 0;
  }

  return {
    distance: currentPos.y,
    tof: tof,
    exitAngle: toDegrees(radians),
    apex: apex,
  };
}
