import type { Vector } from "../../lib/vector.ts";
import { boxCollision, UIElement } from "./ui-elements.ts";

export type ButtonXCallback = {
  action: () => void;
};

export class ButtonX implements UIElement {
  start: Vector;
  end: Vector;
  size: Vector;
  callback: ButtonXCallback;
  marked: boolean = false;

  constructor(
    start: Vector,
    size: Vector,
    callback: ButtonXCallback,
  ) {
    this.start = start;
    this.size = size;
    this.end = start.add(size);
    this.callback = callback;
  }

  public action() {
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
    // Draw close button (X) in top-right corner
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.moveTo(this.start.x, this.end.y);
    ctx.lineTo(this.end.x, this.start.y);
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
