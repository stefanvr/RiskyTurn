import type { Vector } from "../../lib/vector.ts";

type Area = { start: Vector; end: Vector };

function boxCollision(area: Area, p: Vector): boolean {
  return p.x >= area.start.x &&
    p.y >= area.start.y &&
    p.x <= area.end.x &&
    p.y <= area.end.y;
}

export type ButtonCallback = {
  text: () => string;
  action: () => void;
};

export class Button {
  start: Vector;
  end: Vector;
  size: Vector;
  callback: ButtonCallback;
  marked: boolean = false;

  constructor(
    start: Vector,
    size: Vector,
    callback: ButtonCallback,
  ) {
    this.start = start;
    this.size = size;
    this.end = start.add(size);
    this.callback = callback;
  }

  public Action() {
    this.callback.action();
  }

  public collision(p: Vector): boolean {
    return boxCollision({ start: this.start, end: this.end }, p);
  }

  public Mark() {
    this.marked = true;
  }

  public ClearMark() {
    this.marked = false;
  }

  Draw(ctx: CanvasRenderingContext2D) {
    // Function to draw a rounded rectangle
    const roundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      radius: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    };

    // Draw pressed button
    const pressedGradient = ctx.createLinearGradient(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y,
    );
    pressedGradient.addColorStop(0, "#8B0000"); // Dark red
    pressedGradient.addColorStop(1, this.marked ? "#FFA500" : "#FF4500"); // Flame red
    ctx.fillStyle = pressedGradient;
    roundRect(this.start.x, this.start.y, this.size.x, this.size.y, 15);
    ctx.fill();
    ctx.fillStyle = "#FFA500"; // Orange
    ctx.font = `bold ${24}px monospace`;
    const text = this.callback.text();
    ctx.fillText(
      text,
      this.start.x + ((this.size.x - ctx.measureText(text).width) / 2),
      this.start.y + (this.size.y / 2) + 6,
    );
  }
}
