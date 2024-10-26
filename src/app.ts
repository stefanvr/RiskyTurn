import { DriverDisplay } from "./driver-display.ts";
import { DriverInput } from "./driver-input.ts";

export class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  display: DriverDisplay;
  input: DriverInput;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.display = new DriverDisplay(this.ctx);
    this.input = new DriverInput(this.canvas);
  }

  public start() {
    this.display.draw();
  }
}
