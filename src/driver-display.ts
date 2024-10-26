export class DriverDisplay {
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.initResizeHandling();
  }

  public draw() {
    this.drawContent();
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  private initResizeHandling(): void {
    globalThis.addEventListener("resize", () => {
      this.resize();
    });
    requestAnimationFrame(() => {
      this.draw();
    });
    this.resize();
  }

  private resize() {
    const boundingBox = this.ctx.canvas.parentElement!.getBoundingClientRect();
    const pixelRatio = globalThis.devicePixelRatio;

    this.ctx.canvas.width = boundingBox.width * pixelRatio;
    this.ctx.canvas.height = boundingBox.height * pixelRatio;
    this.ctx.canvas.style.width = `${boundingBox.width}px`;
    this.ctx.canvas.style.height = `${boundingBox.height}px`;
  }

  private drawContent() {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(
      10,
      10,
      this.ctx.canvas.width - 20,
      this.ctx.canvas.height - 20,
    );
  }
}
