import { Vector } from "./lib/vector.ts";
import { GameEventType } from "./game-ui/game-flow-events.ts";

export interface AppEventsHandler {
  update(event: GameEventType): void;
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

  private handlePointerStart(_: Vector) {
    //console.log("PointerStart", screenPosition);
  }

  private demoToggle = true;
  private handlePointerEnd(_: Vector) {
    //console.log("handlePointerEnd", screenPosition);
    this.eventHandler.update(
      this.demoToggle ? GameEventType.StartGame : GameEventType.GameFinished,
    ); // demo
    this.demoToggle = !this.demoToggle;
  }

  private handlePointerMove(_: Vector) {
    //console.log("handlePointerMove", screenPosition);
  }
}
