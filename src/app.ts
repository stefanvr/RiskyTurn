import { DriverDisplay } from './driver-display.ts';
import { DriverInput } from './driver-input.ts';
import { DriverAudio } from './driver-audio.ts';
import { SFX_SET, SOUND, SOUND_FILE, STREAM_TYPE } from './audio/audio-config.ts';

export class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  display: DriverDisplay;
  input: DriverInput;
  audio: DriverAudio<SOUND, STREAM_TYPE, SOUND_FILE>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.display = new DriverDisplay(this.ctx);
    this.input = new DriverInput(this.canvas);
    this.audio = new DriverAudio<SOUND, STREAM_TYPE, SOUND_FILE>(SFX_SET);
  }

  public async start() {
    this.display.draw();
    await this.audio.loadAudio();
    this.audio.playSoundEffect(SOUND.Open);
  }
}
