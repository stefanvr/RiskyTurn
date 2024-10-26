import { DriverDisplay } from "./driver-display.ts";

export class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  display: DriverDisplay;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.display = new DriverDisplay(this.ctx);
  }

  public start() {
    this.display.draw();
  }
}
