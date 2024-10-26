import { Sound } from "../audio/audio-config.ts";
import { DriverDisplay } from "../driver-display.ts";
import { IDriverAudio } from "../driver-audio.ts";
import { LayerBackground, TAG_LAYER_BACKGROUND } from "./layer-background.ts";
import { GameEventType } from "./game-flow-events.ts";
import { AppEventsHandler } from "../driver-input.ts";
import {
  LayerGameBackground,
  TAG_LAYER_GAME_BACKGROUND,
} from "./layer-game-background.ts";
import { LayerGame, TAG_LAYER_GAME } from "./layer-game.ts";
import { minimalGame } from "./game-state.ts";
import { FieldType } from "../game/game-elements.ts";

export class GameAppFlow implements AppEventsHandler {
  display: DriverDisplay<FieldType>;
  audio: IDriverAudio<Sound>;

  constructor(display: DriverDisplay<FieldType>, audio: IDriverAudio<Sound>) {
    this.display = display;
    this.audio = audio;
  }

  public start() {
    this.display.addLayer(new LayerBackground());
  }

  public update(event: GameEventType) {
    switch (event) {
      case GameEventType.StartGame:
        {
          this.display.addLayer(new LayerGameBackground());
          this.display.removeLayer(TAG_LAYER_BACKGROUND);
          this.display.addSpriteLayer(new LayerGame(minimalGame));
          this.audio.playSoundEffect(Sound.Open);
        }
        break;
      case GameEventType.GameFinished:
        {
          this.display.removeLayer(TAG_LAYER_GAME);
          this.display.addLayer(new LayerBackground());
          this.display.removeLayer(TAG_LAYER_GAME_BACKGROUND);
          this.audio.playSoundEffect(Sound.CLose);
        }
        break;
    }
  }
}
