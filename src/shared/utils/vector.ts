export class Vector {
  x: number;
  y: number;
  z: number;
  constructor(...values: number[]) {
    this.x = values[0];
    this.y = values[1];
    this.z = values[2];
  }

  scaleBy(number: number) {
    return new Vector(
      ...[this.x, this.y, this.z].map((component) => component * number),
    );
  }

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }

  subtract(vector: Vector) {
    return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
  }

  length() {
    return Math.hypot(this.x, this.y, this.z);
  }

  toString() {
    return `x: ${this.x}, y: ${this.y}, z: ${this.z}`;
  }
}
