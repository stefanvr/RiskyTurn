import { DriverDisplay } from "./driver-display.ts";
import { DriverInput } from "./driver-input.ts";
import { DriverAudio } from "./driver-audio.ts";
import { SFX_SET, Sound, SoundFile, StreamType } from "./audio/audio-config.ts";
import { SPRITE_SET, SpriteFile } from "./display/sprite-config.ts";
import { SpritePrinter } from "./display/sprite-printer.ts";
import { GameAppFlow } from "./game-ui/game-app-flow.ts";
import { FieldType } from "./game/game-elements.ts";

export class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  spritePrinter: SpritePrinter<FieldType, SpriteFile>;

  display: DriverDisplay<FieldType>;
  input: DriverInput;
  audio: DriverAudio<Sound, StreamType, SoundFile>;

  gameAppFlow: GameAppFlow;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.spritePrinter = new SpritePrinter(SPRITE_SET);

    this.display = new DriverDisplay(this.ctx, this.spritePrinter);
    this.audio = new DriverAudio<Sound, StreamType, SoundFile>(SFX_SET);

    this.gameAppFlow = new GameAppFlow(this.display, this.audio);

    this.input = new DriverInput(this.canvas, this.display);
  }

  public async start() {
    this.spritePrinter.loadSprites();
    this.gameAppFlow.start();

    this.display.draw();
    await this.audio.loadAudio();
  }
}
