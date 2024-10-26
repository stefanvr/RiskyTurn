import { type ISpritePrinter, type LayerSprite } from "../driver-display.ts";
import { GameState } from "../game/game-state.ts";
import { Vector } from "../lib/vector.ts";
import { FieldType } from "../game/game-elements.ts";

export const TAG_LAYER_GAME = "game";
export class LayerGame implements LayerSprite<FieldType> {
  public spritePrinter: ISpritePrinter<FieldType> | null = null;
  tag: string = TAG_LAYER_GAME;
  gameState: GameState;

  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.spritePrinter) return;
    const grid = this.gameState.mapStatus.fields;
    const xFieldLength = grid[0].length;
    const yFieldLength = grid.length;

    const xOffset = (ctx.canvas.width - (220 * xFieldLength)) / 2;
    const yOffset = (ctx.canvas.height - (220 * yFieldLength)) / 2;

    for (let y = 0; y < yFieldLength; y++) {
      for (let x = 0; x < xFieldLength; x++) {
        const t = grid[y][x];
        if (t !== null) {
          this.spritePrinter.drawSpriteType(
            ctx,
            new Vector(
              xOffset + (220 * x),
              yOffset + (220 * y),
            ),
            t.fieldType,
          );
        }
      }
    }
  }
}
