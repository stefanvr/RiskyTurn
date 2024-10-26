import { SpriteType } from "../display/sprite-config.ts";
import { SOUND } from "../audio/audio-config.ts";
import { DriverDisplay } from "../driver-display.ts";
import { IDriverAudio } from "../driver-audio.ts";
import { LayerBackground } from "./layer-background.ts";

export class GameAppFlow {
  display: DriverDisplay<SpriteType>;
  audio: IDriverAudio<SOUND>;

  constructor(display: DriverDisplay<SpriteType>, audio: IDriverAudio<SOUND>) {
    this.display = display;
    this.audio = audio;
  }

  public start() {
    this.display.addLayer(new LayerBackground());
  }
}
