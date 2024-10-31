import { Layer } from "../driver-display.ts";
import { Vector } from "../lib/vector.ts";
import { Button } from "../display/ui-elements/button.ts";
import { GameAppFlow } from "./game-app-flow.ts";
import { GameEventType } from "./game-flow-events.ts";

const img = new Image();
img.src = "assets/background.png?height=500&width=500";
img.crossOrigin = "anonymous";

export const TAG_LAYER_BACKGROUND = "background";
export class LayerBackground implements Layer {
  tag: string = TAG_LAYER_BACKGROUND;
  button?: Button;
  gameFlowState: GameAppFlow;

  constructor(gameFlowState: GameAppFlow) {
    this.gameFlowState = gameFlowState;
  }

  public action() {
    this.gameFlowState.update(GameEventType.StartGame);
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.button) {
      this.button = new Button(
        new Vector((ctx.canvas.width / 2) - 100, (ctx.canvas.height / 4) * 3),
        new Vector(200, 50),
        {
          text: () => "Start",
          action: this.action.bind(this),
        },
      );
    }
    const scale =
      Math.min(ctx.canvas.width / img.width, ctx.canvas.height / img.height) *
      0.8;
    const x = (ctx.canvas.width / 2) - (img.width / 2) * scale;
    const y = (ctx.canvas.height / 2) - (img.height / 2) * scale;

    // Fill lower third with black
    ctx.fillStyle = "#0b0401";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    this.button.Draw(ctx);
  }

  handlePointerStart(_: Vector): void {}

  handlePointerEnd(position: Vector): void {
    if (this.button?.collision(position)) {
      this.button.Action();
    }
  }

  handlePointerMove(position: Vector): void {
    this.button?.collision(position)
      ? this.button.Mark()
      : this.button?.ClearMark();
  }
}
