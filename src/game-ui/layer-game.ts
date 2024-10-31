import { type ISpritePrinter, type LayerSprite } from "../driver-display.ts";
import { GameState } from "../game/game-state.ts";
import { Vector } from "../lib/vector.ts";
import { FieldType } from "../game/game-elements.ts";
import { GameAppState } from "./game-app-state.ts";

export const TAG_LAYER_GAME = "game";
export class LayerGame implements LayerSprite<FieldType> {
  public spritePrinter: ISpritePrinter<FieldType> | null = null;
  tag: string = TAG_LAYER_GAME;
  gameState: GameState;
  gameAppState: GameAppState;

  constructor(gameState: GameState, GameAppState: GameAppState) {
    this.gameState = gameState;
    this.gameAppState = GameAppState;
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.spritePrinter) return;
    const grid = this.gameState.mapStatus.fields;
    const xFieldLength = grid[0].length;
    const yFieldLength = grid.length;

    const xOffset = (ctx.canvas.width - (220 * xFieldLength)) / 2;
    const yOffset = (ctx.canvas.height - (220 * yFieldLength)) / 2;

    ctx.fillStyle = "gray";
    ctx.font = `bold ${24}px monospace`;
    ctx.fillText(
      `Game Phase:${this.gameAppState.status.toString()}`,
      0,
      20,
    );
    ctx.fillText(
      `Game Phase:${this.gameState.gameStatus.phase.toString()}`,
      0,
      40,
    );

    Object.entries(this.gameState.playersStatus).forEach(
      ([id, playerStatus]) => {
        ctx.fillStyle = +id === 1 ? "red" : "blue";
        ctx.fillText(
          `Player: Money-${playerStatus.money} Units-${playerStatus.placeableUnits} Domination-${playerStatus.mapDomination}`,
          0,
          40 + (24 * +id),
        );
      },
    );

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

          if (this.gameState.rules.fields[t.fieldType].live) {
            if (t.playerId !== null) {
              ctx.fillStyle = t.playerId === 1 ? "red" : "blue";
              ctx.fillRect(
                xOffset + (220 * x) + 105,
                yOffset + (220 * y) + 105,
                10,
                10,
              );
            } else {
              ctx.fillStyle = "gray";
            }

            const text = `${t.units}-${t.unitsUnderConstruction}`;
            ctx.fillText(
              text,
              xOffset + (220 * x) + 110 - (ctx.measureText(text).width / 2),
              yOffset + (220 * y) + 110 + 35,
            );
          }
        }
      }
    }
  }

  handlePointerStart(_: Vector): void {
  }

  handlePointerEnd(position: Vector): void {
  }

  handlePointerMove(position: Vector): void {
  }
}
