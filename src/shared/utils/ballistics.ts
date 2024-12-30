import { Artillery, FireMode, ShellType } from "./types";
import { Vector } from "./vector";

const GRAVITY = 9.8066;

function toDegrees(rad: number) {
  return (180 / Math.PI) * rad;
}

function toRadians(grad: number) {
  return (Math.PI / 180) * grad;
}

function getRange(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  z1: number = 0,
  z2: number = 0,
) {
  const valX = Math.pow(x1 - x2, 2);
  const valY = Math.pow(y1 - y2, 2);
  const valZ = Math.pow(z1 - z2, 2);
  const range = Math.sqrt(valX + valY + valZ);
  return range;
}

function getAzimuth(x1: number, y1: number, x2: number, y2: number) {
  const valX = x1 - x2;
  const valY = y1 - y2;
  const atan = Math.atan(valY / valX);
  const degrees = toDegrees(atan);
  let approxAzimuth;
  if (x1 > x2) {
    approxAzimuth = 270;
  } else {
    approxAzimuth = 90;
  }
  const result = approxAzimuth - degrees;
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

  return [currentPos.y, tof, toDegrees(radians), apex];
}

function getAngleSolutionForRange(
  zeroRange: number,
  muzzleVelocity: number,
  altDiff: number,
  artillery: Artillery,
  shell: ShellType,
  isTopDown: boolean,
) {
  const angleTolerance = toRadians(0.02);
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

    if (Math.abs(maxAngle - minAngle) < angleTolerance) {
      break;
    }

    ++attemptCount;
  }

  const maxError = 20;

  if (Math.abs(px - zeroRange) > maxError) {
    return { currentAngle: 0, tof: 0, exitAngle, apex, px };
  }

  console.log({ currentAngle });

  currentAngle += artillery.angleAdjustment;

  return { currentAngle, tof, exitAngle, apex, px };
}

function getMaxRange(
  artillery: Artillery,
  shell: ShellType,
  fireMode: FireMode,
) {
  const angleStep = 0.2;
  let maxRange = 0;
  const muzzleVelocity = shell.initSpeed * fireMode.artilleryCharge;
  let currentAngle = artillery.minAngle + artillery.maxAngle / 2;
  let currentRange = 0;

  if (!artillery.isAirFriction) {
    currentAngle = 45;
    maxRange = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      0,
    )[0];
    return { maxRange, currentAngle };
  }

  do {
    currentRange = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      0,
    )[0];
    if (maxRange < currentRange) {
      maxRange = currentRange;
      currentAngle += angleStep;
    }
  } while (currentRange >= maxRange && currentAngle < artillery.maxAngle);

  currentAngle -= angleStep * 2;

  do {
    currentRange = simulateShotForAngle(
      muzzleVelocity,
      currentAngle,
      artillery,
      shell,
      0,
    )[0];
    if (maxRange < currentRange) {
      maxRange = currentRange;
      currentAngle -= angleStep;
    }
  } while (currentRange >= maxRange && currentAngle > artillery.minAngle);

  return { maxRange, currentAngle };
}

export {
  simulateShotForAngle,
  getAngleSolutionForRange,
  getRange,
  getAzimuth,
  getAltitudeDiff,
  getMaxRange,
  toDegrees,
  toRadians,
};
