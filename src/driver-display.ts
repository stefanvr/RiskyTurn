import { Vector } from "./lib/vector.ts";

export interface ISpritePrinter<SpriteType> {
  drawSpriteType(
    ctx: CanvasRenderingContext2D,
    pos: Vector,
    type: SpriteType,
  ): void;
}

export interface Layer {
  tag: string;

  render(ctx: CanvasRenderingContext2D): void;
}

export interface LayerSprite<T> extends Layer {
  spritePrinter: ISpritePrinter<T> | null;
}

export class DriverDisplay<SpriteType> {
  ctx: CanvasRenderingContext2D;
  spritePrinter: ISpritePrinter<SpriteType>;
  layers: Layer[] = [];

  constructor(
    ctx: CanvasRenderingContext2D,
    spritePrinter: ISpritePrinter<SpriteType>,
  ) {
    this.ctx = ctx;
    this.initResizeHandling();
    this.spritePrinter = spritePrinter;
  }

  public draw() {
    this.drawContent();
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  public addLayer(layer: Layer) {
    this.layers.push(layer);
  }

  public addSpriteLayer(layer: LayerSprite<SpriteType>) {
    layer.spritePrinter = this.spritePrinter;
    this.layers.push(layer);
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
    this.layers.forEach((layer) => {
      layer.render(this.ctx);
    });
  }
}
