import { Artillery, ShellType } from "./types";
import { Vector } from "./vector";

const GRAVITY = 9.8066;

function toDegrees(rad: number) {
  return (180 / Math.PI) * rad;
}

function toRadians(grad: number) {
  return (Math.PI / 180) * grad;
}

function getRange(x1: number, y1: number, x2: number, y2: number, z1: number = 0, z2: number = 0) {
  const valX = Math.pow(x1 - x2, 2);
  const valY = Math.pow(y1 - y2, 2);
  const valZ = Math.pow(z1 - z2, 2);
  const range = Math.sqrt(valX + valY + valZ);
  return range;
}

function getBearing(x1: number, y1: number, x2: number, y2: number) {
  const valX = x1 - x2;
  const valY = y1 - y2;
  const atan = Math.atan(valY / valX);
  const degrees = toDegrees(atan);
  let approxBearing;
  if (x1 > x2) {
    approxBearing = 270;
  } else {
    approxBearing = 90;
  }
  const result = approxBearing - degrees;
  return result;
}

function getAltitudeDiff(x: number, y: number) {
  return y - x;
}

function simulateShotForAngle(
  muzzleVelocity: number,
  angle: number,
  artillery: Artillery,
  shell: ShellType,
  altDiff: number = 0
) {
  const deltaT = artillery.simulationStep;
  const gravV = new Vector(0, 0, -GRAVITY);
  let radians = toRadians(angle);
  let speed = new Vector(0, Math.cos(radians) * muzzleVelocity, Math.sin(radians) * muzzleVelocity);
  let currentPos = artillery.getBaseProjectileSpawnPoint(radians);

  let deltaV = new Vector(0, 0, 0);
  let tof = 0;
  let apex = 0;

  while (currentPos.z >= altDiff || speed.z > 0) {
    // console.log({ deltaV, currentPos, speed, radians });
    currentPos = currentPos.add(speed.scaleBy(deltaT));
    deltaV = artillery.isAirFriction
      ? speed.scaleBy(speed.length() * shell.airFriction).add(gravV)
      : gravV;

    speed = speed.add(deltaV.scaleBy(deltaT));
    tof += deltaT;

    if (apex < currentPos.z) apex = currentPos.z;

    radians = Math.atan2(speed.z, speed.y);
  }

  let vzRatio = (altDiff - currentPos.z) / speed.z;
  let pyCorrection = Math.abs(speed.y * vzRatio);
  currentPos.y -= pyCorrection;

  if (apex < altDiff) {
    currentPos.y = 0;
    tof = 0;
  }

  return [currentPos.y, tof, toDegrees(radians), apex];
}

function getAngleSolutionForRange(
  zeroRange: number,
  muzzleVelocity: number,
  altDiff: number,
  artillery: Artillery,
  shell: ShellType,
  isTopDown: boolean
) {
  const angleTolerance = toRadians(0.05);
  let minAngle = artillery.minAngle;
  let maxAngle = artillery.maxAngle;
  let attemptCount = 0;
  let px = 0,
    tof = 0,
    exitAngle = 0,
    apex = 0,
    currentAngle = 0;

  while (attemptCount < 50) {
    currentAngle = (minAngle + maxAngle) / 2;
    [px, tof, exitAngle, apex] = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      altDiff
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

    if (Math.abs(maxAngle - minAngle) < angleTolerance) {
      break;
    }

    ++attemptCount;
  }

  const maxError = 20;

  if (Math.abs(px - zeroRange) > maxError) {
    return { currentAngle: 0, tof: 0, exitAngle, apex, px };
  }

  currentAngle += artillery.angleAdjustment;

  return { currentAngle, tof, exitAngle, apex, px };
}

export { simulateShotForAngle, getAngleSolutionForRange, getRange, getBearing, getAltitudeDiff };