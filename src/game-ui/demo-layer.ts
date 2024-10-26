import { ISpritePrinter, LayerSprite } from "../driver-display.ts";
import { Vector } from "../lib/vector.ts";
import { SpriteType } from "../display/sprite-config.ts";

export class DemoLayer implements LayerSprite<SpriteType> {
  public spritePrinter: ISpritePrinter<SpriteType> | null = null;

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(
      10,
      10,
      ctx.canvas.width - 20,
      ctx.canvas.height - 20,
    );

    this.spritePrinter?.drawSpriteType(
      ctx,
      new Vector(100, 100),
      SpriteType.stone,
    );
  }
}
