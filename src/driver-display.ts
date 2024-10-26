import { Vector } from "./lib/vector.ts";

export interface ISpritePrinter<SPRITE_TYPE> {
  drawSpriteType(
    ctx: CanvasRenderingContext2D,
    pos: Vector,
    type: SPRITE_TYPE,
  ): void;
}

export interface Layer {
  tag: string;

  render(ctx: CanvasRenderingContext2D): void;
}

export interface LayerSprite<SPRITE_TYPE> extends Layer {
  spritePrinter: ISpritePrinter<SPRITE_TYPE> | null;
}

export class DriverDisplay<SPRITE_TYPE> {
  ctx: CanvasRenderingContext2D;
  spritePrinter: ISpritePrinter<SPRITE_TYPE>;
  layers: Layer[] = [];

  constructor(
    ctx: CanvasRenderingContext2D,
    spritePrinter: ISpritePrinter<SPRITE_TYPE>,
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

  public addSpriteLayer(layer: LayerSprite<SPRITE_TYPE>) {
    layer.spritePrinter = this.spritePrinter;
    this.layers.push(layer);
  }

  public removeLayer(tag: string) {
    this.layers = this.layers.filter((layer) => layer.tag !== tag);
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
