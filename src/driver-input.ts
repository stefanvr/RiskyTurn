import { Vector } from "./lib/vector.ts";

export interface AppEventsHandler {
  handlePointerStart(position: Vector): void;
  handlePointerEnd(position: Vector): void;
  handlePointerMove(position: Vector): void;
}

export class DriverInput {
  eventHandler: AppEventsHandler;

  constructor(
    canvas: HTMLCanvasElement,
    eventHandler: AppEventsHandler,
  ) {
    this.initInputEventListeners(canvas);
    this.eventHandler = eventHandler;
  }

  private initInputEventListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointerdown", (e: PointerEvent) => {
      this.eventHandler.handlePointerStart(this.ToScreenCoords(e));
    });

    canvas.addEventListener("pointerup", (e: PointerEvent) => {
      this.eventHandler.handlePointerEnd(this.ToScreenCoords(e));
    });

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.eventHandler.handlePointerMove(this.ToScreenCoords(e));
    });
  }

  private ToScreenCoords(e: { offsetX: number; offsetY: number }) {
    return (new Vector(e.offsetX, e.offsetY)).mul(globalThis.devicePixelRatio)
      .round();
  }
}
