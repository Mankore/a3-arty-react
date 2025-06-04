import { Artillery, ShellType } from "../types";
import { toRadians } from "./helpers";
import { simulateShotForAngle } from "./simulateShotForAngle";

const MAX_ERROR = 20; // Maximum acceptable error in meters
const MAX_ATTEMPTS = 50; // Maximum number of attempts to find the angle
const ANGLE_TOLERANCE_RAD = toRadians(0.02); // Tolerance for angle adjustment in radians

/**
 * Finds the angle(elevation) required to hit a target at a specified range using binary search.
 * @returns An object containing the calculated angle, time of flight, exit angle, apex height, and final position.
 */
export function getAngleSolutionForRange(
  zeroRange: number,
  muzzleVelocity: number,
  altDiff: number,
  artillery: Artillery,
  shell: ShellType,
  isTopDown: boolean,
) {
  let minAngle = artillery.minAngle;
  let maxAngle = artillery.maxAngle;
  let attemptCount = 0;
  let px = 0,
    tof = 0,
    exitAngle = 0,
    apex = 0,
    currentAngle = 0;

  while (attemptCount < MAX_ATTEMPTS) {
    currentAngle = (minAngle + maxAngle) / 2;
    [px, tof, exitAngle, apex] = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      altDiff,
    );
    if (zeroRange <= px) {
      if (!isTopDown) {
        maxAngle = currentAngle;
      } else {
        minAngle = currentAngle;
      }
    } else {
      if (!isTopDown) {
        minAngle = currentAngle;
      } else {
        maxAngle = currentAngle;
      }
    }

    if (Math.abs(maxAngle - minAngle) < ANGLE_TOLERANCE_RAD) {
      break;
    }

    ++attemptCount;
  }

  if (Math.abs(px - zeroRange) > MAX_ERROR) {
    return { currentAngle: 0, tof: 0, exitAngle, apex, px };
  }

  console.log({ currentAngle });

  currentAngle += artillery.angleAdjustment;

  return { currentAngle, tof, exitAngle, apex, px };
}
