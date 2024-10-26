import { AudioAssetSet, createItem } from "../driver-audio.ts";

export enum Sound {
  Open,
  CLose,
}

export enum StreamType {
  Effects = "Effects",
  //music = "music",
}

export enum SoundFile {
  Sfx,
}

export const SFX_SET: AudioAssetSet<Sound, StreamType, SoundFile> = {
  files: new Map([[SoundFile.Sfx, { fileName: "/assets/sfx.mp3" }]]),
  sounds: new Map([
    [Sound.Open, createItem(StreamType.Effects, SoundFile.Sfx, 2, 4.1)],
    [Sound.CLose, createItem(StreamType.Effects, SoundFile.Sfx, 7.1, 9.2)],
  ]),
};
