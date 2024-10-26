import { Vector } from "../lib/vector.ts";
import { ISpritePrinter } from "../driver-display.ts";

export type Sprite<SPRITE_FILE> = {
  file: SPRITE_FILE;
  start: Vector;
  size: Vector;
  offset: Vector;
};

export type SpriteItem = {
  fileName: string;
  sprites?: HTMLImageElement;
};

export interface SpriteAssetSet<SPRITE_TYPE, SPRITE_FILE> {
  files: Map<SPRITE_FILE, SpriteItem>;
  sprites: Map<SPRITE_TYPE, Sprite<SPRITE_FILE>>;
}

export class SpritePrinter<SPRITE_TYPE, SPRITE_FILE>
  implements ISpritePrinter<SPRITE_TYPE> {
  spriteSet: SpriteAssetSet<SPRITE_TYPE, SPRITE_FILE>;

  constructor(spriteSet: SpriteAssetSet<SPRITE_TYPE, SPRITE_FILE>) {
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
    type: SPRITE_TYPE,
  ) {
    this.drawSprite(ctx, pos, this.spriteSet.sprites.get(type)!);
  }

  private drawSprite(
    ctx: CanvasRenderingContext2D,
    pos: Vector,
    sprite: Sprite<SPRITE_FILE>,
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
