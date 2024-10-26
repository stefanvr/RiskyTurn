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
import { GameAppFlow } from "./game-ui/game-app-flow.ts";

export class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  spritePrinter: SpritePrinter<SpriteType, SpriteFile>;

  display: DriverDisplay<SpriteType>;
  input: DriverInput;
  audio: DriverAudio<SOUND, STREAM_TYPE, SOUND_FILE>;

  gameAppFlow: GameAppFlow;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.spritePrinter = new SpritePrinter(SPRITE_SET);

    this.display = new DriverDisplay(this.ctx, this.spritePrinter);
    this.audio = new DriverAudio<SOUND, STREAM_TYPE, SOUND_FILE>(SFX_SET);

    this.gameAppFlow = new GameAppFlow(this.display, this.audio);

    this.input = new DriverInput(this.canvas, this.gameAppFlow);
  }

  public async start() {
    this.spritePrinter.loadSprites();
    this.gameAppFlow.start();

    this.display.draw();
    await this.audio.loadAudio();
  }
}
