import { Layer } from "../driver-display.ts";

export const TAG_LAYER_GAME_BACKGROUND = "game-background";
export class LayerGameBackground implements Layer {
  tag: string = TAG_LAYER_GAME_BACKGROUND;

  public render(ctx: CanvasRenderingContext2D) {
    let r: number;
    let xo: number;
    let yo: number;
    if (ctx.canvas.width < ctx.canvas.height) {
      r = ctx.canvas.width / 2;
      xo = 0;
      yo = (ctx.canvas.height - ctx.canvas.width) / 2;
    } else {
      r = ctx.canvas.height / 2;
      xo = (ctx.canvas.width - ctx.canvas.height) / 2;
      yo = 0;
    }

    // Create radial gradient
    const gradient = ctx.createRadialGradient(
      xo + r,
      yo + r,
      0,
      xo + r,
      yo + r,
      r,
    );

    // Add color stops
    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.4, "#8B4000"); // Dark orange color
    gradient.addColorStop(1, "black");

    // Fill canvas with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
