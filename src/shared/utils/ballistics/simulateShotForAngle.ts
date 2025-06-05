import { Artillery, ShellType } from "../types";
import { Vector } from "../vector";
import { toDegrees, toRadians } from "./helpers";
import { GRAVITY } from "./variables";

export function simulateShotForAngle(
  muzzleVelocity: number,
  angle: number, // Angle in degrees
  artillery: Artillery,
  shell: ShellType,
  altDiff: number = 0,
) {
  const deltaT = artillery.simulationStep;
  const gravityVector = new Vector(0, 0, -GRAVITY);
  const radians = toRadians(angle);

  let speed = calculateInitialSpeedVector(muzzleVelocity, radians);
  let position = artillery.getBaseProjectileSpawnPoint(radians);

  let deltaV = new Vector(0, 0, 0);
  let timeOfFlight = 0;
  let apex = 0;

  while (shouldContinueSimulation(position.z, altDiff, speed.z, timeOfFlight)) {
    position = updatePosition(position, speed, deltaT);
    deltaV = calculateAcceleration(
      speed,
      gravityVector,
      shell,
      artillery,
      timeOfFlight,
    );
    speed = updateSpeed(speed, deltaV, deltaT);
    apex = updateApex(apex, position.z);

    timeOfFlight += deltaT;
  }

  const correctedPosition = applyDistanceCorrection(position, speed, altDiff);

  if (apex < altDiff) {
    throw new Error(
      `Shot did not reach the target altitude. Apex: ${apex}, Altitude Difference: ${altDiff}`,
    );
  }

  return {
    distance: correctedPosition.y,
    tof: timeOfFlight,
    exitAngle: toDegrees(Math.atan2(speed.z, speed.y)),
    apex: apex,
  };
}

function calculateInitialSpeedVector(
  muzzleVelocity: number,
  radians: number,
): Vector {
  return new Vector(
    0,
    Math.cos(radians) * muzzleVelocity,
    Math.sin(radians) * muzzleVelocity,
  );
}

function shouldContinueSimulation(
  currentAltitude: number,
  altDiff: number,
  verticalSpeed: number,
  tof: number,
): boolean {
  return tof < 200 && (currentAltitude >= altDiff || verticalSpeed > 0);
}

function updatePosition(
  position: Vector,
  speed: Vector,
  deltaT: number,
): Vector {
  return position.add(speed.scaleBy(deltaT));
}

function updateSpeed(speed: Vector, deltaV: Vector, deltaT: number): Vector {
  return speed.add(deltaV.scaleBy(deltaT));
}

function updateApex(apex: number, currentAltitude: number): number {
  return Math.max(apex, currentAltitude);
}

function calculateAcceleration(
  speed: Vector,
  gravityVector: Vector,
  shell: ShellType,
  artillery: Artillery,
  tof: number,
): Vector {
  // If artillery uses air friction, return with air friction effect
  if (artillery.isAirFriction) {
    // If shell is a missle or rocket with thrust
    if (shell.thrust && shell.thrustTime) {
      const airFrictionRocketMultiplier = -0.002;
      const missleAirfriction = shell.airFriction * airFrictionRocketMultiplier;

      const remainingThrustTime = Math.max(0, shell.thrustTime - tof);
      const thrustMagnitude =
        shell.thrust *
        Math.min(1, (remainingThrustTime * 4) / shell.thrustTime);
      const thrustVector = new Vector(
        speed.x && thrustMagnitude,
        speed.y && thrustMagnitude,
        speed.z && thrustMagnitude,
      );

      return speed
        .scaleBy(speed.length() * missleAirfriction)
        .add(thrustVector)
        .add(gravityVector);
    }

    return speed.scaleBy(speed.length() * shell.airFriction).add(gravityVector);
  }

  // If no air friction, return gravity vector
  return gravityVector;
}

/**
 * Applies correction to approximate y position of the proejctile at last
 * simulation step.
 *
 * e.g. Last simulation step is few meters below the target,
 * so we need to correct y position to match the target altitude.
 */
function applyDistanceCorrection(
  position: Vector,
  speed: Vector,
  altDiff: number,
): Vector {
  const deltaZRatio = (altDiff - position.z) / speed.z;
  const distanceCorrection = Math.abs(speed.y * deltaZRatio);
  position.y -= distanceCorrection;
  return position;
}
