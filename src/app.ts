import { DriverDisplay } from "./driver-display.ts";
import { DriverInput } from "./driver-input.ts";
import { DriverAudio } from "./driver-audio.ts";
import {
  SFX_SET,
  SOUND,
  SOUND_FILE,
  STREAM_TYPE,
} from "./audio/audio-config.ts";
import { SPRITE_SET, SpriteFile, SpriteType } from "./display/sprite-config.ts";
import { SpritePrinter } from "./display/sprite-printer.ts";
import { DemoLayer } from "./game-ui/demo-layer.ts";

export class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  spritePrinter: SpritePrinter<SpriteType, SpriteFile>;

  display: DriverDisplay<SpriteType>;
  input: DriverInput;
  audio: DriverAudio<SOUND, STREAM_TYPE, SOUND_FILE>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.spritePrinter = new SpritePrinter(SPRITE_SET);

    this.display = new DriverDisplay(this.ctx, this.spritePrinter);
    this.input = new DriverInput(this.canvas);
    this.audio = new DriverAudio<SOUND, STREAM_TYPE, SOUND_FILE>(SFX_SET);
  }

  public async start() {
    this.spritePrinter.loadSprites();

    this.display.addSpriteLayer(new DemoLayer()); // demo

    this.display.draw();
    await this.audio.loadAudio();

    this.audio.playSoundEffect(SOUND.Open); // demo
  }
}
