import { Sound } from "../audio/audio-config.ts";
import { DriverDisplay } from "../driver-display.ts";
import { IDriverAudio } from "../driver-audio.ts";
import { LayerBackground, TAG_LAYER_BACKGROUND } from "./layer-background.ts";
import { GameEventType } from "./game-flow-events.ts";

import {
  LayerGameBackground,
  TAG_LAYER_GAME_BACKGROUND,
} from "./layer-game-background.ts";
import { LayerGame, TAG_LAYER_GAME } from "./layer-game.ts";
import { Gamebuilder, minimalGame } from "./game-state.ts";
import { FieldType } from "../game/game-elements.ts";
import { GameAppState, GameAppStatePhases } from "./game-app-state.ts";
import { LayerDoor, TAG_LAYER_DOOR } from "./layer-door.ts";

export class GameAppFlow {
  display: DriverDisplay<FieldType>;
  audio: IDriverAudio<Sound>;
  state: GameAppState;

  constructor(display: DriverDisplay<FieldType>, audio: IDriverAudio<Sound>) {
    this.display = display;
    this.audio = audio;
    this.state = new GameAppState(minimalGame, this.NextState);
  }

  door: LayerDoor = new LayerDoor();
  public start() {
    this.display.removeLayer(TAG_LAYER_DOOR);
    this.door = new LayerDoor();
    this.display.addLayer(this.door);
    this.display.addLayer(new LayerBackground(this));
    Gamebuilder();
    this.state = new GameAppState(minimalGame, this.NextState.bind(this));
  }

  public NextState() {
    this.update(GameEventType.NextState);
  }

  public update(event: GameEventType) {
    switch (event) {
      case GameEventType.NextState:
        {
          if (this.state.status === GameAppStatePhases.startGame) {
            this.update(GameEventType.StartGame);
          }
          if (this.state.status === GameAppStatePhases.endGame) {
            this.update(GameEventType.GameFinished);
            this.state = new GameAppState(
              minimalGame,
              this.NextState.bind(this),
            );
            return;
          }
        }
        if (
          this.state.status === GameAppStatePhases.StartPlayer1 ||
          this.state.status === GameAppStatePhases.StartPlayer2 ||
          this.state.status === GameAppStatePhases.ExecuteActions
        ) {
          const closing = this.door.close();
          if (closing) this.audio.playSoundEffect(Sound.CLose);
        } else {
          const opening = this.door.open();
          if (opening) this.audio.playSoundEffect(Sound.Open);
        }
        break;
      case GameEventType.StartGame:
        {
          console.log("start game");
          this.display.addLayer(new LayerGameBackground());
          this.display.removeLayer(TAG_LAYER_BACKGROUND);
          this.display.removeLayer(TAG_LAYER_DOOR);
          this.display.addSpriteLayer(new LayerGame(minimalGame, this.state));
          this.display.addLayer(this.door);
          this.door.toggle();
          this.audio.playSoundEffect(Sound.Open);
        }
        break;
      case GameEventType.GameFinished:
        {
          this.state.nextPhase();
          this.display.removeLayer(TAG_LAYER_GAME);
          this.display.addLayer(new LayerBackground(this));
          this.display.removeLayer(TAG_LAYER_GAME_BACKGROUND);
          this.door.toggle(true);
          this.audio.playSoundEffect(Sound.CLose);
        }
        break;
    }
  }
}
