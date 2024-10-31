export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  mul(multiplier: number): Vector {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }

  round(): Vector {
    return new Vector(Math.round(this.x), Math.round(this.y));
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }
}
