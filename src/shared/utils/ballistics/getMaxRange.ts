import { Artillery, FireMode, ShellType } from "../types";
import { simulateShotForAngle } from "./simulateShotForAngle";

const ANGLE_STEP = 0.2;

/**
 * Not used
 * @deprecated
 */
export function getMaxRange(
  artillery: Artillery,
  shell: ShellType,
  fireMode: FireMode,
) {
  let maxRange = 0;
  const muzzleVelocity = shell.initSpeed * fireMode.artilleryCharge;
  let currentAngle = artillery.minAngle + artillery.maxAngle / 2;
  let currentRange = 0;

  if (!artillery.isAirFriction) {
    currentAngle = 45;
    const { px } = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      0,
    );
    maxRange = px;
    return { maxRange, currentAngle };
  }

  do {
    const { px } = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      0,
    );
    currentRange = px;
    if (maxRange < currentRange) {
      maxRange = currentRange;
      currentAngle += ANGLE_STEP;
    }
  } while (currentRange >= maxRange && currentAngle < artillery.maxAngle);

  currentAngle -= ANGLE_STEP * 2;

  do {
    const { px } = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      0,
    );
    currentRange = px;
    if (maxRange < currentRange) {
      maxRange = currentRange;
      currentAngle -= ANGLE_STEP;
    }
  } while (currentRange >= maxRange && currentAngle > artillery.minAngle);

  return { maxRange, currentAngle };
}
