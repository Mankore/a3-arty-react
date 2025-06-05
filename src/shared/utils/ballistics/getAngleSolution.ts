import { Artillery, ShellType } from "../types";
import { simulateShotForAngle } from "./simulateShotForAngle";
import { AngleSolution } from "./types";

const MAX_ERROR = 20; // Maximum acceptable error in meters
const MAX_ATTEMPTS = 50; // Maximum number of attempts to find the angle
const ANGLE_TOLERANCE_DEG = 0.01; // Tolerance for angle adjustment in degrees

interface Args {
  targetRange: number;
  muzzleVelocity: number;
  altDiff: number;
  artillery: Artillery;
  shell: ShellType;
  isHighAngle?: boolean; // Optional parameter to determine if the search is for high angle
}

/**
 * Finds the angle(elevation) required to hit a target at a specified range using binary search.
 */
export function getAngleSolutionForRange({
  targetRange,
  muzzleVelocity,
  altDiff,
  artillery,
  shell,
  isHighAngle,
}: Args): AngleSolution {
  let minAngle = artillery.minAngle;
  let maxAngle = artillery.maxAngle;
  let attemptCount = 0;
  let elevation = 0;
  let simulationResult = { distance: 0, tof: 0, exitAngle: 0, apex: 0 };

  while (attemptCount < MAX_ATTEMPTS) {
    elevation = (minAngle + maxAngle) / 2;
    try {
      simulationResult = simulateShotForAngle(
        muzzleVelocity,
        elevation,
        artillery,
        shell,
        altDiff,
      );
    } catch {
      break;
    }
    const { distance } = simulationResult;

    if (targetRange <= distance) {
      if (!isHighAngle) {
        maxAngle = elevation;
      } else {
        minAngle = elevation;
      }
    } else {
      if (!isHighAngle) {
        minAngle = elevation;
      } else {
        maxAngle = elevation;
      }
    }

    if (isWithinTolerance(minAngle, maxAngle)) {
      break;
    }

    ++attemptCount;
  }

  if (Math.abs(simulationResult.distance - targetRange) > MAX_ERROR) {
    throw new Error(
      `Failed to find angle for range ${targetRange}m. Distance achieved: ${simulationResult.distance}m`,
    );
  }

  const artilleryAngle = elevation + artillery.angleAdjustment;

  return { elevation, artilleryAngle, ...simulationResult };
}

const isWithinTolerance = (min: number, max: number) => {
  return Math.abs(max - min) < ANGLE_TOLERANCE_DEG;
};
