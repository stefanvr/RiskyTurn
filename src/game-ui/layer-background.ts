import { Layer } from "../driver-display.ts";
import { Vector } from "../lib/vector.ts";

const img = new Image();
img.src = "assets/background.png?height=500&width=500";
img.crossOrigin = "anonymous";

export const TAG_LAYER_BACKGROUND = "background";
export class LayerBackground implements Layer {
  tag: string = TAG_LAYER_BACKGROUND;

  public render(ctx: CanvasRenderingContext2D) {
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
  }

  handlePointerMove(position: Vector): void {
  }
}
