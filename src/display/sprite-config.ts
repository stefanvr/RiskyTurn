import { Vector } from "../lib/vector.ts";
import { SpriteAssetSet } from "./sprite-printer.ts";
import { FieldType } from "../game/game-elements.ts";

export enum SpriteFile {
  SpriteSheet,
}

export const SPRITE_SET: SpriteAssetSet<FieldType, SpriteFile> = {
  files: new Map([[SpriteFile.SpriteSheet, {
    fileName: "./assets/sprite-sheet.png",
  }]]),
  sprites: new Map([
    [FieldType.Dirt, {
      file: SpriteFile.SpriteSheet,
      start: new Vector(1, 1),
      size: new Vector(220, 220),
      offset: new Vector(0, 0),
    }],
    [FieldType.Stone, {
      file: SpriteFile.SpriteSheet,
      start: new Vector(1, 1),
      size: new Vector(220, 220),
      offset: new Vector(220, 0),
    }],
  ]),
};
