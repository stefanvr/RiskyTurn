import { AudioAssetSet, createItem } from "../driver-audio.ts";

export enum SOUND {
  Open,
  CLose,
}

export enum STREAM_TYPE {
  effects = "effects",
  //music = "music",
}

export enum SOUND_FILE {
  SFX,
}

export const SFX_SET: AudioAssetSet<SOUND, STREAM_TYPE, SOUND_FILE> = {
  files: new Map([[SOUND_FILE.SFX, { fileName: "/assets/sfx.mp3" }]]),
  sounds: new Map([
    [SOUND.Open, createItem(STREAM_TYPE.effects, SOUND_FILE.SFX, 2, 4.1)],
    [SOUND.CLose, createItem(STREAM_TYPE.effects, SOUND_FILE.SFX, 7.1, 9.2)],
  ]),
};
