import { Vector } from "../lib/vector.ts";
import { SpriteAssetSet } from "./sprite-printer.ts";

export enum SpriteType {
  dirt,
  stone,
}

export enum SpriteFile {
  SpriteSheet,
}

export const SPRITE_SET: SpriteAssetSet<SpriteType, SpriteFile> = {
  files: new Map([[SpriteFile.SpriteSheet, {
    fileName: "./assets/sprite-sheet.png",
  }]]),
  sprites: new Map([
    [SpriteType.dirt, {
      file: SpriteFile.SpriteSheet,
      start: new Vector(1, 1),
      size: new Vector(220, 220),
      offset: new Vector(0, 0),
    }],
    [SpriteType.stone, {
      file: SpriteFile.SpriteSheet,
      start: new Vector(1, 1),
      size: new Vector(220, 220),
      offset: new Vector(220, 0),
    }],
  ]),
};
