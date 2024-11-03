import { Modal } from "../driver-display.ts";
import { Vector } from "../lib/vector.ts";
import { Button } from "../display/ui-elements/button.ts";
import { ButtonX } from "../display/ui-elements/button-x.ts";
import {
  UiFormElement,
} from "../display/ui-elements/ui-elements.ts";

export type MenuItem = {
  text: string;
  enabled: boolean;
  callback: () => void;
};

export interface MenuItems {
  menuTitle: string;
  items: MenuItem[];
}

export class ModalFieldPopupMenu implements Modal {
  menuItems: MenuItems;

  scale = 0.5;

  buttons: UiFormElement[] | null = null;

  constructor(menuItems: MenuItems) {
    this.menuItems = menuItems;
  }

  onClose: (() => void) | null = null;

  private drawMetallicBackground(ctx: CanvasRenderingContext2D) {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d")!;
    patternCanvas.width = patternCanvas.height = 100;

    const gradient = patternCtx.createLinearGradient(0, 0, 100, 100);
    gradient.addColorStop(0, "#2a0000");
    gradient.addColorStop(0.5, "#3a0000");
    gradient.addColorStop(1, "#2a0000");
    patternCtx.fillStyle = gradient;
    patternCtx.fillRect(0, 0, 100, 100);

    for (let x = 10; x < 100; x += 30) {
      for (let y = 10; y < 100; y += 30) {
        patternCtx.beginPath();
        patternCtx.arc(x, y, 4, 0, Math.PI * 2);
        patternCtx.fillStyle = "#400000";
        patternCtx.fill();

        patternCtx.beginPath();
        patternCtx.arc(x - 1, y - 1, 1.5, 0, Math.PI * 2);
        patternCtx.fillStyle = "rgba(255, 50, 50, 0.2)";
        patternCtx.fill();
      }
    }

    return ctx.createPattern(patternCanvas, "repeat");
  }

  private drawAngularFrame(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const cw = canvas.width * this.scale;
    const ch = canvas.height * this.scale;

    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(80, 20);
    ctx.moveTo(20, 40);
    ctx.lineTo(20, 80);

    ctx.moveTo(cw - 80, 20);
    ctx.lineTo(cw - 40, 20);
    ctx.moveTo(cw - 20, 40);
    ctx.lineTo(cw - 20, 80);

    ctx.moveTo(20, canvas.height - 80);
    ctx.lineTo(20, ch - 40);
    ctx.moveTo(40, ch - 20);
    ctx.lineTo(80, ch - 20);

    ctx.moveTo(cw - 20, ch - 80);
    ctx.lineTo(cw - 20, ch - 40);
    ctx.moveTo(cw - 80, ch - 20);
    ctx.lineTo(cw - 40, ch - 20);

    ctx.stroke();

    const cornerPositions = [
      [20, 20],
      [20, ch - 20],
      [cw - 20, ch - 20],
    ];

    cornerPositions.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.strokeStyle = "#ff0000";
      ctx.stroke();
    });

    // Draw close button (X) in top-right corner
    /*ctx.beginPath();
    ctx.moveTo(canvas.width * this.scale - 25, 15);
    ctx.lineTo(canvas.width * this.scale - 15, 25);
    ctx.moveTo(canvas.width * this.scale - 25, 25);
    ctx.lineTo(canvas.width * this.scale - 15, 15);
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.stroke();*/
  }

  render(ctx: CanvasRenderingContext2D): void {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width * this.scale, canvas.height * this.scale);

    // Draw solid background
    ctx.fillStyle = "#000813";
    ctx.fillRect(0, 0, canvas.width * this.scale, canvas.height * this.scale);

    // Draw header
    ctx.fillStyle = "#FFA500";
    ctx.font = "bold 28px monospace";
    const headerText = this.menuItems.menuTitle;
    const headerWidth = ctx.measureText(headerText).width;
    ctx.fillText(headerText, (canvas.width * this.scale - headerWidth) / 2, 50);

    // Draw metallic background only behind options
    ctx.fillStyle = this.drawMetallicBackground(ctx)!;
    ctx.fillRect(20, 90, canvas.width * this.scale - 40, 270);

    // Draw frame
    this.drawAngularFrame(ctx);

    if (!this.buttons) {
      this.buttons = [];
      this.menuItems.items.forEach((item, index) => {
        const button = new Button(
          new Vector(40, 110 + index * 80),
          new Vector(ctx.canvas.width * this.scale - 80, 60),
          {
            text: () => {
              return item.text;
            },
            action: () => {
              return item.callback();
            },
            enabled: () => {
              return item.enabled;
            },
          },
        );
        this.buttons!.push(button);
      });

      // Draw OK button
      const button = new Button(
        new Vector(40, canvas.height * this.scale - 100),
        new Vector(ctx.canvas.width * this.scale - 80, 60),
        {
          text: () => {
            return "Ok";
          },
          action: () => {
            if (this.onClose) this.onClose();
          },
          enabled: () => {
            return true;
          },
        },
      );
      this.buttons.push(button);
      // Draw OK button
      const buttonX = new ButtonX(
        new Vector(canvas.width * this.scale - 25, 15),
        new Vector(10, 10),
        {
          action: () => {
            if (this.onClose) this.onClose();
          },
        },
      );
      this.buttons.push(buttonX);
    }

    this.buttons.forEach((uiE) => {
      uiE.Draw(ctx);
    });
  }

  handlePointerStart(_: Vector): void {}

  handlePointerEnd(position: Vector): void {
    this.buttons?.forEach((uiE) => {
      if (uiE.collision(position)) {
        uiE.action();
        uiE.ClearMark();
      }
    });
  }

  handlePointerMove(position: Vector): void {
    this.buttons?.forEach((uiE) => {
      uiE.collision(position) ? uiE.Mark() : uiE?.ClearMark();
    });
  }
}
