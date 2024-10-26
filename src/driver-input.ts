import { Vector } from "./lib/vector.ts";

export class DriverInput {
  constructor(
    canvas: HTMLCanvasElement,
  ) {
    this.initInputEventListeners(canvas);
  }

  private initInputEventListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      this.handlePointerStart(this.ToScreenCoords(e));
    });

    canvas.addEventListener("pointerup", (e: PointerEvent) => {
      this.handlePointerEnd(this.ToScreenCoords(e));
    });

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.handlePointerMove(this.ToScreenCoords(e));
    });
  }

  private ToScreenCoords(e: { offsetX: number; offsetY: number }) {
    return (new Vector(e.offsetX, e.offsetY)).mul(globalThis.devicePixelRatio)
      .round();
  }

  private handlePointerStart(screenPosition: Vector) {
    console.log("PointerStart", screenPosition);
  }

  private handlePointerEnd(screenPosition: Vector) {
    console.log("handlePointerEnd", screenPosition);
  }

  private handlePointerMove(screenPosition: Vector) {
    console.log("handlePointerMove", screenPosition);
  }
}
