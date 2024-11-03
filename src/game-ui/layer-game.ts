import { type ISpritePrinter, type LayerSprite } from "../driver-display.ts";
import { FieldStatus, GameState } from "../game/game-state.ts";
import { Vector } from "../lib/vector.ts";
import { FieldType } from "../game/game-elements.ts";
import { GameAppState } from "./game-app-state.ts";
import { Button } from "../display/ui-elements/button.ts";
import { UiField } from "../display/ui-elements/field.ts";
import { GameAppFlow } from "./game-app-flow.ts";
import { GameEventType } from "./game-flow-events.ts";
import { MenuItems, ModalFieldPopupMenu } from "./modal-field-popup-menu.ts";
import { PlayerActionType } from "../game/interaction/game-actions.ts";

export const TAG_LAYER_GAME = "game";
export class LayerGame implements LayerSprite<FieldType> {
  public spritePrinter: ISpritePrinter<FieldType> | null = null;
  tag: string = TAG_LAYER_GAME;
  gameState: GameState;
  gameAppState: GameAppState;
  button: Button;
  elements: UiField[][] | null = null;

  gameAppFlow: GameAppFlow;

  startSelection: { x: number; y: number; status: FieldStatus } | null = null;
  attackArrow: Vector | null = null;

  constructor(
    gameState: GameState,
    GameAppState: GameAppState,
    gameAppFlow: GameAppFlow,
  ) {
    this.gameState = gameState;
    this.gameAppState = GameAppState;
    this.gameAppFlow = gameAppFlow;
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

    if (this.startSelection != null && this.attackArrow !== null) {
      const grid = this.gameState.mapStatus.fields;
      const xFieldLength = grid[0].length;
      const yFieldLength = grid.length;
      const xOffset = (ctx.canvas.width - (220 * xFieldLength)) / 2;
      const yOffset = (ctx.canvas.height - (220 * yFieldLength)) / 2;

      ctx.fillStyle = "green";
      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;

      if (this.startSelection.x > this.attackArrow.x) {
        x1 = 40;
        x2 = xOffset + (this.attackArrow.x * 220) + 200;
      } else {
        x1 = xOffset + (this.startSelection.x * 220) + 200;
        x2 = 40;
      }
      if (this.startSelection.y > this.attackArrow.y) {
        y1 = yOffset + (this.startSelection.y * 220 - 110);
        y2 = 40;
      } else {
        y1 = yOffset + (this.startSelection.y * 220 + 200);
        y2 = 40;
      }

      if (this.startSelection.x === this.attackArrow.x) {
        x1 = xOffset + (this.startSelection.x * 220) + 100;
        x2 = 20;
      }
      if (this.startSelection.y === this.attackArrow.y) {
        y1 = yOffset + (this.startSelection.y * 220 + 100);
        y2 = 20;
      }

      ctx.fillRect(x1, y1, x2, y2);
    }
  }

  setupBoard(ctx: CanvasRenderingContext2D) {
    const grid = this.gameState.mapStatus.fields;
    const xFieldLength = grid[0].length;
    const yFieldLength = grid.length;
    const xOffset = (ctx.canvas.width - (220 * xFieldLength)) / 2;
    const yOffset = (ctx.canvas.height - (220 * yFieldLength)) / 2;
    const elements: UiField[][] = [];

    for (let y = 0; y < yFieldLength; y++) {
      const row: UiField[] = [];
      for (let x = 0; x < xFieldLength; x++) {
        row.push(
          new UiField(
            { x: x, y: y, status: grid[y][x] },
            new Vector(xOffset + (x * 220), yOffset + (y * 220)),
            new Vector(220, 220),
            this.gameState.rules,
            (() => this.fieldActionHandler(x, y)).bind(this),
            (() => this.fieldMarkHandler(x, y)).bind(this),
          ),
        );
      }
      elements.push(row);
    }

    this.elements = elements;
  }

  private fieldActionHandler(x: number, y: number) {
    console.log(`fieldActionHandler ${x} ${y}`);

    const menuItems: MenuItems = {
      menuTitle: "Actions",
      items: [
        {
          text: "Place Unit",
          enabled: true,
          callback: () => {
            console.log("Place Unit");
            this.gameAppState.enterPLayerAction(
              {
                type: PlayerActionType.PlaceUnits,
                playerId: this.gameAppState.playerId,
                unitPlacement: {
                  targetField: new Vector(x, y),
                  units: 2,
                },
              },
            );
          },
        },
        {
          text: "Buy Unit",
          enabled: false,
          callback: () => {
            console.log("Buy Unit");
          },
        },
        {
          text: "Defense",
          enabled: false,
          callback: () => {
            console.log("Defense");
          },
        },
      ],
    };

    this.gameAppFlow.update(
      {
        type: GameEventType.ShowModal,
        model: new ModalFieldPopupMenu(menuItems),
      },
    );
  }

  private fieldMarkHandler(x: number, y: number): boolean {
    return this.gameState.mapStatus.fields[y][x].playerId ===
      this.gameAppState.playerId;
  }

  handlePointerStart(position: Vector): void {
    this.elements?.forEach((row) => {
      row.forEach((field) => {
        if (field.collision(position)) {
          this.startSelection = field.field;
        }
      });
    });
  }

  handlePointerEnd(position: Vector): void {
    if (this.button?.collision(position)) {
      this.button.action();
      this.button?.ClearMark();
    }
    this.elements?.forEach((row) => {
      row.forEach((field) => {
        if (field.collision(position)) {
          console.log("actions", this.startSelection, field.field);
          if (this.startSelection) {
            if (
              this.startSelection.x === field.field.x &&
              this.startSelection.y === field.field.y
            ) {
              field.action();
            } else {
              console.log(
                "attacking",
                this.startSelection.x,
                this.startSelection.y,
                field.field.x,
                field.field.y,
              );
              this.gameAppState.enterPLayerAction({
                type: PlayerActionType.Attack,
                playerId: this.gameAppState.playerId,
                from: {
                  targetField: new Vector(
                    this.startSelection.x,
                    this.startSelection.y,
                  ),
                  numberOfUnits: this.startSelection.status.units,
                },
                to: {
                  targetField: new Vector(field.field.x, field.field.y),
                },
              });
            }
            field.ClearMark();
          }
        }
      });
    });
    this.attackArrow = null;
    this.startSelection = null;
  }

  handlePointerMove(position: Vector): void {
    this.button?.collision(position)
      ? this.button.Mark()
      : this.button?.ClearMark();
    let attacking = false;
    this.elements?.forEach((row) => {
      row.forEach((field) => {
        if (field.collision(position)) {
          field.Mark();
          if (
            ((this.startSelection?.x === field.field.x + 1 ||
              this.startSelection?.x === field.field.x - 1) &&
              this.startSelection?.y === field.field.y) ||
            this.startSelection?.x === field.field.x &&
              (this.startSelection?.y === field.field.y + 1 ||
                this.startSelection?.y === field.field.y - 1)
          ) {
            this.attackArrow = new Vector(field.field.x, field.field.y);
            attacking = true;
          }
        } else {
          field?.ClearMark();
        }
      });
    });
    if (!attacking) this.attackArrow = null;
  }
}
