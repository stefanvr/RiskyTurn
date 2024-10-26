export type AudioItem<STREAM, STREAM_FILE> = {
  audioStream: STREAM;
  file: STREAM_FILE;
  start: number;
  stop: number;
};

export type StreamItem = {
  fileName: string;
  buffer?: AudioBuffer;
};

export interface AudioAssetSet<STREAM, STREAM_TYPE, STREAM_FILE> {
  files: Map<STREAM_FILE, StreamItem>;
  sounds: Map<STREAM, AudioItem<STREAM_TYPE, STREAM_FILE>>;
}

export const createItem = <STREAM, STREAM_FILE>(
  audioStream: STREAM,
  file: STREAM_FILE,
  start: number,
  stop: number,
  {}: Omit<
    AudioItem<STREAM, STREAM_FILE>,
    "audioStream" | "file" | "start" | "stop"
  > = {},
): AudioItem<STREAM, STREAM_FILE> => ({
  audioStream,
  file,
  start,
  stop,
});

export interface IDriverAudio<STREAM> {
  playSoundEffect(sound: STREAM): boolean;
}

export class DriverAudio<STREAM, STREAM_TYPE, STREAM_FILE>
  implements IDriverAudio<STREAM> {
  audioCtx: AudioContext = new AudioContext();
  gainMain: GainNode;
  initialized: boolean = false;
  audioAssetSet: AudioAssetSet<STREAM, STREAM_TYPE, STREAM_FILE>;

  constructor(audioAssetSet: AudioAssetSet<STREAM, STREAM_TYPE, STREAM_FILE>) {
    this.audioAssetSet = audioAssetSet;
    this.gainMain = this.audioCtx.createGain();
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange.bind(this),
    );
  }

  public async loadAudio(): Promise<void> {
    // Load audio in buffers
    await Promise.all(
      [...this.audioAssetSet.files].map(async ([, v]) => {
        if (v.buffer === undefined) {
          v.buffer = await this.loadAndDecodeAudio(v.fileName);
        }
      }),
    );
    this.initialized = true;
  }

  private handleVisibilityChange(): void {
    if (document.visibilityState === "hidden") {
      console.log("suspend");
      this.audioCtx.suspend();
    } else {
      console.log("resume");
      this.audioCtx.resume();
    }
  }

  loadAndDecodeAudio = async (
    fileUrl: string,
  ): Promise<AudioBuffer> => {
    const file = await fetch(fileUrl);
    const buffer = await file.arrayBuffer();
    return this.audioCtx.decodeAudioData(buffer);
  };

  public playSoundEffect(sound: STREAM): boolean {
    if (!this.initialized) {
      return false;
    }

    //console.log("Stopping previous sound effect");
    //this.soundEffects.get(sound)?.disconnect(); // Ensure the previous sound is stopped.

    if (this.audioCtx.state === "suspended") {
      console.log("Audio context was suspended. Resuming now.");
      this.audioCtx.resume();
    }

    const audioItem = this.audioAssetSet.sounds.get(sound)!;
    const node: AudioBufferSourceNode = this.audioCtx.createBufferSource();
    node.buffer = this.audioAssetSet.files.get(audioItem.file)!.buffer!;
    node.connect(this.gainMain);
    this.gainMain.connect(this.audioCtx.destination);

    //console.log(`Starting audio buffer source. (${sound})`);
    node.start(0, audioItem.start, audioItem.stop); // Start playback, optionally adjust the `start` parameters.

    //this.soundEffects.set(sound, node);
    //console.log("Sound effect successfully played.");
    return true;
  }
}
