import type { Vector } from "../../lib/vector.ts";
import { ISpritePrinter } from "../../driver-display.ts";
import { FieldType } from "../../game/game-elements.ts";

export interface UIElement {
  action(): void;
  collision(p: Vector): boolean;
  Mark(): void;
  ClearMark(): void;
}

export interface UiSpriteElement extends UIElement {
  draw(ctx: CanvasRenderingContext2D, printer: ISpritePrinter<FieldType>): void;
}

type Area = { start: Vector; end: Vector };

export function boxCollision(area: Area, p: Vector): boolean {
  return p.x >= area.start.x &&
    p.y >= area.start.y &&
    p.x <= area.end.x &&
    p.y <= area.end.y;
}
