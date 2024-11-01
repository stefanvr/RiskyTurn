import { type ISpritePrinter, type LayerSprite } from "../driver-display.ts";
import { GameState } from "../game/game-state.ts";
import { Vector } from "../lib/vector.ts";
import { FieldType } from "../game/game-elements.ts";
import { GameAppState } from "./game-app-state.ts";
import { Button } from "../display/ui-elements/button.ts";
import { UiField } from "../display/ui-elements/field.ts";
import type { UiSpriteElement } from "../display/ui-elements/ui-elements.ts";

export const TAG_LAYER_GAME = "game";
export class LayerGame implements LayerSprite<FieldType> {
  public spritePrinter: ISpritePrinter<FieldType> | null = null;
  tag: string = TAG_LAYER_GAME;
  gameState: GameState;
  gameAppState: GameAppState;
  button: Button;
  elements: UiSpriteElement[][] | null = null;
  constructor(gameState: GameState, GameAppState: GameAppState) {
    this.gameState = gameState;
    this.gameAppState = GameAppState;
    this.button = new Button(
      new Vector(100, 20),
      new Vector(400, 50),
      this.gameAppState.getAction(),
    );
  }

  public stopAnimation() {}

  public resize(ctx: CanvasRenderingContext2D): void {
    this.setupBoard(ctx);
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.spritePrinter) return;
    if (!this.elements) this.setupBoard(ctx);

    ctx.fillStyle = "gray";
    ctx.font = `bold ${24}px monospace`;
    ctx.fillText(
      `Game Phase:${this.gameState.gameStatus.phase.toString()}`,
      60,
      100,
    );
    this.button.Draw(ctx);
    this.elements!.forEach((e) => {
      e.forEach((e) => e.draw(ctx, this.spritePrinter!));
    });
  }

  setupBoard(ctx: CanvasRenderingContext2D) {
    const grid = this.gameState.mapStatus.fields;
    const xFieldLength = grid[0].length;
    const yFieldLength = grid.length;
    const xOffset = (ctx.canvas.width - (220 * xFieldLength)) / 2;
    const yOffset = (ctx.canvas.height - (220 * yFieldLength)) / 2;
    const elements: UiSpriteElement[][] = [];

    for (let y = 0; y < yFieldLength; y++) {
      const row: UiSpriteElement[] = [];
      for (let x = 0; x < xFieldLength; x++) {
        row.push(
          new UiField(
            grid[y][x],
            new Vector(xOffset + (x * 220), yOffset + (y * 220)),
            new Vector(220, 220),
            this.gameState.rules,
          ),
        );
      }
      elements.push(row);
    }

    this.elements = elements;
  }

  handlePointerStart(_: Vector): void {
  }

  handlePointerEnd(position: Vector): void {
    if (this.button?.collision(position)) {
      this.button.action();
      this.button?.ClearMark();
    }
  }

  handlePointerMove(position: Vector): void {
    this.button?.collision(position)
      ? this.button.Mark()
      : this.button?.ClearMark();
  }
}
