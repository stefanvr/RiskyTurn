import { Layer } from "../driver-display.ts";
import type { Vector } from "../lib/vector.ts";

export const TAG_LAYER_GAME_BACKGROUND = "game-background";

export class LayerGameBackground implements Layer {

  tag: string = TAG_LAYER_GAME_BACKGROUND;

  animationRef?: number;
  ctx?: CanvasRenderingContext2D;

  xStart:number = 0;
  yStart:number = 0;
  xEnd:number  = 1;
  yEnd:number = 1;
  radius:number = 1;

  public resize(ctx: CanvasRenderingContext2D): void {
    this.calculateBackgroundCoordinates(ctx);
  }

  public stopAnimation() {
    if (this.animationRef) {
      cancelAnimationFrame(this.animationRef);
    }
  }

  public startAnimation(ctx: CanvasRenderingContext2D) {
    if (!this.animationRef) {
      this.ctx = ctx;
      this.animationRef = requestAnimationFrame(this.step.bind(this));
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.animationRef) {
      this.ctx = ctx;
      this.calculateBackgroundCoordinates(ctx);
      this.animationRef = requestAnimationFrame(this.step.bind(this));
    }
  }

  step(time: number) {
    this.drawBackground(time);
    requestAnimationFrame(this.step.bind(this));
  }

  public drawBackground(time: number) {
    if (!this.ctx) return;

    // Create radial gradient
  const gradient = this.ctx.createRadialGradient(
    this.xStart, this.yStart,0,
    this.xEnd, this.yEnd, this.radius,
  );
  
  // Calculate pulsation based on time
  const pulsation = Math.sin(time / 1500) * 0.5 + 0.5;

  // Add color stops with pulsating effect
  gradient.addColorStop(0, "black");
  gradient.addColorStop(
    0.4,
    `rgb(${139 + pulsation * 50}, ${64 + pulsation * 50}, 0)`,
  );
  gradient.addColorStop(1, "black");

  // Fill canvas with gradient
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  }

  private calculateBackgroundCoordinates(ctx: CanvasRenderingContext2D) {
    console.log("calculateBackgroundCoordinates");
    let r: number;
    let xo: number;
    let yo: number;
    if (ctx.canvas.width < ctx.canvas.height) {
      r = ctx.canvas.width / 2;
      xo = 0;
      yo = (ctx.canvas.height - ctx.canvas.width) / 2;
    }
    else {
      r = ctx.canvas.height / 2;
      xo = (ctx.canvas.width - ctx.canvas.height) / 2;
      yo = 0;
    }

    this.xStart = xo + r;
    this.yStart = yo + r;
    this.xEnd = xo + r;
    this.yEnd = yo + r;
    this.radius = r;
  }

  handlePointerMove(position: Vector): void {}
  handlePointerEnd(position: Vector): void {}
  handlePointerStart(position: Vector): void {}
}

