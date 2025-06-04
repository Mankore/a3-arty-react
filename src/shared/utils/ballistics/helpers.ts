export function toDegrees(rad: number) {
  return (180 / Math.PI) * rad;
}

export function toRadians(grad: number) {
  return (Math.PI / 180) * grad;
}

export function getRange(
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

export function getAzimuth(x1: number, y1: number, x2: number, y2: number) {
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

export function getAltitudeDiff(x: number, y: number) {
  return y - x;
}
