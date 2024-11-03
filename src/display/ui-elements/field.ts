import type { Vector } from "../../lib/vector.ts";
import { FieldStatus } from "../../game/game-state.ts";
import { ISpritePrinter } from "../../driver-display.ts";
import { FieldType } from "../../game/game-elements.ts";
import { GameRules } from "../../game/configuration/game-rules.ts";
import { boxCollision, UiSpriteElement } from "./ui-elements.ts";

export class UiField implements UiSpriteElement {
  start: Vector;
  end: Vector;
  size: Vector;
  fieldStatus: FieldStatus;
  live: boolean;
  actionHandler: () => void;
  markerHandler: () => boolean;

  marked: boolean = false;

  constructor(
    f: FieldStatus,
    start: Vector,
    size: Vector,
    rules: GameRules,
    actionHandler: () => void,
    markebleHandler: () => boolean,
  ) {
    this.start = start;
    this.size = size;
    this.end = start.add(size);
    this.fieldStatus = f;
    this.live = rules.fields[f.fieldType].live;
    this.actionHandler = actionHandler;
    this.markerHandler = markebleHandler;
  }

  ClearMark(): void {
    this.marked = false;
  }

  Mark(): void {
    this.marked = this.markerHandler();
  }

  collision(p: Vector): boolean {
    return boxCollision({ start: this.start, end: this.end }, p);
  }

  action(): void {
    if (this.marked) {
      this.actionHandler();
    }
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    printer: ISpritePrinter<FieldType>,
  ): void {
    const f = this.fieldStatus;

    printer.drawSpriteType(
      ctx,
      this.start,
      this.fieldStatus.fieldType,
    );

    if (this.live) {
      if (f.playerId !== null) {
        ctx.fillStyle = f.playerId === 1 ? "red" : "blue";
        ctx.fillRect(
          this.start.x + 105,
          this.start.y + 105,
          10,
          10,
        );
      } else {
        ctx.fillStyle = "gray";
      }

      if (this.marked) {
        ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
      }

      const text = `${f.units}-${f.unitsUnderConstruction}`;
      ctx.fillText(
        text,
        this.start.x + 110 - (ctx.measureText(text).width / 2),
        this.start.y + 110 + 35,
      );
    }
  }
}
