export interface AngleSolution {
  elevation: number; // The angle found for the shot
  artilleryAngle: number; // The angle corrected for the artillery
  distance: number; // Distance achieved by the shot
  tof: number; // Time of flight
  exitAngle: number; // Exit angle of the shell
  apex: number; // Apex height of the shot
}
