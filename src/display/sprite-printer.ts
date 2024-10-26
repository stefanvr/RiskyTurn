import { Vector } from "../lib/vector.ts";
import { ISpritePrinter } from "../driver-display.ts";

export type Sprite<SpriteFile> = {
  file: SpriteFile;
  start: Vector;
  size: Vector;
  offset: Vector;
};

export type SpriteItem = {
  fileName: string;
  sprites?: HTMLImageElement;
};

export interface SpriteAssetSet<SpriteType, SpriteFile> {
  files: Map<SpriteFile, SpriteItem>;
  sprites: Map<SpriteType, Sprite<SpriteFile>>;
}

export class SpritePrinter<SpriteType, SpriteFile>
  implements ISpritePrinter<SpriteType> {
  spriteSet: SpriteAssetSet<SpriteType, SpriteFile>;

  constructor(spriteSet: SpriteAssetSet<SpriteType, SpriteFile>) {
    this.spriteSet = spriteSet;
  }

  public loadSprites() {
    // Load sprites in buffers
    [...this.spriteSet.files].map(([, v]) => {
      v.sprites = new Image();
      v.sprites.src = v.fileName;
    });
  }

  public drawSpriteType(
    ctx: CanvasRenderingContext2D,
    pos: Vector,
    type: SpriteType,
  ) {
    this.drawSprite(ctx, pos, this.spriteSet.sprites.get(type)!);
  }

  private drawSprite(
    ctx: CanvasRenderingContext2D,
    pos: Vector,
    sprite: Sprite<SpriteFile>,
  ) {
    ctx.drawImage(
      this.spriteSet.files.get(sprite.file)!.sprites!,
      sprite.start.x + sprite.offset.x,
      sprite.start.y + sprite.offset.y,
      sprite.size.x,
      sprite.size.y,
      pos.x,
      pos.y,
      sprite.size.x,
      sprite.size.y,
    );
  }
}
