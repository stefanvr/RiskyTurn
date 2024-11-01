import { Layer } from "../driver-display.ts";
import type { Vector } from "../lib/vector.ts";

export const TAG_LAYER_DOOR = "door";
export class LayerDoor implements Layer {
  tag = "door";

  public isOpen = false;
  animation: number | null = null;
  progress = 0;
  time = 0;

  handlePointerMove(_: Vector): void {}
  handlePointerEnd(_: Vector): void {}
  handlePointerStart(_: Vector): void {}

  ctx?: CanvasRenderingContext2D;

  stopAnimation(): void {
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;
    if (this.animation === null) {
      this.drawDoor();
    }
  }

  public open() {
    if (!this.isOpen) {
      this.toggle();
      return true;
    }
    return false;
  }

  public close() {
    if (this.isOpen) {
      this.toggle();
      return true;
    }
    return false;
  }

  reset: boolean = false;
  public toggle(reset?: boolean) {
    this.isOpen = !this.isOpen;
    if (this.animation === null) {
      this.progress = this.isOpen ? 0 : 0.9;
      this.time = 0;
      this.animate();
    }

    if (reset) {
      this.reset = true;
    }
  }

  createMetallicPattern(ctx: CanvasRenderingContext2D) {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d")!;
    patternCanvas.width = patternCanvas.height = 100;

    // Base metallic gradient
    const gradient = patternCtx.createLinearGradient(0, 0, 100, 100);
    gradient.addColorStop(0, "#2a0000");
    gradient.addColorStop(0.5, "#3a0000");
    gradient.addColorStop(1, "#2a0000");
    patternCtx.fillStyle = gradient;
    patternCtx.fillRect(0, 0, 100, 100);

    // Add wear/scratch effect
    for (let i = 0; i < 20; i++) {
      patternCtx.beginPath();
      patternCtx.moveTo(Math.random() * 100, Math.random() * 100);
      patternCtx.lineTo(Math.random() * 100, Math.random() * 100);
      patternCtx.strokeStyle = "rgba(60, 0, 0, 0.1)";
      patternCtx.lineWidth = Math.random() * 2;
      patternCtx.stroke();
    }

    // Add rivets/bolts
    for (let x = 10; x < 100; x += 30) {
      for (let y = 10; y < 100; y += 30) {
        // Rivet base
        patternCtx.beginPath();
        patternCtx.arc(x, y, 4, 0, Math.PI * 2);
        patternCtx.fillStyle = "#400000";
        patternCtx.fill();

        // Rivet highlight
        patternCtx.beginPath();
        patternCtx.arc(x - 1, y - 1, 1.5, 0, Math.PI * 2);
        patternCtx.fillStyle = "rgba(255, 50, 50, 0.2)";
        patternCtx.fill();
      }
    }

    return ctx.createPattern(patternCanvas, "repeat");
  }

  drawAngularFrame(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    // Draw outer frame
    ctx.beginPath();
    // Top left corner
    ctx.moveTo(40, 20);
    ctx.lineTo(80, 20);
    ctx.moveTo(20, 40);
    ctx.lineTo(20, 80);

    // Top right corner
    ctx.moveTo(canvas.width - 80, 20);
    ctx.lineTo(canvas.width - 40, 20);
    ctx.moveTo(canvas.width - 20, 40);
    ctx.lineTo(canvas.width - 20, 80);

    // Bottom left corner
    ctx.moveTo(20, canvas.height - 80);
    ctx.lineTo(20, canvas.height - 40);
    ctx.moveTo(40, canvas.height - 20);
    ctx.lineTo(80, canvas.height - 20);

    // Bottom right corner
    ctx.moveTo(canvas.width - 20, canvas.height - 80);
    ctx.lineTo(canvas.width - 20, canvas.height - 40);
    ctx.moveTo(canvas.width - 80, canvas.height - 20);
    ctx.lineTo(canvas.width - 40, canvas.height - 20);

    ctx.stroke();

    // Draw corner circles
    const cornerPositions = [
      [20, 20],
      [canvas.width - 20, 20],
      [20, canvas.height - 20],
      [canvas.width - 20, canvas.height - 20],
    ];

    cornerPositions.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.strokeStyle = "#ff0000";
      ctx.stroke();
    });
  }

  drawStatusBar(ctx: CanvasRenderingContext2D) {
    // Draw status bar
    ctx.fillStyle = "#4d0000";
    ctx.fillRect(100, 10, 400, 4);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(100, 10, 400 * this.progress, 4);
  }

  drawDoor() {
    const canvas = this.ctx!.canvas;
    const ctx = this.ctx!;
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#000813";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw angular frame
    this.drawAngularFrame(ctx);
    this.drawStatusBar(ctx);

    const doorWidth = (canvas.width - 100) / 2;
    /*const leftDoorX = this.isOpen
      ? 50 - doorWidth  *  this.progress
      : 50 + doorWidth * (1 - this.progress);*/
    const leftDoorX = this.isOpen
      ? 50 - (doorWidth * this.progress)
      : 50 - (doorWidth * this.progress); /*+ doorWidth * (1 - this.progress);*/
    const rightDoorX = this.isOpen
      ? canvas.width - 50 - doorWidth + doorWidth * this.progress
      : canvas.width - 50 - doorWidth * (1 - this.progress);

    // Draw door panels
    ctx.fillStyle = this.createMetallicPattern(ctx)!;

    // Left door
    ctx.fillRect(leftDoorX, 80, doorWidth, canvas.height - 115);

    // Right door
    ctx.fillRect(rightDoorX, 80, doorWidth, canvas.height - 115);

    // Draw glowing edges
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "rgba(255, 0, 0, 0.2)");
    gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.5)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0.2)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.strokeRect(leftDoorX + 2, 80 + 2, doorWidth - 4, canvas.height - 115);
    ctx.strokeRect(rightDoorX + 2, 80 + 2, doorWidth - 4, canvas.height - 115);
  }

  animate() {
    this.progress += this.isOpen ? 0.01 : -0.01;
    this.time += 0.010;

    if (this.progress > 1) this.progress = 1;
    if (this.progress < 0) this.progress = 0;

    this.drawDoor();
    if (this.progress > 0 && this.progress < 1) {
      this.animation = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.animation = null;
      if (this.reset) {
        console.log("reset");
        this.reset = false;
        this.isOpen = false;
      }
    }
  }
}
